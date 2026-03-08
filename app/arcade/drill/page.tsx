"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type DrillMode = "logic" | "speed" | "focus" | "memory";

const modeData = {
  logic: {
    title: "Logic Drill",
    timer: "45 sec",
    multiplier: "x1.8",
    bonus: "Reasoning bonus",
    prompt: "Example: Give me a fast logic challenge about priorities, sequence, or hidden assumptions.",
  },
  speed: {
    title: "Speed Drill",
    timer: "20 sec",
    multiplier: "x2.4",
    bonus: "Reaction bonus",
    prompt: "Example: Give me a rapid pattern or short-answer challenge to solve under pressure.",
  },
  focus: {
    title: "Focus Drill",
    timer: "60 sec",
    multiplier: "x1.5",
    bonus: "Consistency bonus",
    prompt: "Example: Give me a task that requires attention, filtering, and careful response.",
  },
  memory: {
    title: "Memory Drill",
    timer: "30 sec",
    multiplier: "x1.7",
    bonus: "Recall bonus",
    prompt: "Example: Give me a challenge that tests working memory and sequence retention.",
  },
} as const;

export default function DrillArenaPage() {
  const [mode, setMode] = useState<DrillMode>("logic");
  const [prompt, setPrompt] = useState("");
  const active = useMemo(() => modeData[mode], [mode]);

  return (
    <section className="relative py-10 sm:py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_15%_10%,rgba(244,114,182,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_85%_18%,rgba(168,85,247,0.12),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href="/arcade" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">← Back</Link>
        <Link href="/" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">Home</Link>
        <span className="inline-flex items-center rounded-xl border border-pink-400/20 bg-pink-400/10 px-3 py-2 text-sm text-pink-100">Arcade Sim</span>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-200/70">Arcade Sim</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Drill Arena</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Practice through short challenge loops. Choose a mode, write a prompt, and simulate a skill run.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              ["logic", "Logic Drill"],
              ["speed", "Speed Drill"],
              ["focus", "Focus Drill"],
              ["memory", "Memory Drill"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  mode === value
                    ? "border-pink-300/30 bg-pink-400/15 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/10"
                }`}
              >
                <div className="text-sm font-semibold">{label}</div>
              </button>
            ))}
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-white">Challenge prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={active.prompt}
              rows={7}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90">
              Start drill
            </button>
            <button
              type="button"
              onClick={() => setPrompt("")}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Clear prompt
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Current mode</div>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">{active.title}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Round timer</div>
              <div className="mt-1 text-white">{active.timer}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Score multiplier</div>
              <div className="mt-1 text-white">{active.multiplier}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Accuracy bonus</div>
              <div className="mt-1 text-white">{active.bonus}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
