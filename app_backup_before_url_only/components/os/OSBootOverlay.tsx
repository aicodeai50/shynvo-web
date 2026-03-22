"use client";

import { useEffect, useMemo } from "react";
import { useOSState } from "@/components/os/useOSState";

type Zone =
  | "home"
  | "planet"
  | "missions"
  | "cognitive"
  | "focus"
  | "logbook"
  | "timeline"
  | "robots"
  | "council"
  | "terminal"
  | "settings";

const ZONE_LABEL: Record<Zone, string> = {
  home: "DECK: OS HOME",
  planet: "ORBITAL NEXUS",
  missions: "MISSION BOARD",
  cognitive: "COGNITIVE CORE",
  focus: "FOCUS LOOP",
  logbook: "LOGBOOK ARCHIVE",
  timeline: "TIMELINE CONTROL",
  robots: "ROBOT HANGAR",
  council: "COUNCIL CHAMBER",
  terminal: "DIAGNOSTIC TERMINAL",
  settings: "SYSTEM SETTINGS",
};

export default function OSBootOverlay({ zone }: { zone: Zone }) {
  const storageKey = useMemo(() => "os.ui.booted.v2", []);
  const [booted, setBooted] = useOSState<boolean>(storageKey, false);
  const [forceBoot, setForceBoot] = useOSState<number>("os.ui.bootForce", 0);

  const shouldShow = !booted || forceBoot > 0;

  useEffect(() => {
    if (!shouldShow) return;

    const t1 = window.setTimeout(() => {
      setBooted(true);
      if (forceBoot > 0) setForceBoot(0);
    }, 1200);

    return () => window.clearTimeout(t1);
  }, [shouldShow, setBooted, forceBoot, setForceBoot]);

  if (!shouldShow) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-[#07110d]/72 backdrop-blur-sm">
      <div className="w-[min(92vw,720px)] rounded-[28px] border border-emerald-300/20 bg-black/60 p-6 shadow-[0_0_80px_rgba(16,185,129,0.08)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
            <div className="text-sm font-semibold tracking-[0.25em] text-emerald-100">
              SHYNVO OS
            </div>
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-white/55">
            {ZONE_LABEL[zone]}
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm text-white/72">
          <div>Initializing subsystem frame...</div>
          <div>Calibrating signal grid...</div>
          <div>Loading operating modules...</div>
          <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-white/5">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-emerald-300/70" />
          </div>
          <div className="text-xs text-white/45">
            Boot layer is cinematic and non-blocking. Workspace remains available immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
