"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OSShell from "@/components/os/OSShell";
import { OSCard } from "@/components/os/OSCard";

type Blocker = "confusion" | "distraction" | "unclearGoal" | "overwhelm";

const BLOCKERS: Array<{ key: Blocker; label: string; hint: string; icon: string }> = [
  { key: "confusion", label: "Confusion", hint: "You don't know what to do next.", icon: "í· " },
  { key: "distraction", label: "Distraction", hint: "You keep switching contexts.", icon: "í»°ï¸" },
  { key: "unclearGoal", label: "Unclear goal", hint: "The objective isn't precise.", icon: "í¾¯" },
  { key: "overwhelm", label: "Overwhelm", hint: "Too big, too many moving parts.", icon: "í¼Š" },
];

function fixesFor(active: Set<Blocker>) {
  const fixes: Array<{ title: string; detail: string; action: string }> = [];
  if (active.has("unclearGoal")) fixes.push({ title: "Define the win", detail: "One sentence outcome for the next 25 minutes.", action: "Set outcome" });
  if (active.has("confusion")) fixes.push({ title: "Generate next step", detail: "List 3 steps. Choose the smallest.", action: "Next step" });
  if (active.has("distraction")) fixes.push({ title: "Lock context", detail: "Close tabs + silence notifications for one session.", action: "Lock-in" });
  if (active.has("overwhelm")) fixes.push({ title: "Reduce scope 80%", detail: "Ship the smallest working slice.", action: "Reduce" });
  if (fixes.length === 0) fixes.push({ title: "Select blockers", detail: "Pick one or more blockers to get targeted fixes.", action: "Select" });
  return fixes;
}

export default function CognitiveFrictionPage() {
  const [selected, setSelected] = useState<Set<Blocker>>(new Set(["distraction"]));
  const fixes = useMemo(() => fixesFor(selected), [selected]);

  const toggle = (key: Blocker) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <OSShell title="Cognitive / Friction" subtitle="Identify blockers and apply quick fixes." chips={["online", `blockers: ${selected.size}/4`, "protocol: quick-fix", "sync: idle"]}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Blocker scan</div>
          <div className="mt-4 space-y-2">
            {BLOCKERS.map((b) => {
              const on = selected.has(b.key);
              return (
                <button
                  key={b.key}
                  onClick={() => toggle(b.key)}
                  className={[
                    "w-full rounded-lg border px-3 py-3 text-left transition",
                    on ? "border-white/25 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-lg">{b.icon}</div>
                    <div>
                      <div className="text-sm text-white/90">{b.label}</div>
                      <div className="mt-1 text-xs text-white/60">{b.hint}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fixes.map((f, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-black/30 p-4">
                <div className="text-xs uppercase tracking-widest text-white/60">Quick fix</div>
                <div className="mt-1 text-base text-white/90">{f.title}</div>
                <div className="mt-2 text-sm text-white/70">{f.detail}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">{f.action}</button>
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Save protocol</button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <OSCard title="Friction level" value={`${selected.size} / 4`} hint="selected blockers" icon="í³‰" />
            <OSCard title="Recommended next" value={selected.has("distraction") ? "Lock context" : "Define win"} hint="priority" icon="í·­" />
            <OSCard title="Session type" value={selected.has("overwhelm") ? "Micro-chunks" : "Single objective"} hint="mode" icon="í·±" />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Cross-links</div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/os/cognitive" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Back to hub</Link>
              <Link href="/os/cognitive/stuck" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Stuck</Link>
              <Link href="/os/cognitive/recovery" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Go to Recovery</Link>
              <Link href="/os/cognitive/energy" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Check Energy</Link>
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}
