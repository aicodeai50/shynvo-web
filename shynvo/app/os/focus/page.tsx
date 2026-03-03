'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { addLogEntry, bumpMomentumOncePerDay, getActiveMission, getFocus, setFocus } from '../_lib/osStore';

export default function FocusPage() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 800);
    return () => clearInterval(t);
  }, []);

  const active = useMemo(() => getActiveMission(), [tick]);
  const focus = useMemo(() => getFocus(), [tick]);

  const remaining = useMemo(() => {
    if (!focus.running || !focus.startedAt) return '—';
    const elapsedMs = Date.now() - focus.startedAt;
    const totalMs = focus.durationMin * 60_000;
    const leftMs = Math.max(0, totalMs - elapsedMs);
    const mm = Math.floor(leftMs / 60_000);
    const ss = Math.floor((leftMs % 60_000) / 1000);
    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }, [focus.running, focus.startedAt, focus.durationMin, tick]);

  function start() {
    const f = getFocus();
    if (f.running) return;
    setFocus({ ...f, running: true, startedAt: Date.now() });
    bumpMomentumOncePerDay();
    addLogEntry(`Focus started${active ? ` on: ${active.title}` : ''}.`);
    setTick((x) => x + 1);
  }

  function stop() {
    const f = getFocus();
    if (!f.running) return;
    setFocus({ ...f, running: false, startedAt: null });
    addLogEntry('Focus stopped.');
    setTick((x) => x + 1);
  }

  function complete() {
    const f = getFocus();
    setFocus({ ...f, running: false, startedAt: null });
    bumpMomentumOncePerDay();
    addLogEntry(`Focus completed${active ? ` on: ${active.title}` : ''}.`);
    setTick((x) => x + 1);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Focus</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Execution Loops</h1>
          <p className="mt-2 text-sm text-white/70">
            Run a real-time loop. Completion updates Momentum and writes to Logbook.
          </p>
        </div>
        <div className="flex gap-2">
          <a href="/os/timeline" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
            Timeline
          </a>
          <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
            Cockpit
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <section className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Session</div>
          <div className="mt-2 text-sm text-white/70">
            Active mission: <span className="text-white/85">{active?.title ?? 'None selected'}</span>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#070A0F]/40 p-6">
            <div className="text-xs font-semibold text-white/60">Status</div>
            <div className="mt-2 text-xl font-semibold">
              {focus.running ? 'Running' : 'Idle'} <span className="text-white/60 text-sm">• {remaining}</span>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={start}
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
              >
                Start
              </button>
              <button
                onClick={stop}
                className="rounded-xl px-5 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5"
              >
                Stop
              </button>
              <button
                onClick={complete}
                className="rounded-xl px-5 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5"
              >
                Complete Loop
              </button>
            </div>
          </div>

          <div className="mt-4 text-xs text-white/60">
            Operator rule: keep loops short and consistent. Log after execution.
          </div>
        </section>

        <aside className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Robot Interface</div>
          <div className="mt-2 text-sm text-white/70">
            Robot activates during focus execution. (Cinematic placeholder)
          </div>
          <div className="mt-4 h-44 rounded-2xl border border-white/10 bg-[radial-gradient(900px_240px_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="mt-4">
            <a href="/os/logbook" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#070A0F] hover:bg-white/90 inline-block">
              Write Log Entry
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
