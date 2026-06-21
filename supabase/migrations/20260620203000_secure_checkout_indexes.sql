create index if not exists checkout_coupons_seller_idx on public.checkout_coupons (seller_id);
create index if not exists payment_attempts_coupon_idx on public.payment_attempts (coupon_id);
create index if not exists payment_attempts_order_idx on public.payment_attempts (order_id);
create index if not exists coupon_redemptions_buyer_idx on public.coupon_redemptions (buyer_id);
create index if not exists coupon_redemptions_order_idx on public.coupon_redemptions (order_id);
create index if not exists seller_ledger_order_idx on public.seller_ledger_entries (order_id);
create index if not exists seller_ledger_order_item_idx on public.seller_ledger_entries (order_item_id);

