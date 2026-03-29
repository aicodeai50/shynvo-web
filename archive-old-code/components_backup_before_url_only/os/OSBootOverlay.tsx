"use client";

import { useEffect, useMemo } from "react";
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

const ZONE_LABEL: Record<Zone, string> = {
  home: "DECK: OS HOME",
  planet: "ORBITAL NEXUS",
  missions: "MISSION BOARD",
  cognitive: "COGNITIVE CORE",
  focus: "FOCUS LOOP",
  momentum: "MOMENTUM ENGINE",
  trajectory: "TRAJECTORY CONTROL",
  terminal: "DIAGNOSTIC TERMINAL",
  settings: "SYSTEM SETTINGS",
};

export default function OSBootOverlay({ zone }: { zone: Zone }) {
  // show boot once per browser by default
  const storageKey = useMemo(() => "os.ui.booted.v1", []);
  const [booted, setBooted] = useOSState<boolean>(storageKey, false);

  // external triggers can force it on (button)
  const [forceBoot, setForceBoot] = useOSState<number>("os.ui.bootForce", 0);

  const shouldShow = !booted || forceBoot > 0;

  useEffect(() => {
    if (!shouldShow) return;

    const t1 = window.setTimeout(() => {
      setBooted(true);
      // reset force boot after it shows
      if (forceBoot > 0) setForceBoot(0);
    }, 1200);

    return () => window.clearTimeout(t1);
  }, [shouldShow, setBooted, forceBoot, setForceBoot]);

  if (!shouldShow) return null;

  return (
    <div className="os-boot" role="presentation" aria-hidden="true">
      <div className="os-boot__frame">
        <div className="os-boot__top">
          <div className="os-boot__dot" />
          <div className="os-boot__title">SHYNVO OS</div>
          <div className="os-boot__meta">{ZONE_LABEL[zone]}</div>
        </div>

        <div className="os-boot__body">
          <div className="os-boot__line">
            Initializing subsystems...
          </div>
          <div className="os-boot__line">
            Calibrating signal grid...
          </div>
          <div className="os-boot__line">
            Loading cockpit modules...
          </div>
          <div className="os-boot__bar">
            <i />
          </div>
          <div className="os-boot__hint">
            Cinematic boot (non-blocking). UI continues immediately.
          </div>
        </div>
      </div>
    </div>
  );
}
