"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import OsNav from "@/components/os/OsNav";

const STORAGE_KEY = "shynvo_os_logbook_entries";

type LogEntry = {
  text: string;
  type: "focus-session" | "mission-review" | "weekly-reflection" | "general";
};

const STARTERS: Array<{ label: string; value: string; type: LogEntry["type"] }> = [
  {
    label: "Focus session",
    value: "Focus session completed • What was the task, what was finished, and what should happen next?",
    type: "focus-session",
  },
  {
    label: "Mission review",
    value: "Mission review • What progress was made, what is blocked, and what is the next milestone?",
    type: "mission-review",
  },
  {
    label: "Weekly reflection",
    value: "Weekly reflection • What worked this week, what did not work, and what should improve next week?",
    type: "weekly-reflection",
  },
];

export default function LogbookPage() {
  const [entry, setEntry] = useState("");
  const [entries, setEntries] = useState<LogEntry[]>([
    { text: "Focus session completed • 45 min", type: "focus-session" },
    { text: "Mission review saved • exam preparation", type: "mission-review" },
    { text: "Weekly reflection stored", type: "weekly-reflection" },
  ]);
  const [selectedType, setSelectedType] = useState<LogEntry["type"]>("general");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setEntries(JSON.parse(raw) as LogEntry[]);
      }
    } catch {
      // ignore storage issues
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore storage issues
    }
  }, [entries, ready]);

  const explanation = useMemo(
    () =>
      "Logbook is the memory layer of Shynvo OS. It records what happened in missions, focus sessions, and reflections so progress is not forgotten.",
    []
  );

  function saveEntry() {
    const text = entry.trim();
    if (!text) return;
    setEntries((prev) => [{ text, type: selectedType }, ...prev]);
    setEntry("");
    setSelectedType("general");
  }

  function useStarter(value: string, type: LogEntry["type"]) {
    setEntry(value);
    setSelectedType(type);
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Logbook
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        {explanation}
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">What this page is for</div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Record what happened in a session, mission, or reflection.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Keep progress visible so the user can learn from outcomes.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Build operational memory instead of starting from zero every day.
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xl font-semibold text-white">Recent Entries</div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/55">
              Memory archive
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {entries.length ? (
              entries.map((item, i) => {
                const href =
                  item.type === "focus-session"
                    ? "/os/logbook/focus-session"
                    : item.type === "mission-review"
                    ? "/os/logbook/mission-review"
                    : item.type === "weekly-reflection"
                    ? "/os/logbook/weekly-reflection"
                    : "/os/logbook";

                return (
                  <Link
                    key={`${item.type}-${i}`}
                    href={href}
                    className="block rounded-2xl border border-white/10 bg-black/20 p-4 text-white/80 transition hover:bg-white/10"
                  >
                    <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                      {item.type}
                    </div>
                    <div className="mt-2">{item.text}</div>
                  </Link>
                );
              })
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-white/70">
                No entries yet. Write your first log entry on the right.
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Write Log Entry</div>
          <p className="mt-2 text-sm leading-6 text-white/70">
            Write what happened, what was completed, what was learned, and what should happen next.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {STARTERS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => useStarter(item.value, item.type)}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
          </div>

          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write what happened in your mission, session, or reflection..."
            className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={saveEntry}
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
          >
            Save Entry
          </button>

          <div className="mt-5 text-sm leading-6 text-white/70">
            Good log entries answer three things: what happened, what it means, and what should happen next.
          </div>
        </div>
      </div>
    </section>
  );
}
