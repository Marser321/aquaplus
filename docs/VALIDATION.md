# VALIDATION — Aqua Plus System

> Mapa entre `REQUIREMENTS.md` y la cobertura real (tests automáticos, validaciones manuales, métricas).
> Gestionado por la skill auditora. El delta entre requerido y cubierto debe ser visible siempre.

---

## Convenciones

- **Cobertura**: `none` / `manual` / `e2e` / `unit` / `integration` / `metric` / `visual`.
- **Estado**: `passing` / `failing` / `pending` / `blocked`.
- Toda fila debe apuntar a un artefacto (test file, screenshot, dashboard URL, log).

---

## Cobertura por requisito (Fase 1 · MVP Hero + Ósmosis)

| REQ     | Descripción breve                            | Cobertura     | Artefacto (futuro)                                  | Estado  |
| ------- | -------------------------------------------- | ------------- | --------------------------------------------------- | ------- |
| REQ-001 | Hero canvas WebGL reactivo al cursor         | visual+manual | `docs/artifacts/hero-canvas-{desktop,mobile}.png`   | pending |
| REQ-002 | Sticky scrollytelling GSAP ScrollTrigger     | visual+manual | `docs/artifacts/scrolltrigger-recording.mp4`        | pending |
| REQ-003 | Lenis global activo cross-browser            | manual        | `docs/artifacts/lenis-matrix.md`                    | pending |
| REQ-004 | Fase Ósmosis con partículas + malla 3D       | visual+manual | `docs/artifacts/osmosis-phase-{1,2,3}.png`          | pending |
| REQ-008 | Reduced-motion fallback funcional            | manual        | `docs/artifacts/reduced-motion-fallback.png`        | pending |
| REQ-009 | Cleanup WebGL al unmount                     | manual        | `docs/artifacts/devtools-memory-cleanup.png`        | pending |
| REQ-020 | Quote Denis Blanco + spotlight               | visual        | `docs/artifacts/denis-quote-spotlight.png`          | pending |
| REQ-030 | Schema.org affirma drinking water (not pool) | e2e           | `e2e/seo/schema-anti-pool.spec.ts` (futuro)         | pending |
| REQ-031 | Imaginería libre de piscinas                 | manual        | Revisión visual completa                            | pending |
| REQ-032 | Hero copy menciona "agua para beber"         | visual        | screenshot del hero                                 | pending |
| REQ-080 | Responsive 360-1920px                        | visual+manual | `docs/artifacts/responsive-{360,768,1280,1920}.png` | pending |
| REQ-081 | Lighthouse Perf ≥ 90 mobile en home          | metric        | `lighthouse-ci/results/perf-mobile.json`            | pending |
| REQ-082 | Lighthouse A11y ≥ 95                         | metric        | `lighthouse-ci/results/a11y.json`                   | pending |
| REQ-084 | 60 FPS sostenidos en mobile mid-range        | manual+metric | `docs/artifacts/perf-recording-pixel-6a.json`       | pending |
| REQ-090 | Sitemap.xml dinámico                         | e2e           | `e2e/seo/sitemap.spec.ts` (futuro)                  | pending |
| REQ-091 | OG + JSON-LD + Twitter Card                  | manual        | OG inspector + Schema.org validator screenshots     | pending |

> Esta tabla se va llenando conforme avanzan los slices T-1 a T-10 de Fase 1.

---

## Brechas detectadas (gap analysis · Fase 1)

Requisitos `MUST` sin cobertura todavía:

- **Todos** (la fase no arrancó). Una vez Fase 1 esté en marcha, la skill auditora reduce esta lista por cada T-N cerrada.

Requisitos con cobertura pero estado `failing`:

- N/A (fase no iniciada).

---

## Cobertura prevista para Fase 2-3 (placeholder)

| Dominio                 | Requisitos                | Estrategia                                                    |
| ----------------------- | ------------------------- | ------------------------------------------------------------- |
| Conversión + Ionización | REQ-005, REQ-006, REQ-007 | Visual + manual + perf recording (FPS)                        |
| Tabla comparativa       | REQ-040, REQ-041, REQ-042 | e2e (Playwright) + a11y axe                                   |
| Calculadora             | REQ-050 a REQ-053         | unit (lógica de cálculo) + e2e (form interactions)            |
| Lead form               | REQ-060 a REQ-067         | unit (Zod schemas) + e2e (submit happy path + ZIP inválido)   |
| Observability           | REQ-100, REQ-101          | manual smoke (forzar error → Sentry; trigger event → PostHog) |
| Compliance              | REQ-110 a REQ-112         | manual + e2e (cookies banner)                                 |

---

## Métricas operativas (snapshot · target Fase 1 close)

```yaml
last_updated: TBD
lighthouse:
  perf_mobile_home: ≥ 90
  perf_desktop_home: ≥ 95
  a11y_avg: ≥ 95
  seo_avg: ≥ 95
  best_practices_avg: ≥ 95
core_web_vitals_p75:
  lcp_ms: ≤ 1800 (mobile), ≤ 1200 (desktop)
  cls: ≤ 0.05
  inp_ms: ≤ 200
fps_target:
  mobile_mid_range: ≥ 60 sostenidos durante scrollytelling completo
bundle_budget:
  initial_js_gzip: ≤ 220kb
test_coverage:
  e2e_critical_flows_phase1: 0/3 # smoke / reduced-motion / responsive
  unit: 0 tests inicial
```

---

## Exit gates

Para que **Fase 1** pase a `done`:

- [ ] Todos los `MUST` de Fase 1 con cobertura ≠ `none`.
- [ ] Cero `failing` en requisitos `MUST`.
- [ ] Métricas operativas dentro de budgets.
- [ ] Preview deploy en Vercel validado por el cliente.
- [ ] STATE.md actualizado con resumen de Fase 1 + lighthouse reports + screenshots.
- [ ] Brechas restantes documentadas con owner + ETA en backlog Fase 2.

---

_La skill auditora corre este archivo como check final antes de marcar una fase done. Si la auditoría encuentra inconsistencia entre REQUIREMENTS, PLAN y VALIDATION, frena la fase._
