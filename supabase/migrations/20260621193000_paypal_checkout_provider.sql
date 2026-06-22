-- Enable PayPal as an official secure checkout provider.
-- Keeps existing Mercado Pago attempts intact while allowing PayPal Orders API attempts.

alter table public.payment_attempts
  drop constraint if exists payment_attempts_provider_check;

alter table public.payment_attempts
  add constraint payment_attempts_provider_check
  check (provider in ('mercado_pago', 'paypal'));

alter table public.payment_attempts
  drop constraint if exists payment_attempts_method_check;

alter table public.payment_attempts
  add constraint payment_attempts_method_check
  check (method in ('pix', 'card', 'paypal'));
