"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OSShell from "@/components/os/OSShell";
import { OSCard } from "@/components/os/OSCard";

type StuckType = "Too big" | "Too vague" | "Too risky" | "No energy" | "No clarity";

const STUCK_TYPES: Array<{ key: StuckType; icon: string; hint: string }> = [
  { key: "Too big", icon: "í³¦", hint: "Task is massive and shapeless." },
  { key: "Too vague", icon: "í¼«ï¸", hint: "No clear next move." },
  { key: "Too risky", icon: "âš ï¸", hint: "Fear of wasting time or failing." },
  { key: "No energy", icon: "í´‹", hint: "Capacity is low." },
  { key: "No clarity", icon: "í·©", hint: "Missing info / direction." },
];

function nextSteps(stuck: StuckType, text: string): string[] {
  const base = text.trim() || "this";
  switch (stuck) {
    case "Too big":
      return [`Define the smallest shippable slice of ${base}.`, "Write a 3-bullet outline.", "Do a 10-minute ugly first pass."];
    case "Too vague":
      return ["Write the win: 'In 25 minutes, I will have ___.''", "Pick the first constraint you can decide now.", "Start with a placeholder and refine."];
    case "Too risky":
      return ["Run a cheap experiment for 15 minutes.", "Define the failure cost. Make it tiny.", "Ship a draft to yourself only."];
    case "No energy":
      return [`Switch to a 12-minute micro-session on ${base}.`, "Reduce scope by 80% and do one tiny action.", "Do Recovery then restart."];
    case "No clarity":
      return [`Write one clarifying question about ${base}.`, "List what you know vs what you need.", "Make an assumption and proceed (label it)."];
  }
}

export default function CognitiveStuckPage() {
  const [type, setType] = useState<StuckType>("Too vague");
  const [task, setTask] = useState<string>("draft the mission plan");
  const [picked, setPicked] = useState<string>("");

  const steps = useMemo(() => nextSteps(type, task), [type, task]);

  return (
    <OSShell title="Cognitive / Stuck" subtitle="Unstuck protocol: reduce scope, reframe, generate next step." chips={["online", `stuck: ${type.toLowerCase().replace(" ", "-")}`, picked ? "target: locked" : "target: none", "sync: idle"]}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Stuck scan</div>

          <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3">
            <div className="text-xs uppercase tracking-widest text-white/60">Current task</div>
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 outline-none"
            />
          </div>

          <div className="mt-4 space-y-2">
            {STUCK_TYPES.map((s) => {
              const on = type === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setType(s.key)}
                  className={[
                    "w-full rounded-lg border px-3 py-3 text-left transition",
                    on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-lg">{s.icon}</div>
                    <div>
                      <div className="text-sm text-white/90">{s.key}</div>
                      <div className="mt-1 text-xs text-white/60">{s.hint}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Next-step generator</div>
            <div className="mt-3 space-y-2">
              {steps.map((s) => {
                const on = picked === s;
                return (
                  <button
                    key={s}
                    onClick={() => setPicked(s)}
                    className={[
                      "w-full rounded-lg border px-3 py-3 text-left transition",
                      on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm text-white/85">{s}</div>
                      <span className="text-xs text-white/60">{on ? "selected" : "choose"}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {picked ? (
              <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3">
                <div className="text-xs uppercase tracking-widest text-white/60">Locked target</div>
                <div className="mt-2 text-sm text-white/85">{picked}</div>
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard title="Scope" value={type === "Too big" ? "Reduce 80%" : "Small slice"} hint="protocol" icon="âœ‚ï¸" />
            <OSCard title="Clarity" value={type === "No clarity" ? "Ask 1 question" : "Good enough"} hint="protocol" icon="í´Ž" />
            <OSCard title="Momentum" value={type === "No energy" ? "Micro-session" : "Commit 1 step"} hint="protocol" icon="íº€" />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Cross-links</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/os/cognitive" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Back to hub</Link>
              <Link href="/os/focus" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Execute in Focus</Link>
              <Link href="/os/cognitive/recovery" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Recovery</Link>
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}
