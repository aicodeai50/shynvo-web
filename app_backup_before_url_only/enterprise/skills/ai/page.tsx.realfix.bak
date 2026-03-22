import Link from "next/link";

const AREAS = [
  {
    title: "Agent Usage",
    body: "Growing use of AI systems for planning, support, and operational execution.",
    href: "/enterprise/strategy",
  },
  {
    title: "Automation Readiness",
    body: "Foundation exists for AI-assisted workflows and decision support.",
    href: "/enterprise/missions",
  },
  {
    title: "Next Step",
    body: "Add structured prompts, role logic, and measurable outcomes.",
    href: "/enterprise/analytics/progress",
  },
];

export default function EnterpriseAISkillPage() {
  return (
    <section className="py-10 sm:py-14">
      <Link href="/enterprise/skills" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Skill Matrix
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Capability
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        AI Capability
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
        The organization is building AI capability in workflows, reasoning, and execution support.
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
