# Plano de Implementação: Redesenho UI/UX da Etapa de Licenças (Etapa 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar visualmente a etapa "Licenças e Valores" do fluxo de publicação para uma interface premium, minimalista e escura, alinhada aos padrões de SaaS modernos (Stripe/Linear), mantendo a lógica de negócio intacta.

**Architecture:** Mover a estilização inline dos cards e controles para regras CSS semânticas estruturadas no arquivo `styles.css` sob o escopo seguro de `.release-licenses-container` e `.release-license-editor-card`. Atualizar a função de renderização `refreshReleaseLicensesUI` no `script.js` para usar a nova marcação de classes CSS.

**Tech Stack:** Vanilla JS, CSS3, Lucide Icons.

## Global Constraints

- Manter compatibilidade com a tabela `beat_licenses` e as propriedades de estado de `appState.releaseLicenses`.
- Não alterar classes que possuam listeners delegados ou comportamento associado (`license-active-toggle`, `license-duplicate-btn`, `license-delete-btn`, `license-price-formatter`, `license-edit-terms-btn`, `add-custom-license-btn`).
- Nenhuma cor ou destaque laranja ou gradiente chamativo na interface.

---

### Task 1: Refatoração do CSS de Licenças no `styles.css`

**Files:**
- Modify: [styles.css](file:///c:/Ansend%203.0%20-%20AntiGravity/styles.css) (linhas 40468-40765)
- Test: Manual (Validação visual no navegador após build)

- [ ] **Step 1: Substituir as definições antigas de layout de licenças no `styles.css`**

Substituir o bloco a partir do comentário `/* BEAT PUBLISHING STEP 3: LICENSES REDESIGN */` até o final do arquivo pelas seguintes regras CSS:

```css
/* ========================================== */
/* BEAT PUBLISHING STEP 3: LICENSES REDESIGN */
/* ========================================== */

/* Grid container for license cards */
body[data-route="cadastrar"] .release-licenses-container {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 18px !important;
  margin-bottom: 24px !important;
}

@media (max-width: 900px) {
  body[data-route="cadastrar"] .release-licenses-container {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
}

/* Page container limits & centering */
body[data-route="cadastrar"] .release-container {
  width: calc(100% - 40px) !important;
  max-width: 1160px !important;
  margin-inline: auto !important;
  padding-top: 32px !important;
  padding-bottom: 120px !important;
}

/* Overrides for release bottom bar layout */
body[data-route="cadastrar"] .release-bottom-inner {
  max-width: 1160px !important;
  margin-inline: auto !important;
  width: 100% !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

/* Override bottom bar buttons to eliminate orange styling */
body[data-route="cadastrar"] .release-next-btn,
body[data-route="cadastrar"] .release-submit-btn {
  background: #ffffff !important;
  border: 1px solid #ffffff !important;
  color: #000000 !important;
  box-shadow: none !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 600 !important;
}

body[data-route="cadastrar"] .release-next-btn:hover,
body[data-route="cadastrar"] .release-submit-btn:hover {
  background: #e5e5e7 !important;
  border-color: #e5e5e7 !important;
  box-shadow: none !important;
}

body[data-route="cadastrar"] .release-draft-btn {
  background: transparent !important;
  border: 1px solid #252529 !important;
  color: #f5f5f7 !important;
  box-shadow: none !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 500 !important;
}

body[data-route="cadastrar"] .release-draft-btn:hover {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: #3a3a40 !important;
  box-shadow: none !important;
}

body[data-route="cadastrar"] .release-back-btn {
  background: transparent !important;
  border: 1px solid #252529 !important;
  color: #a1a1aa !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 500 !important;
}

body[data-route="cadastrar"] .release-back-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.05) !important;
  border-color: #3a3a40 !important;
  color: #f5f5f7 !important;
}

/* Custom Switch for License Cards & Modal */
.release-switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  flex-shrink: 0;
}

.release-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.release-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2a2a2d;
  transition: .2s;
  border-radius: 20px;
}

.release-slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: #ffffff;
  transition: .2s;
  border-radius: 50%;
}

.release-switch input:checked + .release-slider {
  background-color: #2563eb !important;
}

.release-switch input:checked + .release-slider:before {
  transform: translateX(16px);
}

.release-switch input:focus-visible + .release-slider {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Custom Checkbox */
.release-checkbox-container {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  color: #f5f5f7;
  cursor: pointer;
  user-select: none;
}

.release-checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.release-checkmark {
  height: 18px;
  width: 18px;
  background-color: #080809;
  border: 1px solid #29292d;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.release-checkbox-container:hover input ~ .release-checkmark {
  border-color: #3a3a40;
}

.release-checkbox-container input:checked ~ .release-checkmark {
  background-color: #2563eb;
  border-color: #2563eb;
}

.release-checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.release-checkbox-container input:checked ~ .release-checkmark:after {
  display: block;
}

.release-checkbox-container .release-checkmark:after {
  left: 6px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.release-checkbox-container input:focus-visible ~ .release-checkmark {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Scoped Modal Panel styling for Terms Editing Modal */
.app-modal:has(.custom-license-form) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.app-modal:has(.custom-license-form) .app-modal-backdrop {
  background: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(4px) !important;
}

.app-modal:has(.custom-license-form) .app-modal-panel {
  width: 760px !important;
  max-width: calc(100vw - 32px) !important;
  max-height: 84vh !important;
  border-radius: 16px !important;
  background: #09090a !important;
  border: 1px solid #27272a !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8) !important;
  display: flex !important;
  flex-direction: column !important;
  padding: 0 !important;
  overflow: hidden !important;
}

/* Hide default global close button */
.app-modal:has(.custom-license-form) .app-modal-panel > .app-modal-close {
  display: none !important;
}

/* Custom Scrollbar for Modal Body */
.custom-license-modal-body::-webkit-scrollbar {
  width: 6px;
}

.custom-license-modal-body::-webkit-scrollbar-track {
  background: transparent;
}

.custom-license-modal-body::-webkit-scrollbar-thumb {
  background: #27272a;
  border-radius: 10px;
}

.custom-license-modal-body::-webkit-scrollbar-thumb:hover {
  background: #3f3f46;
}

/* Pricing Input overrides to match theme and disable orange glows */
body[data-route="cadastrar"] .license-price-formatter:focus,
.custom-license-price-formatter:focus {
  border-color: #2563eb !important;
  outline: none !important;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15) !important;
}

/* Responsive Modal styles for smaller screens */
@media (max-width: 768px) {
  .app-modal:has(.custom-license-form) .app-modal-panel {
    width: calc(100% - 24px) !important;
    max-height: 90vh !important;
    margin: 12px !important;
  }
  
  .app-modal:has(.custom-license-form) .custom-license-form {
    max-height: 90vh !important;
  }
  
  .custom-license-modal-body {
    padding: 16px !important;
  }
  
  .custom-license-modal-body section > div[style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
  }
}

/* NEW PREMIUM CARD STYLING */
.release-license-editor-card {
  background: #0b0b0c;
  border: 1px solid #1e1e20;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
  min-height: 290px;
}

.release-license-editor-card:hover {
  border-color: #2b2b2f;
  background: #0d0d0e;
}

.release-license-editor-card.is-inactive-license {
  opacity: 0.4;
}

.release-license-editor-card.is-inactive-license:hover {
  opacity: 0.7;
}

.license-action-buttons {
  display: flex;
  align-items: center;
  gap: 2px;
  background: #121214;
  border: 1px solid #1e1e20;
  border-radius: 8px;
  padding: 2px;
}

.license-action-buttons button {
  background: transparent;
  border: 0;
  color: #8e8e93;
  cursor: pointer;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.license-action-buttons button:hover {
  background: #1d1d20;
  color: #ffffff;
}

.license-action-buttons button.license-delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
}

.license-card-desc {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #8e8e93;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 36px;
}

.license-card-specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: #1e1e20;
  border-radius: 8px;
  border: 1px solid #1e1e20;
  overflow: hidden;
}

.license-card-spec-item {
  background: #0d0d0e;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
}

.license-card-spec-item strong {
  color: #8e8e93;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.license-card-spec-item span {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #e4e4e7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.license-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px solid #1e1e20;
}

.license-card-price-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.license-card-price-wrapper input.license-price-formatter {
  width: 100%;
  height: 38px;
  background: #080809;
  border: 1px solid #1e1e20;
  color: #ffffff;
  padding: 0 12px !important;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 13px;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.license-card-price-wrapper input.license-price-formatter:focus {
  border-color: #2563eb !important;
  background: #0b0b0c;
  outline: none;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.license-edit-terms-btn {
  height: 38px;
  background: #121214;
  border: 1px solid #1e1e20;
  color: #e4e4e7;
  padding: 0 14px;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: none;
}

.license-edit-terms-btn:hover {
  background: #1d1d20;
  border-color: #2b2b2f;
  color: #ffffff;
}

.license-edit-terms-btn i {
  color: #8e8e93;
  transition: color 0.2s ease;
}

.license-edit-terms-btn:hover i {
  color: #ffffff;
}

.license-badge {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 9px;
  font-weight: 650;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.license-badge-basic {
  background: rgba(142, 142, 147, 0.1);
  color: #a1a1aa;
  border: 1px solid rgba(142, 142, 147, 0.15);
}

.license-badge-premium {
  background: rgba(37, 99, 235, 0.08);
  color: #60a5fa;
  border: 1px solid rgba(37, 99, 235, 0.18);
}

.license-badge-unlimited {
  background: rgba(139, 92, 246, 0.08);
  color: #c084fc;
  border: 1px solid rgba(139, 92, 246, 0.18);
}

.license-badge-exclusive {
  background: rgba(239, 68, 68, 0.08);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.18);
}

.license-badge-custom {
  background: rgba(245, 158, 11, 0.08);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.18);
}

.add-custom-license-card {
  border: 1px dashed #1e1e20 !important;
  border-radius: 12px !important;
  padding: 24px !important;
  background: transparent !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: center !important;
  min-height: 290px !important;
  cursor: pointer !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-sizing: border-box !important;
  text-align: center !important;
  gap: 16px !important;
}

.add-custom-license-card:hover {
  border-color: #2b2b2f !important;
  background: #0b0b0c !important;
}

.add-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #0b0b0c;
  border: 1px solid #1e1e20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8e93;
  transition: all 0.2s ease;
}

.add-custom-license-card:hover .add-icon-wrapper {
  color: #ffffff !important;
  border-color: #2b2b2f !important;
  background: #121214 !important;
}
```

- [ ] **Step 2: Salvar o styles.css e verificar a formatação.**

---

### Task 2: Refatoração do Renderizador de Cards (`refreshReleaseLicensesUI` no `script.js`)

**Files:**
- Modify: [script.js](file:///c:/Ansend%203.0%20-%20AntiGravity/script.js) (linhas 24568-24685)
- Test: Manual (Validação visual no navegador após build)

- [ ] **Step 1: Substituir `refreshReleaseLicensesUI` no `script.js`**

Substituir toda a função `refreshReleaseLicensesUI` para usar o novo HTML limpo e as novas classes CSS:

```javascript
function refreshReleaseLicensesUI() {
  const container = document.querySelector(".release-licenses-container");
  if (!container) return;
  
  const cardsHtml = appState.releaseLicenses.map((lic, idx) => {
    const priceText = lic.price_cents ? `R$ ${(lic.price_cents / 100).toFixed(2)}` : "";

    const filesLabel = [
      lic.included_mp3 ? "MP3" : "",
      lic.included_wav ? "WAV" : "",
      lic.included_stems ? "Stems" : ""
    ].filter(Boolean).join(" + ");
    
    const isDefault = lic.is_default;
    const activeClass = lic.is_active ? "is-active-license" : "is-inactive-license";

    // Badges premium
    let badgeClass = "license-badge-basic";
    let badgeText = "Lease";

    if (lic.license_key === "basic") {
      badgeText = "Básica";
      badgeClass = "license-badge-basic";
    } else if (lic.license_key === "premium") {
      badgeText = "Premium";
      badgeClass = "license-badge-premium";
    } else if (lic.license_key === "unlimited") {
      badgeText = "Unlimited";
      badgeClass = "license-badge-unlimited";
    } else if (lic.is_exclusive || lic.license_key === "exclusive") {
      badgeText = "Exclusiva";
      badgeClass = "license-badge-exclusive";
    } else if (lic.is_custom) {
      badgeText = "Personalizada";
      badgeClass = "license-badge-custom";
    }

    const badgeHtml = `<span class="license-badge ${badgeClass}">${badgeText}</span>`;

    return `
      <div class="release-license-editor-card ${activeClass}" data-license-index="${idx}">
        <div class="license-card-header" style="display: flex; justify-content: space-between; align-items: center; width: 100%; box-sizing: border-box;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong class="license-title" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 600; color: #f5f5f7; margin: 0; letter-spacing: -0.02em;">${htmlEscape(lic.name)}</strong>
            ${badgeHtml}
          </div>
          <div class="license-header-actions" style="display: flex; align-items: center; gap: 8px;">
            <div class="license-action-buttons">
              ${idx > 0 ? `<button type="button" class="license-move-up" title="Subir" aria-label="Mover para cima"><i data-lucide="chevron-up" style="width: 14px; height: 14px;"></i></button>` : ""}
              ${idx < appState.releaseLicenses.length - 1 ? `<button type="button" class="license-move-down" title="Descer" aria-label="Mover para baixo"><i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i></button>` : ""}
              <button type="button" class="license-duplicate-btn" title="Duplicar" aria-label="Duplicar licença"><i data-lucide="copy" style="width: 13px; height: 13px;"></i></button>
              ${!isDefault ? `
                <button type="button" class="license-delete-btn" title="Excluir" aria-label="Excluir licença"><i data-lucide="trash-2" style="width: 13px; height: 13px;"></i></button>
              ` : ""}
            </div>
            <div style="width: 1px; height: 16px; background: #1e1e20; margin: 0 2px;"></div>
            <label class="release-switch" title="Ativar/Desativar">
              <input type="checkbox" class="license-active-toggle" ${lic.is_active ? "checked" : ""}>
              <span class="release-slider"></span>
            </label>
          </div>
        </div>
        
        <div class="license-card-desc">
          ${htmlEscape(lic.description)}
        </div>
        
        <div class="license-card-specs-grid">
          <div class="license-card-spec-item">
            <strong>Arquivos</strong>
            <span>${filesLabel || "Nenhum"}</span>
          </div>
          <div class="license-card-spec-item">
            <strong>Royalties</strong>
            <span>${lic.buyer_royalty_percentage}% / ${lic.producer_royalty_percentage}%</span>
          </div>
          <div class="license-card-spec-item">
            <strong>Streams</strong>
            <span>${lic.unlimited_streams ? "Ilimitado" : `${lic.stream_limit?.toLocaleString("pt-BR") || 0}`}</span>
          </div>
        </div>

        <div class="license-card-footer">
          <div class="license-card-price-wrapper">
            <input type="text" class="license-price-formatter" value="${priceText}" placeholder="R$ 0,00" required>
          </div>
          <button type="button" class="license-edit-terms-btn">
            <i data-lucide="settings" style="width: 13px; height: 13px;"></i>
            <span>Termos</span>
          </button>
        </div>
      </div>
    `;
  }).join("");

  const addCardHtml = `
    <div class="add-custom-license-card add-custom-license-btn">
      <div class="add-icon-wrapper">
        <i data-lucide="plus" style="width: 18px; height: 18px;"></i>
      </div>
      <div>
        <strong style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600; color: #f5f5f7; display: block; margin-bottom: 2px; letter-spacing: -0.01em;">Adicionar licença personalizada</strong>
        <span style="font-family: 'Montserrat', sans-serif; font-size: 11px; color: #71717a; display: block; max-width: 220px; margin: 0 auto; line-height: 1.4;">Crie uma opção com arquivos e condições próprias.</span>
      </div>
    </div>
  `;

  container.innerHTML = cardsHtml + addCardHtml;
  lucide.createIcons();
  updateReleaseFileRequirementBadges();
}
```

---

### Task 3: Refatoração do Cabeçalho Estático da Etapa 3 no `script.js`

**Files:**
- Modify: [script.js](file:///c:/Ansend%203.0%20-%20AntiGravity/script.js) (linhas 18279-18286)
- Test: Manual (Validação visual no navegador após build)

- [ ] **Step 1: Atualizar o HTML estático do painel 3 no `script.js`**

Substituir o HTML do Passo 3:
```javascript
    // STEP 3 — Licenças
    + '<section class="release-panel" data-panel="3">'
    + '<div class="release-panel-header" style="margin-bottom: 24px;">'
    + '  <h2 style="font-family: \'Plus Jakarta Sans\', sans-serif; font-weight: 700; font-size: 28px; margin: 0 0 6px 0; color: #f5f5f7;">Licenças e valores</h2>'
    + '  <p style="color: #a1a1aa; font-family: \'Montserrat\', sans-serif; font-size: 14px; margin: 0;">Defina os preços, arquivos e condições de uso disponíveis para este lançamento.</p>'
    + '</div>'
    + '<div class="release-licenses-container"></div>'
    + '</section>'
```
por:
```javascript
    // STEP 3 — Licenças
    + '<section class="release-panel" data-panel="3">'
    + '<div class="release-panel-header" style="margin-bottom: 32px; text-align: left;">'
    + '  <h2 style="font-family: \'Plus Jakarta Sans\', sans-serif; font-weight: 700; font-size: 32px; letter-spacing: -0.025em; margin: 0 0 8px 0; color: #f5f5f7; line-height: 1.2;">Licenças e valores</h2>'
    + '  <p style="color: #8e8e93; font-family: \'Montserrat\', sans-serif; font-size: 14px; margin: 0; max-width: 500px; line-height: 1.5;">Defina os preços, arquivos e condições de uso disponíveis para este lançamento.</p>'
    + '</div>'
    + '<div class="release-licenses-container"></div>'
    + '</section>'
```

---

### Task 4: Compilação e Validação

- [ ] **Step 1: Compilar a aplicação**
Run: `npm run build`

- [ ] **Step 2: Executar testes de verificação do sistema de licenças**
Run: `node tests/licensing-system-check.js`
Expected: "Beat licensing system structural checks passed successfully."

- [ ] **Step 3: Executar testes de upload seguros**
Run: `npm run test:release-secure-files`
Expected: PASS

- [ ] **Step 4: Realizar deploy final no Cloudflare**
Run: `npm run deploy`
Expected: Deploy concluído com sucesso.
