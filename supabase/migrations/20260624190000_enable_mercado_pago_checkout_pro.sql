-- Enable Mercado Pago Checkout Pro as a redirect checkout method.

alter table public.payment_attempts
  drop constraint if exists payment_attempts_method_check;

alter table public.payment_attempts
  add constraint payment_attempts_method_check
  check (method in ('pix', 'card', 'paypal', 'mercado_pago'));
