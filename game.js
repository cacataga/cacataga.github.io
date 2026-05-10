const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ui = {
  time: document.getElementById("time-value"),
  score: document.getElementById("score-value"),
  combo: document.getElementById("combo-value"),
  accuracy: document.getElementById("accuracy-value"),
  player: document.getElementById("player-value"),
  level: document.getElementById("level-value"),
  start: document.getElementById("start-btn"),
  restart: document.getElementById("restart-btn"),
  review: document.getElementById("review-btn"),
  fullscreen: document.getElementById("fullscreen-btn"),
  speech: document.getElementById("speech-btn"),
  sound: document.getElementById("sound-btn"),
  playerName: document.getElementById("player-name"),
  playerNameBottom: document.getElementById("player-name-bottom"),
  levelSelect: document.getElementById("level-select"),
  levelSelectBottom: document.getElementById("level-select-bottom"),
  modeSelect: document.getElementById("mode-select"),
  modeSelectBottom: document.getElementById("mode-select-bottom"),
  durationSelect: document.getElementById("duration-select"),
  durationSelectBottom: document.getElementById("duration-select-bottom"),
  hintSelect: document.getElementById("hint-select"),
  hintSelectBottom: document.getElementById("hint-select-bottom"),
  voiceSelect: document.getElementById("voice-select"),
  letterRate: document.getElementById("letter-rate"),
  letterRateValue: document.getElementById("letter-rate-value"),
  wordRate: document.getElementById("word-rate"),
  wordRateValue: document.getElementById("word-rate-value"),
  hardWords: document.getElementById("hard-words-list"),
  mistakeLog: document.getElementById("mistake-log-list"),
  reviewSummary: document.getElementById("review-summary"),
  wordImage: document.getElementById("word-image"),
  imagePlaceholder: document.getElementById("image-placeholder"),
};

const STORAGE_KEY = "phrase-sprint-records-v1";
const SOUND_STORAGE_KEY = "phrase-sprint-sound-v1";
const SPEECH_STORAGE_KEY = "phrase-sprint-speech-v1";
const HINT_STORAGE_KEY = "phrase-sprint-hint-v1";
const VOICE_STORAGE_KEY = "phrase-sprint-voice-v1";
const LETTER_RATE_STORAGE_KEY = "phrase-sprint-letter-rate-v1";
const WORD_RATE_STORAGE_KEY = "phrase-sprint-word-rate-v1";
const DEFAULT_ROUND_SECONDS = 60;
const TEST_MODE_WORD_ID = new URLSearchParams(window.location.search).get("testWordId");
const PREFERRED_VOICE_NAME = "Kathy";
const PREFERRED_VOICE_LANG = "en-US";
const LETTER_SPEECH = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E",
  f: "F",
  g: "G",
  h: "H",
  i: "I",
  j: "J",
  k: "K",
  l: "L",
  m: "M",
  n: "N",
  o: "O",
  p: "P",
  q: "Q",
  r: "R",
  s: "S",
  t: "T",
  u: "U",
  v: "V",
  w: "W",
  x: "X",
  y: "Y",
  z: "Z",
};
const FALLBACK_WORDS_CSV = `単語ID,日本語,英語,出題の有無
demo-abba,テスト用,abba,0
halloween,ハロウィン,Halloween,1
eraser,消しゴム,eraser,1
mouse,マウス,mouse,1
map,地図,map,1
tissue,ティッシュ,tissue,1
air-conditioner,エアコン,air conditioner,1
temple,寺,temple,1
solar,太陽の,solar,1
rice-ball,おにぎり,rice ball,1
cherry-blossoms,桜,cherry blossoms,1
seed,種,seed,1
waterfall,滝,waterfall,1
junior-high-school,中学生,junior high school,1
ball-point-pen,ボールペン,ball point pen,1
ax,斧,ax,1
plant,植物,plant,1
bald,ハゲ,bald,1
tooth-brush,歯ブラシ,tooth brush,1
house,家,house,1
rice,米,rice,1
drum,太鼓,drum,1
history,歴史,history,1
united-states,アメリカ,United States,1
england,イングランド,England,1
mongolia,モンゴル,Mongolia,1
child,子供,child,1
children,子どもたち,children,1
nature,自然,nature,1
giant,巨人,giant,1
vacuum-cleaner,掃除機,vacuum cleaner,1
detective,探偵,detective,1
foam,泡,foam,1
sky,空,sky,1
slowly,ゆっくり,slowly,1
sleep,睡眠,sleep,1
wind,風,wind,1
volcano,火山,volcano,1
tomorrow,明日,tomorrow,1
alcohol,お酒,alcohol,1
ant,アリ,ant,1
cat,ネコ,cat,1
dream,夢,dream,1
express-way,高速道路,Express way,1
dictionary,辞書,dictionary,1
daily-life,日常,daily life,1
cram-school,塾,cram school,1
grapes,ぶどう,grapes,1
aquarium,水族館,aquarium,1
spring,春,spring,1
war,戦争,war,1
mountain,山,mountain,1
scissors,ハサミ,scissors,1
island,島,island,1
snow,雪,snow,1
iron,鉄,iron,1
season,季節,season,1
reverse,逆,reverse,1
curtain,カーテン,curtain,1
prohibited,禁止,prohibited,1
turtle,かめ,turtle,1
tree,木,tree,1
left,左,left,1
police-officer,警察官,police officer,1
suspect,容疑者,suspect,1
comics,漫画,comics,1
body,体,body,1
birthday,誕生日,birthday,1
butter,バター,butter,1
crocodile,ワニ,crocodile,1
lol,笑,lol,1
angry,怒る,angry,1
pollen,花粉,pollen,1
eye,目,eye,1
purple,紫,purple,1
fire,火事,fire,1
era,時代,era,1
finger,指,finger,1
please-stop,やめてください,please stop,1
heaven,天国,heaven,1
close,近い,close,1
politics,政治,politics,1
blue-bird,青い鳥,blue bird,1
refrigerator,冷蔵庫,refrigerator,1
cattle,牛,cattle,1
shelf,棚,shelf,1
medicine,薬,medicine,1
letter,手紙,letter,1
flower,花,flower,1`;
const SHARED_IMAGE = "shared-halloween.png";
const FALLBACK_IMAGE_MANIFEST = {
  halloween: SHARED_IMAGE,
  eraser: SHARED_IMAGE,
  mouse: SHARED_IMAGE,
  map: SHARED_IMAGE,
  tissue: SHARED_IMAGE,
  "air-conditioner": SHARED_IMAGE,
  temple: SHARED_IMAGE,
  solar: SHARED_IMAGE,
  "rice-ball": SHARED_IMAGE,
  "cherry-blossoms": SHARED_IMAGE,
  seed: SHARED_IMAGE,
  waterfall: SHARED_IMAGE,
  "junior-high-school": SHARED_IMAGE,
  "ball-point-pen": SHARED_IMAGE,
  ax: SHARED_IMAGE,
  plant: SHARED_IMAGE,
  bald: SHARED_IMAGE,
  "tooth-brush": SHARED_IMAGE,
  house: SHARED_IMAGE,
  rice: SHARED_IMAGE,
  drum: SHARED_IMAGE,
  history: SHARED_IMAGE,
  "united-states": SHARED_IMAGE,
  england: SHARED_IMAGE,
  mongolia: SHARED_IMAGE,
  child: SHARED_IMAGE,
  children: SHARED_IMAGE,
  nature: SHARED_IMAGE,
  giant: SHARED_IMAGE,
  "vacuum-cleaner": SHARED_IMAGE,
  detective: SHARED_IMAGE,
  foam: SHARED_IMAGE,
  sky: SHARED_IMAGE,
  slowly: SHARED_IMAGE,
  sleep: SHARED_IMAGE,
  wind: SHARED_IMAGE,
  volcano: SHARED_IMAGE,
  tomorrow: SHARED_IMAGE,
  alcohol: SHARED_IMAGE,
  ant: SHARED_IMAGE,
  cat: SHARED_IMAGE,
  dream: SHARED_IMAGE,
  "express-way": SHARED_IMAGE,
  dictionary: SHARED_IMAGE,
  "daily-life": SHARED_IMAGE,
  "cram-school": SHARED_IMAGE,
  grapes: SHARED_IMAGE,
  aquarium: SHARED_IMAGE,
  spring: SHARED_IMAGE,
  war: SHARED_IMAGE,
  mountain: SHARED_IMAGE,
  scissors: SHARED_IMAGE,
  island: SHARED_IMAGE,
  snow: SHARED_IMAGE,
  iron: SHARED_IMAGE,
  season: SHARED_IMAGE,
  reverse: SHARED_IMAGE,
  curtain: SHARED_IMAGE,
  prohibited: SHARED_IMAGE,
  turtle: SHARED_IMAGE,
  tree: SHARED_IMAGE,
  left: SHARED_IMAGE,
  "police-officer": SHARED_IMAGE,
  suspect: SHARED_IMAGE,
  comics: SHARED_IMAGE,
  body: SHARED_IMAGE,
  birthday: SHARED_IMAGE,
  butter: SHARED_IMAGE,
  crocodile: SHARED_IMAGE,
  lol: SHARED_IMAGE,
  angry: SHARED_IMAGE,
  pollen: SHARED_IMAGE,
  eye: SHARED_IMAGE,
  purple: SHARED_IMAGE,
  fire: SHARED_IMAGE,
  era: SHARED_IMAGE,
  finger: SHARED_IMAGE,
  "please-stop": SHARED_IMAGE,
  heaven: SHARED_IMAGE,
  close: SHARED_IMAGE,
  politics: SHARED_IMAGE,
  "blue-bird": SHARED_IMAGE,
  refrigerator: SHARED_IMAGE,
  cattle: SHARED_IMAGE,
  shelf: SHARED_IMAGE,
  medicine: SHARED_IMAGE,
  letter: SHARED_IMAGE,
  flower: SHARED_IMAGE,
};

const state = {
  mode: "loading",
  playMode: "normal",
  level: 1,
  roundSeconds: DEFAULT_ROUND_SECONDS,
  timeLeft: DEFAULT_ROUND_SECONDS,
  score: 0,
  combo: 0,
  bestCombo: 0,
  totalKeys: 0,
  correctKeys: 0,
  typed: "",
  flash: 0,
  pulse: 0,
  particles: [],
  lastTimestamp: 0,
  queue: [],
  words: [],
  currentWord: null,
  currentWordMissLogged: false,
  letterHintLevels: {},
  imageManifest: {},
  records: loadRecords(),
  speechEnabled: loadSpeechPreference(),
  soundEnabled: loadSoundPreference(),
  hintEnabled: loadHintPreference(),
  audioContext: null,
  selectedVoiceURI: loadVoicePreference(),
  voices: [],
  letterSpeechRate: loadSpeechRate(LETTER_RATE_STORAGE_KEY, 2),
  wordSpeechRate: loadSpeechRate(WORD_RATE_STORAGE_KEY, 1.8),
  transitionDelay: 0,
  countdownRemaining: 0,
  origin: "Canvas coordinates use top-left origin; +x goes right, +y goes down.",
};

async function init() {
  try {
    state.words = await loadWords();
    state.imageManifest = await loadImageManifest();
    setupVoiceOptions();
    applyControlsToState();
    syncSpeechRateControls();
    startReadyState();
    await updateWordImage();
    refreshSidebar();
    syncSpeechButton();
    syncSoundButton();
    syncControlMirrors();
    syncHud();
    render();
    requestAnimationFrame(animationLoop);
  } catch (error) {
    state.mode = "error";
    state.currentWord = null;
    renderError(error);
    throw error;
  }
}

async function loadImageManifest() {
  try {
    const response = await fetch("./assets/illustrations/manifest.json", { cache: "no-store" });
    if (!response.ok) return { ...FALLBACK_IMAGE_MANIFEST };
    const manifest = await response.json();
    return manifest && typeof manifest === "object" ? manifest : { ...FALLBACK_IMAGE_MANIFEST };
  } catch {
    return { ...FALLBACK_IMAGE_MANIFEST };
  }
}

function loadRecords() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { mistakes: [], wordTotals: {} };
    }
    const parsed = JSON.parse(raw);
    return {
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
      wordTotals: parsed.wordTotals && typeof parsed.wordTotals === "object" ? parsed.wordTotals : {},
    };
  } catch {
    return { mistakes: [], wordTotals: {} };
  }
}

function loadSoundPreference() {
  try {
    const raw = window.localStorage.getItem(SOUND_STORAGE_KEY);
    return raw !== "off";
  } catch {
    return true;
  }
}

function loadSpeechPreference() {
  try {
    const raw = window.localStorage.getItem(SPEECH_STORAGE_KEY);
    return raw !== "off";
  } catch {
    return true;
  }
}

function loadHintPreference() {
  try {
    return window.localStorage.getItem(HINT_STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function loadVoicePreference() {
  try {
    return window.localStorage.getItem(VOICE_STORAGE_KEY) || PREFERRED_VOICE_NAME;
  } catch {
    return PREFERRED_VOICE_NAME;
  }
}

function loadSpeechRate(storageKey, fallback) {
  try {
    const value = Number(window.localStorage.getItem(storageKey));
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function saveSoundPreference() {
  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, state.soundEnabled ? "on" : "off");
  } catch {
    // Ignore storage errors.
  }
}

function saveSpeechPreference() {
  try {
    window.localStorage.setItem(SPEECH_STORAGE_KEY, state.speechEnabled ? "on" : "off");
  } catch {
    // Ignore storage errors.
  }
}

function saveHintPreference() {
  try {
    window.localStorage.setItem(HINT_STORAGE_KEY, state.hintEnabled ? "on" : "off");
  } catch {
    // Ignore storage errors.
  }
}

function saveVoicePreference() {
  try {
    window.localStorage.setItem(VOICE_STORAGE_KEY, state.selectedVoiceURI || "");
  } catch {
    // Ignore storage errors.
  }
}

function saveSpeechRate(storageKey, value) {
  try {
    window.localStorage.setItem(storageKey, String(value));
  } catch {
    // Ignore storage errors.
  }
}

function saveRecords() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
}

async function loadWords() {
  let csv = FALLBACK_WORDS_CSV;

  try {
    const response = await fetch("./data/words.csv", { cache: "no-store" });
    if (response.ok) {
      csv = await response.text();
    }
  } catch {
    // Opening the app with file:// blocks fetch in some browsers, so we fall back to embedded data.
  }

  const rows = parseCsv(csv);
  return rows
    .map((row) => ({
      id: String(row["単語ID"] || "").trim(),
      japanese: String(row["日本語"] || "").trim(),
      english: String(row["英語"] || "").trim().toLowerCase(),
      typing: String(row["英語"] || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z]/g, ""),
      enabled: String(row["出題の有無"] || "0").trim() === "1",
    }))
    .filter((row) => row.id && row.japanese && row.english && row.typing);
}

function parseCsv(source) {
  const rows = [];
  let cell = "";
  let row = [];
  let quoted = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (char === "\"") {
      if (quoted && next === "\"") {
        cell += "\"";
        i += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(cell);
      if (row.some((value) => value !== "")) {
        rows.push(row);
      }
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell !== "" || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  const [header = [], ...body] = rows;
  return body.map((values) => {
    const entry = {};
    header.forEach((key, index) => {
      entry[key.trim()] = (values[index] || "").trim();
    });
    return entry;
  });
}

function applyControlsToState() {
  state.level = Number(ui.levelSelect.value || 1);
  state.playMode = ui.modeSelect.value || "normal";
  state.roundSeconds = Number(ui.durationSelect.value || DEFAULT_ROUND_SECONDS);
  state.hintEnabled = ui.hintSelect.value === "on";
}

function syncControlMirrors() {
  ui.playerNameBottom.value = ui.playerName.value;
  ui.levelSelectBottom.value = ui.levelSelect.value;
  ui.modeSelectBottom.value = ui.modeSelect.value;
  ui.durationSelectBottom.value = ui.durationSelect.value;
  ui.hintSelectBottom.value = ui.hintSelect.value;
}

function pullBottomControlsToTop() {
  ui.playerName.value = ui.playerNameBottom.value;
  ui.levelSelect.value = ui.levelSelectBottom.value;
  ui.modeSelect.value = ui.modeSelectBottom.value;
  ui.durationSelect.value = ui.durationSelectBottom.value;
  ui.hintSelect.value = ui.hintSelectBottom.value;
}

function normalizedPlayerName() {
  const value = ui.playerName.value.trim();
  return value || "Player1";
}

function startReadyState() {
  cancelSpeech();
  state.mode = "ready";
  state.score = 0;
  state.combo = 0;
  state.bestCombo = 0;
  state.totalKeys = 0;
  state.correctKeys = 0;
  state.flash = 0;
  state.pulse = 0;
  state.particles = [];
  state.timeLeft = state.roundSeconds;
  state.transitionDelay = 0;
  state.countdownRemaining = 0;
  state.currentWordMissLogged = false;
  state.letterHintLevels = {};
  buildQueue();
  setNextWord();
}

function beginCountdown() {
  cancelSpeech();
  applyControlsToState();
  state.mode = "countdown";
  state.countdownRemaining = 3;
  state.transitionDelay = 0;
  syncHud();
  render();
}

function startGame() {
  cancelSpeech();
  applyControlsToState();
  state.mode = "playing";
  state.score = 0;
  state.combo = 0;
  state.bestCombo = 0;
  state.totalKeys = 0;
  state.correctKeys = 0;
  state.flash = 0;
  state.pulse = 0;
  state.particles = [];
  state.timeLeft = state.roundSeconds;
  state.transitionDelay = 0;
  state.countdownRemaining = 0;
  buildQueue();
  setNextWord();
  syncHud();
  updateWordImage();
  refreshSidebar();
  render();
}

function resetGame() {
  applyControlsToState();
  startReadyState();
  syncHud();
  updateWordImage();
  refreshSidebar();
  render();
}

function finishGame() {
  cancelSpeech();
  state.mode = "finished";
  state.transitionDelay = 0;
  state.countdownRemaining = 0;
  syncHud();
  refreshSidebar();
  render();
}

function buildQueue() {
  const enabledWords = state.words.filter((word) => word.enabled);
  const testWord = TEST_MODE_WORD_ID ? state.words.find((word) => word.id === TEST_MODE_WORD_ID) : null;

  if (state.playMode === "review") {
    const reviewWords = reviewQueueWords();
    state.queue = reviewWords.length > 0 ? reviewWords : shuffleWords(enabledWords);
  } else if (testWord) {
    const rest = enabledWords.filter((word) => word.id !== testWord.id);
    state.queue = [testWord, ...shuffleWords(rest)];
  } else {
    state.queue = shuffleWords(enabledWords);
  }
}

function reviewQueueWords() {
  const player = normalizedPlayerName();
  const counts = {};

  state.records.mistakes
    .filter((entry) => entry.player === player)
    .forEach((entry) => {
      counts[entry.wordId] = (counts[entry.wordId] || 0) + 1;
    });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([wordId]) => state.words.find((word) => word.id === wordId))
    .filter(Boolean);
}

function shuffleWords(words) {
  const list = [...words];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function setNextWord() {
  if (state.queue.length === 0) {
    buildQueue();
  }
  state.currentWord = state.queue.shift() || null;
  state.typed = "";
  state.currentWordMissLogged = false;
  state.letterHintLevels = {};
  updateWordImage();
}

function accuracy() {
  if (state.totalKeys === 0) return 100;
  return Math.round((state.correctKeys / state.totalKeys) * 100);
}

function syncHud() {
  ui.time.textContent = state.timeLeft.toFixed(1);
  ui.score.textContent = String(state.score);
  ui.combo.textContent = String(state.combo);
  ui.accuracy.textContent = `${accuracy()}%`;
  ui.player.textContent = normalizedPlayerName();
  ui.level.textContent = String(state.level);
}

function syncSoundButton() {
  ui.sound.textContent = state.soundEnabled ? "サウンドON" : "サウンドOFF";
}

function syncSpeechButton() {
  ui.speech.textContent = state.speechEnabled ? "音声読み上げON" : "音声読み上げOFF";
}

function syncSpeechRateControls() {
  state.letterSpeechRate = 2;
  state.wordSpeechRate = 1.8;
  ui.letterRate.value = "2";
  ui.letterRateValue.textContent = "2.00";
  ui.wordRate.value = "1.8";
  ui.wordRateValue.textContent = "1.80";
  saveSpeechRate(LETTER_RATE_STORAGE_KEY, 2);
  saveSpeechRate(WORD_RATE_STORAGE_KEY, 1.8);
  ui.durationSelect.value = "60";
  ui.durationSelectBottom.value = "60";
  ui.hintSelect.value = state.hintEnabled ? "on" : "off";
  ui.hintSelectBottom.value = state.hintEnabled ? "on" : "off";
}

function setupVoiceOptions() {
  if (!("speechSynthesis" in window)) {
    ui.voiceSelect.innerHTML = `<option value="">音声変更は未対応です</option>`;
    ui.voiceSelect.disabled = true;
    return;
  }

  const refreshVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    state.voices = prioritizeVoices(voices);
    renderVoiceOptions();
  };

  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

function prioritizeVoices(voices) {
  return [...voices].sort((a, b) => {
    const aEnglish = a.lang.toLowerCase().startsWith("en") ? 0 : 1;
    const bEnglish = b.lang.toLowerCase().startsWith("en") ? 0 : 1;
    if (aEnglish !== bEnglish) return aEnglish - bEnglish;
    if (a.default && !b.default) return -1;
    if (!a.default && b.default) return 1;
    return a.name.localeCompare(b.name);
  });
}

function renderVoiceOptions() {
  if (state.voices.length === 0) {
    ui.voiceSelect.innerHTML = `<option value="">利用可能な音声がありません</option>`;
    ui.voiceSelect.disabled = true;
    return;
  }

  ui.voiceSelect.disabled = false;
  const options = state.voices
    .map((voice) => `<option value="${escapeHtml(voice.voiceURI)}">${escapeHtml(voice.name)} (${escapeHtml(voice.lang)})</option>`)
    .join("");
  ui.voiceSelect.innerHTML = `<option value="">自動選択</option>${options}`;

  const preferredVoice = state.voices.find(
    (voice) => voice.name === PREFERRED_VOICE_NAME && voice.lang === PREFERRED_VOICE_LANG
  );
  const selectedVoice =
    state.voices.find((voice) => voice.voiceURI === state.selectedVoiceURI || voice.name === state.selectedVoiceURI) ||
    preferredVoice ||
    null;

  state.selectedVoiceURI = selectedVoice ? selectedVoice.voiceURI : "";
  saveVoicePreference();
  ui.voiceSelect.value = state.selectedVoiceURI;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function spawnBurst() {
  for (let i = 0; i < 14; i += 1) {
    state.particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2 + 50,
      vx: (Math.random() - 0.5) * 5,
      vy: -1 - Math.random() * 3.5,
      life: 0.7 + Math.random() * 0.3,
      size: 4 + Math.random() * 8,
    });
  }
}

function update(dt) {
  if (state.mode === "countdown") {
    state.countdownRemaining = Math.max(0, state.countdownRemaining - dt);
    if (state.countdownRemaining === 0) {
      startGame();
      return;
    }
  }

  if (state.mode === "playing") {
    if (state.transitionDelay > 0) {
      state.transitionDelay = Math.max(0, state.transitionDelay - dt);
      if (state.transitionDelay === 0) {
        setNextWord();
      }
    } else {
      state.timeLeft = Math.max(0, state.timeLeft - dt);
    }
    state.pulse += dt * 4;
    if (state.timeLeft <= 0) {
      finishGame();
    }
  }

  state.flash = Math.max(0, state.flash - dt * 2);
  state.particles = state.particles
    .map((particle) => ({
      ...particle,
      x: particle.x + particle.vx * 2,
      y: particle.y + particle.vy * 2,
      vy: particle.vy + dt * 3,
      life: particle.life - dt,
    }))
    .filter((particle) => particle.life > 0);
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#f4d79a");
  gradient.addColorStop(0.5, "#9dd9d2");
  gradient.addColorStop(1, "#5b7c99");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.14)";
  for (let i = 0; i < 9; i += 1) {
    ctx.beginPath();
    ctx.arc(100 + i * 100, 70 + (i % 2) * 18, 28 + (i % 3) * 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawStageCard() {
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = `rgba(255, 251, 245, ${0.9 - state.flash * 0.16})`;
  roundRect(ctx, -370, -185, 740, 370, 30);
  ctx.fill();
  ctx.restore();
}

function drawText() {
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.textAlign = "center";

  if (!state.currentWord) {
    ctx.fillStyle = "#17324d";
    ctx.font = "700 24px Outfit";
    ctx.fillText("出題できる単語がありません", 0, 0);
    ctx.restore();
    return;
  }

  ctx.fillStyle = "#17324d";
  ctx.font = "700 18px Outfit";
  const modeLabel =
    state.mode === "ready"
      ? "Enterかスタートで開始"
      : state.mode === "countdown"
        ? "まもなくスタート"
        : state.mode === "finished"
          ? "時間切れ! Enterで再挑戦"
          : state.transitionDelay > 0
            ? "読み上げ中..."
            : state.playMode === "review"
              ? "復習モード: 間違えた単語を再挑戦"
              : "日本語を見て英単語をタイプ";
  ctx.fillText(modeLabel, 0, -122);

  ctx.font = "700 42px Kosugi Maru";
  ctx.fillText(state.currentWord.japanese, 0, -42);

  if (state.mode === "countdown") {
    ctx.font = "800 96px Outfit";
    ctx.fillStyle = "#ef6c3f";
    ctx.fillText(String(Math.ceil(state.countdownRemaining)), 0, 48);
    ctx.restore();
    return;
  }

  ctx.font = "800 56px Outfit";
  drawGuideText(state.currentWord.english, state.level, state.typed, 42);

  const comboScale = 1 + Math.sin(state.pulse * 2) * 0.04;
  ctx.save();
  ctx.scale(comboScale, comboScale);
  ctx.font = "700 22px Outfit";
  ctx.fillStyle = "#2e5d84";
  ctx.fillText(`COMBO x${state.combo}`, 0, 124);
  ctx.restore();

  if (state.mode === "finished") {
    ctx.font = "700 22px Outfit";
    ctx.fillStyle = "#17324d";
    ctx.fillText(`SCORE ${state.score} / BEST COMBO ${state.bestCombo}`, 0, 158);
  }

  ctx.restore();
}

function maskedWord(word, level) {
  if (level === 0) {
    return word;
  }
  if (level === 3) {
    return word.replace(/[a-z]/gi, "_");
  }

  return word
    .split("")
    .map((char) => {
      const isLetter = /[a-z]/i.test(char);
      const isVowel = /[aeiou]/i.test(char);
      if (!isLetter) return char;
      if (level === 1 && isVowel) return "_";
      if (level === 2 && !isVowel) return "_";
      return char;
    })
    .join("");
}

function buildGuideTokens(word, level, typedText) {
  let typedIndex = 0;

  return word
    .split("")
    .map((char) => {
      if (!/[a-z]/i.test(char)) {
        return { text: char === " " ? "   " : char, color: "#17324d", kind: "separator" };
      }
      const alreadyTyped = typedIndex < typedText.length;
      const shouldHide =
        level === 3 ||
        (level === 1 && /[aeiou]/i.test(char)) ||
        (level === 2 && !/[aeiou]/i.test(char));
      const hintLevel = state.letterHintLevels[typedIndex] || 0;
      const useHintLetter = state.hintEnabled && shouldHide && hintLevel > 0;
      const output = alreadyTyped || !shouldHide || useHintLetter ? char : "_";
      const color = alreadyTyped
        ? "#ef6c3f"
        : useHintLetter
          ? hintColor(hintLevel)
          : "#17324d";
      typedIndex += 1;
      return { text: output, color, kind: "letter" };
    });
}

function hintColor(level) {
  if (level >= 2) return "#17324d";
  return "#d8d2c8";
}

function drawGuideText(word, level, typedText, y) {
  const tokens = buildGuideTokens(word, level, typedText);
  const letterSpacing = 18;
  const widths = tokens.map((token) => ctx.measureText(token.text).width);
  const totalWidth = widths.reduce((sum, width, index) => sum + width + (index < widths.length - 1 ? letterSpacing : 0), 0);
  let x = -totalWidth / 2;

  tokens.forEach((token, index) => {
    ctx.fillStyle = token.color;
    ctx.fillText(token.text, x + widths[index] / 2, y);
    x += widths[index] + letterSpacing;
  });
}

function drawParticles() {
  state.particles.forEach((particle) => {
    ctx.save();
    ctx.globalAlpha = Math.max(0, particle.life);
    ctx.fillStyle = "#fff5d6";
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

function drawFooter() {
  ctx.fillStyle = "rgba(23, 50, 77, 0.72)";
  ctx.font = "600 16px Outfit";
  ctx.textAlign = "left";
  ctx.fillText(`Player: ${normalizedPlayerName()}`, 36, canvas.height - 26);
  ctx.textAlign = "right";
  ctx.fillText(`Mode: ${state.playMode} / Level: ${state.level}`, canvas.width - 36, canvas.height - 26);
}

function render() {
  drawBackground();
  drawStageCard();
  drawText();
  drawParticles();
  drawFooter();
}

function renderError(error) {
  drawBackground();
  ctx.fillStyle = "#17324d";
  ctx.font = "700 22px Outfit";
  ctx.textAlign = "center";
  ctx.fillText("初期化エラー", canvas.width / 2, canvas.height / 2 - 18);
  ctx.font = "500 18px Outfit";
  ctx.fillText(String(error.message || error), canvas.width / 2, canvas.height / 2 + 18);
}

function handleTyping(key) {
  if (state.mode === "loading" || state.mode === "error") return;

  if (state.mode === "ready") {
    if (key === "Enter") {
      beginCountdown();
    }
    return;
  }

  if (state.mode === "finished") {
    if (key === "Enter") {
      beginCountdown();
    }
    return;
  }

  if (state.mode === "countdown") return;
  if (state.transitionDelay > 0) return;
  if (state.mode !== "playing" || !state.currentWord) return;
  if (key.length !== 1 || !/[a-z]/i.test(key)) return;

  state.totalKeys += 1;
  const expected = state.currentWord.typing[state.typed.length];
  const typedChar = key.toLowerCase();

  if (typedChar === expected) {
    state.correctKeys += 1;
    state.typed += typedChar;
    speakLetter(typedChar);
    playSound("correct");
    if (state.typed === state.currentWord.typing) {
      state.score += 100 + state.combo * 12;
      state.combo += 1;
      state.bestCombo = Math.max(state.bestCombo, state.combo);
      state.pulse = 0;
      spawnBurst();
      speakWord(state.currentWord.english);
      playSound("clear");
      bumpWordSeen(state.currentWord.id);
      state.transitionDelay = estimateWordDelay(state.currentWord.english);
    }
  } else {
    state.combo = 0;
    state.flash = 1;
    playSound("miss");
    if (!state.currentWordMissLogged) {
      state.currentWordMissLogged = true;
      recordMistake({
        player: normalizedPlayerName(),
        wordId: state.currentWord.id,
        japanese: state.currentWord.japanese,
        english: state.currentWord.english,
        expected,
        typed: typedChar,
        index: state.typed.length,
      });
    }
    if (state.hintEnabled && shouldHideLetter(state.currentWord.english, state.level, state.typed.length)) {
      const currentLevel = state.letterHintLevels[state.typed.length] || 0;
      state.letterHintLevels[state.typed.length] = Math.min(2, currentLevel + 1);
    }
  }

  syncHud();
  refreshSidebar();
  render();
}

function bumpWordSeen(wordId) {
  if (!state.records.wordTotals[wordId]) {
    state.records.wordTotals[wordId] = { seen: 0, misses: 0 };
  }
  state.records.wordTotals[wordId].seen += 1;
  saveRecords();
}

function recordMistake(entry) {
  state.records.mistakes.unshift({
    ...entry,
    at: new Date().toISOString(),
  });
  state.records.mistakes = state.records.mistakes.slice(0, 200);

  if (!state.records.wordTotals[entry.wordId]) {
    state.records.wordTotals[entry.wordId] = { seen: 0, misses: 0 };
  }
  state.records.wordTotals[entry.wordId].misses += 1;
  saveRecords();
}

function refreshSidebar() {
  renderHardWords();
  renderMistakeLog();
}

function renderHardWords() {
  const player = normalizedPlayerName();
  const perWord = {};
  state.records.mistakes
    .filter((entry) => entry.player === player)
    .forEach((entry) => {
      perWord[entry.wordId] = (perWord[entry.wordId] || 0) + 1;
    });

  const ranked = Object.entries(perWord)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([wordId, misses]) => {
      const word = state.words.find((item) => item.id === wordId);
      return word ? { word, misses } : null;
    })
    .filter(Boolean);

  ui.hardWords.innerHTML = "";
  if (ranked.length === 0) {
    ui.hardWords.innerHTML = `<li class="empty-state">まだミス記録がありません。</li>`;
    ui.reviewSummary.textContent = "復習候補はまだありません。";
    return;
  }

  ui.reviewSummary.textContent = `${player} さんの復習候補 ${ranked.length} 件`;
  ranked.forEach(({ word, misses }) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${word.japanese} / ${word.english}</strong><span>ミス ${misses} 回</span>`;
    ui.hardWords.appendChild(li);
  });
}

function renderMistakeLog() {
  ui.mistakeLog.innerHTML = "";
  const logs = state.records.mistakes.slice(0, 8);
  if (logs.length === 0) {
    ui.mistakeLog.innerHTML = `<li class="empty-state">まだログはありません。</li>`;
    return;
  }

  logs.forEach((log) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${log.player} / ${log.japanese}</strong>
      <span>${log.english} の ${log.index + 1} 文字目: 正解 <b>${log.expected}</b> / 入力 <b>${log.typed}</b></span>
    `;
    ui.mistakeLog.appendChild(li);
  });
}

async function updateWordImage() {
  if (!state.currentWord) {
    ui.wordImage.hidden = true;
    ui.imagePlaceholder.hidden = false;
    return;
  }

  const imageUrl = await resolveImageUrl(state.currentWord.id);
  if (imageUrl) {
    ui.wordImage.src = imageUrl;
    ui.wordImage.hidden = false;
    ui.imagePlaceholder.hidden = true;
  } else {
    ui.wordImage.hidden = true;
    ui.imagePlaceholder.hidden = false;
  }
}

async function resolveImageUrl(wordId) {
  const fileName = state.imageManifest[wordId];
  return fileName ? `./assets/illustrations/${fileName}` : "";
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function resizeCanvas() {
  render();
}

function animationLoop(timestamp) {
  if (!state.lastTimestamp) {
    state.lastTimestamp = timestamp;
  }
  const dt = Math.min(0.05, (timestamp - state.lastTimestamp) / 1000);
  state.lastTimestamp = timestamp;
  update(dt);
  syncHud();
  render();
  requestAnimationFrame(animationLoop);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function ensureAudioContext() {
  if (state.audioContext) return state.audioContext;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  state.audioContext = new AudioContextClass();
  return state.audioContext;
}

function cancelSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function speakLetter(letter) {
  speakText(LETTER_SPEECH[letter] || letter, state.letterSpeechRate);
}

function speakWord(word) {
  speakText(word, state.wordSpeechRate);
}

function speakText(text, rate) {
  if (!state.speechEnabled) return;
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;
  const selectedVoice = state.voices.find((voice) => voice.voiceURI === state.selectedVoiceURI);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
  }
  window.speechSynthesis.speak(utterance);
}

function estimateWordDelay(word) {
  const clean = word.replace(/\s+/g, " ").trim();
  return Math.max(1, Math.min(2.4, clean.length * 0.09 + 0.35));
}

function playSound(kind) {
  if (!state.soundEnabled) return;
  const audioContext = ensureAudioContext();
  if (!audioContext) return;

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const now = audioContext.currentTime;
  const presets = {
    correct: { frequency: 660, duration: 0.07, volume: 0.05, type: "triangle" },
    miss: { frequency: 220, duration: 0.12, volume: 0.06, type: "sawtooth" },
    clear: { frequency: 880, duration: 0.16, volume: 0.07, type: "sine" },
  };
  const preset = presets[kind] || presets.correct;

  oscillator.type = preset.type;
  oscillator.frequency.setValueAtTime(preset.frequency, now);
  gainNode.gain.setValueAtTime(preset.volume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + preset.duration);
  oscillator.start(now);
  oscillator.stop(now + preset.duration);
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  saveSoundPreference();
  syncSoundButton();
}

function toggleSpeech() {
  state.speechEnabled = !state.speechEnabled;
  if (!state.speechEnabled) {
    cancelSpeech();
  }
  saveSpeechPreference();
  syncSpeechButton();
}

function handleVoiceChange() {
  state.selectedVoiceURI = ui.voiceSelect.value;
  saveVoicePreference();
}

function handleLetterRateChange() {
  state.letterSpeechRate = Number(ui.letterRate.value);
  ui.letterRateValue.textContent = state.letterSpeechRate.toFixed(2);
  saveSpeechRate(LETTER_RATE_STORAGE_KEY, state.letterSpeechRate);
}

function handleWordRateChange() {
  state.wordSpeechRate = Number(ui.wordRate.value);
  ui.wordRateValue.textContent = state.wordSpeechRate.toFixed(2);
  saveSpeechRate(WORD_RATE_STORAGE_KEY, state.wordSpeechRate);
}

function handleHintChange() {
  state.hintEnabled = ui.hintSelect.value === "on";
  saveHintPreference();
  syncControlMirrors();
  render();
}

function shouldHideLetter(word, level, letterIndex) {
  const letters = word.split("").filter((char) => /[a-z]/i.test(char));
  const char = letters[letterIndex];
  if (!char) return false;
  if (level === 0) return false;
  if (level === 3) return true;
  const isVowel = /[aeiou]/i.test(char);
  return level === 1 ? isVowel : !isVowel;
}

function blurActiveControl(event) {
  if (event.currentTarget instanceof HTMLElement) {
    event.currentTarget.blur();
  }
}

window.render_game_to_text = () =>
  JSON.stringify({
    mode: state.mode,
    playMode: state.playMode,
    level: state.level,
    player: normalizedPlayerName(),
    currentWord: state.currentWord
      ? {
          id: state.currentWord.id,
          japanese: state.currentWord.japanese,
          english: state.currentWord.english,
          typing: state.currentWord.typing,
          masked: maskedWord(state.currentWord.english, state.level),
          typed: state.typed,
        }
      : null,
    score: state.score,
    combo: state.combo,
    bestCombo: state.bestCombo,
    timeLeft: Number(state.timeLeft.toFixed(2)),
    accuracy: accuracy(),
    reviewCandidates: reviewQueueWords().map((word) => word.id),
    particles: state.particles.length,
    canvas: { width: canvas.width, height: canvas.height },
    note: state.origin,
  });

window.advanceTime = (ms) => {
  const steps = Math.max(1, Math.round(ms / (1000 / 60)));
  for (let i = 0; i < steps; i += 1) {
    update(1 / 60);
  }
  syncHud();
  render();
};

document.addEventListener("keydown", (event) => {
  if (
    event.key === " " &&
    !(event.target instanceof HTMLInputElement) &&
    !(event.target instanceof HTMLTextAreaElement) &&
    !(event.target instanceof HTMLSelectElement)
  ) {
    event.preventDefault();
  }
  if (event.key === "Enter") {
    handleTyping("Enter");
    return;
  }
  if (event.key === "Escape" && document.fullscreenElement) {
    document.exitFullscreen?.();
    return;
  }
  handleTyping(event.key);
});

ui.start.addEventListener("click", (event) => {
  blurActiveControl(event);
  beginCountdown();
});
ui.restart.addEventListener("click", (event) => {
  if (event.detail === 0) return;
  blurActiveControl(event);
  resetGame();
});
ui.restart.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "Spacebar" || event.key === "Enter") {
    event.preventDefault();
  }
});
ui.review.addEventListener("click", (event) => {
  blurActiveControl(event);
  ui.modeSelect.value = "review";
  ui.modeSelectBottom.value = "review";
  syncControlMirrors();
  resetGame();
});
ui.fullscreen.addEventListener("click", (event) => {
  blurActiveControl(event);
  toggleFullscreen();
});
ui.sound.addEventListener("click", (event) => {
  blurActiveControl(event);
  toggleSound();
});
ui.speech.addEventListener("click", (event) => {
  blurActiveControl(event);
  toggleSpeech();
});
ui.voiceSelect.addEventListener("change", handleVoiceChange);
ui.letterRate.addEventListener("input", handleLetterRateChange);
ui.wordRate.addEventListener("input", handleWordRateChange);
ui.playerName.addEventListener("change", () => {
  syncControlMirrors();
  syncHud();
  refreshSidebar();
  render();
});
ui.playerNameBottom.addEventListener("change", () => {
  pullBottomControlsToTop();
  syncControlMirrors();
  syncHud();
  refreshSidebar();
  render();
});
ui.levelSelect.addEventListener("change", () => {
  applyControlsToState();
  syncControlMirrors();
  syncHud();
  render();
});
ui.levelSelectBottom.addEventListener("change", () => {
  pullBottomControlsToTop();
  applyControlsToState();
  syncControlMirrors();
  syncHud();
  render();
});
ui.hintSelect.addEventListener("change", handleHintChange);
ui.hintSelectBottom.addEventListener("change", () => {
  pullBottomControlsToTop();
  handleHintChange();
});
ui.modeSelect.addEventListener("change", () => {
  syncControlMirrors();
  resetGame();
});
ui.modeSelectBottom.addEventListener("change", () => {
  pullBottomControlsToTop();
  syncControlMirrors();
  resetGame();
});
ui.durationSelect.addEventListener("change", () => {
  syncControlMirrors();
  resetGame();
});
ui.durationSelectBottom.addEventListener("change", () => {
  pullBottomControlsToTop();
  syncControlMirrors();
  resetGame();
});
window.addEventListener("resize", resizeCanvas);
document.addEventListener("fullscreenchange", resizeCanvas);

init();
