"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FrontierOutputPanel from "../_components/FrontierOutputPanel";
import { buildPuzzleOutput } from "../_lib/frontierProfessionalCopy";

type SolveMode = "test" | "guided" | "teach";

const PUZZLES = [
  {
    question: "A system has 3 switches. B must come after A, and C cannot be last. Which order can unlock the system?",
    hint1: "Start by testing the valid positions for C.",
    hint2: "If C cannot be last, try placing C in the middle and keep B after A.",
    answer: "A, C, B works because B comes after A and C is not last.",
  },
  {
    question: "Three services depend on each other: API before UI, Database before API. What is the safe build order?",
    hint1: "Find the deepest dependency first.",
    hint2: "The system layer that everything else depends on should start first.",
    answer: "Database, API, UI.",
  },
  {
    question: "A robot can move left, right, or forward. It must visit the sensor before the gate and cannot end at the charger. What should you track first?",
    hint1: "Track order rules before path choices.",
    hint2: "List the constraints first, then test movement paths against them.",
    answer: "Start with the ordering constraints: sensor before gate, charger not final.",
  },
];

export default function FrontierPuzzlesPage() {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<SolveMode>("guided");
  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const active = PUZZLES[index];

  const output = useMemo(
    () =>
      buildPuzzleOutput({
        mode: mode,
        question: active.question,
        hint1: active.hint1,
        hint2: active.hint2,
        answer: active.answer,
      }),
    [mode, active]
  );

  function nextPuzzle() {
    setIndex((prev) => (prev + 1) % PUZZLES.length);
    setShowHint1(false);
    setShowHint2(false);
    setShowAnswer(false);
  }

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
          Logic Puzzles
        </h1>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
          Train deep reasoning through interactive logic challenges. Reveal hints in layers, switch
          solve mode, and keep progressing without leaving the environment.
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">Puzzle chamber</div>
            <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-[11px] text-lime-100">
              AI Deduction Layer
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold text-white">Solve mode</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {(["test", "guided", "teach"] as SolveMode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMode(item)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    mode === item
                      ? "border-lime-300/30 bg-lime-400/10 text-white"
                      : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                  }`}
                >
                  <div className="text-sm font-semibold capitalize">{item}</div>
                  <div className="mt-1 text-sm text-white/70">
                    {item === "test"
                      ? "Minimal help."
                      : item === "guided"
                      ? "Hints in stages."
                      : "More explanation."}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/90">
            {active.question}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setShowHint1(true)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              Hint 1
            </button>
            <button
              type="button"
              onClick={() => setShowHint2(true)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
            >
              Hint 2
            </button>
            <button
              type="button"
              onClick={() => setShowAnswer(true)}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Reveal answer
            </button>
            <button
              type="button"
              onClick={nextPuzzle}
              className="rounded-2xl border border-lime-300/30 bg-lime-400/10 px-5 py-3 text-sm font-semibold text-lime-100 hover:bg-lime-400/15"
            >
              Next puzzle
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-sm font-semibold text-white">Puzzle panel</div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Hint 1</div>
              <div className="mt-2 text-sm leading-6 text-white/75">
                {showHint1 ? active.hint1 : mode === "test" ? "Hidden in test mode until you choose it." : "First hint ready when you ask for it."}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Hint 2</div>
              <div className="mt-2 text-sm leading-6 text-white/75">
                {showHint2 ? active.hint2 : mode === "teach" ? "Second hint is available for deeper explanation." : "Second hint hidden until reveal."}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
              <div className="text-sm font-semibold text-lime-100">Answer</div>
              <div className="mt-2 text-sm leading-6 text-lime-50/90">
                {showAnswer ? active.answer : "Answer hidden until reveal."}
              </div>
            </div>
          </div>

          <FrontierOutputPanel
            title={output.title}
            summary={output.summary}
            nextAction={output.nextAction}
            why={output.why}
            deliverables={output.deliverables}
            risk={output.risk}
          />
        </div>
      </div>
    </section>
  );
}
