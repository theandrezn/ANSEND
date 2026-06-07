const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=520&q=82`;
const SUPABASE_PROJECT_REF = "qxujynzqdursxaehchik";
const SUPABASE_CONFIG = window.ANSEND_SUPABASE || {};
const SUPABASE_KEY_PLACEHOLDER = "COLE_SUA_SUPABASE_ANON_OU_PUBLISHABLE_KEY_AQUI";
const NEXO_OLLAMA_ENDPOINT = "http://127.0.0.1:11434/api/chat";
const NEXO_OLLAMA_MODEL = localStorage.getItem("ansend-ollama-model") || "llama3.1:8b";
const isSupabaseConfigured = Boolean(
  window.supabase
  && SUPABASE_CONFIG.url
  && SUPABASE_CONFIG.publishableKey
  && SUPABASE_CONFIG.publishableKey !== SUPABASE_KEY_PLACEHOLDER
);
const supabaseClient = isSupabaseConfigured
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.publishableKey)
  : null;

const localeConfig = {
  "pt-BR": {
    currency: "BRL",
    countryFocus: "BR",
    dateFormat: "dd/MM/yyyy",
  },
  en: {
    currency: "USD",
    countryFocus: "GLOBAL",
    dateFormat: "MM/dd/yyyy",
  },
};

const i18n = {
  "pt-BR": {
    "nav.home": "Início",
    "nav.feed": "Feed",
    "nav.ia": "NEXO IA",
    "nav.explore": "Explorar",
    "nav.favorites": "Favoritos",
    "nav.orders": "Pedidos",
    "nav.library": "Biblioteca",
    "nav.professionals": "Profissionais",
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
    "section.categories": "Explore por categoria",
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
    "nav.professionals": "Professionals",
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
    "section.categories": "Explore categories",
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

const appLocale = {
  current: "pt-BR",
  country: localStorage.getItem("ansend_country") || "UNKNOWN",
};

function supportedLocale(locale) {
  return locale === "pt-BR" || locale === "en" ? locale : null;
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
  const next = supportedLocale(locale) || "en";
  appLocale.current = next;
  document.documentElement.lang = next === "pt-BR" ? "pt-BR" : "en";
  if (options.manual !== false) {
    localStorage.setItem("ansend_locale", next);
    localStorage.setItem("ansend_locale_detected_at", new Date().toISOString());
  }
  document.body?.setAttribute("data-locale", next);
  return next;
}

function t(key, fallback = "") {
  return i18n[appLocale.current]?.[key] || i18n.en[key] || fallback || key;
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
    renderRoute();
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
    produtores: "nav.professionals",
    perfil: "nav.profile",
    configuracoes: "nav.settings",
  };
  Object.entries(navKeys).forEach(([route, key]) => {
    const label = document.querySelector(`.nav-link[data-route="${route}"] span`);
    if (label) label.textContent = t(key);
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
    if (google) google.innerHTML = `<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="">${appLocale.current === "pt-BR" ? "Continuar com Google" : "Continue with Google"}`;
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
    <button type="button" data-action="set-locale" data-locale-option="pt-BR" aria-pressed="false">PT</button>
    <button type="button" data-action="set-locale" data-locale-option="en" aria-pressed="false">EN</button>
  `;
}

function languageSwitcherMarkup() {
  return `<div class="language-switcher inline-language-switcher" aria-label="Language">${languageSwitcherInnerHtml()}</div>`;
}

const englishTextPairs = [
  ["In\u00edcio", "Home"],
  ["Feed", "Home"],
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
  ["Letras", "Lyrics"],
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
  ["Letra copiada", "Lyrics copied"],
  ["Explore, escolha sua licen\u00e7a e baixe o beat imediatamente", "Explore, choose your license, and download the beat immediately"],
  ["Download preparado com sucesso", "Download prepared successfully"],
  ["Sua loja de produtor est\u00e1 pronta para configurar", "Your producer store is ready to configure"],
  ["Voc\u00ea tem 3 novos lan\u00e7amentos", "You have 3 new releases"],
  ["Edi\u00e7\u00e3o de perfil habilitada", "Profile editing enabled"],
  ["Configura\u00e7\u00e3o salva", "Settings saved"],
  ["Comentario publicado no preview", "Comment posted in preview"],
  ["Plano gerado pela NEXO local", "Plan generated by local NEXO"],
  ["Plano gerado via Ollama", "Plan generated via Ollama"],
  ["Audio Editor", "Audio Editor"],
  ["Note: These playback controls are purely for inspiration and will not be applied to downloads or purchases.", "Note: These playback controls are purely for inspiration and will not be applied to downloads or purchases."],
  ["Speed", "Speed"],
  ["Pitch", "Pitch"],
  ["Reset", "Reset"],
  ["Lyrics", "Lyrics"],
  ["Queue", "Queue"],
  ["Comments", "Comments"],
  ["Share", "Share"],
  ["Repost", "Repost"],
  ["Add to Playlist", "Add to Playlist"],
  ["Turn shuffle off", "Turn shuffle off"],
  ["Turn shuffle on", "Turn shuffle on"],
  ["Go to Track", "Go to Track"],
  ["Go to Artist", "Go to Artist"],
];

const localeTextMaps = {
  en: new Map(englishTextPairs),
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
  if (appLocale.current === "en") {
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
    preview: ["Pack ideal - Trap Melodico", "Preco sugerido - [VALOR]", "Match - 18 artistas"],
    mapSteps: [["Pack ideal", "Trap Melodico"], ["Preco sugerido", "[VALOR]"], ["Match", "18 artistas"]],
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

const allBeats = Array.from({ length: beatNames.length }, (_, i) => beat(i, i % 7 === 0 ? "Hot" : i % 5 === 0 ? "Novo" : ""));
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
  catalogItems: JSON.parse(localStorage.getItem("ansend-catalog-items") || "[]"),
  aiPlan: JSON.parse(localStorage.getItem("ansend-ai-plan") || "null"),
  authUser: null,
  profile: JSON.parse(localStorage.getItem("ansend-profile-preview") || "null"),
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
const professionalCategories = [
  { id: "todos", label: "Todos", icon: "layout-grid" },
  { id: "beatmakers", label: "BeatMakers", icon: "audio-lines" },
  { id: "produtores", label: "Produtores", icon: "sliders-horizontal" },
  { id: "artistas", label: "Artistas", icon: "mic-2" },
  { id: "designers", label: "Designers", icon: "palette" },
  { id: "curadores", label: "Curadores", icon: "list-music" },
  { id: "marketing", label: "Marketing", icon: "megaphone" },
];
const professionalProfiles = [
  { name: "Faijo Gonzales", role: "BeatMaker", category: "beatmakers", city: "SP", image: 0, rating: "4.9", jobs: 420, price: "R$ 180", specialty: "Trap melodico, type beats e packs exclusivos", tags: ["Trap", "Type Beat", "Licenca"], response: "2h" },
  { name: "Akira Beat", role: "BeatMaker", category: "beatmakers", city: "RJ", image: 1, rating: "4.8", jobs: 557, price: "R$ 220", specialty: "Drill, funk consciente e instrumentais sob medida", tags: ["Drill", "Funk", "WAV"], response: "1h" },
  { name: "Ghost Lab", role: "Produtor", category: "produtores", city: "BH", image: 3, rating: "5.0", jobs: 831, price: "R$ 350", specialty: "Mix, master e direcao vocal para lancamentos urbanos", tags: ["Mix", "Master", "Voz"], response: "3h" },
  { name: "Rokstar", role: "Produtor", category: "produtores", city: "Curitiba", image: 4, rating: "4.9", jobs: 968, price: "R$ 480", specialty: "Producao musical completa para singles e EPs", tags: ["Producao", "EP", "Studio"], response: "Hoje" },
  { name: "Noma", role: "Artista", category: "artistas", city: "Fortaleza", image: 6, rating: "4.7", jobs: 1242, price: "Collab", specialty: "Voz guia, feat, topline e referencia melodica", tags: ["Feat", "Topline", "Rap"], response: "4h" },
  { name: "Ares", role: "Artista", category: "artistas", city: "Salvador", image: 7, rating: "4.8", jobs: 1379, price: "Collab", specialty: "Vocal urbano, hooks e composicao para trap/funk", tags: ["Hook", "Composicao", "Vocal"], response: "2h" },
  { name: "Maya Keys", role: "Designer", category: "designers", city: "Recife", image: 2, rating: "5.0", jobs: 694, price: "R$ 160", specialty: "Capas premium, canvas e identidade visual para single", tags: ["Capa", "Canvas", "Brand"], response: "1h" },
  { name: "DJ Shelby", role: "Curador", category: "curadores", city: "Goiania", image: 5, rating: "4.8", jobs: 1105, price: "R$ 120", specialty: "Curadoria de playlists, radios e posicionamento de vibe", tags: ["Playlist", "Radio", "Vibe"], response: "Hoje" },
  { name: "Duzzi", role: "Curador", category: "curadores", city: "SP", image: 0, rating: "4.7", jobs: 1516, price: "R$ 140", specialty: "Selecao editorial para trap, drill e boom bap", tags: ["Editorial", "Trap", "Drill"], response: "5h" },
  { name: "Milly Studio", role: "Designer", category: "designers", city: "Floripa", image: 1, rating: "4.9", jobs: 1653, price: "R$ 210", specialty: "Arte 3D, motion cover e pacote de redes", tags: ["3D", "Motion", "Redes"], response: "3h" },
  { name: "Nocivo Beats", role: "Marketing", category: "marketing", city: "SP", image: 2, rating: "4.8", jobs: 1790, price: "R$ 300", specialty: "Planejamento de lancamento, criativos e ADS inicial", tags: ["ADS", "Lancamento", "Conteudo"], response: "1h" },
  { name: "Apollo", role: "Marketing", category: "marketing", city: "RJ", image: 3, rating: "4.9", jobs: 1927, price: "R$ 420", specialty: "Crescimento, estrategia de funil e analise de resultado", tags: ["Growth", "Funil", "Dados"], response: "Hoje" },
];

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

function professionalImage(profile) {
  return img(avatarImages[(profile?.image || 0) % avatarImages.length]);
}

function findProfessional(name) {
  return professionalProfiles.find((profile) => profile.name === name)
    || professionalProfiles.find((profile) => profile.name.toLowerCase() === String(name || "").toLowerCase())
    || professionalProfiles[0];
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
  return professionalProfiles
    .filter((profile) => categories.includes(profile.category))
    .sort((a, b) => Number(b.rating) - Number(a.rating) || b.jobs - a.jobs)
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
    professionals: professionalProfiles.map(({ name, role, category, specialty, price, rating, jobs }) => ({ name, role, category, specialty, price, rating, jobs })),
    beats: allBeats.map(({ id, title, producer, tags }) => ({ id, title, producer, tags })),
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
      reason: `${profile.specialty}. Score ${profile.rating}, ${profile.jobs} jobs.`,
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

function nexoSystemPrompt() {
  return `Voce e a NEXO IA da ANSEND. Seja objetivo, premium e pratico. Use apenas o contexto da plataforma. Responda em JSON valido com: genre, budget, combo, confidence, recommendedLicense, match array, steps array de {title,detail}, recommendedProfessionals array de {name,role,reason,route}, recommendedBeats array de {id,title,producer,reason}, nextAction {label,route}. Contexto: ${JSON.stringify(nexoKnowledgeBase())}`;
}

async function callOllamaNexo(prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2800);
  try {
    const response = await fetch(NEXO_OLLAMA_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: NEXO_OLLAMA_MODEL,
        stream: false,
        format: "json",
        messages: [
          { role: "system", content: nexoSystemPrompt() },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!response.ok) throw new Error("Ollama indisponivel");
    const data = await response.json();
    const content = data?.message?.content || data?.response || "";
    const parsed = JSON.parse(content);
    return {
      ...fallbackNexoIntelligence(prompt),
      ...parsed,
      prompt,
      role: activeRoleKey(),
      source: `ollama:${NEXO_OLLAMA_MODEL}`,
    };
  } catch (_error) {
    return fallbackNexoIntelligence(prompt);
  } finally {
    clearTimeout(timeout);
  }
}

function slugify(value) {
  return String(value || "playlist")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "playlist";
}

function playlistCard(input) {
  const data = Array.isArray(input) ? { title: input[0], subtitle: input[1], cover: input[2] } : input;
  const { title, cover } = data;
  const subtitle = data.match ? `${data.match.label} - ${data.match.score}%` : data.subtitle;
  const playlistId = slugify(title);
  return `<article class="playlist-card minimal-playlist-card" data-playlist="${title}" data-playlist-id="${playlistId}">
    <button class="playlist-action" type="button" data-action="playlist" data-title="${title}" data-playlist-id="${playlistId}" aria-label="Abrir ${title}">
      <div class="card-cover-wrapper">
        <img class="card-art-source" src="${cover}" alt="Capa ${title}">
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
  const price = item.price || (item.id === "top-beat-psiiiko" ? "$49.99" : ["$29.99", "$35.00", "$44.95", "$49.99", "$9.99", "$24.99"][(item.title.length + (item.producer || "").length) % 6]);
  return `<article class="beat-card minimal-beat-card" data-beat-id="${item.id}" tabindex="0" role="link" aria-label="Ver detalhes de ${item.title}">
    <div class="card-cover-wrapper">
      <img class="card-art-source" src="${item.cover}" alt="Capa do beat ${item.title}">
      ${item.badge ? `<span class="badge ${klass}">${item.badge}</span>` : ""}
      <button class="fav-over${favoriteClass}" type="button" data-action="favorite" data-id="${item.id}" aria-label="Favoritar ${item.title}"><i data-lucide="heart"></i></button>
      <button class="play-over" type="button" data-action="play" data-id="${item.id}" aria-label="Tocar ${item.title}"><i data-lucide="play"></i></button>
    </div>
    <div class="card-info">
      <h3 class="card-title">${item.title}</h3>
      <div class="card-producer">
        <span>${item.producer}</span>
        <i data-lucide="badge-check" class="verified-badge"></i>
      </div>
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
  return `<article class="avatar-card"><button type="button" data-action="producer" data-title="${name}" aria-label="Abrir perfil de ${name}"><img src="${img(avatarImages[i % avatarImages.length])}" alt="Avatar de ${name}"><h3>${name}<i data-lucide="badge-check"></i></h3><p>${420 + i * 137} vendas</p></button></article>`;
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
  return allBeats
    .map((item) => withMatch(baseProfile, beatMatchCandidate(item)))
    .sort((a, b) => b.match.score - a.match.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

function getRecommendedPlaylists(profile = getMusicProfile()) {
  const baseProfile = profile || createDefaultMusicProfile();
  return nexoPlaylistCatalog.map((item) => withMatch(baseProfile, item)).sort((a, b) => b.match.score - a.match.score).slice(0, 6);
}

function getRecommendedProfessionals(profile = getMusicProfile()) {
  const baseProfile = profile || createDefaultMusicProfile();
  return professionalProfiles
    .map((item) => withMatch(baseProfile, professionalMatchCandidate(item)))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 6);
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
    beat: "Comprar licenca",
    professional: "Ver perfil",
    service: "Contratar servico",
    combo: "Montar combo",
    pack: "Abrir pack",
    education: "Ver guia",
    curation: "Abrir curadoria",
    marketing: "Contratar marketing",
  };
  return map[item.type] || "Abrir";
}

function getNexoFeedItems() {
  const profile = getMusicProfile() || createDefaultMusicProfile();
  const recs = buildNexoRecommendations(profile, false);
  const beatItems = allBeats.map((item, index) => ({
    id: item.id,
    type: "beat",
    title: item.title,
    subtitle: `${item.producer} - ${item.tags?.[0] || "Beat"}`,
    description: `Beat ${item.tags?.[0] || "urbano"} com ${item.tags?.[1] || "BPM mapeado"} para gravar sua proxima faixa.`,
    creatorName: item.producer,
    category: item.tags?.[0] || "Beat",
    genres: [item.tags?.[0] || "Trap"],
    vibes: genreVibeMap[item.tags?.[0]] || ["Comercial"],
    bpm: Number(String(item.tags?.[1] || "").match(/\d+/)?.[0]) || 120,
    priceLabel: item.price || `$${(24.95 + (index % 5) * 5).toFixed(2)}`,
    coverImage: item.cover,
    audioUrl: item.audio,
    durationSeconds: 165,
    tags: [item.tags?.[0], item.tags?.[1], item.badge].filter(Boolean),
    verified: true,
    popularityScore: 76 + (index % 8) * 3,
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
    metadata: { beatId: item.id },
  }));

  const professionalItems = recs.professionals.map((profile, index) => ({
    id: `pro-${slugify(profile.name)}`,
    type: "professional",
    title: profile.name,
    subtitle: `${profile.role} - ${profile.match?.score || 74}% match`,
    description: profile.specialty,
    creatorName: profile.name,
    category: profile.category,
    genres: profile.tags,
    vibes: profile.tags,
    priceLabel: `A partir de ${profile.price}`,
    coverImage: professionalImage(profile),
    durationSeconds: 42,
    tags: [profile.role, profile.city, `${profile.jobs} jobs`],
    rating: Number(profile.rating),
    verified: true,
    popularityScore: 82 + index * 4,
    createdAt: new Date(Date.now() - index * 172800000).toISOString(),
    metadata: { professionalName: profile.name },
  }));

  const serviceItems = recs.services.map((item, index) => ({
    id: `service-${slugify(item.title)}`,
    type: item.type === "Marketing musical" ? "marketing" : item.type === "Curador" ? "curation" : "service",
    title: item.title,
    subtitle: item.type,
    description: item.reason,
    creatorName: "NEXO IA",
    category: item.type,
    genres: item.genres || musicQuiz.genres,
    vibes: item.stages || musicQuiz.vibes,
    priceLabel: "Recomendado pela NEXO",
    coverImage: ["assets/category-beatmakers.png", "assets/category-designers.png", "assets/category-producers.png", "assets/category-curators.png", "assets/category-marketing.png"][index % 5],
    durationSeconds: 38,
    tags: [item.type, item.match ? `${item.match.score}% match` : "IA", "Servico"],
    verified: true,
    popularityScore: 70 + index * 5,
    createdAt: new Date(Date.now() - index * 93600000).toISOString(),
    metadata: { route: item.route },
  }));

  const comboItems = recs.combos.map((item, index) => ({
    id: `combo-${slugify(item.title)}`,
    type: "combo",
    title: item.title,
    subtitle: item.services,
    description: item.economy || "Sequencia inteligente para acelerar seu lancamento.",
    creatorName: "NEXO IA",
    category: "Combo",
    genres: item.genres || musicQuiz.genres,
    vibes: item.vibes || musicQuiz.vibes,
    priceLabel: "A partir de [VALOR]",
    coverImage: ["assets/category-producers.png", "assets/category-marketing.png", "assets/category-designers.png"][index % 3],
    durationSeconds: 35,
    tags: ["Combo", item.match ? `${item.match.score}% match` : "Plano", "Entrega guiada"],
    verified: true,
    popularityScore: 84 + index * 6,
    createdAt: new Date(Date.now() - index * 5400000).toISOString(),
    metadata: { prompt: `Quero montar o ${item.title.toLowerCase()} para meu lancamento.` },
  }));

  const playlistItems = getRecommendedPlaylists(profile).slice(0, 4).map((item, index) => ({
    id: `pack-${slugify(item.title)}`,
    type: "pack",
    title: item.title,
    subtitle: item.subtitle,
    description: `Pack curado para ${asArray(item.genres).slice(0, 2).join(" e ")} com vibe ${asArray(item.vibes)[0] || "urbana"}.`,
    creatorName: "Curadoria ANSEND",
    category: "Pack",
    genres: item.genres,
    vibes: item.vibes,
    priceLabel: "Abrir pack",
    coverImage: item.cover,
    durationSeconds: 48,
    tags: ["Pack", item.match ? `${item.match.score}% match` : "Curadoria", "Playlist"],
    verified: true,
    popularityScore: 74 + index * 4,
    createdAt: new Date(Date.now() - index * 4600000).toISOString(),
    metadata: { playlistId: slugify(item.title), title: item.title },
  }));

  const educationItems = [
    {
      id: "edu-release-map",
      type: "education",
      title: "Mapa do lancamento",
      subtitle: "Guia NEXO",
      description: "Entenda a ordem certa: producao, capa, distribuicao, curadoria e divulgacao.",
      creatorName: "NEXO IA",
      category: "Educativo",
      genres: musicQuiz.genres,
      vibes: ["Comercial", "Cinematografica"],
      priceLabel: "Ver guia",
      coverImage: "assets/category-marketing.png",
      durationSeconds: 30,
      tags: ["Guia", "Lancamento", "IA"],
      verified: true,
      popularityScore: 88,
      createdAt: new Date().toISOString(),
      metadata: { route: "ia" },
    },
  ];

  return [...beatItems, ...professionalItems, ...serviceItems, ...comboItems, ...playlistItems, ...educationItems];
}

function calculateNexoFeedScore(item, profile = getMusicProfile()) {
  const baseProfile = profile || createDefaultMusicProfile();
  const history = readFeedObject(NEXO_FEED_HISTORY_KEY)[item.id] || {};
  const taste = readFeedObject(NEXO_FEED_TASTE_KEY);
  const profileGenres = asArray(baseProfile.genres).map(normalizeToken);
  const profileVibes = asArray(baseProfile.vibes).map(normalizeToken);
  const objective = normalizeToken(baseProfile.objective);
  let score = Number(item.popularityScore || 50);
  const reasons = [];

  if (asArray(item.genres).some((genre) => profileGenres.includes(normalizeToken(genre)))) {
    score += 22;
    reasons.push("combina com seu estilo musical");
  }
  if (asArray(item.vibes).some((vibe) => profileVibes.includes(normalizeToken(vibe)))) {
    score += 14;
    reasons.push("bate com a vibe do seu perfil");
  }
  const haystack = normalizeToken(`${item.title} ${item.subtitle} ${item.description} ${item.category} ${asArray(item.tags).join(" ")}`);
  if (objective && haystack.includes(objective.split(" ")[0])) {
    score += 10;
    reasons.push("serve para seu objetivo atual");
  }
  preferredFeedEntries(taste.genres, 4).forEach((genre) => {
    if (asArray(item.genres).includes(genre)) score += 7;
  });
  preferredFeedEntries(taste.categories, 4).forEach((category) => {
    if (item.category === category || item.type === category) score += 6;
  });
  score += (history.likes || 0) * 6 + (history.saves || 0) * 8 + (history.ctas || 0) * 10;
  score -= (history.skips || 0) * 18;
  if (item.verified) {
    score += 5;
    reasons.push("perfil verificado na ANSEND");
  }
  if (!reasons.length) reasons.push("boa porta de entrada para sua jornada");
  return { score: Math.max(1, Math.min(99, Math.round(score))), reasons: reasons.slice(0, 3) };
}

function getRankedNexoFeed(limit = 14) {
  const profile = getMusicProfile() || createDefaultMusicProfile();
  const hidden = new Set(readFeedList(NEXO_FEED_NOT_INTERESTED_KEY));
  const pool = getNexoFeedItems()
    .filter((item) => !hidden.has(item.id))
    .map((item) => ({ ...item, feedMatch: calculateNexoFeedScore(item, profile) }))
    .sort((a, b) => b.feedMatch.score - a.feedMatch.score || b.popularityScore - a.popularityScore);
  const result = [];
  const typeCount = {};
  for (const item of pool) {
    const count = typeCount[item.type] || 0;
    if (count >= 3 && result.length < 8) continue;
    result.push(item);
    typeCount[item.type] = count + 1;
    if (result.length >= limit) break;
  }
  return result.length ? result : pool.slice(0, limit);
}

function nexoFeedCard(item, index) {
  const isBeat = item.type === "beat";
  const beatId = item.metadata?.beatId || item.id;
  const isSavedBeat = isBeat && appState.favorites.has(beatId);
  const author = item.creatorName || "ANSEND";
  const authorProfile = findProfessional(author);
  const authorImage = author === "NEXO IA" || author === "Curadoria ANSEND"
    ? "assets/ansend-logo-square.png"
    : item.type === "professional"
      ? item.coverImage
      : professionalImage(authorProfile);
  const meta = [item.category, item.bpm ? `${item.bpm} BPM` : item.priceLabel].filter(Boolean).slice(0, 2).join(" - ");
  return `<article class="nexo-feed-card" data-feed-item-id="${item.id}" data-feed-type="${item.type}" data-feed-index="${index}" style="--feed-cover: url('${item.coverImage || item.cover || ""}')">
    <div class="nexo-feed-media">
      <img src="${item.coverImage || item.cover || ""}" alt="${item.title}">
      ${!isBeat ? `<span class="nexo-feed-type-icon"><i data-lucide="${item.type === "professional" ? "user-round-check" : item.type === "combo" ? "boxes" : item.type === "marketing" ? "megaphone" : item.type === "education" ? "book-open" : "sparkles"}"></i></span>` : ""}
    </div>
    <div class="nexo-feed-copy">
      <div class="nexo-feed-author">
        <img src="${authorImage}" alt="">
        <div>
          <strong>${author}</strong>
          <span>${meta || "Recomendado pela NEXO"}</span>
        </div>
        <button type="button" data-action="nexo-feed-profile" data-feed-item-id="${item.id}">Ver</button>
      </div>
      <h2>${item.title}</h2>
      <p>${item.description}</p>
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
    <main class="nexo-feed-stream" id="nexoFeedStream">
      ${items.map(nexoFeedCard).join("")}
    </main>
    <div class="nexo-feed-scroll-controls" aria-label="Navegar no feed">
      <button type="button" data-action="nexo-feed-prev" aria-label="Subir no feed"><i data-lucide="chevron-up"></i></button>
      <button type="button" data-action="nexo-feed-next" aria-label="Descer no feed"><i data-lucide="chevron-down"></i></button>
    </div>
  </section>`;
}

function setActiveNexoFeedCard(card) {
  if (!card) return;
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
        nexoFeedTimers.get(id).forEach(clearTimeout);
        nexoFeedTimers.delete(id);
        if (card.dataset.impressed && !card.dataset.completed) writeNexoFeedEvent(id, "skip_fast", { watchTimeMs: 1200 });
      }
    });
  }, { threshold: [.25, .62, .9] });
  cards.forEach((card) => nexoFeedObserver.observe(card));
  setActiveNexoFeedCard(cards[0]);
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
  const description = appLocale.current === "pt-BR" ? desc : {
    Beatmakers: "Beats, packs, and licenses to record.",
    Designers: "Covers, identity, and assets for releases.",
    "Produtores Musicais": "Production, mixing, and mastering.",
    Curadores: "Playlists, selection, and positioning.",
    "Marketing Musical": "Campaigns, content, and traffic.",
  }[title] || desc;
  return `<article class="category-card" style="--category-bg: url('${background}')">
    <i data-lucide="${icon}"></i>
    <strong>${t(categoryKeys[title], title)}</strong>
    <p>${description}</p>
    <a href="#${route}" data-route="${route}">${t("common.explore")}</a>
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

function professionalMatchCard(profile) {
  return `<article class="top-producer-card match-professional-card">
    <button class="top-producer-avatar" type="button" data-action="producer" data-title="${profile.name}" aria-label="Abrir perfil de ${profile.name}">
      <img src="${professionalImage(profile)}" alt="Avatar de ${profile.name}">
    </button>
    <strong>${profile.name}<i data-lucide="badge-check"></i></strong>
    <span>${profile.match.score}% match</span>
    <button class="top-producer-follow" type="button" data-action="producer" data-title="${profile.name}"><i data-lucide="user-plus"></i>Follow</button>
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
    <img src="${img(avatarImages[index % avatarImages.length])}" alt="Avatar de ${name}">
    <div>
      <strong>${name}<i data-lucide="badge-check"></i></strong>
      <span>${categories[index % categories.length]} · ${(4.7 + (index % 3) / 10).toFixed(1)}</span>
    </div>
    <button type="button" data-action="producer" data-title="${name}">Ver perfil</button>
  </article>`;
}

function topProducerNameCard(name, index) {
  const followerCounts = ["2.1K", "3.3K", "444", "2K", "2.5K", "612", "335", "1.8K"];
  return `<article class="top-producer-card">
    <button class="top-producer-avatar" type="button" data-action="producer" data-title="${name}" aria-label="Abrir perfil de ${name}">
      <img src="${img(avatarImages[index % avatarImages.length])}" alt="Avatar de ${name}">
    </button>
    <strong>${name}<i data-lucide="badge-check"></i></strong>
    <span>${followerCounts[index % followerCounts.length]} Followers</span>
    <button class="top-producer-follow" type="button" data-action="producer" data-title="${name}"><i data-lucide="user-plus"></i>Follow</button>
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
  const setText = (id, title, subtitle) => {
    const head = document.querySelector(`#${id}`);
    const copy = head?.closest(".section-head")?.querySelector("p");
    if (head) head.innerHTML = title;
    if (copy) copy.textContent = subtitle;
  };

  if (hasProfile) {
    setText("featuredPreviewTitle", `<i data-lucide="audio-lines"></i>Beats preferidos pela NEXO`, `Mapeados por estilo, fase e objetivo: ${musicProfileSummary(profile)}`);
    setText("quickActionsTitle", `<i data-lucide="zap"></i>${t("section.nextStepShort")}`, profile.objective || "NEXO");
    setText("nexoRecommendationsTitle", `<i data-lucide="sparkles"></i>${t("section.recommended")}`, appLocale.current === "pt-BR" ? "Profissionais e servicos com maior match para voce" : "Professionals and services with the strongest fit for you");
    setText("smartCombosTitle", `<i data-lucide="boxes"></i>${t("section.combos")}`, appLocale.current === "pt-BR" ? "Pacotes montados para sua fase atual" : "Packages shaped for your current stage");
    setText("featuredProfessionalsTitle", `<i data-lucide="badge-check"></i>${t("section.professionals")}`, appLocale.current === "pt-BR" ? "Perfis verificados com fit para seu projeto" : "Verified profiles that fit your project");
  } else {
    setText("featuredPreviewTitle", `<i data-lucide="flame"></i>${t("section.catalogs")}`, t("section.catalogsSubtitle"));
    setText("quickActionsTitle", `<i data-lucide="zap"></i>${t("section.nextStep")}`, appLocale.current === "pt-BR" ? "Responda o quiz e desbloqueie recomendacoes reais" : "Answer the quiz and unlock real recommendations");
    setText("nexoRecommendationsTitle", `<i data-lucide="sparkles"></i>${t("section.recommended")}`, appLocale.current === "pt-BR" ? "Seis sugestoes principais para resolver seu lancamento agora" : "Six top suggestions to move your release forward");
    setText("categoryTitle", `<i data-lucide="layout-grid"></i>${t("section.categories")}`, appLocale.current === "pt-BR" ? "Os cinco pilares do marketplace musical da ANSEND." : "The five pillars of ANSEND's music marketplace.");
    setText("smartCombosTitle", `<i data-lucide="boxes"></i>${t("section.combos")}`, appLocale.current === "pt-BR" ? "Pacotes inteligentes para sair da ideia ate a divulgacao." : "Smart packages from idea to promotion.");
    setText("featuredProfessionalsTitle", `<i data-lucide="badge-check"></i>${t("section.professionals")}`, appLocale.current === "pt-BR" ? "Perfis verificados para seguir" : "Verified profiles to follow");
    setText("recentActivityTitle", `<i data-lucide="clock-3"></i>${t("section.recent")}`, appLocale.current === "pt-BR" ? "Ranking de faixas adicionadas agora" : "Recently added track ranking");
  }

  if (quick) quick.innerHTML = hasProfile ? recs.nextSteps.map(quickActionCard).join("") : [quizCtaCard(), ...(activeRoleKey() === "beatmaker" ? beatmakerQuickActions : quickActions).slice(0, 3).map(quickActionCard)].join("");
  if (recommendations) recommendations.innerHTML = (hasProfile ? recs.services : nexoRecommendations).slice(0, 6).map(nexoRecommendationCard).join("");
  if (categories) categories.innerHTML = mainCategories.map(categoryCard).join("");
  if (combos) combos.innerHTML = (hasProfile ? recs.combos : smartCombos).map(smartComboCard).join("");
  if (featured) featured.innerHTML = hasProfile ? recs.beats.slice(0, 6).map((item, index) => beatCard({ ...item, badge: index === 0 ? "Match IA" : item.badge })).join("") : preferredBeats(6).map((item, index) => beatCard({ ...item, badge: index === 0 ? "Destaque" : "" })).join("");
  if (professionals) professionals.innerHTML = hasProfile ? recs.professionals.map(professionalMatchCard).join("") : avatars.concat(["Rokstar", "DJ Shelby", "Noma", "Ares"]).map(topProducerNameCard).join("");
  if (activity) activity.innerHTML = Array.from({ length: 8 }, (_, i) => trackRow(beat(i + 3, ""), i)).join("");
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
  const isNew = i < 3;
  const coverHtml = isNew 
    ? `<div class="airbit-cover airbit-cover-new" data-action="play" data-id="${item.id}">
         <img src="${item.cover}" alt="Mini capa ${item.title}">
         <span class="airbit-new-badge">NEW!</span>
         <div class="airbit-cover-hover"><i data-lucide="play"></i></div>
       </div>`
    : `<div class="airbit-cover" data-action="play" data-id="${item.id}">
         <img src="${item.cover}" alt="Mini capa ${item.title}">
         <div class="airbit-cover-hover"><i data-lucide="play"></i></div>
       </div>`;

  const verifiedBadge = `<span class="airbit-verified"><i data-lucide="crown"></i></span>`;
  const tagsHtml = item.tags.slice(0, 3).map(tag => `<span class="airbit-tag-chip">#${tag}</span>`).join("");
  const price = item.price || "$39.95";

  return `<article class="track-row airbit-track-row" data-beat-id="${item.id}">
    ${coverHtml}
    <div class="airbit-info">
      <div class="airbit-title-row">
        <strong class="airbit-track-title" data-action="play" data-id="${item.id}">${item.title}</strong>
      </div>
      <div class="airbit-meta-row">
        <span class="airbit-producer" data-action="producer" data-title="${item.producer}">${item.producer}</span>
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
let heroTypewriterTimer = null;
let heroTypewriterToken = 0;

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
  carrinho: ["Carrinho", "Revise seus beats e finalize seu pedido."],
};
routeTitles.feed = ["Home", "Dashboard resumido com IA, recomendacoes e proximos passos."];
routeTitles["nexo-feed"] = ["Feed", "NEXO Feed vertical com beats, profissionais e solucoes recomendadas."];
routeTitles.compras = ["Pedidos", "Historico de pedidos, licencas e servicos contratados."];
routeTitles.ia = ["NEXO IA", "Diagnostico musical inteligente para adaptar sua jornada."];
routeTitles.produtores = ["Profissionais", "Beatmakers, designers, produtores, curadores e marketing musical."];
routeTitles.vendedor = ["Conta ANSEND", "Cadastre, entre e escolha a função da sua conta na plataforma."];

routeTitles.perfil = ["Meu perfil", "Sua conta, catalogo e publicacoes na ANSEND."];
routeTitles.playlist = ["Playlist", "Pack selecionado com beats, referencias e licencas."];
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
  if (prefersReducedMotion.matches) {
    textElement.textContent = text;
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
        <span class="hero-morph-text"></span><span class="hero-typewriter-cursor" aria-hidden="true">|</span>
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
  if (mapEyebrow) mapEyebrow.textContent = dashboard.recommendationTitle || "MAPA DO LANCAMENTO";
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
    kind: form.elements.kind?.value || "beat",
    title: form.elements.title?.value?.trim() || "",
    artist_name: form.elements.artist?.value?.trim() || null,
    producer_name: form.elements.producer?.value?.trim() || activeProfile()?.artistic_name || activeProfile()?.full_name || null,
    genre: form.elements.genre?.value?.trim() || "",
    bpm: form.elements.bpm?.value ? Number(form.elements.bpm.value) : null,
    musical_key: form.elements.key?.value?.trim() || null,
    price: form.elements.price?.value ? Number(form.elements.price.value) : 0,
    license_type: form.elements.license?.value || "premium",
    status: form.elements.status?.value || "draft",
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
  localStorage.setItem("ansend-profile-preview", JSON.stringify(profile));
}

function localPreviewProfile() {
  return JSON.parse(localStorage.getItem("ansend-profile-preview") || "null");
}

function clearLocalPreviewProfile() {
  localStorage.removeItem("ansend-profile-preview");
}

function profileDisplayData(profile = activeProfile()) {
  const role = normalizeRole(profile?.account_role || "artista");
  const styleList = asArray(profile?.music_styles || profile?.genres || preferredGenres()).slice(0, 5);
  const avatarFromPreset = profile?.image !== undefined && avatarImages?.length
    ? img(avatarImages[Number(profile.image) % avatarImages.length])
    : img(avatarImages[0]);
  return {
    name: profile?.artistic_name || profile?.full_name || "Perfil ANSEND",
    fullName: profile?.full_name || "",
    role,
    roleLabel: accountRoleLabel(role),
    avatar: profile?.avatar_url || profile?.photo_url || avatarFromPreset,
    location: profile?.location || "Localizacao nao definida",
    headline: profile?.headline || accountGreeting(),
    bio: profile?.bio || "Edite seu perfil para adicionar uma bio, links e detalhes do seu trabalho.",
    styles: styleList,
    links: {
      instagram: profile?.instagram || "",
      youtube: profile?.youtube || "",
      spotify: profile?.spotify || "",
      website: profile?.website || "",
    },
  };
}

function openProfileEditor() {
  const profile = activeProfile() || {};
  const display = profileDisplayData(profile);
  const roleOptions = accountRoles.map((role) => `<option value="${role.id}" ${display.role === role.id ? "selected" : ""}>${role.label}</option>`).join("");
  openModal(`<form class="profile-edit-form">
    <span><i data-lucide="user-pen"></i>Editar perfil</span>
    <h2>Atualize sua identidade na ANSEND</h2>
    <div class="profile-edit-preview">
      <img src="${display.avatar}" alt="Avatar atual">
      <div><strong>${display.name}</strong><small>${display.roleLabel}</small></div>
    </div>
    <div class="profile-form-grid">
      <label>Nome completo<input name="full_name" value="${display.fullName}" placeholder="Seu nome"></label>
      <label>Nome artistico ou marca<input name="artistic_name" value="${profile?.artistic_name || ""}" placeholder="Ex: Viana Beats"></label>
      <label>Funcao<select name="account_role">${roleOptions}</select></label>
      <label>Localizacao<input name="location" value="${profile?.location || ""}" placeholder="Cidade, pais"></label>
      <label class="profile-wide">Foto do perfil<input name="avatar_url" value="${profile?.avatar_url || profile?.photo_url || ""}" placeholder="https://...jpg ou png"></label>
      <label class="profile-wide">Headline<input name="headline" value="${profile?.headline || ""}" placeholder="Uma frase curta sobre seu trabalho"></label>
      <label class="profile-wide">Bio<textarea name="bio" rows="4" placeholder="Conte o que voce faz e como pode ajudar artistas.">${profile?.bio || ""}</textarea></label>
      <label>Instagram<input name="instagram" value="${profile?.instagram || ""}" placeholder="https://instagram.com/..."></label>
      <label>YouTube<input name="youtube" value="${profile?.youtube || ""}" placeholder="https://youtube.com/@..."></label>
      <label>Spotify<input name="spotify" value="${profile?.spotify || ""}" placeholder="https://open.spotify.com/..."></label>
      <label>Site<input name="website" value="${profile?.website || ""}" placeholder="https://..."></label>
    </div>
    <button class="seller-submit" type="submit">Salvar perfil<i data-lucide="arrow-right"></i></button>
  </form>`);
}

async function saveProfileEdit(form) {
  const current = activeProfile() || {};
  const profile = {
    ...current,
    id: current.id || appState.authUser?.id || `local-profile-${Date.now()}`,
    email: current.email || appState.authUser?.email || null,
    full_name: form.elements.full_name?.value.trim() || current.full_name || "Usuario ANSEND",
    artistic_name: form.elements.artistic_name?.value.trim() || null,
    account_role: form.elements.account_role?.value || current.account_role || "artista",
    location: form.elements.location?.value.trim() || null,
    avatar_url: form.elements.avatar_url?.value.trim() || null,
    headline: form.elements.headline?.value.trim() || null,
    bio: form.elements.bio?.value.trim() || null,
    instagram: form.elements.instagram?.value.trim() || null,
    youtube: form.elements.youtube?.value.trim() || null,
    spotify: form.elements.spotify?.value.trim() || null,
    website: form.elements.website?.value.trim() || null,
    music_styles: current.music_styles || preferredGenres(),
    updated_at: new Date().toISOString(),
  };
  setLocalPreviewProfile(profile);
  if (supabaseClient && appState.authUser) {
    const { data } = await upsertProfile(profile);
    setLocalPreviewProfile({ ...profile, ...(data || {}) });
  }
  closeModal();
  renderRoute();
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
  return !["vendedor", ...institutionalRoutes].includes(route);
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

function findBeat(id) {
  if (id === topBeatOfDay.id) return topBeatOfDay;
  return allBeats.find((item) => item.id === id) || allBeats[0];
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
    <img src="${professionalImage(findProfessional(contract.professional))}" alt="">
    <div><strong>${contract.professional}</strong><span>${contract.service} - ${contract.price}</span></div>
    <span class="purchase-status">${contract.status}</span>
    <button type="button" data-action="producer" data-title="${contract.professional}"><i data-lucide="user-round"></i>Perfil</button>
  </article>`).join("");
  const hasItems = orderMarkup || contractMarkup;
  appView.innerHTML = `${pageIntro("compras")}${hasItems ? `<section class="purchase-list">${orderMarkup}${contractMarkup}</section>` : emptyState("shopping-bag", "Nenhum pedido ainda", "Quando voce comprar uma licenca ou contratar um servico, ele aparecera aqui.")}`;
}

function addToCart(id) {
  if (!appState.cart.includes(id)) {
    appState.cart.push(id);
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

function renderCart() {
  const hasItems = appState.cart.length > 0;
  
  if (!hasItems) {
    appView.innerHTML = `${pageIntro("carrinho")}${emptyState("shopping-cart", "Seu carrinho está vazio", "Adicione beats ou serviços ao carrinho para finalizar seu pedido.")}`;
    return;
  }

  const items = appState.cart.map(id => {
    const beatItem = findBeat(id) || topBeatOfDay;
    const priceText = beatItem.price || (beatItem.id === "top-beat-psiiiko" ? "$49.99" : ["$29.99", "$35.00", "$44.95", "$49.99", "$9.99", "$24.99"][(beatItem.title.length + (beatItem.producer || "").length) % 6]);
    const priceVal = parseFloat(priceText.replace("$", ""));
    return {
      ...beatItem,
      priceVal,
      priceText
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.priceVal, 0);
  const serviceFee = parseFloat((subtotal * 0.12).toFixed(2));
  const total = subtotal + serviceFee;
  const itemCountLabel = items.length === 1 ? t("cart.itemSingular") : t("cart.itemPlural");

  const itemMarkup = items.map(item => `
    <article class="cart-item" data-id="${item.id}">
      <img src="${item.cover}" alt="Capa de ${item.title}" class="cart-item-art">
      <div class="cart-item-details">
        <h3>${item.title}</h3>
        <span>${t("cart.trackLicense")}</span>
        <small class="cart-item-producer">${t("cart.byProducer")} ${item.producer}</small>
      </div>
      <div class="cart-item-price">${item.priceText}</div>
      <button class="cart-item-remove" type="button" aria-label="Remover" data-action="remove-from-cart" data-id="${item.id}">
        <i data-lucide="x"></i>
      </button>
    </article>
  `).join("");

  const promotedBeatsHtml = preferredBeats(6).map(item => `
    <div class="promoted-beat-card">
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
          <button type="button" class="cart-add-info-btn"><i data-lucide="plus"></i> ${t("cart.addInfo")}</button>
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
  const recent = allBeats.slice(3, 11);
  appView.innerHTML = `${pageIntro("biblioteca")}<section class="catalog-section"><div class="section-head"><div><h2><i data-lucide="list-music"></i>Suas playlists</h2><p>Coleções para ouvir novamente</p></div></div><div class="playlist-row">${playlists.slice(0, 5).map(playlistCard).join("")}</div></section><section class="catalog-section"><div class="section-head"><div><h2><i data-lucide="history"></i>Ouvidos recentemente</h2><p>Continue de onde parou</p></div></div>${gridView(recent)}</section>`;
}

function renderLibrary() {
  const recent = allBeats.slice(3, 11);
  const savedIds = JSON.parse(localStorage.getItem("ansend-saved-playlist") || "[]");
  const saved = savedIds.map(findBeat).filter(Boolean);
  const savedSection = saved.length ? `<section class="catalog-section"><div class="section-head"><div><h2><i data-lucide="bookmark-plus"></i>Salvos no player</h2><p>Beats adicionados pelo menu do player</p></div></div>${gridView(saved)}</section>` : "";
  appView.innerHTML = `${pageIntro("biblioteca")}<section class="catalog-section"><div class="section-head"><div><h2><i data-lucide="list-music"></i>Suas playlists</h2><p>Colecoes para ouvir novamente</p></div></div><div class="playlist-row">${playlists.slice(0, 5).map(playlistCard).join("")}</div></section>${savedSection}<section class="catalog-section"><div class="section-head"><div><h2><i data-lucide="history"></i>Ouvidos recentemente</h2><p>Continue de onde parou</p></div></div>${gridView(recent)}</section>`;
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
  const plan = appState.aiPlan || fallbackNexoIntelligence("Tenho uma ideia musical e preciso lançar profissionalmente.");
  const license = licensePlans[plan.recommendedLicense] || licensePlans.premium;
  const pros = plan.recommendedProfessionals || professionalsForNeed(plan.prompt || "");
  const beats = plan.recommendedBeats || beatMatchesForNeed(plan.prompt || "");

  const actionButtons = [
    { icon: "disc-3", label: "Criar Capa (Design)", prompt: "Preciso de uma capa profissional com identidade visual para meu single de trap." },
    { icon: "sparkles", label: "Finalizar Demo (Mix/Master)", prompt: "Tenho uma demo de trap gravada e preciso de mixagem e masterização." },
    { icon: "megaphone", label: "Divulgar Lançamento", prompt: "Quero fazer a campanha de tráfego pago e marketing para meu novo som no Spotify." },
    { icon: "boxes", label: "Encontrar Beatmaker", prompt: "Tenho uma letra pronta e preciso de um beatmaker para criar a base instrumental." },
    { icon: "compass", label: "Plano de Lançamento", prompt: "Tenho uma ideia de música e quero o plano do início até a distribuição." }
  ];

  const actionButtonsMarkup = actionButtons.map(btn => `
    <button type="button" class="nexo-action-btn" data-action="ai-chip" data-prompt="${btn.prompt}">
      <i data-lucide="${btn.icon}"></i>
      <span>${btn.label}</span>
    </button>
  `).join("");

  appView.innerHTML = `
    <div class="nexo-minimal-container">
      <div class="nexo-minimal-chat-section">
        <h1 class="nexo-minimal-title"><strong>O que podemos lançar hoje?</strong></h1>
        
        <form class="ai-diagnostic-form nexo-minimal-form">
          <div class="nexo-minimal-chat-box">
            <textarea 
              id="nexoPrompt" 
              name="aiPrompt" 
              placeholder="Descreva o seu objetivo musical (ex: Tenho uma letra de trap e preciso de beat, capa e mixagem...)"
            >${plan.prompt || ""}</textarea>
            
            <div class="nexo-minimal-chat-toolbar">
              <div class="nexo-minimal-toolbar-left">
                <button type="button" class="nexo-toolbar-btn group" data-action="ai-chip" data-prompt="Quero fazer a análise da minha demo e receber dicas de mixagem e masterização.">
                  <i data-lucide="paperclip"></i>
                  <span class="tooltip-text">Anexar Demo</span>
                </button>
                <button type="button" class="nexo-toolbar-btn group" data-action="ai-chip" data-prompt="Me sugira referências de Beats e Produtores para o estilo Trap/Drill moderno.">
                  <i data-lucide="sparkles"></i>
                  <span class="tooltip-text">Referências</span>
                </button>
              </div>
              
              <div class="nexo-minimal-toolbar-right">
                <button type="button" class="nexo-project-btn" data-action="ai-chip" data-prompt="Monte um plano completo de lançamento para mim.">
                  <i data-lucide="plus"></i>
                  <span>Lançamento</span>
                </button>
                
                <button type="submit" class="nexo-send-btn ${plan.prompt ? "has-text" : ""}" aria-label="Enviar para NEXO IA">
                  <i data-lucide="arrow-up"></i>
                </button>
              </div>
            </div>
          </div>
        </form>

        <div class="nexo-action-buttons-row">
          ${actionButtonsMarkup}
        </div>
        
        <div class="nexo-minimal-status-row">
          <span class="status-indicator online"></span>
          <span>NEXO IA Ativa</span>
          <span class="status-divider">•</span>
          <span>Confiança Alta</span>
          <span class="status-divider">•</span>
          <span>${license.label}</span>
        </div>
      </div>

      <div class="nexo-minimal-plan-container">
        <div class="nexo-minimal-plan-grid">
          <!-- Coluna do Plano -->
          <div class="nexo-minimal-plan-details">
            <div class="nexo-minimal-plan-header">
              <span class="nexo-minimal-plan-badge">PLANO RECOMENDADO</span>
              <h2>${plan.genre || "Trap"} / ${plan.budget || "[VALOR] estimado"}</h2>
              <p class="nexo-minimal-plan-combo">Combo sugerido: <strong>${plan.combo}</strong></p>
            </div>
            
            <ul class="nexo-minimal-plan-list">
              ${(plan.match || []).map((item) => `
                <li>
                  <i data-lucide="check-circle-2"></i>
                  <span>${item}</span>
                </li>
              `).join("")}
            </ul>

            <div class="nexo-minimal-plan-actions">
              ${pros[0] ? `<button type="button" class="nexo-plan-cta-btn" data-action="producer" data-title="${pros[0].name}"><i data-lucide="user-check"></i>${pros[0].name}</button>` : ""}
              ${beats[0] ? `<button type="button" class="nexo-plan-cta-btn" data-action="open-beat" data-id="${beats[0].id}"><i data-lucide="disc-3"></i>${beats[0].title}</button>` : ""}
              <button type="button" class="nexo-plan-cta-btn" data-action="ai-next-route" data-route="${plan.nextAction?.route || "produtores"}"><i data-lucide="arrow-right"></i>${plan.nextAction?.label || "Abrir recomendações"}</button>
            </div>
          </div>

          <!-- Coluna do Cronograma -->
          <div class="nexo-minimal-plan-timeline">
            <span class="nexo-minimal-plan-badge">MAPA DE EXECUÇÃO</span>
            <ol class="nexo-minimal-timeline-list">
              ${(plan.steps || []).map((step, index) => `
                <li>
                  <div class="timeline-step-icon">
                    <i data-lucide="${["disc-3", "image", "upload-cloud", "megaphone", "line-chart"][index] || "check-circle-2"}"></i>
                  </div>
                  <div class="timeline-step-content">
                    <strong>${step.title}</strong>
                    <span>${step.detail}</span>
                  </div>
                </li>
              `).join("")}
            </ol>
          </div>
        </div>

        <!-- Profissionais Recomendados -->
        <div class="nexo-minimal-recommendations">
          <div class="section-head">
            <div>
              <h2><i data-lucide="users-round"></i>Profissionais com maior match</h2>
              <p>Conecte-se com as pessoas certas mapeadas pela inteligência da NEXO.</p>
            </div>
          </div>
          <div class="professional-grid">${pros.slice(0, 3).map((profile) => professionalCard(findProfessional(profile.name))).join("")}</div>
        </div>

        <!-- Beats Recomendados -->
        <div class="nexo-minimal-recommendations">
          <div class="section-head">
            <div>
              <h2><i data-lucide="flame"></i>Beats recomendados</h2>
              <p>Opções instrumentais alinhadas ao seu plano de lançamento.</p>
            </div>
          </div>
          <div class="beat-row">${beats.slice(0, 4).map((item) => beatCard(findBeat(item.id))).join("")}</div>
        </div>
      </div>
    </div>`;

  // Autoresize textarea behaviour
  const tx = document.querySelector("#nexoPrompt");
  if (tx) {
    tx.style.height = "auto";
    tx.style.height = (tx.scrollHeight) + "px";
    tx.addEventListener("input", function() {
      this.style.height = "auto";
      this.style.height = (this.scrollHeight) + "px";
      const sendBtn = document.querySelector(".nexo-send-btn");
      if (sendBtn) {
        if (this.value.trim()) sendBtn.classList.add("has-text");
        else sendBtn.classList.remove("has-text");
      }
    });
  }
}

function professionalCard(profile) {
  return `<article class="professional-card" data-category="${profile.category}">
    <button class="professional-save" type="button" data-action="producer" data-title="${profile.name}" aria-label="Salvar ${profile.name}"><i data-lucide="heart"></i></button>
    
    <button class="top-producer-avatar" type="button" data-action="producer" data-title="${profile.name}" aria-label="Abrir perfil de ${profile.name}">
      <img src="${img(avatarImages[profile.image % avatarImages.length])}" alt="Avatar de ${profile.name}">
    </button>
    
    <span class="professional-role">${profile.role}</span>
    <h3>${profile.name}<i data-lucide="badge-check"></i></h3>
    <p class="professional-location-response">${profile.city} - responde em ${profile.response}</p>
    
    <p class="professional-specialty">${profile.specialty}</p>
    
    <div class="professional-tags">${profile.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    
    <div class="professional-metrics">
      <span><strong>${profile.rating}</strong><small>score</small></span>
      <span><strong>${profile.jobs}</strong><small>jobs</small></span>
      <span><strong>${profile.price}</strong><small>desde</small></span>
    </div>
    
    <div class="professional-actions">
      <button type="button" data-action="producer" data-title="${profile.name}">Ver perfil</button>
      <button type="button" data-action="professional-contact" data-title="${profile.name}">Contratar</button>
    </div>
  </article>`;
}

function professionalCategorySummary(category) {
  const count = category.id === "todos"
    ? professionalProfiles.length
    : professionalProfiles.filter((profile) => profile.category === category.id).length;
  return `<button class="professional-tab ${category.id === appState.professionalCategory ? "is-active" : ""}" type="button" data-action="professional-filter" data-category="${category.id}">
    <i data-lucide="${category.icon}"></i>
    <span>${category.label}</span>
    <small>${count}</small>
  </button>`;
}

function renderProducers() {
  appState.professionalCategory = appState.professionalCategory || "todos";
  const selectedCategory = appState.professionalCategory;
  const visibleProfiles = selectedCategory === "todos"
    ? professionalProfiles
    : professionalProfiles.filter((profile) => profile.category === selectedCategory);
  const featuredProfile = visibleProfiles[0] || professionalProfiles[0];
  appView.innerHTML = `
    ${pageIntro("produtores")}
    <section class="professionals-directory">
      <div class="professional-tabs" aria-label="Categorias de profissionais">
        ${professionalCategories.map(professionalCategorySummary).join("")}
      </div>
      <div class="professional-spotlight">
        <div>
          <span><i data-lucide="sparkles"></i> Match recomendado pela NEXO</span>
          <h2>${featuredProfile.name}</h2>
          <p>${featuredProfile.specialty}</p>
        </div>
        <div class="professional-spotlight-meta">
          <strong>${featuredProfile.role}</strong>
          <small>${featuredProfile.rating} score - ${featuredProfile.jobs} entregas</small>
          <button type="button" data-action="professional-contact" data-title="${featuredProfile.name}">Iniciar conversa</button>
        </div>
      </div>
      <div class="professional-grid">
        ${visibleProfiles.map(professionalCard).join("")}
      </div>
    </section>`;
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
            <article><span>Basica</span><strong>${licensePlans.basic.price}</strong><p>${licensePlans.basic.summary}</p><ul>${licensePlans.basic.rights.map((right) => `<li>${right}</li>`).join("")}</ul><button type="button" data-action="buy" data-license="basic" data-id="${item.id}">Escolher basica</button></article>
            <article class="is-featured"><em>Mais escolhida</em><span>Premium</span><strong>${licensePlans.premium.price}</strong><p>${licensePlans.premium.summary}</p><ul>${licensePlans.premium.rights.map((right) => `<li>${right}</li>`).join("")}</ul><button type="button" data-action="buy" data-license="premium" data-id="${item.id}">Escolher premium</button></article>
            <article><span>Exclusiva</span><strong>${licensePlans.exclusive.price}</strong><p>${licensePlans.exclusive.summary}</p><ul>${licensePlans.exclusive.rights.map((right) => `<li>${right}</li>`).join("")}</ul><button type="button" data-action="buy" data-license="exclusive" data-id="${item.id}">Comprar exclusiva</button></article>
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

        <!-- NOVO CADASTRO (FORM CONTAINER) -->
        <div class="profile-catalog-form-container is-collapsed">
          <button type="button" class="profile-form-toggle-btn" data-action="toggle-profile-form">
            <i data-lucide="plus"></i>
            <span>Cadastrar nova faixa</span>
          </button>
          
          <form class="profile-catalog-form">
            <div class="profile-form-head">
              <span><i data-lucide="badge-plus"></i>Novo cadastro</span>
              <h2>Cadastrar música ou beat</h2>
              <p>Adicione as informações principais para publicar, vender licenças e organizar seu catálogo.</p>
            </div>
            <div class="profile-form-grid">
              <label>Tipo<select name="kind"><option value="beat">Beat</option><option value="musica">Música</option></select></label>
              <label>Status<select name="status"><option value="draft">Rascunho</option><option value="published">Publicado</option></select></label>
              <label class="profile-wide">Título<input name="title" type="text" placeholder="Ex: Black Coupe" required></label>
              <label>Gênero<input name="genre" type="text" placeholder="Trap, Funk, Drill..." required></label>
              <label>BPM<input name="bpm" type="number" min="40" max="240" placeholder="140"></label>
              <label>Tom<input name="key" type="text" placeholder="Fm"></label>
              <label>Preço<input name="price" type="number" min="0" step="0.01" placeholder="99.90"></label>
              <label class="profile-wide">Licença<select name="license"><option value="basic">Básica</option><option value="premium">Premium</option><option value="exclusive">Exclusiva</option><option value="free">Free</option></select></label>
              <label class="profile-wide">URL da prévia<input name="audio_url" type="url" placeholder="https://...mp3"></label>
              <label class="profile-wide">URL da capa<input name="cover_url" type="url" placeholder="https://...jpg"></label>
              <label class="profile-wide">Tags<input name="tags" type="text" placeholder="trap, 808, dark, type beat"></label>
            </div>
            <button class="seller-submit" type="submit">Salvar no catálogo <i data-lucide="arrow-right"></i></button>
          </form>
        </div>

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
      <form class="seller-auth-form" autocomplete="on" data-mode="${isLogin ? "login" : "signup"}">
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
  setupNexoFeedObservers();
  applyTranslations();
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
  if (route === "feed") {
    appView.innerHTML = feedTemplate;
    applyFeedPersonalization();
  }
  if (route === "nexo-feed") {
    renderNexoFeed();
  }
  if (route === "ia") {
    appView.innerHTML = feedTemplate;
    applyFeedPersonalization();
  }
  if (route === "explorar") renderExplore();
  if (route === "favoritos") renderFavorites();
  if (route === "compras") renderPurchases();
  if (route === "biblioteca") renderLibrary();
  if (route === "ia") renderAiWorkspace();
  if (route === "produtores") renderProducers();
  if (route === "perfil") renderProfile();
  if (route === "configuracoes") renderSettings();
  if (route === "carrinho") renderCart();
  if (route === "vendedor") renderSellerAuth();
  if (route === "playlist") renderPlaylistDetail();
  if (route === "detalhe") renderBeatDetail();
  if (institutionalRoutes.has(route)) renderInstitutionalPage(route);
  window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  hydrateView();
}

const TOASTS_ENABLED = false;

function showToast(message, icon = "check-circle-2") {
  if (!TOASTS_ENABLED) {
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
  const relatedBeats = beatMatchesForNeed(`${profile.role} ${profile.tags.join(" ")}`, 4);
  openModal(`<section class="professional-profile-modal">
    <header>
      <img src="${professionalImage(profile)}" alt="Avatar de ${profile.name}">
      <div>
        <span>${profile.role} verificado</span>
        <h2>${profile.name}</h2>
        <p>${profile.specialty}</p>
      </div>
    </header>
    <div class="professional-modal-stats">
      <span><strong>${profile.rating}</strong><small>score</small></span>
      <span><strong>${profile.jobs}</strong><small>entregas</small></span>
      <span><strong>${profile.price}</strong><small>desde</small></span>
    </div>
    <div class="professional-tags">${profile.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
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

function openAudioEditor() {
  const item = playerActionBeat();
  openModal(`<section class="player-tool-modal audio-tool-modal">
    <span><i data-lucide="gauge"></i>Audio editor</span>
    <h2>${item.title}</h2>
    <p>Controles de preview para testar energia, velocidade e tom antes de comprar ou baixar. A compra mantém o arquivo original.</p>
    <label class="player-range">
      <div><strong>Speed</strong><em>${Math.round((appState.player.speed - 1) * 100)}%</em></div>
      <input type="range" min="0.65" max="1.5" step="0.01" value="${appState.player.speed}" data-action="player-speed">
    </label>
    <label class="player-range">
      <div><strong>Pitch</strong><em>${appState.player.pitch} ST</em></div>
      <input type="range" min="-6" max="6" step="1" value="${appState.player.pitch}" data-action="player-pitch">
    </label>
    <div class="player-tool-actions">
      <button type="button" data-action="reset-player-editor">Reset</button>
      <button type="button" data-action="buy-current">Comprar licenca</button>
    </div>
  </section>`);
}

function lyricsForBeat(item) {
  return [
    `[Intro] ${item.title}`,
    "Beat aberto para escrever sua ideia.",
    "",
    "[Verso]",
    "Marque entradas, pausas e viradas enquanto escuta o preview.",
    "Use a NEXO para transformar letra, demo ou referencia em plano de lancamento.",
    "",
    "[Hook]",
    "Entre com uma ideia, saia com uma solucao.",
    "ANSEND conecta beat, produtor, capa, curadoria e divulgacao.",
  ].join("\n");
}

function openLyricsPanel() {
  const item = playerActionBeat();
  openModal(`<section class="player-tool-modal lyrics-tool-modal">
    <span><i data-lucide="scroll-text"></i>Lyrics</span>
    <h2>${item.title}</h2>
    <p>${item.producer} / ${(item.tags || []).join(" / ")}</p>
    <pre>${lyricsForBeat(item)}</pre>
    <div class="player-tool-actions">
      <button type="button" data-action="copy-lyrics">Copiar letra</button>
      <button type="button" data-action="ai-chip" data-prompt="Tenho uma letra para ${item.title} e preciso montar um plano de lancamento.">Pedir plano NEXO</button>
    </div>
  </section>`);
}

function openVolumePanel() {
  openModal(`<section class="player-tool-modal volume-tool-modal">
    <span><i data-lucide="volume-2"></i>Volume</span>
    <h2>Preview do player</h2>
    <p>Ajuste o volume local do beat sem alterar arquivos comprados.</p>
    <label class="player-range">
      <div><strong>Volume</strong><em>${Math.round(appState.player.volume * 100)}%</em></div>
      <input type="range" min="0" max="1" step="0.01" value="${appState.player.volume}" data-action="player-volume">
    </label>
  </section>`);
}

function queueItems() {
  const current = playerActionBeat();
  return [current, ...allBeats.filter((item) => item.id !== current.id).slice(0, 8)];
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

function shareCurrentBeat() {
  const item = playerActionBeat();
  const url = `${location.origin}${location.pathname}#${item.id === topBeatOfDay.id ? "feed" : item.id}`;
  navigator.clipboard?.writeText(url).then(
    () => showToast("Link do beat copiado", "share-2"),
    () => showToast("Link pronto para compartilhar", "share-2"),
  );
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

function addCurrentToPlaylist() {
  const item = playerActionBeat();
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

function openMorePlayerMenu() {
  const item = playerActionBeat();
  openModal(`<section class="player-tool-modal more-tool-modal">
    <span><i data-lucide="ellipsis"></i>Mais opcoes</span>
    <h2>${item.title}</h2>
    <div class="more-action-list">
      <button type="button" data-action="repost-current"><i data-lucide="repeat"></i>Repost</button>
      <button type="button" data-action="comments-current"><i data-lucide="message-circle"></i>Comments</button>
      <button type="button" data-action="share-current"><i data-lucide="share-2"></i>Share</button>
      <button type="button" data-action="add-playlist-current"><i data-lucide="bookmark-plus"></i>Add to Playlist</button>
      <button type="button" data-action="shuffle-current"><i data-lucide="shuffle"></i>${appState.player.shuffle ? "Turn shuffle off" : "Turn shuffle on"}</button>
      <button type="button" data-action="go-current-track"><i data-lucide="disc-3"></i>Go to Track</button>
      <button type="button" data-action="go-current-artist"><i data-lucide="user-round"></i>Go to Artist</button>
    </div>
  </section>`);
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
  return findBeat(appState.playing) || allBeats[10];
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
  applyPlayerAudioSettings();
}

function showMiniPlayer() {
  const player = document.querySelector(".mini-player");
  if (!player) return;
  player.classList.remove("is-closed");
  player.classList.add("is-active");
}

function closeMiniPlayer() {
  const player = document.querySelector(".mini-player");
  if (!player) return;
  pauseTopBeat({ quiet: true });
  player.classList.remove("is-playing");
  player.classList.add("is-closed");
  showToast("Player fechado. Clique em play para abrir de novo.", "x");
}

function updateMiniProgress() {
  const player = document.querySelector(".mini-player");
  if (!player) return;
  const audio = topBeatAudio();
  const isAudioBeat = appState.playing === topBeatOfDay.id && audio;
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
  const isAudioBeat = appState.playing === topBeatOfDay.id && audio;
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
  document.querySelector(".top-beat-card")?.classList.toggle("is-playing", isPlaying);
  document.querySelectorAll('[data-action="hero-beat-play"]').forEach((button) => {
    button.setAttribute("aria-label", isPlaying ? "Pausar beat top 1 do dia" : "Tocar beat top 1 do dia");
    button.innerHTML = `<i data-lucide="${isPlaying ? "pause" : "play"}"></i>`;
  });
  const miniButton = document.querySelector('[data-action="mini-play"]');
  if (appState.playing === topBeatOfDay.id && miniButton) {
    miniButton.innerHTML = `<i data-lucide="${isPlaying ? "pause" : "play"}"></i>`;
  }
  const player = document.querySelector(".mini-player");
  if (player) {
    const previewPlaying = Boolean(appState.playing) && appState.playing !== topBeatOfDay.id;
    player.classList.toggle("is-playing", isPlaying || previewPlaying);
  }
  syncMiniPlayerState();
  lucide.createIcons();
}

async function playTopBeat({ quiet = false } = {}) {
  const audio = topBeatAudio();
  if (!audio) return false;
  updateMiniPlayer(topBeatOfDay);
  appState.playing = topBeatOfDay.id;
  try {
    await audio.play();
    showMiniPlayer();
    appState.topBeatUnlocked = true;
    setTopBeatPlaying(true);
    if (!quiet) showToast("Tocando top 1 do dia: PSIIIKO", "play");
    return true;
  } catch (_error) {
    setTopBeatPlaying(false);
    if (!quiet) showToast("Clique para liberar o player do beat", "play-circle");
    return false;
  }
}

function pauseTopBeat({ quiet = false } = {}) {
  const audio = topBeatAudio();
  if (!audio) return;
  audio.pause();
  setTopBeatPlaying(false);
  if (!quiet) showToast("Beat pausado", "pause");
}

function toggleTopBeat() {
  const audio = topBeatAudio();
  if (!audio) return;
  if (audio.paused) playTopBeat();
  else pauseTopBeat();
}

function playBeatByOffset(offset) {
  const current = currentPlayingBeat();
  const queue = [topBeatOfDay, ...allBeats];
  const index = Math.max(0, queue.findIndex((item) => item.id === current?.id));
  const next = appState.player.shuffle && offset > 0
    ? queue[Math.floor(Math.random() * queue.length)]
    : queue[(index + offset + queue.length) % queue.length];
  pauseTopBeat({ quiet: true });
  appState.playing = next.id;
  updateMiniPlayer(next);
  document.querySelector(".mini-player")?.classList.add("is-playing");
  showMiniPlayer();
  showToast(`Tocando agora: ${next.title}`, "play");
  if (next.id === topBeatOfDay.id) playTopBeat({ quiet: true });
}

window.addEventListener("load", () => {
  topBeatAudio()?.addEventListener("ended", () => setTopBeatPlaying(false));
  topBeatAudio()?.addEventListener("timeupdate", updateMiniProgress);
  topBeatAudio()?.addEventListener("loadedmetadata", updateMiniProgress);
  window.setInterval(() => {
    const player = document.querySelector(".mini-player");
    if (!player?.classList.contains("is-playing")) return;
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

function handleBuy(id, selectedPlan = "premium") {
  addToCart(id);
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

function unlockPreviewAccountFromProfile(profile, reason = "preview") {
  const previewProfile = {
    ...profile,
    id: `preview-${reason}-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  setLocalPreviewProfile(previewProfile);
  renderRoute();
  launchFirstAccountQuiz(previewProfile);
  return previewProfile;
}

async function handleAccountSubmit(form) {
  const mode = form.dataset.mode;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;
  if (!email || !password) return;

  if (!supabaseClient) {
    if (mode === "login") {
      showToast("Use criar conta para liberar acesso neste ambiente.", "user-plus");
      return;
    }
    const profile = profileFromAccountForm(form, email);
    unlockPreviewAccountFromProfile(profile);
    showToast("Conta criada. Vamos personalizar sua experiência.", "badge-check");
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
      showToast("Login realizado", "cloud-check");
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
          music_styles: profile.music_styles,
        },
      },
    });
    if (error) throw error;
    appState.authUser = data.user;
    if (data.session && data.user) {
      const result = await upsertProfile(profile);
      if (result.error) throw result.error;
      showToast("Conta criada e perfil salvo", "badge-check");
    } else if (data.user) {
      localStorage.setItem(pendingProfileKey(data.user.id), JSON.stringify(profile));
      setLocalPreviewProfile({ ...profile, id: data.user.id, created_at: new Date().toISOString() });
      showToast("Conta criada. Perfil liberado enquanto a sessão sincroniza.", "mail-check");
    }
    renderRoute();
    launchFirstAccountQuiz(profile, data.user);
  } catch (error) {
    if (mode === "signup" && isEmailRateLimitError(error)) {
      const profile = profileFromAccountForm(form, email);
      unlockPreviewAccountFromProfile(profile, "email");
      showToast("Conta liberada. Vamos personalizar sua experiência.", "badge-check");
      return;
    }
    showToast(friendlyAuthError(error), "triangle-alert");
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
  const section = button.closest("section, .home-section");
  const row = section?.querySelector(".playlist-row, .beat-row, .avatar-row, .featured-professional-grid");
  if (row) {
    if (typeof pauseAutoScroll === "function") pauseAutoScroll(row, 2400);
    row.scrollBy({ left: direction * Math.max(320, row.clientWidth * .72), behavior: "smooth" });
  }
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
  const clickedFeedMedia = event.target.closest(".nexo-feed-media");
  if (clickedFeedMedia) {
    const feedCard = clickedFeedMedia.closest(".nexo-feed-card");
    if (feedCard && feedCard.dataset.feedType === "beat") {
      const beatId = feedCard.dataset.feedItemId;
      const item = findBeat(beatId);
      if (item) {
        const player = document.querySelector(".mini-player");
        const isCurrent = appState.playing === item.id;
        const isPlaying = isCurrent && player && player.classList.contains("is-playing");
        
        let playAction = true;
        if (isCurrent) {
          if (isPlaying) {
            if (item.id === topBeatOfDay.id) {
              pauseTopBeat({ quiet: true });
            } else {
              player.classList.remove("is-playing");
              syncMiniPlayerState();
              lucide.createIcons();
            }
            playAction = false;
          } else {
            if (item.id === topBeatOfDay.id) {
              playTopBeat({ quiet: true });
            } else {
              player.classList.add("is-playing");
              showMiniPlayer();
              syncMiniPlayerState();
              lucide.createIcons();
            }
            playAction = true;
          }
        } else {
          if (appState.playing === topBeatOfDay.id) {
            pauseTopBeat({ quiet: true });
          }
          appState.playing = item.id;
          updateMiniPlayer(item);
          document.querySelector(".mini-player")?.classList.add("is-playing");
          syncMiniPlayerState();
          lucide.createIcons();
          if (item.id === topBeatOfDay.id) {
            playTopBeat({ quiet: true });
          }
          writeNexoFeedEvent(item.id, "click_cta", { item, watchTimeMs: 0 });
          playAction = true;
        }

        const feedback = document.createElement("div");
        feedback.className = "nexo-feed-play-feedback";
        feedback.innerHTML = `<i data-lucide="${playAction ? "play" : "pause"}"></i>`;
        clickedFeedMedia.appendChild(feedback);
        
        if (window.lucide) {
          window.lucide.createIcons({
            nameAttr: "data-lucide"
          });
        }
        
        setTimeout(() => {
          feedback.remove();
        }, 650);

        return;
      }
    }
  }

  const clickedBeatCard = event.target.closest(".beat-card");
  const target = event.target.closest("button, a");
  if (!target && clickedBeatCard) {
    location.hash = `beat-${clickedBeatCard.dataset.beatId}`;
    return;
  }
  if (!target) return;
  const action = target.dataset.action;
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
  if (action === "set-locale") {
    setLocale(target.dataset.localeOption, { manual: true });
    renderRoute();
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
  if (action === "seller-mode") {
    appState.sellerMode = target.dataset.mode || "login";
    renderRoute();
    return;
  }
  if (action === "seller-google") {
    if (!supabaseClient) {
      showToast("Google entra na próxima etapa. Use e-mail e senha por enquanto.", "mail");
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
  if (action === "professional-filter") {
    appState.professionalCategory = target.dataset.category || "todos";
    renderProducers();
    hydrateView();
    return;
  }
  if (action === "professional-contact") {
    openProfessionalContract(target.dataset.title);
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
  if (action === "nexo-feed-play") {
    const item = findBeat(target.dataset.id);
    pauseTopBeat({ quiet: true });
    appState.playing = item.id;
    updateMiniPlayer(item);
    document.querySelector(".mini-player")?.classList.add("is-playing");
    writeNexoFeedEvent(item.id, "click_cta", { item, watchTimeMs: 0 });
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
      "nexo-feed-plan": "add_to_plan",
      "nexo-feed-hide": "not_interested",
      "nexo-feed-similar": "view_similar",
    };
    writeNexoFeedEvent(itemId, eventMap[action] || "click_cta", { item });
    if (action === "nexo-feed-like" || action === "nexo-feed-save") {
      if (item.type === "beat") {
        const beatId = item.metadata?.beatId || item.id;
        if (!appState.favorites.has(beatId)) {
          appState.favorites.add(beatId);
          persistState();
        }
      }
      target.classList.toggle("is-active");
      return;
    }
    if (action === "nexo-feed-comments") {
      if (item.type === "beat") {
        const beat = findBeat(item.metadata?.beatId || item.id);
        appState.playing = beat.id;
        updateMiniPlayer(beat);
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
    if (action === "nexo-feed-share") {
      navigator.clipboard?.writeText(`${location.origin}${location.pathname}#nexo-feed`);
      target.classList.add("is-active");
      return;
    }
    if (action === "nexo-feed-profile") {
      if (item.type === "professional") openProfessionalProfile(item.metadata?.professionalName || item.title);
      else if (item.creatorName && item.creatorName !== "NEXO IA" && item.creatorName !== "Curadoria ANSEND") openProfessionalProfile(item.creatorName);
      else location.hash = "produtores";
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
  if (action === "play-catalog") {
    const item = appState.catalogItems.find((entry) => entry.id === target.dataset.id);
    if (item) {
      updateMiniPlayer({
        id: item.id,
        title: item.title,
        producer: item.producer_name || item.artist_name || "ANSEND",
        cover: item.cover_url || img("photo-1493225457124-a3eb161ffa5f"),
        tags: [item.genre || "ANSEND", item.bpm ? `${item.bpm} BPM` : "Preview"],
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
  if (action === "buy") handleBuy(target.dataset.id, target.dataset.license || "premium");
  if (action === "remove-from-cart") {
    removeFromCart(target.dataset.id);
    return;
  }
  if (action === "finalize-cart") {
    if (appState.cart.length === 0) return;
    appState.cart.forEach(beatId => {
      if (!appState.purchases.includes(beatId)) {
        appState.purchases.unshift(beatId);
      }
      appState.orders.unshift({
        id: `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        beatId,
        license: "premium",
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
    pauseTopBeat({ quiet: true });
    appState.playing = item.id;
    updateMiniPlayer(item);
    document.querySelector(".mini-player")?.classList.add("is-playing");
    if (target.closest(".queue-tool-modal")) closeModal();
    showToast(`Tocando agora: ${item.title}`, "play");
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
    if (appState.playing === topBeatOfDay.id) {
      toggleTopBeat();
      return;
    }
    const player = document.querySelector(".mini-player");
    const nextPlaying = !player?.classList.contains("is-playing");
    if (nextPlaying) showMiniPlayer();
    player?.classList.toggle("is-playing", nextPlaying);
    syncMiniPlayerState();
    lucide.createIcons();
    showToast(nextPlaying ? `Tocando ${playerActionBeat().title}` : "Preview pausado", nextPlaying ? "play" : "pause");
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
  if (action === "lyrics") {
    openLyricsPanel();
    return;
  }
  if (action === "volume") {
    openVolumePanel();
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
  if (action === "copy-lyrics") {
    const text = document.querySelector(".lyrics-tool-modal pre")?.innerText || "";
    navigator.clipboard?.writeText(text);
    showToast("Letra copiada", "copy");
    return;
  }
  if (action === "share-current") {
    shareCurrentBeat();
    return;
  }
  if (action === "repost-current") {
    const item = playerActionBeat();
    const reposts = JSON.parse(localStorage.getItem("ansend-reposts") || "[]");
    if (!reposts.includes(item.id)) reposts.unshift(item.id);
    localStorage.setItem("ansend-reposts", JSON.stringify(reposts.slice(0, 60)));
    showToast(`${item.title} repostado`, "repeat");
    return;
  }
  if (action === "comments-current") {
    openCommentsPanel();
    return;
  }
  if (action === "add-playlist-current") {
    addCurrentToPlaylist();
    return;
  }
  if (action === "shuffle-current") {
    togglePlayerShuffle();
    openMorePlayerMenu();
    return;
  }
  if (action === "go-current-track") {
    const item = playerActionBeat();
    closeModal();
    location.hash = item.id === topBeatOfDay.id ? "feed" : item.id;
    return;
  }
  if (action === "go-current-artist") {
    closeModal();
    openProfessionalProfile(playerActionBeat().producer);
    return;
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
    openProfessionalProfile(target.dataset.title);
    return;
  }
  if (action === "producer-focus") document.querySelector("#producerProfile")?.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
  if (action === "follow-producer") {
    target.classList.toggle("is-following");
    target.textContent = target.classList.contains("is-following") ? "Seguindo" : "Seguir";
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
  const checkoutPlan = event.target.closest('.checkout-plan input[name="license"]');
  if (checkoutPlan) {
    document.querySelectorAll(".checkout-plan").forEach((plan) => plan.classList.toggle("is-selected", plan.contains(checkoutPlan)));
    return;
  }
  if (event.target.closest(".settings-panel")) {
    showToast("Configuração salva", "settings");
  }
});

document.addEventListener("input", (event) => {
  const input = event.target;
  const action = input?.dataset?.action;
  if (!["player-speed", "player-pitch", "player-volume"].includes(action)) return;
  const value = Number(input.value);
  if (action === "player-speed") appState.player.speed = value;
  if (action === "player-pitch") appState.player.pitch = value;
  if (action === "player-volume") appState.player.volume = value;
  const label = input.closest(".player-range")?.querySelector("em");
  if (label && action === "player-speed") label.textContent = `${Math.round((appState.player.speed - 1) * 100)}%`;
  if (label && action === "player-pitch") label.textContent = `${appState.player.pitch} ST`;
  if (label && action === "player-volume") label.textContent = `${Math.round(appState.player.volume * 100)}%`;
  persistState();
  syncMiniPlayerState();
  lucide.createIcons();
});

document.addEventListener("submit", async (event) => {
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
  const aiForm = event.target.closest(".ai-diagnostic-form");
  if (aiForm) {
    event.preventDefault();
    const input = aiForm.elements.aiPrompt;
    const prompt = input.value.trim() || "Tenho uma ideia musical e preciso transformar em lançamento profissional.";
    aiForm.classList.add("is-thinking");
    const plan = await callOllamaNexo(prompt);
    persistAiPlan(plan);
    if (currentRoute() === "ia") renderAiWorkspace();
    else renderAiPlan(plan);
    lucide.createIcons();
    aiForm.classList.remove("is-thinking");
    showToast(plan.source === "fallback-local" ? "Plano gerado pela NEXO local" : "Plano gerado via Ollama", "sparkles");
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
    appState.contracts.unshift({
      id: `contract-${Date.now()}`,
      professional: profile.name,
      service: contractForm.elements.service.value,
      briefing: contractForm.elements.briefing.value.trim(),
      price: profile.price,
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

setLocale(detectLocale(), { manual: false });
detectLocaleWithGeo()
  .then((locale) => setLocale(locale, { manual: false }))
  .catch(() => setLocale(detectLocale(), { manual: false }))
  .finally(() => {
    renderRoute();
    initAuth();
  });

