"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const plans = [
  {
    key: "free",
    price: "$0",
    period: "/ month",
    subtitleKey: "pricing.free.subtitle",
    ctaKey: "pricing.free.cta",
    href: "/sign-up",
    highlighted: false,
    features: [
      "Basic AI access",
      "Access to core environments",
      "Robot guidance",
      "Community-level usage",
    ],
  },
  {
    key: "pro",
    price: "$25",
    period: "/ month",
    subtitleKey: "pricing.pro.subtitle",
    ctaKey: "pricing.pro.cta",
    href: "/sign-up",
    highlighted: true,
    features: [
      "Higher AI limits",
      "Full Shynvo Robot support",
      "Frontier Lab access",
      "Advanced environment usage",
      "Priority experience",
    ],
  },
  {
    key: "team",
    price: "$50",
    period: "/ month",
    subtitleKey: "pricing.team.subtitle",
    ctaKey: "pricing.team.cta",
    href: "/contact",
    highlighted: false,
    features: [
      "Shared team access",
      "Enterprise environment access",
      "Team coordination support",
      "Analytics and collaboration",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(56,189,248,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_82%_18%,rgba(16,185,129,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_100%,rgba(168,85,247,0.08),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            {t("nav.pricing")}
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {t("pricing.title")}
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={[
                "relative rounded-3xl border p-6 backdrop-blur-sm",
                plan.highlighted
                  ? "border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
                  : "border-white/10 bg-white/5",
              ].join(" ")}
            >
              {plan.highlighted ? (
                <div className="mb-5 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  {t("pricing.mostPopular")}
                </div>
              ) : (
                <div className="mb-5 h-[30px]" />
              )}

              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {t(`pricing.${plan.key}`)}
                </h2>

                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="pb-1 text-sm text-white/60">{plan.period}</span>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/65">
                  {t(plan.subtitleKey)}
                </p>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-white/80">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={[
                  "mt-8 inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition",
                  plan.highlighted
                    ? "bg-white text-[#0B0F14] hover:bg-white/90"
                    : "border border-white/10 bg-white/5 text-white hover:bg-white/10",
                ].join(" ")}
              >
                {t(plan.ctaKey)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
