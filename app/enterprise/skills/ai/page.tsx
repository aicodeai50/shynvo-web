"use client";

import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

const sections = [
  {
    title: "Agent Usage",
    desc: "Growing use of AI systems for planning, support, and operational execution.",
    href: "/enterprise/help/ai-guidance",
    tag: "Guidance",
  },
  {
    title: "Automation Readiness",
    desc: "Foundation exists for AI-assisted workflows and decision support.",
    href: "/enterprise/settings/automation",
    tag: "Automation",
  },
  {
    title: "Next Step",
    desc: "Add structured prompts, role logic, and measurable outcomes.",
    href: "/enterprise/strategy",
    tag: "Strategy",
  },
];

export default function EnterpriseAiSkillPage() {
  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Skills" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Capability
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          AI Capability
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          The organization is building AI capability in workflows, reasoning, and execution support.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                {item.tag}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/68">{item.desc}</p>
            <div className="mt-5 text-sm font-semibold text-white/90">Open →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
