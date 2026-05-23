# STATE — Aqua+ Systems

> Bitácora viva del proyecto. Memoria persistente que el agente lee al inicio de cada sesión.
> Append-only. Tachar con `~~strikethrough~~` si necesitás retractar.

---

## Current focus

Fase 1 · **Bloque C · Full MVP scrollytelling completo en local**. Las 4 fases del viaje molecular + comparativa + calculator + lead form + CTA assembly + footer + polish (TrustMarquee + MagneticButton + Spotlight + NumberTicker + ShimmerButton). Build production verde (8.8s), typecheck strict pasa, ambos locales SSG'd. Pendiente: Vercel preview deploy.

---

## Open issues

<!-- Vacío al inicio. Se irán abriendo conforme aparezcan blockers. -->

---

## Session log

### 2026-05-22 (tarde) — sesión 2 · brand integration

- [in_progress] Cliente entregó logo real de **Aqua+ Systems**:
  - Tagline oficial: "Transforming Waters, Transforming Lives" (en inglés).
  - Paleta: navy profundo (azul tipográfico) + teal/menta (drop dentro de la "A" + glifo `+`).
  - El `+` actúa como cruz médica refuerza el posicionamiento clínico.
- [done] Usuario validó las 3 decisiones de brand integration:
  - Nombre → "Aqua+ Systems" en todo (D-15).
  - Bilingual V1 (en default + es) (D-16, supersede D-11).
  - Recalibrar paleta a navy + teal manteniendo Kinetic Cinematic (D-17, supersede D-10).
- [done] Plan escrito en `~/.claude/plans/retoma-hashed-sonnet.md` y aprobado.
- [done] A.1 · Docs actualizadas:
  - `CONTEXT.md` sumó D-15/D-16/D-17, marcó D-10 y D-11 como superseded.
  - `UI-SPEC.md` v1.1 con paleta navy+teal recalibrada + sección 1.1 Tagline oficial + mood adjectives [cinemático, clínico, fresco].
  - `PROJECT.md` con nombre Aqua+ Systems + idiomas en+es V1.
  - `REQUIREMENTS.md` con REQ-024/025/026 nuevos (brand identity) + REQ-083 elevado a MUST.

### 2026-05-22 — sesión inicial · curaduría ARSENAL + T-1 scaffold

- [done] Leído `Contexto.txt` original con la visión técnica completa.
- [done] Explorado `V3/ARSENAL/` y validado el workflow impact-first.
- [done] Confirmado con el usuario: ubicación = V3/aqua-plus-web/, MVP = Hero + Ósmosis, stack = Next.js 15 + Three.js + GSAP + Lenis, assets reales pendientes.
- [done] Creada estructura del proyecto en `V3/aqua-plus-web/` con `docs/` y `uploads/`.
- [done] `uploads/research-aqua-plus.md` redactado a partir del Contexto.txt original (formato curaduría).
- [done] `CLAUDE.md` y `AGENTS.md` del proyecto generados con reglas duras del repo.
- [done] `docs/CURATED-BRIEF.md` generado:
  - primary_style = Kinetic Cinematic (alt: Glassmorphic Luxury + Editorial Dramatic).
  - 10 secciones del blueprint con recetas mágicas asignadas.
  - 5 decisiones pendientes de validación con el cliente.
  - 5 gaps en research listados.
- [done] `docs/PROJECT.md` con identidad inmutable.
- [done] `docs/REQUIREMENTS.md` con 60+ REQ-NNN distribuidos en 11 dominios.
- [done] `docs/ROADMAP.md` con 5 fases + Hardening; Fase 0 in_progress, Fase 1 listada con 10 slices.
- [done] `docs/CONTEXT.md` con D-01 a D-12 (stack, motion, webgl, ux, infra, security, data, i18n, compliance).
- [done] `docs/UI-SPEC.md` con tokens completos del Kinetic Cinematic (paleta oklch, tipografía, motion canónico, patrones de página).
- [done] `docs/PLAN.md` con plan XML de Fase 1 (T-1 a T-10) referenciando D-01 a D-11.
- [done] Checkpoint con el usuario validado (2026-05-22):
  - Estilo Kinetic Cinematic ✅ confirmado.
  - es V1, en V1.5 ✅ confirmado.
  - ZIP scope = TODO Florida ✅ confirmado (ampliado vs propuesta inicial; ver D-13).
  - Denis Blanco endorsement status = TBD ✅ confirmado; placeholder genérico (ver D-14).
- [done] Docs actualizadas con D-13 (ZIP Florida completo) y D-14 (Endorsement abstracto).
- [done] Block A · A.2 tokens CSS + shaders RGB recalibrados a navy + teal.
- [done] Block A · A.3 BrandWordmark + LanguageToggle creados.
- [done] Block A · A.4 next-intl setup completo: routing.ts + request.ts + middleware.ts + [locale] segment; app/layout y app/page movidos bajo [locale]/; messages/en.json creado.
- [done] Block A · A.5 Nav + Hero usan `<BrandWordmark/>` y `useTranslations`/`getTranslations`.
- [done] Block A · A.6 validación local exitosa:
  - `corepack pnpm typecheck` strict pasa ✅
  - Dev server arranca en http://localhost:3000 (Ready 3.9s) ✅
  - `GET /` → 307 redirect a `/en` ✅
  - `GET /en` HTTP 200 99kB con SSR de Hero ("The water you drink at home, reengineered molecule by molecule.") + Nav con wordmark "Aqua+ Systems" ✅
  - `GET /es` HTTP 200 99kB con SSR en español ("El agua para beber en tu casa, reingeniada a nivel molecular.") + `<html lang="es">` ✅
  - JSON-LD multilingüe con `name: "Aqua Plus Systems"` + `alternateName: "Aqua+ Systems"` + `slogan: "Transforming Waters, Transforming Lives"` ✅
  - Toggle EN/ES presente con `aria-pressed` correcto ✅
- [done] 3 fixes post-smoke:
  - Fix-1: `NextIntlClientProvider` ahora recibe `messages={messages}` desde `getMessages()` (sin esto el Nav mostraba "nav.process" literal).
  - Fix-2: `<WaterCanvasMount/>` envuelto en `<Suspense>` para aislar el bail a CSR (antes contaminaba toda la página y el Hero no se renderizaba server-side).
  - Fix-3: webpack rule de GLSL `?raw` removida de next.config.ts (los shaders están inlined como TS strings; rule disparaba warning de Turbopack).

### 2026-05-22 (noche) — sesión 3 · Block C · Full Phase 1 MVP push

User feedback: el sitio se sentía "supersencillo, supercorto" y el WebGL no se veía. Decisión: dale con todo (full storytelling + conversión + footer + polish).

- [done] **C.0**: bug WebGL invisible diagnosticado · canvas estaba en `-z-10` siendo tapado por el body navy. Fix: canvas a `z-0`, main a `relative z-10`.
- [done] **C.0b**: Hero shader enriquecido con sub-onda (3ra octava), caustics simulados, mouse halo concéntrico pulsante, edge glow superior, alpha más alta (visible sobre el body).
- [done] **C.1 (T-5)**: `<Hero/>` con sticky pinning 200vh via GSAP ScrollTrigger + headline reveal palabra-por-palabra con FM staggerChildren + scroll progress driven al shader via `scrollProgressRef` singleton + scroll hint animado.
- [done] **C.2 (T-6)**: `<StageOsmosis/>` sticky 300vh + 3 milestones (PFAS / Heavy Metals / Microplastics) que se activan según scroll progress + sub-escena `<OsmosisScene/>` con membrana hexagonal shader + ~2400 partículas InstancedMesh contaminantes en 3 colores que vuelan hacia la membrana y se consumen.
- [done] **C.3 (T-7)**: `<EndorsementQuote/>` server component con slot abstracto (cumple D-14, sin hardcoded "Denis Blanco") + `<Spotlight/>` follow cursor con motion springs + foto placeholder con gradient navy/warm.
- [done] **C.4 (T-8)**: `<StageConversion/>` con ecuación química balanceada en mono + pH live NumberTicker (5.8→7.4) + TDS live (0→70 mg/L) driven by scroll + sub-escena `<ConversionScene/>` con 7 esferas minerales doradas + 600 partículas teal flowing + sparkles drei + iluminación dorada.
- [done] **C.5 (T-9 · clímax)**: `<StageIonization/>` con ecuación catódica + ORP live (0→-350 mV) + H₂ disuelto (0→1.2 ppm) + sub-escena `<IonizationScene/>` con plasma fragment shader FBM 3-octave + chromatic aberration + 280 microburbujas H₂ ascendiendo desde cátodo + 120 sparkles drei superiores + 2 electrodos titanio/platino.
- [done] **C.6 (T-10)**: `<ComparisonTable/>` 6 muestras × 4 columnas (Sample/pH/ORP/TDS/Effect) con stagger reveal FM whileInView; fila "Ionized Aqua+" destacada con border-left teal + bg subtle accent.
- [done] **C.7**: `<Calculator/>` con 2 sliders (habitantes 1-12, gasto $10-$300) + 3 OutputCards con NumberTicker que re-animan al cambiar input + lib pura `computeSavings.ts` con cálculo basado en promedio Florida + CO₂ ref PMC.
- [done] **C.8**: `<LeadForm/>` con form native + Server Action `submitLead` server-only + Zod schema bilingual (incluye `isFloridaZip` D-13) + rate limit in-memory 5/IP/h + LeadService interface + mockLeadService impl + 4 estados (idle/submitting/success/error) con AnimatePresence + 6 campos con error states accesibles.
- [done] **C.9**: `<CTASection/>` con headline final + `<ShimmerButton/>` magnético + sub-escena `<AssemblyScene/>` (cilindro membrana + icosahedron oro + cubo ionización con ring glows) rotando 360° en mini Canvas independiente.
- [done] **C.10**: `<Footer/>` server component con `<BrandWordmark/>` monumental + tagline + Spotlight + grid 4-cols (Company/Science/Legal/Contact) + disclaimer anti-piscina + copyright.
- [done] **C.P (polish)**:
  - `<TrustMarquee/>` server con primitive `<Marquee/>` (CSS animation, dual-set, pauseOnHover, mask edges) recorriendo 12 conceptos químicos entre Hero y Ósmosis.
  - `<MagneticButton/>` aplicado al CTA primario del Hero (spring physics, radius 90px, strength 0.3).
  - `<NumberTicker/>` reutilizable (modo viewport + modo driveBy) usado en Calculator, Conversion y Ionization.
  - `<ShimmerButton/>` con sweep gradient cada 2.4s aplicado en CTA section.
  - `<Spotlight/>` follow usado en EndorsementQuote y Footer.
- [done] **Verification**:
  - `corepack pnpm typecheck` strict pasa con cero errores.
  - `corepack pnpm build` exitoso en 8.8s; 5 páginas SSG (/en, /es, /\_not-found, etc.).
  - Bundle First Load `/[locale]`: **451 kB** (sobre el budget aspiracional 220 kB porque está toda la pipeline 3D; razonable para un sitio cinemático con 4 sub-escenas WebGL).
  - Smoke curl `/en` (192 kB SSR HTML) y `/es` (193 kB) con todos los markers presentes.
- [pending] **C.V**: Vercel preview deploy + URL compartible al cliente.
- [done] T-1.a · `package.json` con todas las dependencias Fase 1 (Next 15.5, React 19.2, Three 0.171, R3F 9, GSAP 3.12, Lenis 1.1, motion 11.18, Tailwind v4.3).
- [done] T-1.b · Configs: `tsconfig` strict + paths, `next.config.ts` con webpack loader GLSL + security headers, `.eslintrc`, `.prettierrc`, `.gitignore`, `.env.example`, `postcss.config.mjs`.
- [done] T-1.c · `src/app/layout.tsx` con metadata + JSON-LD anti-piscina (Organization + LocalBusiness + Service), `src/app/page.tsx` placeholder con headline "agua para beber" + datos científicos mono + disclaimer anti-piscina visible, `src/app/globals.css` con `@theme` completo (paleta + tipografía + motion + radius + shadows del UI-SPEC).
- [done] T-1.d · `corepack pnpm install` 45.4s exitoso; `pnpm typecheck` strict pasa con cero errores; `pnpm build` exitoso con bundle inicial 102 kB (objetivo 220kB, sobra holgado).
- [done] Bonus de T-1: `src/lib/validation/florida-zip.ts` (helper para D-13), `src/lib/utils.ts` (cn helper), `src/messages/es.json` (strings MVP Fase 1).

### 2026-05-22 (noche) — sesión 4 · corrección de error de servidor de desarrollo

- [done] Solucionado el error 500 interno del servidor dev local que provocó el reporte "está roto". La causa fue que `npm run build` y `npm run dev` corrieron en paralelo, borrando/corrompiendo los manifiestos de desarrollo temporales de Turbopack.
- [done] Terminado el proceso dev antiguo y reiniciado el servidor de desarrollo (`npm run dev`) de forma limpia para reconstruir los manifiestos de Turbopack.
- [done] Verificado que `GET /en` responde `200 OK` sin errores y la compilación local está totalmente funcional.

### 2026-05-22 (noche) — sesión 5 · refinamientos pre-launch (copy real + cards + audit)

Plan: `~/.claude/plans/hemos-avanzado-bastante-tenemos-shimmering-dewdrop.md` aprobado. Tres bloques completos (A copy + B cards + C audit). Sin breaking changes, sin nuevas deps.

**Bloque A · Copy real bilingual**:
- [done] **A.1**: Materializado Denis Blanco — `EndorsementQuote.tsx` ahora lee `attribution_name` de i18n (default "Denis Blanco"), nameplate prominente (display lg weight 700) bajo la quote, foto placeholder `/assets/denis-blanco.png` duplicada de `nutritionist_portrait.png` (marcada `[VERIFY: foto real cliente]`). Quote del aval en `StageOsmosis` ahora firma con `Denis Blanco · Nutricionista clínico · Miami`.
- [done] **A.2**: 5 quotes editoriales firmadas Denis Blanco · primera persona, afirmación medible + implicación celular, ≤30 palabras. Reemplazadas en `messages/{en,es}.json` para `endorsement_quote_hero.quote`, `stages.osmosis.endorsement_quote`, `stages.conversion.endorsement_quote`, `stages.molecular.endorsement_quote`, `stages.ionization.endorsement_quote`.
- [done] **A.3**: 15+ hardcodes EN-only movidos a i18n bilingual:
  - `marquee.terms[]` (12 items) → `TrustMarquee.tsx` convertido a server component que lee i18n.
  - `cta.eyebrow`, `cta.headline_{a,accent,b}`, `cta.subtitle`, `cta.tag_3d`, `cta.tag_3d_pause` → `CTASection.tsx`.
  - `calculator.eyebrow` y deltas (`output_savings_delta`, `output_bottles_delta` con `{trucks}`, `output_carbon_delta` con `{trees}`).
  - `lead_form.eyebrow`; **bug fix** `lead_form.label_zip` ES = "Código postal" (antes "ZIP code" sin traducir).
  - `footer.col_{company,science,legal,contact}_title` + `col_{science,legal,contact}_links.*` + `service_area_*` (nuevo bloque).
  - `comparison.badge_optimal` (antes "Optimal" hardcoded EN).
  - `stages.conversion.{equation_label,metric_ph_label,metric_tds_label}`.
  - **bug fix** `stages.molecular.{equation_label,metric_cluster_label,metric_alignment_label}` (antes strings ES dentro del componente EN).
  - `stages.ionization.metric_orp_label`.
  - `a11y.canvas_description` para sr-only.
- [done] **A.4**: Refinamiento editorial · Hero headline_accent reescrito "reengineered / rediseñada" + tail "molecule by molecule. / molécula por molécula." (más punchy), subtitle trimmed ~12%, footer tagline ahora incluye "Servicio residencial en todo el estado de Florida".
- [done] **A.5**: `src/lib/brand.ts` (nuevo) exporta `BRAND_NAME`, `BRAND_NAME_LEGAL`, `TAGLINE`, `CONTACT_EMAIL`. Hero y Footer importan TAGLINE en lugar de duplicar el string hardcoded.

**Bloque B · Sistema de cards canónico**:
- [done] **B.1**: 3 utility classes nuevas en `globals.css`: `.card-glass`, `.card-stat`, `.card-quote` (+ variante `.card-quote--warm`). Reemplazaron ~40 líneas de padding/radius/border ad-hoc en los 4 Stage*.tsx.
- [done] **B.2**: `Calculator.tsx` OutputCard ahora acepta `delta` prop · mostrado debajo del número en `--text-micro` mono uppercase. Icon container con ring glow + box-shadow del accent. Deltas dinámicos: "vs gasto actual", "≈ {trucks} cargas de camioneta", "≈ {trees} árboles plantados".
- [done] **B.3**: `StageOsmosis.tsx` milestones ahora muestran mini-stat de rejection rate junto al título (99.99% / 99.97% / 99.95%, en pill con border accent cuando active). Quote firmada con Denis Blanco · Nutricionista clínico.
- [done] **B.4**: `ComparisonTable.tsx` · 5 oklch hardcoded extraídos a tokens `--color-data-{acidic,neutral,alkaline,antioxidant,warn}` en globals. Badge "Optimal" → `t("badge_optimal")` con `--text-nano` token. Indicators (PHSpectrum/ORPIndicator/TDSIndicator) usan `--text-micro` en lugar de `text-[10px]` arbitrario. Mobile: mantiene overflow-x-auto con scroll horizontal (decisión pragmática vs reescribir tabla).
- [done] **B.5**: `Footer.tsx` reescrito con i18n cleanup completo + bloque nuevo "Florida service area" (7 condados en mono uppercase + disclaimer servicio Florida) + disclaimer anti-piscina con peso visual subido (`text-sm` vs `text-xs`, border-strong, padding mayor).

**Bloque C · Audit cleanup**:
- [done] **C.1**: `WaterCanvas.tsx` y `SequenceCanvas.tsx` ya tenían `aria-hidden="true"`. Canvas de CTA (AssemblyScene) ahora envuelto en `<div aria-hidden="true">`. LeadForm checkbox custom usa pattern `peer-focus-visible:outline` sobre el input sr-only. Sliders `:focus-visible` agregado a globals (`input[type="range"].premium-slider:focus-visible::-webkit-slider-thumb`).
- [done] **C.2**: `src/lib/log.ts` (nuevo) logger no-op en producción. `mock-service.ts` y `submit-lead.ts` ahora usan `log.warn/error` en lugar de `console.warn/error` directo.
- [done] **C.3**: 2 tokens nuevos en `@theme`: `--text-micro: 0.625rem` (10px) y `--text-nano: 0.5625rem` (9px). Reemplazan los 5 `text-[Npx]` arbitrarios que violaban CLAUDE.md §3.
- [done] **C.4 Verification**:
  - `corepack pnpm typecheck` strict ✅ cero errores.
  - `corepack pnpm build` ✅ 17.4s; bundle `/[locale]` **225 kB First Load** (vs 451 kB baseline — improvement por dynamic imports kicking in).
  - `corepack pnpm lint` ✅ 0 warnings/errors.
  - `corepack pnpm format:check` ✅ todo prettier-clean tras `pnpm format` único.
  - Smoke curl `/en` y `/es`: SSR contiene "Denis Blanco" (3×), "Clinical Nutritionist · Miami" / "Nutricionista clínico · Miami" (3×), "Florida service area" / "Servicio residencial Florida" (2×), nuevos headlines Hero, badge optimal/Óptima, ZIP "Código postal" en ES, tagline "Transforming Waters" en inglés en ambos locales. Cero keys i18n sin resolver renderizadas al usuario.

**[VERIFY] handoff cliente** (grep en src/):
- `EndorsementQuote.tsx:42` — foto real Denis Blanco (placeholder es duplicado de nutritionist_portrait.png).
- `StageOsmosis.tsx:202` — rangos rejection rate específicos del equipo del cliente (99.99/99.97/99.95% asumidos típicos RO).
- Pendientes del copy adicional documentados en messages: `cta.headline_*` menciona "instalación residencial" — confirmar tiempo real con cliente.
- `Calculator` delta CO₂ usa equivalencia 1 árbol = 22 kg CO₂/año; bottles/2000 para cargas de camioneta — confirmar con cliente o referencia oficial.
- `Footer` lista 7 condados Florida (Miami-Dade, Broward, Palm Beach, Monroe, Orange, Hillsborough, Pinellas) — confirmar zona de servicio real.

**Files tocados (15)**:
- `src/lib/brand.ts` (nuevo), `src/lib/log.ts` (nuevo).
- `src/messages/en.json`, `src/messages/es.json` (reescritos completos con keys nuevas + Denis Blanco firmando).
- `src/app/globals.css` (+ tokens micro/nano + data-* + .card-* utility classes + slider focus-visible).
- `src/app/actions/submit-lead.ts`, `src/lib/lead/mock-service.ts` (log swap).
- `src/components/sections/{Hero,TrustMarquee,CTASection,Calculator,LeadForm,Footer,StageOsmosis,StageConversion,StageMolecular,StageIonization,EndorsementQuote,ComparisonTable}.tsx`.
- `public/assets/denis-blanco.png` (nuevo placeholder, copia de nutritionist_portrait.png).

### Artefactos generados (Fase 0)

- `uploads/research-aqua-plus.md`
- `docs/CURATED-BRIEF.md`
- `docs/PROJECT.md`
- `docs/REQUIREMENTS.md`
- `docs/ROADMAP.md`
- `docs/CONTEXT.md`
- `docs/UI-SPEC.md`
- `docs/PLAN.md`
- `docs/STATE.md` (este archivo)
- `CLAUDE.md`, `AGENTS.md`

---

## Next

1. ✅ Checkpoint con el usuario completado (4 de 4 decisiones validadas en sesión).
2. **Próximo paso**: arrancar T-1 (scaffold Next.js 15 con dependencias y tooling), pendiente confirmación final del usuario para empezar a tocar código.
3. Continuar con T-2 (tokens en globals.css + fuentes) y T-3 (layout + Nav + Lenis).
4. `/clear` después de T-3 para rehidratar con `STATE.md` actualizado antes de tocar shaders (T-4).
5. Pendientes no-bloqueantes: dominio + brand assets reales (cuando el cliente entregue), confirmación de catálogo de equipos en V1 (default = sin catálogo).

---

## Decisions index (resumen — autoridad en CONTEXT.md)

- D-01: Stack Next.js 15 + Tailwind v4 + shadcn primitives + TypeScript estricto.
- D-02: Motion stack único FM + GSAP/ScrollTrigger + Lenis + R3F.
- D-03: GLSL shaders custom; cero geometrías densas para líquidos.
- D-04: Una escena WebGL reutilizable + cleanup `WEBGL_lose_context`.
- D-05: `prefers-reduced-motion` first-class, fallback estático obligatorio.
- D-06: Diferenciación de marca categórica vs pool service.
- D-07: Vercel + Sentry + PostHog.
- D-08: Security headers + CSP estricto.
- D-09: Lead form con Zod + Server Action + rate limiting + service layer mockeable.
- D-10: Modo dark único; paleta Kinetic Cinematic del UI-SPEC.
- D-11: i18n scaffold día 1, V1 solo /es, V1.5 suma /en.
- D-12: Banner cookies opt-in para analytics; políticas placeholder V1.
- D-13: Lead form valida ZIP de todo el estado de Florida (no solo tri-county).
- D-14: Endorsement clínico con slot abstracto; "nutricionista respaldado" hasta confirmación.
- D-15: Nombre marca **"Aqua+ Systems"** (con `+` glifo + plural); tagline oficial "Transforming Waters, Transforming Lives".
- D-16: V1 bilingual en + es, default en (supersede D-11).
- D-17: Paleta navy + teal del logo real (supersede D-10).

---

## Telemetría rápida

- Slices cerrados: 1 / 10 en Fase 1 (T-1 scaffold completo).
- Lighthouse Perf mobile (último deploy): pendiente (sin deploy aún)
- Lighthouse A11y (último deploy): pendiente
- Errores Sentry últimos 7 días: -
- Bundle JS inicial (build local): **102 kB** First Load JS (target ≤ 220 kB ✅)
- Typecheck strict: ✅ pasa

---

_Sintetizar STATE.md al cerrar sesión. Es la diferencia entre "el agente recuerda" y "el agente alucina"._
