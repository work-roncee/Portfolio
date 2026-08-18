/* ============================================================
   PD POSITIONING INTERVIEW — app engine
   State lives in localStorage under KEY; every interaction saves.
   Views: home · question · review. No dependencies, no build.
   ============================================================ */

const KEY = "rc-pd-interview-v1";
const app = document.getElementById("app");

/* ── state ── */
let store = load();
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* corrupted → start fresh */ }
  return { answers: {}, cursor: 0, startedAt: new Date().toISOString() };
}
let saveFlagTimer = null;
function save(showFlag = true) {
  store.updatedAt = new Date().toISOString();
  localStorage.setItem(KEY, JSON.stringify(store));
  if (showFlag) {
    const f = document.getElementById("save-flag");
    if (f) {
      f.classList.add("on");
      clearTimeout(saveFlagTimer);
      saveFlagTimer = setTimeout(() => f.classList.remove("on"), 1200);
    }
  }
  paintProgress();
}

function ans(qid) { return store.answers[qid] || null; }
function setAns(qid, patch) {
  const cur = store.answers[qid] || {};
  store.answers[qid] = { ...cur, ...patch, t: new Date().toISOString() };
  save();
}
function hasValue(a) {
  if (!a) return false;
  if (Array.isArray(a.v)) return a.v.length > 0;
  if (typeof a.v === "string") return a.v.trim() !== "";
  return a.v !== undefined && a.v !== null;
}
function answeredCount(secId) {
  const qs = secId ? QUESTIONS.filter(q => q.section === secId) : QUESTIONS;
  return qs.filter(q => hasValue(ans(q.id))).length;
}

/* ── helpers ── */
function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  for (const kid of kids) if (kid != null) n.append(kid);
  return n;
}
function secOf(q) { return SECTIONS.find(s => s.id === q.section); }
function firstIndexOfSection(secId) { return QUESTIONS.findIndex(q => q.section === secId); }
function pad3(n) { return String(n).padStart(3, "0"); }

function paintProgress() {
  const fill = document.getElementById("progress-fill");
  if (fill) fill.style.width = (answeredCount() / QUESTIONS.length * 100).toFixed(1) + "%";
  const c = document.getElementById("hdr-count");
  if (c) c.textContent = `${answeredCount()} / ${QUESTIONS.length} ANSWERED`;
}

/* ── dictation (Web Speech API; button renders only where supported) ── */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function makeDictation(ta, commit) {
  if (!SR) return null;
  let rec = null, active = false, base = "";
  const btn = el("button", { class: "dictate", type: "button" });
  const paint = (label) => {
    btn.textContent = "";
    btn.append(el("span", { class: "tick" + (active ? " filled rec" : "") }), " " + label);
  };
  paint("DICTATE");
  const stop = (label) => {
    active = false;
    try { rec && rec.stop(); } catch (e) { /* already stopped */ }
    paint(label || "DICTATE");
    commit();
  };
  btn.addEventListener("click", () => {
    if (active) return stop();
    rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = navigator.language || "en-US";
    base = ta.value.trim() ? ta.value.replace(/\s+$/, "") + " " : "";
    rec.onresult = (ev) => {
      let interim = "";
      for (let k = ev.resultIndex; k < ev.results.length; k++) {
        const t = ev.results[k][0].transcript;
        if (ev.results[k].isFinal) base += t.trim() + " ";
        else interim += t;
      }
      ta.value = base + interim;
      commit();
    };
    rec.onerror = (ev) => {
      if (ev.error === "not-allowed" || ev.error === "service-not-allowed") stop("MIC BLOCKED — ALLOW IN BROWSER");
      else if (ev.error !== "no-speech" && ev.error !== "aborted") stop("MIC ERROR — TRY AGAIN");
    };
    // continuous mode pauses itself on silence; restart while still active
    rec.onend = () => { if (active) { try { rec.start(); } catch (e) { stop(); } } };
    try {
      rec.start();
      active = true;
      paint("LISTENING — TAP TO STOP");
    } catch (e) { stop("MIC UNAVAILABLE"); }
  });
  return el("div", { class: "dictate-row" }, btn);
}

/* ── views ── */
let view = "home";
function go(v, opts = {}) {
  view = v;
  if (opts.index !== undefined) { store.cursor = opts.index; save(false); }
  render();
  window.scrollTo({ top: 0 });
}

function render() {
  app.textContent = "";
  if (view === "home") renderHome();
  else if (view === "question") renderQuestion();
  else if (view === "review") renderReview();
  paintProgress();
}

/* ══ HOME ══ */
function renderHome() {
  const done = answeredCount();
  const started = done > 0;

  const home = el("div", { class: "home" });
  home.append(
    el("p", { class: "lbl" }, "STRUCTURED INTERVIEW · POSITIONING + CASE-STUDY RESEARCH · PRIVATE"),
    el("h1", { html: 'Ron Cueto — <span class="hl">Product Designer Interview</span>' }),
    el("p", { class: "intro" },
      `${QUESTIONS.length} questions across ${SECTIONS.length} sections — from recruiter-screener basics to hiring-manager depth. Most are a single tap; the write-ins are where case studies come from.`),
    el("p", { class: "intro" },
      "Answers save on this device after every question. Leave anytime; you'll resume exactly where you stopped. Every question is skippable.")
  );

  const meta = el("div", { class: "meta-grid" });
  [["FORMAT", "Tap-first, stories optional"], ["SAVES", "Every answer · this device"], ["EXPORT", "JSON + Markdown, anytime"]]
    .forEach(([k, v]) => meta.append(el("div", {}, el("span", { class: "lbl k" }, k), el("span", { class: "v" }, v))));
  home.append(meta);

  const cta = el("div", { class: "cta-row" });
  cta.append(el("button", {
    class: "btn btn-solid",
    onclick: () => go("question", { index: started ? nextUnansweredFrom(store.cursor) : 0 })
  }, started ? "CONTINUE — QUESTION " + pad3(nextUnansweredFrom(store.cursor) + 1) : "BEGIN INTERVIEW"));
  if (started) cta.append(el("button", { class: "btn", onclick: () => go("review") }, "REVIEW + EXPORT"));
  home.append(cta);

  home.append(el("div", { class: "sec-head" }, el("span", { class: "lbl" }, "SECTIONS")));
  const list = el("div", { class: "sec-list" });
  SECTIONS.forEach(s => {
    const total = QUESTIONS.filter(q => q.section === s.id).length;
    const got = answeredCount(s.id);
    const st = el("span", { class: "st" + (got === total ? " done" : "") }, `${got}/${total}`);
    list.append(el("button", { class: "sec-item", onclick: () => go("question", { index: firstIndexOfSection(s.id) }) },
      el("span", { class: "num" }, s.num),
      el("span", {},
        el("span", { class: "t" }, el("span", { class: "hue", style: `background:${s.hue}` }), s.title),
        el("span", { class: "b" }, s.blurb)),
      st));
  });
  home.append(list);

  const data = el("div", { class: "data-row" });
  data.append(
    el("span", { class: "lbl" }, el("button", { onclick: () => go("review") }, "EXPORT / IMPORT ANSWERS")),
    el("span", { class: "lbl" }, el("button", {
      class: "danger",
      onclick: () => {
        if (confirm("Erase ALL answers on this device? Export first if in doubt.") &&
            confirm("Really sure? This cannot be undone.")) {
          localStorage.removeItem(KEY); store = load(); render();
        }
      }
    }, "RESET ALL ANSWERS"))
  );
  home.append(data);

  home.append(el("footer", { class: "app" },
    el("p", { class: "lbl" }, "BUILT WITH CLAUDE · ANSWERS STAY IN THIS BROWSER · NO TRACKING, NO SERVER")));
  app.append(home);
}

function nextUnansweredFrom(i) {
  for (let k = i; k < QUESTIONS.length; k++) if (!hasValue(ans(QUESTIONS[k].id))) return k;
  for (let k = 0; k < QUESTIONS.length; k++) if (!hasValue(ans(QUESTIONS[k].id))) return k;
  return Math.min(i, QUESTIONS.length - 1);
}

/* ══ QUESTION ══ */
function renderQuestion() {
  const i = store.cursor;
  const q = QUESTIONS[i];
  const s = secOf(q);
  const a = ans(q.id) || {};
  const qEl = el("div", { class: "question" });

  // section intro card when entering a section at its first question
  if (firstIndexOfSection(s.id) === i) {
    qEl.append(el("div", { class: "sec-intro" },
      el("span", { class: "lbl" }, el("span", { class: "hue", style: `display:inline-block;width:7px;height:7px;background:${s.hue};margin-right:.55em` }), `SECTION ${s.num} / 09`),
      el("h2", {}, s.title),
      el("p", {}, s.blurb)));
  }

  const secQs = QUESTIONS.filter(x => x.section === s.id);
  const posInSec = secQs.indexOf(q) + 1;
  qEl.append(el("div", { class: "q-meta" },
    el("span", { class: "lbl" }, `Q ${pad3(i + 1)} / ${pad3(QUESTIONS.length)}`),
    el("span", { class: "lbl" }, `${s.num} · ${s.title.toUpperCase()} · ${posInSec}/${secQs.length}`)));

  qEl.append(el("h2", { class: "q-text" }, q.text));
  if (q.hint) qEl.append(el("p", { class: "q-hint" }, q.hint));

  /* input control */
  if (q.type === "single" || q.type === "multi") {
    const opts = el("div", { class: "opts" });
    q.options.forEach((label, idx) => {
      const selected = q.type === "single" ? a.v === idx : Array.isArray(a.v) && a.v.includes(idx);
      const b = el("button", { class: "opt" + (selected ? " sel" : ""), "data-idx": idx },
        el("span", { class: "key" }, String(idx + 1)),
        el("span", {}, label));
      b.addEventListener("click", () => {
        if (q.type === "single") {
          setAns(q.id, { v: a.v === idx ? undefined : idx });
        } else {
          const cur = Array.isArray(ans(q.id)?.v) ? [...ans(q.id).v] : [];
          const at = cur.indexOf(idx);
          if (at >= 0) cur.splice(at, 1); else { cur.push(idx); cur.sort((x, y) => x - y); }
          setAns(q.id, { v: cur });
        }
        render(); // repaint selection
      });
      opts.append(b);
    });
    qEl.append(opts);
    if (q.type === "multi") qEl.append(el("p", { class: "lbl", style: "margin-top:.6rem" }, "SELECT ALL THAT APPLY"));
  }

  if (q.type === "scale") {
    const sc = el("div", { class: "scale" });
    const row = el("div", { class: "scale-row" });
    for (let v = 1; v <= 5; v++) {
      const b = el("button", { class: "opt-s" + (a.v === v ? " sel" : "") }, String(v));
      b.addEventListener("click", () => { setAns(q.id, { v: a.v === v ? undefined : v }); render(); });
      row.append(b);
    }
    sc.append(row, el("div", { class: "scale-ends" },
      el("span", { class: "lbl" }, "1 — " + (q.low || "")),
      el("span", { class: "lbl" }, "5 — " + (q.high || ""))));
    qEl.append(sc);
  }

  if (q.type === "short" || q.type === "long") {
    const ta = el("textarea", {
      class: q.type === "long" ? "answer-long" : "answer-short",
      placeholder: "Type your answer…"
    });
    ta.value = typeof a.v === "string" ? a.v : "";
    let deb;
    ta.addEventListener("input", () => {
      clearTimeout(deb);
      deb = setTimeout(() => setAns(q.id, { v: ta.value }), 400);
    });
    ta.addEventListener("blur", () => setAns(q.id, { v: ta.value }));
    qEl.append(ta);
    const dict = makeDictation(ta, () => setAns(q.id, { v: ta.value }));
    if (dict) qEl.append(dict);
  }

  /* optional note for choice/scale questions */
  if (q.note) {
    const block = el("div", { class: "note-block" });
    const hasNote = typeof a.n === "string" && a.n.trim() !== "";
    const build = (open) => {
      block.textContent = "";
      if (!open) {
        block.append(el("button", {
          class: "note-toggle",
          onclick: () => build(true)
        }, el("span", { class: "tick" }), " ADD DETAIL"));
      } else {
        block.append(el("span", { class: "lbl note-label" }, NOTE_LABEL.toUpperCase()));
        const nta = el("textarea", { placeholder: "The story, the specifics, the caveats…" });
        nta.value = a.n || "";
        let deb;
        nta.addEventListener("input", () => {
          clearTimeout(deb);
          deb = setTimeout(() => setAns(q.id, { n: nta.value }), 400);
        });
        nta.addEventListener("blur", () => setAns(q.id, { n: nta.value }));
        block.append(nta);
        const dict = makeDictation(nta, () => setAns(q.id, { n: nta.value }));
        if (dict) block.append(dict);
        if (open !== "init") nta.focus();
      }
    };
    build(hasNote ? "init" : false);
    qEl.append(block);
  }

  /* nav */
  const nav = el("div", { class: "q-nav" });
  nav.append(el("button", { class: "btn btn-ghost", disabled: i === 0 ? "" : null, onclick: () => go("question", { index: i - 1 }) }, "← BACK"));
  nav.append(el("span", { class: "save-flag", id: "save-flag" }, "SAVED"));
  nav.append(el("span", { class: "spacer" }));
  const last = i === QUESTIONS.length - 1;
  nav.append(el("button", { class: "btn btn-ghost", onclick: () => last ? go("review") : go("question", { index: i + 1 }) }, "SKIP"));
  nav.append(el("button", {
    class: "btn btn-solid",
    onclick: () => last ? go("review") : go("question", { index: i + 1 })
  }, last ? "FINISH → REVIEW" : "NEXT →"));
  qEl.append(nav);

  app.append(qEl);
}

/* ══ REVIEW / EXPORT / IMPORT ══ */
function renderReview() {
  const r = el("div", { class: "review" });
  const done = answeredCount();
  r.append(
    el("p", { class: "lbl" }, "REVIEW · EXPORT · IMPORT"),
    el("h1", {}, done === QUESTIONS.length ? "Complete. Every question answered." : `${done} of ${QUESTIONS.length} answered.`),
    el("p", { class: "intro" }, done === QUESTIONS.length
      ? "Export the JSON and hand it to Claude for the positioning analysis and case-study drafts."
      : "You can export at any point — partial answers are still useful. Unanswered sections are listed below.")
  );

  const table = el("div", { class: "rev-table" });
  SECTIONS.forEach(s => {
    const total = QUESTIONS.filter(q => q.section === s.id).length;
    const got = answeredCount(s.id);
    table.append(el("div", { class: "rev-row" },
      el("span", { class: "lbl" }, s.num),
      el("span", { class: "t" }, s.title),
      el("span", { class: "lbl", style: got === total ? "color:var(--accent)" : "" }, `${got}/${total}`),
      el("button", { class: "jump", onclick: () => go("question", { index: firstUnansweredInSection(s.id) }) },
        got === total ? "REVISIT" : "RESUME")));
  });
  r.append(table);

  const ex = el("div", { class: "export-row" });
  ex.append(
    el("button", { class: "btn btn-solid", onclick: exportJSON }, "DOWNLOAD JSON"),
    el("button", { class: "btn", onclick: exportMarkdown }, "DOWNLOAD MARKDOWN"),
    el("button", {
      class: "btn", onclick: (e) => {
        navigator.clipboard.writeText(buildJSON()).then(() => {
          e.target.textContent = "COPIED ✓";
          setTimeout(() => e.target.textContent = "COPY JSON", 1500);
        });
      }
    }, "COPY JSON"));
  r.append(ex);
  r.append(el("p", { class: "lbl" }, "JSON IS SELF-CONTAINED (QUESTIONS EMBEDDED) — PASTE OR DROP IT TO CLAUDE FOR ANALYSIS"));

  /* import */
  const imp = el("div", { class: "import-block" });
  imp.append(el("span", { class: "lbl" }, el("span", { class: "tick" }), " IMPORT — MOVE PROGRESS FROM ANOTHER DEVICE"));
  const ta = el("textarea", { placeholder: "Paste exported JSON here…" });
  imp.append(ta);
  const msg = el("span", { class: "import-msg" });
  const file = el("input", { type: "file", accept: ".json,application/json", style: "display:none" });
  file.addEventListener("change", () => {
    const f = file.files[0];
    if (!f) return;
    f.text().then(t => doImport(t, msg));
  });
  imp.append(
    el("button", { class: "btn", onclick: () => doImport(ta.value, msg) }, "IMPORT PASTED"),
    " ",
    el("button", { class: "btn btn-ghost", onclick: () => file.click() }, "IMPORT FILE"),
    file, msg);
  r.append(imp);

  r.append(el("div", { class: "q-nav" },
    el("button", { class: "btn btn-ghost", onclick: () => go("home") }, "← HOME"),
    el("span", { class: "spacer" }),
    el("button", { class: "btn", onclick: () => go("question", { index: nextUnansweredFrom(0) }) },
      done === QUESTIONS.length ? "BROWSE ANSWERS" : "CONTINUE ANSWERING")));
  app.append(r);
}

function firstUnansweredInSection(secId) {
  const idx = QUESTIONS.findIndex(q => q.section === secId && !hasValue(ans(q.id)));
  return idx >= 0 ? idx : firstIndexOfSection(secId);
}

/* ── export builders ── */
function optionLabels(q, v) {
  if (q.type === "single") return typeof v === "number" ? q.options[v] : null;
  if (q.type === "multi") return Array.isArray(v) ? v.map(i => q.options[i]) : null;
  return v;
}
function buildJSON() {
  const out = {
    tool: "pd-positioning-interview",
    version: 1,
    subject: "Ron Cueto — Senior Product Designer",
    startedAt: store.startedAt,
    exportedAt: new Date().toISOString(),
    answered: answeredCount(),
    totalQuestions: QUESTIONS.length,
    sections: SECTIONS.map(s => ({ id: s.id, num: s.num, title: s.title })),
    answers: QUESTIONS.map(q => {
      const a = ans(q.id) || {};
      return {
        id: q.id, section: q.section, type: q.type, question: q.text,
        answered: hasValue(a),
        value: hasValue(a) ? optionLabels(q, a.v) : null,
        rawValue: hasValue(a) ? a.v : null,
        note: a.n && a.n.trim() ? a.n : null,
        answeredAt: a.t || null
      };
    })
  };
  return JSON.stringify(out, null, 2);
}
function buildMarkdown() {
  const lines = [
    "# PD Positioning Interview — Ron Cueto",
    "",
    `Exported ${new Date().toISOString().slice(0, 10)} · ${answeredCount()}/${QUESTIONS.length} answered`,
    ""];
  SECTIONS.forEach(s => {
    lines.push(`## ${s.num} · ${s.title}`, "");
    QUESTIONS.filter(q => q.section === s.id).forEach(q => {
      const a = ans(q.id) || {};
      lines.push(`**${q.text}**`, "");
      if (!hasValue(a)) lines.push("_— skipped —_", "");
      else {
        const v = optionLabels(q, a.v);
        if (Array.isArray(v)) v.forEach(x => lines.push(`- ${x}`));
        else lines.push(q.type === "scale" ? `${v} / 5 (${q.low} → ${q.high})` : String(v));
        lines.push("");
      }
      if (a.n && a.n.trim()) lines.push(`> ${a.n.trim().replace(/\n/g, "\n> ")}`, "");
    });
  });
  return lines.join("\n");
}
function download(name, content, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
const stamp = () => new Date().toISOString().slice(0, 10);
function exportJSON() { download(`ron-cueto-interview-${stamp()}.json`, buildJSON(), "application/json"); }
function exportMarkdown() { download(`ron-cueto-interview-${stamp()}.md`, buildMarkdown(), "text/markdown"); }

function doImport(text, msgEl) {
  try {
    const data = JSON.parse(text);
    if (data.tool !== "pd-positioning-interview" || !Array.isArray(data.answers)) throw new Error("wrong shape");
    let n = 0;
    data.answers.forEach(a => {
      if (!a.answered && !a.note) return;
      const q = QUESTIONS.find(x => x.id === a.id);
      if (!q) return;
      store.answers[a.id] = { v: a.rawValue ?? undefined, n: a.note || undefined, t: a.answeredAt || new Date().toISOString() };
      n++;
    });
    save(false);
    msgEl.textContent = `IMPORTED ${n} ANSWERS ✓`;
    msgEl.className = "import-msg ok";
    setTimeout(render, 900);
  } catch (e) {
    msgEl.textContent = "COULD NOT READ THAT JSON";
    msgEl.className = "import-msg err";
  }
}

/* ── keyboard ── */
document.addEventListener("keydown", (e) => {
  if (view !== "question") return;
  const typing = /^(TEXTAREA|INPUT)$/.test(document.activeElement?.tagName || "");
  if (typing) return;
  const q = QUESTIONS[store.cursor];
  if (e.key >= "1" && e.key <= "9") {
    const idx = Number(e.key) - 1;
    if ((q.type === "single" || q.type === "multi") && idx < q.options.length) {
      document.querySelectorAll(".opt")[idx]?.click(); e.preventDefault();
    } else if (q.type === "scale" && idx < 5) {
      document.querySelectorAll(".opt-s")[idx]?.click(); e.preventDefault();
    }
  }
  if (e.key === "Enter") {
    e.preventDefault();
    store.cursor === QUESTIONS.length - 1 ? go("review") : go("question", { index: store.cursor + 1 });
  }
  if (e.key === "ArrowLeft" && store.cursor > 0) go("question", { index: store.cursor - 1 });
  if (e.key === "ArrowRight" && store.cursor < QUESTIONS.length - 1) go("question", { index: store.cursor + 1 });
});

/* ── boot ── */
render();
