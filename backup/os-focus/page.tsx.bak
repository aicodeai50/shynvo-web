"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import OsNav from "@/components/os/OsNav";

type FocusStatus = "idle" | "running" | "paused" | "completed";

type FocusDraft = {
  title: string;
  intention: string;
  notes: string;
  durationMinutes: number;
  status: FocusStatus;
  startedAt: number | null;
  remainingSeconds: number;
};

const STORAGE_KEY = "shynvo_os_focus_session";

const PRESETS = [25, 45, 60, 90];

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}-minute focus block`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m focus block` : `${hours}h focus block`;
}

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function FocusPage() {
  const [title, setTitle] = useState("");
  const [intention, setIntention] = useState("");
  const [notes, setNotes] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [status, setStatus] = useState<FocusStatus>("idle");
  const [remainingSeconds, setRemainingSeconds] = useState(45 * 60);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as FocusDraft;
        setTitle(saved.title || "");
        setIntention(saved.intention || "");
        setNotes(saved.notes || "");
        setDurationMinutes(saved.durationMinutes || 45);
        setStatus(saved.status || "idle");
        setStartedAt(saved.startedAt ?? null);
        setRemainingSeconds(
          typeof saved.remainingSeconds === "number"
            ? saved.remainingSeconds
            : (saved.durationMinutes || 45) * 60
        );
      }
    } catch {
      // ignore storage read issues
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;

    const payload: FocusDraft = {
      title,
      intention,
      notes,
      durationMinutes,
      status,
      startedAt,
      remainingSeconds,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage write issues
    }
  }, [title, intention, notes, durationMinutes, status, startedAt, remainingSeconds, ready]);

  const sessionLabel = useMemo(() => {
    if (status === "running") return "Focus session active";
    if (status === "paused") return "Focus session paused";
    if (status === "completed") return "Focus session completed";
    return "Ready to start";
  }, [status]);

  function applyPreset(minutes: number) {
    if (status === "running") return;
    setDurationMinutes(minutes);
    setRemainingSeconds(minutes * 60);
  }

  function startSession() {
    if (status === "running") return;
    setStatus("running");
    setStartedAt(Date.now());
    if (remainingSeconds <= 0) {
      setRemainingSeconds(durationMinutes * 60);
    }
  }

  function pauseSession() {
    if (status !== "running") return;
    setStatus("paused");
  }

  function finishSession() {
    setStatus("completed");
    setRemainingSeconds(0);
  }

  function resetSession() {
    setStatus("idle");
    setStartedAt(null);
    setRemainingSeconds(durationMinutes * 60);
  }

  function clearAll() {
    setTitle("");
    setIntention("");
    setNotes("");
    setDurationMinutes(45);
    setStatus("idle");
    setStartedAt(null);
    setRemainingSeconds(45 * 60);
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
        Focus
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Focus is the execution room of Shynvo OS. It is where users enter deliberate work blocks,
        protect concentration, define one clear objective, and complete meaningful sessions with structure.
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
              Session Status
            </div>
            <div className="mt-2 text-lg font-semibold text-white">{sessionLabel}</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
              Current Block
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatDuration(durationMinutes)}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
              Remaining Time
            </div>
            <div className="mt-2 text-lg font-semibold text-white">
              {formatTime(remainingSeconds)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Session Design
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-white">Focus title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Finish calculus revision set"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-white">Execution intention</label>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="What exactly should be completed during this session?"
              className="mt-2 min-h-[110px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold text-white">Session length</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {PRESETS.map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  onClick={() => applyPreset(minutes)}
                  className={[
                    "rounded-full border px-3 py-2 text-sm transition",
                    durationMinutes === minutes
                      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-50"
                      : "border-white/10 bg-black/20 text-white/80 hover:bg-white/10",
                  ].join(" ")}
                >
                  {minutes}m
                </button>
              ))}
            </div>
          </div>

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
              onClick={pauseSession}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Pause
            </button>

            <button
              type="button"
              onClick={finishSession}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Finish
            </button>

            <button
              type="button"
              onClick={resetSession}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Reset
            </button>
          </div>

          <div className="mt-4">
            <Link
              href="/os/focus/session"
              className="inline-flex rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-400/15"
            >
              Open Live Focus Room
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            Session Guidance
          </div>

          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => setNotes("Use one mission at a time. Define success clearly before the block begins.")}
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              Use one mission at a time
            </button>

            <button
              type="button"
              onClick={() => setNotes("Keep the session measurable. Know exactly what done looks like.")}
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              Keep sessions measurable
            </button>

            <button
              type="button"
              onClick={() => setNotes("Log the outcome after completion so momentum turns into evidence and continuity.")}
              className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-sm text-white/80 transition hover:bg-white/10"
            >
              Log outcome after completion
            </button>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[150px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
              placeholder="Write session notes, distractions to ignore, or completion notes..."
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearAll}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              Clear Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
