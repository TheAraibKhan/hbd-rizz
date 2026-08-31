import gsap from "gsap";

const $ = (id) => document.getElementById(id);
const root = $("magicWorld");
const ambient = $("ambientLayer");
const toast = $("messageToast");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];

const gentleOpeners = [
  "You are allowed to rest",
  "Your smile is not a small thing",
  "One soft step still counts",
  "You do not have to explain your tiredness",
  "Your heart deserves careful hands",
  "There is light written for you",
  "You are more loved than you notice",
  "Today can be gentle",
  "Your quiet strength is real",
  "You are not behind in life",
  "Hope is still sitting near you",
  "Your duas are not lost",
  "You make ordinary days warmer",
  "You are not too much",
  "The world is kinder with you in it",
  "You deserve softness without earning it",
  "Your future self is cheering quietly",
  "Allah knows the weight you carry",
  "You can begin again slowly",
  "Your laugh is worth protecting",
];
const gentleClosers = [
  "even when your thoughts are loud.",
  "even before anyone says it out loud.",
  "especially on the days you hide it.",
  "and I hope you remember that tonight.",
  "because you have survived so much already.",
  "without pretending to be fine.",
  "with room for every feeling.",
  "and Allah sees every silent effort.",
  "one breath, one minute, one sunrise at a time.",
  "because your heart is beautiful.",
  "even when the day feels heavy.",
  "and you are not walking alone.",
  "with mercy waiting in places you cannot see yet.",
  "because you matter deeply.",
  "and your softness is not weakness.",
  "even when overthinking clouds the sky.",
  "with a little more kindness than yesterday.",
  "because hard seasons do not last forever.",
  "and I am proud of you.",
  "because Allah never forgets you.",
];
const tinyMessages = gentleOpeners.flatMap((a) =>
  gentleClosers.map((b) => `${a}, ${b}`),
);
const moonQuotes = [
  "Allah hears what your heart cannot put into words.",
  "After every hidden tear, there can still be a hidden mercy.",
  "Tawakkul is not pretending it is easy. It is trusting you are held.",
  "Your sabr is seen, even when your pain is quiet.",
  "The One who brings dawn back every day can bring ease back too.",
  "Do not measure Allah’s love by one difficult chapter.",
];
const comfortMessages = [
  "No matter how heavy today feels... Allah is already preparing tomorrow.",
  "Put one hand on your heart. You made it through this minute.",
  "You are not a burden because you are hurting.",
  "Breathe in slowly. Mercy is closer than panic says.",
  "This feeling is real, but it is not forever.",
  "Allah sees the battles you never explain.",
];

let messageIndex = 0;
let started = false;
function nextMessage() {
  const msg = tinyMessages[messageIndex % tinyMessages.length];
  messageIndex += 1;
  return msg;
}
function showMessage(msg = nextMessage()) {
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(showMessage.timer);
  showMessage.timer = setTimeout(
    () => toast.classList.remove("is-visible"),
    3600,
  );
}

function revealWorld() {
  if (started) return;
  started = true;
  document.body.classList.add("magic-ready");
  setTimeout(() => $("magicVeil").classList.add("is-gone"), 900);
  initAmbient();
  initSections();
  initGarden();
  initConstellation();
  initGames();
  initMoonLibrary();
  initCake();
  initPrayers();
  initFinale();
  initComfort();
  initSound();
}

function waitForBirthdayFilm() {
  if (reduceMotion) {
    setTimeout(revealWorld, 800);
    return;
  }
  const timer = setInterval(() => {
    if (window.bdayDone) {
      clearInterval(timer);
      revealWorld();
    }
  }, 500);
}

function initSections() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        gsap.to(entry.target, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        });
        showMessage();
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.18 },
  );
  document.querySelectorAll("[data-reveal]").forEach((section) => {
    gsap.set(section, { autoAlpha: 0, y: 36 });
    io.observe(section);
  });
  $("notNowBtn").addEventListener("click", () =>
    showMessage("I'll wait for you, always."),
  );
  $("teddy").addEventListener("pointerdown", () =>
    showMessage("Tiny bear hug sent. Stay here as long as you need."),
  );
}

function initAmbient() {
  for (let i = 0; i < 7; i++) makeCloud();
  for (let i = 0; i < 18; i++) makeBubble();
  for (let i = 0; i < 16; i++) makeLeaf();
  document.addEventListener("dblclick", (e) => {
    if (!root.contains(e.target)) return;
    for (let i = 0; i < 9; i++)
      makeButterfly(e.clientX + rand(-30, 30), e.clientY + rand(-20, 20));
    showMessage("You found the butterfly door.");
  });
  document.addEventListener(
    "pointermove",
    (e) => {
      if (!started || Math.random() > 0.035) return;
      makeFirefly(e.clientX, e.clientY);
    },
    { passive: true },
  );
}
function makeCloud() {
  const el = document.createElement("span");
  el.className = "cloud";
  ambient.appendChild(el);
  gsap.set(el, {
    x: rand(-160, innerWidth),
    y: rand(20, innerHeight * 0.75),
    scale: rand(0.55, 1.25),
    opacity: rand(0.28, 0.62),
  });
  gsap.to(el, {
    x: innerWidth + 180,
    duration: rand(45, 80),
    repeat: -1,
    ease: "none",
    delay: -rand(0, 50),
  });
}
function makeBubble() {
  const el = document.createElement("span");
  el.className = "bubble";
  ambient.appendChild(el);
  gsap.set(el, {
    x: rand(0, innerWidth),
    y: innerHeight + rand(0, 500),
    scale: rand(0.45, 1.6),
    opacity: rand(0.25, 0.62),
  });
  gsap.to(el, {
    y: -80,
    x: `+=${rand(-80, 80)}`,
    duration: rand(16, 32),
    repeat: -1,
    ease: "sine.inOut",
    delay: -rand(0, 24),
  });
}
function makeLeaf() {
  const el = document.createElement("span");
  el.className = "leaf";
  el.textContent = "❦";
  ambient.appendChild(el);
  gsap.set(el, {
    x: rand(0, innerWidth),
    y: -80,
    rotation: rand(0, 360),
    opacity: rand(0.18, 0.45),
  });
  gsap.to(el, {
    y: innerHeight + 90,
    x: `+=${rand(-120, 120)}`,
    rotation: `+=${rand(120, 420)}`,
    duration: rand(18, 38),
    repeat: -1,
    ease: "none",
    delay: -rand(0, 30),
  });
}
function makeButterfly(x, y) {
  const el = document.createElement("span");
  el.className = "butterfly";
  el.textContent = "𐀔";
  ambient.appendChild(el);
  gsap.set(el, { x, y, scale: rand(0.8, 1.5), opacity: 0 });
  gsap.to(el, { opacity: 1, duration: 0.2 });
  gsap.to(el, {
    x: `+=${rand(-150, 150)}`,
    y: `+=${rand(-180, -60)}`,
    rotation: rand(-40, 40),
    duration: rand(3, 5),
    ease: "sine.inOut",
    onComplete: () => el.remove(),
  });
}
function makeFirefly(x, y) {
  const el = document.createElement("span");
  el.className = "firefly";
  el.style.cssText =
    "width:7px;height:7px;border-radius:50%;background:#ffcf6a;box-shadow:0 0 12px #ffcf6a;";
  ambient.appendChild(el);
  gsap.fromTo(
    el,
    { x, y, opacity: 0.9, scale: 0.5 },
    {
      x: x + rand(-40, 40),
      y: y + rand(-50, 20),
      opacity: 0,
      scale: 1.4,
      duration: 1.2,
      onComplete: () => el.remove(),
    },
  );
}

function initGarden() {
  const bed = $("gardenBed");
  bed.addEventListener("click", (e) => {
    const rect = bed.getBoundingClientRect();
    const flower = document.createElement("span");
    flower.className = "click-flower";
    flower.style.left = `${e.clientX - rect.left}px`;
    flower.style.top = `${e.clientY - rect.top}px`;
    flower.style.setProperty("--r", `${rand(-28, 28)}deg`);
    bed.appendChild(flower);
    showMessage();
  });
}

function initConstellation() {
  const board = $("constellationBoard");
  const lines = $("constellationLines");
  const pts = [
    [18, 18],
    [32, 26],
    [45, 16],
    [57, 26],
    [72, 18],
    [64, 39],
    [50, 47],
    [36, 39],
    [50, 31],
  ];
  let lit = [];
  pts.forEach(([x, y], i) => {
    const b = document.createElement("button");
    b.className = "constellation-star";
    b.type = "button";
    b.style.left = `${x}%`;
    b.style.top = `${y}%`;
    b.setAttribute("aria-label", `Wake star ${i + 1}`);
    board.appendChild(b);
    b.addEventListener("click", () => {
      if (lit.includes(i)) return;
      lit.push(i);
      b.classList.add("is-lit");
      $("constellationStatus").textContent =
        `${lit.length} / ${pts.length} stars awake`;
      drawConstellation(lines, pts, lit);
      showMessage(
        lit.length === pts.length
          ? "The stars spelled it quietly: Happy Birthday Ridhima."
          : nextMessage(),
      );
    });
  });
}
function drawConstellation(svg, pts, lit) {
  svg.innerHTML = "";
  for (let i = 1; i < lit.length; i++) {
    const [x1, y1] = pts[lit[i - 1]];
    const [x2, y2] = pts[lit[i]];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#ffcf6a");
    line.setAttribute("stroke-width", ".35");
    line.setAttribute("opacity", ".8");
    svg.appendChild(line);
  }
}

function initGames() {
  fillTokens("starField", "star-token", "✦", 10, "starStatus", "collected");
  fillTokens(
    "balloonStage",
    "balloon-token",
    "🎈",
    8,
    "balloonStatus",
    "popped",
  );
  fillTokens("giftShelf", "gift-token", "🎁", 6, "giftStatus", "opened");
  const row = $("cookieRow");
  for (let i = 0; i < 6; i++) {
    const c = document.createElement("button");
    c.className = "cookie-token";
    c.type = "button";
    c.textContent = "🥠";
    c.style.left = `${10 + i * 14}%`;
    c.style.top = `${rand(35, 65)}%`;
    c.addEventListener("click", () => {
      c.textContent = "♡";
      showMessage();
    });
    row.appendChild(c);
  }
}
function fillTokens(id, cls, text, count, statusId, verb) {
  const box = $(id);
  let score = 0;
  for (let i = 0; i < count; i++) {
    const b = document.createElement("button");
    b.className = cls;
    b.type = "button";
    b.textContent = text;
    b.style.left = `${rand(8, 86)}%`;
    b.style.top = `${rand(18, 78)}%`;
    b.addEventListener("click", () => {
      if (b.disabled) return;
      b.disabled = true;
      score += 1;
      $(statusId).textContent = `${score} / ${count} ${verb}`;
      gsap.to(b, {
        scale: 1.8,
        opacity: 0,
        rotation: rand(-80, 80),
        duration: 0.45,
        onComplete: () => b.remove(),
      });
      showMessage(
        score === count
          ? "You finished it. Tiny celebration unlocked."
          : nextMessage(),
      );
    });
    box.appendChild(b);
  }
}

function initMoonLibrary() {
  let phase = 0;
  $("moonOrb").addEventListener("click", () => {
    phase = (phase + 1) % moonQuotes.length;
    $("moonQuote").textContent = moonQuotes[phase];
    gsap.fromTo(
      "moonOrb",
      { scale: 0.94 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1,.4)" },
    );
  });
  const wall = $("envelopeWall");
  for (let i = 0; i < 12; i++) {
    const env = document.createElement("button");
    env.className = "envelope";
    env.type = "button";
    env.textContent = "💌";
    env.addEventListener("click", () => {
      env.textContent = "♡";
      showMessage();
    });
    wall.appendChild(env);
  }
}

function initCake() {
  const cake = $("birthdayCake");
  const base = document.createElement("div");
  base.className = "cake-base";
  for (let i = 0; i < 7; i++) {
    const candle = document.createElement("span");
    candle.className = "candle";
    candle.style.left = `${42 + i * 34}px`;
    base.appendChild(candle);
  }
  cake.appendChild(base);
  $("blowCandles").addEventListener("click", () => {
    document
      .querySelectorAll(".candle")
      .forEach((c, i) => setTimeout(() => c.classList.add("is-out"), i * 130));
    showMessage("May every candle carry one worry away from her heart.");
    confetti();
  });
  const jar = $("wishJar");
  for (let i = 0; i < 18; i++) {
    const n = document.createElement("button");
    n.className = "jar-note";
    n.type = "button";
    n.textContent = "wish";
    n.style.left = `${rand(8, 72)}%`;
    n.style.top = `${rand(18, 78)}%`;
    n.style.setProperty("--r", `${rand(-12, 12)}deg`);
    n.addEventListener("click", () => showMessage());
    jar.appendChild(n);
  }
}
function confetti() {
  for (let i = 0; i < 70; i++) {
    const p = document.createElement("span");
    p.className = "firefly";
    p.style.cssText = `width:${rand(5, 10)}px;height:${rand(8, 14)}px;background:${pick(["#ffcf6a", "#d4235c", "#ff8fae", "#fff6ee"])};`;
    ambient.appendChild(p);
    gsap.fromTo(
      p,
      { x: innerWidth / 2, y: innerHeight * 0.35, opacity: 1 },
      {
        x: rand(0, innerWidth),
        y: innerHeight + 40,
        rotation: rand(180, 720),
        duration: rand(1.6, 3.5),
        ease: "power2.out",
        onComplete: () => p.remove(),
      },
    );
  }
}

function initPrayers() {
  document.querySelectorAll(".dua-cards button").forEach((btn) => {
    btn.addEventListener("click", () => showMessage(btn.textContent));
  });
}

function initFinale() {
  $("lanternRelease").addEventListener("click", () => {
    for (let i = 0; i < 26; i++) {
      const l = document.createElement("span");
      l.className = "lantern";
      $("finalSky").appendChild(l);
      gsap.fromTo(
        l,
        { x: rand(0, innerWidth), y: innerHeight + rand(20, 160), opacity: 0 },
        {
          y: rand(-220, -60),
          opacity: 1,
          duration: rand(7, 12),
          ease: "sine.inOut",
        },
      );
    }
    $("skyMessage").classList.add("is-visible");
    $("hardDaysLink").classList.add("is-visible");
    showMessage("The sky kept the biggest wish for last.");
  });
  $("hardDaysLink").addEventListener("click", () =>
    $("comfortPage").classList.add("is-open"),
  );
}

function initComfort() {
  $("comfortClose").addEventListener("click", () =>
    $("comfortPage").classList.remove("is-open"),
  );
  $("newComfort").addEventListener("click", () => {
    $("comfortMessage").textContent = pick(comfortMessages);
  });
}

/* ============================================================
 * Ambient Sound Engine
 * ------------------------------------------------------------
 * Same Web Audio primitives as before (AudioContext, Oscillator,
 * GainNode, BufferSource), reorganised so every mode is a small
 * "engine" object that owns its nodes and its own pulse timers.
 * Switching modes crossfades: the new engine fades in on its own
 * masterGain while the old one fades out and is fully disposed
 * (nodes stopped + disconnected, timers cleared) after the fade.
 * ============================================================ */

const CROSSFADE_SECONDS = 0.9;
const NOISE_BUFFER_SECONDS = 3;

// Per-mode target loudness, balanced so rain/birds sit forward,
// piano and night stay soft and never clip against each other.
const MODE_TARGET_GAIN = { rain: 0.55, night: 0.42, birds: 0.5, piano: 0.4 };

let noiseBufferCache = {};

// Procedurally generated noise buffers, cached per type so we never
// regenerate (and never allocate) more than once per session.
function getNoiseBuffer(ctx, type = "white") {
  if (noiseBufferCache[type]) return noiseBufferCache[type];
  const length = ctx.sampleRate * NOISE_BUFFER_SECONDS;
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  if (type === "brown") {
    // Integrated white noise = warmer, lower-energy "brown" noise.
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5; // compensate for the energy the lowpass removes
    }
  } else {
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  noiseBufferCache[type] = buffer;
  return buffer;
}
function makeNoiseSource(ctx, type) {
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx, type);
  src.loop = true;
  return src;
}

// Routes a node through a StereoPannerNode when available, otherwise
// falls back to a direct connection (older Safari/iOS support).
function connectWithPan(ctx, sourceNode, destination, panValue) {
  if (ctx.createStereoPanner) {
    const panner = ctx.createStereoPanner();
    panner.pan.value = panValue;
    sourceNode.connect(panner);
    panner.connect(destination);
    return panner;
  }
  sourceNode.connect(destination);
  return null;
}

/* ---------- Rain: filtered hiss + rumble + droplet transients ---------- */
function buildRain(ctx, destination, engine) {
  const hiss = makeNoiseSource(ctx, "white");
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 1600;
  bandpass.Q.value = 0.7;
  const hissGain = ctx.createGain();
  hissGain.gain.value = 0.5;
  hiss.connect(bandpass).connect(hissGain).connect(destination);
  hiss.start();

  // Slow LFO on the hiss level gives the rain a natural "gust" swell.
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.09;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 0.12;
  lfo.connect(lfoDepth).connect(hissGain.gain);
  lfo.start();

  const rumble = makeNoiseSource(ctx, "brown");
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 260;
  const rumbleGain = ctx.createGain();
  rumbleGain.gain.value = 0.45;
  rumble.connect(lowpass).connect(rumbleGain).connect(destination);
  rumble.start();

  engine.nodes.push(
    hiss,
    bandpass,
    hissGain,
    lfo,
    lfoDepth,
    rumble,
    lowpass,
    rumbleGain,
  );
  scheduleRainDrops(ctx, destination, engine);
}
function scheduleRainDrops(ctx, destination, engine) {
  const trigger = () => {
    if (!engine.alive) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = getNoiseBuffer(ctx, "white");
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = rand(2500, 5200);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(rand(0.04, 0.1), t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + rand(0.08, 0.18));
    src.connect(hp).connect(g).connect(destination);
    src.start(t);
    src.stop(t + 0.3);
    src.onended = () => {
      src.disconnect();
      hp.disconnect();
      g.disconnect();
    };
    const id = setTimeout(trigger, rand(35, 150));
    engine.timers.push(id);
  };
  trigger();
}

/* ---------- Night: low warm bed + occasional cricket chirps ---------- */
function buildNight(ctx, destination, engine) {
  const ambienceBed = makeNoiseSource(ctx, "brown");
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 480;
  const gain = ctx.createGain();
  gain.gain.value = 0.5;
  ambienceBed.connect(lowpass).connect(gain).connect(destination);
  ambienceBed.start();
  engine.nodes.push(ambienceBed, lowpass, gain);
  scheduleCricket(ctx, destination, engine);
}
function scheduleCricket(ctx, destination, engine) {
  const trigger = () => {
    if (!engine.alive) return;
    const t = ctx.currentTime;
    const freq = rand(3200, 4200);
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = freq;
    bp.Q.value = 9;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    let chirpEnd = t;
    const chirpCount = 2 + Math.floor(rand(0, 3));
    for (let i = 0; i < chirpCount; i++) {
      g.gain.linearRampToValueAtTime(rand(0.05, 0.09), chirpEnd + 0.01);
      g.gain.linearRampToValueAtTime(0.0001, chirpEnd + 0.07);
      chirpEnd += 0.1;
    }
    osc.connect(bp).connect(g);
    const panner = connectWithPan(ctx, g, destination, rand(-0.6, 0.6));
    osc.start(t);
    osc.stop(chirpEnd + 0.1);
    osc.onended = () => {
      osc.disconnect();
      bp.disconnect();
      g.disconnect();
      if (panner) panner.disconnect();
    };
    const id = setTimeout(trigger, rand(1800, 5200));
    engine.timers.push(id);
  };
  const id = setTimeout(trigger, rand(200, 1200));
  engine.timers.push(id);
}

/* ---------- Birds: three independent chirping voices ---------- */
const BIRD_VOICES = [
  { base: 1800, range: 700 },
  { base: 2600, range: 900 },
  { base: 1200, range: 500 },
];
function buildBirds(ctx, destination, engine) {
  BIRD_VOICES.forEach((voice, idx) =>
    scheduleBirdVoice(ctx, destination, engine, voice, idx),
  );
}
function scheduleBirdVoice(ctx, destination, engine, voice, idx) {
  const trigger = () => {
    if (!engine.alive) return;
    const t = ctx.currentTime;
    const startFreq = voice.base + rand(-voice.range / 2, voice.range / 2);
    const peakFreq = startFreq + rand(200, 500);
    const dur = rand(0.12, 0.28);
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.linearRampToValueAtTime(peakFreq, t + dur * 0.4);
    osc.frequency.linearRampToValueAtTime(startFreq * 0.9, t + dur);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = voice.base;
    bp.Q.value = 4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(rand(0.09, 0.16), t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(bp).connect(g);
    const panner = connectWithPan(ctx, g, destination, rand(-0.8, 0.8));
    osc.start(t);
    osc.stop(t + dur + 0.05);
    osc.onended = () => {
      osc.disconnect();
      bp.disconnect();
      g.disconnect();
      if (panner) panner.disconnect();
    };
    const id = setTimeout(trigger, rand(1500, 4500) + idx * 250);
    engine.timers.push(id);
  };
  const id = setTimeout(trigger, rand(0, 1200) + idx * 200);
  engine.timers.push(id);
}

/* ---------- Piano: warm additive tone with an ADSR envelope ---------- */
const PIANO_SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
function buildPiano(ctx, destination, engine) {
  const warmth = ctx.createBiquadFilter();
  warmth.type = "lowpass";
  warmth.frequency.value = 2600;
  warmth.connect(destination);
  engine.nodes.push(warmth);
  schedulePianoNote(ctx, warmth, engine);
}
function schedulePianoNote(ctx, destination, engine) {
  const trigger = () => {
    if (!engine.alive) return;
    playPianoNote(ctx, destination, pick(PIANO_SCALE), rand(0.12, 0.22));
    const id = setTimeout(trigger, rand(1800, 3600));
    engine.timers.push(id);
  };
  const id = setTimeout(trigger, rand(0, 800));
  engine.timers.push(id);
}
function playPianoNote(ctx, destination, freq, velocity) {
  const t = ctx.currentTime;
  const noteGain = ctx.createGain();
  noteGain.gain.setValueAtTime(0, t);

  // Fundamental (triangle, warm) + two soft sine partials for body,
  // each with a hair of detune for a subtle chorus/piano-string feel.
  const harmonics = [
    { mult: 1, gain: 1, type: "triangle" },
    { mult: 2, gain: 0.32, type: "sine" },
    { mult: 3, gain: 0.14, type: "sine" },
  ];
  const oscs = [];
  const gains = [];
  harmonics.forEach((h) => {
    const osc = ctx.createOscillator();
    osc.type = h.type;
    osc.frequency.value = freq * h.mult;
    osc.detune.value = rand(-4, 4);
    const hg = ctx.createGain();
    hg.gain.value = h.gain;
    osc.connect(hg).connect(noteGain);
    osc.start(t);
    oscs.push(osc);
    gains.push(hg);
  });

  const panner = connectWithPan(ctx, noteGain, destination, rand(-0.3, 0.3));

  // ADSR: quick attack, short decay to a body level, long soft release.
  noteGain.gain.linearRampToValueAtTime(velocity, t + 0.025);
  noteGain.gain.exponentialRampToValueAtTime(
    Math.max(velocity * 0.55, 0.001),
    t + 0.2,
  );
  noteGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);

  const stopAt = t + 2.7;
  oscs.forEach((osc) => osc.stop(stopAt));
  oscs[0].onended = () => {
    oscs.forEach((osc) => osc.disconnect());
    gains.forEach((g) => g.disconnect());
    noteGain.disconnect();
    if (panner) panner.disconnect();
  };
}

const MODE_BUILDERS = {
  rain: buildRain,
  night: buildNight,
  birds: buildBirds,
  piano: buildPiano,
};

let audioCtx, activeSound;

function initSound() {
  document.querySelectorAll(".sound-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const mode = btn.dataset.sound;
      document
        .querySelectorAll(".sound-btn")
        .forEach((b) =>
          b.classList.toggle("is-on", b === btn && mode !== "off"),
        );
      audioCtx =
        audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") await audioCtx.resume();

      if (mode === "off") {
        stopSound();
        try {
          localStorage.removeItem("ambienceMode");
        } catch (_) {}
        return;
      }

      // Start the new engine, then fade the previous one out underneath
      // it — a real crossfade instead of a hard stop/start.
      const previous = activeSound;
      activeSound = playMode(mode);
      fadeOutEngine(previous);

      try {
        localStorage.setItem("ambienceMode", mode);
      } catch (_) {}
      showMessage(`${mode} mode is on.`);
    });
  });
  restoreAmbiencePreference();
}

// Restores only the visual "is-on" state on reload (browsers block
// audio autoplay without a gesture) so the next click feels continuous.
function restoreAmbiencePreference() {
  let saved;
  try {
    saved = localStorage.getItem("ambienceMode");
  } catch (_) {
    saved = null;
  }
  if (!saved) return;
  const btn = document.querySelector(`.sound-btn[data-sound="${saved}"]`);
  if (btn) btn.classList.add("is-on");
}

function playMode(mode) {
  const ctx = audioCtx;
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
  masterGain.connect(ctx.destination);

  const engine = {
    mode,
    masterGain,
    nodes: [masterGain],
    timers: [],
    alive: true,
  };
  const build = MODE_BUILDERS[mode] || buildPiano;
  build(ctx, masterGain, engine);

  const target = MODE_TARGET_GAIN[mode] ?? 0.4;
  masterGain.gain.linearRampToValueAtTime(
    target,
    ctx.currentTime + CROSSFADE_SECONDS,
  );
  return engine;
}

// Fades one engine's masterGain to silence, cancels its pulse timers
// immediately (so no new nodes get scheduled), then stops/disconnects
// every node it owns once the fade has finished.
function fadeOutEngine(engine) {
  if (!engine) return;
  engine.alive = false;
  engine.timers.forEach((id) => clearTimeout(id));
  engine.timers.length = 0;

  const ctx = audioCtx;
  if (!ctx) return;
  const now = ctx.currentTime;
  try {
    const current = engine.masterGain.gain.value;
    engine.masterGain.gain.cancelScheduledValues(now);
    engine.masterGain.gain.setValueAtTime(current, now);
    engine.masterGain.gain.linearRampToValueAtTime(
      0.0001,
      now + CROSSFADE_SECONDS,
    );
  } catch (_) {}

  setTimeout(
    () => {
      engine.nodes.forEach((n) => {
        try {
          if (n.stop) n.stop();
        } catch (_) {}
        try {
          n.disconnect();
        } catch (_) {}
      });
    },
    CROSSFADE_SECONDS * 1000 + 150,
  );
}

function stopSound() {
  fadeOutEngine(activeSound);
  activeSound = null;
}

waitForBirthdayFilm();
