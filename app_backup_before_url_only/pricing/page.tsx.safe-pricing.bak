"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "$0",
    period: "/ month",
    bestFor: "Exploring the platform",
    href: "/sign-up",
    highlighted: false,
    features: [
      "Basic AI access",
      "Core environments",
      "Robot guidance",
      "Community usage",
    ],
  },
  {
    key: "pro",
    name: "Pro",
    price: "$25",
    period: "/ month",
    bestFor: "Individuals",
    href: "/sign-up",
    highlighted: true,
    features: [
      "Higher AI limits",
      "Full Shynvo Robot access",
      "Frontier Lab access",
      "Advanced environment usage",
      "Priority experience",
    ],
  },
  {
    key: "team",
    name: "Team",
    price: "$50",
    period: "/ month",
    bestFor: "Teams and organizations",
    href: "/sign-up",
    highlighted: false,
    features: [
      "Shared team access",
      "Enterprise environment access",
      "Collaboration tools",
      "Team analytics",
      "Priority support",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    bestFor: "Large organizations",
    href: "/sign-up",
    highlighted: false,
    features: [
      "Unlimited AI usage",
      "Full environment access",
      "Custom integrations",
      "Dedicated support",
      "Enterprise security",
    ],
  },
];

export default function PricingPage() {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 sm:py-16">

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            {t("nav.pricing")}
          </div>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Simple pricing
          </h1>

          <p className="mt-4 text-sm text-white/70 sm:text-base">
            Start free, upgrade when you need deeper access across Shynvo environments.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {plans.map((plan) => (
            <div
              key={plan.key}
              className={[
                "relative rounded-3xl border p-6 backdrop-blur-sm transition",
                plan.highlighted
                  ? "border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_0_1px_rgba(56,189,248,0.15)]"
                  : "border-white/10 bg-white/5",
              ].join(" ")}
            >
              {plan.highlighted && (
                <div className="absolute right-5 top-5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                  Most popular
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold text-white">
                  {plan.name}
                </h2>

                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-white/60">
                    {plan.period}
                  </span>
                </div>

                <p className="mt-2 text-xs text-white/50">
                  Best for {plan.bestFor}
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
                "Get started"
              </Link>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
