"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ChallengeType = "shortest-path" | "sorting" | "scheduling" | "graphs";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const CHALLENGES: Record<
  ChallengeType,
  {
    title: string;
    desc: string;
    hint: string;
    route: string;
    focus: string[];
  }
> = {
  "shortest-path": {
    title: "Shortest Path Thinking",
    desc: "Find the fastest route through weighted choices and connected systems.",
    hint: "Track the cheapest known path at every step.",
    route: "Model nodes, compare candidate paths, update best cost, then confirm the optimal route.",
    focus: ["Costs", "Nodes", "Updates"],
  },
  sorting: {
    title: "Sorting Strategy",
    desc: "Choose the smartest way to order data based on scale and efficiency.",
    hint: "Ask whether the data is small, random, nearly sorted, or repeated.",
    route: "Inspect the data pattern, choose a sorting family, then compare time and memory trade-offs.",
    focus: ["Scale", "Pattern", "Trade-offs"],
  },
  scheduling: {
    title: "Task Scheduling",
    desc: "Arrange dependent tasks in the best execution order.",
    hint: "Look for what can start now and what depends on something else.",
    route: "Map dependencies, identify available tasks, schedule safely, then optimize total flow.",
    focus: ["Dependencies", "Availability", "Flow"],
  },
  graphs: {
    title: "Graph Structure",
    desc: "Explore connections, traversal logic, and system relationships.",
    hint: "Think in nodes, edges, cycles, and reachability.",
    route: "Represent the system as a graph, choose traversal, inspect paths, and reason about structure.",
    focus: ["Traversal", "Reachability", "Cycles"],
  },
};

export default function FrontierAlgorithmsPage() {
  const [challenge, setChallenge] = useState<ChallengeType>("shortest-path");
  const [problem, setProblem] = useState(
    "A delivery bot must move through connected stations with different costs. How should I reason about the shortest path?"
  );
  const [generated, setGenerated] = useState(false);

  const active = useMemo(() => CHALLENGES[challenge], [challenge]);

  const interpretation = generated
    ? `Frontier interprets this as a ${active.title.toLowerCase()} problem. Start by identifying the structure, then apply the route below to the exact situation you described.`
    : "Select a challenge and ask Frontier to interpret the reasoning path.";

  const steps = generated
    ? [
        `Problem type detected: ${active.title}.`,
        `Core hint: ${active.hint}`,
        `Reasoning route: ${active.route}`,
        `Applied focus: ${problem || "Use the selected challenge template."}`,
      ]
    : [
        "Problem type will appear here.",
        "Core hint will appear here.",
        "Reasoning route will appear here.",
        "Applied focus will appear here.",
      ];

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_18%_10%,rgba(132,204,22,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_16%,rgba(34,197,94,0.12),transparent_58%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href="/frontier" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          ← Back
        </Link>
        <Link href="/" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          Home
        </Link>
        <Link href="/frontier" className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100 hover:bg-lime-400/15">
          Frontier Lab
        </Link>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200/70">
          Frontier Lab
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Algorithm Challenges
        </h1>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
          This page should reason with the user, not just show a challenge card. Choose a challenge
          type, write your problem, and let Frontier generate a structured engineering route.
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">Choose challenge type</div>
            <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-[11px] text-lime-100">
              AI Reasoning Coach
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {(Object.keys(CHALLENGES) as ChallengeType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setChallenge(type);
                  setGenerated(false);
                }}
                className={cx(
                  "rounded-2xl border p-4 text-left transition",
                  challenge === type
                    ? "border-lime-300/30 bg-lime-400/10 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                )}
              >
                <div className="text-base font-semibold">{CHALLENGES[type].title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{CHALLENGES[type].desc}</div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold text-white">Custom problem</label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              rows={7}
              placeholder="Write the engineering or algorithm problem you want to reason through..."
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Generate reasoning route
            </button>
            <button
              type="button"
              onClick={() => {
                setProblem("");
                setGenerated(false);
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-sm font-semibold text-white">Selected challenge</div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xl font-semibold text-white">{active.title}</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{active.desc}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                {active.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
              <div className="text-sm font-semibold text-lime-100">AI interpretation</div>
              <div className="mt-2 text-sm leading-6 text-lime-50/90">{interpretation}</div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-sm font-semibold text-white">Reasoning output</div>
            <div className="mt-4 space-y-3">
              {steps.map((step) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
