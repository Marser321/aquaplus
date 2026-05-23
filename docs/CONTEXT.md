# CONTEXT — Aqua Plus System

> Decisiones arquitectónicas inmutables. Se acumulan, nunca se borran.
> Cada decisión debe estar referenciada en `PLAN.md` cuando aplica. `rpiv-gate` bloquea planes que omitan decisiones críticas.

---

## Convenciones

- **Identificador**: `D-NN` con NN cero-padded.
- **Fecha**: ISO `YYYY-MM-DD`.
- **Estado**: `active` / `superseded by D-NN`.
- **Tag**: dominio (`stack`, `motion`, `webgl`, `ux`, `infra`, `security`, `data`, `i18n`, `seo`, `compliance`).

---

## Decisiones

<decisions>

- **D-01** (2026-05-22, active, tag: stack)
  **Decisión**: Stack base Next.js 15 (App Router) + Tailwind CSS v4 + shadcn primitives + TypeScript estricto.
  **Por qué**: tipo A landing premium con elementos de funnel pide RSC + Server Actions; Tailwind v4 trae `@theme` nativo para los tokens del UI-SPEC; shadcn ofrece primitives accesibles sin lock-in; el cliente y el contexto técnico lo respaldan.
  **Implicancias**: prohibido Pages Router; prohibido MUI/Chakra/Bootstrap; componentes ≤ 200 líneas.

- **D-02** (2026-05-22, active, tag: motion + webgl)
  **Decisión**: stack de motion único: Framer Motion (microinteracciones UI) + GSAP con ScrollTrigger (scroll storytelling) + Lenis (scroll inercial global) + Three.js encapsulado en `@react-three/fiber` + `@react-three/drei`.
  **Por qué**: el research declara explícitamente este stack; R3F protege el lifecycle de WebGL en React; GSAP es la única solución madura para sticky scrollytelling cinemático; Lenis unifica el smooth scroll cross-browser.
  **Implicancias**: prohibido mezclar Anime.js, react-spring, etc.; cada componente usa **una** librería de motion; Three.js fuera de `components/3d/` está prohibido.

- **D-03** (2026-05-22, active, tag: webgl)
  **Decisión**: shaders GLSL custom (vertex + fragment) en `components/3d/shaders/*.glsl`. Importados con `?raw` (Vite/Webpack pattern) o vía loader equivalente en Next.js.
  **Por qué**: el research justifica usar fragment shaders para distorsión líquida en lugar de geometrías de millones de polígonos. Esto es lo que permite 60 FPS en mobile mid-range.
  **Implicancias**: prohibido recurrir a geometrías densas para simular líquidos; partículas vía `InstancedMesh` con max 5000 instancias por escena.

- **D-04** (2026-05-22, active, tag: webgl)
  **Decisión**: una sola escena WebGL reutilizable a lo largo del scrollytelling, con transiciones de cámara/uniforms vía GSAP timeline. Al desmontar la página, **obligatorio** llamar `WEBGL_lose_context().loseContext()` + `renderer.dispose()` + `scene.clear()`.
  **Por qué**: instanciar múltiples renderers/escenas paralelas satura GPU mobile. Y el leak de contexto WebGL es un bug clásico de Next.js que el research advierte.
  **Implicancias**: hook `useWaterEngine` con cleanup obligatorio; todos los componentes WebGL pasan auditoría manual de cleanup.

- **D-05** (2026-05-22, active, tag: ux)
  **Decisión**: `prefers-reduced-motion` es first-class. Para cada componente WebGL existe un fallback estático (poster JPEG + diagrama SVG + headline) implementado al mismo tiempo que la versión animada.
  **Por qué**: la a11y de motion no es un afterthought; un sitio Awwwards sin reduced-motion fallback es deuda inmediata.
  **Implicancias**: cada PR con WebGL debe incluir el fallback en el mismo commit; CI puede correr Lighthouse con setting reduced-motion en future iterations.

- **D-06** (2026-05-22, active, tag: ux + seo)
  **Decisión**: diferenciación de marca categórica vs servicios de piscinas. Meta tags, Schema.org Product, copy y imaginería deben dejar fuera de toda duda que se trata de "drinking water purification".
  **Por qué**: existen homónimos comerciales de pool service en Florida que pueden generar confusión SEO y de imagen.
  **Implicancias**: prohibido imaginería de piscinas/cloración piscinas; el hero debe mencionar "agua de consumo" / "agua para beber" en primera línea visible.

- **D-07** (2026-05-22, active, tag: infra)
  **Decisión**: Vercel para hosting (preview deploys + production); Cloudflare como DNS opcional si el cliente tiene cuenta; Sentry para errores; PostHog para analytics + feature flags.
  **Por qué**: DX óptima Next.js 15; preview deploys aceleran la validación con cliente; PostHog cubre product analytics + cookie banner integration.
  **Implicancias**: env vars en Vercel + CLI staging; Sentry source maps en CI.

- **D-08** (2026-05-22, active, tag: security)
  **Decisión**: security headers via middleware (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy). CSP estricto, sin `unsafe-inline` (nonce si hace falta).
  **Por qué**: baseline obligatorio para USD 25K; el lead form maneja PII.
  **Implicancias**: scripts de terceros (PostHog) deben aceptar CSP estricto; sin scripts inline a menos que se inyecte nonce.

- **D-09** (2026-05-22, active, tag: data)
  **Decisión**: el lead form usa Zod para validación + Server Action de Next.js + rate limiting (5/IP/hora; KV o Redis-like). PII enviada server-side a un service layer abstracto (interface `LeadService`).
  **Por qué**: validar client-side no es suficiente; rate limiting evita spam contra el endpoint; el service layer permite swapear mock por GHL sin tocar el form.
  **Implicancias**: `LeadService` definido como interface; implementación mock para MVP; implementación GHL en V1.5.

- **D-10** (2026-05-22, ~~active~~ superseded by D-17, tag: ux)
  **Decisión**: paleta y tipografía consolidadas en `UI-SPEC.md` (Kinetic Cinematic dark dominante + cian eléctrico + arena cálida). Modo único dark.
  **Por qué**: el cliente quiere una identidad cinemática consistente.
  **Implicancias**: ~~tokens del UI-SPEC son la única paleta autorizada~~ — superseded por D-17 al recibir el logo real (navy + teal del brand).

- **D-11** (2026-05-22, ~~active~~ superseded by D-16, tag: i18n)
  **Decisión**: idioma primario español. Inglés en V1.5.
  **Por qué**: audiencia primaria hispana.
  **Implicancias**: ~~V1 solo `/es/`~~ — superseded por D-16 al confirmarse tagline oficial en inglés (bilingual V1).

- **D-12** (2026-05-22, active, tag: compliance)
  **Decisión**: banner de cookies con opt-in para analytics (PostHog). Lead form con disclaimer de privacidad inline; políticas de privacidad y términos placeholder en V1 (contenido real con cliente).
  **Por qué**: GDPR-friendly aunque el mercado sea US; futuro-proof para expansión LATAM; los placeholder no retrasan el launch pero quedan flagged en backlog.
  **Implicancias**: PostHog debe respetar opt-out; lead form requiere checkbox de consentimiento.

- **D-13** (2026-05-22, active, tag: data)
  **Decisión**: el lead form valida ZIP de todo el estado de Florida (rango oficial USPS 32003–34997 con exclusiones legítimas). No restringe al sur del estado.
  **Por qué**: el usuario amplió el scope geográfico inicial. Decisión comercial: maximizar el embudo aunque el equipo técnico deba operar en distancias mayores.
  **Implicancias**: `lib/validation/florida-zip.ts` con función `isFloridaZip(zip: string): boolean` basada en prefijos USPS oficiales; manejar excepciones documentadas (e.g., 34999 no asignado).

- **D-14** (2026-05-22, active, tag: ux)
  **Decisión**: la relación con Denis Blanco se trata como "nutricionista respaldado" genérico hasta confirmación formal del cliente. Foto y quote son placeholders premium (silueta + frase genérica del research) durante V1.
  **Por qué**: el usuario aún no confirma si el endorsement es formal/contractual. Diseñar el componente con un slot abstracto reduce riesgo legal y permite swap 1:1 cuando el estatus se resuelva.
  **Implicancias**: componente `<EndorsementQuote>` con props neutras (no hardcoded "Denis Blanco"); placeholder de foto y de copy aceptables para preview deploy; el cliente debe entregar assets reales antes de go-live.

- **D-15** (2026-05-22, active, tag: brand)
  **Decisión**: el nombre de marca correcto es **"Aqua+ Systems"** (con `+` como glifo del acento teal, "Systems" en plural). Tagline oficial: **"Transforming Waters, Transforming Lives"** (siempre en inglés, sin traducir — es un slogan, no copy de cuerpo).
  **Por qué**: el cliente entregó el logo real. El `+` actúa como glifo médico/cruz que refuerza el posicionamiento clínico-wellness; el plural "Systems" sugiere portfolio de equipos.
  **Implicancias**: cero ocurrencia visual de "Aqua Plus System" (singular sin `+`); usar componente `<BrandWordmark>` accesible que renderiza el `+` en el acento teal; en JSON-LD usar `name: "Aqua Plus Systems"` (sin `+` por seguridad SEO) + `alternateName: "Aqua+ Systems"`.

- **D-16** (2026-05-22, active, tag: i18n) **(supersede D-11)**
  **Decisión**: V1 bilingual (en + es), inglés como locale default. Estructura `/[locale]/...` con next-intl; toggle visible en Nav.
  **Por qué**: el tagline oficial está en inglés, lo que indica que la marca habla a ambas audiencias del condado (anglo + hispana). Lanzar bilingual desde día 1 evita re-trabajo y refleja la identidad real.
  **Implicancias**: `messages/en.json` + `messages/es.json` paralelos; `middleware.ts` con next-intl matcher; redirect `/` → `/en/`; `LanguageToggle` accesible en Nav; copy en componentes vía `useTranslations` (cliente) o `getTranslations` (server).

- **D-17** (2026-05-22, active, tag: ux) **(supersede D-10)**
  **Decisión**: paleta recalibrada al brand real — **navy profundo + teal/menta**. Mantiene estilo Kinetic Cinematic con scrollytelling WebGL, pero la sensación pasa de "sci-fi electrónica" a "wellness clínico premium".
  Tokens canónicos:
  - `--color-bg-base: oklch(13% 0.05 260)` (navy abisal con vida).
  - `--color-bg-elevated: oklch(20% 0.06 260)` (navy medio).
  - `--color-accent-primary: oklch(72% 0.13 175)` (teal del logo).
  - `--color-brand-navy: oklch(35% 0.13 260)` (azul navy de la tipografía del logo, para detalles).
    **Por qué**: el dark abisal casi-negro + cian eléctrico era una proyección sin brand input; el logo real exige navy + teal con guiño médico (`+`). Mantenerlo cinemático compensa el riesgo de caer en "wellness aburrido".
    **Implicancias**: actualizar `globals.css` @theme + `waterShaders.ts` const RGB del fragment. Re-validar contrastes WCAG AA en el UI-SPEC §3 al cerrar el bloque A.

</decisions>

---

## Decisiones obsoletas (histórico)

<!-- Vacío en Fase 0. Cuando una D se reemplaza, copiarla aquí con la nota. -->

---

_El motor de decisiones del proyecto vive acá. `rpiv-gate` valida que estas decisiones estén referenciadas en cada PLAN.md activo._
