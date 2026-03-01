"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FeatureKey =
  | "futureSelf"
  | "forkEngine"
  | "compareView"
  | "prompts"
  | "emotionalMap"
  | "milestones"
  | "realityCheck"
  | "anchors";

type Feature = {
  key: FeatureKey;
  title: string;
  subtitle: string;
  details: string[];
  example: string;
  nextStep: string;
};

export default function ChronoVaultPage() {
  const [openKey, setOpenKey] = useState<FeatureKey | null>(null);

  const features: Feature[] = useMemo(
    () => [
      {
        key: "futureSelf",
        title: "Future-Self Narratives",
        subtitle:
          "Generate voice-consistent future “letters” from you at different horizons (1y / 5y / 10y).",
        details: [
          "Produces 3 short “letters” written in the voice of your future self.",
          "Each letter focuses on different values: growth, stability, meaning.",
          "Includes 1 regret avoided + 1 insight gained + 1 warning.",
        ],
        example:
          "“You were afraid you’d lose momentum if you slowed down. But the truth is: rest became the engine. The best year wasn’t the fastest — it was the most deliberate.”",
        nextStep:
          "Add a form for “life area + current situation” → call /api/public/chat → render 3 letters in a timeline view.",
      },
      {
        key: "forkEngine",
        title: "Decision Fork Engine",
        subtitle:
          "Branch timelines from one decision into several plausible directions with consequences.",
        details: [
          "User picks one decision (move/stay, quit/commit, save/spend, etc.).",
          "AI generates 3 branches with tradeoffs and second-order effects.",
          "Each branch returns: benefits, costs, risks, and a key turning point.",
        ],
        example:
          "Fork: Move cities\nA) New network, slower start\nB) Higher pay, isolation risk\nC) Stay + build brand locally",
        nextStep:
          "Create a “fork picker” UI → AI returns 3 branches JSON → render as branch cards.",
      },
      {
        key: "compareView",
        title: "Timeline Comparison View",
        subtitle:
          "Compare futures side-by-side across career, health, relationships, finances, and meaning.",
        details: [
          "Splits the screen into columns for Branch A/B/C.",
          "Each column shows the same categories so tradeoffs are obvious.",
          "Highlights the biggest divergence (“where your life changes most”).",
        ],
        example:
          "Branch B wins money + career, loses relationships momentum.\nBranch A grows meaning + health, slower financial curve.",
        nextStep:
          "Create comparison grid component → feed it branch data from Fork Engine.",
      },
      {
        key: "prompts",
        title: "Reflective Prompts",
        subtitle:
          "Questions that surface values: “What do you refuse to sacrifice?” “What regret do you fear?”",
        details: [
          "Prompts appear at key moments (before choosing, after results).",
          "Turns simulation into clarity by extracting values + constraints.",
          "Saves your answers as “anchors” for later sessions (optional later).",
        ],
        example:
          "Prompt: “What do you refuse to sacrifice?”\nAnswer: “Health and the ability to create.”",
        nextStep:
          "Add prompt drawer UI → store responses in localStorage for now.",
      },
      {
        key: "emotionalMap",
        title: "Emotional Trajectory Mapping",
        subtitle:
          "Track confidence, stress, fulfillment, and regret across each branch.",
        details: [
          "Each branch gets a simple emotional curve (0–10) across time.",
          "Highlights volatility vs stability, and delayed consequences.",
          "Used to detect ‘looks good on paper’ paths that feel wrong.",
        ],
        example:
          "Branch C: confidence +2, stress +4 (months 1–3), fulfillment +6 (year 2).",
        nextStep:
          "Render a simple timeline bar/curve per branch (no chart lib needed).",
      },
      {
        key: "milestones",
        title: "Milestone Cards",
        subtitle:
          "Key moments presented as shareable cards: “Year 3 — turning point” “Year 7 — consequence”.",
        details: [
          "Turns long timelines into memorable snapshots.",
          "Each card contains: moment title, what changed, why it happened, what you learned.",
          "Later: share/export as images.",
        ],
        example:
          "Year 3 — Turning Point\n“You stopped proving yourself and started building systems.”",
        nextStep:
          "Create MilestoneCard component → fill from AI branch output.",
      },
      {
        key: "realityCheck",
        title: "Reality Check Mode",
        subtitle:
          "Ground the simulation with constraints, tradeoffs, and uncertainty (no magical thinking).",
        details: [
          "Shows assumptions the simulation is making (time, money, support).",
          "Injects uncertainty: ‘best case / base case / worst case’.",
          "Prevents fantasy loops by forcing tradeoffs to appear.",
        ],
        example:
          "Assumption flagged: “You’ll have 10 hrs/week free.”\nReality check: “If not, Branch A slows by 40%.”",
        nextStep:
          "Add an ‘Assumptions’ panel and include it in AI JSON response.",
      },
      {
        key: "anchors",
        title: "Anchor Commitments",
        subtitle:
          "Convert insights into small present-day actions (weekly steps).",
        details: [
          "At the end, Chrono Vault produces 3 micro-commitments.",
          "Each action is: small, measurable, and aligned to your chosen branch.",
          "Later: connect to Momentum/Focus systems (optional).",
        ],
        example:
          "Weekly anchor: “Two deep work sessions (90 min) + one outreach message.”",
        nextStep:
          "Generate anchors from AI output → store locally → display checklist.",
      },
    ],
    []
  );

  const openFeature = openKey
    ? features.find((f) => f.key === openKey) ?? null
    : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* universe bg */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1100px circle at 18% 18%, rgba(34,211,238,0.22), transparent 55%),
              radial-gradient(1000px circle at 82% 22%, rgba(168,85,247,0.20), transparent 55%),
              radial-gradient(900px circle at 40% 90%, rgba(244,114,182,0.10), transparent 60%),
              linear-gradient(180deg, rgba(2,6,23,0.70), rgba(0,0,0,0.95))
            `,
          }}
        />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-14">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/60">
              Experiment
            </div>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">Chrono Vault</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              A reflective future-self simulator. Not prediction — simulation.
              Explore branching timelines to clarify values, priorities, and
              tradeoffs.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-cyan-300/80" />
              Phase: content-ready • UI shell • timeline engine next
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/experiments"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Back to Hub →
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 hover:bg-white/5"
            >
              Home
            </Link>
          </div>
        </div>

        {/* top cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur">
            <div className="text-sm font-semibold text-white/90">What it is</div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/75">
              <li>Future-self narratives across 1y / 5y / 10y horizons.</li>
              <li>Branching paths based on decisions you choose today.</li>
              <li>Emotional + practical outcomes visualized side-by-side.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur">
            <div className="text-sm font-semibold text-white/90">
              The core loop
            </div>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-white/75">
              <li>Pick a life area: career, health, relationships, identity.</li>
              <li>Choose a decision fork (e.g., “move / stay”).</li>
              <li>Compare timelines and extract your “signal”.</li>
            </ol>
          </div>
        </div>

        {/* clickable feature grid */}
        <div className="mt-4 rounded-3xl border border-white/10 bg-black/50 p-7 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white/90">
              Planned feature set
            </div>
            <div className="text-xs text-white/55">
              Click a card to open details →
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {features.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setOpenKey(f.key)}
                className="text-left rounded-2xl border border-white/10 bg-black/40 p-5 hover:bg-white/5 transition"
              >
                <div className="text-sm font-semibold text-white/90">
                  {f.title}
                </div>
                <div className="mt-2 text-sm text-white/70">{f.subtitle}</div>
                <div className="mt-4 text-xs text-white/60">Open →</div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-xs text-white/55">
            Next implementation step: build a “fork picker” → AI generates 3
            branches → render timeline cards.
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/45">
          Chrono Vault • reflective, not predictive • clarity over certainty
        </div>
      </div>

      {/* modal */}
      {openFeature && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpenKey(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">
                  Chrono Vault Feature
                </div>
                <div className="mt-1 text-xl font-semibold text-white/95">
                  {openFeature.title}
                </div>
                <div className="mt-2 text-sm text-white/70">
                  {openFeature.subtitle}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpenKey(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Close ✕
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="text-sm font-semibold text-white/90">
                  What this feature adds
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/75">
                  {openFeature.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="text-sm font-semibold text-white/90">Example</div>
                <div className="mt-3 whitespace-pre-wrap text-sm text-white/75">
                  {openFeature.example}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="text-sm font-semibold text-white/90">
                  Next build step
                </div>
                <div className="mt-3 text-sm text-white/75">
                  {openFeature.nextStep}
                </div>
              </div>
            </div>

            <div className="mt-5 text-xs text-white/50">
              Tip: later, each feature can become its own interactive sub-mode.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}