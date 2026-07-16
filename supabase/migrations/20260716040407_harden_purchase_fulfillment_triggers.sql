-- Trigger functions run through table events only and must not be exposed as RPCs.

revoke execute on function public.manage_purchase_entitlements() from public, anon, authenticated;
revoke execute on function public.fulfill_purchase_after_order_item() from public, anon, authenticated;
