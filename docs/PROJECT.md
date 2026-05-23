# PROJECT — Aqua+ Systems (Miami)

> Visión inmutable del proyecto. Se llena una sola vez al inicio. NO se edita después.
> Si algo cambia fundamentalmente, se versionea (`PROJECT-v2.md`) y se documenta el motivo en `CONTEXT.md`.

---

## Identidad

- **Nombre del proyecto**: Aqua+ Systems — Sitio Web Premium
- **Cliente**: Aqua+ Systems LLC (Miami-Dade, Florida)
- **Sector / industria**: Biotech-wellness / hidratación clínica residencial
- **Tipo de proyecto**: A · Landing premium con elementos D (funnel + lead gen)
- **Inicio**: 2026-05-22
- **Fecha objetivo de entrega**: TBD (por confirmar con cliente; estimado: 8-10 semanas a velocidad de equipo solo, considerando carga de WebGL)
- **Ticket / honorarios**: USD 25,000

---

## Visión en una frase

> Plataforma web cinemática bilingüe (en/es) de generación de leads para Aqua+ Systems, donde el viaje molecular del agua se experimenta en scroll 3D con aval clínico nutricional. Tagline: "Transforming Waters, Transforming Lives".

---

## Audiencia objetivo

- **Persona primaria**: hogares de Miami-Dade y sur de Florida, alto poder adquisitivo, 35-65 años, audiencia hispana fidelizada a Denis Blanco, sensibilizados con PFAS / plástico / bienestar holístico, consumidores actuales de agua embotellada premium.
- **Persona secundaria**: profesionales bilingües 28-45 años de la región anglo del condado, perfil biohacker/wellness/sustainability.
- **Mercados**: estado de Florida completo (USA), con foco operativo inicial en Miami-Dade y entorno metropolitano.
- **Idiomas**: en + es desde V1 (decisión D-16). Inglés default por tagline oficial; español paralelo para audiencia hispana de Miami-Dade.
- **Dispositivo dominante**: mixto desktop + mobile (Miami premium tiende a desktop; pero el aval de Denis Blanco arrastra mobile pesado). Diseño mobile-first sin sacrificar el desktop premium.

---

## Promesa de valor

- **Qué resuelve**: transformar curiosidad en agendamiento del **análisis químico gratuito de agua a domicilio** (cierre comercial offline).
- **Para quién**: el residente del sur de Florida que ya gasta en agua embotellada y empieza a preocuparse por PFAS, microplásticos y costo continuo.
- **Por qué importa ahora**: la regulación EPA sobre PFAS subió la conciencia pública en 2024-2026; el mercado entra en un momento de demanda creciente.
- **Diferencial frente a alternativas**:
  1. **Triple etapa coordinada** (ósmosis → remineralización → ionización con H₂ activo). Ningún competidor común ofrece las tres juntas.
  2. **Aval clínico-nutricional de Denis Blanco**: convierte una decisión "técnica de plomería" en una decisión de salud y estilo de vida.
  3. **Servicio consultivo a domicilio**: análisis gratuito + diagnóstico personalizado + visita de técnico certificado.

---

## Entregables del scope V1

- [ ] Landing pública con scrollytelling cinemático (Hero + 4 fases del viaje molecular + tabla comparativa + calculadora ROI + lead form + footer).
- [ ] Lead form con validación de ZIP de todo el estado de Florida.
- [ ] Calculadora de impacto financiero y ecológico (USD ahorrados/año + botellas plásticas evitadas + huella de carbono).
- [ ] Comparativa científica visual entre tipos de agua (pH, ORP, TDS).
- [ ] Aval editorial de Denis Blanco con quote(s) + foto.
- [ ] Multi-language scaffold (es V1; en V1.5).
- [ ] SEO completo (sitemap, OG, JSON-LD, hreflang).
- [ ] Observability (Sentry + PostHog).
- [ ] Lighthouse mobile ≥ 90 perf, ≥ 95 a11y en home.
- [ ] Service-layer del lead form mockeable, lista para integración GHL en V1.5.

Lo que **NO** está en el scope V1 (explícito):

- E-commerce / venta online del equipo.
- Portal de cliente con login.
- Catálogo extenso de modelos con specs detalladas (V1.5+).
- Blog / sistema de contenido editorial (V2).
- Integración real con GHL — solo estructura mockeable (V1.5).
- App móvil nativa.
- Multi-tenant / portal de instaladores.

---

## Restricciones técnicas duras

- **Stack obligado por el cliente**: no hay restricción dura; el equipo confirmó stack Next.js 15 + Three.js + GSAP + Lenis.
- **Hosting obligado**: ninguno; Vercel propuesto.
- **Compliance**: PII del lead form (nombre, email, teléfono, dirección) → GDPR-friendly aunque el mercado sea US (best practice + futura expansión LATAM). Banner de cookies si hay PostHog/Google Analytics.
- **Compatibilidad navegadores**: últimos 2 evergreen (Chrome, Edge, Safari, Firefox); iOS 16+; Android 12+. No IE11.
- **Performance budget**: bundle JS inicial ≤ 220kb gzip mobile (relajado del default 180 por WebGL); LCP mobile ≤ 1.8s; 60 FPS sostenidos mobile mid-range.

---

## Stakeholders y roles

| Persona              | Rol                      | Contacto / canal |
| -------------------- | ------------------------ | ---------------- |
| (Cliente Aqua Plus)  | Decision maker           | TBD              |
| Denis Blanco         | Aval clínico + contenido | TBD              |
| Mario                | PM / arquitecto / dev    | (usuario actual) |
| Agente / Claude Code | Implementación asistida  | sesiones VS Code |

---

## Estructura de archivos GSD

Este `PROJECT.md` se acompaña de los siguientes archivos en `/docs/`:

- `REQUIREMENTS.md` — requisitos atómicos REQ-NNN
- `ROADMAP.md` — fases de entrega
- `STATE.md` — bitácora viva (se edita constantemente)
- `CONTEXT.md` — decisiones D-NN (se acumula)
- `PLAN.md` — plan de la fase activa (XML)
- `UI-SPEC.md` — contrato visual
- `CURATED-BRIEF.md` — brief curado de business-research-curator
- `VALIDATION.md` — gestionado por la skill auditora

---

_Generado por `rpiv-gate` · fase R · NO editar a mano salvo correcciones de tipeo._
