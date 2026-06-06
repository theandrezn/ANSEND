# Mapeamento Abrangente do Código ANSEND

Este documento fornece uma referência técnica unificada e completa de todos os componentes estruturais, estilizações de design e controladores de comportamento que compõem o ecossistema do **ANSEND**. Ele foi projetado para eliminar a necessidade de buscas manuais no código ou capturas de tela recorrentes para entender a arquitetura.

---

## 📁 Estrutura de Arquivos Base
- **[index.html](file:///c:/Users/games/Documents/ANSEND-1/index.html)**: Estrutura base estática do site (Sidebar de navegação lateral, Topbar com barra de busca e perfil, contêiner de visualização dinâmica `#appView`, rodapé global e o Player de áudio fixo `.mini-player`).
- **[styles.css](file:///c:/Users/games/Documents/ANSEND-1/styles.css)**: Sistema de design visual completo baseado em Dark Mode premium, linear-gradients, efeitos de desfoque/blur, orb-glow, grid systems, partículas animadas e consultas de mídia para responsividade.
- **[script.js](file:///c:/Users/games/Documents/ANSEND-1/script.js)**: Motor lógico do aplicativo. Controla o gerenciamento de estado global (`appState`), roteamento por hash (`location.hash`), renderização dinâmica de páginas, integração de simulação de banco de dados e inteligência artificial da NEXO IA (com fallback local ou integração com Ollama).

---

## 🧭 Gerenciador de Roteamento Dinâmico
A aplicação funciona como uma SPA (Single Page Application). Quando o link é clicado, o hash da URL muda, o evento `hashchange` dispara, e a função `renderRoute()` carrega o respectivo layout HTML dinamicamente dentro do elemento `<main class="feed" id="appView">`.

### Mapeamento de Hashes de URL e Views Relacionadas:
- `#feed` (Home): Dashboard principal com o Hero da NEXO IA, Top Beat do dia e vitrine de e-books e produtores.
- `#ia` (NEXO IA Workspace): Painel de controle dedicado para interações e diagnósticos avançados.
- `#explorar` (Explorar): Grade de beats filtrável por gênero, bpm e tags de pesquisa.
- `#favoritos` (Favoritos): Lista de beats salvos com a classe `.is-favorite`.
- `#compras` (Pedidos): Painel de licenças adquiridas e contratos de prestação de serviços.
- `#biblioteca` (Biblioteca): Acesso rápido a playlists e faixas tocadas recentemente.
- `#produtores` (Diretório): Filtro de prestadores de serviços (Beatmakers, Curadores, Designers, etc.).
- `#perfil` (Painel do Usuário): Gerenciamento da conta do vendedor e upload de arquivos.
- `#configuracoes` (Preferências): Ajustes de som, autoplay e informações da conta.
- `#vendedor` (Login/Cadastro): Tela de autenticação baseada no Supabase Auth.
- `#playlist-[id]` (Detalhe de Playlist): Abre o pack de faixas correspondente.
- `#beat-[id]` (Detalhe do Beat): Exibe informações de licença, preço e player específico.

---

## 💾 Estado Global (`appState`)
Definido no topo de `script.js` para persistência em memória local (`localStorage`) e controle de reatividade:
- `favorites` (Set): Armazena IDs de beats favoritados.
- `purchases` (Array): Histórico de compras.
- `orders` (Array): Carrinho e pedidos pendentes.
- `contracts` (Array): Serviços contratados e briefs enviados.
- `onboardingProfile` (Object): Perfil preenchido no quiz inicial.
- `catalogItems` (Array): Beats adicionados pelo produtor logado.
- `aiPlan` (Object): Último diagnóstico gerado pela NEXO IA.
- `authUser` (Object): Dados do usuário logado via Supabase Auth.
- `playing` (String/ID): ID do beat atualmente ativo no player fixo.

---

## 🏗️ Estruturas de Dados e Bancos Mockados (`script.js`)
- `accountRoles` (Linha 17): Define as personas (produtor, artista, designer, curador, manager, selo).
- `roleDashboards` (Linha 42): Armazena copys de hero, placeholders e metas para cada persona.
- `playlists` (Linha 162): Lista de álbuns/packs recomendados.
- `beatNames` (Linha 187) / `producers` (Linha 192) / `genres` (Linha 193): Banco de dados base para geração randômica de Beats.
- `professionalProfiles` (Linha 278): Perfis do diretório de profissionais (trabalhos concluídos, preços, avaliações).
- `licensePlans` (Linha 293): Regras e preços das licenças (Básica, Premium, Exclusiva).
- `featuredEbooks` (Definido na seção home): Lista contendo Cardio Fitness, Desafio 24 Dias, Importação dos EUA, Lista de Fornecedores, Elite das Manicures e Fórmula Secreta.

---

## 🧩 Componentes Visuais e Funções de Renderização

### 1. Elementos Dinâmicos de Cards
- `playlistCard([title, subtitle, cover])`: Cria o contêiner de playlists com efeito de spotlight.
- `beatCard(item)`: Gera o card clássico de beats contendo botões de reproduzir, favoritar e licenciar.
- `netflixCard(item)`: Componente de e-books em formato retangular vertical (2:3), aplicando imagem de capa inteira, efeitos de hover de escala e overlay de gradiente para exibir o título e a tag.
- `avatarCard(name, i)`: Desenha o cartão circular de produtores em destaque com a contagem de vendas de serviços.
- `featuredProfessionalCard(name, index)`: Card alternativo de profissionais com botão "Ver perfil".

### 2. Elementos Estruturais e de Navegação
- `sectionTemplate([title, subtitle, icon, content])`: Retorna uma seção dinâmica contendo o cabeçalho `.section-head`, um contêiner `.arrow-pair` com setas funcionais ligadas ao script de scroll lateral, e as linhas horizontais correspondentes (`.avatar-row` ou `.beat-row`).
- `trackRow(item, i)`: Linha de tabela de áudio para listagens verticais.
- `scrollCatalog(button, direction)`: Script associado aos botões `scroll-prev` e `scroll-next` para navegar horizontalmente nas listas, com suporte a transições suaves e pausas automáticas de autoscroll.

---

## 🎨 Seletores CSS Críticos (`styles.css`)

### 1. Ocultação de Barras de Rolagem
- As classes `.playlist-row`, `.beat-row`, `.avatar-row` e `.featured-professional-grid` têm a barra de rolagem horizontal desabilitada visualmente:
  ```css
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar { display: none; } /* Chrome/Safari */
  ```

### 2. Estilo de Cartões Premium
- `.spotlight-card`: Utiliza variáveis CSS dinâmicas (`--spot-x` e `--spot-y`) manipuladas pelo evento mousemove do Javascript para criar um brilho de gradiente orbital que segue o cursor.
- `.netflix-grid`: Grid organizador de e-books disposto em 6 colunas iguais.
- `.netflix-card`: Estrutura retangular vertical com `aspect-ratio: 2 / 3`, com ampliação de tamanho, bordas laranja iluminadas (`border-color: var(--orange)`) e aparecimento suave do overlay no hover.

### 3. Equalizadores e Animações
- `.hero-particles`: Efeito de partículas em canvas flutuantes de fundo.
- `.hero-eq`: Barras animadas que pulam de acordo com o ritmo no player e form da NEXO IA.
- `.mini-player`: Player fixo persistente no rodapé da página com a classe `.is-playing` controlando sua atividade.
