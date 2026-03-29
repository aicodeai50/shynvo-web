"use client";

import { useState } from "react";
import Link from "next/link";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";
import EnterpriseAIBriefing from "@/components/enterprise/EnterpriseAIBriefing";

function buildMission(goal: string) {
  if (!goal.trim()) {
    return "Type a mission goal and press Generate Mission.";
  }

  return [
    `Mission created: ${goal}`,
    "",
    "Phase 1 — Clarify target",
    "- Define desired outcome",
    "- Remove vague wording",
    "- Confirm owner",
    "",
    "Phase 2 — Build execution structure",
    "- Break goal into 3 practical phases",
    "- Define first milestone",
    "- Identify dependencies",
    "",
    "Phase 3 — Prepare tracking",
    "- Connect mission to schedule",
    "- Connect mission to team ownership",
    "- Add progress review points",
    "",
    "AI recommendation: start with the smallest measurable execution step."
  ].join("\n");
}

const cards = [
  { title: "Mission Examples", desc: "Review examples of structured enterprise execution paths.", href: "/enterprise/missions/example" },
  { title: "Mission Creator", desc: "Open the dedicated mission creation route.", href: "/enterprise/missions/create" },
];

export default function EnterpriseMissionsPage() {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState(buildMission(""));

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Missions" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Execution Engine
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Missions
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Turn organization goals into structured mission flow, clearer accountability, and measurable execution.
        </p>
      </div>

      <EnterpriseAIBriefing area="missions" />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Mission Builder
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/85">Pass my exam</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/85">Launch a project</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/85">Improve my skills</div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/85">Organize my week</div>
          </div>

          <div className="mt-5">
            <label className="text-sm text-white/70">Write your own goal</label>
            <div className="mt-2 flex gap-3">
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Type a goal..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="button"
                onClick={() => setResult(buildMission(goal))}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Generate
              </button>
            </div>
          </div>

          <pre className="mt-5 whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/80">
{result}
          </pre>
        </div>

        <div className="space-y-4">
          {cards.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:bg-white/[0.06]"
            >
              <div className="text-xl font-semibold text-white">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-white/68">{item.desc}</div>
              <div className="mt-4 text-sm font-semibold text-emerald-100/85">Open →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
