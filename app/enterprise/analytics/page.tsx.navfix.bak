"use client";

import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";

export default function EnterpriseAnalyticsPage() {
  const [mission, setMission] = useState(78);
  const [workload, setWorkload] = useState(64);
  const [output, setOutput] = useState(71);

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav hubHref="/enterprise" hubTitle="Shynvo Enterprise" />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo Enterprise
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Analytics
      </h1>

      <p className="mt-4 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
        Analytics gives leaders visibility into progress, bottlenecks, workload, mission health, and team performance.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Mission Progress</div>
          <div className="mt-3 text-sm text-white/70">{mission >= 70 ? "Healthy" : "Needs attention"}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={mission}
            onChange={(e) => setMission(Number(e.target.value))}
            className="mt-5 w-full"
          />
          <div className="mt-4 text-sm text-white/80">{mission}/100</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open detail →</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Workload Balance</div>
          <div className="mt-3 text-sm text-white/70">{workload >= 70 ? "Stable" : "Moderate"}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={workload}
            onChange={(e) => setWorkload(Number(e.target.value))}
            className="mt-5 w-full"
          />
          <div className="mt-4 text-sm text-white/80">{workload}/100</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open detail →</div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-2xl font-semibold text-white">Team Output</div>
          <div className="mt-3 text-sm text-white/70">{output >= 70 ? "Improving" : "Needs support"}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={output}
            onChange={(e) => setOutput(Number(e.target.value))}
            className="mt-5 w-full"
          />
          <div className="mt-4 text-sm text-white/80">{output}/100</div>
          <div className="mt-5 text-sm font-semibold text-white/90">Open detail →</div>
        </div>
      </div>
    </section>
  );
}
