"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Mode = "debate" | "map" | "blindspots" | "summary";

type Stance = {
  title: string;
  claims: { claim: string; why: string; counter: string }[];
};

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clampText(s: string, n = 2200) {
  const t = (s || "").trim();
  return t.length > n ? t.slice(0, n) + "…" : t;
}

// Local generator (works now). Later you can swap to AI.
function generateDebate(topic: string) {
  const clean = topic.trim();
  const pro: Stance = {
    title: "PRO",
    claims: [
      {
        claim: `Strongest case for: "${clean}"`,
        why: "Best outcomes, efficiency, or fairness — depends on context.",
        counter: "Assumes ideal conditions; may ignore second-order effects.",
      },
      {
        claim: "Pragmatic benefits",
        why: "Lower friction, clearer incentives, measurable results.",
        counter: "May trade long-term resilience for short-term wins.",
      },
      {
        claim: "Evidence / precedent angle",
        why: "Comparable systems show success under similar constraints.",
        counter: "Selection bias: success cases get highlighted more than failures.",
      },
    ],
  };

  const con: Stance = {
    title: "CON",
    claims: [
      {
        claim: `Strongest case against: "${clean}"`,
        why: "Risk, unintended harm, or misaligned incentives.",
        counter: "May be overly cautious; can block innovation.",
      },
      {
        claim: "Hidden costs",
        why: "Implementation costs, inequality effects, externalities.",
        counter: "Costs can be mitigated by design + guardrails.",
      },
      {
        claim: "Epistemic uncertainty",
        why: "We don’t fully know long-run impacts; models can be wrong.",
        counter: "Uncertainty is not inaction; can run staged trials.",
      },
    ],
  };

  const neutral: Stance = {
    title: "NEUTRAL",
    claims: [
      {
        claim: "Depends on assumptions",
        why: "If X is true, PRO wins. If Y is true, CON wins.",
        counter: "You need to test X/Y with real constraints.",
      },
      {
        claim: "Tradeoff framing",
        why: "This is a trade between speed vs safety, freedom vs control, etc.",
        counter: "Tradeoffs can be softened with mixed strategies.",
      },
      {
        claim: "Operational definition",
        why: `Define what success means for "${clean}" (metrics, timeline).`,
        counter: "Without metrics, debate becomes vibes not truth.",
      },
    ],
  };

  const blindSpots = [
    "What evidence would change your mind?",
    "Which stakeholder is missing from your framing?",
    "Are you confusing what’s popular with what’s true?",
    "What’s the strongest argument for the other side (steelman)?",
    "What’s the cost of being wrong (both ways)?",
  ];

  return { id: uid(), topic: clean, pro, con, neutral, blindSpots };
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
          radial-gradient(900px circle at 18% 18%, rgba(180,120,255,0.28), transparent 55%),
          radial-gradient(900px circle at 82% 24%, rgba(244,114,182,0.18), transparent 55%),
          radial-gradient(1000px circle at 50% 95%, rgba(34,211,238,0.10), transparent 60%),
          linear-gradient(180deg, rgba(2,6,23,0.72), rgba(0,0,0,0.95))
        `,
      }}
    />
  );
}

export default function DebateMatrixPage() {
  const [mode, setMode] = useState<Mode>("debate");
  const [q, setQ] = useState("");
  const [result, setResult] = useState<ReturnType<typeof generateDebate> | null>(null);

  const canRun = q.trim().length > 0;

  const tabs = useMemo(
    () => [
      { id: "debate" as const, label: "Debate" },
      { id: "map" as const, label: "Argument Map" },
      { id: "blindspots" as const, label: "Blind Spots" },
      { id: "summary" as const, label: "Balanced Summary" },
    ],
    []
  );

  function run() {
    if (!canRun) return;
    setResult(generateDebate(q));
    setMode("debate");
  }

  function renderStance(s: Stance) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
        <div className="text-xs tracking-widest text-white/60">{s.title}</div>
        <div className="mt-3 space-y-3">
          {s.claims.map((c, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-black/40 p-3">
              <div className="text-sm font-semibold text-white/90">{c.claim}</div>
              <div className="mt-2 text-xs text-white/65">
                <span className="text-white/80">Why:</span> {c.why}
              </div>
              <div className="mt-2 text-xs text-white/65">
                <span className="text-white/80">Counter:</span> {c.counter}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderBody() {
    if (!result) {
      return (
        <div className="text-sm text-white/70">
          Type a belief, claim, or question and hit <span className="text-white/90 font-semibold">Run</span>.
          <div className="mt-2 text-xs text-white/55">
            Example: “AI should replace exams” • “Remote work increases productivity” • “Should I switch careers?”
          </div>
        </div>
      );
    }

    if (mode === "debate") {
      return (
        <div className="grid gap-4 md:grid-cols-3">
          {renderStance(result.pro)}
          {renderStance(result.con)}
          {renderStance(result.neutral)}
        </div>
      );
    }

    if (mode === "map") {
      const mapText = [
        `TOPIC: ${result.topic}`,
        "",
        "CLAIM → COUNTERCLAIM → WHAT WOULD SETTLE IT",
        "",
        ...result.pro.claims.map((c, i) => [
          `PRO #${i + 1}: ${c.claim}`,
          `  Counter: ${c.counter}`,
          `  Settle: what evidence would confirm/deny this?`,
          "",
        ].join("\n")),
        ...result.con.claims.map((c, i) => [
          `CON #${i + 1}: ${c.claim}`,
          `  Counter: ${c.counter}`,
          `  Settle: what evidence would confirm/deny this?`,
          "",
        ].join("\n")),
      ].join("\n");

      return (
        <pre className="whitespace-pre-wrap rounded-2xl border border-white/15 bg-black/50 p-4 text-sm text-white/80">
          {clampText(mapText)}
        </pre>
      );
    }

    if (mode === "blindspots") {
      return (
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
          <div className="text-xs tracking-widest text-white/60">QUESTIONS THAT BREAK ECHO CHAMBERS</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
            {result.blindSpots.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      );
    }

    const summary = [
      `Balanced view on: ${result.topic}`,
      "",
      "What’s strong about PRO:",
      `- ${result.pro.claims[0].why}`,
      "",
      "What’s strong about CON:",
      `- ${result.con.claims[0].why}`,
      "",
      "Where NEUTRAL lands:",
      `- ${result.neutral.claims[0].why}`,
      "",
      "Decision heuristic:",
      "- Define success metrics",
      "- Pick constraints (time, budget, risk)",
      "- Run a small test and reassess",
    ].join("\n");

    return (
      <pre className="whitespace-pre-wrap rounded-2xl border border-white/15 bg-black/50 p-4 text-sm text-white/80">
        {clampText(summary)}
      </pre>
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
            <div className="mt-2 text-3xl font-semibold">Debate Matrix</div>
            <div className="mt-2 text-sm text-white/70">
              A multi-agent debate arena to stress-test beliefs. Type a topic, generate arguments, find blind spots.
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
                Enter a belief, claim, question, or debate motion.
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
              placeholder='e.g., "AI should replace exams"'
              className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
              onKeyDown={(e) => (e.key === "Enter" ? run() : null)}
            />
            <button
              type="button"
              onClick={run}
              disabled={!canRun}
              className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm text-white/85 hover:bg-white/15 disabled:opacity-50"
            >
              Run →
            </button>
          </div>

          <div className="mt-6">{renderBody()}</div>

          <div className="mt-6 text-xs text-white/50">
            Purpose: break echo chambers by forcing structured opposing arguments + blind-spot prompts.
          </div>
        </div>
      </div>
    </div>
  );
}
