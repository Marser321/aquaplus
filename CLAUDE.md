# CLAUDE.md — Aqua+ Systems web

> Repo del sitio web premium de Aqua+ Systems Miami. Landing scrollytelling WebGL con aval clínico de Denis Blanco.
> Este archivo es el contrato de Claude Code en este proyecto. Sincronizado con `AGENTS.md`.

---

## 0 · Identidad

- **Cliente**: Aqua+ Systems (Miami-Dade, FL, USA).
- **Tipo**: A · Landing premium con scrollytelling cinemático.
- **Estado actual**: Fase 0 · Discovery & Foundation (docs en producción).
- **Budget**: USD 25,000.

**Antes de cualquier acción** leer en orden:

1. `docs/STATE.md` — bitácora viva.
2. `docs/CONTEXT.md` — decisiones D-NN.
3. `docs/PLAN.md` — fase activa.
4. `docs/UI-SPEC.md` — si la tarea es visual.
5. `docs/CURATED-BRIEF.md` — para entender estilo y blueprint.

---

## 1 · Modos de operación

**Modo A — Escritor (default)**:

> Implementar la tarea T-N de la fase activa en `PLAN.md`. Pasar por `rpiv-gate` antes de tocar código.

**Modo B — Auditor**:

> Revisar el último diff sin escribir. Buscar violaciones de UI-SPEC, regresiones de a11y / perf, riesgos seguridad, divergencias del PLAN.

Si el usuario no aclara, **preguntá** qué modo.

---

## 2 · Skills mandatorias activas (provienen del ARSENAL en `V3/ARSENAL/.agents/skills/`)

- `business-research-curator` (consumida una vez; output en `docs/CURATED-BRIEF.md`).
- `ui-spec-author` (consumida una vez; output en `docs/UI-SPEC.md`).
- `magic-section-designer` (aplicar receta del blueprint sección a sección).
- `vibe-design-pipeline` (5 pasadas: foundation → stylistic → a11y → perf → motion).
- `rpiv-gate`, `vertical-slicer`, `context-hygiene` (transversales).
- `motion-polish`, `landing-premium` (tipo A).

---

## 3 · Reglas duras del repo (no negociables)

### Lenguaje

- TypeScript estricto. **Cero** `any`. Cero `@ts-ignore`. Si necesitás `any`, frenar y discutir.
- Sin `console.log` en main; usar `lib/log.ts`. Sentry para errores.
- Imports absolutos vía `@/...`. Sin `../../../`.

### Estilo

- Tailwind v4 + tokens de `docs/UI-SPEC.md`. **Cero** hex/rgb hardcoded. **Cero** `text-[13px]`.
- Componentes ≤ 200 líneas. Si excede, descomponer.
- shadcn copiado a `components/ui/`. **Prohibido** Material UI, Chakra, Bootstrap.
- Una sola librería de motion por componente.

### Motion & WebGL (específicas de este proyecto)

- Framer Motion para microinteracciones UI.
- GSAP **solo** para scroll storytelling (ScrollTrigger + pinning).
- Three.js encapsulado en `components/3d/`. Inicialización con cleanup obligatorio (`WEBGL_lose_context` + `renderer.dispose()`).
- Shaders en `components/3d/shaders/*.glsl` con loader que respete tree-shaking.
- `prefers-reduced-motion`: fallback estático (poster + headline) obligatorio para todo lo WebGL.

### Performance

- Bundle JS inicial ≤ 220kb gzip mobile (relajado vs default por WebGL).
- LCP mobile ≤ 1.8s; LCP desktop ≤ 1.2s.
- 60 FPS sostenidos en mobile mid-range durante scrollytelling.
- `next/image` o `astro:assets` siempre. **Prohibido** `<img>` crudo.
- Fonts self-hosted vía `next/font`.

### A11y

- HTML semántico antes que ARIA.
- `:focus-visible` en cada interactivo.
- Lighthouse A11y ≥ 95.
- axe-core en CI; cero critical/serious.
- Canvas WebGL con `aria-hidden` + texto descriptivo accesible a un lado.

### Seguridad

- `.env.local` gitignored. `.env.example` con keys vacías.
- Cero credenciales en código.
- Form de lead validado server-side con Zod + rate limiting básico.
- CSP estricto vía middleware (Next.js).

---

## 4 · Do NOT (categórico)

- ❌ Instalar dependencias sin aprobación humana.
- ❌ Modificar `package.json`, `tsconfig.json`, `next.config.*`, `tailwind.config.*` sin OK.
- ❌ Usar `any`, `@ts-ignore`, `// @ts-nocheck`.
- ❌ Hardcodear claves, API URLs sensibles, IDs.
- ❌ Saltarse las pasadas de `vibe-design-pipeline` antes de marcar una sección done.
- ❌ Dejar canvas WebGL sin cleanup en unmount (causa leaks de GPU progresivos).
- ❌ Llamar al producto "filtro de piscina" o caer en imaginería de pool service.
- ❌ Generar > 200 líneas en un solo archivo en una sola pasada.

---

## 5 · Definition of Done (por slice vertical)

- [ ] `pnpm build` verde, sin warnings nuevos.
- [ ] `pnpm typecheck` strict pasa.
- [ ] `pnpm lint` y `pnpm format:check` limpios.
- [ ] Lighthouse mobile ≥ 90 perf / ≥ 95 a11y en la página tocada.
- [ ] axe-core 0 critical/serious.
- [ ] 60 FPS verificados en DevTools para slices con WebGL.
- [ ] Screenshot capturado en `docs/artifacts/` antes/después.
- [ ] `STATE.md` actualizado.
- [ ] Tarea T-N marcada `<status>done</status>` en `PLAN.md`.

---

## 6 · Notas de proyecto

- **Idiomas**: en + es desde V1 (D-16). Inglés default por tagline oficial; español paralelo. Routing `/[locale]/...` con next-intl.
- **Brand**: nombre visual con `+` glifo en teal (`<BrandWordmark/>`); tagline "Transforming Waters, Transforming Lives" siempre en inglés.
- **Assets reales**: pendientes del cliente (logo, fotos Denis Blanco, brand book). Trabajamos con placeholders premium hasta que lleguen.
- **Integración CRM**: GHL probable para el lead form, pero **fuera del scope MVP** (mock service por ahora).

---

_Cambios en este archivo requieren OK explícito del usuario._
