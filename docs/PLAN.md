# PLAN — Aqua Plus System

> Plan de la fase activa, en XML para mejor parsing por el LLM.
> Generado por `rpiv-gate`. Cada fase tiene su propio bloque.
> Las decisiones de `CONTEXT.md` están referenciadas explícitamente.

---

```xml
<plan phase="1" name="MVP scrollytelling · Hero + Ósmosis" generated="2026-05-22" owner="Mario + Claude Code">
  <decisions_referenced>
    <ref id="D-01" reason="Stack Next.js 15 + Tailwind v4 + shadcn" />
    <ref id="D-02" reason="Motion stack: FM + GSAP + Lenis + R3F" />
    <ref id="D-03" reason="GLSL shaders custom (no geometrías densas)" />
    <ref id="D-04" reason="Una escena WebGL reutilizable + cleanup obligatorio" />
    <ref id="D-05" reason="prefers-reduced-motion first-class" />
    <ref id="D-06" reason="Diferenciación de marca vs pool service" />
    <ref id="D-07" reason="Vercel + Sentry + PostHog" />
    <ref id="D-08" reason="Security headers + CSP" />
    <ref id="D-10" reason="Modo dark único + paleta del UI-SPEC" />
    <ref id="D-11" reason="i18n scaffold día 1, V1 solo /es" />
  </decisions_referenced>

  <prerequisites>
    <item>CURATED-BRIEF.md aprobado por el usuario.</item>
    <item>UI-SPEC.md aprobado (tokens cinemáticos + reglas de motion).</item>
    <item>Confirmación de no-scope: no Catálogo de equipos, no e-commerce, no GHL real (mock).</item>
    <item>OK del usuario para arrancar scaffolding Next.js.</item>
  </prerequisites>

  <objectives>
    <item>Fundación técnica completa del proyecto (scaffold Next.js + tooling + tokens).</item>
    <item>Hero WebGL funcional con shader líquido y reactividad al cursor (REQ-001).</item>
    <item>Sticky scrollytelling activo con GSAP + Lenis (REQ-002, REQ-003).</item>
    <item>Primera fase del viaje molecular (Ósmosis) implementada (REQ-004).</item>
    <item>Quote de Denis Blanco con spotlight (REQ-020).</item>
    <item>Diferenciación de marca anti-piscina (REQ-030, REQ-031, REQ-032).</item>
    <item>Reduced-motion fallback funcional (REQ-008).</item>
    <item>Cleanup WebGL verificado (REQ-009).</item>
    <item>Lighthouse mobile ≥ 90/95 (REQ-081, REQ-082).</item>
    <item>Deploy preview en Vercel con URL compartible con el cliente.</item>
  </objectives>

  <tasks>
    <task id="T-1" status="pending">
      <title>S-1.1 · Scaffold Next.js 15 + dependencias + tooling</title>
      <files>
        <file>package.json</file>
        <file>tsconfig.json</file>
        <file>next.config.ts</file>
        <file>.eslintrc.cjs</file>
        <file>.prettierrc</file>
        <file>.gitignore</file>
        <file>.env.example</file>
        <file>app/layout.tsx</file>
        <file>app/page.tsx (placeholder)</file>
      </files>
      <dependencies>
        <dep>next@^15</dep>
        <dep>react@^19, react-dom@^19</dep>
        <dep>typescript@^5</dep>
        <dep>tailwindcss@^4</dep>
        <dep>@tailwindcss/postcss</dep>
        <dep>shadcn/ui CLI</dep>
        <dep>three, @react-three/fiber, @react-three/drei</dep>
        <dep>gsap, @gsap/react</dep>
        <dep>@studio-freight/lenis (o fork mantenido)</dep>
        <dep>motion (Framer Motion v11+)</dep>
        <dep>zod, react-hook-form, @hookform/resolvers</dep>
        <dep>sonner</dep>
        <dep>next-intl o paraglide-next (i18n)</dep>
        <dep>@sentry/nextjs, posthog-js</dep>
        <dep>vite-plugin-glsl o glslify-loader (para Next webpack)</dep>
      </dependencies>
      <expected_lines>~80 entre configs (sin contar node_modules)</expected_lines>
      <verification>
        <check>pnpm dev arranca sin errores en :3000.</check>
        <check>pnpm typecheck strict pasa con cero warnings.</check>
        <check>pnpm lint limpio.</check>
        <check>pnpm build exitoso.</check>
        <check>Health endpoint /api/health responde 200 (placeholder).</check>
      </verification>
    </task>

    <task id="T-2" status="pending">
      <title>S-1.2 · UI-SPEC tokens en Tailwind v4 + globals.css + fuentes</title>
      <files>
        <file>app/globals.css (con @theme completo del UI-SPEC)</file>
        <file>app/fonts.ts (next/font/google Geist Sans + Mono; placeholder display)</file>
        <file>tailwind.config.* (si aplica en v4)</file>
      </files>
      <expected_lines>~150</expected_lines>
      <verification>
        <check>Visual smoke test: H1 con --font-display y --text-7xl visible en /test page.</check>
        <check>Paleta CSS variables disponible en Inspector.</check>
        <check>Cero hex hardcoded en CSS o componentes.</check>
        <check>Lighthouse no reporta CLS por fonts (font-display: swap, preload activo).</check>
      </verification>
    </task>

    <task id="T-3" status="pending">
      <title>S-1.3 · Root Layout + Nav sticky + Lenis Provider global</title>
      <files>
        <file>app/layout.tsx (con SEO base, OG, Schema.org Organization + LocalBusiness)</file>
        <file>components/sections/Nav.tsx</file>
        <file>lib/lenis/provider.tsx (client component con context o useEffect)</file>
        <file>lib/gsap/registerPlugins.ts</file>
      </files>
      <expected_lines>~180</expected_lines>
      <verification>
        <check>Nav sticky con backdrop-filter visible al scrollear.</check>
        <check>Smooth scroll Lenis activo Chrome/Safari/Firefox/Edge.</check>
        <check>Anchor links (#osmosis, #ionization, etc.) navegan con suavizado.</check>
        <check>Reduced-motion desactiva Lenis (fallback a scroll nativo).</check>
        <check>JSON-LD validado en Schema.org validator: drinking water purification, NOT pool.</check>
      </verification>
    </task>

    <task id="T-4" status="pending">
      <title>S-1.4 · WaterCanvas + waterEngine + shaders líquidos</title>
      <files>
        <file>components/3d/WaterCanvas.tsx</file>
        <file>components/3d/waterEngine.ts</file>
        <file>components/3d/shaders/waterVertex.glsl</file>
        <file>components/3d/shaders/waterFragment.glsl</file>
        <file>components/3d/hooks/useReducedMotionFallback.ts</file>
      </files>
      <reference>Contexto.txt sección "Componente Principal de React/Next.js"</reference>
      <expected_lines>~200 (split entre TS y GLSL)</expected_lines>
      <verification>
        <check>Canvas WebGL renderiza fondo líquido con distorsión orgánica.</check>
        <check>Plane geometry 128×128 con uniforms uTime + uScrollProgress + uResolution.</check>
        <check>Mouse position reflejada en distorsión (uMouse uniform).</check>
        <check>FPS ≥ 60 en DevTools Performance recording (desktop M1+).</check>
        <check>Cleanup verificado: snapshot heap post-unmount no muestra contexto WebGL retenido.</check>
        <check>Reduced-motion → no se monta el canvas; se muestra poster JPEG con headline.</check>
      </verification>
    </task>

    <task id="T-5" status="pending">
      <title>S-1.5 · GSAP ScrollTrigger + sticky pinning del Hero canvas</title>
      <files>
        <file>components/sections/Hero.tsx</file>
        <file>components/3d/hooks/useScrollTimeline.ts</file>
      </files>
      <expected_lines>~160</expected_lines>
      <verification>
        <check>Hero ocupa 200vh; canvas pinned durante el scroll.</check>
        <check>uScrollProgress va de 0 a 1 conforme avanza el scroll en la sección.</check>
        <check>Headline reveal letra-por-letra con FM al cargar.</check>
        <check>CTA primario "Agendar análisis gratuito" visible en hero con shimmer.</check>
        <check>Subtítulo menciona "agua para beber" / "agua de consumo" (REQ-032).</check>
        <check>Reduced-motion → hero estático sin pin, headline visible directo.</check>
        <check>Smooth integration: Lenis + ScrollTrigger.update sin tirones.</check>
      </verification>
    </task>

    <task id="T-6" status="pending">
      <title>S-1.6 · Fase Ósmosis · sticky scrollytelling + partículas contaminantes</title>
      <files>
        <file>components/sections/StageOsmosis.tsx</file>
        <file>components/3d/scenes/OsmosisScene.tsx (subescena dentro del canvas global)</file>
        <file>components/3d/shaders/membraneFragment.glsl</file>
      </files>
      <expected_lines>~200</expected_lines>
      <verification>
        <check>Sidebar sticky izquierda con 3 hitos (PFAS bloqueados, metales bloqueados, agua nanométrica saliendo).</check>
        <check>Canvas muestra ~3000 partículas (InstancedMesh) chocando contra membrana 3D y siendo descartadas.</check>
        <check>Cámara viaja del exterior al interior del filtro vía GSAP timeline.</check>
        <check>Quote inline de Denis Blanco al cerrar la fase: "Miami-Dade tiene niveles críticos de metales y químicos…"</check>
        <check>FPS ≥ 60 mobile mid-range (Pixel 6a target).</check>
        <check>Reduced-motion → cada hito visible como sección normal sin pin, diagrama SVG estático del filtro.</check>
      </verification>
    </task>

    <task id="T-7" status="pending">
      <title>S-1.7 · DenisBlancoQuote · spotlight Aceternity post-hero</title>
      <files>
        <file>components/sections/DenisBlancoQuote.tsx</file>
        <file>components/ui/spotlight.tsx (copiado de Aceternity adaptado)</file>
        <file>public/assets/denis-blanco-portrait.avif (placeholder)</file>
      </files>
      <expected_lines>~120</expected_lines>
      <verification>
        <check>Block editorial con foto de Denis Blanco + quote en --text-3xl/4xl.</check>
        <check>Spotlight sigue al cursor sobre la sección.</check>
        <check>Badge identifica a Denis Blanco como "Nutricionista · aval clínico" (REQ-022).</check>
        <check>Reduced-motion → spotlight estático centrado.</check>
        <check>Foto con alt descriptivo accesible.</check>
      </verification>
    </task>

    <task id="T-8" status="pending">
      <title>S-1.8 · Reduced-motion completo + cleanup WebGL + a11y audit</title>
      <files>
        <file>components/3d/WaterCanvas.tsx (refactor con cleanup definitivo)</file>
        <file>app/(marketing)/page.tsx (integra fallbacks)</file>
        <file>app/layout.tsx (metadata + JSON-LD final)</file>
      </files>
      <expected_lines>~80 de cambios</expected_lines>
      <verification>
        <check>Lighthouse A11y ≥ 95 mobile + desktop.</check>
        <check>axe-core 0 critical/serious en /es/.</check>
        <check>DevTools Memory: heap snapshot al navegar entre pages no retiene WebGL.</check>
        <check>Reduced-motion check completo: hero + ósmosis + quote.</check>
        <check>Focus management: nav y CTAs con ring visible.</check>
      </verification>
    </task>

    <task id="T-9" status="pending">
      <title>S-1.9 · SEO + meta + JSON-LD + diferenciación de marca</title>
      <files>
        <file>app/sitemap.ts</file>
        <file>app/robots.ts</file>
        <file>app/layout.tsx (metadata final con Schema.org)</file>
        <file>messages/es.json (copy con énfasis anti-piscina)</file>
      </files>
      <expected_lines>~100</expected_lines>
      <verification>
        <check>/sitemap.xml accesible con URLs es-US.</check>
        <check>/robots.txt explícito.</check>
        <check>OG image con dimensions correctas (1200x630).</check>
        <check>JSON-LD Product/LocalBusiness/Organization validado por Schema.org validator.</check>
        <check>Meta description menciona "agua para beber / consumo" (no piscinas).</check>
        <check>Imaginería 100% libre de piscinas (revisión visual completa).</check>
      </verification>
    </task>

    <task id="T-10" status="pending">
      <title>S-1.10 · Performance pass · Lighthouse CI + bundle audit + deploy</title>
      <files>
        <file>.github/workflows/lighthouse.yml</file>
        <file>next.config.ts (config optimizaciones: images, fonts, modularizeImports)</file>
        <file>app/(marketing)/page.tsx (lazy-load de canvas WebGL post-LCP)</file>
      </files>
      <expected_lines>~80</expected_lines>
      <verification>
        <check>Lighthouse mobile: Performance ≥ 90, A11y ≥ 95, SEO ≥ 95, Best Practices ≥ 95.</check>
        <check>Bundle JS inicial ≤ 220kb gzip (analizar con `next build` output).</check>
        <check>LCP mobile ≤ 1.8s (poster del hero como LCP target).</check>
        <check>CLS ≤ 0.05.</check>
        <check>Preview deploy en Vercel accesible vía URL.</check>
        <check>URL del preview compartida con el usuario para validación.</check>
      </verification>
    </task>
  </tasks>

  <out_of_scope>
    <item>Fases Conversión + Ionización + CTA 3D → Fase 2-3 del ROADMAP.</item>
    <item>Calculadora + Lead form → Fase 3.</item>
    <item>Tabla comparativa → Fase 2.</item>
    <item>Internacionalización inglés → Fase 4.</item>
    <item>Integración real con GHL → V1.5.</item>
  </out_of_scope>

  <risks>
    <risk severity="high">
      Performance WebGL en mobile mid-range puede tirar debajo de 60 FPS si los shaders son pesados.
      Mitigación: budget de partículas duro (max 3000), fragment shader < 4kb, lazy-load post-LCP, fallback reduced-motion siempre disponible.
    </risk>
    <risk severity="medium">
      Confusión SEO con pool service genérico de Florida.
      Mitigación: JSON-LD muy explícito + meta description "drinking water purification" + imágenes únicamente del producto/proceso, nunca piscinas.
    </risk>
    <risk severity="medium">
      Cleanup WebGL incorrecto puede generar leaks acumulativos al navegar entre páginas.
      Mitigación: hook con cleanup obligatorio probado en DevTools Memory snapshot, verificación manual en cada slice con WebGL.
    </risk>
    <risk severity="low">
      Fuentes display variables pueden agregar 100-200kb al bundle si no se subsetean.
      Mitigación: `next/font` con subset (Latin + Latin Extended), `font-display: swap`, preload de display.
    </risk>
    <risk severity="medium">
      El cliente no entregó assets reales todavía (logo, fotos Denis Blanco, brand exact).
      Mitigación: placeholders premium en V1; cuando lleguen, swap es 1:1 sin tocar layout.
    </risk>
  </risks>

  <exit_gate>
    <criterion>Todas las tareas T-1 a T-10 con status="done".</criterion>
    <criterion>Lighthouse + a11y + perf budgets cumplidos en el preview deploy.</criterion>
    <criterion>Cliente validó el preview (mínimo OK por chat/email).</criterion>
    <criterion>STATE.md sintetizado con artefactos (screenshots, lighthouse reports).</criterion>
    <criterion>CONTEXT.md sin decisiones pendientes que bloqueen Fase 2.</criterion>
  </exit_gate>
</plan>
```

---

## Plan archivado de fases anteriores

<!-- Vacío. Al cerrar Fase 1, mover este bloque acá con status="completed" y resumen de outcome. -->

---

_La fase activa siempre vive en el primer bloque. Si abrís una fase nueva sin cerrar la anterior, frená y revisá la disciplina._
