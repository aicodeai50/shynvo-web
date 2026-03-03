'use client';

import React, { useEffect, useState } from 'react';
import { getActiveMission, getMissions, type Mission } from '../_lib/osStore';

export default function TimelinePage() {
  const [active, setActive] = useState<Mission | null>(null);
  const [count, setCount] = useState(0);

  function refresh() {
    setActive(getActiveMission());
    setCount(getMissions().length);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Timeline</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Chronochart</h1>
          <p className="mt-2 text-sm text-white/70">
            The time dimension of the OS. Missions appear as nodes and checkpoints.
          </p>
        </div>
        <div className="flex gap-2">
          <a href="/os/missions" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
            Missions
          </a>
          <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
            Cockpit
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold">Active Mission Node</div>
        <div className="mt-2 text-sm text-white/70">
          {active ? (
            <>
              <span className="text-white/90 font-semibold">{active.title}</span>
              <span className="text-white/60"> • loaded into OS</span>
            </>
          ) : (
            <>
              No active mission selected. Go to <a className="underline" href="/os/missions">Missions</a> and set one active.
            </>
          )}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#070A0F]/40 p-4">
            <div className="text-xs font-semibold text-white/60">Past</div>
            <div className="mt-1 text-sm text-white/80">Logs & completed loops</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#070A0F]/40 p-4">
            <div className="text-xs font-semibold text-white/60">Present</div>
            <div className="mt-1 text-sm text-white/80">Focus session execution</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#070A0F]/40 p-4">
            <div className="text-xs font-semibold text-white/60">Future</div>
            <div className="mt-1 text-sm text-white/80">Checkpoints & trajectory</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-white/60">Missions in system: {count}</div>
          <a
            href="/os/focus"
            className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-[#070A0F] hover:bg-white/90"
          >
            Start Focus Loop
          </a>
        </div>
      </div>
    </main>
  );
}
