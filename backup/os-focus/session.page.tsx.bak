"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function Page() {
  const [session, setSession] = useState<FocusDraft | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSession(JSON.parse(raw) as FocusDraft);
      }
    } catch {
      // ignore storage issues
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) {
    return (
      <section className="py-10 sm:py-14">
        <div className="text-white/70">Loading focus session...</div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="py-10 sm:py-14">
        <Link href="/os/focus" className="text-sm text-white/70 hover:text-white">
          ← Back to Focus
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">Focus Session</h1>
        <p className="mt-3 text-white/70">
          No active focus session found yet. Configure one in Focus first.
        </p>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <Link href="/os/focus" className="text-sm text-white/70 hover:text-white">
        ← Back to Focus
      </Link>

      <h1 className="mt-4 text-3xl font-semibold">Focus Session</h1>
      <p className="mt-3 max-w-3xl text-white/70">
        This room is the live execution view of your current focus block. Keep one task clear,
        protect the work window, and finish with evidence.
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
            Live Session
          </div>

          <div className="mt-3 text-4xl font-semibold text-white">
            {formatTime(session.remainingSeconds)}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Status
            </div>
            <div className="mt-1 text-lg font-semibold text-white">
              {session.status}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Session Length
            </div>
            <div className="mt-1 text-lg font-semibold text-white">
              {session.durationMinutes} minutes
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
            Execution Brief
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Focus Title
            </div>
            <div className="mt-1 text-white">{session.title || "Untitled session"}</div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Intention
            </div>
            <div className="mt-1 whitespace-pre-wrap text-white/80">
              {session.intention || "No intention written yet."}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Notes
            </div>
            <div className="mt-1 whitespace-pre-wrap text-white/80">
              {session.notes || "No notes written yet."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
