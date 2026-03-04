import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  sub: string;
  desc: string;
  features: string[];
  cta: { label: string; href: string };
  badge?: string;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free Trial",
    price: "NOK 0",
    sub: "7 days",
    desc: "Explore Shynvo with essential access.",
    features: [
      "University Hub access",
      "Experiments (Beta) access",
      "Limited AI generations",
      "Basic Study Lab sessions",
      "Community support",
    ],
    cta: { label: "Start free trial", href: "/university" },
  },
  {
    name: "Pro",
    price: "NOK 299",
    sub: "per month",
    desc: "For students and professionals who want full power.",
    features: [
      "Higher AI limits",
      "Full University Hub tools",
      "Shynvo OS access",
      "Advanced Study Lab + Exam flows",
      "Interview simulator + career prep",
      "Priority AI responses",
    ],
    cta: { label: "Upgrade to Pro", href: "mailto:hi@shynvo.app?subject=Shynvo%20Pro%20Upgrade" },
    badge: "Recommended",
    highlight: true,
  },
  {
    name: "Team",
    price: "NOK 999",
    sub: "per month",
    desc: "For organizations building skills at scale.",
    features: [
      "Everything in Pro",
      "Team seats",
      "Admin tools + org controls",
      "Skill matrix + upskill plans",
      "Shared missions + reporting",
      "Organization analytics",
    ],
    cta: { label: "Contact sales", href: "mailto:hi@shynvo.app?subject=Shynvo%20Team%20Plan" },
  },
];

function CheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80">
      ✓
    </span>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#05070A] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <header className="space-y-4 text-center">
          <div className="text-xs tracking-[0.22em] text-white/50">PRICING</div>
          <h1 className="text-4xl md:text-5xl font-semibold">Simple plans. Upgrade anytime.</h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Start with a <span className="text-white">7-day free trial</span>. After the trial ends, upgrading is required to continue using Shynvo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/55">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">7-day trial</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Cancel anytime</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">International-ready</span>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={[
                "relative rounded-3xl border bg-white/5 p-6 space-y-6",
                p.highlight ? "border-white/20 bg-white/7 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" : "border-white/10",
              ].join(" ")}
            >
              {p.badge ? (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white">
                    {p.badge}
                  </span>
                </div>
              ) : null}

              <div className="space-y-2">
                <div className="text-xl font-semibold">{p.name}</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-semibold">{p.price}</div>
                  <div className="text-sm text-white/60">{p.sub}</div>
                </div>
                <div className="text-sm text-white/70">{p.desc}</div>
              </div>

              <ul className="space-y-3 text-sm text-white/70">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <CheckIcon />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {p.cta.href.startsWith("mailto:") ? (
                <a
                  href={p.cta.href}
                  className={[
                    "block w-full rounded-2xl border px-4 py-3 text-center text-sm font-medium transition",
                    p.highlight
                      ? "border-white/20 bg-white/15 hover:bg-white/20"
                      : "border-white/10 bg-white/10 hover:bg-white/15",
                  ].join(" ")}
                >
                  {p.cta.label}
                </a>
              ) : (
                <Link
                  href={p.cta.href}
                  className={[
                    "block w-full rounded-2xl border px-4 py-3 text-center text-sm font-medium transition",
                    p.highlight
                      ? "border-white/20 bg-white/15 hover:bg-white/20"
                      : "border-white/10 bg-white/10 hover:bg-white/15",
                  ].join(" ")}
                >
                  {p.cta.label}
                </Link>
              )}

              <div className="text-xs text-white/45">
                {p.name === "Free Trial"
                  ? "Trial is limited to 7 days. Upgrade required to continue."
                  : p.name === "Pro"
                  ? "Best for individuals who want full building access."
                  : "Best for teams and organizations."}
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <div className="text-lg font-semibold">Need an Enterprise plan later?</div>
              <div className="text-sm text-white/70">
                When Shynvo Enterprise Suite is ready, we’ll add custom pricing for universities, governments, and large companies.
              </div>
            </div>
            <a
              href="mailto:hi@shynvo.app?subject=Shynvo%20Enterprise%20Inquiry"
              className="inline-flex rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm hover:bg-white/15 transition"
            >
              Contact hi@shynvo.app
            </a>
          </div>
        </section>

        <div className="text-center">
          <Link href="/" className="text-sm text-white/70 hover:text-white transition underline">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
