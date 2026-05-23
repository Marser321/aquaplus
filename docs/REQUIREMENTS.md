# REQUIREMENTS — Aqua Plus System

> Requisitos funcionales atómicos rastreables. Cada uno con identificador único `REQ-NNN`.
> **Atómico** = no se puede partir más sin perder sentido.

---

## Convenciones

- **Estado**:
  - `MUST` — V1 obligatorio. Si falla, no se entrega.
  - `SHOULD` — V1 deseable. Negociable si time/budget aprietan.
  - `COULD` — V2 o backlog.
  - `WONT` — explícitamente fuera de scope.
- **Cobertura**: rastreado contra `PLAN.md` y `VALIDATION.md`.
- Cada requisito debe poder validarse con un test, screenshot o verificación humana concreta.

---

## REQ por dominio

### Storytelling visual / hero (la experiencia)

| ID      | Estado | Descripción                                                                                       | Verificación                                                       |
| ------- | ------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| REQ-001 | MUST   | Hero con canvas WebGL que muestra flujo 3D de agua reactivo al cursor                             | Visual: rotación + ripples siguen al mouse; FPS ≥ 60 en mobile mid |
| REQ-002 | MUST   | Sticky scrollytelling con GSAP ScrollTrigger que pinea el canvas durante 4 fases                  | Scroll completo de 0% a 100% sin saltos visuales                   |
| REQ-003 | MUST   | Lenis activo globalmente para scroll inercial unificado                                           | Behavior consistente Chrome/Safari/Firefox/Edge                    |
| REQ-004 | MUST   | Fase 1 (Ósmosis): partículas contaminantes (PFAS, metales) bloqueadas por malla 3D animada        | Visual: 3+ tipos de partículas distinguibles                       |
| REQ-005 | MUST   | Fase 2 (Conversión): esferas minerales disuelven destellos dorados en el caudal + gráfico pH live | pH animado de 5.8 → 7.4 conforme scroll                            |
| REQ-006 | MUST   | Fase 3 (Ionización): plasma eléctrico entre placas + microburbujas H₂ (GPU particles)             | Visual: arco eléctrico + 1000+ burbujas a 60fps                    |
| REQ-007 | MUST   | Fase 4 (CTA): ensamble 3D completo del equipo Aqua Plus rotando 360°                              | Rotación suave 360° en 4-6s                                        |
| REQ-008 | MUST   | Fallback estático para `prefers-reduced-motion` (poster + diagrama SVG + headline estático)       | Test manual con DevTools setting                                   |
| REQ-009 | MUST   | Liberación explícita de contexto WebGL al desmontar (`WEBGL_lose_context` + `dispose()`)          | DevTools Memory snapshot: GPU memory cae a 0 al unmount            |
| REQ-010 | SHOULD | Cursor magnético en CTAs (con opt-out)                                                            | Test manual con Magnetic component                                 |

### Contenido editorial / aval clínico

| ID      | Estado | Descripción                                                                       | Verificación                                           |
| ------- | ------ | --------------------------------------------------------------------------------- | ------------------------------------------------------ |
| REQ-020 | MUST   | Quote prominente de Denis Blanco post-hero con foto editorial + spotlight follow  | Visual: bloque editorial + spotlight reactivo al mouse |
| REQ-021 | MUST   | Quotes secundarias de Denis Blanco intercaladas en cada fase del viaje molecular  | 4 quotes total visibles a lo largo del scroll          |
| REQ-022 | SHOULD | Tag o badge identificable que marque a Denis Blanco como aval clínico-nutricional | Componente reutilizable con verificación visual        |

### Brand identity (logo Aqua+ Systems)

| ID      | Estado | Descripción                                                                                               | Verificación                                              |
| ------- | ------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| REQ-024 | MUST   | Tagline oficial "Transforming Waters, Transforming Lives" visible en el Hero (en inglés en ambos locales) | Visual: presente en /en/ y /es/                           |
| REQ-025 | MUST   | Wordmark "Aqua+ Systems" renderizado con `+` en color teal del brand (componente <BrandWordmark>)         | Visual + accesibilidad (aria-label = "Aqua plus Systems") |
| REQ-026 | MUST   | Paleta del UI-SPEC v1.1 (navy + teal) aplicada en todos los tokens · cero hex hardcoded                   | Audit visual + grep -i 'oklch' en src/                    |

### Diferenciación de marca (no es piscinas)

| ID      | Estado | Descripción                                                                                          | Verificación                  |
| ------- | ------ | ---------------------------------------------------------------------------------------------------- | ----------------------------- |
| REQ-030 | MUST   | Meta tags + Schema.org Product/Service que afirmen "drinking water purification, NOT pool service"   | Inspector OG/JSON-LD validado |
| REQ-031 | MUST   | Imaginería 100% libre de piscinas / cloración piscinas / pool service                                | Revisión visual completa      |
| REQ-032 | MUST   | Copy del hero menciona explícitamente "agua para beber" o "agua de consumo" en primera línea visible | Visual + accessibility tree   |

### Tabla comparativa científica

| ID      | Estado | Descripción                                                                 | Verificación                                         |
| ------- | ------ | --------------------------------------------------------------------------- | ---------------------------------------------------- |
| REQ-040 | MUST   | Tabla con 6 tipos de agua y columnas pH, ORP, TDS, efecto biológico         | Tabla HTML semántica `<table>` con `<thead>/<tbody>` |
| REQ-041 | MUST   | Fila "Ionizada Aqua Plus" destacada visualmente con acento del UI-SPEC      | Visual + axe-core sin issues                         |
| REQ-042 | SHOULD | Stagger reveal animado de filas al entrar viewport (respeta reduced-motion) | Test manual                                          |

### Calculadora de impacto

| ID      | Estado | Descripción                                                                                     | Verificación                             |
| ------- | ------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------- |
| REQ-050 | MUST   | Input: número de habitantes (1-12) + gasto mensual actual en agua embotellada (USD)             | Form funciona con validación Zod         |
| REQ-051 | MUST   | Output: USD ahorrados al año + USD recuperados a 12 meses + botellas plásticas evitadas/año     | Cálculos correctos vs spec interna       |
| REQ-052 | MUST   | Output: huella de carbono evitada en kgCO₂eq/año (basado en 82.8g CO₂/L embotellada — ref: PMC) | Cálculo trazable + microcopy explicativo |
| REQ-053 | MUST   | NumberTicker animado en outputs (snap si reduced-motion)                                        | Animación visible + fallback estático    |

### Lead form (análisis gratuito de agua a domicilio)

| ID      | Estado | Descripción                                                                           | Verificación                                                    |
| ------- | ------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| REQ-060 | MUST   | Form con campos: nombre, email, teléfono, dirección, ZIP                              | Visual + a11y (labels, error states)                            |
| REQ-061 | MUST   | Validación de ZIP de todo el estado de Florida (FL · rango 32003–34997 + excepciones) | Zod schema + lista de prefijos FL válidos; error inline         |
| REQ-062 | MUST   | Validación email + teléfono formato US                                                | Zod refinements                                                 |
| REQ-063 | MUST   | Submit via Server Action con rate limiting (max 5 envíos/IP/hora)                     | Test E2E + Redis-like store o KV                                |
| REQ-064 | MUST   | Service layer mockeable para envío a CRM (GHL en V1.5)                                | Interface `LeadService` con implementación mock + interfaz real |
| REQ-065 | SHOULD | Confirmación visual post-submit con animación (no reload)                             | Test manual + screenshot                                        |
| REQ-066 | SHOULD | Email transaccional de confirmación al lead (vía Resend o similar)                    | Email recibido en cuenta test                                   |
| REQ-067 | COULD  | Captcha invisible (hCaptcha o Cloudflare Turnstile) para spam                         | Test con header                                                 |

### UI / UX general

| ID      | Estado | Descripción                                                                                           | Verificación                                                      |
| ------- | ------ | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| REQ-080 | MUST   | Sitio responde correctamente desde 360px hasta 1920px                                                 | Test manual 4 breakpoints                                         |
| REQ-081 | MUST   | Lighthouse Performance ≥ 90 mobile en home                                                            | Lighthouse CI                                                     |
| REQ-082 | MUST   | Lighthouse A11y ≥ 95 en todas las páginas públicas                                                    | axe-core + Lighthouse                                             |
| REQ-083 | MUST   | i18n bilingual V1: en (default) + es. Toggle visible en Nav, sin reload errores. Routing `/[locale]/` | Toggle EN/ES navega entre /en/ y /es/ sin perder estado de scroll |
| REQ-084 | MUST   | 60 FPS sostenidos en mobile mid-range (Pixel 6a o equivalente) durante todo el scrollytelling         | DevTools performance recording                                    |
| REQ-085 | SHOULD | Custom cursor en desktop (opt-in vía toggle accesible)                                                | Test manual                                                       |
| REQ-086 | SHOULD | Modo dark único (no toggle light/dark; dark dominante es la dirección del estilo)                     | Visual                                                            |

### Contenido / SEO

| ID      | Estado | Descripción                                                               | Verificación                    |
| ------- | ------ | ------------------------------------------------------------------------- | ------------------------------- |
| REQ-090 | MUST   | Sitemap.xml generado dinámicamente                                        | Verificar /sitemap.xml          |
| REQ-091 | MUST   | OpenGraph + Twitter Card + JSON-LD (Organization, LocalBusiness, Product) | Inspector OG + Schema validator |
| REQ-092 | MUST   | hreflang correcto entre es y en una vez exista en                         | Inspector HTML head             |
| REQ-093 | SHOULD | robots.txt explícito                                                      | Verificar /robots.txt           |

### Operación / observabilidad

| ID      | Estado | Descripción                                                                              | Verificación                           |
| ------- | ------ | ---------------------------------------------------------------------------------------- | -------------------------------------- |
| REQ-100 | MUST   | Errores 5xx capturados en Sentry con contexto                                            | Forzar error → ver en Sentry dashboard |
| REQ-101 | MUST   | Eventos clave tracked en PostHog (scroll_phase_entered, calculator_used, lead_submitted) | Disparar event → ver en PostHog        |
| REQ-102 | SHOULD | Health endpoint `/api/health` que valida deps externas                                   | curl con 200 OK + body correcto        |

### Compliance + privacidad

| ID      | Estado | Descripción                                                                                 | Verificación                         |
| ------- | ------ | ------------------------------------------------------------------------------------------- | ------------------------------------ |
| REQ-110 | MUST   | Banner de cookies con opt-in para analytics si PostHog tiene tracking de usuario            | Verificar comportamiento sin consent |
| REQ-111 | MUST   | Política de privacidad y términos de servicio (placeholder MVP, contenido real con cliente) | URLs accesibles                      |
| REQ-112 | SHOULD | DPA / data retention documentado para datos del lead form                                   | Doc adjunto                          |

---

## Backlog explícito (V1.5 / V2)

- REQ-150 (V1.5): Integración real con GoHighLevel (webhook + tags + workflow `analysis_scheduled`).
- ~~REQ-151 (V1.5): Internacionalización en inglés.~~ (Movido a V1 como REQ-083 por decisión D-16, brand identity)
- REQ-152 (V2): Blog / sección de contenido educativo en colaboración con Denis Blanco.
- REQ-153 (V2): Catálogo de modelos de equipo con specs detalladas.
- REQ-154 (V2): Customer area / portal post-venta.
- REQ-155 (V2): Live chat / WhatsApp Business integration.

---

_La autoridad de scope vive aquí. Si algo no está documentado en este archivo, NO está en el contrato._
