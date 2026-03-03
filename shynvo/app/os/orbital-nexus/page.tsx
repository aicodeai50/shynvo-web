'use client';

import React, { useEffect, useState } from 'react';
import { getActiveMission, getMissions, getMomentum, getLogbook, getFocus } from '../_lib/osStore';

export default function OrbitalNexus() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1200);
    return () => clearInterval(t);
  }, []);

  const missions = getMissions();
  const active = getActiveMission();
  const momentum = getMomentum();
  const logbook = getLogbook();
  const focus = getFocus();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Orbital Nexus</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">System Brain</h1>
          <p className="mt-2 text-sm text-white/70">
            Global status and orchestration overview. This is the OS universe map.
          </p>
        </div>
        <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
          Cockpit
        </a>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <section className="lg:col-span-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Universe Status</div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <StatCard title="Active mission" value={active?.title ?? 'None'} />
            <StatCard title="Missions" value={`${missions.length} total`} />
            <StatCard title="Focus" value={focus.running ? 'Running' : 'Idle'} />
            <StatCard title="Momentum" value={`${momentum.streakDays} day streak`} />
            <StatCard title="Logbook" value={`${logbook.length} entries`} />
            <StatCard title="Tick" value={`Live • ${tick}`} />
          </div>
        </section>

        <aside className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Orchestration</div>
          <p className="mt-2 text-sm text-white/70">
            This module will later rebalance your day by coordinating Missions, Focus, and Cognitive.
          </p>
          <div className="mt-4 grid gap-2">
            <a href="/os/missions" className="rounded-xl px-4 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5 text-center">
              Open Missions
            </a>
            <a href="/os/focus" className="rounded-xl px-4 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5 text-center">
              Open Focus
            </a>
            <a href="/os/logbook" className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#070A0F] hover:bg-white/90 text-center">
              Open Logbook
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#070A0F]/40 p-4">
      <div className="text-xs font-semibold text-white/60">{title}</div>
      <div className="mt-1 text-sm font-semibold text-white/85">{value}</div>
    </div>
  );
}
