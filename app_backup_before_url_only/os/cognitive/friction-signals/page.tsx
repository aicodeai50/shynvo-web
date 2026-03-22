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

function getFrictionMeaning(value: string) {
  switch (value) {
    case "Low":
      return "Low means there are fewer signs of internal resistance interfering with clean execution right now.";
    case "Moderate":
      return "Moderate means resistance is present, but manageable. Structure and clarity will matter more than usual.";
    case "High":
      return "High means execution resistance is strongly present. Starting, sustaining, or completing work may feel unusually difficult.";
    default:
      return "No friction explanation is available yet.";
  }
}

function getFrictionImplication(value: string) {
  switch (value) {
    case "Low":
      return "Today, the main barrier is probably not internal resistance. A clear task may be enough to get moving.";
    case "Moderate":
      return "Today, you should simplify the task entry point so resistance does not expand into delay or avoidance.";
    case "High":
      return "Today, you should lower entry resistance as much as possible. Start with the smallest concrete action instead of forcing full intensity immediately.";
    default:
      return "No friction implication is available yet.";
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

      <h1 className="mt-4 text-3xl font-semibold">Friction Signals</h1>
      <p className="mt-3 max-w-3xl text-white/70">
        This page explains how much resistance may currently be interfering with clean execution.
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm text-white/60">Current Friction Signals</div>
          <div className="mt-3 text-4xl font-semibold text-white">
            {snapshot?.friction || "No reading yet"}
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
            {snapshot ? getFrictionMeaning(snapshot.friction) : "Run a mental check in Cognitive to generate a real friction reading."}
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
            {snapshot ? getFrictionImplication(snapshot.friction) : "No daily implication is available yet."}
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
