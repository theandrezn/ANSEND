const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=520&q=82`;
const SUPABASE_PROJECT_REF = "qxujynzqdursxaehchik";
const SUPABASE_CONFIG = window.ANSEND_SUPABASE || {};
const SUPABASE_KEY_PLACEHOLDER = "COLE_SUA_SUPABASE_ANON_OU_PUBLISHABLE_KEY_AQUI";
const NEXO_DIAGNOSIS_STORAGE_KEY = "ansend_nexo_last_diagnosis";
const NEXO_QUIZ_STORAGE_KEY = "ansend_nexo_last_quiz";
const OAUTH_REDIRECT_STORAGE_KEY = "ansend-oauth-redirect";
const EMAIL_CONFIRMATION_STORAGE_KEY = "ansend-pending-email-confirmation";
const ANSEND_PUBLIC_APP_URL = "https://ansend.andrrluis86.workers.dev";
const AUTH_CACHE_KEY = "ansend-auth-cache-v1";
const AUTH_EXPLICIT_LOGOUT_KEY = "ansend-explicit-logout-at";
const ANSEND_ADMIN_EMAIL = "games123ytsupremo@gmail.com";
const COMMUNITY_ROUTE = "comunidade";
const COMMUNITY_LEGACY_ROUTE = "contratacoes";
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
    "hero.titleLine2": "O marketplace inteligente da música",
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
  ["O marketplace inteligente da m\u00fasica", "The intelligent music marketplace"],
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

const heroHeadline = ["ANSEND", "O marketplace inteligente da música"];

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
const initialAuthCache = supabaseClient ? cachedAuthState() : null;

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
    error: "",
    detailId: "",
    lastLoadedAt: 0,
  },
  isAdmin: false,
  adminProfiles: [],
  aiPlan: JSON.parse(localStorage.getItem("ansend-ai-plan") || "null"),
  nexoChatMessages: [],
  nexoChatLoading: false,
  nexoChatError: "",
  recommendations: { professionals: [], feed: [], updatedAt: 0 },
  recommendationsLoading: false,
  recommendationImpressions: new Set(),
  authUser: initialAuthCache?.user || null,
  authSession: undefined,
  authLoading: Boolean(supabaseClient),
  profileLoading: Boolean(supabaseClient && initialAuthCache?.user && !initialAuthCache?.profile),
  profile: supabaseClient ? (initialAuthCache?.profile || null) : JSON.parse(localStorage.getItem("ansend-profile-preview") || "null"),
  authReady: !supabaseClient || Boolean(initialAuthCache?.user),
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
    const response = await fetch("/api/nexo/analisar", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
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

function htmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
  const safeSrc = htmlEscape(src || fallbackSrc || IMAGE_FALLBACK_SRC);
  const safeFallback = htmlEscape(fallbackSrc || IMAGE_FALLBACK_SRC);
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

function cachedAuthState() {
  const cached = safeReadJson(AUTH_CACHE_KEY, null);
  if (!cached || typeof cached !== "object") return null;
  if (!cached.user?.id) return null;
  return cached;
}

function persistAuthCache() {
  if (!appState.authUser?.id) return;
  try {
    localStorage.setItem(AUTH_CACHE_KEY, JSON.stringify({
      user: {
        id: appState.authUser.id,
        email: appState.authUser.email || "",
        role: appState.authUser.role || "authenticated",
        aud: appState.authUser.aud || "authenticated",
        app_metadata: appState.authUser.app_metadata || {},
        user_metadata: appState.authUser.user_metadata || {},
      },
      profile: appState.profile || null,
      savedAt: new Date().toISOString(),
    }));
  } catch (error) {
    debugAuth("auth_cache_write_failed", { error: error?.message || String(error) });
  }
}

function clearAuthCache() {
  localStorage.removeItem(AUTH_CACHE_KEY);
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
      <button class="play-over" type="button" data-action="play" data-id="${item.id}" aria-label="Tocar ${item.title}"><i data-lucide="play"></i></button>
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
      headers: { "Content-Type": "application/json", ...headers },
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
      headers: { "Content-Type": "application/json", ...headers },
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
  const audio = topBeatAudio();
  if (item && appState.playing === item.id && audio) {
    audio.pause();
    setTopBeatPlaying(false);
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
  const audio = topBeatAudio();
  if (appState.playing === item.id && audio && !audio.paused) {
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
  const audio = topBeatAudio();
  const isPlaying = appState.playing === item.id && audio && !audio.paused;
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
    setText("nexoRecommendationsTitle", `<i data-lucide="sparkles"></i>Recomendado para vocÃª`, appLocale.current === "pt-BR" ? "Profissionais e servicos com maior match para voce" : "Professionals and services with the strongest fit for you");
    setText("smartCombosTitle", `<i data-lucide="boxes"></i>${t("section.combos")}`, appLocale.current === "pt-BR" ? "Pacotes montados para sua fase atual" : "Packages shaped for your current stage");
    setText("featuredProfessionalsTitle", `<i data-lucide="badge-check"></i>Profissionais recomendados`, appLocale.current === "pt-BR" ? "Perfis verificados com fit para seu projeto" : "Verified profiles that fit your project");
  } else {
    setText("featuredPreviewTitle", `<i data-lucide="flame"></i>${t("section.catalogs")}`, t("section.catalogsSubtitle"));
    setText("quickActionsTitle", `<i data-lucide="zap"></i>${t("section.nextStep")}`, appLocale.current === "pt-BR" ? "Responda o quiz e desbloqueie recomendacoes reais" : "Answer the quiz and unlock real recommendations");
    setText("nexoRecommendationsTitle", `<i data-lucide="sparkles"></i>Recomendado para vocÃª`, appLocale.current === "pt-BR" ? "Seis sugestoes principais para resolver seu lancamento agora" : "Six top suggestions to move your release forward");
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
    cover: item.cover_url || item.coverUrl || item.artworkUrl || item.image || item.thumbnail || item.cover || "assets/ansend-logo-square.png",
    audio: item.audio_url || "",
    audio_url: item.audio_url || "",
    audio_path: item.audio_path || "",
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

function hiringRequireAuth() {
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

async function loadHiringPosts({ force = false } = {}) {
  if (!supabaseClient) {
    appState.hiring.posts = [];
    appState.hiring.error = "";
    appState.hiring.loading = false;
    appState.hiring.lastLoadedAt = Date.now();
    return [];
  }
  const detailId = hiringDetailIdFromHash();
  const fresh = Date.now() - Number(appState.hiring.lastLoadedAt || 0) < 12000;
  if (!force && !detailId && fresh && appState.hiring.posts.length) return appState.hiring.posts;
  appState.hiring.loading = true;
  appState.hiring.error = "";
  try {
    await withTimeout(loadPublicPlatformData(), 4500, "A Comunidade ANSEND demorou para carregar os perfis.");
    let query = supabaseClient.from("hiring_posts").select("*").order("created_at", { ascending: false }).limit(80);
    if (detailId) {
      query = query.eq("id", detailId).limit(1);
    } else if (appState.hiring.activeTab === "mine") {
      if (!appState.authUser) {
        appState.hiring.posts = [];
        return [];
      }
      query = query.eq("user_id", appState.authUser.id);
    } else {
      query = query.eq("visibility", "public");
    }
    const filters = appState.hiring.filters || {};
    if (!detailId && filters.category && filters.category !== "todos") query = query.eq("category", filters.category);
    if (!detailId && filters.deadline && filters.deadline !== "todos") query = query.eq("deadline_type", filters.deadline);
    if (!detailId && filters.status && filters.status !== "todos") query = query.eq("status", filters.status);
    if (!detailId && filters.workMode && filters.workMode !== "todos") query = query.eq("work_mode", filters.workMode);
    const { data, error } = await withTimeout(query, 6500, "A Comunidade ANSEND demorou para responder.");
    if (error) throw error;
    let posts = data || [];
    if (!detailId && appState.hiring.activeTab === "following") posts = [];
    if (!detailId && filters.budget) {
      const max = Number(filters.budget);
      if (Number.isFinite(max) && max > 0) posts = posts.filter((post) => !post.budget_amount || Number(post.budget_amount) <= max);
    }
    appState.hiring.posts = posts.map((post) => ({ ...post, metrics: {}, viewer: {} }));
    appState.hiring.detailId = detailId;
    appState.hiring.lastLoadedAt = Date.now();
    await loadHiringEngagement(appState.hiring.posts);
    return appState.hiring.posts;
  } catch (error) {
    console.error("[ANSEND hiring] load failed", error);
    appState.hiring.error = error.message || "Nao foi possivel carregar a Comunidade ANSEND.";
    appState.hiring.posts = [];
    return [];
  } finally {
    appState.hiring.loading = false;
  }
}

async function loadHiringEngagement(posts = appState.hiring.posts) {
  const ids = posts.map((post) => post.id).filter(Boolean);
  if (!supabaseClient || !ids.length) return;
  const [likes, saves, reposts, interests, comments, proposals] = await withTimeout(Promise.all([
    supabaseClient.from("hiring_likes").select("post_id,user_id").in("post_id", ids),
    supabaseClient.from("hiring_saves").select("post_id,user_id").in("post_id", ids),
    supabaseClient.from("hiring_reposts").select("post_id,user_id").in("post_id", ids),
    supabaseClient.from("hiring_interests").select("post_id,user_id").in("post_id", ids),
    supabaseClient.from("hiring_comments").select("*").in("post_id", ids).order("created_at", { ascending: true }),
    supabaseClient.from("hiring_proposals").select("*").in("post_id", ids).order("created_at", { ascending: false }),
  ]), 5500, "Engajamento da Comunidade ANSEND demorou para responder.").catch((error) => {
    console.warn("[ANSEND community] engagement fallback", error?.message || error);
    return [{ data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }, { data: [] }];
  });
  const rowsFor = (result) => result.error ? [] : (result.data || []);
  const groupedComments = {};
  rowsFor(comments).forEach((comment) => {
    groupedComments[comment.post_id] = groupedComments[comment.post_id] || [];
    groupedComments[comment.post_id].push(comment);
  });
  appState.hiring.comments = groupedComments;
  appState.hiring.proposals = rowsFor(proposals);
  const currentUserId = appState.authUser?.id || "";
  posts.forEach((post) => {
    const postRows = (rows) => rows.filter((row) => row.post_id === post.id);
    post.metrics = {
      likes: postRows(rowsFor(likes)).length,
      saves: postRows(rowsFor(saves)).length,
      reposts: postRows(rowsFor(reposts)).length,
      interests: postRows(rowsFor(interests)).length,
      comments: groupedComments[post.id]?.length || 0,
      proposals: postRows(rowsFor(proposals)).length,
    };
    post.viewer = {
      liked: postRows(rowsFor(likes)).some((row) => row.user_id === currentUserId),
      saved: postRows(rowsFor(saves)).some((row) => row.user_id === currentUserId),
      reposted: postRows(rowsFor(reposts)).some((row) => row.user_id === currentUserId),
      interested: postRows(rowsFor(interests)).some((row) => row.user_id === currentUserId),
      proposed: postRows(rowsFor(proposals)).some((row) => row.sender_id === currentUserId),
    };
  });
}

function hiringComposerMarkup() {
  const profile = profileDisplayData(activeProfile());
  return `<form class="hiring-composer" data-hiring-composer novalidate>
    ${hiringAvatar({ ...profile, name: profile.name || "ANSEND" })}
    <div class="hiring-composer-main">
      <label class="sr-only" for="hiringDescription">Descricao</label>
      <textarea id="hiringDescription" name="description" maxlength="1200" rows="2" placeholder="Do que voce precisa hoje?" aria-label="Do que voce precisa hoje?"></textarea>
      <label class="sr-only" for="hiringTitle">Titulo da vaga ou pedido</label>
      <input id="hiringTitle" class="hiring-composer-title" name="title" type="text" maxlength="120" placeholder="Titulo da vaga/pedido" aria-label="Titulo da vaga ou pedido">
      <div class="hiring-composer-grid">
        <label>Categoria<select name="category">${hiringCategories.filter(([id]) => id !== "todos").map(([id, label]) => `<option value="${id}">${label}</option>`).join("")}</select></label>
        <label>Orcamento<input name="budget_amount" type="number" inputmode="decimal" min="0" placeholder="R$300"></label>
        <label>Prazo<select name="deadline_type">${hiringDeadlines.map(([id, label]) => `<option value="${id}">${label}</option>`).join("")}</select></label>
        <label>Local<select name="work_mode"><option value="remote">Remoto</option><option value="onsite">Presencial</option><option value="hybrid">Hibrido</option></select></label>
        <label class="is-wide">Referencias<input name="references" type="text" placeholder="YouTube, Spotify, BeatStars, SoundCloud ou texto livre"></label>
        <label class="hiring-negotiable"><input name="budget_type" type="checkbox" value="negotiable"> A combinar</label>
      </div>
      <div class="hiring-composer-tools" aria-label="Opcoes da publicacao">
        <button type="button" data-action="hiring-expand-composer" title="Categoria e detalhes"><i data-lucide="tags"></i><span>Categoria</span></button>
        <button type="button" data-action="hiring-expand-composer" title="Orcamento"><i data-lucide="badge-dollar-sign"></i><span>Orcamento</span></button>
        <button type="button" data-action="hiring-expand-composer" title="Prazo"><i data-lucide="clock"></i><span>Prazo</span></button>
        <button type="button" data-action="hiring-expand-composer" title="Referencias"><i data-lucide="link"></i><span>Referencias</span></button>
        <button type="button" data-action="hiring-expand-composer" title="Anexo preparado"><i data-lucide="paperclip"></i><span>Anexo</span></button>
        <button type="button" data-action="hiring-expand-composer" title="Local ou remoto"><i data-lucide="map-pin"></i><span>Local/Remoto</span></button>
        <button type="submit" disabled>Publicar</button>
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
    <label>Categoria<select data-action="hiring-filter" data-filter="category">${hiringCategories.map(([id, label]) => `<option value="${id}" ${filters.category === id ? "selected" : ""}>${label}</option>`).join("")}</select></label>
    <label>Orcamento<input data-action="hiring-filter" data-filter="budget" type="number" min="0" value="${htmlEscape(filters.budget || "")}" placeholder="Max. R$"></label>
    <label>Prazo<select data-action="hiring-filter" data-filter="deadline"><option value="todos">Todos</option>${hiringDeadlines.map(([id, label]) => `<option value="${id}" ${filters.deadline === id ? "selected" : ""}>${label}</option>`).join("")}</select></label>
    <label>Status<select data-action="hiring-filter" data-filter="status"><option value="todos">Todos</option>${Object.entries(hiringStatusLabels).map(([id, label]) => `<option value="${id}" ${filters.status === id ? "selected" : ""}>${label}</option>`).join("")}</select></label>
    <label>Tipo<select data-action="hiring-filter" data-filter="workMode"><option value="todos">Todos</option>${Object.entries(hiringWorkModes).map(([id, label]) => `<option value="${id}" ${filters.workMode === id ? "selected" : ""}>${label}</option>`).join("")}</select></label>
  </section>`;
}

function hiringEmptyMarkup(title = "Nenhuma publicacao ainda.", text = "Seja o primeiro a comecar uma conversa com a comunidade da musica.") {
  return `<section class="hiring-empty"><i data-lucide="messages-square"></i><h2>${htmlEscape(title)}</h2><p>${htmlEscape(text)}</p><button type="button" data-action="hiring-focus-composer">Criar publicacao</button></section>`;
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
  const comments = appState.hiring.comments[post.id] || [];
  const ownerProposals = isOwner ? appState.hiring.proposals.filter((proposal) => proposal.post_id === post.id) : [];
  const profileAttrs = profileTargetAttrs({ id: author.id, username: author.username, title: author.name });
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
      <h2>${htmlEscape(post.title)}</h2>
      <p>${htmlEscape(post.description)}</p>
      ${post.reference_links ? `<small><i data-lucide="link"></i>${htmlEscape(post.reference_links)}</small>` : ""}
    </button>
    <div class="hiring-tags"><span>${htmlEscape(hiringCategoryLabel(post.category))}</span><span>${htmlEscape(hiringBudgetLabel(post))}</span><span>${htmlEscape(hiringDeadlineLabel(post.deadline_type))}</span><span>${htmlEscape(hiringWorkModes[post.work_mode] || post.work_mode)}</span><span data-status="${htmlEscape(post.status)}">${htmlEscape(hiringStatusLabels[post.status] || post.status)}</span></div>
    <div class="hiring-post-actions">
      <button type="button" data-action="hiring-comment-toggle" data-post-id="${htmlEscape(post.id)}" aria-label="Comentar"><i data-lucide="message-circle"></i><span>${post.metrics?.comments || 0}</span></button>
      <button type="button" class="${post.viewer?.reposted ? "is-active" : ""}" data-action="hiring-repost" data-post-id="${htmlEscape(post.id)}" aria-label="Repostar"><i data-lucide="repeat-2"></i><span>${post.metrics?.reposts || 0}</span></button>
      <button type="button" class="${post.viewer?.liked ? "is-active" : ""}" data-action="hiring-like" data-post-id="${htmlEscape(post.id)}" aria-label="Curtir"><i data-lucide="heart"></i><span>${post.metrics?.likes || 0}</span></button>
      <button type="button" class="${post.viewer?.saved ? "is-active" : ""}" data-action="hiring-save" data-post-id="${htmlEscape(post.id)}" aria-label="Salvar"><i data-lucide="bookmark"></i><span>${post.metrics?.saves || 0}</span></button>
      <button type="button" data-action="hiring-share" data-post-id="${htmlEscape(post.id)}" aria-label="Compartilhar"><i data-lucide="share"></i></button>
    </div>
    <div class="hiring-professional-actions">
      <button type="button" class="${post.viewer?.interested ? "is-active" : ""}" data-action="hiring-interest" data-post-id="${htmlEscape(post.id)}" ${isOwner ? "disabled" : ""}><i data-lucide="hand"></i>${post.viewer?.interested ? "Interesse enviado" : "Tenho interesse"}</button>
      <button type="button" class="${post.viewer?.proposed ? "is-active" : ""}" data-action="hiring-proposal-open" data-post-id="${htmlEscape(post.id)}" ${isOwner ? "disabled" : ""}><i data-lucide="send"></i>${post.viewer?.proposed ? "Proposta enviada" : "Enviar proposta"}</button>
      <button type="button" data-action="hiring-chat-open" data-post-id="${htmlEscape(post.id)}" ${isOwner ? "disabled" : ""}><i data-lucide="messages-square"></i>Abrir chat</button>
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

async function renderHiringPage(options = {}) {
  const detailId = hiringDetailIdFromHash();
  await loadHiringPosts({ force: Boolean(options.force || detailId) });
  const tabs = [["for-you", "Para voce"], ["following", "Seguindo"], ["mine", "Minhas publicacoes"]];
  const isFollowing = appState.hiring.activeTab === "following" && !detailId;
  const postsMarkup = appState.hiring.loading
    ? `<div class="hiring-skeleton"><span></span><span></span><span></span></div>`
    : appState.hiring.error
      ? `<section class="hiring-empty is-error"><i data-lucide="triangle-alert"></i><h2>Nao foi possivel carregar</h2><p>${htmlEscape(appState.hiring.error)}</p><button type="button" data-action="hiring-refresh">Tentar novamente</button></section>`
      : isFollowing
        ? hiringEmptyMarkup("Voce ainda nao segue conversas da comunidade.", "Quando houver um sistema de conexoes ativo, esta aba mostrara somente publicacoes de quem voce segue.")
        : appState.hiring.posts.length
          ? appState.hiring.posts.map((post) => hiringPostCardMarkup(post, { detail: Boolean(detailId) })).join("")
          : hiringEmptyMarkup();
  appView.innerHTML = `<main class="hiring-page hiring-native-layout" aria-labelledby="hiringTitlePage">
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
  PageTransition(appView, COMMUNITY_ROUTE);
  hydrateView();
}

async function submitHiringPost(form) {
  if (!hiringRequireAuth()) return;
  const title = String(form.elements.title?.value || "").trim();
  const description = String(form.elements.description?.value || "").trim();
  if (!title || !description) {
    showToast("Preencha titulo e descricao da publicacao.", "triangle-alert");
    return;
  }
  const payload = {
    user_id: appState.authUser.id,
    title: title.slice(0, 120),
    description: description.slice(0, 1200),
    category: form.elements.category?.value || "outro",
    budget_amount: form.elements.budget_type?.checked ? null : (form.elements.budget_amount?.value ? Number(form.elements.budget_amount.value) : null),
    budget_type: form.elements.budget_type?.checked ? "negotiable" : "fixed",
    currency: "BRL",
    deadline_type: form.elements.deadline_type?.value || "sem_urgencia",
    work_mode: form.elements.work_mode?.value || "remote",
    reference_links: String(form.elements.references?.value || "").trim() || null,
    attachments: [],
    status: "open",
    visibility: "public",
  };
  const { data, error } = await supabaseClient.from("hiring_posts").insert(payload).select().single();
  if (error) {
    showToast(error.message || "Nao foi possivel publicar.", "triangle-alert");
    return;
  }
  form.reset();
  appState.hiring.posts = [{ ...data, metrics: {}, viewer: {} }, ...appState.hiring.posts];
  await loadHiringEngagement(appState.hiring.posts);
  showToast("Publicacao criada na Comunidade ANSEND", "messages-square");
  renderHiringPage({ force: false });
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
  post.viewer[viewerKey] = !isActive;
  post.metrics[metricKey] = Math.max(0, Number(post.metrics[metricKey] || 0) + (isActive ? -1 : 1));
  renderHiringPage({ force: false });
}

async function sendHiringInterest(postId) {
  if (!hiringRequireAuth()) return;
  const post = appState.hiring.posts.find((item) => item.id === postId);
  if (!post || post.user_id === appState.authUser.id) return;
  const { error } = await supabaseClient.from("hiring_interests").upsert({ post_id: postId, user_id: appState.authUser.id }, { onConflict: "post_id,user_id" });
  if (error) {
    showToast(error.message || "Nao foi possivel enviar interesse.", "triangle-alert");
    return;
  }
  post.viewer.interested = true;
  post.metrics.interests = Math.max(1, Number(post.metrics.interests || 0) + 1);
  showToast("Interesse enviado", "hand");
  renderHiringPage({ force: false });
}

function openHiringProposalModal(postId) {
  if (!hiringRequireAuth()) return;
  const post = appState.hiring.posts.find((item) => item.id === postId);
  if (!post || post.user_id === appState.authUser.id) return;
  openModal(`<form class="hiring-proposal-form" data-post-id="${htmlEscape(postId)}"><span><i data-lucide="send"></i>Enviar proposta</span><h2>${htmlEscape(post.title)}</h2><label>Mensagem da proposta<textarea name="message" rows="5" maxlength="1200" required placeholder="Explique como voce pode resolver essa demanda."></textarea></label><label>Valor sugerido<input name="proposed_amount" type="number" inputmode="decimal" min="0" placeholder="R$"></label><label>Prazo de entrega<input name="delivery_deadline" type="text" maxlength="80" placeholder="Ex: hoje, 24h, sexta-feira"></label><label>Links de portfolio<input name="portfolio_links" type="text" maxlength="500" placeholder="SoundCloud, BeatStars, Instagram, site"></label><button class="seller-submit" type="submit">Enviar proposta<i data-lucide="arrow-right"></i></button></form>`);
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
  appState.hiring.posts = appState.hiring.posts.map((post) => post.id === postId ? { ...post, ...data } : post);
  showToast("Status atualizado", "badge-check");
  renderHiringPage({ force: false });
}

async function openHiringChat(postId) {
  if (!hiringRequireAuth()) return;
  const post = appState.hiring.posts.find((item) => item.id === postId);
  if (!post || post.user_id === appState.authUser.id) return;
  const { data, error } = await supabaseClient.from("hiring_conversations").upsert({ post_id: post.id, client_id: post.user_id, professional_id: appState.authUser.id }, { onConflict: "post_id,client_id,professional_id" }).select().single();
  if (error) {
    showToast(error.message || "Nao foi possivel abrir chat.", "triangle-alert");
    return;
  }
  const { data: messages, error: messageError } = await supabaseClient.from("hiring_messages").select("*").eq("conversation_id", data.id).order("created_at", { ascending: true });
  if (messageError) {
    showToast(messageError.message || "Nao foi possivel carregar mensagens.", "triangle-alert");
    return;
  }
  appState.hiring.messages[data.id] = messages || [];
  openHiringConversationModal(data, post);
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

function profileDisplayData(profile = activeProfile()) {
  const role = normalizeRole(profile?.account_role || "artista");
  const styleList = asArray(profile?.music_styles || profile?.genres || []).slice(0, 5);
  const displayName = profile?.display_name || profile?.artistic_name || profile?.full_name || "Perfil ANSEND";
  const username = sanitizeHandle(profile?.username || profile?.handle || "");
  const bannerPositionX = clampImagePosition(profile?.banner_position_x);
  const bannerPositionY = clampImagePosition(profile?.banner_position_y);
  const avatarPositionX = clampImagePosition(profile?.avatar_position_x);
  const avatarPositionY = clampImagePosition(profile?.avatar_position_y);
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
    bannerPosition: `${bannerPositionX}% ${bannerPositionY}%`,
    avatarPosition: `${avatarPositionX}% ${avatarPositionY}%`,
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

function profileAvatarMarkup(display, className = "profile-avatar") {
  const avatar = display?.avatar || "";
  if (avatar && !avatar.includes("undefined")) {
    return `<div class="${className}" style="--profile-avatar-position:${htmlEscape(display.avatarPosition || "50% 50%")}">${optimizedImageMarkup({ src: avatar, alt: `Avatar de ${display.name}`, width: 96, height: 96 })}</div>`;
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
    ? `--profile-banner: url('${htmlEscape(display.banner)}'); --profile-banner-position: ${htmlEscape(display.bannerPosition || "50% 50%")}`
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
  const catalogItems = profileCatalogFor(safeProfile, isOwner);
  const publishedCount = catalogItems.filter((item) => item.status === "published" || item.source !== "catalog").length;
  const actionButtons = isOwner
    ? `<button type="button" class="profile-action is-primary" data-action="toggle-edit-profile"><i data-lucide="edit-3"></i>Editar perfil</button>
       <button type="button" class="profile-action" data-action="share-profile"><i data-lucide="share-2"></i>Compartilhar</button>
       <button type="button" class="profile-action" data-action="logout-account"><i data-lucide="log-out"></i>Sair</button>`
    : `<button type="button" class="profile-action is-primary" data-action="follow-producer"><i data-lucide="user-plus"></i>Seguir</button>
       <button type="button" class="profile-action" data-action="professional-contact" data-title="${htmlEscape(display.name)}"><i data-lucide="handshake"></i>Contratar</button>
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
  renderSpotifyProfile({ profile, isOwner: false });
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
  const name = file?.name || "";
  const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
  return ext || "png";
}

async function uploadProfileAsset(file, type) {
  if (!file) return { url: "", path: "" };
  if (supabaseClient && appState.authUser) {
    const bucket = type === "banner" ? "profile-banners" : "profile-avatars";
    const path = `${appState.authUser.id}/${type}-${Date.now()}.${fileExtension(file)}`;
    const { error } = await supabaseClient.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      contentType: file.type || "image/png",
      upsert: false,
    });
    if (!error) {
      const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);
      return { url: data?.publicUrl || "", path };
    }
    throw error;
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
              <div class="profile-edit-banner-preview ${display.banner ? "has-image" : ""}" style="${display.banner ? `background-image:url('${htmlEscape(display.banner)}');background-position:${htmlEscape(display.bannerPosition)}` : ""}">
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
              <div class="profile-preview-banner ${display.banner ? "has-image" : ""}" style="${display.banner ? `background-image:url('${htmlEscape(display.banner)}');background-position:${htmlEscape(display.bannerPosition)}` : ""}"></div>
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
            <label><span>Avatar horizontal</span><input type="range" name="avatar_position_x" min="0" max="100" value="${display.avatarPositionX}" data-action="profile-image-position" data-image-type="avatar" data-axis="x"></label>
            <label><span>Avatar vertical</span><input type="range" name="avatar_position_y" min="0" max="100" value="${display.avatarPositionY}" data-action="profile-image-position" data-image-type="avatar" data-axis="y"></label>
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
      <div class="profile-image-picker-dialog" role="dialog" aria-modal="true" aria-label="Selecionar imagem">
        <header><div><span>ANSEND</span><h3>Selecionar imagem</h3></div><button type="button" data-action="profile-image-picker-close" aria-label="Fechar"><i data-lucide="x"></i></button></header>
        <button type="button" class="profile-image-dropzone" data-action="profile-image-picker-browse">
          <i data-lucide="image-up"></i>
          <strong>Arraste uma imagem ou clique para enviar</strong>
          <small>PNG, JPG ou WebP</small>
        </button>
        <div class="profile-image-picker-preview" data-image-picker-preview><i data-lucide="image"></i><span>Nenhuma imagem selecionada</span></div>
        <footer>
          <button type="button" class="is-danger" data-action="profile-image-remove">Remover imagem</button>
          <button type="button" class="is-primary" data-action="profile-image-picker-browse">Enviar imagem</button>
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
  form.querySelectorAll(".profile-edit-banner-preview, .profile-preview-banner").forEach((banner) => {
    banner.style.backgroundPosition = `${bannerX}% ${bannerY}%`;
  });
  form.querySelectorAll(".profile-edit-avatar img, .profile-preview-avatar img").forEach((image) => {
    image.style.objectPosition = `${avatarX}% ${avatarY}%`;
  });
  form.querySelectorAll(".profile-edit-avatar, .profile-preview-avatar").forEach((avatar) => {
    avatar.style.setProperty("--profile-avatar-position", `${avatarX}% ${avatarY}%`);
  });
}

function openProfileImagePicker(type = "avatar") {
  const picker = document.querySelector("[data-image-picker]");
  if (!picker) return;
  picker.dataset.imageType = type;
  picker.classList.add("is-open");
  picker.setAttribute("aria-hidden", "false");
  const preview = picker.querySelector("[data-image-picker-preview]");
  const source = type === "banner"
    ? document.querySelector(".profile-edit-banner-preview")
    : document.querySelector(".profile-edit-avatar img");
  const background = type === "banner" ? source?.style.backgroundImage : "";
  const src = type === "avatar" ? source?.getAttribute("src") : String(background || "").replace(/^url\(["']?|["']?\)$/g, "");
  if (preview) {
    preview.innerHTML = src
      ? `<img src="${src}" alt="Prévia da imagem selecionada">`
      : `<i data-lucide="image"></i><span>Nenhuma imagem selecionada</span>`;
  }
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
  const pickerPreview = form.querySelector("[data-image-picker-preview]");
  if (pickerPreview) pickerPreview.innerHTML = `<img src="${src}" alt="Prévia da imagem selecionada">`;
  closeProfileImagePicker();
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
  if (!AUTH_DEBUG_ENABLED) return;
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
  console.debug("[ANSEND auth]", label, {
    route: currentRoute(),
    authReady: appState.authReady,
    userId: appState.authUser?.id || null,
    profileId: appState.profile?.id || null,
    ...rest,
    session: safeSession,
  });
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
    persistAuthCache();
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
    persistAuthCache();
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
    persistAuthCache();
    return appState.profile;
  }
  appState.profile = data;
  clearLocalPreviewProfile();
  persistAuthCache();
  debugAuth("profile_loaded", { userId: user.id, profileId: data.id });
  return data;
  } catch (error) {
    debugAuth("profile_load_failed_transient", { userId: user.id, error: error?.message || String(error) });
    appState.profile = appState.profile || profileFromAuthUser(user);
    persistAuthCache();
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
  const authRequiredForRoute = !hasAccountAccess() && protectedRoute(route);
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
    if (hasAccountAccess()) {
      const email = appState.authUser?.email || "";
      const name = profile?.full_name || profile?.artistic_name || email || "Minha Conta";
      authBtnText.textContent = name.length > 25 ? name.substring(0, 22) + "..." : name;
      if (appState.authUser?.email && !profile?.full_name && !profile?.artistic_name) {
        authBtnText.textContent = appState.authUser.email;
      }
    } else {
      authBtnText.textContent = appLocale.current === "pt-BR" ? "Entrar" : "Sign In";
    }
  }
}

function hasAccountAccess() {
  return Boolean(appState.authUser);
}

function protectedRoute(route) {
  return ["compras", "perfil", "configuracoes", "cadastrar", "admin"].includes(route);
}

function renderReleaseAuthRequired(reason = "missing-session") {
  debugAuth("release_auth_blocked", { reason });
  appView.innerHTML = `
    <section class="release-fallback-page" aria-label="Acesso Negado" style="max-width:800px; margin:40px auto; padding:32px; background:#0b0b0b; border:1px solid rgba(255,106,0,0.2); border-radius:16px; text-align:center;">
      <div class="release-fallback-head" style="margin-bottom:24px;">
        <i data-lucide="shield-alert" style="width:48px; height:48px; color:#ff6a00; margin:0 auto 16px;"></i>
        <h2 style="font-size:28px; color:#fff; margin-top:8px;">AutenticaÃ§Ã£o NecessÃ¡ria</h2>
        <p style="color:#888; font-size:14px; margin-top:8px;">VocÃª precisa criar uma conta ou fazer login para lanÃ§ar suas mÃºsicas e beats na plataforma.</p>
      </div>
      <a href="#vendedor" data-route="vendedor" class="an-primary" style="background:#ff6a00; border:none; color:#000; font-weight:800; padding:12px 24px; border-radius:99px; cursor:pointer; text-decoration:none; display:inline-block;">Entrar / Criar Conta</a>
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

const INITIAL_AUTH_TIMEOUT_MS = 2200;

function timeoutResult(label) {
  return { timedOut: true, label, data: {}, error: null };
}

function withAuthTimeout(promise, label, timeoutMs = INITIAL_AUTH_TIMEOUT_MS) {
  let timeoutId;
  return Promise.race([
    promise.then((value) => ({ ...value, timedOut: false })),
    new Promise((resolve) => {
      timeoutId = setTimeout(() => resolve(timeoutResult(label)), timeoutMs);
    }),
  ]).finally(() => clearTimeout(timeoutId));
}

async function loadPublicPlatformDataSafe(reason = "auth") {
  try {
    await loadPublicPlatformData();
  } catch (error) {
    debugAuth("public_data_load_failed", { reason, error: error?.message || String(error) });
  }
}

async function hydrateAuthenticatedUser(user, options = {}) {
  if (!user) return;
  appState.authUser = user;
  appState.authReady = true;
  appState.authLoading = false;
  await loadProfile(user);
  if (options.touchLogin) {
    await touchProfileLoginMetadata({
      lastLoginAt: options.lastLoginAt || null,
      authProvider: authProviderFromUser(user),
    });
  }
  await loadAdminStatus();
  await loadOwnedCatalogItems();
  persistAuthCache();
}

function clearAuthenticatedSession(reason = "no-session", options = {}) {
  const explicit = Boolean(options.explicit || reason.includes("signout") || reason.includes("logout") || reason.includes("SIGNED_OUT"));
  appState.authUser = null;
  appState.authSession = null;
  appState.authLoading = false;
  appState.profileLoading = false;
  appState.profile = null;
  appState.isAdmin = false;
  appState.adminProfiles = [];
  if (explicit) {
    clearAuthCache();
    clearLocalPreviewProfile();
  }
  appState.ownedCatalogItems = [];
  syncCatalogCompatibilityState();
  debugAuth(reason, { reason });
}

async function reconcileInitialSession(sessionPromise, reason = "initial_timeout") {
  try {
    const { data, error } = await sessionPromise;
    if (error) {
      debugAuth("late_session_error", { reason, error: error.message });
      return;
    }
    const user = data?.session?.user || null;
    if (!user) {
      clearAuthenticatedSession("late_no_session_confirmed", { explicit: true });
      appState.authReady = true;
      syncAccountUi();
      renderRoutePreservingAuthFocus(true);
      return;
    }
    appState.authSession = data.session;
    if (appState.authUser?.id === user.id) {
      persistAuthCache();
      return;
    }
    await loadPublicPlatformDataSafe("late_session");
    await hydrateAuthenticatedUser(user, { touchLogin: false });
    appState.authReady = true;
    syncAccountUi();
    renderRoutePreservingAuthFocus(true);
  } catch (error) {
    debugAuth("late_session_failed", { reason, error: error?.message || String(error) });
  }
}

async function initAuth() {
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
    syncAccountUi();
    renderRoutePreservingAuthFocus();
    return;
  }
  const previousUserId = appState.authUser?.id || null;
  appState.authLoading = true;
  const sessionPromise = supabaseClient.auth.getSession();
  try {
    const sessionResult = await withAuthTimeout(sessionPromise, "getSession");
    if (sessionResult.timedOut) {
      debugAuth("init_get_session_timeout", { timeoutMs: INITIAL_AUTH_TIMEOUT_MS });
      reconcileInitialSession(sessionPromise, "getSession_timeout");
      await loadPublicPlatformDataSafe("initial_timeout");
      appState.authReady = true;
      appState.authLoading = false;
    } else {
      const session = sessionResult.data?.session || null;
      appState.authSession = session;
      const userResult = session
        ? await withAuthTimeout(supabaseClient.auth.getUser(), "getUser")
        : { data: { user: null }, error: null, timedOut: false };
      const user = userResult.data?.user || session?.user || null;
      debugAuth("init_get_session", {
        session,
        getSessionError: sessionResult.error?.message || null,
        getUserId: user?.id || null,
        getUserTimedOut: Boolean(userResult.timedOut),
        getUserError: userResult.error?.message || null,
      });
      await loadPublicPlatformDataSafe("initial_session");
      if (user) {
        await hydrateAuthenticatedUser(user, {
          touchLogin: true,
          lastLoginAt: shouldRedirectAfterOAuth ? new Date().toISOString() : null,
        });
      } else {
        clearAuthenticatedSession("init_no_session", { explicit: true });
      }
    }
  } catch (error) {
    debugAuth("init_auth_failed", { error: error?.message || String(error) });
    await loadPublicPlatformDataSafe("initial_error");
    appState.authReady = true;
    appState.authLoading = false;
  } finally {
    appState.authReady = true;
    appState.authLoading = false;
    syncAccountUi();
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
  renderRoutePreservingAuthFocus(previousUserId !== (appState.authUser?.id || null));
  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    debugAuth("auth_state_change", { event: _event, session });
    const oldUserId = appState.authUser?.id || null;
    try {
      await loadPublicPlatformDataSafe("auth_state_change");
      if (session?.user) {
        appState.authSession = session;
        appState.authUser = session.user;
        await hydrateAuthenticatedUser(session.user, {
          touchLogin: _event === "SIGNED_IN",
          lastLoginAt: _event === "SIGNED_IN" ? new Date().toISOString() : null,
        });
        if (_event === "SIGNED_IN") {
          clearOAuthRedirectIntent();
          clearEmailConfirmation();
          clearEmailConfirmationIntent();
        }
      } else if (_event === "SIGNED_OUT" || _event === "USER_DELETED") {
        clearAuthenticatedSession(`auth_state_${_event}`, { explicit: true });
      } else {
        debugAuth("auth_state_null_session_ignored", { event: _event });
      }
    } catch (error) {
      debugAuth("auth_state_failed", { event: _event, error: error?.message || String(error) });
      if (session?.user) appState.authUser = session.user;
    } finally {
      appState.authReady = true;
      appState.authLoading = false;
      syncAccountUi();
      renderRoutePreservingAuthFocus(oldUserId !== (appState.authUser?.id || null));
    }
  });
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
  return { beatId, licenseId: licensePlans[licenseId] ? licenseId : "premium" };
}

function cartEntryKey(id, licenseId = "premium") {
  return `${id}::${licensePlans[licenseId] ? licenseId : "premium"}`;
}

function findBeat(id) {
  const { beatId } = splitCartEntry(id);
  return searchableBeatPool().find((item) => item.id === beatId) || topBeatOfDay;
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

function renderPurchases() {
  const legacyOrders = appState.purchases
    .filter((id) => !appState.orders.some((order) => order.beatId === id))
    .map((id) => ({ id: `legacy-${id}`, beatId: id, license: "basic", status: "Disponivel", createdAt: new Date().toISOString() }));
  const orders = [...appState.orders, ...legacyOrders];
  const orderMarkup = orders.map((order) => {
    const item = findBeat(order.beatId);
    const license = licensePlans[order.license] || licensePlans.basic;
    return `<article>
      <img src="${item.cover}" alt="">
      <div><strong>${item.title}</strong><span>${item.producer} - ${license.label} - ${license.price}</span></div>
      <span class="purchase-status">${order.status || "Disponivel"}</span>
      <button type="button" data-action="download" data-id="${item.id}"><i data-lucide="download"></i>Baixar</button>
    </article>`;
  }).join("");
  const contractMarkup = appState.contracts.map((contract) => `<article>
    ${professionalAvatarMarkup(findProfessional(contract.professional), "purchase-avatar")}
    <div><strong>${contract.professional}</strong><span>${contract.service} - ${contract.price}</span></div>
    <span class="purchase-status">${contract.status}</span>
    <button type="button" data-action="producer" data-title="${contract.professional}"><i data-lucide="user-round"></i>Perfil</button>
  </article>`).join("");
  const hasItems = orderMarkup || contractMarkup;
  const clearMarkup = hasItems
    ? `<div class="purchase-actions"><button type="button" class="commerce-clear-btn" data-action="clear-purchases"><i data-lucide="trash-2"></i>Remover todos</button></div>`
    : "";
  appView.innerHTML = `${pageIntro("compras")}${hasItems ? `${clearMarkup}<section class="purchase-list">${orderMarkup}${contractMarkup}</section>` : emptyState("shopping-bag", "Nenhum pedido ainda", "Quando voce comprar uma licenca ou contratar um servico, ele aparecera aqui.")}`;
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

function renderCart() {
  const hasItems = appState.cart.length > 0;
  
  if (!hasItems) {
    appView.innerHTML = `${pageIntro("carrinho")}${emptyState("shopping-cart", "Seu carrinho está vazio", "Adicione beats ou serviços ao carrinho para finalizar seu pedido.")}`;
    return;
  }

  const items = appState.cart.map(id => {
    const { beatId, licenseId } = splitCartEntry(id);
    const beatItem = findBeat(beatId) || topBeatOfDay;
    const license = licensePlans[licenseId] || licensePlans.premium;
    const priceText = license.price || beatItem.price || (beatItem.id === "top-beat-psiiiko" ? "$49.99" : ["$29.99", "$35.00", "$44.95", "$49.99", "$9.99", "$24.99"][(beatItem.title.length + (beatItem.producer || "").length) % 6]);
    const rawPrice = Number(beatItem.raw?.price || 0);
    const normalizedPrice = String(priceText).replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(?:\D|$))/g, "").replace(",", ".");
    const priceVal = rawPrice || Number.parseFloat(normalizedPrice) || 0;
    return {
      ...beatItem,
      cartId: id,
      licenseId,
      licenseLabel: license.label,
      priceVal,
      priceText
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.priceVal, 0);
  const serviceFee = parseFloat((subtotal * 0.12).toFixed(2));
  const total = subtotal + serviceFee;
  const itemCountLabel = items.length === 1 ? t("cart.itemSingular") : t("cart.itemPlural");

  const itemMarkup = items.map(item => `
    <article class="cart-item" data-id="${item.id}" data-cart-id="${item.cartId}">
      <img src="${item.cover}" alt="Capa de ${item.title}" class="cart-item-art">
      <div class="cart-item-details">
        <h3>${item.title}</h3>
        <span>${item.licenseLabel} · Revisar licença</span>
        <small class="cart-item-producer">${t("cart.byProducer")} ${item.producer}</small>
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
            <strong>$${subtotal.toFixed(2)}</strong>
          </div>
          <div class="cart-summary-row">
            <span>${t("cart.serviceFee")}</span>
            <strong>$${serviceFee.toFixed(2)}</strong>
          </div>
          <div class="cart-summary-row cart-total-row">
            <span>${t("cart.subtotal")} (${items.length} ${itemCountLabel})</span>
            <strong>$${total.toFixed(2)}</strong>
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

async function callNexoChatApi(messages) {
  const response = await fetch("/api/nexo/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: messages.map(({ role, content }) => ({ role, content })),
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data?.success) {
    throw new Error(data?.error || "Nao consegui responder agora. Verifique a conexao da NEXO IA ou tente novamente em alguns instantes.");
  }
  return data.message;
}

async function extractNexoIntent(message) {
  if (!appState.authUser || !message) return null;
  try {
    const response = await fetch("/api/recommendations/nexo-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  const messages = nexoChatMessages();
  messages.push({ id: nexoChatId("user"), role: "user", content, createdAt: new Date().toISOString() });
  appState.nexoChatLoading = true;
  appState.nexoChatError = "";
  renderAiWorkspace();
  hydrateView();

  try {
    extractNexoIntent(content);
    const answer = await callNexoChatApi(messages);
    messages.push({
      id: nexoChatId("assistant"),
      role: "assistant",
      content: answer?.content || "Nao consegui responder agora. Tente novamente em alguns instantes.",
      createdAt: answer?.createdAt || new Date().toISOString(),
    });
  } catch (error) {
    appState.nexoChatError = error?.message || "Nao consegui responder agora. Verifique a conexao da NEXO IA ou tente novamente em alguns instantes.";
  } finally {
    appState.nexoChatLoading = false;
    renderAiWorkspace();
    hydrateView();
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

function professionalCard(profile) {
  const bannerUrl = profile.cover_url || profile.banner;
  const bannerPosition = `${clampImagePosition(profile.banner_position_x)}% ${clampImagePosition(profile.banner_position_y)}%`;
  const bannerStyle = bannerUrl 
    ? `background-image: url('${htmlEscape(bannerUrl)}'); background-size: cover; background-position: ${htmlEscape(bannerPosition)};` 
    : `background: linear-gradient(135deg, #181818 0%, #292929 50%, #101010 100%);`;

  const initials = profileInitials(profile.name);
  const avatarHtml = profile.avatar_url 
    ? `<img class="professional-card-avatar-img" src="${htmlEscape(profile.avatar_url)}" alt="Avatar de ${htmlEscape(profile.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
       <span class="professional-card-avatar-fallback" style="display: none;">${htmlEscape(initials)}</span>`
    : `<span class="professional-card-avatar-fallback">${htmlEscape(initials)}</span>`;

  // Favorite active state
  const isFavorited = appState.favorites.has(profile.id);
  const favoriteClass = isFavorited ? "is-favorite" : "";
  const isSelf = profile.id === appState.authUser?.id;
  const adminDeleteButton = appState.isAdmin
    ? `<button type="button" class="professional-card-admin-delete" data-action="admin-delete-profile" data-user-id="${profile.id}" aria-label="${isSelf ? "Sua conta admin protegida" : `Remover perfil ${htmlEscape(profile.name)}`}" title="${isSelf ? "Sua conta admin protegida" : "Remover perfil"}" ${isSelf ? "disabled" : ""}>
        <i data-lucide="${isSelf ? "shield-check" : "x"}"></i>
      </button>`
    : "";

  return `<article class="professional-card spotlight-card" data-category="${profile.category}" data-id="${profile.id}">
    ${adminDeleteButton}

    <!-- Top Banner -->
    <div class="professional-card-banner" style="${bannerStyle}"></div>
    
    <!-- Contratar + Button on banner -->
    <button type="button" class="professional-card-hire-btn" data-action="professional-contact" data-title="${htmlEscape(profile.name)}">Contratar +</button>
    
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
      <button type="button" class="professional-card-footer-btn" data-action="producer" data-title="${htmlEscape(profile.name)}" aria-label="Ver perfil">
        <i data-lucide="user-round"></i>
      </button>
      <button type="button" class="professional-card-footer-btn" data-action="professional-contact" data-title="${htmlEscape(profile.name)}" aria-label="Contratar">
        <i data-lucide="handshake"></i>
      </button>
      <button type="button" class="professional-card-footer-btn ${favoriteClass}" data-action="favorite" data-id="${profile.id}" aria-label="Favoritar">
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

function licenseTermsMarkup(plan) {
  const terms = plan.rights || [];
  return terms.map((term) => `<span><i data-lucide="check-circle-2"></i>${htmlEscape(term)}</span>`).join("");
}

function renderBeatDetail() {
  const hashId = location.hash.replace("#beat-", "");
  const item = findBeat(hashId);
  trackUserEvent("view", "beat", item?.raw?.id || item?.id || hashId, { source: "beat-detail" });
  const ownerProfile = profileForUserId(item.user_id || item.raw?.user_id);
  const ownerProfessional = ownerProfile ? profileToProfessional(ownerProfile) : null;
  const producerName = String(item.producer || "ANSEND").replace(/^prod\.\s*/i, "");
  const selectedLicense = "premium";
  const selectedPlan = licensePlans[selectedLicense];
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
  const licenseCards = Object.entries(licensePlans).map(([keyId, plan]) => `<button class="beat-license-card ${keyId === selectedLicense ? "is-selected" : ""}" type="button" data-action="select-beat-license" data-license="${keyId}" data-price="${htmlEscape(plan.price)}" aria-pressed="${keyId === selectedLicense ? "true" : "false"}">
    <span>${htmlEscape(plan.label)}</span>
    <strong>${htmlEscape(plan.price)}</strong>
    <small>${htmlEscape(plan.summary)}</small>
  </button>`).join("");
  const sameProducerMarkup = sameProducer.length
    ? sameProducer.map((beat) => beatDetailMiniCard(beat, "producer")).join("")
    : `<div class="beat-detail-empty">Nenhum outro beat publicado ainda.</div>`;
  const relatedMarkup = related.length
    ? related.map((beat) => beatDetailMiniCard(beat, "related")).join("")
    : `<div class="beat-detail-empty">Sem relacionados por enquanto.</div>`;

  appView.innerHTML = `
    <main class="beat-detail-page beat-market-detail" data-beat-id="${htmlEscape(item.id)}" data-selected-license="${selectedLicense}">
      <div class="beat-detail-shell">
        <aside class="beat-sidebar-card" aria-label="Preview do beat">
          ${adminDeleteButton("beat", item)}
          <button class="beat-sidebar-cover" type="button" data-action="play" data-id="${htmlEscape(item.id)}" aria-label="Tocar preview de ${htmlEscape(item.title)}">
            <img src="${htmlEscape(item.cover)}" alt="Capa do beat ${htmlEscape(item.title)}">
            <span><i data-lucide="play"></i></span>
          </button>
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
                <strong data-license-total>${htmlEscape(selectedPlan.price)}</strong>
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
  return document.querySelector(".release-upload-form");
}

function releaseCurrentStep(form = releaseFormElement()) {
  return Math.max(0, Math.min(5, Number(form?.dataset.releaseStep || 0)));
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
  if (!supabaseClient) {
    throw new Error("Storage permanente nao configurado. Configure o Supabase antes de publicar.");
  }
  let sessionUser = null;
  let sessionError = null;
  try {
    const { data, error } = await withTimeout(
      supabaseClient.auth.getSession(),
      20000,
      "A validacao da sessao demorou demais."
    );
    if (error) sessionError = error;
    sessionUser = data?.session?.user || null;
  } catch (error) {
    sessionError = error;
  }
  if (!sessionUser) {
    try {
      const { data, error } = await withTimeout(
        supabaseClient.auth.getUser(),
        20000,
        "A validacao do usuario demorou demais."
      );
      if (error) sessionError = error;
      sessionUser = data?.user || null;
    } catch (error) {
      sessionError = error;
    }
  }
  if (!sessionUser && appState.authUser?.id) {
    console.warn("[ANSEND release] Supabase session check was slow; trying storage upload with cached authenticated user.", sessionError);
    sessionUser = appState.authUser;
  }
  if (!sessionUser?.id) {
    throw new Error("Entre na sua conta para enviar arquivos e publicar.");
  }
  if (appState.authUser?.id !== sessionUser.id) {
    appState.authUser = sessionUser;
    await loadProfile(sessionUser);
    syncAccountUi();
  }
  return sessionUser;
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
    form.elements.audio_url.value = data.audio_url;
    form.elements.audio_path.value = data.audio_path;
    const audioPreview = form.querySelector(".release-audio-preview");
    const player = audioPreview?.querySelector("audio");
    if (player) player.src = data.audio_url;
    if (audioPreview) audioPreview.style.display = "flex";
    form.querySelector(".release-audio-drop")?.classList.add("has-file");
  }
  if (data.stems_url && data.stems_path) {
    form.elements.stems_url.value = data.stems_url;
    form.elements.stems_path.value = data.stems_path;
    form.querySelector(".stems-preview")?.style.setProperty("display", "block");
    form.querySelector(".release-stems-drop")?.classList.add("has-file");
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
  const rawMessage = String(error?.message || error?.error_description || error?.error || "").trim();
  if (/row-level security|permission|not authorized|unauthorized|jwt|403/i.test(rawMessage)) {
    return `Nao foi possivel enviar a ${label}: sua sessao expirou ou nao tem permissao no Storage. Faca login novamente e tente de novo.`;
  }
  if (/already exists|duplicate|409/i.test(rawMessage)) {
    return `Esse envio ficou preso em um arquivo anterior. Selecione a ${label} novamente.`;
  }
  if (/timeout|demorou|network|failed to fetch/i.test(rawMessage)) {
    return `O upload da ${label} demorou demais. Verifique sua conexao e tente de novo.`;
  }
  return rawMessage || `Nao foi possivel enviar a ${label}. Tente novamente.`;
}

function releaseUploadTimeoutMs(type) {
  if (type === "cover") return 180000;
  if (type === "audio") return 60000;
  return 90000;
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
    if (isReleaseUploadInProgress("audio", form)) {
      showToast("Aguarde o upload do audio terminar.", "upload-cloud");
      return false;
    }
    const audioUrl = form.elements.audio_url?.value;
    if (!audioUrl) {
      showToast("Por favor, envie o arquivo de áudio principal", "alert-triangle");
      return false;
    }
  }
  
  if (step === 3) {
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

function syncReleaseForm(form = releaseFormElement()) {
  if (!form) return;
  
  const title = form.elements.title?.value?.trim() || "Sem título";
  const artist = form.elements.producer_name?.value?.trim() || activeProfile()?.artistic_name || activeProfile()?.full_name || "ANSEND";
  const genre = form.elements.genre?.value || "ANSEND";
  const bpm = form.elements.bpm?.value ? `${form.elements.bpm.value} BPM` : "";
  const key = form.elements.musical_key?.value?.trim() || "";
  const price = form.elements.price?.value ? `R$ ${Number(form.elements.price.value).toFixed(2)}` : "R$ 0,00";
  const licenseType = form.elements.license_type?.value || "premium";
  const coverUrl = form.elements.cover_url?.value || "assets/ansend-logo-square.png";
  const audioUrl = form.elements.audio_url?.value || "";
  const desc = form.elements.description?.value?.trim() || "Sem descrição fornecida.";
  
  const tagsStr = form.elements.release_tags?.value || "";
  const tags = [
    genre,
    bpm,
    key,
    ...tagsStr.split(",").map(t => t.trim()).filter(Boolean)
  ].filter(Boolean);
  
  if (form.elements.tags) form.elements.tags.value = tags.join(", ");
  
  // Update mini footer track preview
  form.querySelectorAll("[data-footer-title]").forEach(el => el.textContent = title);
  form.querySelectorAll("[data-footer-artist]").forEach(el => el.textContent = artist);
  form.querySelectorAll(".release-footer-cover").forEach(img => img.src = coverUrl);
  
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
  
  // Review audio player
  const reviewPlayer = form.querySelector(".review-audio-player");
  if (reviewPlayer && audioUrl) reviewPlayer.src = audioUrl;
  
  // Delivery files summary
  const files = [];
  if (form.elements.delivery_mp3?.checked) files.push("MP3");
  if (form.elements.delivery_wav?.checked) files.push("WAV");
  if (form.elements.delivery_stems?.checked) files.push("Stems");
  if (form.elements.delivery_contract?.checked) files.push("Contrato");
  form.querySelectorAll("[data-review-files]").forEach(el => el.textContent = files.join(", ") || "-");
}

function setReleaseStep(step, form = releaseFormElement()) {
  if (!form) return;
  const nextStep = Math.max(0, Math.min(5, Number(step)));
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
  
  if (back) back.disabled = nextStep === 0;
  if (next) next.style.display = nextStep === 5 ? "none" : "flex";
  if (submit) submit.style.display = nextStep === 5 ? "flex" : "none";
  
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
  const uploadUser = await currentReleaseUploadUser();
  const isCover = type === "cover";
  const isAudio = type === "audio";
  const isStems = type === "stems";
  const extension = String(file.name || "").split(".").pop()?.toLowerCase() || "";
  if (isCover && !(/^image\/(png|jpe?g|webp)$/i.test(file.type || "") || ["jpg", "jpeg", "png", "webp"].includes(extension))) {
    throw new Error("Envie uma capa JPG, PNG ou WEBP.");
  }
  if (isAudio && !(/^(audio\/|video\/mp4)/i.test(file.type || "") || ["mp3", "wav", "m4a", "aac", "ogg", "flac"].includes(extension))) {
    throw new Error("Envie um arquivo de audio valido.");
  }
  if (isStems && !(/(zip|x-zip-compressed)/i.test(file.type || "") || extension === "zip")) {
    throw new Error("Envie os stems em um arquivo ZIP.");
  }

  let url = "";
  let path = "";
  
  const userId = uploadUser.id;
  const form = releaseFormElement();
  const beatId = form?.dataset?.beatId || generateUUID();
  const rawExt = file.name.split(".").pop() || (type === "cover" ? "webp" : "mp3");
  const ext = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "") || (type === "cover" ? "webp" : "mp3");
  const bucket = type === "cover" ? "beat-covers" : type === "audio" ? "beat-audio" : "beat-stems";
  const uploadKey = `${Date.now()}-${generateUUID().slice(0, 8)}`;
  const folder = type === "cover" ? "covers" : type === "audio" ? "audio" : "stems";
  const fileBase = sanitizeStorageSegment(file.name.replace(/\.[^.]+$/, ""), type);
  const fileName = `${type === "cover" ? "cover" : type === "audio" ? "audio" : "stems"}-${fileBase}-${uploadKey}.${ext}`;
  path = `${userId}/${folder}/${beatId}/${fileName}`;
  
  progressCallback?.(55);
  const uploadOptions = {
    cacheControl: "3600",
    contentType: file.type || undefined,
    upsert: type === "cover"
  };
  const { error } = await withTimeout(
    supabaseClient.storage.from(bucket).upload(path, file, uploadOptions),
    releaseUploadTimeoutMs(type),
    `O upload da ${type === "cover" ? "capa" : type === "audio" ? "audio" : "arquivo"} demorou demais.`
  );
    
  if (error) throw error;
  
  const { data: urlData } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(path);
    
  url = urlData?.publicUrl || "";
  if (!url) throw new Error("Upload concluido, mas o storage nao retornou uma URL publica.");
  
  progressCallback?.(100);
  return { url, path };
}

async function handleReleaseFile(file, type) {
  if (!file) return;
  if (!supabaseClient || !appState.authUser) {
    showToast("Você precisa estar autenticado para enviar arquivos.", "triangle-alert");
    location.hash = "vendedor";
    return;
  }
  const form = releaseFormElement();
  if (!form) return;
  
  // Find progress bar elements in the correct dropzone
  const dropzone = form.querySelector(`[data-upload-drop="${type}"]`);
  const progressContainer = dropzone?.querySelector(".upload-progress-container");
  const progressBar = dropzone?.querySelector(".upload-progress-bar");
  const progressPercent = dropzone?.querySelector(".upload-progress-percent");
  
  setReleaseUploadError(dropzone, "");
  if (type === "cover") {
    setCoverPreview(file, form);
    syncReleaseForm(form);
  }
  setReleaseUploadInProgress(type, true, form);
  if (progressBar) progressBar.style.width = "0%";
  if (progressPercent) progressPercent.textContent = "0%";
  if (progressContainer) progressContainer.style.display = "block";
  
  try {
    const result = await handleReleaseUpload(file, type, (progress) => {
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (progressPercent) progressPercent.textContent = `${progress}%`;
    });
    
    // Hide progress bar after complete
    if (progressContainer) progressContainer.style.display = "none";
    setReleaseUploadInProgress(type, false, form);
    
    // Set values
    if (type === "cover") {
      form.elements.cover_url.value = result.url;
      form.elements.cover_path.value = result.path;
      
      const preview = form.querySelector(".release-cover-preview");
      if (preview) {
        preview.src = result.url;
        preview.classList.add("has-preview");
      }
      dropzone?.classList.add("has-file");
      dropzone?.classList.remove("has-local-preview");
      const coverActions = form.querySelector(".cover-actions-container");
      if (coverActions) coverActions.style.display = "block";
      
      showToast("Capa enviada com sucesso!", "image");
    } else if (type === "audio") {
      form.elements.audio_url.value = result.url;
      form.elements.audio_path.value = result.path;
      
      // Calculate file size and metadata mock
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      form.elements.file_size.value = file.size;
      
      // Render player
      const audioPreview = form.querySelector(".release-audio-preview");
      const nameNode = form.querySelector("[data-audio-name]");
      const sizeNode = form.querySelector("[data-audio-size]");
      const player = audioPreview?.querySelector("audio");
      
      if (nameNode) nameNode.textContent = file.name;
      if (sizeNode) sizeNode.textContent = `${sizeMB} MB · carregando...`;
      if (player) {
        player.src = result.url;
        player.hidden = false;
        player.onloadedmetadata = () => {
          const duration = player.duration;
          form.elements.duration_seconds.value = Math.round(duration);
          const minutes = Math.floor(duration / 60);
          const seconds = Math.round(duration % 60).toString().padStart(2, '0');
          if (sizeNode) sizeNode.textContent = `${sizeMB} MB · ${minutes}:${seconds}`;
          syncReleaseForm(form);
        };
      }
      if (audioPreview) audioPreview.style.display = "flex";
      dropzone?.classList.add("has-file");
      
      showToast("Áudio enviado com sucesso!", "music");
    } else if (type === "stems") {
      form.elements.stems_url.value = result.url;
      form.elements.stems_path.value = result.path;
      
      const stemsPreview = form.querySelector(".stems-preview");
      const nameNode = form.querySelector("[data-stems-name]");
      if (nameNode) nameNode.textContent = file.name;
      if (stemsPreview) stemsPreview.style.display = "block";
      dropzone?.classList.add("has-file");
      
      showToast("ZIP de Stems enviado com sucesso!", "archive");
    }
    
    syncReleaseForm(form);
  } catch (err) {
    if (progressContainer) progressContainer.style.display = "none";
    setReleaseUploadInProgress(type, false, form);
    if (progressBar) progressBar.style.width = "0%";
    if (progressPercent) progressPercent.textContent = "0%";
    const message = releaseStorageErrorMessage(err, type);
    setReleaseUploadError(dropzone, message);
    console.error("Release upload failed", err);
    showToast(message, "alert-triangle");
  }
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
    const result = await handleReleaseUpload(uploadFile, type, (progress) => {
      if (releaseUploadTokens.get(type) === uploadToken) {
        setReleaseProgress(dropzone, progress, type === "cover" ? "Finalizando capa..." : "Finalizando arquivo...");
      }
    });

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
      form.elements.audio_url.value = result.url;
      form.elements.audio_path.value = result.path;
      
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      form.elements.file_size.value = file.size;
      
      const audioPreview = form.querySelector(".release-audio-preview");
      const nameNode = form.querySelector("[data-audio-name]");
      const sizeNode = form.querySelector("[data-audio-size]");
      const player = audioPreview?.querySelector("audio");
      
      if (nameNode) nameNode.textContent = file.name;
      if (sizeNode) sizeNode.textContent = `${sizeMB} MB - carregando...`;
      if (player) {
        player.src = result.url;
        player.hidden = false;
        player.onloadedmetadata = () => {
          const duration = player.duration;
          form.elements.duration_seconds.value = Math.round(duration);
          const minutes = Math.floor(duration / 60);
          const seconds = Math.round(duration % 60).toString().padStart(2, "0");
          if (sizeNode) sizeNode.textContent = `${sizeMB} MB - ${minutes}:${seconds}`;
          syncReleaseForm(form);
        };
      }
      if (audioPreview) audioPreview.style.display = "flex";
      dropzone?.classList.add("has-file");
      await persistReleaseUploadDraft({ audio_url: result.url, audio_path: result.path }, form);
      showToast("Audio enviado com sucesso!", "music");
    } else if (type === "stems") {
      form.elements.stems_url.value = result.url;
      form.elements.stems_path.value = result.path;
      const stemsPreview = form.querySelector(".stems-preview");
      const nameNode = form.querySelector("[data-stems-name]");
      if (nameNode) nameNode.textContent = file.name;
      if (stemsPreview) stemsPreview.style.display = "block";
      dropzone?.classList.add("has-file");
      await persistReleaseUploadDraft({ stems_url: result.url, stems_path: result.path }, form);
      showToast("ZIP de Stems enviado com sucesso!", "archive");
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

  // Save Draft & Publish using data-action attributes
  const draftBtn = releasePage.querySelector('[data-action="save-draft"]');
  const publishBtn = releasePage.querySelector('[data-action="publish-catalog"]');
  
  if (draftBtn) {
    draftBtn.addEventListener("click", () => {
      saveBeatRelease("draft");
    });
  }
  
  if (publishBtn) {
    publishBtn.addEventListener("click", () => {
      saveBeatRelease("published");
    });
  }
  
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
  
  // License Card selection
  const licenseCards = form.querySelectorAll(".license-info-card");
  licenseCards.forEach((card) => {
    card.addEventListener("click", () => {
      licenseCards.forEach(c => c.classList.remove("is-selected"));
      card.classList.add("is-selected");
      
      const licenseVal = card.dataset.license;
      form.elements.license_type.value = licenseVal;
      
      // Automatically adjust pricing input based on selected license
      const priceInput = form.elements.price;
      if (priceInput) {
        if (licenseVal === "basic") {
          priceInput.value = "49.90";
          priceInput.disabled = false;
        } else if (licenseVal === "premium") {
          priceInput.value = "99.90";
          priceInput.disabled = false;
        } else if (licenseVal === "exclusive") {
          priceInput.value = "499.90";
          priceInput.disabled = false;
        } else if (licenseVal === "free") {
          priceInput.value = "0.00";
          priceInput.disabled = true;
        }
      }
      
      // If exclusive, set max_sales to 1 and disable
      const maxSalesInput = form.elements.max_sales;
      if (maxSalesInput) {
        if (licenseVal === "exclusive") {
          maxSalesInput.value = "1";
          maxSalesInput.disabled = true;
        } else if (licenseVal === "free") {
          maxSalesInput.value = "";
          maxSalesInput.disabled = true;
        } else {
          maxSalesInput.value = "50";
          maxSalesInput.disabled = false;
        }
      }
      
      syncReleaseForm(form);
    });
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
  
  const removeStems = form.querySelector('[data-action="remove-stems"]');
  if (removeStems) {
    removeStems.addEventListener("click", () => {
      form.elements.stems_url.value = "";
      form.elements.stems_path.value = "";
      form.querySelector(".stems-preview").style.display = "none";
      form.querySelector(".release-stems-drop")?.classList.remove("has-file");
      void persistReleaseUploadDraft({ stems_url: null, stems_path: null }, form);
    });
  }
  
  // Real-time synchronization of title, artist, etc. on input/change
  form.addEventListener("input", () => {
    syncReleaseForm(form);
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
    price: form.elements.price?.value ? Number(form.elements.price.value) : 0,
    allow_tagged_download: form.elements.allow_tagged_download?.value === "true",
    allow_commercial_use: form.elements.allow_commercial_use?.value === "true",
    max_sales: form.elements.max_sales?.value ? Number(form.elements.max_sales.value) : null,
    license_terms: form.elements.license_terms?.value?.trim() || null,
    delivery_mp3: form.elements.delivery_mp3?.checked || false,
    delivery_wav: form.elements.delivery_wav?.checked || false,
    delivery_stems: form.elements.delivery_stems?.checked || false,
    delivery_contract: form.elements.delivery_contract?.checked || false,
    delivery_notes: form.elements.delivery_notes?.value?.trim() || null,
    cover_url: form.elements.cover_url?.value || null,
    cover_path: form.elements.cover_path?.value || null,
    audio_url: form.elements.audio_url?.value || null,
    audio_path: form.elements.audio_path?.value || null,
    stems_url: form.elements.stems_url?.value || null,
    stems_path: form.elements.stems_path?.value || null,
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

function renderMusicUpload() {
  if (!supabaseClient || !appState.authUser) {
    debugAuth("release_auth_blocked", { reason: !supabaseClient ? "supabase_not_configured" : "render_no_session" });
    appView.innerHTML = `
      <section class="release-fallback-page" aria-label="Acesso Negado" style="max-width:800px; margin:40px auto; padding:32px; background:#0b0b0b; border:1px solid rgba(255,106,0,0.2); border-radius:16px; text-align:center;">
        <div class="release-fallback-head" style="margin-bottom:24px;">
          <i data-lucide="shield-alert" style="width:48px; height:48px; color:#ff6a00; margin:0 auto 16px;"></i>
          <h2 style="font-size:28px; color:#fff; margin-top:8px;">Autenticação Necessária</h2>
          <p style="color:#888; font-size:14px; margin-top:8px;">Você precisa criar uma conta ou fazer login para lançar suas músicas e beats na plataforma.</p>
        </div>
        <a href="#vendedor" data-route="vendedor" class="an-primary" style="background:#ff6a00; border:none; color:#000; font-weight:800; padding:12px 24px; border-radius:99px; cursor:pointer; text-decoration:none; display:inline-block;">Entrar / Criar Conta</a>
      </section>`;
    applyLocaleTextOverrides(appView);
    lucide.createIcons();
    return;
  }
  const profile = activeProfile();
  const display = profileDisplayData(profile);
  const releaseProducerName = display.name || profile?.artistic_name || profile?.full_name || profile?.username || appState.authUser?.email?.split("@")[0] || "ANSEND";
  const beatId = generateUUID();
  const stepLabels = ["Detalhes","Capa","Faixa","Preço","Entrega","Revisão"];
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
    + '<input type="hidden" name="stems_url"><input type="hidden" name="stems_path">'
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
    + '<div class="release-field"><span class="release-label">Tom musical / Key *</span><div class="custom-select" data-select-id="musical_key"><input type="hidden" name="musical_key" required><button type="button" class="custom-select-trigger"><span>Selecione o tom</span><i data-lucide="chevron-down"></i></button><div class="custom-select-options">' + keyOptions + '</div></div></div>'
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

    // STEP 2 — Faixa
    + '<section class="release-panel" data-panel="2">'
    + '<div class="release-panel-header"><h2>Arquivo de Áudio</h2><p>Suba o arquivo de áudio do beat (MP3, WAV ou FLAC).</p></div>'
    + '<div class="release-upload-layout">'
    + '<div class="release-dropzone release-audio-drop" data-upload-drop="audio"><input class="release-file-input" type="file" accept="audio/mpeg,audio/wav,audio/x-wav,audio/flac,audio/mp3" data-upload-type="audio"><div class="release-upload-icon"><i data-lucide="music"></i></div><strong>Arraste ou selecione o áudio</strong><small>MP3, WAV ou FLAC de alta qualidade</small><p class="release-upload-error" hidden></p><div class="upload-progress-container" style="display:none;"><div class="upload-progress-header"><span>Enviando áudio...</span><span class="upload-progress-percent">0%</span></div><div class="upload-progress-track"><div class="upload-progress-bar"></div></div></div></div>'
    + '<div class="release-requirements"><strong>Áudio Preview</strong><div class="release-audio-preview" style="display:none;"><div class="release-audio-preview-header"><span>Preview Pronto</span><button type="button" class="release-remove-btn" data-action="remove-audio"><i data-lucide="trash-2"></i> Remover</button></div><div class="release-audio-info"><i data-lucide="file-audio" style="width:24px;height:24px;"></i><div class="release-audio-meta"><strong data-audio-name>Nome do arquivo.wav</strong><small data-audio-size>0 MB · 0:00</small></div></div><audio class="release-audio-player" controls preload="metadata"></audio></div></div>'
    + '</div></section>'

    // STEP 3 — Preço
    + '<section class="release-panel" data-panel="3">'
    + '<div class="release-panel-header"><h2>Licença e Preço</h2><p>Defina o tipo de licença e o valor do beat.</p></div>'
    + '<input type="hidden" name="license_type" value="premium">'
    + '<div class="license-cards-grid">'
    + '<div class="license-info-card" data-license="free"><strong>Free</strong><span class="license-price">Grátis</span><ul><li>MP3 com tag</li><li>Até 500 streams</li><li>Uso não-comercial</li></ul></div>'
    + '<div class="license-info-card" data-license="basic"><strong>Básica</strong><span class="license-price">R$ 49,90</span><ul><li>MP3 enviado</li><li>Até 2.000 streams</li><li>Uso não-comercial</li></ul></div>'
    + '<div class="license-info-card is-selected" data-license="premium"><strong>Premium</strong><span class="license-price">R$ 99,90</span><ul><li>MP3 + WAV</li><li>Até 10.000 streams</li><li>Uso comercial limitado</li></ul></div>'
    + '<div class="license-info-card" data-license="exclusive"><strong>Exclusiva</strong><span class="license-price">R$ 499,90</span><ul><li>WAV + Stems</li><li>Streams ilimitados</li><li>Posse total de direitos</li></ul></div>'
    + '</div>'
    + '<div class="release-form-grid" style="margin-top:32px;">'
    + '<label class="release-field"><span class="release-label">Preço do Beat (R$) *</span><input name="price" type="number" min="0" step="0.01" value="99.90" required></label>'
    + '<label class="release-field"><span class="release-label">Vendas máximas</span><input name="max_sales" type="number" min="1" value="50" placeholder="Ex: 50"></label>'
    + '<fieldset class="release-radio-group release-wide"><legend>Download com tag de voz (Tagged)?</legend><div class="release-radio-options"><label><input type="radio" name="allow_tagged_download" value="true" checked> Sim</label><label><input type="radio" name="allow_tagged_download" value="false"> Não</label></div></fieldset>'
    + '<fieldset class="release-radio-group release-wide"><legend>Permitir uso comercial básico?</legend><div class="release-radio-options"><label><input type="radio" name="allow_commercial_use" value="true" checked> Sim</label><label><input type="radio" name="allow_commercial_use" value="false"> Não</label></div></fieldset>'
    + '<label class="release-field release-wide"><span class="release-label">Termos da licença (opcional)</span><textarea name="license_terms" rows="3" placeholder="Termos de uso personalizados..."></textarea></label>'
    + '</div></section>'

    // STEP 4 - Entrega
    + '<section class="release-panel" data-panel="4">'
    + '<div class="release-panel-header"><h2>Entrega do Beat</h2><p>Especifique os arquivos que o comprador receberá.</p></div>'
    + '<div class="delivery-options-grid"><div>'
    + '<fieldset class="release-radio-group release-wide"><legend>Arquivos incluídos na compra *</legend><div class="delivery-checklist"><label><input type="checkbox" name="delivery_mp3" checked> MP3 de Alta Qualidade</label><label><input type="checkbox" name="delivery_wav" checked> WAV Masterizado</label><label><input type="checkbox" name="delivery_stems"> Stems / Pistas separadas</label><label><input type="checkbox" name="delivery_contract" checked> Contrato assinado</label></div></fieldset>'
    + '<div class="release-form-grid" style="margin-top:20px;"><label class="release-field release-wide"><span class="release-label">Observações para o comprador</span><textarea name="delivery_notes" rows="3" placeholder="Ex: Obrigado pela compra! Qualquer dúvida, entre em contato."></textarea></label></div>'
    + '</div><div>'
    + '<div class="release-field"><span class="release-label">Upload de Stems (opcional)</span><div class="release-dropzone release-stems-drop" data-upload-drop="stems" style="min-height:190px;"><input class="release-file-input" type="file" accept="application/zip,application/x-zip-compressed" data-upload-type="stems"><div class="release-upload-icon"><i data-lucide="archive"></i></div><strong>Selecione o ZIP de Stems</strong><small>Pistas individuais do beat</small><p class="release-upload-error" hidden></p><div class="upload-progress-container" style="display:none;"><div class="upload-progress-header"><span>Enviando Stems...</span><span class="upload-progress-percent">0%</span></div><div class="upload-progress-track"><div class="upload-progress-bar"></div></div></div></div><div class="stems-preview" style="display:none;margin-top:12px;"><div style="display:flex;justify-content:space-between;align-items:center;"><span data-stems-name>stems.zip</span><button type="button" class="release-remove-btn" data-action="remove-stems">Remover</button></div></div></div>'
    + '</div></div></section>'

    // STEP 5 - Revisão
    + '<section class="release-panel" data-panel="5">'
    + '<div class="release-panel-header"><h2>Revisão Final</h2><p>Confira todas as informações antes de publicar.</p></div>'
    + '<div class="review-grid"><div class="review-left"><div class="review-cover-wrapper"><img class="review-cover-img" src="assets/ansend-logo-square.png" alt="Capa do beat"></div><div class="review-audio-section"><audio class="review-audio-player" controls preload="metadata"></audio></div></div>'
    + '<div class="review-details"><div class="review-header-info"><h3 data-review-title>Sem título</h3><p data-review-producer>por Produtor ANSEND</p></div>'
    + '<dl class="review-meta-grid"><div class="review-meta-item"><dt>Gênero</dt><dd data-review-genre>-</dd></div><div class="review-meta-item"><dt>BPM</dt><dd data-review-bpm>-</dd></div><div class="review-meta-item"><dt>Tom / Key</dt><dd data-review-key>-</dd></div><div class="review-meta-item"><dt>Preço</dt><dd data-review-price>R$ 0,00</dd></div><div class="review-meta-item"><dt>Licença</dt><dd data-review-license>Premium</dd></div><div class="review-meta-item"><dt>Arquivos</dt><dd data-review-files>MP3, WAV, Contrato</dd></div></dl>'
    + '<div class="review-description"><h4>Descrição</h4><p data-review-desc>Sem descrição fornecida.</p></div></div></div></section>'

    + '</form></div>'

    // Bottom Bar
    + '<footer class="release-bottom-bar"><div class="release-bottom-inner">'
    + '<div class="release-footer-track"><img class="release-footer-cover" src="assets/ansend-logo-square.png" alt="Capa"><div><strong data-footer-title>Sem título</strong><small data-footer-artist>' + (display.name || "Produtor ANSEND") + '</small></div></div>'
    + '<div class="release-footer-actions"><button type="button" class="release-back-btn" data-action="release-back" disabled>Voltar</button><button type="button" class="release-draft-btn" data-action="save-draft">Salvar Rascunho</button><button type="button" class="release-next-btn" data-action="release-next">Próximo</button><button type="button" class="release-submit-btn" data-action="publish-catalog" style="display:none;">Publicar</button></div>'
    + '</div></footer></section>';

  hydrateReleaseDetailsStep(releaseFormElement(), releaseProducerName, genreOptions, keyOptions);
  setupMusicUploadEventListeners();
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
  <section class="release-fallback-page" aria-label="Cadastrar música" style="max-width:800px; margin:40px auto; padding:32px; background:#0b0b0b; border:1px solid rgba(255,106,0,0.2); border-radius:16px; text-align:center;">
    <div class="release-fallback-head" style="margin-bottom:24px;">
      <span style="color:#ff6a00; font-size:12px; font-weight:900; text-transform:uppercase;">ANSEND release</span>
      <h2 style="font-size:28px; color:#fff; margin-top:8px;">Lançar música</h2>
      <p style="color:#888; font-size:14px;">Cadastre capa, áudio, licença e preço para publicar no seu catálogo.</p>
      ${errorNote}
    </div>
    <button type="button" onclick="renderMusicUpload();" style="background:#ff6a00; border:none; color:#000; font-weight:800; padding:12px 24px; border-radius:99px; cursor:pointer;">Tentar recarregar fluxo completo</button>
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
    ...appState.orders.slice(0, 2).map((order) => ["shopping-bag", findBeat(order.beatId).title, order.status || "Pedido registrado"]),
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
            <i data-lucide="play"></i>
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
            ${socialLinks.length ? socialLinks.map(([icon, label, url]) => `<li><a href="${url}" target="_blank" rel="noreferrer"><i data-lucide="${icon}"></i><span>${label}</span><i data-lucide="external-link"></i></a></li>`).join("") : `<li class="profile-empty-link"><span>Adicione seus links em Editar perfil.</span></li>`}
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
  const route = currentRoute();
  lastRoute = route;
  const institutionalFooter = document.querySelector(".footer");
  if (institutionalFooter) institutionalFooter.hidden = route !== "feed";
  syncPrimaryNavbarVisibility(route);
  const accountAccess = hasAccountAccess();
  const authRequiredForRoute = !accountAccess && protectedRoute(route);
  appView.classList.add("app-view");
  appView.classList.toggle("feed", route === "feed");
  document.body.classList.toggle("is-authenticated", accountAccess);
  document.body.classList.toggle("requires-auth", authRequiredForRoute);
  document.body.dataset.route = route;
  document.body.classList.remove("release-mode");
  appView.classList.remove("route-slide-in", "route-slide-left");
  document.querySelectorAll("a[data-route], button[data-route]").forEach((item) => item.classList.toggle("is-active", item.dataset.route === route));
  document.body.classList.remove("menu-open");
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
  if (route === "biblioteca" || route === "musicas") renderLibrary();
  if (route === "ia" || route === "ferramentas") renderAiWorkspace();
  if (route === "produtores") renderProducers();
  if (route === COMMUNITY_ROUTE) {
    appView.innerHTML = `<main class="hiring-page"><section class="hiring-feed-shell"><div class="hiring-skeleton"><span></span><span></span><span></span></div></section></main>`;
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
  PageTransition(appView, route);
  hydrateView();
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
      ${relatedBeats.map((item) => `<button type="button" data-action="open-beat" data-id="${item.id}"><img src="${findBeat(item.id).cover}" alt=""><span>${item.title}</span></button>`).join("")}
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

function openCheckout(id, selectedPlan = "premium") {
  const item = findBeat(id) || topBeatOfDay;
  const cards = Object.entries(licensePlans).map(([key, plan]) => `<label class="checkout-plan ${key === selectedPlan ? "is-selected" : ""}">
    <input type="radio" name="license" value="${key}" ${key === selectedPlan ? "checked" : ""}>
    <span>${plan.label}</span>
    <strong>${plan.price}</strong>
    <small>${plan.summary}</small>
  </label>`).join("");
  openModal(`<form class="checkout-form" data-beat-id="${item.id}">
    <span><i data-lucide="shopping-cart"></i>Checkout seguro ANSEND</span>
    <h2>${item.title}</h2>
    <p>${item.producer} / ${(item.tags || ["Top beat"]).join(" / ")}</p>
    <div class="checkout-product"><img src="${item.cover}" alt="Capa de ${item.title}"><div><strong>Contrato digital</strong><small>Pagamento simulado em ambiente preview. Pedido fica salvo na aba Pedidos.</small></div></div>
    <div class="checkout-plans">${cards}</div>
    <button class="seller-submit" type="submit">Finalizar pedido<i data-lucide="arrow-right"></i></button>
  </form>`);
}

function playerActionBeat() {
  return currentPlayingBeat() || topBeatOfDay;
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
  return dedupeById([current, ...marketplaceBeats().filter((item) => item.id !== current.id).slice(0, 8)]);
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
  return `${location.origin}${location.pathname}#beat-${item.id || topBeatOfDay.id}`;
}

async function shareCurrentBeat(item = playerActionBeat()) {
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

function currentPlayingBeat() {
  if (appState.playing === topBeatOfDay.id) return topBeatOfDay;
  return findBeat(appState.playing) || topBeatOfDay;
}

function applyPlayerAudioSettings() {
  const audio = topBeatAudio();
  if (!audio) return;
  if (!Number.isFinite(appState.player.volume)) appState.player.volume = .82;
  if (!Number.isFinite(appState.player.speed)) appState.player.speed = 1;
  if (!Number.isFinite(appState.player.pitch)) appState.player.pitch = 0;
  audio.volume = Math.min(1, Math.max(0, appState.player.volume));
  audio.loop = Boolean(appState.player.loop);
  audio.playbackRate = Math.min(1.5, Math.max(.65, appState.player.speed));
  audio.preservesPitch = Math.abs(appState.player.pitch) < 1;
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
  if (miniButton) {
    const isPlaying = player.classList.contains("is-playing");
    miniButton.innerHTML = `<i data-lucide="${isPlaying ? "pause" : "play"}"></i>`;
  }
  if (volumeButton) {
    const icon = appState.player.volume <= .02 ? "volume-x" : appState.player.volume < .45 ? "volume-1" : "volume-2";
    volumeButton.innerHTML = `<i data-lucide="${icon}"></i>`;
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
      muteButton.innerHTML = `<i data-lucide="${volumeIcon}"></i>`;
    }
  }
  applyPlayerAudioSettings();
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
}

function closeMiniPlayer() {
  const player = document.querySelector(".mini-player");
  if (!player) return;
  closePlayerFloatingPanels();
  pauseTopBeat({ quiet: true });
  player.classList.remove("is-active", "is-playing");
  player.classList.add("is-closed");
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
  const isAudioBeat = Boolean(appState.playing) && audio;
  const duration = isAudioBeat && Number.isFinite(audio.duration) ? audio.duration : 165;
  const current = isAudioBeat ? audio.currentTime : Math.min(duration, Math.max(0, appState.player.previewTime || 0));
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
  const isAudioBeat = Boolean(appState.playing) && audio;
  const duration = isAudioBeat && Number.isFinite(audio.duration) ? audio.duration : 165;
  if (isAudioBeat) {
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
  if (show) {
    showMiniPlayer();
  } else {
    player.classList.add("is-closed");
    player.classList.remove("is-active");
  }
  player.dataset.currentBeat = item.id;
  player.querySelector(".mini-track img").src = item.cover;
  player.querySelector(".mini-track strong").textContent = item.title;
  player.querySelector(".mini-track span").textContent = `${item.producer} · ${item.tags?.[1] || "153 BPM"}`;
  const numericId = Number(String(item.id).replace(/\D/g, "")) || 4;
  player.querySelector(".mini-buy span").textContent = item.id === topBeatOfDay.id ? "$44.95" : `$${(24.95 + (numericId % 5) * 5).toFixed(2)}`;
  if (item.id !== topBeatOfDay.id && appState.player.previewTime >= 165) appState.player.previewTime = 11;
  updateMiniProgress();
  syncMiniPlayerState();
}

function topBeatAudio() {
  return document.querySelector("#topBeatAudio");
}

function setTopBeatPlaying(isPlaying) {
  const isTopBeat = appState.playing === topBeatOfDay.id;
  document.querySelector(".top-beat-card")?.classList.toggle("is-playing", isTopBeat && isPlaying);
  document.querySelectorAll('[data-action="hero-beat-play"]').forEach((button) => {
    const active = isTopBeat && isPlaying;
    button.setAttribute("aria-label", active ? "Pausar beat top 1 do dia" : "Tocar beat top 1 do dia");
    button.innerHTML = `<i data-lucide="${active ? "pause" : "play"}"></i>`;
  });

  const player = document.querySelector(".mini-player");
  if (player) {
    player.classList.toggle("is-playing", isPlaying);
  }
  const miniButton = document.querySelector('[data-action="mini-play"]');
  if (miniButton) {
    miniButton.innerHTML = `<i data-lucide="${isPlaying ? "pause" : "play"}"></i>`;
  }

  // Sincronizar todos os botões de play/pause da página
  document.querySelectorAll('[data-action="play"], [data-action="play-catalog"]').forEach((button) => {
    const id = button.dataset.id || button.dataset.feedItemId;
    const isThisPlaying = id && String(id) === String(appState.playing) && isPlaying;
    
    // Procura por um ícone dentro do botão
    const icon = button.querySelector('i[data-lucide], svg');
    if (icon) {
      icon.outerHTML = `<i data-lucide="${isThisPlaying ? "pause" : "play"}"></i>`;
    } else if (button.classList.contains("play-over") || button.classList.contains("profile-play-mini")) {
      button.innerHTML = `<i data-lucide="${isThisPlaying ? "pause" : "play"}"></i>`;
    }
  });

  syncMiniPlayerState();
  lucide.createIcons();
}

async function playBeat(item, { quiet = false, suppressErrorLog = false } = {}) {
  if (!item) return false;
  const audio = topBeatAudio();
  if (!audio) return false;

  audio.pause();
  appState.playing = item.id;
  updateMiniPlayer(item);

  let audioUrl = item.audio || item.audio_url || "";
  if (!audioUrl && item.raw) {
    audioUrl = item.raw.audio_url || "";
  }

  if (!audioUrl) {
    showToast("Áudio não disponível para este beat", "alert-triangle");
    setTopBeatPlaying(false);
    return false;
  }

  const currentUrl = audio.src ? new URL(audio.src, window.location.href).href : "";
  const targetUrl = new URL(audioUrl, window.location.href).href;

  if (currentUrl !== targetUrl) {
    audio.src = audioUrl;
    audio.load();
  }

  try {
    await audio.play();
    showMiniPlayer();
    setTopBeatPlaying(true);
    if (!quiet) showToast(`Tocando agora: ${item.title}`, "play");
    return true;
  } catch (error) {
    if (!suppressErrorLog) console.error("Playback error", error);
    setTopBeatPlaying(false);
    if (!quiet) showToast("Erro ao reproduzir o áudio", "alert-triangle");
    return false;
  }
}

async function playTopBeat({ quiet = false } = {}) {
  return playBeat(topBeatOfDay, { quiet });
}

function pauseTopBeat({ quiet = false } = {}) {
  const audio = topBeatAudio();
  if (audio) {
    audio.pause();
  }
  setTopBeatPlaying(false);
  if (!quiet) showToast("Beat pausado", "pause");
}

function toggleTopBeat() {
  const audio = topBeatAudio();
  if (!audio) return;
  if (appState.playing !== topBeatOfDay.id) {
    playTopBeat();
  } else if (audio.paused) {
    audio.play().then(() => setTopBeatPlaying(true));
  } else {
    pauseTopBeat();
  }
}

function playBeatByOffset(offset) {
  const current = currentPlayingBeat();
  const queue = dedupeById([topBeatOfDay, ...marketplaceBeats()]);
  const index = Math.max(0, queue.findIndex((item) => item.id === current?.id));
  const next = appState.player.shuffle && offset > 0
    ? queue[Math.floor(Math.random() * queue.length)]
    : queue[(index + offset + queue.length) % queue.length];
  playBeat(next, { quiet: true });
}

window.addEventListener("load", () => {
  topBeatAudio()?.addEventListener("ended", () => setTopBeatPlaying(false));
  topBeatAudio()?.addEventListener("timeupdate", updateMiniProgress);
  topBeatAudio()?.addEventListener("loadedmetadata", updateMiniProgress);
  window.setInterval(() => {
    const player = document.querySelector(".mini-player");
    if (!player?.classList.contains("is-playing")) return;
    const audio = topBeatAudio();
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
  if (location.hash !== targetHash) location.hash = targetHash;
  renderRoutePreservingAuthFocus(true);
}

function publicAppUrl() {
  const configuredSiteUrl = SUPABASE_CONFIG.siteUrl || SUPABASE_CONFIG.siteURL || ANSEND_PUBLIC_APP_URL;
  const isLocalHost = ["localhost", "127.0.0.1", "::1"].includes(location.hostname);
  if (configuredSiteUrl && isLocalHost) return configuredSiteUrl;
  if (configuredSiteUrl && !location.origin.includes(new URL(ANSEND_PUBLIC_APP_URL).hostname)) return configuredSiteUrl;
  return location.origin;
}

function googleOAuthRedirectUrl() {
  const url = new URL(publicAppUrl());
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
  if (url.href !== window.location.href) window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
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
      const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
      if (sessionError) throw sessionError;
      appState.authUser = sessionData.session?.user || data.session?.user || data.user || null;
      if (!appState.authUser || !sessionData.session) throw new Error("Sessao Supabase nao foi criada para este login.");
      await loadProfile(appState.authUser);
      await loadAdminStatus();
      await loadCatalogItems();
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
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError) throw sessionError;
    appState.authUser = sessionData.session?.user || data.session?.user || null;
    if (appState.authUser) {
      const result = await upsertProfile(profileFromAuthUser(appState.authUser, profile));
      if (result.error) {
        console.error("[ANSEND auth] signup profile upsert failed", result.error);
        await loadProfile(appState.authUser);
      } else {
        localStorage.removeItem(pendingProfileKey(appState.authUser.id));
      }
      await loadAdminStatus();
      await loadOwnedCatalogItems();
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
  localStorage.setItem(AUTH_EXPLICIT_LOGOUT_KEY, String(Date.now()));
  if (supabaseClient && appState.authUser) {
    await supabaseClient.auth.signOut();
  }
  clearAuthenticatedSession("logout_explicit", { explicit: true });
  showToast("Você saiu da conta ANSEND", "log-out");
  renderRoute();
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
window.addEventListener("storage", (event) => {
  if (event.key === AUTH_EXPLICIT_LOGOUT_KEY && event.newValue) {
    clearAuthenticatedSession("storage_logout_explicit", { explicit: true });
    syncAccountUi();
    renderRoutePreservingAuthFocus(true);
    return;
  }
  if (event.key !== AUTH_CACHE_KEY || !event.newValue || appState.authUser) return;
  const cached = cachedAuthState();
  if (!cached?.user?.id) return;
  appState.authUser = cached.user;
  appState.profile = cached.profile || appState.profile;
  appState.authReady = true;
  appState.authLoading = false;
  appState.profileLoading = false;
  syncAccountUi();
  renderRoutePreservingAuthFocus(true);
});

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
  if (event.target?.matches?.("#nexoChatInput") && event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    const form = event.target.closest(".nexo-chat-form");
    form?.requestSubmit();
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
  const isAudioBeat = appState.playing === topBeatOfDay.id && audio;
  const duration = isAudioBeat && Number.isFinite(audio.duration) ? audio.duration : 165;
  const current = isAudioBeat ? audio.currentTime : appState.player.previewTime;
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
  if (!target) return;
  const action = target.dataset.action;
  const isPlayerDropdownAction = Boolean(target.closest(".player-more-dropdown"));
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
    setReleaseStep(releaseCurrentStep(form) - 1, form);
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
      if (item.type === "beat" || item.type === "music") {
        const beat = findBeat(item.metadata?.beatId || item.id);
        if (beat) {
          appState.playing = beat.id;
          updateMiniPlayer(beat);
        }
        openCommentsPanel();
      } else {
        openModal(`<section class="player-tool-modal comments-tool-modal">
          <span><i data-lucide="message-circle"></i>Comentarios</span>
          <h2>${item.title}</h2>
          <div class="comment-list">
            <article><strong>ANSEND</strong><p>Conte para a NEXO se esse perfil combina com seu projeto.</p></article>
            <article><strong>NEXO IA</strong><p>Use este espaco para salvar feedback e pedir recomendacoes parecidas.</p></article>
          </div>
          <form class="comment-form">
            <input type="text" placeholder="Escreva um comentario">
            <button type="submit" data-action="comment-preview">Enviar</button>
          </form>
        </section>`);
      }
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
      if (appState.playing === beatItem.id) {
        const audio = topBeatAudio();
        if (audio) {
          if (audio.paused) {
            audio.play().then(() => setTopBeatPlaying(true));
          } else {
            audio.pause();
            setTopBeatPlaying(false);
          }
        }
      } else {
        playBeat(beatItem);
      }
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
    if (appState.cart.length === 0) return;
    appState.cart.forEach(entry => {
      const { beatId, licenseId } = splitCartEntry(entry);
      if (!appState.purchases.includes(beatId)) {
        appState.purchases.unshift(beatId);
      }
      appState.orders.unshift({
        id: `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        beatId,
        license: licenseId,
        status: "Disponivel",
        createdAt: new Date().toISOString(),
      });
    });
    clearCart();
    persistState();
    location.hash = "compras";
    showToast("Pedido finalizado com sucesso!", "check-circle");
    return;
  }
  if (action === "play") {
    const item = findBeat(target.dataset.id);
    if (item) {
      if (appState.playing === item.id) {
        const audio = topBeatAudio();
        if (audio) {
          if (audio.paused) {
            audio.play().then(() => setTopBeatPlaying(true));
          } else {
            audio.pause();
            setTopBeatPlaying(false);
          }
        }
      } else {
        playBeat(item);
      }
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
    const audio = topBeatAudio();
    if (audio) {
      if (audio.paused) {
        const current = currentPlayingBeat();
        let audioUrl = current?.audio || current?.audio_url || "";
        if (!audioUrl && current?.raw) {
          audioUrl = current.raw.audio_url || "";
        }
        if (audioUrl) {
          const currentUrl = audio.src ? new URL(audio.src, window.location.href).href : "";
          const targetUrl = new URL(audioUrl, window.location.href).href;
          if (currentUrl !== targetUrl) {
            audio.src = audioUrl;
            audio.load();
          }
          audio.play().then(() => setTopBeatPlaying(true)).catch((err) => {
            console.error("Playback error", err);
            showToast("Erro ao reproduzir o áudio", "alert-triangle");
            setTopBeatPlaying(false);
          });
        } else {
          showToast("Áudio não disponível para este beat", "alert-triangle");
        }
      } else {
        audio.pause();
        setTopBeatPlaying(false);
      }
    }
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
    handleBuy(currentPlayingBeat()?.id || topBeatOfDay.id, "premium");
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
    closePlayerFloatingPanels();
    closeModal();
    location.hash = `beat-${item.id || topBeatOfDay.id}`;
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
    const profileId = target.dataset.profileId || target.closest(".profile-page")?.querySelector(".profile-action[data-action='professional-contact']")?.dataset.profileId || "";
    trackUserEvent("follow", "professional", profileId || resolvePublicProfile(location.hash.replace("#perfil-", ""))?.id || "", { source: "follow-producer" });
    target.classList.toggle("is-following");
    if (target.closest(".professional-card")) {
      target.setAttribute("aria-pressed", target.classList.contains("is-following") ? "true" : "false");
    } else {
      target.textContent = target.classList.contains("is-following") ? "Seguindo" : "Seguir";
    }
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
  const profileDropzone = event.target.closest(".profile-image-dropzone");
  if (profileDropzone) {
    event.preventDefault();
    document.querySelector("[data-image-picker]")?.classList.add("is-dragging");
    return;
  }
  const dropzone = event.target.closest(".release-dropzone");
  if (!dropzone) return;
  event.preventDefault();
  dropzone.classList.add("is-dragging");
});

document.addEventListener("dragleave", (event) => {
  const profileDropzone = event.target.closest(".profile-image-dropzone");
  if (profileDropzone && !profileDropzone.contains(event.relatedTarget)) {
    document.querySelector("[data-image-picker]")?.classList.remove("is-dragging");
    return;
  }
  const dropzone = event.target.closest(".release-dropzone");
  if (!dropzone || dropzone.contains(event.relatedTarget)) return;
  dropzone.classList.remove("is-dragging");
});

document.addEventListener("drop", (event) => {
  const profileDropzone = event.target.closest(".profile-image-dropzone");
  if (profileDropzone) {
    event.preventDefault();
    const picker = document.querySelector("[data-image-picker]");
    picker?.classList.remove("is-dragging");
    applyProfileImageFile(event.dataTransfer?.files?.[0], picker?.dataset.imageType || "avatar");
    return;
  }
  const dropzone = event.target.closest(".release-dropzone");
  if (!dropzone) return;
  event.preventDefault();
  dropzone.classList.remove("is-dragging");
  const input = dropzone.querySelector(".release-file-input");
  handleReleaseFile(event.dataTransfer?.files?.[0], input?.dataset.uploadType);
});

document.addEventListener("input", (event) => {
  const input = event.target;
  const hiringComposer = input.closest?.(".hiring-composer");
  if (hiringComposer) {
    const title = String(hiringComposer.elements.title?.value || "").trim();
    const description = String(hiringComposer.elements.description?.value || "").trim();
    const button = hiringComposer.querySelector('button[type="submit"]');
    if (button) button.disabled = !(title && description);
    hiringComposer.classList.toggle("is-expanded", Boolean(title || description || document.activeElement?.closest?.(".hiring-composer")));
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
      document.querySelector(".comment-list")?.insertAdjacentHTML("beforeend", `<article><strong>Voce</strong><p>${message}</p></article>`);
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
    const beatId = checkoutForm.dataset.beatId;
    const license = checkoutForm.querySelector('input[name="license"]:checked')?.value || "premium";
    const item = findBeat(beatId);
    appState.orders.unshift({
      id: `order-${Date.now()}`,
      beatId,
      license,
      status: "Disponivel",
      createdAt: new Date().toISOString(),
    });
    if (!appState.purchases.includes(beatId)) appState.purchases.unshift(beatId);
    persistState();
    closeModal();
    showToast(`${licensePlans[license].label} liberada para ${item.title}`, "shopping-bag");
    if (currentRoute() === "compras") renderRoute();
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
    document.body.classList.remove("menu-open");
    closePlayerFloatingPanels();
    closeModal();
  }
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".beat-card")) {
    event.preventDefault();
    location.hash = `beat-${event.target.dataset.beatId}`;
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

    // Close dropdown on click outside
    if (!event.target.closest(".navbar-auth-container")) {
      document.querySelectorAll(".navbar-auth-container").forEach((c) => {
        c.classList.remove("dropdown-open");
        c.querySelector(".navbar-auth-btn")?.setAttribute("aria-expanded", "false");
      });
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
}

setLocale(detectLocale(), { manual: false });
detectLocaleWithGeo()
  .then((locale) => setLocale(locale, { manual: false }))
  .catch(() => setLocale(detectLocale(), { manual: false }))
  .finally(() => {
    initSidebarListeners();
    initNavbarListeners();
    renderRoutePreservingAuthFocus();
    initAuth();
  });



