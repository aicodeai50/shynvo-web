'use client';

import React from 'react';

export default function CinematicRobotTeaser() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F14]/70 p-6">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-200px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/6 blur-3xl" />
        <div className="absolute right-[-160px] bottom-[-180px] h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_260px_at_50%_10%,rgba(255,255,255,0.10),transparent_60%)]" />
      </div>

      <div className="relative flex items-center justify-between gap-6">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Cinematic Robot Visual
          </div>

          <div className="mt-2 text-xl font-semibold text-white">
            Presence online
          </div>

          <p className="mt-2 text-sm text-white/70">
            A cinematic companion preview. Full robot experience opens in <span className="text-white/85">/robot</span>.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="/robot"
              className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              Try Sci-Fi Robot
            </a>
            <a
              href="/os"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/5"
            >
              Enter Shynvo OS
            </a>
          </div>

          <div className="mt-3 text-xs text-white/50">
            Minimal • alive • professional (blink + breathing + glow)
          </div>
        </div>

        {/* Option 1: Minimal animated robot face */}
        <div className="relative h-[132px] w-[132px] shrink-0">
          <div className="absolute inset-0 rounded-3xl bg-white/5 ring-1 ring-white/10" />
          <div aria-hidden className="robot-ring absolute inset-0 rounded-3xl" />

          <svg viewBox="0 0 200 200" className="relative h-full w-full">
            {/* Head */}
            <rect
              x="46"
              y="54"
              width="108"
              height="94"
              rx="24"
              fill="rgba(255,255,255,0.10)"
              stroke="rgba(255,255,255,0.18)"
              className="robot-breathe"
            />
            {/* Visor */}
            <rect
              x="60"
              y="80"
              width="80"
              height="34"
              rx="15"
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.14)"
            />
            {/* Eyes */}
            <circle cx="86" cy="97" r="7" className="robot-eye" fill="rgba(255,255,255,0.92)" />
            <circle cx="114" cy="97" r="7" className="robot-eye" fill="rgba(255,255,255,0.92)" />
            {/* Antenna */}
            <line
              x1="100"
              y1="54"
              x2="100"
              y2="34"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="100" cy="28" r="6" className="robot-pulse" fill="rgba(255,255,255,0.18)" />
          </svg>

          <style jsx>{`
            .robot-eye { transform-origin: center; animation: blink 4.6s infinite; }
            .robot-pulse { animation: pulse 2.6s infinite ease-in-out; }
            .robot-breathe { transform-origin: center; animation: breathe 3.8s infinite ease-in-out; }
            .robot-ring { box-shadow: 0 0 0 1px rgba(255,255,255,0.10); animation: ring 3.2s infinite ease-in-out; }
            @keyframes blink {
              0%, 92%, 100% { transform: scaleY(1); opacity: 1; }
              94% { transform: scaleY(0.14); opacity: 0.75; }
              96% { transform: scaleY(1); opacity: 1; }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.35; transform: scale(1); }
              50% { opacity: 0.80; transform: scale(1.10); }
            }
            @keyframes breathe {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-2px); }
            }
            @keyframes ring {
              0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.10), 0 0 28px rgba(255,255,255,0.06); }
              50% { box-shadow: 0 0 0 1px rgba(255,255,255,0.14), 0 0 46px rgba(255,255,255,0.10); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
