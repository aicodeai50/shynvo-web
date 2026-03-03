'use client';

import React, { useEffect, useState } from 'react';
import { addMission, getMissions, setMissionStatus, setActiveMissionId, type Mission } from '../_lib/osStore';

export default function MissionsPage() {
  const [title, setTitle] = useState('');
  const [missions, setMissionsState] = useState<Mission[]>([]);

  function refresh() {
    setMissionsState(getMissions());
  }

  useEffect(() => {
    refresh();
  }, []);

  function create() {
    const t = title.trim();
    if (!t) return;
    addMission(t);
    setTitle('');
    refresh();
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Missions</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Quest Engine</h1>
          <p className="mt-2 text-sm text-white/70">
            Convert objectives into missions. Select one active mission to propagate into Timeline and Focus.
          </p>
        </div>
        <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
          Back to Cockpit
        </a>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm font-semibold">Create mission</div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Build OS core flow"
            className="w-full rounded-xl border border-white/10 bg-[#070A0F]/40 px-3 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
            onKeyDown={(e) => e.key === 'Enter' && create()}
          />
          <button
            onClick={create}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
          >
            Create
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {missions.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
            No missions yet. Create one to activate the OS flow.
          </div>
        ) : (
          missions.map((m) => (
            <div key={m.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-base font-semibold">{m.title}</div>
                  <div className="mt-1 text-xs text-white/60">
                    Status: {m.status} • Created {new Date(m.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setActiveMissionId(m.id);
                      refresh();
                    }}
                    className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5"
                  >
                    Set Active
                  </button>
                  {m.status !== 'done' ? (
                    <button
                      onClick={() => {
                        setMissionStatus(m.id, 'done');
                        refresh();
                      }}
                      className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5"
                    >
                      Mark Done
                    </button>
                  ) : null}
                  <a
                    href="/os/timeline"
                    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
                  >
                    View in Timeline
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
