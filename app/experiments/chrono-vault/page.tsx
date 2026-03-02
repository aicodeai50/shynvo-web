"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Mode = "fork" | "compare" | "prompts";

type Branch = {
  id: string;
  title: string;
  highlights: string[];
  risks: string[];
  trajectory: { year1: string; year5: string; year10: string };
};

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function generateBranches(topic: string): Branch[] {
  const t = topic.trim();
  return [
    {
      id: uid(),
      title: "Branch A — Steady climb",
      highlights: [
        `You keep the core path but optimize it around "${t}".`,
        "Small daily compounding actions. Lower chaos.",
        "More stable routines, slower but durable wins.",
      ],
      risks: ["May feel boring", "Opportunity cost of not taking bold bets"],
      trajectory: {
        year1: "Better habits + early signal of progress.",
        year5: "Solid foundation, consistent identity.",
        year10: "High stability, reliable outcomes.",
      },
    },
    {
      id: uid(),
      title: "Branch B — Bold pivot",
      highlights: [
        `You make a major change centered on "${t}".`,
        "Higher learning curve, faster upside potential.",
        "New network + higher variance outcomes.",
      ],
      risks: ["Stress spikes", "Temporary instability", "Needs strong support system"],
      trajectory: {
        year1: "Disruption + rapid learning.",
        year5: "New track is real, competence emerges.",
        year10: "Either breakthrough or reset — depends on execution.",
      },
    },
    {
      id: uid(),
      title: "Branch C — Meaning-first",
      highlights: [
        `You prioritize values and meaning around "${t}".`,
        "Better alignment, healthier boundaries.",
        "Long-term fulfillment focus.",
      ],
      risks: ["Slower financial curve", "Requires discipline to avoid drift"],
      trajectory: {
        year1: "Clarity improves, stress reduces.",
        year5: "Strong identity, stable relationships.",
        year10: "High fulfillment, steady legacy-building.",
      },
    },
  ];
}

const PANEL =
  "rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl";

const TAB =
  "rounded-full border px-3 py-1 text-xs transition";

function Glow() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-80"
      style={{
        background: `
          radial-gradient(900px circle at 18% 18%, rgba(34,211,238,0.18), transparent 55%),
          radial-gradient(900px circle at 82% 24%, rgba(168,85,247,0.18), transparent 55%),
          radial-gradient(1000px circle at 50% 95%, rgba(163,230,53,0.10), transparent 60%),
          linear-gradient(180deg, rgba(2,6,23,0.72), rgba(0,0,0,0.95))
        `,
      }}
    />
  );
}

export default function ChronoVaultPage() {
  const [mode, setMode] = useState<Mode>("fork");
  const [q, setQ] = useState("");
  const [branches, setBranches] = useState<Branch[] | null>(null);

  const tabs = useMemo(
    () => [
      { id: "fork" as const, label: "Fork Picker" },
      { id: "compare" as const, label: "Compare Timelines" },
      { id: "prompts" as const, label: "Reflective Prompts" },
    ],
    []
  );

  function run() {
    const t = q.trim();
    if (!t) return;
    setBranches(generateBranches(t));
    setMode("fork");
  }

  function renderFork() {
    if (!branches) {
      return (
        <div className="text-sm text-white/70">
          Type a decision or goal and generate 3 possible futures. This is not prediction — it’s clarity through tradeoffs.
          <div className="mt-2 text-xs text-white/55">
            Example: “move to a new city” • “switch to data science” • “start a business”
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-4 md:grid-cols-3">
        {branches.map((b) => (
          <div key={b.id} className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <div className="text-sm font-semibold text-white/90">{b.title}</div>

            <div className="mt-3 text-xs tracking-widest text-white/60">HIGHLIGHTS</div>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-white/80">
              {b.highlights.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            <div className="mt-4 text-xs tracking-widest text-white/60">RISKS</div>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-white/70">
              {b.risks.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            <div className="mt-4 text-xs tracking-widest text-white/60">TIMELINE</div>
            <div className="mt-2 space-y-2 text-sm text-white/75">
              <div><span className="text-white/85">1y:</span> {b.trajectory.year1}</div>
              <div><span className="text-white/85">5y:</span> {b.trajectory.year5}</div>
              <div><span className="text-white/85">10y:</span> {b.trajectory.year10}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderCompare() {
    if (!branches) {
      return <div className="text-sm text-white/70">Generate branches first in “Fork Picker”.</div>;
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-white/15">
        <div className="grid md:grid-cols-3">
          {branches.map((b) => (
            <div key={b.id} className="border-r border-white/10 bg-black/40 p-4 last:border-r-0">
              <div className="text-sm font-semibold text-white/90">{b.title}</div>
              <div className="mt-3 text-xs tracking-widest text-white/60">BIGGEST TRADEOFF</div>
              <div className="mt-2 text-sm text-white/75">{b.risks[0]}</div>

              <div className="mt-4 text-xs tracking-widest text-white/60">1Y / 5Y / 10Y</div>
              <div className="mt-2 text-sm text-white/75 space-y-2">
                <div>{b.trajectory.year1}</div>
                <div>{b.trajectory.year5}</div>
                <div>{b.trajectory.year10}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderPrompts() {
    const prompts = [
      "What are you refusing to sacrifice?",
      "If you choose wrong, what’s the cost — and can you recover?",
      "Which branch makes you feel more alive (not just more impressed)?",
      "What would future-you thank you for doing this month?",
      "What constraint is real (time, money, health, relationships) — and which is imagined?",
      "Which option is reversible? Which is not?",
    ];

    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
        <div className="text-xs tracking-widest text-white/60">PROMPTS THAT CREATE CLARITY</div>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
          {prompts.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 relative">
        <Glow />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs tracking-widest text-white/60">EXPERIMENT</div>
            <div className="mt-2 text-3xl font-semibold">Chrono Vault</div>
            <div className="mt-2 text-sm text-white/70">
              Future-self simulation with branching timelines. Not prediction — clarity through consequence mapping.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/experiments" className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15">
              Back to Hub →
            </Link>
            <Link href="/" className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10">
              Home →
            </Link>
          </div>
        </div>

        <div className={`${PANEL} mt-8`}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs tracking-widest text-white/60">SEARCH / COMMAND</div>
              <div className="mt-1 text-sm text-white/70">
                Enter a decision fork, goal, or life question.
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setMode(t.id)}
                  className={[
                    TAB,
                    mode === t.id
                      ? "border-white/25 bg-white/15 text-white"
                      : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='e.g., "move abroad" / "switch to nursing" / "start a startup"'
              className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
              onKeyDown={(e) => (e.key === "Enter" ? run() : null)}
            />
            <button
              type="button"
              onClick={run}
              disabled={!q.trim()}
              className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/85 hover:bg-white/15 disabled:opacity-50"
            >
              Generate →
            </button>
          </div>

          <div className="mt-6">
            {mode === "fork" ? renderFork() : null}
            {mode === "compare" ? renderCompare() : null}
            {mode === "prompts" ? renderPrompts() : null}
          </div>

          <div className="mt-6 text-xs text-white/50">
            Purpose: reveal tradeoffs and values by comparing plausible futures — clarity over certainty.
          </div>
        </div>
      </div>
    </div>
  );
}
