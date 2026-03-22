"use client";

import Link from "next/link";
import { useState } from "react";

export default function ExperimentsConceptForgePage() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<null | {
    concept: string;
    userProblem: string;
    value: string;
  }>(null);

  function forgeConcept() {
    const i = idea.trim();
    if (!i) return;

    setResult({
      concept: `Core concept: ${i} can be shaped into a clearer product or project by defining its exact job, audience, and use case.`,
      userProblem: `Target user + problem: this idea appears to serve users who need more clarity, structure, speed, or support in a repeated workflow.`,
      value: `Value proposition + next steps: define the user, define the pain point, define why this is better than alternatives, then build the smallest usable version first.`
    });
  }

  return (
    <section className="py-10 sm:py-14">
      <Link href="/experiments" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        ← Back to Experiments
      </Link>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        Experiments
      </div>

      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
        Concept Forge
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
        Concept Forge is where rough thoughts become structured ideas. Users can turn
        vague concepts into clearer direction, value, audience, and next steps.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Raw Idea Input</div>

          <textarea
            rows={9}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: I want to build an AI app that helps students stay focused and actually complete their goals."
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={forgeConcept}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Forge Concept
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Expected Output</div>

          <div className="mt-4 space-y-3">
            <button className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left hover:bg-white/5">
              <div className="text-sm font-semibold text-white">Core concept</div>
              <div className="mt-2 text-sm text-white/70">{result?.concept ?? "Waiting for idea..."}</div>
            </button>

            <button className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left hover:bg-white/5">
              <div className="text-sm font-semibold text-white">Target user + problem</div>
              <div className="mt-2 text-sm text-white/70">{result?.userProblem ?? "Waiting for idea..."}</div>
            </button>

            <button className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left hover:bg-white/5">
              <div className="text-sm font-semibold text-white">Value proposition + next steps</div>
              <div className="mt-2 text-sm text-white/70">{result?.value ?? "Waiting for idea..."}</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
