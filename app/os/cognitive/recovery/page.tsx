"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OSShell from "@/components/os/OSShell";
import { OSCard } from "@/components/os/OSCard";

type RecoveryMode = "Downshift" | "Rest Window" | "Reset";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function planFor(mode: RecoveryMode, minutes: number) {
  if (mode === "Downshift") {
    return {
      headline: "Downshift (fast reset)",
      steps: [
        "Stand + slow breath (60-90s)",
        "Hydrate + change posture",
        "Light exposure (2m)",
        "Return with one tiny objective",
      ],
      note: "Goal: restore controllability without losing the day.",
    };
  }
  if (mode === "Rest Window") {
    const length = clamp(minutes, 10, 60);
    return {
      headline: `Rest window (${length} min)`,
      steps: [
        "Eyes off screen (first 5m)",
        "Walk or lie down (no input)",
        "If mind races: jot 3 bullets then stop",
        "Restart with smaller scope",
      ],
      note: "Goal: real recovery, not doomscrolling.",
    };
  }
  return {
    headline: "Reset (clean reboot)",
    steps: [
      "Clear desk (60s)",
      "Write: 'What matters in 30 minutes?'",
      "Pick one deliverable",
      "Start timer + begin",
    ],
    note: "Goal: remove ambiguity and re-enter with a win condition.",
  };
}

export default function CognitiveRecoveryPage() {
  const [mode, setMode] = useState<RecoveryMode>("Downshift");
  const [restMinutes, setRestMinutes] = useState<number>(20);

  const plan = useMemo(() => planFor(mode, restMinutes), [mode, restMinutes]);

  return (
    <OSShell title="Cognitive / Recovery" subtitle="Downshift, rest window, and reset prompts." chips={["online", "module: recovery", `mode: ${mode.toLowerCase().replace(" ", "-")}`, "sync: paused"]}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Recovery mode</div>
          <div className="mt-3 space-y-2">
            {(["Downshift", "Rest Window", "Reset"] as RecoveryMode[]).map((m) => {
              const on = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={[
                    "w-full rounded-lg border px-3 py-3 text-left transition",
                    on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="text-sm text-white/90">{m}</div>
                </button>
              );
            })}
          </div>

          {mode === "Rest Window" && (
            <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-widest text-white/60">Rest length</div>
                <div className="text-xs text-white/60">{restMinutes} min</div>
              </div>
              <input className="mt-2 w-full accent-white" type="range" min={10} max={60} value={restMinutes} onChange={(e) => setRestMinutes(parseInt(e.target.value, 10))} />
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Protocol</div>
            <div className="mt-1 text-lg text-white/90">{plan.headline}</div>
            <div className="mt-2 text-sm text-white/70">{plan.note}</div>

            <div className="mt-4 space-y-2">
              {plan.steps.map((s, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/85">
                  {i + 1}. {s}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard title="Priority" value={mode === "Downshift" ? "Stabilize fast" : mode === "Rest Window" ? "Restore capacity" : "Re-enter clean"} hint="goal" icon="í·­" />
            <OSCard title="Input rule" value={mode === "Rest Window" ? "No feeds" : "Minimal"} hint="protect recovery" icon="í³µ" />
            <OSCard title="Restart" value="One tiny deliverable" hint="win condition" icon="âœ…" />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Cross-links</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/os/cognitive" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Back to hub</Link>
              <Link href="/os/cognitive/energy" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Re-check Energy</Link>
              <Link href="/os/focus" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Return to Focus</Link>
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}
