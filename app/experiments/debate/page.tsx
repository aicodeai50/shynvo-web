"use client";

import { useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";

type Mode = "Balanced" | "Critical" | "Aggressive";

export default function DebatePage() {
  const [mode, setMode] = useState<Mode>("Balanced");
  const [input, setInput] = useState("");
  const [pro, setPro] = useState("Waiting for analysis...");
  const [con, setCon] = useState("Waiting for analysis...");
  const [blind, setBlind] = useState("Waiting for analysis...");
  const [recommendation, setRecommendation] = useState("Waiting for analysis...");

  function generateDebate() {
    const text = input.trim();
    if (!text) return;

    if (mode === "Balanced") {
      setPro(`Best pro side: ${text} may create strong upside if approached with discipline and clear constraints.`);
      setCon(`Best con side: ${text} may create overload, distraction, or hidden opportunity cost.`);
      setBlind(`Blind spots: emotional bias, time assumptions, and underestimating trade-offs.`);
      setRecommendation(`Recommendation: test the decision in a limited way before committing fully.`);
    } else if (mode === "Critical") {
      setPro(`Strongest pro side: there may still be strategic value if the decision improves long-term positioning.`);
      setCon(`Strongest con side: the idea may fail because of weak assumptions, poor timing, or hidden costs.`);
      setBlind(`Blind spots: optimism, lack of evidence, and ignoring second-order consequences.`);
      setRecommendation(`Recommendation: challenge the assumptions hard before moving forward.`);
    } else {
      setPro(`Aggressive pro: if this works, the upside could be significant and fast-moving.`);
      setCon(`Aggressive con: if this fails, the cost could be severe in time, money, energy, or reputation.`);
      setBlind(`Blind spots: overconfidence, speed pressure, and weak fallback plans.`);
      setRecommendation(`Recommendation: only proceed if you can absorb the downside and still recover.`);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <ExperimentsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
        Experiments
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Debate Lab
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Test both sides of a decision, argument, or belief. This lab helps users see stronger
        counterpoints, hidden assumptions, and a clearer conclusion.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Debate Input</div>

          <div className="mt-4 flex flex-wrap gap-3">
            {(["Balanced", "Critical", "Aggressive"] as Mode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                  mode === item
                    ? "border-white bg-white text-[#0B0F14]"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: Should I focus on exam preparation first or on building my startup project?"
            className="mt-5 min-h-[220px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={generateDebate}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Generate Debate
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Expected Output</div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Strongest Pro Side</div>
              <div className="mt-2 text-sm text-white/70">{pro}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Strongest Con Side</div>
              <div className="mt-2 text-sm text-white/70">{con}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Blind Spots</div>
              <div className="mt-2 text-sm text-white/70">{blind}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Recommendation</div>
              <div className="mt-2 text-sm text-white/70">{recommendation}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
