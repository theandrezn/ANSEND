const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=520&q=82`;
const SUPABASE_PROJECT_REF = "qxujynzqdursxaehchik";
const SUPABASE_CONFIG = window.ANSEND_SUPABASE || {};
const SUPABASE_KEY_PLACEHOLDER = "COLE_SUA_SUPABASE_ANON_OU_PUBLISHABLE_KEY_AQUI";
const NEXO_DIAGNOSIS_STORAGE_KEY = "ansend_nexo_last_diagnosis";
const NEXO_QUIZ_STORAGE_KEY = "ansend_nexo_last_quiz";
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
    "nav.home": "InÃ­cio",
    "nav.feed": "Feed",
    "nav.ia": "NEXO IA",
    "nav.explore": "Explorar",
    "nav.favorites": "Favoritos",
    "nav.orders": "Pedidos",
    "nav.library": "Biblioteca",
    "nav.upload": "LanÃ§ar mÃºsica",
    "nav.professionals": "Profissionais",
    "nav.profile": "Meu perfil",
    "nav.settings": "ConfiguraÃ§Ãµes",
    "sellerMini.title": "Venda seus serviÃ§os",
    "sellerMini.subtitle": "Abra sua loja",
    "sellerMini.cta": "ComeÃ§ar",
    "search.placeholder": "Buscar serviÃ§os, artistas ou profissionais",
    "hero.kicker": "NEXO IA",
    "hero.titleLine1": "ANSEND",
    "hero.titleLine2": "O marketplace inteligente da mÃºsica",
    "hero.subtitle": "Descreva sua mÃºsica, letra, demo ou objetivo. A NEXO IA conecta vocÃª aos profissionais certos.",
    "hero.prompt": "Ex: Tenho uma mÃºsica de trap pronta e preciso lanÃ§ar profissionalmente...",
    "hero.primaryCta": "ComeÃ§ar com IA",
    "hero.secondaryCta": "Explorar profissionais",
    "hero.benefitPayment": "Pagamento protegido",
    "hero.benefitVerified": "Profissionais verificados",
    "hero.benefitDelivery": "Entrega acompanhada",
    "hero.mapEyebrow": "MAPA DO LANÃ‡AMENTO",
    "hero.mapTitle": "DiagnÃ³stico Musical IA",
    "hero.mapSubtitle": "Conte sua ideia e receba uma ordem clara de execuÃ§Ã£o.",
    "hero.stepProduction": "ProduÃ§Ã£o",
    "hero.stepCover": "Capa",
    "hero.stepDistribution": "DistribuiÃ§Ã£o",
    "hero.stepCuration": "Curadoria",
    "hero.stepMarketing": "DivulgaÃ§Ã£o",
    "section.catalogs": "CatÃ¡logos em alta",
    "section.catalogsSubtitle": "Beats, packs e referÃªncias subindo agora na ANSEND.",
    "section.playlistsStyle": "Playlists para seu estilo",
    "section.nextStep": "Qual seu prÃ³ximo passo?",
    "section.nextStepShort": "Seu prÃ³ximo passo",
    "section.recommended": "Recomendado pela NEXO",
    "section.categories": "Explore por categoria",
    "section.combos": "Combos para acelerar seu lanÃ§amento",
    "section.professionals": "Profissionais recomendados",
    "section.recent": "Lista recente",
    "section.moreCatalog": "Ver catÃ¡logo completo",
    "section.more": "Ver mais",
    "category.beatmakers": "Beatmakers",
    "category.designers": "Designers",
    "category.producers": "Produtores Musicais",
    "category.curators": "Curadores",
    "category.marketing": "Marketing Musical",
    "common.open": "Abrir",
    "common.explore": "Explorar",
    "common.findSolution": "Encontrar soluÃ§Ã£o",
    "common.exploreCategories": "Explorar categorias",
    "common.startQuiz": "ComeÃ§ar quiz",
    "common.refazerQuiz": "Refazer quiz",
    "common.save": "Salvar",
    "cart.billing": "InformaÃ§Ãµes de cobranÃ§a e licenciamento",
    "cart.addInfo": "Adicionar dados",
    "cart.trackLicense": "Faixa Â· LicenÃ§a MP3 Â· Revisar licenÃ§a",
    "cart.byProducer": "por",
    "cart.discount": "Adicione mais 1 faixa para ativar a promoÃ§Ã£o Compre 1 e Leve 2!",
    "cart.summary": "Resumo do carrinho",
    "cart.share": "Compartilhar carrinho",
    "cart.itemsTotal": "Total dos itens",
    "cart.serviceFee": "Taxa de serviÃ§o",
    "cart.subtotal": "Subtotal",
    "cart.itemSingular": "item",
    "cart.itemPlural": "itens",
    "cart.authHint": "Continue como visitante,",
    "cart.signIn": "entrar",
    "cart.or": "ou",
    "cart.signUp": "criar conta",
    "cart.checkout": "Finalizar compra",
    "cart.terms": "Ao clicar em \"Finalizar compra\", vocÃª concorda com nossa PolÃ­tica de Reembolso, Termos de ServiÃ§o da ANSEND e PolÃ­tica de Privacidade da ANSEND. Impostos podem ser aplicados.",
    "cart.promoted": "Promovidos",
    "trust.aiRecommendations": "RecomendaÃ§Ãµes com IA",
    "trust.artistSupport": "Suporte ao artista",
    "route.feed.subtitle": "Dashboard resumido com IA, recomendaÃ§Ãµes e prÃ³ximos passos.",
    "route.explorar.title": "Explorar",
    "route.explorar.subtitle": "Encontre novos sons por gÃªnero, BPM ou produtor.",
    "route.favoritos.title": "Favoritos",
    "route.favoritos.subtitle": "Tudo que vocÃª marcou para ouvir depois.",
    "route.compras.title": "Pedidos",
    "route.compras.subtitle": "HistÃ³rico de pedidos, licenÃ§as e serviÃ§os contratados.",
    "route.carrinho.title": "Carrinho",
    "route.carrinho.subtitle": "Revise seus beats e finalize seu pedido.",
    "route.biblioteca.title": "Biblioteca",
    "route.biblioteca.subtitle": "Playlists, histÃ³ricos e itens salvos em um sÃ³ lugar.",
    "route.cadastrar.title": "LanÃ§ar mÃºsica",
    "route.cadastrar.subtitle": "Cadastre releases, capa, Ã¡udio e licenÃ§as para publicar no catÃ¡logo.",
    "route.produtores.title": "Profissionais",
    "route.produtores.subtitle": "Beatmakers, designers, produtores, curadores e marketing musical.",
    "route.configuracoes.title": "ConfiguraÃ§Ãµes",
    "route.configuracoes.subtitle": "Personalize sua experiÃªncia na plataforma.",
    "route.vendedor.title": "Conta ANSEND",
    "route.vendedor.subtitle": "Cadastre, entre e escolha a funÃ§Ã£o da sua conta na plataforma.",
    "route.perfil.title": "Meu perfil",
    "route.perfil.subtitle": "Sua conta, catÃ¡logo e publicaÃ§Ãµes na ANSEND.",
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
    "cart.trackLicense": "Track Â· MP3 License (MP3) Â· Review License",
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
    ? "ANSEND - O Marketplace Inteligente da mÃºsica"
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
    cadastrar: "nav.upload",
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
  ["Minhas MÃºsicas", "My Music"],
  ["Marketplace", "Marketplace"],
  ["Ferramentas", "Tools"],
  ["Ofertas para membros", "Member Offers"],
  ["LanÃ§ar MÃºsica", "Release Music"],
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
  ["Plano gerado pela NEXO IA", "Plan generated by NEXO AI"],
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
  { id: "produtor", label: "Produtor", icon: "sliders-horizontal", desc: "Publica beats, gerencia licenÃ§as e acompanha vendas." },
  { id: "curador", label: "Curador", icon: "list-music", desc: "Monta playlists, salva catÃ¡logos e encontra novos sons." },
  { id: "artista", label: "Artista", icon: "mic-2", desc: "Busca beats para gravar, licenciar e lanÃ§ar mÃºsicas." },
  { id: "designer", label: "Designer", icon: "palette", desc: "Organiza capas, identidade visual e assets de lanÃ§amento." },
  { id: "beatmaker", label: "BeatMaker", icon: "audio-lines", desc: "Cria beats, colabora com produtores e sobe catÃ¡logos." },
  { id: "manager", label: "Manager", icon: "briefcase-business", desc: "Gerencia artistas, compras, contratos e lanÃ§amentos." },
  { id: "selo", label: "Selo", icon: "badge-check", desc: "Opera catÃ¡logo, talentos e licenÃ§as em escala." },
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
    headline: ["Seu primeiro hit", "comeÃ§a aqui."],
    subheadline: "Busque um som, descreva sua ideia ou peÃ§a para a NEXO montar o plano certo.",
    placeholder: "Explore novos sons ou diga para a NEXO o que vocÃª quer lanÃ§ar...",
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

const heroHeadline = ["ANSEND", "O marketplace inteligente da mÃºsica"];

const playlists = [
  ["Trap na Ãrea", "52 beats", "assets/catalog-cover-01.webp"],
  ["Mainstreet Hits", "38 faixas", "assets/catalog-cover-02.webp"],
  ["Drill Brutal", "44 beats", "assets/catalog-cover-03.webp"],
  ["MatuÃª Type", "29 beats", "assets/catalog-cover-04.webp"],
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
  aiPlan: JSON.parse(localStorage.getItem("ansend-ai-plan") || "null"),
  nexoChatMessages: [],
  nexoChatLoading: false,
  nexoChatError: "",
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
  { id: "trap", label: "Trap", desc: "808 forte, melodia escura e espaÃ§o para voz.", icon: "flame", genres: ["Trap", "Type Beat"] },
  { id: "drill", label: "Drill", desc: "Bateria seca, grave pesado e clima agressivo.", icon: "target", genres: ["Drill", "Trap"] },
  { id: "funk", label: "Funk", desc: "Ritmo direto, bounce e energia de pista.", icon: "radio", genres: ["Funk", "Type Beat"] },
  { id: "rnb", label: "R&B", desc: "Textura suave, acordes e refrÃµes melÃ³dicos.", icon: "moon", genres: ["R&B", "Boom Bap"] },
  { id: "boombap", label: "Boom Bap", desc: "Bateria clÃ¡ssica, sample e presenÃ§a urbana.", icon: "disc-3", genres: ["Boom Bap", "R&B"] },
  { id: "type", label: "Type Beat", desc: "ReferÃªncias atuais para criar rÃ¡pido.", icon: "sparkles", genres: ["Type Beat", "Trap"] },
];

const onboardingGoals = [
  ["gravar", "Gravar uma mÃºsica"],
  ["comprar", "Comprar licenÃ§a"],
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
    label: "LicenÃ§a BÃ¡sica",
    price: "R$ 79",
    summary: "MP3 sem tag para validar a ideia e lanÃ§ar com seguranÃ§a.",
    rights: ["Arquivo MP3", "5.000 streams", "Uso comercial", "Contrato digital"],
  },
  premium: {
    label: "LicenÃ§a Premium",
    price: "R$ 179",
    summary: "WAV + MP3 para lanÃ§amento profissional em plataformas digitais.",
    rights: ["WAV e MP3", "100.000 streams", "MonetizaÃ§Ã£o liberada", "Contrato prioritÃ¡rio"],
  },
  exclusive: {
    label: "LicenÃ§a Exclusiva",
    price: "R$ 799",
    summary: "O beat sai do catÃ¡logo apÃ³s a compra e vocÃª recebe todos os arquivos.",
    rights: ["Stems completos", "Streams ilimitados", "Direitos exclusivos", "Suporte de lanÃ§amento"],
  },
};

function professionalImage(profile) {
  if (profile?.avatar) return profile.avatar;
  if (profile?.avatar_url) return profile.avatar_url;
  return "";
}

function professionalAvatarMarkup(profile, className = "") {
  const source = professionalImage(profile);
  const name = profile?.name || profile?.display_name || profile?.artistic_name || profile?.full_name || "ANSEND";
  if (source) return `<img class="${className}" src="${htmlEscape(source)}" alt="Avatar de ${htmlEscape(name)}">`;
  return `<span class="professional-avatar-fallback ${className}" aria-label="Avatar de ${htmlEscape(name)}">${htmlEscape(profileInitials(name))}</span>`;
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
      feed: "Home com NEXO IA, beat top 1 e catÃ¡logos em alta.",
      explorar: "CatÃ¡logo de beats com filtros, favoritos, play e compra de licenÃ§a.",
      produtores: "DiretÃ³rio de profissionais por categoria com perfil e contrataÃ§Ã£o.",
      perfil: "Conta do usuÃ¡rio, cadastro de beats/mÃºsicas e loja do vendedor.",
      compras: "Pedidos, licenÃ§as adquiridas, contratos e serviÃ§os contratados.",
      biblioteca: "Playlists salvas e histÃ³rico.",
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
    recommendedLicense: /exclusiv|direito|selo/.test(prompt.toLowerCase()) ? "exclusive" : /wav|profissional|spotify|lancar|lanÃ§ar/.test(prompt.toLowerCase()) ? "premium" : "basic",
    nextAction: {
      label: nextRoute === "explorar" ? "Abrir catÃ¡logo recomendado" : "Abrir profissionais recomendados",
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
  return `<section class="genre-banner-section" aria-label="Generos em destaque">
    <div class="section-head clean-head genre-banner-head">
      <div>
        <h2><i data-lucide="sparkles"></i>Explore por genero</h2>
        <p>Escolha um banner para filtrar o marketplace.</p>
      </div>
      <div class="section-actions">
        <button type="button" data-action="genre-banner-scroll" data-direction="prev" aria-label="Banner anterior"><i data-lucide="chevron-left"></i></button>
        <button type="button" data-action="genre-banner-scroll" data-direction="next" aria-label="Proximo banner"><i data-lucide="chevron-right"></i></button>
      </div>
    </div>
    <div class="genre-banner-track" id="genreBannerTrack">${cards}</div>
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
        <button class="beat-card-buy-btn" type="button" data-action="buy" data-id="${item.id}" aria-label="Comprar licenÃ§a">
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
  ["brain-circuit", "Criar plano com IA", "Receba a ordem certa para lanÃ§ar.", "ia"],
  ["audio-lines", "Encontrar beatmaker", "Ache beats e produtores com match.", "produtores"],
  ["image", "Criar capa", "Encontre designers para single e EP.", "produtores"],
  ["sliders-horizontal", "Finalizar mÃºsica", "Mix, master e produÃ§Ã£o vocal.", "produtores"],
  ["megaphone", "Divulgar lanÃ§amento", "Curadoria, conteÃºdo e marketing.", "produtores"],
];

const beatmakerQuickActions = [
  ["upload-cloud", "Subir beat", "Publique um beat com tags e licencas.", "perfil"],
  ["package-plus", "Criar pack", "Agrupe beats por vibe, BPM e preco.", "perfil"],
  ["badge-dollar-sign", "Ajustar precos", "Revise licencas e valores sugeridos.", "ia"],
  ["users-round", "Ver artistas com match", "Encontre compradores com fit sonoro.", "produtores"],
];

const nexoRecommendations = [
  { icon: "audio-lines", title: "Black Coupe", type: "Beat", reason: "Bom para trap melÃ³dico", route: "beat-5" },
  { icon: "palette", title: "Maya Keys", type: "Designer", reason: "Ideal para capa dark premium", route: "produtores" },
  { icon: "boxes", title: "Combo Completo", type: "Pacote", reason: "ProduÃ§Ã£o + capa + divulgaÃ§Ã£o", route: "explorar" },
  { icon: "sliders-horizontal", title: "Ghost Lab", type: "Produtor", reason: "Mix e master para voz urbana", route: "produtores" },
  { icon: "list-music", title: "Curadoria Trap", type: "ServiÃ§o", reason: "Playlists com fit para lanÃ§amento", route: "playlist" },
  { icon: "megaphone", title: "ADS Inicial", type: "Marketing", reason: "Teste de pÃºblico antes do drop", route: "produtores" },
];

const mainCategories = [
  ["audio-lines", "Beatmakers", "Beats, packs e licenÃ§as para gravar.", "produtores"],
  ["palette", "Designers", "Capas, identidade e peÃ§as para redes.", "produtores"],
  ["sliders-horizontal", "Produtores Musicais", "ProduÃ§Ã£o, mixagem e masterizaÃ§Ã£o.", "produtores"],
  ["list-music", "Curadores", "Playlists, seleÃ§Ã£o e posicionamento.", "produtores"],
  ["megaphone", "Marketing Musical", "Campanhas, conteÃºdo e trÃ¡fego.", "produtores"],
];

const categoryBackgrounds = {
  Beatmakers: "assets/category-beatmakers.png",
  Designers: "assets/category-designers.png",
  "Produtores Musicais": "assets/category-producers.png",
  Curadores: "assets/category-curators.png",
  "Marketing Musical": "assets/category-marketing.png",
};

const smartCombos = [
  ["Combo ProduÃ§Ã£o", "Beat + Mixagem + MasterizaÃ§Ã£o", "Economia sugerida: 15%"],
  ["Combo LanÃ§amento", "Capa + Curadoria", "Economia sugerida: 12%"],
  ["Combo Completo", "ProduÃ§Ã£o + Capa + DivulgaÃ§Ã£o", "Economia sugerida: 20%"],
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
  const baseProfile = profile || createDefaultMusicProfile();
  return activeProfessionalProfiles()
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
  const media = item.coverUrl || item.mediaUrl || "";
  const hasVisualMedia = isRealFeedMedia(media);
  const meta = [item.creatorRole, item.priceLabel || item.price].filter(Boolean).slice(0, 2).join(" - ");
  const typeIcon = item.type === "service" ? "briefcase-business" : item.type === "image" ? "image" : item.type === "portfolio" ? "gallery-horizontal-end" : "sparkles";
  return `<article class="nexo-feed-card ${hasVisualMedia ? "" : "has-system-fallback"}" data-feed-item-id="${item.id}" data-feed-type="${item.type}" data-feed-index="${index}">
    <div class="nexo-feed-media">
      ${hasVisualMedia ? `<img src="${htmlEscape(media)}" alt="${htmlEscape(item.title)}">` : `<div class="nexo-feed-official-fallback"><i data-lucide="radio-tower"></i><span>ANSEND</span></div>`}
      ${isBeat && item.audioUrl ? `<button type="button" class="nexo-feed-play" data-action="nexo-feed-play" data-feed-item-id="${item.id}" aria-label="Ouvir ${htmlEscape(item.title)}"><i data-lucide="play"></i></button>` : `<span class="nexo-feed-type-icon"><i data-lucide="${typeIcon}"></i></span>`}
    </div>
    <div class="nexo-feed-copy">
      <div class="nexo-feed-author">
        ${authorImage ? `<img src="${htmlEscape(authorImage)}" alt="">` : `<span class="nexo-feed-avatar-fallback">${htmlEscape(author.slice(0, 1).toUpperCase())}</span>`}
        <div>
          <strong>${htmlEscape(author)}</strong>
          <span>${htmlEscape(meta || "Publicacao real")}</span>
        </div>
        <button type="button" data-action="nexo-feed-profile" data-feed-item-id="${item.id}">Ver</button>
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
    <button type="button" data-action="ai-chip" data-prompt="Quero montar o ${title.toLowerCase()} para meu lanÃ§amento.">Montar combo</button>
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
  const matchLabel = profile.match?.score ? `${profile.match.score}% match` : profile.role || profile.category || "Profissional";
  const verifiedMarkup = profile.verified === false ? "" : '<i data-lucide="badge-check"></i>';
  return `<article class="recommended-professional-item match-professional-card">
    <button class="recommended-professional-avatar" type="button" data-action="producer" data-title="${htmlEscape(profile.name)}" aria-label="Abrir perfil de ${htmlEscape(profile.name)}">
      <img src="${professionalImage(profile)}" alt="Avatar de ${htmlEscape(profile.name)}">
    </button>
    <button class="recommended-professional-name" type="button" data-action="producer" data-title="${htmlEscape(profile.name)}">
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
    <img src="${img(avatarImages[index % avatarImages.length])}" alt="Avatar de ${name}">
    <div>
      <strong>${name}<i data-lucide="badge-check"></i></strong>
      <span>${categories[index % categories.length]} Â· ${(4.7 + (index % 3) / 10).toFixed(1)}</span>
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
    <button class="top-producer-follow" type="button" data-action="producer" data-title="${name}"><i data-lucide="user-plus"></i>${t("Seguir", "Follow")}</button>
  </article>`;
}

function recentActivityRow(item, index) {
  const labels = ["Plano gerado", "Beat favoritado", "ServiÃ§o contratado", "Combo montado", "Perfil seguido"];
  return `<article>
    <i data-lucide="${["sparkles", "heart", "shopping-bag", "boxes", "user-plus"][index] || "activity"}"></i>
    <div><strong>${labels[index]}</strong><span>${item.title} Â· ${item.producer}</span></div>
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
    setText("nexoRecommendationsTitle", `<i data-lucide="sparkles"></i>${t("section.recommended")}`, appLocale.current === "pt-BR" ? "Profissionais e servicos com maior match para voce" : "Professionals and services with the strongest fit for you");
    setText("smartCombosTitle", `<i data-lucide="boxes"></i>${t("section.combos")}`, appLocale.current === "pt-BR" ? "Pacotes montados para sua fase atual" : "Packages shaped for your current stage");
    setText("featuredProfessionalsTitle", `<i data-lucide="badge-check"></i>Profissionais recomendados`, appLocale.current === "pt-BR" ? "Perfis verificados com fit para seu projeto" : "Verified profiles that fit your project");
  } else {
    setText("featuredPreviewTitle", `<i data-lucide="flame"></i>${t("section.catalogs")}`, t("section.catalogsSubtitle"));
    setText("quickActionsTitle", `<i data-lucide="zap"></i>${t("section.nextStep")}`, appLocale.current === "pt-BR" ? "Responda o quiz e desbloqueie recomendacoes reais" : "Answer the quiz and unlock real recommendations");
    setText("nexoRecommendationsTitle", `<i data-lucide="sparkles"></i>${t("section.recommended")}`, appLocale.current === "pt-BR" ? "Seis sugestoes principais para resolver seu lancamento agora" : "Six top suggestions to move your release forward");
    setText("categoryTitle", `<i data-lucide="layout-grid"></i>${t("section.categories")}`, appLocale.current === "pt-BR" ? "Os cinco pilares do marketplace musical da ANSEND." : "The five pillars of ANSEND's music marketplace.");
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
      ? items.map((item, index) => beatCard({ ...item, badge: index === 0 && hasProfile ? "Match IA" : item.badge })).join("")
      : emptyState("upload-cloud", "Nenhum catÃ¡logo publicado", "Cadastre beats ou mÃºsicas para alimentar esta vitrine.", "perfil");
  }
  if (professionals) {
    const items = hasProfile ? recs.professionals : realProfessionals;
    professionals.innerHTML = items.length
      ? items.map((item) => professionalMatchCard(item.match ? item : { ...item, match: { score: 100, reasons: ["Perfil cadastrado"] } })).join("")
      : emptyState("users-round", "Nenhum profissional cadastrado", "Crie sua conta profissional para aparecer nesta Ã¡rea.", "vendedor");
  }
  if (professionals?.querySelector(".empty-state")) {
    professionals.innerHTML = `<section class="recommended-professionals-empty">Nenhum profissional recomendado ainda.</section>`;
  }
  if (activity) {
    activity.innerHTML = catalogBeats.length
      ? catalogBeats.slice(0, 8).map(trackRow).join("")
      : emptyState("clock-3", "Lista recente vazia", "Os novos cadastros publicados vÃ£o aparecer aqui.", "perfil");
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
        <button type="button" data-action="scroll-next" aria-label="PrÃ³ximo"><i data-lucide="chevron-right"></i></button>
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
        <span class="airbit-divider">Â·</span>
        <span class="airbit-details">${item.tags[1] || "98 BPM"} Â· ${item.tags[0]}</span>
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
      <button class="airbit-more-btn" type="button" aria-label="Mais opÃ§Ãµes" data-action="favorite" data-id="${item.id}">
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
let heroTypewriterTimer = null;
let heroTypewriterToken = 0;

function currentRouteFromHash() {
  const route = (location.hash.replace("#", "") || "feed").split("?")[0];
  if (route.startsWith("beat-")) return "detalhe";
  if (route.startsWith("playlist-")) return "playlist";
  if (route.startsWith("perfil-")) return "perfil-publico";
  const knownRoutes = new Set([
    "feed",
    "nexo-feed",
    "explorar",
    "favoritos",
    "compras",
    "biblioteca",
    "ia",
    "produtores",
    "perfil",
    "cadastrar",
    "configuracoes",
    "carrinho",
    "vendedor",
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
  document.querySelectorAll(".reveal-section").forEach((target) => {
    target.classList.remove("reveal-section");
    target.classList.add("is-visible");
    target.style.removeProperty("--reveal-delay");
  });
  const route = currentRouteFromHash();
  if (route !== "feed") return;
  const targets = document.querySelectorAll(".home-section, .scroll-kinetic-section");
  targets.forEach((target, index) => {
    target.classList.add("reveal-section");
    target.style.setProperty("--reveal-delay", `${Math.min(index * 34, 170)}ms`);
    const rect = target.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight * 1.08 && rect.bottom > -window.innerHeight * 0.08;
    if (isInViewport) target.classList.add("is-visible");
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
  window.setTimeout(() => {
    document.querySelectorAll(".reveal-section:not(.is-visible)").forEach((target) => target.classList.add("is-visible"));
  }, 900);
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
  feed: ["Feed", "Sua seleÃ§Ã£o diÃ¡ria de playlists, beats e produtores."],
  explorar: ["Explorar", "Encontre novos sons por gÃªnero, BPM ou produtor."],
  favoritos: ["Favoritos", "Tudo que vocÃª marcou para ouvir depois."],
  compras: ["Minhas compras", "LicenÃ§as e beats adquiridos na sua conta."],
  biblioteca: ["Biblioteca", "Playlists, histÃ³ricos e itens salvos em um sÃ³ lugar."],
  produtores: ["Produtores", "ConheÃ§a produtores verificados da comunidade ANSEND."],
  configuracoes: ["ConfiguraÃ§Ãµes", "Personalize sua experiÃªncia na plataforma."],
  detalhe: ["Detalhe do beat", "InformaÃ§Ãµes, licenÃ§a e perfil do produtor."],
  carrinho: ["Carrinho", "Revise seus beats e finalize seu pedido."],
};
routeTitles.feed = ["Home", "Dashboard resumido com IA, recomendacoes e proximos passos."];
routeTitles["nexo-feed"] = ["Feed", "NEXO Feed vertical com beats, profissionais e solucoes recomendadas."];
routeTitles.compras = ["Pedidos", "Historico de pedidos, licencas e servicos contratados."];
routeTitles.ia = ["NEXO IA", "Diagnostico musical inteligente para adaptar sua jornada."];
routeTitles.produtores = ["Profissionais", "Beatmakers, designers, produtores, curadores e marketing musical."];
routeTitles.vendedor = ["Conta ANSEND", "Cadastre, entre e escolha a funÃ§Ã£o da sua conta na plataforma."];
routeTitles.cadastrar = ["LanÃ§ar mÃºsica", "Cadastre releases, capa, Ã¡udio e licenÃ§as para publicar no catÃ¡logo."];

routeTitles.perfil = ["Meu perfil", "Sua conta, catalogo e publicacoes na ANSEND."];
routeTitles.playlist = ["Playlist", "Pack selecionado com beats, referencias e licencas."];
routeTitles["central-ansend"] = ["Central ANSEND", "ServiÃ§os, seguranÃ§a, pagamentos, licenÃ§as, privacidade e uso da plataforma."];
routeTitles.servicos = ["ServiÃ§os", "Beatmakers, designers, produtores, curadores e marketing musical."];
routeTitles["como-funciona"] = ["Como funciona", "Da ideia ao lanÃ§amento com diagnÃ³stico da NEXO IA e profissionais recomendados."];
routeTitles["central-legal"] = ["Central Legal", "Termos, polÃ­ticas, licenÃ§as, pagamentos, direitos autorais e diretrizes."];
routeTitles["termos-de-uso"] = ["Termos de Uso", "Regras gerais para uso seguro e responsÃ¡vel da ANSEND."];
routeTitles["politica-de-privacidade"] = ["PolÃ­tica de Privacidade", "Como dados pessoais, navegaÃ§Ã£o e dados enviados para a NEXO IA sÃ£o tratados."];
routeTitles["politica-de-cookies"] = ["PolÃ­tica de Cookies", "Uso de cookies essenciais, preferÃªncias, analytics e marketing."];
routeTitles["termos-de-licenca-musical"] = ["Termos de LicenÃ§a Musical", "Regras para beats, instrumentais, capas, artes e serviÃ§os contratados."];
routeTitles["pagamentos-reembolsos"] = ["Pagamentos e Reembolsos", "Pagamento protegido, cancelamentos, disputas e liberaÃ§Ã£o de valores."];
routeTitles["direitos-autorais"] = ["Direitos Autorais", "ProteÃ§Ã£o de beats, samples, letras, capas, portfÃ³lios e materiais enviados."];
routeTitles.seguranca = ["SeguranÃ§a na ANSEND", "Pagamento protegido, histÃ³rico, avaliaÃ§Ãµes, suporte e mediaÃ§Ã£o."];
routeTitles["diretrizes-profissionais"] = ["Diretrizes para Profissionais", "Boas prÃ¡ticas e regras para vender serviÃ§os dentro da ANSEND."];
routeTitles["diretrizes-artistas"] = ["Diretrizes para Artistas", "Boas prÃ¡ticas para contratar serviÃ§os e usar a NEXO IA com clareza."];
routeTitles.suporte = ["Suporte", "Ajuda para conta, pedidos, entregas, pagamentos, licenÃ§as e denÃºncias."];

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
    intro: "Encontre informaÃ§Ãµes sobre serviÃ§os, seguranÃ§a, pagamentos, licenÃ§as, privacidade e uso da plataforma.",
    cards: [
      ["Como funciona a ANSEND", "Ideia, diagnÃ³stico da NEXO IA, recomendaÃ§Ã£o de profissionais, contrataÃ§Ã£o, entrega e avaliaÃ§Ã£o."],
      ["ServiÃ§os disponÃ­veis", "Categorias principais da plataforma: beatmakers, designers, produtores musicais, curadores e marketing musical."],
      ["Termos e polÃ­ticas", "Documentos legais e regras de uso centralizados em uma Ã¡rea clara."],
      ["SeguranÃ§a e confianÃ§a", "Pagamento protegido, avaliaÃ§Ãµes, suporte, mediaÃ§Ã£o e histÃ³rico de pedidos."],
      ["Suporte", "Ajuda para problemas com conta, pedido, entrega, pagamento ou licenÃ§a."],
    ],
  },
  servicos: {
    eyebrow: "ServiÃ§os",
    title: "O que pode ser contratado na ANSEND",
    intro: "A plataforma organiza serviÃ§os musicais por categoria para conectar artistas aos profissionais certos.",
    sections: [
      ["Beatmakers", "Vendam beats, instrumentais, licenÃ§as musicais, produÃ§Ãµes personalizadas, beat lease, beat exclusivo, type beat, instrumental sob encomenda e pacotes de beats."],
      ["Designers", "Criam capas de single, capas de Ã¡lbum, identidade visual de lanÃ§amento, artes para redes sociais, banners e materiais promocionais."],
      ["Produtores Musicais", "Atuam com produÃ§Ã£o, direÃ§Ã£o musical, mixagem, masterizaÃ§Ã£o, gravaÃ§Ã£o guiada, direÃ§Ã£o vocal e finalizaÃ§Ã£o de faixa."],
      ["Curadores", "Ajudam no posicionamento em playlists, canais, blogs, pÃ¡ginas, comunidades musicais, feedback profissional e anÃ¡lise de lanÃ§amento."],
      ["Marketing Musical", "Planejam lanÃ§amento, trÃ¡fego, divulgaÃ§Ã£o em redes sociais, estratÃ©gia de conteÃºdo, posicionamento artÃ­stico e anÃ¡lise de pÃºblico."],
    ],
  },
  "como-funciona": {
    eyebrow: "Fluxo",
    title: "Como funciona a ANSEND",
    intro: "O usuÃ¡rio entra com uma ideia, letra, demo, mÃºsica pronta, imagem, objetivo ou necessidade. A NEXO IA transforma isso em um caminho de execuÃ§Ã£o.",
    steps: [
      ["1", "O artista entra com uma ideia", "Exemplos: mÃºsica pronta para lanÃ§ar, letra precisando de beat, single para divulgar, capa profissional ou lanÃ§amento completo."],
      ["2", "A NEXO IA analisa o objetivo", "A IA identifica etapas como produÃ§Ã£o, beat, mixagem, masterizaÃ§Ã£o, capa, curadoria, marketing, divulgaÃ§Ã£o e combo ideal."],
      ["3", "A plataforma recomenda profissionais", "A ANSEND recomenda profissionais compatÃ­veis com estilo musical, orÃ§amento, objetivo e tipo de serviÃ§o."],
      ["4", "O usuÃ¡rio contrata com seguranÃ§a", "A contrataÃ§Ã£o fica registrada na plataforma, com pagamento protegido, histÃ³rico de pedido e suporte."],
      ["5", "O profissional entrega o serviÃ§o", "A entrega acontece com prazo, descriÃ§Ã£o, arquivos e revisÃµes combinadas."],
      ["6", "O usuÃ¡rio avalia", "ApÃ³s a entrega, o artista avalia o profissional e fortalece a reputaÃ§Ã£o dentro da ANSEND."],
    ],
  },
  "central-legal": {
    eyebrow: "Legal",
    title: "Central Legal",
    intro: "Documentos jurÃ­dicos e regulatÃ³rios reunidos de forma clara, sem parecer burocrÃ¡tico.",
    cards: [
      ["Termos de Uso", "Regras gerais para utilizaÃ§Ã£o da ANSEND."],
      ["PolÃ­tica de Privacidade", "Tratamento de dados pessoais, conta, navegaÃ§Ã£o e NEXO IA."],
      ["PolÃ­tica de Cookies", "Cookies essenciais, preferÃªncias, analytics e tecnologias semelhantes."],
      ["Termos de LicenÃ§a Musical", "Beats, licenÃ§as, serviÃ§os personalizados, exclusividade e direitos de uso."],
      ["Pagamentos e Reembolsos", "Pagamento protegido, taxas, cancelamentos, disputas e reembolsos."],
      ["Direitos Autorais", "Responsabilidade sobre beats, samples, capas, letras, demos, imagens e portfÃ³lios."],
      ["Diretrizes para Profissionais", "Regras para quem vende serviÃ§os dentro da ANSEND."],
      ["Diretrizes para Artistas", "OrientaÃ§Ãµes para quem contrata serviÃ§os dentro da ANSEND."],
    ],
  },
  "termos-de-uso": {
    eyebrow: "Termos",
    title: "Termos de Uso",
    intro: "A ANSEND Ã© uma plataforma digital que conecta artistas, criadores e profissionais da mÃºsica, facilitando contrataÃ§Ã£o de serviÃ§os musicais, recomendaÃ§Ãµes por inteligÃªncia artificial, organizaÃ§Ã£o de projetos e intermediaÃ§Ã£o de pagamentos.",
    bullets: ["O que Ã© a ANSEND", "Quem pode usar", "Cadastro de conta", "Conta de artista", "Conta de profissional", "Uso da NEXO IA", "ContrataÃ§Ã£o de serviÃ§os", "Pagamentos", "Entregas", "AvaliaÃ§Ãµes", "ComunicaÃ§Ã£o entre usuÃ¡rios", "Condutas proibidas", "SuspensÃ£o ou remoÃ§Ã£o de conta", "LimitaÃ§Ã£o de responsabilidade", "AtualizaÃ§Ãµes dos termos", "Canal de suporte"],
    note: "Ao utilizar a ANSEND, o usuÃ¡rio concorda em usar a plataforma de forma Ã©tica, segura e responsÃ¡vel, respeitando direitos de usuÃ¡rios, profissionais, artistas e terceiros.",
  },
  "politica-de-privacidade": {
    eyebrow: "Privacidade",
    title: "PolÃ­tica de Privacidade",
    intro: "A ANSEND coleta, utiliza, armazena e protege dados para operar a plataforma, melhorar recomendaÃ§Ãµes e apoiar contrataÃ§Ãµes seguras.",
    sections: [
      ["Dados coletados", "Nome, e-mail, telefone, foto de perfil, tipo de conta, informaÃ§Ãµes de cadastro, pagamento, histÃ³rico de pedidos, mensagens, briefings, avaliaÃ§Ãµes, preferÃªncias, dados tÃ©cnicos e dados enviados para a NEXO IA."],
      ["Dados enviados para a NEXO IA", "Ideias musicais, letras, demos, mÃºsicas prontas, objetivos de lanÃ§amento, referÃªncias visuais, briefings e preferÃªncias musicais."],
      ["Direitos do usuÃ¡rio", "Solicitar acesso, corrigir dados, excluir conta, remover informaÃ§Ãµes, alterar preferÃªncias e entrar em contato com suporte."],
    ],
  },
  "politica-de-cookies": {
    eyebrow: "Cookies",
    title: "PolÃ­tica de Cookies",
    intro: "A ANSEND utiliza cookies e tecnologias semelhantes para manter a plataforma funcionando, lembrar preferÃªncias e analisar desempenho.",
    sections: [
      ["Cookies essenciais", "Login, seguranÃ§a, sessÃ£o e funcionamento bÃ¡sico."],
      ["Cookies de preferÃªncia", "Idioma, tema, regiÃ£o e preferÃªncias da conta."],
      ["Cookies de analytics", "Uso da plataforma, pÃ¡ginas acessadas e melhorias de experiÃªncia."],
      ["Cookies de marketing", "Campanhas, anÃºncios, remarketing e mensuraÃ§Ã£o de trÃ¡fego quando ferramentas como Meta Pixel, Google Analytics ou TikTok Pixel forem utilizadas."],
    ],
  },
  "termos-de-licenca-musical": {
    eyebrow: "LicenÃ§as",
    title: "Termos de LicenÃ§a Musical",
    intro: "Define regras para uso de beats, instrumentais, produÃ§Ãµes, capas, artes e serviÃ§os musicais contratados.",
    sections: [
      ["LicenÃ§a bÃ¡sica", "Uso limitado do beat ou material contratado, com limites de distribuiÃ§Ã£o, monetizaÃ§Ã£o, visualizaÃ§Ãµes, streams ou plataformas definidos pelo profissional."],
      ["LicenÃ§a premium", "Uso mais amplo, podendo incluir monetizaÃ§Ã£o, distribuiÃ§Ã£o em plataformas digitais e maior volume de uso."],
      ["LicenÃ§a exclusiva", "Direitos mais amplos quando disponÃ­vel. ApÃ³s venda exclusiva, o profissional nÃ£o deve vender o mesmo beat como exclusivo para outros usuÃ¡rios."],
      ["ServiÃ§o personalizado", "Beat sob encomenda, capa, identidade visual, mixagem, masterizaÃ§Ã£o ou campanha com prazo, entregÃ¡veis, revisÃµes e direitos definidos no pedido."],
      ["Responsabilidades", "O profissional garante que possui direitos sobre o conteÃºdo. O artista respeita os limites da licenÃ§a adquirida."],
    ],
  },
  "pagamentos-reembolsos": {
    eyebrow: "Pagamentos",
    title: "Pagamentos, Reembolsos e Cancelamentos",
    intro: "A ANSEND pode atuar como intermediadora, mantendo registro da contrataÃ§Ã£o e oferecendo mais seguranÃ§a para artista e profissional.",
    sections: [
      ["LiberaÃ§Ã£o do pagamento", "Pode ocorrer apÃ³s entrega do serviÃ§o, aprovaÃ§Ã£o do artista, fim do prazo de revisÃ£o ou encerramento do pedido."],
      ["Reembolso", "Pode ser analisado em serviÃ§o nÃ£o entregue, entrega fora do combinado, problema comprovado ou cancelamento antes do inÃ­cio."],
      ["Casos sem reembolso", "ServiÃ§o aprovado, arquivo digital entregue e usado, mudanÃ§a de ideia apÃ³s inÃ­cio, pedido fora do escopo ou falta de briefing."],
      ["Disputas", "A ANSEND pode analisar histÃ³rico do pedido, mensagens, briefing, prazo, arquivos entregues e demais informaÃ§Ãµes disponÃ­veis."],
    ],
  },
  "direitos-autorais": {
    eyebrow: "Direitos",
    title: "Direitos Autorais e Propriedade Intelectual",
    intro: "O usuÃ¡rio Ã© responsÃ¡vel por garantir que possui os direitos necessÃ¡rios sobre qualquer conteÃºdo enviado, anunciado, vendido, licenciado ou entregue.",
    bullets: ["Beats", "Samples", "Loops", "Letras", "Demos", "Capas", "Logos", "Artes", "Imagens", "PortfÃ³lios", "Campanhas", "Materiais promocionais"],
    note: "Ã‰ proibido vender conteÃºdo plagiado, usar samples nÃ£o autorizados, copiar artes, publicar conteÃºdo sem permissÃ£o, fingir autoria ou usar imagem de terceiros sem autorizaÃ§Ã£o. A ANSEND deve possuir canal para denÃºncias.",
  },
  seguranca: {
    eyebrow: "ConfianÃ§a",
    title: "SeguranÃ§a na ANSEND",
    intro: "Comprar e vender dentro da ANSEND ajuda a proteger artistas e profissionais com histÃ³rico, reputaÃ§Ã£o, avaliaÃ§Ãµes e mais seguranÃ§a em cada contrataÃ§Ã£o.",
    bullets: ["Pagamento protegido", "HistÃ³rico de pedidos", "AvaliaÃ§Ãµes reais", "Profissionais verificados", "Suporte", "MediaÃ§Ã£o", "Registro de entrega", "ReputaÃ§Ã£o dentro da plataforma"],
  },
  "diretrizes-profissionais": {
    eyebrow: "Profissionais",
    title: "Diretrizes para Profissionais",
    intro: "Regras para quem vende serviÃ§os dentro da ANSEND.",
    bullets: ["Cadastrar informaÃ§Ãµes verdadeiras", "Publicar portfÃ³lio prÃ³prio", "Definir preÃ§os com clareza", "Informar prazos reais", "Entregar conforme combinado", "Responder clientes com profissionalismo", "Respeitar direitos autorais", "NÃ£o vender conteÃºdo sem autorizaÃ§Ã£o", "NÃ£o tentar aplicar golpes", "NÃ£o manipular avaliaÃ§Ãµes"],
    note: "Profissionais ganham reputaÃ§Ã£o, avaliaÃ§Ãµes, histÃ³rico, visibilidade, melhor posicionamento nas recomendaÃ§Ãµes da NEXO IA e mais seguranÃ§a no recebimento.",
  },
  "diretrizes-artistas": {
    eyebrow: "Artistas",
    title: "Diretrizes para Artistas",
    intro: "OrientaÃ§Ãµes para contratar serviÃ§os dentro da ANSEND com clareza.",
    bullets: ["Criar briefings claros", "Informar referÃªncias", "Respeitar o prazo do profissional", "Solicitar revisÃµes dentro do escopo", "Aprovar entregas corretamente", "Avaliar com honestidade", "Evitar negociaÃ§Ãµes inseguras fora da plataforma"],
    note: "A NEXO IA ajuda a entender o prÃ³ximo passo da mÃºsica, criar plano de lanÃ§amento, encontrar profissionais, montar combos, estimar orÃ§amento e organizar prioridades.",
  },
  suporte: {
    eyebrow: "Suporte",
    title: "Suporte ANSEND",
    intro: "Ãrea para resolver dÃºvidas e problemas com conta, pedido, entrega, pagamento, licenÃ§a, NEXO IA ou denÃºncias.",
    cards: [
      ["Pagamento", "Problemas com pagamento, reembolso, taxa ou checkout."],
      ["Entrega", "Problemas com prazo, arquivos, revisÃµes ou aprovaÃ§Ã£o."],
      ["Profissional ou artista", "Conflitos, comunicaÃ§Ã£o, avaliaÃ§Ãµes e mediaÃ§Ã£o."],
      ["LicenÃ§as", "DÃºvidas sobre uso, limites, exclusividade e arquivos."],
      ["NEXO IA", "DÃºvidas sobre diagnÃ³stico, recomendaÃ§Ãµes e mapa de lanÃ§amento."],
      ["DenÃºncias", "ConteÃºdo irregular, plÃ¡gio, direitos autorais ou uso indevido de imagem."],
    ],
    note: "A Central de Suporte deve conter busca, cards de categorias, perguntas rÃ¡pidas, formulÃ¡rio de contato, status do atendimento e link para abrir chamado.",
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
  const budget = wantsMarketing ? "R$ 800 + campanha" : wantsRelease ? "R$ 1.200 lanÃ§amento" : "R$ 500 inicial";
  const combo = [
    hasLyrics && !hasDemo ? "Beatmaker + produtor vocal" : "Produtor musical",
    "Designer de capa",
    wantsRelease ? "DistribuiÃ§Ã£o + curadoria" : "Curadoria ANSEND",
    wantsMarketing ? "Marketing musical + ADS" : "Plano de divulgaÃ§Ã£o orgÃ¢nica",
  ];
  return {
    prompt,
    role,
    genre,
    budget,
    combo: combo.join(" / "),
    match: [
      `Beatmaker ideal: ${genre} com estÃ©tica premium`,
      "Designer para capa: visual dark/laranja de lanÃ§amento",
      hasDemo ? "Produtor/mixagem: finalizar demo e master" : "Produtor/mixagem: guia de gravaÃ§Ã£o e mix",
      wantsMarketing ? "Curador + marketing: playlists, criativos e trÃ¡fego" : "Curador: encaixe em playlists e referÃªncias",
    ],
    steps: [
      { title: "ProduÃ§Ã£o", detail: hasLyrics ? "Escolher beatmaker e fechar estrutura da letra" : "Definir direÃ§Ã£o sonora e referÃªncia" },
      { title: "Identidade", detail: "Criar capa e peÃ§as para redes" },
      { title: "LanÃ§amento", detail: wantsRelease ? "Preparar distribuiÃ§Ã£o e licenÃ§as" : "Organizar arquivos e cronograma" },
      { title: "DivulgaÃ§Ã£o", detail: wantsMarketing ? "Ativar curadoria, marketing musical e ADS" : "Montar curadoria e calendÃ¡rio de posts" },
      { title: "Crescimento", detail: "Analisar resultado e prÃ³ximos passos" },
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
  // Catalog/community records are persisted in Supabase, never in localStorage.
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
    item.bpm ? `${item.bpm} BPM` : item.license_type || "Licenca",
  ].filter(Boolean);
  return {
    id: String(item.id),
    user_id: item.user_id || null,
    title: item.title || "Sem titulo",
    producer: producerName,
    cover: item.cover_url || "assets/ansend-logo-square.png",
    audio: item.audio_url || "",
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

function marketplaceBeats() {
  return publishedCatalogItems().map(catalogItemToBeat);
}

function userCatalogBeats() {
  return visibleCatalogItems().map(catalogItemToBeat);
}

function searchableBeatPool() {
  return dedupeById([...marketplaceBeats(), ...userCatalogBeats(), topBeatOfDay]);
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
  return map[role] || "produtores";
}

function profileToProfessional(profile = activeProfile()) {
  if (!profile?.account_role || profile.account_role === "artista") return null;
  const styles = asArray(profile.music_styles || profile.styles).filter(Boolean);
  return {
    id: profile.id,
    username: sanitizeHandle(profile.username || profile.handle || ""),
    name: profile.display_name || profile.artistic_name || profile.full_name || "Profissional ANSEND",
    role: accountRoleLabel(profile.account_role),
    category: roleToProfessionalCategory(profile.account_role),
    city: profile.location || "",
    avatar: profile.avatar_url || profile.avatar,
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
  const [profilesResult, catalogResult, beatsResult] = await Promise.all([
    supabaseClient.from("public_profiles").select("*").order("created_at", { ascending: false }),
    supabaseClient.from("catalog_items").select("*").eq("status", "published").order("created_at", { ascending: false }),
    supabaseClient.from("beats").select("*").eq("status", "published").order("created_at", { ascending: false }),
  ]);
  if (profilesResult.error) console.error("Error loading public profiles", profilesResult.error);
  if (catalogResult.error) console.error("Error loading public catalog", catalogResult.error);
  if (beatsResult.error) console.error("Error loading public beats", beatsResult.error);
  appState.publicProfiles = profilesResult.data || [];
  appState.publicCatalogItems = [
    ...(catalogResult.data || []).map((item) => ({ ...item, source_table: "catalog_items" })),
    ...(beatsResult.data || []).map((item) => ({ ...item, source_table: "beats" })),
  ].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  syncCatalogCompatibilityState();
}

async function loadOwnedCatalogItems() {
  if (!supabaseClient || !appState.authUser) {
    appState.ownedCatalogItems = [];
    syncCatalogCompatibilityState();
    return;
  }
  const [catalogResult, beatsResult] = await Promise.all([
    supabaseClient.from("catalog_items").select("*").eq("user_id", appState.authUser.id).order("created_at", { ascending: false }),
    supabaseClient.from("beats").select("*").eq("user_id", appState.authUser.id).order("created_at", { ascending: false }),
  ]);
  if (catalogResult.error) console.error("Error loading owned catalog", catalogResult.error);
  if (beatsResult.error) console.error("Error loading owned beats", beatsResult.error);
  appState.ownedCatalogItems = [
    ...(catalogResult.data || []).map((item) => ({ ...item, source_table: "catalog_items" })),
    ...(beatsResult.data || []).map((item) => ({ ...item, source_table: "beats" })),
  ].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  syncCatalogCompatibilityState();
}

async function loadCatalogItems() {
  await Promise.all([loadPublicPlatformData(), loadOwnedCatalogItems()]);
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
    const saved = { ...data, source_table: "catalog_items" };
    appState.ownedCatalogItems = dedupeById([saved, ...appState.ownedCatalogItems]);
    if (saved.status === "published") {
      appState.publicCatalogItems = dedupeById([saved, ...appState.publicCatalogItems]);
    }
    syncCatalogCompatibilityState();
    showToast("Item salvo no catalogo Supabase", "cloud-check");
  } else if (hasAccountAccess()) {
    const profile = activeProfile();
    const localItem = {
      ...payload,
      id: `local-${Date.now()}`,
      user_id: profile?.id || `local-${Date.now()}`,
      source_table: "catalog_items",
      created_at: new Date().toISOString()
    };
    appState.ownedCatalogItems = dedupeById([localItem, ...appState.ownedCatalogItems]);
    if (localItem.status === "published") {
      appState.publicCatalogItems = dedupeById([localItem, ...appState.publicCatalogItems]);
    }
    syncCatalogCompatibilityState();
    showToast("Item salvo no catalogo!", "check-circle");
  } else {
    showToast("Entre na sua conta para publicar no catalogo.", "log-in");
    return;
  }

  persistCatalogItems();
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
    const { data, error } = await supabaseClient.from(table).update({ status: nextStatus }).eq("id", id).select().single();
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
  return appState.profile || appState.onboardingProfile || localPreviewProfile() || null;
}

function accountRoleLabel(role = activeProfile()?.account_role) {
  return roleLabels[role] || "Visitante";
}

function accountGreeting() {
  const profile = activeProfile();
  if (!profile?.account_role) return "Sua seleÃ§Ã£o diÃ¡ria de playlists, beats e produtores.";
  const label = accountRoleLabel(profile.account_role);
  const map = {
    produtor: "Painel adaptado para publicar beats, vender licenÃ§as e acompanhar catÃ¡logo.",
    curador: "Playlists e descobertas organizadas para sua curadoria.",
    artista: "Beats, licenÃ§as e produtores priorizados para seu prÃ³ximo lanÃ§amento.",
    designer: "ReferÃªncias, capas e catÃ¡logos para apoiar lanÃ§amentos musicais.",
    beatmaker: "CatÃ¡logos e referÃªncias para criar, colaborar e vender beats.",
    manager: "Compras, artistas e licenÃ§as reunidas para gerenciar lanÃ§amentos.",
    selo: "CatÃ¡logos, produtores e licenÃ§as prontos para operaÃ§Ã£o de selo.",
  };
  return map[profile.account_role] || `ExperiÃªncia adaptada para ${label}.`;
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
}

function profileDisplayData(profile = activeProfile()) {
  const role = normalizeRole(profile?.account_role || "artista");
  const styleList = asArray(profile?.music_styles || profile?.genres || []).slice(0, 5);
  const displayName = profile?.display_name || profile?.artistic_name || profile?.full_name || "Perfil ANSEND";
  const username = sanitizeHandle(profile?.username || profile?.handle || "");
  return {
    name: displayName,
    fullName: profile?.full_name || "",
    username,
    handle: username ? `@${username}` : "",
    role,
    roleLabel: accountRoleLabel(role),
    avatar: profile?.avatar_url || profile?.photo_url || "",
    banner: profile?.banner_url || profile?.cover_url || "",
    headline: profile?.headline || "",
    bio: profile?.bio || "",
    styles: styleList,
    links: {
      instagram: profile?.instagram_url || profile?.instagram || "",
      youtube: profile?.youtube_url || profile?.youtube || "",
      spotify: profile?.spotify_url || profile?.spotify || "",
      soundcloud: profile?.soundcloud_url || profile?.soundcloud || "",
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

function profileAvatarMarkup(display, className = "profile-avatar") {
  const avatar = display?.avatar || "";
  if (avatar && !avatar.includes("undefined")) {
    return `<div class="${className}"><img src="${avatar}" alt="Avatar de ${htmlEscape(display.name)}"></div>`;
  }
  return `<div class="${className} is-initials" aria-label="Avatar de ${htmlEscape(display.name)}">${profileInitials(display.name)}</div>`;
}

function profileSocialLinks(display) {
  const links = [
    ["instagram", "Instagram", display.links.instagram],
    ["youtube", "YouTube", display.links.youtube],
    ["music-4", "Spotify", display.links.spotify],
    ["radio", "SoundCloud", display.links.soundcloud],
    ["globe", "Site", display.links.website],
  ].filter(([, , url]) => url);
  return links.map(([icon, label, url]) => `<a href="${htmlEscape(url)}" target="_blank" rel="noreferrer"><i data-lucide="${icon}"></i>${label}<i data-lucide="external-link"></i></a>`).join("");
}

function profileHeroBackgroundStyle(display) {
  return display?.banner
    ? `--profile-banner: url('${htmlEscape(display.banner)}')`
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
      return `<article class="profile-track-row">
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
  const cleanSlug = sanitizeHandle(slug);
  const current = activeProfile();
  if (current) {
    const currentDisplay = profileDisplayData(current);
    if (cleanSlug && [currentDisplay.username, sanitizeHandle(currentDisplay.name), sanitizeHandle(current.full_name)].includes(cleanSlug)) {
      return current;
    }
  }
  return appState.publicProfiles.find((profile) => {
    const candidates = [
      profile.username,
      profile.handle,
      profile.display_name,
      profile.artistic_name,
      profile.full_name,
    ].filter(Boolean).map(sanitizeHandle);
    return candidates.includes(cleanSlug);
  }) || null;
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
    const path = `${appState.authUser.id}/${type}.${fileExtension(file)}`;
    const { error } = await supabaseClient.storage.from(bucket).upload(path, file, {
      cacheControl: "3600",
      contentType: file.type || "image/png",
      upsert: true,
    });
    if (!error) {
      const { data } = supabaseClient.storage.from(bucket).getPublicUrl(path);
      return { url: data?.publicUrl || "", path };
    }
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
      <nav aria-label="SeÃ§Ãµes do editor">
        <button type="button" class="profile-editor-tab is-active" data-action="profile-editor-tab" data-tab="main">Perfil principal</button>
        <button type="button" class="profile-editor-tab" data-action="profile-editor-tab" data-tab="appearance">AparÃªncia</button>
        <button type="button" class="profile-editor-tab" data-action="profile-editor-tab" data-tab="links">Links</button>
      </nav>
    </header>

    <div class="profile-editor-scroll">
      <section class="profile-editor-panel is-active" data-profile-panel="main">
        <div class="profile-editor-columns">
          <div class="profile-editor-fields">
            <div class="profile-editor-media">
              <div class="profile-edit-banner-preview ${display.banner ? "has-image" : ""}" style="${display.banner ? `background-image:url('${htmlEscape(display.banner)}')` : ""}">
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
              <label>Nome exibido<input name="display_name" value="${htmlEscape(display.name)}" placeholder="Seu nome pÃºblico"></label>
              <label>Username<input name="username" value="${htmlEscape(display.username)}" placeholder="seu-username"></label>
              <label>FunÃ§Ã£o<select name="account_role">${roleOptions}</select></label>
              <label>Nome completo<input name="full_name" value="${htmlEscape(display.fullName)}" placeholder="Seu nome"></label>
              <label class="is-wide">Bio<textarea name="bio" rows="5" maxlength="300" placeholder="Conte o que vocÃª faz e como pode ajudar artistas.">${htmlEscape(profile?.bio || "")}</textarea><small><span data-bio-count>${String(profile?.bio || "").length}</span>/300</small></label>
            </div>
          </div>

          <aside class="profile-editor-preview" aria-label="PrÃ©via do perfil">
            <span>PrÃ©via</span>
            <article>
              <div class="profile-preview-banner ${display.banner ? "has-image" : ""}" style="${display.banner ? `background-image:url('${htmlEscape(display.banner)}')` : ""}"></div>
              ${profileAvatarMarkup(display, "profile-preview-avatar")}
              <div class="profile-preview-copy">
                <strong data-profile-preview-name>${htmlEscape(display.name)}</strong>
                <small data-profile-preview-handle>${htmlEscape(display.handle || "@username")}</small>
                <em data-profile-preview-role>${htmlEscape(display.roleLabel)}</em>
                <p data-profile-preview-bio>${htmlEscape(display.bio || "Sua bio aparecerÃ¡ aqui.")}</p>
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
            <p>Use imagens reais do seu perfil para criar uma presenÃ§a musical reconhecÃ­vel.</p>
          </div>
          <div class="profile-editor-appearance-actions">
            <button type="button" data-action="profile-image-picker-open" data-image-type="avatar"><i data-lucide="user-round"></i><span><strong>Alterar avatar</strong><small>Imagem quadrada</small></span></button>
            <button type="button" data-action="profile-image-picker-open" data-image-type="banner"><i data-lucide="image"></i><span><strong>Alterar banner</strong><small>Imagem horizontal</small></span></button>
            <button type="button" class="is-danger" data-action="profile-image-remove" data-image-type="banner"><i data-lucide="trash-2"></i><span><strong>Remover banner</strong><small>Usar fundo minimalista</small></span></button>
          </div>
        </div>
      </section>

      <section class="profile-editor-panel" data-profile-panel="links">
        <div class="profile-editor-links">
          <div><span>PresenÃ§a digital</span><h3>Links sociais</h3><p>Adicione apenas canais reais que deseja mostrar no perfil.</p></div>
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
      <span>Revise a prÃ©via antes de salvar.</span>
      <div>
        <button type="button" data-action="close-modal">Cancelar</button>
        <button type="submit" class="is-primary">Salvar alteraÃ§Ãµes</button>
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
}

function profileEditorForm() {
  return document.querySelector(".profile-editor-shell");
}

function syncProfileEditorPreview(form = profileEditorForm()) {
  if (!form) return;
  const name = form.elements.display_name?.value.trim() || "Seu nome";
  const username = sanitizeHandle(form.elements.username?.value || "");
  const role = accountRoleLabel(form.elements.account_role?.value || "artista");
  const bio = form.elements.bio?.value.trim() || "Sua bio aparecerÃ¡ aqui.";
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
      ? `<img src="${src}" alt="PrÃ©via da imagem selecionada">`
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
      avatar.innerHTML = `<img src="${src}" alt="PrÃ©via da foto do perfil">`;
    });
  }
  const pickerPreview = form.querySelector("[data-image-picker-preview]");
  if (pickerPreview) pickerPreview.innerHTML = `<img src="${src}" alt="PrÃ©via da imagem selecionada">`;
  closeProfileImagePicker();
}

async function saveProfileEdit(form) {
  const current = activeProfile() || {};
  const avatarFile = form.elements.avatar_file?.files?.[0];
  const bannerFile = form.elements.banner_file?.files?.[0];
  const uploadedAvatar = await uploadProfileAsset(avatarFile, "avatar");
  const uploadedBanner = await uploadProfileAsset(bannerFile, "banner");
  const removeAvatar = form.elements.remove_avatar?.value === "true";
  const removeBanner = form.elements.remove_banner?.value === "true";
  const profile = {
    ...current,
    id: current.id || appState.authUser?.id || `local-profile-${Date.now()}`,
    email: current.email || appState.authUser?.email || null,
    full_name: form.elements.full_name?.value.trim() || current.full_name || "Usuario ANSEND",
    display_name: form.elements.display_name?.value.trim() || current.display_name || null,
    username: sanitizeHandle(form.elements.username?.value || current.username || current.handle || ""),
    artistic_name: current.artistic_name || null,
    account_role: form.elements.account_role?.value || current.account_role || "artista",
    avatar_url: removeAvatar ? null : (uploadedAvatar.url || current.avatar_url || current.photo_url || null),
    avatar_path: removeAvatar ? null : (uploadedAvatar.path || current.avatar_path || null),
    banner_url: removeBanner ? null : (uploadedBanner.url || current.banner_url || current.cover_url || null),
    banner_path: removeBanner ? null : (uploadedBanner.path || current.banner_path || null),
    bio: form.elements.bio?.value.trim() || null,
    instagram_url: form.elements.instagram_url?.value.trim() || null,
    youtube_url: form.elements.youtube_url?.value.trim() || null,
    spotify_url: form.elements.spotify_url?.value.trim() || null,
    soundcloud_url: form.elements.soundcloud_url?.value.trim() || null,
    website_url: form.elements.website_url?.value.trim() || null,
    music_styles: current.music_styles || preferredGenres(),
    updated_at: new Date().toISOString(),
  };
  setLocalPreviewProfile(profile);
  if (supabaseClient && appState.authUser) {
    const result = await upsertProfile(profile);
    if (!result.error) setLocalPreviewProfile({ ...profile, ...(result.data || {}) });
  }
  closeModal();
  renderRoute();
}

async function upsertProfile(profile) {
  if (!supabaseClient || !appState.authUser) return { error: new Error("Supabase nÃ£o configurado") };
  const payload = {
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
    website_url: profile.website_url || null,
    instagram_url: profile.instagram_url || null,
    youtube_url: profile.youtube_url || null,
    spotify_url: profile.spotify_url || null,
    soundcloud_url: profile.soundcloud_url || null,
  };
  const { data, error } = await supabaseClient.from("profiles").upsert(payload, { onConflict: "id" }).select().single();
  if (!error && data) appState.profile = data;
  return { data, error };
}

async function loadProfile(user) {
  if (!supabaseClient || !user) return;
  const { data, error } = await supabaseClient.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (error) {
    showToast("NÃ£o consegui carregar seu perfil do Supabase", "triangle-alert");
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
  const route = currentRoute();
  const authRequiredForRoute = !hasAccountAccess() && protectedRoute(route);
  document.body.classList.toggle("is-authenticated", hasAccountAccess());
  document.body.classList.toggle("requires-auth", authRequiredForRoute);
  document.body.dataset.route = route;
  const avatar = document.querySelector(".avatar-btn");
  const profile = activeProfile();
  if (avatar && profile?.full_name) {
    avatar.setAttribute("aria-label", `Conta de ${profile.full_name}`);
  }
}

function hasAccountAccess() {
  return Boolean(
    appState.authUser ||
    appState.profile ||
    appState.onboardingProfile ||
    localStorage.getItem("ansendAccountAccess") === "true"
  );
}

function protectedRoute(route) {
  return ["compras", "perfil", "configuracoes"].includes(route);
}

function renderAuthLoading() {
  appView.innerHTML = `<section class="auth-gate-loading" aria-live="polite">
    <img src="assets/ansend-logo-horizontal.png" alt="ANSEND">
    <span>Verificando sua conta</span>
    <strong>Preparando acesso seguro</strong>
  </section>`;
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

async function initAuth() {
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
  const { data } = await supabaseClient.auth.getSession();
  const previousUserId = appState.authUser?.id || null;
  appState.authUser = data.session?.user || null;
  await loadPublicPlatformData();
  if (appState.authUser) {
    await loadProfile(appState.authUser);
    await loadOwnedCatalogItems();
  } else {
    appState.profile = localPreviewProfile();
    appState.ownedCatalogItems = [];
    syncCatalogCompatibilityState();
  }
  appState.authReady = true;
  syncAccountUi();
  renderRoutePreservingAuthFocus(previousUserId !== (appState.authUser?.id || null));
  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    const oldUserId = appState.authUser?.id || null;
    appState.authUser = session?.user || null;
    await loadPublicPlatformData();
    if (appState.authUser) {
      await loadProfile(appState.authUser);
      await loadOwnedCatalogItems();
    } else {
      appState.profile = localPreviewProfile();
      appState.ownedCatalogItems = [];
      syncCatalogCompatibilityState();
    }
    syncAccountUi();
    renderRoutePreservingAuthFocus(oldUserId !== (appState.authUser?.id || null));
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
    Trap: ["Trap na Ãrea", "808 para verso", "Noite de Trap"],
    Drill: ["Drill Brutal", "Rua & Hi-hat", "Drill de Luxo"],
    Funk: ["Funk de EstÃºdio", "Baile Premium", "Funk Type"],
    "R&B": ["R&B Noturno", "Voz & Melodia", "Slow Sessions"],
    "Boom Bap": ["Boom Bap Sujo", "Sample Room", "ClÃ¡ssicos de Rua"],
    "Type Beat": ["Type Beats em Alta", "ReferÃªncias do Momento", "Flow Pronto"],
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
  if (exploreTitle) exploreTitle.innerHTML = `<i data-lucide="sparkles"></i>Beats escolhidos pra vocÃª`;
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
          ${this.config.isOnboarding ? "Pular" : "Usar padrÃ£o"}
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

function findBeat(id) {
  return searchableBeatPool().find((item) => item.id === id) || topBeatOfDay;
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
      : "Explorar catÃ¡logo";
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
  appView.innerHTML = `${pageIntro("favoritos")}${items.length ? favoritesGrid : emptyState("heart", "Sua lista estÃ¡ vazia", "Favorite beats no feed para encontrÃ¡-los aqui.")}`;
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
    appView.innerHTML = `${pageIntro("carrinho")}${emptyState("shopping-cart", "Seu carrinho estÃ¡ vazio", "Adicione beats ou serviÃ§os ao carrinho para finalizar seu pedido.")}`;
    return;
  }

  const items = appState.cart.map(id => {
    const beatItem = findBeat(id) || topBeatOfDay;
    const priceText = beatItem.price || (beatItem.id === "top-beat-psiiiko" ? "$49.99" : ["$29.99", "$35.00", "$44.95", "$49.99", "$9.99", "$24.99"][(beatItem.title.length + (beatItem.producer || "").length) % 6]);
    const rawPrice = Number(beatItem.raw?.price || 0);
    const normalizedPrice = String(priceText).replace(/[^\d,.-]/g, "").replace(/\.(?=\d{3}(?:\D|$))/g, "").replace(",", ".");
    const priceVal = rawPrice || Number.parseFloat(normalizedPrice) || 0;
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
      <aside class="legal-note legal-warning"><i data-lucide="scale"></i><p>Os textos servem como base estratÃ©gica, estrutural e de produto. Antes da publicaÃ§Ã£o oficial, documentos legais devem ser revisados por um profissional jurÃ­dico.</p></aside>
    </section>
  `;
  lucide.createIcons();
}

function renderAiWorkspace() {
  appView.innerHTML = renderNexoChat();
  requestAnimationFrame(() => {
    setupNexoChatInput();
    scrollNexoChatToBottom();
    lucide.createIcons();
  });
}


const nexoChatSuggestions = [
  "Quero lancar uma musica do zero",
  "Me ajude a montar um plano de lancamento",
  "Quero encontrar produtores, designers e curadores",
  "Analise minha ideia musical",
  "Monte um diagnostico para meu proximo single",
];

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
  return `<section class="nexo-chat-welcome" aria-label="Introducao da NEXO IA">
    <span>NEXO IA</span>
    <h1>Converse com a inteligencia musical da ANSEND</h1>
    <p>Transforme uma ideia em um plano real de lancamento, com orientacao sobre beat, capa, mix/master, marketing, curadoria e proximos passos.</p>
    <div class="nexo-chat-suggestions">
      ${nexoChatSuggestions.map((prompt) => `<button type="button" data-action="nexo-chat-suggestion" data-prompt="${htmlEscape(prompt)}"><i data-lucide="sparkles"></i>${htmlEscape(prompt)}</button>`).join("")}
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
          <div class="nexo-chat-bubble"><p>NEXO IA esta pensando<span class="nexo-typing-dots"><b></b><b></b><b></b></span></p></div>
        </article>` : ""}
      </div>
      ${appState.nexoChatError ? `<p class="nexo-chat-error"><i data-lucide="circle-alert"></i>${htmlEscape(appState.nexoChatError)}</p>` : ""}
      <form class="nexo-chat-form" autocomplete="off">
        <div class="nexo-chat-input-wrap">
          <textarea id="nexoChatInput" name="message" rows="1" ${isLoading ? "disabled" : ""} placeholder="Conte sua ideia, seu momento ou o que voce quer lancar..."></textarea>
          <button type="submit" ${isLoading ? "disabled" : ""} aria-label="Enviar mensagem para NEXO IA"><i data-lucide="${isLoading ? "loader-2" : "send"}"></i></button>
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

function professionalCard(profile) {
  return `<article class="professional-card" data-category="${profile.category}">
    <button class="top-producer-avatar" type="button" data-action="producer" data-title="${profile.name}" aria-label="Abrir perfil de ${profile.name}">
      ${professionalAvatarMarkup(profile)}
    </button>
    
    <span class="professional-role">${profile.role}</span>
    <h3>${profile.name}</h3>
    ${profile.city ? `<p class="professional-location-response">${profile.city}</p>` : ""}
    ${profile.specialty ? `<p class="professional-specialty">${profile.specialty}</p>` : ""}
    ${profile.tags.length ? `<div class="professional-tags">${profile.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>` : ""}
    
    <div class="professional-actions">
      <button type="button" data-action="producer" data-title="${profile.name}">Ver perfil</button>
      <button type="button" data-action="professional-contact" data-title="${profile.name}">Contratar</button>
    </div>
  </article>`;
}

function professionalCategorySummary(category) {
  const profiles = activeProfessionalProfiles();
  const count = category.id === "todos"
    ? profiles.length
    : profiles.filter((profile) => profile.category === category.id).length;
  return `<button class="professional-tab ${category.id === appState.professionalCategory ? "is-active" : ""}" type="button" data-action="professional-filter" data-category="${category.id}">
    <i data-lucide="${category.icon}"></i>
    <span>${category.label}</span>
    <small>${count}</small>
  </button>`;
}

function renderProducers() {
  appState.professionalCategory = appState.professionalCategory || "todos";
  const selectedCategory = appState.professionalCategory;
  const profiles = activeProfessionalProfiles();
  const visibleProfiles = selectedCategory === "todos"
    ? profiles
    : profiles.filter((profile) => profile.category === selectedCategory);
  if (!visibleProfiles.length) {
    appView.innerHTML = `${pageIntro("produtores")}<section class="professionals-directory">
      <div class="professional-tabs" aria-label="Categorias de profissionais">
        ${professionalCategories.map(professionalCategorySummary).join("")}
      </div>
      ${emptyState("users-round", "Nenhum profissional cadastrado", "Crie uma conta profissional para aparecer no diretÃ³rio real da ANSEND.", "vendedor")}
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

function renderBeatDetail() {
  const hashId = location.hash.replace("#beat-", "");
  const item = findBeat(hashId);
  const ownerProfile = profileForUserId(item.user_id || item.raw?.user_id);
  const ownerProfessional = ownerProfile ? profileToProfessional(ownerProfile) : null;
  const producerName = item.producer.replace("prod. ", "");
  const related = marketplaceBeats()
    .filter((beatItem) => beatItem.id !== item.id && (!item.user_id || beatItem.user_id === item.user_id))
    .slice(0, 6);
  const favoriteClass = appState.favorites.has(item.id) ? " is-favorite" : "";
  const producerBio = ownerProfile?.bio ? `<p>${htmlEscape(ownerProfile.bio)}</p>` : "";
  const producerStats = item.user_id
    ? publishedCatalogItems().filter((entry) => entry.user_id === item.user_id).length
    : 0;
  const technicalDetails = [
    item.tags[1]?.includes("BPM") ? ["BPM", item.tags[1].replace(" BPM", "")] : null,
    item.tags[0] ? ["Genero", item.tags[0]] : null,
    item.raw?.license_type ? ["Licenca", item.raw.license_type] : null,
  ].filter(Boolean);

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
            ${professionalAvatarMarkup(ownerProfessional || { name: producerName }, "detail-producer-avatar")}
            <span><b>${producerName}</b><small>${ownerProfile ? accountRoleLabel(ownerProfile.account_role) : "Perfil ANSEND"}</small></span>
          </button>
          ${item.raw?.description ? `<p>${htmlEscape(item.raw.description)}</p>` : ""}
          <div class="detail-actions">
            <button class="detail-play" type="button" data-action="play" data-id="${item.id}"><i data-lucide="play"></i>Ouvir previa</button>
            <button class="detail-buy" type="button" data-action="buy" data-id="${item.id}">Comprar licenca</button>
            <button class="detail-favorite${favoriteClass}" type="button" data-action="favorite" data-id="${item.id}" aria-label="Favoritar"><i data-lucide="heart"></i></button>
          </div>
        </div>
        <div class="detail-stats" aria-label="Informacoes tecnicas do beat">
          ${technicalDetails.map(([label, value]) => `<span><small>${label}</small><strong>${htmlEscape(value)}</strong></span>`).join("")}
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
              ${professionalAvatarMarkup(ownerProfessional || { name: producerName }, "producer-profile-avatar")}
              <div><span>PERFIL ANSEND</span><h2>${producerName}</h2>${producerBio}</div>
              <button type="button" data-action="follow-producer">Seguir</button>
            </div>
            ${producerStats ? `<div class="producer-profile-stats"><span><strong>${producerStats}</strong><small>itens publicados</small></span></div>` : ""}
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
  const display = profileDisplayData(profile);
  const profileName = profile?.full_name || "Visitante ANSEND";
  const profileRole = profile?.account_role ? accountRoleLabel(profile.account_role) : "Conta nÃ£o criada";
  appView.innerHTML = `${pageIntro("configuracoes")}<section class="settings-panel">
    <div class="settings-profile">${profileAvatarMarkup(display, "settings-avatar")}<div><strong>${profileName}</strong><span>${profileRole}</span></div><button type="button" data-route="perfil">Conta</button></div>
    <label><span><strong>ReproduÃ§Ã£o automÃ¡tica</strong><small>Tocar a prÃ³xima faixa automaticamente.</small></span><input type="checkbox" checked></label>
    <label><span><strong>NotificaÃ§Ãµes de lanÃ§amentos</strong><small>Receber novidades dos produtores seguidos.</small></span><input type="checkbox" checked></label>
    <label><span><strong>Qualidade de Ã¡udio</strong><small>Defina a qualidade padrÃ£o das prÃ©vias.</small></span><select><option>Alta qualidade</option><option>Economia de dados</option></select></label>
    <label><span><strong>PreferÃªncias musicais</strong><small>RefaÃ§a o quiz para atualizar playlists e beats recomendados.</small></span><button type="button" data-action="restart-onboarding">Refazer quiz</button></label>
  </section>`;
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

function validateReleaseStep(step) {
  const form = releaseFormElement();
  if (!form) return false;
  
  if (step === 0) {
    const title = form.elements.title?.value?.trim();
    const producer = form.elements.producer_name?.value?.trim();
    const genre = form.elements.genre?.value;
    const bpm = form.elements.bpm?.value;
    const musicalKey = form.elements.musical_key?.value?.trim();
    
    if (!title) {
      showToast("TÃ­tulo Ã© obrigatÃ³rio", "alert-triangle");
      return false;
    }
    if (!producer) {
      showToast("Produtor Ã© obrigatÃ³rio", "alert-triangle");
      return false;
    }
    if (!genre) {
      showToast("Selecione um gÃªnero", "alert-triangle");
      return false;
    }
    if (!bpm || Number(bpm) < 40 || Number(bpm) > 240) {
      showToast("BPM deve ser entre 40 e 240", "alert-triangle");
      return false;
    }
    if (!musicalKey) {
      showToast("Tom musical / Key Ã© obrigatÃ³rio", "alert-triangle");
      return false;
    }
  }
  
  if (step === 1) {
    const coverUrl = form.elements.cover_url?.value;
    if (!coverUrl) {
      showToast("Por favor, envie a capa do release", "alert-triangle");
      return false;
    }
  }
  
  if (step === 2) {
    const audioUrl = form.elements.audio_url?.value;
    if (!audioUrl) {
      showToast("Por favor, envie o arquivo de Ã¡udio principal", "alert-triangle");
      return false;
    }
  }
  
  if (step === 3) {
    const price = form.elements.price?.value;
    const licenseType = form.elements.license_type?.value;
    if (!licenseType) {
      showToast("Selecione um tipo de licenÃ§a", "alert-triangle");
      return false;
    }
    if (licenseType !== "free" && (!price || Number(price) <= 0)) {
      showToast("PreÃ§o Ã© obrigatÃ³rio", "alert-triangle");
      return false;
    }
  }
  
  return true;
}

function syncReleaseForm(form = releaseFormElement()) {
  if (!form) return;
  
  const title = form.elements.title?.value?.trim() || "Sem tÃ­tulo";
  const artist = form.elements.producer_name?.value?.trim() || activeProfile()?.artistic_name || activeProfile()?.full_name || "ANSEND";
  const genre = form.elements.genre?.value || "ANSEND";
  const bpm = form.elements.bpm?.value ? `${form.elements.bpm.value} BPM` : "";
  const key = form.elements.musical_key?.value?.trim() || "";
  const price = form.elements.price?.value ? `R$ ${Number(form.elements.price.value).toFixed(2)}` : "R$ 0,00";
  const licenseType = form.elements.license_type?.value || "premium";
  const coverUrl = form.elements.cover_url?.value || "assets/ansend-logo-square.png";
  const audioUrl = form.elements.audio_url?.value || "";
  const desc = form.elements.description?.value?.trim() || "Sem descriÃ§Ã£o fornecida.";
  
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
  // Simulate progress visually
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 5;
    if (progress > 85) {
      progress = 85;
      clearInterval(interval);
    }
    progressCallback(progress);
  }, 100);

  try {
    let url = "";
    let path = "";
    
    if (supabaseClient && appState.authUser) {
      const userId = appState.authUser.id;
      const form = releaseFormElement();
      const beatId = form.dataset.beatId;
      const ext = file.name.split(".").pop();
      const bucket = type === "cover" ? "beat-covers" : type === "audio" ? "beat-audio" : "beat-stems";
      const fileName = `${type === "cover" ? "cover" : type === "audio" ? "audio" : "stems"}.${ext}`;
      path = `${userId}/${beatId}/${fileName}`;
      
      const { data, error } = await supabaseClient.storage
        .from(bucket)
        .upload(path, file, { upsert: true });
        
      if (error) throw error;
      
      const { data: urlData } = supabaseClient.storage
        .from(bucket)
        .getPublicUrl(path);
        
      url = urlData?.publicUrl || "";
    } else {
      // Local mock fallback
      await new Promise(resolve => setTimeout(resolve, 800));
      if (type === "cover") {
        url = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.readAsDataURL(file);
        });
      } else {
        url = URL.createObjectURL(file);
      }
      path = `local-path/${file.name}`;
    }
    
    clearInterval(interval);
    progressCallback(100);
    return { url, path };
  } catch (error) {
    clearInterval(interval);
    throw error;
  }
}

async function handleReleaseFile(file, type) {
  if (!file) return;
  const form = releaseFormElement();
  if (!form) return;
  
  // Find progress bar elements in the correct dropzone
  const dropzone = form.querySelector(`[data-upload-drop="${type}"]`);
  const progressContainer = dropzone?.querySelector(".upload-progress-container");
  const progressBar = dropzone?.querySelector(".upload-progress-bar");
  const progressPercent = dropzone?.querySelector(".upload-progress-percent");
  
  if (progressContainer) progressContainer.style.display = "block";
  
  try {
    const result = await handleReleaseUpload(file, type, (progress) => {
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (progressPercent) progressPercent.textContent = `${progress}%`;
    });
    
    // Hide progress bar after complete
    if (progressContainer) progressContainer.style.display = "none";
    
    // Set values
    if (type === "cover") {
      form.elements.cover_url.value = result.url;
      form.elements.cover_path.value = result.path;
      
      const preview = form.querySelector(".release-cover-preview");
      if (preview) {
        preview.src = result.url;
        preview.classList.add("has-preview");
      }
      dropzone.classList.add("has-file");
      form.querySelector(".cover-actions-container").style.display = "block";
      
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
      if (sizeNode) sizeNode.textContent = `${sizeMB} MB Â· carregando...`;
      if (player) {
        player.src = result.url;
        player.hidden = false;
        player.onloadedmetadata = () => {
          const duration = player.duration;
          form.elements.duration_seconds.value = Math.round(duration);
          const minutes = Math.floor(duration / 60);
          const seconds = Math.round(duration % 60).toString().padStart(2, '0');
          if (sizeNode) sizeNode.textContent = `${sizeMB} MB Â· ${minutes}:${seconds}`;
          syncReleaseForm(form);
        };
      }
      if (audioPreview) audioPreview.style.display = "flex";
      dropzone.classList.add("has-file");
      
      showToast("Ãudio enviado com sucesso!", "music");
    } else if (type === "stems") {
      form.elements.stems_url.value = result.url;
      form.elements.stems_path.value = result.path;
      
      const stemsPreview = form.querySelector(".stems-preview");
      const nameNode = form.querySelector("[data-stems-name]");
      if (nameNode) nameNode.textContent = file.name;
      if (stemsPreview) stemsPreview.style.display = "block";
      dropzone.classList.add("has-file");
      
      showToast("ZIP de Stems enviado com sucesso!", "archive");
    }
    
    syncReleaseForm(form);
  } catch (err) {
    if (progressContainer) progressContainer.style.display = "none";
    showToast(err.message || "Erro ao carregar o arquivo.", "alert-triangle");
  }
}

function handleReleaseFileInput(input) {
  handleReleaseFile(input.files?.[0], input.dataset.uploadType);
}

function setupMusicUploadEventListeners() {
  const form = releaseFormElement();
  if (!form) return;
  
  // Navigation: Back & Next using data-action attributes
  // (buttons are inside the footer which is outside the form, inside .release-page)
  const releasePage = form.closest(".release-page") || document;
  const backBtn = releasePage.querySelector('[data-action="release-back"]');
  const nextBtn = releasePage.querySelector('[data-action="release-next"]');
  
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      const current = releaseCurrentStep();
      if (current > 0) setReleaseStep(current - 1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const current = releaseCurrentStep();
      if (validateReleaseStep(current)) {
        setReleaseStep(current + 1);
      }
    });
  }
  
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
  
  // Stepper Header Buttons click navigation
  const stepButtons = document.querySelectorAll(".release-step");
  stepButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetStep = Number(btn.dataset.step);
      const current = releaseCurrentStep();
      
      // Allow going backward freely, or going forward if valid
      if (targetStep < current) {
        setReleaseStep(targetStep);
      } else if (targetStep > current) {
        // Validate intermediate steps
        let canGo = true;
        for (let i = current; i < targetStep; i++) {
          if (!validateReleaseStep(i)) {
            setReleaseStep(i);
            canGo = false;
            break;
          }
        }
        if (canGo) setReleaseStep(targetStep);
      }
    });
  });
  
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
      const preview = form.querySelector(".release-cover-preview");
      if (preview) {
        preview.src = "";
        preview.classList.remove("has-preview");
      }
      form.querySelector(".release-cover-drop")?.classList.remove("has-file");
      form.querySelector(".cover-actions-container").style.display = "none";
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
      showToast("Digite pelo menos o tÃ­tulo para salvar o rascunho.", "alert-triangle");
      return;
    }
  }
  
  const tagsStr = form.elements.release_tags?.value || "";
  const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);
  
  const payload = {
    title: form.elements.title?.value?.trim() || "Sem tÃ­tulo",
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
  
  const beatId = form.dataset.beatId;
  let savedCatalogItem = null;
  
  if (supabaseClient && appState.authUser) {
    const dbPayload = {
      ...payload,
      id: beatId,
      user_id: appState.authUser.id
    };
    
    const { data, error } = await supabaseClient
      .from("beats")
      .upsert(dbPayload)
      .select()
      .single();
      
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
  } else if (hasAccountAccess()) {
    // Local/onboarding fallback: user is logged in via profile or onboarding but
    // does not have a Supabase auth session yet. Save locally so the UI stays consistent.
    const profile = activeProfile();
    const localItem = {
      ...payload,
      id: beatId,
      user_id: profile?.id || appState.authUser?.id || `local-${Date.now()}`,
      producer_name: payload.producer_name || profile?.artistic_name || profile?.full_name || "ANSEND",
      source_table: "beats",
      created_at: new Date().toISOString()
    };
    savedCatalogItem = localItem;

    appState.ownedCatalogItems = dedupeById([localItem, ...appState.ownedCatalogItems.filter(item => item.id !== beatId)]);
    appState.publicCatalogItems = status === "published"
      ? dedupeById([localItem, ...appState.publicCatalogItems.filter(item => item.id !== beatId)])
      : appState.publicCatalogItems.filter(item => item.id !== beatId);
    syncCatalogCompatibilityState();

    showToast(status === "published" ? "Beat publicado!" : "Rascunho salvo!", "check-circle");
  } else {
    showToast("Entre na sua conta para publicar uma musica.", "log-in");
    return;
  }

  if (savedCatalogItem) {
    if (status === "published") {
      upsertFeedItem(createFeedItemFromBeat(savedCatalogItem));
    } else {
      removeFeedItemForSource(savedCatalogItem.id, savedCatalogItem.source_table || "beats");
    }
  }
  
  await loadCatalogItems();
  
  appState.genre = "Todos";
  if (location.hash !== "#explorar") {
    location.hash = "explorar";
  } else {
    renderExplore();
    hydrateView();
  }
}

function renderMusicUpload() {
  const profile = activeProfile();
  const display = profileDisplayData(profile);
  const beatId = generateUUID();
  const stepLabels = ["Detalhes","Capa","Faixa","PreÃ§o","Entrega","RevisÃ£o"];
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

  appView.innerHTML = '<section class="release-page" aria-label="Cadastrar mÃºsica na ANSEND">'
    + '<div class="release-container">'
    + '<nav class="release-stepper" aria-label="Etapas do cadastro">' + stepperHTML + '</nav>'
    + '<form class="release-upload-form" data-release-step="0" data-beat-id="' + beatId + '" onsubmit="event.preventDefault();">'
    + '<input type="hidden" name="kind" value="beat"><input type="hidden" name="status" value="draft">'
    + '<input type="hidden" name="cover_url"><input type="hidden" name="cover_path">'
    + '<input type="hidden" name="audio_url"><input type="hidden" name="audio_path">'
    + '<input type="hidden" name="stems_url"><input type="hidden" name="stems_path">'
    + '<input type="hidden" name="duration_seconds"><input type="hidden" name="file_size">'
    + '<input type="hidden" name="tags">'

    // STEP 0 â€” Detalhes
    + '<section class="release-panel is-active" data-panel="0">'
    + '<div class="release-panel-header"><h2>InformaÃ§Ãµes do Beat</h2><p>Adicione as informaÃ§Ãµes principais para organizar seu beat no catÃ¡logo.</p></div>'
    + '<div class="release-form-grid">'
    + '<label class="release-field release-wide"><span class="release-label">TÃ­tulo do release / beat *</span><input name="title" type="text" placeholder="Ex: Chill Vibing Trap Beat" required></label>'
    + '<label class="release-field"><span class="release-label">Artista / Produtor *</span><input name="producer_name" type="text" value="' + (display.name || "") + '" placeholder="Nome artÃ­stico" required></label>'
    + '<div class="release-field"><span class="release-label">GÃªnero *</span><div class="custom-select" data-select-id="genre"><input type="hidden" name="genre" required><button type="button" class="custom-select-trigger"><span>Selecione o gÃªnero</span><i data-lucide="chevron-down"></i></button><div class="custom-select-options">' + genreOptions + '</div></div></div>'
    + '<label class="release-field"><span class="release-label">SubgÃªnero</span><input name="subgenre" type="text" placeholder="Ex: Dark Trap, Guitar Trap"></label>'
    + '<label class="release-field"><span class="release-label">BPM *</span><input name="bpm" type="number" min="40" max="240" placeholder="Ex: 140" required></label>'
    + '<div class="release-field"><span class="release-label">Tom musical / Key *</span><div class="custom-select" data-select-id="musical_key"><input type="hidden" name="musical_key" required><button type="button" class="custom-select-trigger"><span>Selecione o tom</span><i data-lucide="chevron-down"></i></button><div class="custom-select-options">' + keyOptions + '</div></div></div>'
    + '<label class="release-field"><span class="release-label">Mood / vibe</span><input name="mood" type="text" placeholder="Ex: EnÃ©rgico, MelancÃ³lico"></label>'
    + '<label class="release-field release-wide"><span class="release-label">Tags (separadas por vÃ­rgula)</span><input name="release_tags" type="text" placeholder="Ex: trap, melÃ³dico, piano, sombrio"></label>'
    + '<label class="release-field release-wide"><span class="release-label">DescriÃ§Ã£o curta</span><textarea name="description" rows="3" placeholder="Escreva uma breve descriÃ§Ã£o para o catÃ¡logo."></textarea></label>'
    + '<fieldset class="release-radio-group release-wide"><legend>Essa faixa jÃ¡ foi lanÃ§ada antes?</legend><div class="release-radio-options"><label><input type="radio" name="already_released" value="true"> Sim</label><label><input type="radio" name="already_released" value="false" checked> NÃ£o</label></div></fieldset>'
    + '</div></section>'

    // STEP 1 â€” Capa
    + '<section class="release-panel" data-panel="1">'
    + '<div class="release-panel-header"><h2>Capa do Beat</h2><p>Envie uma capa quadrada de alta qualidade. Recomendamos 3000Ã—3000px.</p></div>'
    + '<div class="release-upload-layout">'
    + '<div class="release-dropzone release-cover-drop" data-upload-drop="cover"><input class="release-file-input" type="file" accept="image/png,image/jpeg,image/webp" data-upload-type="cover"><div class="release-upload-icon"><i data-lucide="image"></i></div><strong>Arraste ou selecione a capa</strong><small>JPG, PNG ou WEBP Â· mÃ­nimo 1400Ã—1400px</small><img class="release-cover-preview" alt="Preview da capa"><div class="upload-progress-container" style="display:none;"><div class="upload-progress-header"><span>Enviando capa...</span><span class="upload-progress-percent">0%</span></div><div class="upload-progress-track"><div class="upload-progress-bar"></div></div></div></div>'
    + '<div class="release-requirements"><strong>RecomendaÃ§Ãµes</strong><ul><li>Imagem quadrada perfeita (1:1)</li><li>MÃ­nimo 1400Ã—1400px (ideal 3000Ã—3000px)</li><li>Sem textos pequenos ou logos adicionais</li><li>Sem imagens borradas ou pixeladas</li></ul><div class="cover-actions-container" style="display:none;margin-top:16px;"><button type="button" class="release-remove-btn" data-action="remove-cover"><i data-lucide="trash-2"></i> Remover / Trocar</button></div></div>'
    + '</div></section>'

    // STEP 2 â€” Faixa
    + '<section class="release-panel" data-panel="2">'
    + '<div class="release-panel-header"><h2>Arquivo de Ãudio</h2><p>Suba o arquivo de Ã¡udio do beat (MP3, WAV ou FLAC).</p></div>'
    + '<div class="release-upload-layout">'
    + '<div class="release-dropzone release-audio-drop" data-upload-drop="audio"><input class="release-file-input" type="file" accept="audio/mpeg,audio/wav,audio/x-wav,audio/flac,audio/mp3" data-upload-type="audio"><div class="release-upload-icon"><i data-lucide="music"></i></div><strong>Arraste ou selecione o Ã¡udio</strong><small>MP3, WAV ou FLAC de alta qualidade</small><div class="upload-progress-container" style="display:none;"><div class="upload-progress-header"><span>Enviando Ã¡udio...</span><span class="upload-progress-percent">0%</span></div><div class="upload-progress-track"><div class="upload-progress-bar"></div></div></div></div>'
    + '<div class="release-requirements"><strong>Ãudio Preview</strong><div class="release-audio-preview" style="display:none;"><div class="release-audio-preview-header"><span>Preview Pronto</span><button type="button" class="release-remove-btn" data-action="remove-audio"><i data-lucide="trash-2"></i> Remover</button></div><div class="release-audio-info"><i data-lucide="file-audio" style="width:24px;height:24px;"></i><div class="release-audio-meta"><strong data-audio-name>Nome do arquivo.wav</strong><small data-audio-size>0 MB Â· 0:00</small></div></div><audio class="release-audio-player" controls preload="metadata"></audio></div></div>'
    + '</div></section>'

    // STEP 3 â€” PreÃ§o
    + '<section class="release-panel" data-panel="3">'
    + '<div class="release-panel-header"><h2>LicenÃ§a e PreÃ§o</h2><p>Defina o tipo de licenÃ§a e o valor do beat.</p></div>'
    + '<input type="hidden" name="license_type" value="premium">'
    + '<div class="license-cards-grid">'
    + '<div class="license-info-card" data-license="free"><strong>Free</strong><span class="license-price">GrÃ¡tis</span><ul><li>MP3 com tag</li><li>AtÃ© 500 streams</li><li>Uso nÃ£o-comercial</li></ul></div>'
    + '<div class="license-info-card" data-license="basic"><strong>BÃ¡sica</strong><span class="license-price">R$ 49,90</span><ul><li>MP3 enviado</li><li>AtÃ© 2.000 streams</li><li>Uso nÃ£o-comercial</li></ul></div>'
    + '<div class="license-info-card is-selected" data-license="premium"><strong>Premium</strong><span class="license-price">R$ 99,90</span><ul><li>MP3 + WAV</li><li>AtÃ© 10.000 streams</li><li>Uso comercial limitado</li></ul></div>'
    + '<div class="license-info-card" data-license="exclusive"><strong>Exclusiva</strong><span class="license-price">R$ 499,90</span><ul><li>WAV + Stems</li><li>Streams ilimitados</li><li>Posse total de direitos</li></ul></div>'
    + '</div>'
    + '<div class="release-form-grid" style="margin-top:32px;">'
    + '<label class="release-field"><span class="release-label">PreÃ§o do Beat (R$) *</span><input name="price" type="number" min="0" step="0.01" value="99.90" required></label>'
    + '<label class="release-field"><span class="release-label">Vendas mÃ¡ximas</span><input name="max_sales" type="number" min="1" value="50" placeholder="Ex: 50"></label>'
    + '<fieldset class="release-radio-group release-wide"><legend>Download com tag de voz (Tagged)?</legend><div class="release-radio-options"><label><input type="radio" name="allow_tagged_download" value="true" checked> Sim</label><label><input type="radio" name="allow_tagged_download" value="false"> NÃ£o</label></div></fieldset>'
    + '<fieldset class="release-radio-group release-wide"><legend>Permitir uso comercial bÃ¡sico?</legend><div class="release-radio-options"><label><input type="radio" name="allow_commercial_use" value="true" checked> Sim</label><label><input type="radio" name="allow_commercial_use" value="false"> NÃ£o</label></div></fieldset>'
    + '<label class="release-field release-wide"><span class="release-label">Termos da licenÃ§a (opcional)</span><textarea name="license_terms" rows="3" placeholder="Termos de uso personalizados..."></textarea></label>'
    + '</div></section>'

    // STEP 4 â€” Entrega
    + '<section class="release-panel" data-panel="4">'
    + '<div class="release-panel-header"><h2>Entrega do Beat</h2><p>Especifique os arquivos que o comprador receberÃ¡.</p></div>'
    + '<div class="delivery-options-grid"><div>'
    + '<fieldset class="release-radio-group release-wide"><legend>Arquivos incluÃ­dos na compra *</legend><div class="delivery-checklist"><label><input type="checkbox" name="delivery_mp3" checked> MP3 de Alta Qualidade</label><label><input type="checkbox" name="delivery_wav" checked> WAV Masterizado</label><label><input type="checkbox" name="delivery_stems"> Stems / Pistas separadas</label><label><input type="checkbox" name="delivery_contract" checked> Contrato assinado</label></div></fieldset>'
    + '<div class="release-form-grid" style="margin-top:20px;"><label class="release-field release-wide"><span class="release-label">ObservaÃ§Ãµes para o comprador</span><textarea name="delivery_notes" rows="3" placeholder="Ex: Obrigado pela compra! Qualquer dÃºvida, entre em contato."></textarea></label></div>'
    + '</div><div>'
    + '<div class="release-field"><span class="release-label">Upload de Stems (opcional)</span><div class="release-dropzone release-stems-drop" data-upload-drop="stems" style="min-height:190px;"><input class="release-file-input" type="file" accept="application/zip,application/x-zip-compressed" data-upload-type="stems"><div class="release-upload-icon"><i data-lucide="archive"></i></div><strong>Selecione o ZIP de Stems</strong><small>Pistas individuais do beat</small><div class="upload-progress-container" style="display:none;"><div class="upload-progress-header"><span>Enviando Stems...</span><span class="upload-progress-percent">0%</span></div><div class="upload-progress-track"><div class="upload-progress-bar"></div></div></div></div><div class="stems-preview" style="display:none;margin-top:12px;"><div style="display:flex;justify-content:space-between;align-items:center;"><span data-stems-name>stems.zip</span><button type="button" class="release-remove-btn" data-action="remove-stems">Remover</button></div></div></div>'
    + '</div></div></section>'

    // STEP 5 â€” RevisÃ£o
    + '<section class="release-panel" data-panel="5">'
    + '<div class="release-panel-header"><h2>RevisÃ£o Final</h2><p>Confira todas as informaÃ§Ãµes antes de publicar.</p></div>'
    + '<div class="review-grid"><div class="review-left"><div class="review-cover-wrapper"><img class="review-cover-img" src="assets/ansend-logo-square.png" alt="Capa do beat"></div><div class="review-audio-section"><audio class="review-audio-player" controls preload="metadata"></audio></div></div>'
    + '<div class="review-details"><div class="review-header-info"><h3 data-review-title>Sem tÃ­tulo</h3><p data-review-producer>por Produtor ANSEND</p></div>'
    + '<dl class="review-meta-grid"><div class="review-meta-item"><dt>GÃªnero</dt><dd data-review-genre>â€”</dd></div><div class="review-meta-item"><dt>BPM</dt><dd data-review-bpm>â€”</dd></div><div class="review-meta-item"><dt>Tom / Key</dt><dd data-review-key>â€”</dd></div><div class="review-meta-item"><dt>PreÃ§o</dt><dd data-review-price>R$ 0,00</dd></div><div class="review-meta-item"><dt>LicenÃ§a</dt><dd data-review-license>Premium</dd></div><div class="review-meta-item"><dt>Arquivos</dt><dd data-review-files>MP3, WAV, Contrato</dd></div></dl>'
    + '<div class="review-description"><h4>DescriÃ§Ã£o</h4><p data-review-desc>Sem descriÃ§Ã£o fornecida.</p></div></div></div></section>'

    + '</form></div>'

    // Bottom Bar
    + '<footer class="release-bottom-bar"><div class="release-bottom-inner">'
    + '<div class="release-footer-track"><img class="release-footer-cover" src="assets/ansend-logo-square.png" alt="Capa"><div><strong data-footer-title>Sem tÃ­tulo</strong><small data-footer-artist>' + (display.name || "Produtor ANSEND") + '</small></div></div>'
    + '<div class="release-footer-actions"><button type="button" class="release-back-btn" data-action="release-back" disabled>Voltar</button><button type="button" class="release-draft-btn" data-action="save-draft">Salvar Rascunho</button><button type="button" class="release-next-btn" data-action="release-next">PrÃ³ximo</button><button type="button" class="release-submit-btn" data-action="publish-catalog" style="display:none;">Publicar</button></div>'
    + '</div></footer></section>';

  setupMusicUploadEventListeners();
  syncReleaseForm();
  lucide.createIcons();
}


function renderMusicUploadFallback(error) {
  const display = profileDisplayData(activeProfile());
  const errorNote = error?.message
    ? `<small class="release-fallback-error" style="color:#ef4444; margin-top:8px; display:block;">Render seguro ativado: ${error.message}</small>`
    : "";
  appView.innerHTML = `
  <section class="release-fallback-page" aria-label="Cadastrar mÃºsica" style="max-width:800px; margin:40px auto; padding:32px; background:#0b0b0b; border:1px solid rgba(255,106,0,0.2); border-radius:16px; text-align:center;">
    <div class="release-fallback-head" style="margin-bottom:24px;">
      <span style="color:#ff6a00; font-size:12px; font-weight:900; text-transform:uppercase;">ANSEND release</span>
      <h2 style="font-size:28px; color:#fff; margin-top:8px;">LanÃ§ar mÃºsica</h2>
      <p style="color:#888; font-size:14px;">Cadastre capa, Ã¡udio, licenÃ§a e preÃ§o para publicar no seu catÃ¡logo.</p>
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
  let subtitleRole = "Produtor â€¢ Beatmaker â€¢ Sound Designer";
  let bioText = "Produtor musical especializado em Trap, R&B e sons melÃ³dicos. Criando identidades sonoras, arranjos dinÃ¢micos e mixagens profissionais de alta fidelidade para lanÃ§amentos urbanos.";
  let specialties = ["ProduÃ§Ã£o Musical", "Mixagem", "MasterizaÃ§Ã£o", "Sound Design"];
  let location = "SÃ£o Paulo, Brasil";
  
  if (role === "artista") {
    subtitleRole = "Artista â€¢ Compositor â€¢ IntÃ©rprete";
    bioText = "Compositor e vocalista independente focado em novos fluxos do Rap, Trap e R&B. Colaborando com produtores para desenvolver hooks marcantes e identidades autÃªnticas.";
    specialties = ["ComposiÃ§Ã£o", "Performance Vocal", "Toplining", "DireÃ§Ã£o de Voz"];
    location = "Salvador, Brasil";
  } else if (role === "curador") {
    subtitleRole = "Curador â€¢ Playlist Manager â€¢ Editorial";
    bioText = "Curador musical e criador de tendÃªncias. Gerenciando playlists influentes de Trap, Drill e R&B, conectando artistas independentes com novos ouvintes diariamente.";
    specialties = ["Curadoria Editorial", "Playlist Placement", "Posicionamento", "Marketing"];
    location = "Rio de Janeiro, Brasil";
  } else if (role === "designer") {
    subtitleRole = "Designer Visual â€¢ Diretor de Arte";
    bioText = "Desenvolvedor de universos visuais para lanÃ§amentos musicais. Especializado em capas digitais 3D, canvas do Spotify, animaÃ§Ãµes e branding completo para EPs e singles.";
    specialties = ["Capa de Single/EP", "Modelagem 3D", "Canvas", "Motion Graphics"];
    location = "Belo Horizonte, Brasil";
  } else if (role === "marketing") {
    subtitleRole = "Estrategista de Marketing â€¢ Gestor de TrÃ¡fego";
    bioText = "Estrategista focado em impulsionar lanÃ§amentos musicais nas plataformas de streaming. Campanhas de trÃ¡fego pago, crescimento de audiÃªncia e anÃ¡lise de dados de funil.";
    specialties = ["TrÃ¡fego Pago (ADS)", "EstratÃ©gia de LanÃ§amento", "Growth", "AnÃ¡lise de Dados"];
    location = "SÃ£o Paulo, Brasil";
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
      <strong>Nenhum beat ou mÃºsica cadastrado ainda</strong>
      <p>Use o formulÃ¡rio na barra lateral para cadastrar sua primeira faixa.</p>
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
            <span class="meta-dot">â€¢</span>
            <b>${specialties.length ? specialties.slice(0, 3).join(" + ") : "Estilos nao definidos"}</b>
            <span class="meta-dot">â€¢</span>
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
          <div class="section-title"><i data-lucide="upload-cloud"></i>LanÃ§amento</div>
          <p class="profile-sidebar-bio">Cadastre mÃºsicas, beats, capas, Ã¡udio e licenÃ§as em uma Ã¡rea prÃ³pria.</p>
          <a class="profile-form-toggle-btn" href="#cadastrar" data-route="cadastrar">
            <i data-lucide="plus"></i>
            <span>LanÃ§ar mÃºsica</span>
          </a>
        </section>

        <!-- LINKS E PRESENÃ‡A -->
        <section class="profile-sidebar-card">
          <div class="section-title"><i data-lucide="share-2"></i>Links e presenÃ§a</div>
          <ul class="profile-links-list">
            ${socialLinks.length ? socialLinks.map(([icon, label, url]) => `<li><a href="${url}" target="_blank" rel="noreferrer"><i data-lucide="${icon}"></i><span>${label}</span><i data-lucide="external-link"></i></a></li>`).join("") : `<li class="profile-empty-link"><span>Adicione seus links em Editar perfil.</span></li>`}
          </ul>
        </section>
      </div>

      <div class="profile-workspace-main">
        <!-- PREFERENCIAS MUSICAIS -->
        ${musicProfilePanel()}

        <!-- MEU CATÃLOGO (SPOTIFY-STYLE TRACKLIST) -->
        <section class="profile-catalog-list-card">
          <div class="section-head">
            <div>
              <h2><i data-lucide="library-big"></i>Meu catÃ¡logo</h2>
              <p>Itens cadastrados para venda, curadoria e perfil pÃºblico</p>
            </div>
          </div>
          
          <div class="profile-catalog-table-wrapper">
            <table class="profile-catalog-table">
              <thead>
                <tr>
                  <th class="col-play"></th>
                  <th class="col-title">TÃ­tulo</th>
                  <th class="col-genre">GÃªnero / BPM</th>
                  <th class="col-price">PreÃ§o / LicenÃ§a</th>
                  <th class="col-status">Status</th>
                  <th class="col-actions">AÃ§Ãµes</th>
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
            <b><i data-lucide="${isSupabaseConfigured ? "cloud-check" : "hard-drive"}"></i>${isSupabaseConfigured ? "SincronizaÃ§Ã£o ativa" : "Modo local"}</b>
            <b><i data-lucide="sparkles"></i>${(profile?.music_styles || preferredGenres()).slice(0, 2).join(" + ")}</b>
          </div>
        </div>
        <button type="button" data-action="logout-account"><i data-lucide="log-out"></i>Sair</button>
      </div>
      <div class="account-grid">
        <article>
          <i data-lucide="user-round"></i>
          <span>FunÃ§Ã£o principal</span>
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
          <p>${isSupabaseConfigured ? "SessÃ£o protegida e sincronizada." : "Perfil salvo neste navegador."}</p>
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
        <p>${isLogin ? "Acesse playlists, compras, favoritos e recomendaÃ§Ãµes adaptadas Ã  sua funÃ§Ã£o." : "Escolha se vocÃª Ã© produtor, curador, artista, designer, beatmaker ou selo para montar uma experiÃªncia personalizada."}</p>
      </div>
      <form class="seller-auth-form" autocomplete="on" data-mode="${isLogin ? "login" : "signup"}">
        ${isLogin ? "" : `<label for="seller-name">Nome completo<input id="seller-name" name="name" type="text" placeholder="Seu nome completo" autocomplete="name"></label>
        <label for="seller-store">Nome artÃ­stico ou marca<input id="seller-store" name="store" type="text" placeholder="Ex: Viana Beats" autocomplete="organization"></label>
        <div class="account-role-picker" aria-label="Escolha a funÃ§Ã£o da conta">${roleOptions}</div>
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
        <p>${isLogin ? "Ainda nÃ£o tem conta?" : "JÃ¡ tem conta?"} <button type="button" data-action="seller-mode" data-mode="${isLogin ? "signup" : "login"}">${isLogin ? "Criar conta" : "Entrar"}</button></p>
      </div>
    </div>
    <aside class="seller-auth-showcase" aria-label="BenefÃ­cios para vendedores">
      <div class="seller-shader-bg" data-hero-shader aria-hidden="true"></div>
      <div class="seller-showcase-card">
        <strong>Venda beats, organize licenÃ§as e acompanhe downloads em tempo real.</strong>
        <ul>
          <li><i data-lucide="shield-check"></i>LicenÃ§as seguras</li>
          <li><i data-lucide="audio-lines"></i>CatÃ¡logo profissional</li>
          <li><i data-lucide="download"></i>Entrega imediata</li>
        </ul>
      </div>
    </aside>
  </section>`;
}

function hydrateView() {
  appView.classList.add("route-slide-in");
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
  applyTranslations();
  lucide.createIcons();
  // Defer reveal setup to next frame so DOM layout is computed after innerHTML changes.
  // This ensures getBoundingClientRect() returns accurate positions for viewport checks.
  requestAnimationFrame(() => setupScrollReveals());
  setTimeout(() => appView.classList.remove("route-slide-in", "route-slide-left"), 620);
}

function currentRoute() {
  return currentRouteFromHash();
}

function renderRoute() {
  const route = currentRoute();
  const routeChanged = route !== lastRoute;
  lastRoute = route;
  const institutionalFooter = document.querySelector(".footer");
  if (institutionalFooter) institutionalFooter.hidden = route !== "feed";
  const accountAccess = hasAccountAccess();
  const authRequiredForRoute = !accountAccess && protectedRoute(route);
  appView.classList.add("app-view");
  appView.classList.toggle("feed", route === "feed");
  document.body.classList.toggle("is-authenticated", accountAccess);
  document.body.classList.toggle("requires-auth", authRequiredForRoute);
  document.body.dataset.route = route;
  document.body.classList.remove("release-mode");
  appView.classList.toggle("route-slide-left", routeChanged);
  document.querySelectorAll("a[data-route], button[data-route]").forEach((item) => item.classList.toggle("is-active", item.dataset.route === route));
  document.body.classList.remove("menu-open");
  if (!appState.authReady && authRequiredForRoute) {
    renderAuthLoading();
    hydrateView();
    return;
  }
  if (authRequiredForRoute) {
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

  if (route === "explorar" || route === "marketplace" || route === "ofertas") renderExplore();
  if (route === "favoritos") renderFavorites();
  if (route === "compras") renderPurchases();
  if (route === "biblioteca" || route === "musicas") renderLibrary();
  if (route === "ia" || route === "ferramentas") renderAiWorkspace();
  if (route === "produtores") renderProducers();
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
  if (route === "carrinho") renderCart();
  if (route === "vendedor") renderSellerAuth();
  if (route === "playlist") renderPlaylistDetail();
  if (route === "detalhe") renderBeatDetail();
  if (institutionalRoutes.has(route)) renderInstitutionalPage(route);
  window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  hydrateView();
}

const TOASTS_ENABLED = true;

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
    <label>ServiÃ§o
      <select name="service">
        <option value="Projeto completo">${profile.role} / projeto completo</option>
        <option value="Consultoria NEXO">Consultoria NEXO</option>
        <option value="Entrega expressa">Entrega expressa</option>
      </select>
    </label>
    <label>Briefing
      <textarea name="briefing" rows="4" placeholder="Descreva o que vocÃª precisa, prazo, referÃªncias e objetivo do lanÃ§amento"></textarea>
    </label>
    <div class="contract-summary">
      <span>Valor inicial</span><strong>${profile.price}</strong><small>Resposta: ${profile.response}</small>
    </div>
    <button class="seller-submit" type="submit">Confirmar contrataÃ§Ã£o<i data-lucide="arrow-right"></i></button>
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
    <p>Controles de preview para testar energia, velocidade e tom antes de comprar ou baixar. A compra mantÃ©m o arquivo original.</p>
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
  player.querySelector(".mini-track span").textContent = `${item.producer} Â· ${item.tags?.[1] || "153 BPM"}`;
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
  const queue = dedupeById([topBeatOfDay, ...marketplaceBeats()]);
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
  else {
    document.querySelectorAll(`[data-action="favorite"][data-id="${id}"]`).forEach((button) => button.classList.toggle("is-favorite", appState.favorites.has(id)));
    const isFav = appState.favorites.has(id);
    document.querySelectorAll(`[data-feed-item-id="${id}"][data-action="nexo-feed-like"], [data-feed-item-id="${id}"][data-action="nexo-feed-save"]`).forEach((btn) => btn.classList.toggle("is-active", isFav));
  }
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
  if (/invalid login|invalid credentials/i.test(text)) return "E-mail ou senha nÃ£o conferem. Revise os dados e tente novamente.";
  if (/password/i.test(text)) return "A senha precisa atender aos requisitos mÃ­nimos da conta.";
  if (/email/i.test(text)) return "Confira o e-mail informado e tente novamente.";
  return "NÃ£o foi possÃ­vel concluir agora. Tente novamente em instantes.";
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
    showToast("Conta criada. Vamos personalizar sua experiÃªncia.", "badge-check");
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
      showToast("Conta criada. Perfil liberado enquanto a sessÃ£o sincroniza.", "mail-check");
    }
    localStorage.setItem("ansend-open-catalog-form", "true");
    if (location.hash !== "#perfil") location.hash = "perfil";
    renderRoute();
    launchFirstAccountQuiz(profile, data.user);
  } catch (error) {
    if (mode === "signup" && isEmailRateLimitError(error)) {
      const profile = profileFromAccountForm(form, email);
      unlockPreviewAccountFromProfile(profile, "email");
      showToast("Conta liberada. Vamos personalizar sua experiÃªncia.", "badge-check");
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
  showToast("VocÃª saiu da conta ANSEND", "log-out");
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
    if (!supabaseClient) {
      showToast("Google entra na prÃ³xima etapa. Use e-mail e senha por enquanto.", "mail");
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
    updateMiniPlayer({
      id: `release-preview-${Date.now()}`,
      title: form.elements.title?.value || "Preview do release",
      producer: form.elements.artist?.value || "ANSEND",
      cover: form.elements.cover_url?.value || "assets/ansend-logo-square.png",
      audio: src,
      tags: [form.elements.genre?.value || "Preview"],
    });
    document.querySelector(".mini-player")?.classList.add("is-playing");
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
    const feedItem = feedItemForEvent(target.dataset.feedItemId);
    const item = findBeat(feedItem?.metadata?.beatId || feedItem?.sourceId || target.dataset.id);
    if (!item) return;
    pauseTopBeat({ quiet: true });
    appState.playing = item.id;
    updateMiniPlayer(item);
    document.querySelector(".mini-player")?.classList.add("is-playing");
    writeNexoFeedEvent(feedItem?.id || item.id, "click_cta", { item: feedItem || item, watchTimeMs: 0 });
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
      if (item.creatorName && item.creatorName !== "ANSEND") openProfessionalProfile(item.creatorName);
      else location.hash = "perfil";
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
    const item = appState.ownedCatalogItems.find((entry) => entry.id === target.dataset.id);
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
  if (action === "how-it-works") showToast("Explore, escolha sua licenÃ§a e baixe o beat imediatamente", "circle-help");
  if (action === "ai-next-route") {
    location.hash = target.dataset.route || "produtores";
    return;
  }
  if (action === "producer") {
    location.hash = `perfil-${slugify(target.dataset.title || "profissional")}`;
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
  if (action === "notifications") showToast("VocÃª tem 3 novos lanÃ§amentos", "bell");
  if (action === "profile-edit") showToast("EdiÃ§Ã£o de perfil habilitada", "user-round");
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
    showToast("ConfiguraÃ§Ã£o salva", "settings");
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
    const prompt = input.value.trim() || "Tenho uma ideia musical e preciso transformar em lanÃ§amento profissional.";
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
    showToast(`ContrataÃ§Ã£o enviada para ${profile.name}`, "handshake");
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

function updateSidebarProfile() {
  const profile = activeProfile();
  const display = profileDisplayData(profile);
  
  const nameEl = document.querySelector(".sidebar-profile-name");
  const avatarEl = document.querySelector(".sidebar-profile-avatar");
  
  if (nameEl) {
    nameEl.textContent = display.name;
  }
  if (avatarEl) {
    avatarEl.src = display.avatar;
  }
}

function initSidebarListeners() {
  // Language toggle inside the sidebar
  document.querySelector(".sidebar-lang-btn")?.addEventListener("click", () => {
    const nextLocale = appLocale.current === "pt-BR" ? "en" : "pt-BR";
    setLocale(nextLocale, { manual: true });
    renderRoute();
  });
  
  // Hamburger toggle inside the sidebar to close the mobile menu
  document.querySelector(".sidebar-menu-toggle")?.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
  });
}

setLocale(detectLocale(), { manual: false });
detectLocaleWithGeo()
  .then((locale) => setLocale(locale, { manual: false }))
  .catch(() => setLocale(detectLocale(), { manual: false }))
  .finally(() => {
    initSidebarListeners();
    renderRoutePreservingAuthFocus();
    initAuth();
  });


