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

function getFocusMeaning(value: string) {
  switch (value) {
    case "Stable":
      return "Stable means your attention can hold together well enough for meaningful work. Your mind is currently in a workable condition for structured execution.";
    case "Scattered":
      return "Scattered means your attention is present, but it is not settling cleanly. You may keep drifting, restarting, or finding it hard to enter the task properly.";
    case "Unstable":
      return "Unstable means your attention is weakened and may not stay steady under pressure. Work may still be possible, but concentration can break more easily.";
    case "Fragile":
      return "Fragile means your focus system is currently weak. Deep work may collapse quickly, and forcing heavy effort may increase strain instead of progress.";
    default:
      return "No focus explanation is available yet.";
  }
}

function getFocusImplication(value: string) {
  switch (value) {
    case "Stable":
      return "Today, you can likely handle a proper focused work block if the task is clear.";
    case "Scattered":
      return "Today, you should reduce entry resistance and begin with a smaller, clearer task instead of forcing a long session immediately.";
    case "Unstable":
      return "Today, you should work with structure and caution. Avoid too many priorities or mentally heavy switching.";
    case "Fragile":
      return "Today, you should avoid demanding deep work unless absolutely necessary. Protect stability first.";
    default:
      return "No focus implication is available yet.";
  }
}

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
        This page explains how stable your attention currently is and what that means for work right now.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Current Focus State</div>
          <div className="mt-3 text-4xl font-semibold text-white">
            {snapshot?.focusState || "No reading yet"}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">What you said</div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/80">
            {snapshot?.note || "No mental check recorded yet."}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">What this level means</div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/80">
            {snapshot ? getFocusMeaning(snapshot.focusState) : "Run a mental check in Cognitive to generate a real reading."}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Why Cognitive gave this result</div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/80">
            {snapshot ? snapshot.summary : "No interpretation is available yet."}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">What this means for today</div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/80">
            {snapshot ? getFocusImplication(snapshot.focusState) : "No daily implication is available yet."}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Recommended next move</div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/80">
            {snapshot ? snapshot.recommendation : "No recommendation is available yet."}
          </div>
        </div>
      </div>
    </section>
  );
}
