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

  function recommendationMarkup(item) {
    if (!item) return "";
    return `<section class="ansend-checkout__recommendations" aria-labelledby="checkout-recommendations-title">
      <h3 id="checkout-recommendations-title">Recomendado para você</h3>
      <article class="ansend-checkout__recommendation" data-checkout-recommendation="${escapeHtml(item.id)}">
        <img src="${escapeHtml(item.cover || "assets/ansend-logo-square.png")}" alt="Capa de ${escapeHtml(item.title)}" loading="lazy">
        <div><span>${item.sponsored ? "ANSEND ADS" : escapeHtml(item.producer || "ANSEND")}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description || "Conheça este beat")}</small></div>
        <div class="ansend-checkout__recommendation-price">${item.originalPrice ? `<s>${escapeHtml(item.originalPrice)}</s>` : ""}<strong>${escapeHtml(item.price || "Ver licença")}</strong></div>
        <button type="button" data-checkout-open-beat="${escapeHtml(item.id)}" aria-label="Abrir ${escapeHtml(item.title)}">${icon("chevron-right")}</button>
      </article>
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
      <div class="ansend-checkout__field"><span id="${escapeHtml(ids.cardNumber)}-label">Número do cartão</span><div class="ansend-checkout__field-wrapper"><div id="${escapeHtml(ids.cardNumber)}" class="ansend-checkout__secure-field" data-checkout-card-number aria-labelledby="${escapeHtml(ids.cardNumber)}-label"></div><div class="ansend-checkout__card-brands"><img src="assets/payment/visa.svg" alt="Visa" class="ansend-checkout__brand-logo"><img src="assets/payment/mastercard.svg" alt="Mastercard" class="ansend-checkout__brand-logo"><img src="assets/payment/stripe.svg" alt="Stripe" class="ansend-checkout__brand-logo"></div></div></div>
      <div class="ansend-checkout__field-pair">
        <div class="ansend-checkout__field"><span id="${escapeHtml(ids.expiration)}-label">Validade</span><div id="${escapeHtml(ids.expiration)}" class="ansend-checkout__secure-field" data-checkout-card-expiration aria-labelledby="${escapeHtml(ids.expiration)}-label"></div></div>
        <div class="ansend-checkout__field"><span id="${escapeHtml(ids.cvv)}-label">Código de segurança</span><div id="${escapeHtml(ids.cvv)}" class="ansend-checkout__secure-field" data-checkout-card-cvv aria-labelledby="${escapeHtml(ids.cvv)}-label"></div></div>
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
            ${recommendationMarkup(options.recommendation)}
          </div>
        </section>
        <aside class="ansend-checkout__payment">
          <form id="${escapeHtml(ids.form)}" class="ansend-checkout__form" novalidate>
            <div class="ansend-checkout__tabs" role="tablist" aria-label="Forma de pagamento"><button type="button" data-checkout-method="card" role="tab" aria-selected="false">Pagar com cartão</button><button type="button" class="is-active" data-checkout-method="pix" role="tab" aria-selected="true">Pagar com Pix</button>${unavailableMethodMarkup("paypal", ["Pay", "Pal"].join(""))}</div>
            <div class="ansend-checkout__methods" aria-label="Métodos disponíveis"><button type="button" data-checkout-method="card" aria-pressed="false">${icon("credit-card")}<span>Cartão</span></button><button type="button" class="is-active" data-checkout-method="pix" aria-pressed="true"><img class="ansend-checkout__pix-logo" src="assets/payment/pix-user.png" alt="Pix"><span>Pix</span></button>${unavailableMethodMarkup("apple-pay", ["Apple", " Pay"].join(""))}${unavailableMethodMarkup("google-pay", ["Google", " Pay"].join(""))}${unavailableMethodMarkup("alipay", ["Ali", "pay"].join(""))}</div>
            <div class="ansend-checkout__security"><span>${icon("lock-keyhole")} Pagamento seguro</span><a href="#" data-checkout-security>Saiba mais</a></div>
            ${cardFieldsMarkup(ids)}
            ${pixFieldsMarkup()}
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

  function authHeaders() {
    const token = active?.options?.accessToken || "";
    return { "Content-Type": "application/json; charset=utf-8", ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  }

  function updateQuote(quote) {
    if (!active || !quote) return;
    const previousTotalCents = Number(active.quote?.totalCents || 0);
    active.quote = {
      subtotalCents: Number(quote.subtotal_cents ?? quote.subtotalCents ?? 0),
      serviceFeeCents: Number(quote.service_fee_cents ?? quote.serviceFeeCents ?? 0),
      discountCents: Number(quote.discount_cents ?? quote.discountCents ?? 0),
      totalCents: Number(quote.total_cents ?? quote.totalCents ?? 0),
    };
    active.root.querySelectorAll("[data-checkout-subtotal]").forEach((el) => { el.textContent = money(active.quote.subtotalCents); });
    active.root.querySelectorAll("[data-checkout-fee]").forEach((el) => { el.textContent = money(active.quote.serviceFeeCents); });
    active.root.querySelectorAll("[data-checkout-discount]").forEach((el) => { el.textContent = `− ${money(active.quote.discountCents)}`; });
    active.root.querySelectorAll("[data-checkout-discount-row]").forEach((el) => { el.hidden = !active.quote.discountCents; });
    active.root.querySelectorAll("[data-checkout-total]").forEach((el) => { el.textContent = money(active.quote.totalCents); });
    const label = active.root.querySelector("[data-checkout-submit-label]");
    if (label) label.textContent = active.method === "pix" ? `Gerar Pix de ${money(active.quote.totalCents)}` : `Pagar ${money(active.quote.totalCents)}`;
    refreshCardFormForQuote(previousTotalCents);
  }

  async function requestQuote(couponCode = "") {
    const response = await fetch("/api/checkout/quote", { method: "POST", headers: authHeaders(), body: JSON.stringify({ cart_items: active.options.cartItems, coupon_code: couponCode }) });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || "Não foi possível atualizar os valores.");
    updateQuote(result.quote);
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
    if (!active || !["card", "pix"].includes(method)) return;
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

  function setBusy(busy, text = "Processando...") {
    const button = active?.root?.querySelector("[data-checkout-submit]");
    if (!button) return;
    button.disabled = busy;
    button.dataset.loading = String(busy);
    if (busy) button.querySelector("span").textContent = text;
    else updateQuote(active.quote);
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

  function buyerPayload(form) {
    const data = new FormData(form);
    const pix = active.method === "pix";
    return {
      name: String(data.get(pix ? "pix_name" : "cardholder_name") || "").trim(),
      email: String(data.get(pix ? "pix_email" : "buyer_email") || "").trim(),
      identification: { type: "CPF", number: String(data.get(pix ? "pix_identification" : "identification_number") || "").replace(/\D/g, "") },
      phone: pix ? String(data.get("pix_phone") || "").replace(/\D/g, "") : undefined,
    };
  }

  async function createPayment(methodData = {}) {
    const form = active.root.querySelector("form");
    const feedback = active.root.querySelector("[data-checkout-feedback]");
    if (!form.querySelector('[name="accept_terms"]')?.checked) throw new Error("Aceite os termos para continuar.");
    const response = await fetch("/api/checkout/payment", {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ method: active.method, cart_items: active.options.cartItems, coupon_code: active.couponCode || "", buyer: buyerPayload(form), method_data: methodData, idempotency_key: active.idempotencyKey }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.error || "Não foi possível processar o pagamento.");
    active.attemptId = result.attempt_id;
    const resultPanel = active.root.querySelector("[data-checkout-result]");
    form.hidden = true;
    resultPanel.hidden = false;
    resultPanel.innerHTML = active.method === "pix" ? renderPixResult(result) : renderCardResult(result);
    active.options.refreshIcons?.();
    if (result.paid || result.status === "approved") active.options.onPaid?.(result);
    if (feedback) feedback.textContent = "";
    return result;
  }

  function closeInstallmentPopover() {
    const trigger = active?.root?.querySelector("[data-checkout-installment-trigger]");
    const popover = active?.root?.querySelector("[data-checkout-installment-popover]");
    if (!trigger || !popover) return;
    popover.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  function syncInstallmentSelector() {
    const provider = active?.root?.querySelector("[data-checkout-provider-installments]");
    const trigger = active?.root?.querySelector("[data-checkout-installment-trigger]");
    const list = active?.root?.querySelector("[data-checkout-installment-list]");
    if (!provider || !trigger || !list) return;
    if (active?.installmentFetchCount > 0) {
      trigger.disabled = true;
      trigger.textContent = "Calculando parcelas no Mercado Pago…";
      closeInstallmentPopover();
      return;
    }
    const options = Array.from(provider.options || []).filter((option) => option.value && option.textContent.trim());
    if (!options.length) {
      list.innerHTML = "";
      trigger.disabled = true;
      trigger.textContent = "Digite o cartão para calcular";
      closeInstallmentPopover();
      return;
    }
    const selectedValue = String(provider.value || "");
    list.innerHTML = options.map((option) => {
      const rawLabel = option.textContent.replace(/\s+/g, " ").trim();
      const label = formatProviderInstallmentLabel(parseProviderInstallmentLabel(rawLabel)) || rawLabel;
      const selected = String(option.value) === selectedValue;
      return `<button type="button" role="option" data-checkout-installment-value="${escapeHtml(option.value)}" aria-selected="${selected}">${escapeHtml(label)}</button>`;
    }).join("");
    const selectedOption = options.find((option) => String(option.value) === selectedValue);
    const rawLabel = selectedOption?.textContent.replace(/\s+/g, " ").trim() || "";
    trigger.textContent = rawLabel
      ? (formatProviderInstallmentLabel(parseProviderInstallmentLabel(rawLabel)) || rawLabel)
      : "Selecione as parcelas";
    trigger.disabled = false;
  }

  function disconnectInstallmentObserver() {
    active?.installmentObserver?.disconnect();
    if (active) active.installmentObserver = null;
  }

  function observeInstallmentOptions() {
    disconnectInstallmentObserver();
    const provider = active?.root?.querySelector("[data-checkout-provider-installments]");
    if (!provider || typeof global.MutationObserver !== "function") {
      syncInstallmentSelector();
      return;
    }
    active.installmentObserver = new global.MutationObserver(syncInstallmentSelector);
    active.installmentObserver.observe(provider, { childList: true, subtree: true, characterData: true });
    syncInstallmentSelector();
  }

  function selectProviderInstallment(value) {
    const provider = active?.root?.querySelector("[data-checkout-provider-installments]");
    if (!provider) return;
    provider.value = value;
    provider.dispatchEvent(new Event("change", { bubbles: true }));
    syncInstallmentSelector();
    closeInstallmentPopover();
  }

  function initCardForm() {
    if (!active?.config?.public_key || typeof global.MercadoPago !== "function") return;
    if (active.cardForm) return;
    const checkoutState = active;
    const mp = new global.MercadoPago(active.config.public_key, { locale: "pt-BR" });
    active.cardForm = mp.cardForm({
      amount: String((active.quote.totalCents / 100).toFixed(2)),
      iframe: true,
      form: {
        id: active.formIds.form,
        cardNumber: { id: active.formIds.cardNumber, placeholder: "Número do cartão" },
        expirationDate: { id: active.formIds.expiration, placeholder: "MM/AA" },
        securityCode: { id: active.formIds.cvv, placeholder: "CVV" },
        cardholderName: { id: active.formIds.cardholderName },
        identificationNumber: { id: active.formIds.identification },
        issuer: { id: active.formIds.issuer, placeholder: "Detectado pelo cartão" },
        installments: { id: active.formIds.installments },
      },
      callbacks: {
        onFormMounted(error) {
          if (error) active.root.querySelector("[data-checkout-feedback]").textContent = "Não foi possível carregar os campos seguros do cartão.";
          else observeInstallmentOptions();
        },
        async onSubmit(event) {
          event.preventDefault();
          const data = active.cardForm.getCardFormData();
          setBusy(true);
          try {
            await createPayment({ token: data.token, payment_method_id: data.paymentMethodId, issuer_id: data.issuerId, installments: Number(data.installments || 1) });
          } catch (error) {
            active.root.querySelector("[data-checkout-feedback]").textContent = error.message;
            setBusy(false);
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
            closeInstallmentPopover();
          }
          let completed = false;
          return () => {
            if (completed) return;
            completed = true;
            if (feedback.textContent === message) feedback.textContent = "";
            if (fetchingInstallments) {
              checkoutState.installmentFetchCount = Math.max(0, checkoutState.installmentFetchCount - 1);
              if (active === checkoutState && checkoutState.installmentFetchCount === 0) syncInstallmentSelector();
            }
          };
        },
      },
    });
    active.cardFormAmountCents = active.quote.totalCents;
  }

  function refreshCardFormForQuote(previousTotalCents) {
    if (!active?.cardForm || Number(previousTotalCents) === Number(active.quote.totalCents)) return;
    disconnectInstallmentObserver();
    for (const selector of ["[data-checkout-card-number]", "[data-checkout-card-expiration]", "[data-checkout-card-cvv]"]) {
      const field = active.root.querySelector(selector);
      if (field) field.replaceWith(field.cloneNode(false));
    }
    for (const selector of ["[data-checkout-provider-issuer]", "[data-checkout-provider-installments]"]) {
      const select = active.root.querySelector(selector);
      if (select) select.innerHTML = selector.includes("issuer")
        ? '<option value="">Detectado pelo cartão</option>'
        : '<option value="">Selecione</option>';
    }
    active.root.querySelectorAll('input[name="MPHiddenInputToken"]').forEach((input) => input.remove());
    active.cardForm = null;
    active.cardFormAmountCents = 0;
    initCardForm();
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
    const root = active.root;
    root.addEventListener("click", async (event) => {
      if (!event.target.closest(".ansend-checkout__installment-field")) closeInstallmentPopover();
      const target = event.target.closest("button, a");
      if (!target) return;
      if (target.matches("[data-checkout-installment-trigger]")) {
        const popover = root.querySelector("[data-checkout-installment-popover]");
        const opening = popover.hidden;
        popover.hidden = !opening;
        target.setAttribute("aria-expanded", String(opening));
        if (opening) root.querySelector('[data-checkout-installment-list] [role="option"]')?.focus();
        return;
      }
      if (target.matches("[data-checkout-installment-value]")) {
        selectProviderInstallment(target.dataset.checkoutInstallmentValue);
        root.querySelector("[data-checkout-installment-trigger]")?.focus();
        return;
      }
      if (target.matches("[data-checkout-close]")) active.options.onClose?.();
      if (target.matches("[data-checkout-method]")) setPaymentMethod(target.dataset.checkoutMethod);
      if (target.matches("[data-checkout-coupon-toggle]")) root.querySelector(".ansend-checkout__coupon-form").hidden = false;
      if (target.matches("[data-checkout-coupon-apply]")) await applyCoupon();
      if (target.matches("[data-checkout-remove]")) active.options.onRemove?.(target.dataset.checkoutRemove);
      if (target.matches("[data-checkout-open-beat]")) active.options.onOpenBeat?.(target.dataset.checkoutOpenBeat);
      if (target.matches("[data-checkout-copy-pix]")) {
        const code = root.querySelector("[data-checkout-pix-code]")?.value || "";
        if (code) await navigator.clipboard.writeText(code);
        target.textContent = "Código copiado";
      }
      if (target.matches("[data-checkout-check-status]")) {
        try { await checkStatus(); } catch (error) { target.insertAdjacentHTML("afterend", `<p class="ansend-checkout__inline-error">${escapeHtml(error.message)}</p>`); }
      }
      if (target.matches("[data-checkout-retry]")) {
        active.idempotencyKey = global.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
        active.attemptId = "";
        root.querySelector("form").hidden = false;
        root.querySelector("[data-checkout-result]").hidden = true;
        setBusy(false);
      }
      if (target.matches("[data-checkout-finish]")) active.options.onFinish?.();
    });
    root.addEventListener("keydown", (event) => {
      const trigger = event.target.closest("[data-checkout-installment-trigger]");
      const option = event.target.closest("[data-checkout-installment-value]");
      if (!trigger && !option) return;
      const options = Array.from(root.querySelectorAll('[data-checkout-installment-list] [role="option"]'));
      if (event.key === "Escape") {
        event.preventDefault();
        closeInstallmentPopover();
        root.querySelector("[data-checkout-installment-trigger]")?.focus();
        return;
      }
      if (trigger && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        trigger.click();
        return;
      }
      if (trigger && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
        const popover = root.querySelector("[data-checkout-installment-popover]");
        popover.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        options[event.key === "ArrowDown" ? 0 : options.length - 1]?.focus();
        return;
      }
      if (option && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        selectProviderInstallment(option.dataset.checkoutInstallmentValue);
        root.querySelector("[data-checkout-installment-trigger]")?.focus();
        return;
      }
      if (option && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
        const index = options.indexOf(option);
        const direction = event.key === "ArrowDown" ? 1 : -1;
        options[(index + direction + options.length) % options.length]?.focus();
      }
    });
    root.addEventListener("focusout", (event) => {
      const field = event.target.closest(".ansend-checkout__installment-field");
      if (field && !field.contains(event.relatedTarget)) closeInstallmentPopover();
    });
    root.querySelector("form").addEventListener("submit", async (event) => {
      if (active.method === "card" && active.cardForm) return;
      event.preventDefault();
      setBusy(true, active.method === "pix" ? "Gerando Pix..." : "Processando...");
      try { await createPayment(); }
      catch (error) { root.querySelector("[data-checkout-feedback]").textContent = error.message; setBusy(false); }
    });
  }

  async function open(options) {
    disconnectInstallmentObserver();
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
    active = { root, options, formIds, method: "pix", quote: options.quote, couponCode: "", attemptId: "", idempotencyKey: global.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, cardFormAmountCents: 0, installmentFetchCount: 0 };
    root.querySelector("[data-checkout-buyer-email]").value = options.prefillEmail || "";
    root.querySelector('[name="pix_email"]').value = options.prefillEmail || "";
    root.querySelector('[name="pix_name"]').value = options.prefillName || "";
    root.querySelector("[data-checkout-cardholder-name]").value = options.prefillName || "";
    bind();
    options.refreshIcons?.();
    try {
      const [configResponse] = await Promise.all([fetch("/api/checkout/config", { headers: authHeaders() }), requestQuote("")]);
      active.config = await configResponse.json();
      const cardButtons = root.querySelectorAll('[data-checkout-method="card"]');
      if (!active.config.supported_methods?.includes("card")) {
        cardButtons.forEach((button) => { button.hidden = true; });
        setPaymentMethod("pix");
      } else {
        await loadMercadoPagoSdk();
        initCardForm();
      }
    } catch (error) {
      root.querySelector("[data-checkout-feedback]").textContent = error.message;
      setPaymentMethod("pix");
    }
    return active;
  }

  const api = { open, renderCheckout, renderPixResult, renderCardResult, setPaymentMethod, applyCoupon, money, parseProviderInstallmentLabel, formatProviderInstallmentLabel };
  global.AnsendCheckout = api;
  if (typeof window !== "undefined") window.AnsendCheckout = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
