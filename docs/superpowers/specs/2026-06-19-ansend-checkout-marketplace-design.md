# ANSEND Checkout Marketplace Design

## Objective

Rebuild the checkout as a compact premium music marketplace surface based on the density and hierarchy of the supplied cart reference, while preserving ANSEND branding and all existing Mercado Pago, Pix, coupon, pricing, authentication, and cart behavior.

## Visual Direction

- Full viewport black background with compact dark navy surfaces.
- Electric blue only for primary actions, focus, links, and selected state.
- Modern product typography with restrained sizes and no decorative gradients.
- Maximum content width between 1180px and 1280px.
- Desktop grid: flexible main column plus a 360px sticky order summary.
- Radius between 6px and 10px, subtle borders, almost no shadow.

## Page Architecture

1. Compact secure checkout header with ANSEND wordmark, protection status, and close action.
2. Main column with title, billing/license bar, horizontal cart items, payment method selector, buyer fields, terms, and security notice.
3. Sticky summary with compact item rows, coupon field, payment processor note, totals, and dynamic Pix action.
4. Low-priority recommendation rail using existing beat data and lazy-loaded artwork.
5. Pix result view reusing the same shell, spacing, summary, and responsive rules.

## Component Boundaries

- `CheckoutHeader`: identity, security context, close action.
- `CheckoutItem`: artwork, producer, title, license metadata, price, remove action.
- `LicenseInformation`: compact edit/add information bar.
- `PaymentMethodSelector`: Pix active; unavailable methods disabled and labelled.
- `BuyerInformation`: labelled name and email controls with native validation.
- `CouponField`: existing coupon behavior and status feedback.
- `OrderSummary`: cart-derived items and server-authoritative totals.
- `CheckoutSecurityNotice`: concise release and processing disclosure.
- `RecommendedBeatCard`: existing beat data, compact add-to-cart action.

## Behavior And Data

- Existing checkout payload, cart parsing, API calls, Pix generation, verification, and error handling remain unchanged.
- No credentials or access tokens move to the frontend.
- Submit remains guarded against duplicate requests and restores its original label on failure.
- Values and products are rendered from existing checkout arguments and cart state; no product or monetary fixture is introduced in production code.
- Empty, loading, invalid, pending, approved, and API error states remain explicit and recoverable.

## Responsive Rules

- Above 1024px: two columns and sticky summary.
- 768px to 1023px: tighter grid with a 320px summary.
- Below 768px: one column, non-sticky summary, 16px page padding, two-column or single-column payment choices.
- Recommendations use horizontal scroll snap on narrow screens without causing page overflow.

## Accessibility

- Visible labels and focus rings.
- Minimum 44px interactive targets.
- Semantic buttons and accessible names for close, remove, and carousel actions.
- Selection and errors communicated with text/icons in addition to color.
- WCAG AA contrast and reduced-motion support.

## Verification

- Test-first structural assertions for the compact marketplace hierarchy.
- Existing Mercado Pago checkout, route stability, and build checks.
- Browser validation at 1440, 1024, 768, 430, and 375 pixels.
- Console, overflow, image, focus, terms, loading, and duplicate-submit checks.
