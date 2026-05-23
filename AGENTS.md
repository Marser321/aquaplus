# AGENTS.md — Aqua+ Systems web

> Contrato leído por Antigravity, ChatGPT, Cursor, Claude Code al iniciar sesión sobre este repo. Sincronizado con `CLAUDE.md`.

---

## 0 · Identidad

- **Cliente**: Aqua+ Systems Miami.
- **Tipo**: A · Landing premium con scrollytelling cinemático WebGL.
- **Stack**: ver `docs/CONTEXT.md` D-01.
- **Estado**: ver `docs/STATE.md`.
- **Budget de calidad**: USD 25,000 (referencia Awwwards/FWA/CSS Design Awards).

Antes de cualquier acción: leer `docs/STATE.md` → `docs/CONTEXT.md` → fase activa de `docs/PLAN.md` → `docs/UI-SPEC.md` (si tarea visual) → `docs/CURATED-BRIEF.md` (si dudas de estilo).

---

## 1 · Skills mandatorias

Provenientes del ARSENAL en `../ARSENAL/.agents/skills/`:

- `business-research-curator` (one-shot al inicio).
- `ui-spec-author` (one-shot al inicio).
- `magic-section-designer` (cada sección importante).
- `rpiv-gate`, `vertical-slicer`, `context-hygiene` (transversales).
- `stylistic-audit`, `a11y-audit`, `performance-audit`, `motion-polish` (pasadas).
- `landing-premium` (tipo A).

---

## 2 · Reglas duras

Idénticas al CLAUDE.md. En resumen:

- TypeScript estricto, cero `any`.
- Tokens del UI-SPEC, cero hex hardcoded.
- Una motion lib por componente (FM default + GSAP solo en ScrollTrigger).
- Three.js con cleanup obligatorio.
- Bundle ≤ 220kb gzip mobile.
- Lighthouse ≥ 90 perf / ≥ 95 a11y.
- Cero credenciales en código.
- 200 líneas / componente.

---

## 3 · Do NOT

Idénticas al CLAUDE.md.

---

## 4 · Protocolo RPIV

1. **R · Research** — leer estado + decisiones + referencias.
2. **P · Plan** — bloque XML en PLAN.md con decisions referenced.
3. **I · Implement** — una T-N por iteración, ≤ 200 líneas, commit atómico.
4. **V · Validate** — verification declarada, screenshot/log.

3-strike rule: si fallás 3 veces sobre la misma tarea, frenás y escalás.

---

## 5 · Higiene de contexto

- `/clear` cada ~10 mensajes o entre tareas funcionalmente distintas.
- Sintetizar STATE.md al cerrar sesión.

---

## 6 · Two-AI workflow

- **Escritor**: el agente actual (Antigravity / Claude Code en Modo A).
- **Revisor**: instancia separada en Modo B con prompt de auditor.

---

_Si el agente viola cualquier regla, frenar, notificar al humano, endurecer la regla._
