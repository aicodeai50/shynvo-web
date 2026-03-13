"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CognitiveSnapshot = {
  focusState: string;
  recovery: string;
  friction: string;
  summary: string;
  recommendation: string;
  intensity: string;
  note: string;
};

const STORAGE_KEY = "shynvo_os_cognitive_snapshot";

export default function Page() {
  const [snapshot, setSnapshot] = useState<CognitiveSnapshot | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSnapshot(JSON.parse(raw) as CognitiveSnapshot);
    } catch {
      // ignore storage issues
    }
  }, []);

  return (
    <section className="py-10 sm:py-14">
      <Link href="/os/cognitive" className="text-sm text-white/70 hover:text-white">
        ← Back to Cognitive
      </Link>

      <h1 className="mt-4 text-3xl font-semibold">Focus State</h1>
      <p className="mt-3 max-w-3xl text-white/70">
        Focus State describes the current stability of attention and execution readiness.
      </p>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm text-white/60">Current Focus State</div>
        <div className="mt-3 text-4xl font-semibold text-white">
          {snapshot?.focusState || "No reading yet"}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
          {snapshot
            ? `From the latest mental check, your focus state is ${snapshot.focusState}. ${snapshot.summary}`
            : "Run a mental check in Cognitive to generate a real state reading."}
        </div>
      </div>
    </section>
  );
}
