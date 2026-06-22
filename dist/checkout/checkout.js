(function checkoutModule(global) {
  "use strict";

  const money = (cents) => new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(Number(cents || 0) / 100);

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function parseProviderInstallmentLabel(label) {
    const normalized = String(label || "").replace(/\s+/g, " ").trim();
    const installmentMatch = normalized.match(/\b(\d+)\s*(?:x|parcelas?)/i);
    const amounts = normalized.match(/R\$\s*\d{1,3}(?:\.\d{3})*,\d{2}/g) || [];
    if (!installmentMatch || !amounts.length) return null;
    return {
      installments: Number(installmentMatch[1]),
      installmentAmount: amounts[0].replace(/\s+/g, " "),
      totalAmount: (amounts[1] || "").replace(/\s+/g, " "),
      interestFree: /\bsem\s+juros\b/i.test(normalized),
    };
  }

  function formatProviderInstallmentLabel(details) {
    if (!details || !Number.isFinite(details.installments) || !details.installmentAmount) return "";
    const base = `${details.installments}x de ${details.installmentAmount}`;
    if (details.interestFree) return `${base} — sem juros`;
    if (details.totalAmount) return `${base} — total ${details.totalAmount}`;
    return base;
  }

  const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

  const unavailableMethodIcons = Object.freeze({
    "apple-pay": "apple",
    "google-pay": "wallet-cards",
    alipay: "scan-line",
    paypal: "wallet-cards",
  });

  function unavailableMethodMarkup(id, label) {
    const safeId = escapeHtml(id);
    const safeLabel = escapeHtml(label);
    const safeLogo = escapeHtml(unavailableMethodIcons[id] || "wallet-cards");
    const tabSemantics = id === "paypal" ? ' role="tab" aria-selected="false"' : "";
    return `<button type="button" data-checkout-unavailable="${safeId}"${tabSemantics} disabled aria-disabled="true" title="${safeLabel} — em breve">${icon(safeLogo)}<span>${safeLabel}</span><small>Em breve</small></button>`;
  }

  function checkoutFormIds(instanceId = "static") {
    const safe = String(instanceId || "static").replace(/[^a-zA-Z0-9_-]/g, "");
    return {
      form: `ansend-card-form-${safe}`,
      email: `checkout-email-${safe}`,
      cardNumber: `checkout-card-number-${safe}`,
      expiration: `checkout-card-expiration-${safe}`,
      cvv: `checkout-card-cvv-${safe}`,
      cardholderName: `checkout-cardholder-name-${safe}`,
      identification: `checkout-identification-number-${safe}`,
      issuer: `checkout-issuer-${safe}`,
      installments: `checkout-installments-${safe}`,
    };
  }

  function itemMarkup(item) {
    return `<article class="ansend-checkout__item" data-checkout-item="${escapeHtml(item.cartId || item.beatId)}">
      <div class="ansend-checkout__cover-wrap">
        <img src="${escapeHtml(item.cover || "assets/ansend-logo-square.png")}" alt="Capa de ${escapeHtml(item.title)}" class="ansend-checkout__cover" loading="lazy">
        <span class="ansend-checkout__quantity" aria-label="Quantidade 1">1</span>
      </div>
      <div class="ansend-checkout__item-copy">
        <strong title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.producer || "ANSEND")}</small>
        <div class="ansend-checkout__license"><span>${escapeHtml(item.licenseName || "Licença")}</span><b>·</b><span>${escapeHtml(item.formats || "MP3, WAV")}</span></div>
        <span class="ansend-checkout__qty-chip">Qtd. 1</span>
      </div>
      <strong class="ansend-checkout__item-price">${money(item.priceCents)}</strong>
      ${item.removable ? `<button type="button" class="ansend-checkout__remove" data-checkout-remove="${escapeHtml(item.cartId)}" aria-label="Remover ${escapeHtml(item.title)}">${icon("x")}</button>` : ""}
    </article>`;
  }

  function recommendationTags(item) {
    const tags = Array.isArray(item.tags) ? item.tags : [];
    return tags.filter(Boolean).slice(0, 2);
  }

  function promotedCardMarkup(item) {
    const tags = recommendationTags(item);
    const tagLabel = item.featured ? "Featured" : (item.sponsored ? "AD" : "CATALOGO");
    return `<article class="ansend-checkout__promoted-card" data-checkout-recommendation="${escapeHtml(item.id)}">
      <button type="button" class="ansend-checkout__promoted-cover" data-checkout-open-beat="${escapeHtml(item.id)}" aria-label="Abrir ${escapeHtml(item.title)}">
        <img src="${escapeHtml(item.cover || "assets/ansend-logo-square.png")}" alt="Capa de ${escapeHtml(item.title)}" loading="lazy" decoding="async">
        <span class="ansend-checkout__promoted-play">${icon("play")}</span>
      </button>
      <div class="ansend-checkout__promoted-copy">
        <div class="ansend-checkout__promoted-title-row">
          <span class="ansend-checkout__promoted-badge${item.featured ? " is-featured" : ""}">${escapeHtml(tagLabel)}</span>
          <strong title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</strong>
        </div>
        <div class="ansend-checkout__promoted-tags">${tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("") || `<span>#${escapeHtml(item.description || "Beat")}</span>`}</div>
        <div class="ansend-checkout__promoted-actions">
          <button type="button" class="ansend-checkout__promoted-price" data-checkout-open-beat="${escapeHtml(item.id)}">${escapeHtml(item.price || "Ver licença")}</button>
          <button type="button" class="ansend-checkout__promoted-cart" data-checkout-open-beat="${escapeHtml(item.id)}" aria-label="Escolher licença de ${escapeHtml(item.title)}">${icon("shopping-cart")}</button>
          <button type="button" class="ansend-checkout__recommendation-card-download-btn" data-action="download" data-id="${escapeHtml(item.id)}" aria-label="Baixar demo">
            ${icon("download")}
          </button>
        </div>
      </div>
    </article>`;
  }

  function recommendationMarkup(recommendations) {
    const items = (Array.isArray(recommendations) ? recommendations : [recommendations]).filter(Boolean).slice(0, 8);
    if (!items.length) return "";
    return `<section class="ansend-checkout__recommendations" aria-labelledby="checkout-recommendations-title">
      <div class="ansend-checkout__promoted-header">
        <h3 id="checkout-recommendations-title">Promoted</h3>
        <div class="ansend-checkout__promoted-nav" aria-label="Navegar promovidos">
          <button type="button" data-checkout-promoted-prev aria-label="Promovidos anteriores">${icon("chevron-left")}</button>
          <button type="button" data-checkout-promoted-next aria-label="Próximos promovidos">${icon("chevron-right")}</button>
        </div>
      </div>
      <div class="ansend-checkout__promoted-track" data-checkout-promoted-track>
        ${items.map(promotedCardMarkup).join("")}
      </div>
      <aside class="ansend-checkout__promoted-banner">
        <div class="ansend-checkout__promoted-banner-icon">${icon("megaphone")}</div>
        <div><strong>Promote Your Music</strong><p>Reach thousands of artists looking for their next hit. Get featured in the promoted section and boost your sales instantly.</p></div>
        <a href="#promover-beat">Get Started Now ${icon("arrow-right")}</a>
      </aside>
    </section>`;
  }

  function totalsMarkup(quote, compact = false) {
    return `<div class="ansend-checkout__totals${compact ? " is-compact" : ""}" data-checkout-totals>
      <div><span>Subtotal</span><strong data-checkout-subtotal>${money(quote.subtotalCents)}</strong></div>
      ${compact ? "" : `<div><span>Taxa de serviço</span><strong data-checkout-fee>${money(quote.serviceFeeCents)}</strong></div>
      <div data-checkout-discount-row ${quote.discountCents ? "" : "hidden"}><span>Desconto</span><strong data-checkout-discount>− ${money(quote.discountCents)}</strong></div>`}
      <div class="is-total"><span>Total</span><strong data-checkout-total>${money(quote.totalCents)}</strong></div>
    </div>`;
  }

  function cardFieldsMarkup(ids) {
    return `<div class="ansend-checkout__method-panel" data-checkout-panel="card" hidden>
      <label class="ansend-checkout__field"><span>E-mail</span><input id="${escapeHtml(ids.email)}" data-checkout-buyer-email name="buyer_email" type="email" autocomplete="email" placeholder="voce@exemplo.com" required></label>
      <div class="ansend-checkout__field">
        <span>Informações do cartão</span>
        <div class="ansend-checkout__group">
          <div class="ansend-checkout__field-wrapper">
            <div id="${escapeHtml(ids.cardNumber)}" class="ansend-checkout__secure-field" data-checkout-card-number aria-label="Número do cartão"><span class="sr-only">Número do cartão</span></div>
            <div class="ansend-checkout__card-brands">
              <img src="assets/payment/visa.svg" alt="Visa" class="ansend-checkout__brand-logo">
              <img src="assets/payment/mastercard.svg" alt="Mastercard" class="ansend-checkout__brand-logo">
              <img src="assets/payment/stripe.svg" alt="Stripe" class="ansend-checkout__brand-logo">
            </div>
          </div>
          <div class="ansend-checkout__field-row">
            <div id="${escapeHtml(ids.expiration)}" class="ansend-checkout__secure-field" data-checkout-card-expiration aria-label="Validade"><span class="sr-only">Validade</span></div>
            <div id="${escapeHtml(ids.cvv)}" class="ansend-checkout__secure-field" data-checkout-card-cvv aria-label="Código de segurança"><span class="sr-only">Código de segurança</span></div>
          </div>
        </div>
      </div>
      <label class="ansend-checkout__field"><span>Nome impresso no cartão</span><input id="${escapeHtml(ids.cardholderName)}" data-checkout-cardholder-name name="cardholder_name" placeholder="Como aparece no cartão" autocomplete="cc-name" required></label>
      <label class="ansend-checkout__field"><span>CPF/CNPJ</span><input id="${escapeHtml(ids.identification)}" name="identification_number" placeholder="Somente números" inputmode="numeric" autocomplete="off" required></label>
      <div class="ansend-checkout__provider-fields" aria-hidden="true">
        <select id="${escapeHtml(ids.issuer)}" name="issuer" data-checkout-provider-issuer data-checkout-issuer tabindex="-1"><option value="">Detectado pelo cartão</option></select>
        <select id="${escapeHtml(ids.installments)}" name="installments" data-checkout-provider-installments tabindex="-1"><option value="">Selecione</option></select>
      </div>
      <div class="ansend-checkout__field ansend-checkout__installment-field">
        <span id="${escapeHtml(ids.installments)}-visible-label">Parcelas</span>
        <button type="button" class="ansend-checkout__installment-trigger" data-checkout-installment-trigger aria-labelledby="${escapeHtml(ids.installments)}-visible-label" aria-controls="${escapeHtml(ids.installments)}-visible-list" aria-haspopup="listbox" aria-expanded="false" disabled>Digite o cartão para calcular</button>
        <div class="ansend-checkout__installment-popover" data-checkout-installment-popover hidden>
          <div id="${escapeHtml(ids.installments)}-visible-list" role="listbox" data-checkout-installment-list aria-labelledby="${escapeHtml(ids.installments)}-visible-label"></div>
        </div>
      </div>
    </div>`;
  }

  function pixFieldsMarkup() {
    return `<div class="ansend-checkout__method-panel" data-checkout-panel="pix">
      <label class="ansend-checkout__field"><span>E-mail</span><input name="pix_email" type="email" autocomplete="email" placeholder="voce@exemplo.com" required></label>
      <label class="ansend-checkout__field"><span>Nome completo</span><input name="pix_name" placeholder="Seu nome completo" autocomplete="name" required></label>
      <div class="ansend-checkout__field-pair">
        <label class="ansend-checkout__field"><span>CPF/CNPJ</span><input name="pix_identification" placeholder="Somente números" inputmode="numeric" autocomplete="off" required></label>
        <label class="ansend-checkout__field"><span>Telefone</span><input name="pix_phone" placeholder="DDD + número" inputmode="tel" autocomplete="tel" required></label>
      </div>
      <div class="ansend-checkout__pix-intro"><img class="ansend-checkout__pix-brand" src="assets/payment/pix-user.png" alt="Pix"><div><strong>Pagamento instantâneo</strong><span>O QR Code será exibido aqui sem sair do checkout.</span></div></div>
    </div>`;
  }

  function paypalFieldsMarkup() {
    return `<div class="ansend-checkout__method-panel" data-checkout-panel="paypal" hidden>
      <div class="ansend-checkout__pix-intro">
        <svg class="ansend-checkout__paypal-panel-logo" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 28px; flex-shrink: 0;">
          <path fill="#003087" d="M19.066 6.3c-.6-3.8-3.6-6.3-7.7-6.3H3.344C2.144 0 1.044.95.844 2.15L0 23.35c-.05.6.45 1.15 1.05 1.15h4.9c.85 0 1.55-.6 1.7-1.4l1.3-8.2c.1-.8.8-1.4 1.6-1.4h1.4c4.6 0 8-2.6 8.9-7.2.6-2.9-.1-5.5-2-6.9L19.066 6.3z"/>
          <path fill="#0079c1" d="M22.956 8.3c-.6-3.8-3.6-6.3-7.7-6.3H7.234c-1.2 0-2.3.95-2.5 2.15l-1.9 12.3c-.1.6.4 1.15 1 1.15h4.1c.85 0 1.55-.6 1.7-1.4l1.3-8.2c.1-.8.8-1.4 1.6-1.4h1.4c4.6 0 8-2.6 8.9-7.2.5-2.8-.2-5.4-2-6.8l.1.4z" style="mix-blend-mode: multiply;"/>
        </svg>
        <div>
          <strong>Checkout PayPal</strong>
          <span>Você será redirecionado para a página do PayPal para finalizar sua compra com segurança.</span>
        </div>
      </div>
    </div>`;
  }

  function renderCheckout(options) {
    const quote = options.quote || { subtotalCents: 0, serviceFeeCents: 0, discountCents: 0, totalCents: 0 };
    const items = Array.isArray(options.items) ? options.items : [];
    const pageMode = options.pageMode || options.mountTarget;
    const ids = checkoutFormIds(options.instanceId || "static");
    return `<section class="ansend-checkout" data-ansend-checkout data-checkout-method="pix" role="${pageMode ? "main" : "dialog"}" ${pageMode ? "" : 'aria-modal="true"'} aria-label="Checkout ANSEND">
      <div class="ansend-checkout__shell">
        <section class="ansend-checkout__order">
          <header class="ansend-checkout__breadcrumb"><button type="button" data-checkout-close aria-label="Fechar checkout">${icon("x")}</button><span>Carrinho</span><b>/</b><strong>Checkout</strong></header>
          <div class="ansend-checkout__order-content">
            <h2>Resumo do pedido <span>${items.length} ${items.length === 1 ? "item" : "itens"}</span></h2>
            <div class="ansend-checkout__items">${items.length ? items.map(itemMarkup).join("") : `<div class="ansend-checkout__empty">Seu carrinho está vazio.</div>`}</div>
            <div class="ansend-checkout__coupon" data-checkout-coupon-card>
              <div class="ansend-checkout__coupon-icon">${icon("ticket-percent")}</div><div><strong>Cupom de desconto</strong><span>Economize com um código válido</span></div>
              <button type="button" data-checkout-coupon-toggle>${icon("ticket")}<span>Adicionar código</span></button>
              <div class="ansend-checkout__coupon-form" hidden><label><span class="sr-only">Código do cupom</span><input name="coupon_code" placeholder="Digite seu código" autocomplete="off"></label><button type="button" data-checkout-coupon-apply>Aplicar</button></div>
              <p data-checkout-coupon-message aria-live="polite"></p>
            </div>
            ${totalsMarkup(quote)}
            ${recommendationMarkup(options.recommendations || options.recommendation)}
          </div>
        </section>
        <aside class="ansend-checkout__payment">
          <form id="${escapeHtml(ids.form)}" class="ansend-checkout__form" novalidate>
            <div style="display: none;">
              <img src="assets/payment/pix-user.png" alt="">
              <button type="button" data-checkout-unavailable="paypal" disabled aria-disabled="true" role="tab" aria-selected="false"></button>
              <button type="button" data-checkout-unavailable="apple-pay" disabled aria-disabled="true"></button>
              <button type="button" data-checkout-unavailable="google-pay" disabled aria-disabled="true"></button>
              <button type="button" data-checkout-unavailable="alipay" disabled aria-disabled="true"></button>
            </div>
            <div class="ansend-checkout__tabs" role="tablist" aria-label="Forma de pagamento"><button type="button" data-checkout-method="card" role="tab" aria-selected="false">Pagar com cartão</button><button type="button" class="is-active" data-checkout-method="pix" role="tab" aria-selected="true">Pagar com Pix</button><button type="button" data-checkout-method="paypal" role="tab" aria-selected="false">Pagar com PayPal</button></div>
            <div class="ansend-checkout__methods" aria-label="Métodos disponíveis"><button type="button" data-checkout-method="card" aria-pressed="false"><svg class="ansend-checkout__card-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg><span>Cartão</span></button><button type="button" class="is-active" data-checkout-method="pix" aria-pressed="true"><svg class="ansend-checkout__pix-logo-svg" viewBox="0 0 238 85" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-535.59399,-20.808825)"><path fill="#32bcad" d="m 596.82737,86.620206 c -3.08045,0 -5.97782,-1.19944 -8.15622,-3.37679 l -11.77678,-11.77713 c -0.82691,-0.82903 -2.26801,-0.82656 -3.09456,0 l -11.81982,11.82017 c -2.17841,2.17734 -5.07577,3.37679 -8.15623,3.37679 h -2.32092 l 14.9158,14.915444 c 4.65807,4.65808 12.21069,4.65808 16.86912,0 l 14.95813,-14.958484 z"/><path fill="#32bcad" d="m 553.82362,44.963326 c 3.08046,0 5.97782,1.19944 8.15622,3.37679 l 11.81982,11.82193 c 0.85125,0.85161 2.2412,0.85479 3.09457,-10e-4 l 11.77678,-11.77784 c 2.1784,-2.17735 5.07576,-3.37679 8.15622,-3.37679 h 1.41852 l -14.95778,-14.95813 c -4.65878,-4.658432 -12.2114,-4.658432 -16.86948,0 l -14.91509,14.91509 z"/><path fill="#32bcad" d="m 610.61844,57.378776 -9.03922,-9.03922 c -0.19897,0.0797 -0.41452,0.12946 -0.64206,0.12946 h -4.10986 c -2.12478,0 -4.20476,0.86184 -5.70618,2.36432 l -11.77643,11.77678 c -1.10207,1.10208 -2.55022,1.65347 -3.99697,1.65347 -1.44815,0 -2.89524,-0.55139 -3.99697,-1.65241 l -11.82088,-11.82088 c -1.50142,-1.50283 -3.5814,-2.36431 -5.70618,-2.36431 h -5.05354 c -0.21555,0 -0.41698,-0.0508 -0.60713,-0.12242 l -9.07521,9.07521 c -4.65843,4.65843 -4.65843,12.2107 0,16.86913 l 9.07486,9.07485 c 0.1905,-0.0716 0.39193,-0.12241 0.60748,-0.12241 h 5.05354 c 2.12478,0 4.20476,-0.86148 5.70618,-2.36396 l 11.81982,-11.81982 c 2.13643,-2.13466 5.8607,-2.13537 7.995,0.001 l 11.77643,11.77573 c 1.50142,1.50248 3.5814,2.36431 5.70618,2.36431 h 4.10986 c 0.22754,0 0.44309,0.0497 0.64206,0.12947 l 9.03922,-9.03922 c 4.65808,-4.65843 4.65808,-12.2107 0,-16.86913"/><path fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" d="m 633.42119,99.489186 v -48.3242 c 0,-8.89177 7.20795,-16.09972 16.09936,-16.09972 l 14.2681,0.0215 c 8.86566,0.0176 16.04363,7.20972 16.04363,16.07573 v 10.28594 c 0,8.89176 -7.20831,16.09972 -16.09972,16.09972 h -20.1616"/><path fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" d="m 683.81948,35.058846 h 6.18913 c 3.64913,0 6.60682,2.95804 6.60682,6.60717 v 36.09834"/><path fill="#32bcad" d="m 695.28853,29.466256 -2.8067,-2.807053 c -0.69674,-0.696383 -0.69674,-1.825625 0,-2.522008 l 2.80494,-2.805289 c 0.69779,-0.697441 1.82844,-0.697441 2.52553,0 l 2.80494,2.805289 c 0.69673,0.696383 0.69673,1.825625 0,2.522008 l -2.8067,2.807053 c -0.69638,0.69638 -1.82527,0.69638 -2.52201,0"/><path fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" d="m 708.48944,35.026636 h 6.13798 c 3.15771,0 6.18596,1.25448 8.41834,3.48686 l 14.35664,14.35664 c 1.85949,1.85984 4.87468,1.85984 6.73453,0 l 14.30408,-14.30408 c 2.23273,-2.23238 5.26062,-3.48686 8.41833,-3.48686 h 4.9904"/><path fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" d="m 708.48944,77.448336 h 6.13798 c 3.15771,0 6.18596,-1.25448 8.41834,-3.48686 l 14.35664,-14.35664 c 1.85949,-1.85984 4.87468,-1.85984 6.73453,0 l 14.30408,14.30408 c 2.23273,2.23238 5.26062,3.48686 8.41833,3.48686 h 4.9904"/><path fill="currentColor" opacity="0.6" d="m 645.6909,95.381446 c -0.6671,0 -1.44356,0.16051 -2.21156,0.33761 v 2.94463 c 0.53199,0.19438 1.13947,0.28787 1.72191,0.28787 1.47673,0 2.17699,-0.49812 2.17699,-1.79881 0,-1.22273 -0.57362,-1.7713 -1.68734,-1.7713 m -2.70968,5.468764 v -5.823654 h 0.40534 l 0.0423,0.25364 c 0.68333,-0.16051 1.62842,-0.37147 2.30364,-0.37147 0.54927,0 1.07209,0.0836 1.51059,0.4385 0.50694,0.41416 0.66711,1.08021 0.66711,1.80552 0,0.76094 -0.25365,1.47778 -0.94545,1.87395 -0.48084,0.27023 -1.13065,0.37994 -1.71309,0.37994 -0.59937,0 -1.17298,-0.0931 -1.77235,-0.26987 v 1.713444 z"/><path fill="currentColor" opacity="0.6" d="m 651.61782,95.363876 c -1.47708,0 -2.13537,0.46461 -2.13537,1.76424 0,1.2573 0.64982,1.82316 2.13537,1.82316 1.46826,0 2.12654,-0.45614 2.12654,-1.75578 0,-1.2573 -0.64946,-1.83162 -2.12654,-1.83162 m 1.89865,3.5874 c -0.48966,0.35383 -1.14759,0.45543 -1.89865,0.45543 -0.768,0 -1.42664,-0.10971 -1.90747,-0.45543 -0.5401,-0.37959 -0.75989,-1.00471 -0.75989,-1.78894 0,-0.77717 0.21979,-1.40935 0.75989,-1.79846 0.48083,-0.34537 1.13947,-0.45544 1.90747,-0.45544 0.75918,0 1.40899,0.11007 1.89865,0.45544 0.54892,0.38911 0.75953,1.02129 0.75953,1.78894 0,0.78563 -0.21943,1.41887 -0.75953,1.79846"/><path fill="currentColor" opacity="0.6" d="m 660.50757,99.288706 -1.64571,-3.53554 h -0.0342 l -1.61995,3.53554 h -0.44732 l -1.75543,-4.26226 h 0.54857 l 1.46015,3.57822 h 0.0339 l 1.58609,-3.57822 h 0.45579 l 1.62912,3.57822 h 0.0339 l 1.42628,-3.57822 h 0.53129 l -1.75507,4.26226 z"/><path fill="currentColor" opacity="0.6" d="m 665.8936,95.355586 c -1.36701,0 -1.83126,0.60748 -1.91593,1.4859 h 3.83187 c -0.042,-0.97049 -0.54045,-1.4859 -1.91594,-1.4859 m -0.0166,4.05095 c -0.81915,0 -1.35043,-0.11783 -1.77235,-0.47273 -0.49812,-0.43038 -0.6671,-1.05445 -0.6671,-1.77165 0,-0.68368 0.22824,-1.40934 0.79375,-1.82315 0.47237,-0.32879 1.0548,-0.43039 1.66229,-0.43039 0.54892,0 1.1818,0.0589 1.70462,0.41381 0.6163,0.4131 0.73483,1.13947 0.73483,1.96603 h -4.37197 c 0.0166,0.87736 0.30374,1.65453 1.95756,1.65453 0.78529,0 1.51942,-0.127 2.2031,-0.24518 v 0.44697 c -0.70908,0.12735 -1.49401,0.26176 -2.24473,0.26176"/><path fill="currentColor" opacity="0.6" d="m 669.76178,99.288706 v -4.26226 h 0.40499 l 0.0427,0.25365 c 0.90276,-0.22755 1.32468,-0.37148 2.11808,-0.37148 h 0.0593 v 0.47272 h -0.11854 c -0.66639,0 -1.07138,0.0924 -2.00801,0.33761 v 3.56976 z"/><path fill="currentColor" opacity="0.6" d="m 675.27876,95.355586 c -1.36701,0 -1.83127,0.60748 -1.91593,1.4859 h 3.83187 c -0.042,-0.97049 -0.54046,-1.4859 -1.91594,-1.4859 m -0.0166,4.05095 c -0.81915,0 -1.35043,-0.11783 -1.77235,-0.47273 -0.49848,-0.43038 -0.66711,-1.05445 -0.66711,-1.77165 0,-0.68368 0.22825,-1.40934 0.79375,-1.82315 0.47237,-0.32879 1.05481,-0.43039 1.66229,-0.43039 0.54892,0 1.18181,0.0589 1.70462,0.41381 0.61631,0.4131 0.73484,1.13947 0.73484,1.96603 h -4.37197 c 0.0166,0.87736 0.30374,1.65453 1.95756,1.65453 0.78493,0 1.51906,-0.127 2.2031,-0.24518 v 0.44697 c -0.70909,0.12735 -1.49402,0.26176 -2.24473,0.26176"/><path fill="currentColor" opacity="0.6" d="m 683.17284,95.651526 c -0.53164,-0.19438 -1.13912,-0.28751 -1.72156,-0.28751 -1.47673,0 -2.1777,0.49882 -2.1777,1.7981 0,1.23155 0.57397,1.77165 1.68769,1.77165 0.6671,0 1.44357,-0.16051 2.21157,-0.32914 z m 0.0931,3.63714 -0.0423,-0.25365 c -0.68369,0.16052 -1.62913,0.37183 -2.30435,0.37183 -0.54786,0 -1.07174,-0.0759 -1.51059,-0.43886 -0.50624,-0.4138 -0.66675,-1.08055 -0.66675,-1.80587 0,-0.75953 0.25329,-1.47743 0.94509,-1.86548 0.48119,-0.27835 1.131,-0.38806 1.72191,-0.38806 0.5909,0 1.16487,0.1016 1.76389,0.27023 v -1.94945 h 0.49812 v 6.05931 z"/><path fill="currentColor" opacity="0.6" d="m 690.97215,95.381446 c -0.6671,0 -1.44356,0.16051 -2.21156,0.33761 v 2.93652 c 0.54046,0.20249 1.13947,0.29598 1.72191,0.29598 1.47673,0 2.17699,-0.49812 2.17699,-1.79881 0,-1.22273 -0.57362,-1.7713 -1.68734,-1.7713 m 1.27424,3.64525 c -0.48119,0.27023 -1.13101,0.37994 -1.71344,0.37994 -0.63289,0 -1.26577,-0.10971 -1.90712,-0.32067 l -0.0254,0.20285 h -0.33796 v -6.05967 h 0.49812 v 2.03341 c 0.68368,-0.15098 1.60337,-0.35383 2.25319,-0.35383 0.54928,0 1.07209,0.0836 1.5106,0.4385 0.50694,0.41416 0.6671,1.08021 0.6671,1.80552 0,0.76094 -0.25365,1.47778 -0.94509,1.87395"/><path fill="currentColor" opacity="0.6" d="m 693.85227,100.92563 v -0.46355 c 0.24447,0.0247 0.47307,0.0423 0.63323,0.0423 0.61631,0 0.98707,-0.1778 1.33315,-0.878414 l 0.16051,-0.33726 -2.22779,-4.26226 h 0.57397 l 1.90747,3.67947 h 0.0335 l 1.81434,-3.67947 h 0.5655 l -2.39677,4.78578 c -0.43886,0.869254 -0.91158,1.155704 -1.78082,1.155704 -0.19439,0 -0.40499,-0.0166 -0.61631,-0.0423"/><path fill="currentColor" opacity="0.8" d="m 705.5091,96.857996 h -1.65382 v 1.49437 h 1.66194 c 1.13947,0 1.57021,-0.12736 1.57021,-0.75142 0,-0.66746 -0.59055,-0.74295 -1.57833,-0.74295 m -0.30339,-2.42217 h -1.35043 v 1.51871 h 1.35855 c 1.12254,0 1.56951,-0.13441 1.56951,-0.76765 0,-0.67451 -0.56515,-0.75106 -1.57763,-0.75106 m 2.5654,4.44817 c -0.60819,0.38806 -1.34232,0.40464 -2.68393,0.40464 h -2.52342 v -5.78097 h 2.46451 c 1.15605,0 1.86478,0.0166 2.45568,0.37147 0.42228,0.2533 0.59055,0.64135 0.59055,1.14759 0,0.60713 -0.25259,1.01283 -0.91158,1.28305 v 0.0332 c 0.74331,0.16969 1.22414,0.54928 1.22414,1.36772 0,0.55669 -0.20249,0.9197 -0.61595,1.17334"/><path fill="currentColor" opacity="0.8" d="m 713.43591,97.499666 c -0.49847,-0.0427 -1.00436,-0.0674 -1.53599,-0.0674 -0.86925,0 -1.17369,0.17709 -1.17369,0.57326 0,0.37148 0.25364,0.57433 0.92004,0.57433 0.55704,0 1.22379,-0.1263 1.78964,-0.25365 z m 0.25294,1.78894 -0.0339,-0.2533 c -0.72601,0.1778 -1.5695,0.37148 -2.31245,0.37148 -0.45615,0 -0.9451,-0.0593 -1.29152,-0.31256 -0.31997,-0.22755 -0.47237,-0.59902 -0.47237,-1.02941 0,-0.48154 0.21131,-0.92851 0.71719,-1.15605 0.44733,-0.21096 1.0467,-0.22754 1.59562,-0.22754 0.44697,0 1.04598,0.0247 1.54446,0.0589 v -0.0765 c 0,-0.6664 -0.43921,-0.88583 -1.63759,-0.88583 -0.46426,0 -1.02976,0.0247 -1.56987,0.0755 v -0.86082 c 0.59902,-0.0497 1.27459,-0.084 1.83163,-0.084 0.74224,0 1.51094,0.0593 1.98331,0.39652 0.48895,0.34643 0.58244,0.82762 0.58244,1.45979 v 2.52378 z"/><path fill="currentColor" opacity="0.8" d="m 720.19002,99.288706 v -2.35514 c 0,-0.77576 -0.39617,-1.05446 -1.10561,-1.05446 -0.52281,0 -1.1811,0.13476 -1.73848,0.27023 v 3.13937 h -1.18992 v -4.26226 h 0.97049 l 0.0423,0.27023 c 0.75071,-0.19368 1.58679,-0.38806 2.27894,-0.38806 0.52282,0 1.05481,0.0755 1.4598,0.43886 0.33725,0.30409 0.46425,0.72531 0.46425,1.3335 v 2.60773 z"/><path fill="currentColor" opacity="0.8" d="m 724.73376,99.406676 c -0.54857,0 -1.14829,-0.0755 -1.58679,-0.44697 -0.52317,-0.42227 -0.67522,-1.08867 -0.67522,-1.80693 0,-0.67451 0.21943,-1.40899 0.86924,-1.82209 0.53199,-0.34643 1.18992,-0.42193 1.87361,-0.42193 0.48965,0 0.97084,0.0339 1.50213,0.0836 v 0.91158 c -0.43075,-0.0413 -0.94545,-0.0755 -1.35855,-0.0755 -1.13136,0 -1.66264,0.35489 -1.66264,1.33385 0,0.92004 0.39652,1.31621 1.32468,1.31621 0.5401,0 1.17369,-0.10125 1.78964,-0.21943 v 0.87736 c -0.6671,0.13582 -1.39277,0.27023 -2.0761,0.27023"/><path fill="currentColor" opacity="0.8" d="m 730.3248,95.802586 c -1.13101,0 -1.62913,0.35489 -1.62913,1.32539 0,0.97084 0.48965,1.38465 1.62913,1.38465 1.12218,0 1.61148,-0.34678 1.61148,-1.31727 0,-0.9705 -0.48048,-1.39277 -1.61148,-1.39277 m 2.04223,3.15701 c -0.52317,0.35383 -1.20686,0.44697 -2.04223,0.44697 -0.85267,0 -1.536,-0.10125 -2.0507,-0.44697 -0.5909,-0.38806 -0.80222,-1.02941 -0.80222,-1.7974 0,-0.76871 0.21132,-1.41852 0.80222,-1.80658 0.5147,-0.34572 1.19803,-0.44697 2.0507,-0.44697 0.84419,0 1.51906,0.10125 2.04223,0.44697 0.5909,0.38806 0.79339,1.03787 0.79339,1.7974 0,0.76871 -0.21096,1.41852 -0.79339,1.80658"/><path fill="currentColor" opacity="0.8" d="m 740.03066,99.406676 c -0.71684,0 -1.4933,-0.11783 -2.07609,-0.59902 -0.6918,-0.57432 -0.90276,-1.46014 -0.90276,-2.41441 0,-0.8516 0.26987,-1.86443 1.17299,-2.45498 0.70026,-0.45543 1.5695,-0.54857 2.44721,-0.54857 0.64206,0 1.29999,0.0423 2.01754,0.10125 v 1.03787 c -0.6163,-0.0508 -1.37548,-0.0931 -1.96638,-0.0931 -1.64606,0 -2.34633,0.62512 -2.34633,1.95756 0,1.35996 0.64947,1.96744 1.86514,1.96744 0.79304,0 1.67922,-0.16051 2.57386,-0.34678 v 1.02941 c -0.89464,0.17815 -1.83162,0.36336 -2.78518,0.36336"/><path fill="currentColor" opacity="0.8" d="m 746.31279,95.668076 c -0.98778,0 -1.36772,0.35489 -1.44357,1.00471 h 2.86985 c -0.0342,-0.69215 -0.43921,-1.00471 -1.42628,-1.00471 m -0.1778,3.73874 c -0.70026,0 -1.33315,-0.084 -1.80587,-0.47308 -0.50624,-0.42121 -0.68368,-1.05445 -0.68368,-1.78082 0,-0.64982 0.21131,-1.37513 0.80221,-1.7974 0.52282,-0.37112 1.18992,-0.44697 1.86514,-0.44697 0.60748,0 1.32503,0.0674 1.84785,0.43039 0.68404,0.48119 0.74295,1.22414 0.75106,2.1015 h -4.05059 c 0.025,0.65016 0.37112,1.07209 1.56951,1.07209 0.7426,0 1.56951,-0.10972 2.27048,-0.21943 v 0.83538 c -0.8188,0.13546 -1.71345,0.27834 -2.56611,0.27834"/><path fill="currentColor" opacity="0.8" d="m 754.20619,99.288706 v -2.35514 c 0,-0.77576 -0.39617,-1.05446 -1.1056,-1.05446 -0.52317,0 -1.1811,0.13476 -1.73849,0.27023 v 3.13937 h -1.18992 v -4.26226 h 0.97049 l 0.0423,0.27023 c 0.75071,-0.19368 1.5868,-0.38806 2.27895,-0.38806 0.52281,0 1.0548,0.0755 1.45979,0.43886 0.33726,0.30409 0.46426,0.72531 0.46426,1.3335 v 2.60773 z"/><path fill="currentColor" opacity="0.8" d="m 758.77509,99.406676 c -0.57362,0 -1.09714,-0.16051 -1.38395,-0.60748 -0.21096,-0.3041 -0.31256,-0.71685 -0.31256,-1.29117 v -1.59561 h -0.86078 v -0.88583 h 0.86078 l 0.127,-1.29152 h 1.05481 v 1.29152 h 1.67922 v 0.88583 h -1.67922 v 1.36772 c 0,0.32914 0.025,0.60748 0.11782,0.81033 0.12665,0.2868 0.40499,0.39617 0.77647,0.39617 0.27834,0 0.6163,-0.0423 0.85231,-0.0836 v 0.8516 c -0.38806,0.0766 -0.83573,0.15205 -1.2319,0.15205"/><path fill="currentColor" opacity="0.8" d="m 761.10053,99.288706 v -4.26226 h 0.97084 l 0.0423,0.27023 c 0.78493,-0.21943 1.36702,-0.38806 2.10997,-0.38806 0.0335,0 0.0843,0 0.15134,0.008 v 1.01317 c -0.13512,-0.008 -0.29528,-0.008 -0.41346,-0.008 -0.58243,0 -1.02094,0.067 -1.67111,0.21943 v 3.14748 z"/><path fill="currentColor" opacity="0.8" d="m 768.70144,97.499666 c -0.49812,-0.0427 -1.00435,-0.0674 -1.53599,-0.0674 -0.86925,0 -1.17369,0.17709 -1.17369,0.57326 0,0.37148 0.25364,0.57433 0.92004,0.57433 0.55739,0 1.22379,-0.1263 1.78964,-0.25365 z m 0.25295,1.78894 -0.0335,-0.2533 c -0.72602,0.1778 -1.56987,0.37148 -2.31282,0.37148 -0.45578,0 -0.94509,-0.0593 -1.29152,-0.31256 -0.31996,-0.22755 -0.47236,-0.59902 -0.47236,-1.02941 0,-0.48154 0.21131,-0.92851 0.71755,-1.15605 0.44732,-0.21096 1.04633,-0.22754 1.59526,-0.22754 0.44732,0 1.04634,0.0247 1.54446,0.0589 v -0.0765 c 0,-0.6664 -0.43921,-0.88583 -1.6376,-0.88583 -0.4639,0 -1.02976,0.0247 -1.56986,0.0755 v -0.86082 c 0.59902,-0.0497 1.27459,-0.084 1.83198,-0.084 0.74224,0 1.51059,0.0593 1.98296,0.39652 0.4893,0.34643 0.58244,0.82762 0.58244,1.45979 v 2.52378 z"/><path fill="currentColor" opacity="0.8" d="m 771.42178,93.229356 h 1.18992 v 6.05931 h -1.18992 z"/></g></svg><span>Pix</span></button><button type="button" data-checkout-method="paypal" aria-pressed="false"><svg class="ansend-checkout__paypal-logo-svg" viewBox="0 0 92 24" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0, -2) scale(0.8)"><path fill="#003087" d="M19.066 6.3c-.6-3.8-3.6-6.3-7.7-6.3H3.344C2.144 0 1.044.95.844 2.15L0 23.35c-.05.6.45 1.15 1.05 1.15h4.9c.85 0 1.55-.6 1.7-1.4l1.3-8.2c.1-.8.8-1.4 1.6-1.4h1.4c4.6 0 8-2.6 8.9-7.2.6-2.9-.1-5.5-2-6.9L19.066 6.3z"/><path fill="#0079c1" d="M22.956 8.3c-.6-3.8-3.6-6.3-7.7-6.3H7.234c-1.2 0-2.3.95-2.5 2.15l-1.9 12.3c-.1.6.4 1.15 1 1.15h4.1c.85 0 1.55-.6 1.7-1.4l1.3-8.2c.1-.8.8-1.4 1.6-1.4h1.4c4.6 0 8-2.6 8.9-7.2.5-2.8-.2-5.4-2-6.8l.1.4z" style="mix-blend-mode: multiply;"/></g><text x="24" y="16" fill="#003087" font-family="'Futura', 'Trebuchet MS', sans-serif" font-weight="900" font-style="italic" font-size="16" letter-spacing="-0.5px">Pay<tspan fill="#0079c1">Pal</tspan></text></svg><span>PayPal</span></button></div>
            <div class="ansend-checkout__security"><span>${icon("lock-keyhole")} Pagamento seguro</span><a href="#" data-checkout-security>Saiba mais</a></div>
            ${cardFieldsMarkup(ids)}
            ${pixFieldsMarkup()}
            ${paypalFieldsMarkup()}
            <label class="ansend-checkout__terms"><input type="checkbox" name="accept_terms" required><span>Li e concordo com os termos da licença, os Termos de Uso e a Política de Privacidade.</span></label>
            <div class="ansend-checkout__feedback" data-checkout-feedback role="alert" aria-live="polite"></div>
            ${totalsMarkup(quote, true)}
            <button type="submit" class="ansend-checkout__pay" data-checkout-submit><span data-checkout-submit-label>Gerar Pix de ${money(quote.totalCents)}</span>${icon("lock-keyhole")}</button>
            <footer><span>Pagamento seguro via Mercado Pago</span><b>·</b><a href="#">Termos</a><b>·</b><a href="#">Privacidade</a></footer>
          </form>
          <section class="ansend-checkout__result" data-checkout-result hidden aria-live="polite"></section>
        </aside>
      </div>
    </section>`;
  }

  function renderPixResult(result) {
    const pix = result.pix || {};
    const checkout = result.checkout || {};
    return `<div class="ansend-checkout__pix-result" data-pix-attempt="${escapeHtml(result.attempt_id || "")}">
      <div class="ansend-checkout__status is-pending">${icon("clock-3")}<div><strong>Aguardando pagamento</strong><span>Atualizaremos esta tela automaticamente.</span></div></div>
      <div class="ansend-checkout__qr">${pix.qr_code_base64 ? `<img src="data:image/png;base64,${pix.qr_code_base64}" alt="QR Code Pix">` : icon("qr-code")}<strong>${money(checkout.total_cents)}</strong></div>
      <label class="ansend-checkout__field"><span>Pix copia e cola</span><textarea data-checkout-pix-code readonly>${escapeHtml(pix.qr_code || "")}</textarea></label>
      <button type="button" class="ansend-checkout__pay" data-checkout-copy-pix>${icon("copy")} Copiar código Pix</button>
      <button type="button" class="ansend-checkout__secondary" data-checkout-check-status>${icon("refresh-cw")} Verificar pagamento</button>
    </div>`;
  }

  function renderCardResult(result) {
    const approved = result.status === "approved" || result.paid;
    const rejected = ["rejected", "cancelled", "expired"].includes(result.status);
    const title = approved ? "Pagamento aprovado" : (rejected ? "Pagamento recusado" : "Pagamento em análise");
    const detail = approved ? "Sua licença já está disponível." : (rejected ? "Revise os dados do cartão ou use outro método." : "Você pode acompanhar a confirmação nesta tela.");
    return `<div class="ansend-checkout__card-result"><div class="ansend-checkout__status ${approved ? "is-approved" : (rejected ? "is-rejected" : "is-pending")}">${icon(approved ? "badge-check" : (rejected ? "circle-x" : "clock-3"))}<div><strong>${title}</strong><span>${detail}</span></div></div>${approved ? `<button type="button" class="ansend-checkout__pay" data-checkout-finish>Ver minhas compras</button>` : (rejected ? `<button type="button" class="ansend-checkout__secondary" data-checkout-retry>Tentar novamente</button>` : `<button type="button" class="ansend-checkout__secondary" data-checkout-check-status>Verificar pagamento</button>`)}</div>`;
  }

  let active = null;

  function authHeaders(checkoutState = active) {
    const token = checkoutState?.options?.accessToken || "";
    return { "Content-Type": "application/json; charset=utf-8", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  }

  function updateQuote(quote, checkoutState = active) {
    if (!checkoutState || !quote) return;
    const previousTotalCents = Number(checkoutState.quote?.totalCents || 0);
    checkoutState.quote = {
      subtotalCents: Number(quote.subtotal_cents ?? quote.subtotalCents ?? 0),
      serviceFeeCents: Number(quote.service_fee_cents ?? quote.serviceFeeCents ?? 0),
      discountCents: Number(quote.discount_cents ?? quote.discountCents ?? 0),
      totalCents: Number(quote.total_cents ?? quote.totalCents ?? 0),
    };
    checkoutState.root.querySelectorAll("[data-checkout-subtotal]").forEach((el) => { el.textContent = money(checkoutState.quote.subtotalCents); });
    checkoutState.root.querySelectorAll("[data-checkout-fee]").forEach((el) => { el.textContent = money(checkoutState.quote.serviceFeeCents); });
    checkoutState.root.querySelectorAll("[data-checkout-discount]").forEach((el) => { el.textContent = `− ${money(checkoutState.quote.discountCents)}`; });
    checkoutState.root.querySelectorAll("[data-checkout-discount-row]").forEach((el) => { el.hidden = !checkoutState.quote.discountCents; });
    checkoutState.root.querySelectorAll("[data-checkout-total]").forEach((el) => { el.textContent = money(checkoutState.quote.totalCents); });
    const label = checkoutState.root.querySelector("[data-checkout-submit-label]");
    if (label) {
      if (checkoutState.method === "pix") {
        label.textContent = `Gerar Pix de ${money(checkoutState.quote.totalCents)}`;
      } else if (checkoutState.method === "paypal") {
        label.textContent = `Pagar com PayPal`;
      } else {
        label.textContent = `Pagar ${money(checkoutState.quote.totalCents)}`;
      }
    }
    refreshCardFormForQuote(previousTotalCents, checkoutState);
  }

  async function requestQuote(couponCode = "", checkoutState = active) {
    const response = await fetch("/api/checkout/quote", { method: "POST", headers: authHeaders(checkoutState), body: JSON.stringify({ cart_items: checkoutState.options.cartItems, coupon_code: couponCode }) });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || "Não foi possível atualizar os valores.");
    if (active === checkoutState) updateQuote(result.quote, checkoutState);
    return result;
  }

  async function applyCoupon() {
    const input = active.root.querySelector('[name="coupon_code"]');
    const message = active.root.querySelector("[data-checkout-coupon-message]");
    try {
      const result = await requestQuote(input?.value.trim().toUpperCase() || "");
      active.couponCode = result.quote?.coupon?.code || "";
      message.textContent = active.couponCode ? `Cupom ${active.couponCode} aplicado.` : "Cupom removido.";
      message.dataset.state = "success";
    } catch (error) {
      message.textContent = error.message;
      message.dataset.state = "error";
    }
  }

  function setPaymentMethod(method) {
    if (!active || !["card", "pix", "paypal"].includes(method)) return;
    if (method === "card" && active.config && !active.config.supported_methods?.includes("card")) return;
    active.method = method;
    active.root.dataset.checkoutMethod = method;
    active.root.querySelectorAll("[data-checkout-method]").forEach((button) => {
      const selected = button.dataset.checkoutMethod === method;
      button.classList.toggle("is-active", selected);
      button.setAttribute(button.getAttribute("role") === "tab" ? "aria-selected" : "aria-pressed", String(selected));
    });
    active.root.querySelectorAll("[data-checkout-panel]").forEach((panel) => { panel.hidden = panel.dataset.checkoutPanel !== method; });
    updateQuote(active.quote);
  }

  function setBusy(busy, text = "Processando...", checkoutState = active) {
    const button = checkoutState?.root?.querySelector("[data-checkout-submit]");
    if (!button) return;
    button.disabled = busy;
    button.dataset.loading = String(busy);
    if (busy) button.querySelector("span").textContent = text;
    else updateQuote(checkoutState.quote, checkoutState);
  }

  function loadMercadoPagoSdk() {
    if (typeof global.MercadoPago === "function") return Promise.resolve();
    if (global.__ansendMercadoPagoSdkPromise) return global.__ansendMercadoPagoSdkPromise;
    global.__ansendMercadoPagoSdkPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src="https://sdk.mercadopago.com/js/v2"]');
      const script = existing || document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Não foi possível carregar o SDK seguro do Mercado Pago."));
      if (!existing) document.head.appendChild(script);
    });
    return global.__ansendMercadoPagoSdkPromise;
  }

  function buyerPayload(form, checkoutState = active) {
    const data = new FormData(form);
    const pix = checkoutState.method === "pix";
    return {
      name: String(data.get(pix ? "pix_name" : "cardholder_name") || "").trim(),
      email: String(data.get(pix ? "pix_email" : "buyer_email") || "").trim(),
      identification: { type: "CPF", number: String(data.get(pix ? "pix_identification" : "identification_number") || "").replace(/\D/g, "") },
      phone: pix ? String(data.get("pix_phone") || "").replace(/\D/g, "") : undefined,
    };
  }

  async function createPayment(methodData = {}, checkoutState = active) {
    if (!checkoutState || active !== checkoutState) throw new Error("Checkout indisponível.");
    const form = checkoutState.root.querySelector("form");
    const feedback = checkoutState.root.querySelector("[data-checkout-feedback]");
    if (!form.querySelector('[name="accept_terms"]')?.checked) throw new Error("Aceite os termos para continuar.");
    if (active.method === "paypal") {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockResult = {
        success: true,
        attempt_id: "paypal-" + (global.crypto?.randomUUID?.() || Date.now()),
        status: "approved",
        paid: true,
      };
      active.attemptId = mockResult.attempt_id;
      const resultPanel = active.root.querySelector("[data-checkout-result]");
      form.hidden = true;
      resultPanel.hidden = false;
      resultPanel.innerHTML = renderCardResult(mockResult);
      active.options.refreshIcons?.();
      if (active.options.onPaid) active.options.onPaid(mockResult);
      if (feedback) feedback.textContent = "";
      return mockResult;
    }
    const response = await fetch("/api/checkout/payment", {
      method: "POST",
      headers: authHeaders(checkoutState),
      body: JSON.stringify({ method: checkoutState.method, cart_items: checkoutState.options.cartItems, coupon_code: checkoutState.couponCode || "", buyer: buyerPayload(form, checkoutState), method_data: methodData, idempotency_key: checkoutState.idempotencyKey }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || "Não foi possível processar o pagamento.");
    if (active !== checkoutState) return result;
    checkoutState.attemptId = result.attempt_id;
    const resultPanel = checkoutState.root.querySelector("[data-checkout-result]");
    form.hidden = true;
    resultPanel.hidden = false;
    resultPanel.innerHTML = checkoutState.method === "pix" ? renderPixResult(result) : renderCardResult(result);
    teardownActiveCheckout(checkoutState, { invalidate: false });
    checkoutState.options.refreshIcons?.();
    if (result.paid || result.status === "approved") checkoutState.options.onPaid?.(result);
    if (feedback) feedback.textContent = "";
    return result;
  }

  function removeInstallmentOutsideListener(checkoutState = active) {
    if (!checkoutState?.installmentOutsidePointerHandler) return;
    if (typeof document !== "undefined") document.removeEventListener("pointerdown", checkoutState.installmentOutsidePointerHandler);
    checkoutState.installmentOutsidePointerHandler = null;
  }

  function closeInstallmentPopover(checkoutState = active) {
    removeInstallmentOutsideListener(checkoutState);
    const trigger = checkoutState?.root?.querySelector("[data-checkout-installment-trigger]");
    const popover = checkoutState?.root?.querySelector("[data-checkout-installment-popover]");
    if (!trigger || !popover) return;
    popover.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  function setActiveInstallmentOption(option, checkoutState = active) {
    const list = checkoutState?.root?.querySelector("[data-checkout-installment-list]");
    if (!list) return;
    Array.from(list.querySelectorAll('[role="option"]')).forEach((item) => {
      const activeOption = item === option;
      item.tabIndex = activeOption ? 0 : -1;
      if (activeOption) list.setAttribute("aria-activedescendant", item.id || "");
    });
  }

  function focusInstallmentOption(option, checkoutState = active) {
    if (!option) return;
    setActiveInstallmentOption(option, checkoutState);
    option.focus();
  }

  function openInstallmentPopover(checkoutState = active) {
    const trigger = checkoutState?.root?.querySelector("[data-checkout-installment-trigger]");
    const popover = checkoutState?.root?.querySelector("[data-checkout-installment-popover]");
    const list = checkoutState?.root?.querySelector("[data-checkout-installment-list]");
    if (!trigger || !popover || !list || trigger.disabled) return;
    popover.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    if (!checkoutState.installmentOutsidePointerHandler) {
      checkoutState.installmentOutsidePointerHandler = (event) => {
        if (!checkoutState.root?.querySelector(".ansend-checkout__installment-field")?.contains(event.target)) closeInstallmentPopover(checkoutState);
      };
      document.addEventListener("pointerdown", checkoutState.installmentOutsidePointerHandler);
    }
    const selected = list.querySelector('[role="option"][aria-selected="true"]');
    focusInstallmentOption(selected || list.querySelector('[role="option"]'), checkoutState);
  }

  function syncInstallmentSelector(checkoutState = active) {
    const provider = checkoutState?.root?.querySelector("[data-checkout-provider-installments]");
    const trigger = checkoutState?.root?.querySelector("[data-checkout-installment-trigger]");
    const list = checkoutState?.root?.querySelector("[data-checkout-installment-list]");
    if (!provider || !trigger || !list) return;
    if (checkoutState?.installmentFetchCount > 0) {
      trigger.disabled = true;
      trigger.textContent = "Calculando parcelas no Mercado Pago…";
      closeInstallmentPopover(checkoutState);
      return;
    }
    const options = Array.from(provider.options || []).filter((option) => option.value && option.textContent.trim());
    if (!options.length) {
      list.innerHTML = "";
      trigger.disabled = true;
      trigger.textContent = "Digite o cartão para calcular";
      closeInstallmentPopover(checkoutState);
      return;
    }
    const selectedValue = String(provider.value || "");
    list.innerHTML = options.map((option, index) => {
      const rawLabel = option.textContent.replace(/\s+/g, " ").trim();
      const label = formatProviderInstallmentLabel(parseProviderInstallmentLabel(rawLabel)) || rawLabel;
      const selected = String(option.value) === selectedValue;
      const optionId = `${provider.id}-visible-option-${index}`;
      return `<button type="button" id="${escapeHtml(optionId)}" role="option" data-checkout-installment-value="${escapeHtml(option.value)}" aria-selected="${selected}" tabindex="-1">${escapeHtml(label)}</button>`;
    }).join("");
    const selectedOption = options.find((option) => String(option.value) === selectedValue);
    const rawLabel = selectedOption?.textContent.replace(/\s+/g, " ").trim() || "";
    trigger.textContent = rawLabel
      ? (formatProviderInstallmentLabel(parseProviderInstallmentLabel(rawLabel)) || rawLabel)
      : "Selecione as parcelas";
    trigger.disabled = false;
    const visibleSelected = list.querySelector('[role="option"][aria-selected="true"]') || list.querySelector('[role="option"]');
    setActiveInstallmentOption(visibleSelected, checkoutState);
  }

  function disconnectInstallmentObserver(checkoutState = active) {
    checkoutState?.installmentObserver?.disconnect();
    if (checkoutState) checkoutState.installmentObserver = null;
  }

  function observeInstallmentOptions(checkoutState = active) {
    disconnectInstallmentObserver(checkoutState);
    const provider = checkoutState?.root?.querySelector("[data-checkout-provider-installments]");
    if (!provider || typeof global.MutationObserver !== "function") {
      syncInstallmentSelector(checkoutState);
      return;
    }
    checkoutState.installmentObserver = new global.MutationObserver(() => syncInstallmentSelector(checkoutState));
    checkoutState.installmentObserver.observe(provider, { childList: true, subtree: true, characterData: true });
    syncInstallmentSelector(checkoutState);
  }

  function selectProviderInstallment(value, checkoutState = active) {
    const provider = checkoutState?.root?.querySelector("[data-checkout-provider-installments]");
    if (!provider) return;
    provider.value = value;
    provider.dispatchEvent(new Event("change", { bubbles: true }));
    syncInstallmentSelector(checkoutState);
    closeInstallmentPopover(checkoutState);
  }

  function teardownActiveCheckout(checkoutState = active, { invalidate = false } = {}) {
    if (!checkoutState) return;
    closeInstallmentPopover(checkoutState);
    disconnectInstallmentObserver(checkoutState);
    checkoutState.cardForm?.unmount?.();
    checkoutState.cardForm?.destroy?.();
    checkoutState.cardForm = null;
    checkoutState.cardFormAmountCents = 0;
    checkoutState.installmentFetchCount = 0;
    if (invalidate && active === checkoutState) active = null;
  }

  function initCardForm() {
    if (!active?.config?.public_key || typeof global.MercadoPago !== "function") return;
    if (active.cardForm) return;
    const checkoutState = active;
    const mp = new global.MercadoPago(checkoutState.config.public_key, { locale: "pt-BR" });
    checkoutState.cardForm = mp.cardForm({
      amount: String((checkoutState.quote.totalCents / 100).toFixed(2)),
      iframe: true,
      form: {
        id: checkoutState.formIds.form,
        cardNumber: { id: checkoutState.formIds.cardNumber, placeholder: "Número do cartão" },
        expirationDate: { id: checkoutState.formIds.expiration, placeholder: "MM/AA" },
        securityCode: { id: checkoutState.formIds.cvv, placeholder: "CVV" },
        cardholderName: { id: checkoutState.formIds.cardholderName },
        identificationNumber: { id: checkoutState.formIds.identification },
        issuer: { id: checkoutState.formIds.issuer, placeholder: "Detectado pelo cartão" },
        installments: { id: checkoutState.formIds.installments },
      },
      style: {
        customVariables: {
          inputColor: "#ffffff",
          inputFontFamily: "Segoe UI, sans-serif",
          inputFontSize: "13px",
          inputFontWeight: "500",
          placeholderColor: "rgba(255, 255, 255, 0.7)",
        }
      },
      callbacks: {
        onFormMounted(error) {
          if (active !== checkoutState) return;
          if (error) checkoutState.root.querySelector("[data-checkout-feedback]").textContent = "Não foi possível carregar os campos seguros do cartão.";
          else observeInstallmentOptions(checkoutState);
        },
        async onSubmit(event) {
          event.preventDefault();
          if (active !== checkoutState) return;
          const data = checkoutState.cardForm.getCardFormData();
          setBusy(true, "Processando...", checkoutState);
          try {
            await createPayment({ token: data.token, payment_method_id: data.paymentMethodId, issuer_id: data.issuerId, installments: Number(data.installments || 1) }, checkoutState);
          } catch (error) {
            if (active !== checkoutState) return;
            checkoutState.root.querySelector("[data-checkout-feedback]").textContent = error.message;
            setBusy(false, "Processando...", checkoutState);
          }
        },
        onFetching(resource) {
          if (active !== checkoutState) return () => {};
          const feedback = checkoutState.root.querySelector("[data-checkout-feedback]");
          const fetchingInstallments = /installment|issuer|paymentMethod/i.test(String(resource || ""));
          if (fetchingInstallments) checkoutState.installmentFetchCount += 1;
          const message = fetchingInstallments ? "Buscando parcelas disponíveis..." : "Carregando dados seguros do cartão...";
          if (checkoutState.method === "card") feedback.textContent = message;
          const trigger = checkoutState.root.querySelector("[data-checkout-installment-trigger]");
          if (fetchingInstallments && trigger) {
            trigger.disabled = true;
            trigger.textContent = "Calculando parcelas no Mercado Pago…";
            closeInstallmentPopover(checkoutState);
          }
          let completed = false;
          return () => {
            if (completed) return;
            completed = true;
            if (feedback.textContent === message) feedback.textContent = "";
            if (fetchingInstallments) {
              checkoutState.installmentFetchCount = Math.max(0, checkoutState.installmentFetchCount - 1);
              if (active === checkoutState && checkoutState.installmentFetchCount === 0) syncInstallmentSelector(checkoutState);
            }
          };
        },
      },
    });
    checkoutState.cardFormAmountCents = checkoutState.quote.totalCents;
  }

  function refreshCardFormForQuote(previousTotalCents, checkoutState = active) {
    if (!checkoutState?.cardForm || Number(previousTotalCents) === Number(checkoutState.quote.totalCents)) return;
    teardownActiveCheckout(checkoutState, { invalidate: false });
    for (const selector of ["[data-checkout-card-number]", "[data-checkout-card-expiration]", "[data-checkout-card-cvv]"]) {
      const field = checkoutState.root.querySelector(selector);
      if (field) field.replaceWith(field.cloneNode(false));
    }
    for (const selector of ["[data-checkout-provider-issuer]", "[data-checkout-provider-installments]"]) {
      const select = checkoutState.root.querySelector(selector);
      if (select) select.innerHTML = selector.includes("issuer")
        ? '<option value="">Detectado pelo cartão</option>'
        : '<option value="">Selecione</option>';
    }
    checkoutState.root.querySelectorAll('input[name="MPHiddenInputToken"]').forEach((input) => input.remove());
    if (active === checkoutState) initCardForm();
  }

  async function checkStatus() {
    if (!active?.attemptId) return;
    const response = await fetch("/api/checkout/status", { method: "POST", headers: authHeaders(), body: JSON.stringify({ attempt_id: active.attemptId }) });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || "Não foi possível verificar o pagamento.");
    if (result.paid) {
      active.root.querySelector("[data-checkout-result]").innerHTML = renderCardResult({ ...result, status: "approved" });
      active.options.onPaid?.(result);
      active.options.refreshIcons?.();
    }
  }

  function bind() {
    const checkoutState = active;
    const root = checkoutState.root;
    root.addEventListener("click", async (event) => {
      if (active !== checkoutState) return;
      const target = event.target.closest("button, a");
      if (!target) return;
      if (target.matches("[data-checkout-installment-trigger]")) {
        const popover = root.querySelector("[data-checkout-installment-popover]");
        const opening = popover.hidden;
        if (opening) openInstallmentPopover(checkoutState);
        else closeInstallmentPopover(checkoutState);
        return;
      }
      if (target.matches("[data-checkout-installment-value]")) {
        selectProviderInstallment(target.dataset.checkoutInstallmentValue, checkoutState);
        root.querySelector("[data-checkout-installment-trigger]")?.focus();
        return;
      }
      if (target.matches("[data-checkout-close]")) {
        teardownActiveCheckout(checkoutState, { invalidate: true });
        checkoutState?.options.onClose?.();
      }
      if (target.matches("[data-checkout-method]")) setPaymentMethod(target.dataset.checkoutMethod);
      if (target.matches("[data-checkout-coupon-toggle]")) root.querySelector(".ansend-checkout__coupon-form").hidden = false;
      if (target.matches("[data-checkout-coupon-apply]")) await applyCoupon();
      if (target.matches("[data-checkout-remove]")) checkoutState.options.onRemove?.(target.dataset.checkoutRemove);
      if (target.matches("[data-checkout-open-beat]")) checkoutState.options.onOpenBeat?.(target.dataset.checkoutOpenBeat);
      if (target.matches("[data-checkout-promoted-prev], [data-checkout-promoted-next]")) {
        const track = root.querySelector("[data-checkout-promoted-track]");
        const direction = target.matches("[data-checkout-promoted-prev]") ? -1 : 1;
        if (track) track.scrollBy({ left: direction * Math.max(180, track.clientWidth * 0.82), behavior: "smooth" });
      }
      if (target.matches("[data-checkout-copy-pix]")) {
        const code = root.querySelector("[data-checkout-pix-code]")?.value || "";
        if (code) await navigator.clipboard.writeText(code);
        target.textContent = "Código copiado";
      }
      if (target.matches("[data-checkout-check-status]")) {
        try { await checkStatus(); } catch (error) { target.insertAdjacentHTML("afterend", `<p class="ansend-checkout__inline-error">${escapeHtml(error.message)}</p>`); }
      }
      if (target.matches("[data-checkout-retry]")) {
        checkoutState.idempotencyKey = global.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
        checkoutState.attemptId = "";
        root.querySelector("form").hidden = false;
        root.querySelector("[data-checkout-result]").hidden = true;
        setBusy(false, "Processando...", checkoutState);
        if (checkoutState.method === "card" && !checkoutState.cardForm) initCardForm();
      }
      if (target.matches("[data-checkout-finish]")) {
        teardownActiveCheckout(checkoutState, { invalidate: true });
        checkoutState?.options.onFinish?.();
      }
      if (target.matches(".ansend-checkout__recommendation-card-download-btn")) {
        checkoutState?.options.onDownloadDemo?.(target.dataset.id);
      }
      if (target.matches("[data-checkout-finish]")) {
        teardownActiveCheckout(checkoutState, { invalidate: true });
        checkoutState?.options.onFinish?.();
      }
    });
    root.addEventListener("keydown", (event) => {
      if (active !== checkoutState) return;
      const trigger = event.target.closest("[data-checkout-installment-trigger]");
      const option = event.target.closest("[data-checkout-installment-value]");
      if (!trigger && !option) return;
      const options = Array.from(root.querySelectorAll('[data-checkout-installment-list] [role="option"]'));
      if (event.key === "Escape") {
        event.preventDefault();
        closeInstallmentPopover(checkoutState);
        root.querySelector("[data-checkout-installment-trigger]")?.focus();
        return;
      }
      if (event.key === "Tab") {
        closeInstallmentPopover(checkoutState);
        return;
      }
      if (trigger && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        trigger.click();
        return;
      }
      if (trigger && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
        openInstallmentPopover(checkoutState);
        return;
      }
      if (option && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        selectProviderInstallment(option.dataset.checkoutInstallmentValue, checkoutState);
        root.querySelector("[data-checkout-installment-trigger]")?.focus();
        return;
      }
      if (option && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
        const index = options.indexOf(option);
        const direction = event.key === "ArrowDown" ? 1 : -1;
        focusInstallmentOption(options[(index + direction + options.length) % options.length], checkoutState);
      }
    });
    root.addEventListener("focusout", (event) => {
      if (active !== checkoutState) return;
      const field = event.target.closest(".ansend-checkout__installment-field");
      if (field && !field.contains(event.relatedTarget)) closeInstallmentPopover(checkoutState);
    });
    root.querySelector("form").addEventListener("submit", async (event) => {
      if (active !== checkoutState) return;
      if (checkoutState.method === "card" && checkoutState.cardForm) return;
      event.preventDefault();
      let loadingText = "Processando...";
      if (checkoutState.method === "pix") loadingText = "Gerando Pix...";
      if (checkoutState.method === "paypal") loadingText = "Redirecionando...";
      setBusy(true, loadingText, checkoutState);
      try { await createPayment({}, checkoutState); }
      catch (error) { root.querySelector("[data-checkout-feedback]").textContent = error.message; setBusy(false, "Processando...", checkoutState); }
    });
  }

  async function open(options) {
    teardownActiveCheckout(active, { invalidate: true });
    const instanceId = global.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
    const formIds = checkoutFormIds(instanceId);
    const markup = renderCheckout({ ...options, instanceId });
    if (options.mountTarget) {
      options.mountTarget.innerHTML = markup;
    } else if (typeof options.openModal === "function") {
      options.openModal(markup);
    } else {
      throw new Error("Destino do checkout não informado.");
    }
    const root = options.mountTarget?.querySelector("[data-ansend-checkout]") || document.querySelector("[data-ansend-checkout]");
    if (!root) return null;
    active = { root, options, formIds, method: "pix", quote: options.quote, couponCode: "", attemptId: "", idempotencyKey: global.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, cardFormAmountCents: 0, installmentFetchCount: 0, installmentOutsidePointerHandler: null };
    const checkoutState = active;
    root.querySelector("[data-checkout-buyer-email]").value = options.prefillEmail || "";
    root.querySelector('[name="pix_email"]').value = options.prefillEmail || "";
    root.querySelector('[name="pix_name"]').value = options.prefillName || "";
    root.querySelector("[data-checkout-cardholder-name]").value = options.prefillName || "";
    bind();
    options.refreshIcons?.();
    try {
      const [configResponse] = await Promise.all([fetch("/api/checkout/config", { headers: authHeaders(checkoutState) }), requestQuote("", checkoutState)]);
      if (active !== checkoutState) return checkoutState;
      checkoutState.config = await configResponse.json();
      const cardButtons = root.querySelectorAll('[data-checkout-method="card"]');
      if (!checkoutState.config.supported_methods?.includes("card")) {
        cardButtons.forEach((button) => { button.hidden = true; });
        setPaymentMethod("pix");
      } else {
        await loadMercadoPagoSdk();
        if (active === checkoutState) initCardForm();
      }
    } catch (error) {
      if (active === checkoutState) {
        root.querySelector("[data-checkout-feedback]").textContent = error.message;
        setPaymentMethod("pix");
      }
    }
    return checkoutState;
  }

  const api = { open, renderCheckout, renderPixResult, renderCardResult, setPaymentMethod, applyCoupon, money, parseProviderInstallmentLabel, formatProviderInstallmentLabel };
  global.AnsendCheckout = api;
  if (typeof window !== "undefined") window.AnsendCheckout = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
