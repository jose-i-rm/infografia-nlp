<h1 align="center">Infografía Interactiva NLP</h1>

<p align="center">
  <strong>Infografía web interactiva sobre Procesamiento de Lenguaje Natural (NLP)</strong><br>
  Conceptos básicos, librerías (NLTK, spaCy y Gensim) y aplicaciones prácticas en el sector salud.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-en%20producci%C3%B3n-brightgreen?style=for-the-badge" alt="Estado">
  <img src="https://img.shields.io/badge/deploy-GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white" alt="Deploy">
  <img src="https://img.shields.io/badge/license-Educativa-lightgrey?style=for-the-badge" alt="Licencia">
  <img src="https://img.shields.io/badge/idioma-ES-orange?style=for-the-badge" alt="Idioma">
</p>

<p align="center">
  <a href="https://jose-i-rm.github.io/infografia-nlp/"><strong>🔗 Ver la infografía en vivo</strong></a>
</p>

---

## Tech Stack

### Núcleo & Frontend

<p>
  <img src="https://img.shields.io/badge/HTML5-Sem%C3%A1ntico-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-Custom%20Properties-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla%20ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

### Interactividad & UI

<p>
  <img src="https://img.shields.io/badge/IntersectionObserver-Reveal%20on%20scroll-4B5563?style=for-the-badge" alt="IntersectionObserver">
  <img src="https://img.shields.io/badge/CSS%20Animations-Transiciones%20%26%20Keyframes-A855F7?style=for-the-badge" alt="CSS Animations">
  <img src="https://img.shields.io/badge/Responsive-Mobile%20First-22D3EE?style=for-the-badge" alt="Responsive">
  <img src="https://img.shields.io/badge/Accesibilidad-ARIA%20%26%20Teclado-2ea44f?style=for-the-badge" alt="Accesibilidad">
</p>

### Temática (librerías de NLP referenciadas)

<p>
  <img src="https://img.shields.io/badge/NLTK-Educaci%C3%B3n-4CAF50?style=for-the-badge&logo=python&logoColor=white" alt="NLTK">
  <img src="https://img.shields.io/badge/spaCy-Producci%C3%B3n-09A3D5?style=for-the-badge&logo=spacy&logoColor=white" alt="spaCy">
  <img src="https://img.shields.io/badge/Gensim-Sem%C3%A1ntica-FF7043?style=for-the-badge" alt="Gensim">
</p>

### Despliegue

<p>
  <img src="https://img.shields.io/badge/GitHub%20Pages-Hosting-222222?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages">
  <img src="https://img.shields.io/badge/Git-Control%20de%20versiones-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
</p>

---

## Sobre el proyecto

**Infografía Interactiva NLP** es un sitio web ligero, sin dependencias de build ni frameworks, que presenta de forma visual e interactiva los conceptos fundamentales del **Procesamiento de Lenguaje Natural (NLP)**. El usuario recorre desde qué es el NLP hasta cómo funciona su *pipeline*, pasando por las principales librerías de Python del ecosistema y tres aplicaciones reales en el **sector salud**.

Construido íntegramente con **HTML5**, **CSS3** y **JavaScript puro**, es responsivo, accesible y funciona abriendo un único archivo en el navegador. Los ejemplos de código mostrados usan Python porque NLTK, spaCy y Gensim son librerías de Python; el sitio en sí es 100 % HTML/CSS/JS.

### Contenido de la infografía

| Elemento | Detalle |
| --- | --- |
| **Conceptos** | ¿Qué es el NLP?, comprensión (NLU) y generación (NLG). |
| **Pipeline** | Tokenización → limpieza → POS → NER → vectorización (demo interactiva). |
| **Librerías** | NLTK, spaCy y Gensim con ejemplos de código y tabla comparativa. |
| **Industria** | 3 aplicaciones prácticas en el sector salud con su valor aportado. |
| **Extras** | Glosario con tooltips, mini-analizador de sentimiento y quiz. |

---

## Funcionalidades clave

- **Infografía de fondo a pantalla completa**: todo el contenido cabe en la pantalla, sin necesidad de hacer scroll.
- **Dock de 8 botones redondos** en el borde superior derecho, cada uno con su icono, color propio y **tooltip** con el título de la sección.
- **Ventanas modales** que se despliegan sobre el fondo y combinan **imágenes** con las secciones interactivas ya construidas.
- **Glosario con tooltips** para conceptos clave: tokens, lematización, categoría gramatical, NER y *embeddings*.
- **Tarjetas de librerías desplegables** con descripción, fortalezas, limitaciones y ejemplo de código (NLTK, spaCy, Gensim) más una tabla comparativa.
- **Sección de aplicaciones en salud**: historias clínicas, minería de literatura médica y chatbots de triaje, cada una con el valor que aportan.
- **Mini-analizador de sentimiento** basado en palabras clave (demostración didáctica).
- **Quiz** de 3 preguntas con puntuación, retroalimentación y reinicio.
- **Accesibilidad**: HTML semántico, roles ARIA de diálogo, cierre con `Esc`, trampa de foco y soporte de `prefers-reduced-motion`.
- **Sin dependencias de servidor**: sitio estático autocontenido en HTML/CSS/JS.

---

## Arquitectura de alto nivel

```
┌──────────────────────────────────────────────────────────┐
│                     Capa de Presentación                 │
│   HTML5 semántico  ·  CSS3 (Custom Properties)  ·  UI     │
├──────────────────────────────────────────────────────────┤
│                       Capa de Interacción                │
│   JavaScript (ES6)  ·  Pipeline interactivo  ·  Quiz      │
│   Tooltips  ·  Sentimiento  ·  Menú  ·  Desplegables      │
├──────────────────────────────────────────────────────────┤
│                     Capa de Presentación Visual          │
│   Animaciones CSS  ·  IntersectionObserver  ·  Reveal     │
├──────────────────────────────────────────────────────────┤
│                     Capa de Contenido                    │
│   Conceptos NLP  ·  Librerías  ·  Aplicaciones (salud)    │
├──────────────────────────────────────────────────────────┤
│                          Servicios                       │
│   Google Fonts (tipografías)                             │
│   GitHub Pages (hosting estático)                        │
└──────────────────────────────────────────────────────────┘
```

---

## Estructura del proyecto

```
infografiaNLP/
  index.html          # Fondo a pantalla completa, dock de botones y modales
  css/
    styles.css        # Estilos, animaciones y diseño responsivo
  js/
    main.js           # Lógica de modales e interactividad (JavaScript puro)
  img/                # Infografía de fondo e imágenes de cada sección
  .gitignore
  README.md
```

El proyecto sigue una **estructura modular**: la presentación (HTML), el estilo (CSS) y el comportamiento (JS) están separados en archivos independientes.

---

## Puesta en marcha

### Local

Al ser una página estática no requiere instalación ni compilación. Basta con abrir o servir la carpeta:

```powershell
# Opción 1: abrir directamente
Start-Process .\index.html

# Opción 2: servidor local (recomendado)
npx serve .

# Opción 3: con Python
python -m http.server 8000
```

> Con XAMPP, coloca la carpeta en `htdocs` y accede desde `http://localhost/pruebas/infografiaNLP/`.

### Despliegue (GitHub Pages)

El sitio se publica automáticamente desde la rama `main`. Para actualizarlo:

```powershell
git add .
git commit -m "Descripción del cambio"
git push
```

GitHub Pages reconstruye el sitio tras cada `push`.

---

## Conceptos de NLP presentados

- **¿Qué es el NLP?** — La rama de la IA que permite a las máquinas comprender, interpretar y generar lenguaje humano.
- **NLU vs. NLG** — Comprensión frente a generación del lenguaje.
- **Pipeline de NLP** — Tokenización, limpieza de *stopwords*, etiquetado gramatical (POS), reconocimiento de entidades (NER) y vectorización / *embeddings*.

## Librerías explicadas

| Librería | Enfoque | Fortalezas |
| --- | --- | --- |
| **NLTK** | Educación e investigación | Corpus y algoritmos clásicos; ideal para aprender. |
| **spaCy** | NLP industrial / producción | Muy rápida; NER y análisis sintáctico listos para usar. |
| **Gensim** | Semántica y modelado de tópicos | Word2Vec, Doc2Vec y LDA; eficiente con corpus enormes. |

## Aplicaciones en el sector salud

1. **Análisis de historias clínicas** — Extrae diagnósticos, síntomas y medicamentos mediante NER. *Reduce el trabajo administrativo y los errores de codificación.*
2. **Minería de literatura médica** — Modelado de tópicos para resumir y clasificar artículos científicos. *Mantiene al día a los profesionales con la evidencia reciente.*
3. **Chatbots y triaje virtual** — Asistentes que entienden los síntomas del paciente (NLU). *Mejoran el acceso a la atención 24/7 y priorizan casos graves.*

---

## Enlaces

| Recurso | URL |
| --- | --- |
| **Sitio en vivo** | https://jose-i-rm.github.io/infografia-nlp/ |
| **Repositorio** | https://github.com/jose-i-rm/infografia-nlp |

### Recursos para profundizar en NLP

- [Documentación de NLTK](https://www.nltk.org/)
- [spaCy · Usage & Tutorials](https://spacy.io/usage)
- [Gensim](https://radimrehurek.com/gensim/)
- [Hugging Face · NLP Course](https://huggingface.co/learn/nlp-course)
- [Speech and Language Processing (Jurafsky & Martin)](https://web.stanford.edu/~jurafsky/slp3/)
- [Kaggle · Natural Language Processing](https://www.kaggle.com/learn/natural-language-processing)

---

## Créditos & Fuentes

- Tipografías: **Google Fonts** (Poppins y Fira Code).
- Contenido temático: elaboración propia con fines educativos.
- Librerías referenciadas: **NLTK**, **spaCy** y **Gensim** (open source).

---

## Licencia

Proyecto educativo de uso libre con fines didácticos.
