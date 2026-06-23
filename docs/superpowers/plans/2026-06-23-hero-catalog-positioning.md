# Reposicionamento do Catálogo da Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajustar o posicionamento do catálogo animado da Hero de forma responsiva no arquivo `hero-collage.css`.

**Architecture:** Mover a div pai absoluta `.ansend-hero-catalog` usando `margin-left` e `margin-top` com `@media` queries específicas para desktop, preservando as animações internas e responsividade mobile.

**Tech Stack:** CSS3, HTML5

## Global Constraints

- Modificar exclusivamente [hero-collage.css](file:///c:/Ansend%203.0%20-%20AntiGravity/hero-collage.css) para ajustes visuais.
- Não alterar os `transform: translate3d(...)` das tracks animadas internas.
- Manter acessibilidade, dimensões de cards, e integridade visual de textos, cabeçalho e campo de busca.
- Não adicionar scrollbar horizontal nem quebrar animações.

---

### Task 1: Reposicionamento do Catálogo no CSS

**Files:**
- Modify: [hero-collage.css](file:///c:/Ansend%203.0%20-%20AntiGravity/hero-collage.css) (adicionar ao final do arquivo)

**Interfaces:**
- Produces: Ajustes de posicionamento responsivos da classe `.ansend-hero-catalog` em resoluções >= 1024px.

- [ ] **Step 1: Inserir as media queries de posicionamento**
  
  Adicione as seguintes classes e media queries ao final de [hero-collage.css](file:///c:/Ansend%203.0%20-%20AntiGravity/hero-collage.css):
  ```css
  /* ==========================================
     REPOSITIONING OVERRIDES FOR THE HERO CATALOG
     ========================================== */

  /* Telas Grandes (Desktop >= 1280px) */
  @media (min-width: 1280px) {
    body[data-route="feed"] .ai-hero .ai-hero-layout .ansend-hero-catalog {
      margin-left: 120px !important;
      margin-top: -55px !important;
    }
  }

  /* Telas Médias (Desktop/Tablet 1024px a 1279px) */
  @media (min-width: 1024px) and (max-width: 1279px) {
    body[data-route="feed"] .ai-hero .ai-hero-layout .ansend-hero-catalog {
      margin-left: 60px !important;
      margin-top: -30px !important;
    }
  }
  ```

- [ ] **Step 2: Verificar o git status**
  
  Run: `git status`
  Expected: Somente `hero-collage.css` e o arquivo de especificação modificados/criados.

- [ ] **Step 3: Compilar o build do projeto**
  
  Run: `npm run build`
  Expected: Mensagem de build bem-sucedido: `Cloudflare Workers assets build ready: C:\Ansend 3.0 - AntiGravity\dist`.


---

### Task 2: Validação Visual e Responsiva

**Files:**
- Verify: [dist/hero-collage.css](file:///c:/Ansend%203.0%20-%20AntiGravity/dist/hero-collage.css) e interface visual do navegador.

- [ ] **Step 1: Validar build de produção**
  
  Verificar se as novas regras foram copiadas corretamente para `dist/hero-collage.css`.
  Run: `Select-String -Path .\dist\hero-collage.css -Pattern "REPOSITIONING OVERRIDES"`
  Expected: Encontrar a linha adicionada.

- [ ] **Step 2: Confirmar que a animação e o layout estão normais**
  
  Garantir que as animações de keyframes não tenham sido quebradas ou sobrescritas por `transform`.
