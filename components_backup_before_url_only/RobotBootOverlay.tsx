"use client";

import { useEffect } from "react";

export default function RobotBootOverlay({
  open,
  onDone,
}: {
  open: boolean;
  onDone: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onDone(), 2600); // boot length
    return () => clearTimeout(t);
  }, [open, onDone]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-3xl flex-col justify-center px-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-400">SHYNVO // ROBOT</div>
            <div className="text-sm text-neutral-500">BOOT v0.1</div>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-neutral-100">
            Initializing cinematic assistant…
          </h2>

          <div className="mt-6 space-y-3 text-sm text-neutral-300">
            <BootLine delay={0}>Power core: online</BootLine>
            <BootLine delay={220}>Optics: calibrated</BootLine>
            <BootLine delay={440}>Motion rig: stabilized</BootLine>
            <BootLine delay={660}>Ambient sensors: active</BootLine>
            <BootLine delay={880}>Safety constraints: engaged</BootLine>
            <BootLine delay={1100}>Mode system: loaded</BootLine>
          </div>

          <div className="mt-7">
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-900">
              <div className="h-full w-0 animate-[bootbar_2.4s_ease-out_forwards] bg-neutral-200/70" />
            </div>
            <div className="mt-2 text-xs text-neutral-500">
              Press nothing. Just vibe. ✨
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes bootbar {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

function BootLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <div
      className="opacity-0 animate-[bootfade_.35s_ease-out_forwards]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-emerald-300">✔</span>{" "}
      <span className="text-neutral-200">{children}</span>
      <style jsx>{`
        @keyframes bootfade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}