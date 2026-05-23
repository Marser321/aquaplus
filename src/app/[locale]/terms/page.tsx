import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
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
          {isEs ? "Términos de servicio" : "Terms of Service"}
        </h1>
        <div className="space-y-6 text-pretty text-[color:var(--color-fg-secondary)]">
          <p>
            {isEs
              ? "La web ofrece información comercial y educativa sobre sistemas residenciales de purificación, remineralización e ionización de agua de consumo."
              : "This website provides commercial and educational information about residential drinking-water purification, remineralization and ionization systems."}
          </p>
          <p>
            {isEs
              ? "El análisis gratuito a domicilio está sujeto a disponibilidad, zona de servicio en Florida y confirmación del equipo comercial. Enviar el formulario no implica obligación de compra."
              : "The free at-home analysis is subject to availability, Florida service area and confirmation by the commercial team. Submitting the form does not create a purchase obligation."}
          </p>
          <p>
            {isEs
              ? "El contenido sobre pH, ORP, PFAS o hidrógeno molecular no reemplaza asesoramiento médico, nutricional, legal o regulatorio. Las métricas reales dependen del agua de entrada, instalación y mantenimiento."
              : "Content about pH, ORP, PFAS or molecular hydrogen does not replace medical, nutritional, legal or regulatory advice. Actual metrics depend on inlet water, installation and maintenance."}
          </p>
          <p>
            {isEs
              ? "Aqua+ Systems no presta servicios de piscinas, cloración recreativa ni climatización."
              : "Aqua+ Systems does not provide pool services, recreational chlorination or climate control."}
          </p>
        </div>
      </article>
    </main>
  );
}
