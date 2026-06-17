create or replace function public.update_chat_proposal_status(
  p_proposal_id uuid,
  p_message_id uuid,
  p_status text
)
returns table (
  proposal_id uuid,
  message_id uuid,
  status text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_current_user uuid := auth.uid();
  v_proposal public.hiring_proposals%rowtype;
  v_message public.messages%rowtype;
  v_next_metadata jsonb;
begin
  if v_current_user is null then
    raise exception 'AUTH_REQUIRED' using errcode = '28000';
  end if;

  if p_status not in ('accepted', 'rejected', 'cancelled') then
    raise exception 'INVALID_STATUS' using errcode = '22023';
  end if;

  select *
    into v_proposal
  from public.hiring_proposals
  where id = p_proposal_id;

  if not found then
    raise exception 'PROPOSAL_NOT_FOUND' using errcode = 'P0002';
  end if;

  if p_status in ('accepted', 'rejected') and v_current_user <> v_proposal.receiver_id then
    raise exception 'PROPOSAL_STATUS_FORBIDDEN' using errcode = '42501';
  end if;

  if p_status = 'cancelled' and v_current_user <> v_proposal.sender_id then
    raise exception 'PROPOSAL_CANCEL_FORBIDDEN' using errcode = '42501';
  end if;

  select *
    into v_message
  from public.messages
  where id = p_message_id
    and message_type = 'proposal'
    and (metadata->>'proposal_id')::uuid = p_proposal_id
    and public.is_conversation_participant(conversation_id, v_current_user);

  if not found then
    raise exception 'MESSAGE_NOT_FOUND' using errcode = 'P0002';
  end if;

  update public.hiring_proposals
  set status = p_status,
      updated_at = now()
  where id = p_proposal_id
  returning * into v_proposal;

  v_next_metadata := coalesce(v_message.metadata, '{}'::jsonb) || jsonb_build_object('status', p_status);

  update public.messages
  set metadata = v_next_metadata,
      updated_at = now()
  where id = p_message_id;

  return query select v_proposal.id, p_message_id, v_proposal.status;
end;
$$;

revoke all on function public.update_chat_proposal_status(uuid, uuid, text) from public;
revoke execute on function public.update_chat_proposal_status(uuid, uuid, text) from anon;
grant execute on function public.update_chat_proposal_status(uuid, uuid, text) to authenticated;
