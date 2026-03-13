"use client";

import { useState } from "react";
import OsNav from "@/components/os/OsNav";

export default function CouncilPage() {
  const [decision, setDecision] = useState("");
  const [output, setOutput] = useState("No council reasoning yet.");

  function analyzeDecision(example?: string) {
    const text = (example ?? decision).trim();
    if (!text) return;

    setOutput(`Council review:
Question: ${text}

Perspective 1: What has the highest urgency?
Perspective 2: What has the highest long-term value?
Perspective 3: What creates the most stability?
Suggested next move: choose the path with immediate importance, then schedule the second path in Timeline.`);
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        AI Council
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        AI Council is the decision chamber of Shynvo OS. It is used for multi-perspective reasoning
        on important academic, project, and strategic choices.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Decision Input</div>

          <textarea
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            placeholder="Write your decision question here..."
            className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => analyzeDecision()}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Analyze
            </button>

            <button
              type="button"
              onClick={() => analyzeDecision("Should I focus on exams first or product work first?")}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Use Example
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Council Output</div>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
            {output}
          </pre>
        </div>
      </div>
    </section>
  );
}
