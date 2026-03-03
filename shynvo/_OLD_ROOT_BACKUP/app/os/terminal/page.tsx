'use client';

import React, { useMemo, useState } from 'react';
import { addMission, addLogEntry, bumpMomentumOncePerDay, getFocus, setFocus } from '../_lib/osStore';

type Line = { kind: 'in' | 'out'; text: string };

export default function TerminalPage() {
  const [cmd, setCmd] = useState('');
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'Terminal online. Type /help for commands.' },
  ]);

  const help = useMemo(
    () =>
      [
        '/help',
        '/os',
        '/missions',
        '/timeline',
        '/focus',
        '/momentum',
        '/logbook',
        '',
        '/missions new "title"',
        '/focus start',
        '/focus stop',
        '/momentum bump',
        '/log "text"',
      ].join('\n'),
    []
  );

  function out(text: string) {
    setLines((l) => [...l, { kind: 'out', text }]);
  }

  function run(raw: string) {
    const input = raw.trim();
    if (!input) return;

    setLines((l) => [...l, { kind: 'in', text: input }]);

    // Navigation commands
    const navMap: Record<string, string> = {
      '/os': '/os',
      '/missions': '/os/missions',
      '/timeline': '/os/timeline',
      '/focus': '/os/focus',
      '/momentum': '/os/momentum',
      '/logbook': '/os/logbook',
    };

    if (input === '/help') {
      out(help);
      return;
    }

    if (navMap[input]) {
      out(`Routing → ${navMap[input]}`);
      window.location.href = navMap[input];
      return;
    }

    // Actions
    if (input.startsWith('/missions new ')) {
      const title = input.replace('/missions new', '').trim().replace(/^"|"$/g, '');
      if (!title) return out('Missing title. Example: /missions new "Pass AI exam"');
      addMission(title);
      addLogEntry(`Mission created via Terminal: ${title}`);
      out('Mission created.');
      return;
    }

    if (input === '/focus start') {
      const f = getFocus();
      if (f.running) return out('Focus already running.');
      setFocus({ ...f, running: true, startedAt: Date.now() });
      bumpMomentumOncePerDay();
      addLogEntry('Focus started via Terminal.');
      out('Focus started.');
      return;
    }

    if (input === '/focus stop') {
      const f = getFocus();
      if (!f.running) return out('Focus is not running.');
      setFocus({ ...f, running: false, startedAt: null });
      addLogEntry('Focus stopped via Terminal.');
      out('Focus stopped.');
      return;
    }

    if (input === '/momentum bump') {
      bumpMomentumOncePerDay();
      out('Momentum updated.');
      return;
    }

    if (input.startsWith('/log ')) {
      const text = input.replace('/log', '').trim().replace(/^"|"$/g, '');
      if (!text) return out('Missing text. Example: /log "Completed 2 loops."');
      addLogEntry(text);
      out('Logbook entry saved.');
      return;
    }

    out('Unknown command. Type /help.');
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Terminal</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Command Layer</h1>
          <p className="mt-2 text-sm text-white/70">
            Fast routing and basic automation macros (frontend-first).
          </p>
        </div>
        <a href="/os" className="rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5">
          Cockpit
        </a>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="h-[50vh] overflow-auto rounded-2xl border border-white/10 bg-[#070A0F]/60 p-4">
          <div className="space-y-2">
            {lines.map((l, i) => (
              <div key={i} className={l.kind === 'in' ? 'text-white' : 'text-white/70'}>
                <span className="text-white/50">{l.kind === 'in' ? '> ' : ''}</span>
                <span className="whitespace-pre-wrap">{l.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder='Try: /missions new "Build Shynvo OS"'
            className="w-full rounded-xl border border-white/10 bg-[#070A0F]/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                run(cmd);
                setCmd('');
              }
            }}
          />
          <button
            onClick={() => {
              run(cmd);
              setCmd('');
            }}
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
          >
            Run
          </button>
        </div>

        <div className="mt-2 text-xs text-white/60">
          Power user layer. Keep commands short and deterministic.
        </div>
      </div>
    </main>
  );
}
