const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=520&q=82`;
const SUPABASE_PROJECT_REF = "qxujynzqdursxaehchik";
const SUPABASE_CONFIG = window.ANSEND_SUPABASE || {};
const SUPABASE_KEY_PLACEHOLDER = "COLE_SUA_SUPABASE_ANON_OU_PUBLISHABLE_KEY_AQUI";
const isSupabaseConfigured = Boolean(
  window.supabase
  && SUPABASE_CONFIG.url
  && SUPABASE_CONFIG.publishableKey
  && SUPABASE_CONFIG.publishableKey !== SUPABASE_KEY_PLACEHOLDER
);
const supabaseClient = isSupabaseConfigured
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey)
  : null;

const accountRoles = [
  { id: "produtor", label: "Produtor", icon: "sliders-horizontal", desc: "Publica beats, gerencia licenças e acompanha vendas." },
  { id: "curador", label: "Curador", icon: "list-music", desc: "Monta playlists, salva catálogos e encontra novos sons." },
  { id: "artista", label: "Artista", icon: "mic-2", desc: "Busca beats para gravar, licenciar e lançar músicas." },
  { id: "designer", label: "Designer", icon: "palette", desc: "Organiza capas, identidade visual e assets de lançamento." },
  { id: "beatmaker", label: "BeatMaker", icon: "audio-lines", desc: "Cria beats, colabora com produtores e sobe catálogos." },
  { id: "manager", label: "Manager", icon: "briefcase-business", desc: "Gerencia artistas, compras, contratos e lançamentos." },
  { id: "selo", label: "Selo", icon: "badge-check", desc: "Opera catálogo, talentos e licenças em escala." },
];

const roleLabels = Object.fromEntries(accountRoles.map((role) => [role.id, role.label]));
Object.assign(roleLabels, {
  produtor: "Produtor Musical",
  marketing: "Marketing Musical",
});

const roleChoices = [
  { id: "artista", label: "Sou artista", shortLabel: "Artista", icon: "mic-2", desc: "Quero transformar ideias, letras ou demos em lancamentos." },
  { id: "beatmaker", label: "Sou beatmaker", shortLabel: "Beatmaker", icon: "audio-lines", desc: "Quero vender beats, organizar packs e encontrar artistas." },
  { id: "designer", label: "Sou designer", shortLabel: "Designer", icon: "palette", desc: "Quero vender capas, identidade visual e artes para lancamentos." },
  { id: "produtor", label: "Sou produtor musical", shortLabel: "Produtor Musical", icon: "sliders-horizontal", desc: "Quero mixar, masterizar, produzir e receber projetos." },
  { id: "curador", label: "Sou curador", shortLabel: "Curador", icon: "list-music", desc: "Quero montar playlists, selecionar sons e descobrir talentos." },
  { id: "marketing", label: "Trabalho com marketing musical", shortLabel: "Marketing Musical", icon: "megaphone", desc: "Quero criar campanhas, divulgar artistas e medir resultados." },
];

const roleDashboards = {
  artista: {
    headline: ["Entre com uma ideia.", "Saia com uma solucao."],
    subheadline: "Descreva sua musica, letra, demo ou objetivo. A NEXO IA monta um plano e recomenda profissionais para produzir, lancar e divulgar.",
    placeholder: "Ex: Tenho uma musica de trap pronta e preciso lancar profissionalmente...",
    primaryCta: "Gerar meu plano",
    secondaryCta: "Explorar servicos",
    chips: [
      ["Tenho uma ideia", "Tenho uma ideia de musica e preciso transformar em lancamento."],
      ["Tenho uma letra", "Tenho uma letra de trap e preciso encontrar beat, capa e producao."],
      ["Tenho uma demo", "Tenho uma demo gravada e quero finalizar com mixagem, master e capa."],
      ["Quero lancar", "Quero lancar no Spotify com distribuicao, curadoria e divulgacao."],
      ["Preciso divulgar", "Preciso divulgar minha musica com curadoria, marketing musical e trafego."],
    ],
    benefits: [["shield-check", "Pagamento protegido"], ["badge-check", "Profissionais avaliados"], ["brain-circuit", "Recomendacoes por IA"]],
    preview: ["Beatmaker recomendado", "Designer recomendado", "Produtor musical", "Curador", "Marketing musical"],
    mapSteps: [["Producao", "Beatmaker ideal"], ["Capa", "Designer de capa"], ["Distribuicao", "Lancamento"], ["Curadoria", "Playlists"], ["Divulgacao", "Marketing"]],
    metrics: [["Plano", "IA pronta"], ["Match", "92%"], ["Ordem", "5 etapas"]],
    actions: [["catalogo", "Explorar catalogo"], ["profissionais", "Ver profissionais"], ["perfil", "Meu perfil"]],
    sectionTitle: "Beats escolhidos pra voce",
    sectionSubtitle: "Recomendacoes moldadas para sua proxima musica",
    playlistTitle: "Playlists para seu estilo",
    playlistSubtitle: "Curadoria baseada no seu gosto musical",
    combo: "Beatmaker / Designer / Produtor / Curador / Marketing",
  },
  beatmaker: {
    headline: ["Venda seus beats.", "Ache os artistas certos."],
    subheadline: "A NEXO IA organiza seu catalogo, sugere packs, precos, licencas e artistas com maior chance de comprar seus beats.",
    placeholder: "Ex: Tenho 20 beats de trap 140 BPM e quero montar um pack para vender...",
    primaryCta: "Organizar catalogo",
    secondaryCta: "Ver artistas",
    chips: [["Subir pack", "Quero organizar um pack de beats para vender melhor."], ["Precificar", "Preciso definir preco e licencas para meus beats."], ["Achar artistas", "Quero encontrar artistas com match para meu som."], ["Criar vitrine", "Quero melhorar minha vitrine de beatmaker."]],
    benefits: [["badge-dollar-sign", "Licencas claras"], ["users-round", "Artistas com match"], ["bar-chart-3", "Catalogo otimizado"]],
    preview: ["Pack recomendado", "Preco sugerido", "Licenca ideal", "Artistas com match", "Vitrine do beatmaker"],
    mapSteps: [["Catalogo", "Packs e tags"], ["Licenca", "Planos de venda"], ["Match", "Artistas ideais"], ["Vitrine", "Perfil publico"], ["Vendas", "Proximas acoes"]],
    metrics: [["Packs", "3 ativos"], ["Match", "18 artistas"], ["Vendas", "+12%"]],
    actions: [["perfil", "Cadastrar beats"], ["catalogo", "Ver catalogo"], ["profissionais", "Colaborar"]],
    sectionTitle: "Oportunidades para beatmakers",
    sectionSubtitle: "Artistas, packs e referencias para vender melhor",
    playlistTitle: "Packs em destaque",
    playlistSubtitle: "Formatos que combinam com seu catalogo",
    combo: "Pack / Licencas / Tags / Vitrine / Match com artistas",
  },
  designer: {
    headline: ["Transforme lancamentos.", "Em identidade visual."],
    subheadline: "A NEXO IA entende o estilo do artista e recomenda capas, mockups, posts e pacotes visuais para vender dentro da ANSEND.",
    placeholder: "Ex: Quero vender capas para artistas de trap e criar pacotes para lancamento...",
    primaryCta: "Criar oferta visual",
    secondaryCta: "Ver artistas",
    chips: [["Capa single", "Quero montar uma oferta de capa para single."], ["Pacote redes", "Quero vender capa, stories e feed para lancamento."], ["Identidade", "Quero criar identidade visual para um artista."], ["Portifolio", "Quero organizar meu portifolio na ANSEND."]],
    benefits: [["image", "Capas profissionais"], ["sparkles", "Briefing por IA"], ["shield-check", "Entrega segura"]],
    preview: ["Briefing de capa", "Paleta visual", "Pacote de redes", "Artistas com match", "Preco sugerido"],
    mapSteps: [["Briefing", "Estilo e referencias"], ["Capa", "Arte principal"], ["Redes", "Posts e stories"], ["Entrega", "Arquivos finais"], ["Upsell", "Pacote visual"]],
    metrics: [["Briefings", "6 novos"], ["Pacotes", "4 prontos"], ["Match", "21 artistas"]],
    actions: [["perfil", "Cadastrar servico"], ["profissionais", "Ver demanda"], ["catalogo", "Explorar capas"]],
    sectionTitle: "Demandas visuais em alta",
    sectionSubtitle: "Artistas e lancamentos procurando capa e identidade",
    playlistTitle: "Referencias visuais por estilo",
    playlistSubtitle: "Direcoes esteticas para criar ofertas melhores",
    combo: "Briefing / Capa / Posts / Entrega / Upsell visual",
  },
  produtor: {
    headline: ["Organize projetos.", "Entregue som profissional."],
    subheadline: "A NEXO IA transforma pedidos de artistas em etapas de producao, mixagem, masterizacao, referencias e entregas.",
    placeholder: "Ex: Tenho uma demo gravada e preciso mixar, masterizar e preparar para distribuicao...",
    primaryCta: "Montar fluxo",
    secondaryCta: "Ver projetos",
    chips: [["Mix/master", "Preciso montar oferta de mixagem e masterizacao."], ["Producao vocal", "Quero organizar producao vocal para artistas."], ["Finalizar demo", "Quero transformar demos em musicas prontas."], ["Agenda", "Quero organizar meus projetos ativos."]],
    benefits: [["sliders-horizontal", "Fluxo claro"], ["file-check-2", "Arquivos finais"], ["clock-3", "Prazos organizados"]],
    preview: ["Projeto recomendado", "Referencia sonora", "Checklist de mix", "Entrega final", "Proximo passo"],
    mapSteps: [["Entrada", "Demo e referencias"], ["Producao", "Direcao sonora"], ["Mix", "Tratamento"], ["Master", "Volume final"], ["Entrega", "Arquivos prontos"]],
    metrics: [["Projetos", "5 ativos"], ["Entregas", "2 hoje"], ["Satisfacao", "98%"]],
    actions: [["perfil", "Cadastrar servico"], ["catalogo", "Ver demandas"], ["profissionais", "Colaborar"]],
    sectionTitle: "Projetos para produzir",
    sectionSubtitle: "Demos e artistas que precisam finalizar musica",
    playlistTitle: "Referencias de producao",
    playlistSubtitle: "Sons para guiar mix, master e direcao",
    combo: "Demo / Producao / Mix / Master / Entrega",
  },
  curador: {
    headline: ["Monte playlists.", "Descubra sons certos."],
    subheadline: "A NEXO IA sugere recortes, ordem de faixas, artistas promissores e oportunidades de curadoria para playlists e campanhas.",
    placeholder: "Ex: Quero montar uma playlist de trap melodico com artistas independentes...",
    primaryCta: "Criar curadoria",
    secondaryCta: "Ver beats",
    chips: [["Playlist nova", "Quero montar uma playlist nova com curadoria forte."], ["Descobrir talentos", "Quero achar artistas independentes com potencial."], ["Mood especifico", "Preciso montar uma curadoria por vibe."], ["Campanha", "Quero apoiar lancamentos com playlist e alcance."]],
    benefits: [["list-music", "Curadoria inteligente"], ["radar", "Novos talentos"], ["trending-up", "Sons em alta"]],
    preview: ["Tema da playlist", "Ordem sugerida", "Artistas em alta", "Faixas com match", "Plano de alcance"],
    mapSteps: [["Tema", "Recorte musical"], ["Selecao", "Faixas certas"], ["Ordem", "Narrativa da playlist"], ["Publicacao", "Vitrine"], ["Alcance", "Crescimento"]],
    metrics: [["Playlists", "8 ativas"], ["Novos sons", "34"], ["Retencao", "71%"]],
    actions: [["playlist", "Abrir playlists"], ["catalogo", "Descobrir beats"], ["perfil", "Meu perfil"]],
    sectionTitle: "Sons para sua curadoria",
    sectionSubtitle: "Beats, artistas e vibes com alto potencial",
    playlistTitle: "Playlists para curar agora",
    playlistSubtitle: "Recortes prontos para adaptar ao seu publico",
    combo: "Tema / Faixas / Ordem / Publicacao / Alcance",
  },
  marketing: {
    headline: ["Planeje campanhas.", "Cresca lancamentos."],
    subheadline: "A NEXO IA conecta objetivos musicais a criativos, funis, curadoria, conteudo e proximas acoes de marketing.",
    placeholder: "Ex: Tenho um lancamento de funk em 15 dias e preciso de campanha, criativos e ADS...",
    primaryCta: "Gerar campanha",
    secondaryCta: "Ver demandas",
    chips: [["Pre-lancamento", "Quero montar uma campanha de pre-lancamento."], ["Criativos", "Preciso de ideias de criativos para redes e ADS."], ["ADS", "Quero organizar trafego pago para uma musica."], ["Relatorio", "Quero analisar resultado e proximos passos."]],
    benefits: [["megaphone", "Campanhas claras"], ["line-chart", "Metas visiveis"], ["users-round", "Equipe recomendada"]],
    preview: ["Objetivo de campanha", "Criativos sugeridos", "Publico inicial", "Canais de divulgacao", "Orcamento estimado"],
    mapSteps: [["Objetivo", "Meta do lancamento"], ["Criativos", "Posts e anuncios"], ["Canais", "Playlists e redes"], ["ADS", "Teste de publico"], ["Analise", "Proximos passos"]],
    metrics: [["Campanhas", "4 ativas"], ["Criativos", "12 ideias"], ["ROI alvo", "2.4x"]],
    actions: [["perfil", "Cadastrar servico"], ["profissionais", "Ver equipe"], ["catalogo", "Explorar cases"]],
    sectionTitle: "Campanhas e lancamentos",
    sectionSubtitle: "Demandas para divulgar com direcao e dados",
    playlistTitle: "Referencias para campanhas",
    playlistSubtitle: "Sons e nichos para orientar criativos",
    combo: "Objetivo / Criativos / Canais / ADS / Analise",
  },
};

const playlists = [
  ["Trap na Área", "52 beats", img("photo-1493225457124-a3eb161ffa5f")],
  ["Mainstreet Hits", "38 faixas", img("photo-1514525253161-7a46d19cd819")],
  ["Drill Brutal", "44 beats", img("photo-1507874457470-272b3c8d8ee2")],
  ["Matuê Type", "29 beats", img("photo-1516450360452-9312f5e86fc7")],
  ["Yunk Vino Vibes", "31 beats", img("photo-1521337581100-8ca9a73a5f79")],
  ["Noite 808", "67 beats", img("photo-1501386761578-eac5c94b800a")],
];

const covers = [
  "photo-1516280440614-37939bbacd81",
  "photo-1511379938547-c1f69419868d",
  "photo-1487180144351-b8472da7d491",
  "photo-1533174072545-7a4b6ad7a6c3",
  "photo-1516280440614-37939bbacd81",
  "photo-1493225457124-a3eb161ffa5f",
  "photo-1501386761578-eac5c94b800a",
  "photo-1514525253161-7a46d19cd819",
  "photo-1521337581100-8ca9a73a5f79",
  "photo-1507874457470-272b3c8d8ee2",
  "photo-1516450360452-9312f5e86fc7",
  "photo-1525362081669-2b476bb628c3",
  "photo-1524368535928-5b5e00ddc76b",
  "photo-1499364615650-ec38552f4f34",
  "photo-1506157786151-b8491531f063",
];

const beatNames = [
  "808 Main", "Noite Cara", "Favela Chrome", "Cold Vision", "Focaccia Flow", "Black Coupe",
  "Royal Type", "After Club", "Velvet Room", "Drill de Luxo", "Neon Alley", "Rua 808",
  "Sem Placa", "Midnight Plug", "Grave Lunar", "Cash Route", "Bronx Mood", "Vicio Rosa",
];
const producers = ["prod. Viana", "prod. Lkzin", "Ghost Lab", "Maya Keys", "Rokstar", "Iago Beats", "Ares", "Marte", "Noma", "808 Shelby"];
const genres = ["Trap", "Drill", "Funk", "R&B", "Boom Bap", "Type Beat"];

const beat = (i, badge = "") => ({
  id: `beat-${i % beatNames.length}`,
  title: beatNames[i % beatNames.length],
  producer: producers[i % producers.length],
  cover: img(covers[i % covers.length]),
  tags: [genres[i % genres.length], `${90 + (i * 7) % 62} BPM`],
  badge,
});

const allBeats = Array.from({ length: beatNames.length }, (_, i) => beat(i, i % 7 === 0 ? "Hot" : i % 5 === 0 ? "Novo" : ""));
const appState = {
  favorites: new Set(JSON.parse(localStorage.getItem("ansend-favorites") || "[]")),
  purchases: JSON.parse(localStorage.getItem("ansend-purchases") || "[]"),
  onboardingProfile: JSON.parse(localStorage.getItem("ansend-onboarding-profile") || "null"),
  catalogItems: JSON.parse(localStorage.getItem("ansend-catalog-items") || "[]"),
  aiPlan: JSON.parse(localStorage.getItem("ansend-ai-plan") || "null"),
  authUser: null,
  profile: JSON.parse(localStorage.getItem("ansend-profile-preview") || "null"),
  authReady: !supabaseClient,
  query: "",
  genre: "Todos",
  playing: null,
  sellerMode: "login",
};

const onboardingStyles = [
  { id: "trap", label: "Trap", desc: "808 forte, melodia escura e espaço para voz.", icon: "flame", genres: ["Trap", "Type Beat"] },
  { id: "drill", label: "Drill", desc: "Bateria seca, grave pesado e clima agressivo.", icon: "target", genres: ["Drill", "Trap"] },
  { id: "funk", label: "Funk", desc: "Ritmo direto, bounce e energia de pista.", icon: "radio", genres: ["Funk", "Type Beat"] },
  { id: "rnb", label: "R&B", desc: "Textura suave, acordes e refrões melódicos.", icon: "moon", genres: ["R&B", "Boom Bap"] },
  { id: "boombap", label: "Boom Bap", desc: "Bateria clássica, sample e presença urbana.", icon: "disc-3", genres: ["Boom Bap", "R&B"] },
  { id: "type", label: "Type Beat", desc: "Referências atuais para criar rápido.", icon: "sparkles", genres: ["Type Beat", "Trap"] },
];

const onboardingGoals = [
  ["gravar", "Gravar uma música"],
  ["comprar", "Comprar licença"],
  ["descobrir", "Descobrir produtores"],
];

const sections = [
  ["Últimas quentes", "Beats recentes subindo no feed", "flame", Array.from({ length: 6 }, (_, i) => beat(i, i % 2 ? "" : "Hot"))],
  ["Novos beats", "Uploads frescos dos produtores", "badge-plus", Array.from({ length: 6 }, (_, i) => beat(i + 4, "Novo"))],
  ["Trending em Trap", "Graves pesados e melodias escuras", "trending-up", Array.from({ length: 6 }, (_, i) => beat(i + 8, i === 1 ? "Em alta" : ""))],
  ["Trending em Down Drop", "Capas urbanas e beats densos", "zap", Array.from({ length: 6 }, (_, i) => beat(i + 12, i === 3 ? "Exclusivo" : ""))],
  ["Top vendedores", "Produtores com mais vendas no mês", "trophy", "avatars"],
  ["Mais procurados", "Buscas que estão explodindo agora", "search-check", Array.from({ length: 6 }, (_, i) => beat(i + 2, i === 0 ? "Hot" : ""))],
  ["Produtores em destaque", "Perfis verificados para seguir", "badge-check", "avatars"],
];

const lateSections = [
  ["Amados pela comunidade", "Os favoritos de artistas independentes", "heart", Array.from({ length: 6 }, (_, i) => beat(i + 6, i % 3 === 0 ? "Hot" : ""))],
  ["Mais bang", "Artistas e produtores no radar", "badge-dollar-sign", "avatars"],
  ["Na pista frequentemente", "Beats recorrentes em playlists urbanas", "disc-3", Array.from({ length: 6 }, (_, i) => beat(i + 10, i === 2 ? "Novo" : ""))],
  ["Colabs em alta", "Encontros entre produtores e artistas", "users-round", Array.from({ length: 6 }, (_, i) => beat(i + 14, i === 4 ? "Exclusivo" : ""))],
];

const avatarImages = [
  "photo-1527980965255-d3b416303d12", "photo-1500648767791-00dcc994a43e", "photo-1494790108377-be9c29b29330",
  "photo-1522556189639-b150ed9c4330", "photo-1531384441138-2736e62e0919", "photo-1544723795-3fb6469f5b39",
  "photo-1504593811423-6dd665756598", "photo-1507003211169-0a1dd7228f2d",
];
const avatars = ["Faijo Gonzales", "Akira Beat", "Maya Keys", "Ghost Lab", "Rokstar", "DJ Shelby", "Noma", "Ares"];

function slugify(value) {
  return String(value || "playlist")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "playlist";
}

function playlistCard([title, subtitle, cover]) {
  const playlistId = slugify(title);
  return `<article class="playlist-card gradient-card spotlight-card" style="--card-art: url('${cover}')" data-playlist="${title}" data-playlist-id="${playlistId}">
    <button class="playlist-action gradient-card-body" type="button" data-action="playlist" data-title="${title}" data-playlist-id="${playlistId}" aria-label="Abrir ${title}">
      <img class="card-art-source" src="${cover}" alt="Capa ${title}">
      <span class="card-orb"><i data-lucide="list-music"></i></span>
      <span class="card-copy"><strong>${title}</strong><small>${subtitle}</small></span>
      <span class="card-link">Abrir <i data-lucide="arrow-right"></i></span>
    </button>
  </article>`;
}

function beatCard(item) {
  const klass = item.badge === "Novo" ? "new" : item.badge === "Exclusivo" ? "exclusive" : "";
  const favoriteClass = appState.favorites.has(item.id) ? " is-favorite" : "";
  return `<article class="beat-card gradient-card spotlight-card" style="--card-art: url('${item.cover}')" data-beat-id="${item.id}" tabindex="0" role="link" aria-label="Ver detalhes de ${item.title}">
    <img class="card-art-source" src="${item.cover}" alt="Capa do beat ${item.title}">
    ${item.badge ? `<span class="badge ${klass}">${item.badge}</span>` : ""}
    <button class="fav-over${favoriteClass}" type="button" data-action="favorite" data-id="${item.id}" aria-label="Favoritar ${item.title}"><i data-lucide="heart"></i></button>
    <button class="play-over" type="button" data-action="play" data-id="${item.id}" aria-label="Tocar ${item.title}"><i data-lucide="play"></i></button>
    <div class="gradient-card-body">
      <span class="card-orb"><i data-lucide="star"></i></span>
      <span class="card-copy"><strong>${item.title}</strong><small>${item.producer} / ${item.tags[0]}</small></span>
      <button class="card-link" type="button" data-action="buy" data-id="${item.id}">Licença <i data-lucide="arrow-right"></i></button>
    </div>
  </article>`;
}

function avatarCard(name, i) {
  return `<article class="avatar-card"><button type="button" data-action="producer" data-title="${name}" aria-label="Abrir perfil de ${name}"><img src="${img(avatarImages[i % avatarImages.length])}" alt="Avatar de ${name}"><h3>${name}<i data-lucide="badge-check"></i></h3><p>${420 + i * 137} vendas</p></button></article>`;
}

const quickActions = [
  ["brain-circuit", "Criar plano com IA", "Receba a ordem certa para lançar.", "ia"],
  ["audio-lines", "Encontrar beatmaker", "Ache beats e produtores com match.", "produtores"],
  ["image", "Criar capa", "Encontre designers para single e EP.", "produtores"],
  ["sliders-horizontal", "Finalizar música", "Mix, master e produção vocal.", "produtores"],
  ["megaphone", "Divulgar lançamento", "Curadoria, conteúdo e marketing.", "produtores"],
];

const nexoRecommendations = [
  { icon: "audio-lines", title: "Black Coupe", type: "Beat", reason: "Bom para trap melódico", route: "beat-5" },
  { icon: "palette", title: "Maya Keys", type: "Designer", reason: "Ideal para capa dark premium", route: "produtores" },
  { icon: "boxes", title: "Combo Completo", type: "Pacote", reason: "Produção + capa + divulgação", route: "explorar" },
  { icon: "sliders-horizontal", title: "Ghost Lab", type: "Produtor", reason: "Mix e master para voz urbana", route: "produtores" },
  { icon: "list-music", title: "Curadoria Trap", type: "Serviço", reason: "Playlists com fit para lançamento", route: "playlist" },
  { icon: "megaphone", title: "ADS Inicial", type: "Marketing", reason: "Teste de público antes do drop", route: "produtores" },
];

const mainCategories = [
  ["audio-lines", "Beatmakers", "Beats, packs e licenças para gravar.", "produtores"],
  ["palette", "Designers", "Capas, identidade e peças para redes.", "produtores"],
  ["sliders-horizontal", "Produtores Musicais", "Produção, mixagem e masterização.", "produtores"],
  ["list-music", "Curadores", "Playlists, seleção e posicionamento.", "produtores"],
  ["megaphone", "Marketing Musical", "Campanhas, conteúdo e tráfego.", "produtores"],
];

const smartCombos = [
  ["Combo Produção", "Beat + Mixagem + Masterização", "Economia sugerida: 15%"],
  ["Combo Lançamento", "Capa + Curadoria", "Economia sugerida: 12%"],
  ["Combo Completo", "Produção + Capa + Divulgação", "Economia sugerida: 20%"],
];

function quickActionCard([icon, title, desc, route]) {
  return `<a class="quick-action-card" href="#${route}" data-route="${route}">
    <i data-lucide="${icon}"></i>
    <strong>${title}</strong>
    <span>${desc}</span>
  </a>`;
}

function nexoRecommendationCard(item) {
  return `<article class="nexo-recommendation-card">
    <div class="recommendation-icon"><i data-lucide="${item.icon}"></i></div>
    <span>${item.type}</span>
    <strong>${item.title}</strong>
    <p>${item.reason}</p>
    <a href="#${item.route}" data-route="${item.route}">Abrir <i data-lucide="arrow-right"></i></a>
  </article>`;
}

function categoryCard([icon, title, desc, route]) {
  return `<article class="category-card">
    <i data-lucide="${icon}"></i>
    <strong>${title}</strong>
    <p>${desc}</p>
    <a href="#${route}" data-route="${route}">Explorar</a>
  </article>`;
}

function smartComboCard([title, services, economy], index) {
  return `<article class="smart-combo-card ${index === 2 ? "is-featured" : ""}">
    <span>${index === 2 ? "Mais completo" : "Combo inteligente"}</span>
    <strong>${title}</strong>
    <p>${services}</p>
    <small>${economy}</small>
    <button type="button" data-action="ai-chip" data-prompt="Quero montar o ${title.toLowerCase()} para meu lançamento.">Montar combo</button>
  </article>`;
}

function featuredProfessionalCard(name, index) {
  const categories = ["Beatmaker", "Designer", "Produtor", "Curador", "Marketing"];
  return `<article class="featured-professional-card">
    <img src="${img(avatarImages[index % avatarImages.length])}" alt="Avatar de ${name}">
    <div>
      <strong>${name}<i data-lucide="badge-check"></i></strong>
      <span>${categories[index % categories.length]} · ${(4.7 + (index % 3) / 10).toFixed(1)}</span>
    </div>
    <button type="button" data-action="producer" data-title="${name}">Ver perfil</button>
  </article>`;
}

function recentActivityRow(item, index) {
  const labels = ["Plano gerado", "Beat favoritado", "Serviço contratado", "Combo montado", "Perfil seguido"];
  return `<article>
    <i data-lucide="${["sparkles", "heart", "shopping-bag", "boxes", "user-plus"][index] || "activity"}"></i>
    <div><strong>${labels[index]}</strong><span>${item.title} · ${item.producer}</span></div>
    <small>${index + 2} min</small>
  </article>`;
}

function renderHomeDashboard() {
  const quick = document.querySelector("#quickActionGrid");
  const recommendations = document.querySelector("#nexoRecommendationGrid");
  const categories = document.querySelector("#categoryGrid");
  const combos = document.querySelector("#smartComboGrid");
  const featured = document.querySelector("#featuredCatalogPreview");
  const professionals = document.querySelector("#featuredProfessionals");
  const activity = document.querySelector("#recentActivity");

  if (quick) quick.innerHTML = quickActions.map(quickActionCard).join("");
  if (recommendations) recommendations.innerHTML = nexoRecommendations.slice(0, 6).map(nexoRecommendationCard).join("");
  if (categories) categories.innerHTML = mainCategories.map(categoryCard).join("");
  if (combos) combos.innerHTML = smartCombos.map(smartComboCard).join("");
  if (featured) featured.innerHTML = preferredBeats(6).map((item, index) => beatCard({ ...item, badge: index === 0 ? "Destaque" : "" })).join("");
  if (professionals) professionals.innerHTML = avatars.slice(0, 6).map(featuredProfessionalCard).join("");
  if (activity) activity.innerHTML = preferredBeats(5).map(recentActivityRow).join("");
}

function sectionTemplate([title, subtitle, icon, content]) {
  const body = content === "avatars"
    ? `<div class="avatar-row">${avatars.map(avatarCard).join("")}</div>`
    : `<div class="beat-row">${content.map(beatCard).join("")}</div>`;
  return `<section class="catalog-section">
    <div class="section-head">
      <div><h2><i data-lucide="${icon}"></i>${title}</h2><p>${subtitle}</p></div>
      <div class="arrow-pair"><button type="button" aria-label="Anterior"><i data-lucide="chevron-left"></i></button><button type="button" aria-label="Próximo"><i data-lucide="chevron-right"></i></button></div>
    </div>
    ${body}
  </section>`;
}

function trackRow(item, i) {
  return `<article class="track-row">
    <img src="${item.cover}" alt="Mini capa ${item.title}">
    <div class="track-title"><strong>${i + 1}. ${item.title}</strong><span>${item.tags.join(" · ")}</span></div>
    <div class="track-prod"><strong>${item.producer}</strong><span>verificado</span></div>
    <div class="track-meta track-bpm">${item.tags[1]}</div>
    <div class="track-meta track-genre">${item.tags[0]}</div>
    <div class="track-actions"><button type="button" aria-label="Tocar"><i data-lucide="play"></i></button><button type="button" aria-label="Favoritar"><i data-lucide="heart"></i></button><button type="button" aria-label="Carrinho"><i data-lucide="shopping-cart"></i></button><button class="track-buy" type="button">[VALOR]</button></div>
  </article>`;
}

document.querySelector("#playlistRow") && (document.querySelector("#playlistRow").innerHTML = playlists.map(playlistCard).join(""));
document.querySelector('[data-feed="explore"]') && (document.querySelector('[data-feed="explore"]').innerHTML = Array.from({ length: 6 }, (_, i) => beatCard(beat(i + 1, i === 4 ? "Em alta" : ""))).join(""));
document.querySelector("#dynamicSections") && (document.querySelector("#dynamicSections").innerHTML = sections.map(sectionTemplate).join(""));
document.querySelector("#trackList") && (document.querySelector("#trackList").innerHTML = Array.from({ length: 8 }, (_, i) => trackRow(beat(i + 3, ""), i)).join(""));
document.querySelector("#lateSections") && (document.querySelector("#lateSections").innerHTML = lateSections.map(sectionTemplate).join(""));
renderHomeDashboard();

const supportsPrecisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let revealObserver = null;
let lastRoute = null;

function currentRouteFromHash() {
  const route = location.hash.replace("#", "") || "feed";
  if (route.startsWith("beat-")) return "detalhe";
  if (route.startsWith("playlist-")) return "playlist";
  return routeTitles?.[route] ? route : "feed";
}

function updateSpotlight(event) {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  card.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
  card.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
}

function enableSpotlights() {
  document.querySelectorAll(".spotlight-card").forEach((card) => {
    card.removeEventListener("pointermove", updateSpotlight);
    if (supportsPrecisePointer.matches && !prefersReducedMotion.matches) {
      card.addEventListener("pointermove", updateSpotlight, { passive: true });
    } else {
      card.style.setProperty("--spot-x", "50%");
      card.style.setProperty("--spot-y", "0%");
    }
  });
}

enableSpotlights();
supportsPrecisePointer.addEventListener?.("change", enableSpotlights);
prefersReducedMotion.addEventListener?.("change", enableSpotlights);

let autoScrollFrame = null;
let autoScrollRows = [];
let heroShader = null;

function destroyHeroShader() {
  if (!heroShader) return;
  heroShader.destroy();
  heroShader = null;
}

function setupHeroShader() {
  const container = document.querySelector("[data-hero-shader]");
  destroyHeroShader();
  if (!container || prefersReducedMotion.matches || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const clock = new THREE.Clock();
  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(1, 1) },
    iMouse: { value: new THREE.Vector2(.5, .5) },
  };
  const material = new THREE.ShaderMaterial({
    transparent: false,
    depthWrite: false,
    uniforms,
    vertexShader: `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      void main() {
        vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
        vec2 mouse = (2.0 * iMouse - iResolution.xy) / min(iResolution.x, iResolution.y);
        float t = iTime * 0.42;

        for (float i = 1.0; i < 10.0; i++) {
          uv.x += 0.5 / i * cos(i * 2.35 * uv.y + t);
          uv.y += 0.5 / i * cos(i * 1.45 * uv.x + t * 1.12);
        }

        float lines = 0.075 / max(abs(sin(t - uv.y - uv.x)), 0.075);
        float pointerGlow = smoothstep(0.7, 0.0, length(uv - mouse)) * 0.16;
        float centerShade = smoothstep(0.0, 1.15, length(uv * vec2(.82, 1.0)));
        vec3 black = vec3(0.0);
        vec3 ember = vec3(0.42, 0.075, 0.0);
        vec3 orange = vec3(1.0, 0.28, 0.0);
        vec3 color = mix(black, ember, clamp(lines * .42, 0.0, 1.0));
        color += orange * clamp(lines * .18 + pointerGlow, 0.0, .62);
        color *= mix(.42, 1.0, centerShade);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  const resize = () => {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    renderer.setSize(width, height, false);
    uniforms.iResolution.value.set(width, height);
    uniforms.iMouse.value.set(width * .58, height * .48);
  };
  const onPointerMove = (event) => {
    const bounds = container.getBoundingClientRect();
    uniforms.iMouse.value.set(event.clientX - bounds.left, bounds.height - (event.clientY - bounds.top));
  };
  const tick = () => {
    uniforms.iTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
  };

  const pointerArea = container.closest(".playlist-hero, .seller-auth-showcase") || container;
  window.addEventListener("resize", resize);
  pointerArea.addEventListener("pointermove", onPointerMove, { passive: true });
  resize();
  renderer.setAnimationLoop(tick);

  heroShader = {
    destroy() {
      window.removeEventListener("resize", resize);
      pointerArea.removeEventListener("pointermove", onPointerMove);
      renderer.setAnimationLoop(null);
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}

function pauseAutoScroll(row, duration = 1600) {
  row.dataset.paused = "true";
  clearTimeout(row._autoScrollTimer);
  row._autoScrollTimer = setTimeout(() => {
    row.dataset.paused = "false";
  }, duration);
}

function prepareAutoScrollRow(row) {
  if (row.dataset.loopReady !== "true") {
    const originals = [...row.children];
    originals.forEach((child) => {
      const clone = child.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("button, a, input, select").forEach((control) => {
        control.tabIndex = -1;
      });
      row.appendChild(clone);
    });
    row.dataset.loopReady = "true";
  }

  if (row.dataset.pauseReady !== "true") {
    row.addEventListener("mouseenter", () => pauseAutoScroll(row));
    row.addEventListener("focusin", () => pauseAutoScroll(row, 2200));
    row.addEventListener("pointerdown", () => pauseAutoScroll(row, 2200));
    row.addEventListener("touchstart", () => pauseAutoScroll(row, 2200), { passive: true });
    row.addEventListener("wheel", () => pauseAutoScroll(row, 2200), { passive: true });
    row.dataset.pauseReady = "true";
  }
}

function autoScrollTick() {
  autoScrollRows = autoScrollRows.filter((row) => row.isConnected);
  autoScrollRows.forEach((row) => {
    if (row.dataset.paused === "true") return;
    const loopPoint = row.scrollWidth / 2;
    row.scrollLeft += 1.15;
    if (row.scrollLeft >= loopPoint) row.scrollLeft -= loopPoint;
  });
  autoScrollFrame = autoScrollRows.length ? requestAnimationFrame(autoScrollTick) : null;
}

function setupAutoScrollRows() {
  if (autoScrollFrame) {
    cancelAnimationFrame(autoScrollFrame);
    autoScrollFrame = null;
  }
  autoScrollRows = [];
  if (prefersReducedMotion.matches) return;

  document.querySelectorAll(".playlist-row, .beat-row, .avatar-row").forEach((row) => {
    if (row.children.length < 2) return;
    prepareAutoScrollRow(row);
    if (row.scrollWidth > row.clientWidth + 12) {
      row.classList.add("is-auto-scrolling");
      row.dataset.paused = row.dataset.paused || "false";
      autoScrollRows.push(row);
    }
  });

  if (autoScrollRows.length) autoScrollFrame = requestAnimationFrame(autoScrollTick);
}

prefersReducedMotion.addEventListener?.("change", setupAutoScrollRows);
prefersReducedMotion.addEventListener?.("change", setupHeroShader);

function setupScrollReveals() {
  const targets = document.querySelectorAll(".home-section, .catalog-section, .view-header, .view-grid, .purchase-list, .producer-grid, .settings-panel, .seller-auth, .profile-page, .profile-catalog-form, .profile-catalog-list, .beat-detail-layout, .producer-profile, .playlist-detail-layout, .playlist-detail-side");
  if (revealObserver) revealObserver.disconnect();
  targets.forEach((target, index) => {
    target.classList.add("reveal-section");
    target.style.setProperty("--reveal-delay", `${Math.min(index * 34, 170)}ms`);
  });
  if (prefersReducedMotion.matches) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  targets.forEach((target) => revealObserver.observe(target));
}

function decorateControls() {
  document.querySelectorAll(".arrow-pair").forEach((pair) => {
    const buttons = pair.querySelectorAll("button");
    if (buttons[0]) buttons[0].dataset.action = "scroll-prev";
    if (buttons[1]) buttons[1].dataset.action = "scroll-next";
  });
  document.querySelectorAll(".chip-row button").forEach((button) => {
    button.dataset.action = "filter";
    button.dataset.genre = button.textContent.trim();
  });
  const heroPlay = document.querySelector(".play-circle");
  if (heroPlay) {
    heroPlay.dataset.action = "play";
    heroPlay.dataset.id = allBeats[0].id;
  }
  const openPlaylist = document.querySelector(".open-playlist");
  if (openPlaylist) {
    openPlaylist.dataset.action = "playlist";
    openPlaylist.dataset.title = "Mainstreet Type Beats";
  }
  document.querySelectorAll("#trackList .track-row").forEach((row, index) => {
    const item = allBeats[(index + 3) % allBeats.length];
    const buttons = row.querySelectorAll("button");
    if (buttons[0]) Object.assign(buttons[0].dataset, { action: "play", id: item.id });
    if (buttons[1]) Object.assign(buttons[1].dataset, { action: "favorite", id: item.id });
    if (buttons[2]) Object.assign(buttons[2].dataset, { action: "buy", id: item.id });
    if (buttons[3]) Object.assign(buttons[3].dataset, { action: "buy", id: item.id });
  });
}

decorateControls();
const appView = document.querySelector("#appView");
const feedTemplate = appView.innerHTML;
const routeTitles = {
  feed: ["Feed", "Sua seleção diária de playlists, beats e produtores."],
  explorar: ["Explorar", "Encontre novos sons por gênero, BPM ou produtor."],
  favoritos: ["Favoritos", "Tudo que você marcou para ouvir depois."],
  compras: ["Minhas compras", "Licenças e beats adquiridos na sua conta."],
  biblioteca: ["Biblioteca", "Playlists, históricos e itens salvos em um só lugar."],
  produtores: ["Produtores", "Conheça produtores verificados da comunidade ANSEND."],
  configuracoes: ["Configurações", "Personalize sua experiência na plataforma."],
  detalhe: ["Detalhe do beat", "Informações, licença e perfil do produtor."],
};
routeTitles.feed = ["Home", "Dashboard resumido com IA, recomendacoes e proximos passos."];
routeTitles.compras = ["Pedidos", "Historico de pedidos, licencas e servicos contratados."];
routeTitles.ia = ["NEXO IA", "Diagnostico musical inteligente para adaptar sua jornada."];
routeTitles.produtores = ["Profissionais", "Beatmakers, designers, produtores, curadores e marketing musical."];
routeTitles.vendedor = ["Conta ANSEND", "Cadastre, entre e escolha a função da sua conta na plataforma."];

routeTitles.perfil = ["Meu perfil", "Sua conta, catalogo e publicacoes na ANSEND."];
routeTitles.playlist = ["Playlist", "Pack selecionado com beats, referencias e licencas."];

function persistState() {
  localStorage.setItem("ansend-favorites", JSON.stringify([...appState.favorites]));
  localStorage.setItem("ansend-purchases", JSON.stringify(appState.purchases));
}

function persistAiPlan(plan) {
  appState.aiPlan = plan;
  localStorage.setItem("ansend-ai-plan", JSON.stringify(plan));
}

function normalizeRole(role) {
  const key = String(role || "").toLowerCase();
  const map = {
    artist: "artista",
    artista: "artista",
    beatmaker: "beatmaker",
    beat: "beatmaker",
    designer: "designer",
    produtor: "produtor",
    producer: "produtor",
    producao: "produtor",
    curador: "curador",
    curator: "curador",
    marketing: "marketing",
    marketer: "marketing",
    manager: "marketing",
    selo: "curador",
  };
  return map[key] || "artista";
}

function activeRoleKey() {
  return normalizeRole(activeProfile()?.account_role || activeProfile()?.userType || appState.onboardingProfile?.account_role || "artista");
}

function roleDashboard(role = activeRoleKey()) {
  return roleDashboards[normalizeRole(role)] || roleDashboards.artista;
}

function roleChoice(role = activeRoleKey()) {
  return roleChoices.find((item) => item.id === normalizeRole(role)) || roleChoices[0];
}

function inferLaunchPlan(prompt) {
  const role = activeRoleKey();
  const dashboard = roleDashboard(role);
  if (role !== "artista") {
    return {
      prompt,
      role,
      genre: roleChoice(role).shortLabel,
      budget: "[VALOR] estimado",
      combo: dashboard.combo,
      match: dashboard.preview.map((item) => `${item}: recomendado pela NEXO IA`),
      steps: dashboard.mapSteps.map(([title, detail]) => ({ title, detail })),
    };
  }
  const text = prompt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const wantsRelease = /lancar|lan.ar|spotify|distribui|release|plataforma/.test(text);
  const hasLyrics = /letra|verso|refrao/.test(text);
  const hasDemo = /demo|gravada|voz|previa/.test(text);
  const wantsMarketing = /divulg|marketing|ads|trafego|playlist|curadoria/.test(text);
  const genre = /drill/.test(text) ? "Drill" : /funk/.test(text) ? "Funk" : /r&b|rnb/.test(text) ? "R&B" : /boom bap/.test(text) ? "Boom Bap" : "Trap";
  const budget = wantsMarketing ? "[VALOR] + campanha" : wantsRelease ? "[VALOR] lançamento" : "[VALOR] inicial";
  const combo = [
    hasLyrics && !hasDemo ? "Beatmaker + produtor vocal" : "Produtor musical",
    "Designer de capa",
    wantsRelease ? "Distribuição + curadoria" : "Curadoria ANSEND",
    wantsMarketing ? "Marketing musical + ADS" : "Plano de divulgação orgânica",
  ];
  return {
    prompt,
    role,
    genre,
    budget,
    combo: combo.join(" / "),
    match: [
      `Beatmaker ideal: ${genre} com estética premium`,
      "Designer para capa: visual dark/laranja de lançamento",
      hasDemo ? "Produtor/mixagem: finalizar demo e master" : "Produtor/mixagem: guia de gravação e mix",
      wantsMarketing ? "Curador + marketing: playlists, criativos e tráfego" : "Curador: encaixe em playlists e referências",
    ],
    steps: [
      { title: "Produção", detail: hasLyrics ? "Escolher beatmaker e fechar estrutura da letra" : "Definir direção sonora e referência" },
      { title: "Identidade", detail: "Criar capa e peças para redes" },
      { title: "Lançamento", detail: wantsRelease ? "Preparar distribuição e licenças" : "Organizar arquivos e cronograma" },
      { title: "Divulgação", detail: wantsMarketing ? "Ativar curadoria, marketing musical e ADS" : "Montar curadoria e calendário de posts" },
      { title: "Crescimento", detail: "Analisar resultado e próximos passos" },
    ],
  };
}

function renderAiPlan(plan = appState.aiPlan) {
  const output = document.querySelector("#aiOutput");
  const map = document.querySelector("#releaseMap");
  if (!output || !map) return;
  if (!plan || !plan.role || plan.role !== activeRoleKey()) return;
  output.classList.add("is-generated");
  output.innerHTML = `<small>Plano recomendado</small>
    <strong>${plan.genre} / ${plan.budget}</strong>
    <ul>${plan.match.map((item) => `<li>${item}</li>`).join("")}</ul>
    <em>Combo sugerido: ${plan.combo}</em>`;
  map.innerHTML = plan.steps.map((step, index) => `<li class="is-ready">
    <i data-lucide="${["disc-3", "image", "upload-cloud", "megaphone", "line-chart"][index] || "check-circle-2"}"></i>
    <span>${step.title}</span>
    <b>${step.detail}</b>
  </li>`).join("");
}

function defaultRolePreview(dashboard = roleDashboard()) {
  const output = document.querySelector("#aiOutput");
  const map = document.querySelector("#releaseMap");
  if (map) {
    map.innerHTML = dashboard.mapSteps.map(([title, detail], index) => `<li>
      <i data-lucide="${["disc-3", "image", "upload-cloud", "list-music", "megaphone"][index] || "check-circle-2"}"></i>
      <span>${title}</span>
      <b>${detail}</b>
    </li>`).join("");
  }
  if (output) {
    output.classList.remove("is-generated");
    output.innerHTML = `<small>NEXO recomenda</small>
      <ul>${dashboard.preview.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }
}

function roleDashboardStripMarkup(dashboard) {
  const metrics = dashboard.metrics.map(([label, value]) => `<article class="role-metric-card">
    <span>${label}</span>
    <strong>${value}</strong>
  </article>`).join("");
  const actionMap = {
    catalogo: ["#explorar", "compass"],
    profissionais: ["#produtores", "users-round"],
    perfil: ["#perfil", "user-round"],
    playlist: ["#playlist", "list-music"],
  };
  const actions = dashboard.actions.map(([route, label]) => {
    const [href, icon] = actionMap[route] || ["#feed", "arrow-right"];
    return `<a class="role-action-card" href="${href}" data-route="${href.replace("#", "")}">
      <i data-lucide="${icon}"></i>
      <span>${label}</span>
    </a>`;
  }).join("");
  return `<section class="role-dashboard-strip" id="roleDashboardStrip" aria-label="Dashboard NEXO IA">
    <div class="role-dashboard-copy">
      <span>NEXO IA</span>
      <strong>${roleChoice().shortLabel}</strong>
      <p>${dashboard.combo}</p>
    </div>
    <div class="role-dashboard-metrics">${metrics}</div>
    <div class="role-dashboard-actions">${actions}</div>
  </section>`;
}

function applyRoleDashboard() {
  const dashboard = roleDashboard();
  const hero = document.querySelector(".ai-hero");
  if (!hero) return;
  hero.setAttribute("aria-label", "NEXO IA - Diagnostico Musical Inteligente");
  const kicker = hero.querySelector(".an-kicker span");
  const title = hero.querySelector(".an-hero-copy h1");
  const subtitle = hero.querySelector(".an-hero-copy > p");
  const input = hero.querySelector("#aiPrompt");
  const chips = hero.querySelector(".ai-chip-row");
  const primary = hero.querySelector(".ai-actions .an-primary");
  const secondary = hero.querySelector(".ai-actions .an-secondary");
  const benefits = hero.querySelector(".an-benefits");
  const mapTitle = hero.querySelector(".ai-map-card > strong");

  if (kicker) kicker.textContent = "NEXO IA";
  if (title) title.innerHTML = `<span>${dashboard.headline[0]}</span><strong>${dashboard.headline[1]}</strong>`;
  if (subtitle) subtitle.textContent = dashboard.subheadline;
  if (input) input.placeholder = dashboard.placeholder;
  if (chips) {
    chips.innerHTML = dashboard.chips.map(([label, prompt]) => `<button type="button" data-action="ai-chip" data-prompt="${prompt}">${label}</button>`).join("");
  }
  if (primary) primary.innerHTML = `${dashboard.primaryCta} <i data-lucide="arrow-right"></i>`;
  if (secondary) secondary.innerHTML = `${dashboard.secondaryCta} <i data-lucide="users-round"></i>`;
  if (benefits) {
    benefits.innerHTML = dashboard.benefits.map(([icon, label]) => `<span><i data-lucide="${icon}"></i>${label}</span>`).join("");
  }
  if (mapTitle) mapTitle.textContent = "Diagnostico Musical IA";
  if (!appState.aiPlan || appState.aiPlan.role !== activeRoleKey()) defaultRolePreview(dashboard);

  document.querySelector("#roleDashboardStrip")?.remove();

  const labels = {
    ia: "NEXO IA",
    explorar: activeRoleKey() === "artista" ? "Explorar" : "Demandas",
    compras: "Pedidos",
    biblioteca: activeRoleKey() === "curador" ? "Playlists" : "Biblioteca",
    produtores: activeRoleKey() === "artista" ? "Profissionais" : "Comunidade",
  };
  Object.entries(labels).forEach(([route, label]) => {
    const target = document.querySelector(`[data-route="${route}"] span`);
    if (target) target.textContent = label;
  });
}

function persistCatalogItems() {
  localStorage.setItem("ansend-catalog-items", JSON.stringify(appState.catalogItems));
}

function catalogOwnerId() {
  return appState.authUser?.id || appState.profile?.id || "preview";
}

function visibleCatalogItems() {
  const owner = catalogOwnerId();
  return appState.catalogItems.filter((item) => item.user_id === owner || (!appState.authUser && String(item.id || "").startsWith("local-")));
}

async function loadCatalogItems() {
  if (!supabaseClient || !appState.authUser) return;
  const { data, error } = await supabaseClient
    .from("catalog_items")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    showToast("Nao consegui carregar seu catalogo no Supabase", "cloud-off");
    return;
  }
  appState.catalogItems = data || [];
  persistCatalogItems();
}

function catalogPayloadFromForm(form) {
  const tags = String(form.elements.tags?.value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  return {
    kind: form.elements.kind.value,
    title: form.elements.title.value.trim(),
    artist_name: form.elements.artist.value.trim() || null,
    producer_name: form.elements.producer.value.trim() || activeProfile()?.artistic_name || activeProfile()?.full_name || null,
    genre: form.elements.genre.value.trim(),
    bpm: form.elements.bpm.value ? Number(form.elements.bpm.value) : null,
    musical_key: form.elements.key.value.trim() || null,
    price: form.elements.price.value ? Number(form.elements.price.value) : 0,
    license_type: form.elements.license.value,
    status: form.elements.status.value,
    audio_url: form.elements.audio_url.value.trim() || null,
    cover_url: form.elements.cover_url.value.trim() || null,
    description: form.elements.description.value.trim() || null,
    tags,
  };
}

async function saveCatalogItem(form) {
  const payload = catalogPayloadFromForm(form);
  if (!payload.title || !payload.genre) {
    showToast("Preencha titulo e genero para cadastrar", "triangle-alert");
    return;
  }

  if (supabaseClient && appState.authUser) {
    const { data, error } = await supabaseClient
      .from("catalog_items")
      .insert({ ...payload, user_id: appState.authUser.id })
      .select()
      .single();
    if (error) {
      showToast(error.message || "Nao foi possivel salvar no Supabase", "triangle-alert");
      return;
    }
    appState.catalogItems.unshift(data);
    showToast("Item salvo no catalogo Supabase", "cloud-check");
  } else {
    const localItem = {
      ...payload,
      id: `local-${Date.now()}`,
      user_id: catalogOwnerId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    appState.catalogItems.unshift(localItem);
    showToast("Item salvo neste navegador. Entre para sincronizar no Supabase.", "hard-drive");
  }

  persistCatalogItems();
  form.reset();
  renderRoute();
}

async function deleteCatalogItem(id) {
  if (supabaseClient && appState.authUser && !String(id).startsWith("local-")) {
    const { error } = await supabaseClient.from("catalog_items").delete().eq("id", id);
    if (error) {
      showToast(error.message || "Nao foi possivel remover", "triangle-alert");
      return;
    }
  }
  appState.catalogItems = appState.catalogItems.filter((item) => item.id !== id);
  persistCatalogItems();
  showToast("Item removido do catalogo", "trash-2");
  renderRoute();
}

async function toggleCatalogStatus(id) {
  const item = appState.catalogItems.find((entry) => entry.id === id);
  if (!item) return;
  const nextStatus = item.status === "published" ? "draft" : "published";
  if (supabaseClient && appState.authUser && !String(id).startsWith("local-")) {
    const { data, error } = await supabaseClient.from("catalog_items").update({ status: nextStatus }).eq("id", id).select().single();
    if (error) {
      showToast(error.message || "Nao foi possivel atualizar", "triangle-alert");
      return;
    }
    Object.assign(item, data);
  } else {
    item.status = nextStatus;
    item.updated_at = new Date().toISOString();
  }
  persistCatalogItems();
  showToast(nextStatus === "published" ? "Item publicado" : "Item voltou para rascunho", nextStatus === "published" ? "badge-check" : "pencil");
  renderRoute();
}

function pendingProfileKey(userId) {
  return `ansend-pending-profile-${userId}`;
}

function activeProfile() {
  return appState.profile || appState.onboardingProfile || null;
}

function accountRoleLabel(role = activeProfile()?.account_role) {
  return roleLabels[role] || "Visitante";
}

function accountGreeting() {
  const profile = activeProfile();
  if (!profile?.account_role) return "Sua seleção diária de playlists, beats e produtores.";
  const label = accountRoleLabel(profile.account_role);
  const map = {
    produtor: "Painel adaptado para publicar beats, vender licenças e acompanhar catálogo.",
    curador: "Playlists e descobertas organizadas para sua curadoria.",
    artista: "Beats, licenças e produtores priorizados para seu próximo lançamento.",
    designer: "Referências, capas e catálogos para apoiar lançamentos musicais.",
    beatmaker: "Catálogos e referências para criar, colaborar e vender beats.",
    manager: "Compras, artistas e licenças reunidas para gerenciar lançamentos.",
    selo: "Catálogos, produtores e licenças prontos para operação de selo.",
  };
  return map[profile.account_role] || `Experiência adaptada para ${label}.`;
}

function accountRoleLabel(role = activeProfile()?.account_role) {
  const choice = roleChoice(role);
  return choice?.shortLabel || roleLabels[role] || "Visitante";
}

function accountGreeting() {
  const profile = activeProfile();
  if (!profile?.account_role) return "Sua selecao diaria de playlists, beats e profissionais.";
  return roleDashboard(profile.account_role).subheadline;
}

function setLocalPreviewProfile(profile) {
  appState.profile = profile;
  localStorage.setItem("ansend-profile-preview", JSON.stringify(profile));
}

function localPreviewProfile() {
  return JSON.parse(localStorage.getItem("ansend-profile-preview") || "null");
}

function clearLocalPreviewProfile() {
  localStorage.removeItem("ansend-profile-preview");
}

async function upsertProfile(profile) {
  if (!supabaseClient || !appState.authUser) return { error: new Error("Supabase não configurado") };
  const payload = {
    id: appState.authUser.id,
    email: appState.authUser.email || profile.email,
    full_name: profile.full_name,
    account_role: profile.account_role,
    artistic_name: profile.artistic_name || null,
    music_styles: profile.music_styles || preferredGenres(),
    onboarding_goal: profile.onboarding_goal || appState.onboardingProfile?.goal || null,
  };
  const { data, error } = await supabaseClient.from("profiles").upsert(payload, { onConflict: "id" }).select().single();
  if (!error && data) appState.profile = data;
  return { data, error };
}

async function loadProfile(user) {
  if (!supabaseClient || !user) return;
  const { data, error } = await supabaseClient.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (error) {
    showToast("Não consegui carregar seu perfil do Supabase", "triangle-alert");
    return;
  }
  const pending = JSON.parse(localStorage.getItem(pendingProfileKey(user.id)) || "null");
  if (!data && pending) {
    const result = await upsertProfile(pending);
    if (!result.error) localStorage.removeItem(pendingProfileKey(user.id));
    return;
  }
  appState.profile = data;
  clearLocalPreviewProfile();
}

function syncAccountUi() {
  document.body.dataset.accountRole = appState.profile?.account_role || "visitor";
  document.body.classList.toggle("is-authenticated", hasAccountAccess());
  document.body.classList.toggle("requires-auth", !hasAccountAccess());
  const avatar = document.querySelector(".avatar-btn");
  const profile = activeProfile();
  if (avatar && profile?.full_name) {
    avatar.setAttribute("aria-label", `Conta de ${profile.full_name}`);
  }
}

function hasAccountAccess() {
  return Boolean(appState.authUser || appState.profile);
}

function protectedRoute(route) {
  return !["vendedor"].includes(route);
}

function renderAuthLoading() {
  appView.innerHTML = `<section class="auth-gate-loading" aria-live="polite">
    <img src="assets/ansend-logo-horizontal.png" alt="ANSEND">
    <span>Verificando sua conta</span>
    <strong>Preparando acesso seguro</strong>
  </section>`;
}

async function initAuth() {
  if (!supabaseClient) {
    appState.authReady = true;
    syncAccountUi();
    return;
  }
  const { data } = await supabaseClient.auth.getSession();
  appState.authUser = data.session?.user || null;
  if (appState.authUser) {
    await loadProfile(appState.authUser);
    await loadCatalogItems();
  }
  appState.authReady = true;
  syncAccountUi();
  renderRoute();
  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    appState.authUser = session?.user || null;
    if (appState.authUser) {
      await loadProfile(appState.authUser);
      await loadCatalogItems();
    } else {
      appState.profile = localPreviewProfile();
    }
    syncAccountUi();
    renderRoute();
  });
}

function persistOnboarding(profile) {
  appState.onboardingProfile = profile;
  localStorage.setItem("ansend-onboarding-profile", JSON.stringify(profile));
}

function preferredGenres() {
  const profile = appState.profile;
  if (profile?.music_styles?.length) return [...new Set(profile.music_styles)].slice(0, 3);
  const onboarding = appState.onboardingProfile;
  if (!onboarding?.genres?.length) return ["Trap", "Drill", "Funk"];
  return [...new Set(onboarding.genres)].slice(0, 3);
}

function preferredBeats(limit = 8) {
  const selected = preferredGenres();
  const exact = allBeats.filter((item) => selected.includes(item.tags[0]));
  return exact.concat(allBeats.filter((item) => !selected.includes(item.tags[0]))).slice(0, limit);
}

function personalizedPlaylists() {
  const selected = preferredGenres();
  const names = {
    Trap: ["Trap na Área", "808 para verso", "Noite de Trap"],
    Drill: ["Drill Brutal", "Rua & Hi-hat", "Drill de Luxo"],
    Funk: ["Funk de Estúdio", "Baile Premium", "Funk Type"],
    "R&B": ["R&B Noturno", "Voz & Melodia", "Slow Sessions"],
    "Boom Bap": ["Boom Bap Sujo", "Sample Room", "Clássicos de Rua"],
    "Type Beat": ["Type Beats em Alta", "Referências do Momento", "Flow Pronto"],
  };
  const result = selected.flatMap((genre, index) => {
    const pack = names[genre] || [`${genre} em alta`, `${genre} selecionado`];
    return pack.slice(0, 2).map((title, offset) => [
      title,
      `${32 + index * 9 + offset * 6} beats escolhidos`,
      img(covers[(index * 3 + offset + 1) % covers.length]),
    ]);
  });
  return result.slice(0, 6);
}

function playlistLibrary() {
  return [
    ...playlists,
    ...personalizedPlaylists(),
    ["Mainstreet Type Beats", "Playlist oficial ANSEND", img("photo-1516280440614-37939bbacd81")],
  ];
}

function findPlaylistPack(idOrTitle) {
  const requested = slugify(idOrTitle?.replace?.(/^playlist-/, "") || idOrTitle);
  const source = playlistLibrary();
  const found = source.find(([title]) => slugify(title) === requested) || source[0];
  const [title, subtitle, cover] = found;
  const seed = [...slugify(title)].reduce((total, char) => total + char.charCodeAt(0), 0);
  const preferred = preferredBeats(allBeats.length);
  const pool = preferred.length ? preferred : allBeats;
  const trackCount = Math.min(12, Math.max(8, pool.length));
  const tracks = Array.from({ length: trackCount }, (_, index) => {
    const item = pool[(seed + index) % pool.length];
    return {
      ...item,
      duration: `${2 + ((seed + index) % 2)}:${String(18 + ((seed + index) * 7) % 42).padStart(2, "0")}`,
      plays: `${(18 + ((seed + index) * 13) % 82).toString().padStart(2, "0")}.${(120 + index * 37).toString().slice(0, 3)}`
    };
  });
  return {
    id: slugify(title),
    title,
    subtitle,
    cover,
    tracks,
    curator: title.includes("Trap") ? "Curadoria ANSEND Trap" : title.includes("Funk") ? "Curadoria ANSEND Funk" : "Curadoria ANSEND",
    description: "Um pack selecionado para encontrar referencias, testar flows e escolher beats prontos para licenciar dentro da plataforma.",
  };
}

function playlistDetailTrackRow(item, index) {
  const favoriteClass = appState.favorites.has(item.id) ? " is-favorite" : "";
  return `<article class="playlist-track-row" data-beat-id="${item.id}">
    <span class="playlist-track-index">${index + 1}</span>
    <button class="playlist-track-main" type="button" data-action="open-beat" data-id="${item.id}">
      <img src="${item.cover}" alt="Capa de ${item.title}" onerror="this.classList.add('is-broken')">
      <span><strong>${item.title}</strong><small>${item.producer}</small></span>
    </button>
    <span class="playlist-track-tags">${item.tags[0]}<small>${item.tags[1]}</small></span>
    <span class="playlist-track-plays">${item.plays}</span>
    <div class="playlist-track-actions">
      <button type="button" data-action="favorite" data-id="${item.id}" class="${favoriteClass}" aria-label="Favoritar ${item.title}"><i data-lucide="heart"></i></button>
      <button type="button" data-action="buy" data-id="${item.id}">Licenca</button>
      <button type="button" data-action="play" data-id="${item.id}" aria-label="Tocar ${item.title}"><i data-lucide="play"></i></button>
    </div>
    <span class="playlist-track-duration">${item.duration}</span>
  </article>`;
}

function applyFeedPersonalization() {
  const profile = activeProfile();
  if (!profile?.completed && !profile?.account_role) return;
  const selected = preferredGenres();
  const firstTitle = document.querySelector("#playlistRow")?.closest(".catalog-section")?.querySelector(".section-head h2");
  const firstSubtitle = document.querySelector("#playlistRow")?.closest(".catalog-section")?.querySelector(".section-head p");
  const exploreTitle = document.querySelector('[data-feed="explore"]')?.closest(".catalog-section")?.querySelector(".section-head h2");
  const exploreSubtitle = document.querySelector('[data-feed="explore"]')?.closest(".catalog-section")?.querySelector(".section-head p");

  if (firstTitle) firstTitle.innerHTML = `<i data-lucide="list-music"></i>Playlists para seu estilo`;
  if (firstSubtitle) firstSubtitle.textContent = `Curadoria baseada em ${selected.join(", ")}`;
  if (exploreTitle) exploreTitle.innerHTML = `<i data-lucide="sparkles"></i>Beats escolhidos pra você`;
  if (exploreSubtitle) exploreSubtitle.textContent = profile.account_role ? `Adaptado para ${accountRoleLabel(profile.account_role).toLowerCase()}` : profile.goalLabel ? `Foco: ${profile.goalLabel.toLowerCase()}` : "Descoberta guiada pelo seu gosto";

  const playlistRow = document.querySelector("#playlistRow");
  if (playlistRow) playlistRow.innerHTML = personalizedPlaylists().map(playlistCard).join("");
  const exploreRow = document.querySelector('[data-feed="explore"]');
  if (exploreRow) exploreRow.innerHTML = preferredBeats(8).map((item, index) => beatCard({ ...item, badge: index === 0 ? "Hot" : item.badge })).join("");
  enableSpotlights();
  setupAutoScrollRows();
  lucide.createIcons();
}

function applyFeedPersonalization() {
  const profile = activeProfile() || { account_role: activeRoleKey() };
  const dashboard = roleDashboard();
  const selected = preferredGenres();
  const firstTitle = document.querySelector("#playlistRow")?.closest(".catalog-section")?.querySelector(".section-head h2");
  const firstSubtitle = document.querySelector("#playlistRow")?.closest(".catalog-section")?.querySelector(".section-head p");
  const exploreTitle = document.querySelector('[data-feed="explore"]')?.closest(".catalog-section")?.querySelector(".section-head h2");
  const exploreSubtitle = document.querySelector('[data-feed="explore"]')?.closest(".catalog-section")?.querySelector(".section-head p");

  if (firstTitle) firstTitle.innerHTML = `<i data-lucide="list-music"></i>${dashboard.playlistTitle}`;
  if (firstSubtitle) firstSubtitle.textContent = `${dashboard.playlistSubtitle} - ${selected.join(", ")}`;
  if (exploreTitle) exploreTitle.innerHTML = `<i data-lucide="sparkles"></i>${dashboard.sectionTitle}`;
  if (exploreSubtitle) exploreSubtitle.textContent = profile.account_role ? `${dashboard.sectionSubtitle} para ${accountRoleLabel(profile.account_role).toLowerCase()}` : dashboard.sectionSubtitle;

  const playlistRow = document.querySelector("#playlistRow");
  if (playlistRow) playlistRow.innerHTML = personalizedPlaylists().map(playlistCard).join("");
  const exploreRow = document.querySelector('[data-feed="explore"]');
  if (exploreRow) exploreRow.innerHTML = preferredBeats(8).map((item, index) => beatCard({ ...item, badge: index === 0 ? "Hot" : item.badge })).join("");
  enableSpotlights();
  setupAutoScrollRows();
  lucide.createIcons();
}

function applyFeedPersonalization() {
  renderHomeDashboard();
  enableSpotlights();
  setupAutoScrollRows();
  lucide.createIcons();
}

function onboardingMarkup() {
  return `<section class="onboarding-quiz" role="dialog" aria-modal="true" aria-labelledby="onboardingTitle">
    <div class="onboarding-shell">
      <div class="onboarding-orbit" aria-hidden="true"></div>
      <div class="onboarding-copy">
        <img src="assets/ansend-logo-horizontal.png" alt="ANSEND">
        <span>PRIMEIRO ACESSO</span>
        <h2 id="onboardingTitle">Monte seu feed antes de entrar.</h2>
        <p>Escolha as vibes que combinam com você e a ANSEND adapta playlists, beats e produtores já na primeira tela.</p>
        <div class="onboarding-preview">
          <strong>Seu feed vai priorizar</strong>
          <small>playlists por estilo, beats compatíveis e produtores próximos da sua intenção.</small>
        </div>
      </div>
      <form class="onboarding-card">
        <div class="onboarding-step">
          <span>01</span>
          <h3>Quais estilos você curte?</h3>
          <div class="onboarding-options">
            ${onboardingStyles.map((style, index) => `<label class="quiz-option">
              <input type="checkbox" name="styles" value="${style.id}" ${index < 2 ? "checked" : ""}>
              <b><i data-lucide="${style.icon}"></i>${style.label}</b>
              <small>${style.desc}</small>
            </label>`).join("")}
          </div>
        </div>
        <div class="onboarding-step compact">
          <span>02</span>
          <h3>Qual é seu objetivo agora?</h3>
          <div class="goal-row">
            ${onboardingGoals.map(([value, label], index) => `<label><input type="radio" name="goal" value="${value}" ${index === 0 ? "checked" : ""}>${label}</label>`).join("")}
          </div>
        </div>
        <div class="onboarding-footer">
          <button class="skip-onboarding" type="button" data-action="skip-onboarding">Pular</button>
          <button class="finish-onboarding" type="submit">Criar meu feed<i data-lucide="arrow-right"></i></button>
        </div>
      </form>
    </div>
  </section>`;
}

function onboardingMarkup() {
  return `<section class="onboarding-quiz" role="dialog" aria-modal="true" aria-labelledby="onboardingTitle">
    <div class="onboarding-shell">
      <div class="onboarding-orbit" aria-hidden="true"></div>
      <div class="onboarding-copy">
        <img src="assets/ansend-logo-horizontal.png" alt="ANSEND">
        <span>PRIMEIRO ACESSO</span>
        <h2 id="onboardingTitle">Como voce quer usar a ANSEND?</h2>
        <p>Escolha sua funcao principal e a NEXO IA adapta atalhos, recomendacoes, metricas e catalogos para voce.</p>
        <div class="onboarding-preview">
          <strong>Sua dashboard vai priorizar</strong>
          <small>profissionais, catalogos, acoes e mapas de execucao coerentes com sua funcao.</small>
        </div>
      </div>
      <form class="onboarding-card">
        <div class="onboarding-step role-step">
          <span>01</span>
          <h3>Como voce quer usar a ANSEND?</h3>
          <div class="onboarding-options role-options">
            ${roleChoices.map((role, index) => `<label class="quiz-option role-choice">
              <input type="radio" name="account-role" value="${role.id}" ${index === 0 ? "checked" : ""}>
              <b><i data-lucide="${role.icon}"></i>${role.label}</b>
              <small>${role.desc}</small>
            </label>`).join("")}
          </div>
        </div>
        <div class="onboarding-step">
          <span>02</span>
          <h3>Quais estilos voce curte?</h3>
          <div class="onboarding-options">
            ${onboardingStyles.map((style, index) => `<label class="quiz-option">
              <input type="checkbox" name="styles" value="${style.id}" ${index < 2 ? "checked" : ""}>
              <b><i data-lucide="${style.icon}"></i>${style.label}</b>
              <small>${style.desc}</small>
            </label>`).join("")}
          </div>
        </div>
        <div class="onboarding-step compact">
          <span>03</span>
          <h3>Qual e seu objetivo agora?</h3>
          <div class="goal-row">
            ${onboardingGoals.map(([value, label], index) => `<label><input type="radio" name="goal" value="${value}" ${index === 0 ? "checked" : ""}>${label}</label>`).join("")}
          </div>
        </div>
        <div class="onboarding-footer">
          <button class="skip-onboarding" type="button" data-action="skip-onboarding">Pular</button>
          <button class="finish-onboarding" type="submit">Criar minha dashboard<i data-lucide="arrow-right"></i></button>
        </div>
      </form>
    </div>
  </section>`;
}

function showOnboarding(force = false) {
  if (!hasAccountAccess()) return;
  if (!force && appState.onboardingProfile?.completed) return;
  document.querySelector(".onboarding-quiz")?.remove();
  document.body.insertAdjacentHTML("beforeend", onboardingMarkup());
  document.body.classList.add("onboarding-open");
  lucide.createIcons();
}

function closeOnboarding() {
  document.body.classList.remove("onboarding-open");
  document.querySelector(".onboarding-quiz")?.remove();
}

function findBeat(id) {
  return allBeats.find((item) => item.id === id) || allBeats[0];
}

function pageIntro(route, actions = "") {
  const [title, subtitle] = routeTitles[route];
  const resolvedSubtitle = route === "feed" ? accountGreeting() : subtitle;
  return `<header class="view-header"><div><span class="view-eyebrow">ANSEND</span><h1>${title}</h1><p>${resolvedSubtitle}</p></div>${actions}</header>`;
}

function emptyState(icon, title, text, route = "explorar") {
  return `<section class="empty-state"><i data-lucide="${icon}"></i><h2>${title}</h2><p>${text}</p><a href="#${route}" data-route="${route}">Explorar catálogo</a></section>`;
}

function gridView(items) {
  return `<div class="view-grid">${items.map(beatCard).join("")}</div>`;
}

function renderExplore() {
  const query = appState.query.trim().toLowerCase();
  const filtered = allBeats.filter((item) => {
    const matchesQuery = !query || `${item.title} ${item.producer} ${item.tags.join(" ")}`.toLowerCase().includes(query);
    const matchesGenre = appState.genre === "Todos" || item.tags[0] === appState.genre;
    return matchesQuery && matchesGenre;
  });
  const chips = ["Todos", ...genres].map((genre) => `<button type="button" data-action="filter" data-genre="${genre}" class="${appState.genre === genre ? "is-active" : ""}">${genre}</button>`).join("");
  appView.innerHTML = `${pageIntro("explorar")}<div class="chip-row route-chips">${chips}</div>${filtered.length ? gridView(filtered) : emptyState("search-x", "Nenhum beat encontrado", "Tente outro nome, gênero ou BPM.", "explorar")}`;
}

function renderFavorites() {
  const items = allBeats.filter((item) => appState.favorites.has(item.id));
  appView.innerHTML = `${pageIntro("favoritos")}${items.length ? gridView(items) : emptyState("heart", "Sua lista está vazia", "Favorite beats no feed para encontrá-los aqui.")}`;
}

function renderPurchases() {
  const items = appState.purchases.map(findBeat);
  appView.innerHTML = `${pageIntro("compras")}${items.length ? `<section class="purchase-list">${items.map((item, index) => `<article><img src="${item.cover}" alt=""><div><strong>${item.title}</strong><span>${item.producer} · Licença Básica</span></div><span class="purchase-status">Disponível</span><button type="button" data-action="download" data-id="${item.id}"><i data-lucide="download"></i>Baixar</button></article>`).join("")}</section>` : emptyState("shopping-bag", "Nenhuma compra ainda", "Quando você adquirir uma licença, ela aparecerá aqui.")}`;
}

function renderLibrary() {
  const recent = allBeats.slice(3, 11);
  appView.innerHTML = `${pageIntro("biblioteca")}<section class="catalog-section"><div class="section-head"><div><h2><i data-lucide="list-music"></i>Suas playlists</h2><p>Coleções para ouvir novamente</p></div></div><div class="playlist-row">${playlists.slice(0, 5).map(playlistCard).join("")}</div></section><section class="catalog-section"><div class="section-head"><div><h2><i data-lucide="history"></i>Ouvidos recentemente</h2><p>Continue de onde parou</p></div></div>${gridView(recent)}</section>`;
}

function renderProducers() {
  appView.innerHTML = `${pageIntro("produtores")}<div class="producer-grid">${avatars.concat(["Duzzi", "Milly Studio", "Nocivo Beats", "Apollo"]).map(avatarCard).join("")}</div>`;
}

function renderPlaylistDetail() {
  const playlistId = location.hash.replace("#playlist-", "");
  const pack = findPlaylistPack(playlistId);
  const firstTrack = pack.tracks[0] || allBeats[0];
  const totalMinutes = pack.tracks.reduce((total, item) => total + Number(item.duration.split(":")[0] || 0), 0);
  const related = playlistLibrary().filter(([title]) => slugify(title) !== pack.id).slice(0, 6);

  appView.innerHTML = `
    <div class="playlist-detail-page">
      <section class="playlist-detail-hero" style="--playlist-cover: url('${pack.cover}')">
        <button class="detail-back" type="button" data-route="feed"><i data-lucide="chevron-left"></i>Voltar ao feed</button>
        <div class="playlist-detail-art">
          <img src="${pack.cover}" alt="Capa da playlist ${pack.title}" onerror="this.classList.add('is-broken')">
        </div>
        <div class="playlist-detail-copy">
          <span class="detail-eyebrow"><i data-lucide="list-music"></i>PACK DE PLAYLIST</span>
          <h1>${pack.title}</h1>
          <p>${pack.description}</p>
          <div class="playlist-detail-meta">
            <strong>${pack.curator}</strong>
            <span>${pack.tracks.length} beats</span>
            <span>${totalMinutes} min</span>
            <span>Atualizada hoje</span>
          </div>
          <div class="playlist-detail-actions">
            <button class="detail-play" type="button" data-action="play" data-id="${firstTrack.id}"><i data-lucide="play"></i>Tocar pack</button>
            <button class="detail-save" type="button" data-action="save-playlist" data-title="${pack.title}"><i data-lucide="plus"></i>Salvar playlist</button>
            <button class="detail-more" type="button" data-action="share-playlist" data-title="${pack.title}" aria-label="Compartilhar playlist"><i data-lucide="more-horizontal"></i></button>
          </div>
        </div>
      </section>

      <section class="playlist-detail-layout">
        <div class="playlist-detail-main">
          <div class="playlist-table-head" aria-hidden="true">
            <span>#</span><span>Titulo</span><span>Vibe</span><span>Plays</span><span>Acoes</span><span>Tempo</span>
          </div>
          <div class="playlist-track-list">
            ${pack.tracks.map(playlistDetailTrackRow).join("")}
          </div>
        </div>
        <aside class="playlist-detail-side">
          <h2>Sobre o pack</h2>
          <p>${pack.subtitle}. Use como base para descobrir produtores, testar direcoes de voz e comprar licencas com seguranca.</p>
          <dl>
            <div><dt>Curadoria</dt><dd>${pack.curator}</dd></div>
            <div><dt>Foco</dt><dd>${preferredGenres().join(", ")}</dd></div>
            <div><dt>Entrega</dt><dd>Licenca e download imediato</dd></div>
          </dl>
          <button type="button" data-action="save-playlist" data-title="${pack.title}"><i data-lucide="bookmark-plus"></i>Adicionar a biblioteca</button>
        </aside>
      </section>

      <section class="catalog-section playlist-related">
        <div class="section-head"><div><h2><i data-lucide="sparkles"></i>Mais packs para explorar</h2><p>Outras curadorias no mesmo clima</p></div></div>
        <div class="playlist-row">${related.map(playlistCard).join("")}</div>
      </section>
    </div>`;
}

function renderBeatDetail() {
  const hashId = location.hash.replace("#beat-", "");
  const item = findBeat(hashId);
  const producerName = item.producer.replace("prod. ", "");
  const producerIndex = Math.max(0, producers.indexOf(item.producer)) % avatarImages.length;
  const producerAvatar = img(avatarImages[producerIndex]);
  const related = allBeats.filter((beatItem) => beatItem.id !== item.id).slice(producerIndex, producerIndex + 6);
  const favoriteClass = appState.favorites.has(item.id) ? " is-favorite" : "";

  appView.innerHTML = `
    <div class="beat-detail-page">
      <section class="beat-detail-hero" style="--detail-cover: url('${item.cover}')">
        <div class="beat-detail-cover-wrap">
          <img class="beat-detail-cover" src="${item.cover}" alt="Capa do beat ${item.title}">
        </div>
        <div class="beat-detail-copy">
          <span class="detail-eyebrow">BEAT PROFISSIONAL - ${item.tags[0]}</span>
          <h1>${item.title}</h1>
          <button class="detail-producer-link" type="button" data-action="producer-focus">
            <img src="${producerAvatar}" alt="">
            <span><b>${producerName}</b><small>Produtor verificado</small></span>
            <i data-lucide="badge-check"></i>
          </button>
          <p>Beat com identidade urbana, graves definidos e espaco para sua voz. Pronto para gravar, licenciar e lancar.</p>
          <div class="detail-actions">
            <button class="detail-play" type="button" data-action="play" data-id="${item.id}"><i data-lucide="play"></i>Ouvir previa</button>
            <button class="detail-buy" type="button" data-action="buy" data-id="${item.id}">Comprar licenca</button>
            <button class="detail-favorite${favoriteClass}" type="button" data-action="favorite" data-id="${item.id}" aria-label="Favoritar"><i data-lucide="heart"></i></button>
          </div>
        </div>
        <div class="detail-stats" aria-label="Informacoes tecnicas do beat">
          <span><small>BPM</small><strong>${item.tags[1].replace(" BPM", "")}</strong></span>
          <span><small>Genero</small><strong>${item.tags[0]}</strong></span>
          <span><small>Tom</small><strong>Fa menor</strong></span>
          <span><small>Duracao</small><strong>02:45</strong></span>
        </div>
      </section>

      <section class="beat-detail-layout">
        <div class="beat-detail-main">
          <header class="detail-section-head"><div><span>ESCOLHA SUA LICENCA</span><h2>Arquivos prontos para sua proxima musica</h2></div></header>
          <div class="license-grid">
            <article><span>Basica</span><strong>[VALOR]</strong><p>MP3 sem tag para lancar seu primeiro som.</p><ul><li>Arquivo MP3</li><li>5.000 streams</li><li>Uso comercial</li></ul><button type="button" data-action="buy" data-id="${item.id}">Escolher basica</button></article>
            <article class="is-featured"><em>Mais escolhida</em><span>Premium</span><strong>[VALOR]</strong><p>WAV + MP3 para lancamentos profissionais.</p><ul><li>WAV e MP3</li><li>100.000 streams</li><li>Videoclipe incluso</li></ul><button type="button" data-action="buy" data-id="${item.id}">Escolher premium</button></article>
            <article><span>Exclusiva</span><strong>[VALOR]</strong><p>O beat deixa o catalogo apos sua compra.</p><ul><li>Todos os arquivos</li><li>Streams ilimitados</li><li>Direitos exclusivos</li></ul><button type="button" data-action="buy" data-id="${item.id}">Comprar exclusiva</button></article>
          </div>

          <section class="producer-profile" id="producerProfile">
            <div class="producer-profile-cover" style="--producer-cover: url('${item.cover}')"></div>
            <div class="producer-profile-info">
              <img src="${producerAvatar}" alt="Avatar de ${producerName}">
              <div><span>PRODUTOR VERIFICADO</span><h2>${producerName}</h2><p>Produtor independente focado em ${item.tags[0]}, trap e sonoridades urbanas. Beats com mix limpa, identidade forte e entrega imediata dentro da ANSEND.</p></div>
              <button type="button" data-action="follow-producer">Seguir</button>
            </div>
            <div class="producer-profile-stats"><span><strong>${420 + producerIndex * 137}</strong><small>vendas</small></span><span><strong>${18 + producerIndex * 4} mil</strong><small>ouvintes mensais</small></span><span><strong>${36 + producerIndex * 3}</strong><small>beats publicados</small></span></div>
          </section>

          <section class="catalog-section detail-catalog">
            <div class="section-head"><div><h2><i data-lucide="flame"></i>Populares de ${producerName}</h2><p>Mais ouvidos e licenciados</p></div></div>
            <div class="beat-row">${related.map(beatCard).join("")}</div>
          </section>
        </div>
        <aside class="beat-detail-side">
          <h3>Sobre este beat</h3>
          <p>Produzido para artistas que procuram presenca, dinamica e uma base pronta para lancamento.</p>
          <dl><div><dt>Publicado</dt><dd>4 de junho de 2026</dd></div><div><dt>Arquivos</dt><dd>WAV, MP3 e stems</dd></div><div><dt>Licenca</dt><dd>Contrato digital seguro</dd></div></dl>
          <button type="button" data-action="producer-focus">Ver perfil do produtor<i data-lucide="arrow-down"></i></button>
        </aside>
      </section>
    </div>`;
}

function renderSettings() {
  const profile = activeProfile();
  const profileName = profile?.full_name || "Visitante ANSEND";
  const profileRole = profile?.account_role ? accountRoleLabel(profile.account_role) : "Conta não criada";
  appView.innerHTML = `${pageIntro("configuracoes")}<section class="settings-panel">
    <div class="settings-profile"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" alt=""><div><strong>${profileName}</strong><span>${profileRole}</span></div><button type="button" data-route="perfil">Conta</button></div>
    <label><span><strong>Reprodução automática</strong><small>Tocar a próxima faixa automaticamente.</small></span><input type="checkbox" checked></label>
    <label><span><strong>Notificações de lançamentos</strong><small>Receber novidades dos produtores seguidos.</small></span><input type="checkbox" checked></label>
    <label><span><strong>Qualidade de áudio</strong><small>Defina a qualidade padrão das prévias.</small></span><select><option>Alta qualidade</option><option>Economia de dados</option></select></label>
    <label><span><strong>Preferências musicais</strong><small>Refaça o quiz para atualizar playlists e beats recomendados.</small></span><button type="button" data-action="restart-onboarding">Refazer quiz</button></label>
  </section>`;
}

function renderProfile() {
  const profile = activeProfile();
  const items = visibleCatalogItems();
  const published = items.filter((item) => item.status === "published").length;
  const beats = items.filter((item) => item.kind === "beat").length;
  const musicas = items.filter((item) => item.kind === "musica").length;
  const roleLabel = profile?.account_role ? accountRoleLabel(profile.account_role) : "Visitante";
  const accountStatus = appState.authUser
    ? "Conta conectada ao Supabase"
    : isSupabaseConfigured
      ? "Entre para sincronizar no Supabase"
      : "Supabase pendente";

  const catalogCards = items.length ? items.map((item) => {
    const fallbackCover = item.kind === "musica" ? img("photo-1511379938547-c1f69419868d") : img("photo-1493225457124-a3eb161ffa5f");
    const price = Number(item.price || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    return `<article class="profile-catalog-item">
      <img src="${item.cover_url || fallbackCover}" alt="Capa de ${item.title}">
      <div>
        <span>${item.kind === "beat" ? "Beat" : "Musica"} - ${item.status === "published" ? "Publicado" : "Rascunho"}</span>
        <h3>${item.title}</h3>
        <p>${item.producer_name || item.artist_name || profile?.artistic_name || "ANSEND"} / ${item.genre}${item.bpm ? ` / ${item.bpm} BPM` : ""}</p>
        <small>${item.license_type} / ${price}</small>
      </div>
      <div class="profile-catalog-actions">
        <button type="button" data-action="play-catalog" data-id="${item.id}" aria-label="Tocar ${item.title}"><i data-lucide="play"></i></button>
        <button type="button" data-action="toggle-catalog-status" data-id="${item.id}">${item.status === "published" ? "Rascunhar" : "Publicar"}</button>
        <button type="button" data-action="delete-catalog" data-id="${item.id}" aria-label="Remover ${item.title}"><i data-lucide="trash-2"></i></button>
      </div>
    </article>`;
  }).join("") : `<div class="profile-empty">
    <i data-lucide="upload-cloud"></i>
    <strong>Nenhum beat ou musica cadastrado ainda</strong>
    <p>Use o formulario ao lado para montar seu catalogo ANSEND.</p>
  </div>`;

  appView.innerHTML = `<section class="profile-page">
    <div class="profile-hero">
      <div>
        <span><i data-lucide="${appState.authUser ? "cloud-check" : "cloud"}"></i>${accountStatus}</span>
        <h1>${profile?.artistic_name || profile?.full_name || "Meu perfil ANSEND"}</h1>
        <p>${accountGreeting()}</p>
        <div class="profile-badges">
          <b>${roleLabel}</b>
          <b>${(profile?.music_styles || preferredGenres()).slice(0, 3).join(" + ")}</b>
          <b>${profile?.email || appState.authUser?.email || "preview local"}</b>
        </div>
      </div>
      <button type="button" data-action="${appState.authUser || profile ? "logout-account" : "seller"}">
        <i data-lucide="${appState.authUser || profile ? "log-out" : "user-plus"}"></i>${appState.authUser || profile ? "Sair" : "Criar conta"}
      </button>
    </div>

    <div class="profile-stats">
      <article><span>Catalogo</span><strong>${items.length}</strong><small>itens cadastrados</small></article>
      <article><span>Publicados</span><strong>${published}</strong><small>visiveis na loja</small></article>
      <article><span>Beats</span><strong>${beats}</strong><small>licencas de beat</small></article>
      <article><span>Musicas</span><strong>${musicas}</strong><small>faixas autorais</small></article>
    </div>

    <div class="profile-workspace">
      <form class="profile-catalog-form">
        <div class="profile-form-head">
          <span><i data-lucide="badge-plus"></i>Novo cadastro</span>
          <h2>Cadastrar musica ou beat</h2>
          <p>Adicione as informacoes principais para publicar, vender licencas e organizar seu catalogo.</p>
        </div>
        <div class="profile-form-grid">
          <label>Tipo<select name="kind"><option value="beat">Beat</option><option value="musica">Musica</option></select></label>
          <label>Status<select name="status"><option value="draft">Rascunho</option><option value="published">Publicado</option></select></label>
          <label>Titulo<input name="title" type="text" placeholder="Ex: Black Coupe" required></label>
          <label>Genero<input name="genre" type="text" placeholder="Trap, Funk, Drill..." required></label>
          <label>Artista<input name="artist" type="text" placeholder="Nome do artista"></label>
          <label>Produtor<input name="producer" type="text" placeholder="prod. ANSEND"></label>
          <label>BPM<input name="bpm" type="number" min="40" max="240" placeholder="140"></label>
          <label>Tom<input name="key" type="text" placeholder="Fm"></label>
          <label>Preco<input name="price" type="number" min="0" step="0.01" placeholder="99.90"></label>
          <label>Licenca<select name="license"><option value="basic">Basica</option><option value="premium">Premium</option><option value="exclusive">Exclusiva</option><option value="free">Free</option></select></label>
          <label class="profile-wide">URL da previa<input name="audio_url" type="url" placeholder="https://...mp3"></label>
          <label class="profile-wide">URL da capa<input name="cover_url" type="url" placeholder="https://...jpg"></label>
          <label class="profile-wide">Tags<input name="tags" type="text" placeholder="trap, 808, dark, type beat"></label>
          <label class="profile-wide">Descricao<textarea name="description" rows="4" placeholder="Resumo do beat, vibe e arquivos incluidos"></textarea></label>
        </div>
        <button class="seller-submit" type="submit">Salvar no catalogo<i data-lucide="arrow-right"></i></button>
      </form>

      <section class="profile-catalog-list">
        <div class="section-head">
          <div><h2><i data-lucide="library-big"></i>Meu catalogo</h2><p>Itens cadastrados para venda, curadoria e perfil publico</p></div>
        </div>
        ${catalogCards}
      </section>
    </div>
  </section>`;
}

function renderSellerAuth() {
  const isLogin = appState.sellerMode === "login";
  const profile = appState.profile;
  const role = profile?.account_role || "produtor";
  const roleLabel = accountRoleLabel(role);
  if (appState.authUser || profile) {
    appView.innerHTML = `<section class="account-dashboard">
      <div class="account-hero-card">
        <div>
          <span>CONTA ${roleLabel.toUpperCase()}</span>
          <h1>${profile?.full_name || "Conta ANSEND"}</h1>
          <p>${accountGreeting()}</p>
          <div class="account-badges">
            <b><i data-lucide="badge-check"></i>${roleLabel}</b>
            <b><i data-lucide="${isSupabaseConfigured ? "cloud-check" : "cloud-off"}"></i>${isSupabaseConfigured ? "Supabase conectado" : "Configure a key Supabase"}</b>
            <b><i data-lucide="sparkles"></i>${(profile?.music_styles || preferredGenres()).slice(0, 2).join(" + ")}</b>
          </div>
        </div>
        <button type="button" data-action="logout-account"><i data-lucide="log-out"></i>Sair</button>
      </div>
      <div class="account-grid">
        <article>
          <i data-lucide="user-round"></i>
          <span>Função principal</span>
          <strong>${roleLabel}</strong>
          <p>${roleChoice(role).desc || "Perfil adaptado para a plataforma."}</p>
        </article>
        <article>
          <i data-lucide="audio-lines"></i>
          <span>Estilos favoritos</span>
          <strong>${(profile?.music_styles || preferredGenres()).join(", ")}</strong>
          <p>Esses estilos priorizam playlists e beats no feed.</p>
        </article>
        <article>
          <i data-lucide="mail"></i>
          <span>E-mail</span>
          <strong>${profile?.email || appState.authUser?.email || "Preview local"}</strong>
          <p>${isSupabaseConfigured ? "Sessão gerenciada pelo Supabase Auth." : "Adicione a publishable key para ativar login real."}</p>
        </article>
      </div>
      <section class="catalog-section account-recs">
        <div class="section-head"><div><h2><i data-lucide="sparkles"></i>Recomendado para ${roleLabel}</h2><p>Feed adaptado ao tipo da sua conta</p></div></div>
        <div class="beat-row">${preferredBeats(6).map(beatCard).join("")}</div>
      </section>
    </section>`;
    return;
  }

  const roleOptions = roleChoices.map((roleItem, index) => `<label class="role-option">
    <input type="radio" name="account-role" value="${roleItem.id}" ${index === 0 ? "checked" : ""}>
    <b><i data-lucide="${roleItem.icon}"></i>${roleItem.shortLabel}</b>
    <small>${roleItem.desc}</small>
  </label>`).join("");

  const styleOptions = onboardingStyles.map((style, index) => `<label class="account-style-chip">
    <input type="checkbox" name="account-styles" value="${style.label}" ${index < 3 ? "checked" : ""}>
    <span>${style.label}</span>
  </label>`).join("");

  appView.innerHTML = `<section class="seller-auth" aria-label="Sistema de contas ANSEND">
    <div class="seller-auth-panel">
      <a class="seller-auth-logo" href="#feed" data-route="feed" aria-label="ANSEND inicio"><img src="assets/ansend-logo-horizontal.png" alt="ANSEND"></a>
      <div class="seller-auth-copy">
        <span>${isSupabaseConfigured ? `SUPABASE · ${SUPABASE_PROJECT_REF}` : "CONFIGURAÇÃO SUPABASE PENDENTE"}</span>
        <h1>${isLogin ? "Entre na sua conta" : "Crie sua conta ANSEND"}</h1>
        <p>${isLogin ? "Acesse playlists, compras, favoritos e recomendações adaptadas à sua função." : "Escolha se você é produtor, curador, artista, designer, beatmaker ou selo para montar uma experiência personalizada."}</p>
      </div>
      <form class="seller-auth-form" autocomplete="on" data-mode="${isLogin ? "login" : "signup"}">
        ${isLogin ? "" : `<label for="seller-name">Nome completo<input id="seller-name" name="name" type="text" placeholder="Seu nome completo" autocomplete="name" required></label>
        <label for="seller-store">Nome artístico ou marca<input id="seller-store" name="store" type="text" placeholder="Ex: Viana Beats" autocomplete="organization"></label>
        <div class="account-role-picker" aria-label="Escolha a função da conta">${roleOptions}</div>
        <div class="account-style-picker" aria-label="Escolha estilos musicais">${styleOptions}</div>`}
        <label for="seller-email">E-mail<input id="seller-email" name="email" type="email" placeholder="voce@email.com" autocomplete="email" required></label>
        <label for="seller-password">Senha
          <span class="password-wrap">
            <input id="seller-password" name="password" type="password" placeholder="Sua senha" autocomplete="${isLogin ? "current-password" : "new-password"}" required>
            <button type="button" data-action="toggle-password" aria-label="Mostrar senha"><i data-lucide="eye"></i></button>
          </span>
        </label>
        <button class="seller-submit" type="submit">${isLogin ? "Entrar no painel" : "Criar conta"}<i data-lucide="arrow-right"></i></button>
      </form>
      <div class="seller-auth-actions">
        <button type="button" data-action="seller-google"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="">Continuar com Google</button>
        <p>${isLogin ? "Ainda não tem conta?" : "Já tem conta?"} <button type="button" data-action="seller-mode" data-mode="${isLogin ? "signup" : "login"}">${isLogin ? "Criar conta" : "Entrar"}</button></p>
      </div>
    </div>
    <aside class="seller-auth-showcase" aria-label="Benefícios para vendedores">
      <div class="seller-shader-bg" data-hero-shader aria-hidden="true"></div>
      <div class="seller-showcase-card">
        <strong>Venda beats, organize licenças e acompanhe downloads em tempo real.</strong>
        <ul>
          <li><i data-lucide="shield-check"></i>Licenças seguras</li>
          <li><i data-lucide="audio-lines"></i>Catálogo profissional</li>
          <li><i data-lucide="download"></i>Entrega imediata</li>
        </ul>
      </div>
    </aside>
  </section>`;
}

function hydrateView() {
  appView.classList.add("route-slide-in");
  decorateControls();
  document.querySelectorAll('[data-action="favorite"][data-id]').forEach((button) => {
    button.classList.toggle("is-favorite", appState.favorites.has(button.dataset.id));
  });
  enableSpotlights();
  setupHeroShader();
  applyRoleDashboard();
  renderAiPlan();
  setupAutoScrollRows();
  setupScrollReveals();
  lucide.createIcons();
  setTimeout(() => appView.classList.remove("route-slide-in", "route-slide-left"), 620);
}

function currentRoute() {
  return currentRouteFromHash();
}

function renderRoute() {
  const route = currentRoute();
  const routeChanged = route !== lastRoute;
  lastRoute = route;
  document.body.classList.toggle("is-authenticated", hasAccountAccess());
  document.body.classList.toggle("requires-auth", !hasAccountAccess());
  appView.classList.toggle("route-slide-left", routeChanged);
  document.querySelectorAll("[data-route]").forEach((item) => item.classList.toggle("is-active", item.dataset.route === route));
  document.body.classList.remove("menu-open");
  if (!appState.authReady && !hasAccountAccess() && protectedRoute(route)) {
    renderAuthLoading();
    hydrateView();
    return;
  }
  if (!hasAccountAccess() && protectedRoute(route)) {
    appState.sellerMode = appState.sellerMode || "login";
    renderSellerAuth();
    window.scrollTo({ top: 0, behavior: "auto" });
    hydrateView();
    return;
  }
  if (route === "feed" || route === "ia") {
    appView.innerHTML = feedTemplate;
    applyFeedPersonalization();
  }
  if (route === "explorar") renderExplore();
  if (route === "favoritos") renderFavorites();
  if (route === "compras") renderPurchases();
  if (route === "biblioteca") renderLibrary();
  if (route === "produtores") renderProducers();
  if (route === "perfil") renderProfile();
  if (route === "configuracoes") renderSettings();
  if (route === "vendedor") renderSellerAuth();
  if (route === "playlist") renderPlaylistDetail();
  if (route === "detalhe") renderBeatDetail();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  hydrateView();
}

function showToast(message, icon = "check-circle-2") {
  const region = document.querySelector("#toastRegion");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i data-lucide="${icon}"></i><span>${message}</span>`;
  region.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => toast.remove(), 2800);
}

function updateMiniPlayer(item) {
  const player = document.querySelector(".mini-player");
  player.querySelector("img").src = item.cover;
  player.querySelector("strong").textContent = item.title;
  player.querySelector("span").textContent = item.producer;
}

function handleFavorite(id) {
  if (appState.favorites.has(id)) {
    appState.favorites.delete(id);
    showToast("Removido dos favoritos", "heart");
  } else {
    appState.favorites.add(id);
    showToast("Adicionado aos favoritos", "heart");
  }
  persistState();
  if (currentRoute() === "favoritos") renderRoute();
  else document.querySelectorAll(`[data-action="favorite"][data-id="${id}"]`).forEach((button) => button.classList.toggle("is-favorite", appState.favorites.has(id)));
}

function handleBuy(id) {
  if (!appState.purchases.includes(id)) appState.purchases.unshift(id);
  persistState();
  showToast("Licença adicionada em Minhas compras", "shopping-bag");
}

function profileFromAccountForm(form, email) {
  const selectedRole = form.querySelector('input[name="account-role"]:checked')?.value || "produtor";
  const styles = [...form.querySelectorAll('input[name="account-styles"]:checked')].map((input) => input.value);
  return {
    email,
    full_name: form.elements.name?.value?.trim() || "Usuário ANSEND",
    artistic_name: form.elements.store?.value?.trim() || null,
    account_role: selectedRole,
    music_styles: styles.length ? styles : preferredGenres(),
    onboarding_goal: appState.onboardingProfile?.goal || null,
  };
}

async function handleAccountSubmit(form) {
  const mode = form.dataset.mode;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;
  if (!email || !password) return;

  if (!supabaseClient) {
    if (mode === "login") {
      showToast("Adicione a publishable key para ativar login real", "cloud-off");
      return;
    }
    const profile = {
      ...profileFromAccountForm(form, email),
      id: `preview-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setLocalPreviewProfile(profile);
    showToast("Conta criada em modo preview. Conecte a key para salvar no Supabase.", "cloud-off");
    renderRoute();
    return;
  }

  form.classList.add("is-submitting");
  const submitButton = form.querySelector(".seller-submit");
  if (submitButton) submitButton.disabled = true;
  try {
    if (mode === "login") {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      appState.authUser = data.user;
      await loadProfile(data.user);
      await loadCatalogItems();
      showToast("Login realizado com Supabase", "cloud-check");
      renderRoute();
      return;
    }

    const profile = profileFromAccountForm(form, email);
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: profile.full_name,
          account_role: profile.account_role,
          artistic_name: profile.artistic_name,
        },
      },
    });
    if (error) throw error;
    appState.authUser = data.user;
    if (data.session && data.user) {
      const result = await upsertProfile(profile);
      if (result.error) throw result.error;
      showToast("Conta criada e perfil salvo no Supabase", "badge-check");
    } else if (data.user) {
      localStorage.setItem(pendingProfileKey(data.user.id), JSON.stringify(profile));
      showToast("Conta criada. Confirme seu e-mail para finalizar o perfil.", "mail-check");
    }
    renderRoute();
  } catch (error) {
    showToast(error.message || "Não foi possível concluir a autenticação", "triangle-alert");
  } finally {
    form.classList.remove("is-submitting");
    if (submitButton) submitButton.disabled = false;
  }
}

async function handleLogout() {
  if (supabaseClient && appState.authUser) {
    await supabaseClient.auth.signOut();
  }
  appState.authUser = null;
  appState.profile = null;
  clearLocalPreviewProfile();
  showToast("Você saiu da conta ANSEND", "log-out");
  renderRoute();
}

function scrollCatalog(button, direction) {
  const section = button.closest(".catalog-section");
  const row = section?.querySelector(".playlist-row, .beat-row, .avatar-row");
  if (row) pauseAutoScroll(row, 2400);
  row?.scrollBy({ left: direction * Math.max(320, row.clientWidth * .72), behavior: "smooth" });
}

const menuToggle = document.querySelector(".menu-toggle");
menuToggle?.addEventListener("click", () => document.body.classList.toggle("menu-open"));
window.addEventListener("hashchange", renderRoute);

document.querySelector(".search")?.addEventListener("submit", (event) => {
  event.preventDefault();
  appState.query = document.querySelector("#search").value;
  location.hash = "explorar";
  if (currentRoute() === "explorar") renderRoute();
});

document.addEventListener("click", (event) => {
  const clickedBeatCard = event.target.closest(".beat-card");
  const target = event.target.closest("button, a");
  if (!target && clickedBeatCard) {
    location.hash = `beat-${clickedBeatCard.dataset.beatId}`;
    return;
  }
  if (!target) return;
  const action = target.dataset.action;
  if (action === "seller") {
    appState.sellerMode = hasAccountAccess() ? "login" : "signup";
    location.hash = "vendedor";
    return;
  }
  if (action === "skip-onboarding") {
    persistOnboarding({ completed: true, account_role: "artista", userType: "artista", roleLabel: "Artista", styles: ["trap", "drill"], genres: ["Trap", "Drill", "Type Beat"], goal: "descobrir", goalLabel: "Descobrir produtores" });
    closeOnboarding();
    if (currentRoute() === "feed") {
      renderRoute();
    }
    showToast("Feed personalizado com uma curadoria inicial", "sparkles");
    return;
  }
  if (action === "restart-onboarding") {
    showOnboarding(true);
    return;
  }
  if (action === "seller-mode") {
    appState.sellerMode = target.dataset.mode || "login";
    renderRoute();
    return;
  }
  if (action === "seller-google") {
    if (!supabaseClient) {
      showToast("Configure a publishable key para ativar Google pelo Supabase", "cloud-off");
      return;
    }
    supabaseClient.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname + "#vendedor" } });
    return;
  }
  if (action === "ai-chip") {
    const input = document.querySelector("#aiPrompt");
    if (input) {
      input.value = target.dataset.prompt || target.textContent.trim();
      document.querySelectorAll('[data-action="ai-chip"]').forEach((button) => button.classList.toggle("is-active", button === target));
      input.focus();
    }
    return;
  }
  if (action === "ai-professionals") {
    location.hash = "produtores";
    return;
  }
  if (action === "logout-account") {
    handleLogout();
    return;
  }
  if (action === "toggle-password") {
    const input = target.closest(".password-wrap")?.querySelector("input");
    if (input) {
      input.type = input.type === "password" ? "text" : "password";
      target.setAttribute("aria-label", input.type === "password" ? "Mostrar senha" : "Ocultar senha");
      target.innerHTML = `<i data-lucide="${input.type === "password" ? "eye" : "eye-off"}"></i>`;
      lucide.createIcons();
    }
    return;
  }
  if (target.dataset.route && target.tagName === "BUTTON") location.hash = target.dataset.route;
  if (action === "play-catalog") {
    const item = appState.catalogItems.find((entry) => entry.id === target.dataset.id);
    if (item) {
      updateMiniPlayer({
        id: item.id,
        title: item.title,
        producer: item.producer_name || item.artist_name || "ANSEND",
        cover: item.cover_url || img("photo-1493225457124-a3eb161ffa5f"),
      });
      showToast(`Tocando agora: ${item.title}`, "play");
    }
    return;
  }
  if (action === "toggle-catalog-status") {
    toggleCatalogStatus(target.dataset.id);
    return;
  }
  if (action === "delete-catalog") {
    deleteCatalogItem(target.dataset.id);
    return;
  }
  if (action === "favorite") handleFavorite(target.dataset.id);
  if (action === "buy") handleBuy(target.dataset.id);
  if (action === "play") {
    const item = findBeat(target.dataset.id);
    appState.playing = item.id;
    updateMiniPlayer(item);
    showToast(`Tocando agora: ${item.title}`, "play");
  }
  if (action === "mini-play") showToast(appState.playing ? "Reprodução pausada" : "Tocando Neon Alley", appState.playing ? "pause" : "play");
  if (action === "playlist") {
    location.hash = `playlist-${target.dataset.playlistId || slugify(target.dataset.title)}`;
    return;
  }
  if (action === "open-beat") {
    location.hash = `beat-${target.dataset.id}`;
    return;
  }
  if (action === "save-playlist") showToast(`Playlist salva: ${target.dataset.title}`, "bookmark-plus");
  if (action === "share-playlist") showToast(`Link copiado: ${target.dataset.title}`, "share-2");
  if (action === "how-it-works") showToast("Explore, escolha sua licença e baixe o beat imediatamente", "circle-help");
  if (action === "producer") showToast(`Perfil de ${target.dataset.title}`, "badge-check");
  if (action === "producer-focus") document.querySelector("#producerProfile")?.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
  if (action === "follow-producer") {
    target.classList.toggle("is-following");
    target.textContent = target.classList.contains("is-following") ? "Seguindo" : "Seguir";
  }
  if (action === "download") showToast("Download preparado com sucesso", "download");
  if (action === "seller") showToast("Sua loja de produtor está pronta para configurar", "store");
  if (action === "notifications") showToast("Você tem 3 novos lançamentos", "bell");
  if (action === "profile-edit") showToast("Edição de perfil habilitada", "user-round");
  if (action === "filter") {
    appState.genre = target.dataset.genre;
    if (currentRoute() !== "explorar") location.hash = "explorar";
    else {
      renderExplore();
      hydrateView();
    }
  }
  if (action === "scroll-prev") scrollCatalog(target, -1);
  if (action === "scroll-next") scrollCatalog(target, 1);
});

document.addEventListener("change", (event) => {
  if (event.target.closest(".settings-panel")) {
    showToast("Configuração salva", "settings");
  }
});

document.addEventListener("submit", (event) => {
  const aiForm = event.target.closest(".ai-diagnostic-form");
  if (aiForm) {
    event.preventDefault();
    const input = aiForm.elements.aiPrompt;
    const prompt = input.value.trim() || "Tenho uma ideia musical e preciso transformar em lançamento profissional.";
    const plan = inferLaunchPlan(prompt);
    persistAiPlan(plan);
    renderAiPlan(plan);
    lucide.createIcons();
    showToast("Plano gerado pela NEXO IA", "sparkles");
    return;
  }
  const onboardingForm = event.target.closest(".onboarding-card");
  if (onboardingForm) {
    event.preventDefault();
    const selectedRole = onboardingForm.querySelector('input[name="account-role"]:checked')?.value || "artista";
    const selectedStyles = [...onboardingForm.querySelectorAll('input[name="styles"]:checked')].map((input) => input.value);
    const styles = selectedStyles.length ? selectedStyles : ["trap"];
    const selectedGoal = onboardingForm.querySelector('input[name="goal"]:checked')?.value || "gravar";
    const selectedStyleData = onboardingStyles.filter((style) => styles.includes(style.id));
    const selectedGoalData = onboardingGoals.find(([value]) => value === selectedGoal) || onboardingGoals[0];
    persistOnboarding({
      completed: true,
      account_role: selectedRole,
      userType: selectedRole,
      roleLabel: accountRoleLabel(selectedRole),
      styles,
      genres: [...new Set(selectedStyleData.flatMap((style) => style.genres))],
      goal: selectedGoal,
      goalLabel: selectedGoalData[1],
      updatedAt: new Date().toISOString(),
    });
    closeOnboarding();
    if (currentRoute() === "feed") renderRoute();
    showToast("Sua dashboard NEXO foi adaptada", "sparkles");
    return;
  }
  const catalogForm = event.target.closest(".profile-catalog-form");
  if (catalogForm) {
    event.preventDefault();
    saveCatalogItem(catalogForm);
    return;
  }
  const form = event.target.closest(".seller-auth-form");
  if (!form) return;
  event.preventDefault();
  handleAccountSubmit(form);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") document.body.classList.remove("menu-open");
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".beat-card")) {
    event.preventDefault();
    location.hash = `beat-${event.target.dataset.beatId}`;
  }
});

renderRoute();
showOnboarding();
initAuth();
