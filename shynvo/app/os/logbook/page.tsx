'use client';

import React, { useEffect, useState } from 'react';
import { addLogEntry, getLogbook, type LogEntry } from '../_lib/osStore';

export default function LogbookPage() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState<LogEntry[]>([]);

  function refresh() {
    setEntries(getLogbook());
  }

  useEffect(() => {
    refresh();
  }, []);

  function add() {
    const t = text.trim();
    if (!t) return;
    addLogEntry(t);
    setText('');
    refresh();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Logbook</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Memory Engine</h1>
          <p className="mt-2 text-sm text-white/70">
            Record the narrative. Keep entries short, factual, and operational.
          </p>
        </div>
        <div className="flex gap-2">
          <a href="/os/momentum" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
            Momentum
          </a>
          <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
            Cockpit
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold">New entry</div>
        <div className="mt-3 flex flex-col gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What happened? What changed? What will you do next?"
            className="min-h-[110px] w-full rounded-2xl border border-white/10 bg-[#070A0F]/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <button
              onClick={add}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
            >
              Save Entry
            </button>
            <a href="/os/missions" className="rounded-xl px-5 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5 text-center">
              Missions
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {entries.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
            No entries yet. Log after your first focus loop.
          </div>
        ) : (
          entries.map((e) => (
            <div key={e.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs text-white/60">{new Date(e.createdAt).toLocaleString()}</div>
              <div className="mt-2 text-sm text-white/85 whitespace-pre-wrap">{e.text}</div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
