"use client";

import dynamic from "next/dynamic";

const ComparisonTable = dynamic(
  () => import("@/components/sections/ComparisonTable").then((mod) => mod.ComparisonTable),
  { ssr: false, loading: () => <DeferredBand /> },
);
const Calculator = dynamic(
  () => import("@/components/sections/Calculator").then((mod) => mod.Calculator),
  { ssr: false, loading: () => <DeferredBand /> },
);
const LeadForm = dynamic(
  () => import("@/components/sections/LeadForm").then((mod) => mod.LeadForm),
  { ssr: false, loading: () => <DeferredBand /> },
);
const CTASection = dynamic(
  () => import("@/components/sections/CTASection").then((mod) => mod.CTASection),
  { ssr: false, loading: () => <DeferredBand /> },
);

export function DeferredSections() {
  return (
    <>
      <ComparisonTable />
      <Calculator />
      <LeadForm />
      <CTASection />
    </>
  );
}

function DeferredBand() {
  return (
    <section
      aria-hidden="true"
      className="h-24 border-t"
      style={{
        borderColor: "var(--color-border-subtle)",
        backgroundColor: "var(--color-bg-base)",
      }}
    />
  );
}
