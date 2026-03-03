'use client';

import React, { useState } from 'react';

export default function Council() {
  const [q, setQ] = useState('');
  const [out, setOut] = useState<string | null>(null);

  function run() {
    const t = q.trim();
    if (!t) return;
    setOut(
      `Council result (preview):\n- Option A: proceed cautiously.\n- Option B: delay and strengthen prerequisites.\n- Risks: time cost, scope creep.\n- Recommendation: choose one measurable next action.`
    );
    setQ('');
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">AI Council</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Decision Room</h1>
          <p className="mt-2 text-sm text-white/70">
            Multi-agent debate and decision synthesis. (Preview scaffold)
          </p>
        </div>
        <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
          Cockpit
        </a>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold">Run a decision</div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask a decision question..."
            className="w-full rounded-xl border border-white/10 bg-[#070A0F]/40 px-3 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
            onKeyDown={(e) => e.key === 'Enter' && run()}
          />
          <button onClick={run} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#070A0F] hover:bg-white/90">
            Run
          </button>
        </div>

        {out ? (
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-[#070A0F]/40 p-4 text-sm text-white/80">
            {out}
          </pre>
        ) : null}
      </div>
    </main>
  );
}
