"use client";

import { useState } from "react";
import EnterpriseNav from "@/components/enterprise/EnterpriseNav";
import EnterpriseAIBriefing from "@/components/enterprise/EnterpriseAIBriefing";

function buildStrategyOutput(input: string) {
  if (!input.trim()) {
    return "Enter a leadership question to receive structured reasoning.";
  }

  return [
    `Decision analyzed: ${input}`,
    "",
    "Option A: move faster with higher coordination risk.",
    "Option B: move slower with stronger control.",
    "Trade-off: speed vs reliability.",
    "Recommended direction: choose the path that the team can sustain and measure clearly.",
    "AI note: connect this decision to mission ownership, schedule impact, and accountability."
  ].join("\n");
}

export default function EnterpriseStrategyPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(buildStrategyOutput(""));

  return (
    <section className="py-10 sm:py-14">
      <EnterpriseNav label="Enterprise Strategy" />

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">
          Strategy & Leadership
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          AI Strategy
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Leadership can compare options, reduce risk, and make clearer organizational decisions with structured AI reasoning.
        </p>
      </div>

      <EnterpriseAIBriefing area="strategy" />

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Decision Input
          </div>
          <div className="mt-2 text-sm text-white/65">
            Example: Should we hire first, ship first, or partner first?
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your leadership question here..."
            className="mt-4 min-h-[220px] w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setOutput(buildStrategyOutput(input))}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Analyze with AI
            </button>

            <button
              type="button"
              onClick={() => {
                setInput("");
                setOutput(buildStrategyOutput(""));
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            AI Output
          </div>

          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/80">
{output}
          </pre>
        </div>
      </div>
    </section>
  );
}
