const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=520&q=82`;

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
  query: "",
  genre: "Todos",
  playing: null,
  sellerMode: "login",
};

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

function playlistCard([title, subtitle, cover]) {
  return `<article class="playlist-card gradient-card spotlight-card" style="--card-art: url('${cover}')" data-playlist="${title}">
    <button class="playlist-action gradient-card-body" type="button" data-action="playlist" data-title="${title}" aria-label="Abrir ${title}">
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
  return `<article class="beat-card gradient-card spotlight-card" style="--card-art: url('${item.cover}')">
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

document.querySelector("#playlistRow").innerHTML = playlists.map(playlistCard).join("");
document.querySelector('[data-feed="explore"]').innerHTML = Array.from({ length: 6 }, (_, i) => beatCard(beat(i + 1, i === 4 ? "Em alta" : ""))).join("");
document.querySelector("#dynamicSections").innerHTML = sections.map(sectionTemplate).join("");
document.querySelector("#trackList").innerHTML = Array.from({ length: 8 }, (_, i) => trackRow(beat(i + 3, ""), i)).join("");
document.querySelector("#lateSections").innerHTML = lateSections.map(sectionTemplate).join("");

const supportsPrecisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let revealObserver = null;
let lastRoute = null;

function currentRouteFromHash() {
  const route = location.hash.replace("#", "") || "feed";
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

function setupScrollReveals() {
  const targets = document.querySelectorAll(".catalog-section, .view-header, .view-grid, .purchase-list, .producer-grid, .settings-panel, .seller-auth");
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
};
routeTitles.vendedor = ["Area do vendedor", "Entre na sua conta de produtor ou abra sua loja ANSEND."];

function persistState() {
  localStorage.setItem("ansend-favorites", JSON.stringify([...appState.favorites]));
  localStorage.setItem("ansend-purchases", JSON.stringify(appState.purchases));
}

function findBeat(id) {
  return allBeats.find((item) => item.id === id) || allBeats[0];
}

function pageIntro(route, actions = "") {
  const [title, subtitle] = routeTitles[route];
  return `<header class="view-header"><div><span class="view-eyebrow">ANSEND</span><h1>${title}</h1><p>${subtitle}</p></div>${actions}</header>`;
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

function renderSettings() {
  appView.innerHTML = `${pageIntro("configuracoes")}<section class="settings-panel">
    <div class="settings-profile"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" alt=""><div><strong>André Silva</strong><span>Artista independente</span></div><button type="button" data-action="profile-edit">Editar perfil</button></div>
    <label><span><strong>Reprodução automática</strong><small>Tocar a próxima faixa automaticamente.</small></span><input type="checkbox" checked></label>
    <label><span><strong>Notificações de lançamentos</strong><small>Receber novidades dos produtores seguidos.</small></span><input type="checkbox" checked></label>
    <label><span><strong>Qualidade de áudio</strong><small>Defina a qualidade padrão das prévias.</small></span><select><option>Alta qualidade</option><option>Economia de dados</option></select></label>
  </section>`;
}

function renderSellerAuth() {
  const isLogin = appState.sellerMode === "login";
  appView.innerHTML = `<section class="seller-auth" aria-label="Login do vendedor">
    <div class="seller-auth-panel">
      <a class="seller-auth-logo" href="#feed" data-route="feed" aria-label="ANSEND inicio"><img src="assets/ansend-logo-horizontal.png" alt="ANSEND"></a>
      <div class="seller-auth-copy">
        <span>PORTAL DO PRODUTOR</span>
        <h1>${isLogin ? "Entre na sua loja" : "Comece a vender beats"}</h1>
        <p>${isLogin ? "Acesse vendas, licencas, downloads e catalogo em um painel feito para produtores independentes." : "Crie sua conta de vendedor e prepare seu catalogo para artistas comprarem com seguranca."}</p>
      </div>
      <form class="seller-auth-form" autocomplete="on" data-mode="${isLogin ? "login" : "signup"}">
        ${isLogin ? "" : `<label for="seller-name">Nome completo<input id="seller-name" name="name" type="text" placeholder="Seu nome artistico" autocomplete="name" required></label>
        <label for="seller-store">Nome da loja<input id="seller-store" name="store" type="text" placeholder="Ex: Viana Beats" autocomplete="organization" required></label>`}
        <label for="seller-email">E-mail<input id="seller-email" name="email" type="email" placeholder="produtor@email.com" autocomplete="email" required></label>
        <label for="seller-password">Senha
          <span class="password-wrap">
            <input id="seller-password" name="password" type="password" placeholder="Sua senha" autocomplete="${isLogin ? "current-password" : "new-password"}" required>
            <button type="button" data-action="toggle-password" aria-label="Mostrar senha"><i data-lucide="eye"></i></button>
          </span>
        </label>
        <button class="seller-submit" type="submit">${isLogin ? "Entrar no painel" : "Criar loja"}<i data-lucide="arrow-right"></i></button>
      </form>
      <div class="seller-auth-actions">
        <button type="button" data-action="seller-google"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="">Continuar com Google</button>
        <p>${isLogin ? "Ainda nao vende na ANSEND?" : "Ja tem conta de vendedor?"} <button type="button" data-action="seller-mode" data-mode="${isLogin ? "signup" : "login"}">${isLogin ? "Criar loja" : "Entrar"}</button></p>
      </div>
    </div>
    <aside class="seller-auth-showcase" aria-label="Beneficios para vendedores">
      <div class="seller-showcase-card">
        <span><i data-lucide="badge-dollar-sign"></i>Receba por licenca</span>
        <strong>Venda beats, organize licencas e acompanhe downloads em tempo real.</strong>
        <div class="seller-meter"><b style="width: 78%"></b></div>
        <ul>
          <li><i data-lucide="shield-check"></i>Licencas seguras</li>
          <li><i data-lucide="audio-lines"></i>Catalogo profissional</li>
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
  appView.classList.toggle("route-slide-left", routeChanged);
  document.querySelectorAll("[data-route]").forEach((item) => item.classList.toggle("is-active", item.dataset.route === route));
  document.body.classList.remove("menu-open");
  if (route === "feed") appView.innerHTML = feedTemplate;
  if (route === "explorar") renderExplore();
  if (route === "favoritos") renderFavorites();
  if (route === "compras") renderPurchases();
  if (route === "biblioteca") renderLibrary();
  if (route === "produtores") renderProducers();
  if (route === "configuracoes") renderSettings();
  if (route === "vendedor") renderSellerAuth();
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
  const target = event.target.closest("button, a");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "seller") {
    location.hash = "vendedor";
    return;
  }
  if (action === "seller-mode") {
    appState.sellerMode = target.dataset.mode || "login";
    renderRoute();
    return;
  }
  if (action === "seller-google") {
    showToast("Login com Google preparado para vendedores", "badge-check");
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
  if (action === "favorite") handleFavorite(target.dataset.id);
  if (action === "buy") handleBuy(target.dataset.id);
  if (action === "play") {
    const item = findBeat(target.dataset.id);
    appState.playing = item.id;
    updateMiniPlayer(item);
    showToast(`Tocando agora: ${item.title}`, "play");
  }
  if (action === "mini-play") showToast(appState.playing ? "Reprodução pausada" : "Tocando Neon Alley", appState.playing ? "pause" : "play");
  if (action === "playlist") showToast(`Playlist aberta: ${target.dataset.title}`, "list-music");
  if (action === "how-it-works") showToast("Explore, escolha sua licença e baixe o beat imediatamente", "circle-help");
  if (action === "producer") showToast(`Perfil de ${target.dataset.title}`, "badge-check");
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
  const form = event.target.closest(".seller-auth-form");
  if (!form) return;
  event.preventDefault();
  showToast(form.dataset.mode === "signup" ? "Loja criada para revisao" : "Login de vendedor validado", "store");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") document.body.classList.remove("menu-open");
});

renderRoute();
