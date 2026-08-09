/* =========================================================
   Infografía Interactiva NLP · Lógica de interacción
   JavaScript puro (sin dependencias)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Utilidades ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    setupHeaderScroll();
    setupProgressBar();
    setupMobileNav();
    setupReveal();
    setupCounters();
    setupPipeline();
    setupLibToggles();
    setupSentiment();
    setupQuiz();
    setupToTop();
  }

  /* ---------- Año en el footer ---------- */
  function setYear() {
    const el = $("#year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Header con sombra al hacer scroll ---------- */
  function setupHeaderScroll() {
    const header = $("#siteHeader");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Barra de progreso de lectura ---------- */
  function setupProgressBar() {
    const bar = $("#progressBar");
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pct = height > 0 ? (scrolled / height) * 100 : 0;
      bar.style.width = pct + "%";
      bar.setAttribute("aria-valuenow", Math.round(pct));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------- Menú móvil ---------- */
  function setupMobileNav() {
    const toggle = $("#navToggle");
    const menu = $("#navMenu");
    if (!toggle || !menu) return;

    const close = () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    menu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Reveal al hacer scroll (IntersectionObserver) ---------- */
  function setupReveal() {
    const targets = $$(".section-head, .concept-card, .glossary, .pipeline, .pipeline-output, .lib-card, .table-wrap, .app-card, .sentiment-demo, .resource-card, .quiz");
    targets.forEach((el) => el.classList.add("reveal"));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- Contadores animados ---------- */
  function setupCounters() {
    const stats = $$(".stat");
    if (!stats.length) return;

    const animate = (stat) => {
      const numEl = $(".stat-number", stat);
      const target = parseInt(stat.dataset.target, 10) || 0;
      const suffix = stat.dataset.suffix || "";
      const duration = 1600;
      const start = performance.now();

      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const value = Math.round(eased * target);
        numEl.textContent = value.toLocaleString("es") + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      stats.forEach(animate);
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    stats.forEach((s) => io.observe(s));
  }

  /* ---------- Pipeline interactivo ---------- */
  function setupPipeline() {
    const steps = $$(".pipeline-step");
    const output = $("#pipelineOutput");
    if (!steps.length || !output) return;

    const tokens = ["El", "paciente", "presenta", "fiebre", "y", "tos", "desde", "el", "lunes", "."];
    const stopwords = new Set(["el", "y", "desde", "el", "."]);
    const pos = {
      El: "DET", paciente: "NOUN", presenta: "VERB", fiebre: "NOUN",
      y: "CCONJ", tos: "NOUN", desde: "ADP", lunes: "NOUN"
    };

    const renders = [
      // 0 · Tokenización
      () => `
        <h3 class="po-title">Resultado · Tokenización</h3>
        <div class="token-row">
          ${tokens.map((t) => `<span class="token">${t}</span>`).join("")}
        </div>
        <p class="po-note">La frase se divide en <strong>${tokens.length} tokens</strong> (palabras y signos).</p>`,
      // 1 · Limpieza
      () => `
        <h3 class="po-title">Resultado · Limpieza (stopwords)</h3>
        <div class="token-row">
          ${tokens.map((t) => {
            const isStop = stopwords.has(t.toLowerCase()) || t === ".";
            return `<span class="token ${isStop ? "dim" : ""}">${t}</span>`;
          }).join("")}
        </div>
        <p class="po-note">Se descartan las <strong>palabras vacías</strong> (el, y, desde…) que aportan poco significado.</p>`,
      // 2 · POS tagging
      () => `
        <h3 class="po-title">Resultado · Etiquetado gramatical (POS)</h3>
        <div class="token-row">
          ${tokens.filter((t) => t !== ".").map((t) =>
            `<span class="token tag">${t}<span class="tag-label">${pos[t] || "?"}</span></span>`
          ).join("")}
        </div>
        <p class="po-note">Cada palabra recibe su <strong>categoría gramatical</strong>: sustantivo, verbo, determinante…</p>`,
      // 3 · NER
      () => `
        <h3 class="po-title">Resultado · Entidades (NER)</h3>
        <div class="token-row">
          <span class="token entity">fiebre<span class="ent-label">SÍNTOMA</span></span>
          <span class="token entity">tos<span class="ent-label">SÍNTOMA</span></span>
          <span class="token entity">lunes<span class="ent-label">FECHA</span></span>
        </div>
        <p class="po-note">Se detectan <strong>entidades clave</strong>: síntomas y una referencia temporal.</p>`,
      // 4 · Vectorización
      () => {
        const vec = Array.from({ length: 8 }, () => (Math.random() * 2 - 1).toFixed(2));
        return `
        <h3 class="po-title">Resultado · Vectorización (embedding)</h3>
        <p class="vector-row">"fiebre" → [ ${vec.join(", ")} , … ]</p>
        <p class="po-note">El texto se convierte en <strong>vectores numéricos</strong> que el modelo puede procesar. Palabras con significado parecido quedan cerca en el espacio vectorial.</p>`;
      }
    ];

    const activate = (idx) => {
      steps.forEach((s, i) => {
        const active = i === idx;
        s.classList.toggle("is-active", active);
        s.setAttribute("aria-pressed", String(active));
      });
      output.innerHTML = renders[idx]();
    };

    steps.forEach((step) => {
      const idx = parseInt(step.dataset.step, 10);
      step.addEventListener("click", () => activate(idx));
      step.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate(idx);
        }
      });
    });

    activate(0);
  }

  /* ---------- Desplegables de código en librerías ---------- */
  function setupLibToggles() {
    $$(".lib-more").forEach((btn) => {
      const code = btn.nextElementSibling;
      btn.addEventListener("click", () => {
        const isOpen = code.hasAttribute("hidden") === false;
        if (isOpen) {
          code.setAttribute("hidden", "");
          btn.setAttribute("aria-expanded", "false");
          btn.textContent = "Ver ejemplo de código ▾";
        } else {
          code.removeAttribute("hidden");
          btn.setAttribute("aria-expanded", "true");
          btn.textContent = "Ocultar código ▴";
        }
      });
    });
  }

  /* ---------- Mini analizador de sentimiento (keyword-based) ---------- */
  function setupSentiment() {
    const input = $("#sentimentInput");
    const btn = $("#analyzeBtn");
    const result = $("#sentimentResult");
    if (!input || !btn || !result) return;

    const positives = ["excelente", "bueno", "buena", "amable", "genial", "mejor", "feliz", "contento", "contenta", "recomiendo", "rápido", "rapida", "atento", "atenta", "gracias", "perfecto", "maravilloso", "encantado", "satisfecho", "satisfecha", "profesional", "cómodo", "claro"];
    const negatives = ["malo", "mala", "pésimo", "pesimo", "terrible", "lento", "lenta", "dolor", "peor", "espera", "grosero", "grosera", "horrible", "descuido", "error", "tarde", "frustrado", "frustrada", "molesto", "molesta", "desagradable", "confuso"];

    const analyze = () => {
      const text = input.value.toLowerCase();
      if (!text.trim()) {
        result.innerHTML = `<small>Escribe algo para analizar el sentimiento.</small>`;
        return;
      }
      const words = text.split(/[^a-záéíóúñü]+/i);
      let score = 0;
      let hits = [];
      words.forEach((w) => {
        if (positives.includes(w)) { score++; hits.push(w); }
        if (negatives.includes(w)) { score--; hits.push(w); }
      });

      let cls, label, emoji;
      if (score > 0) { cls = "pos"; label = "Positivo"; emoji = "😊"; }
      else if (score < 0) { cls = "neg"; label = "Negativo"; emoji = "😕"; }
      else { cls = "neu"; label = "Neutral"; emoji = "😐"; }

      const detail = hits.length
        ? `Palabras clave detectadas: ${hits.map((h) => `«${h}»`).join(", ")}.`
        : "No se hallaron palabras clave fuertes; el texto parece neutral.";

      result.innerHTML = `
        <span class="badge ${cls}">${emoji} ${label}</span>
        <small>Puntuación: ${score}. ${detail}</small>`;
    };

    btn.addEventListener("click", analyze);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) analyze();
    });
  }

  /* ---------- Quiz ---------- */
  function setupQuiz() {
    const card = $("#quizCard");
    const progressEl = $("#quizProgress");
    const scoreEl = $("#quizScore");
    if (!card) return;

    const questions = [
      {
        q: "¿Qué significa la sigla NLP?",
        options: [
          "Neural Learning Process",
          "Natural Language Processing",
          "Network Layer Protocol",
          "New Logic Programming"
        ],
        answer: 1,
        explain: "NLP = Natural Language Processing (Procesamiento de Lenguaje Natural)."
      },
      {
        q: "¿Cuál librería es la más orientada al modelado de tópicos y Word2Vec?",
        options: ["NLTK", "spaCy", "Gensim", "Pandas"],
        answer: 2,
        explain: "Gensim se especializa en embeddings (Word2Vec) y topic modeling (LDA)."
      },
      {
        q: "En NLP, «tokenizar» significa…",
        options: [
          "Cifrar el texto para protegerlo",
          "Traducir el texto a otro idioma",
          "Dividir el texto en unidades mínimas (palabras/signos)",
          "Contar cuántas letras tiene una palabra"
        ],
        answer: 2,
        explain: "Tokenizar es dividir el texto en piezas mínimas llamadas tokens."
      }
    ];

    let current = 0;
    let score = 0;

    const render = () => {
      const item = questions[current];
      progressEl.textContent = `Pregunta ${current + 1} de ${questions.length}`;
      scoreEl.textContent = `Puntuación: ${score}`;

      card.innerHTML = `
        <p class="quiz-question">${item.q}</p>
        <div class="quiz-options">
          ${item.options.map((opt, i) =>
            `<button class="quiz-option" data-i="${i}">${opt}</button>`
          ).join("")}
        </div>
        <p class="quiz-feedback" id="quizFeedback"></p>`;

      const feedback = $("#quizFeedback", card);
      const options = $$(".quiz-option", card);

      options.forEach((btn) => {
        btn.addEventListener("click", () => {
          const chosen = parseInt(btn.dataset.i, 10);
          const correct = item.answer;
          options.forEach((o) => (o.disabled = true));
          options[correct].classList.add("correct");

          if (chosen === correct) {
            score++;
            feedback.textContent = "✅ ¡Correcto! " + item.explain;
            feedback.className = "quiz-feedback ok";
          } else {
            options[chosen].classList.add("wrong");
            feedback.textContent = "❌ No exactamente. " + item.explain;
            feedback.className = "quiz-feedback no";
          }
          scoreEl.textContent = `Puntuación: ${score}`;

          const nextLabel = current < questions.length - 1 ? "Siguiente pregunta →" : "Ver resultado 🎉";
          const nextBtn = document.createElement("button");
          nextBtn.className = "btn btn-primary quiz-next";
          nextBtn.textContent = nextLabel;
          nextBtn.addEventListener("click", () => {
            current++;
            if (current < questions.length) render();
            else renderFinal();
          });
          card.appendChild(nextBtn);
        });
      });
    };

    const renderFinal = () => {
      progressEl.textContent = "Completado";
      const pct = Math.round((score / questions.length) * 100);
      let emoji = "🎉", msg = "¡Excelente! Dominas los conceptos básicos del NLP.";
      if (pct < 34) { emoji = "📚"; msg = "Sigue explorando la infografía y vuelve a intentarlo."; }
      else if (pct < 100) { emoji = "👍"; msg = "¡Buen trabajo! Repasa las secciones para llegar al 100%."; }

      card.innerHTML = `
        <div class="quiz-final">
          <div class="final-emoji">${emoji}</div>
          <h3>${score} / ${questions.length} correctas</h3>
          <p>${msg}</p>
          <button class="btn btn-primary quiz-next" id="quizRestart">Reiniciar quiz ↻</button>
        </div>`;
      $("#quizRestart", card).addEventListener("click", () => {
        current = 0; score = 0; render();
      });
    };

    render();
  }

  /* ---------- Botón volver arriba ---------- */
  function setupToTop() {
    const btn = $("#toTop");
    if (!btn) return;
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
