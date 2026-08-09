/* =========================================================
   Infografía Interactiva NLP · Lógica de interacción
   JavaScript puro (sin dependencias)
   ========================================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setupModals();
    setupLibToggles();
    setupSentiment();
    setupQuiz();
  }

  /* ---------- Sistema de modales ---------- */
  function setupModals() {
    const openers = $$(".dock-btn[data-modal]");
    let lastFocused = null;

    const open = (id, trigger) => {
      const modal = document.getElementById(id);
      if (!modal) return;
      lastFocused = trigger || document.activeElement;
      modal.hidden = false;
      document.body.classList.add("modal-open");
      // Enfoca el botón de cierre para accesibilidad
      const closeBtn = $(".modal-close", modal);
      if (closeBtn) closeBtn.focus();
    };

    const close = (modal) => {
      if (!modal) return;
      modal.hidden = true;
      if (!$(".modal:not([hidden])")) document.body.classList.remove("modal-open");
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    };

    openers.forEach((btn) => {
      btn.addEventListener("click", () => open(btn.dataset.modal, btn));
    });

    // Cerrar con botón "✕" o clic en el fondo
    $$(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-close")) close(modal);
      });
    });

    // Cerrar con Escape y trampa de foco básica
    document.addEventListener("keydown", (e) => {
      const openModal = $(".modal:not([hidden])");
      if (!openModal) return;
      if (e.key === "Escape") { close(openModal); return; }
      if (e.key === "Tab") trapFocus(e, openModal);
    });
  }

  function trapFocus(e, modal) {
    const focusables = modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  /* ---------- Desplegables de código en librerías ---------- */
  function setupLibToggles() {
    $$(".lib-more").forEach((btn) => {
      const code = btn.nextElementSibling;
      btn.addEventListener("click", () => {
        const isOpen = !code.hasAttribute("hidden");
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
      const hits = [];
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
        options: ["Neural Learning Process", "Natural Language Processing", "Network Layer Protocol", "New Logic Programming"],
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
          ${item.options.map((opt, i) => `<button class="quiz-option" data-i="${i}">${opt}</button>`).join("")}
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
})();
