"use client";

import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function EnterpriseMissionsPage() {
  const [goal, setGoal] = useState("");
  const [mission, setMission] = useState("No mission created yet.");

  function createMission() {
    const text = goal.trim();
    if (!text) return;

    setMission(
      `Mission created from "${text}"\n\nPhase 1: Planning\nPhase 2: Ownership\nPhase 3: Execution\nPhase 4: Review\nPhase 5: Reporting`
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo Enterprise
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Missions
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Missions turns company goals into coordinated execution flows across teams, deadlines, and measurable phases.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Example Mission</div>
          <div className="mt-3 text-sm text-white/70">
            Launch Product v1 → Planning → Build → Test → Release → Review
          </div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open example →</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Create Mission</div>
          <div className="mt-3 text-sm text-white/70">
            Turn a company goal into phases, ownership, and execution blocks.
          </div>

          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Type the company goal..."
            className="mt-4 min-h-[150px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={createMission}
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Open creator
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Mission Output</div>
        <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
          {mission}
        </pre>
      </div>
    </section>
  );
}
