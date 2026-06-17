export const ANSEND_ROUTES = {
  home: {
    hash: "feed",
    title: "Inicio",
    description: "Home com NEXO IA, top beat, marketplace e atalhos principais.",
    aliases: ["inicio", "home", "dashboard", "feed"],
  },
  community: {
    hash: "comunidade",
    title: "Comunidade ANSEND",
    description: "Publicacoes, duvidas, oportunidades, pedidos profissionais e conversas da comunidade.",
    aliases: ["comunidade", "post", "posts", "publicacao", "duvida", "pedido", "oportunidade"],
  },
  marketplace: {
    hash: "marketplace",
    title: "Marketplace",
    description: "Catalogo publico de beats, musicas, licencas e itens publicados.",
    aliases: ["marketplace", "beat", "beats", "catalogo", "licenca", "instrumental", "musica"],
  },
  professionals: {
    hash: "produtores",
    title: "Profissionais",
    description: "Diretorio de beatmakers, designers, produtores, mixagem, masterizacao, curadores e marketing musical.",
    aliases: ["profissional", "profissionais", "produtor", "produtores", "beatmaker", "designer", "mixagem", "master", "curador", "marketing"],
  },
  services: {
    hash: "servicos",
    title: "Servicos",
    description: "Explicacao das categorias de servicos musicais disponiveis na ANSEND.",
    aliases: ["servico", "servicos", "contratar", "orcamento"],
  },
  chat: {
    hash: "bate-papo",
    title: "Bate-papo",
    description: "Mensagens diretas, propostas e conversas entre perfis.",
    aliases: ["chat", "bate-papo", "mensagem", "mensagens", "proposta", "propostas"],
  },
  launchMusic: {
    hash: "cadastrar",
    title: "Lancar musica",
    description: "Fluxo para publicar beat ou musica por upload, catalogo ou YouTube incorporado.",
    aliases: ["lancar", "lancar musica", "publicar", "subir beat", "upload", "release"],
  },
  myProfile: {
    hash: "perfil",
    title: "Meu perfil",
    description: "Perfil do usuario, edicao de perfil, catalogo proprio e publicacoes.",
    aliases: ["perfil", "meu perfil", "editar perfil", "minhas musicas", "meus beats"],
  },
  orders: {
    hash: "compras",
    title: "Pedidos",
    description: "Pedidos, compras, licencas e servicos contratados.",
    aliases: ["pedido", "pedidos", "compras", "licencas", "comprados"],
  },
  library: {
    hash: "biblioteca",
    title: "Biblioteca",
    description: "Beats salvos, ouvidos recentemente e biblioteca do player.",
    aliases: ["biblioteca", "salvos", "favoritos", "recentes"],
  },
  nexoAi: {
    hash: "ia",
    title: "NEXO IA",
    description: "Workspace completo da NEXO IA para diagnostico musical.",
    aliases: ["nexo", "nexo ia", "ia", "diagnostico"],
  },
  support: {
    hash: "suporte",
    title: "Suporte",
    description: "Ajuda para conta, pedidos, entregas, pagamentos, licencas e denuncias.",
    aliases: ["suporte", "ajuda", "problema", "erro", "contato"],
  },
  settings: {
    hash: "configuracoes",
    title: "Configuracoes",
    description: "Preferencias da conta e ajustes do usuario.",
    aliases: ["configuracao", "configuracoes", "ajustes"],
  },
};

export function publicNexoRoutes() {
  return Object.entries(ANSEND_ROUTES).map(([key, route]) => ({
    key,
    hash: route.hash,
    title: route.title,
    description: route.description,
    aliases: route.aliases,
  }));
}

export function resolveNexoRouteKey(routeKey = "") {
  const normalized = String(routeKey || "").trim();
  if (ANSEND_ROUTES[normalized]) return normalized;
  const clean = normalized.replace(/^#/, "").toLowerCase();
  return Object.entries(ANSEND_ROUTES).find(([, route]) => (
    route.hash === clean || route.aliases.some((alias) => alias.toLowerCase() === clean)
  ))?.[0] || "";
}

export function inferNexoRouteAction(message = "") {
  const text = String(message || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const wantsNavigation = /(abr|ir|levar|naveg|encontr|procur|buscar|quero|preciso|publicar|lancar|subir|contratar|editar|ver)/.test(text);
  if (!wantsNavigation) return null;
  const match = Object.entries(ANSEND_ROUTES)
    .map(([key, route]) => ({
      key,
      score: route.aliases.reduce((total, alias) => total + (text.includes(alias.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)[0];
  if (!match || match.score <= 0) return null;
  const query = {};
  for (const term of ["trap", "drill", "funk", "rap", "r&b", "pop", "mixagem", "master", "designer", "beatmaker", "produtor", "marketing", "curador"]) {
    if (text.includes(term)) query.q = [query.q, term].filter(Boolean).join(" ");
  }
  return {
    type: "navigate",
    routeKey: match.key,
    params: {},
    query,
  };
}
