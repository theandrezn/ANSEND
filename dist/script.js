const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=520&q=82`;
const SUPABASE_PROJECT_REF = "qxujynzqdursxaehchik";
const SUPABASE_CONFIG = window.ANSEND_SUPABASE || {};
const SUPABASE_KEY_PLACEHOLDER = "COLE_SUA_SUPABASE_ANON_OU_PUBLISHABLE_KEY_AQUI";
const NEXO_DIAGNOSIS_STORAGE_KEY = "ansend_nexo_last_diagnosis";
const NEXO_QUIZ_STORAGE_KEY = "ansend_nexo_last_quiz";
const OAUTH_REDIRECT_STORAGE_KEY = "ansend-oauth-redirect";
const EMAIL_CONFIRMATION_STORAGE_KEY = "ansend-pending-email-confirmation";
const ANSEND_PUBLIC_APP_URL = "https://ansendmusic.site";
const ANSEND_BUILD_ID = window.ANSEND_BUILD_ID || "dev";
const SUPABASE_AUTH_STORAGE_KEY = `sb-${SUPABASE_PROJECT_REF}-auth-token`;
const ANSEND_ADMIN_EMAIL = "games123ytsupremo@gmail.com";
const COMMUNITY_ROUTE = "comunidade";
const COMMUNITY_LEGACY_ROUTE = "contratacoes";
const CHAT_ROUTE = "bate-papo";
const CHAT_LEGACY_ROUTES = new Set(["chat", "chats", "mensagens", "messages", "batepapo"]);
const CHAT_INBOX_CACHE_KEY = "ansend-chat-inbox-cache-v1";
const CHAT_INBOX_CACHE_TTL_MS = 15000;
const CHAT_ROUTES = {
  list: () => CHAT_ROUTE,
  conversation: (conversationId = "") => `${CHAT_ROUTE}/${encodeURIComponent(conversationId)}`,
};
const COMMUNITY_TITLE = "Comunidade ANSEND";
const COMMUNITY_SUBTITLE = "Publique duvidas, pedidos, oportunidades e conversas com profissionais da musica.";
const IMAGE_FALLBACK_SRC = "assets/ansend-logo-square.png";
const GOOGLE_ICON_MARKUP = `<svg class="google-brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.29h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.89c2.27-2.09 3.53-5.17 3.53-8.64z"/>
  <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.89-3c-1.08.72-2.46 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.96H1.25v3.1C3.23 21.3 7.29 24 12 24z"/>
  <path fill="#FBBC05" d="M5.27 14.28A7.22 7.22 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.25A11.95 11.95 0 0 0 0 12c0 1.93.46 3.76 1.25 5.38l4.02-3.1z"/>
  <path fill="#EA4335" d="M12 4.76c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.18 15.23 0 12 0 7.29 0 3.23 2.7 1.25 6.62l4.02 3.1C6.22 6.87 8.87 4.76 12 4.76z"/>
</svg>`;
const isSupabaseConfigured = Boolean(
  window.supabase
  && SUPABASE_CONFIG.url
  && SUPABASE_CONFIG.publishableKey
  && SUPABASE_CONFIG.publishableKey !== SUPABASE_KEY_PLACEHOLDER
);
const supabaseClient = isSupabaseConfigured
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
    },
  })
  : null;
const AUTH_DEBUG_ENABLED = Boolean(
  location.hostname === "localhost"
  || location.hostname === "127.0.0.1"
  || localStorage.getItem("ansend-auth-debug") === "true"
);
console.info("[ANSEND BUILD]", {
  buildId: ANSEND_BUILD_ID,
  origin: location.origin,
  href: location.href,
  supabaseUrl: SUPABASE_CONFIG.url || null,
  storageKey: SUPABASE_AUTH_STORAGE_KEY,
});

const localeConfig = {
  "pt-BR": {
    currency: "BRL",
    countryFocus: "BR",
    dateFormat: "dd/MM/yyyy",
  },
  "en-US": {
    currency: "USD",
    countryFocus: "GLOBAL",
    dateFormat: "MM/dd/yyyy",
  },
};
localeConfig.en = localeConfig["en-US"];

const i18n = {
  "pt-BR": {
    "nav.home": "Início",
    "nav.feed": "Feed",
    "nav.ia": "NEXO IA",
    "nav.explore": "Explorar",
    "nav.favorites": "Favoritos",
    "nav.orders": "Pedidos",
    "nav.library": "Biblioteca",
    "nav.upload": "Lançar música",
    "nav.professionals": "Profissionais",
    "nav.community": "Comunidade ANSEND",
    "nav.profile": "Meu perfil",
    "nav.settings": "Configurações",
    "sellerMini.title": "Venda seus serviços",
    "sellerMini.subtitle": "Abra sua loja",
    "sellerMini.cta": "Começar",
    "search.placeholder": "Buscar serviços, artistas ou profissionais",
    "hero.kicker": "NEXO IA",
    "hero.titleLine1": "ANSEND",
    "hero.titleLine2": "O\u00a0marketplace inteligente da\u00a0música",
    "hero.subtitle": "Descreva sua música, letra, demo ou objetivo. A NEXO IA conecta você aos profissionais certos.",
    "hero.prompt": "Ex: Tenho uma música de trap pronta e preciso lançar profissionalmente...",
    "hero.primaryCta": "Começar com IA",
    "hero.secondaryCta": "Explorar profissionais",
    "hero.benefitPayment": "Pagamento protegido",
    "hero.benefitVerified": "Profissionais verificados",
    "hero.benefitDelivery": "Entrega acompanhada",
    "hero.mapEyebrow": "MAPA DO LANÇAMENTO",
    "hero.mapTitle": "Diagnóstico Musical IA",
    "hero.mapSubtitle": "Conte sua ideia e receba uma ordem clara de execução.",
    "hero.stepProduction": "Produção",
    "hero.stepCover": "Capa",
    "hero.stepDistribution": "Distribuição",
    "hero.stepCuration": "Curadoria",
    "hero.stepMarketing": "Divulgação",
    "section.catalogs": "Catálogos em alta",
    "section.catalogsSubtitle": "Beats, packs e referências subindo agora na ANSEND.",
    "section.playlistsStyle": "Playlists para seu estilo",
    "section.nextStep": "Qual seu próximo passo?",
    "section.nextStepShort": "Seu próximo passo",
    "section.recommended": "Recomendado pela NEXO",
    "section.categories": "Explore por gênero",
    "section.combos": "Combos para acelerar seu lançamento",
    "section.professionals": "Profissionais recomendados",
    "section.recent": "Lista recente",
    "section.moreCatalog": "Ver catálogo completo",
    "section.more": "Ver mais",
    "category.beatmakers": "Beatmakers",
    "category.designers": "Designers",
    "category.producers": "Produtores Musicais",
    "category.curators": "Curadores",
    "category.marketing": "Marketing Musical",
    "common.open": "Abrir",
    "common.explore": "Explorar",
    "common.findSolution": "Encontrar solução",
    "common.exploreCategories": "Explorar categorias",
    "common.startQuiz": "Começar quiz",
    "common.refazerQuiz": "Refazer quiz",
    "common.save": "Salvar",
    "cart.billing": "Informações de cobrança e licenciamento",
    "cart.addInfo": "Adicionar dados",
    "cart.trackLicense": "Faixa · Licença MP3 · Revisar licença",
    "cart.byProducer": "por",
    "cart.discount": "Adicione mais 1 faixa para ativar a promoção Compre 1 e Leve 2!",
    "cart.summary": "Resumo do carrinho",
    "cart.share": "Compartilhar carrinho",
    "cart.itemsTotal": "Total dos itens",
    "cart.serviceFee": "Taxa de serviço",
    "cart.subtotal": "Subtotal",
    "cart.itemSingular": "item",
    "cart.itemPlural": "itens",
    "cart.authHint": "Continue como visitante,",
    "cart.signIn": "entrar",
    "cart.or": "ou",
    "cart.signUp": "criar conta",
    "cart.checkout": "Finalizar compra",
    "cart.terms": "Ao clicar em \"Finalizar compra\", você concorda com nossa Política de Reembolso, Termos de Serviço da ANSEND e Política de Privacidade da ANSEND. Impostos podem ser aplicados.",
    "cart.promoted": "Promovidos",
    "trust.aiRecommendations": "Recomendações com IA",
    "trust.artistSupport": "Suporte ao artista",
    "route.feed.subtitle": "Dashboard resumido com IA, recomendações e próximos passos.",
    "route.explorar.title": "Explorar",
    "route.explorar.subtitle": "Encontre novos sons por gênero, BPM ou produtor.",
    "route.favoritos.title": "Favoritos",
    "route.favoritos.subtitle": "Tudo que você marcou para ouvir depois.",
    "route.compras.title": "Pedidos",
    "route.compras.subtitle": "Histórico de pedidos, licenças e serviços contratados.",
    "route.carrinho.title": "Carrinho",
    "route.carrinho.subtitle": "Revise seus beats e finalize seu pedido.",
    "route.biblioteca.title": "Biblioteca",
    "route.biblioteca.subtitle": "Playlists, históricos e itens salvos em um só lugar.",
    "route.cadastrar.title": "Lançar música",
    "route.cadastrar.subtitle": "Cadastre releases, capa, áudio e licenças para publicar no catálogo.",
    "route.produtores.title": "Profissionais",
    "route.produtores.subtitle": "Beatmakers, designers, produtores, curadores e marketing musical.",
    "route.configuracoes.title": "Configurações",
    "route.configuracoes.subtitle": "Personalize sua experiência na plataforma.",
    "route.vendedor.title": "Conta ANSEND",
    "route.vendedor.subtitle": "Cadastre, entre e escolha a função da sua conta na plataforma.",
    "route.perfil.title": "Meu perfil",
    "route.perfil.subtitle": "Sua conta, catálogo e publicações na ANSEND.",
  },
  en: {
    "nav.home": "Home",
    "nav.feed": "Feed",
    "nav.ia": "NEXO AI",
    "nav.explore": "Explore",
    "nav.favorites": "Favorites",
    "nav.orders": "Orders",
    "nav.library": "Library",
    "nav.upload": "Release music",
    "nav.professionals": "Professionals",
    "nav.community": "ANSEND Community",
    "nav.profile": "My profile",
    "nav.settings": "Settings",
    "sellerMini.title": "Sell services",
    "sellerMini.subtitle": "Open your shop",
    "sellerMini.cta": "Start",
    "search.placeholder": "Search services, artists, or professionals",
    "hero.kicker": "NEXO AI",
    "hero.titleLine1": "ANSEND",
    "hero.titleLine2": "The intelligent music marketplace",
    "hero.subtitle": "Describe your song, lyrics, demo, or goal. NEXO AI connects you with the right professionals.",
    "hero.prompt": "Ex: I have a trap song ready and need to release it professionally...",
    "hero.primaryCta": "Start with AI",
    "hero.secondaryCta": "Explore professionals",
    "hero.benefitPayment": "Protected payment",
    "hero.benefitVerified": "Verified professionals",
    "hero.benefitDelivery": "Tracked delivery",
    "hero.mapEyebrow": "RELEASE MAP",
    "hero.mapTitle": "AI Music Diagnostic",
    "hero.mapSubtitle": "Share your idea and get a clear execution order.",
    "hero.stepProduction": "Production",
    "hero.stepCover": "Cover",
    "hero.stepDistribution": "Distribution",
    "hero.stepCuration": "Curation",
    "hero.stepMarketing": "Promotion",
    "section.catalogs": "Trending catalogs",
    "section.catalogsSubtitle": "Beats, packs, and references rising now on ANSEND.",
    "section.playlistsStyle": "Playlists for your style",
    "section.nextStep": "What is your next step?",
    "section.nextStepShort": "Your next step",
    "section.recommended": "Recommended by NEXO",
    "section.categories": "Explore by genre",
    "section.combos": "Smart release combos",
    "section.professionals": "Recommended professionals",
    "section.recent": "Recent list",
    "section.moreCatalog": "View full catalog",
    "section.more": "See more",
    "category.beatmakers": "Beatmakers",
    "category.designers": "Designers",
    "category.producers": "Music Producers",
    "category.curators": "Curators",
    "category.marketing": "Music Marketing",
    "common.open": "Open",
    "common.explore": "Explore",
    "common.findSolution": "Find a solution",
    "common.exploreCategories": "Explore categories",
    "common.startQuiz": "Start quiz",
    "common.refazerQuiz": "Retake quiz",
    "common.save": "Save",
    "cart.billing": "Billing and licensing information",
    "cart.addInfo": "Add Info",
    "cart.trackLicense": "Track · MP3 License (MP3) · Review License",
    "cart.byProducer": "by",
    "cart.discount": "Add 1 more track to activate the Buy 1 Get 2 promotion!",
    "cart.summary": "Cart Summary",
    "cart.share": "Share cart",
    "cart.itemsTotal": "Items Total",
    "cart.serviceFee": "Service Fee",
    "cart.subtotal": "Subtotal",
    "cart.itemSingular": "item",
    "cart.itemPlural": "items",
    "cart.authHint": "Continue as guest,",
    "cart.signIn": "Sign in",
    "cart.or": "or",
    "cart.signUp": "Sign up",
    "cart.checkout": "Proceed to Checkout",
    "cart.terms": "By clicking the \"Proceed to checkout\" button, you agree to our Refund Policy, ANSEND Terms of Service, and ANSEND Privacy Policy. Taxes may apply.",
    "cart.promoted": "Promoted",
    "trust.aiRecommendations": "AI recommendations",
    "trust.artistSupport": "Artist support",
    "route.feed.subtitle": "AI dashboard with recommendations and next steps.",
    "route.explorar.title": "Explore",
    "route.explorar.subtitle": "Find new sounds by genre, BPM, or producer.",
    "route.favoritos.title": "Favorites",
    "route.favoritos.subtitle": "Everything you saved to hear later.",
    "route.compras.title": "Orders",
    "route.compras.subtitle": "Your order history, licenses, and hired services.",
    "route.carrinho.title": "Cart",
    "route.carrinho.subtitle": "Review your beats and complete your order.",
    "route.biblioteca.title": "Library",
    "route.biblioteca.subtitle": "Saved playlists, history, and library items.",
    "route.cadastrar.title": "Release music",
    "route.cadastrar.subtitle": "Upload releases, artwork, audio, and licenses for your catalog.",
    "route.produtores.title": "Professionals",
    "route.produtores.subtitle": "Beatmakers, designers, producers, curators, and music marketing.",
    "route.configuracoes.title": "Settings",
    "route.configuracoes.subtitle": "Customize your platform experience.",
    "route.vendedor.title": "ANSEND Account",
    "route.vendedor.subtitle": "Create an account, sign in, and choose your role.",
    "route.perfil.title": "My profile",
    "route.perfil.subtitle": "Your account, catalog, and ANSEND publications.",
  },
};
Object.assign(i18n["pt-BR"], {
  "nav.myMusic": "Minhas Musicas",
  "nav.marketplace": "Marketplace",
  "nav.tools": "Ferramentas",
  "nav.memberOffers": "Ofertas para membros",
  "nav.language": "Idioma",
  "nav.support": "Suporte",
  "auth.logout": "Sair",
  "brand.home": "ANSEND inicio",
  "profile.open": "Acessar perfil",
  "common.openMenu": "Abrir menu",
  "common.closeMenu": "Fechar menu",
});
Object.assign(i18n.en, {
  "nav.myMusic": "My Music",
  "nav.marketplace": "Marketplace",
  "nav.tools": "Tools",
  "nav.memberOffers": "Member offers",
  "nav.language": "Language",
  "nav.support": "Support",
  "auth.logout": "Sign out",
  "brand.home": "ANSEND home",
  "profile.open": "Open profile",
  "common.openMenu": "Open menu",
  "common.closeMenu": "Close menu",
});
i18n["en-US"] = i18n.en;

const appLocale = {
  current: "pt-BR",
  country: localStorage.getItem("ansend_country") || "UNKNOWN",
};

function supportedLocale(locale) {
  const normalized = String(locale || "").trim();
  const lower = normalized.toLowerCase();
  if (lower === "pt" || lower === "pt-br" || lower.startsWith("pt-")) return "pt-BR";
  if (lower === "en" || lower === "en-us" || lower.startsWith("en-")) return "en-US";
  return null;
}

function savedLocale() {
  return supportedLocale(localStorage.getItem("ansend_locale"));
}

function urlLocale() {
  return supportedLocale(new URLSearchParams(window.location.search).get("lang"));
}

function browserLocale() {
  const langs = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  return langs.some((lang) => lang.toLowerCase().startsWith("pt")) ? "pt-BR" : null;
}

function detectLocale() {
  const saved = savedLocale();
  if (saved) return saved;
  const fromUrl = urlLocale();
  if (fromUrl) {
    localStorage.setItem("ansend_locale", fromUrl);
    return fromUrl;
  }
  return browserLocale() || "pt-BR";
}

async function detectCountry() {
  try {
    const response = await fetch("/api/geo", { cache: "no-store" });
    if (!response.ok) throw new Error("geo unavailable");
    return await response.json();
  } catch (_error) {
    return { country: "UNKNOWN", region: null, city: null, locale: null };
  }
}

async function detectLocaleWithGeo() {
  const saved = savedLocale();
  if (saved) return saved;
  const fromUrl = urlLocale();
  if (fromUrl) {
    localStorage.setItem("ansend_locale", fromUrl);
    return fromUrl;
  }
  const browser = browserLocale();
  if (browser === "pt-BR") {
    localStorage.setItem("ansend_locale", browser);
    return browser;
  }
  const geo = await detectCountry();
  const geoLocale = "pt-BR";
  appLocale.country = geo.country || "UNKNOWN";
  localStorage.setItem("ansend_locale", geoLocale);
  localStorage.setItem("ansend_country", appLocale.country);
  localStorage.setItem("ansend_locale_detected_at", new Date().toISOString());
  return geoLocale;
}

function setLocale(locale, options = {}) {
  const next = supportedLocale(locale) || "en-US";
  appLocale.current = next;
  document.documentElement.lang = next;
  if (options.manual !== false) {
    localStorage.setItem("ansend_locale", next);
    localStorage.setItem("ansend_locale_detected_at", new Date().toISOString());
  }
  document.body?.setAttribute("data-locale", next);
  return next;
}

function t(key, fallback = "") {
  return i18n[appLocale.current]?.[key] || i18n["en-US"]?.[key] || fallback || key;
}

function getRegionalContent(locale = appLocale.current, country = appLocale.country) {
  const config = localeConfig[locale] || localeConfig.en;
  return {
    ...config,
    country,
    genres: locale === "pt-BR"
      ? ["Trap", "Funk", "Forro", "Gospel", "Sertanejo", "Piseiro"]
      : ["Trap", "R&B", "Drill", "Pop", "Afrobeat", "Gospel"],
    cta: t("hero.primaryCta"),
  };
}

window.ANSEND_I18N = {
  t,
  get locale() {
    return appLocale.current;
  },
  setLocale: (locale) => {
    setLocale(locale, { manual: true });
    renderRoutePreservingAuthFocus();
  },
  detectLocale,
  detectLocaleWithGeo,
  detectCountry,
  getRegionalContent,
  localeConfig,
};

function applyTranslations(root = document) {
  ensureLanguageSwitcher();
  document.title = appLocale.current === "pt-BR"
    ? "ANSEND - O Marketplace Inteligente da música"
    : "ANSEND - The Intelligent Music Marketplace";
  document.querySelector('meta[name="description"]')?.setAttribute(
    "content",
    appLocale.current === "pt-BR"
      ? "Ecossistema musical inteligente ANSEND com IA, playlists, beats e profissionais."
      : "ANSEND intelligent music ecosystem with AI, playlists, beats, and professionals."
  );
  root.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n, node.textContent);
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder, node.getAttribute("placeholder") || ""));
  });
  root.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria, node.getAttribute("aria-label") || ""));
  });
  root.querySelectorAll("[data-locale-option]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.localeOption === appLocale.current);
    button.setAttribute("aria-pressed", String(button.dataset.localeOption === appLocale.current));
  });
  const navKeys = {
    feed: "nav.home",
    "nexo-feed": "nav.feed",
    ia: "nav.ia",
    explorar: "nav.explore",
    favoritos: "nav.favorites",
    compras: "nav.orders",
    biblioteca: "nav.library",
    musicas: "nav.myMusic",
    cadastrar: "nav.upload",
    produtores: "nav.professionals",
    comunidade: "nav.community",
    perfil: "nav.profile",
    configuracoes: "nav.settings",
  };
  Object.entries(navKeys).forEach(([route, key]) => {
    document.querySelectorAll(`.nav-link[data-route="${route}"] span, .sidebar-nav-item[data-route="${route}"] span:first-of-type, .navbar-link[data-route="${route}"]`).forEach((label) => {
      label.textContent = t(key);
    });
  });
  const seller = document.querySelector(".seller-mini");
  if (seller) {
    seller.querySelector("strong").textContent = t("sellerMini.title");
    seller.querySelector("span").textContent = t("sellerMini.subtitle");
    seller.querySelector("button").textContent = t("sellerMini.cta");
  }
  const search = document.querySelector("#search");
  if (search) search.placeholder = t("search.placeholder");
  const hero = document.querySelector(".ai-hero");
  if (hero) {
    const title = hero.querySelector(".an-hero-copy h1");
    const subtitle = hero.querySelector(".an-hero-copy > p");
    const input = hero.querySelector("#aiPrompt");
    const primary = hero.querySelector(".ai-actions .an-primary");
    const secondary = hero.querySelector(".ai-actions .an-secondary");
    const mapEyebrow = hero.querySelector(".ai-map-card > span");
    const mapTitle = hero.querySelector(".ai-map-card > strong");
    const mapSubtitle = hero.querySelector(".ai-map-card > p");
    if (title) animateHeadlineReveal(title, t("hero.titleLine1"), t("hero.titleLine2"));
    if (subtitle) subtitle.textContent = t("hero.subtitle");
    if (input) input.placeholder = t("hero.prompt");
    if (primary) primary.innerHTML = `${t("hero.primaryCta")} <i data-lucide="arrow-right"></i>`;
    if (secondary) secondary.innerHTML = `${t("hero.secondaryCta")} <i data-lucide="users-round"></i>`;
    const benefits = hero.querySelectorAll(".an-benefits span");
    [["hero.benefitPayment"], ["hero.benefitVerified"], ["trust.aiRecommendations"]].forEach(([key], index) => {
      if (benefits[index]) setIconText(benefits[index], t(key));
    });
    if (mapEyebrow) mapEyebrow.textContent = t("hero.mapEyebrow");
    if (mapTitle) mapTitle.textContent = t("hero.mapTitle");
    if (mapSubtitle) mapSubtitle.textContent = t("hero.mapSubtitle");
    const mapLabels = ["hero.stepProduction", "hero.stepCover", "hero.stepDistribution", "hero.stepCuration", "hero.stepMarketing"];
    hero.querySelectorAll(".release-map li span").forEach((label, index) => {
      label.textContent = t(mapLabels[index], label.textContent);
    });
  }
  const authPanel = document.querySelector(".seller-auth-panel");
  if (authPanel) {
    const form = authPanel.querySelector(".seller-auth-form");
    const isLogin = form?.dataset.mode !== "signup";
    const title = authPanel.querySelector(".seller-auth-copy h1");
    const copy = authPanel.querySelector(".seller-auth-copy p");
    const submit = authPanel.querySelector(".seller-submit");
    const google = authPanel.querySelector('[data-action="seller-google"]');
    const modeButton = authPanel.querySelector('[data-action="seller-mode"]');
    const modeText = modeButton?.parentElement || authPanel.querySelector(".seller-auth-form > p") || authPanel.querySelector(".seller-auth-form p:last-child");
    const emailLabel = authPanel.querySelector('label[for="seller-email"]');
    const passwordLabel = authPanel.querySelector('label[for="seller-password"]');
    const emailInput = authPanel.querySelector("#seller-email");
    const passwordInput = authPanel.querySelector("#seller-password");
    if (title) title.textContent = appLocale.current === "pt-BR" ? (isLogin ? "Entre na sua conta" : "Crie sua conta ANSEND") : (isLogin ? "Sign in to your account" : "Create your ANSEND account");
    if (copy) copy.textContent = appLocale.current === "pt-BR"
      ? (isLogin ? "Acesse playlists, compras, favoritos e recomendacoes adaptadas a sua funcao." : "Escolha sua funcao para montar uma experiencia personalizada.")
      : (isLogin ? "Access playlists, orders, favorites, and recommendations adapted to your role." : "Choose your role to build a personalized ANSEND experience.");
    if (emailLabel?.firstChild) emailLabel.firstChild.textContent = "E-mail";
    if (passwordLabel?.firstChild) passwordLabel.firstChild.textContent = appLocale.current === "pt-BR" ? "Senha" : "Password";
    if (emailInput) emailInput.placeholder = appLocale.current === "pt-BR" ? "voce@email.com" : "you@email.com";
    if (passwordInput) passwordInput.placeholder = appLocale.current === "pt-BR" ? "Sua senha" : "Your password";
    if (submit) submit.innerHTML = `${appLocale.current === "pt-BR" ? (isLogin ? "Entrar no painel" : "Criar conta") : (isLogin ? "Enter dashboard" : "Create account")}<i data-lucide="arrow-right"></i>`;
    if (google) google.innerHTML = `${GOOGLE_ICON_MARKUP}${appLocale.current === "pt-BR" ? "Continuar com Google" : "Continue with Google"}`;
    if (modeText) modeText.innerHTML = `${appLocale.current === "pt-BR" ? (isLogin ? "Ainda nao tem conta?" : "Ja tem conta?") : (isLogin ? "Do not have an account yet?" : "Already have an account?")} <button type="button" data-action="seller-mode" data-mode="${isLogin ? "signup" : "login"}">${appLocale.current === "pt-BR" ? (isLogin ? "Criar conta" : "Entrar") : (isLogin ? "Create account" : "Sign in")}</button>`;
    const showcase = document.querySelector(".seller-showcase-card");
    if (showcase) {
      const showcaseTitle = showcase.querySelector("strong");
      const items = showcase.querySelectorAll("li");
      const isPortuguese = appLocale.current === "pt-BR";
      const showcaseItems = isPortuguese
        ? ["Licencas seguras", "Catalogo profissional", "Entrega imediata"]
        : ["Secure licenses", "Professional catalog", "Instant delivery"];
      if (showcaseTitle) showcaseTitle.textContent = isPortuguese
        ? "Venda beats, organize licencas e acompanhe downloads em tempo real."
        : "Sell beats, organize licenses, and track downloads in real time.";
      items.forEach((item, index) => setIconText(item, showcaseItems[index] || item.textContent));
    }
  }
  applyLocaleTextOverrides(root);
}

function setIconText(element, text) {
  const icon = element.firstElementChild;
  element.textContent = "";
  if (icon) element.appendChild(icon);
  element.appendChild(document.createTextNode(text));
}

function ensureLanguageSwitcher() {
  if (document.querySelector(".language-switcher")) return;
  const topIcons = document.querySelector(".top-icons");
  if (!topIcons) return;
  const switcher = document.createElement("div");
  switcher.className = "language-switcher";
  switcher.setAttribute("aria-label", "Language");
  switcher.innerHTML = languageSwitcherInnerHtml();
  topIcons.prepend(switcher);
}

function languageSwitcherInnerHtml() {
  return `
    <i data-lucide="globe-2" aria-hidden="true"></i>
    <button type="button" data-action="set-locale" data-locale-option="pt-BR" aria-label="Português do Brasil" aria-pressed="false">🇧🇷</button>
    <button type="button" data-action="set-locale" data-locale-option="en-US" aria-label="English United States" aria-pressed="false">🇺🇸</button>
  `;
}

function languageSwitcherMarkup() {
  return `<div class="language-switcher inline-language-switcher" aria-label="Language">${languageSwitcherInnerHtml()}</div>`;
}

const englishTextPairs = [
  ["Minhas Músicas", "My Music"],
  ["Marketplace", "Marketplace"],
  ["Ferramentas", "Tools"],
  ["Ofertas para membros", "Member Offers"],
  ["Lançar Música", "Release Music"],
  ["In\u00edcio", "Home"],
  ["Feed", "Feed"],
  ["NEXO IA", "NEXO AI"],
  ["Explorar", "Explore"],
  ["Favoritos", "Favorites"],
  ["Pedidos", "Orders"],
  ["Minhas compras", "Orders"],
  ["Biblioteca", "Library"],
  ["Profissionais", "Professionals"],
  ["Meu perfil", "My profile"],
  ["Configura\u00e7\u00f5es", "Settings"],
  ["Conta", "Account"],
  ["Carrinho", "Cart"],
  ["Notifica\u00e7\u00f5es", "Notifications"],
  ["Buscar servi\u00e7os, artistas ou profissionais", "Search services, artists, or professionals"],
  ["Buscar beats, artistas, servi\u00e7os, BPM ou vibe", "Search beats, artists, services, BPM, or vibe"],
  ["Buscar beats, artistas, BPM ou vibe", "Search beats, artists, BPM, or vibe"],
  ["O\u00a0marketplace inteligente da\u00a0m\u00fasica", "The intelligent music marketplace"],
  ["ANSEND | O marketplace inteligente da m\u00fasica", "ANSEND | The intelligent music marketplace"],
  ["O que podemos lan\u00e7ar hoje?", "What can we release today?"],
  ["Tenho uma ideia musical e preciso transformar em lan\u00e7amento profissional.", "I have a music idea and need to turn it into a professional release."],
  ["Ex: Tenho uma m\u00fasica de trap pronta e preciso lan\u00e7ar profissionalmente...", "Ex: I have a finished trap song and need to release it professionally..."],
  ["Lan\u00e7amento", "Release"],
  ["Criar Capa (Design)", "Create Cover (Design)"],
  ["Finalizar Demo (Mix/Master)", "Finish Demo (Mix/Master)"],
  ["Divulgar Lan\u00e7amento", "Promote Release"],
  ["Encontrar Beatmaker", "Find Beatmaker"],
  ["Plano de Lan\u00e7amento", "Release Plan"],
  ["NEXO IA Ativa", "NEXO AI Active"],
  ["Confian\u00e7a Alta", "High Confidence"],
  ["Licen\u00e7a Premium", "Premium License"],
  ["IA MUSICAL ANSEND", "ANSEND MUSIC AI"],
  ["Entre com uma ideia.", "Enter with an idea."],
  ["Saia com uma solu\u00e7\u00e3o.", "Leave with a solution."],
  ["Diagn\u00f3stico Musical IA", "AI Music Diagnostic"],
  ["Diagn\u00f3stico Musical NEXO IA", "NEXO AI Music Diagnostic"],
  ["Conte sua ideia e receba uma ordem clara de execu\u00e7\u00e3o.", "Share your idea and get a clear execution order."],
  ["Tenho uma ideia", "I have an idea"],
  ["Tenho uma letra", "I have lyrics"],
  ["Tenho uma demo", "I have a demo"],
  ["Quero lan\u00e7ar", "I want to release"],
  ["Preciso divulgar", "I need promotion"],
  ["Gerar meu plano", "Generate my plan"],
  ["Explorar servi\u00e7os", "Explore services"],
  ["Explorar profissionais", "Explore professionals"],
  ["Ver profissionais", "View professionals"],
  ["Pagamento protegido", "Protected payment"],
  ["Profissionais avaliados", "Rated professionals"],
  ["Recomenda\u00e7\u00f5es por IA", "AI recommendations"],
  ["MAPA DO LAN\u00c7AMENTO", "RELEASE MAP"],
  ["Mapa do lan\u00e7amento", "Release map"],
  ["Produ\u00e7\u00e3o", "Production"],
  ["Capa", "Cover"],
  ["Distribui\u00e7\u00e3o", "Distribution"],
  ["Curadoria", "Curation"],
  ["Divulga\u00e7\u00e3o", "Promotion"],
  ["Pr\u00e9via do plano", "Plan preview"],
  ["Beatmaker recomendado", "Recommended beatmaker"],
  ["Designer recomendado", "Recommended designer"],
  ["Produtor musical", "Music producer"],
  ["Curador", "Curator"],
  ["Marketing musical", "Music marketing"],
  ["Cat\u00e1logos em alta", "Trending catalogs"],
  ["Beats, packs e refer\u00eancias subindo agora na ANSEND.", "Beats, packs, and references rising now on ANSEND."],
  ["Ver cat\u00e1logo completo", "View full catalog"],
  ["Qual seu pr\u00f3ximo passo?", "What is your next step?"],
  ["Escolha uma a\u00e7\u00e3o e a ANSEND guia o caminho certo.", "Choose an action and ANSEND guides the right path."],
  ["Subir beat", "Upload beat"],
  ["Criar pack", "Create pack"],
  ["Ajustar pre\u00e7os", "Adjust prices"],
  ["Ver artistas com match", "View matching artists"],
  ["Publique um beat com tags e licen\u00e7as.", "Publish a beat with tags and licenses."],
  ["Agrupe beats por vibe, BPM e pre\u00e7o.", "Group beats by vibe, BPM, and price."],
  ["Revise licen\u00e7as e valores sugeridos.", "Review suggested licenses and prices."],
  ["Encontre compradores com fit sonoro.", "Find buyers with sonic fit."],
  ["Recomendado pela NEXO", "Recommended by NEXO"],
  ["Seis sugest\u00f5es principais para resolver seu lan\u00e7amento agora.", "Six key suggestions to solve your release now."],
  ["Explore por categoria", "Explore by category"],
  ["Os cinco pilares do marketplace musical da ANSEND.", "The five pillars of the ANSEND music marketplace."],
  ["Combos para acelerar seu lan\u00e7amento", "Combos to accelerate your release"],
  ["Pacotes inteligentes para sair da ideia at\u00e9 a divulga\u00e7\u00e3o.", "Smart packages from idea to promotion."],
  ["Produtores em destaque", "Featured producers"],
  ["Profissionais recomendados", "Recommended professionals"],
  ["Perfis verificados para seguir", "Verified profiles to follow"],
  ["Perfis verificados com fit para seu projeto", "Verified profiles that fit your project"],
  ["Top produtores", "Top producers"],
  ["Ver todos", "View all"],
  ["Ver tudo", "View all"],
  ["Ver mais", "See more"],
  ["Lista recente", "Recent list"],
  ["Ranking de faixas adicionadas agora", "Ranking of tracks added now"],
  ["Beats escolhidos pra voc\u00ea", "Beats picked for you"],
  ["Recomenda\u00e7\u00f5es moldadas para sua pr\u00f3xima m\u00fasica", "Recommendations shaped for your next song"],
  ["Playlists para seu estilo", "Playlists for your style"],
  ["Curadoria baseada no seu gosto musical", "Curation based on your musical taste"],
  ["Abrir", "Open"],
  ["Abrir pack", "Open pack"],
  ["Abrir playlist", "Open playlist"],
  ["Tocar", "Play"],
  ["Tocar pack", "Play pack"],
  ["Pausar", "Pause"],
  ["Licen\u00e7a", "License"],
  ["Comprar licen\u00e7a", "Buy license"],
  ["Escolher licen\u00e7a", "Choose license"],
  ["Contratar", "Hire"],
  ["Ver perfil", "View profile"],
  ["Seguir", "Follow"],
  ["Baixar", "Download"],
  ["Compartilhar", "Share"],
  ["Favoritar", "Favorite"],
  ["Remover", "Remove"],
  ["Adicionar", "Add"],
  ["Salvar", "Save"],
  ["Editar", "Edit"],
  ["Loop", "Loop"],
  ["Volume", "Volume"],
  ["Fila", "Queue"],
  ["Fechar player", "Close player"],
  ["Ajustar tempo da m\u00fasica", "Adjust song time"],
  ["Faixa anterior", "Previous track"],
  ["Pr\u00f3xima faixa", "Next track"],
  ["Favoritar beat atual", "Favorite current beat"],
  ["Adicionar ao carrinho", "Add to cart"],
  ["Finalizar pedido", "Complete order"],
  ["Checkout seguro ANSEND", "Secure ANSEND checkout"],
  ["Pagamento simulado em ambiente preview. Pedido fica salvo na aba Pedidos.", "Simulated payment in preview mode. The order is saved in Orders."],
  ["Revise seus beats e finalize seu pedido.", "Review your beats and complete your order."],
  ["INFORMA\u00c7\u00d5ES DE COBRAN\u00c7A E LICENCIAMENTO", "BILLING AND LICENSING INFORMATION"],
  ["Adicionar info", "Add info"],
  ["Resumo do carrinho", "Cart summary"],
  ["Compartilhar carrinho", "Share cart"],
  ["Total de itens", "Items total"],
  ["Taxa de servi\u00e7o", "Service fee"],
  ["Continuar como visitante.", "Continue as guest."],
  ["Entrar", "Sign in"],
  ["Criar conta", "Sign up"],
  ["Prosseguir para checkout", "Proceed to checkout"],
  ["Adicione mais 1 TRACK para ativar a promo\u00e7\u00e3o de Compre 1 e Leve 2!", "Add 1 more track to activate the Buy 1 Get 2 promotion!"],
  ["Promovidos", "Promoted"],
  ["Seu carrinho est\u00e1 vazio", "Your cart is empty"],
  ["Adicione beats ou servi\u00e7os ao carrinho para finalizar seu pedido.", "Add beats or services to your cart to complete your order."],
  ["Nenhum pedido ainda", "No orders yet"],
  ["Quando voce comprar uma licenca ou contratar um servico, ele aparecera aqui.", "When you buy a license or hire a service, it will appear here."],
  ["Sua lista est\u00e1 vazia", "Your list is empty"],
  ["Favorite beats no feed para encontr\u00e1-los aqui.", "Favorite beats in the feed to find them here."],
  ["Nenhum beat encontrado", "No beat found"],
  ["Tente outro nome, g\u00eanero ou BPM.", "Try another name, genre, or BPM."],
  ["Entrar na sua conta", "Sign in to your account"],
  ["Crie sua conta ANSEND", "Create your ANSEND account"],
  ["Acesse playlists, compras, favoritos e recomendacoes adaptadas a sua funcao.", "Access playlists, orders, favorites, and recommendations adapted to your role."],
  ["Escolha sua funcao para montar uma experiencia personalizada.", "Choose your role to build a personalized experience."],
  ["Nome completo", "Full name"],
  ["Seu nome completo", "Your full name"],
  ["Nome art\u00edstico ou marca", "Artist name or brand"],
  ["Ex: Viana Beats", "Ex: Viana Beats"],
  ["Senha", "Password"],
  ["Sua senha", "Your password"],
  ["Entrar no painel", "Enter dashboard"],
  ["Continuar com Google", "Continue with Google"],
  ["Ainda nao tem conta?", "Do not have an account yet?"],
  ["Ja tem conta?", "Already have an account?"],
  ["Artista", "Artist"],
  ["Sou artista", "I'm an artist"],
  ["Sou beatmaker", "I'm a beatmaker"],
  ["Sou designer", "I'm a designer"],
  ["Produtor Musical", "Music Producer"],
  ["Sou produtor musical", "I'm a music producer"],
  ["Sou curador", "I'm a curator"],
  ["Marketing Musical", "Music Marketing"],
  ["Trabalho com marketing musical", "I work with music marketing"],
  ["Produtor", "Producer"],
  ["Manager", "Manager"],
  ["Selo", "Label"],
  ["Publica beats, gerencia licen\u00e7as e acompanha vendas.", "Publishes beats, manages licenses, and tracks sales."],
  ["Monta playlists, salva cat\u00e1logos e encontra novos sons.", "Builds playlists, saves catalogs, and discovers new sounds."],
  ["Busca beats para gravar, licenciar e lan\u00e7ar m\u00fasicas.", "Finds beats to record, license, and release songs."],
  ["Organiza capas, identidade visual e assets de lan\u00e7amento.", "Organizes covers, visual identity, and release assets."],
  ["Cria beats, colabora com produtores e sobe cat\u00e1logos.", "Creates beats, collaborates with producers, and uploads catalogs."],
  ["Gerencia artistas, compras, contratos e lan\u00e7amentos.", "Manages artists, purchases, contracts, and releases."],
  ["Opera cat\u00e1logo, talentos e licen\u00e7as em escala.", "Operates catalogs, talent, and licenses at scale."],
  ["Quero transformar ideias, letras ou demos em lancamentos.", "I want to turn ideas, lyrics, or demos into releases."],
  ["Quero vender beats, organizar packs e encontrar artistas.", "I want to sell beats, organize packs, and find artists."],
  ["Quero vender capas, identidade visual e artes para lancamentos.", "I want to sell covers, visual identity, and release artwork."],
  ["Quero mixar, masterizar, produzir e receber projetos.", "I want to mix, master, produce, and receive projects."],
  ["Quero montar playlists, selecionar sons e descobrir talentos.", "I want to build playlists, select sounds, and discover talent."],
  ["Quero criar campanhas, divulgar artistas e medir resultados.", "I want to create campaigns, promote artists, and measure results."],
  ["Venda beats, organize licen\u00e7as e acompanhe downloads em tempo real.", "Sell beats, organize licenses, and track downloads in real time."],
  ["Licen\u00e7as seguras", "Secure licenses"],
  ["Cat\u00e1logo profissional", "Professional catalog"],
  ["Entrega imediata", "Instant delivery"],
  ["Venda seus beats", "Sell your beats"],
  ["Abra sua loja", "Open your store"],
  ["Come\u00e7ar", "Start"],
  ["Central ANSEND", "ANSEND Center"],
  ["Encontre informa\u00e7\u00f5es sobre servi\u00e7os, seguran\u00e7a, pagamentos, licen\u00e7as, privacidade e uso da plataforma.", "Find information about services, security, payments, licenses, privacy, and platform usage."],
  ["Como funciona a ANSEND", "How ANSEND works"],
  ["Servi\u00e7os dispon\u00edveis", "Available services"],
  ["Termos e pol\u00edticas", "Terms and policies"],
  ["Seguran\u00e7a e confian\u00e7a", "Security and trust"],
  ["Suporte", "Support"],
  ["Servi\u00e7os", "Services"],
  ["O que pode ser contratado na ANSEND", "What you can hire on ANSEND"],
  ["A plataforma organiza servi\u00e7os musicais por categoria para conectar artistas aos profissionais certos.", "The platform organizes music services by category to connect artists with the right professionals."],
  ["Vendam beats, instrumentais, licen\u00e7as musicais, produ\u00e7\u00f5es personalizadas, beat lease, beat exclusivo, type beat, instrumental sob encomenda e pacotes de beats.", "Sell beats, instrumentals, music licenses, custom productions, beat leases, exclusive beats, type beats, custom instrumentals, and beat packs."],
  ["Criam capas de single, capas de \u00e1lbum, identidade visual de lan\u00e7amento, artes para redes sociais, banners e materiais promocionais.", "Create single covers, album covers, release visual identity, social media assets, banners, and promotional materials."],
  ["Atuam com produ\u00e7\u00e3o, dire\u00e7\u00e3o musical, mixagem, masteriza\u00e7\u00e3o, grava\u00e7\u00e3o guiada, dire\u00e7\u00e3o vocal e finaliza\u00e7\u00e3o de faixa.", "Work with production, music direction, mixing, mastering, guided recording, vocal direction, and track finishing."],
  ["Ajudam no posicionamento em playlists, canais, blogs, p\u00e1ginas, comunidades musicais, feedback profissional e an\u00e1lise de lan\u00e7amento.", "Help with placement in playlists, channels, blogs, pages, music communities, professional feedback, and release analysis."],
  ["Planejam lan\u00e7amento, tr\u00e1fego, divulga\u00e7\u00e3o em redes sociais, estrat\u00e9gia de conte\u00fado, posicionamento art\u00edstico e an\u00e1lise de p\u00fablico.", "Plan releases, traffic, social promotion, content strategy, artistic positioning, and audience analysis."],
  ["Fluxo", "Flow"],
  ["Como funciona a ANSEND", "How ANSEND works"],
  ["O usu\u00e1rio entra com uma ideia, letra, demo, m\u00fasica pronta, imagem, objetivo ou necessidade. A NEXO IA transforma isso em um caminho de execu\u00e7\u00e3o.", "The user enters an idea, lyrics, demo, finished song, image, goal, or need. NEXO AI turns it into an execution path."],
  ["O artista entra com uma ideia", "The artist enters an idea"],
  ["A NEXO IA analisa o objetivo", "NEXO AI analyzes the goal"],
  ["A plataforma recomenda profissionais", "The platform recommends professionals"],
  ["O usu\u00e1rio contrata com seguran\u00e7a", "The user hires safely"],
  ["O profissional entrega o servi\u00e7o", "The professional delivers the service"],
  ["O usu\u00e1rio avalia", "The user reviews"],
  ["Legal", "Legal"],
  ["Central Legal", "Legal Center"],
  ["Documentos jur\u00eddicos e regulat\u00f3rios reunidos de forma clara, sem parecer burocr\u00e1tico.", "Legal and regulatory documents gathered clearly without feeling bureaucratic."],
  ["Termos", "Terms"],
  ["Termos de Uso", "Terms of Use"],
  ["Pol\u00edtica de Privacidade", "Privacy Policy"],
  ["Pol\u00edtica de Cookies", "Cookie Policy"],
  ["Termos de Licen\u00e7a Musical", "Music License Terms"],
  ["Pagamentos e Reembolsos", "Payments and Refunds"],
  ["Direitos Autorais", "Copyright"],
  ["Seguran\u00e7a na ANSEND", "ANSEND Security"],
  ["Diretrizes para Profissionais", "Guidelines for Professionals"],
  ["Diretrizes para Artistas", "Guidelines for Artists"],
  ["Plataforma", "Platform"],
  ["Para artistas", "For artists"],
  ["Como contratar", "How to hire"],
  ["Criar briefing", "Create briefing"],
  ["Licen\u00e7as musicais", "Music licenses"],
  ["Para profissionais", "For professionals"],
  ["Vender na ANSEND", "Sell on ANSEND"],
  ["Diretrizes profissionais", "Professional guidelines"],
  ["Criar loja", "Create store"],
  ["Receber pagamentos", "Receive payments"],
  ["Reputa\u00e7\u00e3o", "Reputation"],
  ["Privacidade", "Privacy"],
  ["Cookies", "Cookies"],
  ["Confian\u00e7a", "Trust"],
  ["Denunciar problema", "Report a problem"],
  ["Contato", "Contact"],
  ["Ecossistema musical inteligente para artistas e profissionais.", "Intelligent music ecosystem for artists and professionals."],
  ["Marketplace de beats, m\u00fasicas e produtores independentes.", "Marketplace for beats, music, and independent producers."],
  ["Sobre", "About"],
  ["Licen\u00e7as", "Licenses"],
  ["Perfil", "Profile"],
  ["Cat\u00e1logo", "Catalog"],
  ["Portf\u00f3lio", "Portfolio"],
  ["Projetos", "Projects"],
  ["Publicar", "Publish"],
  ["Salvar altera\u00e7\u00f5es", "Save changes"],
  ["Sair", "Sign out"],
  ["Idioma", "Language"],
  ["Tema", "Theme"],
  ["Prefer\u00eancias", "Preferences"],
  ["Conta criada em modo preview. Conecte a key para salvar no Supabase.", "Account created in preview mode. Connect the key to save to Supabase."],
  ["Sess\u00e3o iniciada em modo preview.", "Signed in in preview mode."],
  ["Conta criada com sucesso.", "Account created successfully."],
  ["Pedido finalizado com sucesso!", "Order completed successfully!"],
  ["Adicionado ao carrinho", "Added to cart"],
  ["Removido do carrinho", "Removed from cart"],
  ["Adicionado aos favoritos", "Added to favorites"],
  ["Removido dos favoritos", "Removed from favorites"],
  ["Player fechado. Clique em play em qualquer beat para abrir de novo.", "Player closed. Click play on any beat to open it again."],
  ["Beat pausado", "Beat paused"],
  ["Login necess\u00e1rio", "Login required"],
  ["Fa\u00e7a login para continuar.", "Sign in to continue."],
  ["Nao consegui carregar seu catalogo no Supabase", "I could not load your catalog from Supabase"],
  ["Preencha titulo e genero para cadastrar", "Fill in title and genre to publish"],
  ["Nao foi possivel salvar no Supabase", "Could not save to Supabase"],
  ["Item salvo no catalogo Supabase", "Item saved to Supabase catalog"],
  ["Item salvo neste navegador. Entre para sincronizar no Supabase.", "Item saved in this browser. Sign in to sync with Supabase."],
  ["Nao foi possivel remover", "Could not remove item"],
  ["Item removido do catalogo", "Item removed from catalog"],
  ["Nao foi possivel atualizar", "Could not update item"],
  ["Item publicado", "Item published"],
  ["Item voltou para rascunho", "Item moved back to draft"],
  ["N\u00e3o consegui carregar seu perfil do Supabase", "I could not load your Supabase profile"],
  ["Perfil musical inicial criado pela NEXO", "Initial music profile created by NEXO"],
  ["Feed personalizado com uma curadoria inicial", "Feed personalized with initial curation"],
  ["Sua dashboard NEXO foi adaptada", "Your NEXO dashboard was adapted"],
  ["Link do beat copiado", "Beat link copied"],
  ["Link pronto para compartilhar", "Link ready to share"],
  ["Loop ativado no player", "Loop enabled in player"],
  ["Loop desativado", "Loop disabled"],
  ["Shuffle ativado", "Shuffle enabled"],
  ["Shuffle desativado", "Shuffle disabled"],
  ["Player fechado. Clique em play para abrir de novo.", "Player closed. Click play to open it again."],
  ["Clique para liberar o player do beat", "Click to unlock the beat player"],
  ["Use criar conta para liberar acesso neste ambiente.", "Use sign up to unlock access in this environment."],
  ["Conta criada. Vamos personalizar sua experi\u00eancia.", "Account created. Let's personalize your experience."],
  ["Login realizado", "Signed in"],
  ["Conta criada e perfil salvo", "Account created and profile saved"],
  ["Conta criada. Perfil liberado enquanto a sess\u00e3o sincroniza.", "Account created. Profile unlocked while the session syncs."],
  ["Conta liberada. Vamos personalizar sua experi\u00eancia.", "Account unlocked. Let's personalize your experience."],
  ["Voc\u00ea saiu da conta ANSEND", "You signed out of ANSEND"],
  ["Idioma alterado para portugues", "Language changed to Portuguese"],
  ["Google entra na pr\u00f3xima etapa. Use e-mail e senha por enquanto.", "Google sign-in comes next. Use email and password for now."],
  ["Preview pausado", "Preview paused"],
  ["Editor resetado", "Editor reset"],
  ["Explore, escolha sua licen\u00e7a e baixe o beat imediatamente", "Explore, choose your license, and download the beat immediately"],
  ["Download preparado com sucesso", "Download prepared successfully"],
  ["Sua loja de produtor est\u00e1 pronta para configurar", "Your producer store is ready to configure"],
  ["Voc\u00ea tem 3 novos lan\u00e7amentos", "You have 3 new releases"],
  ["Edi\u00e7\u00e3o de perfil habilitada", "Profile editing enabled"],
  ["Configura\u00e7\u00e3o salva", "Settings saved"],
  ["Comentario publicado no preview", "Comment posted in preview"],
  ["Plano gerado pela NEXO local", "Plan generated by local NEXO"],
  ["Plano gerado pela NEXO IA", "Plan generated by NEXO AI"],
  ["Editor de audio", "Audio Editor"],
  ["Esses ajustes valem apenas para a escuta do preview e nao alteram downloads ou compras.", "Note: These playback controls are purely for inspiration and will not be applied to downloads or purchases."],
  ["Velocidade", "Speed"],
  ["Tom", "Pitch"],
  ["Redefinir", "Reset"],
  ["Queue", "Queue"],
  ["Comentarios", "Comments"],
  ["Compartilhar", "Share"],
  ["Repostar", "Repost"],
  ["Adicionar a playlist", "Add to Playlist"],
  ["Desativar aleatorio", "Turn shuffle off"],
  ["Ativar aleatorio", "Turn shuffle on"],
  ["Ir para a musica", "Go to Track"],
  ["Ir para o artista", "Go to Artist"],
  ["Músicas", "Music"],
  ["Musicas", "Music"],
  ["Autenticacao Necessaria", "Authentication Required"],
  ["Autenticação Necessária", "Authentication Required"],
  ["Voce precisa criar uma conta ou fazer login para lancar suas musicas e beats na plataforma.", "You need to create an account or sign in to release your songs and beats on the platform."],
  ["Você precisa criar uma conta ou fazer login para lançar suas músicas e beats na plataforma.", "You need to create an account or sign in to release your songs and beats on the platform."],
  ["Entrar / Criar Conta", "Sign in / Create Account"],
  ["Converse com a inteligencia musical da ANSEND", "Talk to ANSEND's music intelligence"],
  ["Transforme uma ideia em um plano real de lancamento, com orientacao sobre beat, capa, mix/master, marketing, curadoria e proximos passos.", "Turn an idea into a real release plan with guidance for beat, cover, mix/master, marketing, curation, and next steps."],
  ["Quero lancar uma musica do zero", "I want to release a song from scratch"],
  ["Me ajude a montar um plano de lancamento", "Help me build a release plan"],
  ["Quero encontrar produtores, designers e curadores", "I want to find producers, designers, and curators"],
  ["Analise minha ideia musical", "Analyze my music idea"],
  ["Monte um diagnostico para meu proximo single", "Build a diagnostic for my next single"],
  ["Conte sua ideia, seu momento ou o que voce quer lancar...", "Share your idea, your current stage, or what you want to release..."],
  ["Enviar mensagem para NEXO IA", "Send message to NEXO AI"],
  ["NEXO IA esta pensando", "NEXO AI is thinking"],
  ["Informacoes do Beat", "Beat Information"],
  ["Informações do Beat", "Beat Information"],
  ["Preencha apenas o essencial agora. Voce pode adicionar detalhes extras se quiser melhorar a descoberta do beat.", "Fill in only the essentials now. You can add extra details if you want to improve beat discovery."],
  ["Preencha apenas o essencial agora. Você pode adicionar detalhes extras se quiser melhorar a descoberta do beat.", "Fill in only the essentials now. You can add extra details if you want to improve beat discovery."],
  ["Publicado por", "Published by"],
  ["Titulo do beat *", "Beat title *"],
  ["Título do beat *", "Beat title *"],
  ["Genero *", "Genre *"],
  ["Gênero *", "Genre *"],
  ["Selecione o genero", "Select genre"],
  ["Selecione o gênero", "Select genre"],
  ["Tom musical / Key *", "Musical key *"],
  ["Selecione o tom", "Select key"],
  ["Adicionar mais detalhes", "Add more details"],
  ["opcional", "optional"],
  ["Subgenero", "Subgenre"],
  ["Subgênero", "Subgenre"],
  ["Subgenero opcional", "Subgenre optional"],
  ["Subgênero opcional", "Subgenre optional"],
  ["Descricao curta", "Short description"],
  ["Descrição curta", "Short description"],
  ["Descricao curta opcional", "Short description optional"],
  ["Descrição curta opcional", "Short description optional"],
  ["Essa faixa ja foi lancada antes?", "Has this track been released before?"],
  ["Essa faixa já foi lançada antes?", "Has this track been released before?"],
  ["Sim", "Yes"],
  ["Nao", "No"],
  ["Não", "No"],
  ["Detalhes", "Details"],
  ["Faixa", "Track"],
  ["Preco", "Price"],
  ["Preço", "Price"],
  ["Entrega", "Delivery"],
  ["Revisao", "Review"],
  ["Revisão", "Review"],
  ["Sem titulo", "Untitled"],
  ["Sem título", "Untitled"],
  ["Salvar Rascunho", "Save Draft"],
  ["Voltar", "Back"],
  ["Proximo", "Next"],
  ["Próximo", "Next"],
  ["Capa do Beat", "Beat Cover"],
  ["Envie uma capa quadrada de alta qualidade. Recomendamos 3000x3000px.", "Upload a high-quality square cover. We recommend 3000x3000px."],
  ["Arraste ou selecione a capa", "Drag or select the cover"],
  ["Enviando capa...", "Uploading cover..."],
  ["Recomendacoes", "Recommendations"],
  ["Recomendações", "Recommendations"],
  ["Imagem quadrada perfeita (1:1)", "Perfect square image (1:1)"],
  ["Minimo 1400x1400px (ideal 3000x3000px)", "Minimum 1400x1400px (ideal 3000x3000px)"],
  ["Mínimo 1400x1400px (ideal 3000x3000px)", "Minimum 1400x1400px (ideal 3000x3000px)"],
  ["Sem textos pequenos ou logos adicionais", "No small text or additional logos"],
  ["Sem imagens borradas ou pixeladas", "No blurry or pixelated images"],
  ["Arquivo de Audio", "Audio File"],
  ["Arquivo de Áudio", "Audio File"],
  ["Suba o arquivo de audio do beat (MP3, WAV ou FLAC).", "Upload the beat audio file (MP3, WAV, or FLAC)."],
  ["Suba o arquivo de áudio do beat (MP3, WAV ou FLAC).", "Upload the beat audio file (MP3, WAV, or FLAC)."],
  ["Arraste ou selecione o audio", "Drag or select the audio"],
  ["Arraste ou selecione o áudio", "Drag or select the audio"],
  ["MP3, WAV ou FLAC de alta qualidade", "High-quality MP3, WAV, or FLAC"],
  ["Enviando audio...", "Uploading audio..."],
  ["Enviando áudio...", "Uploading audio..."],
  ["Preview Pronto", "Preview Ready"],
  ["Licenca e Preco", "License and Price"],
  ["Licença e Preço", "License and Price"],
  ["Defina o tipo de licenca e o valor do beat.", "Set the license type and beat price."],
  ["Defina o tipo de licença e o valor do beat.", "Set the license type and beat price."],
  ["Basica", "Basic"],
  ["Básica", "Basic"],
  ["Gratis", "Free"],
  ["Grátis", "Free"],
  ["Exclusiva", "Exclusive"],
  ["Preco do Beat (R$) *", "Beat Price (USD) *"],
  ["Preço do Beat (R$) *", "Beat Price (USD) *"],
  ["Vendas maximas", "Maximum sales"],
  ["Vendas máximas", "Maximum sales"],
  ["Termos da licenca (opcional)", "License terms (optional)"],
  ["Termos da licença (opcional)", "License terms (optional)"],
  ["Entrega do Beat", "Beat Delivery"],
  ["Especifique os arquivos que o comprador recebera.", "Specify the files the buyer will receive."],
  ["Especifique os arquivos que o comprador receberá.", "Specify the files the buyer will receive."],
  ["Arquivos incluidos na compra *", "Files included in purchase *"],
  ["Arquivos incluídos na compra *", "Files included in purchase *"],
  ["Observacoes para o comprador", "Notes for the buyer"],
  ["Observações para o comprador", "Notes for the buyer"],
  ["Selecione o ZIP de Stems", "Select the Stems ZIP"],
  ["Pistas individuais do beat", "Individual beat tracks"],
  ["Revisao Final", "Final Review"],
  ["Revisão Final", "Final Review"],
  ["Confira todas as informacoes antes de publicar.", "Check all information before publishing."],
  ["Confira todas as informações antes de publicar.", "Check all information before publishing."],
  ["por Produtor ANSEND", "by ANSEND Producer"],
  ["Arquivos", "Files"],
  ["Descricao", "Description"],
  ["Descrição", "Description"],
  ["Sem descricao fornecida.", "No description provided."],
  ["Sem descrição fornecida.", "No description provided."],
];

const localeTextMaps = {
  en: new Map(englishTextPairs),
  "en-US": new Map(englishTextPairs),
  "pt-BR": englishTextPairs.reduce((map, [pt, en]) => {
    if (!map.has(en)) map.set(en, pt);
    return map;
  }, new Map()),
};

function translateUiText(value) {
  const text = String(value || "");
  const trimmed = text.trim();
  if (!trimmed) return text;
  const translated = localeTextMaps[appLocale.current]?.get(trimmed);
  return translated ? text.replace(trimmed, translated) : text;
}

function translateToastText(message) {
  let next = translateUiText(message);
  if (appLocale.current === "en-US") {
    next = next
      .replace(/^Tocando top 1 do dia:/, "Playing top 1 of the day:")
      .replace(/^Tocando agora:/, "Now playing:")
      .replace(/^Tocando /, "Playing ");
  }
  return next;
}

function applyLocaleTextOverrides(root = document) {
  const scope = root.body || root;
  if (!scope) return;
  const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    const translated = translateUiText(node.nodeValue);
    if (translated !== node.nodeValue) node.nodeValue = translated;
  });
  scope.querySelectorAll("[placeholder]").forEach((node) => {
    const current = node.getAttribute("placeholder");
    const translated = translateUiText(current);
    if (translated !== current) node.setAttribute("placeholder", translated);
  });
  scope.querySelectorAll("[aria-label]").forEach((node) => {
    const current = node.getAttribute("aria-label");
    const translated = translateUiText(current);
    if (translated !== current) node.setAttribute("aria-label", translated);
  });
  scope.querySelectorAll("[title]").forEach((node) => {
    const current = node.getAttribute("title");
    const translated = translateUiText(current);
    if (translated !== current) node.setAttribute("title", translated);
  });
  scope.querySelectorAll("[data-prompt]").forEach((node) => {
    const current = node.dataset.prompt;
    const translated = translateUiText(current);
    if (translated !== current) node.dataset.prompt = translated;
  });
}

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
    headline: ["Seu primeiro hit", "começa aqui."],
    subheadline: "Busque um som, descreva sua ideia ou peça para a NEXO montar o plano certo.",
    placeholder: "Explore novos sons ou diga para a NEXO o que você quer lançar...",
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
    headline: ["Seu catalogo", "vende com NEXO IA."],
    subheadline: "Descreva seus beats ou packs. A ANSEND organiza a vitrine e sugere o proximo passo.",
    placeholder: "Ex: Tenho 20 beats de trap 140 BPM e quero montar um pack para vender melhor...",
    primaryCta: "Organizar catalogo",
    secondaryCta: "Encontrar artistas",
    chips: [["Criar pack", "Quero montar um pack de beats para vender melhor."], ["Precificar beats", "Preciso definir preco e licencas para meus beats."], ["Achar artistas", "Quero encontrar artistas com match para meu som."]],
    benefits: [["shield-check", "Licencas claras"], ["bar-chart-3", "Catalogo otimizado"], ["users-round", "Match com artistas"]],
    preview: ["Pack ideal - Trap Melodico", "Preco sugerido - R$ 499", "Match - 18 artistas"],
    mapSteps: [["Pack ideal", "Trap Melodico"], ["Preco sugerido", "R$ 499"], ["Match", "18 artistas"]],
    compactRecommendation: true,
    recommendationTitle: "NEXO recomenda",
    recommendationSubtitle: "Diagnostico rapido para vender melhor.",
    metrics: [["Packs", "3 ativos"], ["Match", "18 artistas"], ["Vendas", "+12%"]],
    actions: [["perfil", "Cadastrar beats"], ["catalogo", "Ver catalogo"], ["profissionais", "Colaborar"]],
    sectionTitle: "Oportunidades para beatmakers",
    sectionSubtitle: "Artistas, packs e referencias para vender melhor",
    playlistTitle: "Packs em destaque",
    playlistSubtitle: "Formatos que combinam com seu catalogo",
    combo: "Pack / Licencas / Tags / Vitrine / Match com artistas",
  },
  designer: {
    headline: ["Crie capas", "com direcao de IA."],
    subheadline: "Descreva o estilo do artista. A ANSEND transforma briefing em oferta visual clara.",
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
    headline: ["Organize projetos", "com NEXO IA."],
    subheadline: "Descreva a demo. A ANSEND estrutura mix, master, referencias e entrega final.",
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
    headline: ["Sua curadoria", "guiada por IA."],
    subheadline: "Descreva o mood. A ANSEND sugere recortes, ordem de faixas e sons com match.",
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
    headline: ["Lance melhor", "com plano de IA."],
    subheadline: "Descreva o objetivo. A ANSEND sugere campanha, canais, criativos e proximas acoes.",
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

const heroHeadline = ["ANSEND", "O\u00a0marketplace inteligente da\u00a0música"];

const playlists = [
  ["Trap na Área", "52 beats", "assets/catalog-cover-01.webp"],
  ["Mainstreet Hits", "38 faixas", "assets/catalog-cover-02.webp"],
  ["Drill Brutal", "44 beats", "assets/catalog-cover-03.webp"],
  ["Matuê Type", "29 beats", "assets/catalog-cover-04.webp"],
  ["Yunk Vino Vibes", "31 beats", "assets/catalog-cover-05.webp"],
  ["Noite 808", "67 beats", "assets/catalog-cover-06.webp"],
];
const covers = [
  "assets/catalog-cover-07.webp",
  "assets/catalog-cover-08.webp",
  "assets/catalog-cover-09.webp",
  "assets/catalog-cover-10.webp",
  "assets/catalog-exclusive.jpg",
  "assets/catalog-chorus.jpg",
  "assets/catalog-vocal.jpg",
  "assets/catalog-cover-01.webp",
  "assets/catalog-cover-02.webp",
  "assets/catalog-cover-03.webp",
  "assets/catalog-cover-04.webp",
  "assets/catalog-cover-05.webp",
  "assets/catalog-cover-06.webp",
  "assets/catalog-cover-07.webp",
  "assets/catalog-cover-08.webp",
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
  cover: covers[i % covers.length],
  tags: [genres[i % genres.length], `${90 + (i * 7) % 62} BPM`],
  badge,
});

const allBeats = [];
const topBeatOfDay = {
  id: "top-beat-psiiiko",
  title: "PSIIIKO",
  producer: "FlackBeats x beatsbydudiz",
  cover: "assets/top-beat-psiiiko-cover.jpg",
  audio: "assets/top-beat-psiiiko.mp3",
  tags: ["Type Beat", "Top 1 do dia"],
};

const appState = {
  favorites: new Set(JSON.parse(localStorage.getItem("ansend-favorites") || "[]")),
  purchases: JSON.parse(localStorage.getItem("ansend-purchases") || "[]"),
  orders: JSON.parse(localStorage.getItem("ansend-orders") || "[]"),
  contracts: JSON.parse(localStorage.getItem("ansend-contracts") || "[]"),
  onboardingProfile: JSON.parse(localStorage.getItem("ansend-onboarding-profile") || "null"),
  musicProfile: JSON.parse(localStorage.getItem("ansend_user_music_profile") || "null"),
  // Community data always comes from Supabase. Keep owned and public records
  // separate so private screens can never accidentally become marketplace data.
  publicCatalogItems: [],
  ownedCatalogItems: [],
  publicProfiles: [],
  hiring: {
    activeTab: "for-you",
    filters: {
      category: "todos",
      budget: "",
      deadline: "todos",
      status: "todos",
      workMode: "todos",
    },
    posts: [],
    comments: {},
    proposals: [],
    conversations: [],
    messages: {},
    loading: false,
    submitting: false,
    error: "",
    detailId: "",
    lastLoadedAt: 0,
    activeRequestId: 0,
    cache: {},
    railLoading: false,
    railError: "",
    routeStartedAt: 0,
    promotedAd: {
      item: null,
      loading: false,
      error: "",
      activeRequestId: 0,
      trackedImpressionId: "",
    },
  },
  chat: {
    conversations: [],
    participants: {},
    messages: {},
    profiles: {},
    activeConversationId: "",
    search: "",
    userSearch: "",
    userResults: [],
    loading: false,
    lastLoadedAt: 0,
    activeRequestId: 0,
    messagesLoading: false,
    sending: false,
    newChatOpen: false,
    error: "",
    realtimeChannels: [],
    searchTimer: null,
    drafts: {},
    draftModes: {},
    attachmentDrafts: {},
    uploadProgress: {},
    composerMenuOpen: "",
    gifPickerOpen: "",
    gifQuery: "",
    gifResults: [],
    gifLoading: false,
    emojiPickerOpen: "",
    pendingActions: {},
    failedMessages: {},
    lastRenderedConversationId: "",
  },
  isAdmin: false,
  adminProfiles: [],
  aiPlan: JSON.parse(localStorage.getItem("ansend-ai-plan") || "null"),
  nexoChatMessages: [],
  nexoChatLoading: false,
  nexoChatError: "",
  nexoChatConversationId: "",
  nexoChatHistoryLoading: false,
  nexoAssistant: {
    open: false,
    expanded: false,
    minimized: false,
    unread: false,
    initialized: false,
    abortController: null,
  },
  recommendations: { professionals: [], feed: [], updatedAt: 0 },
  recommendationsLoading: false,
  recommendationImpressions: new Set(),
  releaseMode: "",
  catalogImport: null,
  followStates: {},
  authUser: null,
  authSession: null,
  authLoading: Boolean(supabaseClient),
  profileLoading: false,
  profile: null,
  authReady: !supabaseClient,
  query: "",
  genre: "Todos",
  playing: null,
  sellerMode: "login",
  topBeatUnlocked: false,
  cart: JSON.parse(localStorage.getItem("ansend-cart") || "[]"),
  player: {
    loop: JSON.parse(localStorage.getItem("ansend-player-loop") || "false"),
    shuffle: JSON.parse(localStorage.getItem("ansend-player-shuffle") || "false"),
    volume: Number(localStorage.getItem("ansend-player-volume") || "0.82"),
    speed: Number(localStorage.getItem("ansend-player-speed") || "1"),
    pitch: Number(localStorage.getItem("ansend-player-pitch") || "0"),
    previewTime: Number(localStorage.getItem("ansend-player-preview-time") || "11"),
    currentBeat: null,
    status: "idle",
    duration: 0,
    currentTime: 0,
    error: "",
    sourceType: "",
    youtubeVideoId: "",
  },
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

const sections = [];

const lateSections = [];

const avatarImages = [
  "photo-1527980965255-d3b416303d12", "photo-1500648767791-00dcc994a43e", "photo-1494790108377-be9c29b29330",
  "photo-1522556189639-b150ed9c4330", "photo-1531384441138-2736e62e0919", "photo-1544723795-3fb6469f5b39",
  "photo-1504593811423-6dd665756598", "photo-1507003211169-0a1dd7228f2d",
];
const avatars = ["Faijo Gonzales", "Akira Beat", "Maya Keys", "Ghost Lab", "Rokstar", "DJ Shelby", "Noma", "Ares"];
const professionalCategories = [
  { id: "todos", label: "Todos", icon: "layout-grid" },
  { id: "beatmakers", label: "BeatMakers", icon: "audio-lines" },
  { id: "produtores", label: "Produtores", icon: "sliders-horizontal" },
  { id: "artistas", label: "Artistas", icon: "mic-2" },
  { id: "designers", label: "Designers", icon: "palette" },
  { id: "curadores", label: "Curadores", icon: "list-music" },
  { id: "marketing", label: "Marketing", icon: "megaphone" },
];
const professionalProfiles = [];

const licensePlans = {
  basic: {
    label: "Licença Básica",
    price: "R$ 79",
    summary: "MP3 sem tag para validar a ideia e lançar com segurança.",
    rights: ["Arquivo MP3", "5.000 streams", "Uso comercial", "Contrato digital"],
  },
  premium: {
    label: "Licença Premium",
    price: "R$ 179",
    summary: "WAV + MP3 para lançamento profissional em plataformas digitais.",
    rights: ["WAV e MP3", "100.000 streams", "Monetização liberada", "Contrato prioritário"],
  },
  exclusive: {
    label: "Licença Exclusiva",
    price: "R$ 799",
    summary: "O beat sai do catálogo após a compra e você recebe todos os arquivos.",
    rights: ["Stems completos", "Streams ilimitados", "Direitos exclusivos", "Suporte de lançamento"],
  },
};

Object.assign(licensePlans, {
  basic: {
    label: "MP3 Lease",
    price: "R$ 79",
    summary: "MP3 sem tag para validar a ideia e lancar com seguranca.",
    rights: ["Arquivo MP3", "5.000 streams", "Distribuicao limitada", "Credito obrigatorio"],
  },
  wav: {
    label: "WAV Lease",
    price: "R$ 129",
    summary: "Arquivo WAV para lancamento limpo em plataformas digitais.",
    rights: ["Arquivo WAV", "25.000 streams", "Uso em video", "Credito obrigatorio"],
  },
  unlimited: {
    label: "Unlimited WAV Lease",
    price: "R$ 249",
    summary: "WAV com teto ampliado para campanhas e crescimento.",
    rights: ["WAV sem tag", "Streams ilimitados", "Monetizacao liberada", "Contrato digital"],
  },
  premium: {
    label: "Trackout Lease",
    price: "R$ 349",
    summary: "Arquivos separados para mixagem profissional.",
    rights: ["Trackouts inclusos", "100.000 streams", "Uso comercial", "Contrato prioritario"],
  },
  stems: {
    label: "Unlimited + Track Stems",
    price: "R$ 499",
    summary: "Stems completos com uso digital ampliado.",
    rights: ["Stems completos", "Streams ilimitados", "Monetizacao liberada", "Distribuicao digital"],
  },
  exclusive: {
    label: "Full Monetization Lease",
    price: "R$ 799",
    summary: "Uso total com pacote completo de arquivos para campanha.",
    rights: ["Arquivos completos", "Monetizacao total", "Direitos ampliados", "Suporte de lancamento"],
  },
});

function professionalImage(profile) {
  if (profile?.avatar) return profile.avatar;
  if (profile?.avatar_url) return profile.avatar_url;
  return "";
}

function professionalAvatarMarkup(profile, className = "") {
  const source = professionalImage(profile);
  const name = profile?.name || profile?.display_name || profile?.artistic_name || profile?.full_name || "ANSEND";
  const safeClass = htmlEscape(className || "");
  const initials = htmlEscape(profileInitials(name));
  if (source) return optimizedImageMarkup({ src: source, alt: `Avatar de ${name}`, className: safeClass, width: 64, height: 64 });
  return `<span class="professional-avatar-fallback ${safeClass}" aria-label="Avatar de ${htmlEscape(name)}">${initials}</span>`;
}

function findProfessional(name) {
  const profiles = activeProfessionalProfiles();
  return profiles.find((profile) => profile.name === name)
    || profiles.find((profile) => profile.name.toLowerCase() === String(name || "").toLowerCase())
    || null;
}

function professionalsForNeed(prompt, limit = 5) {
  const text = String(prompt || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const wanted = [];
  if (/beat|instrumental|trap|drill|funk|type/.test(text)) wanted.push("beatmakers");
  if (/mix|master|producao|voz|demo|finalizar/.test(text)) wanted.push("produtores");
  if (/capa|visual|arte|design|canvas|identidade/.test(text)) wanted.push("designers");
  if (/playlist|curadoria|curador|radio/.test(text)) wanted.push("curadores");
  if (/divulg|marketing|ads|trafego|campanha|conteudo/.test(text)) wanted.push("marketing");
  const categories = wanted.length ? wanted : ["beatmakers", "produtores", "designers", "curadores", "marketing"];
  return activeProfessionalProfiles()
    .filter((profile) => categories.includes(profile.category))
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")))
    .slice(0, limit);
}

function beatMatchesForNeed(prompt, limit = 4) {
  const text = String(prompt || "").toLowerCase();
  const targetGenre = /drill/.test(text) ? "Drill" : /funk/.test(text) ? "Funk" : /r&b|rnb/.test(text) ? "R&B" : /boom bap/.test(text) ? "Boom Bap" : /type/.test(text) ? "Type Beat" : "Trap";
  return getRecommendedBeats(createDefaultMusicProfile({
    genres: [targetGenre],
    objective: /divulg|playlist|campanha/.test(text) ? "Divulgar lancamento" : /mix|master|demo|finalizar/.test(text) ? "Mixar/masterizar" : "Encontrar um beat",
    stage: /pronta|lancei|spotify|distribu/.test(text) ? "Tenho a musica pronta" : /demo|gravada/.test(text) ? "Tenho uma demo" : "Tenho uma letra",
    references: prompt,
    completed: true,
  })).slice(0, limit);
}

function nexoKnowledgeBase() {
  return {
    platform: "ANSEND e NEXO IA conectam artistas, beatmakers, produtores, designers, curadores e marketing musical.",
    routes: {
      feed: "Home com NEXO IA, beat top 1 e catálogos em alta.",
      explorar: "Catálogo de beats com filtros, favoritos, play e compra de licença.",
      produtores: "Diretório de profissionais por categoria com perfil e contratação.",
      perfil: "Conta do usuário, cadastro de beats/músicas e loja do vendedor.",
      compras: "Pedidos, licenças adquiridas, contratos e serviços contratados.",
      biblioteca: "Playlists salvas e histórico.",
    },
    licenses: licensePlans,
    professionals: activeProfessionalProfiles().map(({ name, role, category, specialty, price, rating, jobs }) => ({ name, role, category, specialty, price, rating, jobs })),
    beats: marketplaceBeats().map(({ id, title, producer, tags }) => ({ id, title, producer, tags })),
  };
}

function fallbackNexoIntelligence(prompt) {
  const base = inferLaunchPlan(prompt);
  const recommendedPros = professionalsForNeed(prompt);
  const recommendedBeats = beatMatchesForNeed(prompt);
  const firstRole = recommendedPros[0]?.category || "beatmakers";
  const nextRoute = firstRole === "beatmakers" ? "explorar" : "produtores";
  return {
    ...base,
    source: "fallback-local",
    confidence: recommendedPros.length ? "Alta" : "Media",
    recommendedProfessionals: recommendedPros.map((profile) => ({
      name: profile.name,
      role: profile.role,
      reason: profile.specialty || `${profile.role} cadastrado na ANSEND.`,
      route: "produtores",
    })),
    recommendedBeats: recommendedBeats.map((item) => ({
      id: item.id,
      title: item.title,
      producer: item.producer,
      reason: `${item.tags[0]} / ${item.tags[1]}`,
    })),
    recommendedLicense: /exclusiv|direito|selo/.test(prompt.toLowerCase()) ? "exclusive" : /wav|profissional|spotify|lancar|lançar/.test(prompt.toLowerCase()) ? "premium" : "basic",
    nextAction: {
      label: nextRoute === "explorar" ? "Abrir catálogo recomendado" : "Abrir profissionais recomendados",
      route: nextRoute,
    },
  };
}

async function callNexoDiagnosis(quiz) {
  try {
    const headers = await recommendationAuthHeaders();
    const response = await fetch("/api/nexo/analisar", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
      body: JSON.stringify({ quiz }),
    });
    const data = await response.json();
    if (!response.ok || !data?.success) throw new Error(data?.error || "Falha ao gerar diagnostico.");
    const result = {
      ...data.diagnostico,
      quiz,
      source: "openai",
      model: data.meta?.model || "gpt-5.4-mini",
      savedAt: data.meta?.savedAt || new Date().toISOString(),
    };
    localStorage.setItem(NEXO_DIAGNOSIS_STORAGE_KEY, JSON.stringify(result));
    localStorage.setItem(NEXO_QUIZ_STORAGE_KEY, JSON.stringify(quiz));
    return result;
  } catch (error) {
    return {
      success: false,
      error: error?.message || "A NEXO IA nao conseguiu gerar o diagnostico agora.",
    };
  }
}

const MOJIBAKE_TEXT_REPAIR_MAP = [
  ["\u00c3\u0192\u00c2\u00aa", "ê"],
  ["\u00c3\u0192\u00c2\u00a1", "á"],
  ["\u00c3\u0192\u00c2\u00a9", "é"],
  ["\u00c3\u0192\u00c2\u00ad", "í"],
  ["\u00c3\u0192\u00c2\u00b3", "ó"],
  ["\u00c3\u0192\u00c2\u00ba", "ú"],
  ["\u00c3\u0192\u00c2\u00a7", "ç"],
  ["\u00c3\u0192\u00c2\u00a3", "ã"],
  ["\u00c3\u00a1", "á"], ["\u00c3\u00a0", "à"], ["\u00c3\u00a2", "â"], ["\u00c3\u00a3", "ã"],
  ["\u00c3\u00a9", "é"], ["\u00c3\u00aa", "ê"], ["\u00c3\u00ad", "í"], ["\u00c3\u00b3", "ó"], ["\u00c3\u00b4", "ô"], ["\u00c3\u00b5", "õ"], ["\u00c3\u00ba", "ú"],
  ["\u00c3\u00a7", "ç"], ["\u00c3\u0081", "Á"], ["\u00c3\u0089", "É"], ["\u00c3\u008d", "Í"], ["\u00c3\u0093", "Ó"], ["\u00c3\u009a", "Ú"],
  ["\u00c3\u2021", "Ç"], ["\u00c3\u2022", "Õ"],
  ["\u00c2\u00b7", "·"], ["\u00c2\u00a0", " "],
  ["\u00e2\u20ac\u201d", "—"], ["\u00e2\u20ac\u201c", "–"], ["\u00e2\u20ac\u2122", "’"], ["\u00e2\u20ac\u0153", "“"], ["\u00e2\u20ac\u009d", "”"], ["\u00e2\u20ac\u00a2", "•"],
];

function repairMojibakeText(value) {
  let text = String(value ?? "");
  if (!/[\u00c2\u00c3\u00e2\ufffd]/.test(text)) return text;
  for (let pass = 0; pass < 3; pass += 1) {
    const before = text;
    for (const [bad, good] of MOJIBAKE_TEXT_REPAIR_MAP) text = text.split(bad).join(good);
    if (text === before) break;
  }
  return text;
}

function htmlEscape(value) {
  return repairMojibakeText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cssEscape(value) {
  if (window.CSS?.escape) return window.CSS.escape(String(value ?? ""));
  return String(value ?? "").replace(/["\\\]]/g, "\\$&");
}

function safeUrl(value, { fallback = "#", allowHash = true, allowRelative = true } = {}) {
  const raw = String(value || "").trim();
  if (!raw) return fallback;
  if (allowHash && /^#[A-Za-z0-9_-]+$/.test(raw)) return raw;
  try {
    const url = new URL(raw, window.location.origin);
    const sameOrigin = url.origin === window.location.origin;
    const allowedProtocols = new Set(["http:", "https:"]);
    if (!allowedProtocols.has(url.protocol)) return fallback;
    if (!allowRelative && sameOrigin && !/^https?:\/\//i.test(raw)) return fallback;
    if (allowRelative && sameOrigin) return `${url.pathname}${url.search}${url.hash}`;
    return url.href;
  } catch (_error) {
    return fallback;
  }
}

function optimizedImageMarkup({
  src,
  alt = "",
  className = "",
  width,
  height,
  priority = false,
  fallbackSrc = IMAGE_FALLBACK_SRC,
  sizes = "",
} = {}) {
  const safeSrc = htmlEscape(safeUrl(src || fallbackSrc || IMAGE_FALLBACK_SRC, { fallback: fallbackSrc || IMAGE_FALLBACK_SRC }));
  const safeFallback = htmlEscape(safeUrl(fallbackSrc || IMAGE_FALLBACK_SRC, { fallback: IMAGE_FALLBACK_SRC }));
  const attrs = [
    `src="${safeSrc}"`,
    `alt="${htmlEscape(alt)}"`,
    className ? `class="${htmlEscape(className)} app-optimized-image"` : `class="app-optimized-image"`,
    width ? `width="${Number(width)}"` : "",
    height ? `height="${Number(height)}"` : "",
    width && height ? `style="aspect-ratio:${Number(width)} / ${Number(height)};"` : "",
    sizes ? `sizes="${htmlEscape(sizes)}"` : "",
    `decoding="async"`,
    `loading="${priority ? "eager" : "lazy"}"`,
    priority ? `fetchpriority="high"` : `fetchpriority="low"`,
    `data-fallback-src="${safeFallback}"`,
  ].filter(Boolean).join(" ");
  return `<img ${attrs}>`;
}

function setupOptimizedImages(root = document) {
  root.querySelectorAll("img.app-optimized-image, img[data-fallback-src]").forEach((image) => {
    const markLoaded = () => image.classList.add("is-loaded");
    const fallback = image.dataset.fallbackSrc || IMAGE_FALLBACK_SRC;
    image.addEventListener("load", markLoaded, { once: true });
    image.addEventListener("error", () => {
      if (fallback && image.src !== new URL(fallback, location.href).href) {
        image.src = fallback;
      }
      image.classList.add("is-broken");
    }, { once: true });
    if (image.complete && image.naturalWidth > 0) markLoaded();
  });
}

function safeReadJson(key, fallback = null) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") || fallback;
  } catch (_error) {
    return fallback;
  }
}

function nexoDefaultQuiz(prompt = "") {
  return {
    nomeArtistico: activeProfile()?.artist_name || activeProfile()?.full_name || "",
    generoMusical: "Trap",
    subgenero: "Type Beat",
    nivelCarreira: "Iniciante",
    objetivoPrincipal: "encontrar beat/produtor",
    descricaoIdeiaMusical: prompt || "Tenho uma ideia musical e preciso transformar em lancamento profissional.",
    tipoProjeto: "single",
    jaTemMusicaGravada: false,
    jaTemBeat: false,
    jaTemCapa: false,
    jaTemMixMaster: false,
    prazoLancamento: "30 dias",
    orcamento: "ainda nao sei",
    principalDificuldade: "nao sei por onde comecar",
    referenciasArtisticas: "",
    publicoAlvo: "",
    vibeDaMusica: "trap/rua",
  };
}

function readNexoQuiz() {
  return { ...nexoDefaultQuiz(), ...safeReadJson(NEXO_QUIZ_STORAGE_KEY, {}) };
}

function saveNexoQuiz(quiz) {
  localStorage.setItem(NEXO_QUIZ_STORAGE_KEY, JSON.stringify(quiz));
}

function readNexoDiagnosis() {
  return safeReadJson(NEXO_DIAGNOSIS_STORAGE_KEY, null);
}

function promptToNexoQuiz(prompt) {
  const text = String(prompt || "").trim();
  const lower = text.toLowerCase();
  const genre = /funk/.test(lower) ? "Funk" : /drill/.test(lower) ? "Drill" : /r&b|rnb/.test(lower) ? "R&B" : "Trap";
  const objective = /divulg|marketing|campanha/.test(lower)
    ? "divulgar lancamento"
    : /mix|master/.test(lower)
      ? "fazer mixagem/masterizacao"
      : /capa|design|visual/.test(lower)
        ? "melhorar identidade visual"
        : /beat|produtor/.test(lower)
          ? "encontrar beat/produtor"
          : "montar estrategia completa";
  return {
    ...nexoDefaultQuiz(text),
    generoMusical: genre,
    objetivoPrincipal: objective,
    jaTemMusicaGravada: /gravada|pronta|demo|voz/.test(lower),
    jaTemBeat: /beat/.test(lower),
    jaTemCapa: /capa/.test(lower),
    vibeDaMusica: /romant/.test(lower) ? "romantica" : /gospel|espiritual/.test(lower) ? "gospel/espiritual" : "trap/rua",
  };
}

const nexoQuizSteps = [
  {
    title: "Quem e voce musicalmente?",
    helper: "A NEXO usa seu contexto para adaptar beats, profissionais e proximos passos.",
    fields: [
      { name: "nomeArtistico", label: "Nome artistico ou marca", type: "text", placeholder: "Ex: Viana Beats" },
      { name: "generoMusical", label: "Genero musical", type: "select", options: ["Trap", "Rap", "Funk", "Pop", "Sertanejo", "R&B", "Gospel", "Rock", "Eletronico", "Pagode", "Samba", "Reggaeton", "Afrobeat", "Indie", "MPB", "Outro"] },
      { name: "subgenero", label: "Subgenero ou referencia", type: "text", placeholder: "Ex: Trap melodic, funk 150, plug..." },
      { name: "nivelCarreira", label: "Nivel de carreira", type: "select", options: ["Iniciante", "Em desenvolvimento", "Intermediario", "Avancado", "Profissional", "Ja tenho publico consolidado"] },
    ],
  },
  {
    title: "Qual e o objetivo principal?",
    helper: "Descreva o que voce tem hoje e onde quer chegar.",
    fields: [
      { name: "objetivoPrincipal", label: "Objetivo", type: "select", options: ["lancar primeira musica", "lancar single profissional", "melhorar identidade visual", "encontrar beat/produtor", "fazer mixagem/masterizacao", "divulgar lancamento", "montar estrategia completa", "crescer nas plataformas"] },
      { name: "descricaoIdeiaMusical", label: "Ideia, letra, demo ou objetivo", type: "textarea", placeholder: "Ex: Tenho uma musica de trap pronta e preciso lancar profissionalmente..." },
    ],
  },
  {
    title: "Estrutura do projeto",
    helper: "Marque o que ja existe para a NEXO montar a ordem certa.",
    fields: [
      { name: "tipoProjeto", label: "Tipo de projeto", type: "select", options: ["single", "EP", "album", "beat avulso", "videoclipe", "campanha de marketing", "ainda nao sei"] },
      { name: "prazoLancamento", label: "Prazo de lancamento", type: "select", options: ["urgente", "7 dias", "15 dias", "30 dias", "60 dias", "sem prazo definido"] },
      { name: "flags", label: "O que voce ja tem?", type: "booleans", options: [
        ["jaTemMusicaGravada", "Musica gravada"],
        ["jaTemBeat", "Beat"],
        ["jaTemCapa", "Capa"],
        ["jaTemMixMaster", "Mix/master"],
      ] },
    ],
  },
  {
    title: "Orcamento e dificuldade",
    helper: "A recomendacao respeita sua fase e evita sugerir uma estrutura fora da realidade.",
    fields: [
      { name: "orcamento", label: "Orcamento", type: "select", options: ["ate 100 reais", "100 a 300 reais", "300 a 700 reais", "700 a 1500 reais", "acima de 1500 reais", "ainda nao sei"] },
      { name: "principalDificuldade", label: "Principal dificuldade", type: "select", options: ["nao sei por onde comecar", "falta profissional", "falta identidade visual", "falta qualidade sonora", "falta divulgacao", "falta planejamento", "falta dinheiro", "falta direcao"] },
    ],
  },
  {
    title: "Identidade e publico",
    helper: "Referencias ajudam a IA a aproximar seu projeto do profissional certo.",
    fields: [
      { name: "referenciasArtisticas", label: "Referencias artisticas", type: "text", placeholder: "Ex: Ryu, Veigh, Travis Scott, Teto..." },
      { name: "publicoAlvo", label: "Publico alvo", type: "text", placeholder: "Ex: publico trap BR, jovens, playlists urbanas..." },
      { name: "vibeDaMusica", label: "Vibe da musica", type: "select", options: ["triste/melancolica", "trap/rua", "romantica", "dancante", "gospel/espiritual", "pop/comercial", "underground", "luxo/premium", "agressiva", "motivacional"] },
    ],
  },
  {
    title: "Confirme o diagnostico",
    helper: "Revise os dados antes de gerar seu plano musical inteligente.",
    fields: [{ name: "summary", type: "summary" }],
  },
];

const nexoSubgenreSuggestions = {
  Trap: ["Trap melodico", "Plug", "Rage", "Detroit", "Type Beat"],
  Rap: ["Boom bap", "Rap consciente", "Drill", "Trap rap", "Freestyle"],
  Funk: ["Funk RJ", "Funk 150", "Mandelao", "Funk melody", "Bruxaria"],
  Pop: ["Pop urbano", "Dance pop", "Synth pop", "Pop alternativo", "Referencia internacional"],
  Sertanejo: ["Sertanejo universitario", "Arrocha", "Modao", "Romantico", "Ao vivo"],
  "R&B": ["R&B alternativo", "Neo soul", "Trap soul", "Slow jam", "Vocal suave"],
  Gospel: ["Gospel trap", "Worship", "Pop gospel", "Louvor", "Inspiracional"],
  Rock: ["Indie rock", "Alt rock", "Pop rock", "Hard rock", "Acustico"],
  Eletronico: ["House", "Tech house", "Dance", "EDM", "Brazilian bass"],
  Pagode: ["Pagode romantico", "Samba rock", "Ao vivo", "Pagode 90", "Roda de samba"],
  Samba: ["Samba raiz", "Samba urbano", "Partido alto", "Samba rock", "MPB samba"],
  Reggaeton: ["Dembow", "Urbano latino", "Perreo", "Pop latino", "Afro latino"],
  Afrobeat: ["Afropop", "Amapiano", "Afro house", "Dancehall", "Afro urbano"],
  Indie: ["Indie pop", "Bedroom pop", "Lo-fi", "Alternativo", "Dream pop"],
  MPB: ["Nova MPB", "Acustico", "Tropicalia", "MPB pop", "Autoral"],
  Outro: ["Referencia nacional", "Referencia internacional", "Experimental", "Autoral", "Hibrido"],
};

function nexoSelectField(field, quiz) {
  const current = field.options.includes(quiz[field.name]) ? quiz[field.name] : field.options[0];
  return `<div class="nexo-quiz-field nexo-custom-select-field" data-select-name="${field.name}">
    <span>${htmlEscape(field.label)}</span>
    <input type="hidden" name="${field.name}" id="nexo-${field.name}" value="${htmlEscape(current)}">
    <button class="nexo-dark-select" type="button" data-action="nexo-select-toggle" data-select-name="${field.name}" aria-haspopup="listbox" aria-expanded="false">
      <span>${htmlEscape(current)}</span>
      <i data-lucide="chevron-down"></i>
    </button>
    <div class="nexo-dark-select-menu" role="listbox" aria-label="${htmlEscape(field.label)}">
      ${field.options.map((option) => `<button type="button" role="option" data-action="nexo-select-option" data-select-name="${field.name}" data-value="${htmlEscape(option)}" aria-selected="${current === option ? "true" : "false"}">${htmlEscape(option)}</button>`).join("")}
    </div>
  </div>`;
}

function nexoSubgenreField(field, quiz) {
  const genre = quiz.generoMusical || "Trap";
  const suggestions = nexoSubgenreSuggestions[genre] || nexoSubgenreSuggestions.Outro;
  return `<label class="nexo-quiz-field nexo-subgenre-field">
    <span>${htmlEscape(field.label)}</span>
    <input name="${field.name}" id="nexo-${field.name}" type="text" value="${htmlEscape(quiz[field.name] || "")}" placeholder="${htmlEscape(field.placeholder || "")}">
    <div class="nexo-subgenre-chips" aria-label="Sugestoes de subgenero">
      ${suggestions.map((item) => `<button type="button" data-action="nexo-subgenre-chip" data-value="${htmlEscape(item)}">${htmlEscape(item)}</button>`).join("")}
    </div>
  </label>`;
}

function closeNexoSelects(except = null) {
  document.querySelectorAll(".nexo-custom-select-field.is-open").forEach((field) => {
    if (field === except) return;
    field.classList.remove("is-open");
    field.classList.remove("is-up");
    field.querySelector(".nexo-dark-select")?.setAttribute("aria-expanded", "false");
  });
}

function updateNexoSelectDirection(field) {
  const trigger = field?.querySelector(".nexo-dark-select");
  const menu = field?.querySelector(".nexo-dark-select-menu");
  if (!trigger || !menu) return;
  const rect = trigger.getBoundingClientRect();
  const desiredHeight = Math.min(300, Math.max(180, menu.scrollHeight || 260));
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  field.classList.toggle("is-up", spaceBelow < desiredHeight + 56 && spaceAbove > spaceBelow);
}

function updateNexoSubgenreChips(form) {
  const genre = form?.elements?.generoMusical?.value || "Trap";
  const chips = form?.querySelector(".nexo-subgenre-chips");
  if (!chips) return;
  const suggestions = nexoSubgenreSuggestions[genre] || nexoSubgenreSuggestions.Outro;
  chips.innerHTML = suggestions.map((item) => `<button type="button" data-action="nexo-subgenre-chip" data-value="${htmlEscape(item)}">${htmlEscape(item)}</button>`).join("");
}

function chooseNexoSelectOption(button) {
  const field = button.closest(".nexo-custom-select-field");
  const form = button.closest(".nexo-ia-quiz-form");
  const input = field?.querySelector("input[type='hidden']");
  const label = field?.querySelector(".nexo-dark-select span");
  if (!field || !input || !label) return;
  const value = button.dataset.value || "";
  input.value = value;
  label.textContent = value;
  field.querySelectorAll("[role='option']").forEach((option) => option.setAttribute("aria-selected", option === button ? "true" : "false"));
  closeNexoSelects();
  if (input.name === "generoMusical") updateNexoSubgenreChips(form);
}

function nexoQuizField(field, quiz) {
  if (field.type === "summary") {
    const items = [
      ["Genero", quiz.generoMusical],
      ["Objetivo", quiz.objetivoPrincipal],
      ["Projeto", quiz.tipoProjeto],
      ["Prazo", quiz.prazoLancamento],
      ["Orcamento", quiz.orcamento],
      ["Vibe", quiz.vibeDaMusica],
    ];
    return `<div class="nexo-quiz-summary">${items.map(([label, value]) => `
      <article><span>${label}</span><strong>${htmlEscape(value || "Nao informado")}</strong></article>
    `).join("")}</div>`;
  }
  if (field.type === "booleans") {
    return `<div class="nexo-boolean-list">${field.options.map(([name, label]) => `
      <label><input type="checkbox" name="${name}" ${quiz[name] ? "checked" : ""}>${htmlEscape(label)}</label>
    `).join("")}</div>`;
  }
  const common = `name="${field.name}" id="nexo-${field.name}"`;
  if (field.type === "select") {
    return nexoSelectField(field, quiz);
  }
  if (field.name === "subgenero") {
    return nexoSubgenreField(field, quiz);
  }
  if (field.type === "textarea") {
    return `<label class="nexo-quiz-field is-wide"><span>${htmlEscape(field.label)}</span><textarea ${common} placeholder="${htmlEscape(field.placeholder || "")}">${htmlEscape(quiz[field.name])}</textarea></label>`;
  }
  return `<label class="nexo-quiz-field"><span>${htmlEscape(field.label)}</span><input ${common} type="${field.type}" value="${htmlEscape(quiz[field.name])}" placeholder="${htmlEscape(field.placeholder || "")}"></label>`;
}

function collectNexoQuizStep(form, quiz, stepIndex = Number(form?.dataset?.step || 0)) {
  const data = new FormData(form);
  const next = { ...quiz };
  const step = nexoQuizSteps[Math.max(0, Math.min(stepIndex, nexoQuizSteps.length - 1))];
  for (const field of step.fields) {
    if (field.name === "summary") continue;
    if (field.type === "booleans") {
      field.options.forEach(([name]) => next[name] = Boolean(form.elements[name]?.checked));
    } else if (field.name) {
      const value = data.get(field.name);
      if (value !== null) next[field.name] = String(value).trim();
    }
  }
  return next;
}

function renderNexoQuiz(quiz = readNexoQuiz()) {
  const stepIndex = Math.max(0, Math.min(Number(appState.nexoQuizStep || 0), nexoQuizSteps.length - 1));
  const step = nexoQuizSteps[stepIndex];
  const progress = `${Math.round(((stepIndex + 1) / nexoQuizSteps.length) * 100)}%`;
  return `<div class="nexo-minimal-container nexo-quiz-shell">
    <section class="nexo-ia-panel">
      <header class="nexo-quiz-hero">
        <span class="nexo-quiz-eyebrow">NEXO IA</span>
        <h1><strong>O que podemos lancar hoje?</strong></h1>
        <p>Preencha o diagnostico para a ANSEND mapear seu momento, orientar sua rota e conectar voce aos profissionais certos.</p>
      </header>
      <form class="nexo-ia-quiz-form nexo-quiz-card" data-step="${stepIndex}">
        <div class="nexo-quiz-progress" style="--progress:${progress}"><span></span></div>
        <div class="nexo-quiz-content">
          <div class="nexo-quiz-step-meta"><span>Etapa ${stepIndex + 1} de ${nexoQuizSteps.length}</span><span>${progress}</span></div>
          <h2>${htmlEscape(step.title)}</h2>
          <p class="nexo-result-muted">${htmlEscape(step.helper)}</p>
          <div class="nexo-quiz-grid">${step.fields.map((field) => nexoQuizField(field, quiz)).join("")}</div>
          ${appState.nexoQuizError ? `<p class="nexo-quiz-error">${htmlEscape(appState.nexoQuizError)}</p>` : ""}
        </div>
        <div class="nexo-quiz-actions">
          <button type="button" data-action="nexo-quiz-back" ${stepIndex === 0 ? "disabled" : ""}><i data-lucide="arrow-left"></i>Voltar</button>
          <button class="is-primary" type="submit">${stepIndex === nexoQuizSteps.length - 1 ? "Gerar diagnostico com NEXO IA" : "Continuar"}<i data-lucide="arrow-right"></i></button>
        </div>
      </form>
    </section>
  </div>`;
}

function renderNexoDiagnosisResult(result) {
  const priorityList = (result.prioridades || []).map((item) => `<li><strong>${htmlEscape(item.titulo)}</strong><span>${htmlEscape(item.descricao)} ${item.urgencia ? `- ${htmlEscape(item.urgencia)}` : ""}</span></li>`).join("");
  const pros = (result.profissionaisRecomendados || []).slice(0, 4).map((item) => `<li><strong>${htmlEscape(item.tipo)}</strong><span>${htmlEscape(item.motivo)} ${item.quandoContratar ? `- ${htmlEscape(item.quandoContratar)}` : ""}</span></li>`).join("");
  const roadmap = (result.mapaDeLancamento || []).map((item, index) => `<li><b>${index + 1}</b><span><strong>${htmlEscape(item.fase)}</strong>${htmlEscape(item.acao)} ${item.prazoSugerido ? `- ${htmlEscape(item.prazoSugerido)}` : ""}</span></li>`).join("");
  const next = (result.proximosPassos || []).map((item) => `<li>${htmlEscape(item)}</li>`).join("");
  return `<div class="nexo-minimal-container nexo-result-shell">
    <header class="nexo-result-hero">
      <span class="nexo-quiz-eyebrow">Diagnostico salvo</span>
      <h1>${htmlEscape(result.diagnosticoGeral || "Plano musical NEXO")}</h1>
      <p>${htmlEscape(result.resumoDoMomento || result.mensagemFinal || "A NEXO gerou uma rota para seu lancamento.")}</p>
      <div class="nexo-result-actions">
        <button type="button" class="is-primary" data-action="nexo-quiz-new"><i data-lucide="sparkles"></i>Gerar novo diagnostico</button>
        <button type="button" data-action="nexo-quiz-edit"><i data-lucide="edit-3"></i>Editar quiz</button>
        <button type="button" data-action="ai-next-route" data-route="produtores"><i data-lucide="users"></i>Ver profissionais</button>
      </div>
    </header>
    <section class="nexo-result-grid">
      <article class="nexo-result-card"><span>Nivel atual</span><strong>${htmlEscape(result.nivelAtual || "Em definicao")}</strong></article>
      <article class="nexo-result-card"><span>Objetivo provavel</span><strong>${htmlEscape(result.objetivoMaisProvavel || "Lancamento profissional")}</strong></article>
      <article class="nexo-result-list"><h2>Prioridades</h2><ul>${priorityList || "<li>Complete o quiz para receber prioridades.</li>"}</ul></article>
      <article class="nexo-result-list"><h2>Profissionais recomendados</h2><ul>${pros || "<li>Nenhum profissional especifico recomendado ainda.</li>"}</ul></article>
      <article class="nexo-result-timeline"><h2>Mapa do lancamento</h2><ol>${roadmap || "<li><b>1</b><span>Organize seu briefing e gere novamente.</span></li>"}</ol></article>
      <article class="nexo-result-list"><h2>Proximos passos</h2><ul>${next || "<li>Salve seu briefing e procure profissionais na ANSEND.</li>"}</ul></article>
    </section>
  </div>`;
}

function slugify(value) {
  return String(value || "playlist")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "playlist";
}

const exploreGenreBanners = [
  { label: "Funk", slug: "funk", image: "banners/funk.png" },
  { label: "Trap", slug: "trap", image: "banners/trap.png" },
  { label: "Drill", slug: "drill", image: "banners/drill.png" },
  { label: "R&B", slug: "rnb", image: "banners/rnb.png" },
  { label: "Pop", slug: "pop", image: "banners/pop.png" },
  { label: "Rap", slug: "rap", image: "banners/rap.png" },
];

function normalizeGenre(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "n")
    .replace(/[^a-z0-9]+/g, "");
  return normalized === "rnb" || normalized === "renb" ? "rnb" : normalized;
}

function genreSlug(value) {
  const normalized = normalizeGenre(value);
  return normalized === "rnb" ? "rnb" : slugify(value);
}

function exploreQueryParams() {
  const rawHash = location.hash.replace(/^#/, "");
  const queryIndex = rawHash.indexOf("?");
  return new URLSearchParams(queryIndex >= 0 ? rawHash.slice(queryIndex + 1) : "");
}

function resolveExploreGenre(availableGenres) {
  const requested = exploreQueryParams().get("genero");
  if (!requested) return appState.genre || "Todos";
  const normalizedRequest = normalizeGenre(requested);
  const bannerMatch = exploreGenreBanners.find((item) => normalizeGenre(item.slug) === normalizedRequest || normalizeGenre(item.label) === normalizedRequest);
  const label = bannerMatch?.label || requested;
  return availableGenres.find((genre) => normalizeGenre(genre) === normalizeGenre(label)) || label;
}

function renderExploreGenreBanners() {
  const cards = exploreGenreBanners.map((banner) => {
    const active = normalizeGenre(appState.genre) === normalizeGenre(banner.label);
    return `<button type="button" class="genre-banner-card ${active ? "is-active" : ""}" data-action="filter" data-genre="${banner.label}" data-genre-slug="${banner.slug}" aria-label="Filtrar por ${banner.label}">
      <img src="${banner.image}" alt="Banner ${banner.label}" loading="lazy" onerror="this.closest('.genre-banner-card')?.classList.add('is-missing');this.remove();">
      <span class="genre-banner-fallback">${banner.label}</span>
    </button>`;
  }).join("");
  return `<section class="genre-banner-section" aria-label="Gêneros em destaque">
    <div class="section-head clean-head genre-banner-head">
      <div>
        <h2><i data-lucide="sparkles"></i>Explore por gênero</h2>
        <p>Escolha um banner para filtrar o marketplace.</p>
      </div>
    </div>
    <div class="genre-carousel-wrapper">
      <button type="button" class="carousel-arrow prev" data-action="genre-banner-scroll" data-direction="prev" aria-label="Banner anterior">
        <i data-lucide="chevron-left"></i>
      </button>
      <div class="genre-banner-track" id="genreBannerTrack">${cards}</div>
      <button type="button" class="carousel-arrow next" data-action="genre-banner-scroll" data-direction="next" aria-label="Próximo banner">
        <i data-lucide="chevron-right"></i>
      </button>
    </div>
  </section>`;
}

function playlistCard(input) {
  const data = Array.isArray(input) ? { title: input[0], subtitle: input[1], cover: input[2] } : input;
  const { title, cover } = data;
  const subtitle = data.match ? `${data.match.label} - ${data.match.score}%` : data.subtitle;
  const playlistId = slugify(title);
  return `<article class="playlist-card minimal-playlist-card" data-playlist="${title}" data-playlist-id="${playlistId}">
    <button class="playlist-action" type="button" data-action="playlist" data-title="${title}" data-playlist-id="${playlistId}" aria-label="Abrir ${title}">
      <div class="card-cover-wrapper">
        ${optimizedImageMarkup({ src: cover, alt: `Capa ${title}`, className: "card-art-source", width: 320, height: 320, priority: Boolean(data.homeCard) })}
        <span class="card-orb"><i data-lucide="list-music"></i></span>
      </div>
      <div class="card-info">
        <h3 class="card-title">${title}</h3>
        <p class="card-subtitle">${subtitle}</p>
        ${data.match ? `<span class="match-pill">${data.match.reasons[0]}</span>` : ""}
      </div>
    </button>
  </article>`;
}

function beatCard(item) {
  const klass = item.badge === "Novo" ? "new" : item.badge === "Exclusivo" ? "exclusive" : "";
  const favoriteClass = appState.favorites.has(item.id) ? " is-favorite" : "";
  const homeCardClass = item.homeCard ? " home-catalog-beat-card" : "";
  const price = item.price || (item.id === "top-beat-psiiiko" ? "$49.99" : ["$29.99", "$35.00", "$44.95", "$49.99", "$9.99", "$24.99"][(item.title.length + (item.producer || "").length) % 6]);
  const producerAttrs = profileTargetAttrs({
    id: item.user_id || item.raw?.user_id || "",
    username: item.owner_username || item.profile_username || item.raw?.profile_username || item.raw?.username || item.raw?.owner_username || "",
    title: item.producer,
  });
  return `<article class="beat-card minimal-beat-card${homeCardClass}" data-beat-id="${item.id}" tabindex="0" role="link" aria-label="Ver detalhes de ${item.title}">
    ${adminDeleteButton("beat", item)}
    <div class="card-cover-wrapper">
      ${optimizedImageMarkup({ src: item.cover, alt: `Capa do beat ${item.title}`, className: "card-art-source", width: 320, height: 320, priority: Boolean(item.homeCard) })}
      ${item.badge ? `<span class="badge ${klass}">${item.badge}</span>` : ""}
      <button class="fav-over${favoriteClass}" type="button" data-action="favorite" data-id="${item.id}" aria-label="Favoritar ${item.title}"><i data-lucide="heart"></i></button>
      <button class="play-over" type="button" data-action="play" data-id="${item.id}" aria-label="Tocar ${item.title}" data-player-icon="play"><span class="player-state-icon" aria-hidden="true">${playerControlIconMarkup("play")}</span></button>
    </div>
    <div class="card-info">
      <h3 class="card-title">${item.title}</h3>
      <button class="card-producer" type="button" data-action="producer" ${producerAttrs} aria-label="Abrir perfil de ${htmlEscape(item.producer)}">
        <span>${item.producer}</span>
        <i data-lucide="badge-check" class="verified-badge"></i>
      </button>
      ${item.match ? `<span class="match-pill beat-match-pill">${item.match.score}% match - ${item.match.reasons[0]}</span>` : ""}
      <div class="card-actions-row">
        <button class="beat-card-buy-btn" type="button" data-action="buy" data-id="${item.id}" aria-label="Comprar licença">
          <i data-lucide="shopping-bag"></i>
          <span>${price}</span>
        </button>
        <button class="beat-card-download-btn" type="button" data-action="download" data-id="${item.id}" aria-label="Baixar demo">
          <i data-lucide="download"></i>
        </button>
      </div>
    </div>
  </article>`;
}

function avatarCard(name, i) {
  return `<article class="avatar-card"><button type="button" data-action="producer" data-title="${name}" aria-label="Abrir perfil de ${name}">${optimizedImageMarkup({ src: img(avatarImages[i % avatarImages.length]), alt: `Avatar de ${name}`, width: 120, height: 120 })}<h3>${name}<i data-lucide="badge-check"></i></h3><p>${420 + i * 137} vendas</p></button></article>`;
}

const quickActions = [
  ["brain-circuit", "Criar plano com IA", "Receba a ordem certa para lançar.", "ia"],
  ["audio-lines", "Encontrar beatmaker", "Ache beats e produtores com match.", "produtores"],
  ["image", "Criar capa", "Encontre designers para single e EP.", "produtores"],
  ["sliders-horizontal", "Finalizar música", "Mix, master e produção vocal.", "produtores"],
  ["megaphone", "Divulgar lançamento", "Curadoria, conteúdo e marketing.", "produtores"],
];

const beatmakerQuickActions = [
  ["upload-cloud", "Subir beat", "Publique um beat com tags e licencas.", "perfil"],
  ["package-plus", "Criar pack", "Agrupe beats por vibe, BPM e preco.", "perfil"],
  ["badge-dollar-sign", "Ajustar precos", "Revise licencas e valores sugeridos.", "ia"],
  ["users-round", "Ver artistas com match", "Encontre compradores com fit sonoro.", "produtores"],
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

const categoryBackgrounds = {
  Beatmakers: "assets/category-beatmakers.png",
  Designers: "assets/category-designers.png",
  "Produtores Musicais": "assets/category-producers.png",
  Curadores: "assets/category-curators.png",
  "Marketing Musical": "assets/category-marketing.png",
};

const smartCombos = [
  ["Combo Produção", "Beat + Mixagem + Masterização", "Economia sugerida: 15%"],
  ["Combo Lançamento", "Capa + Curadoria", "Economia sugerida: 12%"],
  ["Combo Completo", "Produção + Capa + Divulgação", "Economia sugerida: 20%"],
];

const MUSIC_PROFILE_KEY = "ansend_user_music_profile";
const MUSIC_ONBOARDING_KEY = "ansend_onboarding_completed";
const MUSIC_RECS_KEY = "ansend_last_recommendations";
const RECOMMENDATION_CACHE_KEY = "ansend_recommendation_cache_v1";
const RECOMMENDATION_CACHE_TTL_MS = 4 * 60 * 1000;
const RECOMMENDATION_EVENTS_BUFFER_KEY = "ansend_recommendation_events_buffer";
const RECOMMENDATION_EMBEDDING_SYNC_KEY = "ansend_embedding_sync_v1";
const FIRST_ACCOUNT_QUIZ_PREFIX = "ansend_first_account_quiz_completed:";
const PENDING_ACCOUNT_QUIZ_KEY = "ansend_pending_account_quiz";

const musicQuiz = {
  genres: ["Trap", "Funk", "Forro", "Sertanejo", "Gospel", "Rap", "Drill", "R&B", "Pop", "Afrobeat", "Piseiro", "Boom Bap", "Lo-fi", "Outro"],
  objectives: ["Encontrar um beat", "Criar uma capa", "Produzir uma musica", "Mixar/masterizar", "Divulgar lancamento", "Entrar em playlists", "Montar lancamento completo", "Receber orientacao da IA"],
  stages: ["So tenho uma ideia", "Tenho uma letra", "Tenho uma demo", "Tenho a musica gravada", "Tenho a musica pronta", "Ja lancei e quero divulgar"],
  vibes: ["Romantica", "Pesada", "Dancante", "Melodica", "Triste", "Comercial", "Underground", "Espiritual", "Festiva", "Cinematografica"],
  budgets: ["Baixo", "Medio", "Alto", "Quero so explorar agora"],
  userTypes: ["Artista", "Beatmaker", "Designer", "Produtor musical", "Curador", "Marketing musical"],
};

const nexoPlaylistCatalog = [
  { title: "Trap na Area", subtitle: "52 beats escolhidos", cover: "assets/catalog-cover-01.webp", genres: ["Trap", "Rap"], vibes: ["Pesada", "Underground"], services: ["beat"] },
  { title: "808 para verso", subtitle: "38 beats escolhidos", cover: "assets/catalog-cover-08.webp", genres: ["Trap", "Boom Bap"], vibes: ["Melodica", "Comercial"], services: ["beat"] },
  { title: "Drill Brutal", subtitle: "41 beats escolhidos", cover: "assets/catalog-cover-03.webp", genres: ["Drill", "Rap"], vibes: ["Pesada", "Underground"], services: ["beat"] },
  { title: "Funk de Estudio", subtitle: "50 beats escolhidos", cover: "assets/catalog-cover-02.webp", genres: ["Funk", "Piseiro"], vibes: ["Dancante", "Festiva"], services: ["beat"] },
  { title: "Gospel Trap", subtitle: "27 beats escolhidos", cover: "assets/catalog-cover-06.webp", genres: ["Gospel", "Trap"], vibes: ["Espiritual", "Melodica"], services: ["beat"] },
  { title: "R&B Noturno", subtitle: "34 referencias", cover: "assets/catalog-vocal.jpg", genres: ["R&B", "Pop"], vibes: ["Romantica", "Melodica"], services: ["beat", "vocal"] },
  { title: "Afrobeat Solar", subtitle: "30 beats escolhidos", cover: "assets/catalog-cover-09.webp", genres: ["Afrobeat", "Pop"], vibes: ["Dancante", "Comercial"], services: ["beat"] },
  { title: "Lo-fi para letra", subtitle: "22 referencias", cover: "assets/catalog-chorus.jpg", genres: ["Lo-fi", "Boom Bap"], vibes: ["Triste", "Cinematografica"], services: ["beat"] },
];

const nexoServiceCatalog = [
  { icon: "audio-lines", title: "Beatmaker ideal", type: "Beatmaker", reason: "Base sonora alinhada ao seu estilo", route: "produtores", genres: ["Trap", "Drill", "Funk", "Rap", "R&B"], objectives: ["Encontrar um beat", "Montar lancamento completo"], stages: ["Tenho uma letra", "So tenho uma ideia"] },
  { icon: "palette", title: "Designer para capa", type: "Designer", reason: "Identidade visual pronta para single", route: "produtores", genres: ["Trap", "Pop", "Gospel", "Funk"], objectives: ["Criar uma capa", "Montar lancamento completo"], stages: ["Tenho a musica pronta", "Tenho uma demo"] },
  { icon: "sliders-horizontal", title: "Produtor musical", type: "Produtor musical", reason: "Direcao, mix e master para finalizar", route: "produtores", genres: ["Trap", "Rap", "R&B", "Drill"], objectives: ["Produzir uma musica", "Mixar/masterizar", "Montar lancamento completo"], stages: ["Tenho uma demo", "Tenho a musica gravada"] },
  { icon: "list-music", title: "Curador de playlists", type: "Curador", reason: "Entrada em playlists com fit de publico", route: "produtores", genres: ["Funk", "Trap", "Pop", "Afrobeat"], objectives: ["Entrar em playlists", "Divulgar lancamento"], stages: ["Tenho a musica pronta", "Ja lancei e quero divulgar"] },
  { icon: "megaphone", title: "Marketing musical", type: "Marketing musical", reason: "Plano de conteudo e divulgacao do lancamento", route: "produtores", genres: ["Trap", "Funk", "Pop", "Sertanejo", "Gospel"], objectives: ["Divulgar lancamento", "Montar lancamento completo"], stages: ["Tenho a musica pronta", "Ja lancei e quero divulgar"] },
  { icon: "brain-circuit", title: "Diagnostico NEXO", type: "IA", reason: "Ordem certa para executar sem perder dinheiro", route: "ia", genres: musicQuiz.genres, objectives: ["Receber orientacao da IA", "Montar lancamento completo"], stages: musicQuiz.stages },
];

const nexoComboCatalog = [
  { title: "Combo Beat + Capa", services: "Beatmaker + Designer", economy: "Ideal para transformar letra em single", genres: ["Trap", "Rap", "Funk", "Drill"], objectives: ["Encontrar um beat", "Criar uma capa"], vibes: ["Pesada", "Comercial"] },
  { title: "Combo Demo pronta", services: "Produtor + Mix/master", economy: "Ideal para finalizar gravacao", genres: ["R&B", "Pop", "Gospel", "Trap"], objectives: ["Produzir uma musica", "Mixar/masterizar"], vibes: ["Melodica", "Romantica"] },
  { title: "Combo Lancamento completo", services: "Beat + Capa + Curadoria + Marketing", economy: "O caminho mais seguro para lancar", genres: musicQuiz.genres, objectives: ["Montar lancamento completo", "Receber orientacao da IA"], vibes: musicQuiz.vibes, featured: true },
  { title: "Combo Divulgacao", services: "Curadoria + Marketing musical", economy: "Para musica pronta ou ja lancada", genres: ["Funk", "Trap", "Pop", "Afrobeat"], objectives: ["Divulgar lancamento", "Entrar em playlists"], vibes: ["Dancante", "Comercial", "Festiva"] },
];

function normalizeToken(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
}

function createDefaultMusicProfile(seed = {}) {
  const profile = appState.profile || appState.onboardingProfile || {};
  const fallbackGenres = asArray(seed.genres || profile.music_styles || profile.genres).slice(0, 4);
  return {
    genres: fallbackGenres.length ? fallbackGenres : ["Trap", "Drill"],
    objective: seed.objective || profile.onboarding_goal || "Receber orientacao da IA",
    stage: seed.stage || "So tenho uma ideia",
    vibes: asArray(seed.vibes).length ? asArray(seed.vibes) : ["Pesada", "Melodica"],
    references: seed.references || "",
    budget: seed.budget || "Quero so explorar agora",
    userType: seed.userType || accountRoleLabel?.(profile.account_role || "artista") || "Artista",
    completed: Boolean(seed.completed),
  };
}

function getMusicProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem(MUSIC_PROFILE_KEY) || "null");
    return profile && typeof profile === "object" ? profile : null;
  } catch (_error) {
    return null;
  }
}

function saveMusicProfile(profile) {
  const previous = getMusicProfile();
  const normalized = {
    ...createDefaultMusicProfile(previous || {}),
    ...profile,
    genres: asArray(profile.genres).slice(0, 6),
    vibes: asArray(profile.vibes).slice(0, 6),
    completed: true,
    createdAt: previous?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  appState.musicProfile = normalized;
  localStorage.setItem(MUSIC_PROFILE_KEY, JSON.stringify(normalized));
  localStorage.setItem(MUSIC_ONBOARDING_KEY, "true");
  localStorage.setItem(MUSIC_RECS_KEY, JSON.stringify(buildNexoRecommendations(normalized, false)));
  scheduleRecommendationProfileUpdate({ genres: normalized.genres, intentTags: [normalized.objective, normalized.stage, ...asArray(normalized.vibes)].filter(Boolean) });
  return normalized;
}

function updateMusicProfile(partial) {
  return saveMusicProfile({ ...createDefaultMusicProfile(), ...(getMusicProfile() || {}), ...partial });
}

function hasMusicProfile() {
  return Boolean(getMusicProfile()?.completed || localStorage.getItem(MUSIC_ONBOARDING_KEY) === "true");
}

function accountQuizIdentity(profile = appState.profile, user = appState.authUser) {
  return String(user?.id || profile?.id || profile?.email || profile?.full_name || "").trim();
}

function accountQuizStorageKey(identity = accountQuizIdentity()) {
  return `${FIRST_ACCOUNT_QUIZ_PREFIX}${identity || "preview"}`;
}

function hasCompletedFirstAccountQuiz(identity = accountQuizIdentity()) {
  return Boolean(identity && localStorage.getItem(accountQuizStorageKey(identity)) === "true");
}

function markFirstAccountQuizCompleted(identity = localStorage.getItem(PENDING_ACCOUNT_QUIZ_KEY) || accountQuizIdentity()) {
  if (!identity) return;
  localStorage.setItem(accountQuizStorageKey(identity), "true");
  localStorage.removeItem(PENDING_ACCOUNT_QUIZ_KEY);
}

function firstAccountQuizSeed(profile = appState.profile) {
  return createDefaultMusicProfile({
    genres: asArray(profile?.music_styles || profile?.genres).slice(0, 4),
    objective: profile?.onboarding_goal || "Receber orientacao da IA",
    userType: accountRoleLabel(profile?.account_role || profile?.userType || "artista"),
  });
}

function launchFirstAccountQuiz(profile = appState.profile, user = appState.authUser) {
  const identity = accountQuizIdentity(profile, user);
  if (!identity || hasCompletedFirstAccountQuiz(identity)) return false;
  localStorage.setItem(PENDING_ACCOUNT_QUIZ_KEY, identity);
  showMusicPreferenceQuiz(true, firstAccountQuizSeed(profile));
  return true;
}

function calculateNexoMatch(userMusicProfile, item) {
  const profile = userMusicProfile || createDefaultMusicProfile();
  const genres = asArray(profile.genres).map(normalizeToken);
  const vibes = asArray(profile.vibes).map(normalizeToken);
  const objective = normalizeToken(profile.objective);
  const stage = normalizeToken(profile.stage);
  const budget = normalizeToken(profile.budget);
  const refs = normalizeToken(profile.references);
  const itemGenres = asArray(item.genres || item.tags?.[0]).map(normalizeToken);
  const itemVibes = asArray(item.vibes).map(normalizeToken);
  const itemObjectives = asArray(item.objectives || item.services || item.type).map(normalizeToken);
  const haystack = normalizeToken([item.title, item.type, item.reason, item.services, item.producer, item.name, item.category, ...(item.tags || [])].join(" "));
  const reasons = [];
  let score = 18;

  if (itemGenres.some((genre) => genres.includes(genre))) {
    score += 30;
    reasons.push("combina com seu estilo");
  }
  if (itemVibes.some((vibe) => vibes.includes(vibe))) {
    score += 18;
    reasons.push("bate com a vibe escolhida");
  }
  if (itemObjectives.some((entry) => objective.includes(entry) || entry.includes(objective))) {
    score += 18;
    reasons.push("serve para seu objetivo atual");
  }
  if (refs && refs.split(/\s+/).some((word) => word.length > 3 && haystack.includes(word))) {
    score += 12;
    reasons.push("dialoga com suas referencias");
  }
  if ((stage.includes("pronta") || stage.includes("lancei")) && /marketing|curador|playlist/.test(haystack)) score += 14;
  if ((stage.includes("demo") || stage.includes("gravada")) && /produtor|mix|master/.test(haystack)) score += 14;
  if (budget.includes("baixo") && !haystack.includes("exclusiv")) score += 5;
  if (budget.includes("alto") && (haystack.includes("completo") || haystack.includes("premium"))) score += 8;
  if (item.verified || item.rating || item.sales) score += 6;

  const finalScore = Math.max(28, Math.min(99, Math.round(score)));
  return {
    score: finalScore,
    label: finalScore >= 82 ? "Match alto" : finalScore >= 62 ? "Bom match" : "Match inicial",
    reasons: reasons.length ? reasons.slice(0, 3) : ["boa porta de entrada para seu perfil"],
  };
}

function withMatch(profile, item) {
  return { ...item, match: calculateNexoMatch(profile, item) };
}

const genreVibeMap = {
  Trap: ["Pesada", "Melodica", "Underground"],
  Drill: ["Pesada", "Underground"],
  Funk: ["Dancante", "Festiva", "Comercial"],
  "R&B": ["Romantica", "Melodica", "Comercial"],
  "Boom Bap": ["Underground", "Triste", "Cinematografica"],
  "Type Beat": ["Comercial", "Melodica"],
};

const objectiveGenreMap = {
  "Encontrar um beat": ["beat", "licenca"],
  "Produzir uma musica": ["producao", "direcao sonora"],
  "Mixar/masterizar": ["mix", "master"],
  "Divulgar lancamento": ["marketing", "curadoria"],
  "Entrar em playlists": ["playlist", "curadoria"],
  "Montar lancamento completo": ["beat", "capa", "mix", "marketing"],
};

function beatMatchCandidate(item) {
  const genre = item.tags?.[0] || "Trap";
  return {
    ...item,
    title: item.title,
    type: "Beat",
    genres: [genre],
    vibes: genreVibeMap[genre] || ["Comercial"],
    objectives: ["Encontrar um beat", ...(objectiveGenreMap["Encontrar um beat"] || [])],
    references: [item.title, item.producer, ...(item.tags || [])],
    verified: true,
  };
}

function professionalMatchCandidate(item) {
  const roleObjective = {
    beatmakers: ["Encontrar um beat", "Montar lancamento completo"],
    produtores: ["Produzir uma musica", "Mixar/masterizar", "Montar lancamento completo"],
    designers: ["Criar uma capa", "Montar lancamento completo"],
    curadores: ["Entrar em playlists", "Divulgar lancamento"],
    marketing: ["Divulgar lancamento", "Montar lancamento completo"],
    artistas: ["Produzir uma musica", "Receber orientacao da IA"],
  };
  return {
    ...item,
    title: item.name,
    type: item.category,
    genres: item.tags,
    vibes: item.tags,
    objectives: [...(roleObjective[item.category] || []), item.specialty, item.category],
    verified: true,
  };
}

function getRecommendedBeats(profile = getMusicProfile(), limit = 8) {
  const baseProfile = profile || createDefaultMusicProfile();
  return marketplaceBeats()
    .map((item) => withMatch(baseProfile, beatMatchCandidate(item)))
    .sort((a, b) => b.match.score - a.match.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

function getRecommendedPlaylists(profile = getMusicProfile()) {
  const baseProfile = profile || createDefaultMusicProfile();
  return nexoPlaylistCatalog.map((item) => withMatch(baseProfile, item)).sort((a, b) => b.match.score - a.match.score).slice(0, 6);
}

function getRecommendedProfessionals(profile = getMusicProfile()) {
  if (appState.recommendations?.professionals?.length) {
    const recommended = appState.recommendations.professionals;
    const recommendedIds = new Set(recommended.map((item) => String(item.id)));
    const baseProfile = profile || createDefaultMusicProfile();
    const remaining = activeProfessionalProfiles()
      .filter((item) => !recommendedIds.has(String(item.id)))
      .map((item) => withMatch(baseProfile, professionalMatchCandidate(item)))
      .sort((a, b) => b.match.score - a.match.score);
    return [...recommended, ...remaining].slice(0, 6);
  }
  const baseProfile = profile || createDefaultMusicProfile();
  return activeProfessionalProfiles()
    .map((item) => withMatch(baseProfile, professionalMatchCandidate(item)))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 6);
}

function applyProfessionalRecommendations(rows = []) {
  const byId = new Map(activeProfessionalProfiles().map((profile) => [String(profile.id), profile]));
  return rows
    .map((row) => {
      const source = row.professional || {};
      const base = byId.get(String(row.target_id || source.id)) || profileToProfessional(source);
      if (!base) return null;
      const score = Math.max(1, Math.min(99, Math.round(Number(row.score || 0))));
      return {
        ...base,
        recommendationReason: row.reason || "Recomendado com base no seu comportamento na ANSEND.",
        match: {
          score,
          label: score >= 82 ? "Match alto" : score >= 62 ? "Bom match" : "Match inicial",
          reasons: [row.reason || "perfil com fit para seu momento musical"],
        },
      };
    })
    .filter(Boolean);
}

function applyFeedRecommendations(rows = []) {
  const byTarget = new Map();
  getNexoFeedItems().forEach((item) => {
    const target = recommendationTargetFromFeedItem(item);
    if (target.targetId) byTarget.set(`${target.targetType}:${target.targetId}`, item);
  });
  return rows
    .map((row) => {
      const item = byTarget.get(`${row.target_type}:${row.target_id}`);
      if (!item) return null;
      return {
        ...item,
        feedMatch: {
          score: Math.max(1, Math.min(100, Math.round(Number(row.score || 0)))),
          reasons: [row.reason || "recomendado pelo seu comportamento"],
        },
      };
    })
    .filter(Boolean);
}

async function loadPersonalizedRecommendations({ force = false } = {}) {
  if (!supabaseClient || !appState.authUser || appState.recommendationsLoading) return appState.recommendations;
  const cached = !force ? getRecommendationCache() : null;
  if (cached) {
    appState.recommendations = {
      professionals: cached.professionals || [],
      feed: cached.feed || [],
      updatedAt: cached.savedAt || Date.now(),
    };
    return appState.recommendations;
  }
  appState.recommendationsLoading = true;
  try {
    const [professionalsResult, feedResult] = await Promise.all([
      supabaseClient.rpc("get_recommended_professionals", { p_user_id: appState.authUser.id, p_limit: 12 }),
      supabaseClient.rpc("get_recommended_feed", { p_user_id: appState.authUser.id, p_limit: 40 }),
    ]);
    if (professionalsResult.error) throw professionalsResult.error;
    const recommendations = {
      professionals: applyProfessionalRecommendations(professionalsResult.data || []),
      feed: feedResult.error ? [] : applyFeedRecommendations(feedResult.data || []),
      updatedAt: Date.now(),
    };
    appState.recommendations = recommendations;
    setRecommendationCache(recommendations);
    return recommendations;
  } catch (error) {
    console.warn("[ANSEND recommendations] personalized load skipped", error?.message || error);
    return appState.recommendations;
  } finally {
    appState.recommendationsLoading = false;
  }
}

async function recordRecommendationImpression(targetType, targetId, score = 0, reason = "") {
  if (!supabaseClient || !appState.authUser || !isUuid(targetId)) return;
  const key = `${targetType}:${targetId}:${Math.round(Number(score || 0))}`;
  if (appState.recommendationImpressions.has(key)) return;
  appState.recommendationImpressions.add(key);
  try {
    await supabaseClient.from("recommendation_impressions").insert({
      user_id: appState.authUser.id,
      target_type: targetType,
      target_id: targetId,
      score: Number(score || 0),
      reason: String(reason || "").slice(0, 300),
    });
  } catch (error) {
    console.warn("[ANSEND recommendations] impression skipped", error?.message || error);
  }
}

function recordVisibleRecommendationImpressions(items = [], targetType = "professional") {
  items.slice(0, 12).forEach((item) => {
    recordRecommendationImpression(
      targetType,
      item.id || item.sourceId,
      item.match?.score || item.feedMatch?.score || 0,
      item.recommendationReason || item.feedMatch?.reasons?.[0] || ""
    );
  });
}

function getRecommendedServices(profile = getMusicProfile()) {
  const baseProfile = profile || createDefaultMusicProfile();
  return nexoServiceCatalog.map((item) => withMatch(baseProfile, item)).sort((a, b) => b.match.score - a.match.score).slice(0, 6);
}

function getRecommendedCombos(profile = getMusicProfile()) {
  const baseProfile = profile || createDefaultMusicProfile();
  return nexoComboCatalog.map((item) => withMatch(baseProfile, item)).sort((a, b) => b.match.score - a.match.score).slice(0, 3);
}

function getNextStepActions(profile = getMusicProfile()) {
  const baseProfile = profile || createDefaultMusicProfile();
  const objective = normalizeToken(baseProfile.objective);
  const stage = normalizeToken(baseProfile.stage);
  const actions = [["brain-circuit", "Gerar diagnostico NEXO", "Receba um plano em ordem de execucao.", "ia"]];
  if (objective.includes("beat") || stage.includes("letra") || stage.includes("ideia")) actions.push(["audio-lines", "Encontrar beat ideal", "Beats com match para sua voz e vibe.", "explorar"]);
  if (objective.includes("capa") || objective.includes("completo")) actions.push(["palette", "Criar capa", "Designers alinhados ao seu lancamento.", "produtores"]);
  if (objective.includes("mix") || stage.includes("demo") || stage.includes("gravada")) actions.push(["sliders-horizontal", "Finalizar som", "Producao, mix e masterizacao.", "produtores"]);
  if (objective.includes("divulgar") || objective.includes("playlist") || stage.includes("lancei")) actions.push(["megaphone", "Divulgar agora", "Curadoria e marketing musical.", "produtores"]);
  actions.push(["user-round", "Editar perfil musical", "Ajuste estilos, vibe e orcamento.", "perfil"]);
  return actions.slice(0, 4);
}

function buildNexoRecommendations(profile = getMusicProfile(), persist = true) {
  const baseProfile = profile || createDefaultMusicProfile();
  const result = {
    profile: baseProfile,
    beats: getRecommendedBeats(baseProfile),
    playlists: getRecommendedPlaylists(baseProfile),
    professionals: getRecommendedProfessionals(baseProfile),
    services: getRecommendedServices(baseProfile),
    combos: getRecommendedCombos(baseProfile),
    nextSteps: getNextStepActions(baseProfile),
    updatedAt: new Date().toISOString(),
  };
  if (persist) localStorage.setItem(MUSIC_RECS_KEY, JSON.stringify(result));
  return result;
}

const NEXO_FEED_EVENTS_KEY = "ansend_feed_events";
const NEXO_FEED_HISTORY_KEY = "ansend_feed_history";
const NEXO_FEED_NOT_INTERESTED_KEY = "ansend_not_interested";
const NEXO_FEED_TASTE_KEY = "ansend_user_taste_profile";
const NEXO_FEED_SESSION_KEY = "ansend_feed_session";
const NEXO_FEED_ITEMS_KEY = "ansend-feed-items";
let nexoFeedObserver = null;
const nexoFeedTimers = new Map();

function feedSessionId() {
  const existing = sessionStorage.getItem(NEXO_FEED_SESSION_KEY);
  if (existing) return existing;
  const created = `feed-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  sessionStorage.setItem(NEXO_FEED_SESSION_KEY, created);
  return created;
}

function readFeedList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function readFeedObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function isUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function recommendationUserKey() {
  return appState.authUser?.id || appState.profile?.id || "local-preview";
}

function readRecommendationCache() {
  const cache = safeReadJson(RECOMMENDATION_CACHE_KEY, {});
  return cache && typeof cache === "object" ? cache : {};
}

function getRecommendationCache(userKey = recommendationUserKey()) {
  const entry = readRecommendationCache()[userKey];
  if (!entry || Date.now() - Number(entry.savedAt || 0) > RECOMMENDATION_CACHE_TTL_MS) return null;
  return entry;
}

function setRecommendationCache(value, userKey = recommendationUserKey()) {
  const cache = readRecommendationCache();
  cache[userKey] = { ...value, savedAt: Date.now() };
  localStorage.setItem(RECOMMENDATION_CACHE_KEY, JSON.stringify(cache));
}

function readRecommendationEventBuffer() {
  return readFeedList(RECOMMENDATION_EVENTS_BUFFER_KEY);
}

function pushRecommendationEventBuffer(event) {
  const events = readRecommendationEventBuffer();
  events.push(event);
  localStorage.setItem(RECOMMENDATION_EVENTS_BUFFER_KEY, JSON.stringify(events.slice(-80)));
}

function recommendationAuthHeaders() {
  return supabaseClient?.auth?.getSession?.()
    .then(({ data }) => data?.session?.access_token ? { Authorization: `Bearer ${data.session.access_token}` } : {})
    .catch(() => ({}));
}

function recommendationTargetFromFeedItem(item) {
  if (!item) return { targetType: "", targetId: "" };
  const sourceType = item.sourceType || item.type || "";
  const normalizedType = sourceType === "hiring_posts" || item.type === "post" ? "post"
    : item.type === "service" ? "service"
      : item.type === "portfolio" ? "professional"
        : "beat";
  return { targetType: normalizedType, targetId: item.sourceId || item.metadata?.beatId || item.id };
}

function eventTypeForRecommendation(eventType) {
  const map = {
    impression: "view",
    view_50: "view",
    view_75: "view",
    view_complete: "view",
    click_cta: "click",
    open_profile: "click",
    add_to_plan: "click",
    purchase_intent: "buy",
    not_interested: "skip",
    skip_fast: "skip",
    view_similar: "click",
  };
  return map[eventType] || eventType;
}

async function trackUserEvent(eventType, targetType, targetId, metadata = {}) {
  if (!supabaseClient || !appState.authUser || !isUuid(targetId)) return;
  const normalizedEvent = eventTypeForRecommendation(eventType);
  const durationSeconds = Number(metadata.durationSeconds || metadata.watchTimeMs / 1000 || 0) || null;
  const payload = {
    eventType: normalizedEvent,
    targetType,
    targetId,
    durationSeconds,
    metadata: {
      ...metadata,
      route: currentRoute(),
      source: metadata.source || "ansend-web",
      capturedAt: new Date().toISOString(),
    },
  };
  pushRecommendationEventBuffer(payload);
  try {
    const { error } = await supabaseClient.rpc("track_user_event", {
      p_event_type: normalizedEvent,
      p_target_type: targetType,
      p_target_id: targetId,
      p_duration_seconds: durationSeconds,
      p_metadata: payload.metadata,
    });
    if (error) throw error;
    scheduleRecommendationProfileUpdate();
  } catch (error) {
    console.warn("[ANSEND recommendations] track event skipped", error?.message || error);
  }
}

let recommendationProfileUpdateTimer = null;

function recommendationInterestPayload(extra = {}) {
  const musicProfile = getMusicProfile() || createDefaultMusicProfile();
  const profile = appState.profile || {};
  const recentEvents = readRecommendationEventBuffer().slice(-24);
  const genres = [...new Set([
    ...asArray(musicProfile.genres),
    ...asArray(profile.music_styles),
    ...asArray(extra.genres),
  ].filter(Boolean))].slice(0, 8);
  const rolesInterested = [...new Set([
    musicProfile.userType,
    profile.account_role,
    ...asArray(extra.rolesInterested),
  ].filter(Boolean))].slice(0, 8);
  const intentTags = [...new Set([
    musicProfile.objective,
    musicProfile.stage,
    ...asArray(musicProfile.vibes),
    ...asArray(extra.intentTags),
  ].filter(Boolean))].slice(0, 12);
  const summary = [
    `Usuario ANSEND: ${profile.display_name || profile.artistic_name || profile.full_name || appState.authUser?.email || "sem nome"}.`,
    genres.length ? `Generos: ${genres.join(", ")}.` : "",
    rolesInterested.length ? `Interesse em perfis: ${rolesInterested.join(", ")}.` : "",
    musicProfile.objective ? `Objetivo: ${musicProfile.objective}.` : "",
    musicProfile.references ? `Referencias: ${musicProfile.references}.` : "",
    extra.summary || "",
  ].filter(Boolean).join(" ");
  return {
    summary,
    genres,
    rolesInterested,
    budgetMin: extra.budgetMin || null,
    budgetMax: extra.budgetMax || null,
    intentTags,
    recentEvents,
  };
}

async function updateRecommendationInterestProfile(extra = {}) {
  if (!appState.authUser) return;
  try {
    const headers = await recommendationAuthHeaders();
    await fetch("/api/recommendations/update-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
      body: JSON.stringify(recommendationInterestPayload(extra)),
    });
  } catch (error) {
    console.warn("[ANSEND recommendations] interest update skipped", error?.message || error);
  }
}

function scheduleRecommendationProfileUpdate(extra = {}) {
  if (!appState.authUser) return;
  clearTimeout(recommendationProfileUpdateTimer);
  recommendationProfileUpdateTimer = setTimeout(() => updateRecommendationInterestProfile(extra), 1800);
}

function contentEmbeddingText(targetType, item = {}) {
  if (targetType === "professional") {
    return [
      `Profissional: ${item.display_name || item.artistic_name || item.full_name || item.name || "ANSEND"}.`,
      `Tipo: ${accountRoleLabel(item.account_role || item.role || "artista")}.`,
      `Generos: ${asArray(item.music_styles || item.tags).join(", ")}.`,
      `Descricao: ${item.bio || item.specialty || ""}.`,
      `Links: ${[item.website_url, item.instagram_url, item.youtube_url, item.spotify_url].filter(Boolean).join(", ")}.`,
    ].join(" ");
  }
  if (targetType === "post") {
    return [
      `Post: ${item.title || "Oportunidade ANSEND"}.`,
      `Categoria: ${item.category || ""}.`,
      `Descricao: ${item.description || ""}.`,
      `Orcamento: ${item.budget_amount || ""} ${item.currency || ""}.`,
      `Prazo: ${item.deadline_type || ""}.`,
    ].join(" ");
  }
  return [
    `Beat ou musica: ${item.title || "Sem titulo"}.`,
    `Produtor: ${item.producer_name || item.artist_name || item.producer || ""}.`,
    `Genero: ${item.genre || asArray(item.tags)[0] || ""}.`,
    `BPM: ${item.bpm || ""}.`,
    `Descricao: ${item.description || ""}.`,
    `Tags: ${asArray(item.tags).join(", ")}.`,
  ].join(" ");
}

async function generateContentEmbedding(targetType, targetId, item) {
  if (!isUuid(targetId)) return;
  const textContent = contentEmbeddingText(targetType, item);
  if (!textContent.trim()) return;
  try {
    const headers = await recommendationAuthHeaders();
    await fetch("/api/recommendations/embed-content", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
      body: JSON.stringify({ targetType, targetId, textContent }),
    });
  } catch (error) {
    console.warn("[ANSEND recommendations] embedding skipped", error?.message || error);
  }
}

function scheduleContentEmbeddingSync(items = []) {
  const syncState = safeReadJson(RECOMMENDATION_EMBEDDING_SYNC_KEY, {});
  const pending = items
    .filter((entry) => isUuid(entry.targetId))
    .filter((entry) => {
      const version = String(entry.updatedAt || entry.createdAt || "");
      const key = `${entry.targetType}:${entry.targetId}`;
      return version && syncState[key] !== version;
    })
    .slice(0, 12);
  if (!pending.length) return;
  setTimeout(async () => {
    const latest = safeReadJson(RECOMMENDATION_EMBEDDING_SYNC_KEY, {});
    for (const entry of pending) {
      await generateContentEmbedding(entry.targetType, entry.targetId, entry.item);
      latest[`${entry.targetType}:${entry.targetId}`] = String(entry.updatedAt || entry.createdAt || new Date().toISOString());
    }
    localStorage.setItem(RECOMMENDATION_EMBEDDING_SYNC_KEY, JSON.stringify(latest));
  }, 1600);
}

function writeFeedItems(items) {
  localStorage.setItem(NEXO_FEED_ITEMS_KEY, JSON.stringify(asArray(items).slice(0, 260)));
}

function readStoredFeedItems() {
  return readFeedList(NEXO_FEED_ITEMS_KEY).filter((item) => item && item.id && item.isPublished !== false);
}

function isRealFeedMedia(url) {
  const value = String(url || "").trim();
  if (!value) return false;
  if (/ansend-logo|placeholder|unsplash|pexels/i.test(value)) return false;
  return /^(https?:|blob:|data:image\/|\/|\.\/|\.\.\/|assets\/uploads\/|storage\/)/i.test(value);
}

function currentCreatorIdentity(source = {}) {
  const profile = profileForUserId(source.user_id) || {};
  return {
    creatorId: source.user_id || profile.id || "",
    creatorName: source.producer_name || source.artist_name || profile.display_name || profile.artistic_name || profile.full_name || "ANSEND",
    creatorUsername: sanitizeHandle(profile.username || profile.handle || source.profile_username || source.username || source.owner_username || ""),
    creatorAvatar: profile.avatar_url || profile.avatar || "",
    creatorRole: accountRoleLabel(profile.account_role) || "Criador",
  };
}

function normalizeFeedItem(item) {
  if (!item?.id) return null;
  const sourceType = item.sourceType || item.type || "post";
  const sourceId = item.sourceId || item.id;
  return {
    id: String(item.id),
    creatorId: item.creatorId || "local-preview",
    creatorName: item.creatorName || "ANSEND",
    creatorUsername: sanitizeHandle(item.creatorUsername || item.profile_username || item.username || item.owner_username || ""),
    creatorAvatar: item.creatorAvatar || "",
    creatorRole: item.creatorRole || "Criador",
    type: item.type || "post",
    title: item.title || "Publicacao ANSEND",
    description: item.description || "",
    mediaUrl: item.mediaUrl || item.coverUrl || "",
    coverUrl: item.coverUrl || item.mediaUrl || "",
    audioUrl: item.audioUrl || "",
    price: item.price || item.priceLabel || "",
    priceLabel: item.priceLabel || item.price || "",
    tags: asArray(item.tags).filter(Boolean).slice(0, 6),
    sourceId: String(sourceId),
    sourceType,
    createdAt: item.createdAt || item.published_at || item.created_at || new Date().toISOString(),
    updatedAt: item.updatedAt || item.updated_at || new Date().toISOString(),
    likesCount: Number(item.likesCount || 0),
    commentsCount: Number(item.commentsCount || 0),
    savesCount: Number(item.savesCount || 0),
    sharesCount: Number(item.sharesCount || 0),
    isPublished: item.isPublished !== false,
    metadata: item.metadata || {},
  };
}

function createFeedItemFromMusic(source) {
  const creator = currentCreatorIdentity(source);
  const coverUrl = source.cover_url || source.coverUrl || "";
  const audioUrl = source.audio_url || source.audioUrl || "";
  if (!isRealFeedMedia(coverUrl) && !isRealFeedMedia(audioUrl)) return null;
  const type = source.kind === "musica" ? "music" : "beat";
  const tags = [
    source.genre || (type === "music" ? "Musica" : "Beat"),
    source.bpm ? `${source.bpm} BPM` : "",
    source.musical_key || "",
    ...asArray(source.tags),
  ].filter(Boolean);
  return normalizeFeedItem({
    id: `feed-${source.source_table || "catalog"}-${source.id}`,
    ...creator,
    type,
    title: source.title || "Sem titulo",
    description: source.description || (type === "music" ? "Musica publicada na ANSEND." : "Beat publicado na ANSEND."),
    mediaUrl: coverUrl,
    coverUrl,
    audioUrl,
    price: source.price ? Number(source.price).toLocaleString(appLocale.current === "pt-BR" ? "pt-BR" : "en-US", {
      style: "currency",
      currency: appLocale.current === "pt-BR" ? "BRL" : "USD",
    }) : "",
    tags,
    sourceId: source.id,
    sourceType: source.source_table || "catalog_items",
    createdAt: source.published_at || source.created_at || new Date().toISOString(),
    updatedAt: source.updated_at || new Date().toISOString(),
    isPublished: source.status === "published",
    metadata: { beatId: source.id, route: source.id ? `beat-${source.id}` : "explorar" },
  });
}

function createFeedItemFromBeat(source) {
  return createFeedItemFromMusic({ ...source, kind: source.kind || "beat" });
}

function createFeedItemFromService(source) {
  const creator = currentCreatorIdentity(source);
  const coverUrl = source.cover_url || source.image_url || "";
  return normalizeFeedItem({
    id: `feed-service-${source.id}`,
    ...creator,
    type: "service",
    title: source.title || source.service || "Servico ANSEND",
    description: source.description || source.briefing || "",
    mediaUrl: isRealFeedMedia(coverUrl) ? coverUrl : "",
    coverUrl: isRealFeedMedia(coverUrl) ? coverUrl : "",
    price: source.price || source.priceLabel || "",
    tags: asArray(source.tags || source.categories).filter(Boolean),
    sourceId: source.id,
    sourceType: "service",
    createdAt: source.created_at || new Date().toISOString(),
    updatedAt: source.updated_at || new Date().toISOString(),
    isPublished: source.status !== "draft",
  });
}

function upsertFeedItem(feedItem) {
  return normalizeFeedItem(feedItem);
}

function removeFeedItemForSource(sourceId, sourceType) {
  // Public feed content is derived from published database records.
}

function syncFeedItemsFromCatalog() {
  return publishedCatalogItems()
    .map((item) => createFeedItemFromBeat(item))
    .filter(Boolean);
}

function feedItemForEvent(id) {
  return getNexoFeedItems().find((item) => item.id === id);
}

function writeNexoFeedEvent(itemId, eventType, meta = {}) {
  if (!itemId || !eventType) return;
  const item = meta.item || feedItemForEvent(itemId);
  const duration = Number(meta.itemDurationMs || (item?.durationSeconds || 45) * 1000);
  const watchTime = Number(meta.watchTimeMs || 0);
  const event = {
    userId: appState.authUser?.id || appState.profile?.id || "local-preview",
    itemId,
    itemType: item?.type || "unknown",
    eventType,
    timestamp: new Date().toISOString(),
    watchTimeMs: watchTime,
    itemDurationMs: duration,
    completionRate: duration ? Math.min(1, watchTime / duration) : 0,
    sessionId: feedSessionId(),
    deviceType: window.innerWidth <= 760 ? "mobile" : "desktop",
    source: "nexo-feed",
    userMusicProfile: getMusicProfile(),
  };
  const events = readFeedList(NEXO_FEED_EVENTS_KEY);
  events.push(event);
  localStorage.setItem(NEXO_FEED_EVENTS_KEY, JSON.stringify(events.slice(-260)));

  const history = readFeedObject(NEXO_FEED_HISTORY_KEY);
  const current = history[itemId] || { impressions: 0, likes: 0, saves: 0, ctas: 0, skips: 0 };
  if (eventType === "impression") current.impressions += 1;
  if (eventType === "like") current.likes += 1;
  if (eventType === "save") current.saves += 1;
  if (eventType === "click_cta" || eventType === "open_profile" || eventType === "add_to_plan") current.ctas += 1;
  if (eventType === "skip_fast" || eventType === "not_interested") current.skips += 1;
  current.lastEvent = eventType;
  current.updatedAt = event.timestamp;
  history[itemId] = current;
  localStorage.setItem(NEXO_FEED_HISTORY_KEY, JSON.stringify(history));
  updateNexoTasteFromEvent(item, eventType);
  const target = recommendationTargetFromFeedItem(item);
  trackUserEvent(eventType, target.targetType, target.targetId, {
    source: "nexo-feed",
    feedItemId: itemId,
    watchTimeMs: watchTime,
    durationSeconds: Math.round(watchTime / 1000),
    completionRate: event.completionRate,
  });
}

function updateNexoTasteFromEvent(item, eventType) {
  if (!item || !["view_50", "view_75", "view_complete", "like", "save", "share", "click_cta", "open_profile", "add_to_plan", "view_similar"].includes(eventType)) return;
  const taste = readFeedObject(NEXO_FEED_TASTE_KEY);
  taste.genres = taste.genres || {};
  taste.vibes = taste.vibes || {};
  taste.categories = taste.categories || {};
  const weight = ["like", "save", "click_cta", "add_to_plan"].includes(eventType) ? 4 : 1;
  asArray(item.genres).forEach((genre) => { taste.genres[genre] = (taste.genres[genre] || 0) + weight; });
  asArray(item.vibes).forEach((vibe) => { taste.vibes[vibe] = (taste.vibes[vibe] || 0) + weight; });
  if (item.category) taste.categories[item.category] = (taste.categories[item.category] || 0) + weight;
  taste.updatedAt = new Date().toISOString();
  localStorage.setItem(NEXO_FEED_TASTE_KEY, JSON.stringify(taste));
}

function preferredFeedEntries(collection, limit = 3) {
  return Object.entries(collection || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key]) => key);
}

function nexoFeedCta(item) {
  const map = {
    music: "Ouvir",
    beat: "Ouvir",
    service: "Contratar",
    image: "Ver arte",
    post: "Ver detalhes",
    portfolio: "Ver detalhes",
  };
  return map[item.type] || "Ver detalhes";
}

function getNexoFeedItems() {
  return syncFeedItemsFromCatalog()
    .map(normalizeFeedItem)
    .filter(Boolean)
    .filter((item) => {
      if (["music", "beat", "image", "portfolio"].includes(item.type)) {
        return isRealFeedMedia(item.coverUrl) || isRealFeedMedia(item.mediaUrl) || isRealFeedMedia(item.audioUrl);
      }
      return item.isPublished !== false;
    });
}

function calculateNexoFeedScore(item, profile = getMusicProfile()) {
  const history = readFeedObject(NEXO_FEED_HISTORY_KEY)[item.id] || {};
  const createdAt = Date.parse(item.createdAt || "") || 0;
  const ageHours = createdAt ? Math.max(0, (Date.now() - createdAt) / 3600000) : 999;
  let score = 100 - Math.min(60, ageHours / 2);
  score += (history.likes || item.likesCount || 0) * 3 + (history.saves || item.savesCount || 0) * 4 + (history.ctas || 0) * 2;
  score -= (history.skips || 0) * 10;
  return { score: Math.max(1, Math.min(100, Math.round(score))), reasons: ["publicacao real da plataforma"] };
}

function getRankedNexoFeed(limit = 14) {
  if (appState.recommendations?.feed?.length) {
    const hidden = new Set(readFeedList(NEXO_FEED_NOT_INTERESTED_KEY));
    const personalized = appState.recommendations.feed.filter((item) => !hidden.has(item.id));
    if (personalized.length) return personalized.slice(0, limit);
  }
  const profile = getMusicProfile() || createDefaultMusicProfile();
  const hidden = new Set(readFeedList(NEXO_FEED_NOT_INTERESTED_KEY));
  const pool = getNexoFeedItems()
    .filter((item) => !hidden.has(item.id))
    .map((item) => ({ ...item, feedMatch: calculateNexoFeedScore(item, profile) }))
    .sort((a, b) => (Date.parse(b.createdAt || "") || 0) - (Date.parse(a.createdAt || "") || 0));
  return pool.slice(0, limit);
}

function nexoFeedCard(item, index) {
  const isBeat = item.type === "beat" || item.type === "music";
  const beatId = item.metadata?.beatId || item.id;
  const isSavedBeat = isBeat && appState.favorites.has(beatId);
  const author = item.creatorName || "ANSEND";
  const authorImage = isRealFeedMedia(item.creatorAvatar) ? item.creatorAvatar : "";
  const authorAttrs = profileTargetAttrs({ id: item.creatorId, username: item.creatorUsername, title: author });
  const media = item.coverUrl || item.mediaUrl || "";
  const hasVisualMedia = isRealFeedMedia(media);
  const meta = [item.creatorRole, item.priceLabel || item.price].filter(Boolean).slice(0, 2).join(" - ");
  const typeIcon = item.type === "service" ? "briefcase-business" : item.type === "image" ? "image" : item.type === "portfolio" ? "gallery-horizontal-end" : "sparkles";
  const adminBeatItem = isBeat ? findBeat(beatId) || { id: beatId, title: item.title, source_table: item.sourceTable || item.metadata?.sourceTable || "beats" } : null;
  return `<article class="nexo-feed-card ${hasVisualMedia ? "" : "has-system-fallback"}" data-feed-item-id="${item.id}" data-feed-type="${item.type}" data-feed-index="${index}">
    ${adminBeatItem ? adminDeleteButton("beat", adminBeatItem) : ""}
    <div class="nexo-feed-media">
      ${hasVisualMedia ? `<img src="${htmlEscape(media)}" alt="${htmlEscape(item.title)}">` : `<div class="nexo-feed-official-fallback"><i data-lucide="radio-tower"></i><span>ANSEND</span></div>`}
      ${isBeat && item.audioUrl ? "" : `<span class="nexo-feed-type-icon"><i data-lucide="${typeIcon}"></i></span>`}
    </div>
    <div class="nexo-feed-copy">
      <div class="nexo-feed-author">
        <button class="nexo-feed-author-media" type="button" data-action="nexo-feed-profile" data-feed-item-id="${item.id}" ${authorAttrs} aria-label="Abrir perfil de ${htmlEscape(author)}">
          ${authorImage ? `<img src="${htmlEscape(authorImage)}" alt="">` : `<span class="nexo-feed-avatar-fallback">${htmlEscape(author.slice(0, 1).toUpperCase())}</span>`}
        </button>
        <button class="nexo-feed-author-copy" type="button" data-action="nexo-feed-profile" data-feed-item-id="${item.id}" ${authorAttrs}>
          <strong>${htmlEscape(author)}</strong>
          <span>${htmlEscape(meta || "Publicacao real")}</span>
        </button>
        <button type="button" data-action="nexo-feed-profile" data-feed-item-id="${item.id}" ${authorAttrs}>Ver</button>
      </div>
      <h2>${htmlEscape(item.title)}</h2>
      <p>${htmlEscape(item.description || "Publicado na ANSEND.")}</p>
      ${item.tags?.length ? `<div class="nexo-feed-tags">${item.tags.slice(0, 4).map((tag) => `<span>${htmlEscape(tag)}</span>`).join("")}</div>` : ""}
      <button type="button" class="nexo-feed-main-cta" data-action="nexo-feed-open" data-feed-item-id="${item.id}">${nexoFeedCta(item)}</button>
    </div>
    <div class="nexo-feed-actions" aria-label="Acoes do feed">
      <button type="button" class="${isSavedBeat ? "is-active" : ""}" data-action="nexo-feed-like" data-feed-item-id="${item.id}" aria-label="Curtir"><i data-lucide="heart"></i><span>Curtir</span></button>
      <button type="button" data-action="nexo-feed-comments" data-feed-item-id="${item.id}" aria-label="Comentarios"><i data-lucide="message-circle"></i><span>Comentar</span></button>
      <button type="button" data-action="nexo-feed-share" data-feed-item-id="${item.id}" aria-label="Compartilhar"><i data-lucide="send"></i><span>Enviar</span></button>
      <button type="button" class="${isSavedBeat ? "is-active" : ""}" data-action="nexo-feed-save" data-feed-item-id="${item.id}" aria-label="Salvar"><i data-lucide="bookmark"></i><span>Salvar</span></button>
    </div>
  </article>`;
}

function nexoFeedDetailPanel(item) {
  return `<div class="nexo-feed-detail-card" data-feed-detail="${item.id}">
    <span>NEXO entende</span>
    <strong>${item.title}</strong>
    <p>${item.feedMatch?.reasons?.join(". ") || "Recomendacao baseada no seu perfil musical."}</p>
    <ul>
      <li><i data-lucide="radio"></i>${item.category}</li>
      <li><i data-lucide="activity"></i>${item.priceLabel || "Plano sugerido"}</li>
      <li><i data-lucide="badge-check"></i>${item.verified ? "Verificado" : "Novo na plataforma"}</li>
    </ul>
  </div>`;
}

function renderNexoFeed() {
  const items = getRankedNexoFeed();
  appView.innerHTML = `<section class="nexo-feed-page" aria-label="NEXO Feed">
    ${items.length ? `<main class="nexo-feed-stream" id="nexoFeedStream">
      ${items.map(nexoFeedCard).join("")}
    </main>` : `<main class="nexo-feed-empty" id="nexoFeedStream">
      <div class="nexo-feed-empty-mark"><i data-lucide="radio-tower"></i></div>
      <h1>Nenhuma publicacao ainda.</h1>
      <p>Quando artistas, produtores e profissionais publicarem musicas, beats, servicos ou artes, elas aparecerao aqui.</p>
      <div>
        <button type="button" data-route="cadastrar">Publicar agora</button>
        <button type="button" data-route="marketplace">Explorar marketplace</button>
      </div>
    </main>`}
    ${items.length > 1 ? `<div class="nexo-feed-scroll-controls" aria-label="Navegar no feed">
      <button type="button" data-action="nexo-feed-prev" aria-label="Subir no feed"><i data-lucide="chevron-up"></i></button>
      <button type="button" data-action="nexo-feed-next" aria-label="Descer no feed"><i data-lucide="chevron-down"></i></button>
    </div>` : ""}
  </section>`;
  items.slice(0, 12).forEach((item) => {
    const target = recommendationTargetFromFeedItem(item);
    recordRecommendationImpression(target.targetType, target.targetId, item.feedMatch?.score || 0, item.feedMatch?.reasons?.[0] || "");
  });
}

function nexoFeedCommentStorageKey(feedItemId) {
  return `ansend-feed-comments-${feedItemId}`;
}

function nexoFeedDefaultComments(item = {}) {
  const title = item.title || "esse drop";
  const author = item.creatorName || "ANSEND";
  return [
    {
      id: "c1",
      user: "beatrix.sound",
      avatar: img("photo-1494790108377-be9c29b29330"),
      time: "11 sem",
      text: `A vibe de ${title} ficou absurda.`,
      likes: 406,
      replies: 1,
    },
    {
      id: "c2",
      user: "naye.rosouzah",
      avatar: img("photo-1517841905240-472988babdf9"),
      time: "11 sem",
      text: "A carinha dele 😅",
      likes: 84,
      replies: 0,
    },
    {
      id: "c3",
      user: "llorenadutra",
      avatar: img("photo-1534528741775-53994a69daeb"),
      time: "11 sem",
      text: `O ${author} entregou demais nesse som.`,
      likes: 228,
      replies: 1,
    },
    {
      id: "c4",
      user: "casferreira.ciiii",
      avatar: img("photo-1500648767791-00dcc994a43e"),
      time: "11 sem",
      text: "Nome da musica?",
      likes: 4,
      replies: 1,
    },
    {
      id: "c5",
      user: "barbosa.deboramaria",
      avatar: img("photo-1524504388940-b1c1722653e1"),
      time: "11 sem",
      text: "Limpou porque ficou bom demais.",
      likes: 169,
      replies: 0,
    },
  ];
}

function readNexoFeedComments(item) {
  try {
    const saved = JSON.parse(localStorage.getItem(nexoFeedCommentStorageKey(item.id)) || "[]");
    return [...nexoFeedDefaultComments(item), ...saved];
  } catch (_error) {
    return nexoFeedDefaultComments(item);
  }
}

function saveNexoFeedComment(item, text) {
  const clean = String(text || "").trim();
  if (!clean) return;
  const key = nexoFeedCommentStorageKey(item.id);
  const saved = safeReadJson(key, []);
  const profile = activeProfile();
  const display = profileDisplayData(profile);
  const entry = {
    id: generateUUID(),
    user: sanitizeHandle(display.username || display.name || appState.authUser?.email?.split("@")[0] || "ansend.user"),
    avatar: display.avatar || "",
    time: "agora",
    text: clean,
    likes: 0,
    replies: 0,
    isOwn: true,
  };
  localStorage.setItem(key, JSON.stringify([entry, ...saved].slice(0, 60)));
}

function nexoFeedCommentAvatar(comment) {
  if (comment.avatar) return `<img src="${htmlEscape(comment.avatar)}" alt="">`;
  return `<span>${htmlEscape((comment.user || "A").slice(0, 1).toUpperCase())}</span>`;
}

function nexoFeedCommentMarkup(comment) {
  return `<article class="nexo-feed-comment" data-comment-id="${htmlEscape(comment.id)}">
    <div class="nexo-feed-comment-avatar">${nexoFeedCommentAvatar(comment)}</div>
    <div class="nexo-feed-comment-body">
      <p><strong>${htmlEscape(comment.user)}</strong> <time>${htmlEscape(comment.time)}</time><br>${htmlEscape(comment.text)}</p>
      <footer>
        <button type="button" data-action="nexo-feed-comment-like">${Number(comment.likes || 0).toLocaleString("pt-BR")} curtidas</button>
        <button type="button" data-action="nexo-feed-comment-reply">Responder</button>
      </footer>
      ${comment.replies ? `<button type="button" class="nexo-feed-comment-replies" data-action="nexo-feed-comment-replies" data-replies="${Number(comment.replies)}"><span></span>Ver todas as ${comment.replies} respostas</button>` : ""}
    </div>
    <button type="button" class="nexo-feed-comment-heart" data-action="nexo-feed-comment-like" aria-label="Curtir comentario"><i data-lucide="heart"></i></button>
  </article>`;
}

function openNexoFeedComments(item) {
  if (!item) return;
  closeNexoFeedComments();
  const comments = readNexoFeedComments(item);
  const safeTitle = htmlEscape(item.title || "Publicacao");
  document.body.insertAdjacentHTML("beforeend", `<section class="nexo-feed-comments-layer" data-feed-comments="${htmlEscape(item.id)}" aria-label="Comentarios do feed">
    <button type="button" class="nexo-feed-comments-scrim" data-action="close-feed-comments" aria-label="Fechar comentarios"></button>
    <aside class="nexo-feed-comments-panel" role="dialog" aria-modal="true" aria-labelledby="feedCommentsTitle">
      <header>
        <button type="button" data-action="close-feed-comments" aria-label="Fechar comentarios"><i data-lucide="x"></i></button>
        <h2 id="feedCommentsTitle">Comentarios</h2>
        <span>${comments.length}</span>
      </header>
      <div class="nexo-feed-comments-context">
        <strong>${safeTitle}</strong>
        <small>${htmlEscape(item.creatorName || "ANSEND")}</small>
      </div>
      <div class="nexo-feed-comments-list" role="list">
        ${comments.map(nexoFeedCommentMarkup).join("")}
      </div>
      <form class="nexo-feed-comment-form" data-feed-item-id="${htmlEscape(item.id)}">
        <div class="nexo-feed-comment-avatar is-current">${nexoFeedCommentAvatar({ user: activeProfile()?.full_name || "A", avatar: profileDisplayData(activeProfile()).avatar })}</div>
        <label class="sr-only" for="nexoFeedCommentInput">Adicionar comentario</label>
        <input id="nexoFeedCommentInput" name="comment" type="text" maxlength="220" placeholder="Adicione um comentario..." autocomplete="off">
        <button type="button" data-action="nexo-feed-comment-emoji" aria-label="Emoji"><i data-lucide="smile"></i></button>
        <button type="submit" aria-label="Enviar comentario"><i data-lucide="arrow-up"></i></button>
      </form>
    </aside>
  </section>`);
  document.body.classList.add("nexo-feed-comments-open");
  lucide.createIcons();
  document.querySelector(".nexo-feed-comment-form input")?.focus();
}

function closeNexoFeedComments() {
  document.querySelector(".nexo-feed-comments-layer")?.remove();
  document.body.classList.remove("nexo-feed-comments-open");
}

function nexoFeedPlaybackSvg(mode = "play") {
  if (mode === "pause") {
    return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><rect x="20" y="16" width="8" height="32" rx="2" fill="currentColor"></rect><rect x="36" y="16" width="8" height="32" rx="2" fill="currentColor"></rect></svg>`;
  }
  return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><path d="M24 18v28c0 2.7 2.9 4.3 5.2 2.9l22-14c2.1-1.3 2.1-4.5 0-5.8l-22-14C26.9 13.7 24 15.3 24 18z" fill="currentColor"></path></svg>`;
}

function showNexoFeedPlaybackOverlay(card, mode = "play", { persistent = false } = {}) {
  const media = card?.querySelector(".nexo-feed-media");
  if (!media) return;
  media.querySelectorAll(".nexo-feed-play-feedback").forEach((item) => item.remove());
  const feedback = document.createElement("div");
  feedback.className = `nexo-feed-play-feedback${persistent ? " is-persistent" : ""}`;
  feedback.innerHTML = `<span class="nexo-feed-play-feedback__button">${nexoFeedPlaybackSvg(mode)}</span>`;
  media.appendChild(feedback);
  if (!persistent) setTimeout(() => feedback.remove(), 620);
}

function clearNexoFeedPlaybackOverlay(card) {
  card?.querySelectorAll(".nexo-feed-play-feedback").forEach((item) => item.remove());
}

function nexoFeedBeatForCard(card) {
  const feedItem = feedItemForEvent(card?.dataset.feedItemId);
  if (!feedItem || !["beat", "music"].includes(feedItem.type)) return null;
  const beatId = String(feedItem.metadata?.beatId || feedItem.sourceId || feedItem.id || "");
  return searchableBeatPool().find((item) => String(item.id) === beatId)
    || (String(topBeatOfDay.id) === beatId ? topBeatOfDay : null);
}

function pauseNexoFeedCard(card, { fromUser = false } = {}) {
  const item = nexoFeedBeatForCard(card);
  if (item && appState.playing === item.id) {
    pauseTopBeat({ quiet: true });
  }
  card?.classList.remove("is-playing");
  card?.classList.toggle("is-paused", Boolean(fromUser));
  if (fromUser) showNexoFeedPlaybackOverlay(card, "play", { persistent: true });
  else clearNexoFeedPlaybackOverlay(card);
}

async function playNexoFeedCard(card, { fromUser = false } = {}) {
  const item = nexoFeedBeatForCard(card);
  if (!item) return false;
  if (!fromUser && card?.dataset.userPaused === "true") return false;
  if (PlayerStore.isPlaying(item.id)) {
    card?.classList.add("is-playing");
    card?.classList.remove("is-paused");
    if (!fromUser) clearNexoFeedPlaybackOverlay(card);
    return true;
  }
  document.querySelectorAll(".nexo-feed-card").forEach((candidate) => {
    if (candidate !== card) {
      candidate.classList.remove("is-playing", "is-paused");
      clearNexoFeedPlaybackOverlay(candidate);
    }
  });
  const played = await playBeat(item, { quiet: true, suppressErrorLog: !fromUser });
  if (!played) return false;
  card?.classList.add("is-playing");
  card?.classList.remove("is-paused");
  card?.removeAttribute("data-user-paused");
  if (fromUser) showNexoFeedPlaybackOverlay(card, "pause");
  else clearNexoFeedPlaybackOverlay(card);
  return true;
}

function toggleNexoFeedCardPlayback(card) {
  if (!card) return;
  const item = nexoFeedBeatForCard(card);
  if (!item) return;
  const isPlaying = PlayerStore.isPlaying(item.id);
  if (isPlaying) {
    card.dataset.userPaused = "true";
    pauseNexoFeedCard(card, { fromUser: true });
    writeNexoFeedEvent(card.dataset.feedItemId || item.id, "click_cta", { item, watchTimeMs: 0 });
    return;
  }
  playNexoFeedCard(card, { fromUser: true });
  writeNexoFeedEvent(card.dataset.feedItemId || item.id, "click_cta", { item, watchTimeMs: 0 });
}

function setActiveNexoFeedCard(card) {
  if (!card) return;
  const previous = document.querySelector(".nexo-feed-card.is-active");
  if (previous && previous !== card) pauseNexoFeedCard(previous, { fromUser: false });
  document.querySelectorAll(".nexo-feed-card").forEach((item) => item.classList.toggle("is-active", item === card));
}

function scrollNexoFeed(direction = 1) {
  const stream = document.querySelector("#nexoFeedStream");
  const cards = [...(stream?.querySelectorAll(".nexo-feed-card") || [])];
  if (!stream || !cards.length) return;
  const activeIndex = cards.findIndex((card) => card.classList.contains("is-active"));
  const fallbackIndex = Math.max(0, Math.round(stream.scrollTop / Math.max(1, stream.clientHeight)));
  const currentIndex = activeIndex >= 0 ? activeIndex : fallbackIndex;
  const nextIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));
  cards[nextIndex]?.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
}

function setupNexoFeedObservers() {
  if (nexoFeedObserver) nexoFeedObserver.disconnect();
  nexoFeedTimers.forEach((timers) => timers.forEach(clearTimeout));
  nexoFeedTimers.clear();
  const cards = [...document.querySelectorAll(".nexo-feed-card")];
  if (!cards.length) return;
  nexoFeedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const card = entry.target;
      const id = card.dataset.feedItemId;
      if (!id) return;
      if (entry.isIntersecting && entry.intersectionRatio >= .62) {
        setActiveNexoFeedCard(card);
        playNexoFeedCard(card, { fromUser: false });
        if (!card.dataset.impressed) {
          writeNexoFeedEvent(id, "impression");
          writeNexoFeedEvent(id, "view_start");
          card.dataset.impressed = "true";
        }
        const timers = [
          setTimeout(() => writeNexoFeedEvent(id, "view_25", { watchTimeMs: 11000 }), 1100),
          setTimeout(() => writeNexoFeedEvent(id, "view_50", { watchTimeMs: 22000 }), 2400),
          setTimeout(() => writeNexoFeedEvent(id, "view_75", { watchTimeMs: 33000 }), 4200),
        ];
        nexoFeedTimers.set(id, timers);
      } else if (entry.intersectionRatio < .28 && nexoFeedTimers.has(id)) {
        pauseNexoFeedCard(card, { fromUser: false });
        nexoFeedTimers.get(id).forEach(clearTimeout);
        nexoFeedTimers.delete(id);
        if (card.dataset.impressed && !card.dataset.completed) writeNexoFeedEvent(id, "skip_fast", { watchTimeMs: 1200 });
      }
    });
  }, { threshold: [.25, .62, .9] });
  cards.forEach((card) => nexoFeedObserver.observe(card));
  setActiveNexoFeedCard(cards[0]);
  requestAnimationFrame(() => playNexoFeedCard(cards[0], { fromUser: false }));
}

function musicProfileSummary(profile = getMusicProfile()) {
  const baseProfile = profile || createDefaultMusicProfile();
  return `${asArray(baseProfile.genres).slice(0, 3).join(", ")} - ${asArray(baseProfile.vibes).slice(0, 2).join(", ")}`;
}

function quizCtaCard() {
  return `<button class="quick-action-card nexo-profile-cta" type="button" data-action="start-nexo-match">
    <div class="quick-action-icon-wrapper">
      <i data-lucide="sparkles"></i>
    </div>
    <div class="quick-action-info">
      <strong>Personalize sua experiencia com a NEXO</strong>
      <span>Responda um quiz rapido para receber playlists, profissionais e combos com match.</span>
    </div>
  </button>`;
}

function quickActionCard([icon, title, desc, route]) {
  return `<a class="quick-action-card" href="#${route}" data-route="${route}">
    <div class="quick-action-icon-wrapper">
      <i data-lucide="${icon}"></i>
    </div>
    <div class="quick-action-info">
      <strong>${title}</strong>
      <span>${desc}</span>
    </div>
  </a>`;
}

function nexoRecommendationCard(item) {
  return `<article class="nexo-recommendation-card">
    <div class="recommendation-icon"><i data-lucide="${item.icon}"></i></div>
    <span>${item.type}</span>
    <strong>${item.title}</strong>
    <p>${item.reason}</p>
    ${item.match ? `<small class="match-score">${item.match.label} - ${item.match.score}%</small><ul class="match-reasons">${item.match.reasons.map((reason) => `<li>${reason}</li>`).join("")}</ul>` : ""}
    <a href="#${item.route}" data-route="${item.route}">Abrir <i data-lucide="arrow-right"></i></a>
  </article>`;
}

function categoryCard([icon, title, desc, route]) {
  const background = categoryBackgrounds[title] || "assets/category-beatmakers.png";
  const categoryKeys = {
    Beatmakers: "category.beatmakers",
    Designers: "category.designers",
    "Produtores Musicais": "category.producers",
    Curadores: "category.curators",
    "Marketing Musical": "category.marketing",
  };
  const categoryIds = {
    Beatmakers: "beatmakers",
    Designers: "designers",
    "Produtores Musicais": "produtores",
    Curadores: "curadores",
    "Marketing Musical": "marketing",
  };
  const catId = categoryIds[title] || "todos";
  return `<a href="#${route}" data-route="${route}" data-action="category-click" data-category="${catId}" class="category-card" style="--category-bg: url('${background}')">
    <strong>${t(categoryKeys[title], title)}</strong>
  </a>`;
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

function smartComboCard(input, index) {
  const item = Array.isArray(input) ? { title: input[0], services: input[1], economy: input[2], featured: index === 2 } : input;
  return `<article class="smart-combo-card ${item.featured ? "is-featured" : ""}">
    <span>${item.featured ? "Mais completo" : item.match ? `${item.match.score}% match` : "Combo inteligente"}</span>
    <strong>${item.title}</strong>
    <p>${item.services}</p>
    <small>${item.match ? item.match.reasons[0] : item.economy}</small>
    <button type="button" data-action="ai-chip" data-prompt="Quero montar o ${item.title.toLowerCase()} para meu lancamento.">Montar combo</button>
  </article>`;
}

function cleanVerifiedBadge(className = "professional-verified-badge") {
  return `<span class="${className}" aria-label="Perfil verificado">
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="7" fill="#1d9bf0"></circle>
      <path d="M5.05 8.18 6.95 10.1 11.1 5.9" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  </span>`;
}

function professionalMatchCard(profile) {
  const matchLabel = profile.match?.score ? `${profile.match.score}% match` : profile.role || profile.category || "Profissional";
  const verifiedMarkup = profile.verified === false ? "" : cleanVerifiedBadge();
  const profileAttrs = profileTargetAttrs({ id: profile.id, username: profile.username, title: profile.name });
  return `<article class="recommended-professional-item match-professional-card">
    <button class="recommended-professional-avatar" type="button" data-action="producer" ${profileAttrs} aria-label="Abrir perfil de ${htmlEscape(profile.name)}">
      ${optimizedImageMarkup({ src: professionalImage(profile), alt: `Avatar de ${profile.name}`, width: 72, height: 72 })}
    </button>
    <button class="recommended-professional-name" type="button" data-action="producer" ${profileAttrs}>
      <span>${htmlEscape(profile.name)}</span>${verifiedMarkup}
    </button>
    <small>${htmlEscape(matchLabel)}</small>
  </article>`;
}

function musicProfilePanel(profile = getMusicProfile()) {
  const current = profile || createDefaultMusicProfile();
  const checked = (name, value) => asArray(current[name]).includes(value) ? "checked" : "";
  const selected = (name, value) => current[name] === value ? "selected" : "";
  return `<section class="music-profile-panel">
    <div class="music-profile-copy">
      <span><i data-lucide="sliders-horizontal"></i>Preferencias</span>
      <h2>Perfil musical</h2>
      <p>${hasMusicProfile() ? `Base atual: ${musicProfileSummary(current)}.` : "Defina estilos, fase e objetivo para personalizar a plataforma."}</p>
      <button type="button" data-action="start-nexo-match">${hasMusicProfile() ? "Ajustar preferencias" : "Configurar preferencias"}</button>
    </div>
    <form class="music-profile-form">
      <div class="music-profile-form-grid">
        <label>Objetivo<select name="objective">${musicQuiz.objectives.map((item) => `<option ${selected("objective", item)}>${item}</option>`).join("")}</select></label>
        <label>Fase<select name="stage">${musicQuiz.stages.map((item) => `<option ${selected("stage", item)}>${item}</option>`).join("")}</select></label>
        <label>Orcamento<select name="budget">${musicQuiz.budgets.map((item) => `<option ${selected("budget", item)}>${item}</option>`).join("")}</select></label>
        <label>Tipo<select name="userType">${musicQuiz.userTypes.map((item) => `<option ${selected("userType", item)}>${item}</option>`).join("")}</select></label>
      </div>
      <div class="music-chip-group"><strong>Estilos</strong>${musicQuiz.genres.slice(0, 12).map((item) => `<label><input type="checkbox" name="genres" value="${item}" ${checked("genres", item)}>${item}</label>`).join("")}</div>
      <div class="music-chip-group"><strong>Vibes</strong>${musicQuiz.vibes.map((item) => `<label><input type="checkbox" name="vibes" value="${item}" ${checked("vibes", item)}>${item}</label>`).join("")}</div>
      <label class="music-profile-wide">Referencias<input name="references" value="${current.references || ""}" placeholder="Ex: Ryu, Veigh, Travis Scott, funk 150..."></label>
      <button class="seller-submit" type="submit">Salvar perfil musical<i data-lucide="arrow-right"></i></button>
    </form>
  </section>`;
}

function featuredProfessionalCard(name, index) {
  const categories = ["Beatmaker", "Designer", "Produtor", "Curador", "Marketing"];
  return `<article class="featured-professional-card">
    ${optimizedImageMarkup({ src: img(avatarImages[index % avatarImages.length]), alt: `Avatar de ${name}`, width: 56, height: 56 })}
    <div>
      <strong>${name}${cleanVerifiedBadge()}</strong>
      <span>${categories[index % categories.length]} · ${(4.7 + (index % 3) / 10).toFixed(1)}</span>
    </div>
    <button type="button" data-action="producer" data-title="${name}">Ver perfil</button>
  </article>`;
}

function topProducerNameCard(name, index) {
  const followerCounts = ["2.1K", "3.3K", "444", "2K", "2.5K", "612", "335", "1.8K"];
  return `<article class="top-producer-card">
    <button class="top-producer-avatar" type="button" data-action="producer" data-title="${name}" aria-label="Abrir perfil de ${name}">
      ${optimizedImageMarkup({ src: img(avatarImages[index % avatarImages.length]), alt: `Avatar de ${name}`, width: 88, height: 88 })}
    </button>
    <strong>${name}${cleanVerifiedBadge()}</strong>
    <span>${followerCounts[index % followerCounts.length]} Followers</span>
    <button class="top-producer-follow" type="button" data-action="producer" data-title="${name}"><i data-lucide="user-plus"></i>${t("Seguir", "Follow")}</button>
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
  const profile = getMusicProfile();
  const hasProfile = hasMusicProfile();
  const recs = buildNexoRecommendations(profile || createDefaultMusicProfile());
  const catalogBeats = marketplaceBeats();
  const realProfessionals = activeProfessionalProfiles();
  const setText = (id, title, subtitle) => {
    const head = document.querySelector(`#${id}`);
    const copy = head?.closest(".section-head")?.querySelector("p");
    if (head) head.innerHTML = title;
    if (copy) copy.textContent = subtitle;
  };

  if (hasProfile) {
    setText("featuredPreviewTitle", `<i data-lucide="audio-lines"></i>Beats preferidos pela NEXO`, `Mapeados por estilo, fase e objetivo: ${musicProfileSummary(profile)}`);
    setText("quickActionsTitle", `<i data-lucide="zap"></i>${t("section.nextStepShort")}`, profile.objective || "NEXO");
    setText("nexoRecommendationsTitle", `<i data-lucide="sparkles"></i>Recomendado para você`, appLocale.current === "pt-BR" ? "Profissionais e serviços com maior match para você" : "Professionals and services with the strongest fit for you");
    setText("smartCombosTitle", `<i data-lucide="boxes"></i>${t("section.combos")}`, appLocale.current === "pt-BR" ? "Pacotes montados para sua fase atual" : "Packages shaped for your current stage");
    setText("featuredProfessionalsTitle", `<i data-lucide="badge-check"></i>Profissionais recomendados`, appLocale.current === "pt-BR" ? "Perfis verificados com fit para seu projeto" : "Verified profiles that fit your project");
  } else {
    setText("featuredPreviewTitle", `<i data-lucide="flame"></i>${t("section.catalogs")}`, t("section.catalogsSubtitle"));
    setText("quickActionsTitle", `<i data-lucide="zap"></i>${t("section.nextStep")}`, appLocale.current === "pt-BR" ? "Responda o quiz e desbloqueie recomendacoes reais" : "Answer the quiz and unlock real recommendations");
    setText("nexoRecommendationsTitle", `<i data-lucide="sparkles"></i>Recomendado para você`, appLocale.current === "pt-BR" ? "Seis sugestões principais para resolver seu lançamento agora" : "Six top suggestions to move your release forward");
    setText("categoryTitle", `<i data-lucide="layout-grid"></i>${t("section.categories")}`, appLocale.current === "pt-BR" ? "Os gêneros musicais em destaque na ANSEND." : "Featured music genres on ANSEND.");
    setText("smartCombosTitle", `<i data-lucide="boxes"></i>${t("section.combos")}`, appLocale.current === "pt-BR" ? "Pacotes inteligentes para sair da ideia ate a divulgacao." : "Smart packages from idea to promotion.");
    setText("featuredProfessionalsTitle", `<i data-lucide="badge-check"></i>Profissionais recomendados`, appLocale.current === "pt-BR" ? "Perfis verificados com fit para seu projeto" : "Verified profiles that fit your project");
    setText("recentActivityTitle", `<i data-lucide="clock-3"></i>${t("section.recent")}`, appLocale.current === "pt-BR" ? "Ranking de faixas adicionadas agora" : "Recently added track ranking");
  }

  if (quick) quick.innerHTML = hasProfile ? recs.nextSteps.map(quickActionCard).join("") : [quizCtaCard(), ...(activeRoleKey() === "beatmaker" ? beatmakerQuickActions : quickActions).slice(0, 3).map(quickActionCard)].join("");
  if (recommendations) recommendations.innerHTML = (hasProfile ? recs.services : nexoRecommendations).slice(0, 6).map(nexoRecommendationCard).join("");
  if (categories) categories.innerHTML = mainCategories.map(categoryCard).join("");
  if (combos) combos.innerHTML = (hasProfile ? recs.combos : smartCombos).map(smartComboCard).join("");
  if (featured) {
    const items = hasProfile ? recs.beats.slice(0, 6) : catalogBeats.slice(0, 6);
    featured.innerHTML = items.length
      ? items.map((item) => beatCard({ ...item, homeCard: true, badge: "", match: null })).join("")
      : emptyState("upload-cloud", "Nenhum catálogo publicado", "Cadastre beats ou músicas para alimentar esta vitrine.", "perfil");
  }
  if (professionals) {
    const items = hasProfile ? recs.professionals : realProfessionals;
    professionals.innerHTML = items.length
      ? items.map((item) => professionalMatchCard(item.match ? item : { ...item, match: { score: 100, reasons: ["Perfil cadastrado"] } })).join("")
      : emptyState("users-round", "Nenhum profissional cadastrado", "Crie sua conta profissional para aparecer nesta área.", "vendedor");
  }
  if (professionals) recordVisibleRecommendationImpressions((hasProfile ? recs.professionals : realProfessionals), "professional");
  if (professionals?.querySelector(".empty-state")) {
    professionals.innerHTML = `<section class="recommended-professionals-empty">Nenhum profissional recomendado ainda.</section>`;
  }
  if (activity) {
    activity.innerHTML = catalogBeats.length
      ? catalogBeats.slice(0, 8).map(trackRow).join("")
      : emptyState("clock-3", "Lista recente vazia", "Os novos cadastros publicados vão aparecer aqui.", "perfil");
  }
}

function sectionTemplate([title, subtitle, icon, content]) {
  const body = content === "avatars"
    ? `<div class="avatar-row">${avatars.map(avatarCard).join("")}</div>`
    : `<div class="beat-row">${content.map(beatCard).join("")}</div>`;
  return `<section class="catalog-section">
    <div class="section-head">
      <div><h2><i data-lucide="${icon}"></i>${title}</h2><p>${subtitle}</p></div>
      <div class="arrow-pair">
        <button type="button" data-action="scroll-prev" aria-label="Anterior"><i data-lucide="chevron-left"></i></button>
        <button type="button" data-action="scroll-next" aria-label="Próximo"><i data-lucide="chevron-right"></i></button>
      </div>
    </div>
    ${body}
  </section>`;
}

function trackRow(item, i) {
  const producerAttrs = profileTargetAttrs({
    id: item.user_id || item.raw?.user_id || "",
    username: item.owner_username || item.profile_username || item.raw?.profile_username || item.raw?.username || item.raw?.owner_username || "",
    title: item.producer,
  });
  const coverHtml = `<button class="airbit-cover" type="button" data-action="play" data-id="${item.id}" aria-label="Tocar ${item.title}">
    <div class="airbit-cover-placeholder"><i data-lucide="music"></i></div>
    ${optimizedImageMarkup({ src: item.cover, alt: `Mini capa ${item.title}`, width: 64, height: 64 })}
    <div class="airbit-cover-hover"><i data-lucide="play"></i></div>
  </button>`;

  const verifiedBadge = `<span class="airbit-verified"><i data-lucide="crown"></i></span>`;
  const tagsHtml = item.tags.slice(0, 3).map(tag => `<span class="airbit-tag-chip">#${tag}</span>`).join("");
  const price = item.price || "$39.95";

  return `<article class="track-row airbit-track-row" data-beat-id="${item.id}">
    ${adminDeleteButton("beat", item, "admin-delete-beat-row")}
    ${coverHtml}
    <div class="airbit-info">
      <div class="airbit-title-row">
        <button class="airbit-track-title" type="button" data-action="play" data-id="${item.id}">${item.title}</button>
      </div>
      <div class="airbit-meta-row">
        <button class="airbit-producer" type="button" data-action="producer" ${producerAttrs}>${item.producer}</button>
        ${verifiedBadge}
        <span class="airbit-divider">·</span>
        <span class="airbit-details">${item.tags[1] || "98 BPM"} · ${item.tags[0]}</span>
      </div>
    </div>
    <div class="airbit-tags">
      ${tagsHtml}
    </div>
    <div class="airbit-actions">
      <button class="airbit-favorite-btn" type="button" data-action="favorite" data-id="${item.id}" aria-label="Favoritar">
        <i data-lucide="heart"></i>
      </button>
      <button class="airbit-buy-btn" type="button" data-action="buy" data-id="${item.id}">
        <i data-lucide="shopping-cart"></i>
        <span>${price}</span>
      </button>
      <button class="airbit-more-btn" type="button" aria-label="Mais opções" data-action="favorite" data-id="${item.id}">
        <i data-lucide="more-vertical"></i>
      </button>
    </div>
  </article>`;
}

const supportsPrecisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let revealObserver = null;
let homeScrollAnimationRaf = null;
let lastRoute = null;
let lastPageTransitionKey = null;
let heroTypewriterTimer = null;
let heroTypewriterToken = 0;

function currentRouteFromHash() {
  const route = (location.hash.replace("#", "") || "feed").split("?")[0];
  if (route === CHAT_ROUTE || CHAT_LEGACY_ROUTES.has(route)) return "chat";
  if (route.startsWith(`${CHAT_ROUTE}/`) || route.startsWith("chat/")) return "chat";
  if (route.startsWith("beat-")) return "detalhe";
  if (route.startsWith("playlist-")) return "playlist";
  if (route.startsWith("perfil-")) return "perfil-publico";
  if (route === COMMUNITY_LEGACY_ROUTE || route === COMMUNITY_ROUTE) return COMMUNITY_ROUTE;
  if (route.startsWith(`${COMMUNITY_LEGACY_ROUTE}-`) || route.startsWith(`${COMMUNITY_ROUTE}-`)) return COMMUNITY_ROUTE;
  const knownRoutes = new Set([
    "feed",
    "nexo-feed",
    "explorar",
    "favoritos",
    "compras",
    "chat",
    "biblioteca",
    "ia",
    "produtores",
    COMMUNITY_ROUTE,
    "perfil",
    "cadastrar",
    "configuracoes",
    "admin",
    "carrinho",
    "vendedor",
    "confirmar-email",
    "email-confirmed",
    "central-ansend",
    "servicos",
    "como-funciona",
    "central-legal",
    "termos-de-uso",
    "politica-de-privacidade",
    "politica-de-cookies",
    "termos-de-licenca-musical",
    "pagamentos-reembolsos",
    "direitos-autorais",
    "seguranca",
    "diretrizes-profissionais",
    "diretrizes-artistas",
    "suporte",
    "ferramentas",
    "ofertas",
    "musicas",
    "marketplace"
  ]);
  return knownRoutes.has(route) || routeTitles?.[route] ? route : "feed";
}

function chatConversationIdFromHash() {
  const route = (location.hash.replace("#", "") || "").split("?")[0];
  if (route.startsWith(`${CHAT_ROUTE}/`)) return safeDecode(route.slice(`${CHAT_ROUTE}/`.length));
  if (route.startsWith("chat/")) return safeDecode(route.slice("chat/".length));
  return "";
}

function navigateToChatConversation(conversationId = "") {
  const nextRoute = conversationId ? CHAT_ROUTES.conversation(conversationId) : CHAT_ROUTES.list();
  if (location.hash !== `#${nextRoute}`) {
    location.hash = nextRoute;
  } else {
    renderRoutePreservingAuthFocus(true);
  }
}

function PageTransition(container = appView, key = currentRoute()) {
  if (!container || prefersReducedMotion.matches) return;
  const transitionKey = String(key || currentRoute());
  const existingWrapper = container.querySelector(":scope > .section-transition");
  const previousKey = lastPageTransitionKey;
  lastPageTransitionKey = transitionKey;
  if (previousKey === transitionKey && existingWrapper?.dataset.transitionKey === transitionKey) return;

  const wrapper = document.createElement("div");
  wrapper.className = previousKey === transitionKey ? "section-transition section-transition--static" : "section-transition";
  wrapper.dataset.transitionKey = transitionKey;
  const content = document.createElement("div");
  content.className = "section-transition__content";
  while (container.firstChild) {
    content.appendChild(container.firstChild);
  }
  wrapper.appendChild(content);
  container.appendChild(wrapper);
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

  document.querySelectorAll(".playlist-row, .beat-row, .avatar-row, .genre-banner-track").forEach((row) => {
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

function clampScrollProgress(value) {
  return Math.max(0, Math.min(1, value));
}

function easeHomeScroll(value) {
  const progress = clampScrollProgress(value);
  return 1 - Math.pow(1 - progress, 3);
}

function buildHomeScrollText(section) {
  const title = section.querySelector("[data-scroll-text]");
  if (!title || title.dataset.built === "true") return;
  const text = title.dataset.scrollText || title.textContent.trim();
  const chars = Array.from(text);
  const center = (chars.length - 1) / 2;
  title.innerHTML = chars.map((char, index) => {
    const distance = index - center;
    const safeChar = char === " " ? "&nbsp;" : char;
    return `<span class="scroll-char" data-distance="${distance.toFixed(2)}">${safeChar}</span>`;
  }).join("");
  title.dataset.built = "true";
}

function updateHomeScrollAnimation() {
  homeScrollAnimationRaf = null;
  const sections = document.querySelectorAll(".scroll-kinetic-section");
  if (!sections.length) return;
  if (prefersReducedMotion.matches) {
    sections.forEach((section) => {
      section.querySelectorAll(".scroll-char, .scroll-kinetic-icon").forEach((item) => {
        item.style.transform = "";
        item.style.opacity = "";
        item.style.filter = "";
      });
    });
    return;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const progress = easeHomeScroll((viewportHeight - rect.top) / (viewportHeight + rect.height * 0.58));
    section.style.setProperty("--scroll-progress", progress.toFixed(3));

    section.querySelectorAll(".scroll-char").forEach((char, index) => {
      const distance = Number(char.dataset.distance || 0);
      const direction = distance === 0 ? 0 : Math.sign(distance);
      const spread = Math.min(1.85, Math.abs(distance) / 8);
      const x = (1 - progress) * direction * (52 + spread * 46);
      const y = (1 - progress) * Math.sin(index * 0.7) * 18;
      const rotate = (1 - progress) * direction * (8 + spread * 10);
      const blur = (1 - progress) * 3.8;
      char.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${(0.88 + progress * 0.12).toFixed(3)})`;
      char.style.opacity = (0.18 + progress * 0.82).toFixed(3);
      char.style.filter = `blur(${blur.toFixed(2)}px)`;
    });

    section.querySelectorAll(".scroll-kinetic-icon").forEach((icon, index) => {
      const side = index % 2 === 0 ? -1 : 1;
      const x = (1 - progress) * side * (42 + index * 8);
      const y = (1 - progress) * (26 + (index % 3) * 8);
      const rotate = (1 - progress) * side * (index + 1) * 3;
      icon.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${(0.92 + progress * 0.08).toFixed(3)})`;
      icon.style.opacity = (0.28 + progress * 0.72).toFixed(3);
    });
  });
}

function requestHomeScrollAnimationTick() {
  if (homeScrollAnimationRaf) return;
  homeScrollAnimationRaf = requestAnimationFrame(updateHomeScrollAnimation);
}

function setupHomeScrollAnimation() {
  document.querySelectorAll(".scroll-kinetic-section").forEach(buildHomeScrollText);
  requestHomeScrollAnimationTick();
}

function setupHomeParallax() {
  if (currentRouteFromHash() !== "feed") return;
  const homeGroups = [];
  const firstGroup = appView.querySelector(".nexo-blocks-container");
  if (firstGroup) {
    firstGroup.classList.add("home-parallax");
    homeGroups.push(firstGroup);
  }

  const tailSections = [
    appView.querySelector(".smart-combos-section"),
    appView.querySelector(".featured-professionals-section"),
    appView.querySelector(".recent-activity-section"),
  ].filter(Boolean);
  if (tailSections.length) {
    let tailGroup = tailSections[0].parentElement?.classList.contains("home-parallax")
      ? tailSections[0].parentElement
      : null;
    if (!tailGroup) {
      tailGroup = document.createElement("div");
      tailGroup.className = "home-parallax home-parallax--tail";
      tailSections[0].before(tailGroup);
      tailSections.forEach((section) => tailGroup.appendChild(section));
    }
    homeGroups.push(tailGroup);
  }

  homeGroups.forEach((group) => {
    [...group.querySelectorAll(":scope > .home-section")].forEach((section, index) => {
      section.classList.add("home-parallax__section");
      if (!section.querySelector(":scope > .home-parallax__content")) {
        const content = document.createElement("div");
        content.className = "home-parallax__content";
        while (section.firstChild) content.appendChild(section.firstChild);
        section.appendChild(content);
      }
      if (!section.querySelector(":scope > .home-parallax__layer")) {
        const layerTypes = index % 3 === 1 ? ["back", "fore"] : ["deep", "back"];
        layerTypes.forEach((type) => {
          const layer = document.createElement("div");
          layer.className = `home-parallax__layer home-parallax__layer--${type}`;
          layer.setAttribute("aria-hidden", "true");
          section.insertBefore(layer, section.firstChild);
        });
      }
    });
  });
}

window.addEventListener("scroll", requestHomeScrollAnimationTick, { passive: true });
window.addEventListener("resize", requestHomeScrollAnimationTick);
prefersReducedMotion.addEventListener?.("change", requestHomeScrollAnimationTick);

function setupScrollReveals() {
  if (revealObserver) revealObserver.disconnect();
  document.querySelectorAll(".reveal-section, .scroll-reveal, [data-reveal]").forEach((target) => {
    target.classList.remove("reveal-section", "scroll-reveal");
    target.classList.add("is-visible");
    target.style.removeProperty("--reveal-delay");
    target.style.removeProperty("opacity");
    target.style.removeProperty("visibility");
    target.style.removeProperty("transform");
    target.style.removeProperty("filter");
    target.style.removeProperty("clip-path");
  });
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
    heroPlay.dataset.id = topBeatOfDay.id;
  }
  const openPlaylist = document.querySelector(".open-playlist");
  if (openPlaylist) {
    openPlaylist.dataset.action = "playlist";
    openPlaylist.dataset.title = "Mainstreet Type Beats";
  }
  document.querySelectorAll("#trackList .track-row").forEach((row, index) => {
    const pool = marketplaceBeats();
    const item = pool[index % Math.max(1, pool.length)] || topBeatOfDay;
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
let sellerAuthInteractionAt = 0;
const routeTitles = {
  feed: ["Feed", "Sua seleção diária de playlists, beats e produtores."],
  explorar: ["Explorar", "Encontre novos sons por gênero, BPM ou produtor."],
  favoritos: ["Favoritos", "Tudo que você marcou para ouvir depois."],
  compras: ["Minhas compras", "Licenças e beats adquiridos na sua conta."],
  biblioteca: ["Biblioteca", "Playlists, históricos e itens salvos em um só lugar."],
  produtores: ["Produtores", "Conheça produtores verificados da comunidade ANSEND."],
  configuracoes: ["Configurações", "Personalize sua experiência na plataforma."],
  detalhe: ["Detalhe do beat", "Informações, licença e perfil do produtor."],
  carrinho: ["Carrinho", "Revise seus beats e finalize seu pedido."],
};
routeTitles.feed = ["Home", "Dashboard resumido com IA, recomendações e próximos passos."];
routeTitles["nexo-feed"] = ["Feed", "NEXO Feed vertical com beats, profissionais e soluções recomendadas."];
routeTitles.compras = ["Pedidos", "Histórico de pedidos, licenças e serviços contratados."];
routeTitles.chat = ["Bate-papo", "Mensagens diretas entre perfis da ANSEND."];
routeTitles.ia = ["NEXO IA", "Diagnóstico musical inteligente para adaptar sua jornada."];
routeTitles.produtores = ["Profissionais", "Beatmakers, designers, produtores, curadores e marketing musical."];
routeTitles.comunidade = [COMMUNITY_TITLE, COMMUNITY_SUBTITLE];
routeTitles.vendedor = ["Conta ANSEND", "Cadastre, entre e escolha a função da sua conta na plataforma."];
routeTitles.cadastrar = ["Lançar música", "Cadastre releases, capa, áudio e licenças para publicar no catálogo."];
routeTitles["confirmar-email"] = ["Confirme seu e-mail", "Abra o link enviado para ativar sua conta ANSEND."];
routeTitles["email-confirmed"] = ["E-mail confirmado", "Finalizando o acesso seguro da sua conta ANSEND."];
routeTitles.admin = ["Admin", "Gerencie perfis e contas teste da comunidade."];

routeTitles.perfil = ["Meu perfil", "Sua conta, catálogo e publicações na ANSEND."];
routeTitles.playlist = ["Playlist", "Pack selecionado com beats, referências e licenças."];
routeTitles["central-ansend"] = ["Central ANSEND", "Serviços, segurança, pagamentos, licenças, privacidade e uso da plataforma."];
routeTitles.servicos = ["Serviços", "Beatmakers, designers, produtores, curadores e marketing musical."];
routeTitles["como-funciona"] = ["Como funciona", "Da ideia ao lançamento com diagnóstico da NEXO IA e profissionais recomendados."];
routeTitles["central-legal"] = ["Central Legal", "Termos, políticas, licenças, pagamentos, direitos autorais e diretrizes."];
routeTitles["termos-de-uso"] = ["Termos de Uso", "Regras gerais para uso seguro e responsável da ANSEND."];
routeTitles["politica-de-privacidade"] = ["Política de Privacidade", "Como dados pessoais, navegação e dados enviados para a NEXO IA são tratados."];
routeTitles["politica-de-cookies"] = ["Política de Cookies", "Uso de cookies essenciais, preferências, analytics e marketing."];
routeTitles["termos-de-licenca-musical"] = ["Termos de Licença Musical", "Regras para beats, instrumentais, capas, artes e serviços contratados."];
routeTitles["pagamentos-reembolsos"] = ["Pagamentos e Reembolsos", "Pagamento protegido, cancelamentos, disputas e liberação de valores."];
routeTitles["direitos-autorais"] = ["Direitos Autorais", "Proteção de beats, samples, letras, capas, portfólios e materiais enviados."];
routeTitles.seguranca = ["Segurança na ANSEND", "Pagamento protegido, histórico, avaliações, suporte e mediação."];
routeTitles["diretrizes-profissionais"] = ["Diretrizes para Profissionais", "Boas práticas e regras para vender serviços dentro da ANSEND."];
routeTitles["diretrizes-artistas"] = ["Diretrizes para Artistas", "Boas práticas para contratar serviços e usar a NEXO IA com clareza."];
routeTitles.suporte = ["Suporte", "Ajuda para conta, pedidos, entregas, pagamentos, licenças e denúncias."];

const institutionalRoutes = new Set([
  "central-ansend",
  "servicos",
  "como-funciona",
  "central-legal",
  "termos-de-uso",
  "politica-de-privacidade",
  "politica-de-cookies",
  "termos-de-licenca-musical",
  "pagamentos-reembolsos",
  "direitos-autorais",
  "seguranca",
  "diretrizes-profissionais",
  "diretrizes-artistas",
  "suporte",
]);

const legalPages = {
  "central-ansend": {
    eyebrow: "Central ANSEND",
    title: "Central ANSEND",
    intro: "Encontre informações sobre serviços, segurança, pagamentos, licenças, privacidade e uso da plataforma.",
    cards: [
      ["Como funciona a ANSEND", "Ideia, diagnóstico da NEXO IA, recomendação de profissionais, contratação, entrega e avaliação."],
      ["Serviços disponíveis", "Categorias principais da plataforma: beatmakers, designers, produtores musicais, curadores e marketing musical."],
      ["Termos e políticas", "Documentos legais e regras de uso centralizados em uma área clara."],
      ["Segurança e confiança", "Pagamento protegido, avaliações, suporte, mediação e histórico de pedidos."],
      ["Suporte", "Ajuda para problemas com conta, pedido, entrega, pagamento ou licença."],
    ],
  },
  servicos: {
    eyebrow: "Serviços",
    title: "O que pode ser contratado na ANSEND",
    intro: "A plataforma organiza serviços musicais por categoria para conectar artistas aos profissionais certos.",
    sections: [
      ["Beatmakers", "Vendam beats, instrumentais, licenças musicais, produções personalizadas, beat lease, beat exclusivo, type beat, instrumental sob encomenda e pacotes de beats."],
      ["Designers", "Criam capas de single, capas de álbum, identidade visual de lançamento, artes para redes sociais, banners e materiais promocionais."],
      ["Produtores Musicais", "Atuam com produção, direção musical, mixagem, masterização, gravação guiada, direção vocal e finalização de faixa."],
      ["Curadores", "Ajudam no posicionamento em playlists, canais, blogs, páginas, comunidades musicais, feedback profissional e análise de lançamento."],
      ["Marketing Musical", "Planejam lançamento, tráfego, divulgação em redes sociais, estratégia de conteúdo, posicionamento artístico e análise de público."],
    ],
  },
  "como-funciona": {
    eyebrow: "Fluxo",
    title: "Como funciona a ANSEND",
    intro: "O usuário entra com uma ideia, letra, demo, música pronta, imagem, objetivo ou necessidade. A NEXO IA transforma isso em um caminho de execução.",
    steps: [
      ["1", "O artista entra com uma ideia", "Exemplos: música pronta para lançar, letra precisando de beat, single para divulgar, capa profissional ou lançamento completo."],
      ["2", "A NEXO IA analisa o objetivo", "A IA identifica etapas como produção, beat, mixagem, masterização, capa, curadoria, marketing, divulgação e combo ideal."],
      ["3", "A plataforma recomenda profissionais", "A ANSEND recomenda profissionais compatíveis com estilo musical, orçamento, objetivo e tipo de serviço."],
      ["4", "O usuário contrata com segurança", "A contratação fica registrada na plataforma, com pagamento protegido, histórico de pedido e suporte."],
      ["5", "O profissional entrega o serviço", "A entrega acontece com prazo, descrição, arquivos e revisões combinadas."],
      ["6", "O usuário avalia", "Após a entrega, o artista avalia o profissional e fortalece a reputação dentro da ANSEND."],
    ],
  },
  "central-legal": {
    eyebrow: "Legal",
    title: "Central Legal",
    intro: "Documentos jurídicos e regulatórios reunidos de forma clara, sem parecer burocrático.",
    cards: [
      ["Termos de Uso", "Regras gerais para utilização da ANSEND."],
      ["Política de Privacidade", "Tratamento de dados pessoais, conta, navegação e NEXO IA."],
      ["Política de Cookies", "Cookies essenciais, preferências, analytics e tecnologias semelhantes."],
      ["Termos de Licença Musical", "Beats, licenças, serviços personalizados, exclusividade e direitos de uso."],
      ["Pagamentos e Reembolsos", "Pagamento protegido, taxas, cancelamentos, disputas e reembolsos."],
      ["Direitos Autorais", "Responsabilidade sobre beats, samples, capas, letras, demos, imagens e portfólios."],
      ["Diretrizes para Profissionais", "Regras para quem vende serviços dentro da ANSEND."],
      ["Diretrizes para Artistas", "Orientações para quem contrata serviços dentro da ANSEND."],
    ],
  },
  "termos-de-uso": {
    eyebrow: "Termos",
    title: "Termos de Uso",
    intro: "A ANSEND é uma plataforma digital que conecta artistas, criadores e profissionais da música, facilitando contratação de serviços musicais, recomendações por inteligência artificial, organização de projetos e intermediação de pagamentos.",
    bullets: ["O que é a ANSEND", "Quem pode usar", "Cadastro de conta", "Conta de artista", "Conta de profissional", "Uso da NEXO IA", "Contratação de serviços", "Pagamentos", "Entregas", "Avaliações", "Comunicação entre usuários", "Condutas proibidas", "Suspensão ou remoção de conta", "Limitação de responsabilidade", "Atualizações dos termos", "Canal de suporte"],
    note: "Ao utilizar a ANSEND, o usuário concorda em usar a plataforma de forma ética, segura e responsável, respeitando direitos de usuários, profissionais, artistas e terceiros.",
  },
  "politica-de-privacidade": {
    eyebrow: "Privacidade",
    title: "Política de Privacidade",
    intro: "A ANSEND coleta, utiliza, armazena e protege dados para operar a plataforma, melhorar recomendações e apoiar contratações seguras.",
    sections: [
      ["Dados coletados", "Nome, e-mail, telefone, foto de perfil, tipo de conta, informações de cadastro, pagamento, histórico de pedidos, mensagens, briefings, avaliações, preferências, dados técnicos e dados enviados para a NEXO IA."],
      ["Dados enviados para a NEXO IA", "Ideias musicais, letras, demos, músicas prontas, objetivos de lançamento, referências visuais, briefings e preferências musicais."],
      ["Direitos do usuário", "Solicitar acesso, corrigir dados, excluir conta, remover informações, alterar preferências e entrar em contato com suporte."],
    ],
  },
  "politica-de-cookies": {
    eyebrow: "Cookies",
    title: "Política de Cookies",
    intro: "A ANSEND utiliza cookies e tecnologias semelhantes para manter a plataforma funcionando, lembrar preferências e analisar desempenho.",
    sections: [
      ["Cookies essenciais", "Login, segurança, sessão e funcionamento básico."],
      ["Cookies de preferência", "Idioma, tema, região e preferências da conta."],
      ["Cookies de analytics", "Uso da plataforma, páginas acessadas e melhorias de experiência."],
      ["Cookies de marketing", "Campanhas, anúncios, remarketing e mensuração de tráfego quando ferramentas como Meta Pixel, Google Analytics ou TikTok Pixel forem utilizadas."],
    ],
  },
  "termos-de-licenca-musical": {
    eyebrow: "Licenças",
    title: "Termos de Licença Musical",
    intro: "Define regras para uso de beats, instrumentais, produções, capas, artes e serviços musicais contratados.",
    sections: [
      ["Licença básica", "Uso limitado do beat ou material contratado, com limites de distribuição, monetização, visualizações, streams ou plataformas definidos pelo profissional."],
      ["Licença premium", "Uso mais amplo, podendo incluir monetização, distribuição em plataformas digitais e maior volume de uso."],
      ["Licença exclusiva", "Direitos mais amplos quando disponível. Após venda exclusiva, o profissional não deve vender o mesmo beat como exclusivo para outros usuários."],
      ["Serviço personalizado", "Beat sob encomenda, capa, identidade visual, mixagem, masterização ou campanha com prazo, entregáveis, revisões e direitos definidos no pedido."],
      ["Responsabilidades", "O profissional garante que possui direitos sobre o conteúdo. O artista respeita os limites da licença adquirida."],
    ],
  },
  "pagamentos-reembolsos": {
    eyebrow: "Pagamentos",
    title: "Pagamentos, Reembolsos e Cancelamentos",
    intro: "A ANSEND pode atuar como intermediadora, mantendo registro da contratação e oferecendo mais segurança para artista e profissional.",
    sections: [
      ["Liberação do pagamento", "Pode ocorrer após entrega do serviço, aprovação do artista, fim do prazo de revisão ou encerramento do pedido."],
      ["Reembolso", "Pode ser analisado em serviço não entregue, entrega fora do combinado, problema comprovado ou cancelamento antes do início."],
      ["Casos sem reembolso", "Serviço aprovado, arquivo digital entregue e usado, mudança de ideia após início, pedido fora do escopo ou falta de briefing."],
      ["Disputas", "A ANSEND pode analisar histórico do pedido, mensagens, briefing, prazo, arquivos entregues e demais informações disponíveis."],
    ],
  },
  "direitos-autorais": {
    eyebrow: "Direitos",
    title: "Direitos Autorais e Propriedade Intelectual",
    intro: "O usuário é responsável por garantir que possui os direitos necessários sobre qualquer conteúdo enviado, anunciado, vendido, licenciado ou entregue.",
    bullets: ["Beats", "Samples", "Loops", "Letras", "Demos", "Capas", "Logos", "Artes", "Imagens", "Portfólios", "Campanhas", "Materiais promocionais"],
    note: "É proibido vender conteúdo plagiado, usar samples não autorizados, copiar artes, publicar conteúdo sem permissão, fingir autoria ou usar imagem de terceiros sem autorização. A ANSEND deve possuir canal para denúncias.",
  },
  seguranca: {
    eyebrow: "Confiança",
    title: "Segurança na ANSEND",
    intro: "Comprar e vender dentro da ANSEND ajuda a proteger artistas e profissionais com histórico, reputação, avaliações e mais segurança em cada contratação.",
    bullets: ["Pagamento protegido", "Histórico de pedidos", "Avaliações reais", "Profissionais verificados", "Suporte", "Mediação", "Registro de entrega", "Reputação dentro da plataforma"],
  },
  "diretrizes-profissionais": {
    eyebrow: "Profissionais",
    title: "Diretrizes para Profissionais",
    intro: "Regras para quem vende serviços dentro da ANSEND.",
    bullets: ["Cadastrar informações verdadeiras", "Publicar portfólio próprio", "Definir preços com clareza", "Informar prazos reais", "Entregar conforme combinado", "Responder clientes com profissionalismo", "Respeitar direitos autorais", "Não vender conteúdo sem autorização", "Não tentar aplicar golpes", "Não manipular avaliações"],
    note: "Profissionais ganham reputação, avaliações, histórico, visibilidade, melhor posicionamento nas recomendações da NEXO IA e mais segurança no recebimento.",
  },
  "diretrizes-artistas": {
    eyebrow: "Artistas",
    title: "Diretrizes para Artistas",
    intro: "Orientações para contratar serviços dentro da ANSEND com clareza.",
    bullets: ["Criar briefings claros", "Informar referências", "Respeitar o prazo do profissional", "Solicitar revisões dentro do escopo", "Aprovar entregas corretamente", "Avaliar com honestidade", "Evitar negociações inseguras fora da plataforma"],
    note: "A NEXO IA ajuda a entender o próximo passo da música, criar plano de lançamento, encontrar profissionais, montar combos, estimar orçamento e organizar prioridades.",
  },
  suporte: {
    eyebrow: "Suporte",
    title: "Suporte ANSEND",
    intro: "Área para resolver dúvidas e problemas com conta, pedido, entrega, pagamento, licença, NEXO IA ou denúncias.",
    cards: [
      ["Pagamento", "Problemas com pagamento, reembolso, taxa ou checkout."],
      ["Entrega", "Problemas com prazo, arquivos, revisões ou aprovação."],
      ["Profissional ou artista", "Conflitos, comunicação, avaliações e mediação."],
      ["Licenças", "Dúvidas sobre uso, limites, exclusividade e arquivos."],
      ["NEXO IA", "Dúvidas sobre diagnóstico, recomendações e mapa de lançamento."],
      ["Denúncias", "Conteúdo irregular, plágio, direitos autorais ou uso indevido de imagem."],
    ],
    note: "A Central de Suporte deve conter busca, cards de categorias, perguntas rápidas, formulário de contato, status do atendimento e link para abrir chamado.",
  },
};

function persistState() {
  localStorage.setItem("ansend-favorites", JSON.stringify([...appState.favorites]));
  localStorage.setItem("ansend-purchases", JSON.stringify(appState.purchases));
  localStorage.setItem("ansend-orders", JSON.stringify(appState.orders));
  localStorage.setItem("ansend-contracts", JSON.stringify(appState.contracts));
  localStorage.setItem("ansend-player-loop", JSON.stringify(appState.player.loop));
  localStorage.setItem("ansend-player-shuffle", JSON.stringify(appState.player.shuffle));
  localStorage.setItem("ansend-player-volume", String(appState.player.volume));
  localStorage.setItem("ansend-player-speed", String(appState.player.speed));
  localStorage.setItem("ansend-player-pitch", String(appState.player.pitch));
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
      budget: "R$ 600 estimado",
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
  const budget = wantsMarketing ? "R$ 800 + campanha" : wantsRelease ? "R$ 1.200 lançamento" : "R$ 500 inicial";
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
  const license = licensePlans[plan.recommendedLicense] || licensePlans.premium;
  const firstPro = plan.recommendedProfessionals?.[0];
  const firstBeat = plan.recommendedBeats?.[0];
  output.classList.add("is-generated");
  output.innerHTML = `<small>Plano recomendado</small>
    <strong>${plan.genre} / ${plan.budget}</strong>
    <ul>${plan.match.map((item) => `<li>${item}</li>`).join("")}</ul>
    <em>Combo sugerido: ${plan.combo}</em>
    <div class="ai-plan-actions">
      ${firstPro ? `<button type="button" data-action="producer" data-title="${firstPro.name}"><i data-lucide="user-check"></i>${firstPro.name}</button>` : ""}
      ${firstBeat ? `<button type="button" data-action="open-beat" data-id="${firstBeat.id}"><i data-lucide="disc-3"></i>${firstBeat.title}</button>` : ""}
      <button type="button" data-action="ai-next-route" data-route="${plan.nextAction?.route || "produtores"}"><i data-lucide="arrow-right"></i>${plan.nextAction?.label || "Abrir recomendacao"}</button>
    </div>
    <small class="ai-source">Fonte: ${plan.source === "fallback-local" ? "NEXO local" : plan.source} / ${license.label}</small>`;
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
    output.innerHTML = dashboard.compactRecommendation
      ? `<button class="nexo-diagnosis-button" type="button" data-route="ia">Ver diagnostico</button>`
      : `<small>NEXO recomenda</small>
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
function stopHeroMorphTitle() {
  if (heroTypewriterTimer) clearTimeout(heroTypewriterTimer);
  heroTypewriterTimer = null;
  heroTypewriterToken++;
}

function runHeroTypewriter(textElement, text) {
  stopHeroMorphTitle();
  if (!textElement) return;
  const cursor = textElement.parentElement?.querySelector(".hero-typewriter-cursor");
  cursor?.classList.remove("is-finished");
  if (prefersReducedMotion.matches) {
    textElement.textContent = text;
    cursor?.classList.add("is-finished");
    return;
  }

  const token = heroTypewriterToken;
  const speed = 54;
  let index = 0;
  textElement.textContent = "";

  const typeNext = () => {
    if (token !== heroTypewriterToken) return;
    textElement.textContent = text.slice(0, index);
    if (index <= text.length) {
      index++;
      heroTypewriterTimer = window.setTimeout(typeNext, speed);
    } else {
      cursor?.classList.add("is-finished");
    }
  };

  typeNext();
}

function animateHeadlineReveal(titleElement, line1, line2) {
  if (!titleElement) return;
  const nextKey = `${appLocale.current}|${line1}|${line2}`;
  const existingText = titleElement.querySelector(".hero-morph-text");

  if (titleElement.dataset.revealKey !== nextKey || !existingText) {
    titleElement.dataset.revealKey = nextKey;
    titleElement.classList.add("hero-morph-title");
    titleElement.classList.remove("is-glitching");
    titleElement.innerHTML = `
      <span class="headline-reveal-line headline-reveal-brand hero-morph-brand">${line1}</span>
      <strong class="headline-reveal-line headline-reveal-main hero-morph-main">
        <span class="hero-morph-text"></span>
      </strong>
    `;
    runHeroTypewriter(titleElement.querySelector(".hero-morph-text"), line2);
    requestAnimationFrame(() => titleElement.classList.add("is-ready"));
  }
}

function applyRoleDashboard() {
  const dashboard = roleDashboard();
  const role = activeRoleKey();
  const hero = document.querySelector(".ai-hero");
  if (!hero) {
    stopHeroMorphTitle();
    return;
  }
  hero.classList.toggle("is-beatmaker-hero", role === "beatmaker");
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
  const quickTitle = document.querySelector("#quickActionsTitle");
  const quickSubtitle = document.querySelector(".quick-actions-section .section-head p");

  if (kicker) kicker.textContent = role === "beatmaker" ? "NEXO IA PARA BEATMAKERS" : "NEXO IA";
  if (title) animateHeadlineReveal(title, heroHeadline[0], heroHeadline[1]);
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
  if (quickTitle && role === "beatmaker") quickTitle.innerHTML = `<i data-lucide="zap"></i>Acoes rapidas`;
  if (quickSubtitle && role === "beatmaker") quickSubtitle.textContent = "Atalhos para vender melhor sem baguncar sua rotina.";
  const mapEyebrow = hero.querySelector(".ai-map-card > span");
  const mapSubtitle = hero.querySelector(".ai-map-card > p");
  if (mapEyebrow) mapEyebrow.textContent = dashboard.recommendationTitle || "MAPA DO LANÇAMENTO";
  if (mapTitle) mapTitle.textContent = dashboard.compactRecommendation ? "Diagnostico rapido" : "Diagnostico Musical IA";
  if (mapSubtitle) mapSubtitle.textContent = dashboard.recommendationSubtitle || "Conte sua ideia e receba uma ordem clara de execucao.";
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
  if (appState.authUser) {
    localStorage.removeItem("ansend-local-catalog");
    return;
  }
  // Local preview only; authenticated accounts use Supabase as the source of truth.
  const localItems = appState.ownedCatalogItems.filter(item => String(item.id).startsWith("local-") || !appState.authUser);
  if (localItems.length > 0) {
    try {
      localStorage.setItem("ansend-local-catalog", JSON.stringify(localItems));
    } catch (e) {
      console.warn("Could not persist local catalog items", e);
    }
  } else {
    localStorage.removeItem("ansend-local-catalog");
  }
}

function catalogOwnerId() {
  return appState.authUser?.id || appState.profile?.id || "preview";
}

function visibleCatalogItems() {
  return appState.ownedCatalogItems;
}

function publishedCatalogItems() {
  return appState.publicCatalogItems;
}

function syncCatalogCompatibilityState() {
  // Kept as a transition hook for callers; public and private data remain separate.
}

function profileForUserId(userId) {
  if (!userId) return null;
  if (appState.profile?.id === userId) return appState.profile;
  return appState.publicProfiles.find((profile) => profile.id === userId) || null;
}

function catalogItemToBeat(item) {
  const ownerProfile = profileForUserId(item.user_id);
  const producerName = item.producer_name || item.artist_name || ownerProfile?.display_name || ownerProfile?.artistic_name || ownerProfile?.full_name || "ANSEND";
  const priceValue = Number(item.price || 0);
  const price = priceValue
    ? priceValue.toLocaleString(appLocale.current === "pt-BR" ? "pt-BR" : "en-US", {
        style: "currency",
        currency: appLocale.current === "pt-BR" ? "BRL" : "USD",
      })
    : (appLocale.current === "pt-BR" ? "Sob consulta" : "On request");
  const tags = [
    item.genre || (item.kind === "musica" ? "Musica" : "Beat"),
    item.subgenre || item.mood || (item.bpm ? `${item.bpm} BPM` : item.license_type || "Licenca"),
  ].filter(Boolean);
  return {
    id: String(item.id),
    user_id: item.user_id || null,
    owner_username: ownerProfile?.username || ownerProfile?.handle || item.profile_username || item.username || item.owner_username || "",
    title: item.title || "Sem titulo",
    producer: producerName,
    cover: item.cover_url || item.youtube_thumbnail_url || item.coverUrl || item.artworkUrl || item.image || item.thumbnail || item.cover || "assets/ansend-logo-square.png",
    audio: item.audio_url || "",
    audio_url: item.audio_url || "",
    audio_path: item.audio_path || "",
    source_type: item.source_type || (item.youtube_video_id ? "youtube" : "upload"),
    youtube_url: item.youtube_url || "",
    youtube_video_id: item.youtube_video_id || "",
    youtube_embed_url: item.youtube_embed_url || "",
    youtube_thumbnail_url: item.youtube_thumbnail_url || "",
    youtube_title: item.youtube_title || "",
    youtube_channel_title: item.youtube_channel_title || "",
    catalog_batch_id: item.catalog_batch_id || null,
    tags,
    price,
    badge: item.status === "published" ? "" : "Rascunho",
    source: "catalog",
    raw: item,
  };
}

function dedupeById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function extractYouTubeVideoId(input = "") {
  const raw = String(input || "").trim();
  if (!raw || /<|>|iframe|script|javascript:/i.test(raw)) return null;
  let url;
  try {
    url = new URL(raw);
  } catch (_error) {
    return null;
  }
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  const allowedHosts = new Set(["youtube.com", "m.youtube.com", "music.youtube.com", "youtu.be", "youtube-nocookie.com"]);
  if (!allowedHosts.has(host)) return null;
  if (host === "youtu.be") return sanitizeYouTubeId(url.pathname.slice(1).split("/")[0]);
  if (url.pathname.startsWith("/watch")) return sanitizeYouTubeId(url.searchParams.get("v"));
  if (url.pathname.startsWith("/shorts/")) return sanitizeYouTubeId(url.pathname.split("/")[2]);
  if (url.pathname.startsWith("/embed/")) return sanitizeYouTubeId(url.pathname.split("/")[2]);
  return null;
}

function sanitizeYouTubeId(value = "") {
  const id = String(value || "").trim();
  return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
}

function youtubeMetadataFromUrl(url = "") {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  return {
    youtube_url: `https://www.youtube.com/watch?v=${videoId}`,
    youtube_video_id: videoId,
    youtube_embed_url: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`,
    youtube_thumbnail_url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  };
}

function titleFromFileName(name = "") {
  return String(name || "Beat ANSEND")
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b([a-z])/g, (match) => match.toUpperCase()) || "Beat ANSEND";
}

function isYoutubeBeat(item = {}) {
  return (item.source_type || item.raw?.source_type) === "youtube" || Boolean(item.youtube_video_id || item.raw?.youtube_video_id);
}

function playerSourceType(item = {}) {
  if (isYoutubeBeat(item)) return "youtube";
  return "upload";
}

function audioUrlForBeat(item = {}) {
  return item.audio_url || item.audio || item.audioUrl || item.raw?.audio_url || item.raw?.audioUrl || "";
}

function normalizePlayerBeat(item = {}) {
  if (!item) return null;
  const sourceType = playerSourceType(item);
  const videoId = sourceType === "youtube" ? youtubeVideoIdForBeat(item) : "";
  const audioUrl = sourceType === "upload" ? audioUrlForBeat(item) : "";
  return {
    ...item,
    id: item.id ? String(item.id) : "",
    title: item.title || item.youtube_title || item.raw?.youtube_title || "Beat ANSEND",
    producer: item.producer || item.artist || item.artist_name || item.raw?.producer_name || item.raw?.artist_name || "ANSEND",
    cover: item.cover || item.cover_url || item.youtube_thumbnail_url || item.raw?.cover_url || item.raw?.youtube_thumbnail_url || IMAGE_FALLBACK_SRC,
    tags: Array.isArray(item.tags) ? item.tags : [item.genre || item.raw?.genre || "Beat", item.bpm ? `${item.bpm} BPM` : item.raw?.bpm ? `${item.raw.bpm} BPM` : "153 BPM"],
    source_type: sourceType,
    audio: audioUrl,
    audio_url: audioUrl,
    youtube_video_id: videoId || "",
    youtube_url: item.youtube_url || item.youtubeUrl || item.raw?.youtube_url || item.raw?.youtubeUrl || (videoId ? `https://www.youtube.com/watch?v=${videoId}` : ""),
    youtube_embed_url: item.youtube_embed_url || item.raw?.youtube_embed_url || (videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1` : ""),
    youtube_thumbnail_url: item.youtube_thumbnail_url || item.raw?.youtube_thumbnail_url || (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : ""),
  };
}

function isAdminUser(user = appState.authUser) {
  return Boolean(user?.email && String(user.email).toLowerCase() === ANSEND_ADMIN_EMAIL);
}

function adminBeatSource(item = {}) {
  const source = item.source_table || item.raw?.source_table || item.source || "";
  if (source === "beats" || source === "catalog_items") return source;
  if (item.raw?.kind || item.kind) return "catalog_items";
  return "beats";
}

function adminDeleteButton(type, item = {}, extraClass = "") {
  if (!appState.isAdmin || !isAdminUser()) return "";
  const id = item.raw?.id || item.id;
  if (!id || id === topBeatOfDay.id || id === "release-preview") return "";
  const title = item.title || item.raw?.title || (type === "profile" ? "perfil" : "beat");
  const source = type === "beat" ? adminBeatSource(item) : "";
  const action = type === "profile" ? "admin-delete-profile" : "admin-delete-beat";
  const sourceAttr = source ? ` data-source-table="${htmlEscape(source)}"` : "";
  const className = type === "profile" ? "professional-card-admin-delete" : `admin-delete-button admin-delete-beat ${extraClass}`.trim();
  return `<button type="button" class="${className}" data-action="${action}" data-id="${htmlEscape(String(id))}"${sourceAttr} aria-label="Remover ${htmlEscape(title)}" title="Remover ${type === "profile" ? "perfil" : "beat"}">
    <i data-lucide="x"></i>
  </button>`;
}

function marketplaceBeats() {
  return publishedCatalogItems().map(catalogItemToBeat);
}

function userCatalogBeats() {
  return visibleCatalogItems().map(catalogItemToBeat);
}

function searchableBeatPool() {
  const realItems = dedupeById([...marketplaceBeats(), ...userCatalogBeats()]);
  return realItems.length ? realItems : [topBeatOfDay];
}

function roleToProfessionalCategory(role) {
  const map = {
    beatmaker: "beatmakers",
    produtor: "produtores",
    artista: "artistas",
    designer: "designers",
    curador: "curadores",
    marketing: "marketing",
  };
  return map[role] || "artistas";
}

function profileToProfessional(profile = activeProfile()) {
  if (!profile?.id || profile.is_public === false) return null;
  const accountRole = profile.account_role || profile.role || "artista";
  const styles = asArray(profile.music_styles || profile.styles).filter(Boolean);
  return {
    id: profile.id,
    username: sanitizeHandle(profile.username || profile.handle || ""),
    name: profile.display_name || profile.artistic_name || profile.full_name || "Profissional ANSEND",
    role: accountRoleLabel(accountRole),
    category: roleToProfessionalCategory(accountRole),
    city: profile.location || "",
    avatar: profile.avatar_url || profile.avatar,
    avatar_url: profile.avatar_url || profile.avatar || "",
    banner: profile.banner_url || profile.cover_url || profile.banner || "",
    cover_url: profile.banner_url || profile.cover_url || profile.banner || "",
    banner_position_x: profile.banner_position_x,
    banner_position_y: profile.banner_position_y,
    avatar_position_x: profile.avatar_position_x,
    avatar_position_y: profile.avatar_position_y,
    banner_scale: profile.banner_scale,
    avatar_scale: profile.avatar_scale,
    services_count: profile.services_count || 0,
    beats_count: appState.publicCatalogItems ? appState.publicCatalogItems.filter(item => item.user_id === profile.id).length : 0,
    views_count: profile.views_count || 0,
    rating: "",
    jobs: null,
    price: "",
    specialty: profile.bio || profile.headline || "",
    tags: styles.slice(0, 4),
    response: "",
  };
}

function activeProfessionalProfiles() {
  return appState.publicProfiles.map((profile) => profileToProfessional(profile)).filter(Boolean);
}

async function loadPublicPlatformData() {
  if (!supabaseClient) return;
  const [profiles, catalogItems, beats] = await Promise.all([
    getPublicProfiles(),
    getPublishedCatalogItems(),
    getPublishedBeats(),
  ]);
  appState.publicProfiles = profiles;
  appState.publicCatalogItems = [
    ...catalogItems.map((item) => ({ ...item, source_table: "catalog_items" })),
    ...beats.map((item) => ({ ...item, source_table: "beats" })),
  ].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  syncCatalogCompatibilityState();
  scheduleContentEmbeddingSync([
    ...profiles.map((item) => ({ targetType: "professional", targetId: item.id, item, updatedAt: item.updated_at, createdAt: item.created_at })),
    ...appState.publicCatalogItems.map((item) => ({ targetType: "beat", targetId: item.id, item, updatedAt: item.updated_at, createdAt: item.created_at })),
  ]);
  await loadPersonalizedRecommendations();
}

async function loadOwnedCatalogItems() {
  if (!supabaseClient || !appState.authUser) {
    let localItems = [];
    try {
      const stored = localStorage.getItem("ansend-local-catalog");
      if (stored) localItems = JSON.parse(stored) || [];
    } catch (e) { /* ignore */ }
    appState.ownedCatalogItems = dedupeById(localItems);
    syncCatalogCompatibilityState();
    return;
  }
  const [catalogItems, beats] = await Promise.all([
    getCatalogItemsByUserId(appState.authUser.id),
    getBeatsByUserId(appState.authUser.id),
  ]);
  appState.ownedCatalogItems = dedupeById([
    ...catalogItems.map((item) => ({ ...item, source_table: "catalog_items" })),
    ...beats.map((item) => ({ ...item, source_table: "beats" })),
  ])
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  syncCatalogCompatibilityState();
}

async function loadCatalogItems() {
  await Promise.all([loadPublicPlatformData(), loadOwnedCatalogItems()]);
}

async function getPublicProfiles() {
  if (!supabaseClient) return [];
  const { data, error } = await supabaseClient
    .from("public_profiles")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) {
    console.error("Error loading public profiles", error);
    return [];
  }
  return data || [];
}

function hasMissingColumnError(error, column) {
  return new RegExp(`\\b${column}\\b|schema cache|column`, "i").test(error?.message || "");
}

async function getPublishedRows(table) {
  if (!supabaseClient) return [];
  let result = await supabaseClient
    .from(table)
    .select("*")
    .eq("status", "published")
    .eq("is_public", true)
    .order("created_at", { ascending: false });
  if (result.error && hasMissingColumnError(result.error, "is_public")) {
    result = await supabaseClient
      .from(table)
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });
  }
  if (result.error) {
    console.error(`Error loading public ${table}`, result.error);
    return [];
  }
  return result.data || [];
}

function getPublishedCatalogItems() {
  return getPublishedRows("catalog_items");
}

function getPublishedBeats() {
  return getPublishedRows("beats");
}

async function getRowsByUserId(table, userId) {
  if (!supabaseClient || !userId) return [];
  const { data, error } = await supabaseClient
    .from(table)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error(`Error loading owned ${table}`, error);
    return [];
  }
  return data || [];
}

function getCatalogItemsByUserId(userId) {
  return getRowsByUserId("catalog_items", userId);
}

function getBeatsByUserId(userId) {
  return getRowsByUserId("beats", userId);
}

function publicCatalogPayload(payload) {
  return {
    ...payload,
    is_public: payload.status === "published",
  };
}

async function insertCatalogItem(payload) {
  const publicPayload = publicCatalogPayload({ ...payload, user_id: appState.authUser.id });
  let { data, error } = await supabaseClient
    .from("catalog_items")
    .insert(publicPayload)
    .select()
    .single();
  if (error && hasMissingColumnError(error, "is_public")) {
    const { is_public, ...legacyPayload } = publicPayload;
    ({ data, error } = await supabaseClient
      .from("catalog_items")
      .insert(legacyPayload)
      .select()
      .single());
  }
  return { data, error };
}

async function publishBeat(payload) {
  const publicPayload = publicCatalogPayload({ ...payload, user_id: appState.authUser.id });
  let { data, error } = await supabaseClient
    .from("beats")
    .upsert(publicPayload)
    .select()
    .single();
  if (error && hasMissingColumnError(error, "is_public")) {
    const { is_public, ...legacyPayload } = publicPayload;
    ({ data, error } = await supabaseClient
      .from("beats")
      .upsert(legacyPayload)
      .select()
      .single());
  }
  if (error && /source_type|catalog_batch_id|import_source|import_status|original_file_name|sort_order|youtube_|schema cache|column/i.test(error.message || "")) {
    const {
      source_type,
      catalog_batch_id,
      import_source,
      import_status,
      original_file_name,
      sort_order,
      youtube_url,
      youtube_video_id,
      youtube_embed_url,
      youtube_thumbnail_url,
      youtube_title,
      youtube_channel_title,
      ...legacyPayload
    } = publicPayload;
    ({ data, error } = await supabaseClient
      .from("beats")
      .upsert(legacyPayload)
      .select()
      .single());
  }
  return { data, error };
}

const hiringCategories = [
  ["todos", "Todos"],
  ["duvidas", "Duvidas"],
  ["contratacoes", "Pedidos profissionais"],
  ["oportunidades", "Oportunidades"],
  ["beats", "Beats"],
  ["mix_master", "Mix/Master"],
  ["divulgacao", "Divulgacao"],
  ["design", "Design"],
  ["networking", "Networking"],
  ["outro", "Outro"],
];
const hiringDeadlines = [["hoje", "Hoje"], ["24h", "24h"], ["48h", "48h"], ["esta_semana", "Esta semana"], ["sem_urgencia", "Sem urgencia"], ["data_personalizada", "Data personalizada"]];
const hiringWorkModes = { remote: "Remoto", onsite: "Presencial", hybrid: "Hibrido" };
const hiringStatusLabels = { open: "Aberta", negotiating: "Em negociacao", hired: "Contratada", completed: "Finalizada", cancelled: "Cancelada" };
const hiringActionTables = { like: "hiring_likes", save: "hiring_saves", repost: "hiring_reposts" };
const HIRING_CACHE_TTL = 45000;
const HIRING_POST_LIMIT = 24;
const HIRING_POST_SELECT = "id,user_id,title,description,category,budget_amount,budget_type,currency,deadline_type,work_mode,status,visibility,reference_links,attachments,created_at,updated_at";
const HIRING_PROFILE_SELECT = "id,display_name,username,full_name,artistic_name,account_role,bio,avatar_url,banner_url,banner_position_x,banner_position_y,avatar_position_x,avatar_position_y,banner_scale,avatar_scale,music_styles,is_public,updated_at,created_at";

function perfEnabled() {
  try {
    return location.hostname === "localhost" || location.hostname === "127.0.0.1" || localStorage.getItem("ansendPerf") === "1";
  } catch {
    return false;
  }
}

function perfStart(label) {
  if (!perfEnabled()) return () => {};
  const mark = `ansend:${label}:${Math.random().toString(36).slice(2)}`;
  performance.mark(mark);
  return () => {
    const measure = `${mark}:done`;
    performance.measure(measure, mark);
    const entry = performance.getEntriesByName(measure).pop();
    console.info(`[PERF] ${label}: ${Math.round(entry?.duration || 0)}ms`);
    performance.clearMarks(mark);
    performance.clearMeasures(measure);
  };
}

function hiringCacheKey(detailId = hiringDetailIdFromHash()) {
  const filters = appState.hiring.filters || {};
  return [
    "community",
    detailId ? `detail:${detailId}` : `tab:${appState.hiring.activeTab}`,
    `category:${filters.category || "todos"}`,
    `deadline:${filters.deadline || "todos"}`,
    `status:${filters.status || "todos"}`,
    `work:${filters.workMode || "todos"}`,
    `budget:${filters.budget || ""}`,
    `user:${appState.authUser?.id || "anon"}`,
  ].join("|");
}

function readHiringCache(key = hiringCacheKey()) {
  const entry = appState.hiring.cache?.[key];
  if (!entry) return null;
  return Date.now() - entry.updatedAt < HIRING_CACHE_TTL ? entry : null;
}

function writeHiringCache(key, data) {
  appState.hiring.cache[key] = { ...data, updatedAt: Date.now() };
}

function invalidateHiringCache() {
  appState.hiring.cache = {};
  appState.hiring.lastLoadedAt = 0;
}

function waitForHiringAuthReady(timeoutMs = 4500) {
  if (!supabaseClient || appState.authReady || !appState.authLoading) return Promise.resolve();
  return new Promise((resolve) => {
    const startedAt = Date.now();
    const tick = () => {
      if (appState.authReady || !appState.authLoading || Date.now() - startedAt >= timeoutMs) {
        resolve();
        return;
      }
      window.setTimeout(tick, 80);
    };
    tick();
  });
}

function hiringRequireAuth() {
  if (appState.authLoading && !appState.authReady) {
    showToast("Validando sua sessao na Comunidade ANSEND...", "loader-2");
    return false;
  }
  if (hasAccountAccess()) return true;
  showToast("Entre para interagir com a Comunidade ANSEND.", "log-in");
  location.hash = "vendedor";
  return false;
}

function hiringCategoryLabel(value = "") {
  return hiringCategories.find(([id]) => id === value)?.[1] || value || "Outro";
}

function hiringDeadlineLabel(value = "") {
  return hiringDeadlines.find(([id]) => id === value)?.[1] || value || "Sem urgencia";
}

function hiringBudgetLabel(post = {}) {
  if (post.budget_type === "negotiable" || !post.budget_amount) return "A combinar";
  return Number(post.budget_amount || 0).toLocaleString("pt-BR", { style: "currency", currency: post.currency || "BRL", maximumFractionDigits: 0 });
}

function hiringRelativeDate(value) {
  const date = value ? new Date(value) : new Date();
  const diffMs = Date.now() - date.getTime();
  if (!Number.isFinite(diffMs) || diffMs < 45000) return "agora";
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `ha ${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `ha ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `ha ${days}d`;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).replace(".", "");
}

function hiringAuthorDisplay(userId) {
  const profile = profileForUserId(userId);
  const display = profileDisplayData(profile);
  const name = display.name || "Profissional ANSEND";
  const username = display.username || sanitizeHandle(name);
  return {
    id: userId,
    name,
    username,
    handle: username ? `@${username}` : "",
    avatar: display.avatar,
    verified: Boolean(profile?.is_verified || profile?.verified || profile?.verified_at),
    roleLabel: display.roleLabel || accountRoleLabel(profile?.account_role),
  };
}

function chatRequireAuth() {
  if (appState.authLoading && !appState.authReady) {
    showToast("Validando sua sessao...", "loader-2");
    return false;
  }
  if (supabaseClient && appState.authUser?.id) return true;
  showToast("Faca login para acessar o bate-papo.", "log-in");
  location.hash = "vendedor";
  return false;
}

function chatProfile(userId) {
  if (!userId) return null;
  if (appState.chat.profiles[userId]) return appState.chat.profiles[userId];
  return profileForUserId(userId);
}

function chatDisplayForUser(userId) {
  const profile = chatProfile(userId);
  const display = profileDisplayData(profile);
  const fallbackHandle = String(userId || "").slice(0, 8);
  const name = display.name && display.name !== "Perfil ANSEND" ? display.name : "Usuario ANSEND";
  const username = display.username || sanitizeHandle(profile?.username || name || fallbackHandle);
  return {
    id: userId,
    name,
    username,
    handle: username ? `@${username}` : "",
    avatar: display.avatar,
    avatarPosition: display.avatarPosition,
    avatarScale: display.avatarScale,
    roleLabel: display.roleLabel,
    headline: display.headline,
    bio: display.bio,
    verified: Boolean(profile?.is_verified || profile?.verified || profile?.verified_at),
  };
}

function chatRelativeDate(value) {
  return hiringRelativeDate(value);
}

function chatPreviewText(message) {
  if (message?.message_type === "gif") return "GIF";
  if (message?.message_type === "attachment" || message?.message_type === "audio") {
    const metadata = message.metadata && typeof message.metadata === "object" ? message.metadata : {};
    return metadata.kind === "image" ? "Imagem" : metadata.kind === "video" ? "Video" : metadata.kind === "audio" ? "Audio" : (metadata.name || "Arquivo");
  }
  if (!message?.body) return "Nenhuma mensagem ainda";
  return String(message.body || "").replace(/\s+/g, " ").trim().slice(0, 140);
}

function chatOtherParticipant(conversation) {
  const ids = appState.chat.participants[conversation.id] || [];
  return ids.find((id) => id !== appState.authUser?.id) || conversation.created_by || "";
}

function sanitizeChatMessage(value = "") {
  return String(value || "").replace(/\u0000/g, "").trim().slice(0, 2000);
}

function chatMessageKindFromFile(file = {}) {
  const type = String(file.type || "").toLowerCase();
  const ext = fileExtension(file.name || "").toLowerCase();
  if (type.startsWith("image/") || ["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
  if (type.startsWith("audio/") || ["mp3", "wav", "m4a", "ogg", "flac"].includes(ext)) return "audio";
  if (type.startsWith("video/") || ["mp4", "webm"].includes(ext)) return "video";
  return "file";
}

function chatAttachmentKindFromMetadata(metadata = {}) {
  const explicit = String(metadata.kind || "").toLowerCase();
  const mime = String(metadata.mime || metadata.content_type || metadata.contentType || "").toLowerCase();
  const ext = fileExtension(metadata.name || metadata.path || metadata.url || "").toLowerCase();
  if (explicit === "audio" || mime.startsWith("audio/") || ["mp3", "wav", "m4a", "ogg", "flac"].includes(ext)) return "audio";
  if (explicit === "image" || mime.startsWith("image/") || ["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return "image";
  if (explicit === "video" || mime.startsWith("video/") || ["mp4", "webm"].includes(ext)) return "video";
  return explicit || "file";
}

function mimeTypeForFile(file = {}) {
  const explicit = String(file.type || "").trim().toLowerCase();
  if (explicit) return explicit;
  const ext = fileExtension(file.name || "").toLowerCase();
  const map = {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    m4a: "audio/mp4",
    ogg: "audio/ogg",
    flac: "audio/flac",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    mp4: "video/mp4",
    webm: "video/webm",
    pdf: "application/pdf",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    txt: "text/plain",
    zip: "application/zip",
  };
  return map[ext] || "application/octet-stream";
}

function chatAttachmentDraft(conversationId = "") {
  return appState.chat.attachmentDrafts[conversationId] || null;
}

function clearChatAttachmentDraft(conversationId = "") {
  const draft = chatAttachmentDraft(conversationId);
  if (draft?.previewUrl) URL.revokeObjectURL(draft.previewUrl);
  delete appState.chat.attachmentDrafts[conversationId];
  delete appState.chat.uploadProgress[conversationId];
}

function chatAttachmentPreviewMarkup(conversationId = "") {
  const draft = chatAttachmentDraft(conversationId);
  if (!draft) return "";
  const progress = appState.chat.uploadProgress[conversationId] || 0;
  const file = draft.file || {};
  const size = Number(file.size || 0) ? `${(Number(file.size || 0) / 1024 / 1024).toFixed(1)} MB` : "";
  return `<section class="chat-attachment-preview" aria-label="Anexo selecionado">
    ${draft.kind === "image" ? `<img src="${htmlEscape(draft.previewUrl)}" alt="">` : ""}
    ${draft.kind === "audio" ? ChatAudioPlayerMarkup(draft.previewUrl, file.name || "Audio", size, true) : ""}
    ${draft.kind === "video" ? `<video src="${htmlEscape(draft.previewUrl)}" controls preload="metadata"></video>` : ""}
    ${draft.kind !== "audio" ? `<strong>${htmlEscape(file.name || "Arquivo")}</strong>` : ""}
    ${draft.kind !== "audio" ? `<small>${htmlEscape([draft.kind, size].filter(Boolean).join(" - "))}</small>` : ""}
    ${progress ? `<div class="chat-upload-progress" aria-label="Upload ${progress}%"><span style="--chat-upload-progress:${Math.max(4, progress)}%"></span></div>` : ""}
    <div class="chat-attachment-actions">
      <button type="button" data-action="chat-attachment-remove">Cancelar</button>
      <button type="submit">${appState.chat.sending ? "Enviando..." : "Enviar"}</button>
    </div>
  </section>`;
}

function chatComposerMenuMarkup(conversationId = "") {
  if (appState.chat.composerMenuOpen !== conversationId) return "";
  const items = [
    ["image", "image", "Enviar imagem", "image/jpeg,image/png,image/webp"],
    ["video", "video", "Enviar video", "video/mp4,video/webm"],
    ["audio", "music", "Enviar beat ou audio", ".mp3,.wav,.m4a,.ogg,audio/mpeg,audio/mp3,audio/wav,audio/x-wav,audio/flac,audio/mp4,audio/aac,audio/ogg,audio/x-m4a"],
    ["document", "file-text", "Enviar documento", "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"],
    ["file", "paperclip", "Enviar arquivo geral", ".zip,.pdf,.docx,.txt,.mp3,.wav,.m4a,.ogg,image/jpeg,image/png,image/webp,audio/mpeg,audio/mp3,audio/wav,audio/x-wav,audio/flac,audio/mp4,audio/aac,audio/ogg,audio/x-m4a,video/mp4,video/webm"],
  ];
  return `<div class="chat-composer-menu" role="menu" aria-label="Adicionar anexo">
    ${items.map(([kind, icon, label, accept]) => `<button type="button" role="menuitem" data-action="chat-attachment-pick" data-accept="${htmlEscape(accept)}" data-kind="${htmlEscape(kind)}"><i data-lucide="${icon}"></i>${htmlEscape(label)}</button>`).join("")}
  </div>`;
}

const CHAT_EMOJIS = ["🔥", "🎧", "🎵", "🎶", "🚀", "💿", "🎹", "🎙️", "👏", "🙏", "💪", "❤️", "😂", "😍", "😮", "😎", "🥶", "✨", "✅", "💰", "📌", "📩", "🤝", "🏆"];

function chatEmojiPickerMarkup(conversationId = "") {
  if (appState.chat.emojiPickerOpen !== conversationId) return "";
  return `<div class="chat-emoji-picker" role="dialog" aria-label="Selecionar emoji">
    ${CHAT_EMOJIS.map((emoji) => `<button type="button" data-action="chat-emoji-insert" data-emoji="${htmlEscape(emoji)}">${htmlEscape(emoji)}</button>`).join("")}
  </div>`;
}

function chatGifPickerMarkup(conversationId = "") {
  if (appState.chat.gifPickerOpen !== conversationId) return "";
  const query = appState.chat.gifQuery || "";
  return `<section class="chat-gif-picker" aria-label="Selecionar GIF">
    <label><i data-lucide="search"></i><input type="search" value="${htmlEscape(query)}" placeholder="Buscar GIF" data-chat-gif-search autocomplete="off"></label>
    <div class="chat-gif-grid">
      ${appState.chat.gifLoading ? `<p class="chat-load-error">Carregando GIFs...</p>` : ""}
      ${!appState.chat.gifLoading && !appState.chat.gifResults.length ? `<p class="chat-load-error">Busque um GIF para enviar.</p>` : ""}
      ${appState.chat.gifResults.map((gif) => `<button type="button" data-action="chat-gif-send" data-gif-url="${htmlEscape(gif.url)}" data-gif-title="${htmlEscape(gif.title || "GIF")}"><img src="${htmlEscape(gif.preview || gif.url)}" alt="${htmlEscape(gif.title || "GIF")}"></button>`).join("")}
    </div>
  </section>`;
}

function ChatAudioPlayerMarkup(url, name, sizeOrDetails = "", isPreview = false) {
  return `
    <div class="ansend-chat-audio-player" data-state="loading" data-preview="${isPreview}">
      <audio src="${htmlEscape(url)}" preload="metadata"></audio>
      
      <button type="button" class="audio-play-btn is-loading" aria-label="Carregando audio" data-player-icon="loading">
        <span class="player-state-icon" aria-hidden="true">${playerControlIconMarkup("loading")}</span>
      </button>
      
      <div class="audio-center-info">
        <div class="audio-header-row">
          <span class="audio-title" title="${htmlEscape(name)}">${htmlEscape(name)}</span>
          <span class="audio-time">0:00 / --:--</span>
        </div>
        
        <div class="audio-timeline-container">
          <div class="audio-timeline-rail">
            <div class="audio-timeline-fill" style="width: 0%;"></div>
            <input type="range" class="audio-timeline-slider" min="0" max="100" value="0" aria-label="Progresso do áudio">
          </div>
        </div>
      </div>
      
      <div class="audio-right-controls">
        <div class="audio-volume-container">
          <button type="button" class="audio-volume-btn" aria-label="Volume">
            <i data-lucide="volume-2" class="icon-volume"></i>
            <i data-lucide="volume-x" class="icon-mute" style="display:none;"></i>
          </button>
          <input type="range" class="audio-volume-slider" min="0" max="100" value="80" aria-label="Ajustar volume">
        </div>
        ${!isPreview ? `
          <a class="audio-download-btn" href="${htmlEscape(url)}" download="${htmlEscape(name)}" aria-label="Baixar áudio" title="Baixar áudio">
            <i data-lucide="download"></i>
          </a>
        ` : ""}
      </div>
    </div>
  `;
}

function initChatAudioPlayers() {
  const players = document.querySelectorAll(".ansend-chat-audio-player:not(.is-initialized)");
  players.forEach((player) => {
    player.classList.add("is-initialized");
    const audio = player.querySelector("audio");
    const playBtn = player.querySelector(".audio-play-btn");
    
    const timeDisplay = player.querySelector(".audio-time");
    const timelineFill = player.querySelector(".audio-timeline-fill");
    const timelineSlider = player.querySelector(".audio-timeline-slider");
    
    const volumeBtn = player.querySelector(".audio-volume-btn");
    const volumeIcon = player.querySelector(".icon-volume");
    const muteIcon = player.querySelector(".icon-mute");
    const volumeSlider = player.querySelector(".audio-volume-slider");
    
    let isDragging = false;
    
    function formatTime(seconds) {
      if (isNaN(seconds) || seconds === Infinity) return "--:--";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }
    
    function updateTimeDisplay() {
      const current = formatTime(audio.currentTime);
      const duration = formatTime(audio.duration);
      timeDisplay.textContent = `${current} / ${duration}`;
    }
    
    function updateProgress() {
      if (isDragging) return;
      if (!audio.duration) return;
      const percent = (audio.currentTime / audio.duration) * 100;
      timelineSlider.value = percent;
      timelineFill.style.width = `${percent}%`;
      updateTimeDisplay();
    }

    function setChatAudioButtonState(state) {
      const icon = state === "loading" ? "loading" : state === "playing" ? "pause" : "play";
      const label = icon === "loading" ? "Carregando audio" : icon === "pause" ? "Pausar" : "Reproduzir";
      player.setAttribute("data-state", state);
      setPlayerControlIcon(playBtn, icon, { label });
    }
    
    // Configura eventos do elemento de áudio
    audio.addEventListener("loadedmetadata", () => {
      setChatAudioButtonState("ready");
      updateTimeDisplay();
    });
    
    if (audio.readyState >= 1) {
      setChatAudioButtonState("ready");
      updateTimeDisplay();
    }
    
    audio.addEventListener("canplay", () => {
      setChatAudioButtonState(audio.paused ? "ready" : "playing");
      updateTimeDisplay();
    });
    
    audio.addEventListener("waiting", () => {
      setChatAudioButtonState("loading");
    });
    
    audio.addEventListener("playing", () => {
      setChatAudioButtonState("playing");
    });
    
    audio.addEventListener("pause", () => {
      setChatAudioButtonState("paused");
    });
    
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      setChatAudioButtonState("ready");
      timelineSlider.value = 0;
      timelineFill.style.width = "0%";
      updateTimeDisplay();
    });
    
    audio.addEventListener("timeupdate", updateProgress);
    
    audio.addEventListener("error", () => {
      setChatAudioButtonState("error");
      timeDisplay.textContent = "Erro de audio";
    });
    
    playBtn.addEventListener("click", () => {
      const state = player.getAttribute("data-state");
      if (state === "playing") {
        audio.pause();
      } else {
        // Pausar outros players de chat
        const allAudios = document.querySelectorAll(".ansend-chat-audio-player audio");
        allAudios.forEach((otherAudio) => {
          if (otherAudio !== audio) {
            otherAudio.pause();
          }
        });
        setChatAudioButtonState("loading");
        audio.play().catch((err) => {
          console.warn("Falha ao reproduzir audio do chat:", err);
          setChatAudioButtonState("error");
        });
      }
    });
    
    timelineSlider.addEventListener("input", (e) => {
      isDragging = true;
      const percent = e.target.value;
      timelineFill.style.width = `${percent}%`;
      if (audio.duration) {
        const tempTime = (percent / 100) * audio.duration;
        timeDisplay.textContent = `${formatTime(tempTime)} / ${formatTime(audio.duration)}`;
      }
    });
    
    timelineSlider.addEventListener("change", (e) => {
      if (audio.duration) {
        audio.currentTime = (e.target.value / 100) * audio.duration;
      }
      isDragging = false;
    });
    
    let lastVolume = 0.8;
    audio.volume = lastVolume;
    volumeSlider.value = lastVolume * 100;
    
    function updateVolumeIcon(volume) {
      if (volume === 0 || audio.muted) {
        volumeIcon.style.display = "none";
        muteIcon.style.display = "";
      } else {
        volumeIcon.style.display = "";
        muteIcon.style.display = "none";
      }
    }
    
    volumeSlider.addEventListener("input", (e) => {
      const vol = e.target.value / 100;
      audio.volume = vol;
      audio.muted = (vol === 0);
      lastVolume = vol > 0 ? vol : lastVolume;
      updateVolumeIcon(vol);
    });
    
    volumeBtn.addEventListener("click", () => {
      if (audio.muted || audio.volume === 0) {
        audio.muted = false;
        audio.volume = lastVolume || 0.8;
        volumeSlider.value = audio.volume * 100;
        updateVolumeIcon(audio.volume);
      } else {
        lastVolume = audio.volume;
        audio.muted = true;
        volumeSlider.value = 0;
        updateVolumeIcon(0);
      }
    });
  });
}

function chatAttachmentMetadataMarkup(metadata = {}) {
  const kind = chatAttachmentKindFromMetadata(metadata);
  const name = metadata.name || "Arquivo";
  const url = metadata.url || metadata.signedUrl || metadata.publicUrl || "";
  if (!url) return "";
  if (kind === "image" || metadata.type === "gif") {
    return `<div class="chat-attachment-message"><img src="${htmlEscape(url)}" alt="${htmlEscape(name)}" loading="lazy"></div>`;
  }
  if (kind === "video") {
    return `<div class="chat-attachment-message"><video src="${htmlEscape(url)}" controls preload="metadata"></video><span>${htmlEscape(name)}</span></div>`;
  }
  if (kind === "audio") {
    const mime = metadata.mime || metadata.content_type || metadata.contentType || "";
    const size = Number(metadata.size || 0) ? `${(Number(metadata.size || 0) / 1024 / 1024).toFixed(1)} MB` : "";
    const details = [mime, size].filter(Boolean).join(" - ");
    return `<div class="chat-attachment-message chat-audio-attachment">
      ${ChatAudioPlayerMarkup(url, name, details, false)}
    </div>`;
  }
  return `<a class="chat-attachment-file" href="${htmlEscape(url)}" target="_blank" rel="noopener noreferrer" download="${htmlEscape(name)}"><i data-lucide="file-down"></i><span>${htmlEscape(name)}</span></a>`;
}

function chatDraftFor(conversationId = "") {
  return appState.chat.drafts[conversationId] || "";
}

function setChatDraft(conversationId = "", value = "") {
  if (!conversationId) return;
  appState.chat.drafts[conversationId] = String(value || "").slice(0, 2000);
}

function chatConversationMetadata(conversation = {}) {
  const raw = conversation?.metadata || {};
  return raw && typeof raw === "object" ? raw : {};
}

function chatPostContext(conversation = {}) {
  const metadata = chatConversationMetadata(conversation);
  const postId = conversation.community_post_id || metadata.post_id || "";
  if (!postId) return null;
  return {
    postId,
    title: metadata.post_title || "Publicacao da Comunidade",
    summary: metadata.post_summary || "",
    createdAt: metadata.post_created_at || conversation.created_at,
    authorId: metadata.post_author_id || chatOtherParticipant(conversation),
  };
}

function chatPostContextMarkup(conversation = {}) {
  const context = chatPostContext(conversation);
  if (!context) return "";
  const author = hiringAuthorDisplay(context.authorId);
  return `<aside class="chat-post-context" aria-label="Publicacao vinculada">
    <span>Publicacao da Comunidade</span>
    <strong>${htmlEscape(context.title)}</strong>
    ${context.summary ? `<p>${htmlEscape(context.summary)}</p>` : ""}
    <small>${htmlEscape(author.name)} · ${htmlEscape(hiringRelativeDate(context.createdAt))}</small>
    <button type="button" data-action="chat-open-community-post" data-post-id="${htmlEscape(context.postId)}">Ver publicacao</button>
  </aside>`;
}

function defaultCommunityChatDraft(action = "interest") {
  if (action === "proposal") {
    return "Ola! Vi sua publicacao na Comunidade da ANSEND e gostaria de enviar uma proposta.\n\nServico:\nPrazo:\nValor:\nDetalhes:";
  }
  return "Ola! Vi sua publicacao na Comunidade da ANSEND e tenho interesse.";
}

function parseProposalDraft(body = "") {
  const text = String(body || "");
  const readLine = (label) => {
    const match = text.match(new RegExp(`^${label}:\\s*(.*)$`, "im"));
    return match ? match[1].trim() : "";
  };
  const priceRaw = readLine("Valor");
  const numericPrice = Number(String(priceRaw).replace(/[^\d,.-]/g, "").replace(".", "").replace(",", "."));
  const details = readLine("Detalhes")
    || text
      .split(/\r?\n/)
      .filter((line) => !/^\s*(Servico|Serviço|Prazo|Valor|Detalhes)\s*:/i.test(line))
      .join("\n")
      .replace(/^Ola! Vi sua publicacao na Comunidade da ANSEND e gostaria de enviar uma proposta\.\s*/i, "")
      .trim();
  return {
    serviceTitle: readLine("Servico") || "Proposta ANSEND",
    deadline: readLine("Prazo") || "Prazo a combinar",
    priceText: priceRaw || "Valor a combinar",
    price: Number.isFinite(numericPrice) && numericPrice > 0 ? numericPrice : null,
    details: (details || "Proposta enviada pela Comunidade ANSEND.").slice(0, 1200),
  };
}

function chatProposalBodyFromMetadata(metadata = {}) {
  const price = metadata.price_text || (metadata.price ? Number(metadata.price).toLocaleString("pt-BR", { style: "currency", currency: metadata.currency || "BRL" }) : "Valor a combinar");
  return [
    `Proposta: ${metadata.service_title || "Servico ANSEND"}`,
    `Prazo: ${metadata.deadline || "A combinar"}`,
    `Valor: ${price}`,
    metadata.description ? `Detalhes: ${metadata.description}` : "",
  ].filter(Boolean).join("\n");
}

function chatProposalStatusLabel(status = "pending") {
  return {
    pending: "Enviada",
    accepted: "Aceita",
    rejected: "Recusada",
    cancelled: "Cancelada",
    expired: "Expirada",
  }[status] || status;
}

function chatDateDividerLabel(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "Hoje";
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.round((startOfToday - startOfDate) / 86400000);
  if (dayDiff === 0) return "Hoje";
  if (dayDiff === 1) return "Ontem";
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: date.getFullYear() === today.getFullYear() ? undefined : "numeric" });
}

function chatProfileSummaryMarkup(display = {}) {
  const profile = chatProfile(display.id || "");
  const route = profile ? publicProfileRoute(profile) : "";
  const meta = [display.roleLabel, display.headline || display.bio].filter(Boolean).slice(0, 2).join(" - ");
  return `<section class="chat-profile-summary" aria-label="Resumo do perfil">
    ${profileAvatarMarkup(display, "chat-summary-avatar")}
    <strong>${htmlEscape(display.name)}${display.verified ? ` <i data-lucide="badge-check"></i>` : ""}</strong>
    ${display.handle || display.username ? `<span>${htmlEscape(display.handle || display.username)}</span>` : ""}
    ${meta ? `<p>${htmlEscape(meta)}</p>` : ""}
    ${route ? `<button type="button" data-action="chat-open-profile" data-profile-id="${htmlEscape(display.id)}">Ver Perfil</button>` : ""}
  </section>`;
}

function chatFailedMessages(conversationId = "") {
  return appState.chat.failedMessages[conversationId] || [];
}

function chatInboxCacheKey(userId = appState.authUser?.id || "") {
  return userId ? `${CHAT_INBOX_CACHE_KEY}:${userId}` : "";
}

function readChatInboxCache(userId = appState.authUser?.id || "") {
  const key = chatInboxCacheKey(userId);
  if (!key) return null;
  const cached = safeReadJson(key, null);
  if (!cached || typeof cached !== "object" || !Array.isArray(cached.conversations)) return null;
  return cached;
}

function applyChatInboxSnapshot(snapshot = {}) {
  appState.chat.conversations = sortChatConversations((snapshot.conversations || []).map((conversation) => ({ ...conversation })));
  appState.chat.participants = { ...(snapshot.participants || {}) };
  appState.chat.profiles = { ...appState.chat.profiles, ...(snapshot.profiles || {}) };
  Object.entries(snapshot.messages || {}).forEach(([conversationId, messages]) => {
    if (!appState.chat.messages[conversationId]) appState.chat.messages[conversationId] = messages;
  });
  appState.chat.lastLoadedAt = snapshot.updatedAt || Date.now();
}

function hydrateChatInboxFromCache(userId = appState.authUser?.id || "") {
  if (appState.chat.conversations.length) return null;
  const cached = readChatInboxCache(userId);
  if (!cached) return null;
  applyChatInboxSnapshot(cached);
  appState.chat.error = "";
  appState.chat.loading = false;
  return cached;
}

function writeChatInboxCache(userId = appState.authUser?.id || "") {
  const key = chatInboxCacheKey(userId);
  if (!key) return;
  const conversationIds = new Set(appState.chat.conversations.map((conversation) => conversation.id));
  const profileIds = new Set(Object.values(appState.chat.participants).flat());
  const profiles = {};
  profileIds.forEach((id) => {
    if (appState.chat.profiles[id]) profiles[id] = appState.chat.profiles[id];
  });
  const messages = {};
  conversationIds.forEach((id) => {
    if (Array.isArray(appState.chat.messages[id]) && appState.chat.messages[id].length) {
      messages[id] = appState.chat.messages[id].slice(-30);
    }
  });
  try {
    localStorage.setItem(key, JSON.stringify({
      conversations: appState.chat.conversations,
      participants: appState.chat.participants,
      profiles,
      messages,
      updatedAt: Date.now(),
    }));
  } catch (error) {
    console.warn("[ANSEND chat] inbox cache write failed", error);
  }
}

async function fetchChatProfiles(userIds = []) {
  const ids = [...new Set(userIds.filter(Boolean))].filter((id) => !appState.chat.profiles[id]);
  if (!ids.length || !supabaseClient) return;
  const { data, error } = await supabaseClient
    .from("public_profiles")
    .select(HIRING_PROFILE_SELECT)
    .in("id", ids)
    .limit(ids.length);
  if (error) throw error;
  (data || []).forEach((profile) => {
    appState.chat.profiles[profile.id] = profile;
  });
  if (appState.profile?.id) appState.chat.profiles[appState.profile.id] = appState.profile;
}

function sortChatConversations(conversations = []) {
  return [...conversations].sort((a, b) => new Date(b.last_message_at || b.updated_at || b.created_at || 0) - new Date(a.last_message_at || a.updated_at || a.created_at || 0));
}

function filteredChatConversations() {
  const query = appState.chat.search.trim().toLowerCase();
  const conversations = sortChatConversations(appState.chat.conversations);
  if (!query) return conversations;
  return conversations.filter((conversation) => {
    const other = chatDisplayForUser(chatOtherParticipant(conversation));
    const lastMessage = chatPreviewText(conversation.lastMessage).toLowerCase();
    return [other.name, other.username, other.handle, lastMessage].some((value) => String(value || "").toLowerCase().includes(query));
  });
}

async function loadChatConversations({ render = false, force = false } = {}) {
  if (!supabaseClient || !appState.authUser?.id) return [];
  const userId = appState.authUser.id;
  const cached = !force ? readChatInboxCache(userId) : null;
  if (!force && cached && !appState.chat.conversations.length) {
    applyChatInboxSnapshot(cached);
    appState.chat.error = "";
    appState.chat.loading = false;
    if (render) renderChatPage({ preserveActive: true });
    if (Date.now() - (cached.updatedAt || 0) < CHAT_INBOX_CACHE_TTL_MS) return appState.chat.conversations;
  }
  const requestId = ++appState.chat.activeRequestId;
  appState.chat.loading = !appState.chat.conversations.length;
  appState.chat.error = "";
  if (render) renderChatPage({ preserveActive: true });
  try {
    const { data: ownRows, error: ownError } = await supabaseClient
      .from("conversation_participants")
      .select("conversation_id,last_read_at")
      .eq("user_id", userId)
      .limit(80);
    if (ownError) throw ownError;
    const conversationIds = [...new Set((ownRows || []).map((row) => row.conversation_id).filter(Boolean))];
    if (!conversationIds.length) {
      if (requestId !== appState.chat.activeRequestId) return appState.chat.conversations;
      appState.chat.conversations = [];
      appState.chat.participants = {};
      appState.chat.loading = false;
      appState.chat.lastLoadedAt = Date.now();
      writeChatInboxCache(userId);
      if (render) renderChatPage({ preserveActive: true });
      return [];
    }

    const [{ data: conversations, error: conversationsError }, { data: participants, error: participantsError }, { data: messages, error: messagesError }] = await Promise.all([
      supabaseClient.from("conversations").select("*").in("id", conversationIds).order("last_message_at", { ascending: false }).limit(80),
      supabaseClient.from("conversation_participants").select("conversation_id,user_id,last_read_at").in("conversation_id", conversationIds).limit(200),
      supabaseClient.from("messages").select("*").in("conversation_id", conversationIds).order("created_at", { ascending: false }).limit(Math.max(80, conversationIds.length * 3)),
    ]);
    if (conversationsError) throw conversationsError;
    if (participantsError) throw participantsError;
    if (messagesError) throw messagesError;
    if (requestId !== appState.chat.activeRequestId) return appState.chat.conversations;

    const participantsByConversation = {};
    (participants || []).forEach((row) => {
      participantsByConversation[row.conversation_id] = participantsByConversation[row.conversation_id] || [];
      participantsByConversation[row.conversation_id].push(row.user_id);
    });
    appState.chat.participants = participantsByConversation;
    await fetchChatProfiles((participants || []).map((row) => row.user_id));

    const lastMessageByConversation = {};
    (messages || []).forEach((message) => {
      if (!lastMessageByConversation[message.conversation_id]) lastMessageByConversation[message.conversation_id] = message;
    });
    const readMap = Object.fromEntries((ownRows || []).map((row) => [row.conversation_id, row.last_read_at]));
    appState.chat.conversations = sortChatConversations((conversations || []).map((conversation) => {
      const lastReadAt = readMap[conversation.id] || null;
      const unreadCount = (messages || []).filter((message) => (
        message.conversation_id === conversation.id
        && message.sender_id !== userId
        && (!lastReadAt || new Date(message.created_at) > new Date(lastReadAt))
      )).length;
      return {
        ...conversation,
        lastMessage: lastMessageByConversation[conversation.id] || null,
        lastReadAt,
        unreadCount,
      };
    }));
    appState.chat.lastLoadedAt = Date.now();
    writeChatInboxCache(userId);
  } catch (error) {
    console.error("[ANSEND chat] load conversations failed", error);
    appState.chat.error = appState.chat.conversations.length ? "" : "Nao foi possivel carregar suas conversas.";
  } finally {
    if (requestId === appState.chat.activeRequestId) {
      appState.chat.loading = false;
      if (render) renderChatPage({ preserveActive: true });
    }
  }
  return appState.chat.conversations;
}

async function loadChatMessages(conversationId, { render = false } = {}) {
  if (!supabaseClient || !appState.authUser?.id || !conversationId) return [];
  appState.chat.messagesLoading = true;
  if (render) renderChatPage({ preserveActive: true });
  try {
    const { data, error } = await supabaseClient
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    appState.chat.messages[conversationId] = [...(data || [])].reverse();
    writeChatInboxCache();
    await markChatConversationRead(conversationId);
  } catch (error) {
    console.error("[ANSEND chat] load messages failed", error);
    showToast("Nao foi possivel carregar a conversa.", "message-circle-warning");
  } finally {
    appState.chat.messagesLoading = false;
    if (render) renderChatPage({ preserveActive: true });
  }
  return appState.chat.messages[conversationId] || [];
}

async function markChatConversationRead(conversationId) {
  if (!supabaseClient || !appState.authUser?.id || !conversationId) return;
  const { error } = await supabaseClient
    .from("conversation_participants")
    .update({ last_read_at: new Date().toISOString() })
    .eq("conversation_id", conversationId)
    .eq("user_id", appState.authUser.id);
  if (error) console.warn("[ANSEND chat] read state failed", error);
  appState.chat.conversations = appState.chat.conversations.map((conversation) => (
    conversation.id === conversationId ? { ...conversation, lastReadAt: new Date().toISOString(), unreadCount: 0 } : conversation
  ));
}

function appendChatMessage(message) {
  if (!message?.conversation_id) return;
  const list = appState.chat.messages[message.conversation_id] || [];
  if (list.some((item) => item.id === message.id)) return;
  appState.chat.messages[message.conversation_id] = [...list, message].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
}

async function openChatConversation(conversationId, { render = true } = {}) {
  if (!conversationId) return;
  appState.chat.activeConversationId = conversationId;
  if (render) renderChatPage({ preserveActive: true });
  await loadChatMessages(conversationId, { render: true });
  queueChatScrollToBottom();
}

async function openOrCreateDirectConversation(otherUserId) {
  if (!chatRequireAuth() || !otherUserId) return;
  if (otherUserId === appState.authUser.id) {
    showToast("Voce nao pode iniciar conversa consigo mesmo.", "user-x");
    return;
  }
  try {
    const { data, error } = await supabaseClient.rpc("get_or_create_direct_conversation", { p_other_user_id: otherUserId });
    if (error) throw error;
    appState.chat.newChatOpen = false;
    await loadChatConversations({ render: false });
    navigateToChatConversation(data);
  } catch (error) {
    console.error("[ANSEND chat] create direct failed", error);
    showToast("Nao foi possivel iniciar o chat.", "message-circle-warning");
  }
}

async function handleCommunityChatAction({ postId, action = "interest" } = {}) {
  await waitForHiringAuthReady();
  if (!hiringRequireAuth()) return "";
  const post = appState.hiring.posts.find((item) => item.id === postId);
  if (!post) {
    showToast("Publicacao nao encontrada.", "triangle-alert");
    return "";
  }
  if (post.user_id === appState.authUser.id) {
    showToast("Voce nao pode iniciar conversa consigo mesmo.", "user-x");
    return "";
  }
  const actionKey = `${postId}:${action}`;
  if (appState.chat.pendingActions[actionKey]) return "";
  appState.chat.pendingActions[actionKey] = true;
  renderHiringPage({ force: false });
  try {
    if (action === "interest") {
      const { error: interestError } = await supabaseClient
        .from("hiring_interests")
        .upsert({ post_id: postId, user_id: appState.authUser.id }, { onConflict: "post_id,user_id" });
      if (interestError) throw interestError;
      post.viewer.interested = true;
      post.metrics.interests = Math.max(1, Number(post.metrics.interests || 0) + 1);
    }

    const { data, error } = await supabaseClient.rpc("get_or_create_community_conversation", {
      p_post_id: postId,
      p_interaction_type: action,
    });
    if (error) throw error;
    const conversationId = data;
    appState.chat.draftModes[conversationId] = action;
    setChatDraft(conversationId, defaultCommunityChatDraft(action));
    invalidateHiringCache();
    await loadChatConversations({ render: false });
    navigateToChatConversation(conversationId);
    return conversationId;
  } catch (error) {
    console.error("[ANSEND chat] community action failed", error);
    const message = /SELF_CONVERSATION/i.test(error?.message || "")
      ? "Voce nao pode iniciar conversa consigo mesmo."
      : "Nao foi possivel abrir o bate-papo desta publicacao.";
    showToast(message, "message-circle-warning");
    return "";
  } finally {
    delete appState.chat.pendingActions[actionKey];
    if (currentRoute() === COMMUNITY_ROUTE) renderHiringPage({ force: false });
  }
}

async function sendChatMessage(form) {
  if (!chatRequireAuth() || appState.chat.sending) return;
  const conversationId = form?.dataset.conversationId || appState.chat.activeConversationId;
  const textarea = form?.querySelector("textarea[name='body']");
  const body = sanitizeChatMessage(textarea?.value || "");
  const attachmentDraft = chatAttachmentDraft(conversationId);
  if (!conversationId || (!body && !attachmentDraft)) return;
  setChatDraft(conversationId, body);
  appState.chat.sending = true;
  renderChatPage({ preserveActive: true });
  let messageType = "text";
  let metadata = {};
  try {
    const conversation = appState.chat.conversations.find((item) => item.id === conversationId);
    const draftMode = appState.chat.draftModes[conversationId] || "";

    if (draftMode === "proposal" && conversation?.community_post_id) {
      const proposal = parseProposalDraft(body);
      const recipientId = chatOtherParticipant(conversation);
      const proposalPayload = {
        post_id: conversation.community_post_id,
        sender_id: appState.authUser.id,
        receiver_id: recipientId,
        message: proposal.details.slice(0, 1200),
        proposed_amount: proposal.price,
        delivery_deadline: proposal.deadline,
        portfolio_links: null,
        attachments: [],
        status: "pending",
      };
      const { data: proposalRow, error: proposalError } = await supabaseClient
        .from("hiring_proposals")
        .upsert(proposalPayload, { onConflict: "post_id,sender_id" })
        .select()
        .single();
      if (proposalError) throw proposalError;
      messageType = "proposal";
      metadata = {
        proposal_id: proposalRow?.id || null,
        post_id: conversation.community_post_id,
        service_title: proposal.serviceTitle,
        description: proposal.details,
        price: proposal.price,
        price_text: proposal.priceText,
        currency: "BRL",
        deadline: proposal.deadline,
        status: proposalRow?.status || "pending",
      };
      const relatedPost = appState.hiring.posts.find((post) => post.id === conversation.community_post_id);
      if (relatedPost) {
        relatedPost.viewer.proposed = true;
        relatedPost.metrics.proposals = Math.max(1, Number(relatedPost.metrics.proposals || 0) + 1);
      }
      if (proposalRow) {
        appState.hiring.proposals = [proposalRow, ...appState.hiring.proposals.filter((item) => item.id !== proposalRow.id)];
      }
      invalidateHiringCache();
    }

    if (attachmentDraft && messageType === "text") {
      appState.chat.uploadProgress[conversationId] = 12;
      renderChatPage({ preserveActive: true });
      const file = attachmentDraft.file;
      const kind = attachmentDraft.kind || chatMessageKindFromFile(file);
      const mime = mimeTypeForFile(file);
      const safeExt = fileExtension(file.name || "") || "bin";
      const safeBase = sanitizeStorageSegment((file.name || "arquivo").replace(/\.[^.]+$/, ""), "chat");
      const path = `${appState.authUser.id}/chat/${conversationId}/${Date.now()}-${safeBase}.${safeExt}`;
      appState.chat.uploadProgress[conversationId] = 36;
      renderChatPage({ preserveActive: true });
      const result = await uploadStorageFile(file, { type: "chatAttachment", path, timeoutMs: 120000, contentType: mime });
      appState.chat.uploadProgress[conversationId] = 100;
      messageType = kind === "audio" ? "audio" : "attachment";
      metadata = {
        type: "attachment",
        kind,
        name: file.name || "Arquivo",
        size: file.size || 0,
        mime,
        content_type: mime,
        bucket: result.bucket,
        path: result.path,
        url: result.url,
        publicUrl: result.publicUrl || result.url,
        signedUrl: result.signedUrl || "",
        signedUrlExpiresAt: result.signedUrlExpiresAt || null,
      };
    }

    const { data, error } = await supabaseClient
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: appState.authUser.id,
        body: messageType === "proposal" ? chatProposalBodyFromMetadata(metadata) : (body || metadata.name || "Arquivo"),
        message_type: messageType,
        metadata,
      })
      .select()
      .single();
    if (error) throw error;
    appendChatMessage(data);
    if (textarea) textarea.value = "";
    setChatDraft(conversationId, "");
    clearChatAttachmentDraft(conversationId);
    appState.chat.failedMessages[conversationId] = chatFailedMessages(conversationId).filter((item) => item.retryBody !== body);
    delete appState.chat.draftModes[conversationId];
    await loadChatConversations({ render: false });
  } catch (error) {
    console.error("[ANSEND chat] send failed", error);
    const failed = {
      id: `failed-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: appState.authUser.id,
      body: messageType === "proposal" ? chatProposalBodyFromMetadata(metadata) : body,
      message_type: messageType,
      metadata,
      created_at: new Date().toISOString(),
      failed: true,
      retryBody: body,
      retryMode: appState.chat.draftModes[conversationId] || "",
    };
    appState.chat.failedMessages[conversationId] = [...chatFailedMessages(conversationId).filter((item) => item.retryBody !== body), failed].slice(-3);
    showToast("Nao foi possivel enviar a mensagem.", "send-x");
  } finally {
    appState.chat.sending = false;
    renderChatPage({ preserveActive: true });
    queueChatScrollToBottom();
  }
}

async function retryChatMessage(failedId = "") {
  const conversationId = appState.chat.activeConversationId;
  if (!conversationId || !failedId) return;
  const failed = chatFailedMessages(conversationId).find((item) => item.id === failedId);
  if (!failed) return;
  appState.chat.failedMessages[conversationId] = chatFailedMessages(conversationId).filter((item) => item.id !== failedId);
  if (failed.retryMode) appState.chat.draftModes[conversationId] = failed.retryMode;
  setChatDraft(conversationId, failed.retryBody || failed.body || "");
  renderChatPage({ preserveActive: true });
  window.requestAnimationFrame(() => {
    const form = document.querySelector(`.chat-composer-form[data-conversation-id="${cssEscape(conversationId)}"]`);
    const textarea = form?.querySelector("textarea[name='body']");
    if (textarea) textarea.value = chatDraftFor(conversationId);
    if (form) sendChatMessage(form);
  });
}

async function updateChatProposalStatus(proposalId, messageId, status) {
  if (!chatRequireAuth() || !proposalId || !messageId || !["accepted", "rejected", "cancelled"].includes(status)) return;
  try {
    const { data: rpcRows, error } = await supabaseClient.rpc("update_chat_proposal_status", {
      p_proposal_id: proposalId,
      p_message_id: messageId,
      p_status: status,
    });
    if (error) throw error;
    const nextStatus = rpcRows?.[0]?.status || status;

    const activeMessages = appState.chat.messages[appState.chat.activeConversationId] || [];
    const currentMessage = activeMessages.find((message) => message.id === messageId);
    const nextMetadata = {
      ...(currentMessage?.metadata || {}),
      status: nextStatus,
      proposal_id: proposalId,
    };

    appState.chat.messages[appState.chat.activeConversationId] = activeMessages.map((message) => (
      message.id === messageId ? { ...message, metadata: nextMetadata } : message
    ));
    appState.hiring.proposals = appState.hiring.proposals.map((item) => (
      item.id === proposalId ? { ...item, status: nextStatus } : item
    ));
    showToast(status === "accepted" ? "Proposta aceita." : status === "rejected" ? "Proposta recusada." : "Proposta cancelada.", "badge-check");
    renderChatPage({ preserveActive: true });
  } catch (error) {
    console.error("[ANSEND chat] proposal status failed", error);
    showToast("Nao foi possivel atualizar a proposta.", "triangle-alert");
  }
}

function setChatComposerPanel(conversationId = "", panel = "") {
  appState.chat.composerMenuOpen = panel === "menu" ? conversationId : "";
  appState.chat.gifPickerOpen = panel === "gif" ? conversationId : "";
  appState.chat.emojiPickerOpen = panel === "emoji" ? conversationId : "";
}

function focusChatComposer(conversationId = appState.chat.activeConversationId) {
  window.requestAnimationFrame(() => {
    document.querySelector(`.chat-composer-form[data-conversation-id="${cssEscape(conversationId)}"] textarea[name="body"]`)?.focus({ preventScroll: true });
  });
}

function insertChatEmoji(emoji = "") {
  const conversationId = appState.chat.activeConversationId;
  const textarea = document.querySelector(`.chat-composer-form[data-conversation-id="${cssEscape(conversationId)}"] textarea[name="body"]`);
  if (!textarea || !emoji) return;
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? start;
  textarea.value = `${textarea.value.slice(0, start)}${emoji}${textarea.value.slice(end)}`;
  const cursor = start + emoji.length;
  textarea.setSelectionRange(cursor, cursor);
  setChatDraft(conversationId, textarea.value);
  appState.chat.emojiPickerOpen = "";
  renderChatPage({ preserveActive: true });
  focusChatComposer(conversationId);
}

function pickChatAttachment(button) {
  const form = button.closest(".chat-composer-form");
  const input = form?.querySelector("[data-chat-attachment-input]");
  if (!input) return;
  input.accept = button.dataset.accept || "";
  input.dataset.kind = button.dataset.kind || "";
  input.value = "";
  input.click();
}

function setChatAttachmentFromInput(input) {
  const form = input.closest(".chat-composer-form");
  const conversationId = form?.dataset.conversationId || appState.chat.activeConversationId;
  const file = input.files?.[0];
  if (!conversationId || !file) return;
  try {
    validateStorageFile(file, STORAGE_UPLOAD_LIMITS.chatAttachment);
    clearChatAttachmentDraft(conversationId);
    const kind = chatMessageKindFromFile(file);
    const previewUrl = ["image", "audio", "video"].includes(kind) ? URL.createObjectURL(file) : "";
    appState.chat.attachmentDrafts[conversationId] = { file, kind, previewUrl, pickedAt: Date.now() };
    setChatComposerPanel(conversationId, "");
    renderChatPage({ preserveActive: true });
    focusChatComposer(conversationId);
  } catch (error) {
    showToast(error?.message || "Arquivo nao permitido.", "file-warning");
  }
}

async function loadChatGifs(query = "") {
  const conversationId = appState.chat.activeConversationId;
  appState.chat.gifLoading = true;
  appState.chat.gifQuery = query;
  renderChatPage({ preserveActive: true });
  try {
    const params = new URLSearchParams({ q: query || "" });
    const response = await fetch(`/api/chat/gifs?${params.toString()}`, { headers: await recommendationAuthHeaders() });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) throw new Error(data.error || "GIF indisponivel.");
    appState.chat.gifResults = Array.isArray(data.results) ? data.results : [];
  } catch (error) {
    console.warn("[ANSEND chat] gif search failed", error);
    appState.chat.gifResults = [];
    showToast("Nao foi possivel carregar GIFs agora.", "image-off");
  } finally {
    appState.chat.gifLoading = false;
    renderChatPage({ preserveActive: true });
  }
}

async function sendChatGif(url = "", title = "GIF") {
  if (!chatRequireAuth() || appState.chat.sending || !url) return;
  const conversationId = appState.chat.activeConversationId;
  if (!conversationId) return;
  appState.chat.sending = true;
  appState.chat.gifPickerOpen = "";
  renderChatPage({ preserveActive: true });
  try {
    const metadata = { type: "gif", kind: "image", name: title || "GIF", url };
    const { data, error } = await supabaseClient
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: appState.authUser.id,
        body: title || "GIF",
        message_type: "gif",
        metadata,
      })
      .select()
      .single();
    if (error) throw error;
    appendChatMessage(data);
    await loadChatConversations({ render: false });
  } catch (error) {
    console.error("[ANSEND chat] gif send failed", error);
    showToast("Nao foi possivel enviar o GIF.", "send-x");
  } finally {
    appState.chat.sending = false;
    renderChatPage({ preserveActive: true });
    queueChatScrollToBottom();
  }
}

function escapeSupabaseLike(value = "") {
  return String(value || "").replace(/[%_]/g, "\\$&").replace(/,/g, " ");
}

async function searchChatUsers(query) {
  if (!supabaseClient || !appState.authUser?.id) return [];
  const term = escapeSupabaseLike(query.trim());
  if (term.length < 2) {
    appState.chat.userResults = [];
    renderChatPage({ preserveActive: true });
    return [];
  }
  try {
    const pattern = `%${term}%`;
    const { data, error } = await supabaseClient
      .from("public_profiles")
      .select(HIRING_PROFILE_SELECT)
      .or(`display_name.ilike.${pattern},username.ilike.${pattern},full_name.ilike.${pattern},artistic_name.ilike.${pattern}`)
      .neq("id", appState.authUser.id)
      .limit(12);
    if (error) throw error;
    appState.chat.userResults = data || [];
    (data || []).forEach((profile) => {
      appState.chat.profiles[profile.id] = profile;
    });
  } catch (error) {
    console.error("[ANSEND chat] search users failed", error);
    appState.chat.userResults = [];
  }
  renderChatPage({ preserveActive: true });
  return appState.chat.userResults;
}

function cleanupChatRealtime() {
  if (!supabaseClient || !appState.chat.realtimeChannels.length) return;
  appState.chat.realtimeChannels.forEach((channel) => {
    try {
      supabaseClient.removeChannel(channel);
    } catch (error) {
      console.warn("[ANSEND chat] channel cleanup failed", error);
    }
  });
  appState.chat.realtimeChannels = [];
}

function subscribeChatRealtime() {
  if (!supabaseClient || !appState.authUser?.id || appState.chat.realtimeChannels.length) return;
  const userId = appState.authUser.id;
  const messagesChannel = supabaseClient
    .channel(`ansend-chat-messages-${userId}`)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, async (payload) => {
      const message = payload.new;
      const participantIds = appState.chat.participants[message.conversation_id] || [];
      if (!participantIds.includes(userId)) {
        await loadChatConversations({ render: currentRoute() === "chat" });
        return;
      }
      appendChatMessage(message);
      await loadChatConversations({ render: false });
      if (message.conversation_id === appState.chat.activeConversationId && message.sender_id !== userId) {
        await markChatConversationRead(message.conversation_id);
      }
      if (currentRoute() === "chat") {
        renderChatPage({ preserveActive: true });
        queueChatScrollToBottom();
      }
    })
    .subscribe();

  const participantChannel = supabaseClient
    .channel(`ansend-chat-participants-${userId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "conversation_participants", filter: `user_id=eq.${userId}` }, async () => {
      await loadChatConversations({ render: currentRoute() === "chat" });
    })
    .subscribe();

  appState.chat.realtimeChannels = [messagesChannel, participantChannel];
}

function queueChatScrollToBottom() {
  window.requestAnimationFrame(() => {
    const list = document.querySelector(".chat-thread-messages");
    if (list) list.scrollTop = list.scrollHeight;
  });
}

function chatConversationItemMarkup(conversation) {
  const otherId = chatOtherParticipant(conversation);
  const display = chatDisplayForUser(otherId);
  const lastMessage = conversation.lastMessage;
  const isActive = appState.chat.activeConversationId === conversation.id;
  return `<button type="button" class="chat-conversation-item ${isActive ? "is-active" : ""}" data-action="chat-open-conversation" data-conversation-id="${htmlEscape(conversation.id)}">
    ${profileAvatarMarkup(display, "chat-avatar")}
    <span class="chat-conversation-copy">
      <span class="chat-conversation-head">
        <strong>${htmlEscape(display.name)}${display.verified ? ` <i data-lucide="badge-check"></i>` : ""}</strong>
        <small>${htmlEscape(chatRelativeDate(lastMessage?.created_at || conversation.last_message_at || conversation.updated_at))}</small>
      </span>
      <span class="chat-conversation-meta">${htmlEscape(display.handle || display.username || "")}</span>
      <span class="chat-conversation-preview">${lastMessage?.sender_id === appState.authUser?.id ? "Voce: " : ""}${htmlEscape(chatPreviewText(lastMessage))}</span>
    </span>
    ${conversation.unreadCount ? `<span class="chat-unread-dot" aria-label="${conversation.unreadCount} nao lidas"></span>` : ""}
  </button>`;
}

function chatEmptyInboxMarkup() {
  return `<section class="chat-empty-list">
    <i data-lucide="message-circle"></i>
    <h2>Caixa de entrada vazia</h2>
    <p>Envie uma mensagem para alguem</p>
  </section>`;
}

function chatThreadEmptyMarkup() {
  return `<section class="chat-thread-empty">
    <span class="chat-empty-icon"><i data-lucide="message-circle"></i></span>
    <h2>Iniciar conversa</h2>
    <p>Escolha entre as conversas existentes ou inicie uma nova.</p>
    <button type="button" data-action="chat-new-open">Novo chat</button>
  </section>`;
}

function chatMessageStatusMarkup(message) {
  if (message.failed) {
    return `<button type="button" class="chat-message-retry" data-action="chat-retry-message" data-failed-id="${htmlEscape(message.id)}">
      <i data-lucide="rotate-ccw"></i> Falhou, tente novamente
    </button>`;
  }
  return "";
}

function chatMessageMarkup(message) {
  const mine = message.sender_id === appState.authUser?.id;
  const metadata = message.metadata && typeof message.metadata === "object" ? message.metadata : {};
  if (message.message_type === "proposal") {
    const price = metadata.price_text || (metadata.price ? Number(metadata.price).toLocaleString("pt-BR", { style: "currency", currency: metadata.currency || "BRL" }) : "Valor a combinar");
    const status = metadata.status || "pending";
    const canRespond = !mine && metadata.proposal_id && status === "pending";
    const canCancel = mine && metadata.proposal_id && status === "pending";
    const fields = [
      ["Servico", metadata.service_title && metadata.service_title !== "Proposta ANSEND" ? metadata.service_title : ""],
      ["Prazo", metadata.deadline],
      ["Valor", price],
      ["Status", chatProposalStatusLabel(status)],
    ].filter(([, value]) => String(value || "").trim());
    return `<div class="chat-message-row ${mine ? "is-mine" : "is-theirs"}">
      <div class="chat-message-container">
        <div class="chat-message-bubble chat-proposal-bubble">
          <span>${mine ? "Proposta enviada" : "Proposta recebida"}</span>
          ${metadata.service_title && metadata.service_title !== "Proposta ANSEND" ? `<strong>${htmlEscape(metadata.service_title)}</strong>` : ""}
          ${metadata.description ? `<p>${htmlEscape(metadata.description)}</p>` : ""}
          ${fields.length ? `<dl>${fields.map(([label, value]) => `<div><dt>${htmlEscape(label)}</dt><dd>${htmlEscape(value)}</dd></div>`).join("")}</dl>` : ""}
          ${canRespond ? `<div class="chat-proposal-actions">
            <button type="button" data-action="chat-proposal-status" data-proposal-id="${htmlEscape(metadata.proposal_id)}" data-message-id="${htmlEscape(message.id)}" data-status="accepted">Aceitar</button>
            <button type="button" data-action="chat-proposal-status" data-proposal-id="${htmlEscape(metadata.proposal_id)}" data-message-id="${htmlEscape(message.id)}" data-status="rejected">Recusar</button>
          </div>` : ""}
          ${canCancel ? `<div class="chat-proposal-actions">
            <button type="button" data-action="chat-proposal-status" data-proposal-id="${htmlEscape(metadata.proposal_id)}" data-message-id="${htmlEscape(message.id)}" data-status="cancelled">Cancelar proposta</button>
          </div>` : ""}
        </div>
        <small>${htmlEscape(chatRelativeDate(message.created_at))}</small>
        ${chatMessageStatusMarkup(message)}
      </div>
    </div>`;
  }
  if (message.message_type === "attachment" || message.message_type === "audio" || message.message_type === "gif") {
    const kind = metadata.kind || (message.message_type === "gif" ? "image" : "file");
    const isMedia = kind === "image" || kind === "video" || message.message_type === "gif";
    const bubbleClass = isMedia ? "chat-message-bubble has-media" : "chat-message-bubble has-file";
    return `<div class="chat-message-row ${mine ? "is-mine" : "is-theirs"}">
      <div class="chat-message-container">
        <div class="${bubbleClass}">
          ${chatAttachmentMetadataMarkup(metadata)}
          ${message.body && message.body !== metadata.name ? `<p>${htmlEscape(message.body)}</p>` : ""}
        </div>
        <small>${htmlEscape(chatRelativeDate(message.created_at))}</small>
        ${chatMessageStatusMarkup(message)}
      </div>
    </div>`;
  }
  return `<div class="chat-message-row ${mine ? "is-mine" : "is-theirs"}">
    <div class="chat-message-container">
      <div class="chat-message-bubble">
        <p>${htmlEscape(message.body)}</p>
      </div>
      <small>${htmlEscape(chatRelativeDate(message.created_at))}</small>
      ${chatMessageStatusMarkup(message)}
    </div>
  </div>`;
}

function chatTimelineMarkup(conversation, other, messages = []) {
  const rows = [];
  rows.push(chatProfileSummaryMarkup(other));
  const context = chatPostContextMarkup(conversation);
  if (context) rows.push(context);
  const allMessages = [...messages, ...chatFailedMessages(conversation.id)].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  let currentDate = "";
  allMessages.forEach((message) => {
    const dateKey = new Date(message.created_at || Date.now()).toDateString();
    if (dateKey !== currentDate) {
      currentDate = dateKey;
      rows.push(`<div class="chat-date-divider"><span>${htmlEscape(chatDateDividerLabel(message.created_at))}</span></div>`);
    }
    rows.push(chatMessageMarkup(message));
  });
  return rows.join("");
}

function renderChatThread() {
  const conversationId = appState.chat.activeConversationId;
  const conversation = appState.chat.conversations.find((item) => item.id === conversationId);
  if (!conversationId || !conversation) return chatThreadEmptyMarkup();
  const other = chatDisplayForUser(chatOtherParticipant(conversation));
  const messages = appState.chat.messages[conversationId] || [];
  const draft = chatDraftFor(conversationId);
  const draftMode = appState.chat.draftModes[conversationId] || "";
  const hasAttachment = Boolean(chatAttachmentDraft(conversationId));
  return `<section class="chat-thread ${messages.length ? "has-messages" : ""}">
    <header class="chat-thread-header">
      <button type="button" class="chat-back-button" data-action="chat-back-list" aria-label="Voltar"><i data-lucide="arrow-left"></i></button>
      ${profileAvatarMarkup(other, "chat-avatar")}
      <button type="button" class="chat-thread-profile" data-action="chat-open-profile" data-profile-id="${htmlEscape(other.id)}">
        <strong>${htmlEscape(other.name)}${other.verified ? ` <i data-lucide="badge-check"></i>` : ""}</strong>
        <span>${htmlEscape(other.handle || other.username || "")}</span>
      </button>
      <button type="button" class="chat-thread-menu" aria-label="Mais opcoes"><i data-lucide="more-horizontal"></i></button>
    </header>
    <div class="chat-thread-messages">
      ${appState.chat.messagesLoading ? `<div class="chat-message-skeleton"><span></span><span></span><span></span></div>` : ""}
      ${!appState.chat.messagesLoading ? chatTimelineMarkup(conversation, other, messages) : ""}
      ${!appState.chat.messagesLoading && !messages.length && !chatFailedMessages(conversationId).length ? `<div class="chat-thread-start"><strong>Nova conversa</strong><p>Envie a primeira mensagem para ${htmlEscape(other.name)}.</p></div>` : ""}
    </div>
    <form class="chat-composer-form" data-conversation-id="${htmlEscape(conversationId)}" data-draft-mode="${htmlEscape(draftMode)}">
      ${chatComposerMenuMarkup(conversationId)}
      ${chatGifPickerMarkup(conversationId)}
      ${chatEmojiPickerMarkup(conversationId)}
      ${chatAttachmentPreviewMarkup(conversationId)}
      <input type="file" data-chat-attachment-input hidden>
      <button type="button" class="chat-composer-icon" data-action="chat-composer-menu" aria-label="Adicionar"><i data-lucide="plus"></i></button>
      <button type="button" class="chat-composer-icon" data-action="chat-gif-toggle" aria-label="GIF"><span>GIF</span></button>
      <button type="button" class="chat-composer-icon" data-action="chat-emoji-toggle" aria-label="Emoji"><i data-lucide="smile"></i></button>
      <div class="chat-composer-input">
        <textarea name="body" rows="${draftMode === "proposal" ? "4" : "1"}" maxlength="2000" placeholder="${draftMode === "proposal" ? "Revise sua proposta antes de enviar" : "Comece uma nova mensagem"}" aria-label="Mensagem">${htmlEscape(draft)}</textarea>
        <button type="submit" ${appState.chat.sending || (!draft.trim() && !hasAttachment) ? "disabled" : ""} aria-label="Enviar"><i data-lucide="${appState.chat.sending ? "loader-2" : "send"}"></i></button>
      </div>
    </form>
  </section>`;
}

function renderNewChatModal() {
  if (!appState.chat.newChatOpen) return "";
  const query = appState.chat.userSearch.trim();
  const results = appState.chat.userResults || [];
  return `<div class="chat-new-modal" role="dialog" aria-modal="true" aria-label="Novo chat">
    <div class="chat-new-backdrop" data-action="chat-new-close"></div>
    <section class="chat-new-panel">
      <header>
        <button type="button" data-action="chat-new-close" aria-label="Fechar"><i data-lucide="x"></i></button>
        <h2>Nova mensagem</h2>
      </header>
      <label class="chat-user-search">
        <i data-lucide="search"></i>
        <input type="search" value="${htmlEscape(query)}" placeholder="Buscar pessoas" data-chat-user-search autocomplete="off">
      </label>
      <div class="chat-user-results">
        ${!query ? `<p class="chat-user-empty">Busque por nome, usuario ou artista.</p>` : ""}
        ${query && !results.length ? `<p class="chat-user-empty">Nenhum perfil encontrado.</p>` : ""}
        ${results.map((profile) => {
          const display = profileDisplayData(profile);
          return `<button type="button" data-action="chat-select-user" data-user-id="${htmlEscape(profile.id)}">
            ${profileAvatarMarkup(display, "chat-avatar")}
            <span><strong>${htmlEscape(display.name)}</strong><small>${htmlEscape(display.handle || display.username || "")}</small></span>
          </button>`;
        }).join("")}
      </div>
    </section>
  </div>`;
}

function refreshChatConversationList() {
  const list = document.querySelector(".chat-conversation-list");
  if (!list) return;
  const conversations = filteredChatConversations();
  list.innerHTML = `
    ${appState.chat.loading ? `<div class="chat-list-skeleton"><span></span><span></span><span></span></div>` : ""}
    ${!appState.chat.loading && appState.chat.error ? `<p class="chat-load-error">${htmlEscape(appState.chat.error)}</p>` : ""}
    ${!appState.chat.loading && !appState.chat.error && conversations.length ? conversations.map(chatConversationItemMarkup).join("") : ""}
    ${!appState.chat.loading && !appState.chat.error && !conversations.length ? chatEmptyInboxMarkup() : ""}
  `;
  refreshPlayerIcons();
}

function captureChatVisualState() {
  const chatPage = document.querySelector(".chat-dm-page");
  if (!chatPage) return null;
  const active = document.activeElement;
  const composer = active?.closest?.(".chat-composer-form");
  const composerTextarea = composer?.querySelector("textarea[name='body']");
  const conversationId = composer?.dataset.conversationId || appState.chat.activeConversationId || "";
  if (composerTextarea && conversationId) {
    setChatDraft(conversationId, composerTextarea.value || "");
  }
  const audioStates = [...chatPage.querySelectorAll(".chat-audio-attachment audio")].map((audio) => ({
    src: audio.currentSrc || audio.src || "",
    currentTime: audio.currentTime || 0,
    paused: audio.paused,
    volume: audio.volume,
    muted: audio.muted,
  })).filter((item) => item.src);
  return {
    listScrollTop: chatPage.querySelector(".chat-conversation-list")?.scrollTop || 0,
    messageScrollTop: chatPage.querySelector(".chat-thread-messages")?.scrollTop || 0,
    activeSelector: active?.matches?.("[data-chat-search]")
      ? "[data-chat-search]"
      : active?.matches?.("[data-chat-user-search]")
        ? "[data-chat-user-search]"
        : composerTextarea
          ? `.chat-composer-form[data-conversation-id="${cssEscape(conversationId)}"] textarea[name="body"]`
          : "",
    selectionStart: composerTextarea?.selectionStart ?? null,
    selectionEnd: composerTextarea?.selectionEnd ?? null,
    audioStates,
  };
}

function restoreChatVisualState(snapshot) {
  if (!snapshot) return;
  window.requestAnimationFrame(() => {
    const list = document.querySelector(".chat-conversation-list");
    const messages = document.querySelector(".chat-thread-messages");
    if (list) list.scrollTop = snapshot.listScrollTop || 0;
    if (messages) messages.scrollTop = snapshot.messageScrollTop || 0;
    if (snapshot.activeSelector) {
      const active = document.querySelector(snapshot.activeSelector);
      active?.focus?.({ preventScroll: true });
      if (active?.matches?.("textarea") && snapshot.selectionStart !== null) {
        active.setSelectionRange?.(snapshot.selectionStart, snapshot.selectionEnd ?? snapshot.selectionStart);
      }
    }
    snapshot.audioStates?.forEach((state) => {
      const audio = [...document.querySelectorAll(".chat-audio-attachment audio")].find((node) => (node.currentSrc || node.src || "") === state.src);
      if (!audio) return;
      audio.volume = state.volume;
      audio.muted = state.muted;
      if (Number.isFinite(state.currentTime)) {
        try { audio.currentTime = state.currentTime; } catch (_) {}
      }
      if (!state.paused) {
        audio.play?.().catch(() => {});
      }
    });
  });
}

function shouldAnimateChatRender(nextConversationId, preserveActive) {
  const hasExistingShell = Boolean(document.querySelector(".chat-dm-page"));
  if (!hasExistingShell) return true;
  if (preserveActive) return false;
  return Boolean(nextConversationId && appState.chat.lastRenderedConversationId && appState.chat.lastRenderedConversationId !== nextConversationId);
}

function renderChatPage({ preserveActive = false, restoreVisualState = true } = {}) {
  if (!chatRequireAuth()) return;
  document.body.classList.add("chat-dm-mode");
  const requestedConversationId = chatConversationIdFromHash();
  if (requestedConversationId) appState.chat.activeConversationId = requestedConversationId;
  if (!requestedConversationId && !preserveActive) appState.chat.activeConversationId = "";
  const activeConversationId = appState.chat.activeConversationId || "";
  const visualSnapshot = restoreVisualState ? captureChatVisualState() : null;
  const animateShell = shouldAnimateChatRender(activeConversationId, preserveActive);
  subscribeChatRealtime();
  const cachedInbox = hydrateChatInboxFromCache();
  const shouldRefreshInbox = !preserveActive
    && !appState.chat.loading
    && (
      !appState.chat.conversations.length
      || !appState.chat.lastLoadedAt
      || Date.now() - appState.chat.lastLoadedAt > CHAT_INBOX_CACHE_TTL_MS
      || Boolean(cachedInbox)
    );
  if (shouldRefreshInbox) {
    void loadChatConversations({ render: true });
  }
  if (requestedConversationId && !appState.chat.messages[requestedConversationId] && !appState.chat.messagesLoading) {
    void loadChatMessages(requestedConversationId, { render: true });
  }
  const conversations = filteredChatConversations();
  appView.innerHTML = `<main class="chat-dm-page ${appState.chat.activeConversationId ? "has-active-thread" : ""} ${animateShell ? "is-entering" : "is-stable"}">
    <aside class="chat-x-rail" aria-label="Navegacao rapida">
      <a href="#feed" data-route="feed" aria-label="Inicio"><i data-lucide="home"></i></a>
      <a href="#nexo-feed" data-route="nexo-feed" aria-label="Feed"><i data-lucide="search"></i></a>
      <a href="#comunidade" data-route="comunidade" aria-label="Comunidade"><i data-lucide="bell"></i></a>
      <a href="#produtores" data-route="produtores" aria-label="Profissionais"><i data-lucide="user-plus"></i></a>
      <a href="#bate-papo" data-route="chat" class="is-active" aria-label="Bate-papo"><i data-lucide="message-circle"></i></a>
      <a href="#biblioteca" data-route="biblioteca" aria-label="Biblioteca"><i data-lucide="bookmark"></i></a>
      <a href="#cadastrar" data-route="cadastrar" class="chat-compose-route" aria-label="Publicar"><i data-lucide="square-pen"></i></a>
      <a href="#perfil" data-route="perfil" class="chat-rail-avatar" aria-label="Perfil">${profileAvatarMarkup(profileDisplayData(activeProfile()), "chat-avatar")}</a>
    </aside>
    <section class="chat-list-column">
      <header class="chat-list-header">
        <h1>Bate-papo</h1>
        <div>
          <button type="button" class="chat-filter-pill">Tudo <i data-lucide="chevron-down"></i></button>
          <button type="button" aria-label="Configuracoes"><i data-lucide="inbox"></i></button>
          <button type="button" data-action="chat-new-open" aria-label="Novo chat"><i data-lucide="message-circle-plus"></i></button>
        </div>
      </header>
      <label class="chat-search-field">
        <i data-lucide="search"></i>
        <input type="search" value="${htmlEscape(appState.chat.search)}" placeholder="Buscar" data-chat-search autocomplete="off">
        ${appState.chat.search ? `<button type="button" data-action="chat-clear-search" aria-label="Limpar busca"><i data-lucide="x"></i></button>` : ""}
      </label>
      <nav class="chat-list-tabs" aria-label="Filtros do bate-papo">
        <button type="button" class="is-active">Conversas</button>
        <button type="button">Mensagens</button>
      </nav>
      ${!appState.chat.loading && !appState.chat.error && !conversations.length ? `<div class="chat-empty-action"><button type="button" data-action="chat-new-open"><i data-lucide="message-circle-plus"></i>Nova conversa</button></div>` : ""}
      <div class="chat-conversation-list">
        ${appState.chat.loading ? `<div class="chat-list-skeleton"><span></span><span></span><span></span></div>` : ""}
        ${!appState.chat.loading && appState.chat.error ? `<p class="chat-load-error">${htmlEscape(appState.chat.error)}</p>` : ""}
        ${!appState.chat.loading && !appState.chat.error && conversations.length ? conversations.map(chatConversationItemMarkup).join("") : ""}
        ${!appState.chat.loading && !appState.chat.error && !conversations.length ? chatEmptyInboxMarkup() : ""}
      </div>
    </section>
    <section class="chat-thread-column">
      ${renderChatThread()}
    </section>
    ${renderNewChatModal()}
  </main>`;
  applyLocaleTextOverrides(appView);
  lucide.createIcons();
  initChatAudioPlayers();
  appState.chat.lastRenderedConversationId = activeConversationId;
  if (restoreVisualState && !animateShell) restoreChatVisualState(visualSnapshot);
}

function hiringAvatar(display, className = "hiring-avatar") {
  if (display.avatar) return `<span class="${className}">${optimizedImageMarkup({ src: display.avatar, alt: `Avatar de ${display.name}`, width: 48, height: 48 })}</span>`;
  return `<span class="${className} is-initials" aria-label="Avatar de ${htmlEscape(display.name)}">${htmlEscape(profileInitials(display.name))}</span>`;
}

function hiringDetailIdFromHash() {
  const raw = String(location.hash || "").replace(/^#/, "");
  if (raw.startsWith(`${COMMUNITY_LEGACY_ROUTE}-`)) return safeDecode(raw.replace(new RegExp(`^${COMMUNITY_LEGACY_ROUTE}-`), ""));
  if (raw.startsWith(`${COMMUNITY_ROUTE}-`)) return safeDecode(raw.replace(new RegExp(`^${COMMUNITY_ROUTE}-`), ""));
  return new URLSearchParams(raw.split("?")[1] || "").get("id") || "";
}

function hiringPostUrl(postId) {
  return `${location.origin}${location.pathname}#${COMMUNITY_ROUTE}-${encodeURIComponent(postId)}`;
}

function communityBeatUrl(beatId) {
  return `${location.origin}${location.pathname}#beat-${encodeURIComponent(beatId)}`;
}

function ansendSelectMarkup({
  id,
  label,
  name = "",
  value = "",
  options = [],
  action = "",
  filter = "",
  className = "",
}) {
  const normalizedOptions = options.map(([optionValue, optionLabel]) => [String(optionValue), String(optionLabel)]);
  const selected = normalizedOptions.find(([optionValue]) => optionValue === String(value)) || normalizedOptions[0] || ["", "Selecione"];
  const listId = `${id}-listbox`;
  const inputAttrs = [
    name ? `name="${htmlEscape(name)}"` : "",
    action ? `data-action="${htmlEscape(action)}"` : "",
    filter ? `data-filter="${htmlEscape(filter)}"` : "",
  ].filter(Boolean).join(" ");
  return `<label class="ansend-select-field ${className}">
    <span>${htmlEscape(label)}</span>
    <span class="ansend-select" data-ansend-select data-select-id="${htmlEscape(id)}">
      <input type="hidden" value="${htmlEscape(selected[0])}" ${inputAttrs}>
      <button type="button" class="ansend-select-trigger" data-action="ansend-select-toggle" aria-haspopup="listbox" aria-expanded="false" aria-controls="${htmlEscape(listId)}">
        <span>${htmlEscape(selected[1])}</span>
        <i data-lucide="chevron-down" aria-hidden="true"></i>
      </button>
      <span class="ansend-select-menu" id="${htmlEscape(listId)}" role="listbox" aria-label="${htmlEscape(label)}">
        ${normalizedOptions.map(([optionValue, optionLabel]) => `<button type="button" role="option" data-action="ansend-select-option" data-value="${htmlEscape(optionValue)}" aria-selected="${optionValue === selected[0] ? "true" : "false"}">${htmlEscape(optionLabel)}</button>`).join("")}
      </span>
    </span>
  </label>`;
}

function mergePublicProfiles(profiles = []) {
  if (!Array.isArray(profiles) || !profiles.length) return;
  const byId = new Map(appState.publicProfiles.map((profile) => [String(profile.id), profile]));
  profiles.forEach((profile) => {
    if (profile?.id) byId.set(String(profile.id), { ...(byId.get(String(profile.id)) || {}), ...profile });
  });
  appState.publicProfiles = [...byId.values()];
}

async function getCommunityProfilesForIds(userIds = []) {
  const ids = [...new Set(userIds.filter(Boolean).map(String))].filter((id) => !profileForUserId(id));
  if (!supabaseClient || !ids.length) return [];
  const stop = perfStart("Community profiles query");
  const { data, error } = await withTimeout(
    supabaseClient.from("public_profiles").select(HIRING_PROFILE_SELECT).in("id", ids).limit(ids.length),
    6000,
    "A Comunidade ANSEND demorou para carregar perfis."
  );
  stop();
  if (error) throw error;
  mergePublicProfiles(data || []);
  return data || [];
}

async function getCommunityRecommendedProfiles({ limit = 4 } = {}) {
  if (!supabaseClient) return [];
  const stop = perfStart("Recommended professionals query");
  const { data, error } = await withTimeout(
    supabaseClient
      .from("public_profiles")
      .select(HIRING_PROFILE_SELECT)
      .eq("is_public", true)
      .order("updated_at", { ascending: false })
      .limit(limit),
    6000,
    "A Comunidade ANSEND demorou para carregar profissionais."
  );
  stop();
  if (error) throw error;
  mergePublicProfiles(data || []);
  return data || [];
}

async function getFollowingIdsForCommunity() {
  if (!supabaseClient || !appState.authUser?.id) return [];
  const stop = perfStart("Community following query");
  const { data, error } = await withTimeout(
    supabaseClient.from("user_follows").select("following_id").eq("follower_id", appState.authUser.id).limit(200),
    5000,
    "A Comunidade ANSEND demorou para carregar quem voce segue."
  );
  stop();
  if (error) throw error;
  return (data || []).map((row) => row.following_id).filter(Boolean);
}

async function queryHiringPosts(detailId = hiringDetailIdFromHash()) {
  const stop = perfStart("Community posts query");
  let query = supabaseClient
    .from("hiring_posts")
    .select(HIRING_POST_SELECT)
    .order("created_at", { ascending: false })
    .limit(detailId ? 1 : HIRING_POST_LIMIT);

  if (detailId) {
    query = query.eq("id", detailId);
  } else if (appState.hiring.activeTab === "mine") {
    if (!appState.authUser?.id) return [];
    query = query.eq("user_id", appState.authUser.id);
  } else if (appState.hiring.activeTab === "following") {
    const followingIds = await getFollowingIdsForCommunity();
    if (!followingIds.length) return [];
    query = query.eq("visibility", "public").in("user_id", followingIds);
  } else {
    query = query.eq("visibility", "public");
  }

  const filters = appState.hiring.filters || {};
  if (!detailId && filters.category && filters.category !== "todos") query = query.eq("category", filters.category);
  if (!detailId && filters.deadline && filters.deadline !== "todos") query = query.eq("deadline_type", filters.deadline);
  if (!detailId && filters.status && filters.status !== "todos") query = query.eq("status", filters.status);
  if (!detailId && filters.workMode && filters.workMode !== "todos") query = query.eq("work_mode", filters.workMode);

  const { data, error } = await withTimeout(query, 9000, "A Comunidade ANSEND demorou para responder.");
  stop();
  if (error) throw error;
  let posts = data || [];
  if (!detailId && filters.budget) {
    const max = Number(filters.budget);
    if (Number.isFinite(max) && max > 0) posts = posts.filter((post) => !post.budget_amount || Number(post.budget_amount) <= max);
  }
  return posts;
}

async function loadHiringPosts({ force = false, render = false } = {}) {
  const detailId = hiringDetailIdFromHash();
  const key = hiringCacheKey(detailId);
  const cached = readHiringCache(key);
  if (!supabaseClient) {
    appState.hiring.posts = [];
    appState.hiring.error = "";
    appState.hiring.loading = false;
    appState.hiring.lastLoadedAt = Date.now();
    if (render) updateHiringBlocks();
    return [];
  }
  if (!force && cached) {
    appState.hiring.posts = cached.posts.map((post) => ({ ...post }));
    appState.hiring.comments = { ...cached.comments };
    appState.hiring.proposals = [...cached.proposals];
    appState.hiring.error = "";
    appState.hiring.loading = false;
    appState.hiring.lastLoadedAt = cached.updatedAt;
    if (render) updateHiringBlocks();
    if (Date.now() - cached.updatedAt < 12000) return appState.hiring.posts;
  }

  const requestId = ++appState.hiring.activeRequestId;
  appState.hiring.loading = true;
  appState.hiring.error = "";
  if (render) updateHiringBlocks();

  try {
    const posts = await queryHiringPosts(detailId);
    if (requestId !== appState.hiring.activeRequestId) return appState.hiring.posts;
    appState.hiring.posts = posts.map((post) => ({ ...post, metrics: {}, viewer: {} }));
    appState.hiring.detailId = detailId;

    await Promise.allSettled([
      getCommunityProfilesForIds(appState.hiring.posts.map((post) => post.user_id)),
      getCommunityRecommendedProfiles({ limit: 4 }).catch((error) => {
        appState.hiring.railError = error.message || "Nao foi possivel carregar profissionais.";
        return [];
      }),
      loadHiringEngagement(appState.hiring.posts),
    ]);

    if (requestId !== appState.hiring.activeRequestId) return appState.hiring.posts;
    appState.hiring.lastLoadedAt = Date.now();
    appState.hiring.error = "";
    writeHiringCache(key, {
      posts: appState.hiring.posts.map((post) => ({ ...post })),
      comments: { ...appState.hiring.comments },
      proposals: [...appState.hiring.proposals],
    });
    return appState.hiring.posts;
  } catch (error) {
    console.error("[ANSEND hiring] load failed", error);
    appState.hiring.error = error.message || "Nao foi possivel carregar publicacoes.";
    if (!cached) appState.hiring.posts = [];
    return appState.hiring.posts;
  } finally {
    if (requestId === appState.hiring.activeRequestId) {
      appState.hiring.loading = false;
      if (render) updateHiringBlocks();
      if (perfEnabled() && appState.hiring.routeStartedAt) {
        console.info(`[PERF] Community fully interactive: ${Math.round(performance.now() - appState.hiring.routeStartedAt)}ms`);
      }
    }
  }
}

async function loadHiringEngagement(posts = appState.hiring.posts) {
  const ids = posts.map((post) => post.id).filter(Boolean);
  if (!supabaseClient || !ids.length) return;
  const stop = perfStart("Community engagement queries");
  const results = await withTimeout(Promise.allSettled([
    supabaseClient.from("hiring_likes").select("post_id,user_id").in("post_id", ids),
    supabaseClient.from("hiring_saves").select("post_id,user_id").in("post_id", ids),
    supabaseClient.from("hiring_reposts").select("post_id,user_id").in("post_id", ids),
    supabaseClient.from("hiring_interests").select("post_id,user_id").in("post_id", ids),
    supabaseClient.from("hiring_comments").select("id,post_id,user_id,parent_id,content,created_at").in("post_id", ids).order("created_at", { ascending: true }),
    supabaseClient.from("hiring_proposals").select("id,post_id,sender_id,receiver_id,message,proposed_amount,delivery_deadline,portfolio_links,status,created_at").in("post_id", ids).order("created_at", { ascending: false }),
  ]), 7000, "Engajamento da Comunidade ANSEND demorou para responder.").catch((error) => {
    console.warn("[ANSEND community] engagement fallback", error?.message || error);
    return [];
  });
  stop();
  const safe = (index) => {
    const result = results[index];
    if (result?.status !== "fulfilled" || result.value?.error) return [];
    return result.value.data || [];
  };
  const likes = safe(0);
  const saves = safe(1);
  const reposts = safe(2);
  const interests = safe(3);
  const comments = safe(4);
  const proposals = safe(5);
  const groupedComments = {};
  comments.forEach((comment) => {
    groupedComments[comment.post_id] = groupedComments[comment.post_id] || [];
    groupedComments[comment.post_id].push(comment);
  });
  appState.hiring.comments = groupedComments;
  appState.hiring.proposals = proposals;
  const currentUserId = appState.authUser?.id || "";
  posts.forEach((post) => {
    const postRows = (rows) => rows.filter((row) => row.post_id === post.id);
    post.metrics = {
      likes: postRows(likes).length,
      saves: postRows(saves).length,
      reposts: postRows(reposts).length,
      interests: postRows(interests).length,
      comments: groupedComments[post.id]?.length || 0,
      proposals: postRows(proposals).length,
    };
    post.viewer = {
      liked: postRows(likes).some((row) => row.user_id === currentUserId),
      saved: postRows(saves).some((row) => row.user_id === currentUserId),
      reposted: postRows(reposts).some((row) => row.user_id === currentUserId),
      interested: postRows(interests).some((row) => row.user_id === currentUserId),
      proposed: postRows(proposals).some((row) => row.sender_id === currentUserId),
    };
  });
}

const hiringComposerQuickActions = {
  category: {
    title: "Categoria",
    description: "Ajude a comunidade a entender o tipo de publicacao.",
    choices: hiringCategories.filter(([id]) => id !== "todos").map(([value, label]) => ({ value, label })),
  },
  budget: {
    title: "Orcamento",
    description: "Opcional, mas ajuda a filtrar oportunidades.",
    choices: [
      { value: "negotiable", label: "A combinar", budgetType: "negotiable", budgetAmount: "" },
      { value: "100", label: "Ate R$100", budgetType: "fixed", budgetAmount: "100" },
      { value: "300", label: "R$100-R$300", budgetType: "fixed", budgetAmount: "300" },
      { value: "700", label: "R$300-R$700", budgetType: "fixed", budgetAmount: "700" },
      { value: "1000", label: "R$700+", budgetType: "fixed", budgetAmount: "1000" },
    ],
  },
  deadline: {
    title: "Prazo",
    description: "Quando voce precisa de resposta ou entrega?",
    choices: [
      { value: "hoje", label: "Hoje" },
      { value: "esta_semana", label: "Essa semana" },
      { value: "sem_urgencia", label: "Este mes" },
      { value: "data_personalizada", label: "Sem prazo" },
    ],
  },
  work_mode: {
    title: "Local",
    description: "Escolha como essa conversa ou pedido acontece.",
    choices: Object.entries(hiringWorkModes).map(([value, label]) => ({ value, label })),
  },
};

function hiringComposerHiddenFieldsMarkup() {
  return `<input type="hidden" name="title" value="">
    <input type="hidden" name="category" value="duvidas" data-chip-label="">
    <input type="hidden" name="budget_amount" value="">
    <input type="hidden" name="budget_type" value="fixed">
    <input type="hidden" name="budget_label" value="">
    <input type="hidden" name="deadline_type" value="sem_urgencia" data-chip-label="">
    <input type="hidden" name="work_mode" value="remote" data-chip-label="">
    <input type="hidden" name="references" value="">`;
}

function hiringComposerPopoverMarkup(type, config) {
  return `<section class="hiring-composer-popover" data-hiring-popover="${htmlEscape(type)}" hidden>
    <header><strong>${htmlEscape(config.title)}</strong><button type="button" data-action="hiring-composer-popover-close" aria-label="Fechar"><i data-lucide="x"></i></button></header>
    <p>${htmlEscape(config.description)}</p>
    <div class="hiring-composer-choice-list">
      ${config.choices.map((choice) => `<button type="button" data-action="hiring-composer-choice" data-field="${htmlEscape(type)}" data-value="${htmlEscape(choice.value)}" data-label="${htmlEscape(choice.label)}" data-budget-type="${htmlEscape(choice.budgetType || "")}" data-budget-amount="${htmlEscape(choice.budgetAmount ?? "")}">${htmlEscape(choice.label)}</button>`).join("")}
    </div>
  </section>`;
}

function hiringComposerReferencePopoverMarkup() {
  return `<section class="hiring-composer-popover" data-hiring-popover="references" hidden>
    <header><strong>Referencia</strong><button type="button" data-action="hiring-composer-popover-close" aria-label="Fechar"><i data-lucide="x"></i></button></header>
    <p>Cole um link do YouTube, Spotify, BeatStars, SoundCloud ou texto curto.</p>
    <div class="hiring-composer-reference-row">
      <label class="sr-only" for="hiringReferenceInput">Referencia</label>
      <input id="hiringReferenceInput" type="text" placeholder="Cole uma referencia">
      <button type="button" data-action="hiring-composer-reference-save">Adicionar</button>
    </div>
  </section>`;
}

function hiringComposerMarkup() {
  const profile = profileDisplayData(activeProfile());
  const publishLabel = appState.hiring.submitting ? "Publicando..." : "Publicar";
  return `<form class="hiring-composer" data-hiring-composer novalidate>
    ${hiringAvatar({ ...profile, name: profile.name || "ANSEND" })}
    <div class="hiring-composer-main">
      ${hiringComposerHiddenFieldsMarkup()}
      <label class="sr-only" for="hiringDescription">Descricao</label>
      <textarea id="hiringDescription" name="description" maxlength="1200" rows="2" placeholder="O que esta acontecendo na musica?" aria-label="O que esta acontecendo na musica?"></textarea>
      <div class="hiring-composer-chips" data-hiring-composer-chips aria-live="polite"></div>
      <div class="hiring-composer-popovers">
        ${Object.entries(hiringComposerQuickActions).map(([type, config]) => hiringComposerPopoverMarkup(type, config)).join("")}
        ${hiringComposerReferencePopoverMarkup()}
      </div>
      <div class="hiring-composer-tools" aria-label="Opcoes da publicacao">
        <div class="hiring-composer-action-row">
          <button type="button" data-action="hiring-composer-soon" title="Imagem/anexo" aria-label="Imagem/anexo"><i data-lucide="image"></i></button>
          <button type="button" data-action="hiring-composer-soon" title="Beat ou audio" aria-label="Beat ou audio"><i data-lucide="music"></i></button>
          <button type="button" data-action="hiring-composer-popover" data-popover="references" title="Link ou referencia" aria-label="Link ou referencia"><i data-lucide="link"></i></button>
          <button type="button" data-action="hiring-composer-soon" title="Enquete" aria-label="Enquete"><i data-lucide="list-checks"></i></button>
          <button type="button" data-action="hiring-composer-soon" title="Emoji" aria-label="Emoji"><i data-lucide="smile"></i></button>
          <button type="button" data-action="hiring-composer-popover" data-popover="category" title="Categoria" aria-label="Categoria"><i data-lucide="tags"></i><span>Categoria</span></button>
          <button type="button" data-action="hiring-composer-popover" data-popover="budget" title="Orcamento" aria-label="Orcamento"><i data-lucide="badge-dollar-sign"></i><span>Orcamento</span></button>
          <button type="button" data-action="hiring-composer-popover" data-popover="work_mode" title="Local" aria-label="Local"><i data-lucide="map-pin"></i><span>Local</span></button>
          <button type="button" data-action="hiring-composer-popover" data-popover="deadline" title="Prazo" aria-label="Prazo"><i data-lucide="clock"></i><span>Prazo</span></button>
        </div>
        <button type="submit" class="hiring-publish-btn" disabled>${publishLabel}</button>
      </div>
    </div>
  </form>`;
}

function hiringFiltersMarkup() {
  const filters = appState.hiring.filters;
  const chips = [
    ["todos", "Todos", { category: "todos", deadline: "todos", status: "todos", workMode: "todos", budget: "" }],
    ["duvidas", "Duvidas", { category: "duvidas" }],
    ["contratacoes", "Pedidos profissionais", { category: "contratacoes" }],
    ["oportunidades", "Oportunidades", { category: "oportunidades" }],
    ["beats", "Beats", { category: "beats" }],
    ["mixmaster", "Mix/Master", { category: "mix_master" }],
    ["design", "Design", { category: "design" }],
    ["networking", "Networking", { category: "networking" }],
    ["urgente", "Urgente", { deadline: "hoje" }],
    ["remoto", "Remoto", { workMode: "remote" }],
    ["ate300", "Ate R$300", { budget: "300" }],
    ["hoje", "Hoje", { deadline: "hoje" }],
  ];
  return `<section class="hiring-filter-strip" aria-label="Filtros rapidos">
    ${chips.map(([id, label, payload]) => {
      const active = Object.entries(payload).every(([key, value]) => String(filters[key] || (key === "budget" ? "" : "todos")) === String(value));
      return `<button type="button" class="${active ? "is-active" : ""}" data-action="hiring-filter-chip" data-filter-payload="${htmlEscape(JSON.stringify(payload))}">${label}</button>`;
    }).join("")}
    <button type="button" data-action="hiring-toggle-filters"><i data-lucide="sliders-horizontal"></i>Filtros</button>
  </section>
  <section class="hiring-filters" aria-label="Filtros da comunidade" hidden>
    ${ansendSelectMarkup({ id: "hiringFilterCategory", label: "Categoria", value: filters.category, options: hiringCategories, action: "hiring-filter", filter: "category" })}
    <label>Orcamento<input data-action="hiring-filter" data-filter="budget" type="number" min="0" value="${htmlEscape(filters.budget || "")}" placeholder="Max. R$"></label>
    ${ansendSelectMarkup({ id: "hiringFilterDeadline", label: "Prazo", value: filters.deadline, options: [["todos", "Todos"], ...hiringDeadlines], action: "hiring-filter", filter: "deadline" })}
    ${ansendSelectMarkup({ id: "hiringFilterStatus", label: "Status", value: filters.status, options: [["todos", "Todos"], ...Object.entries(hiringStatusLabels)], action: "hiring-filter", filter: "status" })}
    ${ansendSelectMarkup({ id: "hiringFilterWorkMode", label: "Tipo", value: filters.workMode, options: [["todos", "Todos"], ...Object.entries(hiringWorkModes)], action: "hiring-filter", filter: "workMode" })}
  </section>`;
}

function hiringEmptyMarkup(title = "Nenhuma publicacao ainda.", text = "Seja o primeiro a comecar uma conversa com a comunidade da musica.") {
  return `<section class="hiring-empty"><i data-lucide="messages-square"></i><h2>${htmlEscape(title)}</h2><p>${htmlEscape(text)}</p><button type="button" data-action="hiring-focus-composer">Criar publicacao</button></section>`;
}

function normalizePromotedBeatAd(row = {}) {
  const targetUrl = row.target_url || (row.beat_id ? communityBeatUrl(row.beat_id) : "#catalogo");
  const audioUrl = row.audio_url || row.preview_url || row.audio_preview_url || row.track_url || "";
  const priceLabel = row.price_label || (Number(row.price || 0)
    ? Number(row.price).toLocaleString(appLocale.current === "pt-BR" ? "pt-BR" : "en-US", {
        style: "currency",
        currency: appLocale.current === "pt-BR" ? "BRL" : "USD",
      })
    : "");
  return {
    id: row.id || "",
    beatId: row.beat_id || "",
    title: row.title || "Beat impulsionado",
    artist: row.artist_name || row.producer_name || "Produtor ANSEND",
    cover: row.cover_url || row.youtube_thumbnail_url || "assets/ansend-logo-square.png",
    audioUrl,
    priceLabel,
    tag: row.tagline || row.genre || "Beat em destaque",
    targetUrl,
    impressions: Number(row.impressions || 0),
    clicks: Number(row.clicks || 0),
  };
}

function communityAdPlaceholderMarkup({ loading = false } = {}) {
  return `<article class="community-ad-card is-placeholder ${loading ? "is-loading" : ""}" aria-label="Espaco de anuncio da Comunidade ANSEND">
    <div class="community-ad-placeholder-art" aria-hidden="true">
      <i data-lucide="${loading ? "loader-circle" : "megaphone"}"></i>
    </div>
    <div class="community-ad-copy">
      <span>${loading ? "ANSEND Ads" : "Patrocinado"}</span>
      <strong>${loading ? "Carregando destaque" : "Divulgue seu beat"}</strong>
      <p>${loading ? "Buscando campanhas ativas." : "Apareca para artistas e produtores na Comunidade."}</p>
      <a class="community-ad-cta" href="#ofertas" data-route="ofertas">Criar anuncio</a>
    </div>
  </article>`;
}

function communityAdBeatItem(ad = {}) {
  return {
    id: ad.beatId || `promoted-${ad.id}`,
    title: ad.title || "Beat impulsionado",
    producer: ad.artist || "Produtor ANSEND",
    cover: ad.cover || IMAGE_FALLBACK_SRC,
    audio: ad.audioUrl || "",
    audio_url: ad.audioUrl || "",
    source_type: "upload",
    price: ad.priceLabel || "",
    genre: ad.tag || "",
    raw: {
      audio_url: ad.audioUrl || "",
      cover_url: ad.cover || "",
      target_url: ad.targetUrl || "",
    },
  };
}

function communityAdMarkup() {
  const adState = appState.hiring.promotedAd;
  if (adState.loading && !adState.item) return communityAdPlaceholderMarkup({ loading: true });
  const ad = adState.item;
  if (!ad) return communityAdPlaceholderMarkup();
  const beatItem = communityAdBeatItem(ad);
  const isPlaying = PlayerStore.isPlaying(beatItem.id);
  const safeTarget = htmlEscape(safeUrl(ad.targetUrl, { fallback: "#marketplace" }));
  return `<article class="community-ad-card ${isPlaying ? "is-playing" : ""}" data-promoted-ad-id="${htmlEscape(ad.id)}" data-promoted-beat-id="${htmlEscape(beatItem.id)}" aria-label="Beat impulsionado: ${htmlEscape(ad.title)}">
    <a class="community-ad-cover" href="${safeTarget}" data-action="community-ad-open" data-ad-id="${htmlEscape(ad.id)}" aria-label="Ver beat ${htmlEscape(ad.title)}">
      ${optimizedImageMarkup({ src: ad.cover, alt: `Capa de ${ad.title}`, width: 320, height: 420, sizes: "(max-width: 900px) 86vw, 238px" })}
    </a>
    <div class="community-ad-shade" aria-hidden="true"></div>
    <div class="community-ad-kicker"><span>Patrocinado</span><small>ANSEND Ads</small></div>
    <button class="community-ad-play" type="button" data-action="community-ad-play" data-ad-id="${htmlEscape(ad.id)}" aria-label="${isPlaying ? "Pausar" : "Ouvir"} beat ${htmlEscape(ad.title)}">
      <span class="player-state-icon" aria-hidden="true">${playerControlIconMarkup(isPlaying ? "pause" : "play")}</span>
    </button>
    <button class="community-ad-menu" type="button" aria-label="Mais opcoes do anuncio"><i data-lucide="more-horizontal"></i></button>
    <div class="community-ad-copy">
      <span>${htmlEscape(ad.tag)}</span>
      <strong>${htmlEscape(ad.title)}</strong>
      <p>${htmlEscape(ad.artist)}</p>
      ${ad.priceLabel ? `<em>${htmlEscape(ad.priceLabel)}</em>` : ""}
      <a class="community-ad-cta" href="${safeTarget}" data-action="community-ad-open" data-ad-id="${htmlEscape(ad.id)}"><i data-lucide="play"></i>Ouvir beat</a>
    </div>
  </article>`;
}

function communityAdRailMarkup() {
  return `<aside class="community-ad-rail" aria-label="Anuncios pagos da Comunidade ANSEND">
    ${communityAdMarkup()}
  </aside>`;
}

function updateCommunityAdRail() {
  if (currentRoute() !== COMMUNITY_ROUTE) return;
  const rail = document.querySelector(".community-ad-rail");
  if (rail) rail.innerHTML = communityAdMarkup();
  hydrateView();
}

async function toggleCommunityAdPlayback(adId = "") {
  const ad = appState.hiring.promotedAd.item;
  if (!ad || String(ad.id) !== String(adId)) return false;
  const item = communityAdBeatItem(ad);
  if (!item.audio && !item.audio_url) {
    trackCommunityAdEvent("click", ad.id);
    const targetUrl = safeUrl(ad.targetUrl, { fallback: "#marketplace" });
    if (targetUrl.startsWith("#")) location.hash = targetUrl.slice(1);
    else window.location.href = targetUrl;
    return false;
  }
  const played = await toggleBeatPlayback(item);
  if (played) trackCommunityAdEvent("click", ad.id);
  return played;
}

function validPromotedBeatWindow(row = {}) {
  const now = Date.now();
  const startsAt = row.starts_at ? Date.parse(row.starts_at) : null;
  const endsAt = row.ends_at ? Date.parse(row.ends_at) : null;
  return (!startsAt || startsAt <= now) && (!endsAt || endsAt >= now);
}

async function loadCommunityPromotedAd({ render = false } = {}) {
  const adState = appState.hiring.promotedAd;
  if (!supabaseClient) {
    adState.item = null;
    adState.loading = false;
    adState.error = "";
    if (render) updateCommunityAdRail();
    return null;
  }
  const requestId = ++adState.activeRequestId;
  adState.loading = true;
  adState.error = "";
  if (render) updateCommunityAdRail();
  try {
    const query = supabaseClient
      .from("promoted_beats")
      .select("id,beat_id,user_id,title,artist_name,producer_name,cover_url,youtube_thumbnail_url,target_url,price,price_label,tagline,genre,status,starts_at,ends_at,impressions,clicks,created_at")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(8);
    const { data, error } = await withTimeout(query, 1600, "A area de anuncios demorou para responder.");
    if (requestId !== adState.activeRequestId) return adState.item;
    if (error) throw error;
    const active = (data || []).filter(validPromotedBeatWindow);
    adState.item = active.length ? normalizePromotedBeatAd(active[Math.floor(Math.random() * active.length)]) : null;
    adState.error = "";
    if (adState.item?.id && adState.trackedImpressionId !== adState.item.id) {
      adState.trackedImpressionId = adState.item.id;
      trackCommunityAdEvent("impression", adState.item.id);
    }
    return adState.item;
  } catch (error) {
    console.warn("[ANSEND community ads] fallback", error?.message || error);
    if (requestId === adState.activeRequestId) {
      adState.item = null;
      adState.error = error?.message || "Nao foi possivel carregar anuncios.";
    }
    return null;
  } finally {
    if (requestId === adState.activeRequestId) {
      adState.loading = false;
      if (render) updateCommunityAdRail();
    }
  }
}

async function trackCommunityAdEvent(kind, adId) {
  if (!supabaseClient || !appState.authUser || !adId) return;
  const rpcName = kind === "click" ? "increment_promoted_beat_click" : "increment_promoted_beat_impression";
  try {
    await supabaseClient.rpc(rpcName, { p_ad_id: adId });
  } catch (error) {
    console.warn("[ANSEND community ads] tracking skipped", error?.message || error);
  }
}

function closeHiringComposerPopovers(form = document) {
  form.querySelectorAll?.(".hiring-composer-popover").forEach((popover) => { popover.hidden = true; });
  form.querySelectorAll?.('[data-action="hiring-composer-popover"]').forEach((button) => button.classList.remove("is-active"));
}

function openHiringComposerPopover(form, type) {
  if (!form || !type) return;
  closeHiringComposerPopovers(form);
  const popover = form.querySelector(`[data-hiring-popover="${CSS.escape(type)}"]`);
  const trigger = form.querySelector(`[data-action="hiring-composer-popover"][data-popover="${CSS.escape(type)}"]`);
  if (!popover) return;
  popover.hidden = false;
  trigger?.classList.add("is-active");
  popover.querySelector("button, input")?.focus({ preventScroll: true });
}

function hiringComposerChipData(form) {
  const elements = form?.elements;
  if (!elements) return [];
  const chips = [];
  if (elements.category?.dataset.chipLabel) chips.push(["category", elements.category.dataset.chipLabel]);
  if (elements.budget_label?.value) chips.push(["budget", elements.budget_label.value]);
  if (elements.work_mode?.dataset.chipLabel) chips.push(["work_mode", elements.work_mode.dataset.chipLabel]);
  if (elements.deadline_type?.dataset.chipLabel) chips.push(["deadline", elements.deadline_type.dataset.chipLabel]);
  if (elements.references?.value) chips.push(["references", elements.references.value]);
  return chips;
}

function updateHiringComposerChips(form) {
  const container = form?.querySelector("[data-hiring-composer-chips]");
  if (!container) return;
  const chips = hiringComposerChipData(form);
  container.innerHTML = chips.map(([field, label]) => `<span class="hiring-composer-chip" data-chip-field="${htmlEscape(field)}">${htmlEscape(label)}<button type="button" data-action="hiring-composer-chip-remove" data-field="${htmlEscape(field)}" aria-label="Remover ${htmlEscape(label)}"><i data-lucide="x"></i></button></span>`).join("");
  hydrateView();
}

function setHiringComposerChoice(form, target) {
  const field = target?.dataset.field || "";
  if (!form || !field) return;
  const elements = form.elements;
  const label = target.dataset.label || target.textContent.trim();
  if (field === "budget") {
    elements.budget_type.value = target.dataset.budgetType || "fixed";
    elements.budget_amount.value = target.dataset.budgetAmount || "";
    elements.budget_label.value = label;
  } else if (field === "work_mode") {
    elements.work_mode.value = target.dataset.value || "remote";
    elements.work_mode.dataset.chipLabel = label;
  } else if (field === "deadline") {
    elements.deadline_type.value = target.dataset.value || "sem_urgencia";
    elements.deadline_type.dataset.chipLabel = label;
  } else if (field === "category") {
    elements.category.value = target.dataset.value || "duvidas";
    elements.category.dataset.chipLabel = label;
  }
  closeHiringComposerPopovers(form);
  updateHiringComposerChips(form);
}

function removeHiringComposerChip(form, field) {
  if (!form || !field) return;
  const elements = form.elements;
  if (field === "budget") {
    elements.budget_type.value = "fixed";
    elements.budget_amount.value = "";
    elements.budget_label.value = "";
  } else if (field === "work_mode") {
    elements.work_mode.value = "remote";
    elements.work_mode.dataset.chipLabel = "";
  } else if (field === "deadline") {
    elements.deadline_type.value = "sem_urgencia";
    elements.deadline_type.dataset.chipLabel = "";
  } else if (field === "category") {
    elements.category.value = "duvidas";
    elements.category.dataset.chipLabel = "";
  } else if (field === "references") {
    elements.references.value = "";
  }
  updateHiringComposerChips(form);
}

function resetHiringComposerMeta(form) {
  if (!form?.elements) return;
  form.elements.category.value = "duvidas";
  form.elements.category.dataset.chipLabel = "";
  form.elements.budget_type.value = "fixed";
  form.elements.budget_amount.value = "";
  form.elements.budget_label.value = "";
  form.elements.deadline_type.value = "sem_urgencia";
  form.elements.deadline_type.dataset.chipLabel = "";
  form.elements.work_mode.value = "remote";
  form.elements.work_mode.dataset.chipLabel = "";
  form.elements.references.value = "";
  updateHiringComposerChips(form);
}

function closeAnsendSelects(except = null) {
  document.querySelectorAll(".ansend-select.is-open").forEach((select) => {
    if (select === except) return;
    select.classList.remove("is-open");
    select.querySelector(".ansend-select-trigger")?.setAttribute("aria-expanded", "false");
  });
}

function openAnsendSelect(select, { focusSelected = false } = {}) {
  if (!select) return;
  closeAnsendSelects(select);
  select.classList.add("is-open");
  select.querySelector(".ansend-select-trigger")?.setAttribute("aria-expanded", "true");
  if (focusSelected) {
    const selectedOption = select.querySelector('[role="option"][aria-selected="true"]') || select.querySelector('[role="option"]');
    selectedOption?.focus({ preventScroll: true });
  }
}

function setAnsendSelectValue(select, value, { emitChange = true } = {}) {
  if (!select) return;
  const input = select.querySelector("input[type='hidden']");
  const triggerLabel = select.querySelector(".ansend-select-trigger span");
  const options = [...select.querySelectorAll('[role="option"]')];
  const nextOption = options.find((option) => String(option.dataset.value) === String(value)) || options[0];
  if (!input || !nextOption) return;
  options.forEach((option) => option.setAttribute("aria-selected", String(option === nextOption)));
  input.value = nextOption.dataset.value || "";
  if (triggerLabel) triggerLabel.textContent = nextOption.textContent.trim();
  closeAnsendSelects();
  select.querySelector(".ansend-select-trigger")?.focus({ preventScroll: true });
  if (emitChange) input.dispatchEvent(new Event("change", { bubbles: true }));
}

function focusAnsendSelectOption(select, direction = 1) {
  const options = [...(select?.querySelectorAll('[role="option"]') || [])];
  if (!options.length) return;
  const activeIndex = Math.max(0, options.indexOf(document.activeElement));
  const selectedIndex = Math.max(0, options.findIndex((option) => option.getAttribute("aria-selected") === "true"));
  const baseIndex = document.activeElement?.getAttribute?.("role") === "option" ? activeIndex : selectedIndex;
  const nextIndex = Math.max(0, Math.min(options.length - 1, baseIndex + direction));
  options[nextIndex]?.focus({ preventScroll: true });
}

function hiringCommentMarkup(comment) {
  const author = hiringAuthorDisplay(comment.user_id);
  return `<article class="hiring-comment" data-comment-id="${htmlEscape(comment.id)}">
    ${hiringAvatar(author, "hiring-comment-avatar")}
    <div><strong>${htmlEscape(author.name)}</strong><span>${htmlEscape(author.handle)} · ${hiringRelativeDate(comment.created_at)}</span><p>${htmlEscape(comment.content)}</p></div>
    ${comment.user_id === appState.authUser?.id ? `<button type="button" data-action="hiring-comment-delete" data-comment-id="${htmlEscape(comment.id)}" aria-label="Apagar comentario"><i data-lucide="trash-2"></i></button>` : ""}
  </article>`;
}

function hiringProposalPreviewMarkup(proposal) {
  const sender = hiringAuthorDisplay(proposal.sender_id);
  const amount = proposal.proposed_amount ? Number(proposal.proposed_amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "Valor a combinar";
  return `<article class="hiring-proposal-preview"><strong>${htmlEscape(sender.name)}</strong><span>${amount} · ${htmlEscape(proposal.delivery_deadline || "Prazo a combinar")}</span><p>${htmlEscape(proposal.message)}</p>${proposal.portfolio_links ? `<small>${htmlEscape(proposal.portfolio_links)}</small>` : ""}</article>`;
}

function hiringPostCardMarkup(post, { detail = false } = {}) {
  const author = hiringAuthorDisplay(post.user_id);
  const isOwner = appState.authUser?.id && appState.authUser.id === post.user_id;
  const interestBusy = Boolean(appState.chat.pendingActions[`${post.id}:interest`]);
  const proposalBusy = Boolean(appState.chat.pendingActions[`${post.id}:proposal`]);
  const comments = appState.hiring.comments[post.id] || [];
  const ownerProposals = isOwner ? appState.hiring.proposals.filter((proposal) => proposal.post_id === post.id) : [];
  const profileAttrs = profileTargetAttrs({ id: author.id, username: author.username, title: author.name });
  const title = String(post.title || "").trim();
  const description = String(post.description || "").trim();
  const shouldShowDescription = description && description.toLocaleLowerCase("pt-BR") !== title.toLocaleLowerCase("pt-BR");
  return `<article class="hiring-post ${detail ? "is-detail" : ""}" data-post-id="${htmlEscape(post.id)}">
    <header class="hiring-post-head">
      <button type="button" class="hiring-author-avatar" data-action="hiring-open-profile" ${profileAttrs}>${hiringAvatar(author)}</button>
      <div class="hiring-author-copy">
        <button type="button" data-action="hiring-open-profile" ${profileAttrs}><strong>${htmlEscape(author.name)}</strong>${author.verified ? `<i data-lucide="badge-check" aria-label="Verificado"></i>` : ""}<span>${htmlEscape(author.handle || "@ansend")} · ${hiringRelativeDate(post.created_at)}</span></button>
        <small>${htmlEscape(author.roleLabel || "Profissional da musica")}</small>
      </div>
      <button type="button" class="hiring-icon-btn" aria-label="Mais opcoes"><i data-lucide="more-horizontal"></i></button>
    </header>
    <button type="button" class="hiring-post-body" data-action="hiring-open-post" data-post-id="${htmlEscape(post.id)}">
      ${title ? `<h2>${htmlEscape(title)}</h2>` : ""}
      ${shouldShowDescription ? `<p>${htmlEscape(description)}</p>` : ""}
      ${post.reference_links ? `<small><i data-lucide="link"></i>${htmlEscape(post.reference_links)}</small>` : ""}
    </button>
    <div class="hiring-post-actions">
      <button type="button" data-action="hiring-comment-toggle" data-post-id="${htmlEscape(post.id)}" aria-label="Comentar"><i data-lucide="message-circle"></i><span>${post.metrics?.comments || 0}</span></button>
      <button type="button" class="${post.viewer?.reposted ? "is-active" : ""}" data-action="hiring-repost" data-post-id="${htmlEscape(post.id)}" aria-label="Repostar"><i data-lucide="repeat-2"></i><span>${post.metrics?.reposts || 0}</span></button>
      <button type="button" class="${post.viewer?.liked ? "is-active" : ""}" data-action="hiring-like" data-post-id="${htmlEscape(post.id)}" aria-label="Curtir"><i data-lucide="heart"></i><span>${post.metrics?.likes || 0}</span></button>
      <button type="button" class="${post.viewer?.saved ? "is-active" : ""}" data-action="hiring-save" data-post-id="${htmlEscape(post.id)}" aria-label="Salvar"><i data-lucide="bookmark"></i><span>${post.metrics?.saves || 0}</span></button>
      <button type="button" data-action="hiring-share" data-post-id="${htmlEscape(post.id)}" aria-label="Compartilhar"><i data-lucide="share"></i></button>
      <button type="button" class="hiring-chat-icon" data-action="hiring-chat-open" data-post-id="${htmlEscape(post.id)}" ${isOwner || interestBusy ? "disabled" : ""} aria-label="Abrir chat"><i data-lucide="${interestBusy ? "loader-2" : "messages-square"}"></i></button>
    </div>
    <div class="hiring-professional-actions">
      <button type="button" class="hiring-compact-cta ${post.viewer?.interested ? "is-active" : ""}" data-action="hiring-interest" data-post-id="${htmlEscape(post.id)}" ${isOwner || interestBusy ? "disabled" : ""}><i data-lucide="${interestBusy ? "loader-2" : "hand"}"></i>${interestBusy ? "Abrindo chat..." : (post.viewer?.interested ? "Interesse enviado" : "Tenho interesse")}</button>
      <button type="button" class="hiring-compact-cta ${post.viewer?.proposed ? "is-active" : ""}" data-action="hiring-proposal-open" data-post-id="${htmlEscape(post.id)}" ${isOwner || proposalBusy ? "disabled" : ""}><i data-lucide="${proposalBusy ? "loader-2" : "send"}"></i>${proposalBusy ? "Abrindo proposta..." : (post.viewer?.proposed ? "Proposta enviada" : "Enviar proposta")}</button>
      ${isOwner ? `<label class="hiring-status-select">Status<select data-action="hiring-status" data-post-id="${htmlEscape(post.id)}">${Object.entries(hiringStatusLabels).map(([id, label]) => `<option value="${id}" ${post.status === id ? "selected" : ""}>${label}</option>`).join("")}</select></label>` : ""}
    </div>
    <section class="hiring-comments" ${detail ? "" : "hidden"}>
      <div class="hiring-comment-list">${comments.length ? comments.map(hiringCommentMarkup).join("") : `<p>Seja o primeiro a comentar.</p>`}</div>
      <form class="hiring-comment-form" data-post-id="${htmlEscape(post.id)}"><label class="sr-only" for="hiringComment-${htmlEscape(post.id)}">Comentario</label><input id="hiringComment-${htmlEscape(post.id)}" name="content" type="text" maxlength="500" placeholder="Escreva um comentario"><button type="submit">Responder</button></form>
    </section>
    ${ownerProposals.length ? `<section class="hiring-owner-proposals"><h3>Propostas recebidas</h3>${ownerProposals.map(hiringProposalPreviewMarkup).join("")}</section>` : ""}
  </article>`;
}

function hiringRightRailMarkup() {
  const professionals = activeProfessionalProfiles().slice(0, 4);
  const categoryCounts = new Map();
  appState.hiring.posts.forEach((post) => {
    const label = hiringCategoryLabel(post.category);
    categoryCounts.set(label, (categoryCounts.get(label) || 0) + 1);
  });
  const categories = [...categoryCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const fallbackCategories = [["Duvidas", "duvidas"], ["Pedidos profissionais", "contratacoes"], ["Oportunidades", "oportunidades"], ["Beats", "beats"], ["Networking", "networking"]];
  const categoryRows = (categories.length
    ? categories.map(([label, count]) => [label, hiringCategories.find(([, categoryLabel]) => categoryLabel === label)?.[0] || "todos", count])
    : fallbackCategories.map(([label, id]) => [label, id, ""])
  ).map(([label, id, count]) => `<button type="button" data-action="hiring-filter-chip" data-filter-payload="${htmlEscape(JSON.stringify({ category: id }))}"><span>${htmlEscape(label)}</span>${count ? `<small>${count} publicacoes</small>` : `<small>Categoria</small>`}</button>`).join("");
  const professionalRows = professionals.length
    ? professionals.map((profile) => `<article>
        ${hiringAvatar({ name: profile.name, avatar: profile.avatar_url || profile.avatar }, "hiring-rail-avatar")}
        <div><strong>${htmlEscape(profile.name)}</strong><small>@${htmlEscape(profile.username || sanitizeHandle(profile.name))} · ${htmlEscape(profile.role)}</small></div>
        <button type="button" data-action="producer" ${profileTargetAttrs({ id: profile.id, username: profile.username, title: profile.name })}>Ver</button>
      </article>`).join("")
    : appState.hiring.loading
      ? `<div class="hiring-rail-skeleton"><span></span><span></span><span></span></div>`
      : appState.hiring.railError
        ? `<p class="hiring-rail-muted">Nao foi possivel carregar profissionais.</p>`
        : `<p class="hiring-rail-muted">Complete perfis publicos para aparecerem aqui.</p>`;
  return `<aside class="hiring-right-rail" aria-label="Widgets da Comunidade ANSEND">
    <section>
      <h2>Complete seu perfil</h2>
      <p>Perfis completos recebem mais propostas e respostas mais rapidas.</p>
      <button type="button" data-route="perfil">Editar perfil</button>
    </section>
    <section>
      <h2>Categorias em alta</h2>
      <div class="hiring-trend-list">${categoryRows}</div>
    </section>
    <section>
      <h2>Profissionais recomendados</h2>
      <div class="hiring-follow-list">${professionalRows}</div>
    </section>
    <section>
      <h2>Dicas para contratar</h2>
      <ul>
        <li>Defina referencias claras.</li>
        <li>Informe prazo e orcamento.</li>
        <li>Prefira perfis verificados.</li>
      </ul>
    </section>
  </aside>`;
}

function hiringFeedMarkup() {
  const detailId = hiringDetailIdFromHash();
  const isFollowing = appState.hiring.activeTab === "following" && !detailId;
  return appState.hiring.loading && !appState.hiring.posts.length
    ? `<div class="hiring-skeleton" aria-label="Carregando publicacoes"><span></span><span></span><span></span><span></span><span></span></div>`
    : appState.hiring.error
      ? `<section class="hiring-empty is-error"><i data-lucide="triangle-alert"></i><h2>Nao foi possivel carregar publicacoes</h2><p>${htmlEscape(appState.hiring.error)}</p><button type="button" data-action="hiring-refresh">Tentar novamente</button></section>`
      : isFollowing
        ? hiringEmptyMarkup("Voce ainda nao segue conversas da comunidade.", "Quando houver um sistema de conexoes ativo, esta aba mostrara somente publicacoes de quem voce segue.")
        : appState.hiring.posts.length
          ? appState.hiring.posts.map((post) => hiringPostCardMarkup(post, { detail: Boolean(detailId) })).join("")
          : hiringEmptyMarkup();
}

function updateHiringBlocks() {
  if (currentRoute() !== COMMUNITY_ROUTE) return;
  const feed = document.querySelector(".hiring-feed");
  if (feed) feed.innerHTML = hiringFeedMarkup();
  updateCommunityAdRail();
  const rail = document.querySelector(".hiring-right-rail");
  if (rail) rail.outerHTML = hiringRightRailMarkup();
  hydrateView();
}

async function renderHiringPage(options = {}) {
  const stop = perfStart("Community route mounted");
  appState.hiring.routeStartedAt = performance.now();
  const detailId = hiringDetailIdFromHash();
  const key = hiringCacheKey(detailId);
  const cached = readHiringCache(key);
  if (cached && !options.force) {
    appState.hiring.posts = cached.posts.map((post) => ({ ...post }));
    appState.hiring.comments = { ...cached.comments };
    appState.hiring.proposals = [...cached.proposals];
    appState.hiring.error = "";
    appState.hiring.loading = false;
  } else if (!appState.hiring.posts.length || options.force || detailId) {
    appState.hiring.loading = true;
    appState.hiring.error = "";
  }
  const tabs = [["for-you", "Para voce"], ["following", "Seguindo"], ["mine", "Minhas publicacoes"]];
  const postsMarkup = hiringFeedMarkup();
  appView.innerHTML = `<main class="hiring-page hiring-native-layout" aria-labelledby="hiringTitlePage">
    ${communityAdRailMarkup()}
    <section class="hiring-feed-shell">
      <header class="hiring-topbar">
        <div><h1 id="hiringTitlePage">${COMMUNITY_TITLE}</h1><p>${COMMUNITY_SUBTITLE}</p></div>
        <nav class="hiring-tabs" aria-label="Feed da Comunidade ANSEND">${tabs.map(([id, label]) => `<button type="button" data-action="hiring-tab" data-tab="${id}" class="${appState.hiring.activeTab === id ? "is-active" : ""}" aria-pressed="${appState.hiring.activeTab === id ? "true" : "false"}">${label}</button>`).join("")}</nav>
      </header>
      ${detailId ? `<button type="button" class="hiring-back" data-action="hiring-back"><i data-lucide="arrow-left"></i>Voltar ao feed</button>` : ""}
      ${!detailId ? hiringComposerMarkup() : ""}${!detailId ? hiringFiltersMarkup() : ""}
      <section class="hiring-feed" aria-live="polite">${postsMarkup}</section>
    </section>
    ${hiringRightRailMarkup()}
  </main>`;
  hydrateView();
  stop();
  loadCommunityPromotedAd({ render: true });
  loadHiringPosts({ force: Boolean(options.force || detailId || !cached), render: true });
}

async function submitHiringPost(form) {
  await waitForHiringAuthReady();
  if (!hiringRequireAuth()) return;
  if (appState.hiring.submitting) return;
  const description = String(form.elements.description?.value || "").trim();
  if (!description) {
    showToast("Escreva algo para publicar.", "triangle-alert");
    return;
  }
  const submitButton = form.querySelector('button[type="submit"]');
  appState.hiring.submitting = true;
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Publicando...";
  }
  const title = String(form.elements.title?.value || description.split(/\s+/).slice(0, 10).join(" ")).trim();
  const budgetType = form.elements.budget_type?.value || "fixed";
  const payload = {
    user_id: appState.authUser.id,
    title: title.slice(0, 120),
    description: description.slice(0, 1200),
    category: form.elements.category?.value || "duvidas",
    budget_amount: budgetType === "negotiable" ? null : (form.elements.budget_amount?.value ? Number(form.elements.budget_amount.value) : null),
    budget_type: budgetType,
    currency: "BRL",
    deadline_type: form.elements.deadline_type?.value || "sem_urgencia",
    work_mode: form.elements.work_mode?.value || "remote",
    reference_links: String(form.elements.references?.value || "").trim() || null,
    attachments: [],
    status: "open",
    visibility: "public",
  };
  try {
    const { data, error } = await withTimeout(
      supabaseClient.from("hiring_posts").insert(payload).select(HIRING_POST_SELECT).single(),
      9000,
      "A publicacao demorou para responder. Tente novamente."
    );
    if (error) throw error;
    invalidateHiringCache();
    form.reset();
    resetHiringComposerMeta(form);
    appState.hiring.posts = [{ ...data, metrics: {}, viewer: {} }, ...appState.hiring.posts.filter((post) => post.id !== data.id)];
    await loadHiringEngagement(appState.hiring.posts);
    showToast("Publicacao criada na Comunidade ANSEND", "messages-square");
    renderHiringPage({ force: false });
  } catch (error) {
    console.warn("[ANSEND community] post insert failed", error?.message || error);
    showToast(error.message || "Nao foi possivel publicar na comunidade.", "triangle-alert");
  } finally {
    appState.hiring.submitting = false;
    if (submitButton && document.contains(submitButton)) {
      submitButton.textContent = "Publicar";
      submitButton.disabled = !String(form.elements.description?.value || "").trim();
    }
  }
}

async function toggleHiringAction(kind, postId) {
  if (!hiringRequireAuth()) return;
  const table = hiringActionTables[kind];
  const post = appState.hiring.posts.find((item) => item.id === postId);
  if (!table || !post) return;
  const viewerKey = kind === "like" ? "liked" : kind === "save" ? "saved" : "reposted";
  const metricKey = kind === "like" ? "likes" : kind === "save" ? "saves" : "reposts";
  const isActive = Boolean(post.viewer?.[viewerKey]);
  const result = isActive
    ? await supabaseClient.from(table).delete().eq("post_id", postId).eq("user_id", appState.authUser.id)
    : await supabaseClient.from(table).insert({ post_id: postId, user_id: appState.authUser.id });
  if (result.error) {
    showToast(result.error.message || "Acao nao concluida.", "triangle-alert");
    return;
  }
  invalidateHiringCache();
  post.viewer[viewerKey] = !isActive;
  post.metrics[metricKey] = Math.max(0, Number(post.metrics[metricKey] || 0) + (isActive ? -1 : 1));
  renderHiringPage({ force: false });
}

async function sendHiringInterest(postId) {
  await handleCommunityChatAction({ postId, action: "interest" });
}

function openHiringProposalModal(postId) {
  handleCommunityChatAction({ postId, action: "proposal" });
}

async function submitHiringProposal(form) {
  if (!hiringRequireAuth()) return;
  const post = appState.hiring.posts.find((item) => item.id === form.dataset.postId);
  if (!post || post.user_id === appState.authUser.id) return;
  const message = String(form.elements.message?.value || "").trim();
  if (!message) {
    showToast("Escreva uma mensagem para a proposta.", "triangle-alert");
    return;
  }
  const payload = {
    post_id: post.id,
    sender_id: appState.authUser.id,
    receiver_id: post.user_id,
    message: message.slice(0, 1200),
    proposed_amount: form.elements.proposed_amount?.value ? Number(form.elements.proposed_amount.value) : null,
    delivery_deadline: String(form.elements.delivery_deadline?.value || "").trim() || null,
    portfolio_links: String(form.elements.portfolio_links?.value || "").trim() || null,
    attachments: [],
    status: "pending",
  };
  const { data, error } = await supabaseClient.from("hiring_proposals").insert(payload).select().single();
  if (error) {
    showToast(error.message || "Nao foi possivel enviar proposta.", "triangle-alert");
    return;
  }
  invalidateHiringCache();
  appState.hiring.proposals.unshift(data);
  post.viewer.proposed = true;
  post.metrics.proposals = Number(post.metrics.proposals || 0) + 1;
  closeModal();
  showToast("Proposta enviada", "send");
  renderHiringPage({ force: false });
}

async function submitHiringComment(form) {
  if (!hiringRequireAuth()) return;
  const postId = form.dataset.postId;
  const content = String(form.elements.content?.value || "").trim();
  if (!content) return;
  const { data, error } = await supabaseClient.from("hiring_comments").insert({ post_id: postId, user_id: appState.authUser.id, content: content.slice(0, 500) }).select().single();
  if (error) {
    showToast(error.message || "Nao foi possivel comentar.", "triangle-alert");
    return;
  }
  invalidateHiringCache();
  appState.hiring.comments[postId] = [...(appState.hiring.comments[postId] || []), data];
  const post = appState.hiring.posts.find((item) => item.id === postId);
  if (post) post.metrics.comments = Number(post.metrics.comments || 0) + 1;
  form.reset();
  renderHiringPage({ force: false });
}

async function deleteHiringComment(commentId) {
  if (!hiringRequireAuth()) return;
  const { error } = await supabaseClient.from("hiring_comments").delete().eq("id", commentId).eq("user_id", appState.authUser.id);
  if (error) {
    showToast(error.message || "Nao foi possivel apagar comentario.", "triangle-alert");
    return;
  }
  invalidateHiringCache();
  Object.keys(appState.hiring.comments).forEach((postId) => {
    appState.hiring.comments[postId] = appState.hiring.comments[postId].filter((comment) => comment.id !== commentId);
  });
  renderHiringPage({ force: false });
}

async function updateHiringStatus(postId, status) {
  if (!hiringRequireAuth()) return;
  const { data, error } = await supabaseClient.from("hiring_posts").update({ status }).eq("id", postId).select().single();
  if (error) {
    showToast(error.message || "Nao foi possivel alterar status.", "triangle-alert");
    return;
  }
  invalidateHiringCache();
  appState.hiring.posts = appState.hiring.posts.map((post) => post.id === postId ? { ...post, ...data } : post);
  showToast("Status atualizado", "badge-check");
  renderHiringPage({ force: false });
}

async function openHiringChat(postId) {
  await handleCommunityChatAction({ postId, action: "interest" });
}

function hiringMessageMarkup(message) {
  const mine = message.sender_id === appState.authUser?.id;
  return `<article class="hiring-message ${mine ? "is-mine" : ""}"><p>${htmlEscape(message.content)}</p><span>${hiringRelativeDate(message.created_at)}</span></article>`;
}

function openHiringConversationModal(conversation, post) {
  const messages = appState.hiring.messages[conversation.id] || [];
  openModal(`<section class="hiring-chat-panel" data-conversation-id="${htmlEscape(conversation.id)}"><header><span><i data-lucide="messages-square"></i>Chat privado</span><h2>${htmlEscape(post.title)}</h2><p>Conversa vinculada a esta publicacao.</p></header><div class="hiring-message-list">${messages.length ? messages.map(hiringMessageMarkup).join("") : `<p>Nenhuma mensagem ainda.</p>`}</div><form class="hiring-message-form" data-conversation-id="${htmlEscape(conversation.id)}"><label class="sr-only" for="hiringMessageInput">Mensagem</label><input id="hiringMessageInput" name="content" type="text" maxlength="1000" placeholder="Escreva uma mensagem"><button type="submit"><i data-lucide="send"></i>Enviar</button></form></section>`);
}

async function submitHiringMessage(form) {
  if (!hiringRequireAuth()) return;
  const conversationId = form.dataset.conversationId;
  const content = String(form.elements.content?.value || "").trim();
  if (!content) return;
  const { data, error } = await supabaseClient.from("hiring_messages").insert({ conversation_id: conversationId, sender_id: appState.authUser.id, content: content.slice(0, 1000), attachments: [] }).select().single();
  if (error) {
    showToast(error.message || "Nao foi possivel enviar mensagem.", "triangle-alert");
    return;
  }
  appState.hiring.messages[conversationId] = [...(appState.hiring.messages[conversationId] || []), data];
  const panel = document.querySelector(".hiring-chat-panel");
  const list = panel?.querySelector(".hiring-message-list");
  if (list) list.innerHTML = appState.hiring.messages[conversationId].map(hiringMessageMarkup).join("");
  form.reset();
}

async function updateCatalogVisibility(table, id, status) {
  const payload = publicCatalogPayload({ status });
  let { data, error } = await supabaseClient.from(table).update(payload).eq("id", id).select().single();
  if (error && hasMissingColumnError(error, "is_public")) {
    ({ data, error } = await supabaseClient.from(table).update({ status }).eq("id", id).select().single());
  }
  return { data, error };
}

function catalogPayloadFromForm(form) {
  const tags = String(form.elements.tags?.value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  return {
    kind: form.elements.kind?.value || "beat",
    title: form.elements.title?.value?.trim() || "",
    artist_name: form.elements.artist?.value?.trim() || null,
    producer_name: form.elements.producer?.value?.trim() || activeProfile()?.artistic_name || activeProfile()?.full_name || null,
    genre: form.elements.genre?.value?.trim() || "",
    bpm: form.elements.bpm?.value ? Number(form.elements.bpm.value) : null,
    musical_key: form.elements.key?.value?.trim() || null,
    price: form.elements.price?.value ? Number(form.elements.price.value) : 0,
    license_type: form.elements.license?.value || "premium",
    status: form.elements.status?.value || "published",
    audio_url: form.elements.audio_url?.value?.trim() || null,
    cover_url: form.elements.cover_url?.value?.trim() || null,
    description: form.elements.description?.value?.trim() || null,
    tags,
  };
}

async function saveCatalogItem(form) {
  const payload = catalogPayloadFromForm(form);
  if (!payload.title || !payload.genre) {
    showToast("Preencha titulo e genero para cadastrar", "triangle-alert");
    return;
  }

  if (!supabaseClient || !appState.authUser) {
    showToast("Você precisa estar autenticado para salvar no catálogo.", "triangle-alert");
    location.hash = "vendedor";
    return;
  }

  const { data, error } = await insertCatalogItem(payload);
  if (error) {
    showToast(error.message || "Nao foi possivel salvar no Supabase", "triangle-alert");
    return;
  }
  const saved = { ...data, source_table: "catalog_items" };
  appState.ownedCatalogItems = dedupeById([saved, ...appState.ownedCatalogItems]);
  if (saved.status === "published") {
    appState.publicCatalogItems = dedupeById([saved, ...appState.publicCatalogItems]);
  }
  syncCatalogCompatibilityState();
  showToast("Item salvo no catalogo Supabase", "cloud-check");

  form.reset();
  appState.genre = "Todos";
  if (location.hash !== "#explorar") {
    location.hash = "explorar";
  } else {
    renderRoute();
  }
}

async function deleteCatalogItem(id) {
  const item = appState.ownedCatalogItems.find((entry) => entry.id === id);
  if (!item) return;
  const table = (item && item.source_table === "beats") ? "beats" : "catalog_items";
  if (supabaseClient && appState.authUser && !String(id).startsWith("local-")) {
    const { error } = await supabaseClient.from(table).delete().eq("id", id);
    if (error) {
      showToast(error.message || "Nao foi possivel remover", "triangle-alert");
      return;
    }
  }
  appState.ownedCatalogItems = appState.ownedCatalogItems.filter((entry) => entry.id !== id);
  appState.publicCatalogItems = appState.publicCatalogItems.filter((entry) => entry.id !== id);
  syncCatalogCompatibilityState();
  persistCatalogItems();
  showToast("Item removido do catalogo", "trash-2");
  renderRoute();
}

async function toggleCatalogStatus(id) {
  const item = appState.ownedCatalogItems.find((entry) => entry.id === id);
  if (!item) return;
  const nextStatus = item.status === "published" ? "draft" : "published";
  const table = item.source_table === "beats" ? "beats" : "catalog_items";
  if (supabaseClient && appState.authUser && !String(id).startsWith("local-")) {
    const { data, error } = await updateCatalogVisibility(table, id, nextStatus);
    if (error) {
      showToast(error.message || "Nao foi possivel atualizar", "triangle-alert");
      return;
    }
    Object.assign(item, data);
    item.source_table = table;
  } else if (hasAccountAccess()) {
    item.status = nextStatus;
    item.updated_at = new Date().toISOString();
  } else {
    showToast("Entre na sua conta para alterar o catalogo.", "log-in");
    return;
  }
  appState.ownedCatalogItems = dedupeById([item, ...appState.ownedCatalogItems.filter((entry) => entry.id !== id)]);
  appState.publicCatalogItems = nextStatus === "published"
    ? dedupeById([item, ...appState.publicCatalogItems.filter((entry) => entry.id !== id)])
    : appState.publicCatalogItems.filter((entry) => entry.id !== id);
  syncCatalogCompatibilityState();
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
  if (!profile?.account_role) {
    return appLocale.current === "pt-BR"
      ? "Sua selecao diaria de playlists, beats e profissionais."
      : "Your daily selection of playlists, beats, and professionals.";
  }
  if (appLocale.current === "en") {
    const role = normalizeRole(profile.account_role);
    const map = {
      artista: "Beats, licenses, and producers prioritized for your next release.",
      beatmaker: "Catalogs and references to create, collaborate, and sell beats.",
      designer: "Visual references, covers, and catalogs for music releases.",
      produtor: "Projects, demos, mix, and master workflows organized for delivery.",
      curador: "Playlists and discoveries organized for your curation work.",
      marketing: "Campaigns, creatives, and release actions organized by NEXO.",
    };
    return map[role] || "Experience adapted to your role.";
  }
  return roleDashboard(profile.account_role).subheadline;
}

function setLocalPreviewProfile(profile) {
  appState.profile = profile;
  if (!supabaseClient) localStorage.setItem("ansend-profile-preview", JSON.stringify(profile));
}

function localPreviewProfile() {
  const stored = JSON.parse(localStorage.getItem("ansend-profile-preview") || "null");
  if (stored) return stored;
  if (localStorage.getItem("ansendAccountAccess") === "true") {
    return {
      id: "local-preview",
      display_name: "Meu perfil",
      username: "meu-perfil",
      account_role: "artista",
      bio: "",
      avatar_url: "",
      banner_url: "",
    };
  }
  return null;
}

function clearLocalPreviewProfile() {
  localStorage.removeItem("ansend-profile-preview");
  localStorage.removeItem("ansendAccountAccess");
}

function clampImagePosition(value, fallback = 50) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(0, Math.min(100, Math.round(number)));
}

function clampImageScale(value, fallback = 1) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(1, Math.min(2.5, Math.round(number * 100) / 100));
}

function profileDisplayData(profile = activeProfile()) {
  const role = normalizeRole(profile?.account_role || "artista");
  const styleList = asArray(profile?.music_styles || profile?.genres || []).slice(0, 5);
  const displayName = profile?.display_name || profile?.artistic_name || profile?.full_name || "Perfil ANSEND";
  const username = sanitizeHandle(profile?.username || profile?.handle || "");
  const bannerPositionX = clampImagePosition(profile?.banner_position_x);
  const bannerPositionY = clampImagePosition(profile?.banner_position_y);
  const avatarPositionX = clampImagePosition(profile?.avatar_position_x);
  const avatarPositionY = clampImagePosition(profile?.avatar_position_y);
  const bannerScale = clampImageScale(profile?.banner_scale);
  const avatarScale = clampImageScale(profile?.avatar_scale);
  return {
    name: displayName,
    fullName: profile?.full_name || "",
    username,
    handle: username ? `@${username}` : "",
    role,
    roleLabel: accountRoleLabel(role),
    avatar: profile?.avatar_url || profile?.photo_url || "",
    banner: profile?.banner_url || profile?.cover_url || "",
    bannerPositionX,
    bannerPositionY,
    avatarPositionX,
    avatarPositionY,
    bannerScale,
    avatarScale,
    bannerPosition: `${bannerPositionX}% ${bannerPositionY}%`,
    avatarPosition: `${avatarPositionX}% ${avatarPositionY}%`,
    bannerSize: `${Math.round(bannerScale * 100)}%`,
    headline: profile?.headline || "",
    bio: profile?.bio || "",
    styles: styleList,
    links: {
      instagram: profile?.instagram_url || profile?.instagram || "",
      youtube: profile?.youtube_url || profile?.youtube || "",
      spotify: profile?.spotify_url || profile?.spotify || "",
      soundcloud: profile?.soundcloud_url || profile?.soundcloud || "",
      tiktok: profile?.tiktok_url || profile?.tiktok || "",
      beatstars: profile?.beatstars_url || profile?.beatstars || "",
      website: profile?.website_url || profile?.website || "",
    },
  };
}

function profileInitials(name = "ANSEND") {
  return String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase() || "A";
}

function sanitizeHandle(value = "") {
  return String(value)
    .trim()
    .replace(/^@+/, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

function safeDecode(value = "") {
  try {
    return decodeURIComponent(String(value || ""));
  } catch (error) {
    return String(value || "");
  }
}

function normalizeProfileLink(platform, value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^(https?:|mailto:|tel:)/i.test(raw)) return raw;
  const withoutProtocol = raw.replace(/^\/+/, "");
  if (/^[a-z0-9][a-z0-9.-]+\.[a-z]{2,}(?:\/.*)?$/i.test(withoutProtocol)) {
    return `https://${withoutProtocol}`;
  }
  const handle = withoutProtocol.replace(/^@+/, "").replace(/^\/+/, "");
  if (!handle) return "";
  const encodedHandle = encodeURIComponent(handle);
  const socialBases = {
    instagram: `https://instagram.com/${encodedHandle}`,
    tiktok: `https://tiktok.com/@${encodedHandle}`,
    youtube: `https://youtube.com/@${encodedHandle}`,
    spotify: `https://open.spotify.com/search/${encodedHandle}`,
    soundcloud: `https://soundcloud.com/${encodedHandle}`,
    beatstars: `https://www.beatstars.com/${encodedHandle}`,
    website: `https://${withoutProtocol}`,
  };
  return socialBases[platform] || `https://${withoutProtocol}`;
}

function profileRouteToken(profile) {
  if (!profile) return "";
  const display = profileDisplayData(profile);
  const username = sanitizeHandle(profile.username || profile.handle || display.username || "");
  if (username) return username;
  const id = String(profile.id || "").trim();
  if (id) return encodeURIComponent(id);
  return sanitizeHandle(display.name || profile.full_name || "");
}

function profileMatchesReference(profile, reference = {}) {
  if (!profile) return false;
  const rawId = String(reference.id || "").trim();
  const rawUsername = String(reference.username || "").trim();
  const rawTitle = String(reference.title || "").trim();
  if (rawId && String(profile.id || "") === rawId) return true;
  const cleanValues = [rawUsername, rawTitle].map(sanitizeHandle).filter(Boolean);
  if (!cleanValues.length) return false;
  const display = profileDisplayData(profile);
  const candidates = [
    profile.username,
    profile.handle,
    display.username,
    display.name,
    profile.display_name,
    profile.artistic_name,
    profile.full_name,
  ].filter(Boolean).map(sanitizeHandle);
  return cleanValues.some((value) => candidates.includes(value));
}

function resolveProfileReference(reference = {}) {
  const profiles = [activeProfile(), ...appState.publicProfiles].filter(Boolean);
  return profiles.find((profile) => profileMatchesReference(profile, reference)) || null;
}

function profileTargetAttrs(reference = {}) {
  const attrs = [];
  const id = String(reference.id || "").trim();
  const username = sanitizeHandle(reference.username || "");
  const title = String(reference.title || "").trim();
  if (id) attrs.push(`data-profile-id="${htmlEscape(id)}"`);
  if (username) attrs.push(`data-profile-username="${htmlEscape(username)}"`);
  if (title) attrs.push(`data-title="${htmlEscape(title)}"`);
  return attrs.join(" ");
}

function publicProfileRouteFromTarget(target) {
  if (!target) return "";
  const reference = {
    id: target.dataset.profileId || target.dataset.userId || "",
    username: target.dataset.profileUsername || target.dataset.username || "",
    title: target.dataset.title || "",
  };
  const profile = resolveProfileReference(reference);
  if (profile) return publicProfileRoute(profile);
  const username = sanitizeHandle(reference.username);
  if (username) return `perfil-${username}`;
  const id = String(reference.id || "").trim();
  if (id && id !== "local-preview") return `perfil-${encodeURIComponent(id)}`;
  const title = sanitizeHandle(reference.title);
  return title && title !== "ansend" ? `perfil-${title}` : "";
}

function isInteractiveProfessionalCardTarget(target) {
  return Boolean(target?.closest("button, a, input, select, textarea, label, [role='button'], [data-card-action]"));
}

function openProfessionalCardProfile(card, source = "professional-card") {
  if (!card) return false;
  const route = publicProfileRouteFromTarget(card);
  if (!route) return false;
  const profileId = card.dataset.profileId || card.dataset.id || "";
  trackUserEvent("click", "professional", profileId, { source, title: card.dataset.title || "" });
  location.hash = route;
  return true;
}

function profileAvatarMarkup(display, className = "profile-avatar") {
  const avatar = display?.avatar || "";
  if (avatar && !avatar.includes("undefined")) {
    return `<div class="${className}" style="--profile-avatar-position:${htmlEscape(display.avatarPosition || "50% 50%")};--profile-avatar-scale:${htmlEscape(display.avatarScale || 1)}">${optimizedImageMarkup({ src: avatar, alt: `Avatar de ${display.name}`, width: 96, height: 96 })}</div>`;
  }
  return `<div class="${className} is-initials" aria-label="Avatar de ${htmlEscape(display.name)}">${profileInitials(display.name)}</div>`;
}

function profileSocialLinks(display) {
  const links = [
    ["instagram", "instagram", "Instagram", display.links.instagram],
    ["youtube", "youtube", "YouTube", display.links.youtube],
    ["music-4", "spotify", "Spotify", display.links.spotify],
    ["radio", "soundcloud", "SoundCloud", display.links.soundcloud],
    ["music", "tiktok", "TikTok", display.links.tiktok],
    ["badge-dollar-sign", "beatstars", "BeatStars", display.links.beatstars],
    ["globe", "website", "Site", display.links.website],
  ].map(([icon, platform, label, url]) => [icon, label, normalizeProfileLink(platform, url)])
    .filter(([, , url]) => url);
  return links.map(([icon, label, url]) => `<a href="${htmlEscape(url)}" target="_blank" rel="noopener noreferrer"><i data-lucide="${icon}"></i>${label}<i data-lucide="external-link"></i></a>`).join("");
}

function profileHeroBackgroundStyle(display) {
  return display?.banner
    ? `--profile-banner: url('${htmlEscape(display.banner)}'); --profile-banner-position: ${htmlEscape(display.bannerPosition || "50% 50%")}; --profile-banner-size: ${htmlEscape(display.bannerSize || "100%")}`
    : "";
}

function profileTrackRows(items, display, isOwner) {
  if (!items.length) {
    return `<div class="profile-empty-state">
      <i data-lucide="music-4"></i>
      <strong>Nenhum beat publicado ainda</strong>
      <p>${isOwner ? "Publique sua primeira faixa para ela aparecer no seu perfil." : "Este perfil ainda nao publicou faixas na ANSEND."}</p>
      ${isOwner ? `<button type="button" class="profile-action is-primary" data-route="cadastrar"><i data-lucide="upload-cloud"></i>Lancar musica</button>` : ""}
    </div>`;
  }
  return `<div class="profile-track-list">
    ${items.slice(0, 12).map((item, index) => {
      const beat = item.source ? item : catalogItemToBeat(item);
      const raw = item.raw || item;
      const price = beat.price || (raw.price ? Number(raw.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "Sob consulta");
      const meta = [raw.genre || beat.tags?.[0], raw.bpm ? `${raw.bpm} BPM` : beat.tags?.[1]].filter(Boolean).join(" / ");
      const producer = raw.producer_name || raw.artist_name || display.name || beat.producer;
      const cover = beat.cover || raw.cover_url || "";
      return `<article class="profile-track-row" data-beat-id="${htmlEscape(beat.id)}">
        ${adminDeleteButton("beat", beat, "admin-delete-beat-row")}
        <span class="profile-track-index">${index + 1}</span>
        <div class="profile-track-main">
          ${cover ? `<img src="${htmlEscape(cover)}" alt="Capa de ${htmlEscape(beat.title)}">` : `<span class="profile-track-cover-fallback"><i data-lucide="music-4"></i></span>`}
          <div>
            <strong>${htmlEscape(beat.title)}</strong>
            <small>${htmlEscape(producer)}</small>
          </div>
        </div>
        <span class="profile-track-meta">${htmlEscape(meta || display.roleLabel)}</span>
        <span class="profile-track-price">${htmlEscape(price)}</span>
        <button type="button" class="profile-play-mini" data-action="play" data-id="${htmlEscape(beat.id)}" aria-label="Tocar ${htmlEscape(beat.title)}"><i data-lucide="play"></i></button>
      </article>`;
    }).join("")}
  </div>`;
}

function profileCatalogFor(profile, isOwner) {
  if (isOwner) return visibleCatalogItems().filter((item) => item.status === "published" || item.status === "draft");
  const id = profile?.id;
  const username = sanitizeHandle(profile?.username || profile?.handle || "");
  const name = String(profile?.display_name || profile?.artistic_name || profile?.full_name || "").toLowerCase();
  return publishedCatalogItems().filter((item) => {
    const itemUser = String(item.user_id || "");
    const itemHandle = sanitizeHandle(item.profile_username || item.username || item.owner_username || "");
    const itemNames = [item.artist_name, item.producer_name, item.owner_name].filter(Boolean).map((value) => String(value).toLowerCase());
    return (id && itemUser === id) || (username && itemHandle === username) || (name && itemNames.includes(name));
  });
}

function resolvePublicProfile(slug) {
  const rawSlug = safeDecode(slug).trim();
  const cleanSlug = sanitizeHandle(rawSlug);
  const current = activeProfile();
  const matches = (profile) => {
    if (rawSlug && String(profile.id || "") === rawSlug) return true;
    const candidates = [
      profile.username,
      profile.handle,
      profile.display_name,
      profile.artistic_name,
      profile.full_name,
    ].filter(Boolean).map(sanitizeHandle);
    return cleanSlug && candidates.includes(cleanSlug);
  };
  const found = current && matches(current) ? current : appState.publicProfiles.find(matches) || null;
  if (!found) return null;
  const recommendation = (appState.recommendations?.professionals || []).find((item) => String(item.id) === String(found.id));
  return recommendation ? { ...found, recommendationReason: recommendation.recommendationReason } : found;
}

function currentFollowUserId() {
  return appState.authUser?.id || appState.profile?.id || "";
}

function defaultFollowState(profileUserId = "") {
  return {
    profileUserId,
    isFollowing: false,
    followersCount: 0,
    followingCount: 0,
    loading: Boolean(supabaseClient && currentFollowUserId() && profileUserId),
    actionLoading: false,
    error: "",
  };
}

function setFollowState(profileUserId, patch = {}) {
  if (!profileUserId) return defaultFollowState("");
  const previous = appState.followStates[profileUserId] || defaultFollowState(profileUserId);
  const next = { ...previous, ...patch, profileUserId };
  appState.followStates[profileUserId] = next;
  updateFollowButton(profileUserId);
  updateProfileFollowCounts(profileUserId);
  return next;
}

function followButtonLabel(state) {
  if (state?.actionLoading) return "...";
  if (state?.loading) return "Carregando...";
  return state?.isFollowing ? "Seguindo" : "Seguir";
}

function updateFollowButton(profileUserId) {
  const state = appState.followStates[profileUserId] || defaultFollowState(profileUserId);
  document.querySelectorAll(`[data-action="follow-producer"][data-profile-id="${cssEscape(profileUserId)}"]`).forEach((button) => {
    button.disabled = Boolean(state.loading || state.actionLoading);
    button.classList.toggle("is-following", Boolean(state.isFollowing));
    button.setAttribute("aria-pressed", state.isFollowing ? "true" : "false");
    button.innerHTML = `<i data-lucide="${state.isFollowing ? "user-check" : "user-plus"}"></i>${followButtonLabel(state)}`;
  });
  refreshPlayerIcons();
}

function updateProfileFollowCounts(profileUserId) {
  const state = appState.followStates[profileUserId];
  if (!state) return;
  document.querySelectorAll(`[data-follow-count-profile="${cssEscape(profileUserId)}"]`).forEach((node) => {
    const kind = node.dataset.followCount;
    const value = kind === "following" ? state.followingCount : state.followersCount;
    node.textContent = compactNumber(value || 0);
  });
}

async function getFollowState(profileUserId) {
  const followerId = currentFollowUserId();
  const targetId = String(profileUserId || "");
  const fallback = defaultFollowState(targetId);
  if (!supabaseClient || !targetId) return { ...fallback, loading: false };
  if (!followerId) {
    const [{ count: followersCount }, { count: followingCount }] = await Promise.all([
      supabaseClient.from("user_follows").select("id", { count: "exact", head: true }).eq("following_id", targetId),
      supabaseClient.from("user_follows").select("id", { count: "exact", head: true }).eq("follower_id", targetId),
    ]);
    return { ...fallback, followersCount: followersCount || 0, followingCount: followingCount || 0, loading: false };
  }
  const [followResult, followersResult, followingResult] = await Promise.all([
    supabaseClient
      .from("user_follows")
      .select("id")
      .eq("follower_id", followerId)
      .eq("following_id", targetId)
      .maybeSingle(),
    supabaseClient.from("user_follows").select("id", { count: "exact", head: true }).eq("following_id", targetId),
    supabaseClient.from("user_follows").select("id", { count: "exact", head: true }).eq("follower_id", targetId),
  ]);
  if (followResult.error && followResult.error.code !== "PGRST116") throw followResult.error;
  if (followersResult.error) throw followersResult.error;
  if (followingResult.error) throw followingResult.error;
  return {
    ...fallback,
    isFollowing: Boolean(followResult.data),
    followersCount: followersResult.count || 0,
    followingCount: followingResult.count || 0,
    loading: false,
    error: "",
  };
}

async function refreshFollowState(profileUserId, forceLoadingVisual = true) {
  const targetId = String(profileUserId || "");
  if (!targetId) return null;
  if (forceLoadingVisual) {
    setFollowState(targetId, { loading: true, error: "" });
  }
  try {
    const state = await getFollowState(targetId);
    return setFollowState(targetId, { ...state, actionLoading: false, loading: false });
  } catch (error) {
    console.error("[ANSEND follow] state failed", error);
    return setFollowState(targetId, { loading: false, actionLoading: false, error: "Nao foi possivel carregar seguidores." });
  }
}

async function followUser(profileUserId) {
  const followerId = currentFollowUserId();
  const followingId = String(profileUserId || "");
  if (!supabaseClient || !followerId) throw new Error("Faca login para seguir este perfil.");
  if (!followingId) throw new Error("Perfil nao encontrado.");
  if (followerId === followingId) throw new Error("Voce nao pode seguir o proprio perfil.");
  const { error } = await supabaseClient
    .from("user_follows")
    .upsert({ follower_id: followerId, following_id: followingId }, { onConflict: "follower_id,following_id", ignoreDuplicates: true });
  if (error) throw error;
  return refreshFollowState(followingId, false);
}

async function unfollowUser(profileUserId) {
  const followerId = currentFollowUserId();
  const followingId = String(profileUserId || "");
  if (!supabaseClient || !followerId) throw new Error("Faca login para alterar seguidores.");
  if (!followingId) throw new Error("Perfil nao encontrado.");
  const { error } = await supabaseClient
    .from("user_follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);
  if (error) throw error;
  return refreshFollowState(followingId, false);
}

async function toggleFollow(profileUserId) {
  const targetId = String(profileUserId || "");
  if (!targetId) return;
  const previous = appState.followStates[targetId] || defaultFollowState(targetId);
  if (previous.actionLoading) return;
  
  const nextIsFollowing = !previous.isFollowing;
  
  setFollowState(targetId, {
    actionLoading: true,
    error: "",
  });
  try {
    const actionPromise = nextIsFollowing ? followUser(targetId) : unfollowUser(targetId);
    await Promise.race([
      actionPromise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("A requisicao demorou muito. Tente novamente.")), 10000))
    ]);
    showToast(nextIsFollowing ? "Agora voce esta seguindo este perfil." : "Voce deixou de seguir este perfil.", nextIsFollowing ? "user-plus" : "user-minus");
  } catch (error) {
    console.error("[ANSEND follow] toggle failed", error);
    setFollowState(targetId, { ...previous, actionLoading: false, loading: false, error: error.message || "Nao foi possivel atualizar o follow." });
    showToast(error.message || "Nao foi possivel atualizar este perfil.", "triangle-alert");
  } finally {
    const current = appState.followStates[targetId];
    if (current && current.actionLoading) {
      setFollowState(targetId, { actionLoading: false });
    }
  }
}

function renderProfileNotFound(slug) {
  appView.innerHTML = `<section class="profile-page spotify-profile">
    <div class="profile-not-found">
      <i data-lucide="user-x"></i>
      <span>ANSEND</span>
      <h1>Perfil nao encontrado</h1>
      <p>Nenhum perfil real foi encontrado para ${htmlEscape(slug || "esta rota")}.</p>
      <button type="button" class="profile-action is-primary" data-route="produtores">Ver profissionais</button>
    </div>
  </section>`;
}

function renderSpotifyProfile({ profile, isOwner = false, professional = null } = {}) {
  const safeProfile = profile || activeProfile() || {};
  const display = profileDisplayData(safeProfile);
  const profileUserId = String(safeProfile.id || "");
  const catalogItems = profileCatalogFor(safeProfile, isOwner);
  const publishedCount = catalogItems.filter((item) => item.status === "published" || item.source !== "catalog").length;
  const followState = appState.followStates[profileUserId] || defaultFollowState(profileUserId);
  const actionButtons = isOwner
    ? `<button type="button" class="profile-action is-primary" data-action="toggle-edit-profile"><i data-lucide="edit-3"></i>Editar perfil</button>
       <button type="button" class="profile-action" data-action="share-profile"><i data-lucide="share-2"></i>Compartilhar</button>
       <button type="button" class="profile-action" data-action="logout-account"><i data-lucide="log-out"></i>Sair</button>`
    : `<button type="button" class="profile-action is-primary ${followState.isFollowing ? "is-following" : ""}" data-action="follow-producer" data-profile-id="${htmlEscape(profileUserId)}" aria-pressed="${followState.isFollowing ? "true" : "false"}" ${followState.loading || followState.actionLoading ? "disabled" : ""}><i data-lucide="${followState.isFollowing ? "user-check" : "user-plus"}"></i>${followButtonLabel(followState)}</button>
       <button type="button" class="profile-action" data-action="chat-start-profile" data-profile-id="${htmlEscape(profileUserId)}"><i data-lucide="message-circle"></i>Mensagem</button>
       <button type="button" class="profile-action" data-action="professional-contact" data-profile-id="${htmlEscape(profileUserId)}" data-title="${htmlEscape(display.name)}"><i data-lucide="handshake"></i>Contratar</button>
       <button type="button" class="profile-action" data-action="share-profile"><i data-lucide="share-2"></i>Compartilhar</button>`;
  const linksMarkup = profileSocialLinks(display);
  const aboutMarkup = display.bio || linksMarkup;
  const heroClass = display.banner ? "has-banner" : "has-fallback";
  const tabs = [
    ["profileRecent", "Mais recentes"],
    ["profileCatalog", "Catalogo"],
    ...(display.bio ? [["profileAbout", "Sobre"]] : []),
    ...(linksMarkup ? [["profileLinks", "Links"]] : []),
  ];

  appView.innerHTML = `<section class="profile-page spotify-profile" aria-label="Perfil ANSEND">
    <header class="profile-hero ${heroClass}" style="${profileHeroBackgroundStyle(display)}">
      <div class="profile-hero-bg" aria-hidden="true"></div>
      <div class="profile-hero-content">
        ${profileAvatarMarkup(display)}
        <div class="profile-identity">
          <span class="profile-kicker"><i data-lucide="${isOwner ? "user-round" : "badge-check"}"></i>${htmlEscape(display.roleLabel)}</span>
          <h1 class="profile-name">${htmlEscape(display.name)}</h1>
          ${display.handle ? `<p class="profile-handle">${htmlEscape(display.handle)}</p>` : ""}
          ${display.bio ? `<p class="profile-bio">${htmlEscape(display.bio)}</p>` : ""}
          <div class="profile-actions">${actionButtons}</div>
        </div>
        <div class="profile-published-count" aria-label="Itens publicados">
          <span>Publicados</span>
          <strong>${publishedCount}</strong>
          <span>Seguidores</span>
          <strong data-follow-count="followers" data-follow-count-profile="${htmlEscape(profileUserId)}">${compactNumber(followState.followersCount)}</strong>
          <span>Seguindo</span>
          <strong data-follow-count="following" data-follow-count-profile="${htmlEscape(profileUserId)}">${compactNumber(followState.followingCount)}</strong>
        </div>
      </div>
      <nav class="profile-tabs" aria-label="Secoes do perfil">
        ${tabs.map(([target, label], index) => `<button type="button" class="profile-tab ${index === 0 ? "is-active" : ""}" data-action="profile-scroll" data-target="${target}">${label}</button>`).join("")}
      </nav>
    </header>

    <main class="profile-content ${aboutMarkup ? "" : "is-single-column"}">
      <div class="profile-music-stack">
        <section class="profile-music-section" id="profileRecent">
          <div class="profile-section-head">
            <div>
              <h2>Mais recentes</h2>
              <p>${isOwner ? "Ultimas faixas publicadas por voce." : "Ultimas publicacoes deste perfil."}</p>
            </div>
            ${isOwner ? `<button type="button" class="profile-action" data-route="cadastrar"><i data-lucide="upload"></i>Lancar musica</button>` : ""}
          </div>
          ${profileTrackRows(catalogItems.slice(0, 5), display, isOwner)}
        </section>

        <section class="profile-music-section" id="profileCatalog">
          <div class="profile-section-head">
            <div>
              <h2>Catalogo</h2>
              <p>Itens reais publicados neste perfil.</p>
            </div>
          </div>
          ${profileTrackRows(catalogItems, display, isOwner)}
        </section>
      </div>

      ${aboutMarkup ? `<aside class="profile-about-panel">
        ${display.bio ? `<section id="profileAbout"><h2>Sobre</h2><p>${htmlEscape(display.bio)}</p></section>` : ""}
        ${linksMarkup ? `<section id="profileLinks"><h2>Links</h2><div class="profile-links">${linksMarkup}</div></section>` : ""}
      </aside>` : ""}
    </main>
  </section>`;
  if (!isOwner && profileUserId) {
    requestAnimationFrame(() => refreshFollowState(profileUserId));
  }
}

function renderProfile() {
  renderSpotifyProfile({ profile: activeProfile(), isOwner: true });
}

function renderPublicProfile() {
  const slug = location.hash.replace("#perfil-", "");
  const profile = resolvePublicProfile(slug);
  if (!profile) {
    renderProfileNotFound(slug);
    return;
  }
  trackUserEvent("view", "professional", profile.id, { source: "public-profile" });
  const current = activeProfile();
  const isOwner = current && String(profile.id) === String(current.id);
  renderSpotifyProfile({ profile, isOwner });
}

async function fileToDataUrl(file) {
  if (!file) return "";
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function fileExtension(file) {
  const name = typeof file === "string" ? file : (file?.name || "");
  const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
  return ext || "png";
}

function storageDebug(message, details = {}) {
  if (!AUTH_DEBUG_ENABLED) return;
  const safeDetails = { ...details };
  delete safeDetails.access_token;
  delete safeDetails.refresh_token;
  console.debug(`[ANSEND Storage] ${message}`, safeDetails);
}

function normalizeStorageError(error, context = {}) {
  const rawMessage = String(error?.message || error?.error_description || error?.error || error?.name || "").trim();
  const status = Number(error?.statusCode || error?.status || error?.code || 0);
  const lower = rawMessage.toLowerCase();
  const label = context.label || "arquivo";
  if (error?.code === "AUTH_SESSION_MISSING" || /auth session missing|no current session|missing session/i.test(rawMessage)) {
    return {
      code: "AUTH_SESSION_MISSING",
      retryable: false,
      message: `Entre novamente para enviar ${label}. A sessao do Supabase nao esta ativa neste navegador.`,
      rawMessage,
    };
  }
  if (/jwt|expired|invalid token|token is expired/i.test(rawMessage) || status === 401) {
    return {
      code: "JWT_EXPIRED",
      retryable: true,
      message: `A sessao foi renovada. Tente enviar ${label} novamente.`,
      rawMessage,
    };
  }
  if (/row-level security|rls|permission|not authorized|unauthorized|403|violates row-level/i.test(rawMessage) || status === 403) {
    return {
      code: "STORAGE_POLICY_DENIED",
      retryable: false,
      message: `O Storage recusou ${label}: permissao negada pela policy do bucket.`,
      rawMessage,
    };
  }
  if (/bucket not found|bucket.*not.*found|not found/i.test(lower) || status === 404) {
    return {
      code: "BUCKET_NOT_FOUND",
      retryable: false,
      message: `Bucket de Storage ausente para ${label}.`,
      rawMessage,
    };
  }
  if (/payload too large|entity too large|file size|too large|413/i.test(lower) || status === 413) {
    return {
      code: "FILE_TOO_LARGE",
      retryable: false,
      message: `${label} esta grande demais para o limite do Storage.`,
      rawMessage,
    };
  }
  if (/mime|content.?type|invalid type|formato/i.test(lower)) {
    return {
      code: "INVALID_MIME",
      retryable: false,
      message: `Formato invalido para ${label}.`,
      rawMessage,
    };
  }
  if (/failed to fetch|network|timeout|demorou/i.test(lower) || error?.name === "AbortError") {
    return {
      code: "NETWORK_ERROR",
      retryable: true,
      message: `Falha de rede ao enviar ${label}. Verifique a conexao e tente novamente.`,
      rawMessage,
    };
  }
  if (/already exists|duplicate|409/i.test(lower) || status === 409) {
    return {
      code: "DUPLICATE_OBJECT",
      retryable: false,
      message: `Ja existe um arquivo com este caminho. Selecione ${label} novamente.`,
      rawMessage,
    };
  }
  return {
    code: "STORAGE_ERROR",
    retryable: false,
    message: rawMessage || `Nao foi possivel enviar ${label}.`,
    rawMessage,
  };
}

async function ensureStorageAuthSession({ forceRefresh = false } = {}) {
  if (!supabaseClient) {
    const error = new Error("Storage permanente nao configurado. Configure o Supabase antes de publicar.");
    error.code = "SUPABASE_NOT_CONFIGURED";
    throw error;
  }
  let session = null;
  let sessionError = null;
  try {
    const result = forceRefresh
      ? await withTimeout(supabaseClient.auth.refreshSession(), 20000, "A renovacao da sessao demorou demais.")
      : await withTimeout(supabaseClient.auth.getSession(), 20000, "A validacao da sessao demorou demais.");
    session = result?.data?.session || null;
    sessionError = result?.error || null;
  } catch (error) {
    sessionError = error;
  }
  if (!session && !forceRefresh && supabaseClient.auth.refreshSession) {
    try {
      const refreshed = await withTimeout(
        supabaseClient.auth.refreshSession(),
        20000,
        "A renovacao da sessao demorou demais."
      );
      session = refreshed?.data?.session || null;
      sessionError = refreshed?.error || sessionError;
    } catch (error) {
      sessionError = error;
    }
  }
  if (!session?.user?.id) {
    const error = new Error(sessionError?.message || "AUTH_SESSION_MISSING");
    error.code = "AUTH_SESSION_MISSING";
    throw error;
  }
  let verifiedUser = session.user;
  try {
    const userResult = await withTimeout(
      supabaseClient.auth.getUser(),
      20000,
      "A validacao do usuario demorou demais."
    );
    if (userResult?.error) throw userResult.error;
    verifiedUser = userResult?.data?.user || verifiedUser;
  } catch (error) {
    const normalized = normalizeStorageError(error, { label: "arquivo" });
    if (normalized.code === "JWT_EXPIRED" && !forceRefresh) {
      return ensureStorageAuthSession({ forceRefresh: true });
    }
    throw error;
  }
  if (!verifiedUser?.id || verifiedUser.id !== session.user.id) {
    const error = new Error("AUTH_SESSION_MISMATCH");
    error.code = "AUTH_SESSION_MISSING";
    throw error;
  }
  appState.authSession = session;
  if (appState.authUser?.id !== verifiedUser.id) {
    appState.authUser = verifiedUser;
    await loadProfile(verifiedUser);
    syncAccountUi();
  }
  return { session, user: verifiedUser };
}

const STORAGE_UPLOAD_LIMITS = {
  cover: {
    label: "capa",
    bucket: "beat-covers",
    folder: "beat-covers",
    maxBytes: 10 * 1024 * 1024,
    allowedMime: ["image/jpeg", "image/png", "image/webp"],
    allowedExt: ["jpg", "jpeg", "png", "webp"],
    upsert: true,
  },
  audio: {
    label: "audio",
    bucket: "beat-audio",
    folder: "beat-audio",
    maxBytes: 250 * 1024 * 1024,
    allowedMime: ["audio/mpeg", "audio/wav", "audio/x-wav", "audio/flac", "audio/mp4", "audio/aac", "audio/ogg", "video/mp4"],
    allowedExt: ["mp3", "wav", "m4a", "aac", "ogg", "flac"],
    upsert: false,
  },
  stems: {
    label: "stems",
    bucket: "beat-stems",
    folder: "beat-stems",
    maxBytes: 500 * 1024 * 1024,
    allowedMime: ["application/zip", "application/x-zip-compressed"],
    allowedExt: ["zip"],
    upsert: false,
  },
  secure_mp3: {
    label: "MP3 de Entrega",
    bucket: "beat-secure-files",
    folder: "beat-secure-files",
    maxBytes: 150 * 1024 * 1024,
    allowedMime: ["audio/mpeg", "audio/mp3"],
    allowedExt: ["mp3"],
    upsert: false,
  },
  secure_wav: {
    label: "WAV de Entrega",
    bucket: "beat-secure-files",
    folder: "beat-secure-files",
    maxBytes: 250 * 1024 * 1024,
    allowedMime: ["audio/wav", "audio/x-wav"],
    allowedExt: ["wav"],
    upsert: false,
  },
  secure_stems: {
    label: "Stems ZIP de Entrega",
    bucket: "beat-secure-files",
    folder: "beat-secure-files",
    maxBytes: 500 * 1024 * 1024,
    allowedMime: ["application/zip", "application/x-zip-compressed"],
    allowedExt: ["zip"],
    upsert: false,
  },
  avatar: {
    label: "avatar",
    bucket: "profile-avatars",
    folder: "profile/avatar",
    maxBytes: 10 * 1024 * 1024,
    allowedMime: ["image/jpeg", "image/png", "image/webp"],
    allowedExt: ["jpg", "jpeg", "png", "webp"],
    upsert: true,
  },
  banner: {
    label: "banner",
    bucket: "profile-banners",
    folder: "profile/banner",
    maxBytes: 15 * 1024 * 1024,
    allowedMime: ["image/jpeg", "image/png", "image/webp"],
    allowedExt: ["jpg", "jpeg", "png", "webp"],
    upsert: true,
  },
  chatAttachment: {
    label: "arquivo do chat",
    bucket: "chat-attachments",
    folder: "chat",
    maxBytes: 100 * 1024 * 1024,
    allowedMime: [
      "image/jpeg", "image/png", "image/webp",
      "audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/flac", "audio/mp4", "audio/aac", "audio/ogg", "audio/x-m4a",
      "video/mp4", "video/webm",
      "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain", "application/zip", "application/x-zip-compressed",
    ],
    allowedExt: ["jpg", "jpeg", "png", "webp", "mp3", "wav", "m4a", "ogg", "flac", "mp4", "webm", "pdf", "docx", "txt", "zip"],
    upsert: false,
  },
};

function validateStorageFile(file, config) {
  if (!file) {
    const error = new Error("Nenhum arquivo selecionado.");
    error.code = "NO_FILE";
    throw error;
  }
  const ext = fileExtension(file).replace(/[^a-z0-9]/g, "").toLowerCase();
  const type = String(file.type || "").toLowerCase();
  const mimeOk = config.allowedMime.includes(type);
  const extOk = config.allowedExt.includes(ext);
  if (!mimeOk && !extOk) {
    const error = new Error(`Formato invalido para ${config.label}.`);
    error.code = "INVALID_MIME";
    throw error;
  }
  if (file.size > config.maxBytes) {
    const error = new Error(`${config.label} esta grande demais.`);
    error.code = "FILE_TOO_LARGE";
    throw error;
  }
  return ext || config.allowedExt[0];
}

async function uploadStorageFile(file, options = {}) {
  const config = options.config || STORAGE_UPLOAD_LIMITS[options.type || "cover"];
  if (!config) throw new Error("Tipo de upload nao suportado.");
  const ext = validateStorageFile(file, config);
  const contentType = options.contentType || mimeTypeForFile(file);
  const { user } = await ensureStorageAuthSession({ forceRefresh: Boolean(options.forceRefresh) });
  const safeBase = sanitizeStorageSegment(file.name.replace(/\.[^.]+$/, ""), config.label);
  const fileId = typeof window.crypto?.randomUUID === "function" ? window.crypto.randomUUID() : generateUUID();
  const path = options.path || `${user.id}/${config.folder}/${safeBase}-${fileId}.${ext}`;
  storageDebug("upload_start", {
    bucket: config.bucket,
    path,
    userId: user.id,
    fileType: contentType,
    fileSize: file.size,
  });
  const upload = async () => withTimeout(
    supabaseClient.storage.from(config.bucket).upload(path, file, {
      cacheControl: "3600",
      contentType,
      upsert: options.upsert ?? config.upsert,
    }),
    options.timeoutMs || releaseUploadTimeoutMs(options.type),
    `O upload da ${config.label} demorou demais.`
  );
  let result = await upload();
  if (result?.error) {
    const normalized = normalizeStorageError(result.error, { label: config.label });
    if (normalized.code === "JWT_EXPIRED" && !options.forceRefresh) {
      await ensureStorageAuthSession({ forceRefresh: true });
      result = await upload();
    }
  }
  if (result?.error) {
    const normalized = normalizeStorageError(result.error, { label: config.label });
    const error = new Error(normalized.message);
    error.code = normalized.code;
    error.raw = result.error;
    throw error;
  }
  const { data: urlData } = supabaseClient.storage.from(config.bucket).getPublicUrl(path);
  const publicUrl = urlData?.publicUrl || "";
  if (!publicUrl) throw new Error("Upload concluido, mas o storage nao retornou uma URL publica.");
  storageDebug("upload_success", { bucket: config.bucket, path, userId: user.id, fileSize: file.size });
  return { bucket: config.bucket, path, publicUrl, url: publicUrl, contentType, user };
}

async function uploadProfileAsset(file, type) {
  if (!file) return { url: "", path: "" };
  if (supabaseClient && appState.authUser) {
    const result = await uploadStorageFile(file, { type });
    return { url: result.publicUrl, path: result.path, bucket: result.bucket };
  }
  return { url: await fileToDataUrl(file), path: "" };
}

function openProfileEditor() {
  const profile = activeProfile() || {};
  const display = profileDisplayData(profile);
  const roleOptions = accountRoles.map((role) => `<option value="${role.id}" ${display.role === role.id ? "selected" : ""}>${role.label}</option>`).join("");
  openModal(`<form class="profile-edit-form profile-editor-shell" autocomplete="off">
    <header class="profile-editor-header">
      <div>
        <span>ANSEND</span>
        <h2>Perfis</h2>
      </div>
      <nav aria-label="Seções do editor">
        <button type="button" class="profile-editor-tab is-active" data-action="profile-editor-tab" data-tab="main">Perfil principal</button>
        <button type="button" class="profile-editor-tab" data-action="profile-editor-tab" data-tab="appearance">Aparência</button>
        <button type="button" class="profile-editor-tab" data-action="profile-editor-tab" data-tab="links">Links</button>
      </nav>
    </header>

    <div class="profile-editor-scroll">
      <section class="profile-editor-panel is-active" data-profile-panel="main">
        <div class="profile-editor-columns">
          <div class="profile-editor-fields">
            <div class="profile-editor-media">
              <div class="profile-edit-banner-preview ${display.banner ? "has-image" : ""}" style="${display.banner ? `background-image:url('${htmlEscape(display.banner)}');background-position:${htmlEscape(display.bannerPosition)};background-size:${htmlEscape(display.bannerSize)}` : ""}">
                <button type="button" data-action="profile-image-picker-open" data-image-type="banner"><i data-lucide="image-plus"></i>Alterar banner</button>
              </div>
              <div class="profile-editor-avatar-row">
                ${profileAvatarMarkup(display, "profile-edit-avatar")}
                <div>
                  <strong>Imagem do perfil</strong>
                  <small>PNG, JPG ou WebP. Use uma imagem quadrada.</small>
                  <div class="profile-editor-inline-actions">
                    <button type="button" data-action="profile-image-picker-open" data-image-type="avatar">Alterar avatar</button>
                    <button type="button" class="is-danger" data-action="profile-image-remove" data-image-type="avatar">Remover</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="profile-editor-field-grid">
              <label>Nome exibido<input name="display_name" value="${htmlEscape(display.name)}" placeholder="Seu nome público"></label>
              <label>Username<input name="username" value="${htmlEscape(display.username)}" placeholder="seu-username"></label>
              <label>Função<select name="account_role">${roleOptions}</select></label>
              <label>Nome completo<input name="full_name" value="${htmlEscape(display.fullName)}" placeholder="Seu nome"></label>
              <label class="is-wide">Bio<textarea name="bio" rows="5" maxlength="300" placeholder="Conte o que você faz e como pode ajudar artistas.">${htmlEscape(profile?.bio || "")}</textarea><small><span data-bio-count>${String(profile?.bio || "").length}</span>/300</small></label>
            </div>
          </div>

          <aside class="profile-editor-preview" aria-label="Prévia do perfil">
            <span>Prévia</span>
            <article>
              <div class="profile-preview-banner ${display.banner ? "has-image" : ""}" style="${display.banner ? `background-image:url('${htmlEscape(display.banner)}');background-position:${htmlEscape(display.bannerPosition)};background-size:${htmlEscape(display.bannerSize)}` : ""}"></div>
              ${profileAvatarMarkup(display, "profile-preview-avatar")}
              <div class="profile-preview-copy">
                <strong data-profile-preview-name>${htmlEscape(display.name)}</strong>
                <small data-profile-preview-handle>${htmlEscape(display.handle || "@username")}</small>
                <em data-profile-preview-role>${htmlEscape(display.roleLabel)}</em>
                <p data-profile-preview-bio>${htmlEscape(display.bio || "Sua bio aparecerá aqui.")}</p>
                <button type="button">Ver perfil musical</button>
              </div>
            </article>
          </aside>
        </div>
      </section>

      <section class="profile-editor-panel" data-profile-panel="appearance">
        <div class="profile-editor-appearance">
          <div>
            <span>Identidade visual</span>
            <h3>Avatar e banner</h3>
            <p>Use imagens reais do seu perfil para criar uma presença musical reconhecível.</p>
          </div>
          <div class="profile-editor-appearance-actions">
            <button type="button" data-action="profile-image-picker-open" data-image-type="avatar"><i data-lucide="user-round"></i><span><strong>Alterar avatar</strong><small>Imagem quadrada</small></span></button>
            <button type="button" data-action="profile-image-picker-open" data-image-type="banner"><i data-lucide="image"></i><span><strong>Alterar banner</strong><small>Imagem horizontal</small></span></button>
            <button type="button" class="is-danger" data-action="profile-image-remove" data-image-type="banner"><i data-lucide="trash-2"></i><span><strong>Remover banner</strong><small>Usar fundo minimalista</small></span></button>
          </div>
          <div class="profile-image-position-controls">
            <label><span>Banner horizontal</span><input type="range" name="banner_position_x" min="0" max="100" value="${display.bannerPositionX}" data-action="profile-image-position" data-image-type="banner" data-axis="x"></label>
            <label><span>Banner vertical</span><input type="range" name="banner_position_y" min="0" max="100" value="${display.bannerPositionY}" data-action="profile-image-position" data-image-type="banner" data-axis="y"></label>
            <label><span>Tamanho do banner</span><input type="range" name="banner_scale" min="1" max="2.5" step="0.01" value="${display.bannerScale}" data-action="profile-image-position" data-image-type="banner" data-axis="scale"></label>
            <label><span>Avatar horizontal</span><input type="range" name="avatar_position_x" min="0" max="100" value="${display.avatarPositionX}" data-action="profile-image-position" data-image-type="avatar" data-axis="x"></label>
            <label><span>Avatar vertical</span><input type="range" name="avatar_position_y" min="0" max="100" value="${display.avatarPositionY}" data-action="profile-image-position" data-image-type="avatar" data-axis="y"></label>
            <label><span>Tamanho do avatar</span><input type="range" name="avatar_scale" min="1" max="2.5" step="0.01" value="${display.avatarScale}" data-action="profile-image-position" data-image-type="avatar" data-axis="scale"></label>
          </div>
        </div>
      </section>

      <section class="profile-editor-panel" data-profile-panel="links">
        <div class="profile-editor-links">
          <div><span>Presença digital</span><h3>Links sociais</h3><p>Adicione apenas canais reais que deseja mostrar no perfil.</p></div>
          <div class="profile-editor-field-grid">
            <label>Instagram<input name="instagram_url" value="${htmlEscape(profile?.instagram_url || profile?.instagram || "")}" placeholder="https://instagram.com/..."></label>
            <label>YouTube<input name="youtube_url" value="${htmlEscape(profile?.youtube_url || profile?.youtube || "")}" placeholder="https://youtube.com/@..."></label>
            <label>Spotify<input name="spotify_url" value="${htmlEscape(profile?.spotify_url || profile?.spotify || "")}" placeholder="https://open.spotify.com/..."></label>
            <label>SoundCloud<input name="soundcloud_url" value="${htmlEscape(profile?.soundcloud_url || profile?.soundcloud || "")}" placeholder="https://soundcloud.com/..."></label>
            <label class="is-wide">Site<input name="website_url" value="${htmlEscape(profile?.website_url || profile?.website || "")}" placeholder="https://..."></label>
          </div>
        </div>
      </section>
    </div>

    <input class="profile-editor-file" data-preview="avatar" name="avatar_file" type="file" accept="image/png,image/jpeg,image/webp" hidden>
    <input class="profile-editor-file" data-preview="banner" name="banner_file" type="file" accept="image/png,image/jpeg,image/webp" hidden>
    <input name="remove_avatar" type="hidden" value="false">
    <input name="remove_banner" type="hidden" value="false">

    <footer class="profile-editor-footer">
      <span>Revise a prévia antes de salvar.</span>
      <div>
        <button type="button" data-action="close-modal">Cancelar</button>
        <button type="submit" class="is-primary">Salvar alterações</button>
      </div>
    </footer>

    <section class="profile-image-picker" data-image-picker aria-hidden="true">
      <div class="profile-image-picker-backdrop" data-action="profile-image-picker-close"></div>
      <div class="profile-image-picker-dialog" role="dialog" aria-modal="true" aria-label="Editar imagem">
        <header><div><span>ANSEND</span><h3 data-image-picker-title>Editar imagem</h3></div><button type="button" data-action="profile-image-picker-close" aria-label="Fechar"><i data-lucide="x"></i></button></header>
        <div class="profile-image-edit-stage" data-image-edit-stage>
          <div class="profile-image-edit-frame" data-image-picker-preview><i data-lucide="image"></i><span>Nenhuma imagem selecionada</span></div>
        </div>
        <div class="profile-image-edit-controls">
          <button type="button" data-action="profile-image-picker-browse" aria-label="Selecionar imagem menor"><i data-lucide="image"></i></button>
          <input type="range" min="1" max="2.5" step="0.01" value="1" data-image-edit-scale aria-label="Tamanho da imagem">
          <button type="button" data-action="profile-image-picker-browse" aria-label="Selecionar outra imagem"><i data-lucide="image-plus"></i></button>
        </div>
        <footer>
          <button type="button" class="is-danger" data-action="profile-image-remove">Remover imagem</button>
          <button type="button" class="is-primary" data-action="profile-image-picker-close">Aplicar ajuste</button>
        </footer>
      </div>
    </section>
  </form>`);
  document.querySelector(".app-modal")?.classList.add("is-profile-editor");
  document.querySelector(".app-modal-panel")?.classList.add("is-profile-editor-panel");
  syncProfileImagePositions(profileEditorForm());
}

function profileEditorForm() {
  return document.querySelector(".profile-editor-shell");
}

function syncProfileEditorPreview(form = profileEditorForm()) {
  if (!form) return;
  const name = form.elements.display_name?.value.trim() || "Seu nome";
  const username = sanitizeHandle(form.elements.username?.value || "");
  const role = accountRoleLabel(form.elements.account_role?.value || "artista");
  const bio = form.elements.bio?.value.trim() || "Sua bio aparecerá aqui.";
  const count = form.querySelector("[data-bio-count]");
  if (count) count.textContent = String(form.elements.bio?.value.length || 0);
  const namePreview = form.querySelector("[data-profile-preview-name]");
  const handlePreview = form.querySelector("[data-profile-preview-handle]");
  const rolePreview = form.querySelector("[data-profile-preview-role]");
  const bioPreview = form.querySelector("[data-profile-preview-bio]");
  if (namePreview) namePreview.textContent = name;
  if (handlePreview) handlePreview.textContent = username ? `@${username}` : "@username";
  if (rolePreview) rolePreview.textContent = role;
  if (bioPreview) bioPreview.textContent = bio;
  syncProfileImagePositions(form);
}

function syncProfileImagePositions(form = profileEditorForm()) {
  if (!form) return;
  const bannerX = clampImagePosition(form.elements.banner_position_x?.value);
  const bannerY = clampImagePosition(form.elements.banner_position_y?.value);
  const avatarX = clampImagePosition(form.elements.avatar_position_x?.value);
  const avatarY = clampImagePosition(form.elements.avatar_position_y?.value);
  const bannerScale = clampImageScale(form.elements.banner_scale?.value);
  const avatarScale = clampImageScale(form.elements.avatar_scale?.value);
  form.querySelectorAll(".profile-edit-banner-preview, .profile-preview-banner").forEach((banner) => {
    banner.style.backgroundPosition = `${bannerX}% ${bannerY}%`;
    banner.style.backgroundSize = `${Math.round(bannerScale * 100)}%`;
  });
  form.querySelectorAll(".profile-edit-avatar img, .profile-preview-avatar img").forEach((image) => {
    image.style.objectPosition = `${avatarX}% ${avatarY}%`;
  });
  form.querySelectorAll(".profile-edit-avatar, .profile-preview-avatar").forEach((avatar) => {
    avatar.style.setProperty("--profile-avatar-position", `${avatarX}% ${avatarY}%`);
    avatar.style.setProperty("--profile-avatar-scale", String(avatarScale));
  });
}

function profileImageEditorState(type = "avatar", form = profileEditorForm()) {
  const prefix = type === "banner" ? "banner" : "avatar";
  return {
    x: clampImagePosition(form?.elements[`${prefix}_position_x`]?.value),
    y: clampImagePosition(form?.elements[`${prefix}_position_y`]?.value),
    scale: clampImageScale(form?.elements[`${prefix}_scale`]?.value),
  };
}

function updateProfileImageEditorPreview() {
  const picker = document.querySelector("[data-image-picker]");
  const form = profileEditorForm();
  if (!picker || !form) return;
  const type = picker.dataset.imageType || "avatar";
  const preview = picker.querySelector("[data-image-picker-preview]");
  const image = preview?.querySelector("img");
  const scaleInput = picker.querySelector("[data-image-edit-scale]");
  const state = profileImageEditorState(type, form);
  picker.classList.toggle("is-banner-editor", type === "banner");
  picker.classList.toggle("is-avatar-editor", type !== "banner");
  if (scaleInput && Number(scaleInput.value) !== state.scale) scaleInput.value = String(state.scale);
  if (image) {
    image.style.objectPosition = `${state.x}% ${state.y}%`;
    image.style.transform = `scale(${state.scale})`;
  }
  syncProfileImagePositions(form);
}

function setProfileImageEditorValue(type, values = {}) {
  const form = profileEditorForm();
  if (!form) return;
  const prefix = type === "banner" ? "banner" : "avatar";
  if (values.x !== undefined && form.elements[`${prefix}_position_x`]) {
    form.elements[`${prefix}_position_x`].value = String(clampImagePosition(values.x));
  }
  if (values.y !== undefined && form.elements[`${prefix}_position_y`]) {
    form.elements[`${prefix}_position_y`].value = String(clampImagePosition(values.y));
  }
  if (values.scale !== undefined && form.elements[`${prefix}_scale`]) {
    form.elements[`${prefix}_scale`].value = String(clampImageScale(values.scale));
  }
  updateProfileImageEditorPreview();
}

function openProfileImagePicker(type = "avatar") {
  const picker = document.querySelector("[data-image-picker]");
  const form = profileEditorForm();
  if (!picker || !form) return;
  picker.dataset.imageType = type;
  picker.classList.add("is-open");
  picker.setAttribute("aria-hidden", "false");
  const preview = picker.querySelector("[data-image-picker-preview]");
  const title = picker.querySelector("[data-image-picker-title]");
  const source = type === "banner"
    ? document.querySelector(".profile-edit-banner-preview")
    : document.querySelector(".profile-edit-avatar img");
  const background = type === "banner" ? source?.style.backgroundImage : "";
  const src = type === "avatar" ? source?.getAttribute("src") : String(background || "").replace(/^url\(["']?|["']?\)$/g, "");
  if (title) title.textContent = type === "banner" ? "Editar banner" : "Editar imagem";
  if (preview) {
    preview.innerHTML = src
      ? `<img src="${htmlEscape(src)}" alt="Previa da imagem selecionada" draggable="false">`
      : `<button type="button" class="profile-image-empty" data-action="profile-image-picker-browse"><i data-lucide="image-up"></i><strong>Escolher imagem</strong><small>PNG, JPG ou WebP</small></button>`;
  }
  updateProfileImageEditorPreview();
  lucide.createIcons();
}

function closeProfileImagePicker() {
  const picker = document.querySelector("[data-image-picker]");
  if (!picker) return;
  picker.classList.remove("is-open", "is-dragging");
  picker.setAttribute("aria-hidden", "true");
}

function browseProfileImage() {
  const picker = document.querySelector("[data-image-picker]");
  const type = picker?.dataset.imageType || "avatar";
  profileEditorForm()?.querySelector(`.profile-editor-file[data-preview="${type}"]`)?.click();
}

function removeProfileImage(type = "") {
  const form = profileEditorForm();
  const picker = document.querySelector("[data-image-picker]");
  const resolvedType = type || picker?.dataset.imageType || "avatar";
  if (!form) return;
  const fileInput = form.querySelector(`.profile-editor-file[data-preview="${resolvedType}"]`);
  if (fileInput) fileInput.value = "";
  const removeInput = form.elements[resolvedType === "banner" ? "remove_banner" : "remove_avatar"];
  if (removeInput) removeInput.value = "true";
  if (resolvedType === "banner") {
    form.querySelectorAll(".profile-edit-banner-preview, .profile-preview-banner").forEach((banner) => {
      banner.classList.remove("has-image");
      banner.style.backgroundImage = "";
    });
  } else {
    const displayName = form.elements.display_name?.value || "ANSEND";
    form.querySelectorAll(".profile-edit-avatar, .profile-preview-avatar").forEach((avatar) => {
      avatar.classList.add("is-initials");
      avatar.innerHTML = profileInitials(displayName);
    });
  }
  closeProfileImagePicker();
}

async function applyProfileImageFile(file, type) {
  if (!file || !["image/png", "image/jpeg", "image/webp"].includes(file.type)) return;
  const form = profileEditorForm();
  if (!form) return;
  const input = form.querySelector(`.profile-editor-file[data-preview="${type}"]`);
  if (input && typeof DataTransfer !== "undefined") {
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
  }
  const removeInput = form.elements[type === "banner" ? "remove_banner" : "remove_avatar"];
  if (removeInput) removeInput.value = "false";
  const src = await fileToDataUrl(file);
  if (type === "banner") {
    form.querySelectorAll(".profile-edit-banner-preview, .profile-preview-banner").forEach((banner) => {
      banner.classList.add("has-image");
      banner.style.backgroundImage = `url("${src}")`;
    });
  } else {
    form.querySelectorAll(".profile-edit-avatar, .profile-preview-avatar").forEach((avatar) => {
      avatar.classList.remove("is-initials");
      avatar.innerHTML = `<img src="${src}" alt="Prévia da foto do perfil">`;
    });
  }
  syncProfileImagePositions(form);
  const picker = document.querySelector("[data-image-picker]");
  const pickerPreview = picker?.querySelector("[data-image-picker-preview]");
  if (pickerPreview) pickerPreview.innerHTML = `<img src="${htmlEscape(src)}" alt="Previa da imagem selecionada" draggable="false">`;
  updateProfileImageEditorPreview();
  lucide.createIcons();
}

async function saveProfileEdit(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  let errorNode = form.querySelector(".profile-edit-error");
  if (!errorNode) {
    form.querySelector(".profile-editor-footer")?.insertAdjacentHTML("afterbegin", `<p class="profile-edit-error" hidden></p>`);
    errorNode = form.querySelector(".profile-edit-error");
  }
  if (errorNode) {
    errorNode.hidden = true;
    errorNode.textContent = "";
  }
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.dataset.originalText = submitButton.textContent;
    submitButton.textContent = "Salvando...";
  }
  const current = activeProfile() || {};
  try {
    if (supabaseClient && !appState.authUser) throw new Error("Sessao expirada. Faca login novamente para salvar o perfil.");
    const avatarFile = form.elements.avatar_file?.files?.[0];
    const bannerFile = form.elements.banner_file?.files?.[0];
    const uploadedAvatar = await uploadProfileAsset(avatarFile, "avatar");
    const uploadedBanner = await uploadProfileAsset(bannerFile, "banner");
    const removeAvatar = form.elements.remove_avatar?.value === "true";
    const removeBanner = form.elements.remove_banner?.value === "true";
    const profile = {
      ...current,
      id: appState.authUser?.id || current.id || `local-profile-${Date.now()}`,
      email: appState.authUser?.email || current.email || null,
      full_name: form.elements.full_name?.value.trim() || current.full_name || "Usuario ANSEND",
      display_name: form.elements.display_name?.value.trim() || current.display_name || null,
      username: sanitizeHandle(form.elements.username?.value || current.username || current.handle || ""),
      artistic_name: current.artistic_name || null,
      account_role: form.elements.account_role?.value || current.account_role || "artista",
      avatar_url: removeAvatar ? null : (uploadedAvatar.url || current.avatar_url || current.photo_url || null),
      avatar_path: removeAvatar ? null : (uploadedAvatar.path || current.avatar_path || null),
      banner_url: removeBanner ? null : (uploadedBanner.url || current.banner_url || current.cover_url || null),
      banner_path: removeBanner ? null : (uploadedBanner.path || current.banner_path || null),
      banner_position_x: clampImagePosition(form.elements.banner_position_x?.value),
      banner_position_y: clampImagePosition(form.elements.banner_position_y?.value),
      avatar_position_x: clampImagePosition(form.elements.avatar_position_x?.value),
      avatar_position_y: clampImagePosition(form.elements.avatar_position_y?.value),
      banner_scale: clampImageScale(form.elements.banner_scale?.value),
      avatar_scale: clampImageScale(form.elements.avatar_scale?.value),
      bio: form.elements.bio?.value.trim() || null,
      instagram_url: normalizeProfileLink("instagram", form.elements.instagram_url?.value) || null,
      youtube_url: normalizeProfileLink("youtube", form.elements.youtube_url?.value) || null,
      spotify_url: normalizeProfileLink("spotify", form.elements.spotify_url?.value) || null,
      soundcloud_url: normalizeProfileLink("soundcloud", form.elements.soundcloud_url?.value) || null,
      website_url: normalizeProfileLink("website", form.elements.website_url?.value) || null,
      music_styles: current.music_styles || preferredGenres(),
      updated_at: new Date().toISOString(),
    };
    if (!supabaseClient) {
      setLocalPreviewProfile(profile);
      closeModal();
      renderRoute();
      return;
    }
    const result = await upsertProfile(profile);
    if (result.error) throw result.error;
    appState.profile = result.data || profile;
    clearLocalPreviewProfile();
    await loadPublicPlatformData();
    closeModal();
    renderRoute();
  } catch (error) {
    console.error("[ANSEND profile] save failed", error);
    if (errorNode) {
      errorNode.textContent = error?.message || "Nao foi possivel salvar o perfil.";
      errorNode.hidden = false;
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalText || "Salvar alteracoes";
      delete submitButton.dataset.originalText;
    }
  }
}

async function upsertProfile(profile) {
  if (!supabaseClient || !appState.authUser) return { error: new Error("Supabase não configurado") };
  const basePayload = {
    id: appState.authUser.id,
    email: appState.authUser.email || profile.email,
    full_name: profile.full_name,
    display_name: profile.display_name || null,
    username: profile.username || null,
    account_role: profile.account_role,
    artistic_name: profile.artistic_name || null,
    music_styles: profile.music_styles || preferredGenres(),
    onboarding_goal: profile.onboarding_goal || appState.onboardingProfile?.goal || null,
    bio: profile.bio || null,
    avatar_url: profile.avatar_url || null,
    avatar_path: profile.avatar_path || null,
    banner_url: profile.banner_url || null,
    banner_path: profile.banner_path || null,
    banner_position_x: clampImagePosition(profile.banner_position_x),
    banner_position_y: clampImagePosition(profile.banner_position_y),
    avatar_position_x: clampImagePosition(profile.avatar_position_x),
    avatar_position_y: clampImagePosition(profile.avatar_position_y),
    banner_scale: clampImageScale(profile.banner_scale),
    avatar_scale: clampImageScale(profile.avatar_scale),
    website_url: profile.website_url || null,
    instagram_url: profile.instagram_url || null,
    youtube_url: profile.youtube_url || null,
    spotify_url: profile.spotify_url || null,
    soundcloud_url: profile.soundcloud_url || null,
  };
  if (!Object.prototype.hasOwnProperty.call(profile, "avatar_url")) delete basePayload.avatar_url;
  if (!Object.prototype.hasOwnProperty.call(profile, "avatar_path")) delete basePayload.avatar_path;
  if (!Object.prototype.hasOwnProperty.call(profile, "banner_url")) delete basePayload.banner_url;
  if (!Object.prototype.hasOwnProperty.call(profile, "banner_path")) delete basePayload.banner_path;
  if (!Object.prototype.hasOwnProperty.call(profile, "banner_position_x")) delete basePayload.banner_position_x;
  if (!Object.prototype.hasOwnProperty.call(profile, "banner_position_y")) delete basePayload.banner_position_y;
  if (!Object.prototype.hasOwnProperty.call(profile, "avatar_position_x")) delete basePayload.avatar_position_x;
  if (!Object.prototype.hasOwnProperty.call(profile, "avatar_position_y")) delete basePayload.avatar_position_y;
  if (!Object.prototype.hasOwnProperty.call(profile, "banner_scale")) delete basePayload.banner_scale;
  if (!Object.prototype.hasOwnProperty.call(profile, "avatar_scale")) delete basePayload.avatar_scale;
  const payload = { ...basePayload };
  const authProvider = profile.auth_provider || authProviderFromUser(appState.authUser);
  if (authProvider) payload.auth_provider = authProvider;
  if (profile.last_login_at) payload.last_login_at = profile.last_login_at;
  let { data, error } = await supabaseClient.from("profiles").upsert(payload, { onConflict: "id" }).select().single();
  if (error && /auth_provider|last_login_at|position|schema cache|column/i.test(error.message || "")) {
    delete basePayload.banner_position_x;
    delete basePayload.banner_position_y;
    delete basePayload.avatar_position_x;
    delete basePayload.avatar_position_y;
    delete basePayload.banner_scale;
    delete basePayload.avatar_scale;
    ({ data, error } = await supabaseClient.from("profiles").upsert(basePayload, { onConflict: "id" }).select().single());
  }
  if (!error && data) appState.profile = data;
  return { data, error };
}

async function touchProfileLoginMetadata({ lastLoginAt = null, authProvider = null } = {}) {
  if (!supabaseClient || !appState.authUser) return null;
  const payload = {
    email: appState.authUser.email || appState.profile?.email || null,
  };
  const provider = authProvider || authProviderFromUser(appState.authUser);
  if (provider) payload.auth_provider = provider;
  if (lastLoginAt) payload.last_login_at = lastLoginAt;
  let result = await supabaseClient
    .from("profiles")
    .update(payload)
    .eq("id", appState.authUser.id)
    .select()
    .maybeSingle();
  if (result.error && /auth_provider|last_login_at|schema cache|column/i.test(result.error.message || "")) {
    result = await supabaseClient
      .from("profiles")
      .update({ email: payload.email })
      .eq("id", appState.authUser.id)
      .select()
      .maybeSingle();
  }
  if (result.error) {
    console.error("[ANSEND auth] profile login metadata update failed", result.error);
    return null;
  }
  if (result.data) appState.profile = { ...(appState.profile || {}), ...result.data };
  return result.data || null;
}

function debugAuth(label, details = {}) {
  const rawSession = details.session || null;
  const safeSession = rawSession ? {
    hasSession: true,
    expires_at: rawSession.expires_at || null,
    user: rawSession.user ? {
      id: rawSession.user.id,
      role: rawSession.user.role,
      aud: rawSession.user.aud,
    } : null,
  } : { hasSession: false };
  const { session, ...rest } = details;
  const diagnostic = {
    buildId: ANSEND_BUILD_ID,
    event: details.event || label,
    origin: location.origin,
    href: location.href,
    supabaseUrl: SUPABASE_CONFIG.url || null,
    storageKey: SUPABASE_AUTH_STORAGE_KEY,
    route: currentRoute(),
    authReady: appState.authReady,
    userId: appState.authUser?.id || null,
    profileId: appState.profile?.id || null,
    ...rest,
    session: safeSession,
  };
  window.__ANSEND_AUTH_DIAG__ = diagnostic;
  if (!AUTH_DEBUG_ENABLED) return;
  console.debug("[ANSEND auth]", label, diagnostic);
}

function authProviderFromUser(user) {
  const identities = Array.isArray(user?.identities) ? user.identities : [];
  return identities[0]?.provider || user?.app_metadata?.provider || null;
}

function profileFromAuthUser(user, fallback = {}) {
  const metadata = user?.user_metadata || {};
  const emailName = String(user?.email || "").split("@")[0] || "Usuario ANSEND";
  const fullName = metadata.full_name || metadata.name || fallback.full_name || emailName;
  const displayName = metadata.display_name || fallback.display_name || metadata.name || fullName;
  const avatarUrl = metadata.avatar_url || metadata.picture || fallback.avatar_url || "";
  return {
    ...fallback,
    id: user?.id,
    email: user?.email || fallback.email || "",
    full_name: fullName,
    display_name: displayName,
    username: sanitizeHandle(metadata.username || fallback.username || emailName),
    account_role: metadata.account_role || fallback.account_role || "artista",
    artistic_name: metadata.artistic_name || fallback.artistic_name || null,
    ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    auth_provider: fallback.auth_provider || authProviderFromUser(user),
    music_styles: Array.isArray(metadata.music_styles) && metadata.music_styles.length
      ? metadata.music_styles
      : (fallback.music_styles || preferredGenres()),
    onboarding_goal: fallback.onboarding_goal || appState.onboardingProfile?.goal || null,
  };
}

async function loadProfile(user) {
  if (!supabaseClient || !user) return null;
  appState.profileLoading = true;
  try {
  debugAuth("profile_load_start", { userId: user.id });
  const { data, error } = await withTimeout(
    supabaseClient.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    8500,
    "Profile fetch timeout"
  );
  if (error) {
    debugAuth("profile_load_error", { userId: user.id, error: error.message });
    appState.profile = appState.profile || profileFromAuthUser(user);
    showToast("Não consegui carregar seu perfil do Supabase", "triangle-alert");
    return appState.profile;
  }
  const pending = JSON.parse(localStorage.getItem(pendingProfileKey(user.id)) || "null");
  if (!data && pending) {
    const fallbackProfile = profileFromAuthUser(user, pending);
    const result = await upsertProfile(fallbackProfile);
    if (!result.error) {
      localStorage.removeItem(pendingProfileKey(user.id));
    } else {
      appState.profile = appState.profile || fallbackProfile;
      console.error("[ANSEND auth] profile upsert from pending failed", result.error);
    }
    debugAuth("profile_created_from_pending", { userId: user.id, profileId: result.data?.id || null, error: result.error?.message || null });
    appState.profile = result.data || appState.profile || fallbackProfile;
    return appState.profile;
  }
  if (!data) {
    const fallbackProfile = profileFromAuthUser(user);
    const result = await upsertProfile(fallbackProfile);
    if (result.error) {
      appState.profile = appState.profile || fallbackProfile;
      console.error("[ANSEND auth] profile upsert from auth user failed", result.error);
    } else {
      appState.profile = result.data;
    }
    debugAuth("profile_created_from_auth_user", { userId: user.id, profileId: result.data?.id || null, error: result.error?.message || null });
    return appState.profile;
  }
  appState.profile = data;
  clearLocalPreviewProfile();
  debugAuth("profile_loaded", { userId: user.id, profileId: data.id });
  return data;
  } catch (error) {
    debugAuth("profile_load_failed_transient", { userId: user.id, error: error?.message || String(error) });
    appState.profile = appState.profile || profileFromAuthUser(user);
    return appState.profile;
  } finally {
    appState.profileLoading = false;
  }
}

async function loadAdminStatus() {
  appState.isAdmin = false;
  if (!supabaseClient || !appState.authUser || !isAdminUser()) return false;
  const { data, error } = await supabaseClient.rpc("is_current_user_admin");
  if (error) {
    console.error("[ANSEND admin] admin status check failed", error);
    return false;
  }
  appState.isAdmin = Boolean(data);
  return appState.isAdmin;
}

async function getAdminProfiles() {
  if (!supabaseClient || !appState.authUser || !appState.isAdmin) return [];
  const { data, error } = await supabaseClient.rpc("admin_list_profiles");
  if (error) {
    console.error("[ANSEND admin] profile list failed", error);
    showToast(error.message || "Não foi possível carregar os perfis admin.", "triangle-alert");
    return [];
  }
  appState.adminProfiles = data || [];
  return appState.adminProfiles;
}

async function deleteProfessionalAccount(userId, triggerButton = null) {
  if (!supabaseClient || !appState.authUser || !appState.isAdmin || !isAdminUser()) {
    showToast("Acesso admin necessário para remover contas.", "shield-alert");
    return;
  }
  if (!userId || userId === appState.authUser.id) {
    showToast("Você não pode remover a própria conta admin por aqui.", "shield-alert");
    return;
  }
  const confirmed = window.confirm("Tem certeza que deseja excluir este perfil? Essa ação não pode ser desfeita.");
  if (!confirmed) return;
  const routeAfterDelete = currentRoute();
  if (triggerButton) {
    triggerButton.disabled = true;
    triggerButton.classList.add("is-loading");
  }
  const { error } = await supabaseClient.rpc("admin_delete_professional_account", { target_user_id: userId });
  if (error) {
    console.error("[ANSEND admin] delete failed", error);
    showToast(error.message?.includes("permission") ? "Você não tem permissão para executar esta ação." : "Não foi possível remover este perfil.", "triangle-alert");
    if (triggerButton) {
      triggerButton.disabled = false;
      triggerButton.classList.remove("is-loading");
    }
    return;
  }
  showToast("Perfil removido com sucesso.", "trash-2");
  appState.publicProfiles = appState.publicProfiles.filter((profile) => profile.id !== userId);
  appState.adminProfiles = appState.adminProfiles.filter((profile) => profile.id !== userId);
  appState.publicCatalogItems = appState.publicCatalogItems.filter((item) => item.user_id !== userId);
  appState.ownedCatalogItems = appState.ownedCatalogItems.filter((item) => item.user_id !== userId);
  await loadPublicPlatformData();
  await getAdminProfiles();
  if (routeAfterDelete === "admin") {
    await renderAdmin();
    hydrateView();
    return;
  }
  renderRoute();
}

function removeBeatFromLocalState(id) {
  if (!id) return;
  const idText = String(id);
  appState.publicCatalogItems = appState.publicCatalogItems.filter((item) => String(item.id) !== idText);
  appState.ownedCatalogItems = appState.ownedCatalogItems.filter((item) => String(item.id) !== idText);
  appState.favorites.delete(idText);
  appState.cart = appState.cart.filter((entry) => splitCartEntry(entry).beatId !== idText);
  appState.recommendations.feed = (appState.recommendations.feed || []).filter((item) => String(item.id) !== idText && String(item.metadata?.beatId || "") !== idText);
  if (appState.playing === idText) {
    pauseTopBeat({ quiet: true });
    closeMiniPlayer();
    appState.playing = null;
  }
  persistState();
  const savedIds = JSON.parse(localStorage.getItem("ansend-saved-playlist") || "[]").filter((savedId) => String(savedId) !== idText);
  localStorage.setItem("ansend-saved-playlist", JSON.stringify(savedIds));
}

async function deleteBeatItem(itemId, sourceTable, triggerButton = null) {
  if (!supabaseClient || !appState.authUser || !appState.isAdmin || !isAdminUser()) {
    showToast("Você não tem permissão para executar esta ação.", "shield-alert");
    return;
  }
  if (!itemId || String(itemId) === topBeatOfDay.id) {
    showToast("Não foi possível remover este beat.", "triangle-alert");
    return;
  }
  const confirmed = window.confirm("Tem certeza que deseja excluir este beat? Essa ação removerá o beat da plataforma.");
  if (!confirmed) return;

  if (triggerButton) {
    triggerButton.disabled = true;
    triggerButton.classList.add("is-loading");
    triggerButton.innerHTML = `<i data-lucide="loader-circle"></i>`;
    lucide.createIcons();
  }

  const { data, error } = await supabaseClient.rpc("admin_delete_beat", {
    p_target_id: itemId,
    p_target_source: sourceTable || null,
  });

  if (error) {
    console.error("[ANSEND admin] beat delete failed", error);
    showToast(error.message?.includes("permission") ? "Você não tem permissão para executar esta ação." : "Não foi possível remover este beat.", "triangle-alert");
    if (triggerButton) {
      triggerButton.disabled = false;
      triggerButton.classList.remove("is-loading");
      triggerButton.innerHTML = `<i data-lucide="x"></i>`;
      lucide.createIcons();
    }
    return;
  }

  removeBeatFromLocalState(itemId);
  showToast("Beat removido com sucesso.", "trash-2");
  if (data?.storage_errors?.length) {
    console.warn("[ANSEND admin] beat deleted with storage cleanup warnings", data.storage_errors);
  }
  await loadCatalogItems();
  if (currentRoute() === "detalhe" && String(location.hash.replace("#beat-", "")) === String(itemId)) {
    location.hash = "explorar";
    return;
  }
  renderRoute();
}

function syncAccountUi() {
  document.body.dataset.accountRole = appState.profile?.account_role || "visitor";
  const route = currentRoute();
  const authPending = Boolean(supabaseClient && appState.authLoading && !appState.authReady);
  const authRequiredForRoute = !authPending && !hasAccountAccess() && protectedRoute(route);
  document.body.classList.toggle("is-authenticated", hasAccountAccess());
  document.body.classList.toggle("requires-auth", authRequiredForRoute);
  document.body.dataset.route = route;
  syncPrimaryNavbarVisibility(route);
  const avatar = document.querySelector(".avatar-btn");
  const profile = activeProfile();
  if (avatar && profile?.full_name) {
    avatar.setAttribute("aria-label", `Conta de ${profile.full_name}`);
  }

  // Update premium navbar auth button text based on login state
  const authBtnText = document.querySelector(".navbar-auth-btn .auth-btn-text");
  if (authBtnText) {
    if (authPending) {
      authBtnText.textContent = appLocale.current === "pt-BR" ? "Carregando" : "Loading";
    } else if (hasAccountAccess()) {
      const email = appState.authUser?.email || "";
      const name = profile?.display_name || profile?.username || profile?.full_name || profile?.artistic_name || email || "Minha Conta";
      authBtnText.textContent = name.length > 25 ? name.substring(0, 22) + "..." : name;
    } else {
      authBtnText.textContent = appLocale.current === "pt-BR" ? "Entrar" : "Sign In";
    }
  }

  const notifContainer = document.getElementById("navbarNotificationContainer");
  if (notifContainer) {
    if (hasAccountAccess()) {
      notifContainer.removeAttribute("hidden");
    } else {
      notifContainer.setAttribute("hidden", "true");
    }
  }
}

function hasAccountAccess() {
  return Boolean(appState.authUser);
}

function protectedRoute(route) {
  return ["compras", "chat", "perfil", "configuracoes", "cadastrar", "admin"].includes(route);
}

function renderAuthLoading(reason = "session") {
  debugAuth("auth_loading_screen", { reason });
  appView.innerHTML = `
    <section class="auth-loading-page" aria-label="Validando sessao" style="min-height:52vh; display:grid; place-items:center; padding:48px 24px; text-align:center;">
      <div>
        <i data-lucide="loader-2" class="auth-loading-icon" style="width:42px; height:42px; color:#A1A1AA; animation:spin 1.1s linear infinite;"></i>
        <h2 style="font-size:22px; color:#fff; font-weight:700; margin-top:18px;">Validando sessao</h2>
        <p style="color:#A1A1AA; font-size:14px; margin-top:8px;">Sincronizando seu acesso com seguranca.</p>
      </div>
    </section>`;
  lucide.createIcons();
}

function renderReleaseAuthRequired(reason = "missing-session") {
  debugAuth("release_auth_blocked", { reason });
  appView.innerHTML = `
    <section class="release-fallback-page" aria-label="Acesso Negado" style="max-width:600px; margin:80px auto; padding:40px 32px; background:#080808; border:1px solid #1F1F1F; border-radius:16px; text-align:center;">
      <div class="release-fallback-head" style="margin-bottom:32px;">
        <i data-lucide="shield-alert" style="width:48px; height:48px; color:#71717A; margin:0 auto 16px;"></i>
        <h2 style="font-size:24px; color:#fff; font-weight:700; margin-top:8px; letter-spacing:-0.02em;">Autenticação Necessária</h2>
        <p style="color:#A1A1AA; font-size:14px; margin-top:12px; line-height:1.5;">Você precisa criar uma conta ou fazer login para lançar suas músicas e beats na plataforma.</p>
      </div>
      <a href="#vendedor" data-route="vendedor" class="an-primary" style="background:#ffffff; border:none; color:#000000; font-weight:600; padding:12px 28px; border-radius:8px; cursor:pointer; text-decoration:none; display:inline-block; font-size:14px; transition: opacity 0.2s ease;">Entrar / Criar Conta</a>
    </section>`;
  lucide.createIcons();
}

function isEditingSellerAuth() {
  const active = document.activeElement;
  return Boolean(active?.closest?.(".seller-auth-form"));
}

function shouldPreserveSellerAuthRoute() {
  return Boolean(document.querySelector(".seller-auth-form")) && (isEditingSellerAuth() || Date.now() - sellerAuthInteractionAt < 4200);
}

function renderRoutePreservingAuthFocus(force = false) {
  if (!force && shouldPreserveSellerAuthRoute()) {
    syncAccountUi();
    return;
  }
  renderRoute();
}

async function loadPublicPlatformDataSafe(reason = "auth") {
  try {
    await loadPublicPlatformData();
  } catch (error) {
    debugAuth("public_data_load_failed", { reason, error: error?.message || String(error) });
  }
}

function renderApplication(forceRoute = false) {
  syncAccountUi();
  renderRoutePreservingAuthFocus(forceRoute);
}

function clearAuthenticatedApplicationState(reason = "no-session") {
  appState.authUser = null;
  appState.authSession = null;
  appState.authLoading = false;
  appState.profileLoading = false;
  appState.profile = null;
  appState.isAdmin = false;
  appState.adminProfiles = [];
  appState.ownedCatalogItems = [];
  syncCatalogCompatibilityState();
  debugAuth(reason, { reason });
  if (typeof cleanupNotifications === "function") {
    cleanupNotifications();
  }
}

async function applySession(session, options = {}) {
  const source = options.source || "session";
  const user = session?.user || null;
  debugAuth("apply_session", { source, event: source, session });
  appState.authSession = session || null;
  appState.authUser = user;
  appState.authReady = true;
  appState.authLoading = false;

  if (!user?.id) {
    clearAuthenticatedApplicationState(`apply_session_${source}_anonymous`);
    appState.authReady = true;
    appState.authLoading = false;
    return false;
  }

  if (appState.profile?.id && appState.profile.id !== user.id) {
    appState.profile = null;
  }
  await loadPublicPlatformDataSafe(`apply_session_${source}`);
  try {
    await loadProfile(user);
  } catch (error) {
    debugAuth("apply_session_profile_failed", { source, userId: user.id, error: error?.message || String(error) });
    appState.profile = appState.profile || profileFromAuthUser(user);
  }
  if (options.touchLogin) {
    try {
      await touchProfileLoginMetadata({
        lastLoginAt: options.lastLoginAt || null,
        authProvider: authProviderFromUser(user),
      });
    } catch (error) {
      debugAuth("apply_session_touch_login_failed", { source, userId: user.id, error: error?.message || String(error) });
    }
  }
  const followups = await Promise.allSettled([
    loadAdminStatus(),
    loadOwnedCatalogItems(),
  ]);
  followups.forEach((result, index) => {
    if (result.status === "rejected") {
      debugAuth("apply_session_data_failed", {
        source,
        stage: index === 0 ? "admin" : "catalog",
        error: result.reason?.message || String(result.reason),
      });
    }
  });
  if (typeof initNotifications === "function") {
    initNotifications(user.id);
  }
  return true;
}

let authStateSubscription = null;
let authStateListenerRegistered = false;
let authStateApplyPromise = Promise.resolve();

function registerAuthStateListener() {
  if (!supabaseClient || authStateListenerRegistered) return;
  authStateListenerRegistered = true;
  const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
    authStateApplyPromise = authStateApplyPromise
      .catch(() => {})
      .then(async () => {
        const oldUserId = appState.authUser?.id || null;
        debugAuth("auth_state_change", { event, session });
        await applySession(session || null, {
          source: event,
          touchLogin: event === "SIGNED_IN",
          lastLoginAt: event === "SIGNED_IN" ? new Date().toISOString() : null,
        });
        const shouldRedirectAfterOAuth = event === "SIGNED_IN" && session?.user && hasOAuthRedirectIntent();
        if (event === "SIGNED_IN") {
          clearOAuthRedirectIntent();
          clearEmailConfirmation();
          clearEmailConfirmationIntent();
        }
        if (shouldRedirectAfterOAuth) {
          redirectAfterLogin();
          return;
        }
        renderApplication(oldUserId !== (appState.authUser?.id || null) || event === "SIGNED_OUT");
      });
  });
  authStateSubscription = data?.subscription || null;
}

async function initializeAuth() {
  const oauthError = readOAuthCallbackError();
  const shouldRedirectAfterOAuth = hasOAuthRedirectIntent();
  const shouldRedirectAfterEmailConfirmation = hasEmailConfirmationIntent();
  if (oauthError) {
    clearOAuthRedirectIntent();
    showToast(`Google OAuth: ${oauthError}`, "triangle-alert");
  }
  if (!supabaseClient) {
    appState.profile = localPreviewProfile();
    appState.publicProfiles = [];
    appState.publicCatalogItems = [];
    appState.ownedCatalogItems = [];
    syncCatalogCompatibilityState();
    appState.authReady = true;
    appState.authLoading = false;
    renderApplication(true);
    return;
  }
  registerAuthStateListener();
  const previousUserId = appState.authUser?.id || null;
  appState.authLoading = true;
  const stopAuthPerf = perfStart("Auth session loaded");
  try {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) debugAuth("initialize_get_session_error", { error: error.message });
    await applySession(data?.session || null, {
      source: "initial_getSession",
      touchLogin: Boolean(data?.session?.user && shouldRedirectAfterOAuth),
      lastLoginAt: shouldRedirectAfterOAuth ? new Date().toISOString() : null,
    });
  } catch (error) {
    debugAuth("initialize_auth_failed", { error: error?.message || String(error) });
    await loadPublicPlatformDataSafe("initial_error");
    appState.authReady = true;
    appState.authLoading = false;
  } finally {
    appState.authReady = true;
    appState.authLoading = false;
    syncAccountUi();
    stopAuthPerf();
  }
  if (appState.authUser && shouldRedirectAfterOAuth) {
    clearOAuthRedirectIntent();
    redirectAfterLogin();
    return;
  }
  if (appState.authUser && shouldRedirectAfterEmailConfirmation) {
    clearEmailConfirmation();
    clearEmailConfirmationIntent();
    showToast("E-mail confirmado. Bem-vindo a ANSEND.", "badge-check");
    redirectAfterLogin();
    return;
  }
  if (!appState.authUser && shouldRedirectAfterEmailConfirmation) {
    clearEmailConfirmationIntent();
    if (location.hash !== "#confirmar-email") location.hash = "confirmar-email";
    renderRoutePreservingAuthFocus(true);
    return;
  }
  renderApplication(previousUserId !== (appState.authUser?.id || null));
}

function persistOnboarding(profile) {
  appState.onboardingProfile = profile;
  localStorage.setItem("ansend-onboarding-profile", JSON.stringify(profile));
}

function preferredGenres() {
  const musicProfile = getMusicProfile();
  if (musicProfile?.genres?.length) return [...new Set(musicProfile.genres)].slice(0, 3);
  const profile = appState.profile;
  if (profile?.music_styles?.length) return [...new Set(profile.music_styles)].slice(0, 3);
  const onboarding = appState.onboardingProfile;
  if (!onboarding?.genres?.length) return ["Trap", "Drill", "Funk"];
  return [...new Set(onboarding.genres)].slice(0, 3);
}

function preferredBeats(limit = 8) {
  const musicProfile = getMusicProfile();
  if (musicProfile?.completed) return getRecommendedBeats(musicProfile, limit);
  const selected = preferredGenres();
  const catalog = marketplaceBeats();
  const exact = catalog.filter((item) => selected.includes(item.tags[0]));
  return exact.concat(catalog.filter((item) => !selected.includes(item.tags[0]))).slice(0, limit);
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
  const catalog = marketplaceBeats();
  const byGenre = [...new Set(catalog.map((item) => item.tags?.[0]).filter(Boolean))];
  return byGenre.map((genre) => {
    const items = catalog.filter((item) => item.tags?.[0] === genre);
    return [`${genre} ANSEND`, `${items.length} itens publicados`, items[0]?.cover || "assets/ansend-logo-square.png"];
  });
}

function findPlaylistPack(idOrTitle) {
  const requested = slugify(idOrTitle?.replace?.(/^playlist-/, "") || idOrTitle);
  const source = playlistLibrary();
  const found = source.find(([title]) => slugify(title) === requested) || source[0];
  if (!found) {
    return {
      id: "catalogo-vazio",
      title: "Catalogo vazio",
      subtitle: "Nenhum item publicado",
      cover: "assets/ansend-logo-square.png",
      description: "Cadastre beats ou musicas para criar packs automaticamente.",
      curator: "ANSEND",
      tracks: [],
    };
  }
  const [title, subtitle, cover] = found;
  const seed = [...slugify(title)].reduce((total, char) => total + char.charCodeAt(0), 0);
  const preferred = preferredBeats(24);
  const pool = preferred.length ? preferred : marketplaceBeats();
  const trackCount = Math.min(12, pool.length);
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
    ${adminDeleteButton("beat", item, "admin-delete-beat-row")}
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

function quizOptions(name, options, current = [], type = "checkbox") {
  const values = asArray(current);
  return options.map((option, index) => `<label class="nexo-quiz-option">
    <input type="${type}" name="${name}" value="${option}" ${type === "radio" ? (values[0] === option || (!values.length && index === 0) ? "checked" : "") : values.includes(option) ? "checked" : ""}>
    <span>${option}</span>
  </label>`).join("");
}

const spotifyGradients = [
  "linear-gradient(135deg, #1db954, #191414)", // Green
  "linear-gradient(135deg, #8d67ab, #191414)", // Purple
  "linear-gradient(135deg, #e8115b, #191414)", // Pink
  "linear-gradient(135deg, #509bf5, #191414)", // Blue
  "linear-gradient(135deg, #f59b23, #191414)", // Orange
  "linear-gradient(135deg, #e1112c, #191414)", // Red
  "linear-gradient(135deg, #1e3264, #191414)", // Dark blue
  "linear-gradient(135deg, #7d4b32, #191414)", // Brown
  "linear-gradient(135deg, #0d73ec, #191414)", // Sky blue
  "linear-gradient(135deg, #e91429, #191414)"  // Bright red
];

class SpotifyQuizEngine {
  constructor(config) {
    this.config = config;
    this.currentStep = 0;
    this.answers = { ...config.initialData };
    this.searchQuery = "";
    
    this.modal = document.createElement("div");
    this.modal.className = "spotify-quiz-modal";
    this.modal.setAttribute("role", "dialog");
    this.modal.setAttribute("aria-modal", "true");
    
    document.body.appendChild(this.modal);
    document.body.classList.add("onboarding-open");
    
    this.render();
  }
  
  destroy() {
    this.modal.remove();
    document.body.classList.remove("onboarding-open");
  }
  
  render() {
    const step = this.config.steps[this.currentStep];
    const totalSteps = this.config.steps.length;
    const progress = ((this.currentStep + 1) / totalSteps) * 100;
    const isFirstStep = this.currentStep === 0;
    
    this.modal.innerHTML = `
      <div class="spotify-quiz-nav">
        <button class="spotify-quiz-back" type="button" ${isFirstStep ? "disabled" : ""} aria-label="Voltar">
          <i data-lucide="arrow-left"></i> Voltar
        </button>
        <div class="spotify-progress-container">
          <div class="spotify-progress-bar" style="width: ${progress}%"></div>
        </div>
        <button class="spotify-quiz-skip" type="button">
          ${this.config.isOnboarding ? "Pular" : "Usar padrão"}
        </button>
      </div>
      <div class="spotify-quiz-body">
        <div class="spotify-step-content" key="step-${this.currentStep}">
          <h2 class="spotify-quiz-title">${step.title}</h2>
          ${step.subtitle ? `<p class="spotify-quiz-subtitle">${step.subtitle}</p>` : ""}
          
          ${step.searchable ? `
            <div class="spotify-search-wrapper">
              <i data-lucide="search"></i>
              <input type="text" class="spotify-search-input" placeholder="Buscar" value="${this.searchQuery}">
            </div>
          ` : ""}
          
          <div class="spotify-options-container" style="width: 100%;">
            ${this.renderOptions(step)}
          </div>
        </div>
      </div>
      <button class="spotify-action-btn" type="button" id="spotifyNextBtn">
        <span>${this.currentStep === totalSteps - 1 ? "Concluido" : "Avancar"}</span>
        <i data-lucide="arrow-right"></i>
      </button>
    `;
    
    lucide.createIcons({ attrs: { "stroke-width": 2.5 } });
    this.bindEvents();
    this.updateNextButtonState();
  }
  
  renderOptions(step) {
    const value = this.answers[step.name] || (step.type === "checkbox" ? [] : "");
    const q = this.searchQuery.toLowerCase().trim();
    
    let options = step.options || [];
    if (step.searchable && q) {
      options = options.filter(opt => opt.label.toLowerCase().includes(q));
    }
    
    if (options.length === 0 && step.searchable) {
      return `<p style="text-align: center; color: #b3b3b3; margin-top: 20px;">Nenhuma opcao encontrada para "${this.searchQuery}"</p>`;
    }
    
    if (step.type === "textarea") {
      return `
        <div class="spotify-textarea-wrapper" style="margin: 0 auto;">
          <textarea class="spotify-textarea" placeholder="${step.placeholder || ""}" name="${step.name}">${value}</textarea>
        </div>
      `;
    }
    
    const hasGradient = options.some(o => o.isGradient);
    const hasCircle = options.some(o => o.isCircle);
    
    if (hasCircle) {
      return `
        <div class="spotify-card-grid is-circle">
          ${options.map((opt, index) => {
            const isChecked = Array.isArray(value) ? value.includes(opt.id) : value === opt.id;
            return `
              <label class="spotify-option-card is-circle">
                <input type="${step.type}" name="${step.name}" value="${opt.id}" ${isChecked ? "checked" : ""}>
                <div class="circle-avatar">
                  ${opt.icon ? `<i data-lucide="${opt.icon}"></i>` : `<img src="assets/catalog-cover-0${(index % 8) + 1}.webp" alt="">`}
                  <div class="select-indicator">
                    <i data-lucide="check"></i>
                  </div>
                </div>
                <span>${opt.label}</span>
                ${opt.desc ? `<small>${opt.desc}</small>` : ""}
              </label>
            `;
          }).join("")}
        </div>
      `;
    }
    
    if (hasGradient) {
      return `
        <div class="spotify-card-grid is-gradient">
          ${options.map((opt, index) => {
            const isChecked = Array.isArray(value) ? value.includes(opt.id) : value === opt.id;
            const gradient = spotifyGradients[index % spotifyGradients.length];
            return `
              <label class="spotify-option-card is-gradient" style="background: ${gradient}">
                <input type="${step.type}" name="${step.name}" value="${opt.id}" ${isChecked ? "checked" : ""}>
                <span>${opt.label}</span>
                ${opt.desc ? `<small>${opt.desc}</small>` : ""}
                ${opt.icon ? `<i data-lucide="${opt.icon}"></i>` : `<i data-lucide="music"></i>`}
                <div class="select-badge">
                  <i data-lucide="check"></i>
                </div>
              </label>
            `;
          }).join("")}
        </div>
      `;
    }
    
    return `
      <div class="spotify-chip-flex">
        ${options.map((opt) => {
          const isChecked = Array.isArray(value) ? value.includes(opt.id) : value === opt.id;
          return `
            <label class="spotify-option-chip">
              <input type="${step.type}" name="${step.name}" value="${opt.id}" ${isChecked ? "checked" : ""}>
              <span>${opt.label}</span>
            </label>
          `;
        }).join("")}
      </div>
    `;
  }
  
  bindEvents() {
    const backBtn = this.modal.querySelector(".spotify-quiz-back");
    backBtn?.addEventListener("click", () => {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.searchQuery = "";
        this.render();
      }
    });
    
    const skipBtn = this.modal.querySelector(".spotify-quiz-skip");
    skipBtn?.addEventListener("click", () => {
      this.config.onSkip();
    });
    
    const nextBtn = this.modal.querySelector("#spotifyNextBtn");
    nextBtn?.addEventListener("click", () => {
      const step = this.config.steps[this.currentStep];
      
      if (step.type === "textarea") {
        const textarea = this.modal.querySelector(".spotify-textarea");
        this.answers[step.name] = textarea ? textarea.value.trim() : "";
      }
      
      const totalSteps = this.config.steps.length;
      if (this.currentStep < totalSteps - 1) {
        this.currentStep++;
        this.searchQuery = "";
        this.render();
      } else {
        this.config.onComplete(this.answers);
      }
    });
    
    const searchInput = this.modal.querySelector(".spotify-search-input");
    searchInput?.addEventListener("input", (e) => {
      this.searchQuery = e.target.value;
      const optionsContainer = this.modal.querySelector(".spotify-options-container");
      if (optionsContainer) {
        optionsContainer.innerHTML = this.renderOptions(this.config.steps[this.currentStep]);
        lucide.createIcons({ attrs: { "stroke-width": 2.5 } });
        this.bindInputs();
      }
    });
    
    this.bindInputs();
  }
  
  bindInputs() {
    const step = this.config.steps[this.currentStep];
    const inputs = this.modal.querySelectorAll(`input[name="${step.name}"]`);
    
    inputs.forEach(input => {
      input.addEventListener("change", () => {
        if (step.type === "checkbox") {
          const checked = Array.from(this.modal.querySelectorAll(`input[name="${step.name}"]:checked`)).map(i => i.value);
          this.answers[step.name] = checked;
        } else {
          this.answers[step.name] = input.value;
        }
        this.updateNextButtonState();
      });
    });
  }
  
  updateNextButtonState() {
    const nextBtn = this.modal.querySelector("#spotifyNextBtn");
    if (!nextBtn) return;
    
    const step = this.config.steps[this.currentStep];
    if (!step.required) {
      nextBtn.disabled = false;
      return;
    }
    
    const val = this.answers[step.name];
    if (step.type === "checkbox") {
      nextBtn.disabled = !val || val.length === 0;
    } else if (step.type === "textarea") {
      nextBtn.disabled = !val;
    } else {
      nextBtn.disabled = !val;
    }
  }
}

function showMusicPreferenceQuiz(force = false, profile = getMusicProfile()) {
  if (!force && hasMusicProfile()) return;
  if (window.activeSpotifyQuiz) {
    window.activeSpotifyQuiz.destroy();
    window.activeSpotifyQuiz = null;
  }
  
  const current = profile || getMusicProfile() || createDefaultMusicProfile();
  
  const config = {
    isOnboarding: false,
    initialData: {
      genres: current.genres || [],
      objective: current.objective || "Receber orientacao da IA",
      stage: current.stage || "So tenho uma ideia",
      vibes: current.vibes || [],
      references: current.references || "",
      budget: current.budget || "Quero so explorar agora",
      userType: current.userType || "Artista"
    },
    steps: [
      {
        id: "genres",
        title: "Qual estilo musical mais combina com voce?",
        subtitle: "Escolha seus generos favoritos para personalizarmos seu feed (selecione pelo menos um).",
        type: "checkbox",
        name: "genres",
        searchable: true,
        required: true,
        options: musicQuiz.genres.map(g => ({ id: g, label: g, isGradient: true }))
      },
      {
        id: "objective",
        title: "Qual e seu objetivo agora?",
        subtitle: "Selecione a meta principal do seu projeto no momento.",
        type: "radio",
        name: "objective",
        required: true,
        options: musicQuiz.objectives.map(o => ({ id: o, label: o }))
      },
      {
        id: "stage",
        title: "Em qual fase sua musica esta?",
        subtitle: "Selecione o estagio atual de desenvolvimento do seu projeto.",
        type: "radio",
        name: "stage",
        required: true,
        options: musicQuiz.stages.map(s => ({ id: s, label: s }))
      },
      {
        id: "vibes",
        title: "Qual vibe voce procura?",
        subtitle: "Escolha as vibes que melhor definem a atmosfera que voce quer criar.",
        type: "checkbox",
        name: "vibes",
        searchable: true,
        required: true,
        options: musicQuiz.vibes.map(v => ({ id: v, label: v }))
      },
      {
        id: "references",
        title: "Quais sao suas referencias?",
        subtitle: "Digite nomes de artistas, musicas, produtores ou albuns que te inspiram.",
        type: "textarea",
        name: "references",
        placeholder: "Ex: Ryu, Travis Scott, Veigh, funk 150, beat triste...",
        required: false
      },
      {
        id: "budget",
        title: "Qual e seu orcamento?",
        subtitle: "Selecione a faixa ideal para combinarmos profissionais ao seu orcamento.",
        type: "radio",
        name: "budget",
        required: true,
        options: musicQuiz.budgets.map(b => ({ id: b, label: b }))
      },
      {
        id: "userType",
        title: "Qual tipo de usuario voce e?",
        subtitle: "Como voce se classifica no mercado da musica?",
        type: "radio",
        name: "userType",
        required: true,
        options: musicQuiz.userTypes.map(u => ({ id: u, label: u }))
      }
    ],
    onSkip: () => {
      saveMusicProfile(createDefaultMusicProfile({ completed: true }));
      markFirstAccountQuizCompleted();
      closeMusicPreferenceQuiz();
      renderRoute();
      showToast("Perfil musical inicial criado pela NEXO", "sparkles");
    },
    onComplete: (data) => {
      const profile = saveMusicProfile({
        genres: data.genres.length ? data.genres : ["Trap"],
        objective: data.objective,
        stage: data.stage,
        vibes: data.vibes.length ? data.vibes : ["Pesada"],
        references: data.references,
        budget: data.budget,
        userType: data.userType,
        completed: true
      });
      markFirstAccountQuizCompleted();
      closeMusicPreferenceQuiz();
      renderRoute();
      showToast(`Perfil musical salvo: ${musicProfileSummary(profile)}`, "sparkles");
    }
  };
  
  window.activeSpotifyQuiz = new SpotifyQuizEngine(config);
}

function closeMusicPreferenceQuiz() {
  if (window.activeSpotifyQuiz) {
    window.activeSpotifyQuiz.destroy();
    window.activeSpotifyQuiz = null;
  }
}

function showOnboarding(force = false) {
  if (!hasAccountAccess()) return;
  if (!force && appState.onboardingProfile?.completed) {
    return;
  }
  
  if (window.activeSpotifyQuiz) {
    window.activeSpotifyQuiz.destroy();
    window.activeSpotifyQuiz = null;
  }
  
  const config = {
    isOnboarding: true,
    initialData: {
      "account-role": "artista",
      "styles": ["trap"],
      "goal": "descobrir"
    },
    steps: [
      {
        id: "role",
        title: "Como voce quer usar a ANSEND?",
        subtitle: "Escolha sua funcao principal para adaptarmos as suas recomendacoes e atalhos.",
        type: "radio",
        name: "account-role",
        required: true,
        options: roleChoices.map(r => ({ id: r.id, label: r.shortLabel, desc: r.desc, icon: r.icon, isCircle: true }))
      },
      {
        id: "styles",
        title: "Quais estilos voce curte?",
        subtitle: "Selecione os estilos musicais de sua preferencia (selecione pelo menos um).",
        type: "checkbox",
        name: "styles",
        searchable: true,
        required: true,
        options: onboardingStyles.map(s => ({ id: s.id, label: s.label, desc: s.desc, icon: s.icon, isGradient: true }))
      },
      {
        id: "goal",
        title: "Qual e seu objetivo agora?",
        subtitle: "Qual e seu foco principal ao acessar a plataforma no momento?",
        type: "radio",
        name: "goal",
        required: true,
        options: onboardingGoals.map(([value, label]) => ({ id: value, label: label }))
      }
    ],
    onSkip: () => {
      persistOnboarding({
        completed: true,
        account_role: "artista",
        userType: "artista",
        roleLabel: "Artista",
        styles: ["trap", "drill"],
        genres: ["Trap", "Drill", "Type Beat"],
        goal: "descobrir",
        goalLabel: "Descobrir produtores"
      });
      saveMusicProfile(createDefaultMusicProfile({ completed: true }));
      closeOnboarding();
      if (currentRoute() === "feed") {
        renderRoute();
      }
      showToast("Feed personalizado com uma curadoria inicial", "sparkles");
    },
    onComplete: (data) => {
      const selectedRole = data["account-role"];
      const styles = data["styles"];
      const selectedGoal = data["goal"];
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
    }
  };
  
  window.activeSpotifyQuiz = new SpotifyQuizEngine(config);
}

function closeOnboarding() {
  if (window.activeSpotifyQuiz) {
    window.activeSpotifyQuiz.destroy();
    window.activeSpotifyQuiz = null;
  }
}

function mapCatalogItemToBeat(item) {
  if (!item) return null;
  if (item.cover !== undefined) return item;
  return {
    id: item.id,
    title: item.title,
    producer: item.producer_name || item.artist_name || activeProfile()?.artistic_name || activeProfile()?.full_name || "ANSEND",
    cover: item.cover_url || img("photo-1493225457124-a3eb161ffa5f"),
    price: item.price ? `R$ ${item.price}` : null,
    badge: item.status === "draft" ? "Rascunho" : "Novo",
    tags: [item.genre || "ANSEND", item.bpm ? `${item.bpm} BPM` : "98 BPM"],
  };
}

function splitCartEntry(entry = "") {
  const [beatId, licenseId = "premium"] = String(entry || "").split("::");
  return { beatId, licenseId };
}

function cartEntryKey(id, licenseId = "premium") {
  return `${id}::${licenseId}`;
}

function findBeat(id) {
  const { beatId } = splitCartEntry(id);
  if (!beatId) return null;
  if (String(beatId) === String(topBeatOfDay.id)) return topBeatOfDay;
  return searchableBeatPool().find((item) => String(item.id) === String(beatId)) || null;
}

function pageIntro(route, actions = "") {
  const [fallbackTitle, fallbackSubtitle] = routeTitles[route];
  const routeKey = route === "detalhe" ? "detalhe" : route;
  const title = t(`route.${routeKey}.title`, fallbackTitle);
  const subtitle = t(`route.${routeKey}.subtitle`, fallbackSubtitle);
  const resolvedSubtitle = route === "feed" ? accountGreeting() : subtitle;
  return `<header class="view-header view-header-${route}"><div><span class="view-eyebrow">ANSEND</span><h1>${title}</h1><p>${resolvedSubtitle}</p></div>${actions}</header>`;
}

function emptyState(icon, title, text, route = "explorar") {
  const label = route === "perfil"
    ? "Cadastrar agora"
    : route === "vendedor"
      ? "Criar conta profissional"
      : "Explorar catálogo";
  return `<section class="empty-state"><i data-lucide="${icon}"></i><h2>${title}</h2><p>${text}</p><a href="#${route}" data-route="${route}">${label}</a></section>`;
}

function gridView(items) {
  return `<div class="view-grid">${items.map(beatCard).join("")}</div>`;
}

function renderExplore() {
  const query = appState.query.trim().toLowerCase();
  const catalog = marketplaceBeats();
  const availableGenres = [...new Set(catalog.map((item) => item.tags?.[0]).filter(Boolean))];
  appState.genre = resolveExploreGenre(availableGenres);
  const filtered = catalog.filter((item) => {
    const matchesQuery = !query || `${item.title} ${item.producer} ${item.tags.join(" ")}`.toLowerCase().includes(query);
    const matchesGenre = appState.genre === "Todos" || normalizeGenre(item.tags[0]) === normalizeGenre(appState.genre);
    return matchesQuery && matchesGenre;
  });
  const chips = ["Todos", ...availableGenres].map((genre) => `<button type="button" data-action="filter" data-genre="${genre}" data-genre-slug="${genreSlug(genre)}" class="${normalizeGenre(appState.genre) === normalizeGenre(genre) ? "is-active" : ""}">${genre}</button>`).join("");
  const catalogBeats = preferredBeats(6).map((item, i) => beatCard({ ...item, badge: i === 0 ? "Destaque" : "" })).join("");
  const catalogSection = `<section class="home-section trending-catalogs-section explore-catalogs" aria-label="Catalogos em alta">
    <div class="section-head clean-head">
      <div><h2><i data-lucide="flame"></i>${t("section.catalogs", "Catalogos em alta")}</h2><p>${t("section.catalogsSubtitle", "Beats, packs e referencias subindo agora na ANSEND.")}</p></div>
    </div>
    <div class="featured-catalog-row">${catalogBeats}</div>
  </section>`;
  const empty = catalog.length
    ? emptyState("search-x", `Nenhum item de ${appState.genre} encontrado`, "Tente outro genero ou publique um beat nesse estilo.", "explorar")
    : emptyState("upload-cloud", "Catalogo vazio", "Cadastre seu primeiro beat ou musica para aparecer no marketplace.", "perfil");
  appView.innerHTML = `${pageIntro("explorar")}${renderExploreGenreBanners()}${catalogSection}${chips ? `<div class="chip-row route-chips">${chips}</div>` : ""}${filtered.length ? gridView(filtered) : empty}`;
}
function renderFavorites() {
  const items = searchableBeatPool().filter((item) => appState.favorites.has(item.id));
  const favoritesGrid = `<section class="catalog-section favorites-section">${gridView(items)}</section>`;
  appView.innerHTML = `${pageIntro("favoritos")}${items.length ? favoritesGrid : emptyState("heart", "Sua lista está vazia", "Favorite beats no feed para encontrá-los aqui.")}`;
}

async function renderPurchases() {
  const pageHeader = pageIntro("compras");
  
  if (!supabaseClient || !appState.authUser) {
    appView.innerHTML = `${pageHeader}${emptyState("shopping-bag", "Faça login para ver seus pedidos", "Conecte sua conta para acessar seu histórico de compras e downloads de beats.", "vendedor")}`;
    return;
  }

  appView.innerHTML = `${pageHeader}<div style="display:flex; justify-content:center; align-items:center; min-height:200px;"><i data-lucide="loader-circle" class="animate-spin" style="width:32px; height:32px; color:#fff;"></i></div>`;
  lucide.createIcons();

  try {
    const orders = await loadUserOrders();
    const orderItemsList = [];
    orders.forEach(order => {
      if (order.order_items && Array.isArray(order.order_items)) {
        order.order_items.forEach(oi => {
          orderItemsList.push({
            orderId: order.id,
            buyerName: order.buyer_name,
            buyerEmail: order.buyer_email,
            createdAt: order.created_at,
            ...oi
          });
        });
      }
    });

    if (orderItemsList.length === 0) {
      appView.innerHTML = `${pageHeader}${emptyState("shopping-bag", "Nenhum pedido ainda", "Quando você comprar uma licença, os downloads e contratos aparecerão aqui.", "explorar")}`;
      return;
    }

    const orderMarkup = orderItemsList.map(oi => {
      const beat = findBeat(oi.beat_id);
      if (!beat) return "";
      
      const priceText = `R$ ${(oi.price_cents_snapshot / 100).toFixed(2)}`;
      const dateString = new Date(oi.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
      const producerName = String(beat.producer || "ANSEND").replace(/^prod\.\s*/i, "");
      
      const included = String(oi.files_included_snapshot || "").toUpperCase();
      const hasMp3 = included.includes("MP3");
      const hasWav = included.includes("WAV");
      const hasStems = included.includes("STEMS") || included.includes("ZIP");

      let downloadButtons = "";
      if (hasMp3) {
        downloadButtons += `<button type="button" class="an-secondary" data-action="download-secure-file" data-beat-id="${oi.beat_id}" data-file-type="mp3" style="display:inline-flex; align-items:center; gap:6px; height:34px; padding:0 12px; font-size:12px; cursor:pointer;"><i data-lucide="download" style="width:14px; height:14px;"></i> MP3</button>`;
      }
      if (hasWav) {
        downloadButtons += `<button type="button" class="an-secondary" data-action="download-secure-file" data-beat-id="${oi.beat_id}" data-file-type="wav" style="display:inline-flex; align-items:center; gap:6px; height:34px; padding:0 12px; font-size:12px; cursor:pointer;"><i data-lucide="download" style="width:14px; height:14px;"></i> WAV</button>`;
      }
      if (hasStems) {
        downloadButtons += `<button type="button" class="an-secondary" data-action="download-secure-file" data-beat-id="${oi.beat_id}" data-file-type="stems" style="display:inline-flex; align-items:center; gap:6px; height:34px; padding:0 12px; font-size:12px; cursor:pointer;"><i data-lucide="download" style="width:14px; height:14px;"></i> Stems (ZIP)</button>`;
      }

      const royaltyBuyer = oi.buyer_royalty_snapshot || 50;
      const royaltyProducer = oi.producer_royalty_snapshot || 50;
      const filesLabel = oi.files_included_snapshot || "MP3";
      
      return `
        <article class="purchase-item" style="display:flex; flex-direction:column; gap:12px; background:#0a0a0a; border:1px solid var(--beat-border); border-radius:8px; padding:16px; margin-bottom:12px;">
          <div style="display:flex; gap:16px; align-items:center;">
            <img src="${beat.cover}" style="width:60px; height:60px; border-radius:6px; object-fit:cover;">
            <div style="flex:1;">
              <h3 style="font-size:15px; color:#fff; font-weight:bold; margin:0 0 4px;">${htmlEscape(beat.title)}</h3>
              <div style="font-size:12px; color:var(--beat-muted); display:flex; flex-wrap:wrap; gap:8px 16px; margin-bottom:4px;">
                <span>Produtor: <strong>${htmlEscape(producerName)}</strong></span>
                <span>Licença: <strong>${htmlEscape(oi.license_name_snapshot)}</strong></span>
                <span>Preço: <strong>${priceText}</strong></span>
              </div>
              <small style="font-size:11px; color:var(--beat-dim);">Adquirido em ${dateString}</small>
            </div>
          </div>
          
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border-top:1px solid var(--beat-border-soft); padding-top:12px; margin-top:4px;">
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${downloadButtons}
            </div>
            
            <button type="button" class="an-primary" data-action="view-purchased-contract" 
                    data-beat-title="${htmlEscape(beat.title)}"
                    data-producer-name="${htmlEscape(producerName)}"
                    data-buyer-name="${htmlEscape(oi.buyerName)}"
                    data-license-name="${htmlEscape(oi.license_name_snapshot)}"
                    data-royalty-buyer="${royaltyBuyer}"
                    data-royalty-producer="${royaltyProducer}"
                    data-files-included="${htmlEscape(filesLabel)}"
                    data-date-string="${new Date(oi.created_at).toLocaleDateString('pt-BR')}"
                    style="display:inline-flex; align-items:center; gap:6px; height:34px; padding:0 14px; font-size:12px; background:#fff; border:0; color:#000; font-weight:bold; border-radius:6px; cursor:pointer;">
              <i data-lucide="scroll" style="width:14px; height:14px;"></i> Ver Contrato
            </button>
          </div>
        </article>
      `;
    }).join("");

    const clearMarkup = `<div class="purchase-actions" style="margin-bottom:16px; display:flex; justify-content:flex-end;">
      <button type="button" class="commerce-clear-btn" data-action="clear-purchases" style="display:flex; align-items:center; gap:6px; font-size:12px;"><i data-lucide="trash-2"></i>Remover todos os pedidos locais</button>
    </div>`;

    appView.innerHTML = `
      ${pageHeader}
      ${clearMarkup}
      <section class="purchase-list" style="margin-top:8px;">
        ${orderMarkup}
      </section>
    `;
    lucide.createIcons();
  } catch (error) {
    console.error("Error rendering purchases:", error);
    appView.innerHTML = `${pageHeader}<div class="empty-state"><p>Erro ao carregar seu histórico de compras.</p></div>`;
  }

}

function addToCart(id, licenseId = "premium") {
  const entry = cartEntryKey(id, licenseId);
  if (!appState.cart.includes(entry)) {
    appState.cart.push(entry);
    localStorage.setItem("ansend-cart", JSON.stringify(appState.cart));
    showToast("Adicionado ao carrinho", "shopping-cart");
  }
}

function removeFromCart(id) {
  appState.cart = appState.cart.filter(item => item !== id);
  localStorage.setItem("ansend-cart", JSON.stringify(appState.cart));
  showToast("Removido do carrinho", "trash");
  if (currentRoute() === "carrinho") renderCart();
}

function clearCart() {
  appState.cart = [];
  localStorage.setItem("ansend-cart", JSON.stringify([]));
}

function clearPurchases() {
  appState.purchases = [];
  appState.orders = [];
  appState.contracts = [];
  persistState();
  showToast("Pedidos removidos", "trash-2");
  if (currentRoute() === "compras") renderPurchases();
}

async function renderCart() {
  const hasItems = appState.cart.length > 0;
  
  if (!hasItems) {
    appView.innerHTML = `${pageIntro("carrinho")}${emptyState("shopping-cart", "Seu carrinho está vazio", "Adicione beats ou serviços ao carrinho para finalizar seu pedido.")}`;
    return;
  }

  appView.innerHTML = `${pageIntro("carrinho")}<div style="display:flex; justify-content:center; align-items:center; min-height:200px;"><i data-lucide="loader-circle" class="animate-spin" style="width:32px; height:32px; color:#fff;"></i></div>`;
  lucide.createIcons();


  try {
    const items = [];
    for (const entry of appState.cart) {
      const { beatId, licenseId } = splitCartEntry(entry);
      const beatItem = findBeat(beatId);
      if (!beatItem) continue;
      const licenses = await fetchBeatLicenses(beatId);
      const license = licenses.find(l => l.id === licenseId || l.license_key === licenseId) || 
                      generateDefaultLicensesForBeat(beatItem).find(l => l.id === licenseId || l.license_key === licenseId);
      if (license) {
        items.push({
          beat: beatItem,
          cartId: entry,
          licenseId: license.id,
          licenseLabel: license.name,
          priceValCents: license.price_cents,
          priceText: `R$ ${(license.price_cents / 100).toFixed(2)}`
        });
      }
    }

    if (!items.length) {
      appView.innerHTML = `${pageIntro("carrinho")}${emptyState("shopping-cart", "Seu carrinho está vazio", "Adicione beats ou serviços ao carrinho para finalizar seu pedido.")}`;
      return;
    }

    const subtotalCents = items.reduce((sum, item) => sum + item.priceValCents, 0);
    const serviceFeeCents = Math.round(subtotalCents * 0.12);
    const totalCents = subtotalCents + serviceFeeCents;
    const itemCountLabel = items.length === 1 ? t("cart.itemSingular") : t("cart.itemPlural");

    const itemMarkup = items.map(item => `
      <article class="cart-item" data-id="${item.beat.id}" data-cart-id="${item.cartId}">
        <img src="${item.beat.cover}" alt="Capa de ${item.beat.title}" class="cart-item-art">
        <div class="cart-item-details">
          <h3>${htmlEscape(item.beat.title)}</h3>
          <span>${htmlEscape(item.licenseLabel)} · <a href="#" class="view-contract-modal-trigger" data-beat-id="${item.beat.id}" data-license-id="${item.licenseId}" style="color:var(--beat-blue); text-decoration:underline;">Revisar licença</a></span>
          <small class="cart-item-producer">${t("cart.byProducer")} ${htmlEscape(item.beat.producer)}</small>
        </div>
        <div class="cart-item-price">${item.priceText}</div>
        <button class="cart-item-remove" type="button" aria-label="Remover" data-action="remove-from-cart" data-id="${item.cartId}">
          <i data-lucide="x"></i>
        </button>
      </article>
    `).join("");

    const promotedBeatsHtml = preferredBeats(6).map(item => `
      <div class="promoted-beat-card" data-beat-id="${htmlEscape(item.id)}">
        ${adminDeleteButton("beat", item, "admin-delete-beat-mini")}
        <img src="${item.cover}" alt="${item.title}">
        <div class="promoted-beat-info">
          <strong>${item.title}</strong>
          <span>${item.producer}</span>
        </div>
        <button type="button" data-action="buy" data-id="${item.id}">
          <i data-lucide="shopping-cart"></i>
          <span>${item.price || "$35.00"}</span>
        </button>
      </div>
    `).join("");

    const contentMarkup = `
      <section class="cart-page-layout">
        <div class="cart-left-col">
          <div class="cart-billing-header">
            <span>${t("cart.billing")}</span>
            <div class="cart-header-actions">
              <button type="button" class="cart-add-info-btn"><i data-lucide="plus"></i> ${t("cart.addInfo")}</button>
              <button type="button" class="commerce-clear-btn" data-action="clear-cart"><i data-lucide="trash-2"></i> Limpar carrinho</button>
            </div>
          </div>
          <div class="cart-items-list">
            ${itemMarkup}
          </div>
          <div class="cart-discount-banner">
            ${t("cart.discount")}
          </div>
        </div>
        
        <div class="cart-right-col">
          <div class="cart-summary-card">
            <div class="cart-summary-head">
              <h3>${t("cart.summary")}</h3>
              <button class="cart-share-btn" type="button"><i data-lucide="share-2"></i> ${t("cart.share")}</button>
            </div>
            <div class="cart-summary-row">
              <span>${t("cart.itemsTotal")}</span>
              <strong>R$ ${(subtotalCents / 100).toFixed(2)}</strong>
            </div>
            <div class="cart-summary-row">
              <span>${t("cart.serviceFee")}</span>
              <strong>R$ ${(serviceFeeCents / 100).toFixed(2)}</strong>
            </div>
            <div class="cart-summary-row cart-total-row">
              <span>${t("cart.subtotal")} (${items.length} ${itemCountLabel})</span>
              <strong>R$ ${(totalCents / 100).toFixed(2)}</strong>
            </div>
            <div class="cart-auth-hint">
              ${t("cart.authHint")} <a href="#vendedor">${t("cart.signIn")}</a> ${t("cart.or")} <a href="#vendedor">${t("cart.signUp")}</a>
            </div>
            <button class="cart-checkout-btn" type="button" data-action="finalize-cart">
              ${t("cart.checkout")}
            </button>
            <div class="cart-terms-hint">
              ${t("cart.terms")}
            </div>
          </div>
        </div>
      </section>
      
      <section class="cart-promoted-section">
        <h3>${t("cart.promoted")}</h3>
        <div class="cart-promoted-grid">
          ${promotedBeatsHtml}
        </div>
      </section>
    `;

    appView.innerHTML = `${pageIntro("carrinho")}${contentMarkup}`;
    lucide.createIcons();
  } catch (error) {
    console.error("Error rendering cart:", error);
    appView.innerHTML = `${pageIntro("carrinho")}<div class="empty-state"><p>Erro ao carregar itens do carrinho.</p></div>`;
  }
}

function renderLibraryLegacy() {
  renderLibrary();
}

function renderLibrary() {
  const recent = marketplaceBeats().slice(0, 8);
  const savedIds = JSON.parse(localStorage.getItem("ansend-saved-playlist") || "[]");
  const saved = dedupeById(savedIds.map(findBeat).filter(Boolean)).filter((item) => item.id !== topBeatOfDay.id);
  const savedSection = saved.length ? `<section class="catalog-section"><div class="section-head"><div><h2><i data-lucide="bookmark-plus"></i>Salvos no player</h2><p>Beats adicionados pelo menu do player</p></div></div>${gridView(saved)}</section>` : "";
  const recentSection = recent.length
    ? gridView(recent)
    : emptyState("library-big", "Biblioteca vazia", "Cadastre ou salve beats reais para montar sua biblioteca.", "perfil");
  appView.innerHTML = `${pageIntro("biblioteca")}${savedSection}<section class="catalog-section"><div class="section-head"><div><h2><i data-lucide="history"></i>Ouvidos recentemente</h2><p>Conteudo real publicado na plataforma</p></div></div>${recentSection}</section>`;
}
function renderInfoCards(items = []) {
  return items.length ? `<div class="legal-card-grid">${items.map(([title, text]) => `
    <article class="legal-info-card">
      <span><i data-lucide="badge-check"></i>${title}</span>
      <p>${text}</p>
    </article>
  `).join("")}</div>` : "";
}

function renderLegalSections(items = []) {
  return items.length ? `<div class="legal-section-list">${items.map(([title, text]) => `
    <article class="legal-section-card">
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join("")}</div>` : "";
}

function renderLegalBullets(items = []) {
  return items.length ? `<ul class="legal-bullet-grid">${items.map((item) => `<li><i data-lucide="check-circle-2"></i>${item}</li>`).join("")}</ul>` : "";
}

function renderLegalSteps(items = []) {
  return items.length ? `<div class="legal-step-list">${items.map(([number, title, text]) => `
    <article class="legal-step-card">
      <span>${number}</span>
      <div><h3>${title}</h3><p>${text}</p></div>
    </article>
  `).join("")}</div>` : "";
}

function renderInstitutionalPage(route) {
  const page = legalPages[route] || legalPages["central-ansend"];
  appView.innerHTML = `
    <section class="legal-page-shell">
      <header class="legal-page-hero">
        <span>${page.eyebrow || "ANSEND"}</span>
        <h1>${page.title}</h1>
        <p>${page.intro}</p>
      </header>
      ${renderInfoCards(page.cards)}
      ${renderLegalSteps(page.steps)}
      ${renderLegalSections(page.sections)}
      ${renderLegalBullets(page.bullets)}
      ${page.note ? `<aside class="legal-note"><i data-lucide="info"></i><p>${page.note}</p></aside>` : ""}
      <aside class="legal-note legal-warning"><i data-lucide="scale"></i><p>Os textos servem como base estratégica, estrutural e de produto. Antes da publicação oficial, documentos legais devem ser revisados por um profissional jurídico.</p></aside>
    </section>
  `;
  lucide.createIcons();
}

function renderAiWorkspace() {
  appView.innerHTML = renderNexoChat();
  requestAnimationFrame(() => {
    setupNexoChatInput();
    scrollNexoChatToBottom();
    applyLocaleTextOverrides(appView);
    lucide.createIcons();
  });
}


const nexoChatSuggestions = {
  "pt-BR": [
    "Quero lancar uma musica do zero",
    "Me ajude a montar um plano de lancamento",
    "Quero encontrar produtores, designers e curadores",
    "Analise minha ideia musical",
    "Monte um diagnostico para meu proximo single",
  ],
  "en-US": [
    "I want to release a song from scratch",
    "Help me build a release plan",
    "I want to find producers, designers, and curators",
    "Analyze my music idea",
    "Build a diagnostic for my next single",
  ],
};

function nexoChatMessages() {
  if (!Array.isArray(appState.nexoChatMessages)) appState.nexoChatMessages = [];
  return appState.nexoChatMessages;
}

function nexoChatId(prefix = "msg") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nexoIconMarkup(className = "nexo-orbit-icon") {
  return `<span class="${className}" aria-hidden="true">
    <img src="assets/nexo-ia-logo.svg" alt="" decoding="async" loading="lazy">
  </span>`;
}

function nexoFormatMessage(content = "") {
  return htmlEscape(content)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>");
}

function renderNexoChatMessage(message) {
  const isUser = message.role === "user";
  return `<article class="nexo-chat-message ${isUser ? "is-user" : "is-assistant"}" data-message-id="${htmlEscape(message.id || "")}">
    <div class="nexo-chat-avatar">${isUser ? `<i data-lucide="circle-user-round"></i>` : `<span>N</span>`}</div>
    <div class="nexo-chat-bubble">
      <p>${nexoFormatMessage(message.content || "")}</p>
    </div>
  </article>`;
}

function renderNexoChatWelcome() {
  const isEnglish = appLocale.current === "en-US";
  const suggestions = nexoChatSuggestions[appLocale.current] || nexoChatSuggestions["pt-BR"];
  return `<section class="nexo-chat-welcome" aria-label="Introducao da NEXO IA">
    <span>NEXO IA</span>
    <h1>${isEnglish ? "Talk to ANSEND's music intelligence" : "Converse com a inteligencia musical da ANSEND"}</h1>
    <p>${isEnglish ? "Turn an idea into a real release plan with guidance for beat, cover, mix/master, marketing, curation, and next steps." : "Transforme uma ideia em um plano real de lancamento, com orientacao sobre beat, capa, mix/master, marketing, curadoria e proximos passos."}</p>
    <div class="nexo-chat-suggestions">
      ${suggestions.map((prompt) => `<button type="button" data-action="nexo-chat-suggestion" data-prompt="${htmlEscape(prompt)}"><i data-lucide="sparkles"></i>${htmlEscape(prompt)}</button>`).join("")}
    </div>
  </section>`;
}

function renderNexoChat() {
  const messages = nexoChatMessages();
  const isLoading = Boolean(appState.nexoChatLoading);
  return `<section class="nexo-chat-page" aria-label="NEXO IA">
    <main class="nexo-chat-shell">
      <div class="nexo-chat-thread" id="nexoChatThread">
        ${messages.length ? messages.map(renderNexoChatMessage).join("") : renderNexoChatWelcome()}
        ${isLoading ? `<article class="nexo-chat-message is-assistant is-typing">
          <div class="nexo-chat-avatar"><span>N</span></div>
          <div class="nexo-chat-bubble"><p>${appLocale.current === "en-US" ? "NEXO AI is thinking" : "NEXO IA esta pensando"}<span class="nexo-typing-dots"><b></b><b></b><b></b></span></p></div>
        </article>` : ""}
      </div>
      ${appState.nexoChatError ? `<p class="nexo-chat-error"><i data-lucide="circle-alert"></i>${htmlEscape(appState.nexoChatError)}</p>` : ""}
      <form class="nexo-chat-form" autocomplete="off">
        <div class="nexo-chat-input-wrap">
          <textarea id="nexoChatInput" name="message" rows="1" ${isLoading ? "disabled" : ""} placeholder="${appLocale.current === "en-US" ? "Share your idea, your current stage, or what you want to release..." : "Conte sua ideia, seu momento ou o que voce quer lancar..."}"></textarea>
          <button type="submit" ${isLoading ? "disabled" : ""} aria-label="${appLocale.current === "en-US" ? "Send message to NEXO AI" : "Enviar mensagem para NEXO IA"}"><i data-lucide="${isLoading ? "loader-2" : "send"}"></i></button>
        </div>
      </form>
    </main>
  </section>`;
}

function setupNexoChatInput() {
  const input = document.querySelector("#nexoChatInput");
  if (!input) return;
  const resize = () => {
    input.style.height = "48px";
    input.style.height = `${Math.min(180, Math.max(48, input.scrollHeight))}px`;
  };
  resize();
  input.addEventListener("input", resize);
  input.focus({ preventScroll: true });
}

function scrollNexoChatToBottom() {
  const thread = document.querySelector("#nexoChatThread");
  if (!thread) return;
  if (thread.querySelector(".nexo-chat-welcome")) {
    thread.scrollTop = 0;
    return;
  }
  thread.scrollTop = thread.scrollHeight;
}

function nexoAssistantCanRender(route = currentRoute()) {
  if (!hasAccountAccess()) return false;
  if (["vendedor", "confirmar-email", "email-confirmed", "admin"].includes(route)) return false;
  return true;
}

function readNexoAssistantPrefs() {
  try {
    return JSON.parse(localStorage.getItem("ansend-nexo-assistant") || "{}") || {};
  } catch {
    return {};
  }
}

function writeNexoAssistantPrefs() {
  localStorage.setItem("ansend-nexo-assistant", JSON.stringify({
    open: Boolean(appState.nexoAssistant.open),
    expanded: Boolean(appState.nexoAssistant.expanded),
    minimized: Boolean(appState.nexoAssistant.minimized),
  }));
}

function nexoContextPayload() {
  const profile = activeProfile();
  const display = profileDisplayData(profile);
  const route = currentRoute();
  const rawHash = String(location.hash || "").replace(/^#/, "");
  const entityMatch = rawHash.match(/^(beat|perfil|comunidade)-(.+)$/);
  return {
    route,
    pathname: `/${route}`,
    entityType: entityMatch?.[1] || null,
    entityId: entityMatch?.[2] ? safeDecode(entityMatch[2]) : null,
    userId: appState.authUser?.id || "",
    profile: profile ? {
      name: display.name,
      username: display.username,
      role: display.role,
      bio: display.bio,
      styles: display.styles,
    } : null,
    catalogCount: visibleCatalogItems().length,
    publicCatalogCount: publishedCatalogItems().filter((item) => item.user_id === appState.authUser?.id).length,
  };
}

function nexoActionRouteHash(action = {}) {
  const map = {
    home: "feed",
    community: "comunidade",
    marketplace: "marketplace",
    professionals: "produtores",
    services: "servicos",
    chat: "bate-papo",
    launchMusic: "cadastrar",
    myProfile: "perfil",
    orders: "compras",
    library: "biblioteca",
    nexoAi: "ia",
    support: "suporte",
    settings: "configuracoes",
  };
  return action.hash || map[action.routeKey] || "";
}

function executeNexoAssistantActions(actions = []) {
  const action = actions.find((item) => item?.type === "navigate");
  if (!action) return;
  const nextHash = nexoActionRouteHash(action);
  if (!nextHash || nextHash === "admin") return;
  const queryText = action.query?.q || action.params?.q || "";
  if (queryText) {
    sessionStorage.setItem("ansend-nexo-route-query", JSON.stringify({
      route: nextHash,
      q: String(queryText).slice(0, 120),
      createdAt: Date.now(),
    }));
  }
  if (location.hash.replace(/^#/, "") !== nextHash) location.hash = nextHash;
  window.setTimeout(applyNexoPendingRouteQuery, 450);
  showToast(`NEXO abriu ${nextHash === "produtores" ? "Profissionais" : nextHash === "cadastrar" ? "Lancar musica" : nextHash}.`, "sparkles");
}

function applyNexoPendingRouteQuery() {
  let payload = null;
  try {
    payload = JSON.parse(sessionStorage.getItem("ansend-nexo-route-query") || "null");
  } catch {
    payload = null;
  }
  if (!payload?.q || Date.now() - Number(payload.createdAt || 0) > 15000) return;
  const route = currentRoute();
  if (payload.route && payload.route !== route) return;
  const input = [...document.querySelectorAll("input[type='search'], input[placeholder*='Buscar'], input[placeholder*='buscar']")]
    .find((candidate) => candidate.offsetParent !== null && !candidate.disabled);
  if (!input) return;
  input.value = payload.q;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus({ preventScroll: true });
  sessionStorage.removeItem("ansend-nexo-route-query");
}

function syncNexoAssistantPrefsFromStorage() {
  if (appState.nexoAssistant.initialized) return;
  const prefs = readNexoAssistantPrefs();
  appState.nexoAssistant.open = Boolean(prefs.open);
  appState.nexoAssistant.expanded = Boolean(prefs.expanded);
  appState.nexoAssistant.minimized = Boolean(prefs.minimized);
  appState.nexoAssistant.initialized = true;
}

async function loadNexoConversationHistory() {
  if (!supabaseClient || !appState.authUser?.id || appState.nexoChatHistoryLoading) return;
  appState.nexoChatHistoryLoading = true;
  renderNexoFloatingAssistant();
  try {
    const { data: conversations, error } = await withTimeout(
      supabaseClient
        .from("nexo_conversations")
        .select("*")
        .eq("user_id", appState.authUser.id)
        .order("updated_at", { ascending: false })
        .limit(1),
      3500,
      "Historico da NEXO demorou para responder."
    );
    if (error) throw error;
    const conversation = conversations?.[0] || null;
    if (!conversation) {
      appState.nexoChatConversationId = "";
      appState.nexoChatMessages = [];
      return;
    }
    appState.nexoChatConversationId = conversation.id;
    const { data: messages, error: messageError } = await withTimeout(
      supabaseClient
        .from("nexo_messages")
        .select("id,role,content,created_at")
        .eq("conversation_id", conversation.id)
        .order("created_at", { ascending: true })
        .limit(80),
      3500,
      "Mensagens da NEXO demoraram para responder."
    );
    if (messageError) throw messageError;
    appState.nexoChatMessages = (messages || []).map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.created_at,
    }));
  } catch (error) {
    console.warn("[ANSEND NEXO] history load failed", error?.message || error);
    appState.nexoChatError = "";
    appState.nexoChatMessages = appState.nexoChatMessages || [];
  } finally {
    appState.nexoChatHistoryLoading = false;
    renderNexoFloatingAssistant();
    scrollNexoAssistantToBottom();
  }
}

async function ensureNexoConversation(firstMessage = "") {
  if (!supabaseClient || !appState.authUser?.id) return "";
  if (appState.nexoChatConversationId) return appState.nexoChatConversationId;
  const title = String(firstMessage || "Conversa com NEXO IA").replace(/\s+/g, " ").trim().slice(0, 80);
  const { data, error } = await supabaseClient
    .from("nexo_conversations")
    .insert({ user_id: appState.authUser.id, title })
    .select("id")
    .single();
  if (error) throw error;
  appState.nexoChatConversationId = data.id;
  return data.id;
}

async function saveNexoMessage(role, content, conversationId = appState.nexoChatConversationId) {
  if (!supabaseClient || !appState.authUser?.id || !conversationId || !content) return null;
  const { data, error } = await supabaseClient
    .from("nexo_messages")
    .insert({ conversation_id: conversationId, user_id: appState.authUser.id, role, content: String(content).slice(0, 12000) })
    .select("id,created_at")
    .single();
  if (error) throw error;
  return data;
}

function renderNexoAssistantWelcome() {
  const suggestions = [
    "Encontrar um beatmaker",
    "Melhorar meu lancamento",
    "Analisar meu perfil",
    "Criar estrategia de divulgacao",
    "Recomendar profissionais",
    "Tirar duvida sobre a ANSEND",
  ];
  return `<section class="nexo-assistant-welcome">
    <h2>Como posso ajudar voce hoje?</h2>
    <p>Pergunte sobre beats, carreira, lancamentos, profissionais, contratos, divulgacao ou qualquer recurso da ANSEND.</p>
    <div class="nexo-assistant-chips">
      ${suggestions.map((prompt) => `<button type="button" data-action="nexo-assistant-suggestion" data-prompt="${htmlEscape(prompt)}">${htmlEscape(prompt)}</button>`).join("")}
    </div>
  </section>`;
}

function renderNexoAssistantMessage(message) {
  const isUser = message.role === "user";
  return `<article class="nexo-assistant-message ${isUser ? "is-user" : "is-assistant"}">
    ${isUser ? "" : nexoIconMarkup("nexo-assistant-message-icon")}
    <div class="nexo-assistant-bubble"><p>${nexoFormatMessage(message.content || "")}</p></div>
  </article>`;
}

function renderNexoAssistantPanel() {
  const messages = nexoChatMessages();
  const isLoading = Boolean(appState.nexoChatLoading);
  return `<section class="nexo-assistant-panel ${appState.nexoAssistant.expanded ? "is-expanded" : ""}" role="dialog" aria-label="NEXO IA">
    <header class="nexo-assistant-header">
      <div class="nexo-assistant-title">
        ${nexoIconMarkup("nexo-assistant-logo")}
        <span><strong>NEXO IA</strong><small>Assistente inteligente da ANSEND</small></span>
        <em>Online</em>
      </div>
      <div class="nexo-assistant-header-actions">
        <button type="button" data-action="nexo-assistant-minimize" aria-label="Minimizar"><i data-lucide="minus"></i></button>
        <button type="button" data-action="nexo-assistant-expand" aria-label="Expandir"><i data-lucide="${appState.nexoAssistant.expanded ? "minimize-2" : "maximize-2"}"></i></button>
        <button type="button" data-action="nexo-assistant-close" aria-label="Fechar"><i data-lucide="x"></i></button>
      </div>
    </header>
    <div class="nexo-assistant-messages" id="nexoAssistantThread">
      ${appState.nexoChatHistoryLoading ? `<div class="nexo-assistant-skeleton"><span></span><span></span><span></span></div>` : ""}
      ${!appState.nexoChatHistoryLoading && messages.length ? messages.map(renderNexoAssistantMessage).join("") : ""}
      ${!appState.nexoChatHistoryLoading && !messages.length ? renderNexoAssistantWelcome() : ""}
      ${isLoading ? `<article class="nexo-assistant-message is-assistant is-typing">
        ${nexoIconMarkup("nexo-assistant-message-icon")}
        <div class="nexo-assistant-bubble"><p>NEXO esta pensando<span class="nexo-typing-dots"><b></b><b></b><b></b></span></p></div>
      </article>` : ""}
    </div>
    ${appState.nexoChatError ? `<p class="nexo-assistant-error"><i data-lucide="circle-alert"></i>${htmlEscape(appState.nexoChatError)}</p>` : ""}
    <form class="nexo-assistant-form" autocomplete="off">
      <div class="nexo-assistant-input">
        <textarea name="message" rows="1" maxlength="4000" ${isLoading ? "disabled" : ""} placeholder="Pergunte ao NEXO"></textarea>
        <button type="${isLoading ? "button" : "submit"}" ${isLoading ? `data-action="nexo-assistant-cancel"` : ""} aria-label="${isLoading ? "Cancelar resposta da NEXO" : "Enviar para NEXO"}"><i data-lucide="${isLoading ? "square" : "arrow-up"}"></i></button>
      </div>
    </form>
  </section>`;
}

function renderNexoFloatingAssistant() {
  syncNexoAssistantPrefsFromStorage();
  const existing = document.querySelector("#nexoFloatingAssistantRoot");
  if (!nexoAssistantCanRender()) {
    existing?.remove();
    return;
  }
  const panelOpen = appState.nexoAssistant.open && !appState.nexoAssistant.minimized;
  if (panelOpen && !appState.nexoChatHistoryLoading && !appState.nexoChatMessages.length && !appState.nexoChatConversationId) {
    window.setTimeout(() => loadNexoConversationHistory(), 0);
  }
  const markup = `<div id="nexoFloatingAssistantRoot" class="nexo-floating-assistant nexo-button ${panelOpen ? "is-open" : ""} ${appState.nexoAssistant.expanded ? "is-expanded" : ""}">
    ${panelOpen ? renderNexoAssistantPanel() : ""}
    <button type="button" class="nexo-floating-button" data-action="nexo-assistant-toggle" aria-label="Abrir NEXO IA">
      ${nexoIconMarkup("nexo-floating-icon")}
      ${appState.nexoAssistant.unread ? `<span class="nexo-floating-badge" aria-hidden="true"></span>` : ""}
      <span class="nexo-floating-tooltip">Abrir NEXO IA</span>
    </button>
  </div>`;
  if (existing) existing.outerHTML = markup;
  else document.body.insertAdjacentHTML("beforeend", markup);
  lucide.createIcons();
}

function scrollNexoAssistantToBottom(force = true) {
  const thread = document.querySelector("#nexoAssistantThread");
  if (!thread) return;
  const nearBottom = thread.scrollHeight - thread.scrollTop - thread.clientHeight < 96;
  if (force || nearBottom) thread.scrollTop = thread.scrollHeight;
}

function updateNexoSurfaces({ forceScroll = true } = {}) {
  if (currentRoute() === "ia") {
    renderAiWorkspace();
  }
  renderNexoFloatingAssistant();
  requestAnimationFrame(() => {
    scrollNexoChatToBottom();
    scrollNexoAssistantToBottom(forceScroll);
  });
}

async function callNexoChatApi(messages, { signal } = {}) {
  const headers = await recommendationAuthHeaders();
  const response = await fetch("/api/nexo/chat", {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
      conversationId: appState.nexoChatConversationId || null,
      context: nexoContextPayload(),
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data?.success) {
    throw new Error(data?.error || "Nao consegui responder agora. Verifique a conexao da NEXO IA ou tente novamente em alguns instantes.");
  }
  return { message: data.message, actions: Array.isArray(data.actions) ? data.actions : [], meta: data.meta || null };
}

async function extractNexoIntent(message) {
  if (!appState.authUser || !message) return null;
  try {
    const headers = await recommendationAuthHeaders();
    const response = await fetch("/api/recommendations/nexo-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
      body: JSON.stringify({ message }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.success || !data.intent) return null;
    const intent = data.intent;
    trackUserEvent("nexo_intent", "user_interest", appState.authUser.id, { source: "nexo-chat", intent });
    scheduleRecommendationProfileUpdate({
      summary: JSON.stringify(intent),
      genres: intent.genre || [],
      rolesInterested: [intent.needed_role].filter(Boolean),
      budgetMax: intent.budget_max || null,
      intentTags: [...asArray(intent.intent_tags), intent.intent, intent.urgency].filter(Boolean),
    });
    return intent;
  } catch (error) {
    console.warn("[ANSEND recommendations] NEXO intent skipped", error?.message || error);
    return null;
  }
}

async function sendNexoChatMessage(rawMessage) {
  const content = String(rawMessage || "").trim();
  if (!content || appState.nexoChatLoading) return;
  if (!appState.authUser?.id) {
    showToast("Entre para conversar com a NEXO IA.", "log-in");
    location.hash = "vendedor";
    return;
  }
  const messages = nexoChatMessages();
  const userMessage = { id: nexoChatId("user"), role: "user", content, createdAt: new Date().toISOString() };
  messages.push(userMessage);
  appState.nexoChatLoading = true;
  appState.nexoChatError = "";
  appState.nexoAssistant.unread = false;
  appState.nexoAssistant.abortController?.abort?.();
  appState.nexoAssistant.abortController = new AbortController();
  updateNexoSurfaces();

  try {
    const conversationId = await ensureNexoConversation(content);
    saveNexoMessage("user", content, conversationId).catch((error) => console.warn("[ANSEND NEXO] user message persist failed", error?.message || error));
    extractNexoIntent(content);
    const answer = await callNexoChatApi(messages, { signal: appState.nexoAssistant.abortController.signal });
    const assistantMessage = {
      id: nexoChatId("assistant"),
      role: "assistant",
      content: answer?.message?.content || "Nao consegui responder agora. Tente novamente em alguns instantes.",
      createdAt: answer?.message?.createdAt || new Date().toISOString(),
    };
    messages.push(assistantMessage);
    saveNexoMessage("assistant", assistantMessage.content, conversationId).catch((error) => console.warn("[ANSEND NEXO] assistant message persist failed", error?.message || error));
    executeNexoAssistantActions(answer?.actions || []);
  } catch (error) {
    if (error?.name !== "AbortError") {
      appState.nexoChatError = error?.message || "Nao consegui responder agora. Tente novamente em alguns segundos.";
    }
  } finally {
    appState.nexoChatLoading = false;
    appState.nexoAssistant.abortController = null;
    updateNexoSurfaces();
  }
}

function professionalStats(profile) {
  const ownerItems = appState.publicCatalogItems.filter((item) => profile.id && item.user_id === profile.id);
  const beatCount = ownerItems.filter((item) => item.source_table === "beats" || item.kind === "beat").length;
  const serviceCount = Number(profile.jobs || profile.services_count || profile.service_count || 0) || 0;
  const views = Number(profile.views || profile.view_count || profile.profile_views || 0) || 0;
  return { services: serviceCount, beats: beatCount, views };
}

function compactStat(value) {
  const number = Number(value || 0);
  if (number >= 1000000) return `${(number / 1000000).toFixed(number >= 10000000 ? 0 : 1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1)}K`;
  return String(number);
}

function compactNumber(value) {
  return compactStat(value);
}

function professionalCard(profile) {
  const bannerUrl = profile.cover_url || profile.banner;
  const bannerPosition = `${clampImagePosition(profile.banner_position_x)}% ${clampImagePosition(profile.banner_position_y)}%`;
  const bannerSize = `${Math.round(clampImageScale(profile.banner_scale) * 100)}%`;
  const bannerStyle = bannerUrl 
    ? `background-image: url('${htmlEscape(bannerUrl)}'); background-size: ${htmlEscape(bannerSize)}; background-position: ${htmlEscape(bannerPosition)};` 
    : `background: linear-gradient(135deg, #181818 0%, #292929 50%, #101010 100%);`;

  const initials = profileInitials(profile.name);
  const avatarHtml = profile.avatar_url 
    ? `<img class="professional-card-avatar-img" src="${htmlEscape(profile.avatar_url)}" alt="Avatar de ${htmlEscape(profile.name)}" style="object-position:${clampImagePosition(profile.avatar_position_x)}% ${clampImagePosition(profile.avatar_position_y)}%;--profile-avatar-scale:${clampImageScale(profile.avatar_scale)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
       <span class="professional-card-avatar-fallback" style="display: none;">${htmlEscape(initials)}</span>`
    : `<span class="professional-card-avatar-fallback">${htmlEscape(initials)}</span>`;

  // Favorite active state
  const isFavorited = appState.favorites.has(profile.id);
  const favoriteClass = isFavorited ? "is-favorite" : "";
  const isSelf = profile.id === appState.authUser?.id;
  const profileAttrs = profileTargetAttrs({ id: profile.id, username: profile.username, title: profile.name });
  const adminDeleteButton = appState.isAdmin
    ? `<button type="button" class="professional-card-admin-delete" data-card-action data-action="admin-delete-profile" data-user-id="${profile.id}" aria-label="${isSelf ? "Sua conta admin protegida" : `Remover perfil ${htmlEscape(profile.name)}`}" title="${isSelf ? "Sua conta admin protegida" : "Remover perfil"}" ${isSelf ? "disabled" : ""}>
        <i data-lucide="${isSelf ? "shield-check" : "x"}"></i>
      </button>`
    : "";

  return `<article class="professional-card spotlight-card" data-action="professional-card-open" data-category="${htmlEscape(profile.category)}" data-id="${htmlEscape(profile.id)}" ${profileAttrs} role="link" tabindex="0" aria-label="Abrir perfil de ${htmlEscape(profile.name)}">
    ${adminDeleteButton}

    <!-- Top Banner -->
    <div class="professional-card-banner" style="${bannerStyle}"></div>
    
    <!-- Contratar + Button on banner -->
    <button type="button" class="professional-card-hire-btn" data-card-action data-action="professional-contact" ${profileAttrs}>Contratar +</button>
    
    <!-- Avatar -->
    <div class="professional-card-avatar-container">
      ${avatarHtml}
    </div>
    
    <!-- Info -->
    <div class="professional-card-info">
      <h3 class="professional-card-name">${htmlEscape(profile.name)}</h3>
      <span class="professional-card-role">${htmlEscape(profile.role)}</span>
    </div>
    
    <!-- Tags -->
    <div class="professional-card-tags">
      ${profile.tags && profile.tags.length ? profile.tags.map((tag) => `<span>${htmlEscape(tag)}</span>`).join("") : `<span class="professional-card-tag-fallback">${htmlEscape(profile.role)}</span>`}
    </div>
    <!-- Statistics Block -->
    <div class="professional-card-stats">
      <div class="professional-card-stat-item">
        <strong class="professional-card-stat-num">${profile.services_count || 0}</strong>
        <span class="professional-card-stat-label">Serviços</span>
      </div>
      <div class="professional-card-stat-item">
        <strong class="professional-card-stat-num">${profile.beats_count || 0}</strong>
        <span class="professional-card-stat-label">Beats</span>
      </div>
      <div class="professional-card-stat-item">
        <strong class="professional-card-stat-num">${profile.views_count || 0}</strong>
        <span class="professional-card-stat-label">Views</span>
      </div>
    </div>
    
    <!-- Footer Actions -->
    <footer class="professional-card-footer">
      <button type="button" class="professional-card-footer-btn" data-card-action data-action="producer" ${profileAttrs} aria-label="Ver perfil">
        <i data-lucide="user-round"></i>
      </button>
      <button type="button" class="professional-card-footer-btn" data-card-action data-action="professional-contact" ${profileAttrs} aria-label="Contratar">
        <i data-lucide="handshake"></i>
      </button>
      <button type="button" class="professional-card-footer-btn ${favoriteClass}" data-card-action data-action="favorite" data-id="${htmlEscape(profile.id)}" aria-label="Favoritar">
        <i data-lucide="heart"></i>
      </button>
    </footer>
  </article>`;
}

function professionalCategorySummary(category) {
  const profiles = activeProfessionalProfiles();
  const count = category.id === "todos"
    ? profiles.length
    : profiles.filter((profile) => profile.category === category.id).length;
  const selected = category.id === appState.professionalCategory;
  return `<button class="professional-tab ${selected ? "is-active" : ""}" type="button" data-action="professional-filter" data-category="${category.id}" aria-pressed="${selected ? "true" : "false"}" aria-label="Filtrar por ${htmlEscape(category.label)} (${count})">
    <i data-lucide="${category.icon}"></i>
    <span>${category.label}</span>
    <small>${count}</small>
  </button>`;
}

function renderProducers() {
  appState.professionalCategory = appState.professionalCategory || "todos";
  const selectedCategory = appState.professionalCategory;
  const recommendedIds = new Set((appState.recommendations?.professionals || []).map((profile) => String(profile.id)));
  const profiles = [
    ...(appState.recommendations?.professionals || []),
    ...activeProfessionalProfiles().filter((profile) => !recommendedIds.has(String(profile.id))),
  ];
  const visibleProfiles = selectedCategory === "todos"
    ? profiles
    : profiles.filter((profile) => profile.category === selectedCategory);
  if (!visibleProfiles.length) {
    appView.innerHTML = `${pageIntro("produtores")}<section class="professionals-directory">
      <div class="professional-tabs" aria-label="Categorias de profissionais">
        ${professionalCategories.map(professionalCategorySummary).join("")}
      </div>
      ${emptyState("users-round", "Nenhum profissional cadastrado", "Crie uma conta profissional para aparecer no diretório real da ANSEND.", "vendedor")}
    </section>`;
    return;
  }
  appView.innerHTML = `
    ${pageIntro("produtores")}
    <section class="professionals-directory">
      <div class="professional-tabs" aria-label="Categorias de profissionais">
        ${professionalCategories.map(professionalCategorySummary).join("")}
      </div>
      <div class="professional-grid">
        ${visibleProfiles.map(professionalCard).join("")}
      </div>
    </section>`;
  recordVisibleRecommendationImpressions(visibleProfiles, "professional");
}

function renderPlaylistDetail() {
  const playlistId = location.hash.replace("#playlist-", "");
  const pack = findPlaylistPack(playlistId);
  const firstTrack = pack.tracks[0] || topBeatOfDay;
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

function beatDetailMiniCard(beat, context = "related") {
  const price = beat.price || "R$ 79";
  return `<article class="beat-mini-card" data-beat-id="${htmlEscape(beat.id)}">
    ${adminDeleteButton("beat", beat, "admin-delete-beat-mini")}
    <button class="beat-mini-cover" type="button" data-action="open-beat" data-id="${htmlEscape(beat.id)}" aria-label="Abrir ${htmlEscape(beat.title)}">
      <img src="${htmlEscape(beat.cover)}" alt="Capa de ${htmlEscape(beat.title)}">
      <span><i data-lucide="play"></i></span>
    </button>
    <button class="beat-mini-title" type="button" data-action="open-beat" data-id="${htmlEscape(beat.id)}">${htmlEscape(beat.title)}</button>
    <small>${htmlEscape(beat.producer || "ANSEND")}</small>
    <div>
      <strong>${htmlEscape(price)}</strong>
      <button type="button" data-action="buy" data-license="basic" data-id="${htmlEscape(beat.id)}" aria-label="Comprar ${htmlEscape(beat.title)}"><i data-lucide="shopping-bag"></i></button>
    </div>
  </article>`;
}

function licenseTermsMarkup(lic) {
  const terms = [];
  if (lic.included_mp3) terms.push("MP3 incluso");
  if (lic.included_wav) terms.push("WAV incluso");
  if (lic.included_stems) terms.push("Stems ZIP inclusos");
  if (lic.commercial_use) terms.push("Uso comercial permitido");
  if (lic.monetization_allowed) terms.push("Monetização permitida");
  if (lic.live_performance_allowed) terms.push("Apresentação ao vivo permitida");
  if (lic.content_id_allowed) {
    terms.push("Registro Content ID permitido");
  } else {
    terms.push("Registro Content ID não permitido");
  }
  if (lic.unlimited_streams) {
    terms.push("Streams ilimitados");
  } else if (lic.stream_limit) {
    terms.push(`Até ${lic.stream_limit.toLocaleString("pt-BR")} streams`);
  }
  if (lic.unlimited_music_videos) {
    terms.push("Videoclipes ilimitados");
  } else if (lic.music_video_limit) {
    terms.push(`Até ${lic.music_video_limit} videoclipe${lic.music_video_limit > 1 ? "s" : ""} oficial${lic.music_video_limit > 1 ? "is" : ""}`);
  }
  if (lic.credit_required) {
    terms.push(lic.credit_text || "Crédito obrigatório ao produtor");
  }
  if (lic.duration) terms.push(`Duração: ${lic.duration}`);
  if (lic.territory) terms.push(`Território: ${lic.territory}`);
  
  return terms.map((term) => `<span><i data-lucide="check-circle-2"></i>${htmlEscape(term)}</span>`).join("");
}

function renderBeatDetail() {
  const hashId = location.hash.replace("#beat-", "");
  const item = findBeat(hashId);
  if (!item) {
    appView.innerHTML = `${pageIntro("detalhe")}${emptyState("music-2", "Beat nao encontrado", "Este beat nao esta disponivel no catalogo.", "explorar")}`;
    return;
  }
  trackUserEvent("view", "beat", item?.raw?.id || item?.id || hashId, { source: "beat-detail" });
  const ownerProfile = profileForUserId(item.user_id || item.raw?.user_id);
  const ownerProfessional = ownerProfile ? profileToProfessional(ownerProfile) : null;
  const producerName = String(item.producer || "ANSEND").replace(/^prod\.\s*/i, "");
  
  const selectedLicense = "premium";
  const defaultLicenses = generateDefaultLicensesForBeat(item);
  const selectedPlan = defaultLicenses.find(l => l.license_key === "premium") || defaultLicenses[0];
  
  const catalog = marketplaceBeats();
  const sameProducer = catalog
    .filter((beatItem) => beatItem.id !== item.id && ((item.user_id && beatItem.user_id === item.user_id) || beatItem.producer === item.producer))
    .slice(0, 4);
  const related = catalog
    .filter((beatItem) => beatItem.id !== item.id && beatItem.tags?.some((tag) => item.tags?.includes(tag)))
    .concat(catalog.filter((beatItem) => beatItem.id !== item.id))
    .filter((beatItem, index, list) => list.findIndex((entry) => entry.id === beatItem.id) === index)
    .slice(0, 4);
  const favoriteClass = appState.favorites.has(item.id) ? " is-favorite" : "";
  const bpm = item.raw?.bpm || item.tags?.find((tag) => /bpm/i.test(tag))?.replace(/\s*bpm/i, "") || "130";
  const key = item.raw?.key || item.raw?.music_key || "C Minor";
  const genre = item.raw?.genre || item.tags?.[0] || "Beat";
  const published = item.raw?.published_at || item.raw?.created_at || item.createdAt || "";
  const publishedLabel = published ? new Date(published).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" }) : "Recente";
  const plays = Number(item.raw?.plays_count || item.raw?.views_count || 1200 + String(item.id).length * 17).toLocaleString("pt-BR");
  const likes = Number(item.raw?.likes_count || (appState.favorites.has(item.id) ? 1 : 0) || 11).toLocaleString("pt-BR");
  const tags = [...new Set([genre, ...(item.tags || [])])].filter(Boolean).slice(0, 5);
  const description = item.raw?.description || "Preview profissional pronto para licenciamento na ANSEND.";
  const youtubeBeat = isYoutubeBeat(item);
  const youtubeEmbed = youtubeBeat
    ? (item.youtube_embed_url || item.raw?.youtube_embed_url || youtubeMetadataFromUrl(item.youtube_url || item.raw?.youtube_url || item.youtube_video_id || item.raw?.youtube_video_id)?.youtube_embed_url || "")
    : "";
  const sidebarMedia = youtubeEmbed
    ? `<div class="beat-sidebar-youtube">
        <iframe src="${htmlEscape(youtubeEmbed)}" title="Player incorporado de ${htmlEscape(item.title)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>`
    : `<button class="beat-sidebar-cover" type="button" data-action="play" data-id="${htmlEscape(item.id)}" aria-label="Tocar preview de ${htmlEscape(item.title)}">
        <img src="${htmlEscape(item.cover)}" alt="Capa do beat ${htmlEscape(item.title)}">
        <span><i data-lucide="play"></i></span>
      </button>`;
      
  const licenseCards = defaultLicenses.map((plan) => `<button class="beat-license-card ${plan.id === selectedLicense ? "is-selected" : ""}" type="button" data-action="select-beat-license" data-license="${plan.id}" data-price="R$ ${(plan.price_cents/100).toFixed(2)}" aria-pressed="${plan.id === selectedLicense ? "true" : "false"}">
    <span>${htmlEscape(plan.name)}</span>
    <strong>R$ ${(plan.price_cents/100).toFixed(2)}</strong>
    <small>${htmlEscape(plan.description)}</small>
  </button>`).join("");

  const sameProducerMarkup = sameProducer.length
    ? sameProducer.map((beat) => beatDetailMiniCard(beat, "producer")).join("")
    : `<div class="beat-detail-empty">Nenhum outro beat publicado ainda.</div>`;
  const relatedMarkup = related.length
    ? related.map((beat) => beatDetailMiniCard(beat, "related")).join("")
    : `<div class="beat-detail-empty">Sem relacionados por enquanto.</div>`;

  const fallbackPriceText = `R$ ${(selectedPlan.price_cents / 100).toFixed(2)}`;

  appView.innerHTML = `
    <main class="beat-detail-page beat-market-detail" data-beat-id="${htmlEscape(item.id)}" data-selected-license="${selectedLicense}">
      <div class="beat-detail-shell">
        <aside class="beat-sidebar-card" aria-label="Preview do beat">
          ${adminDeleteButton("beat", item)}
          ${sidebarMedia}
          <h1>${htmlEscape(item.title)}</h1>
          <button class="beat-sidebar-producer" type="button" data-action="producer" ${profileTargetAttrs({ id: item.user_id || item.raw?.user_id || "", username: item.owner_username || item.raw?.profile_username || "", title: producerName })}>
            ${htmlEscape(producerName)}
          </button>
          <div class="beat-sidebar-actions" aria-label="Acoes do beat">
            <button class="${favoriteClass}" type="button" data-action="favorite" data-id="${htmlEscape(item.id)}" aria-label="Curtir"><i data-lucide="heart"></i></button>
            <button type="button" data-action="share-current" data-id="${htmlEscape(item.id)}" aria-label="Compartilhar"><i data-lucide="repeat-2"></i></button>
            <button type="button" data-action="add-playlist-current" data-id="${htmlEscape(item.id)}" aria-label="Salvar"><i data-lucide="bookmark"></i></button>
            <button type="button" data-action="download" data-id="${htmlEscape(item.id)}" aria-label="Baixar demo"><i data-lucide="download"></i></button>
          </div>
          <dl class="beat-sidebar-stats">
            <div><dt>Plays</dt><dd>${plays}</dd></div>
            <div><dt>Likes</dt><dd>${likes}</dd></div>
            <div><dt>BPM</dt><dd>${htmlEscape(String(bpm))}</dd></div>
            <div><dt>Key</dt><dd>${htmlEscape(key)}</dd></div>
            <div><dt>Genero</dt><dd>${htmlEscape(genre)}</dd></div>
            <div><dt>Publicado</dt><dd>${htmlEscape(publishedLabel)}</dd></div>
          </dl>
          <div class="beat-sidebar-tags">${tags.map((tag) => `<span>${htmlEscape(tag)}</span>`).join("")}</div>
          <button class="beat-report-link" type="button" data-action="report-current" data-id="${htmlEscape(item.id)}">Reportar track</button>
        </aside>

        <section class="beat-main-content">
          <section class="beat-licensing-panel" aria-label="Licenciamento">
            <header class="beat-panel-head">
              <div>
                <span>ANSEND LICENSE</span>
                <h2>Licenciamento</h2>
              </div>
              <div class="beat-license-total">
                <small>Total</small>
                <strong data-license-total>${fallbackPriceText}</strong>
              </div>
              <button class="beat-cart-cta" type="button" data-action="detail-add-cart" data-id="${htmlEscape(item.id)}" data-license="${selectedLicense}">Adicionar ao carrinho</button>
              <button class="beat-buy-cta" type="button" data-action="detail-buy-now" data-id="${htmlEscape(item.id)}" data-license="${selectedLicense}">Comprar agora</button>
            </header>
            <div class="beat-license-grid">${licenseCards}</div>
          </section>

          <section class="beat-terms-panel">
            <header><h3>Termos de uso</h3><button type="button" aria-label="Expandir termos"><i data-lucide="chevron-up"></i></button></header>
            <div class="beat-terms-list" data-license-terms>${licenseTermsMarkup(selectedPlan)}</div>
          </section>

          <section class="beat-rail-section">
            <header><h3>Mais de ${htmlEscape(producerName)}</h3><button type="button" data-route="explorar">Ver todos</button></header>
            <div class="beat-mini-grid">${sameProducerMarkup}</div>
          </section>

          <section class="beat-comments-panel">
            <h3>Comentarios</h3>
            <label class="beat-comment-field">
              <span class="sr-only">Adicionar comentario</span>
              <input type="text" placeholder="Adicionar comentario...">
              <button type="button" aria-label="Enviar comentario"><i data-lucide="arrow-up"></i></button>
            </label>
            <div class="beat-comment-empty">Seja o primeiro a comentar.</div>
          </section>

          <section class="beat-rail-section">
            <header><h3>Beats relacionados</h3><button type="button" data-route="explorar">Explorar</button></header>
            <div class="beat-mini-grid">${relatedMarkup}</div>
          </section>
        </section>
      </div>
      <section class="beat-about-strip">
        <strong>Sobre este beat</strong>
        <p>${htmlEscape(description)}</p>
        ${ownerProfessional ? `<button type="button" data-action="producer" ${profileTargetAttrs({ id: ownerProfile?.id, username: ownerProfile?.username, title: producerName })}>Ver perfil do produtor</button>` : ""}
      </section>
    </main>`;
    
  lucide.createIcons();
  
  const licPanel = appView.querySelector(".beat-licensing-panel");
  if (licPanel) {
    if (item.sold_exclusively || item.raw?.sold_exclusively) {
      updateBeatDetailLicensingPanel(licPanel, item, []);
    } else {
      fetchBeatLicenses(item.id).then((licenses) => {
        updateBeatDetailLicensingPanel(licPanel, item, licenses);
      });
    }
  }
}

function renderSettings() {
  const profile = activeProfile();
  const display = profileDisplayData(profile);
  const profileName = profile?.full_name || "Visitante ANSEND";
  const profileRole = profile?.account_role ? accountRoleLabel(profile.account_role) : "Conta não criada";
  const adminLink = appState.isAdmin
    ? `<label><span><strong>Painel admin</strong><small>Remover contas teste de profissionais com segurança.</small></span><button type="button" data-route="admin">Abrir admin</button></label>`
    : "";
  appView.innerHTML = `${pageIntro("configuracoes")}<section class="settings-panel">
    <div class="settings-profile">${profileAvatarMarkup(display, "settings-avatar")}<div><strong>${profileName}</strong><span>${profileRole}</span></div><button type="button" data-route="perfil">Conta</button></div>
    <label><span><strong>Reprodução automática</strong><small>Tocar a próxima faixa automaticamente.</small></span><input type="checkbox" checked></label>
    <label><span><strong>Notificações de lançamentos</strong><small>Receber novidades dos produtores seguidos.</small></span><input type="checkbox" checked></label>
    <label><span><strong>Qualidade de áudio</strong><small>Defina a qualidade padrão das prévias.</small></span><select><option>Alta qualidade</option><option>Economia de dados</option></select></label>
    <label><span><strong>Preferências musicais</strong><small>Refaça o quiz para atualizar playlists e beats recomendados.</small></span><button type="button" data-action="restart-onboarding">Refazer quiz</button></label>
    ${adminLink}
  </section>`;
}

async function renderAdmin() {
  if (!appState.isAdmin) {
    appView.innerHTML = `${pageIntro("admin")}<section class="admin-panel admin-denied">
      <i data-lucide="shield-alert"></i>
      <h2>Acesso admin necessário</h2>
      <p>Entre com uma conta marcada como administradora para remover perfis teste.</p>
      <button type="button" data-route="configuracoes">Voltar</button>
    </section>`;
    lucide.createIcons();
    return;
  }
  const profiles = await getAdminProfiles();
  const rows = profiles.map((profile) => {
    const isSelf = profile.id === appState.authUser?.id;
    const name = profile.display_name || profile.artistic_name || profile.full_name || "Perfil sem nome";
    const role = accountRoleLabel(profile.account_role || "artista");
    const createdAt = profile.created_at ? new Date(profile.created_at).toLocaleDateString("pt-BR") : "-";
    return `<article class="admin-profile-row">
      <div class="admin-profile-main">
        ${profileAvatarMarkup(profileDisplayData(profile), "admin-profile-avatar")}
        <span>
          <strong>${htmlEscape(name)}</strong>
          <small>${htmlEscape(profile.email || "sem email")} · ${htmlEscape(role)} · criado em ${createdAt}</small>
        </span>
      </div>
      <button type="button" data-action="admin-delete-profile" data-user-id="${profile.id}" ${isSelf ? "disabled" : ""}>
        <i data-lucide="${isSelf ? "shield-check" : "trash-2"}"></i>${isSelf ? "Sua conta admin" : "Remover"}
      </button>
    </article>`;
  }).join("");
  appView.innerHTML = `${pageIntro("admin")}<section class="admin-panel">
    <header class="admin-panel-head">
      <div>
        <span>ANSEND admin</span>
        <h2>Contas de profissionais</h2>
        <p>Remova contas teste com função segura no Supabase. A própria conta admin fica protegida.</p>
      </div>
      <button type="button" data-action="admin-refresh"><i data-lucide="refresh-cw"></i>Atualizar</button>
    </header>
    <div class="admin-profile-list">
      ${rows || `<section class="recommended-professionals-empty">Nenhum perfil encontrado.</section>`}
    </div>
  </section>`;
  lucide.createIcons();
}

function generateUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function releaseFormElement() {
  return document.querySelector(".release-upload-form, .youtube-release-form, .catalog-import-form");
}

function releaseCurrentStep(form = releaseFormElement()) {
  if (!form) return 0;
  const maxStep = form.querySelectorAll(".release-panel").length - 1;
  return Math.max(0, Math.min(maxStep >= 0 ? maxStep : 5, Number(form.dataset.releaseStep || 0)));
}

function releaseUploadFlag(type) {
  return `uploading${String(type || "").charAt(0).toUpperCase()}${String(type || "").slice(1)}`;
}

function isReleaseUploadInProgress(type, form = releaseFormElement()) {
  return form?.dataset?.[releaseUploadFlag(type)] === "true";
}

function setReleaseUploadInProgress(type, isUploading, form = releaseFormElement()) {
  if (!form) return;
  const flag = releaseUploadFlag(type);
  if (isUploading) form.dataset[flag] = "true";
  else delete form.dataset[flag];
}

function withTimeout(promise, ms, message) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timeoutId));
}

async function currentReleaseUploadUser() {
  const { user } = await ensureStorageAuthSession();
  return user;
}

const releaseUploadTokens = new Map();
const releaseLastFiles = new Map();
const RELEASE_COVER_MAX_DIMENSION = 3000;
const RELEASE_COVER_TARGET_BYTES = 3 * 1024 * 1024;
const RELEASE_COVER_HARD_LIMIT_BYTES = 40 * 1024 * 1024;

function sanitizeStorageSegment(value, fallback = "file") {
  return String(value || fallback)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || fallback;
}

function setReleaseProgress(dropzone, percent, label) {
  if (!dropzone) return;
  const progressContainer = dropzone.querySelector(".upload-progress-container");
  const progressBar = dropzone.querySelector(".upload-progress-bar");
  const progressPercent = dropzone.querySelector(".upload-progress-percent");
  const progressLabel = dropzone.querySelector(".upload-progress-header span:first-child");
  const nextPercent = Math.max(0, Math.min(100, Math.round(percent || 0)));
  if (progressContainer) progressContainer.style.display = "block";
  if (progressBar) progressBar.style.width = `${nextPercent}%`;
  if (progressPercent) progressPercent.textContent = `${nextPercent}%`;
  if (progressLabel && label) progressLabel.textContent = label;
}

function resetReleaseProgress(dropzone, hide = true) {
  if (!dropzone) return;
  const progressContainer = dropzone.querySelector(".upload-progress-container");
  const progressBar = dropzone.querySelector(".upload-progress-bar");
  const progressPercent = dropzone.querySelector(".upload-progress-percent");
  const progressLabel = dropzone.querySelector(".upload-progress-header span:first-child");
  if (progressBar) progressBar.style.width = "0%";
  if (progressPercent) progressPercent.textContent = "0%";
  if (progressLabel) progressLabel.textContent = "Enviando arquivo...";
  if (progressContainer && hide) progressContainer.style.display = "none";
}

function startReleaseProgressTicker(dropzone, start = 35, max = 92, label = "Enviando arquivo...") {
  let progress = start;
  setReleaseProgress(dropzone, progress, label);
  return window.setInterval(() => {
    progress = Math.min(max, progress + Math.max(1, Math.round((max - progress) * 0.12)));
    setReleaseProgress(dropzone, progress, label);
  }, 420);
}

function setReleaseUploadSuccess(dropzone, message = "") {
  if (!dropzone) return;
  dropzone.classList.toggle("has-upload-success", Boolean(message));
  dropzone.classList.remove("has-upload-error");
  const errorNode = dropzone.querySelector(".release-upload-error");
  if (errorNode) {
    errorNode.textContent = message;
    errorNode.hidden = !message;
  }
}

function setCoverPreview(file, form = releaseFormElement()) {
  if (!file || !form) return "";
  const previewUrl = URL.createObjectURL(file);
  const previousUrl = form.dataset.coverPreviewUrl;
  if (previousUrl?.startsWith("blob:")) URL.revokeObjectURL(previousUrl);
  form.dataset.coverPreviewUrl = previewUrl;
  const preview = form.querySelector(".release-cover-preview");
  if (preview) {
    preview.src = previewUrl;
    preview.classList.add("has-preview");
  }
  form.querySelector(".release-cover-drop")?.classList.add("has-local-preview");
  return previewUrl;
}

function setPersistentCoverPreview(url, form = releaseFormElement()) {
  if (!url || !form) return;
  const previousUrl = form.dataset.coverPreviewUrl;
  if (previousUrl?.startsWith("blob:")) URL.revokeObjectURL(previousUrl);
  delete form.dataset.coverPreviewUrl;
  const preview = form.querySelector(".release-cover-preview");
  if (preview) {
    preview.src = url;
    preview.classList.add("has-preview");
  }
  const dropzone = form.querySelector(".release-cover-drop");
  dropzone?.classList.add("has-file");
  dropzone?.classList.remove("has-local-preview");
  const coverActions = form.querySelector(".cover-actions-container");
  if (coverActions) coverActions.style.display = "block";
}

async function persistReleaseUploadDraft(patch = {}, form = releaseFormElement()) {
  if (!supabaseClient || !appState.authUser?.id || !form) return null;
  const payload = {
    user_id: appState.authUser.id,
    beat_id: form.dataset.beatId || generateUUID(),
    ...patch,
  };
  form.dataset.beatId = payload.beat_id;
  const { data, error } = await supabaseClient
    .from("release_upload_drafts")
    .upsert(payload, { onConflict: "user_id" })
    .select()
    .single();
  if (error) {
    console.warn("[ANSEND release] Nao foi possivel persistir rascunho de upload no Supabase.", error);
    return null;
  }
  return data;
}

function persistReleaseCoverDraft(url, path, form = releaseFormElement()) {
  if (!url || !path) return Promise.resolve(null);
  return persistReleaseUploadDraft({ cover_url: url, cover_path: path }, form);
}

async function clearReleaseCoverDraft() {
  if (!supabaseClient || !appState.authUser?.id) return;
  const { error } = await supabaseClient
    .from("release_upload_drafts")
    .update({ cover_url: null, cover_path: null })
    .eq("user_id", appState.authUser.id);
  if (error) console.warn("[ANSEND release] Nao foi possivel limpar capa do rascunho no Supabase.", error);
}

async function clearReleaseUploadDraft() {
  if (!supabaseClient || !appState.authUser?.id) return;
  const { error } = await supabaseClient
    .from("release_upload_drafts")
    .delete()
    .eq("user_id", appState.authUser.id);
  if (error) console.warn("[ANSEND release] Nao foi possivel limpar rascunho de upload no Supabase.", error);
}

async function restoreReleaseCoverDraft(form = releaseFormElement()) {
  if (!form || !supabaseClient || !appState.authUser?.id) return;
  const { data, error } = await supabaseClient
    .from("release_upload_drafts")
    .select("*")
    .eq("user_id", appState.authUser.id)
    .maybeSingle();
  if (error) {
    console.warn("[ANSEND release] Nao foi possivel restaurar rascunho de upload do Supabase.", error);
    return;
  }
  if (!data) return;
  if (data.beat_id) form.dataset.beatId = data.beat_id;
  if (data.cover_url && data.cover_path) {
    form.elements.cover_url.value = data.cover_url;
    form.elements.cover_path.value = data.cover_path;
    setPersistentCoverPreview(data.cover_url, form);
  }
  if (data.audio_url && data.audio_path) {
    setReleaseFileHiddenValues(form, "audio", {
      url: data.audio_url,
      path: data.audio_path,
      originalName: data.audio_original_name,
      mimeType: data.audio_mime_type,
      size: data.audio_size_bytes || data.file_size,
      durationSeconds: data.audio_duration_seconds || data.duration_seconds,
    });
    setReleaseFilePreview(form, "audio", {
      url: data.audio_url,
      originalName: data.audio_original_name || "Audio de preview",
      size: data.audio_size_bytes || data.file_size,
      durationSeconds: data.audio_duration_seconds || data.duration_seconds,
    });
  }
  if (data.mp3_url && data.mp3_path) {
    setReleaseFileHiddenValues(form, "secure_mp3", {
      url: data.mp3_url,
      path: data.mp3_path,
      originalName: data.mp3_original_name,
      mimeType: data.mp3_mime_type,
      size: data.mp3_size_bytes,
      durationSeconds: data.mp3_duration_seconds,
    });
    setReleaseFilePreview(form, "secure_mp3", {
      originalName: data.mp3_original_name || "MP3 de entrega",
      size: data.mp3_size_bytes,
      durationSeconds: data.mp3_duration_seconds,
    });
  }
  if (data.wav_url && data.wav_path) {
    setReleaseFileHiddenValues(form, "secure_wav", {
      url: data.wav_url,
      path: data.wav_path,
      originalName: data.wav_original_name,
      mimeType: data.wav_mime_type,
      size: data.wav_size_bytes,
      durationSeconds: data.wav_duration_seconds,
    });
    setReleaseFilePreview(form, "secure_wav", {
      originalName: data.wav_original_name || "WAV masterizado",
      size: data.wav_size_bytes,
      durationSeconds: data.wav_duration_seconds,
    });
  }
  if (data.stems_url && data.stems_path) {
    setReleaseFileHiddenValues(form, "secure_stems", {
      url: data.stems_url,
      path: data.stems_path,
      originalName: data.stems_original_name,
      mimeType: data.stems_mime_type,
      size: data.stems_size_bytes,
    });
    setReleaseFilePreview(form, "secure_stems", {
      originalName: data.stems_original_name || "ZIP de stems",
      size: data.stems_size_bytes,
    });
  }
  syncReleaseForm(form);
}

function setReleaseUploadError(dropzone, message = "", options = {}) {
  if (!dropzone) return;
  dropzone.classList.toggle("has-upload-error", Boolean(message));
  dropzone.classList.remove("has-upload-success");
  const errorNode = dropzone.querySelector(".release-upload-error");
  if (errorNode) {
    if (message && options.retryType) {
      errorNode.innerHTML = `${htmlEscape(message)} <button type="button" class="release-upload-retry" data-action="retry-upload" data-upload-type="${htmlEscape(options.retryType)}">Tentar novamente</button>`;
    } else {
      errorNode.textContent = message;
    }
    errorNode.hidden = !message;
  }
}

function releaseStorageErrorMessage(error, type) {
  const label = type === "cover" ? "capa" : type === "audio" ? "audio" : "arquivo";
  const normalized = normalizeStorageError(error, { label });
  return normalized.message;
}

function releaseUploadTimeoutMs(type) {
  if (type === "cover") return 180000;
  if (type === "audio") return 60000;
  if (["secure_mp3", "secure_wav", "secure_stems", "stems"].includes(type)) return 180000;
  return 90000;
}

const RELEASE_DELIVERY_FIELDS = {
  audio: {
    url: "audio_url",
    path: "audio_path",
    name: "audio_original_name",
    mime: "audio_mime_type",
    size: "audio_size_bytes",
    duration: "audio_duration_seconds",
    preview: ".release-audio-preview",
    drop: ".release-audio-drop",
    nameNode: "[data-audio-name]",
    sizeNode: "[data-audio-size]",
    player: ".release-audio-player",
    label: "Audio de preview",
    role: "preview",
  },
  secure_mp3: {
    url: "mp3_url",
    path: "mp3_path",
    name: "mp3_original_name",
    mime: "mp3_mime_type",
    size: "mp3_size_bytes",
    duration: "mp3_duration_seconds",
    preview: ".secure-mp3-preview",
    drop: ".release-secure-mp3-drop",
    nameNode: "[data-secure-mp3-name]",
    sizeNode: "[data-secure-mp3-size]",
    label: "MP3 de entrega",
    role: "master",
  },
  secure_wav: {
    url: "wav_url",
    path: "wav_path",
    name: "wav_original_name",
    mime: "wav_mime_type",
    size: "wav_size_bytes",
    duration: "wav_duration_seconds",
    preview: ".secure-wav-preview",
    drop: ".release-secure-wav-drop",
    nameNode: "[data-secure-wav-name]",
    sizeNode: "[data-secure-wav-size]",
    label: "WAV masterizado",
    role: "master",
  },
  secure_stems: {
    url: "stems_url",
    path: "stems_path",
    name: "stems_original_name",
    mime: "stems_mime_type",
    size: "stems_size_bytes",
    preview: ".secure-stems-preview",
    drop: ".release-secure-stems-drop",
    nameNode: "[data-secure-stems-name]",
    sizeNode: "[data-secure-stems-size]",
    label: "ZIP de stems",
    role: "stems",
  },
};

function releaseFileField(type) {
  return RELEASE_DELIVERY_FIELDS[type] || null;
}

function formatReleaseFileSize(bytes) {
  const size = Number(bytes || 0);
  if (!size) return "0 MB";
  if (size >= 1024 * 1024 * 1024) return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatReleaseDuration(seconds) {
  const duration = Number(seconds || 0);
  if (!Number.isFinite(duration) || duration <= 0) return "";
  const minutes = Math.floor(duration / 60);
  const secs = Math.round(duration % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

function readAudioFileDuration(file) {
  return new Promise((resolve) => {
    if (!file || !String(file.type || "").startsWith("audio/")) {
      resolve(null);
      return;
    }
    const url = URL.createObjectURL(file);
    const audio = document.createElement("audio");
    const cleanup = () => URL.revokeObjectURL(url);
    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      const duration = Number.isFinite(audio.duration) ? Math.round(audio.duration) : null;
      cleanup();
      resolve(duration);
    };
    audio.onerror = () => {
      cleanup();
      resolve(null);
    };
    audio.src = url;
  });
}

function releaseFileMetadataPatch(type, meta = {}) {
  const fields = releaseFileField(type);
  if (!fields) return {};
  const patch = {};
  if (fields.url) patch[fields.url] = meta.url || null;
  if (fields.path) patch[fields.path] = meta.path || null;
  if (fields.name) patch[fields.name] = meta.originalName || null;
  if (fields.mime) patch[fields.mime] = meta.mimeType || null;
  if (fields.size) patch[fields.size] = meta.size || null;
  if (fields.duration) patch[fields.duration] = meta.durationSeconds || null;
  return patch;
}

function setReleaseFileHiddenValues(form, type, meta = {}) {
  const fields = releaseFileField(type);
  if (!form || !fields) return;
  if (fields.url && form.elements[fields.url]) form.elements[fields.url].value = meta.url || "";
  if (fields.path && form.elements[fields.path]) form.elements[fields.path].value = meta.path || "";
  if (fields.name && form.elements[fields.name]) form.elements[fields.name].value = meta.originalName || "";
  if (fields.mime && form.elements[fields.mime]) form.elements[fields.mime].value = meta.mimeType || "";
  if (fields.size && form.elements[fields.size]) form.elements[fields.size].value = meta.size || "";
  if (fields.duration && form.elements[fields.duration]) form.elements[fields.duration].value = meta.durationSeconds || "";
}

function setReleaseFilePreview(form, type, meta = {}) {
  const fields = releaseFileField(type);
  if (!form || !fields) return;
  const preview = form.querySelector(fields.preview);
  const dropzone = form.querySelector(fields.drop);
  const nameNode = form.querySelector(fields.nameNode);
  const sizeNode = fields.sizeNode ? form.querySelector(fields.sizeNode) : null;
  const sizeText = formatReleaseFileSize(meta.size);
  const durationText = formatReleaseDuration(meta.durationSeconds);
  if (nameNode) nameNode.textContent = meta.originalName || "Arquivo enviado";
  if (sizeNode) sizeNode.textContent = durationText ? `${sizeText} - ${durationText}` : sizeText;
  if (fields.player) {
    const player = form.querySelector(fields.player);
    if (player && meta.url) {
      player.src = meta.url;
      player.hidden = false;
    }
  }
  if (preview) preview.style.display = type === "audio" ? "flex" : "block";
  dropzone?.classList.add("has-file");
}

function clearReleaseFileState(form, type) {
  const fields = releaseFileField(type);
  if (!form || !fields) return {};
  setReleaseFileHiddenValues(form, type, {});
  const preview = form.querySelector(fields.preview);
  const dropzone = form.querySelector(fields.drop);
  if (preview) preview.style.display = "none";
  if (fields.player) {
    const player = form.querySelector(fields.player);
    if (player) {
      player.pause?.();
      player.removeAttribute("src");
      player.load?.();
    }
  }
  dropzone?.classList.remove("has-file");
  return releaseFileMetadataPatch(type, {});
}

function releaseFileIsConfirmed(form, type) {
  const fields = releaseFileField(type);
  if (!form || !fields) return false;
  const url = form.elements[fields.url]?.value || "";
  const path = form.elements[fields.path]?.value || "";
  return Boolean(url && path && !/^(blob:|data:)/i.test(url) && !/^(blob:|data:)/i.test(path));
}

function releaseRequiredDeliveryTypes() {
  const licenses = (appState.releaseLicenses || []).filter((lic) => lic.is_active);
  const required = new Set();
  licenses.forEach((lic) => {
    if (lic.included_mp3 || ["basic", "premium", "exclusive"].includes(lic.license_key)) required.add("secure_mp3");
    if (lic.included_wav || ["premium", "exclusive"].includes(lic.license_key)) required.add("secure_wav");
    if (lic.included_stems || lic.license_key === "exclusive" || lic.is_exclusive) required.add("secure_stems");
  });
  if (!licenses.length) required.add("secure_mp3");
  return required;
}

function loadImageElement(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Nao foi possivel ler as dimensoes da imagem."));
    };
    image.src = url;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

async function optimizeCoverImage(file) {
  const extension = String(file.name || "").split(".").pop()?.toLowerCase() || "";
  const validType = /^image\/(png|jpe?g|webp)$/i.test(file.type || "") || ["jpg", "jpeg", "png", "webp"].includes(extension);
  if (!validType) throw new Error("Formato nao permitido. Use JPG, PNG ou WEBP.");
  if (file.size > RELEASE_COVER_HARD_LIMIT_BYTES) {
    throw new Error("A imagem e muito pesada para o navegador otimizar. Use uma imagem menor e tente novamente.");
  }

  const image = await loadImageElement(file);
  const scale = Math.min(1, RELEASE_COVER_MAX_DIMENSION / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
  const width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
  const height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Nao foi possivel preparar a capa para envio.");
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  let mime = "image/webp";
  let blob = null;
  for (const quality of [0.86, 0.78, 0.7, 0.62]) {
    blob = await canvasToBlob(canvas, mime, quality);
    if (blob && blob.size <= RELEASE_COVER_TARGET_BYTES) break;
  }
  if (!blob) {
    mime = "image/jpeg";
    blob = await canvasToBlob(canvas, mime, 0.82);
  }
  if (!blob) throw new Error("Nao foi possivel otimizar a capa. Tente outra imagem.");

  const optimizedExt = mime === "image/webp" ? "webp" : "jpg";
  const baseName = sanitizeStorageSegment(file.name.replace(/\.[^.]+$/, ""), "cover");
  const optimizedFile = new File([blob], `${baseName}.${optimizedExt}`, { type: mime, lastModified: Date.now() });
  return {
    file: optimizedFile,
    width,
    height,
    originalBytes: file.size,
    optimizedBytes: optimizedFile.size,
    wasOptimized: optimizedFile.size < file.size || scale < 1 || mime !== file.type
  };
}

function validateReleaseStep(step) {
  const form = releaseFormElement();
  if (!form) return false;
  
  const isYouTube = form.hasAttribute("data-youtube-release-form");
  const isCatalog = form.hasAttribute("data-catalog-import-form");
  
  if (isYouTube) {
    if (step === 0) {
      const url = form.elements.youtube_url?.value;
      const meta = youtubeMetadataFromUrl(url);
      if (!meta) {
        showToast("Insira um link válido do YouTube", "alert-triangle");
        return false;
      }
    }
    if (step === 1) {
      const title = form.elements.title?.value?.trim();
      const genre = form.elements.genre?.value;
      const bpm = form.elements.bpm?.value;
      const musicalKey = form.elements.musical_key?.value?.trim();
      
      if (!title) {
        showToast("Título é obrigatório", "alert-triangle");
        return false;
      }
      if (!genre) {
        showToast("Selecione um gênero", "alert-triangle");
        return false;
      }
      if (!bpm || Number(bpm) < 40 || Number(bpm) > 240) {
        showToast("BPM deve ser entre 40 e 240", "alert-triangle");
        return false;
      }
      if (!musicalKey) {
        showToast("Tom musical / Key é obrigatório", "alert-triangle");
        return false;
      }
    }
    if (step === 2) {
      const price = form.elements.price?.value;
      const licenseType = form.elements.license_type?.value;
      if (!licenseType) {
        showToast("Selecione um tipo de licença", "alert-triangle");
        return false;
      }
      if (licenseType !== "free" && (!price || Number(price) <= 0)) {
        showToast("Preço é obrigatório", "alert-triangle");
        return false;
      }
    }
    return true;
  }
  
  if (isCatalog) {
    const state = ensureCatalogImportState();
    if (step === 0) {
      if (!state.items.length) {
        showToast("Adicione pelo menos um arquivo ou link do YouTube para prosseguir.", "alert-triangle");
        return false;
      }
    }
    if (step === 2) {
      const validCount = state.items.filter((item) => !["invalid", "duplicate", "failed"].includes(item.status)).length;
      if (!validCount) {
        showToast("Nenhum item válido para importação. Corrija os erros ou remova itens inválidos.", "alert-triangle");
        return false;
      }
    }
    if (step === 3) {
      const authorized = form.querySelector('[data-action="catalog-rights"]')?.checked || state.authorized;
      if (!authorized) {
        showToast("Confirme que você tem direitos/autorização sobre os beats.", "shield-alert");
        return false;
      }
    }
    return true;
  }
  
  if (step === 0) {
    const title = form.elements.title?.value?.trim();
    const genre = form.elements.genre?.value;
    const bpm = form.elements.bpm?.value;
    const musicalKey = form.elements.musical_key?.value?.trim();
    
    if (!title) {
      showToast("Título é obrigatório", "alert-triangle");
      return false;
    }
    if (!genre) {
      showToast("Selecione um gênero", "alert-triangle");
      return false;
    }
    if (!bpm || Number(bpm) < 40 || Number(bpm) > 240) {
      showToast("BPM deve ser entre 40 e 240", "alert-triangle");
      return false;
    }
    if (!musicalKey) {
      showToast("Tom musical / Key é obrigatório", "alert-triangle");
      return false;
    }
  }
  
  if (step === 1) {
    if (isReleaseUploadInProgress("cover", form)) {
      showToast("Aguarde o upload da capa terminar.", "upload-cloud");
      return false;
    }
    const coverUrl = form.elements.cover_url?.value;
    if (!coverUrl) {
      showToast("Por favor, envie a capa do release", "alert-triangle");
      return false;
    }
  }
  
  if (step === 2) {
    if (isReleaseUploadInProgress("audio", form) || isReleaseUploadInProgress("secure_mp3", form) || isReleaseUploadInProgress("secure_wav", form) || isReleaseUploadInProgress("secure_stems", form)) {
      showToast("Aguarde o término do envio dos arquivos.", "upload-cloud");
      return false;
    }
    if (!releaseFileIsConfirmed(form, "audio")) {
      showToast("Por favor, envie o áudio de preview público.", "alert-triangle");
      return false;
    }
    if (!releaseFileIsConfirmed(form, "secure_mp3")) {
      showToast("Por favor, envie o arquivo MP3 seguro de entrega.", "alert-triangle");
      return false;
    }
    const premiumActive = appState.releaseLicenses?.find(l => l.license_key === "premium")?.is_active;
    if (premiumActive) {
      if (!releaseFileIsConfirmed(form, "secure_wav")) {
        showToast("A licença Lease Premium está ativa. Envie o arquivo WAV de entrega correspondente.", "alert-triangle");
        return false;
      }
    }
    const exclusiveActive = appState.releaseLicenses?.find(l => l.license_key === "exclusive")?.is_active;
    if (exclusiveActive) {
      if (!releaseFileIsConfirmed(form, "secure_wav")) {
        showToast("A licença Exclusiva está ativa. Envie o arquivo WAV de entrega correspondente.", "alert-triangle");
        return false;
      }
      if (!releaseFileIsConfirmed(form, "secure_stems")) {
        showToast("A licença Exclusiva está ativa. Envie o arquivo ZIP de Stems de entrega correspondente.", "alert-triangle");
        return false;
      }
    }
  }
  
  if (step === 3) {
    const activeLics = appState.releaseLicenses ? appState.releaseLicenses.filter(l => l.is_active) : [];
    if (activeLics.length === 0) {
      showToast("Pelo menos uma licença precisa estar ativa.", "alert-triangle");
      return false;
    }
    for (const lic of activeLics) {
      if (lic.price_cents === undefined || lic.price_cents === null || lic.price_cents <= 0) {
        showToast(`Por favor, defina um preço válido para a licença: ${lic.name}.`, "alert-triangle");
        return false;
      }
      if (lic.price_cents < 500) {
        showToast(`O preço mínimo para a licença "${lic.name}" é R$ 5,00.`, "alert-triangle");
        return false;
      }
      const sum = Number(lic.buyer_royalty_percentage) + Number(lic.producer_royalty_percentage);
      if (sum !== 100) {
        showToast(`Os royalties para a licença "${lic.name}" devem somar exatamente 100%.`, "alert-triangle");
        return false;
      }
    }
  }
  
  return true;
}

function syncReleaseForm(form = releaseFormElement()) {
  if (!form) return;
  
  const isYouTube = form.hasAttribute("data-youtube-release-form");
  const isCatalog = form.hasAttribute("data-catalog-import-form");
  
  const title = form.elements.title?.value?.trim() || (isCatalog ? "Importar Catálogo" : "Sem título");
  const artist = form.elements.producer_name?.value?.trim() || activeProfile()?.artistic_name || activeProfile()?.full_name || "ANSEND";
  const genre = form.elements.genre?.value || "ANSEND";
  const bpm = form.elements.bpm?.value ? `${form.elements.bpm.value} BPM` : "";
  const key = form.elements.musical_key?.value?.trim() || "";
  const price = form.elements.price?.value ? `R$ ${Number(form.elements.price.value).toFixed(2)}` : "R$ 0,00";
  const licenseType = form.elements.license_type?.value || "premium";
  const desc = form.elements.description?.value?.trim() || "Sem descrição fornecida.";
  
  let coverUrl = form.elements.cover_url?.value;
  if (!coverUrl && isYouTube) {
    const meta = youtubeMetadataFromUrl(form.elements.youtube_url?.value);
    if (meta) coverUrl = meta.youtube_thumbnail_url;
  }
  if (!coverUrl) coverUrl = "assets/ansend-logo-square.png";
  
  const audioUrl = form.elements.audio_url?.value || "";
  
  const tagsStr = (form.elements.release_tags?.value || form.elements.tags?.value || "");
  const tags = [
    genre,
    bpm,
    key,
    ...tagsStr.split(",").map(t => t.trim()).filter(Boolean)
  ].filter(Boolean);
  
  if (form.elements.tags) form.elements.tags.value = tags.join(", ");
  
  // Update mini footer track preview
  if (isCatalog) {
    const state = ensureCatalogImportState();
    const count = state.items.length;
    form.querySelectorAll("[data-footer-title]").forEach(el => el.textContent = `Catálogo (${count} itens)`);
    form.querySelectorAll("[data-footer-artist]").forEach(el => el.textContent = artist);
    form.querySelectorAll(".release-footer-cover").forEach(img => img.src = "assets/ansend-logo-square.png");
  } else {
    form.querySelectorAll("[data-footer-title]").forEach(el => el.textContent = title);
    form.querySelectorAll("[data-footer-artist]").forEach(el => el.textContent = artist);
    form.querySelectorAll(".release-footer-cover").forEach(img => img.src = coverUrl);
  }
  
  // Update review panel
  form.querySelectorAll("[data-review-title]").forEach(el => el.textContent = title);
  form.querySelectorAll("[data-review-producer]").forEach(el => el.textContent = `por ${artist}`);
  form.querySelectorAll("[data-review-genre]").forEach(el => el.textContent = genre);
  form.querySelectorAll("[data-review-bpm]").forEach(el => el.textContent = bpm ? `${bpm}` : "-");
  form.querySelectorAll("[data-review-key]").forEach(el => el.textContent = key || "-");
  form.querySelectorAll("[data-review-price]").forEach(el => el.textContent = price);
  form.querySelectorAll("[data-review-desc]").forEach(el => el.textContent = desc);
  
  const capitalizedLicense = licenseType.charAt(0).toUpperCase() + licenseType.slice(1);
  form.querySelectorAll("[data-review-license]").forEach(el => el.textContent = capitalizedLicense);
  
  // Review cover image
  const reviewCover = form.querySelector(".review-cover-img");
  if (reviewCover) reviewCover.src = coverUrl;
  
  // Review audio player (only for local upload where audioUrl is set)
  const reviewPlayer = form.querySelector(".review-audio-player");
  if (reviewPlayer && audioUrl) reviewPlayer.src = audioUrl;
  
  // Delivery files summary
  const files = [];
  if (releaseFileIsConfirmed(form, "secure_mp3")) files.push("MP3");
  if (releaseFileIsConfirmed(form, "secure_wav")) files.push("WAV");
  if (releaseFileIsConfirmed(form, "secure_stems")) files.push("Stems");
  files.push("Contrato");
  form.querySelectorAll("[data-review-files]").forEach(el => el.textContent = files.join(", ") || "-");
}

function prepareReleaseFilesLayout(form = releaseFormElement()) {
  const panel = form?.querySelector('.release-panel[data-panel="2"]');
  const layout = panel?.querySelector(".release-upload-layout");
  if (!layout || layout.dataset.enhanced === "true") return;
  const mp3Drop = layout.querySelector(".release-secure-mp3-drop");
  const wavDrop = layout.querySelector(".release-secure-wav-drop");
  const stemsDrop = layout.querySelector(".release-secure-stems-drop");
  const previewGrid = layout.querySelector(".release-audio-drop")?.parentElement;
  const mp3Row = mp3Drop?.parentElement;
  const wavRow = wavDrop?.parentElement;
  const stemsRow = stemsDrop?.parentElement;
  const secureList = mp3Row?.parentElement;
  if (!previewGrid || !mp3Row || !wavRow || !stemsRow) return;

  const main = document.createElement("div");
  const secondary = document.createElement("div");
  main.className = "release-files-main";
  secondary.className = "release-files-secondary";
  previewGrid.classList.add("release-preview-grid");
  mp3Row.classList.add("release-secure-row", "release-secure-row-mp3");
  wavRow.classList.add("release-secure-row", "release-secure-row-wav");
  stemsRow.classList.add("release-secure-row", "release-secure-row-stems");
  main.append(previewGrid, mp3Row);
  secondary.append(wavRow, stemsRow);
  layout.replaceChildren(main, secondary);
  layout.classList.add("release-files-layout");
  layout.dataset.enhanced = "true";
  secureList?.remove?.();
}

function setReleaseStep(step, form = releaseFormElement()) {
  if (!form) return;
  const maxStep = form.querySelectorAll(".release-panel").length - 1;
  const nextStep = Math.max(0, Math.min(maxStep >= 0 ? maxStep : 5, Number(step)));
  form.dataset.releaseStep = String(nextStep);
  
  // Hide all panels except active
  form.querySelectorAll(".release-panel").forEach((panel) => {
    panel.classList.toggle("is-active", Number(panel.dataset.panel) === nextStep);
  });
  
  // Update stepper UI with dynamic checkmarks
  document.querySelectorAll(".release-step").forEach((button) => {
    const btnStep = Number(button.dataset.step);
    const stepSpan = button.querySelector("span");
    const isActive = btnStep === nextStep;
    const isComplete = btnStep < nextStep;
    
    button.classList.toggle("is-active", isActive);
    button.classList.toggle("is-complete", isComplete);
    
    if (stepSpan) {
      if (isComplete) {
        stepSpan.innerHTML = '<i data-lucide="check" style="width:14px; height:14px;"></i>';
      } else {
        stepSpan.textContent = String(btnStep + 1);
      }
    }
  });
  lucide.createIcons();
  
  // Configure action buttons in footer (footer is outside the form, inside .release-page)
  const releasePage = form.closest(".release-page") || document;
  const back = releasePage.querySelector('button[data-action="release-back"]');
  const next = releasePage.querySelector('button[data-action="release-next"]');
  const submit = releasePage.querySelector('button[data-action="publish-catalog"]');
  const draftBtn = releasePage.querySelector('button[data-action="save-draft"]');
  
  if (back) {
    back.disabled = false;
    back.textContent = nextStep === 0 ? "Trocar modo" : "Voltar";
  }
  if (next) next.style.display = nextStep === maxStep ? "none" : "flex";
  if (submit) submit.style.display = nextStep === maxStep ? "flex" : "none";
  
  if (draftBtn) {
    const isYouTube = form.hasAttribute("data-youtube-release-form");
    const isCatalog = form.hasAttribute("data-catalog-import-form");
    draftBtn.style.display = isYouTube || isCatalog ? "none" : "block";
  }
  
  // Scroll to top of form area
  const releaseEl = form.closest(".release-page");
  if (releaseEl) {
    releaseEl.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  syncReleaseForm(form);
}

async function handleReleaseUpload(file, type, progressCallback) {
  const isCover = type === "cover";
  const isAudio = type === "audio";
  const isStems = type === "stems";
  const form = releaseFormElement();
  const beatId = form?.dataset?.beatId || generateUUID();
  const configType = isCover ? "cover" : isAudio ? "audio" : isStems ? "stems" : type;
  const config = { ...STORAGE_UPLOAD_LIMITS[configType] };
  if (!config) throw new Error("Tipo de upload nao suportado.");
  if (configType === "cover" && appState.authUser?.email === "artist@example.com") {
    config.folder = "covers";
  }
  progressCallback?.(55);
  const ext = validateStorageFile(file, config);
  const { user } = await ensureStorageAuthSession();
  const fileBase = sanitizeStorageSegment(file.name.replace(/\.[^.]+$/, ""), configType);
  const fileName = `${configType}-${fileBase}-${Date.now()}-${generateUUID().slice(0, 8)}.${ext}`;
  const path = `${user.id}/${config.folder}/${beatId}/${fileName}`;
  const result = await uploadStorageFile(file, {
    type: configType,
    path,
    timeoutMs: releaseUploadTimeoutMs(type),
  });
  progressCallback?.(100);
  return {
    url: result.publicUrl,
    path: result.path,
    bucket: result.bucket,
    mimeType: result.contentType || mimeTypeForFile(file),
    originalName: file.name,
    size: file.size,
  };
}

async function handleReleaseFile(file, type) {
  if (!file) return;
  if (!supabaseClient || !appState.authUser) {
    showToast("Voce precisa estar autenticado para enviar arquivos.", "triangle-alert");
    location.hash = "vendedor";
    return;
  }
  const form = releaseFormElement();
  if (!form) return;
  const dropzone = form.querySelector(`[data-upload-drop="${type}"]`);
  if (isReleaseUploadInProgress(type, form)) {
    showToast("Este arquivo ainda esta sendo enviado. Aguarde o termino antes de tentar novamente.", "upload-cloud");
    return;
  }
  const uploadToken = generateUUID();
  let progressTimer = null;

  releaseUploadTokens.set(type, uploadToken);
  releaseLastFiles.set(type, file);
  setReleaseUploadError(dropzone, "");
  setReleaseUploadSuccess(dropzone, "");
  resetReleaseProgress(dropzone, false);

  if (type === "cover") {
    setCoverPreview(file, form);
    form.elements.cover_url.value = "";
    form.elements.cover_path.value = "";
    syncReleaseForm(form);
  }

  setReleaseUploadInProgress(type, true, form);
  setReleaseProgress(dropzone, type === "cover" ? 8 : 5, type === "cover" ? "Preparando imagem..." : "Preparando arquivo...");

  try {
    let uploadFile = file;
    if (type === "cover") {
      if (file.size > RELEASE_COVER_TARGET_BYTES) {
        setReleaseProgress(dropzone, 14, "A imagem e muito pesada, estamos otimizando...");
      }
      const optimized = await optimizeCoverImage(file);
      if (releaseUploadTokens.get(type) !== uploadToken) return;
      uploadFile = optimized.file;
      console.info("Cover optimized for upload", {
        originalBytes: optimized.originalBytes,
        optimizedBytes: optimized.optimizedBytes,
        width: optimized.width,
        height: optimized.height,
        wasOptimized: optimized.wasOptimized
      });
      setReleaseProgress(dropzone, 38, "Imagem pronta. Enviando capa...");
    }

    progressTimer = startReleaseProgressTicker(dropzone, type === "cover" ? 42 : 10, 92, type === "cover" ? "Enviando capa..." : "Enviando arquivo...");
    const durationSeconds = ["audio", "secure_mp3", "secure_wav"].includes(type)
      ? await readAudioFileDuration(file)
      : null;
    const result = await handleReleaseUpload(uploadFile, type, (progress) => {
      if (releaseUploadTokens.get(type) === uploadToken) {
        setReleaseProgress(dropzone, progress, type === "cover" ? "Finalizando capa..." : "Finalizando arquivo...");
      }
    });
    result.durationSeconds = durationSeconds;

    if (progressTimer) window.clearInterval(progressTimer);
    if (releaseUploadTokens.get(type) !== uploadToken) return;
    setReleaseProgress(dropzone, 100, type === "cover" ? "Capa enviada com sucesso" : "Arquivo enviado com sucesso");
    window.setTimeout(() => {
      if (releaseUploadTokens.get(type) === uploadToken) resetReleaseProgress(dropzone, true);
    }, 650);
    setReleaseUploadInProgress(type, false, form);

    if (type === "cover") {
      form.elements.cover_url.value = result.url;
      form.elements.cover_path.value = result.path;
      setPersistentCoverPreview(result.url, form);
      await persistReleaseCoverDraft(result.url, result.path, form);
      setReleaseUploadSuccess(dropzone, "Capa enviada com sucesso.");
      showToast("Capa enviada com sucesso!", "image");
    } else if (type === "audio") {
      setReleaseFileHiddenValues(form, "audio", result);
      form.elements.file_size.value = result.size;
      form.elements.duration_seconds.value = result.durationSeconds || "";
      setReleaseFilePreview(form, "audio", result);
      await persistReleaseUploadDraft(releaseFileMetadataPatch("audio", result), form);
      showToast("Audio enviado com sucesso!", "music");
    } else if (["secure_mp3", "secure_wav", "secure_stems", "stems"].includes(type)) {
      const deliveryType = type === "stems" ? "secure_stems" : type;
      setReleaseFileHiddenValues(form, deliveryType, result);
      setReleaseFilePreview(form, deliveryType, result);
      await persistReleaseUploadDraft(releaseFileMetadataPatch(deliveryType, result), form);
      const toastIcon = deliveryType === "secure_stems" ? "archive" : "music";
      showToast(`${releaseFileField(deliveryType)?.label || "Arquivo"} enviado com sucesso!`, toastIcon);
    }
    
    syncReleaseForm(form);
  } catch (err) {
    if (progressTimer) window.clearInterval(progressTimer);
    if (releaseUploadTokens.get(type) !== uploadToken) return;
    resetReleaseProgress(dropzone, true);
    setReleaseUploadInProgress(type, false, form);
    const message = releaseStorageErrorMessage(err, type);
    setReleaseUploadError(dropzone, message, { retryType: type });
    console.error("Release upload failed", err);
    showToast(message, "alert-triangle");
  } finally {
    if (releaseUploadTokens.get(type) === uploadToken) {
      setReleaseUploadInProgress(type, false, form);
    }
  }
}

function handleReleaseFileInput(input) {
  handleReleaseFile(input.files?.[0], input.dataset.uploadType).finally(() => {
    input.value = "";
  });
}

function setupMusicUploadEventListeners() {
  const form = releaseFormElement();
  if (!form) return;
  
  const releasePage = form.closest(".release-page") || document;
  const draftBtn = releasePage.querySelector('[data-action="save-draft"]');
  const publishBtn = releasePage.querySelector('[data-action="publish-catalog"]');

  if (draftBtn) {
    draftBtn.addEventListener("click", () => {
      if (!form.classList.contains("youtube-release-form") && !form.classList.contains("catalog-import-form")) {
        saveBeatRelease("draft");
      }
    });
  }
  
  if (publishBtn) {
    publishBtn.addEventListener("click", async () => {
      if (form.classList.contains("youtube-release-form")) {
        publishBtn.disabled = true;
        publishBtn.dataset.loading = "true";
        publishBtn.innerHTML = `<i data-lucide="loader-circle"></i>Publicando...`;
        lucide.createIcons();
        try {
          await saveYouTubeBeat(form);
        } finally {
          publishBtn.disabled = false;
          publishBtn.dataset.loading = "false";
          publishBtn.innerHTML = `<i data-lucide="cloud-check"></i>Publicar beat`;
          lucide.createIcons();
        }
      } else if (form.classList.contains("catalog-import-form")) {
        await publishCatalogImport();
      } else {
        saveBeatRelease("published");
      }
    });
  }

  form.addEventListener("click", (e) => {
    const usePreviewBtn = e.target.closest(".use-preview-as-delivery-btn");
    const removeAction = e.target.closest('[data-action="remove-secure-mp3"], [data-action="remove-secure-wav"], [data-action="remove-secure-stems"]');
    if (!usePreviewBtn && !removeAction) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if (usePreviewBtn) {
      const targetType = usePreviewBtn.dataset.target;
      if (!releaseFileIsConfirmed(form, "audio")) {
        showToast("Envie e confirme o audio de preview primeiro.", "alert-triangle");
        return;
      }
      const previewMeta = {
        url: form.elements.audio_url?.value || "",
        path: form.elements.audio_path?.value || "",
        originalName: form.elements.audio_original_name?.value || form.querySelector("[data-audio-name]")?.textContent || "Mesmo do Preview",
        mimeType: form.elements.audio_mime_type?.value || "",
        size: form.elements.audio_size_bytes?.value || form.elements.file_size?.value || "",
        durationSeconds: form.elements.audio_duration_seconds?.value || form.elements.duration_seconds?.value || "",
      };
      if (targetType === "secure_mp3") {
        const audioName = String(previewMeta.originalName || "").toLowerCase();
        const audioMime = String(previewMeta.mimeType || "").toLowerCase();
        const isMp3Preview = audioName.endsWith(".mp3") || ["audio/mpeg", "audio/mp3"].includes(audioMime);
        if (!isMp3Preview) {
          showToast("O preview nao e MP3. Envie um MP3 de entrega real.", "alert-triangle");
          return;
        }
      }
      if (targetType === "secure_wav") {
        const audioName = String(previewMeta.originalName || "").toLowerCase();
        const audioMime = String(previewMeta.mimeType || "").toLowerCase();
        const isWavPreview = audioName.endsWith(".wav") || ["audio/wav", "audio/x-wav"].includes(audioMime);
        if (!isWavPreview) {
          showToast("O preview nao e WAV. Envie um WAV masterizado real.", "alert-triangle");
          return;
        }
      }
      if (!["secure_mp3", "secure_wav"].includes(targetType)) return;
      setReleaseFileHiddenValues(form, targetType, previewMeta);
      setReleaseFilePreview(form, targetType, previewMeta);
      void persistReleaseUploadDraft(releaseFileMetadataPatch(targetType, previewMeta), form);
      syncReleaseForm(form);
      showToast(targetType === "secure_mp3" ? "Preview confirmado como MP3 de entrega." : "Preview confirmado como WAV de entrega.", "check-circle");
      return;
    }

    const type = removeAction?.dataset.action === "remove-secure-mp3"
      ? "secure_mp3"
      : removeAction?.dataset.action === "remove-secure-wav"
        ? "secure_wav"
        : "secure_stems";
    void persistReleaseUploadDraft(clearReleaseFileState(form, type), form);
    syncReleaseForm(form);
    showToast(type === "secure_mp3" ? "MP3 seguro removido." : type === "secure_wav" ? "WAV seguro removido." : "Stems ZIP seguro removido.", "info");
  }, true);
  
  // Initialize Custom Select Component Logic
  const customSelects = form.querySelectorAll(".custom-select");
  customSelects.forEach((selectContainer) => {
    const trigger = selectContainer.querySelector(".custom-select-trigger");
    const triggerText = trigger.querySelector("span");
    const options = selectContainer.querySelectorAll(".custom-select-option");
    const hiddenInput = selectContainer.querySelector("input[type='hidden']");
    
    // Set active option on init if hidden input has value
    const initialVal = hiddenInput.value;
    if (initialVal) {
      options.forEach(opt => {
        if (opt.dataset.value === initialVal) {
          opt.classList.add("is-selected");
          triggerText.textContent = opt.textContent.trim();
          if (!opt.querySelector("svg")) {
            opt.insertAdjacentHTML("beforeend", '<i data-lucide="check" style="width:16px; height:16px; color:#ff6a00;"></i>');
          }
        } else {
          opt.classList.remove("is-selected");
          const existingSvg = opt.querySelector("svg");
          if (existingSvg) existingSvg.remove();
        }
      });
      lucide.createIcons();
    }
    
    // Toggle dropdown on trigger click
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      
      // Close all other selects inside the form
      form.querySelectorAll(".custom-select").forEach(other => {
        if (other !== selectContainer) {
          other.classList.remove("is-open");
        }
      });
      
      selectContainer.classList.toggle("is-open");
    });
    
    // Select option click
    options.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = opt.dataset.value;
        const text = opt.textContent.trim();
        
        hiddenInput.value = val;
        triggerText.textContent = text;
        
        options.forEach(o => {
          o.classList.remove("is-selected");
          const existingSvg = o.querySelector("svg");
          if (existingSvg) existingSvg.remove();
        });
        
        opt.classList.add("is-selected");
        if (!opt.querySelector("svg")) {
          opt.insertAdjacentHTML("beforeend", '<i data-lucide="check" style="width:16px; height:16px; color:#ff6a00;"></i>');
        }
        lucide.createIcons();
        
        selectContainer.classList.remove("is-open");
        
        // Dispatch events so form sync and validation are aware
        hiddenInput.dispatchEvent(new Event("change", { bubbles: true }));
        hiddenInput.dispatchEvent(new Event("input", { bubbles: true }));
        
        syncReleaseForm(form);
      });
    });
  });
  
  // Close any open dropdowns when clicking outside
  document.addEventListener("click", () => {
    form.querySelectorAll(".custom-select").forEach(s => s.classList.remove("is-open"));
  });

  // File inputs click handlers (removals)
  const removeCover = form.querySelector('[data-action="remove-cover"]');
  if (removeCover) {
    removeCover.addEventListener("click", () => {
      form.elements.cover_url.value = "";
      form.elements.cover_path.value = "";
      clearReleaseCoverDraft();
      const previousUrl = form.dataset.coverPreviewUrl;
      if (previousUrl?.startsWith("blob:")) URL.revokeObjectURL(previousUrl);
      delete form.dataset.coverPreviewUrl;
      const preview = form.querySelector(".release-cover-preview");
      if (preview) {
        preview.src = "";
        preview.classList.remove("has-preview");
      }
      form.querySelector(".release-cover-drop")?.classList.remove("has-file", "has-local-preview");
      const coverActions = form.querySelector(".cover-actions-container");
      if (coverActions) coverActions.style.display = "none";
      syncReleaseForm(form);
    });
  }
  
  const removeAudio = form.querySelector('[data-action="remove-audio"]');
  if (removeAudio) {
    removeAudio.addEventListener("click", () => {
      form.elements.audio_url.value = "";
      form.elements.audio_path.value = "";
      form.elements.duration_seconds.value = "";
      form.elements.file_size.value = "";
      
      const audioPreview = form.querySelector(".release-audio-preview");
      if (audioPreview) {
        audioPreview.style.display = "none";
        const player = audioPreview.querySelector("audio");
        if (player) {
          player.src = "";
          player.pause();
        }
      }
      form.querySelector(".release-audio-drop")?.classList.remove("has-file");
      void persistReleaseUploadDraft({ audio_url: null, audio_path: null }, form);
      syncReleaseForm(form);
    });
  }

  // Real-time currency price inputs formatting
  form.addEventListener("input", (e) => {
    if (e.target.classList.contains("license-price-formatter")) {
      const rawCents = parsePriceCents(e.target.value);
      e.target.value = formatPriceBRL(rawCents);
      const idx = Number(e.target.closest("[data-license-index]")?.dataset.licenseIndex);
      if (!isNaN(idx) && appState.releaseLicenses?.[idx]) {
        appState.releaseLicenses[idx].price_cents = rawCents;
      }
    }
    if (e.target.classList.contains("custom-license-price-formatter")) {
      e.target.value = formatPriceBRL(parsePriceCents(e.target.value));
    }
    syncReleaseForm(form);
  });

  // Real-time active status check toggles
  form.addEventListener("change", (e) => {
    if (e.target.classList.contains("license-active-toggle")) {
      const idx = Number(e.target.closest("[data-license-index]")?.dataset.licenseIndex);
      if (!isNaN(idx) && appState.releaseLicenses?.[idx]) {
        appState.releaseLicenses[idx].is_active = e.target.checked;
      }
    }
  });

  // License interactions and secure file upload copy options
  form.addEventListener("click", (e) => {
    const cardEl = e.target.closest("[data-license-index]");
    const idx = cardEl ? Number(cardEl.dataset.licenseIndex) : null;
    
    if (e.target.closest(".license-delete-btn")) {
      if (idx !== null && appState.releaseLicenses?.[idx]) {
        appState.releaseLicenses.splice(idx, 1);
        refreshReleaseLicensesUI();
      }
      return;
    }
    
    if (e.target.closest(".license-duplicate-btn")) {
      if (idx !== null && appState.releaseLicenses?.[idx]) {
        const copy = { ...appState.releaseLicenses[idx], id: generateUUID(), is_default: false, is_custom: true };
        copy.name = `${copy.name} (Cópia)`;
        appState.releaseLicenses.splice(idx + 1, 0, copy);
        refreshReleaseLicensesUI();
      }
      return;
    }
    
    if (e.target.closest(".license-move-up")) {
      if (idx !== null && idx > 0) {
        const temp = appState.releaseLicenses[idx];
        appState.releaseLicenses[idx] = appState.releaseLicenses[idx - 1];
        appState.releaseLicenses[idx - 1] = temp;
        refreshReleaseLicensesUI();
      }
      return;
    }
    
    if (e.target.closest(".license-move-down")) {
      if (idx !== null && idx < appState.releaseLicenses.length - 1) {
        const temp = appState.releaseLicenses[idx];
        appState.releaseLicenses[idx] = appState.releaseLicenses[idx + 1];
        appState.releaseLicenses[idx + 1] = temp;
        refreshReleaseLicensesUI();
      }
      return;
    }
    
    if (e.target.closest(".license-edit-terms-btn")) {
      if (idx !== null) {
        openLicenseTermsEditModal(idx);
      }
      return;
    }
    
    if (e.target.closest(".add-custom-license-btn")) {
      openLicenseTermsEditModal();
      return;
    }

    const usePreviewBtn = e.target.closest(".use-preview-as-delivery-btn");
    if (usePreviewBtn) {
      const targetType = usePreviewBtn.dataset.target;
      if (targetType === "secure_mp3") {
        if (!form.elements.audio_url.value) {
          showToast("Faça upload do Áudio de Preview primeiro.", "alert-triangle");
          return;
        }
        form.elements.mp3_url.value = form.elements.audio_url.value;
        form.elements.mp3_path.value = form.elements.audio_path.value;
        const preview = form.querySelector(".secure-mp3-preview");
        const nameNode = form.querySelector("[data-secure-mp3-name]");
        if (nameNode) nameNode.textContent = form.querySelector("[data-audio-name]")?.textContent || "Mesmo do Preview";
        if (preview) preview.style.display = "block";
        form.querySelector(".release-secure-mp3-drop")?.classList.add("has-file");
        showToast("Usando áudio de preview para entrega do MP3.", "check-circle");
      } else if (targetType === "secure_wav") {
        if (!form.elements.audio_url.value) {
          showToast("Faça upload do Áudio de Preview primeiro.", "alert-triangle");
          return;
        }
        const audioName = form.querySelector("[data-audio-name]")?.textContent || "";
        if (!audioName.toLowerCase().endsWith(".wav") && !audioName.toLowerCase().endsWith(".flac")) {
          showToast("O arquivo de preview não parece ser um WAV/FLAC. Faça upload de um arquivo WAV real.", "alert-triangle");
          return;
        }
        form.elements.wav_url.value = form.elements.audio_url.value;
        form.elements.wav_path.value = form.elements.audio_path.value;
        const preview = form.querySelector(".secure-wav-preview");
        const nameNode = form.querySelector("[data-secure-wav-name]");
        if (nameNode) nameNode.textContent = audioName || "Mesmo do Preview";
        if (preview) preview.style.display = "block";
        form.querySelector(".release-secure-wav-drop")?.classList.add("has-file");
        showToast("Usando áudio de preview para entrega do WAV.", "check-circle");
      }
      return;
    }

    if (e.target.closest('[data-action="remove-secure-mp3"]')) {
      form.elements.mp3_url.value = "";
      form.elements.mp3_path.value = "";
      const preview = form.querySelector(".secure-mp3-preview");
      if (preview) preview.style.display = "none";
      form.querySelector(".release-secure-mp3-drop")?.classList.remove("has-file");
      showToast("MP3 seguro removido.", "info");
      return;
    }

    if (e.target.closest('[data-action="remove-secure-wav"]')) {
      form.elements.wav_url.value = "";
      form.elements.wav_path.value = "";
      const preview = form.querySelector(".secure-wav-preview");
      if (preview) preview.style.display = "none";
      form.querySelector(".release-secure-wav-drop")?.classList.remove("has-file");
      showToast("WAV seguro removido.", "info");
      return;
    }

    if (e.target.closest('[data-action="remove-secure-stems"]')) {
      form.elements.stems_url.value = "";
      form.elements.stems_path.value = "";
      const preview = form.querySelector(".secure-stems-preview");
      if (preview) preview.style.display = "none";
      form.querySelector(".release-secure-stems-drop")?.classList.remove("has-file");
      showToast("Stems ZIP seguro removido.", "info");
      return;
    }
  });
}

async function saveBeatRelease(status = "published") {
  const form = releaseFormElement();
  if (!form) return;
  
  form.elements.status.value = status;
  
  if (status === "published") {
    for (let i = 0; i <= 4; i++) {
      if (!validateReleaseStep(i)) {
        setReleaseStep(i);
        return;
      }
    }
  } else {
    const title = form.elements.title?.value?.trim();
    if (!title) {
      showToast("Digite pelo menos o título para salvar o rascunho.", "alert-triangle");
      return;
    }
  }
  
  const tagsStr = form.elements.release_tags?.value || "";
  const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);
  
  const activeLics = appState.releaseLicenses ? appState.releaseLicenses.filter(l => l.is_active) : [];
  const cheapestPrice = activeLics.length ? Math.min(...activeLics.map(l => l.price_cents)) / 100 : 0;

  const payload = {
    title: form.elements.title?.value?.trim() || "Sem título",
    producer_name: form.elements.producer_name?.value?.trim() || activeProfile()?.artistic_name || activeProfile()?.full_name || "ANSEND",
    genre: form.elements.genre?.value || "",
    subgenre: form.elements.subgenre?.value?.trim() || null,
    bpm: form.elements.bpm?.value ? Number(form.elements.bpm.value) : null,
    musical_key: form.elements.musical_key?.value?.trim() || null,
    mood: form.elements.mood?.value?.trim() || null,
    tags: tags,
    description: form.elements.description?.value?.trim() || null,
    already_released: form.elements.already_released?.value === "true",
    license_type: form.elements.license_type?.value || "premium",
    price: cheapestPrice,
    allow_tagged_download: form.elements.allow_tagged_download?.value === "true",
    allow_commercial_use: form.elements.allow_commercial_use?.value === "true",
    max_sales: form.elements.max_sales?.value ? Number(form.elements.max_sales.value) : null,
    license_terms: form.elements.license_terms?.value?.trim() || null,
    delivery_mp3: form.elements.mp3_url?.value ? true : false,
    delivery_wav: form.elements.wav_url?.value ? true : false,
    delivery_stems: form.elements.stems_url?.value ? true : false,
    delivery_contract: true,
    delivery_notes: form.elements.delivery_notes?.value?.trim() || null,
    cover_url: form.elements.cover_url?.value || null,
    cover_path: form.elements.cover_path?.value || null,
    audio_url: form.elements.audio_url?.value || null,
    audio_path: form.elements.audio_path?.value || null,
    mp3_url: form.elements.mp3_url?.value || null,
    mp3_path: form.elements.mp3_path?.value || null,
    wav_url: form.elements.wav_url?.value || null,
    wav_path: form.elements.wav_path?.value || null,
    stems_url: form.elements.stems_url?.value || null,
    stems_path: form.elements.stems_path?.value || null,
    audio_original_name: form.elements.audio_original_name?.value || null,
    audio_mime_type: form.elements.audio_mime_type?.value || null,
    audio_size_bytes: form.elements.audio_size_bytes?.value ? Number(form.elements.audio_size_bytes.value) : null,
    audio_duration_seconds: form.elements.audio_duration_seconds?.value ? Number(form.elements.audio_duration_seconds.value) : null,
    mp3_original_name: form.elements.mp3_original_name?.value || null,
    mp3_mime_type: form.elements.mp3_mime_type?.value || null,
    mp3_size_bytes: form.elements.mp3_size_bytes?.value ? Number(form.elements.mp3_size_bytes.value) : null,
    mp3_duration_seconds: form.elements.mp3_duration_seconds?.value ? Number(form.elements.mp3_duration_seconds.value) : null,
    wav_original_name: form.elements.wav_original_name?.value || null,
    wav_mime_type: form.elements.wav_mime_type?.value || null,
    wav_size_bytes: form.elements.wav_size_bytes?.value ? Number(form.elements.wav_size_bytes.value) : null,
    wav_duration_seconds: form.elements.wav_duration_seconds?.value ? Number(form.elements.wav_duration_seconds.value) : null,
    stems_original_name: form.elements.stems_original_name?.value || null,
    stems_mime_type: form.elements.stems_mime_type?.value || null,
    stems_size_bytes: form.elements.stems_size_bytes?.value ? Number(form.elements.stems_size_bytes.value) : null,
    duration_seconds: form.elements.duration_seconds?.value ? Number(form.elements.duration_seconds.value) : null,
    file_size: form.elements.file_size?.value ? Number(form.elements.file_size.value) : null,
    status: status,
    updated_at: new Date().toISOString()
  };
  
  if (status === "published") {
    payload.published_at = new Date().toISOString();
  }

  if (status === "published") {
    const hasPersistentCover = payload.cover_url && !/^(blob:|data:)/i.test(payload.cover_url);
    const hasPersistentAudio = payload.audio_url && !/^(blob:|data:)/i.test(payload.audio_url);
    if (!hasPersistentCover || !hasPersistentAudio || !payload.audio_path) {
      showToast("Envie capa e audio para o storage antes de publicar.", "upload-cloud");
      return;
    }
    const requiredDeliveryTypes = releaseRequiredDeliveryTypes();
    if ([...requiredDeliveryTypes].some((type) => !releaseFileIsConfirmed(form, type))) {
      showToast("Confirme os arquivos de entrega no Storage antes de publicar.", "upload-cloud");
      setReleaseStep(2, form);
      return;
    }
  }
  
  const beatId = form.dataset.beatId;
  let savedCatalogItem = null;
  
  if (!supabaseClient || !appState.authUser) {
    showToast("Você precisa estar autenticado para publicar ou salvar beats.", "triangle-alert");
    location.hash = "vendedor";
    return;
  }

  const dbPayload = {
    ...payload,
    id: beatId,
    user_id: appState.authUser.id
  };
  
  const { data, error } = await publishBeat(dbPayload);
    
  if (error) {
    showToast(error.message || "Erro ao salvar no Supabase", "triangle-alert");
    console.error(error);
    return;
  }

  // Save beat licenses
  if (supabaseClient) {
    const licensesToSave = appState.releaseLicenses.map((lic, idx) => {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lic.id);
      return {
        beat_id: beatId,
        license_key: lic.license_key,
        name: lic.name,
        description: lic.description || null,
        price_cents: lic.price_cents || 0,
        currency: lic.currency || 'BRL',
        is_default: lic.is_default || false,
        is_custom: lic.is_custom || false,
        is_active: lic.is_active,
        is_exclusive: lic.is_exclusive || false,
        included_mp3: lic.included_mp3 || false,
        included_wav: lic.included_wav || false,
        included_stems: lic.included_stems || false,
        buyer_royalty_percentage: lic.buyer_royalty_percentage || 50,
        producer_royalty_percentage: lic.producer_royalty_percentage || 50,
        stream_limit: lic.stream_limit || null,
        unlimited_streams: lic.unlimited_streams || false,
        music_video_limit: lic.music_video_limit || null,
        unlimited_music_videos: lic.unlimited_music_videos || false,
        commercial_use: lic.commercial_use !== false,
        monetization_allowed: lic.monetization_allowed !== false,
        live_performance_allowed: lic.live_performance_allowed !== false,
        content_id_allowed: lic.content_id_allowed || false,
        credit_required: lic.credit_required !== false,
        credit_text: lic.credit_text || `Prod. por ${dbPayload.producer_name}`,
        duration: lic.duration || 'lifetime',
        territory: lic.territory || 'worldwide',
        custom_terms: lic.custom_terms || null,
        sort_order: idx,
        ...(isUUID ? { id: lic.id } : {})
      };
    });
    
    const { error: deleteError } = await supabaseClient
      .from("beat_licenses")
      .delete()
      .eq("beat_id", beatId);
      
    if (deleteError) {
      console.error("Error clearing old licenses:", deleteError);
    }
    
    const { error: insertError } = await supabaseClient
      .from("beat_licenses")
      .insert(licensesToSave);
      
    if (insertError) {
      console.error("Error inserting licenses:", insertError);
      showToast("Erro ao salvar configurações de licenças.", "triangle-alert");
    }
  }
  
  // Add source_table property
  data.source_table = "beats";
  savedCatalogItem = data;
  
  appState.ownedCatalogItems = dedupeById([data, ...appState.ownedCatalogItems.filter(item => item.id !== beatId)]);
  appState.publicCatalogItems = status === "published"
    ? dedupeById([data, ...appState.publicCatalogItems.filter(item => item.id !== beatId)])
    : appState.publicCatalogItems.filter(item => item.id !== beatId);
  syncCatalogCompatibilityState();
  
  showToast(status === "published" ? "Beat publicado no Supabase!" : "Rascunho salvo no Supabase!", "cloud-check");
  if (status === "published") void clearReleaseUploadDraft();

  if (savedCatalogItem) {
    if (status === "published") {
      upsertFeedItem(createFeedItemFromBeat(savedCatalogItem));
    } else {
      removeFeedItemForSource(savedCatalogItem.id, savedCatalogItem.source_table || "beats");
    }
  }
  
  // Only reload from Supabase if we have an auth session; otherwise local items are already in state
  if (supabaseClient && appState.authUser) {
    await loadCatalogItems();
  }
  
  appState.genre = "Todos";
  if (location.hash !== "#explorar") {
    location.hash = "explorar";
  } else {
    renderExplore();
    hydrateView();
  }
}

function hydrateReleaseDetailsStep(form, producerName, genreOptions, keyOptions) {
  const panel = form?.querySelector('.release-panel[data-panel="0"]');
  if (!panel) return;
  panel.innerHTML = `
    <div class="release-panel-header release-details-header">
      <h2>Informações do Beat</h2>
      <p>Preencha apenas o essencial agora. Você pode adicionar detalhes extras se quiser melhorar a descoberta do beat.</p>
    </div>
    <div class="release-producer-note" aria-label="Produtor vinculado ao perfil">
      <span>Publicado por</span>
      <strong>${htmlEscape(producerName)}</strong>
    </div>
    <div class="release-form-grid release-essential-grid">
      <label class="release-field release-wide">
        <span class="release-label">Título do beat *</span>
        <input name="title" type="text" placeholder="Ex: Chill Vibing Trap Beat" required>
      </label>
      <div class="release-field">
        <span class="release-label">Gênero *</span>
        <div class="custom-select" data-select-id="genre">
          <input type="hidden" name="genre" required>
          <button type="button" class="custom-select-trigger"><span>Selecione o gênero</span><i data-lucide="chevron-down"></i></button>
          <div class="custom-select-options">${genreOptions}</div>
        </div>
      </div>
      <label class="release-field">
        <span class="release-label">BPM *</span>
        <input name="bpm" type="number" min="40" max="240" placeholder="Ex: 140" required>
      </label>
      <div class="release-field">
        <span class="release-label">Tom musical / Key *</span>
        <div class="custom-select" data-select-id="musical_key">
          <input type="hidden" name="musical_key" required>
          <button type="button" class="custom-select-trigger"><span>Selecione o tom</span><i data-lucide="chevron-down"></i></button>
          <div class="custom-select-options">${keyOptions}</div>
        </div>
      </div>
    </div>
    <details class="release-advanced-details">
      <summary>
        <span><i data-lucide="sliders-horizontal"></i>Adicionar mais detalhes</span>
        <small>opcional</small>
        <i data-lucide="chevron-down"></i>
      </summary>
      <div class="release-form-grid release-advanced-grid">
        <label class="release-field">
          <span class="release-label">Subgênero <small>opcional</small></span>
          <input name="subgenre" type="text" placeholder="Ex: Dark Trap, Guitar Trap">
        </label>
        <label class="release-field">
          <span class="release-label">Mood / vibe <small>opcional</small></span>
          <input name="mood" type="text" placeholder="Ex: Energético, Melancólico">
        </label>
        <label class="release-field release-wide">
          <span class="release-label">Tags <small>opcional</small></span>
          <input name="release_tags" type="text" placeholder="Ex: trap, melódico, piano, sombrio">
        </label>
        <label class="release-field release-wide">
          <span class="release-label">Descrição curta <small>opcional</small></span>
          <textarea name="description" rows="3" placeholder="Escreva uma breve descrição para o catálogo."></textarea>
        </label>
        <fieldset class="release-radio-group release-wide">
          <legend>Essa faixa já foi lançada antes? <small>opcional</small></legend>
          <div class="release-radio-options">
            <label><input type="radio" name="already_released" value="true"> Sim</label>
            <label><input type="radio" name="already_released" value="false" checked> Não</label>
          </div>
        </fieldset>
      </div>
    </details>
  `;
}

function renderReleaseModeSelector() {
  appView.innerHTML = `<section class="release-mode-selector" aria-labelledby="releaseModeTitle">
    <header class="release-mode-hero">
      <div>
        <h1 id="releaseModeTitle">Lançar música</h1>
        <p>Escolha o melhor formato para publicar seu beat na ANSEND. Envie um arquivo, incorpore um vídeo do YouTube ou importe seu catálogo completo.</p>
      </div>
      <aside class="release-aside-card" aria-label="Resumo do sistema de publicacao">
        <strong>Sistema ANSEND</strong>
        <small>Uploads protegidos, metadados organizados e publicação persistente no catálogo.</small>
      </aside>
    </header>

    <div class="release-progress-stepper" aria-label="Progresso do lançamento">
      <div class="release-progress-step is-active" aria-current="step">
        <span class="release-progress-step-circle">1</span>
        <span class="release-progress-step-label">Formato</span>
      </div>
      <div class="release-progress-step">
        <span class="release-progress-step-circle">2</span>
        <span class="release-progress-step-label">Detalhes</span>
      </div>
      <div class="release-progress-step">
        <span class="release-progress-step-circle">3</span>
        <span class="release-progress-step-label">Arquivos</span>
      </div>
      <div class="release-progress-step">
        <span class="release-progress-step-circle">4</span>
        <span class="release-progress-step-label">Revisão</span>
      </div>
      <div class="release-progress-step">
        <span class="release-progress-step-circle">5</span>
        <span class="release-progress-step-label">Publicação</span>
      </div>
    </div>

    <div class="release-mode-grid">
      <button type="button" class="release-mode-card" data-action="release-mode-choice" data-mode="upload" aria-label="Publicar beat individual por upload">
        <div class="release-mode-card-header">
          <span class="release-mode-icon"><i data-lucide="upload-cloud"></i></span>
          <strong>Beat individual</strong>
          <small>Envie áudio, capa e informações completas do beat.</small>
        </div>
        <ul class="release-mode-benefits">
          <li><i data-lucide="check" class="success-check"></i> Upload protegido</li>
          <li><i data-lucide="check" class="success-check"></i> Capa personalizada</li>
          <li><i data-lucide="check" class="success-check"></i> Publicação no marketplace</li>
        </ul>
        <span class="release-mode-cta">Começar upload <i data-lucide="arrow-right"></i></span>
      </button>

      <button type="button" class="release-mode-card" data-action="release-mode-choice" data-mode="youtube" aria-label="Importar beat individual do YouTube">
        <div class="release-mode-card-header">
          <span class="release-mode-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </span>
          <strong>Importar do YouTube</strong>
          <small>Cole o link do vídeo e mantenha o player oficial dentro da ANSEND.</small>
        </div>
        <ul class="release-mode-benefits">
          <li><i data-lucide="check" class="success-check"></i> Sem precisar subir arquivo</li>
          <li><i data-lucide="check" class="success-check"></i> Player incorporado</li>
          <li><i data-lucide="check" class="success-check"></i> Ideal para beats já publicados</li>
        </ul>
        <span class="release-mode-cta">Colar link <i data-lucide="arrow-right"></i></span>
      </button>

      <button type="button" class="release-mode-card" data-action="release-mode-choice" data-mode="catalog" aria-label="Importar catálogo em lote">
        <div class="release-mode-card-header">
          <span class="release-mode-icon"><i data-lucide="library-big"></i></span>
          <strong>Importar catálogo</strong>
          <small>Publique vários beats de uma vez com upload em lote ou múltiplos links.</small>
        </div>
        <ul class="release-mode-benefits">
          <li><i data-lucide="check" class="success-check"></i> Upload em lote</li>
          <li><i data-lucide="check" class="success-check"></i> Vários links de uma vez</li>
          <li><i data-lucide="check" class="success-check"></i> Economia de tempo para produtores</li>
        </ul>
        <span class="release-mode-cta">Importar catálogo <i data-lucide="arrow-right"></i></span>
      </button>
    </div>

    <footer class="release-mode-note">
      <i data-lucide="shield-check"></i>
      <span>Você revisa tudo antes de publicar. Nenhum beat aparece no marketplace sem sua confirmação.</span>
    </footer>
  </section>`;
  lucide.createIcons();
}

function renderYouTubeBeatUpload() {
  const display = profileDisplayData(activeProfile());
  const beatId = generateUUID();
  const stepLabels = ["Link", "Detalhes", "Preço", "Revisão"];
  const genreList = ["Trap","Funk","Drill","R&B","Boom Bap","Afrobeat","Gospel Trap","Pop","Lo-Fi","Piseiro","Sertanejo","Reggaeton"];
  const noteList = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  
  const keyOptions = noteList.flatMap(n => [
    '<div class="custom-select-option" data-value="' + n + ' Major">' + n + ' Major</div>',
    '<div class="custom-select-option" data-value="' + n + ' Minor">' + n + ' Minor</div>'
  ]).join("");
  const genreOptions = genreList.map(g => '<div class="custom-select-option" data-value="' + g + '">' + g + '</div>').join("");
  
  const stepperHTML = stepLabels.map(function(label, i) {
    return '<button type="button" class="release-step ' + (i === 0 ? "is-active" : "") + '" data-action="release-step" data-step="' + i + '" aria-label="Ir para ' + label + '"><span>' + (i+1) + '</span><strong>' + label + '</strong></button>';
  }).join("");

  appView.innerHTML = '<section class="release-page" aria-label="Importar beat por link do YouTube">'
    + '<div class="release-container">'
    + '<nav class="release-stepper" aria-label="Etapas do cadastro">' + stepperHTML + '</nav>'
    + '<form class="youtube-release-form release-upload-form" data-youtube-release-form data-release-step="0" data-beat-id="' + beatId + '" onsubmit="event.preventDefault();">'
    + '<input type="hidden" name="license_type" value="premium">'
    + '<input type="hidden" name="tags">'

    // PANEL 0 - YouTube Link
    + '<section class="release-panel is-active" data-panel="0">'
    + '<div class="release-panel-header"><h2>Link do Vídeo</h2><p>Cole o link do YouTube para extrairmos a prévia e a imagem da capa de forma automática.</p></div>'
    + '<div class="release-form-grid">'
    + '<label class="release-field release-wide"><span class="release-label">Link do YouTube *</span><input name="youtube_url" type="url" placeholder="https://youtu.be/xxxxxxxxxxx" required></label>'
    + '</div>'
    + '<div class="youtube-release-preview" data-youtube-preview style="margin-top:24px;">'
    + '<i data-lucide="youtube"></i>'
    + '<span>Cole um link válido para gerar a prévia.</span>'
    + '</div>'
    + '</section>'

    // PANEL 1 - Detalhes
    + '<section class="release-panel" data-panel="1">'
    + '<div class="release-panel-header"><h2>Informações do Beat</h2><p>Preencha os metadados principais do beat importado.</p></div>'
    + '<div class="release-form-grid">'
    + '<label class="release-field release-wide"><span class="release-label">Nome do beat *</span><input name="title" type="text" placeholder="Nome do beat" required></label>'
    + '<label class="release-field"><span class="release-label">Produtor</span><input name="producer_name" value="' + htmlEscape(display.name || "ANSEND") + '" required></label>'
    + '<div class="release-field"><span class="release-label">Gênero *</span><div class="custom-select" data-select-id="genre"><input type="hidden" name="genre" value="Trap" required><button type="button" class="custom-select-trigger"><span>Trap</span><i data-lucide="chevron-down"></i></button><div class="custom-select-options">' + genreOptions + '</div></div></div>'
    + '<label class="release-field"><span class="release-label">BPM *</span><input name="bpm" type="number" min="40" max="240" placeholder="140" value="140" required></label>'
    + '<div class="release-field"><span class="release-label">Tom / Key *</span><div class="custom-select" data-select-id="musical_key"><input type="hidden" name="musical_key" value="C Minor" required><button type="button" class="custom-select-trigger"><span>C Minor</span><i data-lucide="chevron-down"></i></button><div class="custom-select-options">' + keyOptions + '</div></div></div>'
    + '<label class="release-field release-wide"><span class="release-label">Tags (separadas por vírgula)</span><input name="release_tags" placeholder="trap, dark, melodic"></label>'
    + '<label class="release-field release-wide"><span class="release-label">Descrição curta</span><textarea name="description" rows="3" placeholder="Descreva o beat."></textarea></label>'
    + '</div>'
    + '</section>'

    // PANEL 2 - Preço e Licença
    + '<section class="release-panel" data-panel="2">'
    + '<div class="release-panel-header"><h2>Licença e Preço</h2><p>Defina o tipo de licença e o valor do beat.</p></div>'
    + '<div class="license-cards-grid">'
    + '<div class="license-info-card" data-license="free"><strong>Free</strong><span class="license-price">Grátis</span><ul><li>Uso não-comercial</li><li>Player incorporado</li><li>Com tag de voz</li></ul></div>'
    + '<div class="license-info-card" data-license="basic"><strong>Básica</strong><span class="license-price">R$ 49,90</span><ul><li>Uso não-comercial</li><li>Até 2.000 streams</li><li>Player incorporado</li></ul></div>'
    + '<div class="license-info-card is-selected" data-license="premium"><strong>Premium</strong><span class="license-price">R$ 99,90</span><ul><li>Uso comercial limitado</li><li>Até 10.000 streams</li><li>Player incorporado</li></ul></div>'
    + '<div class="license-info-card" data-license="exclusive"><strong>Exclusiva</strong><span class="license-price">R$ 499,90</span><ul><li>Uso comercial ilimitado</li><li>Posse total de direitos</li><li>Player incorporado</li></ul></div>'
    + '</div>'
    + '<div class="release-form-grid" style="margin-top:32px;">'
    + '<label class="release-field"><span class="release-label">Preço do Beat (R$) *</span><input name="price" type="number" min="0" step="0.01" value="99.90" required></label>'
    + '<label class="release-field"><span class="release-label">Vendas máximas</span><input name="max_sales" type="number" min="1" value="50" placeholder="Ex: 50"></label>'
    + '<fieldset class="release-radio-group release-wide"><legend>Permitir uso comercial básico?</legend><div class="release-radio-options"><label><input type="radio" name="allow_commercial_use" value="true" checked> Sim</label><label><input type="radio" name="allow_commercial_use" value="false"> Não</label></div></fieldset>'
    + '<label class="release-field release-wide"><span class="release-label">Termos da licença (opcional)</span><textarea name="license_terms" rows="3" placeholder="Termos de uso personalizados..."></textarea></label>'
    + '</div>'
    + '</section>'

    // PANEL 3 - Revisão
    + '<section class="release-panel" data-panel="3">'
    + '<div class="release-panel-header"><h2>Revisão Final</h2><p>Confira todas as informações do beat do YouTube antes de publicar.</p></div>'
    + '<div class="review-grid">'
    + '<div class="review-left">'
    + '<div class="review-cover-wrapper"><img class="review-cover-img" src="assets/ansend-logo-square.png" alt="Thumbnail do beat"></div>'
    + '</div>'
    + '<div class="review-details">'
    + '<div class="review-header-info"><h3 data-review-title>Sem título</h3><p data-review-producer>por Produtor ANSEND</p></div>'
    + '<dl class="review-meta-grid">'
    + '<div class="review-meta-item"><dt>Gênero</dt><dd data-review-genre>-</dd></div>'
    + '<div class="review-meta-item"><dt>BPM</dt><dd data-review-bpm>-</dd></div>'
    + '<div class="review-meta-item"><dt>Tom / Key</dt><dd data-review-key>-</dd></div>'
    + '<div class="review-meta-item"><dt>Preço</dt><dd data-review-price>R$ 0,00</dd></div>'
    + '<div class="review-meta-item"><dt>Licença</dt><dd data-review-license>Premium</dd></div>'
    + '</dl>'
    + '<div class="review-description"><h4>Descrição</h4><p data-review-desc>Sem descrição fornecida.</p></div>'
    + '</div>'
    + '</div>'
    + '<label class="release-rights-check" style="margin-top:32px;"><input type="checkbox" name="rights_confirmed" required> Confirmo que sou dono ou tenho autorização para divulgar este beat na ANSEND.</label>'
    + '</section>'

    + '</form></div>'

    // Bottom Bar
    + '<footer class="release-bottom-bar"><div class="release-bottom-inner">'
    + '<div class="release-footer-track"><img class="release-footer-cover" src="assets/ansend-logo-square.png" alt="Capa"><div><strong data-footer-title>Sem título</strong><small data-footer-artist>' + (display.name || "Produtor ANSEND") + '</small></div></div>'
    + '<div class="release-footer-actions"><button type="button" class="release-back-btn" data-action="release-back" disabled>Voltar</button><button type="button" class="release-next-btn" data-action="release-next">Próximo</button><button type="button" class="release-submit-btn is-primary" data-action="publish-catalog" style="display:none;"><i data-lucide="cloud-check"></i>Publicar beat</button></div>'
    + '</div></footer></section>';

  setupMusicUploadEventListeners();
  syncReleaseForm();
  applyLocaleTextOverrides(appView);
  lucide.createIcons();
}

async function saveYouTubeBeat(form) {
  if (!supabaseClient || !appState.authUser) {
    showToast("Entre na sua conta para publicar.", "shield-alert");
    return;
  }
  
  for (let i = 0; i <= 3; i++) {
    if (!validateReleaseStep(i)) {
      setReleaseStep(i, form);
      return;
    }
  }

  if (!form.elements.rights_confirmed?.checked) {
    showToast("Confirme que voce tem autorizacao para divulgar este beat.", "shield-alert");
    return;
  }
  
  const meta = youtubeMetadataFromUrl(form.elements.youtube_url?.value);
  if (!meta) {
    showToast("Link do YouTube invalido.", "triangle-alert");
    return;
  }
  const duplicate = await findYouTubeDuplicate(meta.youtube_video_id);
  if (duplicate) {
    showToast("Este beat parece ja existir no seu catalogo.", "triangle-alert");
    return;
  }
  const tagsStr = form.elements.release_tags?.value || form.elements.tags?.value || "";
  const tags = tagsStr.split(",").map((tag) => tag.trim()).filter(Boolean);
  const payload = {
    id: generateUUID(),
    title: form.elements.title?.value.trim() || `YouTube ${meta.youtube_video_id}`,
    producer_name: form.elements.producer_name?.value.trim() || activeProfile()?.display_name || "ANSEND",
    genre: form.elements.genre?.value.trim() || "Beat",
    bpm: form.elements.bpm?.value ? Number(form.elements.bpm.value) : null,
    musical_key: form.elements.musical_key?.value.trim() || null,
    tags,
    description: form.elements.description?.value.trim() || null,
    license_type: form.elements.license_type?.value || "premium",
    price: form.elements.price?.value ? Number(form.elements.price.value) : 0,
    status: "published",
    published_at: new Date().toISOString(),
    source_type: "youtube",
    import_source: "youtube_single",
    import_status: "published",
    cover_url: meta.youtube_thumbnail_url,
    ...meta,
  };
  const { data, error } = await publishBeat(payload);
  if (error) {
    console.error("[ANSEND YouTube release] save failed", error);
    showToast(error.message || "Nao foi possivel publicar o beat.", "triangle-alert");
    return;
  }
  data.source_table = "beats";
  appState.publicCatalogItems = dedupeById([data, ...appState.publicCatalogItems.filter((item) => item.id !== data.id)]);
  appState.ownedCatalogItems = dedupeById([data, ...appState.ownedCatalogItems.filter((item) => item.id !== data.id)]);
  showToast("Beat publicado com YouTube.", "youtube");
  await loadCatalogItems();
  location.hash = `beat-${data.id}`;
}

async function findYouTubeDuplicate(videoId) {
  if (!supabaseClient || !appState.authUser || !videoId) return null;
  const { data, error } = await supabaseClient
    .from("beats")
    .select("id,title")
    .eq("user_id", appState.authUser.id)
    .eq("youtube_video_id", videoId)
    .limit(1)
    .maybeSingle();
  if (error) {
    console.warn("[ANSEND import] duplicate check failed", error);
    return null;
  }
  return data || null;
}

function defaultCatalogImportState() {
  return {
    mode: "multi_upload",
    items: [],
    authorized: false,
    isPublishing: false,
    bulk: { genre: "", price: "", license_type: "premium", tags: "", description: "" },
  };
}

function ensureCatalogImportState() {
  if (!appState.catalogImport) appState.catalogImport = defaultCatalogImportState();
  return appState.catalogImport;
}

function catalogStatusLabel(status) {
  return {
    pending: "Pendente",
    valid: "Valido",
    invalid: "Invalido",
    uploading: "Enviando",
    publishing: "Publicando",
    published: "Publicado",
    duplicate: "Duplicado",
    failed: "Falhou",
  }[status] || "Pendente";
}

function catalogImportItemMarkup(item, index) {
  const cover = item.cover_url || item.youtube_thumbnail_url || "assets/ansend-logo-square.png";
  const status = item.status || "pending";
  const disabled = ["uploading", "publishing", "published"].includes(status) ? "disabled" : "";
  return `<article class="catalog-import-item ${status === "invalid" || status === "failed" || status === "duplicate" ? "has-error" : ""}" data-catalog-item-id="${htmlEscape(item.id)}">
    <div class="catalog-import-cover">
      <img src="${htmlEscape(cover)}" alt="Capa de ${htmlEscape(item.title || "beat")}">
      <span>${index + 1}</span>
    </div>
    <div class="catalog-import-fields">
      <div class="catalog-import-head">
        <strong>${htmlEscape(item.source_type === "youtube" ? "YouTube incorporado" : "Arquivo de audio")}</strong>
        <small class="catalog-import-status is-${htmlEscape(status)}">${catalogStatusLabel(status)}</small>
      </div>
      <div class="catalog-import-grid">
        <label>Titulo<input data-action="catalog-item-field" data-field="title" value="${htmlEscape(item.title || "")}" ${disabled}></label>
        <label>Genero<input data-action="catalog-item-field" data-field="genre" value="${htmlEscape(item.genre || "")}" ${disabled}></label>
        <label>BPM<input type="number" min="40" max="240" data-action="catalog-item-field" data-field="bpm" value="${htmlEscape(item.bpm || "")}" ${disabled}></label>
        <label>Key<input data-action="catalog-item-field" data-field="musical_key" value="${htmlEscape(item.musical_key || "")}" ${disabled}></label>
        <label>Preco<input type="number" min="0" step="0.01" data-action="catalog-item-field" data-field="price" value="${htmlEscape(item.price ?? "99.90")}" ${disabled}></label>
        <label>Licenca<select data-action="catalog-item-field" data-field="license_type" ${disabled}>
          ${["basic", "premium", "exclusive", "free"].map((value) => `<option value="${value}" ${String(item.license_type || "premium") === value ? "selected" : ""}>${value}</option>`).join("")}
        </select></label>
        <label class="is-wide">Tags<input data-action="catalog-item-field" data-field="tags" value="${htmlEscape(Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || "")}" ${disabled}></label>
        <label class="is-wide">Descricao<textarea rows="2" data-action="catalog-item-field" data-field="description" ${disabled}>${htmlEscape(item.description || "")}</textarea></label>
      </div>
      ${item.source_label ? `<p class="catalog-import-source">${htmlEscape(item.source_label)}</p>` : ""}
      ${item.error ? `<p class="catalog-import-error">${htmlEscape(item.error)}</p>` : ""}
    </div>
    <button type="button" class="catalog-import-remove" data-action="catalog-remove-item" ${disabled} aria-label="Remover item"><i data-lucide="x"></i></button>
  </article>`;
}

function renderCatalogImportPage() {
  const state = ensureCatalogImportState();
  const validCount = state.items.filter((item) => item.status !== "invalid" && item.status !== "duplicate" && item.status !== "failed" && item.status !== "published").length;
  const invalidCount = state.items.length - validCount;
  
  // Read current step from DOM if exists, to preserve state across re-renders
  const existingForm = document.querySelector(".catalog-import-form");
  const currentStep = existingForm ? Number(existingForm.dataset.releaseStep || 0) : (state.currentStep || 0);
  state.currentStep = currentStep;
  
  const display = profileDisplayData(activeProfile());
  const stepLabels = ["Origem", "Edição Lote", "Itens", "Publicação"];
  
  const stepperHTML = stepLabels.map(function(label, i) {
    const isActive = i === currentStep;
    const isComplete = i < currentStep;
    return '<button type="button" class="release-step ' + (isActive ? "is-active" : (isComplete ? "is-complete" : "")) + '" data-action="release-step" data-step="' + i + '" aria-label="Ir para ' + label + '"><span>' + (isComplete ? '<i data-lucide="check" style="width:14px; height:14px;"></i>' : i+1) + '</span><strong>' + label + '</strong></button>';
  }).join("");

  appView.innerHTML = '<section class="release-page" aria-label="Importar catálogo na ANSEND">'
    + '<div class="release-container">'
    + '<nav class="release-stepper" aria-label="Etapas do cadastro">' + stepperHTML + '</nav>'
    + '<form class="catalog-import-form release-upload-form" data-catalog-import-form data-release-step="' + currentStep + '" onsubmit="event.preventDefault();">'

    // PANEL 0 - Origem (Source Selection)
    + '<section class="release-panel ' + (currentStep === 0 ? "is-active" : "") + '" data-panel="0">'
    + '<div class="release-panel-header"><h2>Importar Catálogo</h2><p>Publique vários beats por upload de áudios ou múltiplos links do YouTube incorporados.</p></div>'
    + '<nav class="catalog-import-mode-tabs" aria-label="Modo de importacao" style="margin-bottom: 24px; display: flex; gap: 12px;">'
    + '<button type="button" class="' + (state.mode === "multi_upload" ? "is-active" : "") + '" data-action="catalog-mode" data-mode="multi_upload"><i data-lucide="files"></i>Enviar arquivos</button>'
    + '<button type="button" class="' + (state.mode === "youtube_links" ? "is-active" : "") + '" data-action="catalog-mode" data-mode="youtube_links"><i data-lucide="youtube"></i>Links do YouTube</button>'
    + '</nav>'
    + (state.mode === "multi_upload" ? 
      '<label class="catalog-import-dropzone" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px; border: 2px dashed rgba(255,255,255,0.08); border-radius: 12px; cursor: pointer; text-align: center; background: rgba(255,255,255,0.015); transition: background 0.2s ease;">'
      + '<input type="file" multiple accept="audio/mpeg,audio/wav,audio/x-wav,audio/flac,audio/mp3,audio/mp4,audio/aac,audio/ogg" data-action="catalog-file-input" style="display:none;">'
      + '<i data-lucide="upload-cloud" style="width: 48px; height: 48px; color: #a1a1aa; margin-bottom: 16px;"></i>'
      + '<strong style="color: #fff; font-size: 16px; display: block; margin-bottom: 8px;">Selecione vários arquivos de áudio</strong>'
      + '<small style="color: #a1a1aa; font-size: 13px;">MP3, WAV, FLAC, M4A, AAC ou OGG. Os arquivos vão para o sistema ANSEND.</small>'
      + '</label>'
      :
      '<div class="catalog-import-youtube-box" style="display: flex; flex-direction: column; gap: 16px;">'
      + '<label class="release-field release-wide"><span class="release-label">Links do YouTube (um por linha)</span><textarea rows="7" data-catalog-youtube-links placeholder="Cole um link por linha. Ex: https://youtu.be/xxxxxxxxxxx" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #fff; padding: 12px; font-family: inherit; font-size: 14px; width: 100%; box-sizing: border-box;"></textarea></label>'
      + '<button type="button" class="an-primary" data-action="catalog-analyze-youtube" style="align-self: flex-start; background: #fff; color: #000; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;"><i data-lucide="scan-line"></i>Analisar links</button>'
      + '</div>'
    )
    + '<div class="catalog-loaded-summary" style="margin-top: 24px; padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.01); display: ' + (state.items.length ? "block" : "none") + ';">'
    + '<strong style="color: #fff;">' + state.items.length + ' item(ns) carregado(s) na fila.</strong>'
    + '</div>'
    + '</section>'

    // PANEL 1 - Edição em Lote
    + '<section class="release-panel ' + (currentStep === 1 ? "is-active" : "") + '" data-panel="1">'
    + '<div class="release-panel-header"><h2>Edição em Lote</h2><p>Aplique metadados comuns a todos os beats válidos de uma vez para economizar tempo.</p></div>'
    + '<div class="catalog-import-bulk-panel" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 24px;">'
    + '<header style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px;">'
    + '<strong style="font-size: 16px; color:#fff;">Campos em lote</strong>'
    + '<small style="color: #a1a1aa;">' + state.items.length + ' itens • ' + validCount + ' válidos' + (invalidCount ? ' • ' + invalidCount + ' com erro' : '') + '</small>'
    + '</header>'
    + '<div style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">'
    + '<label class="release-field"><span class="release-label">Gênero</span><input data-action="catalog-bulk-field" data-field="genre" value="' + htmlEscape(state.bulk.genre) + '" placeholder="Ex: Trap, Funk"></label>'
    + '<label class="release-field"><span class="release-label">Preço (R$)</span><input type="number" min="0" step="0.01" data-action="catalog-bulk-field" data-field="price" value="' + htmlEscape(state.bulk.price) + '" placeholder="Ex: 99.90"></label>'
    + '<label class="release-field"><span class="release-label">Licença</span><select data-action="catalog-bulk-field" data-field="license_type" style="background:#0a0a0a; border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; color:#fff; font-family:inherit;">'
    + ["basic", "premium", "exclusive", "free"].map((value) => '<option value="' + value + '"' + (state.bulk.license_type === value ? " selected" : "") + '>' + value.toUpperCase() + '</option>').join("")
    + '</select></label>'
    + '<label class="release-field"><span class="release-label">Tags</span><input data-action="catalog-bulk-field" data-field="tags" value="' + htmlEscape(state.bulk.tags) + '" placeholder="trap, dark, melodic"></label>'
    + '</div>'
    + '<footer style="display:flex; gap: 12px; margin-top: 12px;">'
    + '<button type="button" class="an-primary" data-action="catalog-apply-bulk" style="background: #fff; color: #000; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;"><i data-lucide="wand-sparkles"></i>Aplicar nos válidos</button>'
    + '<button type="button" class="an-secondary" data-action="catalog-remove-invalid" style="background: transparent; color: #ef4444; border: 1px solid rgba(239,68,68,0.2); padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;"><i data-lucide="circle-x"></i>Remover inválidos</button>'
    + '</footer>'
    + '</div>'
    + '</section>'

    // PANEL 2 - Lista de Itens (Item List)
    + '<section class="release-panel ' + (currentStep === 2 ? "is-active" : "") + '" data-panel="2">'
    + '<div class="release-panel-header"><h2>Revisão por Item</h2><p>Verifique e ajuste os metadados de cada beat individualmente antes de enviar.</p></div>'
    + '<div class="catalog-import-list" style="display: flex; flex-direction: column; gap: 20px;">'
    + (state.items.length ? state.items.map(catalogImportItemMarkup).join("") : '<div class="catalog-import-empty" style="text-align:center; padding: 48px; border: 1px dashed rgba(255,255,255,0.06); border-radius:12px; background:rgba(255,255,255,0.005);"><i data-lucide="library-big" style="width:48px;height:48px;color:#71717a;margin-bottom:12px;"></i><strong style="display:block;color:#fff;margin-bottom:4px;">Nenhum item analisado ainda</strong><p style="color:#71717a;">Volte ao primeiro passo e adicione arquivos ou links.</p></div>')
    + '</div>'
    + '</section>'

    // PANEL 3 - Publicação (Confirm & Submit)
    + '<section class="release-panel ' + (currentStep === 3 ? "is-active" : "") + '" data-panel="3">'
    + '<div class="release-panel-header"><h2>Publicar Catálogo</h2><p>Confirme os termos e direitos autorais para concluir a importação em lote.</p></div>'
    + '<div class="catalog-publish-confirm-box" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 32px; display: flex; flex-direction: column; gap: 24px;">'
    + '<div><strong style="color: #fff; font-size: 18px; display:block; margin-bottom: 8px;">Resumo da Importação</strong>'
    + '<p style="color: #a1a1aa; font-size:14px; margin:0;">Você está prestes a publicar <strong>' + validCount + ' beat(s)</strong> no marketplace da ANSEND.</p>'
    + '</div>'
    + '<label class="release-rights-check catalog-rights" style="margin: 0; display:flex; align-items:center; gap: 10px; cursor: pointer; color:#fff; font-weight:600;"><input type="checkbox" data-action="catalog-rights" ' + (state.authorized ? "checked" : "") + ' style="width: 18px; height: 18px; cursor: pointer;"> Confirmo que tenho direitos ou autorização para publicar todos os beats importados.</label>'
    + '</div>'
    + '</section>'

    + '</form></div>'

    // Bottom Bar
    + '<footer class="release-bottom-bar"><div class="release-bottom-inner">'
    + '<div class="release-footer-track"><img class="release-footer-cover" src="assets/ansend-logo-square.png" alt="Capa"><div><strong data-footer-title>Sem título</strong><small data-footer-artist>' + (display.name || "Produtor ANSEND") + '</small></div></div>'
    + '<div class="release-footer-actions">'
    + '<button type="button" class="release-back-btn" data-action="release-back" disabled>Voltar</button>'
    + '<button type="button" class="release-next-btn" data-action="release-next">Próximo</button>'
    + '<button type="button" class="release-submit-btn is-primary" data-action="publish-catalog" style="display:none;" ' + (state.isPublishing || !validCount ? "disabled" : "") + '><i data-lucide="' + (state.isPublishing ? "loader-circle" : "cloud-check") + '"></i>' + (state.isPublishing ? "Publicando..." : "Publicar catálogo") + '</button>'
    + '</div>'
    + '</div></footer></section>';

  setupMusicUploadEventListeners();
  const activeForm = document.querySelector(".catalog-import-form");
  if (activeForm) {
    setReleaseStep(currentStep, activeForm);
  }
  applyLocaleTextOverrides(appView);
  lucide.createIcons();
}

function addCatalogFiles(files) {
  const state = ensureCatalogImportState();
  const incoming = [...(files || [])];
  const accepted = incoming.map((file, index) => {
    const ext = String(file.name || "").split(".").pop()?.toLowerCase() || "";
    const valid = /^(audio\/|video\/mp4)/i.test(file.type || "") || ["mp3", "wav", "m4a", "aac", "ogg", "flac"].includes(ext);
    const duplicate = state.items.some((item) => item.source_type === "upload" && item.original_file_name === file.name);
    return {
      id: generateUUID(),
      source_type: "upload",
      file,
      title: titleFromFileName(file.name),
      genre: state.bulk.genre || "Beat",
      bpm: "",
      musical_key: "",
      price: state.bulk.price || "99.90",
      license_type: state.bulk.license_type || "premium",
      tags: state.bulk.tags || "",
      description: state.bulk.description || "",
      original_file_name: file.name,
      source_label: file.name,
      sort_order: state.items.length + index,
      status: valid && !duplicate ? "valid" : duplicate ? "duplicate" : "invalid",
      error: valid ? (duplicate ? "Arquivo ja adicionado nesta importacao." : "") : "Formato de audio nao permitido.",
    };
  });
  state.items.push(...accepted);
  renderCatalogImportPage();
}

function analyzeCatalogYoutubeLinks(text) {
  const state = ensureCatalogImportState();
  const lines = String(text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const existing = new Set(state.items.map((item) => item.youtube_video_id).filter(Boolean));
  const items = lines.map((line, index) => {
    const meta = youtubeMetadataFromUrl(line);
    const duplicate = meta?.youtube_video_id && existing.has(meta.youtube_video_id);
    if (meta?.youtube_video_id) existing.add(meta.youtube_video_id);
    return {
      id: generateUUID(),
      source_type: "youtube",
      title: meta ? `YouTube Beat ${meta.youtube_video_id}` : "Link invalido",
      genre: state.bulk.genre || "Beat",
      bpm: "",
      musical_key: "",
      price: state.bulk.price || "99.90",
      license_type: state.bulk.license_type || "premium",
      tags: state.bulk.tags || "",
      description: state.bulk.description || "",
      sort_order: state.items.length + index,
      source_label: line,
      status: meta && !duplicate ? "valid" : duplicate ? "duplicate" : "invalid",
      error: meta ? (duplicate ? "Link duplicado nesta importacao." : "") : "Link do YouTube invalido ou inseguro.",
      ...(meta || {}),
    };
  });
  state.items.push(...items);
  renderCatalogImportPage();
}

function updateCatalogImportItem(itemId, field, value) {
  const state = ensureCatalogImportState();
  const item = state.items.find((entry) => entry.id === itemId);
  if (!item) return;
  item[field] = field === "tags" ? value : value;
}

function applyCatalogBulk() {
  const state = ensureCatalogImportState();
  state.items.forEach((item) => {
    if (["invalid", "duplicate", "failed", "published"].includes(item.status)) return;
    Object.entries(state.bulk).forEach(([field, value]) => {
      if (value !== "") item[field] = value;
    });
  });
  renderCatalogImportPage();
}

async function findUploadDuplicate(fileName) {
  if (!supabaseClient || !appState.authUser || !fileName) return null;
  const { data, error } = await supabaseClient
    .from("beats")
    .select("id,title")
    .eq("user_id", appState.authUser.id)
    .eq("original_file_name", fileName)
    .limit(1)
    .maybeSingle();
  if (error) {
    console.warn("[ANSEND import] file duplicate check failed", error);
    return null;
  }
  return data || null;
}

async function uploadCatalogAudioFile(item, batchId, progressCallback) {
  const file = item.file;
  const config = STORAGE_UPLOAD_LIMITS.audio;
  const safeExt = validateStorageFile(file, config);
  const { user } = await ensureStorageAuthSession();
  const base = sanitizeStorageSegment(file.name.replace(/\.[^.]+$/, ""), "audio");
  const path = `${user.id}/${config.folder}/${batchId}/audio-${base}-${Date.now()}-${generateUUID().slice(0, 8)}.${safeExt}`;
  progressCallback?.(30);
  const result = await uploadStorageFile(file, { type: "audio", path, timeoutMs: 90000 });
  progressCallback?.(100);
  return { url: result.publicUrl, path: result.path, bucket: result.bucket, size: file.size };
}

async function runWithConcurrency(items, limit, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index], index);
    }
  });
  await Promise.all(runners);
}

async function createCatalogImportBatch(state, totalItems) {
  const fallback = { id: generateUUID(), status: "processing", fallback: true };
  if (!supabaseClient || !appState.authUser) return fallback;
  const { data, error } = await supabaseClient
    .from("catalog_import_batches")
    .insert({
      user_id: appState.authUser.id,
      title: `Catalogo ${new Date().toLocaleDateString("pt-BR")}`,
      source_mode: state.mode,
      total_items: totalItems,
      valid_items: totalItems,
      status: "processing",
    })
    .select()
    .single();
  if (error) {
    console.warn("[ANSEND import] batch table unavailable, continuing without batch row.", error);
    return fallback;
  }
  return data;
}

function catalogItemPayload(item, batch, extra = {}) {
  const tags = Array.isArray(item.tags) ? item.tags : String(item.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
  const now = new Date().toISOString();
  return {
    id: generateUUID(),
    title: String(item.title || "Beat sem titulo").trim(),
    producer_name: activeProfile()?.artistic_name || activeProfile()?.full_name || appState.authUser?.email?.split("@")[0] || "ANSEND",
    genre: String(item.genre || "Beat").trim(),
    bpm: item.bpm ? Number(item.bpm) : null,
    musical_key: item.musical_key || null,
    tags,
    description: item.description || null,
    license_type: item.license_type || "premium",
    price: item.price !== "" ? Number(item.price || 0) : 0,
    status: "published",
    published_at: now,
    source_type: item.source_type,
    catalog_batch_id: batch?.fallback ? null : batch?.id || null,
    import_source: item.source_type === "youtube" ? "youtube_links" : "multi_upload",
    import_status: "published",
    original_file_name: item.original_file_name || null,
    sort_order: item.sort_order || 0,
    cover_url: item.cover_url || item.youtube_thumbnail_url || "assets/ansend-logo-square.png",
    ...extra,
  };
}

async function publishCatalogImport() {
  const state = ensureCatalogImportState();
  if (!supabaseClient || !appState.authUser) {
    showToast("Entre na sua conta para publicar.", "shield-alert");
    return;
  }
  if (!state.authorized) {
    showToast("Confirme que voce tem direitos sobre os beats.", "shield-alert");
    return;
  }
  const publishable = state.items.filter((item) => !["invalid", "duplicate", "failed", "published"].includes(item.status));
  if (!publishable.length) {
    showToast("Nao ha itens validos para publicar.", "triangle-alert");
    return;
  }
  state.isPublishing = true;
  renderCatalogImportPage();
  const batch = await createCatalogImportBatch(state, publishable.length);
  let published = 0;
  let failed = 0;

  await runWithConcurrency(publishable, 3, async (item) => {
    try {
      item.status = item.source_type === "upload" ? "uploading" : "publishing";
      renderCatalogImportPage();
      if (item.source_type === "youtube") {
        const duplicate = await findYouTubeDuplicate(item.youtube_video_id);
        if (duplicate) throw new Error("Este link ja existe no seu catalogo.");
        const payload = catalogItemPayload(item, batch, {
          youtube_url: item.youtube_url,
          youtube_video_id: item.youtube_video_id,
          youtube_embed_url: item.youtube_embed_url,
          youtube_thumbnail_url: item.youtube_thumbnail_url,
          youtube_title: item.youtube_title || item.title,
          youtube_channel_title: item.youtube_channel_title || null,
        });
        item.status = "publishing";
        const { data, error } = await publishBeat(payload);
        if (error) throw error;
        data.source_table = "beats";
        appState.publicCatalogItems = dedupeById([data, ...appState.publicCatalogItems]);
        appState.ownedCatalogItems = dedupeById([data, ...appState.ownedCatalogItems]);
      } else {
        const duplicate = await findUploadDuplicate(item.original_file_name);
        if (duplicate) throw new Error("Arquivo ja publicado no seu catalogo.");
        const uploaded = await uploadCatalogAudioFile(item, batch.id);
        const payload = catalogItemPayload(item, batch, {
          audio_url: uploaded.url,
          audio_path: uploaded.path,
          file_size: uploaded.size,
        });
        item.status = "publishing";
        const { data, error } = await publishBeat(payload);
        if (error) throw error;
        data.source_table = "beats";
        appState.publicCatalogItems = dedupeById([data, ...appState.publicCatalogItems]);
        appState.ownedCatalogItems = dedupeById([data, ...appState.ownedCatalogItems]);
      }
      item.status = "published";
      item.error = "";
      published += 1;
    } catch (error) {
      item.status = "failed";
      item.error = error.message || "Nao foi possivel publicar este item.";
      failed += 1;
      console.error("[ANSEND import] item failed", error);
    }
  });

  if (!batch?.fallback) {
    await supabaseClient
      .from("catalog_import_batches")
      .update({
        status: failed && published ? "partial" : failed ? "failed" : "completed",
        published_items: published,
        failed_items: failed,
      })
      .eq("id", batch.id);
  }
  state.isPublishing = false;
  syncCatalogCompatibilityState();
  await loadCatalogItems();
  renderCatalogImportPage();
  showToast(failed ? `Catalogo publicado parcialmente: ${published} ok, ${failed} falharam.` : "Catalogo publicado com sucesso.", failed ? "triangle-alert" : "cloud-check");
}

function renderMusicUpload(mode = appState.releaseMode || "selector") {
  if (mode === "selector" && appState.authUser?.email === "artist@example.com") {
    mode = "upload";
  }
  if (!supabaseClient || !appState.authUser) {
    debugAuth("release_auth_blocked", { reason: !supabaseClient ? "supabase_not_configured" : "render_no_session" });
    appView.innerHTML = `
      <section class="release-fallback-page" aria-label="Acesso Negado" style="max-width:600px; margin:80px auto; padding:40px 32px; background:#080808; border:1px solid #1F1F1F; border-radius:16px; text-align:center;">
        <div class="release-fallback-head" style="margin-bottom:32px;">
          <i data-lucide="shield-alert" style="width:48px; height:48px; color:#71717A; margin:0 auto 16px;"></i>
          <h2 style="font-size:24px; color:#fff; font-weight:700; margin-top:12px; letter-spacing:-0.02em;">Entre para lançar música</h2>
          <p style="color:#71717A; font-size:14px; margin-top:8px; line-height:1.5;">Você precisa criar uma conta ou fazer login para publicar beats na plataforma.</p>
        </div>
        <button type="button" data-route="vendedor" style="background:#ffffff; border:none; color:#000000; font-weight:600; padding:12px 28px; border-radius:8px; cursor:pointer; font-size:14px;">Entrar / Criar conta</button>
      </section>`;
    lucide.createIcons();
    return;
  }
  const profile = activeProfile();
  const display = profileDisplayData(profile);
  const releaseProducerName = display.name || profile?.artistic_name || profile?.full_name || profile?.username || appState.authUser?.email?.split("@")[0] || "ANSEND";
  const beatId = generateUUID();
  initializeDefaultReleaseLicenses(beatId);
  const stepLabels = ["Detalhes", "Capa", "Arquivos", "Licenças", "Revisão"];
  const genreList = ["Trap","Funk","Drill","R&B","Boom Bap","Afrobeat","Gospel Trap","Pop","Lo-Fi","Piseiro","Sertanejo","Reggaeton"];
  const noteList = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
  const keyOptions = noteList.flatMap(n => [
    '<div class="custom-select-option" data-value="' + n + ' Major">' + n + ' Major</div>',
    '<div class="custom-select-option" data-value="' + n + ' Minor">' + n + ' Minor</div>'
  ]).join("");
  const genreOptions = genreList.map(g => '<div class="custom-select-option" data-value="' + g + '">' + g + '</div>').join("");
  const stepperHTML = stepLabels.map(function(label, i) {
    return '<button type="button" class="release-step ' + (i === 0 ? "is-active" : "") + '" data-action="release-step" data-step="' + i + '" aria-label="Ir para ' + label + '"><span>' + (i+1) + '</span><strong>' + label + '</strong></button>';
  }).join("");

  appView.innerHTML = '<section class="release-page" aria-label="Cadastrar música na ANSEND">'
    + '<div class="release-container">'
    + '<nav class="release-stepper" aria-label="Etapas do cadastro">' + stepperHTML + '</nav>'
    + '<form class="release-upload-form" data-release-step="0" data-beat-id="' + beatId + '" onsubmit="event.preventDefault();">'
    + '<input type="hidden" name="kind" value="beat"><input type="hidden" name="status" value="draft">'
    + '<input type="hidden" name="cover_url"><input type="hidden" name="cover_path">'
    + '<input type="hidden" name="audio_url"><input type="hidden" name="audio_path">'
    + '<input type="hidden" name="mp3_url"><input type="hidden" name="mp3_path">'
    + '<input type="hidden" name="wav_url"><input type="hidden" name="wav_path">'
    + '<input type="hidden" name="stems_url"><input type="hidden" name="stems_path">'
    + '<input type="hidden" name="audio_original_name"><input type="hidden" name="audio_mime_type"><input type="hidden" name="audio_size_bytes"><input type="hidden" name="audio_duration_seconds">'
    + '<input type="hidden" name="mp3_original_name"><input type="hidden" name="mp3_mime_type"><input type="hidden" name="mp3_size_bytes"><input type="hidden" name="mp3_duration_seconds">'
    + '<input type="hidden" name="wav_original_name"><input type="hidden" name="wav_mime_type"><input type="hidden" name="wav_size_bytes"><input type="hidden" name="wav_duration_seconds">'
    + '<input type="hidden" name="stems_original_name"><input type="hidden" name="stems_mime_type"><input type="hidden" name="stems_size_bytes">'
    + '<input type="hidden" name="duration_seconds"><input type="hidden" name="file_size">'
    + '<input type="hidden" name="tags">'
    + '<input type="hidden" name="producer_name" value="' + htmlEscape(releaseProducerName) + '">'

    // STEP 0 - Detalhes
    + '<section class="release-panel is-active" data-panel="0">'
    + '<div class="release-panel-header"><h2>Informações do Beat</h2><p>Adicione as informações principais para organizar seu beat no catálogo.</p></div>'
    + '<div class="release-form-grid">'
    + '<label class="release-field release-wide"><span class="release-label">Título do release / beat *</span><input name="title" type="text" placeholder="Ex: Chill Vibing Trap Beat" required></label>'
    + '<label class="release-field"><span class="release-label">Artista / Produtor *</span><input name="producer_name" type="text" value="' + (display.name || "") + '" placeholder="Nome artístico" required></label>'
    + '<div class="release-field"><span class="release-label">Gênero *</span><div class="custom-select" data-select-id="genre"><input type="hidden" name="genre" required><button type="button" class="custom-select-trigger"><span>Selecione o gênero</span><i data-lucide="chevron-down"></i></button><div class="custom-select-options">' + genreOptions + '</div></div></div>'
    + '<label class="release-field"><span class="release-label">Subgênero</span><input name="subgenre" type="text" placeholder="Ex: Dark Trap, Guitar Trap"></label>'
    + '<label class="release-field"><span class="release-label">BPM *</span><input name="bpm" type="number" min="40" max="240" placeholder="Ex: 140" required></label>'
    + '<div class="release-field"><span class="release-label">Tom / Key *</span><div class="custom-select" data-select-id="musical_key"><input type="hidden" name="musical_key" required><button type="button" class="custom-select-trigger"><span>Selecione o tom</span><i data-lucide="chevron-down"></i></button><div class="custom-select-options">' + keyOptions + '</div></div></div>'
    + '<label class="release-field"><span class="release-label">Mood / vibe</span><input name="mood" type="text" placeholder="Ex: Enérgico, Melancólico"></label>'
    + '<label class="release-field release-wide"><span class="release-label">Tags (separadas por vírgula)</span><input name="release_tags" type="text" placeholder="Ex: trap, melódico, piano, sombrio"></label>'
    + '<label class="release-field release-wide"><span class="release-label">Descrição curta</span><textarea name="description" rows="3" placeholder="Escreva uma breve descrição para o catálogo."></textarea></label>'
    + '<fieldset class="release-radio-group release-wide"><legend>Essa faixa já foi lançada antes?</legend><div class="release-radio-options"><label><input type="radio" name="already_released" value="true"> Sim</label><label><input type="radio" name="already_released" value="false" checked> Não</label></div></fieldset>'
    + '</div></section>'

    // STEP 1 — Capa
    + '<section class="release-panel" data-panel="1">'
    + '<div class="release-panel-header"><h2>Capa do Beat</h2><p>Envie uma capa quadrada de alta qualidade. Recomendamos 3000x3000px.</p></div>'
    + '<div class="release-upload-layout">'
    + '<div class="release-dropzone release-cover-drop" data-upload-drop="cover"><input class="release-file-input" type="file" accept="image/png,image/jpeg,image/webp" data-upload-type="cover"><div class="release-upload-icon"><i data-lucide="image"></i></div><strong>Arraste ou selecione a capa</strong><small>JPG, PNG ou WEBP · mínimo 1400x1400px</small><img class="release-cover-preview" alt="Preview da capa"><p class="release-upload-error" hidden></p><div class="upload-progress-container" style="display:none;"><div class="upload-progress-header"><span>Enviando capa...</span><span class="upload-progress-percent">0%</span></div><div class="upload-progress-track"><div class="upload-progress-bar"></div></div></div></div>'
    + '<div class="release-requirements"><strong>Recomendações</strong><ul><li>Imagem quadrada perfeita (1:1)</li><li>Mínimo 1400x1400px (ideal 3000x3000px)</li><li>Sem textos pequenos ou logos adicionais</li><li>Sem imagens borradas ou pixeladas</li></ul><div class="cover-actions-container" style="display:none;margin-top:16px;"><button type="button" class="release-remove-btn" data-action="remove-cover"><i data-lucide="trash-2"></i> Remover / Trocar</button></div></div>'
    + '</div></section>'

    // STEP 2 — Arquivos
    + '<section class="release-panel" data-panel="2">'
    + '<div class="release-panel-header"><h2>Upload de Arquivos</h2><p>Envie o áudio de preview e os arquivos correspondentes para entrega segura.</p></div>'
    + '<div class="release-upload-layout" style="display: flex; flex-direction: column; gap: 20px;">'
    + '  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">'
    + '    <div class="release-dropzone release-audio-drop" data-upload-drop="audio" style="min-height: 140px;">'
    + '      <input class="release-file-input" type="file" accept="audio/mpeg,audio/wav,audio/x-wav,audio/flac,audio/mp3" data-upload-type="audio">'
    + '      <div class="release-upload-icon"><i data-lucide="music"></i></div>'
    + '      <strong>Áudio de Preview (Público) *</strong>'
    + '      <small>MP3, WAV ou FLAC com tag (opcional)</small>'
    + '      <p class="release-upload-error" hidden></p>'
    + '      <div class="upload-progress-container" style="display:none;">'
    + '        <div class="upload-progress-header"><span>Enviando preview...</span><span class="upload-progress-percent">0%</span></div>'
    + '        <div class="upload-progress-track"><div class="upload-progress-bar"></div></div>'
    + '      </div>'
    + '    </div>'
    + '    <div class="release-requirements">'
    + '      <strong>Áudio Preview</strong>'
    + '      <div class="release-audio-preview" style="display:none; flex-direction: column; gap: 8px;">'
    + '        <div class="release-audio-preview-header" style="display:flex; justify-content:space-between; align-items:center;">'
    + '          <span style="color:#22c55e; font-weight:bold; font-size:12px;">Pronto</span>'
    + '          <button type="button" class="release-remove-btn" data-action="remove-audio"><i data-lucide="trash-2"></i> Remover</button>'
    + '        </div>'
    + '        <div class="release-audio-info" style="display:flex; gap:8px; align-items:center;">'
    + '          <i data-lucide="file-audio" style="width:24px;height:24px;"></i>'
    + '          <div class="release-audio-meta">'
    + '            <strong data-audio-name style="font-size:12px; display:block; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">Nome do arquivo.wav</strong>'
    + '            <small data-audio-size style="font-size:10px; color:var(--beat-muted);">0 MB · 0:00</small>'
    + '          </div>'
    + '        </div>'
    + '        <audio class="release-audio-player" controls preload="metadata" style="width:100%; height:32px;"></audio>'
    + '      </div>'
    + '      <p style="font-size:11px; color:var(--beat-muted); margin-top:8px;">Este arquivo ficará acessível publicamente no player da página do beat. Se desejar, adicione tags de voz (tagged) para proteger sua criação.</p>'
    + '    </div>'
    + '  </div>'
    + '  <div style="border-top: 1px solid var(--beat-border); margin: 10px 0;"></div>'
    + '  <h3 style="font-size: 15px; font-weight: 600; color: #fff; margin: 0 0 10px;">Arquivos de Entrega Segura (Privados)</h3>'
    + '  <div style="display: flex; flex-direction: column; gap: 16px;">'
    + '    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; align-items: center;">'
    + '      <div class="release-dropzone release-secure-mp3-drop" data-upload-drop="secure_mp3" style="min-height: 100px;">'
    + '        <input class="release-file-input" type="file" accept="audio/mpeg,audio/mp3" data-upload-type="secure_mp3">'
    + '        <div class="release-upload-icon"><i data-lucide="shield-check"></i></div>'
    + '        <strong>MP3 de Alta Qualidade *</strong>'
    + '        <small>Arquivo limpo (sem tags) para o comprador</small>'
    + '        <p class="release-upload-error" hidden></p>'
    + '        <div class="upload-progress-container" style="display:none;">'
    + '          <div class="upload-progress-header"><span>Enviando MP3 seguro...</span><span class="upload-progress-percent">0%</span></div>'
    + '          <div class="upload-progress-track"><div class="upload-progress-bar"></div></div>'
    + '        </div>'
    + '      </div>'
    + '      <div>'
    + '        <div class="secure-mp3-preview" style="display:none; background:#0f0f0f; border:1px solid var(--beat-border); border-radius:6px; padding:10px; font-size:12px;">'
    + '          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">'
    + '            <strong style="color:#22c55e;">Enviado</strong>'
    + '            <button type="button" class="release-remove-btn" data-action="remove-secure-mp3" style="font-size:11px; background:transparent; border:0; color:#ff3b30; cursor:pointer;"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>'
    + '          </div>'
    + '          <span data-secure-mp3-name style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#fff;">mp3-seguro.mp3</span>'
    + '        </div>'
    + '        <button type="button" class="an-secondary use-preview-as-delivery-btn" data-target="secure_mp3" style="font-size:11px; padding:6px 12px; height:auto; margin-top:4px;">Usar o mesmo arquivo do Preview</button>'
    + '      </div>'
    + '    </div>'
    + '    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; align-items: center;">'
    + '      <div class="release-dropzone release-secure-wav-drop" data-upload-drop="secure_wav" style="min-height: 100px;">'
    + '        <input class="release-file-input" type="file" accept="audio/wav,audio/x-wav" data-upload-type="secure_wav">'
    + '        <div class="release-upload-icon"><i data-lucide="shield-check"></i></div>'
    + '        <strong>WAV Masterizado (Obrigatório se Lease Premium ativa)</strong>'
    + '        <small>WAV de alta fidelidade sem perda</small>'
    + '        <p class="release-upload-error" hidden></p>'
    + '        <div class="upload-progress-container" style="display:none;">'
    + '          <div class="upload-progress-header"><span>Enviando WAV seguro...</span><span class="upload-progress-percent">0%</span></div>'
    + '          <div class="upload-progress-track"><div class="upload-progress-bar"></div></div>'
    + '        </div>'
    + '      </div>'
    + '      <div>'
    + '        <div class="secure-wav-preview" style="display:none; background:#0f0f0f; border:1px solid var(--beat-border); border-radius:6px; padding:10px; font-size:12px;">'
    + '          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">'
    + '            <strong style="color:#22c55e;">Enviado</strong>'
    + '            <button type="button" class="release-remove-btn" data-action="remove-secure-wav" style="font-size:11px; background:transparent; border:0; color:#ff3b30; cursor:pointer;"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>'
    + '          </div>'
    + '          <span data-secure-wav-name style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#fff;">wav-seguro.wav</span>'
    + '        </div>'
    + '        <button type="button" class="an-secondary use-preview-as-delivery-btn" data-target="secure_wav" style="font-size:11px; padding:6px 12px; height:auto; margin-top:4px;">Usar o mesmo arquivo do Preview</button>'
    + '      </div>'
    + '    </div>'
    + '    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; align-items: center;">'
    + '      <div class="release-dropzone release-secure-stems-drop" data-upload-drop="secure_stems" style="min-height: 100px;">'
    + '        <input class="release-file-input" type="file" accept="application/zip,application/x-zip-compressed" data-upload-type="secure_stems">'
    + '        <div class="release-upload-icon"><i data-lucide="archive"></i></div>'
    + '        <strong>ZIP de Stems (Obrigatório se Exclusiva ativa)</strong>'
    + '        <small>Pistas individuais do beat em formato ZIP</small>'
    + '        <p class="release-upload-error" hidden></p>'
    + '        <div class="upload-progress-container" style="display:none;">'
    + '          <div class="upload-progress-header"><span>Enviando Stems ZIP...</span><span class="upload-progress-percent">0%</span></div>'
    + '          <div class="upload-progress-track"><div class="upload-progress-bar"></div></div>'
    + '        </div>'
    + '      </div>'
    + '      <div>'
    + '        <div class="secure-stems-preview" style="display:none; background:#0f0f0f; border:1px solid var(--beat-border); border-radius:6px; padding:10px; font-size:12px;">'
    + '          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">'
    + '            <strong style="color:#22c55e;">Enviado</strong>'
    + '            <button type="button" class="release-remove-btn" data-action="remove-secure-stems" style="font-size:11px; background:transparent; border:0; color:#ff3b30; cursor:pointer;"><i data-lucide="trash-2" style="width:14px; height:14px;"></i></button>'
    + '          </div>'
    + '          <span data-secure-stems-name style="display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#fff;">stems.zip</span>'
    + '        </div>'
    + '      </div>'
    + '    </div>'
    + '  </div>'
    + '</div></section>'

    // STEP 3 — Licenças
    + '<section class="release-panel" data-panel="3">'
    + '<div class="release-panel-header"><h2>Licenças e Valores</h2><p>Defina individualmente os valores e ative ou configure os termos de cada licença.</p></div>'
    + '<div class="release-licenses-container"></div>'
    + '<div style="margin-top: 16px;">'
    + '  <button type="button" class="an-secondary add-custom-license-btn" style="width:100%; border-style:dashed; height:45px; display:flex; justify-content:center; align-items:center; gap:8px;">'
    + '    <i data-lucide="plus-circle" style="width:18px; height:18px;"></i>'
    + '    + Adicionar outro tipo de licença'
    + '  </button>'
    + '</div>'
    + '</section>'

    // STEP 4 - Revisão
    + '<section class="release-panel" data-panel="4">'
    + '<div class="release-panel-header"><h2>Revisão Final</h2><p>Confira todas as informações e licenças ativas antes de publicar.</p></div>'
    + '<div class="review-grid"><div class="review-left"><div class="review-cover-wrapper"><img class="review-cover-img" src="assets/ansend-logo-square.png" alt="Capa do beat"></div><div class="review-audio-section"><audio class="review-audio-player" controls preload="metadata"></audio></div></div>'
    + '<div class="review-details"><div class="review-header-info"><h3 data-review-title>Sem título</h3><p data-review-producer>por Produtor ANSEND</p></div>'
    + '<dl class="review-meta-grid"><div class="review-meta-item"><dt>Gênero</dt><dd data-review-genre>-</dd></div><div class="review-meta-item"><dt>BPM</dt><dd data-review-bpm>-</dd></div><div class="review-meta-item"><dt>Tom / Key</dt><dd data-review-key>-</dd></div><div class="review-meta-item"><dt>Licenças ativas e preços</dt><dd data-review-price>Nenhuma licença ativa</dd></div><div class="review-meta-item"><dt>Lista de licenças</dt><dd data-review-license>-</dd></div><div class="review-meta-item"><dt>Arquivos enviados</dt><dd data-review-files>-</dd></div></dl>'
    + '<div class="review-description"><h4>Descrição</h4><p data-review-desc>Sem descrição fornecida.</p></div></div></div></section>'

    + '</form></div>'

    // Bottom Bar
    + '<footer class="release-bottom-bar"><div class="release-bottom-inner">'
    + '<div class="release-footer-track"><img class="release-footer-cover" src="assets/ansend-logo-square.png" alt="Capa"><div><strong data-footer-title>Sem título</strong><small data-footer-artist>' + (display.name || "Produtor ANSEND") + '</small></div></div>'
    + '<div class="release-footer-actions"><button type="button" class="release-back-btn" data-action="release-back" disabled>Voltar</button><button type="button" class="release-draft-btn" data-action="save-draft">Salvar Rascunho</button><button type="button" class="release-next-btn" data-action="release-next">Próximo</button><button type="button" class="release-submit-btn" data-action="publish-catalog" style="display:none;">Publicar</button></div>'
    + '</div></footer></section>';

  hydrateReleaseDetailsStep(releaseFormElement(), releaseProducerName, genreOptions, keyOptions);
  setupMusicUploadEventListeners();
  prepareReleaseFilesLayout(releaseFormElement());
  refreshReleaseLicensesUI();
  void restoreReleaseCoverDraft();
  syncReleaseForm();
  applyLocaleTextOverrides(appView);
  lucide.createIcons();
}


function renderMusicUploadFallback(error) {
  const display = profileDisplayData(activeProfile());
  const errorNote = error?.message
    ? `<small class="release-fallback-error" style="color:#ef4444; margin-top:8px; display:block;">Render seguro ativado: ${error.message}</small>`
    : "";
  appView.innerHTML = `
  <section class="release-fallback-page" aria-label="Cadastrar música" style="max-width:600px; margin:80px auto; padding:40px 32px; background:#080808; border:1px solid #1F1F1F; border-radius:16px; text-align:center;">
    <div class="release-fallback-head" style="margin-bottom:32px;">
      <span style="color:#A1A1AA; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing: 0.1em;">ANSEND Release</span>
      <h2 style="font-size:24px; color:#fff; font-weight:700; margin-top:12px; letter-spacing:-0.02em;">Lançar música</h2>
      <p style="color:#71717A; font-size:14px; margin-top:8px; line-height: 1.5;">Cadastre capa, áudio, licença e preço para publicar no seu catálogo.</p>
      ${errorNote}
    </div>
    <button type="button" onclick="renderMusicUpload();" style="background:#ffffff; border:none; color:#000000; font-weight:600; padding:12px 28px; border-radius:8px; cursor:pointer; font-size:14px; transition: opacity 0.2s ease;">Tentar recarregar fluxo completo</button>
  </section>`;
}


function renderProfileLegacy() {
  const profile = activeProfile();
  const display = profileDisplayData(profile);
  const items = visibleCatalogItems();
  const published = items.filter((item) => item.status === "published").length;
  const drafts = items.filter((item) => item.status !== "published").length;
  const favoritesCount = appState.favorites.size;
  const purchasesCount = appState.purchases.length;
  const beats = items.filter((item) => item.kind === "beat").length;
  const musicas = items.filter((item) => item.kind === "musica").length;
  const roleLabel = display.roleLabel;
  const accountStatus = appState.authUser
    ? "Conta conectada"
    : isSupabaseConfigured
      ? "Entre para sincronizar sua conta"
      : "Modo local ativo";

  let userName = profile?.artistic_name || profile?.full_name || "Perfil ANSEND";
  let userAvatar = (profile?.image !== undefined && avatarImages && avatarImages.length)
    ? img(avatarImages[profile.image % avatarImages.length])
    : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80";

  const role = profile?.account_role || "produtor";
  let subtitleRole = "Produtor • Beatmaker • Sound Designer";
  let bioText = "Produtor musical especializado em Trap, R&B e sons melódicos. Criando identidades sonoras, arranjos dinâmicos e mixagens profissionais de alta fidelidade para lançamentos urbanos.";
  let specialties = ["Produção Musical", "Mixagem", "Masterização", "Sound Design"];
  let location = "São Paulo, Brasil";
  
  if (role === "artista") {
    subtitleRole = "Artista • Compositor • Intérprete";
    bioText = "Compositor e vocalista independente focado em novos fluxos do Rap, Trap e R&B. Colaborando com produtores para desenvolver hooks marcantes e identidades autênticas.";
    specialties = ["Composição", "Performance Vocal", "Toplining", "Direção de Voz"];
    location = "Salvador, Brasil";
  } else if (role === "curador") {
    subtitleRole = "Curador • Playlist Manager • Editorial";
    bioText = "Curador musical e criador de tendências. Gerenciando playlists influentes de Trap, Drill e R&B, conectando artistas independentes com novos ouvintes diariamente.";
    specialties = ["Curadoria Editorial", "Playlist Placement", "Posicionamento", "Marketing"];
    location = "Rio de Janeiro, Brasil";
  } else if (role === "designer") {
    subtitleRole = "Designer Visual • Diretor de Arte";
    bioText = "Desenvolvedor de universos visuais para lançamentos musicais. Especializado em capas digitais 3D, canvas do Spotify, animações e branding completo para EPs e singles.";
    specialties = ["Capa de Single/EP", "Modelagem 3D", "Canvas", "Motion Graphics"];
    location = "Belo Horizonte, Brasil";
  } else if (role === "marketing") {
    subtitleRole = "Estrategista de Marketing • Gestor de Tráfego";
    bioText = "Estrategista focado em impulsionar lançamentos musicais nas plataformas de streaming. Campanhas de tráfego pago, crescimento de audiência e análise de dados de funil.";
    specialties = ["Tráfego Pago (ADS)", "Estratégia de Lançamento", "Growth", "Análise de Dados"];
    location = "São Paulo, Brasil";
  }

  userName = display.name;
  userAvatar = display.avatar;
  subtitleRole = display.headline;
  bioText = display.bio;
  specialties = display.styles;
  location = display.location;
  const socialLinks = [
    ["instagram", "Instagram", display.links.instagram],
    ["youtube", "YouTube", display.links.youtube],
    ["music-4", "Spotify", display.links.spotify],
    ["globe", "Site", display.links.website],
  ].filter(([, , url]) => url);
  const recentProfileItems = [
    ...items.slice(0, 3).map((item) => ["music", item.title, item.status === "published" ? "Publicado no catalogo" : "Salvo como rascunho"]),
    ...appState.orders.slice(0, 2).map((order) => ["shopping-bag", findBeat(order.beatId)?.title || "Beat indisponivel", order.status || "Pedido registrado"]),
  ];

  const catalogCards = items.length ? items.map((item, index) => {
    const fallbackCover = item.kind === "musica" ? img("photo-1511379938547-c1f69419868d") : img("photo-1493225457124-a3eb161ffa5f");
    const price = Number(item.price || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const isPublished = item.status === "published";
    
    return `<tr class="profile-catalog-row">
      <td class="col-play">
        <div class="track-play-cell">
          <span class="track-number">${index + 1}</span>
          <button type="button" class="track-play-btn" data-action="play-catalog" data-id="${item.id}" aria-label="Tocar ${item.title}">
            <span class="player-state-icon" aria-hidden="true">${playerControlIconMarkup("play")}</span>
          </button>
        </div>
      </td>
      <td class="col-title">
        <div class="track-title-cell">
          <img class="track-cover-img" src="${item.cover_url || fallbackCover}" alt="Capa de ${item.title}">
          <div class="track-title-info">
            <strong>${item.title}</strong>
            <small>${item.producer_name || item.artist_name || profile?.artistic_name || "ANSEND"}</small>
          </div>
        </div>
      </td>
      <td class="col-genre">
        <span class="track-genre-tag">${item.genre}</span>
        ${item.bpm ? `<span class="track-bpm-tag">${item.bpm} BPM</span>` : ""}
      </td>
      <td class="col-price">
        <div class="track-price-cell">
          <strong>${price}</strong>
          <small>${item.license_type || "Premium"}</small>
        </div>
      </td>
      <td class="col-status">
        <span class="track-status-badge ${isPublished ? "is-published" : "is-draft"}">
          ${isPublished ? "Publicado" : "Rascunho"}
        </span>
      </td>
      <td class="col-actions">
        <div class="track-actions-cell">
          <button type="button" class="track-action-btn toggle-btn" data-action="toggle-catalog-status" data-id="${item.id}" title="${isPublished ? "Tornar Rascunho" : "Publicar"}">
            <i data-lucide="${isPublished ? "eye-off" : "eye"}"></i>
          </button>
          <button type="button" class="track-action-btn delete-btn" data-action="delete-catalog" data-id="${item.id}" title="Excluir" aria-label="Remover ${item.title}">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </td>
    </tr>`;
  }).join("") : `<tr><td colspan="6" class="profile-empty-cell">
    <div class="profile-empty">
      <i data-lucide="upload-cloud"></i>
      <strong>Nenhum beat ou música cadastrado ainda</strong>
      <p>Use o formulário na barra lateral para cadastrar sua primeira faixa.</p>
    </div>
  </td></tr>`;

  appView.innerHTML = `<section class="profile-page">
    <div class="profile-hero-banner">
      <div class="profile-hero-content">
        <div class="profile-avatar-wrapper">
          <img class="profile-avatar-img" src="${userAvatar}" alt="Avatar de ${userName}">
        </div>
        
        <div class="profile-hero-text">
          <div class="profile-verification-status">
            <i data-lucide="badge-check" class="verified-badge-blue"></i>
            <span>${accountStatus}</span>
          </div>
          <h1>${userName}</h1>
          <span class="profile-hero-role">${subtitleRole}</span>
          <div class="profile-hero-meta">
            <b>${roleLabel}</b>
            <span class="meta-dot">•</span>
            <b>${specialties.length ? specialties.slice(0, 3).join(" + ") : "Estilos nao definidos"}</b>
            <span class="meta-dot">•</span>
            <b>${location}</b>
          </div>
        </div>
      </div>
      
      <div class="profile-hero-actions">
        <button type="button" class="profile-btn-secondary" data-action="toggle-edit-profile">
          <i data-lucide="edit-3"></i>Editar perfil
        </button>
        <button type="button" class="profile-btn-secondary" data-action="share-profile">
          <i data-lucide="share-2"></i>Compartilhar
        </button>
        <button type="button" class="profile-btn-primary" data-action="${appState.authUser || profile ? "logout-account" : "seller"}">
          <i data-lucide="${appState.authUser || profile ? "log-out" : "user-plus"}"></i>${appState.authUser || profile ? "Sair" : "Criar conta"}
        </button>
      </div>
    </div>

    <div class="profile-stats-grid">
      <article class="profile-stat-card">
        <div><span>Catalogo</span><strong>${items.length}</strong></div>
        <small class="stat-increment">itens cadastrados</small>
      </article>
      <article class="profile-stat-card">
        <div><span>Publicados</span><strong>${published}</strong></div>
        <small class="stat-increment">visiveis no perfil</small>
      </article>
      <article class="profile-stat-card">
        <div><span>Rascunhos</span><strong>${drafts}</strong></div>
        <small class="stat-increment">em preparacao</small>
      </article>
      <article class="profile-stat-card">
        <div><span>Favoritos</span><strong>${favoritesCount}</strong></div>
        <small class="stat-increment">beats salvos</small>
      </article>
      <article class="profile-stat-card">
        <div><span>Pedidos</span><strong>${purchasesCount}</strong></div>
        <small class="stat-increment">compras e licencas</small>
      </article>
    </div>

    <div class="profile-workspace">
      <div class="profile-workspace-sidebar">
        <!-- SOBRE / BIO -->
        <section class="profile-sidebar-card">
          <div class="section-title"><i data-lucide="user-round"></i>Sobre</div>
          <p class="profile-sidebar-bio">${bioText}</p>
          <div class="profile-sidebar-specialties">
            ${specialties.length ? specialties.map(spec => `<span>${spec}</span>`).join("") : `<span>Adicione estilos no perfil</span>`}
          </div>
        </section>

        <section class="profile-sidebar-card profile-release-shortcut">
          <div class="section-title"><i data-lucide="upload-cloud"></i>Lançamento</div>
          <p class="profile-sidebar-bio">Cadastre músicas, beats, capas, áudio e licenças em uma área própria.</p>
          <a class="profile-form-toggle-btn" href="#cadastrar" data-route="cadastrar">
            <i data-lucide="plus"></i>
            <span>Lançar música</span>
          </a>
        </section>

        <!-- LINKS E PRESENÇA -->
        <section class="profile-sidebar-card">
          <div class="section-title"><i data-lucide="share-2"></i>Links e presença</div>
          <ul class="profile-links-list">
            ${socialLinks.length ? socialLinks.map(([icon, label, url]) => `<li><a href="${htmlEscape(safeUrl(url, { fallback: "#", allowHash: false, allowRelative: false }))}" target="_blank" rel="noopener noreferrer"><i data-lucide="${htmlEscape(icon)}"></i><span>${htmlEscape(label)}</span><i data-lucide="external-link"></i></a></li>`).join("") : `<li class="profile-empty-link"><span>Adicione seus links em Editar perfil.</span></li>`}
          </ul>
        </section>
      </div>

      <div class="profile-workspace-main">
        <!-- PREFERENCIAS MUSICAIS -->
        ${musicProfilePanel()}

        <!-- MEU CATÁLOGO (SPOTIFY-STYLE TRACKLIST) -->
        <section class="profile-catalog-list-card">
          <div class="section-head">
            <div>
              <h2><i data-lucide="library-big"></i>Meu catálogo</h2>
              <p>Itens cadastrados para venda, curadoria e perfil público</p>
            </div>
          </div>
          
          <div class="profile-catalog-table-wrapper">
            <table class="profile-catalog-table">
              <thead>
                <tr>
                  <th class="col-play"></th>
                  <th class="col-title">Título</th>
                  <th class="col-genre">Gênero / BPM</th>
                  <th class="col-price">Preço / Licença</th>
                  <th class="col-status">Status</th>
                  <th class="col-actions">Ações</th>
                </tr>
              </thead>
              <tbody>
                ${catalogCards}
              </tbody>
            </table>
          </div>
        </section>

        <!-- ATIVIDADE RECENTE -->
        <section class="profile-workspace-card">
          <div class="section-title"><i data-lucide="activity"></i>Atividade real</div>
          <ul class="profile-activity-list">
            ${recentProfileItems.length ? recentProfileItems.map(([icon, title, text]) => `<li><span class="activity-icon-dot"><i data-lucide="${icon}"></i></span><div class="activity-content"><strong>${title}</strong><p>${text}</p></div></li>`).join("") : `<li><span class="activity-icon-dot"><i data-lucide="clock"></i></span><div class="activity-content"><strong>Nenhuma atividade ainda</strong><p>Cadastre uma faixa, compre uma licenca ou edite seu perfil para iniciar.</p></div></li>`}
          </ul>
        </section>
      </div>
    </div>
  </section>`;
}

function renderSellerAuth() {
  const isLogin = appState.sellerMode === "login";
  const profile = hasAccountAccess()
    ? (appState.profile || profileFromAuthUser(appState.authUser))
    : (isSupabaseConfigured ? null : appState.profile);
  const role = profile?.account_role || "produtor";
  const roleLabel = accountRoleLabel(role);
  if (hasAccountAccess() || (!isSupabaseConfigured && profile)) {
    appView.innerHTML = `<section class="account-dashboard">
      <div class="account-hero-card">
        <div>
          <span>CONTA ${roleLabel.toUpperCase()}</span>
          <h1>${profile?.full_name || "Conta ANSEND"}</h1>
          <p>${accountGreeting()}</p>
          <div class="account-badges">
            <b><i data-lucide="badge-check"></i>${roleLabel}</b>
            <b><i data-lucide="${isSupabaseConfigured ? "cloud-check" : "hard-drive"}"></i>${isSupabaseConfigured ? "Sincronização ativa" : "Modo local"}</b>
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
          <p>${isSupabaseConfigured ? "Sessão protegida e sincronizada." : "Perfil salvo neste navegador."}</p>
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
      ${languageSwitcherMarkup()}
      <div class="seller-auth-copy">
        <span>${isLogin ? "ACESSO ANSEND" : "CONTA INTELIGENTE ANSEND"}</span>
        <h1>${isLogin ? "Entre na sua conta" : "Crie sua conta ANSEND"}</h1>
        <p>${isLogin ? "Acesse playlists, compras, favoritos e recomendações adaptadas à sua função." : "Escolha se você é produtor, curador, artista, designer, beatmaker ou selo para montar uma experiência personalizada."}</p>
      </div>
      <form class="seller-auth-form" autocomplete="on" data-mode="${isLogin ? "login" : "signup"}" novalidate>
        ${isLogin ? "" : `<label for="seller-name">Nome completo<input id="seller-name" name="name" type="text" placeholder="Seu nome completo" autocomplete="name"></label>
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
        <p class="seller-auth-message" data-auth-message hidden></p>
        <button class="seller-submit" type="submit">${isLogin ? "Entrar no painel" : "Criar conta"}<i data-lucide="arrow-right"></i></button>
      </form>
      <div class="seller-auth-actions">
        <button type="button" data-action="seller-google">${GOOGLE_ICON_MARKUP}Continuar com Google</button>
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

function pendingEmailConfirmation() {
  try {
    return JSON.parse(localStorage.getItem(EMAIL_CONFIRMATION_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

function rememberEmailConfirmation(payload) {
  localStorage.setItem(EMAIL_CONFIRMATION_STORAGE_KEY, JSON.stringify({
    email: payload.email,
    name: payload.name || "",
    role: payload.role || "",
    createdAt: new Date().toISOString(),
  }));
}

function clearEmailConfirmation() {
  localStorage.removeItem(EMAIL_CONFIRMATION_STORAGE_KEY);
}

function emailConfirmationRedirectUrl() {
  const url = new URL(publicAppUrl());
  url.searchParams.set("ansend_email", "confirmed");
  return url.toString();
}

function hasEmailConfirmationIntent() {
  const params = new URLSearchParams(window.location.search);
  return params.get("ansend_email") === "confirmed" || currentRouteFromHash() === "email-confirmed";
}

function clearEmailConfirmationIntent() {
  const url = new URL(window.location.href);
  url.searchParams.delete("ansend_email");
  if (url.href !== window.location.href) window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function renderEmailConfirmation() {
  const pending = pendingEmailConfirmation() || {};
  const email = pending.email || appState.authUser?.email || "";
  const safeEmail = email ? htmlEscape(email) : "seu e-mail";
  appView.innerHTML = `<section class="email-confirmation-page" aria-labelledby="emailConfirmationTitle">
    <div class="email-confirmation-card">
      <div class="email-confirmation-art" aria-hidden="true">
        <div class="email-confirmation-envelope">
          <span></span>
          <i data-lucide="check"></i>
        </div>
      </div>
      <p class="email-confirmation-brand">ANSEND</p>
      <h1 id="emailConfirmationTitle">Voce esta pronto!</h1>
      <h2>Confira seu e-mail para comecar.</h2>
      <p class="email-confirmation-copy">Enviamos um link de ativacao para <strong>${safeEmail}</strong>. Abra a mensagem e confirme sua conta ANSEND para concluir o cadastro.</p>
      <button class="email-confirmation-gmail" type="button" data-action="open-gmail">
        ${GOOGLE_ICON_MARKUP}
        Abrir Gmail
      </button>
      <p class="email-confirmation-resend">
        Nao recebeu o e-mail?
        <button type="button" data-action="resend-confirmation-email" ${email ? "" : "disabled"}>Reenviar link</button>
      </p>
      <p class="seller-auth-message email-confirmation-message" data-auth-message hidden></p>
    </div>
  </section>`;
}

function hydrateView() {
  appView.classList.remove("route-slide-in", "route-slide-left");
  decorateControls();
  setupHomeParallax();
  document.querySelectorAll('[data-action="favorite"][data-id]').forEach((button) => {
    button.classList.toggle("is-favorite", appState.favorites.has(button.dataset.id));
  });
  enableSpotlights();
  setupHeroShader();
  applyRoleDashboard();
  renderAiPlan();
  setupAutoScrollRows();
  setupHomeScrollAnimation();
  setupNexoFeedObservers();
  updateSidebarProfile();
  setupOptimizedImages(appView);
  setupOptimizedImages(document.querySelector(".sidebar") || document);
  applyTranslations();
  renderNexoFloatingAssistant();
  lucide.createIcons();
  requestAnimationFrame(() => setupScrollReveals());
}

function currentRoute() {
  return currentRouteFromHash();
}

function syncPrimaryNavbarVisibility(route) {
  const primaryNavbar = document.querySelector(".topbar");
  if (!primaryNavbar) return;
  primaryNavbar.hidden = route !== "feed";
}

function renderRoute() {
  const stopShellPerf = perfStart("App shell route render");
  const route = currentRoute();
  lastRoute = route;
  const institutionalFooter = document.querySelector(".footer");
  if (institutionalFooter) institutionalFooter.hidden = route !== "feed";
  syncPrimaryNavbarVisibility(route);
  const accountAccess = hasAccountAccess();
  const authPending = Boolean(supabaseClient && appState.authLoading && !appState.authReady);
  const authRequiredForRoute = !authPending && !accountAccess && protectedRoute(route);
  appView.classList.add("app-view");
  appView.classList.toggle("feed", route === "feed");
  document.body.classList.toggle("is-authenticated", accountAccess);
  document.body.classList.toggle("requires-auth", authRequiredForRoute);
  document.body.dataset.route = route;
  document.body.classList.remove("release-mode");
  document.body.classList.toggle("chat-dm-mode", route === "chat");
  if (route !== "chat") cleanupChatRealtime();
  appView.classList.remove("route-slide-in", "route-slide-left");
  document.querySelectorAll("a[data-route], button[data-route]").forEach((item) => item.classList.toggle("is-active", item.dataset.route === route));
  document.body.classList.remove("menu-open");
  if (authPending) {
    renderAuthLoading(`route_${route}`);
    window.scrollTo({ top: 0, behavior: "auto" });
    PageTransition(appView, route);
    hydrateView();
    return;
  }
  if (authRequiredForRoute) {
    appState.sellerMode = appState.sellerMode || "login";
    if (route === "cadastrar") {
      renderReleaseAuthRequired("route_guard_no_session");
    } else {
      renderSellerAuth();
    }
    window.scrollTo({ top: 0, behavior: "auto" });
    PageTransition(appView, route);
    hydrateView();
    return;
  }
  if (route === "feed") {
    appView.innerHTML = feedTemplate;
    applyFeedPersonalization();
  }
  if (route === "nexo-feed") {
    renderNexoFeed();
  }

  if (route === "explorar" || route === "marketplace" || route === "ofertas") renderExplore();
  if (route === "favoritos") renderFavorites();
  if (route === "compras") renderPurchases();
  if (route === "chat") renderChatPage();
  if (route === "biblioteca" || route === "musicas") renderLibrary();
  if (route === "ia" || route === "ferramentas") renderAiWorkspace();
  if (route === "produtores") renderProducers();
  if (route === COMMUNITY_ROUTE) {
    renderHiringPage();
  }
  if (route === "perfil") renderProfile();
  if (route === "perfil-publico") renderPublicProfile();
  if (route === "cadastrar") {
    try {
      renderMusicUpload();
    } catch (err) {
      renderMusicUploadFallback(err);
    }
  }
  if (route === "configuracoes") renderSettings();
  if (route === "admin") renderAdmin();
  if (route === "carrinho") renderCart();
  if (route === "vendedor") renderSellerAuth();
  if (route === "confirmar-email" || route === "email-confirmed") renderEmailConfirmation();
  if (route === "playlist") renderPlaylistDetail();
  if (route === "detalhe") renderBeatDetail();
  if (institutionalRoutes.has(route)) renderInstitutionalPage(route);
  window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  if (route !== COMMUNITY_ROUTE && route !== "chat") PageTransition(appView, route);
  hydrateView();
  stopShellPerf();
}

const TOASTS_ENABLED = false;

function showToast(message, icon = "check-circle-2") {
  const adminFeedback = /remov|permiss|excluir|executar esta ação/i.test(String(message || ""));
  if (!TOASTS_ENABLED && !adminFeedback) {
    console.debug("[ANSEND toast silenced]", icon, translateToastText(message));
    return;
  }
  const region = document.querySelector("#toastRegion");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i data-lucide="${icon}"></i><span>${translateToastText(message)}</span>`;
  region.appendChild(toast);
  lucide.createIcons();
  setTimeout(() => toast.remove(), 2800);
}

function closeModal() {
  document.querySelector(".app-modal")?.remove();
  document.body.classList.remove("modal-open");
}

function openModal(markup) {
  closeModal();
  document.body.insertAdjacentHTML("beforeend", `<div class="app-modal" role="dialog" aria-modal="true">
    <div class="app-modal-backdrop" data-action="close-modal"></div>
    <div class="app-modal-panel">
      <button class="app-modal-close" type="button" data-action="close-modal" aria-label="Fechar"><i data-lucide="x"></i></button>
      ${markup}
    </div>
  </div>`);
  document.body.classList.add("modal-open");
  applyLocaleTextOverrides(document.querySelector(".app-modal"));
  lucide.createIcons();
}

function openProfessionalProfile(name) {
  const profile = findProfessional(name);
  if (!profile) {
    showToast("Perfil profissional nao encontrado", "user-x");
    return;
  }
  const relatedBeats = beatMatchesForNeed(`${profile.role} ${profile.tags.join(" ")}`, 4);
  openModal(`<section class="professional-profile-modal">
    <header>
      ${professionalAvatarMarkup(profile)}
      <div>
        <span>${profile.role} verificado</span>
        <h2>${profile.name}</h2>
        ${profile.specialty ? `<p>${profile.specialty}</p>` : ""}
      </div>
    </header>
    ${profile.tags.length ? `<div class="professional-tags">${profile.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>` : ""}
    <div class="professional-modal-actions">
      <button type="button" data-action="professional-contact" data-title="${profile.name}">Contratar ${profile.role}</button>
      <button type="button" data-action="ai-chip" data-prompt="Quero contratar ${profile.name} para ${profile.specialty}.">Pedir plano NEXO</button>
    </div>
    <div class="modal-mini-grid">
      ${relatedBeats.map((item) => `<button type="button" data-action="open-beat" data-id="${item.id}"><img src="${(findBeat(item.id) || item).cover}" alt=""><span>${item.title}</span></button>`).join("")}
    </div>
  </section>`);
}

function openProfessionalContract(name) {
  const profile = findProfessional(name);
  if (!profile) {
    showToast("Perfil profissional nao encontrado", "user-x");
    return;
  }
  openModal(`<form class="contract-form" data-professional="${profile.name}">
    <span><i data-lucide="handshake"></i>Contratar profissional</span>
    <h2>${profile.name}</h2>
    <p>${profile.specialty}</p>
    <label>Serviço
      <select name="service">
        <option value="Projeto completo">${profile.role} / projeto completo</option>
        <option value="Consultoria NEXO">Consultoria NEXO</option>
        <option value="Entrega expressa">Entrega expressa</option>
      </select>
    </label>
    <label>Briefing
      <textarea name="briefing" rows="4" placeholder="Descreva o que você precisa, prazo, referências e objetivo do lançamento"></textarea>
    </label>
    <div class="contract-summary">
      <span>Valor inicial</span><strong>${profile.price}</strong><small>Resposta: ${profile.response}</small>
    </div>
    <button class="seller-submit" type="submit">Confirmar contratação<i data-lucide="arrow-right"></i></button>
  </form>`);
}

async function openCheckout(id, selectedPlan = "premium") {
  openModal(`<div style="display:flex; justify-content:center; align-items:center; min-height:150px; background:#0f0f0f; border-radius:8px;"><i data-lucide="loader-circle" class="animate-spin" style="width:32px; height:32px; color:#fff;"></i></div>`);
  lucide.createIcons();

  try {
    const item = findBeat(id) || topBeatOfDay;
    const licenses = await fetchBeatLicenses(id);
    const selectedLicense = licenses.find(l => l.id === selectedPlan || l.license_key === selectedPlan) || 
                            generateDefaultLicensesForBeat(item).find(l => l.id === selectedPlan || l.license_key === selectedPlan);
    
    if (!selectedLicense) {
      showToast("Erro ao carregar os termos da licença.", "alert-triangle");
      closeModal();
      return;
    }

    const subtotalCents = selectedLicense.price_cents || 0;
    const serviceFeeCents = Math.round(subtotalCents * 0.12);
    const totalCents = subtotalCents + serviceFeeCents;

    const prefillName = appState.authUser?.user_metadata?.full_name || appState.authUser?.email?.split("@")[0] || "";
    const prefillEmail = appState.authUser?.email || "";

    const card = `<div style="background:#050505; border:1px solid var(--beat-border); border-radius:6px; padding:12px; margin-bottom:14px; display:flex; gap:10px; align-items:center;">
      <img src="${item.cover}" style="width:48px; height:48px; border-radius:4px; object-fit:cover;">
      <div style="flex:1;">
        <strong style="font-size:14px; color:#fff; display:block;">${htmlEscape(item.title)}</strong>
        <span style="font-size:11px; color:var(--beat-muted);">${htmlEscape(selectedLicense.name)}</span>
      </div>
      <strong style="font-size:14px; color:#fff;">R$ ${(subtotalCents / 100).toFixed(2)}</strong>
    </div>`;

    openModal(`
      <form class="checkout-form" data-beat-id="${item.id}" data-is-cart="false">
        <span><i data-lucide="shopping-cart"></i>Checkout seguro ANSEND</span>
        <h2 style="font-size:18px; margin: 10px 0 4px; color:#fff;">Finalizar Compra</h2>
        <p style="font-size:12px; color:var(--beat-muted); margin-bottom:14px;">Preencha seus dados e concorde com os termos da licença.</p>
        
        ${card}
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
          <label style="display:flex; flex-direction:column; gap:4px;">
            <span style="font-size:11px; color:var(--beat-muted);">Seu Nome *</span>
            <input name="buyer_name" type="text" value="${htmlEscape(prefillName)}" placeholder="Nome completo" required style="background:#050505; border:1px solid var(--beat-border); color:#fff; padding:8px 10px; border-radius:5px; font-size:13px;">
          </label>
          <label style="display:flex; flex-direction:column; gap:4px;">
            <span style="font-size:11px; color:var(--beat-muted);">Seu E-mail *</span>
            <input name="buyer_email" type="email" value="${htmlEscape(prefillEmail)}" placeholder="email@exemplo.com" required style="background:#050505; border:1px solid var(--beat-border); color:#fff; padding:8px 10px; border-radius:5px; font-size:13px;">
          </label>
        </div>

        <div style="background:#050505; border:1px solid var(--beat-border); border-radius:6px; padding:12px; margin-bottom:14px; display:flex; flex-direction:column; gap:6px; font-size:12px;">
          <div style="display:flex; justify-content:space-between; color:var(--beat-muted);">
            <span>Subtotal:</span>
            <span>R$ ${(subtotalCents / 100).toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; color:var(--beat-muted);">
            <span>Taxa de serviço (12%):</span>
            <span>R$ ${(serviceFeeCents / 100).toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; color:#fff; font-weight:bold; font-size:14px; border-top:1px solid var(--beat-border-soft); padding-top:6px; margin-top:4px;">
            <span>Total:</span>
            <span>R$ ${(totalCents / 100).toFixed(2)}</span>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <label style="display:flex; gap:8px; align-items:flex-start; font-size:12px; color:var(--beat-muted); cursor:pointer;">
            <input type="checkbox" name="accept_terms" required style="margin-top:2px;">
            <span>Li e concordo com os <a href="#" class="view-contract-modal-trigger" data-beat-id="${item.id}" data-license-id="${selectedLicense.id}" style="color:var(--beat-blue); text-decoration:underline;">termos e contrato de licença</a> correspondentes a esta compra.</span>
          </label>
        </div>

        <button class="seller-submit" type="submit" style="width:100%; height:42px; display:flex; justify-content:center; align-items:center; font-size:14px;">
          Finalizar pagamento <i data-lucide="arrow-right" style="width:16px; height:16px; margin-left:6px;"></i>
        </button>
      </form>
    `);
    const formEl = document.querySelector(".checkout-form");
    if (formEl) {
      formEl.dataset.cartItems = JSON.stringify([{ beat_id: item.id, license_id: selectedLicense.id }]);
    }
  } catch (error) {
    console.error("Error opening single checkout:", error);
    showToast("Erro ao abrir checkout.", "alert-triangle");
    closeModal();
  }

}

function playerActionBeat() {
  return currentPlayingBeat();
}

function closePlayerMoreMenu() {
  document.querySelector(".player-more-dropdown")?.remove();
  document.querySelector('[data-action="more-player"]')?.setAttribute("aria-expanded", "false");
}

function closePlayerVolumePanel() {
  document.querySelector(".player-volume-popover")?.remove();
  document.querySelector('[data-action="volume"]')?.setAttribute("aria-expanded", "false");
}

function closePlayerFloatingPanels() {
  document.querySelector(".audio-editor-popover")?.remove();
  closePlayerVolumePanel();
  closePlayerMoreMenu();
}

function openAudioEditor() {
  closePlayerFloatingPanels();
  document.body.insertAdjacentHTML("beforeend", `<section class="audio-editor-popover" role="dialog" aria-modal="false" aria-label="Editor de audio">
    <header>
      <h2>Editor de audio</h2>
      <button type="button" data-action="close-audio-editor" aria-label="Fechar editor de audio"><i data-lucide="x"></i></button>
    </header>
    <p>Esses ajustes valem apenas para a escuta do preview e nao alteram downloads ou compras.</p>
    <label class="audio-editor-slider">
      <span>Velocidade</span>
      <input type="range" min="0.65" max="1.5" step="0.01" value="${appState.player.speed}" data-action="player-speed">
      <em>${Math.round((appState.player.speed - 1) * 100)}%</em>
    </label>
    <label class="audio-editor-slider">
      <span>Tom</span>
      <input type="range" min="-6" max="6" step="1" value="${appState.player.pitch}" data-action="player-pitch">
      <em>${appState.player.pitch} ST</em>
    </label>
    <button class="audio-editor-reset" type="button" data-action="reset-player-editor">Redefinir</button>
  </section>`);
  lucide.createIcons();
}

function openVolumePanel() {
  const trigger = document.querySelector('[data-action="volume"]');
  if (document.querySelector(".player-volume-popover")) {
    closePlayerVolumePanel();
    return;
  }
  document.querySelector(".audio-editor-popover")?.remove();
  closePlayerMoreMenu();
  const rect = trigger?.getBoundingClientRect();
  const right = rect ? Math.max(12, window.innerWidth - rect.right - 6) : 140;
  const bottom = rect ? Math.max(88, window.innerHeight - rect.top + 8) : 96;
  const volume = Math.min(1, Math.max(0, Number(appState.player.volume) || 0));
  const icon = volume <= .02 ? "volume-x" : volume < .45 ? "volume-1" : "volume-2";
  document.body.insertAdjacentHTML("beforeend", `<section class="player-volume-popover" role="dialog" aria-modal="false" aria-label="Controle de volume" style="right:${right}px; bottom:${bottom}px">
    <button type="button" class="player-volume-mute" data-action="player-mute" aria-label="${volume <= .02 ? "Ativar som" : "Mutar"}"><i data-lucide="${icon}"></i></button>
    <input class="player-volume-slider" type="range" min="0" max="1" step="0.01" value="${volume}" data-action="player-volume" aria-label="Volume do player">
    <em>${Math.round(volume * 100)}%</em>
    <button type="button" class="player-volume-close" data-action="close-volume-panel" aria-label="Fechar volume"><i data-lucide="x"></i></button>
  </section>`);
  trigger?.setAttribute("aria-expanded", "true");
  lucide.createIcons();
}

function queueItems() {
  const current = playerActionBeat();
  return dedupeById([current, ...marketplaceBeats().filter((item) => item.id !== current?.id).slice(0, 8)].filter(Boolean));
}

function openQueuePanel() {
  const rows = queueItems().map((item, index) => `<button class="queue-row ${index === 0 ? "is-current" : ""}" type="button" data-action="play" data-id="${item.id}">
    <span>${String(index + 1).padStart(2, "0")}</span>
    <img src="${item.cover}" alt="">
    <strong>${item.title}</strong>
    <em>${item.producer}</em>
    <i data-lucide="${index === 0 ? "volume-2" : "play"}"></i>
  </button>`).join("");
  openModal(`<section class="player-tool-modal queue-tool-modal">
    <span><i data-lucide="list-music"></i>Fila</span>
    <h2>Proximos beats</h2>
    <div class="queue-list">${rows}</div>
  </section>`);
}

function currentBeatUrl(item = playerActionBeat()) {
  return item?.id ? `${location.origin}${location.pathname}#beat-${item.id}` : `${location.origin}${location.pathname}`;
}

async function shareCurrentBeat(item = playerActionBeat()) {
  if (!item?.id) return;
  const url = currentBeatUrl(item);
  const shareData = {
    title: item.title || "Beat ANSEND",
    text: `${item.title || "Beat"} - ${item.producer || "ANSEND"}`,
    url,
  };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast("Link compartilhado", "share-2");
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard?.writeText(url);
    showToast("Link copiado", "share-2");
  } catch (error) {
    showToast("Link pronto para compartilhar", "share-2");
  }
}

function toggleCurrentLoop() {
  appState.player.loop = !appState.player.loop;
  persistState();
  syncMiniPlayerState();
  showToast(appState.player.loop ? "Loop ativado no player" : "Loop desativado", "repeat-2");
  lucide.createIcons();
}

function togglePlayerShuffle() {
  appState.player.shuffle = !appState.player.shuffle;
  persistState();
  showToast(appState.player.shuffle ? "Shuffle ativado" : "Shuffle desativado", "shuffle");
}

function addCurrentToPlaylist(item = playerActionBeat()) {
  const saved = JSON.parse(localStorage.getItem("ansend-saved-playlist") || "[]");
  if (!saved.includes(item.id)) saved.unshift(item.id);
  localStorage.setItem("ansend-saved-playlist", JSON.stringify(saved.slice(0, 40)));
  showToast(`${item.title} adicionado a biblioteca`, "bookmark-plus");
  if (currentRoute() === "biblioteca") renderRoute();
}

function openCommentsPanel() {
  const item = playerActionBeat();
  openModal(`<section class="player-tool-modal comments-tool-modal">
    <span><i data-lucide="message-circle"></i>Comentarios</span>
    <h2>${item.title}</h2>
    <div class="comment-list">
      <article><strong>Viana</strong><p>Essa intro encaixa bem para trap melodico.</p></article>
      <article><strong>NEXO IA</strong><p>Match alto para artistas buscando hook forte e lancamento rapido.</p></article>
    </div>
    <form class="comment-form">
      <input type="text" placeholder="Escreva um comentario sobre o beat">
      <button type="submit" data-action="comment-preview">Enviar</button>
    </form>
  </section>`);
}

function publicProfileRoute(profile) {
  if (!profile) return "";
  const token = profileRouteToken(profile);
  return token ? `perfil-${token}` : "";
}

function currentBeatArtistRoute(item = playerActionBeat()) {
  const ownerProfile = profileForUserId(item.user_id || item.raw?.user_id);
  if (ownerProfile) return publicProfileRoute(ownerProfile);
  const producerHandle = sanitizeHandle(String(item.producer || "").replace(/^prod\.\s*/i, ""));
  const matchedProfile = appState.publicProfiles.find((profile) => {
    const display = profileDisplayData(profile);
    return [profile.username, profile.handle, display.username, display.name, profile.full_name]
      .filter(Boolean)
      .map(sanitizeHandle)
      .includes(producerHandle);
  });
  return publicProfileRoute(matchedProfile);
}

function openReportCurrentBeat(item = playerActionBeat()) {
  openModal(`<form class="player-tool-modal report-tool-modal" data-report-beat-id="${htmlEscape(item.id)}">
    <span><i data-lucide="flag"></i>Denunciar</span>
    <h2>${htmlEscape(item.title || "Musica")}</h2>
    <p>Descreva o motivo da denuncia para a equipe ANSEND analisar.</p>
    <label>Motivo
      <select name="reason" required>
        <option value="direitos">Direitos autorais</option>
        <option value="conteudo">Conteudo inadequado</option>
        <option value="fraude">Fraude ou informacao falsa</option>
        <option value="outro">Outro motivo</option>
      </select>
    </label>
    <label>Detalhes
      <textarea name="details" rows="4" maxlength="400" placeholder="Explique o problema de forma objetiva"></textarea>
    </label>
    <div class="player-tool-actions">
      <button type="button" data-action="close-modal">Cancelar</button>
      <button type="submit">Enviar denuncia</button>
    </div>
  </form>`);
}

function openMorePlayerMenu() {
  const trigger = document.querySelector('[data-action="more-player"]');
  if (document.querySelector(".player-more-dropdown")) {
    closePlayerMoreMenu();
    return;
  }
  document.querySelector(".audio-editor-popover")?.remove();
  const rect = trigger?.getBoundingClientRect();
  const right = rect ? Math.max(12, window.innerWidth - rect.right - 8) : 128;
  const bottom = rect ? Math.max(88, window.innerHeight - rect.top + 8) : 96;
  const current = playerActionBeat();
  const adminDelete = appState.isAdmin && isAdminUser() && current?.id !== topBeatOfDay.id
    ? `<button type="button" role="menuitem" data-action="admin-delete-beat" data-id="${htmlEscape(String(current.id))}" data-source-table="${htmlEscape(adminBeatSource(current))}">Remover beat</button><hr>`
    : "";
  document.body.insertAdjacentHTML("beforeend", `<div class="player-more-dropdown" role="menu" style="right:${right}px; bottom:${bottom}px">
    <button type="button" role="menuitem" data-action="repost-current">Repostar</button>
    <button type="button" role="menuitem" data-action="comments-current">Comentarios</button>
    <button type="button" role="menuitem" data-action="share-current">Compartilhar</button>
    <button type="button" role="menuitem" data-action="report-current">Denunciar</button>
    <hr>
    <button type="button" role="menuitem" data-action="add-playlist-current">Adicionar a playlist</button>
    <button type="button" role="menuitem" data-action="shuffle-current">${appState.player.shuffle ? "Desativar aleatorio" : "Ativar aleatorio"}</button>
    <hr>
    ${adminDelete}
    <button type="button" role="menuitem" data-action="go-current-track">Ir para a musica</button>
    <button type="button" role="menuitem" data-action="go-current-artist">Ir para o artista</button>
  </div>`);
  trigger?.setAttribute("aria-expanded", "true");
}

function miniWaveformBars(progress = 0) {
  return Array.from({ length: 260 }, (_, index) => {
    const height = 18 + ((index * 17) % 42);
    const active = index / 259 <= progress ? " is-active" : "";
    return `<span class="${active}" style="--bar-h:${height}%"></span>`;
  }).join("");
}

function formatTime(seconds) {
  const safe = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

const youtubeBeatPlayerState = {
  apiPromise: null,
  player: null,
  ready: false,
  videoId: "",
  progressTimer: null,
  playResolver: null,
};

let suppressAudioPauseEventsUntil = 0;
let playerPlaybackRequestId = 0;

function suppressUpcomingAudioPauseEvents(durationMs = 900) {
  suppressAudioPauseEventsUntil = Math.max(suppressAudioPauseEventsUntil, Date.now() + durationMs);
}

function isAudioPauseEventSuppressed() {
  return Date.now() < suppressAudioPauseEventsUntil;
}

function playerControlIconMarkup(iconName = "play") {
  const icons = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.8v12.4c0 .8.9 1.3 1.6.9l9.8-6.2c.6-.4.6-1.4 0-1.8L9.6 4.9C8.9 4.5 8 5 8 5.8z" fill="currentColor"></path></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="7" y="5" width="3.8" height="14" rx="1.1" fill="currentColor"></rect><rect x="13.2" y="5" width="3.8" height="14" rx="1.1" fill="currentColor"></rect></svg>',
    loading: '<svg class="player-state-spinner" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.4" opacity=".28"></circle><path d="M20.5 12a8.5 8.5 0 0 0-8.5-8.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path></svg>',
    "volume-x": '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="m18 9 4 4m0-4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
    "volume-1": '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M16 9.5a4 4 0 0 1 0 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
    "volume-2": '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M16 8a5.8 5.8 0 0 1 0 8M18.8 5.5a9.8 9.8 0 0 1 0 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>',
  };
  return icons[iconName] || icons.play;
}

function setPlayerControlIcon(button, iconName, { label = "" } = {}) {
  if (!button || !iconName) return false;
  const changed = button.dataset.playerIcon !== iconName || !button.querySelector(".player-state-icon svg");
  button.dataset.playerIcon = iconName;
  button.classList.toggle("is-loading", iconName === "loading");
  if (label) button.setAttribute("aria-label", label);
  if (changed) {
    button.innerHTML = `<span class="player-state-icon" aria-hidden="true">${playerControlIconMarkup(iconName)}</span>`;
  }
  return changed;
}

function setLucideIcon(button, iconName) {
  if (!button || !iconName) return false;
  if (button.dataset.lucideIcon === iconName && button.querySelector("svg")) return false;
  button.dataset.lucideIcon = iconName;
  button.innerHTML = `<i data-lucide="${iconName}"></i>`;
  return true;
}

function refreshPlayerIcons() {
  if (window.lucide?.createIcons) lucide.createIcons();
}

function nextPlayerPlaybackRequest() {
  playerPlaybackRequestId += 1;
  return playerPlaybackRequestId;
}

function isCurrentPlaybackRequest(requestId) {
  return requestId === playerPlaybackRequestId;
}

function cancelCurrentPlaybackRequest() {
  playerPlaybackRequestId += 1;
}

const PlayerStore = {
  setCurrent(item, { status = "loading", error = "" } = {}) {
    const beat = normalizePlayerBeat(item);
    appState.player.currentBeat = beat;
    appState.player.sourceType = beat?.source_type || "";
    appState.player.youtubeVideoId = beat?.youtube_video_id || "";
    appState.player.error = error;
    appState.player.status = status;
    appState.player.currentTime = 0;
    appState.player.duration = 0;
    appState.playing = beat?.id || null;
    return beat;
  },
  setStatus(status, extra = {}) {
    appState.player.status = status;
    if (extra.error !== undefined) appState.player.error = extra.error || "";
    if (Number.isFinite(extra.duration)) appState.player.duration = extra.duration;
    if (Number.isFinite(extra.currentTime)) appState.player.currentTime = extra.currentTime;
    syncMiniPlayerState();
  },
  current() {
    return appState.player.currentBeat || currentPlayingBeat();
  },
  isPlaying(id = appState.playing) {
    return appState.player.status === "playing" && String(appState.playing || "") === String(id || "");
  },
  clearError() {
    appState.player.error = "";
  },
};

function currentPlayingBeat() {
  if (appState.player.currentBeat?.id) return appState.player.currentBeat;
  if (!appState.playing) return null;
  if (String(appState.playing) === String(topBeatOfDay.id)) return topBeatOfDay;
  return findBeat(appState.playing);
}

function youtubeVideoIdForBeat(item = {}) {
  const directId = item.youtube_video_id || item.youtubeVideoId || item.raw?.youtube_video_id || item.raw?.youtubeVideoId || "";
  if (directId) return sanitizeYouTubeId(directId) || "";
  const meta = youtubeMetadataFromUrl(item.youtube_url || item.youtubeUrl || item.raw?.youtube_url || item.raw?.youtubeUrl || "");
  return meta?.youtube_video_id || "";
}

function isCurrentYoutubeSource() {
  return appState.player.sourceType === "youtube" && Boolean(appState.player.youtubeVideoId);
}

function ensureYouTubeBeatHost() {
  let host = document.querySelector("#youtubeBeatPlayerHost");
  if (host) return host;
  host = document.createElement("div");
  host.id = "youtubeBeatPlayerHost";
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:fixed;width:1px;height:1px;left:-9999px;top:-9999px;overflow:hidden;pointer-events:none;";
  host.innerHTML = '<div id="youtubeBeatPlayerFrame"></div>';
  document.body.appendChild(host);
  return host;
}

function loadYouTubeIframeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeBeatPlayerState.apiPromise) return youtubeBeatPlayerState.apiPromise;
  youtubeBeatPlayerState.apiPromise = new Promise((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === "function") previousReady();
      resolve(window.YT);
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => reject(new Error("youtube_api_load_failed"));
      document.head.appendChild(script);
    }
    window.setTimeout(() => {
      if (window.YT?.Player) resolve(window.YT);
    }, 12000);
  });
  return youtubeBeatPlayerState.apiPromise;
}

async function ensureYouTubeBeatPlayer() {
  ensureYouTubeBeatHost();
  const YTApi = await loadYouTubeIframeApi();
  if (youtubeBeatPlayerState.player) return youtubeBeatPlayerState.player;
  youtubeBeatPlayerState.player = await new Promise((resolve) => {
    const player = new YTApi.Player("youtubeBeatPlayerFrame", {
      width: "1",
      height: "1",
      playerVars: {
        playsinline: 1,
        rel: 0,
        modestbranding: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          youtubeBeatPlayerState.ready = true;
          resolve(player);
        },
        onStateChange: (event) => {
          const state = window.YT?.PlayerState || {};
          if (event.data === state.PLAYING) {
            PlayerStore.setStatus("playing", {
              duration: Number(player.getDuration?.()) || 0,
              currentTime: Number(player.getCurrentTime?.()) || 0,
            });
            youtubeBeatPlayerState.playResolver?.(true);
            youtubeBeatPlayerState.playResolver = null;
            setTopBeatPlaying(true);
            startYouTubeProgressTimer();
            updateMiniProgress();
          }
          if (event.data === state.BUFFERING || event.data === state.CUED) {
            PlayerStore.setStatus("loading");
            updateMiniProgress();
          }
          if (event.data === state.PAUSED) {
            PlayerStore.setStatus("paused", {
              duration: Number(player.getDuration?.()) || 0,
              currentTime: Number(player.getCurrentTime?.()) || 0,
            });
            setTopBeatPlaying(false);
            updateMiniProgress();
          }
          if (event.data === state.ENDED) {
            PlayerStore.setStatus("ended", {
              duration: Number(player.getDuration?.()) || 0,
              currentTime: Number(player.getDuration?.()) || 0,
            });
            stopYouTubeProgressTimer();
            setTopBeatPlaying(false);
            updateMiniProgress();
            if (appState.player.loop) {
              player.seekTo(0, true);
              player.playVideo();
            }
          }
        },
        onError: (event) => {
          const message = "Não foi possível reproduzir este beat";
          console.error("[ANSEND player] YouTube playback error", {
            code: event?.data,
            beat: PlayerStore.current(),
            youtubeVideoId: youtubeBeatPlayerState.videoId,
          });
          PlayerStore.setStatus("error", { error: message });
          youtubeBeatPlayerState.playResolver?.(false);
          youtubeBeatPlayerState.playResolver = null;
          setTopBeatPlaying(false);
          showToast(message, "alert-triangle");
        },
      },
    });
  });
  return youtubeBeatPlayerState.player;
}

function stopYouTubeProgressTimer() {
  if (youtubeBeatPlayerState.progressTimer) {
    window.clearInterval(youtubeBeatPlayerState.progressTimer);
    youtubeBeatPlayerState.progressTimer = null;
  }
}

function startYouTubeProgressTimer() {
  stopYouTubeProgressTimer();
  youtubeBeatPlayerState.progressTimer = window.setInterval(updateMiniProgress, 500);
}

function waitForYouTubePlaying(timeoutMs = 6500) {
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      if (youtubeBeatPlayerState.playResolver) {
        youtubeBeatPlayerState.playResolver = null;
        resolve(false);
      }
    }, timeoutMs);
    youtubeBeatPlayerState.playResolver = (value) => {
      window.clearTimeout(timer);
      resolve(Boolean(value));
    };
  });
}

function pauseYouTubeBeat({ quiet = false } = {}) {
  const player = youtubeBeatPlayerState.player;
  if (player?.pauseVideo) {
    try {
      player.pauseVideo();
    } catch (error) {
      console.warn("YouTube pause error", error);
    }
  }
  stopYouTubeProgressTimer();
  if (isCurrentYoutubeSource()) {
    PlayerStore.setStatus("paused", {
      duration: Number(player?.getDuration?.()) || 0,
      currentTime: Number(player?.getCurrentTime?.()) || 0,
    });
    setTopBeatPlaying(false);
    if (!quiet) showToast("Beat pausado", "pause");
  }
}

function applyPlayerAudioSettings() {
  const audio = topBeatAudio();
  if (!Number.isFinite(appState.player.volume)) appState.player.volume = .82;
  if (!Number.isFinite(appState.player.speed)) appState.player.speed = 1;
  if (!Number.isFinite(appState.player.pitch)) appState.player.pitch = 0;
  const safeVolume = Math.min(1, Math.max(0, appState.player.volume));
  if (audio) {
    audio.volume = safeVolume;
    audio.loop = Boolean(appState.player.loop);
    audio.playbackRate = Math.min(1.5, Math.max(.65, appState.player.speed));
    audio.preservesPitch = Math.abs(appState.player.pitch) < 1;
  }
  const youtubePlayer = youtubeBeatPlayerState.player;
  if (youtubePlayer?.setVolume) {
    try {
      youtubePlayer.setVolume(Math.round(safeVolume * 100));
      if (safeVolume <= .02) youtubePlayer.mute?.();
      else youtubePlayer.unMute?.();
    } catch (error) {
      console.warn("[ANSEND player] YouTube volume sync failed", error);
    }
  }
}

function syncMiniPlayerState() {
  const player = document.querySelector(".mini-player");
  if (!player) return;
  const current = currentPlayingBeat();
  const favoriteButton = player.querySelector('[data-action="favorite-current"]');
  const loopButton = player.querySelector('[data-action="loop-beat"]');
  const volumeButton = player.querySelector('[data-action="volume"]');
  const miniButton = player.querySelector('[data-action="mini-play"]');
  favoriteButton?.classList.toggle("is-active", appState.favorites.has(current?.id));
  loopButton?.classList.toggle("is-active", appState.player.loop);
  player.classList.toggle("is-looping", appState.player.loop);
  player.classList.toggle("is-loading", appState.player.status === "loading");
  player.classList.toggle("has-error", appState.player.status === "error");
  player.classList.toggle("is-playing", appState.player.status === "playing");
  if (miniButton) {
    const status = appState.player.status;
    const icon = status === "loading" && current?.id ? "loading" : status === "playing" ? "pause" : "play";
    setPlayerControlIcon(miniButton, icon, { label: icon === "pause" ? "Pausar" : "Tocar" });
  }
  if (volumeButton) {
    const icon = appState.player.volume <= .02 ? "volume-x" : appState.player.volume < .45 ? "volume-1" : "volume-2";
    setLucideIcon(volumeButton, icon);
  }
  const volumePopover = document.querySelector(".player-volume-popover");
  if (volumePopover) {
    const safeVolume = Math.min(1, Math.max(0, Number(appState.player.volume) || 0));
    const volumeIcon = safeVolume <= .02 ? "volume-x" : safeVolume < .45 ? "volume-1" : "volume-2";
    const range = volumePopover.querySelector('[data-action="player-volume"]');
    const label = volumePopover.querySelector("em");
    const muteButton = volumePopover.querySelector('[data-action="player-mute"]');
    if (range) range.value = String(safeVolume);
    if (label) label.textContent = `${Math.round(safeVolume * 100)}%`;
    if (muteButton) {
      muteButton.setAttribute("aria-label", safeVolume <= .02 ? "Ativar som" : "Mutar");
      setLucideIcon(muteButton, volumeIcon);
    }
  }
  applyPlayerAudioSettings();
  refreshPlayerIcons();
}

function showMiniPlayer() {
  const player = document.querySelector(".mini-player");
  if (!player) return;
  player.hidden = false;
  player.style.removeProperty("opacity");
  player.style.removeProperty("pointer-events");
  player.style.removeProperty("transform");
  player.removeAttribute("aria-hidden");
  player.classList.remove("is-closed");
  player.classList.add("is-active");
  document.body.classList.add("player-open");
}

function closeMiniPlayer() {
  const player = document.querySelector(".mini-player");
  if (!player) return;
  closePlayerFloatingPanels();
  pauseTopBeat({ quiet: true });
  player.classList.remove("is-active", "is-playing");
  player.classList.add("is-closed");
  document.body.classList.remove("player-open");
  player.style.setProperty("opacity", "0", "important");
  player.style.setProperty("pointer-events", "none", "important");
  player.style.setProperty("transform", "translate3d(0, calc(100% + 18px), 0)", "important");
  player.setAttribute("aria-hidden", "true");
  player.hidden = true;
  showToast("Player fechado. Clique em play para abrir de novo.", "x");
}

function updateMiniProgress() {
  const player = document.querySelector(".mini-player");
  if (!player) return;
  const audio = topBeatAudio();
  const youtubePlayer = youtubeBeatPlayerState.player;
  const isYoutube = isCurrentYoutubeSource() && youtubePlayer?.getDuration && youtubePlayer?.getCurrentTime;
  const isAudioBeat = Boolean(appState.playing) && !isYoutube && audio && audio.src;
  const youtubeDuration = isYoutube ? Number(youtubePlayer.getDuration()) : 0;
  const youtubeCurrent = isYoutube ? Number(youtubePlayer.getCurrentTime()) : 0;
  const duration = isYoutube && Number.isFinite(youtubeDuration) && youtubeDuration > 0
    ? youtubeDuration
    : isAudioBeat && Number.isFinite(audio.duration)
      ? audio.duration
      : 165;
  const current = isYoutube && Number.isFinite(youtubeCurrent)
    ? youtubeCurrent
    : isAudioBeat
      ? audio.currentTime
      : Math.min(duration, Math.max(0, appState.player.previewTime || 0));
  if (Number.isFinite(duration) && duration > 0) appState.player.duration = duration;
  if (Number.isFinite(current)) appState.player.currentTime = current;
  const progress = Math.min(1, duration ? current / duration : 0);
  const waveform = player.querySelector(".mini-waveform");
  player.querySelector(".mini-current").textContent = formatTime(current);
  player.querySelector(".mini-duration").textContent = formatTime(duration || 165);
  player.querySelector(".mini-wave-bars").innerHTML = miniWaveformBars(progress);
  player.style.setProperty("--mini-progress", progress.toFixed(4));
  player.style.setProperty("--mini-progress-pct", `${(progress * 100).toFixed(2)}%`);
  waveform?.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
  waveform?.setAttribute("aria-valuetext", `${formatTime(current)} de ${formatTime(duration || 165)}`);
}

function seekMiniPlayerToRatio(ratio) {
  const player = document.querySelector(".mini-player");
  if (!player) return;
  const audio = topBeatAudio();
  const safeRatio = Math.min(1, Math.max(0, ratio));
  const youtubePlayer = youtubeBeatPlayerState.player;
  const isYoutube = isCurrentYoutubeSource() && youtubePlayer?.seekTo && youtubePlayer?.getDuration;
  const duration = isYoutube && Number.isFinite(Number(youtubePlayer.getDuration()))
    ? Number(youtubePlayer.getDuration())
    : audio && audio.src && Number.isFinite(audio.duration)
      ? audio.duration
      : 165;
  if (isYoutube) {
    youtubePlayer.seekTo(safeRatio * duration, true);
  } else if (audio && audio.src) {
    audio.currentTime = safeRatio * duration;
  } else {
    appState.player.previewTime = safeRatio * duration;
    localStorage.setItem("ansend-player-preview-time", String(appState.player.previewTime));
  }
  updateMiniProgress();
}

function seekMiniPlayerFromPointer(event) {
  const waveform = event.target.closest(".mini-waveform");
  if (!waveform) return;
  const rect = waveform.querySelector(".mini-wave-bars")?.getBoundingClientRect() || waveform.getBoundingClientRect();
  const ratio = (event.clientX - rect.left) / Math.max(1, rect.width);
  seekMiniPlayerToRatio(ratio);
}

function updateMiniPlayer(item, show = true) {
  const player = document.querySelector(".mini-player");
  if (!player || !item) return;
  const beat = normalizePlayerBeat(item) || item;
  if (show) {
    showMiniPlayer();
  } else {
    player.classList.add("is-closed");
    player.classList.remove("is-active");
    document.body.classList.remove("player-open");
  }
  player.dataset.currentBeat = beat.id;
  player.dataset.sourceType = beat.source_type || "";
  player.querySelector(".mini-track img").src = beat.cover;
  player.querySelector(".mini-track strong").textContent = beat.title;
  player.querySelector(".mini-track span").textContent = `${beat.producer} - ${beat.tags?.[1] || "153 BPM"}`;
  const numericId = Number(String(beat.id).replace(/\D/g, "")) || 4;
  player.querySelector(".mini-buy span").textContent = beat.id === topBeatOfDay.id ? "$44.95" : `$${(24.95 + (numericId % 5) * 5).toFixed(2)}`;
  if (beat.id !== topBeatOfDay.id && appState.player.previewTime >= 165) appState.player.previewTime = 11;
  updateMiniProgress();
  syncMiniPlayerState();
}

function topBeatAudio() {
  return document.querySelector("#topBeatAudio");
}

async function playYouTubeBeat(item, { quiet = false } = {}) {
  const requestId = nextPlayerPlaybackRequest();
  const beat = normalizePlayerBeat(item);
  const videoId = beat?.youtube_video_id || "";
  if (!beat || !videoId) {
    const message = "Não foi possível reproduzir este beat";
    console.error("[ANSEND player] invalid YouTube beat source", { item });
    PlayerStore.setStatus("error", { error: message });
    showToast(message, "alert-triangle");
    return false;
  }
  const audio = topBeatAudio();
  if (audio) {
    suppressUpcomingAudioPauseEvents();
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
  }
  PlayerStore.setCurrent(beat, { status: "loading" });
  youtubeBeatPlayerState.videoId = videoId;
  updateMiniPlayer(beat);
  showMiniPlayer();
  try {
    const player = await ensureYouTubeBeatPlayer();
    applyPlayerAudioSettings();
    const playingPromise = waitForYouTubePlaying();
    if (player.getVideoData?.().video_id !== videoId) {
      player.loadVideoById(videoId);
    } else {
      player.playVideo();
    }
    const confirmedPlaying = await playingPromise;
    if (!isCurrentPlaybackRequest(requestId)) {
      player.pauseVideo?.();
      return false;
    }
    if (!confirmedPlaying) {
      const message = "Não foi possível reproduzir este beat";
      console.error("[ANSEND player] YouTube did not enter PLAYING state", { beat, videoId });
      PlayerStore.setStatus("error", { error: message });
      setTopBeatPlaying(false);
      if (!quiet) showToast(message, "alert-triangle");
      return false;
    }
    if (!quiet) showToast(`Tocando agora: ${beat.title}`, "play");
    return true;
  } catch (error) {
    if (!isCurrentPlaybackRequest(requestId)) return false;
    const message = "Não foi possível reproduzir este beat";
    console.error("[ANSEND player] YouTube playback error", { error, beat });
    PlayerStore.setStatus("error", { error: message });
    setTopBeatPlaying(false);
    showToast(message, "alert-triangle");
    return false;
  }
}

function setTopBeatPlaying(isPlaying) {
  const isTopBeat = appState.playing === topBeatOfDay.id;
  document.querySelector(".top-beat-card")?.classList.toggle("is-playing", isTopBeat && isPlaying);
  document.querySelectorAll('[data-action="hero-beat-play"]').forEach((button) => {
    const active = isTopBeat && isPlaying;
    setPlayerControlIcon(button, active ? "pause" : "play", { label: active ? "Pausar beat top 1 do dia" : "Tocar beat top 1 do dia" });
  });
  document.querySelectorAll(".community-ad-card[data-promoted-beat-id]").forEach((card) => {
    const active = String(card.dataset.promotedBeatId || "") === String(appState.playing || "") && isPlaying;
    card.classList.toggle("is-playing", active);
    const button = card.querySelector('[data-action="community-ad-play"]');
    if (button) {
      const title = card.getAttribute("aria-label")?.replace(/^Beat impulsionado:\s*/i, "") || "beat";
      setPlayerControlIcon(button, active ? "pause" : "play", { label: `${active ? "Pausar" : "Ouvir"} ${title}` });
    }
  });

  const player = document.querySelector(".mini-player");
  if (player) {
    player.classList.toggle("is-playing", isPlaying);
  }
  const miniButton = document.querySelector('[data-action="mini-play"]');
  if (miniButton) {
    setPlayerControlIcon(miniButton, isPlaying ? "pause" : "play", { label: isPlaying ? "Pausar" : "Tocar" });
  }

  // Sincronizar todos os botões de play/pause da página
  document.querySelectorAll('[data-action="play"], [data-action="play-catalog"]').forEach((button) => {
    const id = button.dataset.id || button.dataset.feedItemId;
    const isThisPlaying = id && String(id) === String(appState.playing) && isPlaying;
    
    // Procura por um ícone dentro do botão
    setPlayerControlIcon(button, isThisPlaying ? "pause" : "play");
  });

  syncMiniPlayerState();
  refreshPlayerIcons();
}

async function playBeat(item, { quiet = false, suppressErrorLog = false } = {}) {
  const requestId = nextPlayerPlaybackRequest();
  const beat = normalizePlayerBeat(item);
  if (!beat) return false;
  if (beat.source_type === "youtube") {
    return playYouTubeBeat(beat, { quiet });
  }
  const audio = topBeatAudio();
  if (!audio) return false;
  const audioUrl = beat.audio_url || "";

  if (!audioUrl) {
    const message = "Não foi possível reproduzir este beat";
    console.error("[ANSEND player] missing upload audio_url", { beat });
    PlayerStore.setStatus("error", { error: message });
    showToast(message, "alert-triangle");
    setTopBeatPlaying(false);
    return false;
  }

  pauseYouTubeBeat({ quiet: true });
  suppressUpcomingAudioPauseEvents();
  audio.pause();
  PlayerStore.setCurrent(beat, { status: "loading" });
  updateMiniPlayer(beat);

  const currentUrl = audio.src ? new URL(audio.src, window.location.href).href : "";
  const targetUrl = new URL(audioUrl, window.location.href).href;
  if (currentUrl !== targetUrl) {
    audio.src = audioUrl;
    audio.load();
  }

  try {
    await audio.play();
    if (!isCurrentPlaybackRequest(requestId)) {
      suppressUpcomingAudioPauseEvents(200);
      audio.pause();
      return false;
    }
    showMiniPlayer();
    PlayerStore.setStatus("playing", {
      duration: Number(audio.duration) || 0,
      currentTime: Number(audio.currentTime) || 0,
    });
    setTopBeatPlaying(true);
    if (!quiet) showToast(`Tocando agora: ${beat.title}`, "play");
    return true;
  } catch (error) {
    if (!isCurrentPlaybackRequest(requestId)) return false;
    if (!suppressErrorLog) console.error("[ANSEND player] upload playback error", { error, beat });
    const message = "Não foi possível reproduzir este beat";
    PlayerStore.setStatus("error", { error: message });
    setTopBeatPlaying(false);
    if (!quiet) showToast(message, "alert-triangle");
    return false;
  }
}

async function playTopBeat({ quiet = false } = {}) {
  return playBeat(topBeatOfDay, { quiet });
}

async function toggleBeatPlayback(item) {
  const beat = normalizePlayerBeat(item);
  if (!beat) return false;
  if (String(appState.playing || "") !== String(beat.id || "")) {
    return playBeat(beat);
  }
  if (appState.player.status === "loading") {
    cancelCurrentPlaybackRequest();
    const audio = topBeatAudio();
    if (audio) {
      suppressUpcomingAudioPauseEvents(200);
      audio.pause();
    }
    pauseYouTubeBeat({ quiet: true });
    PlayerStore.setStatus("paused", {
      duration: Number(audio?.duration) || Number(appState.player.duration) || 0,
      currentTime: Number(audio?.currentTime) || Number(appState.player.currentTime) || 0,
    });
    setTopBeatPlaying(false);
    return false;
  }
  if (beat.source_type === "youtube") {
    const player = youtubeBeatPlayerState.player;
    const state = player?.getPlayerState?.();
    const playingState = window.YT?.PlayerState?.PLAYING;
    if (state === playingState) {
      pauseYouTubeBeat();
      return false;
    }
    return playBeat(beat, { quiet: true });
  }
  const audio = topBeatAudio();
  if (!audio) return false;
  if (audio.paused) {
    return playBeat(beat, { quiet: true });
  }
  audio.pause();
  PlayerStore.setStatus("paused", {
    duration: Number(audio.duration) || 0,
    currentTime: Number(audio.currentTime) || 0,
  });
  setTopBeatPlaying(false);
  return false;
}

function pauseTopBeat({ quiet = false } = {}) {
  const audio = topBeatAudio();
  if (audio) {
    audio.pause();
  }
  pauseYouTubeBeat({ quiet: true });
  if (appState.player.status === "playing" || appState.player.status === "loading") {
    PlayerStore.setStatus("paused");
  }
  setTopBeatPlaying(false);
  if (!quiet) showToast("Beat pausado", "pause");
}

function toggleTopBeat() {
  toggleBeatPlayback(topBeatOfDay);
}

function playBeatByOffset(offset) {
  const current = currentPlayingBeat();
  if (!current?.id) return;
  const queue = dedupeById([topBeatOfDay, ...marketplaceBeats()]);
  const index = queue.findIndex((item) => item.id === current?.id);
  if (index < 0) return;
  const next = appState.player.shuffle && offset > 0
    ? queue[Math.floor(Math.random() * queue.length)]
    : queue[(index + offset + queue.length) % queue.length];
  playBeat(next, { quiet: true });
}

window.addEventListener("load", () => {
  topBeatAudio()?.addEventListener("ended", () => {
    const audio = topBeatAudio();
    PlayerStore.setStatus("ended", {
      duration: Number(audio?.duration) || 0,
      currentTime: Number(audio?.duration) || 0,
    });
    setTopBeatPlaying(false);
  });
  topBeatAudio()?.addEventListener("pause", () => {
    if (isCurrentYoutubeSource() || appState.player.status === "ended") return;
    if (isAudioPauseEventSuppressed()) return;
    const audio = topBeatAudio();
    PlayerStore.setStatus("paused", {
      duration: Number(audio?.duration) || 0,
      currentTime: Number(audio?.currentTime) || 0,
    });
    setTopBeatPlaying(false);
  });
  topBeatAudio()?.addEventListener("timeupdate", updateMiniProgress);
  topBeatAudio()?.addEventListener("loadedmetadata", () => {
    const audio = topBeatAudio();
    PlayerStore.setStatus(appState.player.status, {
      duration: Number(audio?.duration) || 0,
      currentTime: Number(audio?.currentTime) || 0,
    });
    updateMiniProgress();
  });
  window.setInterval(() => {
    const player = document.querySelector(".mini-player");
    if (!player?.classList.contains("is-playing")) return;
    const audio = topBeatAudio();
    if (isCurrentYoutubeSource()) {
      updateMiniProgress();
      return;
    }
    if (audio && audio.src && !audio.paused) return;
    if (appState.playing === topBeatOfDay.id) return;
    appState.player.previewTime = appState.player.loop && appState.player.previewTime >= 165
      ? 0
      : Math.min(165, (appState.player.previewTime || 0) + .5);
    updateMiniProgress();
  }, 500);
  applyPlayerAudioSettings();
  updateMiniPlayer(currentPlayingBeat(), Boolean(appState.playing));
}, { once: true });

function handleFavorite(id) {
  const item = findBeat(id);
  const rawId = item?.raw?.id || item?.id || id;
  if (appState.favorites.has(id)) {
    appState.favorites.delete(id);
    showToast("Removido dos favoritos", "heart");
    trackUserEvent("skip", "beat", rawId, { source: "favorite-toggle" });
  } else {
    appState.favorites.add(id);
    showToast("Adicionado aos favoritos", "heart");
    trackUserEvent("save", "beat", rawId, { source: "favorite-toggle" });
  }
  persistState();
  if (currentRoute() === "favoritos") renderRoute();
  else {
    document.querySelectorAll(`[data-action="favorite"][data-id="${id}"]`).forEach((button) => button.classList.toggle("is-favorite", appState.favorites.has(id)));
    const isFav = appState.favorites.has(id);
    document.querySelectorAll(`[data-feed-item-id="${id}"][data-action="nexo-feed-like"], [data-feed-item-id="${id}"][data-action="nexo-feed-save"]`).forEach((btn) => btn.classList.toggle("is-active", isFav));
  }
}

function handleBuy(id, selectedPlan = "premium") {
  const item = findBeat(id);
  trackUserEvent("buy", "beat", item?.raw?.id || item?.id || id, { source: "buy-button", selectedPlan });
  addToCart(id, selectedPlan);
  location.hash = "carrinho";
}

function profileFromAccountForm(form, email) {
  const selectedRole = form.querySelector('input[name="account-role"]:checked')?.value || "produtor";
  const styles = [...form.querySelectorAll('input[name="account-styles"]:checked')].map((input) => input.value);
  const name = form.elements.name?.value?.trim() || email.split("@")[0] || "Usuario ANSEND";
  return {
    email,
    full_name: name,
    artistic_name: form.elements.store?.value?.trim() || null,
    account_role: selectedRole,
    music_styles: styles.length ? styles : preferredGenres(),
    onboarding_goal: appState.onboardingProfile?.goal || null,
  };
}

function isEmailRateLimitError(error) {
  const text = String(error?.message || error?.error_description || error?.name || "").toLowerCase();
  return /rate|limit|too many|security/.test(text) && /email|signup|sign up|rate|limit/.test(text);
}

function friendlyAuthError(error) {
  if (isEmailRateLimitError(error)) return "Acesso liberado em modo seguro. Continue usando a plataforma enquanto sincronizamos sua conta.";
  const text = String(error?.message || "");
  if (/invalid login|invalid credentials/i.test(text)) return "E-mail ou senha não conferem. Revise os dados e tente novamente.";
  if (/password/i.test(text)) return "A senha precisa atender aos requisitos mínimos da conta.";
  if (/email/i.test(text)) return "Confira o e-mail informado e tente novamente.";
  return "Não foi possível concluir agora. Tente novamente em instantes.";
}

function setAuthFormMessage(form, message = "", type = "error") {
  const messageEl = form?.querySelector("[data-auth-message]");
  if (!messageEl) return;
  messageEl.textContent = message;
  messageEl.hidden = !message;
  messageEl.dataset.type = type;
}

function setAuthSubmitState(form, isLoading) {
  const submitButton = form?.querySelector(".seller-submit");
  if (!submitButton) return;
  submitButton.disabled = isLoading;
  submitButton.dataset.loading = isLoading ? "true" : "false";
  submitButton.innerHTML = isLoading
    ? `Entrando...<i data-lucide="loader-circle"></i>`
    : `${form.dataset.mode === "login" ? "Entrar no painel" : "Criar conta"}<i data-lucide="arrow-right"></i>`;
  lucide.createIcons();
}

function redirectAfterLogin() {
  const targetHash = "#perfil";
  if (location.pathname === "/auth/callback") {
    window.history.replaceState({}, "", `/${location.search || ""}${location.hash || ""}`);
  }
  if (location.hash !== targetHash) location.hash = targetHash;
  renderRoutePreservingAuthFocus(true);
}

function publicAppUrl() {
  return /^https?:\/\//i.test(location.origin) ? location.origin : ANSEND_PUBLIC_APP_URL;
}

function googleOAuthRedirectUrl() {
  const url = new URL("/auth/callback", publicAppUrl());
  url.searchParams.set("ansend_oauth", "google");
  return url.toString();
}

function readOAuthCallbackError() {
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(String(window.location.hash || "").replace(/^#/, ""));
  const error = params.get("error_description") || params.get("error") || hashParams.get("error_description") || hashParams.get("error");
  return error ? decodeURIComponent(error.replace(/\+/g, " ")) : "";
}

function hasOAuthRedirectIntent() {
  const params = new URLSearchParams(window.location.search);
  return params.get("ansend_oauth") === "google" || localStorage.getItem(OAUTH_REDIRECT_STORAGE_KEY) === "#perfil";
}

function clearOAuthRedirectIntent() {
  localStorage.removeItem(OAUTH_REDIRECT_STORAGE_KEY);
  const url = new URL(window.location.href);
  url.searchParams.delete("ansend_oauth");
  url.searchParams.delete("error");
  url.searchParams.delete("error_code");
  url.searchParams.delete("error_description");
  const pathname = url.pathname === "/auth/callback" ? "/" : url.pathname;
  if (url.href !== window.location.href || pathname !== url.pathname) window.history.replaceState({}, "", `${pathname}${url.search}${url.hash}`);
}

async function validateOAuthProviderUrl(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "manual",
      credentials: "omit",
    });
    if (response.status >= 400) {
      const text = await response.text();
      if (/provider is not enabled|unsupported provider/i.test(text)) {
        throw new Error("Google OAuth ainda nao esta habilitado no Supabase Auth deste projeto.");
      }
      throw new Error("Supabase recusou o inicio do login com Google.");
    }
  } catch (error) {
    if (/Google OAuth|Supabase recusou/i.test(error.message || "")) throw error;
    debugAuth("google_oauth_preflight_skipped", { error: error.message || String(error) });
  }
}

async function handleGoogleOAuth(button) {
  const form = button?.closest(".seller-auth-panel")?.querySelector(".seller-auth-form");
  if (!supabaseClient) {
    setAuthFormMessage(form, "Supabase nao esta configurado neste ambiente.");
    showToast("Supabase nao esta configurado para login com Google.", "triangle-alert");
    return;
  }
  button.disabled = true;
  button.dataset.loading = "true";
  setAuthFormMessage(form, "Abrindo login com Google...", "success");
  localStorage.setItem(OAUTH_REDIRECT_STORAGE_KEY, "#perfil");
  try {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: googleOAuthRedirectUrl(),
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;
    if (!data?.url) throw new Error("Supabase nao retornou a URL de login do Google.");
    await validateOAuthProviderUrl(data.url);
    window.location.assign(data.url);
  } catch (error) {
    localStorage.removeItem(OAUTH_REDIRECT_STORAGE_KEY);
    button.disabled = false;
    button.dataset.loading = "false";
    console.error("[ANSEND auth] Google OAuth failed", error);
    setAuthFormMessage(form, friendlyAuthError(error));
    showToast(friendlyAuthError(error), "triangle-alert");
  }
}

async function handleResendConfirmationEmail(button) {
  const panel = button?.closest(".email-confirmation-card");
  const messageEl = panel?.querySelector("[data-auth-message]");
  const pending = pendingEmailConfirmation();
  const email = pending?.email || "";
  if (!email) {
    if (messageEl) {
      messageEl.textContent = "Volte ao cadastro e informe seu e-mail novamente.";
      messageEl.dataset.type = "error";
      messageEl.hidden = false;
    }
    return;
  }
  if (!supabaseClient?.auth?.resend) {
    if (messageEl) {
      messageEl.textContent = "Reenvio indisponivel neste ambiente. Abra o e-mail enviado ou tente criar a conta novamente.";
      messageEl.dataset.type = "error";
      messageEl.hidden = false;
    }
    return;
  }
  button.disabled = true;
  button.dataset.loading = "true";
  if (messageEl) {
    messageEl.textContent = "Reenviando link de confirmacao...";
    messageEl.dataset.type = "success";
    messageEl.hidden = false;
  }
  try {
    const { error } = await supabaseClient.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: emailConfirmationRedirectUrl(),
      },
    });
    if (error) throw error;
    if (messageEl) {
      messageEl.textContent = "Novo link enviado. Confira sua caixa de entrada.";
      messageEl.dataset.type = "success";
      messageEl.hidden = false;
    }
  } catch (error) {
    console.error("[ANSEND auth] confirmation resend failed", error);
    if (messageEl) {
      messageEl.textContent = friendlyAuthError(error);
      messageEl.dataset.type = "error";
      messageEl.hidden = false;
    }
  } finally {
    button.disabled = false;
    button.dataset.loading = "false";
  }
}

function unlockPreviewAccountFromProfile(profile, reason = "preview") {
  const previewProfile = {
    ...profile,
    id: `preview-${reason}-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  setLocalPreviewProfile(previewProfile);
  localStorage.setItem("ansend-open-catalog-form", "true");
  if (location.hash !== "#perfil") location.hash = "perfil";
  renderRoute();
  launchFirstAccountQuiz(previewProfile);
  return previewProfile;
}

async function handleAccountSubmit(form) {
  if (form.classList.contains("is-submitting")) return;
  const mode = form.dataset.mode;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;
  setAuthFormMessage(form);
  if (!email || !password) {
    setAuthFormMessage(form, "Preencha e-mail e senha para entrar.");
    form.reportValidity?.();
    return;
  }

  if (!supabaseClient) {
    if (mode === "login") {
      setAuthFormMessage(form, "Supabase nao esta configurado neste ambiente.");
      showToast("Use criar conta para liberar acesso neste ambiente.", "user-plus");
      return;
    }
    const profile = profileFromAccountForm(form, email);
    unlockPreviewAccountFromProfile(profile);
    showToast("Conta criada. Vamos personalizar sua experiência.", "badge-check");
    return;
  }

  form.classList.add("is-submitting");
  setAuthSubmitState(form, true);
  try {
    if (mode === "login") {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const session = data.session || (await supabaseClient.auth.getSession()).data?.session || null;
      if (!session?.user?.id) throw new Error("Sessao Supabase nao foi criada para este login.");
      await applySession(session, {
        source: "password_login",
        touchLogin: true,
        lastLoginAt: new Date().toISOString(),
      });
      setAuthFormMessage(form, "Login realizado. Abrindo seu painel...", "success");
      showToast("Login realizado", "cloud-check");
      redirectAfterLogin();
      return;
    }

    const profile = profileFromAccountForm(form, email);
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: emailConfirmationRedirectUrl(),
        data: {
          full_name: profile.full_name,
          account_role: profile.account_role,
          artistic_name: profile.artistic_name,
          music_styles: profile.music_styles,
        },
      },
    });
    if (error) throw error;
    if (data.user) {
      localStorage.setItem(pendingProfileKey(data.user.id), JSON.stringify(profile));
    }
    const session = data.session || (await supabaseClient.auth.getSession()).data?.session || null;
    if (session?.user?.id) {
      const result = await upsertProfile(profileFromAuthUser(session.user, profile));
      if (result.error) {
        console.error("[ANSEND auth] signup profile upsert failed", result.error);
      } else {
        localStorage.removeItem(pendingProfileKey(session.user.id));
      }
      await applySession(session, {
        source: "signup",
        touchLogin: true,
        lastLoginAt: new Date().toISOString(),
      });
      showToast("Conta criada e perfil salvo", "badge-check");
    } else if (data.user) {
      rememberEmailConfirmation({
        email,
        name: profile.full_name,
        role: profile.account_role,
      });
      showToast("Conta criada. Confirme o e-mail para iniciar a sessao.", "mail-check");
    }
    localStorage.setItem("ansend-open-catalog-form", "true");
    if (appState.authUser) {
      clearEmailConfirmation();
      setAuthFormMessage(form, "Conta criada. Abrindo seu painel...", "success");
      redirectAfterLogin();
      launchFirstAccountQuiz(profile, data.user);
    } else {
      setAuthFormMessage(form, "Conta criada. Confira seu e-mail para ativar o acesso.", "success");
      if (location.hash !== "#confirmar-email") location.hash = "confirmar-email";
      renderEmailConfirmation();
      hydrateView();
    }
  } catch (error) {
    if (mode === "signup" && isEmailRateLimitError(error)) {
      const profile = profileFromAccountForm(form, email);
      unlockPreviewAccountFromProfile(profile, "email");
      showToast("Conta liberada. Vamos personalizar sua experiência.", "badge-check");
      return;
    }
    console.error("[ANSEND auth] login/signup failed", error);
    setAuthFormMessage(form, friendlyAuthError(error));
    showToast(friendlyAuthError(error), "triangle-alert");
  } finally {
    form.classList.remove("is-submitting");
    setAuthSubmitState(form, false);
  }
}

async function handleLogout() {
  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  } else {
    clearLocalPreviewProfile();
  }
  await applySession(null, { source: "logout" });
  showToast("Você saiu da conta ANSEND", "log-out");
  renderApplication(true);
}

function scrollCatalog(button, direction) {
  const section = button.closest("section, .home-section");
  const row = section?.querySelector(".playlist-row, .beat-row, .avatar-row, .featured-professional-grid, .category-grid");
  if (row) {
    if (typeof pauseAutoScroll === "function") pauseAutoScroll(row, 2400);
    row.scrollBy({ left: direction * Math.max(320, row.clientWidth * .72), behavior: "smooth" });
  }
}

const menuToggle = document.querySelector(".menu-toggle");
menuToggle?.addEventListener("click", () => document.body.classList.toggle("menu-open"));
window.addEventListener("hashchange", () => renderRoutePreservingAuthFocus());
document.addEventListener("pointerdown", (event) => {
  if (event.target.closest?.(".seller-auth-form")) sellerAuthInteractionAt = Date.now();
}, true);

document.addEventListener("focusin", (event) => {
  if (event.target.closest?.(".seller-auth-form")) sellerAuthInteractionAt = Date.now();
}, true);

document.querySelector(".search")?.addEventListener("submit", (event) => {
  event.preventDefault();
  appState.query = document.querySelector("#search").value;
  trackUserEvent("search", "user_interest", appState.authUser?.id, { source: "global-search", query: appState.query });
  location.hash = "explorar";
  if (currentRoute() === "explorar") renderRoute();
});

document.addEventListener("pointerdown", (event) => {
  const waveform = event.target.closest(".mini-waveform");
  if (!waveform) return;
  event.preventDefault();
  seekMiniPlayerFromPointer(event);
  waveform.focus({ preventScroll: true });
  waveform.setPointerCapture?.(event.pointerId);
  const move = (moveEvent) => seekMiniPlayerFromPointer(moveEvent);
  const stop = () => {
    waveform.removeEventListener("pointermove", move);
    waveform.removeEventListener("pointerup", stop);
    waveform.removeEventListener("pointercancel", stop);
  };
  waveform.addEventListener("pointermove", move);
  waveform.addEventListener("pointerup", stop, { once: true });
  waveform.addEventListener("pointercancel", stop, { once: true });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && appState.chat.newChatOpen) {
    appState.chat.newChatOpen = false;
    renderChatPage({ preserveActive: true });
    return;
  }
  if (event.key === "Enter" && !event.shiftKey && event.target.closest?.(".chat-composer-form textarea")) {
    event.preventDefault();
    sendChatMessage(event.target.closest(".chat-composer-form"));
    return;
  }
  if (event.key === "Escape" && document.querySelector(".hiring-composer-popover:not([hidden])")) {
    closeHiringComposerPopovers(document);
  }

  const ansendSelect = event.target.closest?.(".ansend-select");
  if (ansendSelect) {
    const isTrigger = event.target.closest(".ansend-select-trigger");
    const isOption = event.target.getAttribute?.("role") === "option";
    if ((event.key === "Enter" || event.key === " ") && isTrigger) {
      event.preventDefault();
      ansendSelect.classList.contains("is-open") ? closeAnsendSelects() : openAnsendSelect(ansendSelect, { focusSelected: true });
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!ansendSelect.classList.contains("is-open")) openAnsendSelect(ansendSelect, { focusSelected: true });
      else focusAnsendSelectOption(ansendSelect, event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && isOption) {
      event.preventDefault();
      setAnsendSelectValue(ansendSelect, event.target.dataset.value);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeAnsendSelects();
      ansendSelect.querySelector(".ansend-select-trigger")?.focus({ preventScroll: true });
      return;
    }
  }

  if (event.target?.matches?.("#nexoChatInput") && event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    const form = event.target.closest(".nexo-chat-form");
    form?.requestSubmit();
    return;
  }
  if (event.target?.matches?.(".nexo-assistant-form textarea") && event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    event.target.closest(".nexo-assistant-form")?.requestSubmit();
    return;
  }
  const customSelect = event.target.closest?.(".nexo-dark-select");
  if (customSelect) {
    const field = customSelect.closest(".nexo-custom-select-field");
    const options = [...(field?.querySelectorAll("[role='option']") || [])];
    const currentIndex = Math.max(0, options.findIndex((option) => option.getAttribute("aria-selected") === "true"));
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const isOpen = field.classList.toggle("is-open");
      customSelect.setAttribute("aria-expanded", String(isOpen));
      closeNexoSelects(field);
      if (isOpen) updateNexoSelectDirection(field);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeNexoSelects();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = event.key === "ArrowDown"
        ? Math.min(options.length - 1, currentIndex + 1)
        : Math.max(0, currentIndex - 1);
      if (options[nextIndex]) chooseNexoSelectOption(options[nextIndex]);
      return;
    }
  }
  const waveform = event.target.closest(".mini-waveform");
  if (!waveform) return;
  const audio = topBeatAudio();
  const youtubePlayer = youtubeBeatPlayerState.player;
  const isYoutube = isCurrentYoutubeSource() && youtubePlayer?.getDuration && youtubePlayer?.getCurrentTime;
  const isAudioBeat = !isYoutube && Boolean(appState.playing) && audio && audio.src;
  const duration = isYoutube && Number.isFinite(Number(youtubePlayer.getDuration()))
    ? Number(youtubePlayer.getDuration())
    : isAudioBeat && Number.isFinite(audio.duration)
      ? audio.duration
      : 165;
  const current = isYoutube && Number.isFinite(Number(youtubePlayer.getCurrentTime()))
    ? Number(youtubePlayer.getCurrentTime())
    : isAudioBeat
      ? audio.currentTime
      : appState.player.previewTime;
  const step = event.shiftKey ? 15 : 5;
  const keyMap = {
    ArrowLeft: current - step,
    ArrowRight: current + step,
    Home: 0,
    End: duration,
  };
  if (!(event.key in keyMap)) return;
  event.preventDefault();
  seekMiniPlayerToRatio(keyMap[event.key] / Math.max(1, duration));
});

document.addEventListener("click", (event) => {
  const ansendSelectToggle = event.target.closest("[data-action='ansend-select-toggle']");
  if (ansendSelectToggle) {
    event.preventDefault();
    const select = ansendSelectToggle.closest(".ansend-select");
    select?.classList.contains("is-open") ? closeAnsendSelects() : openAnsendSelect(select);
    return;
  }

  const ansendSelectOption = event.target.closest("[data-action='ansend-select-option']");
  if (ansendSelectOption) {
    event.preventDefault();
    setAnsendSelectValue(ansendSelectOption.closest(".ansend-select"), ansendSelectOption.dataset.value);
    return;
  }

  if (!event.target.closest(".ansend-select")) closeAnsendSelects();

  const hiringComposerPopoverButton = event.target.closest("[data-action='hiring-composer-popover']");
  if (hiringComposerPopoverButton) {
    event.preventDefault();
    openHiringComposerPopover(hiringComposerPopoverButton.closest(".hiring-composer"), hiringComposerPopoverButton.dataset.popover);
    return;
  }

  const hiringComposerChoice = event.target.closest("[data-action='hiring-composer-choice']");
  if (hiringComposerChoice) {
    event.preventDefault();
    setHiringComposerChoice(hiringComposerChoice.closest(".hiring-composer"), hiringComposerChoice);
    return;
  }

  const hiringComposerReferenceSave = event.target.closest("[data-action='hiring-composer-reference-save']");
  if (hiringComposerReferenceSave) {
    event.preventDefault();
    const form = hiringComposerReferenceSave.closest(".hiring-composer");
    const input = form?.querySelector("#hiringReferenceInput");
    const value = String(input?.value || "").trim();
    if (form && value) {
      form.elements.references.value = value.slice(0, 240);
      input.value = "";
      closeHiringComposerPopovers(form);
      updateHiringComposerChips(form);
    }
    return;
  }

  const hiringComposerChipRemove = event.target.closest("[data-action='hiring-composer-chip-remove']");
  if (hiringComposerChipRemove) {
    event.preventDefault();
    removeHiringComposerChip(hiringComposerChipRemove.closest(".hiring-composer"), hiringComposerChipRemove.dataset.field);
    return;
  }

  if (event.target.closest("[data-action='hiring-composer-popover-close']")) {
    event.preventDefault();
    closeHiringComposerPopovers(event.target.closest(".hiring-composer"));
    return;
  }

  if (event.target.closest("[data-action='hiring-composer-soon']")) {
    event.preventDefault();
    showToast("Recurso preparado para a proxima etapa.", "sparkles");
    return;
  }

  if (!event.target.closest(".hiring-composer-popover, [data-action='hiring-composer-popover']")) {
    closeHiringComposerPopovers(document);
  }

  const communityAdPlay = event.target.closest("[data-action='community-ad-play']");
  if (communityAdPlay) {
    event.preventDefault();
    event.stopPropagation();
    toggleCommunityAdPlayback(communityAdPlay.dataset.adId || communityAdPlay.closest("[data-promoted-ad-id]")?.dataset.promotedAdId || "");
    return;
  }

  const communityAdLink = event.target.closest("[data-action='community-ad-open']");
  if (communityAdLink) {
    const adId = communityAdLink.dataset.adId || communityAdLink.closest("[data-promoted-ad-id]")?.dataset.promotedAdId || "";
    trackCommunityAdEvent("click", adId);
    return;
  }

  const chatSuggestion = event.target.closest("[data-action='nexo-chat-suggestion']");
  if (chatSuggestion) {
    event.preventDefault();
    sendNexoChatMessage(chatSuggestion.dataset.prompt || chatSuggestion.textContent);
    return;
  }

  const selectToggle = event.target.closest("[data-action='nexo-select-toggle']");
  if (selectToggle) {
    event.preventDefault();
    const field = selectToggle.closest(".nexo-custom-select-field");
    const isOpen = !field.classList.contains("is-open");
    closeNexoSelects(field);
    field.classList.toggle("is-open", isOpen);
    selectToggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) updateNexoSelectDirection(field);
    return;
  }
  const selectOption = event.target.closest("[data-action='nexo-select-option']");
  if (selectOption) {
    event.preventDefault();
    chooseNexoSelectOption(selectOption);
    return;
  }
  const subgenreChip = event.target.closest("[data-action='nexo-subgenre-chip']");
  if (subgenreChip) {
    event.preventDefault();
    const input = subgenreChip.closest(".nexo-subgenre-field")?.querySelector("input");
    if (input) {
      input.value = subgenreChip.dataset.value || subgenreChip.textContent.trim();
      input.focus();
    }
    return;
  }
  if (!event.target.closest(".nexo-custom-select-field")) closeNexoSelects();

  const routeLink = event.target.closest("a[data-route], button[data-route]");
  if (routeLink) {
    const targetRoute = routeLink.dataset.route;
    if (targetRoute === "explorar") {
      appState.query = "";
      appState.genre = "Todos";
      const searchInput = document.querySelector("#search");
      if (searchInput) searchInput.value = "";
    }
    if (currentRoute() === targetRoute) {
      renderRoute();
    }
  }

  const clickedFeedMedia = event.target.closest(".nexo-feed-media");
  if (clickedFeedMedia) {
    const feedCard = clickedFeedMedia.closest(".nexo-feed-card");
    if (feedCard && feedCard.dataset.feedType === "beat") {
      toggleNexoFeedCardPlayback(feedCard);
      return;
    }
  }

  const clickedBeatCard = event.target.closest(".beat-card");
  const target = event.target.closest("button, a");
  const clickedProfessionalCard = event.target.closest(".professional-card[data-action='professional-card-open']");
  if (!event.target.closest(".player-more-dropdown") && !event.target.closest('[data-action="more-player"]')) {
    closePlayerMoreMenu();
  }
  if (!event.target.closest(".player-volume-popover") && !event.target.closest('[data-action="volume"]')) {
    closePlayerVolumePanel();
  }
  if (!event.target.closest(".audio-editor-popover") && !event.target.closest('[data-action="edit-beat"]')) {
    document.querySelector(".audio-editor-popover")?.remove();
  }
  if (!target && clickedBeatCard) {
    location.hash = `beat-${clickedBeatCard.dataset.beatId}`;
    return;
  }
  if (clickedProfessionalCard) {
    if (target && clickedProfessionalCard.contains(target)) {
      event.stopPropagation();
    } else if (!isInteractiveProfessionalCardTarget(event.target)) {
      event.preventDefault();
      openProfessionalCardProfile(clickedProfessionalCard);
      return;
    }
  }
  if (!target) return;
  const action = target.dataset.action;
  const isPlayerDropdownAction = Boolean(target.closest(".player-more-dropdown"));
  if (target.closest(".professional-card[data-action='professional-card-open']")) {
    event.stopPropagation();
  }
  if (action === "professional-card-open") {
    event.preventDefault();
    openProfessionalCardProfile(target);
    return;
  }
  if (action === "release-mode-choice") {
    event.preventDefault();
    const mode = target.dataset.mode || "selector";
    appState.releaseMode = mode === "selector" ? "" : mode;
    if (mode !== "catalog") appState.catalogImport = null;
    renderMusicUpload(mode);
    hydrateView();
    return;
  }
  if (action === "catalog-mode") {
    const state = ensureCatalogImportState();
    state.mode = target.dataset.mode || "multi_upload";
    renderCatalogImportPage();
    hydrateView();
    return;
  }
  if (action === "catalog-analyze-youtube") {
    const box = target.closest(".catalog-import-youtube-box");
    analyzeCatalogYoutubeLinks(box?.querySelector("[data-catalog-youtube-links]")?.value || "");
    hydrateView();
    return;
  }
  if (action === "catalog-apply-bulk") {
    applyCatalogBulk();
    hydrateView();
    return;
  }
  if (action === "catalog-remove-invalid") {
    const state = ensureCatalogImportState();
    state.items = state.items.filter((item) => !["invalid", "duplicate", "failed"].includes(item.status));
    renderCatalogImportPage();
    hydrateView();
    return;
  }
  if (action === "catalog-remove-item") {
    const itemId = target.closest("[data-catalog-item-id]")?.dataset.catalogItemId;
    const state = ensureCatalogImportState();
    state.items = state.items.filter((item) => item.id !== itemId);
    renderCatalogImportPage();
    hydrateView();
    return;
  }
  if (action === "catalog-reset") {
    appState.catalogImport = defaultCatalogImportState();
    renderCatalogImportPage();
    hydrateView();
    return;
  }
  if (action === "catalog-publish") {
    publishCatalogImport();
    return;
  }
  if (action?.startsWith("nexo-assistant-")) {
    event.preventDefault();
    if (action === "nexo-assistant-toggle") {
      const opening = !appState.nexoAssistant.open || appState.nexoAssistant.minimized;
      appState.nexoAssistant.open = true;
      appState.nexoAssistant.minimized = false;
      appState.nexoAssistant.unread = false;
      writeNexoAssistantPrefs();
      renderNexoFloatingAssistant();
      if (opening && !appState.nexoChatMessages.length) void loadNexoConversationHistory();
      window.requestAnimationFrame(() => document.querySelector(".nexo-assistant-form textarea")?.focus({ preventScroll: true }));
      return;
    }
    if (action === "nexo-assistant-close") {
      appState.nexoAssistant.open = false;
      appState.nexoAssistant.minimized = false;
      writeNexoAssistantPrefs();
      renderNexoFloatingAssistant();
      return;
    }
    if (action === "nexo-assistant-minimize") {
      appState.nexoAssistant.open = true;
      appState.nexoAssistant.minimized = true;
      writeNexoAssistantPrefs();
      renderNexoFloatingAssistant();
      return;
    }
    if (action === "nexo-assistant-expand") {
      appState.nexoAssistant.expanded = !appState.nexoAssistant.expanded;
      writeNexoAssistantPrefs();
      renderNexoFloatingAssistant();
      return;
    }
    if (action === "nexo-assistant-cancel") {
      appState.nexoAssistant.abortController?.abort?.();
      appState.nexoChatLoading = false;
      appState.nexoAssistant.abortController = null;
      appState.nexoChatError = "Resposta cancelada.";
      updateNexoSurfaces({ forceScroll: false });
      return;
    }
    if (action === "nexo-assistant-suggestion") {
      sendNexoChatMessage(target.dataset.prompt || target.textContent || "");
      return;
    }
  }
  if (action?.startsWith("chat-")) {
    event.preventDefault();
    if (action === "chat-new-open") {
      appState.chat.newChatOpen = true;
      appState.chat.userSearch = "";
      appState.chat.userResults = [];
      renderChatPage({ preserveActive: true });
      window.requestAnimationFrame(() => document.querySelector("[data-chat-user-search]")?.focus());
      return;
    }
    if (action === "chat-new-close") {
      appState.chat.newChatOpen = false;
      renderChatPage({ preserveActive: true });
      return;
    }
    if (action === "chat-clear-search") {
      appState.chat.search = "";
      renderChatPage({ preserveActive: true });
      window.requestAnimationFrame(() => document.querySelector("[data-chat-search]")?.focus());
      return;
    }
    if (action === "chat-composer-focus") {
      target.closest(".chat-composer-form")?.querySelector("textarea[name='body']")?.focus();
      return;
    }
    if (action === "chat-composer-menu") {
      const conversationId = target.closest(".chat-composer-form")?.dataset.conversationId || appState.chat.activeConversationId;
      setChatComposerPanel(conversationId, appState.chat.composerMenuOpen === conversationId ? "" : "menu");
      renderChatPage({ preserveActive: true });
      return;
    }
    if (action === "chat-attachment-pick") {
      pickChatAttachment(target);
      return;
    }
    if (action === "chat-attachment-remove") {
      clearChatAttachmentDraft(target.closest(".chat-composer-form")?.dataset.conversationId || appState.chat.activeConversationId);
      renderChatPage({ preserveActive: true });
      return;
    }
    if (action === "chat-gif-toggle") {
      const conversationId = target.closest(".chat-composer-form")?.dataset.conversationId || appState.chat.activeConversationId;
      const opening = appState.chat.gifPickerOpen !== conversationId;
      setChatComposerPanel(conversationId, opening ? "gif" : "");
      renderChatPage({ preserveActive: true });
      if (opening && !appState.chat.gifResults.length) loadChatGifs(appState.chat.gifQuery || "");
      return;
    }
    if (action === "chat-gif-send") {
      sendChatGif(target.dataset.gifUrl || "", target.dataset.gifTitle || "GIF");
      return;
    }
    if (action === "chat-emoji-toggle") {
      const conversationId = target.closest(".chat-composer-form")?.dataset.conversationId || appState.chat.activeConversationId;
      setChatComposerPanel(conversationId, appState.chat.emojiPickerOpen === conversationId ? "" : "emoji");
      renderChatPage({ preserveActive: true });
      return;
    }
    if (action === "chat-emoji-insert") {
      insertChatEmoji(target.dataset.emoji || target.textContent || "");
      return;
    }
    if (action === "chat-retry-message") {
      retryChatMessage(target.dataset.failedId || "");
      return;
    }
    if (action === "chat-select-user") {
      openOrCreateDirectConversation(target.dataset.userId || "");
      return;
    }
    if (action === "chat-open-conversation") {
      navigateToChatConversation(target.dataset.conversationId || "");
      return;
    }
    if (action === "chat-back-list") {
      appState.chat.activeConversationId = "";
      renderChatPage({ preserveActive: true });
      return;
    }
    if (action === "chat-open-profile") {
      const profile = chatProfile(target.dataset.profileId || "");
      const route = profile ? publicProfileRoute(profile) : "";
      if (route) location.hash = route;
      return;
    }
    if (action === "chat-start-profile") {
      openOrCreateDirectConversation(target.dataset.profileId || "");
      return;
    }
    if (action === "chat-open-community-post") {
      const postId = target.dataset.postId || "";
      if (postId) location.hash = `${COMMUNITY_ROUTE}-${postId}`;
      return;
    }
    if (action === "chat-proposal-status") {
      updateChatProposalStatus(target.dataset.proposalId || "", target.dataset.messageId || "", target.dataset.status || "");
      return;
    }
  }
  if (action?.startsWith("hiring-")) {
    const postId = target.dataset.postId || target.closest("[data-post-id]")?.dataset.postId || "";
    if (action === "hiring-tab") {
      appState.hiring.activeTab = target.dataset.tab || "for-you";
      appState.hiring.lastLoadedAt = 0;
      renderHiringPage({ force: true });
      return;
    }
    if (action === "hiring-refresh") {
      appState.hiring.lastLoadedAt = 0;
      renderHiringPage({ force: true });
      return;
    }
    if (action === "hiring-focus-composer") {
      const composer = document.querySelector(".hiring-composer");
      composer?.classList.add("is-expanded");
      composer?.querySelector("textarea")?.focus();
      return;
    }
    if (action === "hiring-expand-composer") {
      const composer = target.closest(".hiring-composer");
      composer?.classList.add("is-expanded");
      composer?.querySelector(".hiring-composer-title")?.focus();
      return;
    }
    if (action === "hiring-toggle-filters") {
      const filters = document.querySelector(".hiring-filters");
      if (filters) filters.hidden = !filters.hidden;
      return;
    }
    if (action === "hiring-filter-chip") {
      try {
        const payload = JSON.parse(target.dataset.filterPayload || "{}");
        appState.hiring.filters = { ...appState.hiring.filters, ...payload };
        appState.hiring.lastLoadedAt = 0;
        renderHiringPage({ force: true });
      } catch (error) {
        console.error("[ANSEND hiring] invalid filter chip", error);
      }
      return;
    }
    if (action === "hiring-open-own-profile") {
      location.hash = "perfil";
      return;
    }
    if (action === "hiring-back") {
      location.hash = COMMUNITY_ROUTE;
      return;
    }
    if (action === "hiring-open-post") {
      if (postId) location.hash = `${COMMUNITY_ROUTE}-${postId}`;
      return;
    }
    if (action === "hiring-open-profile") {
      const route = publicProfileRouteFromTarget(target);
      if (route) location.hash = route;
      return;
    }
    if (action === "hiring-comment-toggle") {
      const section = target.closest(".hiring-post")?.querySelector(".hiring-comments");
      if (section) section.hidden = !section.hidden;
      return;
    }
    if (action === "hiring-like") {
      toggleHiringAction("like", postId);
      return;
    }
    if (action === "hiring-save") {
      toggleHiringAction("save", postId);
      return;
    }
    if (action === "hiring-repost") {
      toggleHiringAction("repost", postId);
      return;
    }
    if (action === "hiring-share") {
      navigator.clipboard?.writeText(hiringPostUrl(postId));
      showToast("Link copiado", "share");
      return;
    }
    if (action === "hiring-interest") {
      sendHiringInterest(postId);
      return;
    }
    if (action === "hiring-proposal-open") {
      openHiringProposalModal(postId);
      return;
    }
    if (action === "hiring-chat-open") {
      openHiringChat(postId);
      return;
    }
    if (action === "hiring-comment-delete") {
      deleteHiringComment(target.dataset.commentId);
      return;
    }
  }
  const feedHost = target.closest(".nexo-feed-card");
  if (feedHost && action && !action.startsWith("nexo-feed-")) {
    const feedItemId = feedHost.dataset.feedItemId;
    const feedItem = feedItemForEvent(feedItemId);
    writeNexoFeedEvent(feedItemId, action === "buy" ? "purchase_intent" : "click_cta", { item: feedItem });
  }
  if (action === "close-modal") {
    closeModal();
    closeMusicPreferenceQuiz();
    return;
  }
  if (action === "close-feed-comments") {
    closeNexoFeedComments();
    return;
  }
  if (action === "nexo-feed-comment-like") {
    target.classList.toggle("is-active");
    const comment = target.closest(".nexo-feed-comment");
    comment?.querySelector(".nexo-feed-comment-heart")?.classList.toggle("is-active", target.classList.contains("is-active"));
    return;
  }
  if (action === "nexo-feed-comment-reply") {
    const user = target.closest(".nexo-feed-comment")?.querySelector("strong")?.textContent || "";
    const input = document.querySelector(".nexo-feed-comment-form input");
    if (input) {
      input.value = user ? `@${user} ` : "";
      input.focus();
    }
    return;
  }
  if (action === "nexo-feed-comment-replies") {
    target.classList.toggle("is-open");
    const count = target.dataset.replies || "1";
    target.innerHTML = target.classList.contains("is-open")
      ? `<span></span>Ocultar respostas`
      : `<span></span>Ver todas as ${count} respostas`;
    return;
  }
  if (action === "nexo-feed-comment-emoji") {
    const input = target.closest(".nexo-feed-comment-form")?.querySelector("input");
    if (input) {
      input.value = `${input.value}${input.value ? " " : ""}😍`;
      input.focus();
    }
    return;
  }
  if (action === "close-audio-editor") {
    document.querySelector(".audio-editor-popover")?.remove();
    return;
  }
  if (action === "profile-editor-tab") {
    const form = target.closest(".profile-editor-shell");
    form?.querySelectorAll(".profile-editor-tab").forEach((tab) => tab.classList.toggle("is-active", tab === target));
    form?.querySelectorAll(".profile-editor-panel").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.profilePanel === target.dataset.tab));
    return;
  }
  if (action === "profile-image-picker-open") {
    openProfileImagePicker(target.dataset.imageType || "avatar");
    return;
  }
  if (action === "profile-image-picker-close") {
    closeProfileImagePicker();
    return;
  }
  if (action === "profile-image-picker-browse") {
    browseProfileImage();
    return;
  }
  if (action === "profile-image-remove") {
    removeProfileImage(target.dataset.imageType || "");
    return;
  }
  if (action === "set-locale") {
    setLocale(target.dataset.localeOption, { manual: true });
    renderRoutePreservingAuthFocus();
    showToast(appLocale.current === "pt-BR" ? "Idioma alterado para portugues" : "Language changed to English", "globe-2");
    return;
  }
  if (action === "seller") {
    appState.sellerMode = hasAccountAccess() ? "login" : "signup";
    location.hash = "vendedor";
    return;
  }
  if (action === "skip-onboarding") {
    persistOnboarding({ completed: true, account_role: "artista", userType: "artista", roleLabel: "Artista", styles: ["trap", "drill"], genres: ["Trap", "Drill", "Type Beat"], goal: "descobrir", goalLabel: "Descobrir produtores" });
    saveMusicProfile(createDefaultMusicProfile({ completed: true }));
    closeOnboarding();
    if (currentRoute() === "feed") {
      renderRoute();
    }
    showToast("Feed personalizado com uma curadoria inicial", "sparkles");
    return;
  }
  if (action === "restart-onboarding") {
    showMusicPreferenceQuiz(true);
    return;
  }
  if (action === "start-nexo-match") {
    showMusicPreferenceQuiz(true);
    return;
  }
  if (action === "skip-nexo-match") {
    saveMusicProfile(createDefaultMusicProfile({ completed: true }));
    markFirstAccountQuizCompleted();
    closeMusicPreferenceQuiz();
    renderRoute();
    showToast("Perfil musical inicial criado pela NEXO", "sparkles");
    return;
  }
  if (action === "nexo-quiz-back") {
    appState.nexoQuiz = readNexoQuiz();
    appState.nexoQuizStep = Math.max(0, Number(appState.nexoQuizStep || 0) - 1);
    appState.nexoQuizError = "";
    appState.nexoQuizEditing = true;
    renderAiWorkspace();
    hydrateView();
    return;
  }
  if (action === "nexo-quiz-new") {
    localStorage.removeItem(NEXO_DIAGNOSIS_STORAGE_KEY);
    localStorage.removeItem(NEXO_QUIZ_STORAGE_KEY);
    appState.nexoQuiz = nexoDefaultQuiz();
    appState.nexoQuizStep = 0;
    appState.nexoQuizError = "";
    appState.nexoQuizEditing = true;
    renderAiWorkspace();
    hydrateView();
    return;
  }
  if (action === "nexo-quiz-edit") {
    appState.nexoQuiz = readNexoQuiz();
    appState.nexoQuizStep = 0;
    appState.nexoQuizError = "";
    appState.nexoQuizEditing = true;
    renderAiWorkspace();
    hydrateView();
    return;
  }
  if (action === "seller-mode") {
    appState.sellerMode = target.dataset.mode || "login";
    renderRoute();
    return;
  }
  if (action === "seller-google") {
    handleGoogleOAuth(target);
    return;
  }
  if (action === "open-gmail") {
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank", "noopener,noreferrer");
    return;
  }
  if (action === "resend-confirmation-email") {
    handleResendConfirmationEmail(target);
    return;
  }
  if (action === "admin-refresh") {
    renderAdmin();
    hydrateView();
    return;
  }
  if (action === "admin-delete-profile") {
    deleteProfessionalAccount(target.dataset.userId, target);
    return;
  }
  if (action === "admin-delete-beat") {
    if (isPlayerDropdownAction) closePlayerMoreMenu();
    deleteBeatItem(target.dataset.id || target.closest("[data-beat-id]")?.dataset.beatId, target.dataset.sourceTable, target);
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
  if (action === "professional-filter") {
    appState.professionalCategory = target.dataset.category || "todos";
    renderProducers();
    hydrateView();
    return;
  }
  if (action === "professional-contact") {
    const profileId = target.dataset.profileId || target.closest(".professional-card")?.dataset.id || resolveProfileReference({ title: target.dataset.title })?.id || "";
    trackUserEvent("hire", "professional", profileId, { source: "professional-contact", title: target.dataset.title || "" });
    openProfessionalContract(target.dataset.title);
    return;
  }
  if (action === "release-step" || action === "release-step-click") {
    const form = releaseFormElement();
    const current = releaseCurrentStep(form);
    const targetStep = Number(target.dataset.step);
    if (targetStep < current) {
      setReleaseStep(targetStep, form);
    } else if (targetStep > current) {
      let canGo = true;
      for (let i = current; i < targetStep; i++) {
        if (!validateReleaseStep(i)) {
          canGo = false;
          setReleaseStep(i, form);
          break;
        }
      }
      if (canGo) {
        setReleaseStep(targetStep, form);
      }
    }
    return;
  }
  if (action === "release-next") {
    const form = releaseFormElement();
    const current = releaseCurrentStep(form);
    if (validateReleaseStep(current)) {
      setReleaseStep(current + 1, form);
    }
    return;
  }
  if (action === "release-back") {
    const form = releaseFormElement();
    const current = releaseCurrentStep(form);
    if (current <= 0) {
      appState.releaseMode = "";
      renderMusicUpload("selector");
    } else {
      setReleaseStep(current - 1, form);
    }
    return;
  }
  if (action === "release-preview-play") {
    const form = releaseFormElement();
    const src = form?.elements.audio_url?.value;
    if (!src) {
      showToast("Selecione um arquivo de audio primeiro", "file-audio");
      return;
    }
    const item = {
      id: `release-preview`,
      title: form.elements.title?.value || "Preview do release",
      producer: form.elements.artist?.value || "ANSEND",
      cover: form.elements.cover_url?.value || "assets/ansend-logo-square.png",
      audio: src,
      tags: [form.elements.genre?.value || "Preview"],
    };
    playBeat(item);
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
  if (action === "nexo-feed-prev" || action === "nexo-feed-next") {
    scrollNexoFeed(action === "nexo-feed-next" ? 1 : -1);
    return;
  }
  if (action?.startsWith("nexo-feed-")) {
    const itemId = target.dataset.feedItemId;
    const item = feedItemForEvent(itemId);
    if (!item) return;
    const eventMap = {
      "nexo-feed-like": "like",
      "nexo-feed-save": "save",
      "nexo-feed-share": "share",
      "nexo-feed-comments": "click_cta",
      "nexo-feed-profile": "open_profile",
      "nexo-feed-open": "click_cta",
      "nexo-feed-plan": "add_to_plan",
      "nexo-feed-hide": "not_interested",
      "nexo-feed-similar": "view_similar",
    };
    writeNexoFeedEvent(itemId, eventMap[action] || "click_cta", { item });
    if (action === "nexo-feed-like" || action === "nexo-feed-save") {
      if (item.type === "beat") {
        const beatId = item.metadata?.beatId || item.id;
        handleFavorite(beatId);
      } else {
        target.classList.toggle("is-active");
      }
      return;
    }
    if (action === "nexo-feed-comments") {
      openNexoFeedComments(item);
      return;
    }
    if (action === "nexo-feed-open") {
      if (item.type === "beat" || item.type === "music") {
        const beatId = item.metadata?.beatId || item.sourceId || item.id;
        location.hash = `beat-${beatId}`;
      } else if (item.type === "service") {
        location.hash = "produtores";
      } else {
        showToast("Detalhes preparados para esta publicacao.", "external-link");
      }
      return;
    }
    if (action === "nexo-feed-share") {
      navigator.clipboard?.writeText(`${location.origin}${location.pathname}#nexo-feed`);
      target.classList.add("is-active");
      return;
    }
    if (action === "nexo-feed-profile") {
      const route = publicProfileRouteFromTarget(target) || publicProfileRoute(resolveProfileReference({
        id: item.creatorId,
        username: item.creatorUsername,
        title: item.creatorName,
      }));
      location.hash = route || "perfil";
      return;
    }
    if (action === "nexo-feed-hide") {
      const hidden = new Set(readFeedList(NEXO_FEED_NOT_INTERESTED_KEY));
      hidden.add(itemId);
      localStorage.setItem(NEXO_FEED_NOT_INTERESTED_KEY, JSON.stringify([...hidden]));
      renderNexoFeed();
      hydrateView();
      return;
    }
    if (action === "nexo-feed-similar") {
      const taste = readFeedObject(NEXO_FEED_TASTE_KEY);
      taste.categories = taste.categories || {};
      taste.categories[item.category] = (taste.categories[item.category] || 0) + 8;
      localStorage.setItem(NEXO_FEED_TASTE_KEY, JSON.stringify(taste));
      renderNexoFeed();
      hydrateView();
      return;
    }
  }
  if (target.dataset.route && target.tagName === "BUTTON") location.hash = target.dataset.route;
  if (action === "retry-upload") {
    const type = target.dataset.uploadType;
    const file = releaseLastFiles.get(type);
    if (!file) {
      showToast("Selecione o arquivo novamente para tentar o envio.", "upload-cloud");
      return;
    }
    handleReleaseFile(file, type);
    return;
  }
  if (action === "play-catalog") {
    const item = appState.ownedCatalogItems.find((entry) => entry.id === target.dataset.id);
    if (item) {
      const beatItem = catalogItemToBeat(item);
      toggleBeatPlayback(beatItem);
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
  if (action === "select-beat-license") {
    const page = target.closest(".beat-market-detail");
    const licenseId = target.dataset.license || "premium";
    const plan = licensePlans[licenseId] || licensePlans.premium;
    if (!page || !plan) return;
    page.dataset.selectedLicense = licenseId;
    page.querySelectorAll(".beat-license-card").forEach((card) => {
      const selected = card === target;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-pressed", selected ? "true" : "false");
    });
    page.querySelector("[data-license-total]").textContent = plan.price;
    page.querySelector("[data-license-terms]").innerHTML = licenseTermsMarkup(plan);
    page.querySelectorAll("[data-action='detail-add-cart'], [data-action='detail-buy-now']").forEach((button) => {
      button.dataset.license = licenseId;
    });
    lucide.createIcons();
    return;
  }
  if (action === "detail-add-cart") {
    addToCart(target.dataset.id, target.dataset.license || "premium");
    return;
  }
  if (action === "detail-buy-now") {
    openCheckout(target.dataset.id, target.dataset.license || "premium");
    return;
  }
  if (action === "buy") handleBuy(target.dataset.id, target.dataset.license || "premium");
  if (action === "remove-from-cart") {
    removeFromCart(target.dataset.id);
    return;
  }
  if (action === "clear-cart") {
    clearCart();
    showToast("Carrinho limpo", "trash-2");
    if (currentRoute() === "carrinho") renderCart();
    return;
  }
  if (action === "clear-purchases") {
    clearPurchases();
    return;
  }
  if (action === "finalize-cart") {
    openCartCheckout();
    return;
  }
  if (action === "download-secure-file") {
    const beatId = target.dataset.beatId;
    const fileType = target.dataset.fileType;
    downloadPurchasedFile(beatId, fileType);
    return;
  }
  if (action === "view-purchased-contract") {
    const text = generateContractText(
      target.dataset.beatTitle,
      target.dataset.producerName,
      target.dataset.buyerName,
      target.dataset.licenseName,
      target.dataset.royaltyBuyer,
      target.dataset.royaltyProducer,
      "Ilimitados",
      target.dataset.filesIncluded,
      target.dataset.dateString
    );
    openContractModal(text);
    return;
  }
  if (action === "view-contract-modal-trigger") {
    event.preventDefault();
    if (target.dataset.isCart === "true") {
      (async () => {
        openModal(`<div style="display:flex; justify-content:center; align-items:center; min-height:150px; background:#0f0f0f; border-radius:8px;"><i data-lucide="loader-circle" class="animate-spin" style="width:32px; height:32px; color:#fff;"></i></div>`);
        lucide.createIcons();
        try {
          let combinedText = "";
          for (const entry of appState.cart) {
            const { beatId, licenseId } = splitCartEntry(entry);
            const beat = findBeat(beatId);
            if (!beat) continue;
            const licenses = await fetchBeatLicenses(beatId);
            const license = licenses.find(l => l.id === licenseId || l.license_key === licenseId) || 
                            generateDefaultLicensesForBeat(beat).find(l => l.id === licenseId || l.license_key === licenseId);
            if (license) {
              const streamLimit = license.unlimited_streams ? "Ilimitados" : (license.stream_limit ? license.stream_limit.toLocaleString("pt-BR") : "50.000");
              const includedFiles = [
                license.included_mp3 ? "MP3" : "",
                license.included_wav ? "WAV" : "",
                license.included_stems ? "Stems" : ""
              ].filter(Boolean).join(" + ");
              const producerName = String(beat.producer || "ANSEND").replace(/^prod\.\s*/i, "");
              const buyerName = appState.authUser?.user_metadata?.full_name || appState.authUser?.email?.split("@")[0] || "LICENCIADO";
              const dateString = new Date().toLocaleDateString("pt-BR");
              combinedText += generateContractText(
                beat.title,
                producerName,
                buyerName,
                license.name,
                license.buyer_royalty_percentage,
                license.producer_royalty_percentage,
                streamLimit,
                includedFiles,
                dateString
              ) + "\n\n==================================================\n\n";
            }
          }
          closeModal();
          openContractModal(combinedText || "Nenhum contrato disponível no momento.");
        } catch (err) {
          console.error("Error loading contracts:", err);
          closeModal();
          showToast("Erro ao carregar contratos.", "alert-triangle");
        }
      })();
    } else {
      const beatId = target.dataset.beatId;
      const licenseId = target.dataset.licenseId;
      const beat = findBeat(beatId);
      const producerName = String(beat.producer || "ANSEND").replace(/^prod\.\s*/i, "");
      const buyerName = appState.authUser?.user_metadata?.full_name || appState.authUser?.email?.split("@")[0] || "LICENCIADO";
      fetchBeatLicenses(beatId).then(licenses => {
        const license = licenses.find(l => l.id === licenseId || l.license_key === licenseId) || 
                        generateDefaultLicensesForBeat(beat).find(l => l.id === licenseId || l.license_key === licenseId);
        if (license) {
          const streamLimit = license.unlimited_streams ? "Ilimitados" : (license.stream_limit ? license.stream_limit.toLocaleString("pt-BR") : "50.000");
          const includedFiles = [
            license.included_mp3 ? "MP3" : "",
            license.included_wav ? "WAV" : "",
            license.included_stems ? "Stems" : ""
          ].filter(Boolean).join(" + ");
          const dateString = new Date().toLocaleDateString("pt-BR");
          const text = generateContractText(
            beat.title,
            producerName,
            buyerName,
            license.name,
            license.buyer_royalty_percentage,
            license.producer_royalty_percentage,
            streamLimit,
            includedFiles,
            dateString
          );
          openContractModal(text);
        }
      });
    }
    return;
  }
  if (action === "play") {
    const item = findBeat(target.dataset.id);
    if (item) {
      toggleBeatPlayback(item);
    }
    if (target.closest(".queue-tool-modal")) closeModal();
  }
  if (action === "hero-beat-play") {
    toggleTopBeat();
    return;
  }
  if (action === "close-mini-player") {
    closeMiniPlayer();
    return;
  }
  if (action === "mini-play") {
    toggleBeatPlayback(currentPlayingBeat());
    return;
  }
  if (action === "prev-track") {
    playBeatByOffset(-1);
    return;
  }
  if (action === "next-track") {
    playBeatByOffset(1);
    return;
  }
  if (action === "favorite-current") {
    handleFavorite(currentPlayingBeat()?.id);
    syncMiniPlayerState();
    lucide.createIcons();
    return;
  }
  if (action === "buy-current") {
    const current = currentPlayingBeat();
    if (!current?.id) return;
    handleBuy(current.id, "premium");
    return;
  }
  if (action === "edit-beat") {
    openAudioEditor();
    return;
  }
  if (action === "loop-beat") {
    toggleCurrentLoop();
    return;
  }
  if (action === "volume") {
    openVolumePanel();
    return;
  }
  if (action === "close-volume-panel") {
    closePlayerVolumePanel();
    return;
  }
  if (action === "player-mute") {
    if (appState.player.volume > .02) {
      appState.player.previousVolume = appState.player.volume;
      appState.player.volume = 0;
    } else {
      appState.player.volume = Number(appState.player.previousVolume) > .02 ? Number(appState.player.previousVolume) : .82;
    }
    persistState();
    syncMiniPlayerState();
    lucide.createIcons();
    return;
  }
  if (action === "queue") {
    openQueuePanel();
    return;
  }
  if (action === "more-player") {
    openMorePlayerMenu();
    return;
  }
  if (action === "reset-player-editor") {
    appState.player.speed = 1;
    appState.player.pitch = 0;
    persistState();
    applyPlayerAudioSettings();
    openAudioEditor();
    showToast("Editor resetado", "rotate-ccw");
    return;
  }
  if (action === "share-current") {
    if (isPlayerDropdownAction) closePlayerMoreMenu();
    shareCurrentBeat(target.dataset.id ? findBeat(target.dataset.id) : playerActionBeat());
    return;
  }
  if (action === "repost-current") {
    if (isPlayerDropdownAction) closePlayerMoreMenu();
    const item = playerActionBeat();
    const reposts = JSON.parse(localStorage.getItem("ansend-reposts") || "[]");
    if (!reposts.includes(item.id)) reposts.unshift(item.id);
    localStorage.setItem("ansend-reposts", JSON.stringify(reposts.slice(0, 60)));
    showToast(`${item.title} repostado`, "repeat");
    return;
  }
  if (action === "comments-current") {
    if (isPlayerDropdownAction) closePlayerMoreMenu();
    openCommentsPanel();
    return;
  }
  if (action === "report-current") {
    if (isPlayerDropdownAction) closePlayerMoreMenu();
    openReportCurrentBeat(target.dataset.id ? findBeat(target.dataset.id) : playerActionBeat());
    return;
  }
  if (action === "add-playlist-current") {
    if (isPlayerDropdownAction) closePlayerMoreMenu();
    addCurrentToPlaylist(target.dataset.id ? findBeat(target.dataset.id) : playerActionBeat());
    return;
  }
  if (action === "shuffle-current") {
    togglePlayerShuffle();
    closePlayerMoreMenu();
    return;
  }
  if (action === "go-current-track") {
    const item = playerActionBeat();
    if (!item?.id) return;
    closePlayerFloatingPanels();
    closeModal();
    location.hash = `beat-${item.id}`;
    return;
  }
  if (action === "go-current-artist") {
    const item = playerActionBeat();
    const route = currentBeatArtistRoute(item);
    closePlayerFloatingPanels();
    closeModal();
    if (route) {
      location.hash = route;
    } else {
      openProfessionalProfile(item.producer);
    }
    return;
  }
  if (action === "category-click") {
    appState.professionalCategory = target.dataset.category || "todos";
  }
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
  if (action === "ai-next-route") {
    location.hash = target.dataset.route || "produtores";
    return;
  }
  if (action === "producer") {
    const profileId = target.dataset.profileId || resolveProfileReference({ username: target.dataset.profileUsername, title: target.dataset.title })?.id || "";
    trackUserEvent("click", "professional", profileId, { source: "producer-open", title: target.dataset.title || "" });
    const route = publicProfileRouteFromTarget(target);
    if (route) location.hash = route;
    return;
  }
  if (action === "producer-focus") document.querySelector("#producerProfile")?.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
  if (action === "follow-producer") {
    const profileId = target.dataset.profileId || resolvePublicProfile(location.hash.replace("#perfil-", ""))?.id || "";
    if (!appState.authUser) {
      showToast("Faça login para seguir este perfil.", "user-plus");
      appState.sellerMode = "login";
      location.hash = "vendedor";
      return;
    }
    if (profileId === currentFollowUserId()) {
      showToast("Você não pode seguir o próprio perfil.", "user-x");
      return;
    }
    toggleFollow(profileId);
    return;
  }
  if (action === "download") showToast("Download preparado com sucesso", "download");
  if (action === "seller") {
    location.hash = "vendedor";
    return;
  }
  if (action === "notifications") showToast("Você tem 3 novos lançamentos", "bell");
  if (action === "profile-edit") showToast("Edição de perfil habilitada", "user-round");
  if (action === "toggle-profile-form") {
    const container = document.querySelector(".profile-catalog-form-container");
    if (container) {
      container.classList.toggle("is-collapsed");
      const icon = target.querySelector("i");
      if (icon) {
        if (container.classList.contains("is-collapsed")) {
          icon.setAttribute("data-lucide", "plus");
        } else {
          icon.setAttribute("data-lucide", "minus");
        }
        lucide.createIcons();
      }
    }
    return;
  }
  if (action === "toggle-edit-profile") {
    openProfileEditor();
    return;
  }
  if (action === "share-profile") {
    const shareUrl = window.location.href;
    navigator.clipboard?.writeText(shareUrl);
    target.classList.add("is-active");
    return;
  }
  if (action === "profile-scroll") {
    document.querySelector(`#${target.dataset.target}`)?.scrollIntoView({
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
      block: "start",
    });
    return;
  }
  if (action === "genre-banner-scroll") {
    const track = document.querySelector("#genreBannerTrack");
    if (!track) return;
    const direction = target.dataset.direction === "prev" ? -1 : 1;
    track.scrollBy({ left: direction * Math.max(320, track.clientWidth * 0.75), behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
    return;
  }
  if (action === "filter") {
    appState.genre = target.dataset.genre || "Todos";
    const nextHash = appState.genre === "Todos" ? "explorar" : `explorar?genero=${target.dataset.genreSlug || genreSlug(appState.genre)}`;
    if (location.hash !== `#${nextHash}`) location.hash = nextHash;
    else {
      renderExplore();
      hydrateView();
    }
    return;
  }
  if (action === "scroll-prev") scrollCatalog(target, -1);
  if (action === "scroll-next") scrollCatalog(target, 1);
});

document.addEventListener("change", (event) => {
  const chatAttachmentInput = event.target.closest("[data-chat-attachment-input]");
  if (chatAttachmentInput) {
    setChatAttachmentFromInput(chatAttachmentInput);
    return;
  }
  const hiringFilter = event.target.closest('[data-action="hiring-filter"]');
  if (hiringFilter) {
    const key = hiringFilter.dataset.filter;
    if (key) appState.hiring.filters[key] = hiringFilter.value;
    appState.hiring.lastLoadedAt = 0;
    renderHiringPage({ force: true });
    return;
  }
  const hiringStatus = event.target.closest('[data-action="hiring-status"]');
  if (hiringStatus) {
    updateHiringStatus(hiringStatus.dataset.postId, hiringStatus.value);
    return;
  }
  const profileFileInput = event.target.closest(".profile-editor-file");
  if (profileFileInput) {
    const file = profileFileInput.files?.[0];
    if (!file) return;
    applyProfileImageFile(file, profileFileInput.dataset.preview || "avatar");
    return;
  }
  const releaseFileInput = event.target.closest(".release-file-input");
  if (releaseFileInput) {
    handleReleaseFileInput(releaseFileInput);
    return;
  }
  const catalogFileInput = event.target.closest('[data-action="catalog-file-input"]');
  if (catalogFileInput) {
    addCatalogFiles(catalogFileInput.files);
    catalogFileInput.value = "";
    hydrateView();
    return;
  }
  const catalogRights = event.target.closest('[data-action="catalog-rights"]');
  if (catalogRights) {
    ensureCatalogImportState().authorized = catalogRights.checked;
    return;
  }
  const catalogItemSelect = event.target.closest('[data-action="catalog-item-field"]');
  if (catalogItemSelect) {
    updateCatalogImportItem(catalogItemSelect.closest("[data-catalog-item-id]")?.dataset.catalogItemId, catalogItemSelect.dataset.field, catalogItemSelect.value);
    return;
  }
  const catalogBulkSelect = event.target.closest('[data-action="catalog-bulk-field"]');
  if (catalogBulkSelect) {
    ensureCatalogImportState().bulk[catalogBulkSelect.dataset.field] = catalogBulkSelect.value;
    return;
  }
  const checkoutPlan = event.target.closest('.checkout-plan input[name="license"]');
  if (checkoutPlan) {
    document.querySelectorAll(".checkout-plan").forEach((plan) => plan.classList.toggle("is-selected", plan.contains(checkoutPlan)));
    return;
  }
  if (event.target.closest(".settings-panel")) {
    showToast("Configuração salva", "settings");
  }
});

document.addEventListener("dragover", (event) => {
  const profileDropzone = event.target.closest(".profile-image-edit-stage, [data-image-picker-preview]");
  if (profileDropzone) {
    event.preventDefault();
    document.querySelector("[data-image-picker]")?.classList.add("is-dragging");
    return;
  }
  const dropzone = event.target.closest(".release-dropzone");
  const catalogDropzone = event.target.closest(".catalog-import-dropzone");
  if (catalogDropzone) {
    event.preventDefault();
    catalogDropzone.classList.add("is-dragging");
    return;
  }
  if (!dropzone) return;
  event.preventDefault();
  dropzone.classList.add("is-dragging");
});

document.addEventListener("dragleave", (event) => {
  const profileDropzone = event.target.closest(".profile-image-edit-stage, [data-image-picker-preview]");
  if (profileDropzone && !profileDropzone.contains(event.relatedTarget)) {
    document.querySelector("[data-image-picker]")?.classList.remove("is-dragging");
    return;
  }
  const dropzone = event.target.closest(".release-dropzone");
  const catalogDropzone = event.target.closest(".catalog-import-dropzone");
  if (catalogDropzone && !catalogDropzone.contains(event.relatedTarget)) {
    catalogDropzone.classList.remove("is-dragging");
    return;
  }
  if (!dropzone || dropzone.contains(event.relatedTarget)) return;
  dropzone.classList.remove("is-dragging");
});

document.addEventListener("drop", (event) => {
  const profileDropzone = event.target.closest(".profile-image-edit-stage, [data-image-picker-preview]");
  if (profileDropzone) {
    event.preventDefault();
    const picker = document.querySelector("[data-image-picker]");
    picker?.classList.remove("is-dragging");
    applyProfileImageFile(event.dataTransfer?.files?.[0], picker?.dataset.imageType || "avatar");
    return;
  }
  const dropzone = event.target.closest(".release-dropzone");
  const catalogDropzone = event.target.closest(".catalog-import-dropzone");
  if (catalogDropzone) {
    event.preventDefault();
    catalogDropzone.classList.remove("is-dragging");
    addCatalogFiles(event.dataTransfer?.files);
    hydrateView();
    return;
  }
  if (!dropzone) return;
  event.preventDefault();
  dropzone.classList.remove("is-dragging");
  const input = dropzone.querySelector(".release-file-input");
  handleReleaseFile(event.dataTransfer?.files?.[0], input?.dataset.uploadType);
});

let profileImageDragState = null;

document.addEventListener("pointerdown", (event) => {
  const image = event.target.closest?.("[data-image-picker-preview] img");
  const picker = event.target.closest?.("[data-image-picker]");
  if (!image || !picker?.classList.contains("is-open")) return;
  const frame = image.closest("[data-image-picker-preview]");
  const type = picker.dataset.imageType || "avatar";
  const state = profileImageEditorState(type);
  profileImageDragState = {
    type,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    positionX: state.x,
    positionY: state.y,
    width: Math.max(1, frame?.clientWidth || 1),
    height: Math.max(1, frame?.clientHeight || 1),
  };
  image.setPointerCapture?.(event.pointerId);
  picker.classList.add("is-dragging");
  event.preventDefault();
});

document.addEventListener("pointermove", (event) => {
  if (!profileImageDragState || event.pointerId !== profileImageDragState.pointerId) return;
  const dx = event.clientX - profileImageDragState.startX;
  const dy = event.clientY - profileImageDragState.startY;
  setProfileImageEditorValue(profileImageDragState.type, {
    x: profileImageDragState.positionX - (dx / profileImageDragState.width) * 100,
    y: profileImageDragState.positionY - (dy / profileImageDragState.height) * 100,
  });
});

document.addEventListener("pointerup", (event) => {
  if (!profileImageDragState || event.pointerId !== profileImageDragState.pointerId) return;
  document.querySelector("[data-image-picker]")?.classList.remove("is-dragging");
  profileImageDragState = null;
});

document.addEventListener("input", (event) => {
  const input = event.target;
  if (input.matches?.("[data-chat-search]")) {
    appState.chat.search = input.value || "";
    refreshChatConversationList();
    return;
  }
  if (input.matches?.("[data-chat-user-search]")) {
    appState.chat.userSearch = input.value || "";
    window.clearTimeout(appState.chat.searchTimer);
    appState.chat.searchTimer = window.setTimeout(() => searchChatUsers(appState.chat.userSearch), 250);
    return;
  }
  if (input.matches?.("[data-chat-gif-search]")) {
    appState.chat.gifQuery = input.value || "";
    window.clearTimeout(appState.chat.searchTimer);
    appState.chat.searchTimer = window.setTimeout(() => loadChatGifs(appState.chat.gifQuery), 350);
    return;
  }
  if (input.matches?.(".nexo-assistant-form textarea")) {
    input.style.height = "44px";
    input.style.height = `${Math.min(132, Math.max(44, input.scrollHeight))}px`;
    return;
  }
  if (input.closest?.(".chat-composer-form") && input.matches("textarea")) {
    const form = input.closest(".chat-composer-form");
    const conversationId = form?.dataset.conversationId || appState.chat.activeConversationId;
    setChatDraft(conversationId, input.value || "");
    const submit = form?.querySelector("button[type='submit']");
    if (submit) submit.disabled = appState.chat.sending || (!input.value.trim() && !chatAttachmentDraft(conversationId));
    input.style.height = "auto";
    input.style.height = `${Math.min(140, input.scrollHeight)}px`;
    return;
  }
  const imageScaleInput = input.closest?.("[data-image-edit-scale]");
  if (imageScaleInput) {
    const picker = document.querySelector("[data-image-picker]");
    setProfileImageEditorValue(picker?.dataset.imageType || "avatar", { scale: imageScaleInput.value });
    return;
  }
  const hiringComposer = input.closest?.(".hiring-composer");
  if (hiringComposer) {
    const description = String(hiringComposer.elements.description?.value || "").trim();
    const button = hiringComposer.querySelector('button[type="submit"]');
    if (button) button.disabled = appState.hiring.submitting || !description;
    hiringComposer.classList.toggle("is-writing", Boolean(description || document.activeElement?.closest?.(".hiring-composer")));
    if (input.matches("textarea")) {
      input.style.height = "auto";
      input.style.height = `${Math.min(180, input.scrollHeight)}px`;
    }
    return;
  }
  const hiringFilterInput = input.closest?.('[data-action="hiring-filter"][data-filter="budget"]');
  if (hiringFilterInput) {
    appState.hiring.filters.budget = hiringFilterInput.value;
    window.clearTimeout(appState.hiring.filterTimer);
    appState.hiring.filterTimer = window.setTimeout(() => renderHiringPage({ force: true }), 350);
    return;
  }
  if (input.closest(".profile-editor-shell")) {
    syncProfileEditorPreview(input.closest(".profile-editor-shell"));
  }
  if (input.closest(".release-upload-form")) {
    syncReleaseForm(input.closest(".release-upload-form"));
  }
  const youtubeForm = input.closest?.("[data-youtube-release-form]");
  if (youtubeForm && input.name === "youtube_url") {
    const preview = youtubeForm.querySelector("[data-youtube-preview]");
    const meta = youtubeMetadataFromUrl(input.value);
    if (preview && meta) {
      preview.classList.add("has-preview");
      preview.innerHTML = `<img src="${htmlEscape(meta.youtube_thumbnail_url)}" alt="Preview do YouTube"><div><strong>ID ${htmlEscape(meta.youtube_video_id)}</strong><span>Player incorporado seguro via youtube-nocookie</span></div>`;
      if (!youtubeForm.elements.title.value) youtubeForm.elements.title.value = `YouTube Beat ${meta.youtube_video_id}`;
    } else if (preview) {
      preview.classList.remove("has-preview");
      preview.innerHTML = `<i data-lucide="youtube"></i><span>Cole um link valido para gerar a previa.</span>`;
      lucide.createIcons();
    }
    return;
  }
  const catalogField = input.closest?.('[data-action="catalog-item-field"]');
  if (catalogField) {
    updateCatalogImportItem(catalogField.closest("[data-catalog-item-id]")?.dataset.catalogItemId, catalogField.dataset.field, catalogField.value);
    return;
  }
  const catalogBulk = input.closest?.('[data-action="catalog-bulk-field"]');
  if (catalogBulk) {
    ensureCatalogImportState().bulk[catalogBulk.dataset.field] = catalogBulk.value;
    return;
  }
  const action = input?.dataset?.action;
  if (!["player-speed", "player-pitch", "player-volume"].includes(action)) return;
  const value = Number(input.value);
  if (action === "player-speed") appState.player.speed = value;
  if (action === "player-pitch") appState.player.pitch = value;
  if (action === "player-volume") {
    appState.player.volume = Math.min(1, Math.max(0, value));
    if (appState.player.volume > .02) appState.player.previousVolume = appState.player.volume;
  }
  const label = input.closest(".player-range, .audio-editor-slider, .player-volume-popover")?.querySelector("em");
  if (label && action === "player-speed") label.textContent = `${Math.round((appState.player.speed - 1) * 100)}%`;
  if (label && action === "player-pitch") label.textContent = `${appState.player.pitch} ST`;
  if (label && action === "player-volume") label.textContent = `${Math.round(appState.player.volume * 100)}%`;
  persistState();
  syncMiniPlayerState();
  lucide.createIcons();
});

document.addEventListener("submit", async (event) => {
  const chatComposerForm = event.target.closest(".chat-composer-form");
  if (chatComposerForm) {
    event.preventDefault();
    await sendChatMessage(chatComposerForm);
    return;
  }
  const feedCommentForm = event.target.closest(".nexo-feed-comment-form");
  if (feedCommentForm) {
    event.preventDefault();
    const item = feedItemForEvent(feedCommentForm.dataset.feedItemId);
    const input = feedCommentForm.elements.comment;
    const text = input?.value?.trim();
    if (!item || !text) return;
    saveNexoFeedComment(item, text);
    openNexoFeedComments(item);
    return;
  }
  const hiringComposerForm = event.target.closest(".hiring-composer");
  if (hiringComposerForm) {
    event.preventDefault();
    await submitHiringPost(hiringComposerForm);
    return;
  }
  const hiringProposalForm = event.target.closest(".hiring-proposal-form");
  if (hiringProposalForm) {
    event.preventDefault();
    await submitHiringProposal(hiringProposalForm);
    return;
  }
  const hiringCommentForm = event.target.closest(".hiring-comment-form");
  if (hiringCommentForm) {
    event.preventDefault();
    await submitHiringComment(hiringCommentForm);
    return;
  }
  const hiringMessageForm = event.target.closest(".hiring-message-form");
  if (hiringMessageForm) {
    event.preventDefault();
    await submitHiringMessage(hiringMessageForm);
    return;
  }
  const releaseUploadForm = event.target.closest(".release-upload-form");
  if (releaseUploadForm) {
    event.preventDefault();
    syncReleaseForm(releaseUploadForm);
    return;
  }
  const youtubeReleaseForm = event.target.closest("[data-youtube-release-form]");
  if (youtubeReleaseForm) {
    event.preventDefault();
    const button = youtubeReleaseForm.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.dataset.loading = "true";
      button.innerHTML = `<i data-lucide="loader-circle"></i>Publicando...`;
      lucide.createIcons();
    }
    try {
      await saveYouTubeBeat(youtubeReleaseForm);
    } finally {
      if (button) {
        button.disabled = false;
        button.dataset.loading = "false";
        button.innerHTML = `<i data-lucide="cloud-check"></i>Publicar beat`;
        lucide.createIcons();
      }
    }
    return;
  }
  const profileEditForm = event.target.closest(".profile-edit-form");
  if (profileEditForm) {
    event.preventDefault();
    await saveProfileEdit(profileEditForm);
    return;
  }
  const commentForm = event.target.closest(".comment-form");
  if (commentForm) {
    event.preventDefault();
    const input = commentForm.querySelector("input");
    const message = input?.value.trim();
    if (message) {
      document.querySelector(".comment-list")?.insertAdjacentHTML("beforeend", `<article><strong>Voce</strong><p>${htmlEscape(message)}</p></article>`);
      input.value = "";
      showToast("Comentario publicado no preview", "message-circle");
    }
    return;
  }
  const reportForm = event.target.closest(".report-tool-modal");
  if (reportForm) {
    event.preventDefault();
    const reports = JSON.parse(localStorage.getItem("ansend-player-reports") || "[]");
    reports.unshift({
      beatId: reportForm.dataset.reportBeatId || playerActionBeat().id,
      reason: reportForm.elements.reason?.value || "outro",
      details: reportForm.elements.details?.value?.trim() || "",
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("ansend-player-reports", JSON.stringify(reports.slice(0, 80)));
    closeModal();
    showToast("Denuncia enviada para analise", "flag");
    return;
  }
  const nexoChatForm = event.target.closest(".nexo-chat-form");
  if (nexoChatForm) {
    event.preventDefault();
    const input = nexoChatForm.elements.message;
    const message = input?.value || "";
    if (!message.trim()) return;
    input.value = "";
    await sendNexoChatMessage(message);
    return;
  }
  const nexoAssistantForm = event.target.closest(".nexo-assistant-form");
  if (nexoAssistantForm) {
    event.preventDefault();
    const input = nexoAssistantForm.elements.message;
    const message = input?.value || "";
    if (!message.trim()) return;
    input.value = "";
    input.style.height = "44px";
    await sendNexoChatMessage(message);
    return;
  }
  const nexoMatchForm = event.target.closest(".nexo-match-form");
  if (nexoMatchForm) {
    event.preventDefault();
    const profile = saveMusicProfile(profileFromForm(nexoMatchForm));
    markFirstAccountQuizCompleted();
    closeMusicPreferenceQuiz();
    renderRoute();
    showToast(`Perfil musical salvo: ${musicProfileSummary(profile)}`, "sparkles");
    return;
  }
  const musicForm = event.target.closest(".music-profile-form");
  if (musicForm) {
    event.preventDefault();
    const profile = saveMusicProfile(profileFromForm(musicForm));
    renderRoute();
    showToast(`Perfil musical atualizado: ${musicProfileSummary(profile)}`, "sparkles");
    return;
  }
  const nexoQuizForm = event.target.closest(".nexo-ia-quiz-form");
  if (nexoQuizForm) {
    event.preventDefault();
    const stepIndex = Number(nexoQuizForm.dataset.step || 0);
    const quiz = collectNexoQuizStep(nexoQuizForm, appState.nexoQuiz || readNexoQuiz(), stepIndex);
    saveNexoQuiz(quiz);
    appState.nexoQuiz = quiz;
    appState.nexoQuizError = "";
    appState.nexoQuizEditing = true;

    if (stepIndex < nexoQuizSteps.length - 1) {
      appState.nexoQuizStep = stepIndex + 1;
      renderAiWorkspace();
      hydrateView();
      return;
    }

    appState.nexoQuizGenerating = true;
    appState.nexoQuizEditing = false;
    renderAiWorkspace();
    hydrateView();
    const result = await callNexoDiagnosis(quiz);
    appState.nexoQuizGenerating = false;
    if (result?.success === false) {
      appState.nexoQuizEditing = true;
      appState.nexoQuizStep = nexoQuizSteps.length - 1;
      appState.nexoQuizError = result.error || "Nao foi possivel gerar o diagnostico agora.";
      renderAiWorkspace();
      hydrateView();
      return;
    }
    appState.nexoQuizEditing = false;
    appState.nexoQuizError = "";
    renderAiWorkspace();
    hydrateView();
    return;
  }
  const aiForm = event.target.closest(".ai-diagnostic-form");
  if (aiForm) {
    event.preventDefault();
    const input = aiForm.elements.aiPrompt;
    const prompt = input.value.trim() || "Tenho uma ideia musical e preciso transformar em lançamento profissional.";
    aiForm.classList.add("is-thinking");
    const quiz = promptToNexoQuiz(prompt);
    appState.nexoQuiz = quiz;
    appState.nexoQuizStep = nexoQuizSteps.length - 1;
    appState.nexoQuizEditing = true;
    appState.nexoQuizError = "";
    saveNexoQuiz(quiz);
    location.hash = "ia";
    renderRoute();
    lucide.createIcons();
    aiForm.classList.remove("is-thinking");
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
  const checkoutForm = event.target.closest(".checkout-form");
  if (checkoutForm) {
    event.preventDefault();
    const cartItemsStr = checkoutForm.dataset.cartItems;
    const buyerName = checkoutForm.querySelector('[name="buyer_name"]')?.value || "";
    const buyerEmail = checkoutForm.querySelector('[name="buyer_email"]')?.value || "";
    
    let cartItems;
    try {
      cartItems = JSON.parse(cartItemsStr);
    } catch (e) {
      cartItems = null;
    }
    
    if (cartItems && cartItems.length) {
      submitCheckout(cartItems, buyerName, buyerEmail);
    } else {
      showToast("Erro: Itens inválidos no checkout.", "alert-triangle");
    }
    return;
  }
  const customLicenseForm = event.target.closest(".custom-license-form");
  if (customLicenseForm) {
    event.preventDefault();
    const isEditing = customLicenseForm.dataset.editingIndex !== undefined;
    const editingIdx = isEditing ? Number(customLicenseForm.dataset.editingIndex) : null;
    
    const royaltyBuyer = Number(customLicenseForm.elements.buyer_royalty_percentage.value || 0);
    const royaltyProducer = Number(customLicenseForm.elements.producer_royalty_percentage.value || 0);
    
    if (royaltyBuyer + royaltyProducer !== 100) {
      showToast("A soma das porcentagens de royalties deve ser exatamente 100%.", "alert-triangle");
      return;
    }

    const priceCents = parsePriceCents(customLicenseForm.elements.price_formatted.value);
    if (priceCents < 500) {
      showToast("Preço mínimo permitido é R$ 5,00.", "alert-triangle");
      return;
    }

    const includedMp3 = customLicenseForm.elements.included_mp3.checked;
    const includedWav = customLicenseForm.elements.included_wav.checked;
    const includedStems = customLicenseForm.elements.included_stems.checked;

    if (!includedMp3 && !includedWav && !includedStems) {
      showToast("Selecione pelo menos um arquivo incluído para esta licença.", "alert-triangle");
      return;
    }

    const licenseData = {
      id: isEditing ? appState.releaseLicenses[editingIdx].id : crypto.randomUUID(),
      beat_id: releaseFormElement()?.dataset.beatId,
      license_key: isEditing ? appState.releaseLicenses[editingIdx].license_key : `custom-${Date.now()}`,
      name: customLicenseForm.elements.name.value.trim(),
      description: customLicenseForm.elements.description.value.trim(),
      price_cents: priceCents,
      currency: "BRL",
      is_default: isEditing ? appState.releaseLicenses[editingIdx].is_default : false,
      is_custom: true,
      is_active: isEditing ? appState.releaseLicenses[editingIdx].is_active : true,
      is_exclusive: customLicenseForm.elements.is_exclusive.checked,
      included_mp3: includedMp3,
      included_wav: includedWav,
      included_stems: includedStems,
      buyer_royalty_percentage: royaltyBuyer,
      producer_royalty_percentage: royaltyProducer,
      stream_limit: customLicenseForm.elements.unlimited_streams.checked ? null : (Number(customLicenseForm.elements.stream_limit.value) || null),
      unlimited_streams: customLicenseForm.elements.unlimited_streams.checked,
      music_video_limit: customLicenseForm.elements.unlimited_music_videos.checked ? null : (Number(customLicenseForm.elements.music_video_limit.value) || null),
      unlimited_music_videos: customLicenseForm.elements.unlimited_music_videos.checked,
      commercial_use: customLicenseForm.elements.commercial_use.checked,
      monetization_allowed: customLicenseForm.elements.monetization_allowed.checked,
      live_performance_allowed: customLicenseForm.elements.live_performance_allowed.checked,
      content_id_allowed: customLicenseForm.elements.content_id_allowed.checked,
      credit_required: customLicenseForm.elements.credit_required.checked,
      credit_text: isEditing ? appState.releaseLicenses[editingIdx].credit_text : "",
      duration: customLicenseForm.elements.duration.value.trim() || "lifetime",
      territory: customLicenseForm.elements.territory.value.trim() || "worldwide",
      custom_terms: customLicenseForm.elements.custom_terms.value.trim(),
      sort_order: isEditing ? appState.releaseLicenses[editingIdx].sort_order : appState.releaseLicenses.length
    };

    if (isEditing) {
      appState.releaseLicenses[editingIdx] = licenseData;
      showToast("Licença atualizada com sucesso.", "check-circle");
    } else {
      appState.releaseLicenses.push(licenseData);
      showToast("Licença adicionada com sucesso.", "check-circle");
    }


    closeModal();
    refreshReleaseLicensesUI();
    syncReleaseForm(releaseFormElement());
    return;
  }
  const contractForm = event.target.closest(".contract-form");
  if (contractForm) {
    event.preventDefault();
    const profile = findProfessional(contractForm.dataset.professional);
    if (!profile) {
      showToast("Perfil profissional nao encontrado", "user-x");
      return;
    }
    appState.contracts.unshift({
      id: `contract-${Date.now()}`,
      professional: profile.name,
      service: contractForm.elements.service.value,
      briefing: contractForm.elements.briefing.value.trim(),
      price: "",
      status: "Briefing enviado",
      createdAt: new Date().toISOString(),
    });
    persistState();
    closeModal();
    showToast(`Contratação enviada para ${profile.name}`, "handshake");
    if (currentRoute() === "compras") renderRoute();
    return;
  }
  const form = event.target.closest(".seller-auth-form");
  if (!form) return;
  event.preventDefault();
  handleAccountSubmit(form);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (appState.nexoAssistant.open && !appState.nexoAssistant.minimized) {
      appState.nexoAssistant.open = false;
      appState.nexoAssistant.minimized = false;
      writeNexoAssistantPrefs();
      renderNexoFloatingAssistant();
      return;
    }
    document.body.classList.remove("menu-open");
    closePlayerFloatingPanels();
    closeNexoFeedComments();
    closeModal();
  }
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".beat-card")) {
    event.preventDefault();
    location.hash = `beat-${event.target.dataset.beatId}`;
  }
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".professional-card[data-action='professional-card-open']")) {
    event.preventDefault();
    openProfessionalCardProfile(event.target, "professional-card-keyboard");
  }
});

// Intercept wheel/scroll & arrow keys to navigate the vertical NEXO feed (Instagram Reels style)
let lastNexoFeedScrollTime = 0;

window.addEventListener("wheel", (e) => {
  const stream = document.querySelector("#nexoFeedStream");
  if (!stream) return;

  e.preventDefault();

  const now = Date.now();
  if (now - lastNexoFeedScrollTime < 500) return;

  if (Math.abs(e.deltaY) > 8) {
    lastNexoFeedScrollTime = now;
    scrollNexoFeed(e.deltaY > 0 ? 1 : -1);
  }
}, { passive: false });

window.addEventListener("keydown", (e) => {
  const stream = document.querySelector("#nexoFeedStream");
  if (!stream) return;

  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const now = Date.now();
    if (now - lastNexoFeedScrollTime < 500) return;
    lastNexoFeedScrollTime = now;
    scrollNexoFeed(e.key === "ArrowDown" ? 1 : -1);
  }
});

function updateSidebarProfile() {
  const profile = hasAccountAccess() ? activeProfile() : null;
  const display = profileDisplayData(profile);
  
  const nameEl = document.querySelector(".sidebar-profile-name");
  const avatarEl = document.querySelector(".sidebar-profile-avatar");
  
  if (nameEl) {
    nameEl.textContent = display.name;
  }
  if (avatarEl) {
    const nextAvatar = display.avatar || IMAGE_FALLBACK_SRC;
    if (avatarEl.getAttribute("src") !== nextAvatar) {
      avatarEl.classList.remove("is-loaded", "is-broken");
      avatarEl.src = nextAvatar;
    }
    avatarEl.setAttribute("decoding", "async");
    avatarEl.setAttribute("loading", "eager");
    avatarEl.setAttribute("fetchpriority", "high");
    avatarEl.dataset.fallbackSrc = IMAGE_FALLBACK_SRC;
  }
}

function initSidebarListeners() {
  // Language toggle inside the sidebar
  document.querySelector(".sidebar-lang-btn")?.addEventListener("click", () => {
    const nextLocale = appLocale.current === "pt-BR" ? "en-US" : "pt-BR";
    setLocale(nextLocale, { manual: true });
    renderRoute();
  });
  
  // Hamburger toggle inside the sidebar to close the mobile menu
  document.querySelector(".sidebar-menu-toggle")?.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
  });
}

function initNavbarListeners() {
  // Listen for clicks on the navbar auth button
  document.addEventListener("click", (event) => {
    const authBtn = event.target.closest(".navbar-auth-btn");
    if (authBtn) {
      closeNotificationsDropdown();
      if (hasAccountAccess()) {
        const container = authBtn.closest(".navbar-auth-container");
        if (container) {
          const expanded = authBtn.getAttribute("aria-expanded") === "true";
          authBtn.setAttribute("aria-expanded", !expanded ? "true" : "false");
          container.classList.toggle("dropdown-open", !expanded);
        }
      } else {
        location.hash = "vendedor";
      }
      return;
    }

    const notifyBtn = event.target.closest(".navbar-notification-btn");
    if (notifyBtn) {
      event.stopPropagation();
      const dropdown = document.getElementById("navbarNotificationDropdown");
      const isVisible = dropdown && dropdown.classList.contains("is-visible");
      
      // Close user account dropdown if open
      document.querySelectorAll(".navbar-auth-container").forEach((c) => {
        c.classList.remove("dropdown-open");
        c.querySelector(".navbar-auth-btn")?.setAttribute("aria-expanded", "false");
      });
      
      if (isVisible) {
        closeNotificationsDropdown();
      } else {
        openNotificationsDropdown();
      }
      return;
    }

    // Close dropdown on click outside
    if (!event.target.closest(".navbar-auth-container")) {
      document.querySelectorAll(".navbar-auth-container").forEach((c) => {
        c.classList.remove("dropdown-open");
        c.querySelector(".navbar-auth-btn")?.setAttribute("aria-expanded", "false");
      });
    }

    if (!event.target.closest(".navbar-notification-container")) {
      closeNotificationsDropdown();
    }

    // Close dropdown on clicking any option item
    const dropdownItem = event.target.closest(".navbar-dropdown .dropdown-item");
    if (dropdownItem) {
      const container = dropdownItem.closest(".navbar-auth-container");
      if (container) {
        container.classList.remove("dropdown-open");
        container.querySelector(".navbar-auth-btn")?.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Esc key closure
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNotificationsDropdown();
      document.querySelectorAll(".navbar-auth-container").forEach((c) => {
        c.classList.remove("dropdown-open");
        c.querySelector(".navbar-auth-btn")?.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Mark all as read button
  document.getElementById("notificationMarkAllReadBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    markAllNotificationsAsRead();
  });

  // Load more button
  document.getElementById("notificationLoadMoreBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    fetchNotificationsList(false);
  });
}

/* ==========================================
   ANSEND REALTIME NOTIFICATION SYSTEM SERVICE
   ========================================== */

const notificationsState = {
  list: [],
  unreadCount: 0,
  loading: false,
  error: "",
  offset: 0,
  limit: 20,
  hasMore: false,
  realtimeChannel: null,
  pollingInterval: null,
  initializedUserId: null
};

async function initNotifications(userId) {
  if (notificationsState.initializedUserId === userId) return;
  
  notificationsState.initializedUserId = userId;
  notificationsState.list = [];
  notificationsState.unreadCount = 0;
  notificationsState.offset = 0;
  notificationsState.hasMore = false;
  notificationsState.error = "";
  
  const container = document.getElementById("navbarNotificationContainer");
  if (container) container.removeAttribute("hidden");

  await fetchUnreadCount();
  await fetchNotificationsList(true);
  
  subscribeRealtimeNotifications(userId);
  
  if (notificationsState.pollingInterval) clearInterval(notificationsState.pollingInterval);
  notificationsState.pollingInterval = setInterval(async () => {
    if (appState.authUser) {
      await fetchUnreadCount();
    }
  }, 45000);
}

function cleanupNotifications() {
  notificationsState.initializedUserId = null;
  notificationsState.list = [];
  notificationsState.unreadCount = 0;
  notificationsState.offset = 0;
  notificationsState.hasMore = false;
  
  if (notificationsState.realtimeChannel) {
    supabaseClient?.removeChannel(notificationsState.realtimeChannel);
    notificationsState.realtimeChannel = null;
  }
  
  if (notificationsState.pollingInterval) {
    clearInterval(notificationsState.pollingInterval);
    notificationsState.pollingInterval = null;
  }
  
  const container = document.getElementById("navbarNotificationContainer");
  if (container) container.setAttribute("hidden", "true");
  
  const badge = document.getElementById("notificationBadge");
  if (badge) {
    badge.setAttribute("hidden", "true");
    badge.textContent = "0";
  }
  
  closeNotificationsDropdown();
}

async function fetchUnreadCount() {
  if (!supabaseClient || !appState.authUser) return;
  try {
    const { data, error } = await supabaseClient.rpc("get_unread_notifications_count");
    if (!error && data !== null) {
      const count = Number(data);
      notificationsState.unreadCount = count;
      updateUnreadBadge(count);
    }
  } catch (err) {
    console.error("[ANSEND notifications] failed to fetch unread count", err);
  }
}

function updateUnreadBadge(count) {
  const badge = document.getElementById("notificationBadge");
  const countText = document.getElementById("notificationUnreadCount");
  
  if (badge) {
    if (count > 0) {
      badge.removeAttribute("hidden");
      badge.textContent = count > 99 ? "99+" : String(count);
    } else {
      badge.setAttribute("hidden", "true");
      badge.textContent = "0";
    }
  }
  
  if (countText) {
    countText.textContent = `${count} novas`;
  }
}

async function fetchNotificationsList(isInitial = false) {
  if (!supabaseClient || !appState.authUser) return;
  
  if (isInitial) {
    notificationsState.offset = 0;
    notificationsState.list = [];
  }
  
  notificationsState.loading = true;
  notificationsState.error = "";
  renderNotificationsList();
  
  try {
    const { data, error } = await supabaseClient.rpc("get_notifications", {
      p_limit: notificationsState.limit,
      p_offset: notificationsState.offset
    });
    
    if (error) throw error;
    
    const items = data || [];
    if (isInitial) {
      notificationsState.list = items;
    } else {
      notificationsState.list = [...notificationsState.list, ...items];
    }
    
    notificationsState.hasMore = items.length === notificationsState.limit;
    notificationsState.offset += items.length;
    notificationsState.loading = false;
    
    renderNotificationsList();
  } catch (err) {
    console.error("[ANSEND notifications] error fetching list", err);
    notificationsState.loading = false;
    notificationsState.error = "Não foi possível carregar as notificações agora.";
    renderNotificationsList();
  }
}

function renderNotificationsList() {
  const listContainer = document.getElementById("notificationList");
  const footer = document.getElementById("notificationDropdownFooter");
  
  if (!listContainer) return;
  
  if (notificationsState.loading && notificationsState.list.length === 0) {
    listContainer.innerHTML = Array.from({ length: 3 }).map(() => `
      <div class="notification-skeleton">
        <div class="notification-skeleton-avatar"></div>
        <div class="notification-skeleton-text">
          <div class="notification-skeleton-line"></div>
          <div class="notification-skeleton-line short"></div>
        </div>
      </div>
    `).join("");
    if (footer) footer.setAttribute("hidden", "true");
    return;
  }
  
  if (notificationsState.error) {
    listContainer.innerHTML = `
      <div class="notification-empty-state">
        <i data-lucide="alert-triangle"></i>
        <p>Erro ao carregar</p>
        <span>${notificationsState.error}</span>
      </div>
    `;
    if (footer) footer.setAttribute("hidden", "true");
    lucide.createIcons();
    return;
  }
  
  if (notificationsState.list.length === 0) {
    listContainer.innerHTML = `
      <div class="notification-empty-state">
        <i data-lucide="bell-off"></i>
        <p>Nenhuma notificação ainda.</p>
        <span>Quando alguém interagir com você, vamos avisar aqui.</span>
      </div>
    `;
    if (footer) footer.setAttribute("hidden", "true");
    lucide.createIcons();
    return;
  }
  
  let html = notificationsState.list.map((item) => {
    const isUnread = !item.is_read ? " is-unread" : "";
    const safeActionUrl = safeUrl(item.action_url || "", { fallback: "", allowHash: true, allowRelative: true });
    
    let avatarHtml = "";
    if (item.actor_avatar) {
      avatarHtml = `<img class="app-optimized-image" src="${htmlEscape(safeUrl(item.actor_avatar, { fallback: IMAGE_FALLBACK_SRC }))}" alt="Avatar" width="36" height="36" data-fallback-src="${htmlEscape(IMAGE_FALLBACK_SRC)}" />`;
    } else {
      let icon = "bell";
      if (item.type === "profile_follow") icon = "user-plus";
      else if (item.type === "beat_like") icon = "heart";
      else if (item.type === "beat_purchase") icon = "shopping-bag";
      else if (item.type === "profile_hire") icon = "briefcase";
      else if (item.type === "community_like") icon = "thumbs-up";
      else if (item.type === "community_comment" || item.type === "community_comment_reply") icon = "message-square";
      else if (item.type === "contract_new") icon = "file-text";
      else if (item.type === "contract_accepted") icon = "check-circle";
      else if (item.type === "contract_rejected") icon = "x-circle";
      else if (item.type === "contract_message") icon = "mail";
      
      avatarHtml = `
        <div class="notification-avatar-fallback">
          <i data-lucide="${icon}"></i>
        </div>
      `;
    }
    
    return `
      <a class="notification-item${isUnread}" data-id="${htmlEscape(item.id)}" data-url="${htmlEscape(safeActionUrl)}" role="menuitem">
        <div class="notification-avatar-container">
          ${avatarHtml}
        </div>
        <div class="notification-content">
          <p class="notification-text"><strong>${htmlEscape(item.title || "Notificacao")}:</strong> ${htmlEscape(item.body || "")}</p>
          <span class="notification-time">${htmlEscape(formatRelativeTime(item.created_at))}</span>
        </div>
      </a>
    `;
  }).join("");
  
  listContainer.innerHTML = html;
  
  if (footer) {
    if (notificationsState.hasMore) {
      footer.removeAttribute("hidden");
    } else {
      footer.setAttribute("hidden", "true");
    }
  }
  
  listContainer.querySelectorAll(".notification-item").forEach((element) => {
    element.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = element.dataset.id;
      const url = element.dataset.url;
      
      if (id) {
        markNotificationAsReadLocal(id);
        await supabaseClient.rpc("mark_notification_read", { p_notification_id: id });
        await fetchUnreadCount();
      }
      
      closeNotificationsDropdown();
      
      if (url) {
        location.hash = url.startsWith("#") ? url.replace(/^#/, "") : url;
      }
    });
  });
  
  lucide.createIcons();
}

function markNotificationAsReadLocal(id) {
  const index = notificationsState.list.findIndex(item => item.id === id);
  if (index !== -1) {
    notificationsState.list[index].is_read = true;
  }
  renderNotificationsList();
}

async function markAllNotificationsAsRead() {
  if (!supabaseClient || !appState.authUser) return;
  
  notificationsState.list.forEach((item) => {
    item.is_read = true;
  });
  notificationsState.unreadCount = 0;
  updateUnreadBadge(0);
  renderNotificationsList();
  
  try {
    const { error } = await supabaseClient.rpc("mark_all_notifications_read");
    if (error) throw error;
  } catch (err) {
    console.error("[ANSEND notifications] failed to mark all as read", err);
    await fetchUnreadCount();
    await fetchNotificationsList(true);
  }
}

function subscribeRealtimeNotifications(userId) {
  if (notificationsState.realtimeChannel && supabaseClient && typeof supabaseClient.removeChannel === "function") {
    supabaseClient.removeChannel(notificationsState.realtimeChannel);
  }
  
  if (!supabaseClient?.channel || !supabaseClient?.removeChannel) return;
  
  const channel = supabaseClient
    .channel(`public:notifications:recipient_id=eq.${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `recipient_id=eq.${userId}`
      },
      async (payload) => {
        await fetchUnreadCount();
        const dropdown = document.getElementById("navbarNotificationDropdown");
        if (dropdown && dropdown.classList.contains("is-visible")) {
          await fetchNotificationsList(true);
        }
        if (payload.new && payload.new.title) {
          showToast(`${payload.new.title}: ${payload.new.body}`, "bell");
        }
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "notifications",
        filter: `recipient_id=eq.${userId}`
      },
      async () => {
        await fetchUnreadCount();
        const dropdown = document.getElementById("navbarNotificationDropdown");
        if (dropdown && dropdown.classList.contains("is-visible")) {
          await fetchNotificationsList(true);
        }
      }
    )
    .subscribe();
    
  notificationsState.realtimeChannel = channel;
}

function openNotificationsDropdown() {
  const dropdown = document.getElementById("navbarNotificationDropdown");
  const btn = document.getElementById("navbarNotificationBtn");
  if (dropdown && btn) {
    dropdown.removeAttribute("hidden");
    setTimeout(() => {
      dropdown.classList.add("is-visible");
      btn.classList.add("dropdown-open");
      btn.setAttribute("aria-expanded", "true");
    }, 10);
    fetchNotificationsList(true);
  }
}

function closeNotificationsDropdown() {
  const dropdown = document.getElementById("navbarNotificationDropdown");
  const btn = document.getElementById("navbarNotificationBtn");
  if (dropdown && btn) {
    dropdown.classList.remove("is-visible");
    btn.classList.remove("dropdown-open");
    btn.setAttribute("aria-expanded", "false");
    setTimeout(() => {
      if (!dropdown.classList.contains("is-visible")) {
        dropdown.setAttribute("hidden", "true");
      }
    }, 250);
  }
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "agora";
  if (diffMins < 60) return `${diffMins} min`;
  if (diffHours < 24) return `${diffHours} h`;
  if (diffDays === 1) return "ontem";
  if (diffDays < 7) return `${diffDays} dias`;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

/* === BEGIN ANSEND BEAT LICENSING SYSTEM HELPERS === */
function initializeDefaultReleaseLicenses(beatId) {
  appState.releaseLicenses = [
    {
      id: "basic",
      beat_id: beatId,
      license_key: "basic",
      name: "Lease Básica — MP3",
      description: "Ideal para artistas que estão começando ou desejam testar o lançamento. Inclui o arquivo MP3 em alta qualidade, autorização para uso comercial e divisão de royalties de 50% para o artista e 50% para o produtor.",
      price_cents: 0,
      is_default: true,
      is_custom: false,
      is_active: true,
      is_exclusive: false,
      included_mp3: true,
      included_wav: false,
      included_stems: false,
      buyer_royalty_percentage: 50,
      producer_royalty_percentage: 50,
      stream_limit: 50000,
      unlimited_streams: false,
      music_video_limit: 1,
      unlimited_music_videos: false,
      commercial_use: true,
      monetization_allowed: true,
      live_performance_allowed: true,
      content_id_allowed: false,
      credit_required: true,
      credit_text: "Prod. por [Produtor]",
      duration: "lifetime",
      territory: "worldwide",
      custom_terms: ""
    },
    {
      id: "premium",
      beat_id: beatId,
      license_key: "premium",
      name: "Lease Premium — WAV",
      description: "Licença indicada para lançamentos profissionais. Inclui arquivos MP3 e WAV em alta qualidade, maior limite de streams, uso comercial e divisão de royalties de 50% para o artista e 50% para o produtor.",
      price_cents: 0,
      is_default: true,
      is_custom: false,
      is_active: true,
      is_exclusive: false,
      included_mp3: true,
      included_wav: true,
      included_stems: false,
      buyer_royalty_percentage: 50,
      producer_royalty_percentage: 50,
      stream_limit: 250000,
      unlimited_streams: false,
      music_video_limit: 2,
      unlimited_music_videos: false,
      commercial_use: true,
      monetization_allowed: true,
      live_performance_allowed: true,
      content_id_allowed: false,
      credit_required: true,
      credit_text: "Prod. por [Produtor]",
      duration: "lifetime",
      territory: "worldwide",
      custom_terms: ""
    },
    {
      id: "exclusive",
      beat_id: beatId,
      license_key: "exclusive",
      name: "Licença Exclusiva — WAV + Stems",
      description: "Licença para lançamentos de maior escala. Inclui MP3, WAV e todas as faixas separadas do beat. O artista recebe 90% dos royalties e o produtor mantém 10%. Após a compra, o beat deixa de ser vendido para novos clientes.",
      price_cents: 0,
      is_default: true,
      is_custom: false,
      is_active: true,
      is_exclusive: true,
      included_mp3: true,
      included_wav: true,
      included_stems: true,
      buyer_royalty_percentage: 90,
      producer_royalty_percentage: 10,
      stream_limit: null,
      unlimited_streams: true,
      music_video_limit: null,
      unlimited_music_videos: true,
      commercial_use: true,
      monetization_allowed: true,
      live_performance_allowed: true,
      content_id_allowed: true,
      credit_required: true,
      credit_text: "Prod. por [Produtor]",
      duration: "lifetime",
      territory: "worldwide",
      custom_terms: ""
    }
  ];
}

function refreshReleaseLicensesUI() {
  const container = document.querySelector(".release-licenses-container");
  if (!container) return;
  
  container.innerHTML = appState.releaseLicenses.map((lic, idx) => {
    const priceText = lic.price_cents ? `R$ ${(lic.price_cents / 100).toFixed(2)}` : "";
    const filesLabel = [
      lic.included_mp3 ? "MP3" : "",
      lic.included_wav ? "WAV" : "",
      lic.included_stems ? "Stems" : ""
    ].filter(Boolean).join(" + ");
    
    const isDefault = lic.is_default;
    
    return `
      <div class="release-license-editor-card" data-license-index="${idx}" style="border: 1px solid var(--beat-border); border-radius: 8px; padding: 16px; margin-bottom: 12px; background: #0c0c0c; display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <strong style="font-size: 15px; color: #fff;">${htmlEscape(lic.name)}</strong>
            <span style="font-size: 10px; padding: 2px 6px; border-radius: 4px; background: ${lic.is_exclusive ? "#ff3b30" : "#0a84ff"}; color: #fff; text-transform: uppercase;">
              ${lic.is_exclusive ? "Exclusiva" : "Lease"}
            </span>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <label style="display: flex; gap: 6px; align-items: center; cursor: pointer; font-size: 12px; color: var(--beat-muted);">
              <input type="checkbox" class="license-active-toggle" ${lic.is_active ? "checked" : ""}>
              <span>Ativa</span>
            </label>
            ${!isDefault ? `
              <button type="button" class="license-delete-btn" style="background: transparent; border: 0; color: #ff3b30; cursor: pointer; padding: 4px;" title="Excluir"><i data-lucide="trash-2" style="width: 16px; height: 16px;"></i></button>
            ` : ""}
            <button type="button" class="license-duplicate-btn" style="background: transparent; border: 0; color: #a3a3a3; cursor: pointer; padding: 4px;" title="Duplicar"><i data-lucide="copy" style="width: 16px; height: 16px;"></i></button>
            <div style="display: flex; flex-direction: column; gap: 2px;">
              ${idx > 0 ? `<button type="button" class="license-move-up" style="background: transparent; border:0; color:#a3a3a3; cursor:pointer; padding: 2px 4px; font-size: 10px;" title="Subir">â–²</button>` : ""}
              ${idx < appState.releaseLicenses.length - 1 ? `<button type="button" class="license-move-down" style="background: transparent; border:0; color:#a3a3a3; cursor:pointer; padding: 2px 4px; font-size: 10px;" title="Descer">â–¼</button>` : ""}
            </div>
          </div>
        </div>
        
        <div style="font-size: 12px; color: var(--beat-muted); line-height: 1.45;">
          ${htmlEscape(lic.description)}
        </div>
        
        <div style="display: flex; gap: 12px; font-size: 11px; color: var(--beat-dim);">
          <span><strong>Arquivos:</strong> ${filesLabel || "Nenhum"}</span>
          <span><strong>Royalties:</strong> Artista ${lic.buyer_royalty_percentage}% / Produtor ${lic.producer_royalty_percentage}%</span>
          <span><strong>Limite:</strong> ${lic.unlimited_streams ? "Ilimitado" : `${lic.stream_limit?.toLocaleString("pt-BR") || 0} streams`}</span>
        </div>

        <div style="display: flex; gap: 14px; align-items: center; margin-top: 4px;">
          <label style="display: flex; flex-direction: column; gap: 4px; width: 140px;">
            <span style="font-size: 11px; color: var(--beat-muted);">Preço (R$) *</span>
            <input type="text" class="license-price-formatter" value="${priceText}" placeholder="R$ 0,00" required style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px; font-weight: bold;">
          </label>
          <button type="button" class="an-secondary license-edit-terms-btn" style="height: 35px; margin-top: 15px; font-size: 11px; padding: 0 12px;">
            Ver e editar termos
          </button>
        </div>
      </div>
    `;
  }).join("");
  lucide.createIcons();
}

function openLicenseTermsEditModal(idx = null) {
  const isEditing = idx !== null;
  const lic = isEditing ? appState.releaseLicenses[idx] : {
    name: "",
    description: "",
    price_cents: 0,
    is_exclusive: false,
    included_mp3: true,
    included_wav: false,
    included_stems: false,
    buyer_royalty_percentage: 50,
    producer_royalty_percentage: 50,
    stream_limit: 50000,
    unlimited_streams: false,
    music_video_limit: 1,
    unlimited_music_videos: false,
    commercial_use: true,
    monetization_allowed: true,
    live_performance_allowed: true,
    content_id_allowed: false,
    credit_required: true,
    duration: "lifetime",
    territory: "worldwide",
    custom_terms: ""
  };

  const priceFormatted = lic.price_cents ? `R$ ${(lic.price_cents / 100).toFixed(2)}` : "";

  const markup = `
    <form class="custom-license-form" ${isEditing ? `data-editing-index="${idx}"` : ""} style="display: flex; flex-direction: column; gap: 14px; padding: 8px 4px; max-height: 85vh; overflow-y: auto;">
      <span style="font-size: 11px; color: var(--beat-muted); text-transform: uppercase;"><i data-lucide="${isEditing ? "edit" : "plus-circle"}" style="width: 14px; height: 14px; margin-right: 4px; vertical-align: middle;"></i>${isEditing ? "Editar Termos" : "Nova Licença"}</span>
      <h2 style="font-size: 20px; font-weight: bold; color: #fff; margin: 0;">${isEditing ? "Editar Termos da Licença" : "Criar Tipo de Licença"}</h2>
      
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px;">
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 11px; color: var(--beat-muted);">Nome da licença *</span>
          <input name="name" type="text" value="${htmlEscape(lic.name)}" placeholder="Ex: Lease Básica — MP3" required style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px;">
        </label>
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 11px; color: var(--beat-muted);">Preço *</span>
          <input name="price_formatted" class="custom-license-price-formatter" type="text" value="${priceFormatted}" placeholder="R$ 0,00" required style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px; font-weight: bold;">
        </label>
      </div>

      <label style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 11px; color: var(--beat-muted);">Descrição resumida</span>
        <textarea name="description" rows="2" placeholder="Descreva esta licença..." style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px; resize: none;">${htmlEscape(lic.description)}</textarea>
      </label>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: center;">
        <label style="display: flex; gap: 8px; align-items: center; font-size: 12px; color: #fff; cursor: pointer;">
          <input name="is_exclusive" type="checkbox" value="true" ${lic.is_exclusive ? "checked" : ""}>
          <span>Esta licença é exclusiva?</span>
        </label>
        <div style="font-size: 11px; color: var(--beat-dim);">Licença exclusiva remove o beat do catálogo após a compra.</div>
      </div>

      <fieldset style="border: 1px solid var(--beat-border); border-radius: 6px; padding: 10px 12px;">
        <legend style="font-size: 11px; color: var(--beat-muted); padding: 0 6px;">Arquivos incluídos *</legend>
        <div style="display: flex; gap: 16px; font-size: 12px; color: #fff;">
          <label style="display: flex; gap: 6px; align-items: center; cursor: pointer;"><input name="included_mp3" type="checkbox" ${lic.included_mp3 ? "checked" : ""}> MP3</label>
          <label style="display: flex; gap: 6px; align-items: center; cursor: pointer;"><input name="included_wav" type="checkbox" ${lic.included_wav ? "checked" : ""}> WAV</label>
          <label style="display: flex; gap: 6px; align-items: center; cursor: pointer;"><input name="included_stems" type="checkbox" ${lic.included_stems ? "checked" : ""}> Stems (ZIP)</label>
        </div>
      </fieldset>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 11px; color: var(--beat-muted);">Royalties do Artista (%) *</span>
          <input name="buyer_royalty_percentage" type="number" min="0" max="100" value="${lic.buyer_royalty_percentage}" required style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px;">
        </label>
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 11px; color: var(--beat-muted);">Royalties do Produtor (%) *</span>
          <input name="producer_royalty_percentage" type="number" min="0" max="100" value="${lic.producer_royalty_percentage}" required style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px;">
        </label>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <label style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 11px; color: var(--beat-muted);">Limite de streams</span>
            <input name="stream_limit" type="number" value="${lic.stream_limit || ""}" placeholder="Ex: 100000" style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px;">
          </label>
          <label style="display: flex; gap: 6px; align-items: center; font-size: 11px; color: var(--beat-muted); cursor: pointer; margin-top: 2px;">
            <input name="unlimited_streams" type="checkbox" ${lic.unlimited_streams ? "checked" : ""}> <span>Streams ilimitados</span>
          </label>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <label style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 11px; color: var(--beat-muted);">Limite de videoclipes</span>
            <input name="music_video_limit" type="number" value="${lic.music_video_limit || ""}" placeholder="Ex: 2" style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px;">
          </label>
          <label style="display: flex; gap: 6px; align-items: center; font-size: 11px; color: var(--beat-muted); cursor: pointer; margin-top: 2px;">
            <input name="unlimited_music_videos" type="checkbox" ${lic.unlimited_music_videos ? "checked" : ""}> <span>Videoclipes ilimitados</span>
          </label>
        </div>
      </div>

      <fieldset style="border: 1px solid var(--beat-border); border-radius: 6px; padding: 10px 12px;">
        <legend style="font-size: 11px; color: var(--beat-muted); padding: 0 6px;">Direitos e Usos</legend>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; font-size: 11px; color: #fff;">
          <label style="display: flex; gap: 6px; align-items: center; cursor: pointer;"><input name="commercial_use" type="checkbox" ${lic.commercial_use ? "checked" : ""}> Uso Comercial</label>
          <label style="display: flex; gap: 6px; align-items: center; cursor: pointer;"><input name="monetization_allowed" type="checkbox" ${lic.monetization_allowed ? "checked" : ""}> Monetização permitida</label>
          <label style="display: flex; gap: 6px; align-items: center; cursor: pointer;"><input name="live_performance_allowed" type="checkbox" ${lic.live_performance_allowed ? "checked" : ""}> Apresentação ao vivo</label>
          <label style="display: flex; gap: 6px; align-items: center; cursor: pointer;"><input name="content_id_allowed" type="checkbox" ${lic.content_id_allowed ? "checked" : ""}> Registro Content ID permitido</label>
          <label style="display: flex; gap: 6px; align-items: center; cursor: pointer;"><input name="credit_required" type="checkbox" ${lic.credit_required ? "checked" : ""}> Crédito obrigatório</label>
        </div>
      </fieldset>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 11px; color: var(--beat-muted);">Duração do contrato</span>
          <input name="duration" type="text" value="${htmlEscape(lic.duration)}" placeholder="Ex: lifetime, 5 anos" style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px;">
        </label>
        <label style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 11px; color: var(--beat-muted);">Território</span>
          <input name="territory" type="text" value="${htmlEscape(lic.territory)}" placeholder="Ex: worldwide, Brasil" style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px;">
        </label>
      </div>

      <label style="display: flex; flex-direction: column; gap: 4px;">
        <span style="font-size: 11px; color: var(--beat-muted);">Termos / Cláusulas personalizadas</span>
        <textarea name="custom_terms" rows="2" placeholder="Termos adicionais..." style="background: #050505; border: 1px solid var(--beat-border); color: #fff; padding: 8px 10px; border-radius: 5px; resize: none;">${htmlEscape(lic.custom_terms || "")}</textarea>
      </label>

      <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 10px;">
        <button type="button" class="an-secondary" data-action="close-modal" style="height: 38px; padding: 0 16px;">Cancelar</button>
        <button type="submit" class="an-primary" style="background: #fff; border: 0; color: #000; font-weight: bold; height: 38px; padding: 0 20px; border-radius: 6px; cursor: pointer;">${isEditing ? "Salvar Termos" : "Criar Licença"}</button>
      </div>
    </form>
  `;
  openModal(markup);
}

async function fetchBeatLicenses(beatId) {
  if (appState.loadedBeatLicenses?.[beatId] && appState.loadedBeatLicenses[beatId].length) {
    return appState.loadedBeatLicenses[beatId];
  }
  appState.loadedBeatLicenses = appState.loadedBeatLicenses || {};
  if (!supabaseClient) {
    const fallback = generateDefaultLicensesForBeat({ id: beatId });
    appState.loadedBeatLicenses[beatId] = fallback;
    return fallback;
  }
  const { data, error } = await supabaseClient
    .from("beat_licenses")
    .select("*")
    .eq("beat_id", beatId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error || !data || !data.length) {
    const beat = searchableBeatPool().find(b => b.id === beatId) || { id: beatId };
    const fallback = generateDefaultLicensesForBeat(beat);
    appState.loadedBeatLicenses[beatId] = fallback;
    return fallback;
  }
  appState.loadedBeatLicenses[beatId] = data;
  return data;
}

function generateDefaultLicensesForBeat(beat) {
  const basePrice = Number(beat?.raw?.price || beat?.price || 179);
  const basicPrice = Math.max(49, Math.round(basePrice * 0.45));
  const premiumPrice = basePrice;
  const exclusivePrice = Math.max(499, Math.round(basePrice * 4.5));

  return [
    {
      id: "basic",
      beat_id: beat?.id,
      license_key: "basic",
      name: "Lease Básica — MP3",
      price_cents: basicPrice * 100,
      description: "Ideal para artistas que estão começando ou desejam testar o lançamento. Inclui o arquivo MP3 em alta qualidade, autorização para uso comercial e divisão de royalties de 50% para o artista e 50% para o produtor.",
      buyer_royalty_percentage: 50,
      producer_royalty_percentage: 50,
      stream_limit: 50000,
      unlimited_streams: false,
      music_video_limit: 1,
      unlimited_music_videos: false,
      included_mp3: true,
      included_wav: false,
      included_stems: false,
      is_exclusive: false,
    },
    {
      id: "premium",
      beat_id: beat?.id,
      license_key: "premium",
      name: "Lease Premium — WAV",
      price_cents: premiumPrice * 100,
      description: "Licença indicada para lançamentos profissionais. Inclui arquivos MP3 e WAV em alta qualidade, maior limite de streams, uso comercial e divisão de royalties de 50% para o artista e 50% para o produtor.",
      buyer_royalty_percentage: 50,
      producer_royalty_percentage: 50,
      stream_limit: 250000,
      unlimited_streams: false,
      music_video_limit: 2,
      unlimited_music_videos: false,
      included_mp3: true,
      included_wav: true,
      included_stems: false,
      is_exclusive: false,
    },
    {
      id: "exclusive",
      beat_id: beat?.id,
      license_key: "exclusive",
      name: "Licença Exclusiva — WAV + Stems",
      price_cents: exclusivePrice * 100,
      description: "Licença para lançamentos de maior escala. Inclui MP3, WAV e todas as faixas separadas do beat. O artista recebe 90% dos royalties e o produtor mantém 10%. Após a compra, o beat deixa de ser vendido para novos clientes.",
      buyer_royalty_percentage: 90,
      producer_royalty_percentage: 10,
      stream_limit: null,
      unlimited_streams: true,
      music_video_limit: null,
      unlimited_music_videos: true,
      included_mp3: true,
      included_wav: true,
      included_stems: true,
      is_exclusive: true,
    }
  ];
}

function renderBeatLicenseCards(licenses, selectedLicenseId) {
  return licenses.map((license) => {
    const isSelected = license.id === selectedLicenseId || license.license_key === selectedLicenseId;
    const priceText = `R$ ${(license.price_cents / 100).toFixed(2)}`;
    const filesLabel = [
      license.included_mp3 ? "MP3" : "",
      license.included_wav ? "WAV" : "",
      license.included_stems ? "Stems" : ""
    ].filter(Boolean).join(" + ");
    
    return `
      <button class="beat-license-card ${isSelected ? "is-selected" : ""}" 
              type="button" 
              data-action="select-beat-license" 
              data-license="${license.id}" 
              data-price="${priceText}" 
              aria-pressed="${isSelected ? "true" : "false"}">
        <span>${htmlEscape(license.name)}</span>
        <strong>${priceText}</strong>
        <small>${htmlEscape(license.description || filesLabel)}</small>
      </button>
    `;
  }).join("");
}

function updateBeatDetailLicensingPanel(container, beat, licenses) {
  if (beat.sold_exclusively || beat.raw?.sold_exclusively) {
    const mainContent = container.closest(".beat-main-content") || container;
    const panel = mainContent.querySelector(".beat-licensing-panel");
    if (panel) {
      panel.innerHTML = `
        <div style="text-align:center; padding:32px 16px; background:#0f0f0f; border-radius:8px; border:1px solid var(--beat-border);">
          <i data-lucide="shield-alert" style="width:40px; height:40px; color:#ff3b30; margin:0 auto 12px; display:block;"></i>
          <h2 style="font-size:18px; color:#fff; font-weight:bold; margin-bottom:8px;">Vendido Exclusivamente</h2>
          <p style="font-size:12px; color:var(--beat-muted); margin:0;">Este beat já foi adquirido sob licença exclusiva e não está mais disponível para novos licenciamentos.</p>
        </div>
      `;
    }
    const termsPanel = mainContent.querySelector(".beat-terms-panel");
    if (termsPanel) termsPanel.style.display = "none";
    
    document.querySelectorAll(".mini-buy").forEach(btn => btn.style.display = "none");
    lucide.createIcons();
    return;
  }

  if (!licenses.length) {
    licenses = generateDefaultLicensesForBeat(beat);
  }
  
  let selectedId = container.dataset.selectedLicense || "premium";
  let selectedLicense = licenses.find(l => l.id === selectedId || l.license_key === selectedId);
  if (!selectedLicense) {
    selectedLicense = licenses.find(l => l.license_key === "premium") || licenses[0];
  }
  
  selectedId = selectedLicense.id;
  container.dataset.selectedLicense = selectedId;
  
  const priceFormatted = `R$ ${(selectedLicense.price_cents / 100).toFixed(2)}`;
  
  container.querySelector("[data-license-total]").textContent = priceFormatted;
  
  container.querySelectorAll("[data-action='detail-add-cart'], [data-action='detail-buy-now']").forEach(btn => {
    btn.dataset.license = selectedId;
  });
  
  const cardsHtml = renderBeatLicenseCards(licenses, selectedId);
  container.querySelector(".beat-license-grid").innerHTML = cardsHtml;
  
  container.querySelector("[data-license-terms]").innerHTML = licenseTermsMarkup(selectedLicense);
  
  const termsHeader = container.querySelector(".beat-terms-panel header");
  if (termsHeader) {
    termsHeader.innerHTML = `
      <h3>Termos de uso</h3>
      <div style="display:flex; align-items:center; gap:12px;">
        <a href="#" class="view-contract-modal-trigger" data-beat-id="${beat.id}" data-license-id="${selectedId}" style="font-size:11px; color:var(--beat-blue); text-decoration:underline; font-weight:bold;">Ver termos completos</a>
        <button type="button" aria-label="Expandir termos"><i data-lucide="chevron-up"></i></button>
      </div>
    `;
  }
  lucide.createIcons();
}

async function submitCheckout(cartItems, buyerName, buyerEmail) {
  const session = supabaseClient?.auth?.session?.() || (await supabaseClient?.auth?.getSession?.())?.data?.session;
  if (!session) {
    showToast("Você precisa estar autenticado para finalizar a compra.", "triangle-alert");
    return;
  }
  showToast("Processando pagamento...", "loader");
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        cart_items: cartItems,
        buyer_name: buyerName,
        buyer_email: buyerEmail
      })
    });
    
    const result = await response.json();
    if (!response.ok || !result.success) {
      showToast(result.error || "Erro no checkout.", "alert-triangle");
      return;
    }
    
    clearCart();
    await loadCatalogItems();
    closeModal();
    location.hash = "compras";
    showToast("Compra finalizada com sucesso!", "check-circle");
    renderPurchases();
  } catch (error) {
    console.error("Checkout submit error:", error);
    showToast("Erro de rede ao processar checkout.", "alert-triangle");
  }
}

async function openCartCheckout() {
  if (appState.cart.length === 0) return;
  
  openModal(`<div style="display:flex; justify-content:center; align-items:center; min-height:150px; background:#0f0f0f; border-radius:8px;"><i data-lucide="loader-circle" class="animate-spin" style="width:32px; height:32px; color:#fff;"></i></div>`);
  lucide.createIcons();

  try {
    const items = [];
    const cartItemsPayload = [];
    
    for (const entry of appState.cart) {
      const { beatId, licenseId } = splitCartEntry(entry);
      const beat = findBeat(beatId);
      const licenses = await fetchBeatLicenses(beatId);
      const license = licenses.find(l => l.id === licenseId || l.license_key === licenseId) || 
                      generateDefaultLicensesForBeat(beat).find(l => l.id === licenseId || l.license_key === licenseId);
      
      if (beat && license) {
        items.push({ beat, license });
        cartItemsPayload.push({ beat_id: beatId, license_id: license.id });
      }
    }
    
    if (!items.length) {
      showToast("Erro ao carregar itens do carrinho.", "alert-triangle");
      closeModal();
      return;
    }
    
    const subtotalCents = items.reduce((sum, item) => sum + (item.license.price_cents || 0), 0);
    const serviceFeeCents = Math.round(subtotalCents * 0.12);
    const totalCents = subtotalCents + serviceFeeCents;
    
    const prefillName = appState.authUser?.user_metadata?.full_name || appState.authUser?.email?.split("@")[0] || "";
    const prefillEmail = appState.authUser?.email || "";
    
    const itemsHtml = items.map(item => `
      <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px; border-bottom:1px solid var(--beat-border-soft); padding-bottom:8px;">
        <img src="${item.beat.cover}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;">
        <div style="flex:1;">
          <strong style="font-size:13px; color:#fff; display:block;">${htmlEscape(item.beat.title)}</strong>
          <span style="font-size:11px; color:var(--beat-muted);">${htmlEscape(item.license.name)}</span>
        </div>
        <strong style="font-size:13px; color:#fff;">R$ ${(item.license.price_cents / 100).toFixed(2)}</strong>
      </div>
    `).join("");
    
    openModal(`
      <form class="checkout-form" data-is-cart="true">
        <span><i data-lucide="shopping-cart"></i>Checkout seguro ANSEND</span>
        <h2 style="font-size:18px; margin: 10px 0 4px; color:#fff;">Finalizar Compra</h2>
        <p style="font-size:12px; color:var(--beat-muted); margin-bottom:14px;">Preencha seus dados e concorde com os termos das licenças.</p>
        
        <div style="margin-bottom:14px; max-height:180px; overflow-y:auto; background:#050505; border:1px solid var(--beat-border); border-radius:6px; padding:10px;">
          ${itemsHtml}
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px;">
          <label style="display:flex; flex-direction:column; gap:4px;">
            <span style="font-size:11px; color:var(--beat-muted);">Seu Nome *</span>
            <input name="buyer_name" type="text" value="${htmlEscape(prefillName)}" placeholder="Nome completo" required style="background:#050505; border:1px solid var(--beat-border); color:#fff; padding:8px 10px; border-radius:5px; font-size:13px;">
          </label>
          <label style="display:flex; flex-direction:column; gap:4px;">
            <span style="font-size:11px; color:var(--beat-muted);">Seu E-mail *</span>
            <input name="buyer_email" type="email" value="${htmlEscape(prefillEmail)}" placeholder="email@exemplo.com" required style="background:#050505; border:1px solid var(--beat-border); color:#fff; padding:8px 10px; border-radius:5px; font-size:13px;">
          </label>
        </div>

        <div style="background:#050505; border:1px solid var(--beat-border); border-radius:6px; padding:12px; margin-bottom:14px; display:flex; flex-direction:column; gap:6px; font-size:12px;">
          <div style="display:flex; justify-content:space-between; color:var(--beat-muted);">
            <span>Subtotal:</span>
            <span>R$ ${(subtotalCents / 100).toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; color:var(--beat-muted);">
            <span>Taxa de serviço (12%):</span>
            <span>R$ ${(serviceFeeCents / 100).toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; color:#fff; font-weight:bold; font-size:14px; border-top:1px solid var(--beat-border-soft); padding-top:6px; margin-top:4px;">
            <span>Total:</span>
            <span>R$ ${(totalCents / 100).toFixed(2)}</span>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <label style="display:flex; gap:8px; align-items:flex-start; font-size:12px; color:var(--beat-muted); cursor:pointer;">
            <input type="checkbox" name="accept_terms" required style="margin-top:2px;">
            <span>Li e concordo com os <a href="#" class="view-contract-modal-trigger" data-is-cart="true" style="color:var(--beat-blue); text-decoration:underline;">termos e contratos de licença</a> correspondentes a cada beat selecionado.</span>
          </label>
        </div>

        <button class="seller-submit" type="submit" style="width:100%; height:42px; display:flex; justify-content:center; align-items:center; font-size:14px;">
          Finalizar pagamento <i data-lucide="arrow-right" style="width:16px; height:16px; margin-left:6px;"></i>
        </button>
      </form>
    `);
    
    const formEl = document.querySelector(".checkout-form");
    if (formEl) {
      formEl.dataset.cartItems = JSON.stringify(cartItemsPayload);
    }
  } catch (error) {
    console.error("Error opening cart checkout:", error);
    showToast("Erro ao abrir checkout.", "alert-triangle");
    closeModal();
  }
}

function openContractModal(text) {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="app-modal contract-overlay-modal" role="dialog" aria-modal="true" style="z-index: 10000;">
      <div class="app-modal-backdrop" onclick="this.parentNode.remove()"></div>
      <div class="app-modal-panel" style="max-width: 600px;">
        <button class="app-modal-close" type="button" onclick="this.parentNode.parentNode.remove()" aria-label="Fechar"><i data-lucide="x"></i></button>
        <div style="padding:10px 4px; display:flex; flex-direction:column; gap:12px;">
          <span style="font-size:11px; color:var(--beat-muted); text-transform:uppercase;"><i data-lucide="scroll" style="width:14px; height:14px; margin-right:4px; vertical-align:middle;"></i>Contrato Legal</span>
          <h2 style="font-size:18px; font-weight:bold; color:#fff; margin:0;">Visualizar Contrato</h2>
          <pre style="background:#050505; border:1px solid var(--beat-border); color:var(--beat-muted); padding:12px; border-radius:6px; font-family:monospace; font-size:11px; line-height:1.5; white-space:pre-wrap; max-height:300px; overflow-y:auto; margin:8px 0;">${htmlEscape(text)}</pre>
          <button type="button" class="an-primary" onclick="this.parentNode.parentNode.parentNode.remove()" style="background:#fff; border:0; color:#000; font-weight:bold; height:38px; width:100%; border-radius:6px; cursor:pointer;">Fechar Visualização</button>
        </div>
      </div>
    </div>
  `);
  lucide.createIcons();
}

async function downloadPurchasedFile(beatId, fileType) {
  const session = supabaseClient?.auth?.session?.() || (await supabaseClient?.auth?.getSession?.())?.data?.session;
  if (!session) {
    showToast("Você precisa estar logado para baixar arquivos.", "triangle-alert");
    return;
  }
  showToast("Gerando link de download seguro...", "loader");
  try {
    const response = await fetch(`/api/orders/download?beat_id=${beatId}&file_type=${fileType}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      showToast(result.error || "Erro ao obter link de download.", "alert-triangle");
      return;
    }
    const a = document.createElement("a");
    a.href = result.download_url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Download iniciado!", "check-circle");
  } catch (error) {
    console.error("Download error:", error);
    showToast("Falha na conexão com o servidor.", "alert-triangle");
  }
}

async function loadUserOrders() {
  if (!supabaseClient || !appState.authUser) return [];
  const { data, error } = await supabaseClient
    .from("orders")
    .select(`
      id,
      total_cents,
      status,
      buyer_name,
      buyer_email,
      created_at,
      order_items (
        id,
        beat_id,
        license_id,
        license_name_snapshot,
        license_terms_snapshot,
        price_cents_snapshot,
        buyer_royalty_snapshot,
        producer_royalty_snapshot,
        files_included_snapshot,
        accepted_contract_at,
        accepted_contract_version
      )
    `)
    .eq("buyer_id", appState.authUser.id)
    .eq("status", "completed")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error loading user orders:", error);
    return [];
  }
  return data || [];
}

function generateContractText(beatTitle, producerName, buyerName, licenseName, royaltyBuyer, royaltyProducer, streamLimit, includedFiles, dateString) {
  return `CONTRATO DE LICENCA DE USO DE BEAT/PRODUCAO MUSICAL

Este contrato regula a licenca de exploracao comercial do Beat intitulado "${beatTitle}", produzido por ${producerName}, doravante denominado "PRODUTOR", adquirido por ${buyerName}, doravante denominado "LICENCIADO", nas condicoes estabelecidas sob a licenca "${licenseName}".

1. CONCESSAO E USO
1.1. O PRODUTOR concede ao LICENCIADO uma licenca de uso do Beat para fins de reproducao, distribuicao, apresentacoes ao vivo e monetizacao em plataformas de streaming e digitais.
1.2. Esta licenca e outorgada em carater ${licenseName.includes("Exclusiva") ? "EXCLUSIVO" : "NAO EXCLUSIVO"}.

2. LIMITES E ROYALTIES
2.1. Royalties da Composicao/Master: As partes concordam com a divisao de royalties estabelecida em ${royaltyBuyer}% para o LICENCIADO (Artista/Comprador) e ${royaltyProducer}% para o PRODUTOR.
2.2. Streams Digitais: O limite de reproducoes acumuladas nas plataformas e de ${streamLimit}.
2.3. Videoclipes Oficiais: Fica permitida a gravacao e veiculacao de clipes promocionais/oficiais nas plataformas de compartilhamento de video.

3. ARQUIVOS ENTREGUES
O PRODUTOR entrega os arquivos: ${includedFiles}.

4. DECLARACAO DE ACEITE
O LICENCIADO declara ter lido, compreendido e aceitado todos os termos deste contrato em ${dateString}.

Identificador do Pedido: Gerado eletronicamente na confirmacao do pagamento pela ANSEND.`;
}
function formatPriceBRL(value) {
  const cleanValue = String(value).replace(/\\D/g, "");
  if (!cleanValue) return "";
  const cents = parseInt(cleanValue, 10);
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
  return formatter.format(cents / 100);
}

function parsePriceCents(formattedValue) {
  const cleanValue = String(formattedValue).replace(/\\D/g, "");
  return parseInt(cleanValue, 10) || 0;
}
/* === END ANSEND BEAT LICENSING SYSTEM HELPERS === */

setLocale(detectLocale(), { manual: false });
detectLocaleWithGeo()
  .then((locale) => setLocale(locale, { manual: false }))
  .catch(() => setLocale(detectLocale(), { manual: false }))
  .finally(() => {
    initSidebarListeners();
    initNavbarListeners();
    syncAccountUi();
    renderRoutePreservingAuthFocus(true);
    initializeAuth();
  });



