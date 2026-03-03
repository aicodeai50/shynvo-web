'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  addMission,
  addLogEntry,
  bumpMomentumOncePerDay,
  getActiveMission,
  getFocus,
  getLogbook,
  getMissions,
  getMomentum,
  setFocus,
  getRobotEnabled,
  setRobotEnabled,
} from './_lib/osStore';

type Sector = {
  name: string;
  label: string;
  stat: () => string;
  href: string;
  desc: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function OSCockpit() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 800);
    return () => clearInterval(t);
  }, []);

  const snapshot = useMemo(() => {
    const missions = getMissions();
    const active = getActiveMission();
    const focus = getFocus();
    const momentum = getMomentum();
    const logbook = getLogbook();

    const running = focus.running && focus.startedAt ? true : false;
    const remaining = (() => {
      if (!running || !focus.startedAt) return null;
      const elapsedMs = Date.now() - focus.startedAt;
      const totalMs = focus.durationMin * 60_000;
      const leftMs = Math.max(0, totalMs - elapsedMs);
      const mm = Math.floor(leftMs / 60_000);
      const ss = Math.floor((leftMs % 60_000) / 1000);
      return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    })();

    return {
      missionsActive: missions.filter((m) => m.status === 'active').length,
      missionsTotal: missions.length,
      activeMissionTitle: active?.title ?? 'None selected',
      focusRunning: running,
      focusRemaining: remaining ?? '—',
      momentumStreak: momentum.streakDays,
      logbookCount: logbook.length,
    };
  }, [tick]);

  const sectors: Sector[] = useMemo(
    () => [
      {
        name: 'Orbital Nexus',
        label: 'System Brain',
        href: '/os/orbital-nexus',
        stat: () => `${snapshot.missionsActive} active missions`,
        desc: 'Global dashboard and orchestration overview.',
      },
      {
        name: 'Missions',
        label: 'Quest Engine',
        href: '/os/missions',
        stat: () => `${snapshot.missionsTotal} total`,
        desc: 'Turn goals into structured missions and steps.',
      },
      {
        name: 'Timeline',
        label: 'Chronochart',
        href: '/os/timeline',
        stat: () => (snapshot.activeMissionTitle === 'None selected' ? 'No active mission' : 'Active mission loaded'),
        desc: 'Time dimension: checkpoints and mission nodes.',
      },
      {
        name: 'Focus',
        label: 'Execution Loops',
        href: '/os/focus',
        stat: () => (snapshot.focusRunning ? `Running • ${snapshot.focusRemaining}` : 'Idle'),
        desc: 'Run real-time sessions and execution loops.',
      },
      {
        name: 'Momentum',
        label: 'Consistency Engine',
        href: '/os/momentum',
        stat: () => `Streak • ${snapshot.momentumStreak}d`,
        desc: 'Track streaks and adaptive consistency systems.',
      },
      {
        name: 'Logbook',
        label: 'Memory Engine',
        href: '/os/logbook',
        stat: () => `${snapshot.logbookCount} entries`,
        desc: 'Narrative memory and structured reflections.',
      },
      {
        name: 'Cognitive',
        label: 'Energy + Recovery',
        href: '/os/cognitive',
        stat: () => 'Recovery ready',
        desc: 'Energy rhythms and burnout protection rules.',
      },
      {
        name: 'Trajectory',
        label: 'Macro Planning',
        href: '/os/trajectory',
        stat: () => '90-day arc',
        desc: 'Long-term arcs and phase-based planning.',
      },
      {
        name: 'Robots',
        label: 'AI Hangar',
        href: '/os/robots',
        stat: () => 'Agents available',
        desc: 'Scoped AI workers for defined tasks.',
      },
      {
        name: 'AI Council',
        label: 'Decision Room',
        href: '/os/council',
        stat: () => 'Debate ready',
        desc: 'Multi-agent reasoning for major decisions.',
      },
      {
        name: 'Terminal',
        label: 'Command Layer',
        href: '/os/terminal',
        stat: () => 'Commands online',
        desc: 'Fast navigation + automation macros.',
      },
    ],
    [snapshot]
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Shynvo OS</div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Dimensional Execution Cockpit</h1>
        <p className="max-w-3xl text-sm leading-6 text-white/70 sm:text-base">
          Operate missions, time, focus, momentum, memory, and agents as separate AI virtual machines.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <section className="lg:col-span-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Sectors</div>
                <div className="text-xs text-white/60">Each sector is a VM with its own logic.</div>
              </div>
              <a
                href="/os/terminal"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
              >
                Open Terminal
              </a>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {sectors.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className={cx(
                    'group block rounded-2xl border border-white/10 bg-[#070A0F]/30 p-4 transition',
                    'hover:bg-white/5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{s.name}</div>
                      <div className="mt-0.5 text-xs text-white/60">{s.label}</div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                      {s.stat()}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/70">{s.desc}</p>
                  <div className="mt-3 text-sm font-semibold text-white/85 group-hover:text-white">Enter</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4 space-y-4">
          <QuickActions />
          <AssistantPanel />
          <RobotBay />
        </aside>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm font-semibold">Core Flow</div>
        <p className="mt-2 text-sm text-white/70">This OS is built around a real execution chain:</p>
        <div className="mt-3 grid gap-3 md:grid-cols-5">
          {[
            { a: 'Missions', b: 'Create mission', href: '/os/missions' },
            { a: 'Timeline', b: 'See mission node', href: '/os/timeline' },
            { a: 'Focus', b: 'Start loop', href: '/os/focus' },
            { a: 'Momentum', b: 'Update streak', href: '/os/momentum' },
            { a: 'Logbook', b: 'Write entry', href: '/os/logbook' },
          ].map((x) => (
            <a
              key={x.a}
              href={x.href}
              className="rounded-2xl border border-white/10 bg-[#070A0F]/30 p-4 hover:bg-white/5"
            >
              <div className="text-xs font-semibold text-white/60">{x.a}</div>
              <div className="mt-1 text-sm font-semibold">{x.b}</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

function QuickActions() {
  const [title, setTitle] = useState('');

  function createQuickMission() {
    const t = title.trim();
    if (!t) return;
    addMission(t);
    addLogEntry(`Mission created: ${t}`);
    setTitle('');
  }

  function startQuickFocus() {
    const f = getFocus();
    if (f.running) return;
    setFocus({ ...f, running: true, startedAt: Date.now() });
    bumpMomentumOncePerDay();
    addLogEntry('Focus started.');
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-semibold">Quick Actions</div>
      <div className="mt-3 space-y-3">
        <div>
          <div className="text-xs text-white/60">Create mission</div>
          <div className="mt-2 flex gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Pass AI exam"
              className="w-full rounded-xl border border-white/10 bg-[#070A0F]/40 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
            />
            <button
              onClick={createQuickMission}
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
            >
              Create
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href="/os/missions"
            className="w-full rounded-xl px-4 py-2 text-center text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5"
          >
            Missions
          </a>
          <button
            onClick={startQuickFocus}
            className="w-full rounded-xl px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/5"
          >
            Start Focus
          </button>
        </div>
      </div>
    </div>
  );
}

function AssistantPanel() {
  const [q, setQ] = useState('');
  const [a, setA] = useState('System online. Ask about sectors, trial, or where to execute a workflow.');

  function answer(text: string) {
    const t = text.trim().toLowerCase();

    if (/mission/.test(t)) return 'Use Missions to create a quest. Then confirm it appears in Timeline.';
    if (/timeline|schedule|time/.test(t)) return 'Timeline shows mission nodes and checkpoints. Keep one active mission selected.';
    if (/focus|pomodoro|loop/.test(t)) return 'Start Focus to run an execution loop. Completion updates Momentum and Logbook.';
    if (/momentum|streak/.test(t)) return 'Momentum tracks consistency. It increments once per day when you execute.';
    if (/logbook|memory/.test(t)) return 'Logbook stores narrative entries. Use it after each focus cycle.';
    if (/terminal/.test(t)) return 'Terminal is the command layer. Use /missions, /focus start, /log "text".';
    if (/trial|30/.test(t)) return 'Starter Access runs 30 days. Upgrade is required to keep operating the OS.';
    return 'State your objective in one sentence. I will route you to the correct sector.';
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">SH Assistant</div>
          <div className="text-xs text-white/60">Navigator AI • concise responses</div>
        </div>
        <a href="/os/terminal" className="text-xs text-white/70 hover:text-white">
          Open Terminal
        </a>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A0F]/40 p-4 text-sm text-white/80">{a}</div>

      <div className="mt-3 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask a quick OS question..."
          className="w-full rounded-xl border border-white/10 bg-[#070A0F]/40 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setA(answer(q));
              setQ('');
            }
          }}
        />
        <button
          onClick={() => {
            setA(answer(q));
            setQ('');
          }}
          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#070A0F] hover:bg-white/90"
        >
          Send
        </button>
      </div>
    </div>
  );
}

function RobotBay() {
  const [enabled, setEnabledState] = useState(false);

  useEffect(() => {
    setEnabledState(getRobotEnabled());
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabledState(next);
    setRobotEnabled(next);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Robot Bay</div>
          <div className="text-xs text-white/60">OS-only • animated • user-controlled</div>
        </div>

        <button onClick={toggle} className="rounded-xl px-3 py-2 text-xs font-semibold ring-1 ring-white/15 hover:bg-white/5">
          {enabled ? 'Robot: ON' : 'Robot: OFF'}
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A0F]/40 p-4">
        {enabled ? <AnimatedRobot /> : <div className="text-sm text-white/70">Robot offline.</div>}
      </div>

      <div className="mt-3 text-sm text-white/70">Robot activates during Focus loops, Council sessions, and terminal macros.</div>
    </div>
  );
}

function AnimatedRobot() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <rect x="50" y="40" width="100" height="90" rx="18" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)" />
          <rect x="65" y="65" width="70" height="30" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
          <circle cx="85" cy="80" r="6" className="robot-eye" fill="rgba(255,255,255,0.85)" />
          <circle cx="115" cy="80" r="6" className="robot-eye" fill="rgba(255,255,255,0.85)" />

          <line x1="100" y1="40" x2="100" y2="25" stroke="rgba(255,255,255,0.35)" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="20" r="6" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.25)" />

          <g className="robot-arm">
            <rect x="140" y="90" width="28" height="10" rx="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" />
            <rect x="162" y="82" width="10" height="26" rx="5" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" />
          </g>
        </svg>
      </div>

      <div>
        <div className="text-sm font-semibold">Unit online</div>
        <div className="text-xs text-white/60">Blink + wave animation active.</div>
      </div>

      <style jsx>{`
        .robot-eye {
          animation: blink 4.2s infinite;
          transform-origin: center;
        }
        .robot-arm {
          transform-origin: 150px 95px;
          animation: wave 2.2s infinite ease-in-out;
        }
        @keyframes blink {
          0%,
          92%,
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
          94% {
            transform: scaleY(0.1);
            opacity: 0.7;
          }
          96% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-18deg);
          }
        }
      `}</style>
    </div>
  );
}
