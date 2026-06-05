# Mapeamento do Site ANSEND

Este documento serve como referência de mapeamento de todos os elementos visuais, estruturas HTML, controladores JavaScript e estilizações CSS do ecossistema musical **ANSEND**.

---

## 📂 Estrutura Geral do Projeto

- **`index.html`**: O esqueleto e estrutura base de contêineres principais (Sidebar, Topbar, Player Fixo e o contêiner dinâmico `#appView`).
- **`styles.css`**: Todo o sistema de design visual (Dark Mode premium, efeitos de partículas, vidro/glassmorphism, transições suaves, player e layouts de grids).
- **`script.js`**: Estado global da aplicação, controle de rotas por Hash, gerador de planos NEXO IA (local e integração com Ollama), banco de dados simulado e interações/modais.

---

## 🧭 Mapeamento de Rotas e Views Dinâmicas

As páginas são renderizadas dentro do contêiner principal `<main class="feed" id="appView">` com base no `location.hash` e na função `renderRoute()` no `script.js`.

| Rota / Hash | View Relacionada | Função de Renderização (`script.js`) | Descrição |
| :--- | :--- | :--- | :--- |
| `#feed` | **Home** | `renderRoute() -> applyFeedPersonalization()` | Dashboard inicial. Exibe Hero da NEXO IA, beat top 1 do dia, catálogos em alta, atalhos rápidos e combos. |
| `#ia` | **NEXO IA Workspace** | `renderAiWorkspace()` | Console dedicado para interagir com o diagnóstico musical da NEXO IA. |
| `#explorar` | **Explorar Catálogo** | `renderExplore()` | Busca e filtragem de beats por gênero e termos com suporte a filtros de chips. |
| `#favoritos` | **Meus Favoritos** | `renderFavorites()` | Lista de beats marcados com o coração (`is-favorite`). |
| `#compras` | **Pedidos** | `renderPurchases()` | Histórico de licenças de beats adquiridos e contratos de serviços com profissionais. |
| `#biblioteca`| **Biblioteca** | `renderLibrary()` | Playlists salvas e histórico de faixas recentemente ouvidas. |
| `#produtores`| **Profissionais** | `renderProducers()` | Diretório de prestadores de serviços divididos em categorias com filtros. |
| `#perfil` | **Meu Perfil** | `renderProfile()` | Área de controle da conta do vendedor. Permite cadastrar novos beats/músicas. |
| `#configuracoes`| **Configurações** | `renderSettings()` | Ajustes de preferências (Autoplay, Qualidade, Notificações) e botão para refazer quiz. |
| `#vendedor` | **Login/Cadastro** | `renderSellerAuth()` | Fluxo de login e cadastro integrado ao Supabase Auth (ou preview local). |
| `#playlist-[id]`| **Detalhe de Playlist** | `renderPlaylistDetail()` | Visualização de packs de playlists com listagem de faixas no estilo tabela e informações sobre o pack. |
| `#beat-[id]` | **Detalhe do Beat** | `renderBeatDetail()` | Detalhes do beat com tabelas de licenças (Básica, Premium, Exclusiva) e minibiografia do produtor. |

---

## 🏗️ Mapeamento de Elementos Estruturais e IDs

### 1. Sidebar (`.sidebar`)
- Barra lateral fixa à esquerda em telas desktop, oculta no mobile por padrão.
- **Link do Logo**: `a.brand` (com `data-route="feed"`).
- **Menu de Navegação**: `nav.nav-menu`.
  - Links de rotas: `a.nav-link` com `data-route="..."` (Ex: `data-route="ia"`, `data-route="explorar"`).
- **Loja do Vendedor**: `.seller-mini` com botão `button[data-action="seller"]`.

### 2. Topbar / Header (`.topbar`)
- Fixado no topo da tela.
- **Botão Menu Mobile**: `button.menu-toggle` (abre a sidebar no mobile adicionando `.menu-open` ao `body`).
- **Logo Mobile**: `a.mobile-brand` (oculto em desktop).
- **Barra de Pesquisa**: `form.search` contendo `input#search`.
- **Atalhos e Avatar**: `.top-icons`
  - Notificações: `button[data-action="notifications"]`.
  - Favoritos: `button[data-route="favoritos"]`.
  - Carrinho/Pedidos: `button[data-route="compras"]`.
  - Configurações da Conta: `button[data-route="perfil"]` e `button.avatar-btn`.

### 3. Hero da NEXO IA (Na rota `#feed`)
- **particles & Visuals**: `.hero-particles`, `.hero-eq`, `.hero-wave-scene` (equalizadores visuais).
- **Formulário de Entrada**: `form.ai-diagnostic-form` com o campo `textarea#aiPrompt` e botão de envio `.ai-inline-submit`.
- **Chips Rápidos**: `.ai-chip-row` com botões `button[data-action="ai-chip"]` carregando prompts pré-definidos nos atributos `data-prompt`.
- **Botões de Ação**: `.ai-actions`
  - Primário: `button.an-primary` (Gerar meu plano).
  - Secundário: `button.an-secondary` (Explorar serviços).
- **Showcase Lateral**: `.top-beat-showcase` exibindo o beat do dia. Play em: `button[data-action="hero-beat-play"]`.
- **Visualização do Plano**: `.ai-map-card` (Mapa do Lançamento) contendo:
  - Lista de etapas: `ol#releaseMap` (ganha classe `.is-ready` após gerar o plano).
  - Prévia de dados: `div#aiOutput` (ganha classe `.is-generated` após gerar o plano).

---

## 🎸 Player de Áudio Fixo (`.mini-player`)

A barra de controle de áudio persistente no rodapé da página.

- **Waveform**: `.mini-waveform`
  - Tempo atual: `.mini-current`
  - Barras dinâmicas: `.mini-wave-bars`
  - Tempo total/Duração: `.mini-duration`
- **Detalhes da Faixa**: `.mini-track` (contém a capa do beat e textos com Título, Produtor, BPM e Vibe).
- **Controles (`.mini-controls`)**:
  - Favoritar atual: `button[data-action="favorite-current"]`
  - Anterior: `button[data-action="prev-track"]`
  - Play/Pause: `button[data-action="mini-play"]`
  - Próximo: `button[data-action="next-track"]`
  - Fila: `button[data-action="queue"]`
- **Ações Extras (`.mini-tools`)**:
  - Edit: `button[data-action="edit-beat"]`
  - Loop: `button[data-action="loop-beat"]`
  - Letra: `button[data-action="lyrics"]`
  - Volume: `button[data-action="volume"]`
  - Mais opções: `button[data-action="more-player"]`
  - Compra rápida: `button.mini-buy[data-action="buy-current"]`

---

## 💻 Modais e Elementos Flutuantes (Injetados via JS)

Estes elementos são criados e destruídos dinamicamente no DOM através de interações.

- **Modal Frame**: `.app-modal` (Possui um `.app-modal-backdrop` com `data-action="close-modal"` e `.app-modal-panel`).
- **Formulário de Checkout (`.checkout-form`)**:
  - Contém inputs `input[name="license"]` de tipo rádio com opções (básica, premium, exclusiva).
- **Formulário de Contrato (`.contract-form`)**:
  - Contém campos `select[name="service"]` e `textarea[name="briefing"]`.
- **Quiz de Onboarding (`.onboarding-quiz`)**:
  - Formulário `.onboarding-card` contendo seleções de estilo musical (`input[name="styles"]`) e objetivos da conta (`input[name="goal"]`).
- **Toast de Notificação**: Gerado dentro de `div#toastRegion` com a classe `.toast`.

---

## 🎨 Principais Classes de Estilização (CSS)

- **`.spotlight-card`**: Ativa o efeito de gradiente orbital que segue o cursor do mouse (manipulado pelo evento `pointermove` do JS).
- **`.reveal-section`**: Usado em conjunto com a classe `.is-visible` por meio do `IntersectionObserver` para criar efeitos de animação fade-in-up ao rolar a página.
- **`.is-playing`**: Aplicada ao `.mini-player` quando uma música está ativa.
- **`.is-thinking`**: Aplicada ao form da NEXO IA para exibir animação de carregamento (equalizador acelerado e desativação do botão).
- **`.is-favorite`**: Destaca o botão do coração em vermelho/laranja.

---

## 💾 Estruturas de Dados Úteis no `script.js`

Se precisar alterar mockups ou adicionar novos profissionais/estilos, altere estas constantes no topo de `script.js`:
- **`accountRoles` (Linha 17)**: Configurações de funções de conta (Produtor, Curador, Artista, Designer, etc).
- **`roleDashboards` (Linha 42)**: Customizações do feed, copys, CTAs e etapas com base no papel do usuário.
- **`playlists` (Linha 162)**: Lista mockada de playlists para o feed.
- **`beatNames`, `producers`, `genres` (Linha 187)**: Banco de dados para geração mockada de faixas do catálogo.
- **`professionalProfiles` (Linha 278)**: Lista de perfis do diretório de profissionais (com nome, preço, especialidades, avaliação, etc).
- **`licensePlans` (Linha 293)**: Tabela de preços e direitos inclusos em cada tipo de licença (Básica, Premium, Exclusiva).
