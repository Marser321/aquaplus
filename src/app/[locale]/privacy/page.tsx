import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEs = locale === "es";

  return (
    <main className="container-content py-32 md:py-40">
      <article className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs tracking-[var(--tracking-wide)] text-[color:var(--color-accent-primary)] uppercase">
          Aqua+ Systems
        </p>
        <h1 className="mb-8 text-5xl text-balance">
          {isEs ? "Política de privacidad" : "Privacy Policy"}
        </h1>
        <div className="space-y-6 text-pretty text-[color:var(--color-fg-secondary)]">
          <p>
            {isEs
              ? "Esta versión MVP explica cómo Aqua+ Systems trata los datos enviados para coordinar un análisis gratuito de agua a domicilio."
              : "This MVP version explains how Aqua+ Systems handles data submitted to coordinate a free at-home water analysis."}
          </p>
          <p>
            {isEs
              ? "Podemos recopilar nombre, email, teléfono, dirección, ZIP, idioma, fuente de campaña y texto de consentimiento. Usamos esos datos solo para responder la solicitud, coordinar la visita y mejorar el proceso comercial."
              : "We may collect name, email, phone, address, ZIP code, language, campaign source and consent text. We use that data only to respond to the request, coordinate the visit and improve the commercial process."}
          </p>
          <p>
            {isEs
              ? "No vendemos datos personales. Las integraciones futuras con CRM o analítica deberán respetar consentimiento, seguridad y retención proporcional."
              : "We do not sell personal data. Future CRM or analytics integrations must respect consent, security and proportional retention."}
          </p>
          <p>
            {isEs
              ? "Para solicitar acceso, corrección o eliminación, escribí a hello@aquaplussystems.com."
              : "To request access, correction or deletion, write to hello@aquaplussystems.com."}
          </p>
        </div>
      </article>
    </main>
  );
}
