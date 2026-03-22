"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AssistantPanel from "@/components/assistant/AssistantPanel";

type Mode = "Tutor" | "Interviewer" | "Analyst" | "Builder" | "Support";
const MODES: Mode[] = ["Tutor", "Interviewer", "Analyst", "Builder", "Support"];

function normalizeMode(v: string | null): Mode {
  if (!v) return "Tutor";
  const x = v.toLowerCase().trim();
  if (x === "tutor") return "Tutor";
  if (x === "interviewer") return "Interviewer";
  if (x === "analyst") return "Analyst";
  if (x === "builder") return "Builder";
  if (x === "support") return "Support";
  return "Tutor";
}

export default function SplitView() {
  const [mode, setMode] = useState<Mode>("Tutor");

  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get("mode");
    setMode(normalizeMode(m));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div>
            <div className="text-sm font-extrabold">Split View</div>
            <div className="text-xs text-white/60">
              Robot + Shynvo SH Assistant AI
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={[
                  "rounded-xl border px-3 py-2 text-xs font-extrabold transition",
                  m === mode
                    ? "border-white/20 bg-white/10"
                    : "border-white/10 bg-black/30 hover:bg-white/5",
                ].join(" ")}
              >
                {m}
              </button>
            ))}

            <Link
              href={`/assistant?mode=${encodeURIComponent(mode)}`}
              className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
              title="Open assistant full screen"
            >
              Assistant fullscreen
            </Link>
          </div>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Left: Robot panel placeholder (safe for now) */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Robot panel
            </div>
            <div className="mt-2 text-sm text-white/75">
              Next: we mount your cinematic Robot component here (no rewrite).
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/robot"
                className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-white/5"
              >
                Open Robot fullscreen
              </Link>

              <Link
                href={`/assistant?mode=${encodeURIComponent(mode)}`}
                className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-white/5"
              >
                Open Assistant fullscreen
              </Link>

              <Link
                href={`/split?mode=${encodeURIComponent(mode)}`}
                className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm font-semibold hover:bg-white/5"
                title="Refresh split with this mode"
              >
                Sync mode
              </Link>
            </div>

            <div className="mt-4 text-xs text-white/50">
              Mode synced:{" "}
              <span className="text-white/80 font-semibold">{mode}</span>
            </div>
          </div>

          {/* Right: Assistant embedded */}
          <div className="flex justify-center">
            <AssistantPanel />
          </div>
        </div>
      </div>
    </div>
  );
}