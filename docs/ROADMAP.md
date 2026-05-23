# ROADMAP — Aqua Plus System

> Mapeo de requisitos a fases de entrega. Cada fase es un milestone con criterios de aceptación claros.

---

## Convenciones

- Cada fase tiene un estado: `pending` / `in_progress` / `done` / `blocked`.
- Cada fase referencia los `REQ-NNN` que cierra.
- Cada fase tiene `entry_criteria` (qué debe estar listo antes) y `exit_criteria` (qué se entrega).

---

## Fase 0 — Discovery & Foundation

**Estado**: in_progress
**Cubre**: estructura del proyecto + curaduría + UI-SPEC + decisiones arquitectónicas
**Entry criteria**:

- `uploads/research-aqua-plus.md` con investigación del negocio (✅)
- PROJECT.md, REQUIREMENTS.md, ROADMAP.md completos
- CURATED-BRIEF.md aprobado por el cliente

**Exit criteria**:

- ✅ CURATED-BRIEF.md generado (estilo Kinetic Cinematic + stack confirmado)
- 🔄 UI-SPEC.md aprobado
- 🔄 CONTEXT.md con D-01 a D-10 (stack, motion, performance, a11y, security baseline)
- 🔄 Repo Next.js inicializado con templates del arsenal + AGENTS.md + CLAUDE.md
- 🔄 CI/CD básico (PR → preview deploy en Vercel)
- 🔄 Tooling: ESLint, Prettier, TypeScript strict, Husky, lint-staged

---

## Fase 1 — Hero + Ósmosis (MVP scrollytelling)

**Estado**: pending
**REQs cubiertos**: REQ-001, REQ-002, REQ-003, REQ-004, REQ-008, REQ-009, REQ-020, REQ-030, REQ-031, REQ-032, REQ-080, REQ-081, REQ-082, REQ-084, REQ-090, REQ-091
**Duración estimada**: 2-3 semanas
**Entry criteria**:

- Fase 0 done
- UI-SPEC aprobado
- Next.js scaffold listo con stack instalado (Three.js, R3F, drei, GSAP, Lenis, Tailwind v4)

**Exit criteria**:

- Hero WebGL funcional con shader líquido + partículas reactivas al cursor (REQ-001)
- Lenis + GSAP ScrollTrigger configurados globalmente (REQ-002, REQ-003)
- Fase Ósmosis con sticky scrollytelling + partículas contaminantes (REQ-004)
- Quote prominente de Denis Blanco post-hero con spotlight (REQ-020)
- Diferenciación de marca (no piscinas) en meta + copy + visual (REQ-030, REQ-031, REQ-032)
- Fallback `prefers-reduced-motion` funcional (REQ-008)
- Cleanup WebGL verificado vía DevTools Memory (REQ-009)
- Lighthouse mobile ≥ 90 perf, ≥ 95 a11y en home (REQ-081, REQ-082)
- 60 FPS sostenidos en mobile mid-range (REQ-084)
- Responsive completo 360px-1920px (REQ-080)
- SEO baseline: sitemap + OG + JSON-LD (REQ-090, REQ-091)
- Demo desplegada en Vercel preview para validación con cliente

**Slices verticales**:

- S-1.1 Scaffold Next.js 15 + dependencias + tooling
- S-1.2 UI-SPEC tokens en Tailwind v4 + shadcn baseline + tipografías
- S-1.3 Layout + Nav sticky + Lenis global
- S-1.4 Hero canvas (WaterCanvas component) + waterEngine.ts + shaders líquidos
- S-1.5 GSAP ScrollTrigger setup + sticky pinning del canvas
- S-1.6 Fase Ósmosis: partículas contaminantes + malla filtro + sidebar sticky con narrativa
- S-1.7 Denis Blanco quote post-hero con spotlight Aceternity
- S-1.8 Reduced-motion fallback + cleanup WebGL + a11y
- S-1.9 SEO + meta + JSON-LD + diferenciación de marca
- S-1.10 Performance pass: lazy load, image optimization, bundle audit, Lighthouse CI

---

## Fase 2 — Conversión + Ionización + Tabla comparativa

**Estado**: pending
**REQs cubiertos**: REQ-005, REQ-006, REQ-021, REQ-040, REQ-041, REQ-042
**Duración estimada**: 2 semanas
**Entry criteria**: Fase 1 done + canvas WebGL reutilizable establecido

**Exit criteria**:

- Fase Conversión: esferas minerales + destellos dorados + gráfico pH live (REQ-005)
- Fase Ionización: plasma electroquímico + microburbujas H₂ GPU particles (REQ-006)
- 2 quotes de Denis Blanco intercaladas en estas fases (REQ-021)
- Tabla comparativa completa con stagger reveal (REQ-040, REQ-041, REQ-042)
- Continúa cumpliendo budget de FPS y Lighthouse

**Slices verticales**:

- S-2.1 Fase Conversión: cámara, materiales minerales, gráfico pH
- S-2.2 Fase Ionización: shader plasma + sistema partículas burbujas H₂
- S-2.3 Quotes de Denis Blanco intercaladas
- S-2.4 Tabla comparativa con animación de reveal
- S-2.5 Performance + a11y audit completa de las 4 fases del scroll

---

## Fase 3 — Calculadora ROI + Lead form + CTA 3D

**Estado**: pending
**REQs cubiertos**: REQ-007, REQ-050-067, REQ-100, REQ-101
**Duración estimada**: 2 semanas
**Entry criteria**: Fase 2 done

**Exit criteria**:

- Calculadora completa con NumberTicker (REQ-050, REQ-051, REQ-052, REQ-053)
- Lead form con validación ZIP + Zod (REQ-060, REQ-061, REQ-062)
- Server Action + rate limiting (REQ-063)
- Service layer mockeable (REQ-064)
- Confirmación animada + email opcional (REQ-065, REQ-066)
- CTA con ensamble 3D rotando 360° (REQ-007)
- Sentry + PostHog activos con eventos clave (REQ-100, REQ-101)
- Compliance: banner cookies + políticas placeholder (REQ-110, REQ-111)

**Slices verticales**:

- S-3.1 Calculadora UI + lógica + NumberTicker
- S-3.2 Lead form completo con Zod + Server Action
- S-3.3 Rate limiting + service layer mockeable
- S-3.4 CTA section con ensamble 3D rotando
- S-3.5 Confirmación post-submit + Resend opcional
- S-3.6 Observability setup (Sentry + PostHog + eventos)
- S-3.7 Compliance: cookies + privacy placeholder

---

## Fase 4 — i18n inglés (V1.5)

**Estado**: pending (post-launch V1)
**REQs cubiertos**: REQ-083, REQ-092, REQ-150 (parcial), REQ-151
**Duración estimada**: 1 semana
**Entry criteria**: V1 en producción + tracción de leads inicial

**Exit criteria**:

- Strings en inglés completos
- hreflang correcto
- Toggle de idioma funcional sin reload
- Integración GHL real (no mock) si el cliente aprueba

---

## Fase N — Hardening + Go-live

**Estado**: pending
**Entry criteria**: Fases 1-3 done (V1)
**Exit criteria**:

- Pre-deploy checklist 100% verde (`checklists/pre-deploy-checklist.md`)
- 25K quality bar 100% verde (`checklists/25k-quality-bar.md`)
- Security baseline aprobado (`checklists/security-baseline.md`)
- Documentación de operación entregada al cliente (cómo gestionar leads, ver analytics, actualizar quotes)
- DNS cutover + monitoreo activo 72h post-launch
- Capacitación al cliente (≤ 1h, video o sesión vivo)

---

## Tracking de fases

| Fase | Estado      | Inicio     | Entrega prevista | Entrega real |
| ---- | ----------- | ---------- | ---------------- | ------------ |
| 0    | in_progress | 2026-05-22 | 2026-05-23       | -            |
| 1    | pending     | -          | -                | -            |
| 2    | pending     | -          | -                | -            |
| 3    | pending     | -          | -                | -            |
| 4    | pending     | -          | -                | -            |
| N    | pending     | -          | -                | -            |

---

_Update tras cada cierre de fase. La fila se cierra solo cuando exit_criteria está 100%._
