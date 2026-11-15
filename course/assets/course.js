// Tuiwer Defense course: shared behaviour for every page.
// CHAPTERS is the single source of truth for the roadmap, the progress map
// and the previous/next links. A lesson with `href: null` is not written yet.

const CHAPTERS = [
  {
    id: 0, title: "Setup and toolchain",
    concepts: "rustup, cargo, crates, workspace, clippy, rustfmt, CI",
    showoff: "A green CI badge on GitHub.",
    lessons: [
      { id: "0.1", title: "Install the tools", href: "ch00/0.1-install-the-tools.html" },
      { id: "0.2", title: "Meet the toolchain", href: "ch00/0.2-meet-the-toolchain.html" },
      { id: "0.3", title: "The workspace skeleton", href: "ch00/0.3-workspace-skeleton.html" },
      { id: "0.4", title: "Quality gates and CI", href: "ch00/0.4-quality-gates.html" },
    ],
  },
  {
    id: 1, title: "First steps",
    concepts: "let, mut, shadowing, scalar types, overflow, expressions, structs, impl, derive",
    showoff: "The battlefield prints in your terminal.",
    lessons: [
      { id: "1.1", title: "Bindings and scalar types", href: "ch01/1.1-bindings-and-types.html" },
      { id: "1.2", title: "Functions are expressions", href: "ch01/1.2-functions-are-expressions.html" },
      { id: "1.3", title: "Structs and methods", href: "ch01/1.3-structs-and-methods.html" },
      { id: "1.4", title: "Draw the battlefield", href: "ch01/1.4-draw-the-battlefield.html" },
    ],
  },
  {
    id: 2, title: "Enums and pattern matching",
    concepts: "enums with data, match, exhaustiveness, if let, let else, state machines",
    showoff: "The game moves through Build → Wave → Result phases.",
    lessons: [
      { id: "2.1", title: "Enums are discriminated unions", href: null },
      { id: "2.2", title: "match and exhaustiveness", href: null },
      { id: "2.3", title: "if let, let else, matches!", href: null },
      { id: "2.4", title: "The game phase state machine", href: null },
    ],
  },
  {
    id: 3, title: "Ownership and borrowing",
    concepts: "move, Copy vs Clone, &, &mut, borrow rules, String vs &str, slices",
    showoff: "You place towers on the map.",
    lessons: [
      { id: "3.1", title: "Who owns this value?", href: null },
      { id: "3.2", title: "Borrowing: & and &mut", href: null },
      { id: "3.3", title: "String, &str and slices", href: null },
      { id: "3.4", title: "The GameState owns the world", href: null },
    ],
  },
  {
    id: 4, title: "Option, Result and errors",
    concepts: "Option, Result, ?, custom error enums, thiserror, panic vs Result",
    showoff: "The game explains why a tower cannot go there.",
    lessons: [
      { id: "4.1", title: "No null: Option<T>", href: null },
      { id: "4.2", title: "Result and the ? operator", href: null },
      { id: "4.3", title: "Domain errors as enums", href: null },
    ],
  },
  {
    id: 5, title: "Collections and iterators",
    concepts: "Vec, HashMap, iterator adapters, LINQ → iterators, retain, first closures",
    showoff: "Enemies walk along the path, wave after wave.",
    lessons: [
      { id: "5.1", title: "Vec and HashMap", href: null },
      { id: "5.2", title: "Iterators are lazy LINQ", href: null },
      { id: "5.3", title: "Waves and moving enemies", href: null },
    ],
  },
  {
    id: 6, title: "Traits and generics",
    concepts: "traits vs interfaces, default methods, generics, bounds, impl Trait, Display, From",
    showoff: "Three tower types with their own behaviour.",
    lessons: [
      { id: "6.1", title: "Traits are not quite interfaces", href: null },
      { id: "6.2", title: "Generics and trait bounds", href: null },
      { id: "6.3", title: "Standard traits: Display, From, Default", href: null },
      { id: "6.4", title: "Towers that shoot", href: null },
    ],
  },
  {
    id: 7, title: "The terminal shell",
    concepts: "ratatui, crossterm, game loop, ticks vs frames, input → Command, Drop (RAII)",
    showoff: "A real TUI: you play with the keyboard.",
    lessons: [
      { id: "7.1", title: "Your first ratatui screen", href: null },
      { id: "7.2", title: "The game loop", href: null },
      { id: "7.3", title: "Keys become Commands", href: null },
      { id: "7.4", title: "Drop: always restore the terminal", href: null },
    ],
  },
  {
    id: 8, title: "Modules and visibility",
    concepts: "mod, pub, pub(crate), use, re-exports, doc comments, doc tests",
    showoff: "cargo doc shows your domain API as a website.",
    lessons: [
      { id: "8.1", title: "Split the domain into modules", href: null },
      { id: "8.2", title: "Design the public API", href: null },
      { id: "8.3", title: "Docs that are tests", href: null },
    ],
  },
  {
    id: 9, title: "Functional Rust",
    concepts: "closures, Fn/FnMut/FnOnce, fold, combinators on Option/Result, F# links",
    showoff: "Towers choose targets with pluggable strategies.",
    lessons: [
      { id: "9.1", title: "Closures and the three Fn traits", href: null },
      { id: "9.2", title: "Combinators everywhere", href: null },
      { id: "9.3", title: "Targeting strategies", href: null },
    ],
  },
  {
    id: 10, title: "Lifetimes",
    concepts: "'a, elision rules, structs that hold references, view models",
    showoff: "The renderer reads the game through a zero-copy view.",
    lessons: [
      { id: "10.1", title: "What a lifetime really is", href: null },
      { id: "10.2", title: "Structs that borrow", href: null },
      { id: "10.3", title: "A view model for rendering", href: null },
    ],
  },
  {
    id: 11, title: "Smart pointers",
    concepts: "Box, Rc, RefCell, Weak, entity ids, generational indexes",
    showoff: "Enemies are tracked by safe, stable ids.",
    lessons: [
      { id: "11.1", title: "Box and recursive types (side quest)", href: null },
      { id: "11.2", title: "Rc and RefCell: shared ownership", href: null },
      { id: "11.3", title: "Why games use ids, not pointers", href: null },
    ],
  },
  {
    id: 12, title: "Testing in depth — first playable",
    concepts: "integration tests, fixtures, seeded RNG, proptest, TestBackend snapshots",
    showoff: "MILESTONE: first playable version. A test replays a full game.",
    lessons: [
      { id: "12.1", title: "Integration tests and fixtures", href: null },
      { id: "12.2", title: "Deterministic randomness", href: null },
      { id: "12.3", title: "Property tests", href: null },
      { id: "12.4", title: "Win, lose, and the first playable game", href: null },
    ],
  },
  {
    id: 13, title: "Serde and the infra layer",
    concepts: "serde derive, RON, ports as traits, generics vs dyn Trait, new crate",
    showoff: "Levels load from files. You can save and continue.",
    lessons: [
      { id: "13.1", title: "Serde in one hour", href: null },
      { id: "13.2", title: "Ports: generics or dyn Trait?", href: null },
      { id: "13.3", title: "Extract the tuiwer-infra crate", href: null },
    ],
  },
  {
    id: 14, title: "Concurrency",
    concepts: "threads, channels, Send/Sync, Arc, Mutex, scoped threads",
    showoff: "Input runs on its own thread. Nothing blocks.",
    lessons: [
      { id: "14.1", title: "Fearless threads", href: null },
      { id: "14.2", title: "Channels: an input thread", href: null },
      { id: "14.3", title: "Arc and Mutex (side quest)", href: null },
    ],
  },
  {
    id: 15, title: "Macros",
    concepts: "macro_rules!, repetition, hygiene, how derive works",
    showoff: "Define a new tower in three lines.",
    lessons: [
      { id: "15.1", title: "macro_rules! basics", href: null },
      { id: "15.2", title: "A tower definition macro", href: null },
      { id: "15.3", title: "How derive macros work", href: null },
    ],
  },
  {
    id: 16, title: "Polish and pathfinding",
    concepts: "mouse events, upgrades, BinaryHeap, Ord, A*, performance basics",
    showoff: "Open-grid maps: your towers become the maze.",
    lessons: [
      { id: "16.1", title: "Mouse support", href: null },
      { id: "16.2", title: "Upgrade and sell", href: null },
      { id: "16.3", title: "A* on an open grid", href: null },
    ],
  },
  {
    id: 17, title: "Beyond the game",
    concepts: "async/await, Tokio, futures, unsafe, FFI basics",
    showoff: "An online high-score board (side quest).",
    lessons: [
      { id: "17.1", title: "async/await vs C# Tasks (side quest)", href: null },
      { id: "17.2", title: "A tiny high-score server (side quest)", href: null },
      { id: "17.3", title: "unsafe: what it really means (side quest)", href: null },
    ],
  },
  {
    id: 18, title: "Ship it",
    concepts: "release profile, cargo install, GitHub releases, GitHub Pages",
    showoff: "Friends install Tuiwer Defense with one command.",
    lessons: [
      { id: "18.1", title: "Release builds and binaries", href: null },
      { id: "18.2", title: "Publish the course on GitHub Pages", href: null },
    ],
  },
];

const STORE_KEY = "tuiwer.done";
const THEME_KEY = "tuiwer.theme";
const THEMES = ["auto", "light", "dark"];

function loadTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return THEMES.includes(t) ? t : "auto";
  } catch {
    return "auto";
  }
}

// Runs immediately (the script is in <head>), so the page never flashes the wrong theme.
(function applyStoredTheme() {
  const t = loadTheme();
  if (t !== "auto") document.documentElement.dataset.theme = t;
})();

function setupThemeToggle() {
  const btn = document.createElement("button");
  btn.className = "theme-toggle";
  const icons = { auto: "◐ Auto", light: "☀ Light", dark: "☾ Dark" };
  btn.textContent = icons[loadTheme()];
  btn.title = "Change theme";
  btn.addEventListener("click", () => {
    const next = THEMES[(THEMES.indexOf(loadTheme()) + 1) % THEMES.length];
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage blocked: the choice lasts for this page view only */
    }
    if (next === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = next;
    // Mermaid and the progress map are drawn with the theme colours: redraw them.
    location.reload();
  });
  document.body.appendChild(btn);
}

function loadDone() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORE_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveDone(done) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify([...done]));
  } catch {
    /* storage blocked: progress lives only for this page view */
  }
}

// Pages in a chapter folder need "../" to reach the course root.
function rootPrefix() {
  return document.body.dataset.root || "";
}

function allLessons() {
  return CHAPTERS.flatMap((c) => c.lessons.map((l) => ({ ...l, chapter: c })));
}

function isDark() {
  const forced = document.documentElement.dataset.theme;
  if (forced) return forced === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// ---------- code blocks ----------

function setupCode() {
  if (window.hljs) window.hljs.highlightAll();
  document.querySelectorAll("pre").forEach((pre) => {
    if (pre.classList.contains("mermaid")) return;
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(pre.querySelector("code")?.innerText ?? pre.innerText);
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = "Copy"), 1200);
    });
    pre.appendChild(btn);
  });
}

function setupMermaid() {
  if (!window.mermaid) return;
  window.mermaid.initialize({
    startOnLoad: true,
    theme: isDark() ? "dark" : "neutral",
    fontFamily: "system-ui, sans-serif",
  });
}

// ---------- lesson pages ----------

function setupLesson() {
  const id = document.body.dataset.lesson;
  if (!id) return;
  const done = loadDone();
  const main = document.querySelector("main");

  const bar = document.createElement("div");
  bar.className = "done-bar";
  bar.innerHTML = `<span>Finished the exercises and the check is green?</span>`;
  const btn = document.createElement("button");
  btn.className = "done-toggle";
  const paint = () => {
    const isDone = done.has(id);
    btn.classList.toggle("is-done", isDone);
    btn.textContent = isDone ? "✓ Wave defeated" : "Mark lesson as done";
  };
  btn.addEventListener("click", () => {
    done.has(id) ? done.delete(id) : done.add(id);
    saveDone(done);
    paint();
  });
  paint();
  bar.appendChild(btn);
  main.appendChild(bar);

  const lessons = allLessons();
  const i = lessons.findIndex((l) => l.id === id);
  const prev = lessons[i - 1];
  const next = lessons[i + 1];
  const root = rootPrefix();
  const link = (l, dir) => {
    if (!l) return "<span></span>";
    if (!l.href) return `<span title="Ask Claude to generate chapter ${l.chapter.id}">${dir === "next" ? "Next: " : ""}${l.id} ${l.title} (not written yet)</span>`;
    return dir === "prev"
      ? `<a href="${root}${l.href}">← ${l.id} ${l.title}</a>`
      : `<a href="${root}${l.href}">${l.id} ${l.title} →</a>`;
  };
  const nav = document.createElement("nav");
  nav.className = "pager";
  nav.innerHTML = link(prev, "prev") + `<a href="${root}index.html">Course map</a>` + link(next, "next");
  main.appendChild(nav);
}

// ---------- index page ----------

function setupIndex() {
  const mapEl = document.getElementById("progress-map");
  const listEl = document.getElementById("chapter-list");
  if (!mapEl || !listEl) return;
  const done = loadDone();

  // Snake path: 5 nodes per row, alternate direction, like a TD enemy path.
  const perRow = 5, dx = 180, dy = 110, x0 = 110, y0 = 70;
  const pos = CHAPTERS.map((c, i) => {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const x = x0 + (row % 2 === 0 ? col : perRow - 1 - col) * dx;
    return { x, y: y0 + row * dy };
  });
  const rows = Math.ceil(CHAPTERS.length / perRow);
  const h = y0 * 2 + (rows - 1) * dy;
  const pathD = pos.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");

  const css = getComputedStyle(document.documentElement);
  const col = (v) => css.getPropertyValue(v).trim();

  let nodes = "";
  let defeated = 0;
  let total = 0;
  CHAPTERS.forEach((c, i) => {
    const n = c.lessons.length;
    const d = c.lessons.filter((l) => done.has(l.id)).length;
    total += n;
    defeated += d;
    const full = d === n;
    const started = d > 0;
    const fill = full ? col("--ok") : started ? col("--accent-soft") : col("--surface-2");
    const stroke = full ? col("--ok") : started ? col("--accent") : col("--border");
    const text = full ? col("--surface") : col("--text");
    const label = c.title.length > 22 ? c.title.slice(0, 21) + "…" : c.title;
    nodes += `
      <g class="map-node" data-ch="${c.id}">
        <circle cx="${pos[i].x}" cy="${pos[i].y}" r="26" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
        <text x="${pos[i].x}" y="${pos[i].y + 5}" text-anchor="middle" fill="${text}">${full ? "✓" : c.id}</text>
        <text class="label" x="${pos[i].x}" y="${pos[i].y + 46}" text-anchor="middle">${label}</text>
      </g>`;
  });

  mapEl.innerHTML = `
    <svg viewBox="0 0 940 ${h}" role="img" aria-label="Course progress map">
      <path d="${pathD}" fill="none" stroke="${col("--accent")}" stroke-opacity="0.35"
            stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${pathD}" fill="none" stroke="${col("--accent")}" stroke-width="2"
            stroke-dasharray="2 10" stroke-linecap="round"/>
      ${nodes}
    </svg>`;
  mapEl.querySelectorAll(".map-node").forEach((g) =>
    g.addEventListener("click", () =>
      document.getElementById(`ch-${g.dataset.ch}`)?.scrollIntoView({ behavior: "smooth" })
    )
  );

  document.getElementById("progress-line").textContent =
    `${defeated} of ${total} waves defeated (one wave = one lesson).`;

  listEl.innerHTML = CHAPTERS.map((c) => `
    <section class="chapter-card" id="ch-${c.id}">
      <h3><span class="num">Chapter ${c.id}</span> ${c.title}</h3>
      <div class="concepts">${c.concepts}</div>
      <ul>
        ${c.lessons.map((l) => {
          const tick = done.has(l.id) ? "✓" : "";
          return l.href
            ? `<li><span class="tick">${tick}</span><a href="${l.href}">${l.id} ${l.title}</a></li>`
            : `<li class="pending"><span class="tick">${tick}</span>${l.id} ${l.title}</li>`;
        }).join("")}
      </ul>
      <div class="showoff-line">★ ${c.showoff}</div>
      ${c.lessons.some((l) => !l.href) ? `<div class="concepts">Not written yet. Ask Claude: “generate chapter ${c.id}”.</div>` : ""}
    </section>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupCode();
  setupMermaid();
  setupLesson();
  setupIndex();
});
