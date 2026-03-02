"use client";

import Link from "next/link";
import { useState } from "react";
import TerminalOverlay from "@/components/os/TerminalOverlay";
import RobotGuide from "@/components/os/RobotGuide";

const CARD =
  "group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl transition hover:bg-white/10";

function Glow({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-90"
      style={{
        background: `
          radial-gradient(900px circle at 20% 25%, ${a}, transparent 60%),
          radial-gradient(800px circle at 80% 30%, ${b}, transparent 55%),
          radial-gradient(1000px circle at 50% 95%, ${c}, transparent 60%)
        `,
      }}
    />
  );
}

const SECTORS = [
  { href: "/os", name: "OS Home", desc: "Main deck: system status + quick actions.", badge: "main deck" },
  { href: "/os/orbital-nexus", name: "Orbital Nexus", desc: "System dashboard: maps, modules, control.", badge: "new" },
  { href: "/os/missions", name: "Missions", desc: "Quest board: goals → steps → outcomes.", badge: "quest" },
  { href: "/os/timeline", name: "Timeline", desc: "Chronochart: milestones and decisions.", badge: "chronochart" },
  { href: "/os/logbook", name: "Logbook", desc: "Event memory: notes + retros + wins.", badge: "memory" },
  { href: "/os/cognitive", name: "Cognitive", desc: "Energy + friction + recovery protocols.", badge: "C" },
  { href: "/os/focus", name: "Focus", desc: "Execution loops: warm-up → lock-in → output.", badge: "B" },
  { href: "/os/momentum", name: "Momentum", desc: "Consistency engine: drills + reflection.", badge: "A/B" },
  { href: "/os/trajectory", name: "Trajectory", desc: "90-day mission control and planning.", badge: "D" },
  { href: "/os/robots", name: "Robots", desc: "Hangar: assistants + workflows.", badge: "hangar" },
  { href: "/os/ai-council", name: "AI Council", desc: "Multi-agent room: strategy and debate.", badge: "multi-agent" },
  { href: "/os/settings", name: "Settings", desc: "Profile, themes, language, access.", badge: "profile" },
];

export default function OSHomePage() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dimensional universe background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px circle at 12% 18%, rgba(34,211,238,0.20), transparent 55%),
              radial-gradient(1100px circle at 84% 22%, rgba(180,140,255,0.18), transparent 55%),
              radial-gradient(1200px circle at 50% 92%, rgba(163,230,53,0.12), transparent 60%),
              radial-gradient(900px circle at 50% 45%, rgba(255,255,255,0.05), transparent 55%),
              linear-gradient(180deg, rgba(2,6,23,0.68), rgba(0,0,0,0.95))
            `,
            filter: "saturate(1.2) contrast(1.08)",
          }}
        />

        {/* Stars */}
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:52px_52px]" />

        {/* Subtle scanlines */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(transparent_0px,rgba(255,255,255,0.08)_1px,transparent_2px)] [background-size:100%_6px]" />
      </div>

      {/* Robot guide overlay */}
      <RobotGuide />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs tracking-widest text-white/70">SHYNVO OS</div>
            <h1 className="mt-2 text-4xl font-semibold">Dimensional Cockpit</h1>
            <p className="mt-3 max-w-2xl text-white/70">
              A cinematic workspace for students, educators, and teams — missions, cognition, and tools,
              all connected by a command layer.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">online</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">deck: os-home</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">signal: ready</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">sync: idle</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">zone: home</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
            >
              Home →
            </Link>
            <button
              onClick={() => setTerminalOpen(true)}
              className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
              type="button"
            >
              Terminal →
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-white/15 bg-black/35 p-5 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Sector Map</div>
              <div className="text-xs text-white/60">
                Every sector is a working destination. Use Terminal to navigate instantly.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTerminalOpen(true)}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 hover:bg-white/15"
                type="button"
              >
                Open Terminal
              </button>
              <Link
                href="/robot"
                className="rounded-2xl border border-white/15 bg-black/40 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                SH Assistant →
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {SECTORS.map((s) => (
              <Link key={s.href} href={s.href} className={CARD}>
                <Glow
                  a="rgba(34,211,238,0.18)"
                  b="rgba(180,140,255,0.16)"
                  c="rgba(255,255,255,0.06)"
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-semibold">{s.name}</div>
                    <div className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[11px] text-white/70">
                      {s.badge}
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-white/70">{s.desc}</div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-[11px] text-white/55">Open sector</div>
                    <div className="text-sm text-white/85 group-hover:text-white">Enter →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/45">
          Shynvo OS • Command layer + mission control + cognition systems
        </div>
      </div>

      <TerminalOverlay open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
}
