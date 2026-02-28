"use client";

import "@/app/os/os-atmosphere.css";
import "@/app/os/os-cinematic.css";

import { ReactNode } from "react";
import Link from "next/link";

import OSSideNav from "@/components/os/OSSideNav";
import OSStoryBar from "@/components/os/OSStoryBar";
import OSBootOverlay from "@/components/os/OSBootOverlay";
import { useOSState } from "@/components/os/useOSState";

type Zone =
  | "home"
  | "planet"
  | "missions"
  | "cognitive"
  | "focus"
  | "momentum"
  | "trajectory"
  | "terminal"
  | "settings";

type OSShellProps = {
  title: string;
  subtitle?: ReactNode;
  chips?: string[];
  rightSlot?: ReactNode;
  zone?: Zone;
  children: ReactNode;
};

function Chip({ text }: { text: string }) {
  return (
    <span className="os-chip rounded-full px-3 py-1 text-xs">
      {text}
    </span>
  );
}

export default function OSShell({
  title,
  subtitle,
  chips = [],
  rightSlot,
  zone = "home",
  children,
}: OSShellProps) {
  const [storyOpen, setStoryOpen] = useOSState<boolean>(
    "os.ui.storyBarOpen",
    true
  );

  // boot force key used by overlay
  const [, setBootForce] = useOSState<number>("os.ui.bootForce", 0);

  return (
    <div className={`os-universe os-zone-${zone} min-h-screen`}>
      <OSBootOverlay zone={zone} />

      <div className="os-glow-orbs" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="os-film" aria-hidden="true" />

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        {/* ================= Header strip ================= */}
        <div className="os-panel rounded-2xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-white/70">
                Shynvo OS
              </span>
              {chips.map((c) => (
                <Chip key={c} text={c} />
              ))}
            </div>

            {/* ===== OS Controls ===== */}
            <div className="flex items-center gap-2">
              {/* SH Assistant entry */}
              <Link
                href="/assistant"
                className="os-btn px-3 py-1 text-xs hover:bg-white/10"
                title="Open Shynvo SH Assistant AI"
              >
                SH Assistant
              </Link>

              <button
                onClick={() => setStoryOpen(!storyOpen)}
                className="os-btn px-3 py-1 text-xs hover:bg-white/10"
                title="Toggle story bar"
              >
                {storyOpen ? "Story: on" : "Story: off"}
              </button>

              <button
                onClick={() => setBootForce(Date.now())}
                className="os-btn px-3 py-1 text-xs hover:bg-white/10"
                title="Re-run cinematic boot"
              >
                Re-run boot
              </button>

              {rightSlot ? rightSlot : null}
            </div>
          </div>

          <div className="mt-3">
            <div className="text-2xl font-semibold text-white/95">
              {title}
            </div>
            {subtitle ? (
              <div className="mt-1 text-sm text-white/65">{subtitle}</div>
            ) : null}
          </div>
        </div>

        {/* ================= Main layout ================= */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left: nav */}
          <div className="lg:col-span-3">
            <OSSideNav />
          </div>

          {/* Center: page content */}
          <div className="lg:col-span-6">
            <div className="os-panel rounded-2xl p-4">
              {children}
            </div>
          </div>

          {/* Right: story bar */}
          <div className="lg:col-span-3">
            {storyOpen ? <OSStoryBar /> : null}

            {/* Ambient block */}
            <div className="mt-4 os-panel rounded-2xl p-4">
              <div className="text-xs uppercase tracking-widest text-white/60">
                Ambient status
              </div>
              <div className="mt-2 text-sm text-white/75">
                You are inside an active control deck. Systems feel alive.
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                  <div className="text-xs text-white/60">signal</div>
                  <div className="mt-1 text-sm text-white/85">stable</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/40 p-3">
                  <div className="text-xs text-white/60">sync</div>
                  <div className="mt-1 text-sm text-white/85">local</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-white/50">
                Later: this becomes real telemetry.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-white/40">
          Shynvo OS – cinematic UI layer (frontend only)
        </div>
      </div>
    </div>
  );
}