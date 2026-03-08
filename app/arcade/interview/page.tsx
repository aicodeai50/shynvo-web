"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type QuestMode = "frontend" | "backend" | "product" | "general";

const questData = {
  frontend: {
    title: "Frontend Quest",
    level: "Level 1",
    meter: "75%",
    streak: "3 answers",
    placeholder: "Example: Act as an interviewer and ask me one frontend question at a time.",
  },
  backend: {
    title: "Backend Quest",
    level: "Level 2",
    meter: "68%",
    streak: "2 answers",
    placeholder: "Example: Ask me backend system design or API questions one by one.",
  },
  product: {
    title: "Product Quest",
    level: "Level 1",
    meter: "72%",
    streak: "4 answers",
    placeholder: "Example: Interview me for product thinking, prioritization, and roadmap judgment.",
  },
  general: {
    title: "General Quest",
    level: "Level 1",
    meter: "70%",
    streak: "1 answer",
    placeholder: "Example: Give me mixed interview questions and score my clarity.",
  },
} as const;

export default function InterviewQuestPage() {
  const [mode, setMode] = useState<QuestMode>("frontend");
  const [prompt, setPrompt] = useState("");
  const active = useMemo(() => questData[mode], [mode]);

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
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Interview Quest</h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Turn interview practice into a game-like quest with challenge modes and progression.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              ["frontend", "Frontend Quest"],
              ["backend", "Backend Quest"],
              ["product", "Product Quest"],
              ["general", "General Quest"],
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
            <label className="text-sm font-semibold text-white">Quest prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={active.placeholder}
              rows={7}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90">
              Start quest
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
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Quest status</div>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white font-semibold">{active.level}</div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Confidence meter</div>
              <div className="mt-1 text-white">{active.meter}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Response streak</div>
              <div className="mt-1 text-white">{active.streak}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
