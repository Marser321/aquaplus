"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { BrandWordmark } from "@/components/brand/BrandWordmark";
import { LanguageToggle } from "@/components/ui/LanguageToggle";

/**
 * Nav sticky con backdrop-filter que se intensifica al scrollear.
 * - Aria landmark <nav>.
 * - Brand wordmark accesible con el `+` glifo del logo Aqua+ Systems (D-15).
 * - LanguageToggle EN/ES (D-16).
 * - Copy bilingual via next-intl `useTranslations`.
 * - Smooth scroll vía Lenis (cuando está activo) o nativo.
 * - Focus visible obligatorio (heredado de globals.css).
 */
export function Nav() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#osmosis", label: t("process") },
    { href: "#calculator", label: t("calculator") },
    { href: "#endorsement", label: t("endorsement") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding,backdrop-filter]",
        "border-b backdrop-blur-md",
        isScrolled
          ? "border-[color:var(--color-border-subtle)] bg-[color:var(--color-bg-base)]/70 py-3"
          : "border-transparent bg-transparent py-5",
      )}
      style={{
        transitionDuration: "var(--duration-base)",
        transitionTimingFunction: "var(--ease-standard)",
      }}
    >
      <div className="container-content flex items-center justify-between gap-4">
        <a
          href="#top"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <span
            aria-hidden="true"
            className="block size-2 rounded-full"
            style={{
              backgroundColor: "var(--color-accent-primary)",
              boxShadow: "var(--shadow-glow)",
            }}
          />
          <BrandWordmark className="text-base" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  "text-[color:var(--color-fg-secondary)] hover:text-[color:var(--color-fg-primary)]",
                  "hover:bg-[color:var(--color-bg-elevated)]",
                )}
                style={{
                  transitionDuration: "var(--duration-fast)",
                  transitionTimingFunction: "var(--ease-standard)",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageToggle className="hidden md:inline-flex" />
          <a
            href="#contact"
            className="hidden rounded-full px-5 py-2.5 text-sm font-medium md:inline-flex"
            style={{
              backgroundColor: "var(--color-accent-primary)",
              color: "var(--color-fg-on-accent)",
              transitionProperty: "background-color, box-shadow",
              transitionDuration: "var(--duration-fast)",
              transitionTimingFunction: "var(--ease-standard)",
            }}
          >
            {t("contact")} →
          </a>

          {/* Mobile: solo LanguageToggle compacto; menú hamburguesa en iteración posterior */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
