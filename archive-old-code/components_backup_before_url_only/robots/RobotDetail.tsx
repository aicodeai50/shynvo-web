"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ROBOTS } from "@/components/robots/robots.data";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function RobotDetail({ id }: { id: string }) {
  const robot = useMemo(() => ROBOTS.find((r) => r.id === id) || null, [id]);
  const [modeId, setModeId] = useState<string | null>(robot?.modes?.[0]?.id ?? null);

  if (!robot) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white/80">
        <div className="text-sm font-extrabold">Robot not found</div>
        <div className="mt-2 text-sm text-white/60">Return to the hangar.</div>
        <Link
          href="/robots"
          className="mt-3 inline-flex rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
        >
          Back to hangar
        </Link>
      </div>
    );
  }

  const activeMode = robot.modes.find((m) => m.id === modeId) || robot.modes[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60">Robot</div>
          <div className="mt-1 text-2xl font-extrabold text-white/90">{robot.name}</div>
          <div className="mt-1 text-sm text-white/65">{robot.tagline}</div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/robots"
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
          >
            Hangar
          </Link>
          <Link
            href="/split"
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
          >
            Split
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="text-sm text-white/80">{robot.description}</div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">Modes</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {robot.modes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModeId(m.id)}
                  className={cx(
                    "rounded-xl border px-3 py-2 text-xs font-extrabold transition",
                    m.id === activeMode.id
                      ? "border-white/20 bg-white/10"
                      : "border-white/10 bg-black/30 hover:bg-white/5"
                  )}
                >
                  {m.name}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
              <div className="text-xs text-white/50">Active mode</div>
              <div className="mt-1 text-sm font-extrabold text-white/85">
                {activeMode.name}
              </div>
              <div className="mt-1 text-xs text-white/60">{activeMode.vibe}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs uppercase tracking-widest text-white/60">
              Integration (later)
            </div>
            <div className="mt-2 text-sm text-white/70">
              This is where the cinematic robot will connect to:
            </div>
            <ul className="mt-3 space-y-2 text-sm text-white/70 list-disc list-inside">
              <li>Shynvo SH Assistant AI outputs</li>
              <li>OS state + logbook events</li>
              <li>Split View mode synchronization</li>
              <li>Voice + presence + gestures</li>
            </ul>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white/55">
              No backend wiring yet. Frontend-first.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}