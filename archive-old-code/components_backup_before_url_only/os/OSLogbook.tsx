"use client";

import { useEffect, useMemo, useState } from "react";

type Entry = { id: string; ts: number; text: string };
const KEY = "shynvo_os_logbook_v1";

function nowId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function OSLogbook({ title = "Logbook", bootEntry }: { title?: string; bootEntry?: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const parsed = raw ? (JSON.parse(raw) as Entry[]) : [];
      setEntries(Array.isArray(parsed) ? parsed : []);
    } catch {
      setEntries([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(entries));
    } catch {}
  }, [entries]);

  useEffect(() => {
    if (!bootEntry) return;
    if (entries.length === 0) setEntries([{ id: nowId(), ts: Date.now(), text: bootEntry }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootEntry]);

  const add = (text: string) => {
    const e: Entry = { id: nowId(), ts: Date.now(), text };
    setEntries((prev) => [e, ...prev].slice(0, 30));
  };

  const clear = () => setEntries([]);

  const quickActions = useMemo(
    () => [
      "Cadet initiated Energy Scan",
      "Friction protocol: blockers identified",
      "Recovery protocol executed",
      "Mission: next action locked",
    ],
    []
  );

  return (
    <aside className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60">{title}</div>
          <div className="mt-1 text-xs text-white/55">Narrative layer (local-only for now).</div>
        </div>

        <button onClick={clear} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/10">
          Clear
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {quickActions.map((q) => (
          <button
            key={q}
            onClick={() => add(q)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
          >
            + {q.split(":")[0]}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        {entries.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white/70">
            No entries yet. Trigger actions to generate a story trail.
          </div>
        ) : (
          entries.map((e) => (
            <div key={e.id} className="rounded-lg border border-white/10 bg-black/40 p-3">
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/55">{formatTime(e.ts)}</div>
                <span className="text-[10px] text-white/40">LOG</span>
              </div>
              <div className="mt-1 text-sm text-white/80">{e.text}</div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
