/* =============================================================
   CONFIG — edit this block first, before anything else.
============================================================= */
const CONFIG = {
  githubUsername: "YOUR_GITHUB_USERNAME", // EDIT: also update the two <img> URLs in index.html
  statusMessages: [
    "open to SDE / backend roles",
    "solving today's Codeforces problem",
    "shipping the telemetry engine",
  ],
};

/* =============================================================
   BOOT SEQUENCE
============================================================= */
(function boot(){
  const el = document.getElementById("boot-text");
  const screen = document.getElementById("boot-screen");
  const lines = [
    "> initializing console...",
    "> loading profile: nikhil",
    "> role: backend / sde (primary) · ai-ml (secondary)",
    "> status: ready",
  ];
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function finish(delay){
    setTimeout(() => {
      screen.classList.add("is-done");
      window.dispatchEvent(new Event("boot:done"));
    }, delay);
  }

  if (prefersReduced){
    el.textContent = lines.join("\n");
    finish(300);
    return;
  }

  let i = 0, j = 0, out = "";
  function type(){
    if (i >= lines.length){
      finish(350);
      return;
    }
    const line = lines[i];
    if (j <= line.length){
      out = lines.slice(0, i).join("\n") + (i > 0 ? "\n" : "") + line.slice(0, j);
      el.textContent = out;
      j++;
      setTimeout(type, 14);
    } else {
      i++; j = 0;
      out += "\n";
      setTimeout(type, 120);
    }
  }
  type();
})();

/* =============================================================
   HERO ENTRANCE — steps in once the boot sequence finishes.
   A distinct motion type from the scroll-reveals below: this one
   fires on a load event, not on scroll position.
============================================================= */
(function heroEntrance(){
  const grid = document.getElementById("hero-grid");
  if (!grid) return;
  window.addEventListener("boot:done", () => grid.classList.add("is-ready"), { once: true });
})();

/* =============================================================
   STATUS LINE TYPEWRITER (hero)
============================================================= */
(function statusTypewriter(){
  const el = document.getElementById("status-typed");
  if (!el) return;
  const messages = CONFIG.statusMessages;
  let m = 0, c = 0, deleting = false;

  function tick(){
    const msg = messages[m];
    el.textContent = deleting ? msg.slice(0, c--) : msg.slice(0, c++);

    let delay = deleting ? 30 : 45;
    if (!deleting && c === msg.length + 1){ delay = 1400; deleting = true; }
    if (deleting && c === 0){ deleting = false; m = (m + 1) % messages.length; delay = 300; }
    setTimeout(tick, delay);
  }
  tick();
})();

/* =============================================================
   CLOCK
============================================================= */
(function clock(){
  const el = document.getElementById("clock");
  if (!el) return;
  function update(){
    const d = new Date();
    el.textContent = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  update();
  setInterval(update, 15000);
})();

/* =============================================================
   THEME TOGGLE (in-memory only — no localStorage, see README)
============================================================= */
(function themeToggle(){
  const btn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  let theme = prefersLight ? "light" : "dark";
  root.setAttribute("data-theme", theme);
  btn.setAttribute("aria-pressed", String(theme === "light"));

  btn.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", theme);
    btn.setAttribute("aria-pressed", String(theme === "light"));
    btn.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  });
})();

/* =============================================================
   TELEMETRY WIDGET — the one bold interactive centerpiece.
   Three honest phases mapped to real focus shifts, not fake
   analytics. Canvas draws two illustrative curves; the scrubber
   moves a playhead and updates the readout text.
============================================================= */
(function telemetry(){
  const canvas = document.getElementById("telemetry-canvas");
  const scrubber = document.getElementById("scrubber");
  const phaseLabel = document.getElementById("phase-label");
  const focusEl = document.getElementById("readout-focus");
  const projectEl = document.getElementById("readout-project");
  if (!canvas || !scrubber) return;
  const ctx = canvas.getContext("2d");

  const phases = [
    { until: 33, name: "FOUNDATIONS", focus: "CS fundamentals + DSA", project: "Codeforces problem-solving" },
    { until: 66, name: "BUILDING", focus: "Full-stack + applied AI", project: "Second Brain Assistant, Scam Detector Bot" },
    { until: 100, name: "NOW", focus: "Systems design + placement prep", project: "Algorithmic Telemetry Engine" },
  ];

  // Two smooth illustrative curves (not real measured data)
  function curveA(t){ return 0.15 + 0.55 * Math.pow(t, 1.3); }        // steady climb
  function curveB(t){ return 0.05 + 0.85 * Math.pow(Math.sin(t * 1.15), 2); } // punchy, project-driven

  function resize(){
    const ratio = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || 520;
    const h = 220;
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw(Number(scrubber.value));
  }

  function styleVar(name){
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function draw(value){
    const w = canvas.clientWidth || 520;
    const h = 220;
    const pad = 16;
    ctx.clearRect(0, 0, w, h);

    // grid
    ctx.strokeStyle = styleVar("--border");
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= 4; gx++){
      const x = pad + (gx / 4) * (w - pad * 2);
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, h - pad); ctx.stroke();
    }

    const steps = 80;
    const teal = styleVar("--accent-teal");
    const amber = styleVar("--accent-amber");

    function plot(fn, color){
      ctx.beginPath();
      for (let i = 0; i <= steps; i++){
        const t = i / steps;
        const x = pad + t * (w - pad * 2);
        const y = h - pad - fn(t) * (h - pad * 2);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    plot(curveA, teal);
    plot(curveB, amber);

    // playhead
    const t = value / 100;
    const x = pad + t * (w - pad * 2);
    ctx.beginPath();
    ctx.moveTo(x, pad); ctx.lineTo(x, h - pad);
    ctx.strokeStyle = styleVar("--text-muted");
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(x, h - pad - curveA(t) * (h - pad * 2), 4, 0, Math.PI * 2);
    ctx.fillStyle = teal;
    ctx.fill();
  }

  function updateReadout(value){
    const phase = phases.find(p => value <= p.until) || phases[phases.length - 1];
    phaseLabel.textContent = phase.name;
    focusEl.textContent = phase.focus;
    projectEl.textContent = phase.project;
    draw(value);
  }

  scrubber.addEventListener("input", (e) => updateReadout(Number(e.target.value)));
  window.addEventListener("resize", resize);
  resize();
  updateReadout(Number(scrubber.value));

  // One-time driven animation: sweep the playhead from 0 to 100 once the
  // boot sequence finishes, landing on "NOW". After that it's fully
  // user-controlled via the scrubber — a different motion type from the
  // scroll-triggered reveals used elsewhere on the page.
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.addEventListener("boot:done", () => {
    if (prefersReduced){ scrubber.value = 100; updateReadout(100); return; }
    const duration = 1600;
    const start = performance.now();
    function step(now){
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(eased * 100);
      scrubber.value = value;
      updateReadout(value);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, { once: true });
})();

/* =============================================================
   SKILLS DATA + RENDER
============================================================= */
const SKILLS = [
  { category: "Backend", items: [
    { name: "Node.js / Express", tier: "core" },
    { name: "Python", tier: "core" },
    { name: "REST API design", tier: "core" },
    { name: "MongoDB / PostgreSQL", tier: "working" },
    { name: "Docker", tier: "working" },
  ]},
  { category: "AI / ML", items: [
    { name: "OpenAI / LLM integration", tier: "working" },
    { name: "Vector embeddings", tier: "working" },
    { name: "CatBoost / LightGBM / XGBoost", tier: "working" },
    { name: "Optuna tuning", tier: "exploring" },
  ]},
  { category: "Frontend", items: [
    { name: "React / Next.js", tier: "core" },
    { name: "JavaScript (ES6+)", tier: "core" },
  ]},
  { category: "Tools & Practices", items: [
    { name: "Git / GitHub", tier: "core" },
    { name: "CI/CD", tier: "working" },
    { name: "AWS", tier: "exploring" },
    { name: "Competitive programming (Codeforces)", tier: "core" },
  ]},
];

(function renderSkills(){
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.innerHTML = SKILLS.map((group, i) => `
    <div class="skill-card reveal reveal-scale" style="transition-delay:${i * 90}ms">
      <h3>${group.category}</h3>
      ${group.items.map(item => `
        <div class="skill-row">
          <span class="skill-name">${item.name}</span>
          <span class="skill-tier" data-tier="${item.tier}">${item.tier}</span>
        </div>
      `).join("")}
    </div>
  `).join("");
})();

/* =============================================================
   PROJECTS DATA + RENDER + FILTER
   EDIT: replace "#" links with your real repo / demo URLs.
============================================================= */
const PROJECTS = [
  {
    title: "Algorithmic Telemetry Engine",
    desc: "Real-time algorithm performance visualization platform using a racing-telemetry metaphor — watch how an algorithm actually behaves as it runs, not just its final Big-O label.",
    tags: ["React", "Next.js", "Python", "Docker", "AWS"],
    category: ["backend", "tools"],
    repo: "#", demo: "#",
  },
  {
    title: "Codeforces Problem of the Day — Chrome Extension",
    desc: "Manifest V3 extension that surfaces a deterministic daily problem via a date-seeded xorshift32 generator, with rating-color-coded cards, tag filtering, and streak tracking.",
    tags: ["Chrome Extension", "JavaScript", "Manifest V3"],
    category: ["tools"],
    repo: "#", demo: "#",
  },
  {
    title: "Fake News & Scam Detector — WhatsApp Bot",
    desc: "AI-powered WhatsApp bot that flags scams and misinformation in real time, with India-specific scam patterns and an admin dashboard for monitoring flagged messages.",
    tags: ["Node.js", "OpenAI", "Twilio", "MongoDB"],
    category: ["backend", "ai-ml"],
    repo: "#", demo: "#",
  },
  {
    title: "Second Brain Assistant",
    desc: "AI-powered personal productivity system using vector embeddings and GPT to organize and retrieve personal knowledge — written up as an IEEE conference paper.",
    tags: ["React", "Node.js", "PostgreSQL", "OpenAI", "Vector Search"],
    category: ["ai-ml", "backend"],
    repo: "#", demo: "#",
  },
  {
    title: "Sensor Anomaly Detection Pipeline",
    desc: "Full ML pipeline for a Kaggle-style anomaly detection competition — CatBoost / LightGBM / XGBoost ensemble tuned with Optuna, built as a Colab-compatible notebook.",
    tags: ["Python", "CatBoost", "XGBoost", "Optuna"],
    category: ["ai-ml"],
    repo: "#", demo: "#",
  },
];

// EDIT: fill in real one-line descriptions for these — names only for now.
const MORE_PROJECTS = [
  { name: "ImagiCraft", note: "add a one-line description + repo link" },
  { name: "Fixit", note: "add a one-line description + repo link" },
  { name: "F1 Data Analytics Dashboard", note: "add a one-line description + repo link" },
  { name: "Kroos (open-source contribution)", note: "add a one-line description + repo link" },
];

(function renderProjects(){
  const grid = document.getElementById("project-grid");
  const filterRow = document.getElementById("filter-row");
  const moreList = document.getElementById("more-list");
  if (!grid) return;

  function card(p, i){
    const dir = i % 2 === 0 ? "reveal-left" : "reveal-right";
    return `
      <article class="project-card reveal ${dir}" style="transition-delay:${(i % 3) * 100}ms" data-categories="${p.category.join(" ")}">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}</div>
        <div class="project-links">
          <a href="${p.repo}" target="_blank" rel="noopener">Code →</a>
          <a href="${p.demo}" target="_blank" rel="noopener">Demo →</a>
        </div>
      </article>`;
  }

  grid.innerHTML = PROJECTS.map(card).join("");

  filterRow.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterRow.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", String(b === btn));
    });
    const filter = btn.dataset.filter;
    grid.querySelectorAll(".project-card").forEach(card => {
      const cats = card.dataset.categories.split(" ");
      card.style.display = (filter === "all" || cats.includes(filter)) ? "" : "none";
    });
  });

  if (moreList){
    moreList.innerHTML = MORE_PROJECTS.map(p => `
      <li><span class="more-name">${p.name}</span><span class="more-note">${p.note}</span></li>
    `).join("");
  }
})();

/* =============================================================
   SCROLL REVEALS — observes every .reveal element (including the
   ones just rendered above) and fades/slides each in once, the
   first time it enters the viewport.
============================================================= */
(function scrollReveal(){
  document.querySelectorAll(".section-heading").forEach(h => h.classList.add("reveal", "reveal-up"));

  const items = document.querySelectorAll(".reveal");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)){
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

  items.forEach(el => observer.observe(el));
})();

/* =============================================================
   SCROLL PROGRESS BAR
============================================================= */
(function scrollProgress(){
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  function update(){
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();

/* =============================================================
   NAV SCROLL-SPY + SLIDING INDICATOR
============================================================= */
(function navSpy(){
  const nav = document.querySelector(".site-nav");
  const indicator = document.getElementById("nav-indicator");
  if (!nav || !indicator) return;

  const links = Array.from(nav.querySelectorAll("a"));
  const sections = links.map(a => document.querySelector(a.getAttribute("href")));

  function setActive(link){
    links.forEach(l => l.classList.toggle("is-active", l === link));
    const navRect = nav.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    indicator.style.left = (rect.left - navRect.left) + "px";
    indicator.style.width = rect.width + "px";
    indicator.classList.add("is-active");
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const idx = sections.indexOf(entry.target);
        if (idx > -1) setActive(links[idx]);
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(s => s && observer.observe(s));

  window.addEventListener("resize", () => {
    const active = links.find(l => l.classList.contains("is-active"));
    if (active) setActive(active);
  });
})();

/* =============================================================
   COPY EMAIL BUTTON
============================================================= */
(function copyEmail(){
  const btn = document.getElementById("copy-email");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    const hint = btn.querySelector(".copy-hint");
    try {
      await navigator.clipboard.writeText(email);
      if (hint) { const prev = hint.textContent; hint.textContent = "copied!"; setTimeout(() => hint.textContent = prev, 1500); }
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
})();

/* =============================================================
   FOOTER YEAR + CONSOLE EASTER EGG
============================================================= */
document.getElementById("year").textContent = new Date().getFullYear();

console.log(
  "%cHi — you found the console.\n%cLike the site? The source is right here: view-source or the repo link in the footer.\nOpen to SDE / backend roles — see the Contact section.",
  "color:#45D6C6; font-family: monospace; font-size: 13px; font-weight: bold;",
  "color:#8FA1AC; font-family: monospace; font-size: 12px;"
);
