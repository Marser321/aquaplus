import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LenisProvider } from "@/lib/lenis/provider";
import { Nav } from "@/components/sections/Nav";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0f1e3d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isEn
        ? "Aqua+ Systems · Transforming Waters, Transforming Lives"
        : "Aqua+ Systems · Purificación y mineralización avanzada del agua de consumo en Florida",
      template: "%s · Aqua+ Systems",
    },
    description: isEn
      ? "Advanced residential drinking-water purification, remineralization, and electrolytic ionization. Florida-based triple-stage system with clinical-nutrition endorsement. Free home water analysis."
      : "Sistema residencial avanzado de purificación, remineralización e ionización del agua de consumo doméstico en Florida. Triple etapa con aval clínico nutricional. Análisis químico gratuito a domicilio.",
    applicationName: "Aqua+ Systems",
    authors: [{ name: "Aqua Plus Systems LLC", url: SITE_URL }],
    generator: "Next.js",
    keywords: isEn
      ? [
          "ionized water",
          "alkaline water",
          "drinking water purification",
          "residential reverse osmosis",
          "PFAS Florida",
          "molecular hydrogen water",
          "cellular hydration",
          "Aqua Plus Systems",
        ]
      : [
          "agua ionizada",
          "agua alcalina",
          "purificación de agua para beber",
          "ósmosis inversa residencial",
          "PFAS Florida",
          "agua hidrogenada",
          "hidratación celular",
          "Aqua Plus Systems",
        ],
    category: "Health & Wellness",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "es_US",
      alternateLocale: isEn ? ["es_US"] : ["en_US"],
      url: `${SITE_URL}/${locale}`,
      siteName: "Aqua+ Systems",
      title: isEn
        ? "Aqua+ Systems · Drinking water optimized for purity and mineral balance"
        : "Aqua+ Systems · El agua de consumo, optimizada en pureza y equilibrio mineral",
      description: isEn
        ? "Three-stage residential system for the water you drink: reverse osmosis + remineralization + electrolytic ionization with dissolved hydrogen. Free analysis in Florida."
        : "Sistema residencial de tres etapas para el agua que tomás en casa. Ósmosis + remineralización + ionización con hidrógeno disuelto. Análisis gratuito en Florida.",
      images: [
        {
          url: "/og-default.svg",
          width: 1200,
          height: 630,
          alt: "Aqua+ Systems · Residential drinking water purification system",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Aqua+ Systems · Transforming Waters, Transforming Lives",
      description: isEn
        ? "Triple-stage residential drinking water purification. Free chemical analysis in Florida."
        : "Triple etapa de purificación residencial de agua para beber. Análisis químico gratuito en Florida.",
      images: ["/og-default.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: "/apple-icon.svg",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Aqua Plus Systems",
      alternateName: "Aqua+ Systems",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      slogan: "Transforming Waters, Transforming Lives",
      sameAs: [],
      description:
        "Residential drinking-water purification and remineralization company in Florida. NOT a pool service or chlorination provider.",
      areaServed: {
        "@type": "State",
        name: "Florida",
        containedInPlace: { "@type": "Country", name: "United States" },
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Aqua Plus Systems",
      alternateName: "Aqua+ Systems",
      image: `${SITE_URL}/og-default.svg`,
      url: SITE_URL,
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressRegion: "FL",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "State",
        name: "Florida",
      },
      knowsAbout: [
        "Drinking water purification",
        "Reverse osmosis residential systems",
        "Water remineralization",
        "Electrolytic water ionization",
        "Dissolved hydrogen water",
      ],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "Aqua+ Systems three-stage residential drinking-water purification, remineralization and ionization",
      description:
        "Three-stage residential system for the water you drink: high-precision reverse osmosis, remineralization with essential minerals, and electrolytic ionization with dissolved hydrogen. Does NOT include pool services, climate control, or recreational chlorination.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "State", name: "Florida" },
      serviceType: "Drinking water purification system",
      category: "Residential water treatment",
    },
  ],
};

function isSupportedLocale(value: string): value is (typeof routing.locales)[number] {
  return (routing.locales as readonly string[]).includes(value);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Habilita rendering estático para este locale (next-intl 3.20+).
  setRequestLocale(locale);

  // Cargar messages explícitamente para entregar al client provider.
  // Sin esto, `useTranslations` en client components devuelve las claves literales.
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <Nav />
            {children}
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
