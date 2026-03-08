"use client";

import { useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";

export default function ConceptPage() {
  const [input, setInput] = useState("");
  const [core, setCore] = useState("Waiting for idea...");
  const [userProblem, setUserProblem] = useState("Waiting for idea...");
  const [value, setValue] = useState("Waiting for idea...");

  function forgeConcept() {
    const text = input.trim();
    if (!text) return;

    setCore(`Core concept: ${text}`);
    setUserProblem("Target user + problem: define who needs this and what pain it solves.");
    setValue("Value proposition + next steps: clarify the promise, test with users, and build a simple first version.");
  }

  return (
    <section className="py-10 sm:py-14">
      <ExperimentsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
        Experiments
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Concept Forge
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Concept Forge is where rough thoughts become structured ideas. Users can turn vague concepts
        into clearer direction, value, audience, and next steps.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Raw Idea Input</div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: I want to build an AI app that helps students stay focused and actually complete their goals."
            className="mt-5 min-h-[220px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={forgeConcept}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Forge Concept
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Expected Output</div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Core concept</div>
              <div className="mt-2 text-sm text-white/70">{core}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Target user + problem</div>
              <div className="mt-2 text-sm text-white/70">{userProblem}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Value proposition + next steps</div>
              <div className="mt-2 text-sm text-white/70">{value}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
