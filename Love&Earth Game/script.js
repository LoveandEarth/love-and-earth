const levelElement = document.getElementById("level");
const cleanScoreElement = document.getElementById("clean-score");
const loveScoreElement = document.getElementById("love-score");
const smileScoreElement = document.getElementById("smile-score");
const harmonyScoreElement = document.getElementById("harmony-score");
const treeAgeDaysElement = document.getElementById("tree-age-days");
const globalHeartCountElement = document.getElementById("global-heart-count");
const taiwanTimeElement = document.getElementById("taiwan-time");
const mainTitleElement = document.getElementById("main-title");
const mainSubtitleElement = document.getElementById("main-subtitle");
const sceneElement = document.querySelector(".scene");
const languageScreen = document.getElementById("language-screen");
const earthElement = document.getElementById("earth");
const earthMessageElement = document.getElementById("earth-message");
const messageElement = document.getElementById("message");
const treeElement = document.getElementById("tree");
const heartBlossomElement = document.getElementById("heart-blossom");
const earthRaysElement = document.getElementById("earth-rays");
const backgroundMusic = document.getElementById("background-music");
const musicToggleButton = document.getElementById("music-toggle-button");
const resetButton = document.getElementById("reset-button");
const cleanButton = document.querySelector(".action-clean");
const heartButton = document.querySelector(".action-heart");
const charityButton = document.querySelector(".action-charity");
const musicButton = document.querySelector(".action-music");
const kissButton = document.querySelector(".action-kiss");
const cleanMenu = document.getElementById("clean-menu");
const rainbowMenu = document.getElementById("rainbow-menu");
const languageButtons = Array.from(document.querySelectorAll(".language-button"));
const cleanLabelElements = Array.from(document.querySelectorAll("[data-clean-label]"));
const mainLabelElements = Array.from(document.querySelectorAll("[data-main-label]"));
const heartOptions = Array.from(document.querySelectorAll(".heart-option"));
const rainbowHearts = Array.from(document.querySelectorAll(".rainbow-heart"));
const cleanEffectsContainer = document.getElementById("clean-effects");
const energyCore = document.getElementById("energy-core");
const heartParticles = document.getElementById("heart-particles");
const musicParticles = document.getElementById("music-particles");
const careParticles = document.getElementById("care-particles");
const kissParticles = document.getElementById("kiss-particles");

const maxScore = 100000;
const maxLevel = 1000;
const maxGlobalHeartCount = 10n ** 48n;
const heartBlossomMilestone = 10000n;
const heartBlossomDuration = 24 * 60 * 60 * 1000;
const heartBlossomStorageKey = "loveEarthHeartBlossomTriggeredAt";
const worldTreeStartDate = { year: 2026, month: 4, day: 22 };
const oneDayMilliseconds = 24 * 60 * 60 * 1000;
const pointsPerAction = 10;
let globalHeartCount = 0n;
const scores = {
  clean: 0,
  love: 0,
  smile: 0,
  harmony: 0
};
let treeGlowTimeout;
let earthRaysTimeout;
let taiwanTimeInterval;
let earthMessageTimeout;
let cleanEffectTimeout;
let heartBlossomTimeout;
let selectedLanguage = "en";

const earthMessageLabels = {
  en: [
    "How are you today?",
    "Today will be a beautiful day.",
    "May good luck come to you.",
    "Wishing us a very happy day today.",
    "Thank you. Love you."
  ],
  "zh-TW": [
    "\u4ECA\u5929\u904E\u5F97\u597D\u55CE\uFF1F",
    "\u4ECA\u5929\u4E00\u5B9A\u662F\u7F8E\u597D\u7684\u4E00\u5929\u3002",
    "\u9858\u597D\u904B\u964D\u81E8\u5728\u4F60\u8EAB\u908A\u3002",
    "\u795D\u798F\u6211\u5011\u4ECA\u5929\u90FD\u5F88\u5FEB\u6A02\u3002",
    "\u8B1D\u8B1D\u4F60\uFF0C\u6211\u611B\u4F60\u3002"
  ],
  "zh-CN": [
    "\u4ECA\u5929\u8FC7\u5F97\u597D\u5417\uFF1F",
    "\u4ECA\u5929\u4E00\u5B9A\u662F\u7F8E\u597D\u7684\u4E00\u5929\u3002",
    "\u613F\u597D\u8FD0\u964D\u4E34\u5728\u4F60\u8EAB\u8FB9\u3002",
    "\u795D\u613F\u6211\u4EEC\u4ECA\u5929\u90FD\u5F88\u5FEB\u4E50\u3002",
    "\u8C22\u8C22\u4F60\uFF0C\u6211\u7231\u4F60\u3002"
  ],
  fr: [
    "Comment \u00E7a va aujourd\u2019hui ?",
    "Aujourd\u2019hui sera une belle journ\u00E9e.",
    "Que la chance t\u2019accompagne.",
    "Je nous souhaite une journ\u00E9e pleine de joie.",
    "Merci, je t\u2019aime."
  ],
  es: [
    "\u00BFC\u00F3mo est\u00E1s hoy?",
    "Hoy ser\u00E1 un d\u00EDa hermoso.",
    "Que la buena suerte te acompa\u00F1e.",
    "Deseo que tengamos un d\u00EDa muy feliz.",
    "Gracias, te quiero."
  ],
  ja: [
    "\u4ECA\u65E5\u306F\u5143\u6C17\u3067\u3059\u304B\uFF1F",
    "\u4ECA\u65E5\u306F\u304D\u3063\u3068\u7D20\u6575\u306A\u4E00\u65E5\u306B\u306A\u308A\u307E\u3059\u3002",
    "\u5E78\u904B\u304C\u3042\u306A\u305F\u306B\u8A2A\u308C\u307E\u3059\u3088\u3046\u306B\u3002",
    "\u4ECA\u65E5\u306F\u307F\u3093\u306A\u304C\u5E78\u305B\u3067\u3042\u308A\u307E\u3059\u3088\u3046\u306B\u3002",
    "\u3042\u308A\u304C\u3068\u3046\u3001\u5927\u597D\u304D\u3002"
  ],
  ru: [
    "\u041A\u0430\u043A \u0442\u044B \u0441\u0435\u0433\u043E\u0434\u043D\u044F\uFF1F",
    "\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0431\u0443\u0434\u0435\u0442 \u043F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u0434\u0435\u043D\u044C.",
    "\u041F\u0443\u0441\u0442\u044C \u0443\u0434\u0430\u0447\u0430 \u0431\u0443\u0434\u0435\u0442 \u0441 \u0442\u043E\u0431\u043E\u0439.",
    "\u0416\u0435\u043B\u0430\u044E \u043D\u0430\u043C \u0432\u0441\u0435\u043C \u0441\u0447\u0430\u0441\u0442\u043B\u0438\u0432\u043E\u0433\u043E \u0434\u043D\u044F.",
    "\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u044F \u0442\u0435\u0431\u044F \u043B\u044E\u0431\u043B\u044E."
  ]
};

const heartThankYouMessages = {
  en: "Thank you for loving the EARTH.",
  "zh-TW": "\u8B1D\u8B1D\u4F60\u611B\u5730\u7403\u3002",
  "zh-CN": "\u8C22\u8C22\u4F60\u7231\u5730\u7403\u3002",
  fr: "Merci d\u2019aimer la TERRE.",
  es: "Gracias por amar la TIERRA.",
  ja: "\u5730\u7403\u3092\u611B\u3057\u3066\u304F\u308C\u3066\u3042\u308A\u304C\u3068\u3046\u3002",
  ru: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u0447\u0442\u043E \u043B\u044E\u0431\u0438\u0448\u044C \u0417\u0415\u041C\u041B\u042E."
};

const cleanMenuLabels = {
  en: {
    recycle: "Recycling",
    eco: "Clean Environment",
    beach: "Beach Cleanup",
    energy: "Clean Energy",
    ocean: "Ocean Cleanup"
  },
  "zh-TW": {
    recycle: "\u8CC7\u6E90\u56DE\u6536",
    eco: "\u74B0\u5883\u6E05\u6F54",
    beach: "\u6DE8\u7058",
    energy: "\u6F54\u6DE8\u80FD\u6E90",
    ocean: "\u6D77\u6D0B\u6E05\u7406"
  },
  "zh-CN": {
    recycle: "\u8D44\u6E90\u56DE\u6536",
    eco: "\u73AF\u5883\u6E05\u6D01",
    beach: "\u51C0\u6EE9",
    energy: "\u6E05\u6D01\u80FD\u6E90",
    ocean: "\u6D77\u6D0B\u6E05\u7406"
  },
  fr: {
    recycle: "Recyclage",
    eco: "Nettoyage de l\u2019environnement",
    beach: "Nettoyage des plages",
    energy: "\u00C9nergie propre",
    ocean: "Nettoyage des oc\u00E9ans"
  },
  es: {
    recycle: "Reciclaje",
    eco: "Limpieza del entorno",
    beach: "Limpieza de playas",
    energy: "Energ\u00EDa limpia",
    ocean: "Limpieza del oc\u00E9ano"
  },
  ja: {
    recycle: "\u30EA\u30B5\u30A4\u30AF\u30EB",
    eco: "\u74B0\u5883\u6E05\u6383",
    beach: "\u30D3\u30FC\u30C1\u6E05\u6383",
    energy: "\u30AF\u30EA\u30FC\u30F3\u30A8\u30CD\u30EB\u30AE\u30FC",
    ocean: "\u6D77\u6D0B\u30AF\u30EA\u30FC\u30F3"
  },
  ru: {
    recycle: "\u041F\u0435\u0440\u0435\u0440\u0430\u0431\u043E\u0442\u043A\u0430",
    eco: "\u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u043E\u043A\u0440\u0443\u0436\u0430\u044E\u0449\u0435\u0439 \u0441\u0440\u0435\u0434\u044B",
    beach: "\u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u043F\u043B\u044F\u0436\u0435\u0439",
    energy: "\u0427\u0438\u0441\u0442\u0430\u044F \u044D\u043D\u0435\u0440\u0433\u0438\u044F",
    ocean: "\u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u043E\u043A\u0435\u0430\u043D\u0430"
  }
};

const mainButtonLabels = {
  en: {
    clean: "Clean",
    heart: "Heart",
    care: "Care",
    music: "Music",
    kiss: "Kiss"
  },
  "zh-TW": {
    clean: "\u6E05\u6F54",
    heart: "\u611B\u5FC3",
    care: "\u516C\u76CA",
    music: "\u97F3\u6A02",
    kiss: "\u89AA\u89AA"
  },
  "zh-CN": {
    clean: "\u6E05\u6D01",
    heart: "\u7231\u5FC3",
    care: "\u516C\u76CA",
    music: "\u97F3\u4E50",
    kiss: "\u4EB2\u4EB2"
  },
  fr: {
    clean: "Nettoyer",
    heart: "Amour",
    care: "Solidarit\u00E9",
    music: "Musique",
    kiss: "Bisou"
  },
  es: {
    clean: "Limpiar",
    heart: "Amor",
    care: "Solidaridad",
    music: "M\u00FAsica",
    kiss: "Besito"
  },
  ja: {
    clean: "\u30AF\u30EA\u30FC\u30F3",
    heart: "\u611B",
    care: "\u52A9\u3051\u5408\u3044",
    music: "\u97F3\u697D",
    kiss: "\u30C1\u30E5\u30C3"
  },
  ru: {
    clean: "\u0427\u0438\u0441\u0442\u043A\u0430",
    heart: "\u041B\u044E\u0431\u043E\u0432\u044C",
    care: "\u0417\u0430\u0431\u043E\u0442\u0430",
    music: "\u041C\u0443\u0437\u044B\u043A\u0430",
    kiss: "\u041F\u043E\u0446\u0435\u043B\u0443\u0439"
  }
};

const titleLabels = {
  en: {
    title: "LOVE & EARTH",
    subtitle: "Clean the EARTH"
  },
  "zh-TW": {
    title: "\u611B\u5FC3\u5730\u7403",
    subtitle: "\u4E00\u8D77\u6E05\u6F54\u5730\u7403"
  },
  "zh-CN": {
    title: "\u7231\u5FC3\u5730\u7403",
    subtitle: "\u4E00\u8D77\u6E05\u6D01\u5730\u7403"
  },
  fr: {
    title: "Amour & Terre",
    subtitle: "Nettoyons la Terre"
  },
  es: {
    title: "Amor y Tierra",
    subtitle: "Limpiemos la Tierra"
  },
  ja: {
    title: "\u611B\u306E\u5730\u7403",
    subtitle: "\u5730\u7403\u3092\u304D\u308C\u3044\u306B\u3057\u3088\u3046"
  },
  ru: {
    title: "\u041B\u044E\u0431\u043E\u0432\u044C \u0438 \u0417\u0435\u043C\u043B\u044F",
    subtitle: "\u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u043E\u0447\u0438\u0441\u0442\u0438\u043C \u0417\u0435\u043C\u043B\u044E"
  }
};

function updateCleanMenuLanguage(language) {
  const labels = cleanMenuLabels[language] ?? cleanMenuLabels.en;

  cleanLabelElements.forEach((labelElement) => {
    const labelKey = labelElement.dataset.cleanLabel;
    if (labels[labelKey]) {
      labelElement.textContent = labels[labelKey];
    }
  });
}

function updateMainButtonLanguage(language) {
  const labels = mainButtonLabels[language] ?? mainButtonLabels.en;

  mainLabelElements.forEach((labelElement) => {
    const labelKey = labelElement.dataset.mainLabel;
    if (labels[labelKey]) {
      labelElement.textContent = labels[labelKey];
    }
  });
}

function updateTitleLanguage(language) {
  const labels = titleLabels[language] ?? titleLabels.en;
  mainTitleElement.textContent = labels.title;
  mainSubtitleElement.textContent = labels.subtitle;
  mainSubtitleElement.classList.toggle("subtitle-japanese", language === "ja");
  mainSubtitleElement.classList.toggle("subtitle-russian", language === "ru");
}

function getTotalScore() {
  return scores.clean + scores.love + scores.smile + scores.harmony;
}

function getLevel() {
  return Math.min(maxLevel, Math.floor(getTotalScore() / 100) + 1);
}

function formatTaiwanTime() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());

  const get = (type) => parts.find((part) => part.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

function updateTaiwanTime() {
  taiwanTimeElement.textContent = formatTaiwanTime();
  updateWorldTreeAge();
}

function getTaiwanDateParts() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const get = (type) => Number(parts.find((part) => part.type === type)?.value ?? "0");
  return {
    year: get("year"),
    month: get("month"),
    day: get("day")
  };
}

function updateWorldTreeAge() {
  const taiwanDate = getTaiwanDateParts();
  const startUtc = Date.UTC(
    worldTreeStartDate.year,
    worldTreeStartDate.month - 1,
    worldTreeStartDate.day
  );
  const currentUtc = Date.UTC(taiwanDate.year, taiwanDate.month - 1, taiwanDate.day);
  const ageDays = Math.max(0, Math.floor((currentUtc - startUtc) / oneDayMilliseconds));
  treeAgeDaysElement.textContent = `${ageDays} DAYS`;
}

function updateGlobalHeartCounter() {
  globalHeartCountElement.textContent = globalHeartCount.toString();
}

function addGlobalHeart() {
  if (globalHeartCount >= maxGlobalHeartCount) {
    updateGlobalHeartCounter();
    return;
  }

  globalHeartCount += 1n;
  updateGlobalHeartCounter();

  if (globalHeartCount % heartBlossomMilestone === 0n) {
    triggerHeartBlossom();
  }
}

function triggerHeartBlossom() {
  const triggeredAt = Date.now();
  localStorage.setItem(heartBlossomStorageKey, String(triggeredAt));
  showHeartBlossom(triggeredAt);
}

function showHeartBlossom(triggeredAt) {
  const remainingTime = heartBlossomDuration - (Date.now() - triggeredAt);

  window.clearTimeout(heartBlossomTimeout);
  treeElement.classList.remove("hide-heart-blossom");
  treeElement.classList.remove("show-heart-blossom");
  void heartBlossomElement.offsetWidth;
  treeElement.classList.add("show-heart-blossom");

  if (remainingTime <= 0) {
    removeHeartBlossom(false);
    return;
  }

  heartBlossomTimeout = window.setTimeout(() => {
    removeHeartBlossom(true);
  }, remainingTime);
}

function removeHeartBlossom(animate) {
  window.clearTimeout(heartBlossomTimeout);
  localStorage.removeItem(heartBlossomStorageKey);

  if (!treeElement.classList.contains("show-heart-blossom")) {
    return;
  }

  if (!animate) {
    treeElement.classList.remove("show-heart-blossom");
    treeElement.classList.remove("hide-heart-blossom");
    return;
  }

  treeElement.classList.add("hide-heart-blossom");
  window.setTimeout(() => {
    treeElement.classList.remove("show-heart-blossom");
    treeElement.classList.remove("hide-heart-blossom");
  }, 900);
}

function restoreHeartBlossom() {
  const storedTimestamp = Number(localStorage.getItem(heartBlossomStorageKey));

  if (!Number.isFinite(storedTimestamp) || storedTimestamp <= 0) {
    localStorage.removeItem(heartBlossomStorageKey);
    return;
  }

  if (Date.now() - storedTimestamp >= heartBlossomDuration) {
    removeHeartBlossom(false);
    return;
  }

  showHeartBlossom(storedTimestamp);
}

function updateMusicToggle(isPlaying) {
  musicToggleButton.textContent = isPlaying ? "Music ON" : "Music OFF";
  musicToggleButton.setAttribute("aria-pressed", String(isPlaying));
  musicToggleButton.classList.toggle("is-playing", isPlaying);
}

function showEarthMessage(customMessage) {
  const messages = earthMessageLabels[selectedLanguage] ?? earthMessageLabels.en;
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  window.clearTimeout(earthMessageTimeout);
  earthMessageElement.classList.remove("is-visible");
  earthMessageElement.textContent = customMessage ?? randomMessage;
  void earthMessageElement.offsetWidth;
  earthMessageElement.classList.add("is-visible");
  earthMessageTimeout = window.setTimeout(() => {
    earthMessageElement.classList.remove("is-visible");
  }, 2600);
}

function getTreeStage(scoreValue) {
  if (scoreValue <= 50) {
    return {
      label: "Seedling",
      height: 0.58,
      width: 0.48,
      branches: 0.4,
      canopyLift: -2,
      trunkWidth: 18,
      trunkHeight: 46,
      trunkShift: -9,
      branchWidth: 16,
      branchHeight: 10,
      branchTop: 96,
      branchOffset: 52,
      branchReach: 8,
      rootOffset: 58,
      canopyBackWidth: 58,
      canopyBackHeight: 42,
      canopyBackLeft: 54,
      canopyBackTop: 72,
      canopySideWidth: 34,
      canopySideHeight: 30,
      canopySideTop: 88,
      canopyTopWidth: 38,
      canopyTopHeight: 34,
      canopyTopLeft: 64,
      canopyTopTop: 54
    };
  }

  if (scoreValue <= 100) {
    return {
      label: "Small Tree",
      height: 0.78,
      width: 0.72,
      branches: 0.7,
      canopyLift: 2,
      trunkWidth: 24,
      trunkHeight: 62,
      trunkShift: -12,
      branchWidth: 24,
      branchHeight: 12,
      branchTop: 90,
      branchOffset: 40,
      branchReach: 12,
      rootOffset: 48,
      canopyBackWidth: 80,
      canopyBackHeight: 58,
      canopyBackLeft: 42,
      canopyBackTop: 56,
      canopySideWidth: 52,
      canopySideHeight: 46,
      canopySideTop: 74,
      canopyTopWidth: 58,
      canopyTopHeight: 52,
      canopyTopLeft: 52,
      canopyTopTop: 36
    };
  }

  if (scoreValue <= 150) {
    return {
      label: "Medium Tree",
      height: 0.96,
      width: 0.92,
      branches: 0.95,
      canopyLift: 6,
      trunkWidth: 30,
      trunkHeight: 78,
      trunkShift: -15,
      branchWidth: 32,
      branchHeight: 14,
      branchTop: 86,
      branchOffset: 30,
      branchReach: 14,
      rootOffset: 40,
      canopyBackWidth: 102,
      canopyBackHeight: 72,
      canopyBackLeft: 28,
      canopyBackTop: 44,
      canopySideWidth: 68,
      canopySideHeight: 58,
      canopySideTop: 62,
      canopyTopWidth: 76,
      canopyTopHeight: 66,
      canopyTopLeft: 44,
      canopyTopTop: 20
    };
  }

  if (scoreValue <= 200) {
    return {
      label: "Large Tree",
      height: 1.08,
      width: 1.08,
      branches: 1.12,
      canopyLift: 10,
      trunkWidth: 34,
      trunkHeight: 86,
      trunkShift: -17,
      branchWidth: 38,
      branchHeight: 16,
      branchTop: 84,
      branchOffset: 24,
      branchReach: 16,
      rootOffset: 36,
      canopyBackWidth: 118,
      canopyBackHeight: 82,
      canopyBackLeft: 22,
      canopyBackTop: 38,
      canopySideWidth: 80,
      canopySideHeight: 68,
      canopySideTop: 56,
      canopyTopWidth: 88,
      canopyTopHeight: 74,
      canopyTopLeft: 38,
      canopyTopTop: 12
    };
  }

  return {
    label: "Giant World Tree",
    height: 1.14,
    width: 1.32,
    branches: 1.42,
    canopyLift: 14,
    trunkWidth: 38,
    trunkHeight: 92,
    trunkShift: -19,
    branchWidth: 42,
    branchHeight: 18,
    branchTop: 82,
    branchOffset: 14,
    branchReach: 22,
    rootOffset: 32,
    canopyBackWidth: 142,
    canopyBackHeight: 88,
    canopyBackLeft: 12,
    canopyBackTop: 34,
    canopySideWidth: 98,
    canopySideHeight: 76,
    canopySideTop: 50,
    canopyTopWidth: 106,
    canopyTopHeight: 80,
    canopyTopLeft: 30,
    canopyTopTop: 6
  };
}

function updateHud() {
  const totalScore = getTotalScore();
  const treeGrowth = getTreeStage(totalScore);
  levelElement.textContent = String(getLevel());
  cleanScoreElement.textContent = String(scores.clean);
  loveScoreElement.textContent = String(scores.love);
  smileScoreElement.textContent = String(scores.smile);
  harmonyScoreElement.textContent = String(scores.harmony);
  treeElement.style.setProperty("--tree-height-scale", treeGrowth.height.toFixed(2));
  treeElement.style.setProperty("--tree-width-scale", treeGrowth.width.toFixed(2));
  treeElement.style.setProperty("--branch-spread", treeGrowth.branches.toFixed(2));
  treeElement.style.setProperty("--canopy-lift", `${treeGrowth.canopyLift.toFixed(1)}px`);
  treeElement.style.setProperty("--trunk-width", `${treeGrowth.trunkWidth}px`);
  treeElement.style.setProperty("--trunk-height", `${treeGrowth.trunkHeight}px`);
  treeElement.style.setProperty("--trunk-shift", `${treeGrowth.trunkShift}px`);
  treeElement.style.setProperty("--branch-width", `${treeGrowth.branchWidth}px`);
  treeElement.style.setProperty("--branch-height", `${treeGrowth.branchHeight}px`);
  treeElement.style.setProperty("--branch-top", `${treeGrowth.branchTop}px`);
  treeElement.style.setProperty("--branch-offset", `${treeGrowth.branchOffset}px`);
  treeElement.style.setProperty("--branch-reach", `${treeGrowth.branchReach}px`);
  treeElement.style.setProperty("--root-offset", `${treeGrowth.rootOffset}px`);
  treeElement.style.setProperty("--canopy-back-width", `${treeGrowth.canopyBackWidth}px`);
  treeElement.style.setProperty("--canopy-back-height", `${treeGrowth.canopyBackHeight}px`);
  treeElement.style.setProperty("--canopy-back-left", `${treeGrowth.canopyBackLeft}px`);
  treeElement.style.setProperty("--canopy-back-top", `${treeGrowth.canopyBackTop}px`);
  treeElement.style.setProperty("--canopy-side-width", `${treeGrowth.canopySideWidth}px`);
  treeElement.style.setProperty("--canopy-side-height", `${treeGrowth.canopySideHeight}px`);
  treeElement.style.setProperty("--canopy-side-top", `${treeGrowth.canopySideTop}px`);
  treeElement.style.setProperty("--canopy-top-width", `${treeGrowth.canopyTopWidth}px`);
  treeElement.style.setProperty("--canopy-top-height", `${treeGrowth.canopyTopHeight}px`);
  treeElement.style.setProperty("--canopy-top-left", `${treeGrowth.canopyTopLeft}px`);
  treeElement.style.setProperty("--canopy-top-top", `${treeGrowth.canopyTopTop}px`);
  sceneElement.classList.toggle("has-bird", totalScore >= 20);
  sceneElement.classList.toggle("has-squirrel", totalScore >= 40);
  sceneElement.classList.toggle("has-fish", totalScore >= 60);
  sceneElement.classList.toggle("greener-earth", totalScore >= 80);
  sceneElement.classList.toggle("has-wreath", totalScore >= 100);
  sceneElement.classList.toggle("has-rainbow", totalScore >= 120);
  sceneElement.classList.toggle("has-star", totalScore >= 140);
  sceneElement.classList.toggle("has-orbit-hearts", totalScore >= 160);

  if (totalScore >= maxScore) {
    messageElement.textContent = "The world tree is fully blessed. Earth has reached 100000 points.";
    return;
  }

  if (!cleanMenu.hidden) {
    messageElement.textContent = "Choose a heart action to help Earth and grow the world tree.";
    return;
  }

  if (!rainbowMenu.hidden) {
    messageElement.textContent = "Pick a rainbow heart and send magical love around Earth.";
    return;
  }

  messageElement.textContent = "Press Clean or Heart to share kind magic with Earth and grow the world tree.";
}

function addPoints(type, amount) {
  const totalScore = getTotalScore();
  if (totalScore >= maxScore) {
    updateHud();
    return;
  }

  const allowedAmount = Math.min(amount, maxScore - totalScore);
  scores[type] += allowedAmount;
  updateHud();
}

function triggerTreeGlow() {
  window.clearTimeout(treeGlowTimeout);
  treeElement.classList.remove("effect-glow");
  void treeElement.offsetWidth;
  treeElement.classList.add("effect-glow");
  treeGlowTimeout = window.setTimeout(() => {
    treeElement.classList.remove("effect-glow");
  }, 1500);
}

function triggerEarthRays() {
  window.clearTimeout(earthRaysTimeout);
  earthRaysElement.classList.remove("effect-rays");
  void earthRaysElement.offsetWidth;
  earthRaysElement.classList.add("effect-rays");
  earthRaysTimeout = window.setTimeout(() => {
    earthRaysElement.classList.remove("effect-rays");
  }, 900);
}

function hideMenus() {
  cleanMenu.hidden = true;
  rainbowMenu.hidden = true;
}

function playCleanEffect(effectName) {
  const activeEffects = cleanEffectsContainer.querySelectorAll(".clean-effect");
  window.clearTimeout(cleanEffectTimeout);
  activeEffects.forEach((effect) => effect.classList.remove("is-active"));

  const targetEffect = document.getElementById(`${effectName}-effect`);
  if (!targetEffect) {
    return;
  }

  if (effectName === "energy") {
    createCleanEnergyBurst();
  }

  void targetEffect.offsetWidth;
  targetEffect.classList.add("is-active");
  cleanEffectTimeout = window.setTimeout(() => {
    targetEffect.classList.remove("is-active");
  }, 2600);
}

function createCleanEnergyBurst() {
  if (!energyCore) {
    return;
  }

  const oldBolts = energyCore.querySelectorAll(".energy-bolt");
  oldBolts.forEach((bolt) => bolt.remove());

  const totalBolts = 10;

  for (let i = 0; i < totalBolts; i += 1) {
    const bolt = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 18;
    const originX = Math.cos(angle) * distance;
    const originY = Math.sin(angle) * distance * 0.82;
    const driftX = (Math.cos(angle) * (18 + Math.random() * 22)) + (-6 + Math.random() * 12);
    const driftY = -(34 + Math.random() * 34);
    const size = `${14 + Math.random() * 12}px`;
    const rotation = `${-16 + Math.random() * 32}deg`;

    bolt.className = "energy-bolt";
    bolt.textContent = "\u26A1";
    bolt.style.setProperty("--energy-x", `${originX}px`);
    bolt.style.setProperty("--energy-y", `${originY}px`);
    bolt.style.setProperty("--energy-drift-x", `${driftX}px`);
    bolt.style.setProperty("--energy-drift-y", `${driftY}px`);
    bolt.style.setProperty("--energy-size", size);
    bolt.style.setProperty("--energy-rotate", rotation);
    bolt.style.animationDelay = `${i * 95}ms`;
    energyCore.appendChild(bolt);
    window.setTimeout(() => bolt.remove(), 2000);
  }
}

function createHeartBurst(color) {
  const totalHearts = 14;

  for (let i = 0; i < totalHearts; i += 1) {
    const heart = document.createElement("span");
    const spread = -50 + Math.random() * 100;
    const lift = -(60 + Math.random() * 90);
    const left = 50 + (-18 + Math.random() * 36);
    const top = 50 + (-6 + Math.random() * 18);
    const size = `${20 + Math.random() * 18}px`;

    heart.className = "heart-burst";
    heart.textContent = "\u2665";
    heart.style.setProperty("--heart-color", color);
    heart.style.setProperty("--heart-left", `${left}%`);
    heart.style.setProperty("--heart-top", `${top}%`);
    heart.style.setProperty("--heart-size", size);
    heart.style.setProperty("--drift-x", `${spread}px`);
    heart.style.setProperty("--drift-y", `${lift}px`);

    heartParticles.appendChild(heart);
    window.setTimeout(() => heart.remove(), 2600);
  }
}

function createMusicBurst() {
  const noteSymbols = ["\u266A", "\u266B", "\u266C"];
  const noteColors = ["#ff7ea8", "#ffbb52", "#7edb72", "#67b2ff", "#9a7cff"];
  const totalNotes = 12;

  for (let i = 0; i < totalNotes; i += 1) {
    const note = document.createElement("span");
    const spread = -56 + Math.random() * 112;
    const lift = -(70 + Math.random() * 96);
    const left = 50 + (-20 + Math.random() * 40);
    const top = 50 + (-8 + Math.random() * 20);
    const size = `${18 + Math.random() * 18}px`;

    note.className = "music-note";
    note.textContent = noteSymbols[i % noteSymbols.length];
    note.style.setProperty("--note-color", noteColors[i % noteColors.length]);
    note.style.setProperty("--note-left", `${left}%`);
    note.style.setProperty("--note-top", `${top}%`);
    note.style.setProperty("--note-size", size);
    note.style.setProperty("--note-drift-x", `${spread}px`);
    note.style.setProperty("--note-drift-y", `${lift}px`);

    musicParticles.appendChild(note);
    window.setTimeout(() => note.remove(), 2800);
  }
}

function createCareBurst() {
  const ringColors = [
    "rgba(255, 214, 120, 0.34)",
    "rgba(118, 214, 255, 0.3)",
    "rgba(180, 130, 255, 0.28)",
    "rgba(255, 161, 205, 0.26)",
    "rgba(144, 240, 186, 0.26)",
    "rgba(255, 232, 145, 0.24)"
  ];
  const lightColors = ["#ffd65c", "#ff8fb4", "#7ad8ff", "#9e84ff", "#7ce38d"];
  const totalLights = 12;
  const totalRings = 18;

  for (let index = 0; index < totalRings; index += 1) {
    const color = ringColors[index % ringColors.length];
    const ring = document.createElement("span");
    ring.className = "care-ring";
    ring.style.setProperty("--ring-color", color);
    ring.style.setProperty("--ring-size", `${120 + (index % 3) * 8}px`);
    ring.style.animationDelay = `${index * 90}ms`;
    careParticles.appendChild(ring);
    window.setTimeout(() => ring.remove(), 2800);
  }

  for (let i = 0; i < totalLights; i += 1) {
    const light = document.createElement("span");
    const spread = -64 + Math.random() * 128;
    const lift = -(30 + Math.random() * 75);
    const size = `${12 + Math.random() * 12}px`;

    light.className = "care-light";
    light.textContent = "\u2022";
    light.style.setProperty("--light-color", lightColors[i % lightColors.length]);
    light.style.setProperty("--light-size", size);
    light.style.setProperty("--light-drift-x", `${spread}px`);
    light.style.setProperty("--light-drift-y", `${lift}px`);

    careParticles.appendChild(light);
    window.setTimeout(() => light.remove(), 2200);
  }
}

function createKissBurst() {
  const kissColors = ["#ff5f86", "#ff7aa2", "#ff4f74", "#ff8faf", "#f2557b", "#ff96b8"];
  const totalKisses = 12;
  const ring = document.createElement("div");

  ring.className = "kiss-ring";

  for (let i = 0; i < totalKisses; i += 1) {
    const kiss = document.createElement("span");
    const angle = (Math.PI * 2 * i) / totalKisses - Math.PI / 2;
    const radiusX = 122 + Math.random() * 14;
    const radiusY = 102 + Math.random() * 12;
    const x = `${Math.cos(angle) * radiusX}px`;
    const y = `${Math.sin(angle) * radiusY}px`;
    const rotation = `${-18 + Math.random() * 36}deg`;
    const size = `${18 + Math.random() * 8}px`;

    kiss.className = "kiss-mark";
    kiss.textContent = "\uD83D\uDC8B";
    kiss.style.setProperty("--kiss-color", kissColors[i % kissColors.length]);
    kiss.style.setProperty("--kiss-size", size);
    kiss.style.setProperty("--kiss-x", x);
    kiss.style.setProperty("--kiss-y", y);
    kiss.style.setProperty("--kiss-rotate", rotation);
    ring.appendChild(kiss);
  }

  kissParticles.appendChild(ring);
  window.setTimeout(() => ring.remove(), 3200);
}

cleanButton.addEventListener("click", () => {
  rainbowMenu.hidden = true;
  cleanMenu.hidden = !cleanMenu.hidden;
  triggerTreeGlow();
  updateHud();
});

earthElement.addEventListener("click", () => {
  earthElement.classList.remove("is-bouncing");
  void earthElement.offsetWidth;
  earthElement.classList.add("is-bouncing");
  showEarthMessage();
  window.setTimeout(() => {
    earthElement.classList.remove("is-bouncing");
  }, 260);
});

heartButton.addEventListener("click", () => {
  cleanMenu.hidden = true;
  rainbowMenu.hidden = !rainbowMenu.hidden;
  addPoints("love", pointsPerAction);
  updateHud();
});

[charityButton, musicButton, kissButton].forEach((button) => {
  button.addEventListener("click", () => {
    hideMenus();
    if (button === charityButton) {
      createCareBurst();
      triggerEarthRays();
      addPoints("harmony", pointsPerAction);
      messageElement.textContent = "Care waves are glowing gently around Earth.";
      return;
    }

    if (button === musicButton) {
      createMusicBurst();
      triggerTreeGlow();
      triggerEarthRays();
      addPoints("smile", pointsPerAction);
      messageElement.textContent = "Colorful music notes are floating around Earth.";
      return;
    }

    if (button === kissButton) {
      createKissBurst();
      triggerEarthRays();
      addPoints("love", pointsPerAction);
      messageElement.textContent = "Earth is being surrounded by playful love and affection.";
      return;
    }

    messageElement.textContent = `${button.textContent} is ready for a future magical action.`;
  });
});

heartOptions.forEach((optionButton) => {
  optionButton.addEventListener("click", () => {
    addPoints("clean", pointsPerAction);
    triggerTreeGlow();
    playCleanEffect(optionButton.dataset.cleanEffect);
    if (getTotalScore() < maxScore) {
      const label = optionButton.querySelector(".heart-option-label")?.textContent ?? optionButton.textContent;
      messageElement.textContent = `${label} added 10 CLEAN points for Earth.`;
    }
  });
});

rainbowHearts.forEach((rainbowHeartButton) => {
  rainbowHeartButton.addEventListener("click", () => {
    createHeartBurst(rainbowHeartButton.dataset.heartColor);
    triggerEarthRays();
    addGlobalHeart();
    addPoints("love", pointsPerAction);
    showEarthMessage(heartThankYouMessages[selectedLanguage] ?? heartThankYouMessages.en);
    messageElement.textContent = `${rainbowHeartButton.getAttribute("aria-label")} magic is sparkling around Earth.`;
  });
});

languageButtons.forEach((languageButton) => {
  languageButton.addEventListener("click", () => {
    selectedLanguage = languageButton.dataset.language;
    updateCleanMenuLanguage(selectedLanguage);
    updateMainButtonLanguage(selectedLanguage);
    updateTitleLanguage(selectedLanguage);
    languageScreen.classList.add("is-hidden");
  });
});

musicToggleButton.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      updateMusicToggle(true);
    } catch (error) {
      updateMusicToggle(false);
      messageElement.textContent = "Music could not start. Please try again.";
    }
    return;
  }

  backgroundMusic.pause();
  updateMusicToggle(false);
});

resetButton.addEventListener("click", () => {
  globalHeartCount = 0n;
  scores.clean = 0;
  scores.love = 0;
  scores.smile = 0;
  scores.harmony = 0;
  hideMenus();
  heartParticles.innerHTML = "";
  musicParticles.innerHTML = "";
  careParticles.innerHTML = "";
  kissParticles.innerHTML = "";
  cleanEffectsContainer.querySelectorAll(".clean-effect").forEach((effect) => {
    effect.classList.remove("is-active");
  });
  removeHeartBlossom(false);
  treeElement.classList.remove("effect-glow");
  earthRaysElement.classList.remove("effect-rays");
  earthMessageElement.classList.remove("is-visible");
  earthMessageElement.textContent = "";
  updateGlobalHeartCounter();
  updateHud();
});

updateHud();
updateGlobalHeartCounter();
restoreHeartBlossom();
updateTaiwanTime();
window.clearInterval(taiwanTimeInterval);
taiwanTimeInterval = window.setInterval(updateTaiwanTime, 1000);
