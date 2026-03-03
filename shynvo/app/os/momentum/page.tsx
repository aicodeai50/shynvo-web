'use client';

import React, { useEffect, useState } from 'react';
import { bumpMomentumOncePerDay, getMomentum } from '../_lib/osStore';

export default function MomentumPage() {
  const [streak, setStreak] = useState(0);
  const [last, setLast] = useState<string | null>(null);

  function refresh() {
    const m = getMomentum();
    setStreak(m.streakDays);
    setLast(m.lastUpdateDay);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Momentum</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Consistency Engine</h1>
          <p className="mt-2 text-sm text-white/70">
            Momentum increments once per day when you execute. Keep it sustainable.
          </p>
        </div>
        <div className="flex gap-2">
          <a href="/os/focus" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
            Focus
          </a>
          <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
            Cockpit
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold">Streak</div>
        <div className="mt-3 text-4xl font-semibold">{streak}<span className="text-white/60 text-base"> days</span></div>
        <div className="mt-2 text-sm text-white/70">Last update: {last ?? '—'}</div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => {
              bumpMomentumOncePerDay();
              refresh();
            }}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
          >
            Apply Daily Update
          </button>
          <a href="/os/logbook" className="rounded-xl px-5 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5 text-center">
            Logbook
          </a>
        </div>

        <div className="mt-4 text-xs text-white/60">
          Rule: consistency without burnout. Cognitive will later regulate pacing.
        </div>
      </div>
    </main>
  );
}
