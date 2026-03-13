"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OsNav from "@/components/os/OsNav";

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

const EXAMPLES = [
  "I feel tired and overloaded.",
  "I feel depressed today.",
  "I am distracted and cannot settle into work.",
  "I feel clear, rested, and ready to execute.",
];

function analyzeMentalCheck(input: string): CognitiveSnapshot {
  const text = input.toLowerCase();

  const hasLowMood =
    text.includes("depressed") ||
    text.includes("hopeless") ||
    text.includes("empty") ||
    text.includes("sad");

  const hasExhaustion =
    text.includes("tired") ||
    text.includes("burnout") ||
    text.includes("exhaust") ||
    text.includes("drained") ||
    text.includes("fatigue") ||
    text.includes("overloaded");

  const hasStress =
    text.includes("stressed") ||
    text.includes("anxious") ||
    text.includes("pressure") ||
    text.includes("confused") ||
    text.includes("overwhelmed");

  const hasFriction =
    text.includes("distracted") ||
    text.includes("procrast") ||
    text.includes("avoid") ||
    text.includes("stuck") ||
    text.includes("can't focus") ||
    text.includes("cannot focus");

  const hasStrongReadiness =
    text.includes("clear") ||
    text.includes("ready") ||
    text.includes("focused") ||
    text.includes("calm") ||
    text.includes("rested");

  if (hasLowMood) {
    return {
      focusState: "Fragile",
      recovery: "Low",
      friction: "High",
      summary:
        "Your current state suggests emotional heaviness and reduced execution stability. This is not the best state for demanding intensity or pressure-heavy work.",
      recommendation:
        "Lower the work intensity today. Choose a small, safe, clearly finishable task. Reduce pressure, avoid harsh self-judgment, and prioritize recovery-supportive structure.",
      intensity: "Light mode recommended",
      note: input,
    };
  }

  if (hasExhaustion) {
    return {
      focusState: "Fragile",
      recovery: "Low",
      friction: "High",
      summary:
        "Your mental check suggests depleted energy and reduced recovery. Cognitive load is likely exceeding your current restoration level.",
      recommendation:
        "Use a shorter session, simplify expectations, and focus on one clearly bounded task. Recovery should be part of the plan, not something postponed indefinitely.",
      intensity: "Reduced intensity recommended",
      note: input,
    };
  }

  if (hasStress && hasFriction) {
    return {
      focusState: "Unstable",
      recovery: "Moderate",
      friction: "High",
      summary:
        "Your state suggests mental pressure combined with execution resistance. The issue may not be capability, but overload, friction, and unclear entry into the task.",
      recommendation:
        "Do not force a large session. First reduce ambiguity: choose one task, define the first 10-minute action, and begin with a smaller controlled work block.",
      intensity: "Moderate-light intensity recommended",
      note: input,
    };
  }

  if (hasStress) {
    return {
      focusState: "Unstable",
      recovery: "Moderate",
      friction: "Moderate",
      summary:
        "Your mental check suggests strain and internal pressure. You may still be able to work, but the system should avoid unnecessary intensity.",
      recommendation:
        "Keep today's workload structured and realistic. Work in one focused block at a time and avoid overloading the day with too many priorities.",
      intensity: "Moderate intensity recommended",
      note: input,
    };
  }

  if (hasFriction) {
    return {
      focusState: "Scattered",
      recovery: "Moderate",
      friction: "High",
      summary:
        "Your main issue appears to be execution friction rather than pure fatigue. Attention is present, but entry into meaningful work is unstable.",
      recommendation:
        "Lower entry resistance. Remove extra choices, define one target, and begin with the smallest concrete starting action possible.",
      intensity: "Moderate intensity recommended",
      note: input,
    };
  }

  if (hasStrongReadiness) {
    return {
      focusState: "Stable",
      recovery: "Strong",
      friction: "Low",
      summary:
        "Your current state suggests readiness for meaningful execution. Cognitive stability and recovery appear supportive of deeper work.",
      recommendation:
        "This is a good time for focused execution. Use a strong work block and direct this state toward one important mission.",
      intensity: "Deep work intensity available",
      note: input,
    };
  }

  return {
    focusState: "Stable",
    recovery: "Moderate",
    friction: "Low",
    summary:
      "Your state appears generally workable, though not deeply diagnosed from the current note alone. You likely have enough stability for structured progress.",
    recommendation:
      "Proceed with a clear task and measured session length. If resistance appears, reduce the scope and simplify the entry point.",
    intensity: "Standard intensity recommended",
    note: input,
  };
}

function saveSnapshot(snapshot: CognitiveSnapshot) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // ignore storage write issues
  }
}

export default function CognitivePage() {
  const [focusState, setFocusState] = useState("Stable");
  const [recovery, setRecovery] = useState("Moderate");
  const [friction, setFriction] = useState("Low");
  const [note, setNote] = useState("");
  const [analysis, setAnalysis] = useState(
    "No cognitive analysis yet. Write a mental check and Cognitive will assess your current execution condition."
  );

  const panelDescription = useMemo(
    () =>
      "Cognitive is the state-reading layer of Shynvo OS. It helps users understand execution readiness, mental load, recovery condition, and friction before forcing intensity.",
    []
  );

  function applyCheck(example?: string) {
    const text = (example ?? note).trim();
    if (!text) return;

    if (example) {
      setNote(example);
    }

    const result = analyzeMentalCheck(text);
    setFocusState(result.focusState);
    setRecovery(result.recovery);
    setFriction(result.friction);
    saveSnapshot(result);

    setAnalysis(
      [
        `Cognitive Reading`,
        ``,
        `Mental check: ${text}`,
        ``,
        `Focus State: ${result.focusState}`,
        `Recovery Level: ${result.recovery}`,
        `Friction Signals: ${result.friction}`,
        `Work Intensity: ${result.intensity}`,
        ``,
        `Interpretation`,
        `${result.summary}`,
        ``,
        `Recommended Next Move`,
        `${result.recommendation}`,
      ].join("\n")
    );
  }

  function clearAll() {
    setNote("");
    setFocusState("Stable");
    setRecovery("Moderate");
    setFriction("Low");
    setAnalysis(
      "No cognitive analysis yet. Write a mental check and Cognitive will assess your current execution condition."
    );
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage issues
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Cognitive
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        {panelDescription}
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">What this chamber does</div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Reads your current condition before work intensity is applied. It helps prevent forcing deep work in the wrong state.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Turns a simple mental check into a clearer view of focus stability, recovery condition, friction level, and recommended work intensity.
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Link
          href="/os/cognitive/focus-state"
          className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 transition hover:bg-white/10"
        >
          <div className="text-sm text-white/60">Focus State</div>
          <div className="mt-3 text-4xl font-semibold text-white">{focusState}</div>
        </Link>

        <Link
          href="/os/cognitive/recovery-level"
          className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 transition hover:bg-white/10"
        >
          <div className="text-sm text-white/60">Recovery Level</div>
          <div className="mt-3 text-4xl font-semibold text-white">{recovery}</div>
        </Link>

        <Link
          href="/os/cognitive/friction-signals"
          className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 transition hover:bg-white/10"
        >
          <div className="text-sm text-white/60">Friction Signals</div>
          <div className="mt-3 text-4xl font-semibold text-white">{friction}</div>
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Mental check</div>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Describe how your mind and energy feel right now. Cognitive will return a structured reading of your current execution condition.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => applyCheck(item)}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10"
              >
                {item}
              </button>
            ))}
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Describe your current state. Example: I feel tired and overloaded."
            className="mt-4 min-h-[160px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => applyCheck()}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Analyze State
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Cognitive Output</div>
          <pre className="mt-4 min-h-[160px] whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
            {analysis}
          </pre>
        </div>
      </div>
    </section>
  );
}
