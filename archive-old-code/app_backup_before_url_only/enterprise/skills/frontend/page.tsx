import Link from "next/link";

const AREAS = [
  {
    title: "UI Systems",
    body: "Strong component structure, reusable interfaces, and consistent design logic.",
    href: "/enterprise/teams/engineering",
  },
  {
    title: "Responsive Delivery",
    body: "Good implementation quality across desktop and mobile workflows.",
    href: "/enterprise/analytics/output",
  },
  {
    title: "Next Step",
    body: "Expand performance optimization and design-system governance.",
    href: "/enterprise/strategy",
  },
];

export default function EnterpriseFrontendSkillPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/skills" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Skill Matrix
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Capability
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Frontend Capability
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
        Strong UI delivery, component systems, and responsive product implementation.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {AREAS.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/7"
          >
            <div className="text-xl font-semibold text-white">{item.title}</div>
            <div className="mt-3 text-sm text-white/75">{item.body}</div>
            <div className="mt-5 text-sm font-semibold text-white/90">Open →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
