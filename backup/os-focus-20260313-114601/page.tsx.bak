"use client";

import { useState } from "react";
import OsNav from "@/components/os/OsNav";

export default function FocusPage() {
  const [started, setStarted] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Ready to start");

  function startSession() {
    setStarted(true);
    setStatus("Focus session active");
  }

  function finishSession() {
    setStarted(false);
    setStatus("Focus session completed");
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Focus
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Focus runs execution sessions. This is where users enter deep work, guided practice, and
        active mission blocks.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Session
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            {status}
          </h2>

          <p className="mt-3 text-sm text-white/70">
            Next block: 45-minute focused execution window
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startSession}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
            >
              Start Focus Session
            </button>

            <button
              type="button"
              onClick={finishSession}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Finish Session
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Guidance
          </div>

          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => setNotes("Use one mission at a time")}
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              Use one mission at a time
            </button>

            <button
              type="button"
              onClick={() => setNotes("Keep sessions measurable")}
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              Keep sessions measurable
            </button>

            <button
              type="button"
              onClick={() => setNotes("Log outcome after completion")}
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              Log outcome after completion
            </button>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[110px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
              placeholder="Write session notes or execution intention..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
