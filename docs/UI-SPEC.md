# UI-SPEC — Aqua+ Systems

> Contrato visual del proyecto. Generado por `ui-spec-author` consumiendo `CURATED-BRIEF.md`.
> El agente lo lee antes de cualquier generación visual. Modificaciones requieren OK humano explícito.

> **v1.1 (2026-05-22)**: recalibración de paleta a navy + teal por entrega del logo real (D-17). Inclusión del tagline oficial (D-15) y i18n bilingual (D-16).

---

## 0 · Style fingerprint

- **primary_style**: Kinetic Cinematic (con tinte luxury wellness clínico — `+` glifo médico del logo).
- **tier**: impact-first (sin justificación de minimal).
- **alternative_style**: Glassmorphic Luxury (cards de quotes, CTA, calculadora) + Editorial Dramatic (bloque endorsement).
- **mood_adjectives**: [cinemático, clínico, fresco].
- **reference_sites_studied**:
  - linear.app — sticky scroll storytelling + tipografía técnica.
  - vercel.com — cámara que viaja por escenas 3D.
  - lusion.co — shaders líquidos y cursor reactivo.
  - igloo.inc — narrativa científica con producto 3D.

---

## 1 · Copywriting

- **Tono de voz**: técnico-cercano, sin marketing speak. Mezcla autoridad clínica (lenguaje preciso: pH, ORP, electrólisis, hidrógeno molecular) con humanidad cálida (el aval clínico habla a personas que cuidan a su familia). Nunca emojis. Nunca exageraciones publicitarias.
- **Persona**: tutea en español ("tu agua", "tu casa", "tu salud"); "you/your" en inglés. Voseo opcional en contenido extendido si la voz lo pide naturalmente.

## 1.1 · Tagline oficial

- **Tagline**: **"Transforming Waters, Transforming Lives"**.
- **Reglas de uso**:
  - Siempre en inglés en TODOS los locales (es un slogan registrado, no se traduce).
  - Aparece debajo del wordmark del logo en piezas de marca; en la web, va como sub-headline o eyebrow del Hero.
  - Tipografía recomendada: display sans con `--tracking-wide`, peso 500-600, color `--color-fg-secondary` (no compite con el headline cinemático principal).
  - Tamaño máximo `--text-xl`; nunca tan grande como un H1.
  - En castellano puede ir acompañado de una explicación corta y traducida en cuerpo de texto, pero el slogan tal cual no se traduce.
- **CTAs aprobados**:
  - "Agendar análisis gratuito"
  - "Probar la diferencia"
  - "Conocer el sistema"
  - "Calcular mi ahorro"
  - "Ver el proceso"
  - "Diagnóstico en mi hogar"
- **CTAs prohibidos**:
  - "Click aquí"
  - "Submit" / "Enviar" sin contexto
  - "Saber más" sin contexto
  - "Conoce más"
  - Cualquier CTA con signos de exclamación.
- **Microcopy de errores**: humano + accionable.
  - "Ese ZIP no está en nuestra zona de servicio (sur de Florida). Si vivís fuera, escribinos a hola@aquaplus.com."
  - "No pudimos confirmar tu solicitud. Probá de nuevo en un momento."
- **Microcopy de loading**:
  - "Procesando tu análisis…"
  - "Validando tu ZIP…"
  - "Calculando tu ahorro anual…"
- **Idioma primario**: es-US (Miami hispano).
- **Idioma secundario**: en-US (V1.5).

---

## 2 · Identidad visual / mood

- **Logo**: `public/assets/logo.svg` (variantes: light, dark, isotipo simple para favicon). **Recibido del cliente**: wordmark "Aqua+ Systems" con drop teal dentro de la "A" + cruz `+` en teal + tipografía navy.
- **Wordmark code**: componente `<BrandWordmark>` reusable; el `+` glifo va en `--color-accent-primary`, "Aqua" y "SYSTEMS" en `--color-fg-primary` (modo dark) o `--color-brand-navy` (sobre paper).
- **Mood (3 adjetivos)**: cinemático, clínico, fresco.
- **Modo**: dark único. No toggle light/dark (decisión D-10 superseded por D-17 pero modo único sigue activo).
- **Inspiraciones referenciales**:
  - https://linear.app — sintaxis tipográfica + uso del espacio
  - https://vercel.com — secciones cinemáticas + dark dominante
  - https://lusion.co — calidad de shaders líquidos
  - https://igloo.inc — producto 3D + narrativa científica

---

## 3 · Paleta cromática (oklch nativo · brand real Aqua+ Systems)

> Recalibrada en v1.1 (2026-05-22) tras entrega del logo (decisión D-17).
> El acento navy `--color-brand-navy` matchea el azul tipográfico del logo;
> el acento teal `--color-accent-primary` matchea el drop dentro de la "A"
> y el glifo `+`.

```css
@theme {
  /* ===========================================================
     Surfaces — navy dominante cinemático con dos niveles + overlay
     =========================================================== */
  --color-bg-base: oklch(13% 0.05 260); /* navy abisal · Hero, secciones WebGL */
  --color-bg-elevated: oklch(20% 0.06 260); /* navy medio · cards, calculadora, CTA */
  --color-bg-paper: oklch(96% 0.005 220); /* sección comparativa pH/ORP · contraste invertido */
  --color-bg-warm: oklch(92% 0.04 80); /* franja arena para bloque endorsement */
  --color-bg-overlay: oklch(0% 0 0 / 0.65); /* modales, lightbox */

  /* ===========================================================
     Text — alto contraste sobre navy, balance editorial en warm
     =========================================================== */
  --color-fg-primary: oklch(96% 0.005 220); /* blanco perla */
  --color-fg-secondary: oklch(80% 0.01 220);
  --color-fg-muted: oklch(65% 0.01 220); /* +3% vs v1.0 por contraste sobre navy más claro */
  --color-fg-on-accent: oklch(12% 0.05 260); /* navy oscuro sobre teal accent */
  --color-fg-inverted: oklch(15% 0.05 260); /* texto en bg-paper o bg-warm */

  /* ===========================================================
     Brand · navy + teal del logo Aqua+ Systems (el alma del sitio)
     =========================================================== */
  --color-accent-primary: oklch(72% 0.13 175); /* teal/menta del drop + del `+` */
  --color-accent-hover: oklch(78% 0.13 175);
  --color-accent-active: oklch(65% 0.13 175);
  --color-accent-subtle: oklch(72% 0.13 175 / 0.15);
  --color-accent-glow: oklch(72% 0.15 175 / 0.55);

  --color-brand-navy: oklch(35% 0.13 260); /* azul tipográfico del logo · "Aqua" / "SYSTEMS" */
  --color-brand-navy-soft: oklch(45% 0.1 260);

  /* ===========================================================
     Accent secundario · arena cálida (bloque endorsement clínico)
     =========================================================== */
  --color-warm-primary: oklch(82% 0.06 80); /* arena suave */
  --color-warm-strong: oklch(70% 0.1 70); /* terracota apenas tostado */
  --color-warm-subtle: oklch(82% 0.06 80 / 0.18);

  /* ===========================================================
     Accent terciario · oro mineral (Conversión inversa)
     =========================================================== */
  --color-mineral-gold: oklch(78% 0.14 90);
  --color-mineral-subtle: oklch(78% 0.14 90 / 0.2);

  /* ===========================================================
     Semantic
     =========================================================== */
  --color-success: oklch(72% 0.16 150); /* verde clínico, no neon */
  --color-warning: oklch(80% 0.14 70);
  --color-danger: oklch(64% 0.2 25); /* rojo controlado */
  --color-info: var(--color-accent-primary);

  /* ===========================================================
     Borders
     =========================================================== */
  --color-border-subtle: oklch(28% 0.04 260);
  --color-border-strong: oklch(42% 0.06 260);
  --color-border-accent: var(--color-accent-primary);
  --color-border-on-paper: oklch(85% 0.005 220);
}
```

### Pares de contraste validados (WCAG AA · 4.5:1 mínimo, 3:1 para large text)

> Re-calculados aproximadamente para v1.1. Validar en CI con axe-core tras el smoke test del Bloque A.

| Foreground               | Background               | Ratio aprox | Status                     |
| ------------------------ | ------------------------ | ----------- | -------------------------- |
| `--color-fg-primary`     | `--color-bg-base`        | ~14.2:1     | ✅ AAA                     |
| `--color-fg-secondary`   | `--color-bg-base`        | ~8.6:1      | ✅ AAA                     |
| `--color-fg-muted`       | `--color-bg-base`        | ~5.1:1      | ✅ AA                      |
| `--color-accent-primary` | `--color-bg-base`        | ~6.4:1      | ✅ AA texto · ✅ AAA large |
| `--color-fg-on-accent`   | `--color-accent-primary` | ~7.1:1      | ✅ AA                      |
| `--color-fg-inverted`    | `--color-bg-paper`       | ~15.4:1     | ✅ AAA                     |
| `--color-fg-inverted`    | `--color-bg-warm`        | ~11.8:1     | ✅ AAA                     |
| `--color-brand-navy`     | `--color-bg-paper`       | ~9.2:1      | ✅ AAA                     |

> **Notas v1.1**:
>
> - El cambio de bg-base de 8% a 13% redujo todos los contrastes contra fondo, pero quedan por encima del mínimo AA.
> - El teal sobre navy abisal (6.4:1) cumple AA texto normal y AAA large. Si en producción no llega, subir luminancia del teal a 78%.
> - `--color-fg-muted` se ajustó de 62% a 65% para compensar el bg-base más claro.

---

## 4 · Tipografía

```css
@theme {
  /* Display: neo-grotesca expandida para titulares monumentales */
  --font-display: "GeistVariable", "Söhne Breit", "Aeonik", ui-sans-serif, system-ui, sans-serif;

  /* Body: sans neutra para lectura cómoda */
  --font-body: "GeistSans", "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Mono: para datos científicos (pH, ORP, TDS, fórmulas) */
  --font-mono: "GeistMono", "Berkeley Mono", "JetBrains Mono", ui-monospace, monospace;

  /* Escala modular base 1.333 (mayor que default 1.25 para impacto editorial) */
  --text-xs: 0.75rem; /* 12 */
  --text-sm: 0.875rem; /* 14 */
  --text-base: 1rem; /* 16 */
  --text-lg: 1.125rem; /* 18 */
  --text-xl: 1.333rem; /* ~21 */
  --text-2xl: 1.777rem; /* ~28 */
  --text-3xl: 2.369rem; /* ~38 */
  --text-4xl: 3.157rem; /* ~50 */
  --text-5xl: 4.209rem; /* ~67 */
  --text-6xl: 5.61rem; /* ~90 */
  --text-7xl: 7.478rem; /* ~120 — hero monumental */

  /* Line heights canónicos */
  --leading-heading: 1.05; /* dramáticamente cerrado */
  --leading-tight: 1.2;
  --leading-body: 1.6;
  --leading-loose: 1.8;

  /* Letter spacing */
  --tracking-tighter: -0.04em; /* hero h1 */
  --tracking-tight: -0.02em; /* h2/h3 */
  --tracking-normal: 0;
  --tracking-wide: 0.06em; /* eyebrows uppercase */
  --tracking-data: 0.02em; /* mono para datos numéricos */
}
```

### Reglas

- Máximo 3 familias: display, body, mono. Cero `font-family` adicional sin actualizar este spec.
- Weights permitidos: 400, 500, 600, 700. Para display variable, peso variable continuo entre 500-800.
- Headings `h1`–`h2` con `--tracking-tighter`; `h3`–`h4` con `--tracking-tight`.
- Eyebrows en uppercase + `--tracking-wide`.
- Datos científicos (pH 8.5, ORP -350 mV, etc.) **siempre** en `font-mono` con `font-variant-numeric: tabular-nums`.
- En el hero permitido `--text-7xl`; en el resto del sitio máximo `--text-5xl`.
- `text-shadow` permitido **solo** en headlines sobre WebGL para reforzar contraste (sutil, no decorativo).

---

## 5 · Espaciado y grid

```css
@theme {
  /* Escala 4px estricta */
  --space-px: 1px;
  --space-1: 0.25rem; /* 4 */
  --space-2: 0.5rem; /* 8 */
  --space-3: 0.75rem; /* 12 */
  --space-4: 1rem; /* 16 */
  --space-5: 1.25rem; /* 20 */
  --space-6: 1.5rem; /* 24 */
  --space-8: 2rem; /* 32 */
  --space-10: 2.5rem; /* 40 */
  --space-12: 3rem; /* 48 */
  --space-16: 4rem; /* 64 */
  --space-20: 5rem; /* 80 */
  --space-24: 6rem; /* 96 */
  --space-32: 8rem; /* 128 */
  --space-40: 10rem; /* 160 — section padding desktop hero */
  --space-48: 12rem; /* 192 */

  /* Containers */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1440px;
  --container-content: 1200px; /* contenido editorial */
  --container-narrow: 720px; /* prose y forms */

  /* Section padding */
  --section-py-mobile: var(--space-16);
  --section-py-desktop: var(--space-32);
  --section-px: var(--space-6);

  /* Radius — Kinetic Cinematic permite radius moderado en cards (luxury touch) */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 20px;
  --radius-2xl: 28px; /* cards glass + CTA */
  --radius-pill: 9999px; /* badges y pill buttons */

  /* Shadows — sobrios, no decorativos. Solo sobre cards de superficie elevada */
  --shadow-sm: 0 1px 2px oklch(0% 0 0 / 0.2);
  --shadow-md: 0 4px 12px oklch(0% 0 0 / 0.3);
  --shadow-lg: 0 12px 40px oklch(0% 0 0 / 0.4);
  --shadow-glow: 0 0 36px var(--color-accent-glow); /* halos plasma */
}
```

- Breakpoints Tailwind v4 default: `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1440`.
- Container default `--container-2xl` (1440px), centrado, padding lateral `--space-6` mobile / `--space-8` desktop.
- Cero `border-radius` decimal libre; solo valores del set.

---

## 6 · Motion canónico y estados de UI

### Duraciones canónicas

```css
@theme {
  --duration-fast: 150ms; /* hover ui */
  --duration-base: 250ms; /* fade, slide UI */
  --duration-slow: 400ms; /* modal, drawer */
  --duration-page: 600ms; /* page transition */
  --duration-cinematic: 900ms; /* reveal hero, intro de fase */
  --duration-storytelling: 1400ms; /* transición de cámara entre fases (GSAP) */
}
```

### Easings

```css
@theme {
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-cinematic: cubic-bezier(0.7, 0, 0.3, 1); /* hero storytelling */
  --ease-fluid: cubic-bezier(0.83, 0, 0.17, 1); /* movimiento de cámara WebGL */
}
```

### Estados obligatorios por interactivo

- `default`
- `hover` (solo desktop, vía media query)
- `focus-visible` — ring `var(--color-accent-primary)` 2px con offset 2px sobre dark, 3px sobre paper.
- `active` — escala 0.97 o color shift sutil.
- `disabled` — opacidad 0.4, `cursor-not-allowed`, sin pointer events.
- `loading` — spinner o skeleton del componente.
- `error` — border `var(--color-danger)`, ícono + texto explicativo asociado con `aria-describedby`.
- `success` — color `var(--color-success)` + check; nunca confeti gratuito.

### Scrollytelling motion

- **Lenis** activo globalmente, `duration: 1.5`, `easing: --ease-fluid` aproximado:
  ```ts
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
  ```
- **GSAP ScrollTrigger** con `scrub: 1.5` para sincronización suave entre scroll y animación.
- Pinning con `pin: true` y `pinSpacing: true` durante las 4 fases del viaje molecular.
- Cámara WebGL viaja con `gsap.timeline()` y `position.set(...)` interpolado.

### Skeletons / loading

- `bg-[var(--color-bg-elevated)]` con shimmer suave a 3s.
- Mantener altura del contenido real para evitar CLS.
- En la calculadora: outputs muestran skeleton mientras se calcula client-side (< 50ms; saltar skeleton si la animación termina antes que el render).

### Toasts

- Usar `sonner`. Posición: `bottom-right` (desktop), `top` (mobile).
- Duración 4s default; 6s para errores.
- Estilo dark con border-left de color semántico.

### `prefers-reduced-motion`

- **Obligatorio respetar siempre.** Implementación:
  ```ts
  const reduce = useReducedMotion();
  ```
- Fallback estático para canvas WebGL → poster JPEG/AVIF + diagrama SVG + headline.
- Fallback estático para sticky scrollytelling → cada fase se muestra como sección normal sin pin.
- Cero animaciones esenciales para entender el contenido.

---

## 7 · Componentes base autorizados

### shadcn/ui (whitelist)

- Button, Input, Label, Textarea, Select, Slider, Checkbox, RadioGroup
- Dialog, Drawer (vaul), Tooltip, Popover, HoverCard
- Tabs, Accordion, Card (custom override del UI-SPEC), Toast (sonner)
- Form (RHF integration)

### Aceternity UI (uso selectivo)

- `Spotlight` — bloque Denis Blanco quote
- `Sparkles` — hero y CTA
- `BackgroundBeams` — CTA section (con cuidado de no canibalizar el ensamble 3D)
- `BorderBeam` — botón primario animado

### Magic UI (uso selectivo)

- `NumberTicker` — calculadora outputs
- `ShimmerButton` — CTA primario
- `AnimatedBeam` — opcional para conexiones entre fases

### Three.js / R3F (whitelist)

- `@react-three/fiber` Canvas
- `@react-three/drei`: `PerspectiveCamera`, `OrbitControls` (solo dev), `useFBO`, `shaderMaterial`, `Instances`, `Instance`
- Custom hooks: `useScrollTimeline`, `useWaterShader`, `useParticleSystem`

### Iconografía

- `lucide-react` para íconos UI (sobrio).
- Iconos custom SVG en `components/icons/` para elementos científicos (átomo, molécula, electrólisis).

### Prohibidos

- ❌ Material UI, Chakra UI, Ant Design, Bootstrap, Mantine.
- ❌ Tailwind UI Studio (componentes con look-and-feel propio que sobrescribe el UI-SPEC).
- ❌ Spline embeds (preferimos R3F en code).
- ❌ Lottie sin justificación explícita (no necesario en este proyecto).

---

## 8 · Patrones de página

### Hero (REQ-001, REQ-002)

- `<section>` con altura ≥ 200vh para sticky scrollytelling.
- H1 ≤ 8 palabras, en `--text-6xl` mobile / `--text-7xl` desktop, `--leading-heading` + `--tracking-tighter`.
- Subtítulo ≤ 22 palabras, en `--text-lg` mobile / `--text-xl` desktop.
- 1 CTA primario (`ShimmerButton`) + 1 secundario (`Button variant=ghost`).
- Canvas WebGL como background, z-index 0; texto en z-index 10.
- LCP target ≤ 1.8s mobile (poster vía `next/image priority`).

### Sección scrollytelling (fases ósmosis / conversión / ionización)

- `<section>` con `min-height: 100vh` + GSAP pin.
- Layout: sidebar sticky izquierda (texto + microvisualización) + área principal derecha (canvas o porción del canvas global).
- Eyebrow uppercase + número de fase ("FASE 2 · ÓSMOSIS INVERSA").
- H2 en `--text-4xl` / `--text-5xl`.
- 2-3 bullets cortos con íconos custom.
- Quote inline de Denis Blanco al cerrar la fase.

### Tabla comparativa (REQ-040)

- `<table>` semántica.
- `<thead>` con `<th scope="col">`; fila Aqua Plus con `data-highlight="true"` y estilo acentuado.
- Stagger reveal de filas via FM `whileInView` con margin negative.
- Datos en `font-mono` con `tabular-nums`.

### Calculadora (REQ-050)

- Card glass (`bg-[var(--color-bg-elevated)]` + `border-[var(--color-border-subtle)]` + `rounded-2xl`).
- Inputs con labels arriba (no placeholders).
- Outputs grandes (`--text-4xl`) con `NumberTicker` y unidad pequeña al lado.
- Microcopy explicativo debajo de cada output ("USD ahorrados al año vs. tu gasto actual en embotellada").

### Lead form

- Card glass igual que calculadora.
- Campos: nombre, email, teléfono, dirección, ZIP.
- Validación inline con Zod + error states.
- Submit como Server Action; estado `loading` y `success` definidos.
- Disclaimer de privacidad con link a política.
- Reduced-motion: el ensamble 3D detrás se pausa (REQ del Contexto).

### Empty states (genéricos del sistema)

- Ícono grande + título + descripción + CTA.
- Nunca tabla vacía pelada.

### Error pages (404, 500)

- Tono humano, sobrio. CTA "Volver al inicio".
- Visual minimal con un detalle WebGL sutil de fondo (no full canvas).

---

## 9 · Cursor y micro-interacciones (capa transversal)

- **Cursor magnético** en CTAs primarios (`MagneticButton` o equivalente). Opt-out automático con reduced-motion.
- **Spotlight follow** en bloques dark con contenido editorial (Denis Blanco quote).
- **Animated underline** en links inline del contenido editorial.
- **Reveal on scroll** con `framer-motion` `whileInView` con margin `-80px` para anticipar entrada.
- **NumberTicker** en calculadora.
- **Hover shadow + scale 1.02** en cards (no más).

---

## 10 · Convención de naming y arquitectura del frontend

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx               # home con todo el scrollytelling
│   │   └── layout.tsx
│   ├── api/
│   │   └── lead/route.ts          # rate-limited endpoint backup (Server Action default)
│   ├── layout.tsx                 # root layout con fonts + lenis provider
│   └── globals.css                # @theme con todos los tokens del UI-SPEC
├── components/
│   ├── 3d/
│   │   ├── WaterCanvas.tsx
│   │   ├── waterEngine.ts
│   │   ├── shaders/
│   │   │   ├── waterVertex.glsl
│   │   │   ├── waterFragment.glsl
│   │   │   ├── plasmaFragment.glsl
│   │   │   └── bubblesFragment.glsl
│   │   └── hooks/
│   │       ├── useScrollTimeline.ts
│   │       └── useReducedMotionFallback.ts
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── StageOsmosis.tsx
│   │   ├── StageConversion.tsx
│   │   ├── StageIonization.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── Calculator.tsx
│   │   ├── DenisBlancoQuote.tsx
│   │   ├── LeadForm.tsx
│   │   ├── Footer.tsx
│   │   └── Nav.tsx
│   ├── ui/                         # shadcn primitives copiados
│   └── icons/                      # SVG custom
├── lib/
│   ├── log.ts
│   ├── lenis/provider.tsx
│   ├── gsap/registerPlugins.ts
│   ├── lead/service.ts             # interface LeadService
│   ├── lead/mock-service.ts
│   ├── lead/ghl-service.ts         # V1.5
│   ├── validation/lead-schema.ts
│   └── analytics/posthog.ts
├── messages/
│   └── es.json
└── public/
    └── assets/
        ├── logo.svg                # placeholder V1
        ├── denis-blanco-portrait.avif  # placeholder
        └── posters/
            ├── hero-static.avif    # fallback reduced-motion
            ├── osmosis-static.avif
            └── ...
```

---

_Esta es la verdad visual del proyecto. Cualquier desviación se discute, se justifica y se versiona como `UI-SPEC-v2.md`._
