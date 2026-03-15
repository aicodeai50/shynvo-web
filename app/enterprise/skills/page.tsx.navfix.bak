"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

function CapabilityCard({
  title,
  value,
  onChange,
  href,
  summary,
}: {
  title: string;
  value: number;
  onChange: (value: number) => void;
  href: string;
  summary: string;
}) {
  const level =
    value >= 80 ? "Strong capability" : value >= 60 ? "Growing capability" : "Capability gap";

  return (
    <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
      <div className="text-2xl font-semibold text-white">{title}</div>
      <div className="mt-3 text-sm text-white/70">{level}</div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-5 w-full"
      />

      <div className="mt-4 text-sm text-white/80">Capability score: {value}/100</div>
      <div className="mt-3 text-sm leading-6 text-white/65">{summary}</div>

      <Link
        href={href}
        className="mt-5 inline-flex rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
      >
        Open capability
      </Link>
    </div>
  );
}

export default function EnterpriseSkillsPage() {
  const [frontend, setFrontend] = useState(82);
  const [ai, setAi] = useState(61);

  const capabilityReading = useMemo(() => {
    const frontendState = frontend >= 80 ? "strong" : frontend >= 60 ? "developing" : "weak";
    const aiState = ai >= 80 ? "strong" : ai >= 60 ? "developing" : "early-stage";

    return `Current capability reading: frontend delivery is ${frontendState}, while AI capability is ${aiState}. Leadership should use this layer to identify strengths, investment priorities, and growth gaps across the organization.`;
  }, [frontend, ai]);

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo Enterprise
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Skill Matrix
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Skill Matrix helps organizations understand strengths, growth paths,
        capability gaps, and future hiring or training priorities.
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Capability Reading</div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
          {capabilityReading}
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <CapabilityCard
          title="Frontend Capability"
          value={frontend}
          onChange={setFrontend}
          href="/enterprise/skills/frontend"
          summary="Tracks interface delivery quality, system consistency, component maturity, and implementation strength."
        />

        <CapabilityCard
          title="AI Capability"
          value={ai}
          onChange={setAi}
          href="/enterprise/skills/ai"
          summary="Tracks readiness for AI workflows, structured prompting, agent usage, and AI-supported execution."
        />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">How leadership should use this</div>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              Identify which capabilities are already dependable.
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              Detect where training, hiring, or systems support are needed.
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              Connect capability maturity to enterprise missions and strategy.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Suggested next moves</div>
          <div className="mt-4 grid gap-3">
            <Link href="/enterprise/strategy" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
              Review capability strategy
            </Link>
            <Link href="/enterprise/missions" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
              Connect capabilities to missions
            </Link>
            <Link href="/enterprise/analytics" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 hover:bg-white/10">
              Review performance impact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
