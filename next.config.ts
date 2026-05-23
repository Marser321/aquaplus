import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "@react-three/drei"],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Nota: los shaders GLSL están inlined como TS template strings en
  // `src/components/3d/shaders/waterShaders.ts`, así que no hace falta loader
  // custom de webpack/turbopack para `?raw` GLSL imports. Si en el futuro se
  // separan a `.glsl` files, configurar el loader equivalente en Turbopack
  // vía `config.turbopack.rules` aquí.

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
