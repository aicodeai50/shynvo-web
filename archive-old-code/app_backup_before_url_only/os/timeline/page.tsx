"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import OsNav from "@/components/os/OsNav";

type TimelineSnapshot = {
  today: string;
  week: string;
  plan: string;
};

const STORAGE_KEY = "shynvo_os_timeline_snapshot";

export default function TimelinePage() {
  const [today, setToday] = useState("Mission review, 2 focus blocks, 1 log update");
  const [week, setWeek] = useState("Study sessions, project execution, review windows");
  const [plan, setPlan] = useState("Time allocation based on priority and effort");
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as TimelineSnapshot;
        setToday(saved.today || today);
        setWeek(saved.week || week);
        setPlan(saved.plan || plan);
      }
    } catch {
      // ignore
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ today, week, plan }));
    } catch {
      // ignore
    }
  }, [today, week, plan, ready]);

  const explanation = useMemo(
    () =>
      "Timeline is the scheduling layer of Shynvo OS. It turns goals and missions into realistic execution windows across today and this week.",
    []
  );

  function applyPlan() {
    if (!note.trim()) return;
    setToday(note.trim());
    setNote("");
  }

  function resetTimeline() {
    setToday("Mission review, 2 focus blocks, 1 log update");
    setWeek("Study sessions, project execution, review windows");
    setPlan("Time allocation based on priority and effort");
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Timeline
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        {explanation}
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">What this page is for</div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Decide what should happen today.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Structure this week into realistic work windows.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Keep a clear planning logic instead of random task switching.
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Link href="/os/timeline/today" className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 transition hover:bg-white/10">
          <div className="text-sm text-white/60">Today</div>
          <div className="mt-3 text-3xl font-semibold text-white">Today</div>
          <div className="mt-3 text-sm text-white/70">{today}</div>
        </Link>

        <Link href="/os/timeline/week" className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 transition hover:bg-white/10">
          <div className="text-sm text-white/60">This Week</div>
          <div className="mt-3 text-3xl font-semibold text-white">This Week</div>
          <div className="mt-3 text-sm text-white/70">{week}</div>
        </Link>

        <Link href="/os/timeline/logic" className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6 transition hover:bg-white/10">
          <div className="text-sm text-white/60">Planning Logic</div>
          <div className="mt-3 text-3xl font-semibold text-white">Planning</div>
          <div className="mt-3 text-sm text-white/70">{plan}</div>
        </Link>
      </div>

      <div className="mt-8 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Write next action</div>
        <p className="mt-2 text-sm leading-6 text-white/70">
          Add the most important next action you want to place into today’s execution window.
        </p>

        <div className="mt-3 flex gap-3">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Example: 7pm physics revision block"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
          />
          <button
            type="button"
            onClick={applyPlan}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Add
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setWeek("Execution week: 3 focus blocks, 2 reviews, 1 planning reset")}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10"
          >
            Set execution week
          </button>
          <button
            type="button"
            onClick={() => setPlan("Plan based on urgency, energy, mission depth, and realistic recovery")}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10"
          >
            Update planning logic
          </button>
          <button
            type="button"
            onClick={resetTimeline}
            className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/10"
          >
            Reset timeline
          </button>
        </div>
      </div>
    </section>
  );
}
