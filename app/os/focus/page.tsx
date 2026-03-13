"use client";

import { useState } from "react";
import Link from "next/link";
import OsNav from "@/components/os/OsNav";

export default function FocusPage() {
  const [title, setTitle] = useState("");
  const [intention, setIntention] = useState("");
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState(45);
  const [status, setStatus] = useState("Ready to start");

  function startSession() {
    setStatus("Focus session active");
  }

  function finishSession() {
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
        Focus is the execution room of Shynvo OS. This is where you enter structured
        deep work sessions and complete meaningful progress.
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Focus Protocol</div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm text-white/70">
          <div>1. Choose one clear task</div>
          <div>2. Define session intention</div>
          <div>3. Start a focus block</div>
          <div>4. Work until completion</div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Session Setup
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            {status}
          </h2>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Session title (example: Finish calculus exercises)"
            className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <textarea
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Execution intention: what exactly should be completed?"
            className="mt-4 min-h-[120px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-4 flex gap-2 flex-wrap">
            {[25,45,60,90].map((m)=>(
              <button
                key={m}
                onClick={()=>setDuration(m)}
                className={`rounded-full px-4 py-2 text-sm border ${
                  duration===m
                    ? "border-emerald-300/40 bg-emerald-400/10"
                    : "border-white/10 bg-black/20 hover:bg-white/10"
                }`}
              >
                {m}m
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={startSession}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Start Focus Session
            </button>

            <button
              onClick={finishSession}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Finish Session
            </button>

            <Link
              href="/os/focus/session"
              className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-50 hover:bg-emerald-400/15"
            >
              Open Focus Room
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Session Notes
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write notes, distractions to ignore, or session reflections..."
            className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />
        </div>
      </div>
    </section>
  );
}
