"use client";

import { useEffect, useMemo, useState } from "react";
import { OSCard } from "@/components/os/OSCard";

type Metric = { label: string; value: string; hint?: string };

export default function OSHUD({ title = "System Status HUD", seed = "default" }: { title?: string; seed?: string }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 3500);
    return () => clearInterval(t);
  }, []);

  const metrics = useMemo<Metric[]>(() => {
    const base = seed.length + tick;
    const reactor = 68 + ((base * 7) % 18);
    const latency = 120 + ((base * 13) % 160);
    const ingested = 24 + ((base * 5) % 60);
    const sync = ["idle", "staging", "locked", "drifting"][(base * 3) % 4];

    return [
      { label: "Reactor output", value: `${reactor}%`, hint: "power stable" },
      { label: "Knowledge ingested", value: `${ingested} units`, hint: "last 24h" },
      { label: "API latency", value: `${latency} ms`, hint: "simulated" },
      { label: "Sync state", value: sync, hint: "OS layer" },
    ];
  }, [seed, tick]);

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60">{title}</div>
          <div className="mt-1 text-sm text-white/80">Live-feel metrics (mock now → real later).</div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">status: online</span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
        {metrics.map((m) => (
          <OSCard key={m.label} title={m.label} value={m.value} hint={m.hint} className="bg-black/20" />
        ))}
      </div>
    </div>
  );
}
