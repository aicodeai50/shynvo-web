"use client";

import { useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";

type Scenario = "Academic" | "Career" | "Product" | "Life";

export default function SimulationPage() {
  const [scenario, setScenario] = useState<Scenario>("Academic");
  const [input, setInput] = useState("");
  const [pathA, setPathA] = useState("Waiting for simulation...");
  const [pathB, setPathB] = useState("Waiting for simulation...");
  const [risk, setRisk] = useState("Waiting for simulation...");
  const [move, setMove] = useState("Waiting for simulation...");

  function runSimulation() {
    const text = input.trim();
    if (!text) return;

    setPathA(`Likely Path A (${scenario}): proceed with the plan carefully and monitor results weekly.`);
    setPathB(`Likely Path B (${scenario}): reduce scope, preserve energy, and move in smaller steps.`);
    setRisk(`Risk Level: medium risk if assumptions are weak, lower risk if execution is structured.`);
    setMove(`Best Next Move: test one small version of "${text}" before making a full commitment.`);
  }

  return (
    <section className="py-10 sm:py-14">
      <ExperimentsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
        Experiments
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Simulation Lab
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Run what-if scenarios before taking action. This lab helps users explore possible outcomes,
        risks, and better next moves.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Scenario Input</div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["Academic", "Career", "Product", "Life"] as Scenario[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setScenario(item)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  scenario === item
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
            placeholder="Example: If I study 2 hours daily for 6 weeks, can I pass my exams and still keep building my app?"
            className="mt-5 min-h-[220px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={runSimulation}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Run Simulation
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Simulation Output</div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Likely Path A</div>
              <div className="mt-2 text-sm text-white/70">{pathA}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Likely Path B</div>
              <div className="mt-2 text-sm text-white/70">{pathB}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Risk Level</div>
              <div className="mt-2 text-sm text-white/70">{risk}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Best Next Move</div>
              <div className="mt-2 text-sm text-white/70">{move}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
