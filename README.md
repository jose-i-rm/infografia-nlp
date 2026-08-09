# 🧠 Infografía Interactiva sobre Procesamiento de Lenguaje Natural (NLP)

Proyecto web educativo que presenta, de forma visual e interactiva, los conceptos
fundamentales del **Procesamiento de Lenguaje Natural (NLP)**, las principales
librerías de Python del ecosistema (**NLTK**, **spaCy** y **Gensim**) y tres
aplicaciones prácticas del NLP en el **sector salud**.

Está construido íntegramente con **HTML5**, **CSS3** y **JavaScript puro**
(sin frameworks ni dependencias externas), es **responsivo** y **accesible**.

---

## 🚀 Demo rápida

Abre [`index.html`](index.html) en cualquier navegador moderno. No requiere
instalación ni servidor. (Consulta la sección [Cómo ejecutar](#-cómo-ejecutar-y-visualizar-la-infografía)).

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|-----------|--------------------|
| **HTML5** | Estructura semántica del contenido (`header`, `nav`, `section`, `article`, `footer`), tablas accesibles y atributos ARIA. |
| **CSS3**  | Diseño visual, variables CSS, *grid* y *flexbox*, animaciones y transiciones, efectos *hover*, tooltips, diseño responsivo con *media queries* y respeto a `prefers-reduced-motion`. |
| **JavaScript (ES6+)** | Interactividad: menú móvil, barra de progreso, animaciones al hacer scroll (`IntersectionObserver`), contadores animados, *pipeline* interactivo, secciones desplegables, mini-analizador de sentimiento y quiz. |

> Nota: los ejemplos de código que aparecen en la infografía usan **Python**, ya
> que NLTK, spaCy y Gensim son librerías de Python. El sitio web en sí es 100 %
> HTML/CSS/JS.

---

## 📁 Estructura del proyecto

```
infografiaNLP/
├── index.html        # Página principal con toda la infografía
├── css/
│   └── styles.css    # Estilos, animaciones y diseño responsivo
├── js/
│   └── main.js       # Lógica e interactividad (JavaScript puro)
└── README.md         # Este archivo
```

El proyecto sigue una **estructura modular**: la presentación (HTML), el estilo
(CSS) y el comportamiento (JS) están separados en archivos independientes.

---

## 📚 Conceptos básicos de NLP presentados

La infografía explica, con lenguaje comprensible para una audiencia general:

- **¿Qué es el NLP?** — La rama de la IA que permite a las máquinas comprender,
  interpretar y generar lenguaje humano.
- **Comprensión (NLU)** vs. **Generación (NLG)** del lenguaje.
- **Pipeline de NLP** (demostración interactiva paso a paso):
  1. **Tokenización** — dividir el texto en unidades mínimas (tokens).
  2. **Limpieza** — eliminar *stopwords* (palabras vacías).
  3. **Etiquetado gramatical (POS tagging)** — asignar la categoría gramatical.
  4. **Reconocimiento de entidades (NER)** — detectar nombres, fechas, síntomas, etc.
  5. **Vectorización / *embeddings*** — convertir el texto en números.
- **Glosario interactivo** con *tooltips*: tokens, lematización, categoría
  gramatical, NER y *embeddings*.

---

## 🧩 Librerías de NLP explicadas

| Librería | Enfoque | Fortalezas |
|----------|---------|-----------|
| **NLTK** (Natural Language Toolkit) | Educación e investigación | Gran cantidad de corpus y algoritmos clásicos; ideal para aprender. |
| **spaCy** | NLP industrial / producción | Muy rápida; NER y análisis sintáctico listos para usar. |
| **Gensim** | Semántica y modelado de tópicos | Word2Vec, Doc2Vec y LDA; eficiente con corpus enormes. |

Cada librería incluye una descripción, sus fortalezas y limitaciones, y un
**ejemplo de código desplegable**.

---

## 🏥 Aplicaciones prácticas seleccionadas — Industria: Salud

Se eligió el **sector salud** por su gran volumen de texto no estructurado.
Se presentan tres aplicaciones y el valor que aportan:

1. **Análisis de historias clínicas** — Extrae diagnósticos, síntomas y
   medicamentos de notas médicas mediante NER.
   *Valor:* reduce trabajo administrativo y errores de codificación.

2. **Minería de literatura médica** — Modelado de tópicos (Gensim) para resumir
   y clasificar miles de artículos científicos.
   *Valor:* mantiene a los profesionales al día con la evidencia más reciente.

3. **Chatbots y triaje virtual** — Asistentes que entienden los síntomas del
   paciente (NLU) y orientan sobre la urgencia.
   *Valor:* mejora el acceso a la atención 24/7 y prioriza casos graves.

Además, se incluye un **mini-analizador de sentimiento** interactivo que estima
el tono de un comentario sobre una consulta médica (demostración simplificada
basada en palabras clave).

---

## ✨ Elementos interactivos

- Menú de navegación responsivo (hamburguesa en móvil).
- Barra de progreso de lectura.
- Animaciones de aparición al hacer *scroll*.
- Contadores numéricos animados.
- **Pipeline de NLP** clicable paso a paso.
- **Tooltips** en el glosario de conceptos.
- Secciones **desplegables** con ejemplos de código.
- **Mini-analizador de sentimiento**.
- **Quiz** de 3 preguntas con puntuación y reinicio.
- Botón «volver arriba».

---

## ▶️ Cómo ejecutar y visualizar la infografía

### Opción 1 — Abrir directamente
1. Descarga o clona el repositorio.
2. Haz doble clic en `index.html` o ábrelo con tu navegador.

### Opción 2 — Servidor local (recomendado)
Con **VS Code** y la extensión *Live Server*: clic derecho en `index.html` →
**"Open with Live Server"**.

O con Python:
```bash
# Python 3
python -m http.server 8000
# Luego abre http://localhost:8000 en el navegador
```

O con Node.js:
```bash
npx serve .
```

> ✅ Compatible con navegadores modernos (Chrome, Firefox, Edge, Safari) en
> escritorio y móvil.

---

## 🔗 Recursos adicionales para profundizar en NLP

- [Documentación de NLTK](https://www.nltk.org/)
- [spaCy · Usage & Tutorials](https://spacy.io/usage)
- [Gensim](https://radimrehurek.com/gensim/)
- [Hugging Face · NLP Course](https://huggingface.co/learn/nlp-course)
- [Speech and Language Processing (Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/)
- [Kaggle · Natural Language Processing](https://www.kaggle.com/learn/natural-language-processing)

---

## 🎯 Objetivo educativo

Al explorar esta infografía, el estudiante:

- Comprende los conceptos generales del NLP.
- Se familiariza con las librerías **NLTK**, **spaCy** y **Gensim**.
- Identifica cómo aplicar estas herramientas en proyectos básicos, entendiendo
  sus capacidades y limitaciones en distintos contextos industriales.

---

## 📄 Licencia

Proyecto educativo de uso libre con fines didácticos.
