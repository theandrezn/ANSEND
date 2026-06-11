const fs = require("fs");
const path = require("path");

// Mock global browser variables
global.window = {
  matchMedia: () => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {}
  })
};
global.document = {
  body: {
    classList: {
      toggle: () => {},
      remove: () => {},
      add: () => {}
    }
  },
  querySelectorAll: () => [],
  querySelector: () => null,
  addEventListener: () => {}
};
global.appState = {
  profile: null,
  onboardingProfile: null,
  catalogItems: [],
  genre: "Todos"
};
global.localStorage = {
  getItem: () => "null",
  setItem: () => {},
  removeItem: () => {}
};
global.lucide = {
  createIcons: () => {}
};
global.prefersReducedMotion = {
  matches: false
};
global.activeProfile = () => null;
global.profileDisplayData = () => ({ name: "Test", avatar: "", role: "artista", roleLabel: "Artista", styles: [], links: {} });
global.generateUUID = () => "test-uuid";
global.appView = {
  classList: {
    add: () => {},
    toggle: () => {}
  },
  innerHTML: ""
};

// Load script.js
const code = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
try {
  eval(code);
} catch (e) {
  console.error("Eval error:", e);
}

// Call renderMusicUpload
try {
  global.renderMusicUpload();
} catch (e) {
  console.error("renderMusicUpload error stack:", e);
}
