# CURATED BRIEF — Aqua Plus System Miami

generated: 2026-05-22
based_on: uploads/research-aqua-plus.md
generated_by: business-research-curator (ARSENAL v1)

---

## 1 · Clasificación del negocio

- **industry**: biotech-wellness / hidratación clínica residencial.
- **subvertical**: equipos premium de reingeniería molecular del agua (ósmosis + remineralización + ionización con H₂ activo).
- **audience**:
  - Primaria: hogares de Miami-Dade y sur de Florida con alto poder adquisitivo, conscientes de salud, audiencia hispana 35-65 años fidelizada a Denis Blanco; ya consumen agua embotellada premium y están sensibilizados con PFAS, plástico y bienestar holístico.
  - Secundaria: profesionales jóvenes (28-45) bilingües, audiencia "biohacker / wellness" inglesa del condado.
- **brand_maturity**: growth-stage (existe en el mercado, sin presencia digital premium consolidada).
- **emotional_register**: técnico-cálido (autoridad científica + conexión holística + aspiracional premium).
- **competitive_pressure**: high (Tyent USA, Enagic Kangen, Aquasana, marcas embotelladas Fiji/Voss/Essentia + el desafío de no ser confundidos con servicios de piscinas).

---

## 2 · Tipo de proyecto

- **type**: A · Landing premium (con elementos D · funnel: calculadora + lead form con validación geográfica).
- **confidence**: high.
- **rationale**: producto físico con ciclo de venta consultivo (visita técnica a domicilio + análisis químico gratuito). La web es la maquinaria de conversión que transforma curiosidad en agendamiento. NO es e-commerce (no se vende online) ni SaaS (no hay producto digital). Es landing + funnel.

---

## 3 · Estilo visual recomendado

- **primary_style**: **Kinetic Cinematic**.
- **alternative_styles**: [Glassmorphic Luxury (para cards de testimonios/CTA), Editorial Dramatic (para sección de Denis Blanco)].
- **why**:
  - El research declara explícitamente scrollytelling cinemático con Three.js + GSAP + Lenis + shaders custom: este es el corazón de Kinetic Cinematic.
  - El producto es visualmente narrativo (3 etapas de reingeniería molecular): la cámara que viaja dentro del filtro es una "estrella" cinemática perfecta.
  - Diferenciación premium frente a las cinco "filtros caseros aburridos" del mercado pide impacto visual contundente.
  - El cliente quiere ambición Awwwards y tiene budget para sostenerla.
- **mood_adjectives**: [cinemático, clínico, líquido].
- **not_minimalist_because**: "La narrativa molecular del producto pierde su poder en una grid de cards minimalistas; Awwwards y budget USD 25K demandan impacto visual sostenido. El cliente nombra el estilo como 'Minimalismo Líquido de Alta Fidelidad' — minimalismo en disciplina, máximo en producción cinemática."
- **reference_sites**:
  - https://linear.app — sticky scroll storytelling y reveals tipográficos.
  - https://vercel.com — cámara que viaja por escenas 3D + cinemática sobria.
  - https://lusion.co — calidad de shaders líquidos y cursor reactivo.
  - https://igloo.inc — narrativa científica con cámara 3D en producto.
  - https://nzxt.com (campañas) — paleta dark + acento eléctrico en producto físico.

---

## 4 · Tech stack recomendado

- **core_stack**: Next.js 15 (App Router) + Tailwind v4 + shadcn primitives + TypeScript estricto.
- **3D / motion**: Three.js (core) + `@react-three/fiber` + `@react-three/drei` (envoltorio React) + GSAP + ScrollTrigger + Lenis.
- **shaders**: GLSL custom (vertex + fragment) con loader `vite-plugin-glsl` adaptado o `?raw` import en Next.
- **UI premium libraries**: `motion` (Framer Motion v11+), Aceternity UI (Spotlight, Sparkles) selectivos, Magic UI (NumberTicker, ShimmerButton) selectivos.
- **forms**: React Hook Form + Zod.
- **fonts**: `next/font/google` (o self-hosted vía `next/font/local`) para Geist Sans/Mono + Söhne Breit (fallback Aeonik).
- **deployment**: Vercel.
- **observability**: Sentry + PostHog (eventos del scroll storytelling).
- **lead form integration**: GoHighLevel API (fuera del scope MVP; placeholder service-layer mockeable).
- **why_this_stack**: Next.js 15 da RSC + Server Actions para el lead form y la calculadora, SEO sólido para el bloque editorial de Denis Blanco, y excelente DX con Vercel. R3F + drei encapsulan Three.js de forma compatible con React lifecycle (evita los leaks de WebGL que el research advierte). GSAP/Lenis son el único stack maduro para el scroll narrativo "filmico" que pide el cliente.

---

## 5 · Skills a activar

- **mandatory**: [00-router, rpiv-gate, vertical-slicer, context-hygiene, stylistic-audit, a11y-audit, performance-audit].
- **type_specific (A landing premium)**: [landing-premium, motion-polish].
- **magic_layer**: [magic-section-designer, ui-spec-author, vibe-design-pipeline].

---

## 6 · Librerías premium prioritarias (orden de importancia)

1. `three` + `@react-three/fiber` + `@react-three/drei` — escenas 3D y simulación líquida.
2. `gsap` + `@gsap/react` (useGSAP hook) + `ScrollTrigger` — pinning + storytelling.
3. `lenis` (`@studio-freight/lenis` o el fork mantenido en 2026) — scroll inercial unificado.
4. `motion` (Framer Motion) — microinteracciones UI fuera del canvas.
5. Aceternity UI **selectivo**: `Spotlight` (Denis Blanco quote), `Sparkles` (hero), `BackgroundBeams` (CTA).
6. Magic UI **selectivo**: `NumberTicker` (calculadora), `ShimmerButton` (CTA primario).
7. `next/font` + `sharp` — fuentes y optimización de imágenes.
8. `react-hook-form` + `zod` + `@hookform/resolvers` — lead form.

> Total = 8 librerías visuales/motion principales. Restraint deliberado.

---

## 7 · Blueprint sección por sección

```yaml
sections:
  - id: nav
    treatment: I.1 nav-minimal-sticky-blur
    why: "La nav debe respirar y ceder protagonismo al storytelling; sticky con backdrop-blur permite que la fase activa del scroll quede legible siempre."
    libraries: [framer-motion, tailwind]
    intensity: subtle
    a11y_consideration: "ARIA landmark <nav>; focus-visible obligatorio; smooth scroll a anchors respeta reduced-motion."
    performance_budget: "JS ≤ 4kb; sin canvas en este componente."

  - id: hero
    treatment: A.7 hero-scroll-bound-storytelling + A.8 hero-particles-canvas-interactive (combinadas como apertura del Viaje Molecular)
    why: "Es el momento cero del scrollytelling cinemático; el flujo 3D de agua pura reacciona al cursor y luego ingresa al filtro. El cliente lo declara como Fase 1 (0-20%) del viaje molecular."
    libraries:
      [react-three-fiber, drei, gsap+scrolltrigger, lenis, custom-glsl-shaders, framer-motion]
    intensity: muy alta
    a11y_consideration: "Reduced-motion → poster JPEG con headline estático + quote de Denis Blanco; canvas con aria-hidden y descripción textual paralela invisible para AT."
    performance_budget: "LCP ≤ 1.8s mobile (poster), 60 FPS sostenidos en mobile mid-range; canvas lazy post-LCP; shader < 4kb."

  - id: denis-blanco-quote
    treatment: B.3 trust-rotating-quotes + spotlight (Aceternity)
    why: "Aval clínico inmediato post-hero. Una sola quote estable (no rotación) con foto editorial de Denis Blanco; el spotlight sigue al cursor para magnetizar."
    libraries: [aceternity-ui Spotlight, framer-motion, next/image]
    intensity: media
    a11y_consideration: "Foto con alt descriptivo; quote en <blockquote> con cite a Denis Blanco; spotlight desactiva con reduced-motion."
    performance_budget: "Imagen avif/webp ≤ 80kb; CLS = 0."

  - id: stage-osmosis (Fase 2 del viaje molecular, 21-50%)
    treatment: C.3 features-sticky-scroll-storytelling (escena WebGL coordinada)
    why: "Sidebar sticky con los 3 hitos de la fase ósmosis (PFAS bloqueados, metales bloqueados, agua nanométrica saliendo) mientras la cámara 3D viaja dentro del filtro. Es la primera demostración técnica del producto."
    libraries: [react-three-fiber, drei, gsap+scrolltrigger, custom-glsl-shaders, framer-motion]
    intensity: alta
    a11y_consideration: "Reduced-motion → diagrama estático SVG del filtro con labels; canvas con aria-hidden; instanciación de partículas (InstancedMesh) en lugar de geometrías densas."
    performance_budget: "Partículas vía InstancedMesh; ≤ 5000 instancias; LCP secundario ≤ 2.5s; FPS ≥ 60 mobile."

  - id: stage-conversion (Fase 3 del viaje molecular, 51-70%)
    treatment: C.3 features-sticky-scroll-storytelling + microvisualización pH live
    why: "El agua atraviesa esferas minerales y destellos dorados se integran al caudal. Un gráfico de pH se actualiza en tiempo real conforme avanza el scroll (de pH 5.8 a 7.4)."
    libraries: [react-three-fiber, gsap, custom-glsl-shaders, framer-motion (NumberTicker para pH)]
    intensity: media-alta
    a11y_consideration: "Reduced-motion → diagrama estático con ecuación química CaCO3 + H2O + CO2 ⇌ Ca²⁺ + 2HCO3⁻ y pH final; numérico accesible via aria-live."
    performance_budget: "Reutilizar contexto WebGL del slice anterior (no recrear); transición de cámara via GSAP."

  - id: stage-ionization (Fase 4 del viaje molecular, 71-90%)
    treatment: A.4 hero-beam-spotlight-dark adaptado + sistema de partículas de microburbujas H₂
    why: "El caudal pasa por placas de titanio/platino; rayos de plasma dividen el agua; microburbujas de hidrógeno emergen. Es el clímax visual del scrollytelling."
    libraries:
      [
        react-three-fiber,
        drei,
        gsap+scrolltrigger,
        custom-glsl-shaders (plasma + bubbles),
        magic-ui Sparkles,
      ]
    intensity: muy alta
    a11y_consideration: "Validar contraste del cian eléctrico sobre el negro abisal (debe llegar a 4.5:1 sobre texto); reduced-motion → ilustración estática del proceso electrolítico con ecuaciones."
    performance_budget: "Shader fragment custom para plasma (no geometrías); GPU particles para burbujas; max 2000 partículas; FPS ≥ 60."

  - id: comparison-table (post-ionización)
    treatment: C.7 features-comparison-table-animated
    why: "Mostrar la tabla pH/ORP/TDS comparando grifo, embotellada, ósmosis pura, remineralizada, ionizada Aqua Plus y ácida externa. Es la prueba científica que cierra la promesa."
    libraries: [framer-motion (stagger reveal de filas), tailwind]
    intensity: media
    a11y_consideration: "Tabla HTML semántica con <thead>, <tbody>, <th scope='col'>; reveal animado respeta reduced-motion."
    performance_budget: "Cero JavaScript pesado; 100% Server Component (RSC)."

  - id: calculator (Fase 5 del viaje molecular)
    treatment: K.2 saas-roi-calculator-interactive + animated counters
    why: "Calculadora de impacto financiero y ecológico. Sliders/inputs para habitantes y gasto mensual actual; outputs animados con NumberTicker (USD ahorrados/año + botellas plásticas evitadas + huella carbono)."
    libraries: [framer-motion, magic-ui NumberTicker, react-hook-form, zod]
    intensity: media-alta
    a11y_consideration: "Sliders con keyboard support; labels asociadas con for/id; aria-live en outputs; reduced-motion → counters snap (sin animación)."
    performance_budget: "Lógica de cálculo client-side (sin red); bundle ≤ 8kb gzip."

  - id: cta-lead-form (Fase 5 del viaje molecular, 91-100%)
    treatment: H.3 cta-calendar-booking-inline + ZIP validation + 3D assembly de fondo
    why: "El sistema Aqua Plus completo se ensambla 3D y rota 360°. Encima, el form de análisis gratuito de agua a domicilio con validación de ZIP del sur de Florida. Es el cierre comercial."
    libraries:
      [
        react-three-fiber (3D assembly),
        gsap (rotación),
        react-hook-form,
        zod,
        framer-motion,
        magic-ui ShimmerButton,
      ]
    intensity: alta
    a11y_consideration: "Form completamente accesible (labels, errors aria-describedby, focus management post-submit); 3D solo decorativo con aria-hidden; reduced-motion → ensamble estático."
    performance_budget: "3D pausa al focus en form (libera GPU); validación con Zod server-side via Server Action."

  - id: footer
    treatment: J.3 footer-grid-classic-with-spotlight
    why: "Footer sobrio con grid de links, spotlight sutil siguiendo el mouse en sección oscura, dirección + redes."
    libraries: [aceternity-ui Spotlight, tailwind]
    intensity: subtle
    a11y_consideration: "Spotlight desactiva con reduced-motion; landmark <footer>."
    performance_budget: "Sin canvas; spotlight es CSS radial-gradient con pointer-tracking."
```

---

## 8 · Riesgos y banderas rojas

1. **Performance WebGL en mobile mid-range**: la combinación de 3 escenas WebGL coordinadas (hero, ósmosis, ionización) puede saturar GPUs entry-level. Mitigación obligatoria: una sola escena reutilizable con cambios de cámara/uniforms vía GSAP timeline; destrucción explícita con `WEBGL_lose_context` al cambiar de página; budget de partículas duro.
2. **Confusión de marca con pool service**: el nombre genera ambigüedad SEO y de imaginería. Mitigación: meta tags + structured data + copy + imaginería que martillen "agua para beber, no piscinas".
3. **A11y vs cinemática**: el reduced-motion fallback debe estar diseñado a la par de la versión motion. No es un afterthought.
4. **Carga de fuentes display variables**: Söhne Breit y Geist Variable pesan; subset + `font-display: swap` + preload obligatorios.
5. **Brand assets no entregados**: trabajamos con placeholders premium hasta que el cliente entregue logo, fotos de Denis Blanco, brand book. Cuidado de no diseñar dependiente de assets que después no llegan.
6. **GHL integración**: el lead form puede esperar al MVP+1, pero la arquitectura del form debe permitir swap fácil con webhook.

---

## 9 · Decisiones que requieren al cliente antes de avanzar

1. ✅ **Estilo visual primario**: Kinetic Cinematic CONFIRMADO por el usuario (2026-05-22). Alt: Glassmorphic Luxury en cards.
2. ✅ **Idiomas**: es-US V1, en V1.5 CONFIRMADO (2026-05-22).
3. ✅ **Validez del ZIP**: TODO el estado de Florida CONFIRMADO (2026-05-22). Ver D-13 en CONTEXT.md.
4. ⏳ **Dominio + branding final**: pendiente; trabajamos con placeholders premium.
5. ✅ **Denis Blanco**: estatus TBD CONFIRMADO (2026-05-22). Componente con slot abstracto y placeholder genérico de "nutricionista respaldado" hasta que el cliente confirme. Ver D-14 en CONTEXT.md.
6. ⏳ **Pricing / catálogo de equipos**: pendiente; default V1 = 100% lead generator sin catálogo.

---

## 10 · Gaps en el research

- Métricas concretas: ¿cuántos leads/mes espera el cliente? ¿Cuál es la tasa de conversión actual de canales offline?
- Información de los equipos: modelos disponibles, capacidades (galones/día), garantía, dimensiones físicas (para los renders 3D).
- Confirmación de Denis Blanco: ¿existe brief de marca consolidado entre él y Aqua Plus? ¿hay assets shareables?
- Stack del CRM: ¿GHL confirmado o aún en evaluación?
- Hosting: ¿Vercel confirmado o el cliente tiene preferencia (e.g., AWS, Cloudflare Pages)?

---

## Resumen ejecutivo · 5 decisiones a validar con el usuario

1. **Estilo**: Kinetic Cinematic (alt: Glassmorphic Luxury en cards). Justificado por el research que pide scrollytelling cinemático y budget USD 25K.
2. **Stack**: Next.js 15 + R3F/drei + GSAP/Lenis + Tailwind v4 + shadcn + Framer Motion. Confirmado por el usuario, refinado con R3F como envoltorio.
3. **Blueprint**: 10 secciones, dominada por 4 escenas WebGL coordinadas (Hero + Ósmosis + Conversión + Ionización) reutilizando un solo contexto WebGL.
4. **MVP**: arranca con Hero + Ósmosis (Fases 1-2 del viaje molecular) + Footer + Nav. Resto en iteraciones siguientes.
5. **Riesgos top**: performance mobile, confusión de marca con piscinas, A11y de motion.

**Pregunta de cierre al usuario**: ¿OK para que `ui-spec-author` genere los tokens en base a este brief y arranque el scaffold de Next.js sobre Hero + Ósmosis?

---

_Este brief es la verdad de la dirección creativa del proyecto. Cualquier cambio se versiona como `CURATED-BRIEF-v2.md` y se registra el motivo en `CONTEXT.md`._
