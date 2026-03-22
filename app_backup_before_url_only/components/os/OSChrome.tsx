"use client";

import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import OSSideNav from "@/components/os/OSSideNav";
import OSBottomDock from "@/components/os/OSBottomDock";
import OSBootOverlay from "@/components/os/OSBootOverlay";

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

function detectZone(pathname: string): Zone {
  if (pathname.startsWith("/os/missions")) return "missions";
  if (pathname.startsWith("/os/timeline")) return "timeline";
  if (pathname.startsWith("/os/focus")) return "focus";
  if (pathname.startsWith("/os/logbook")) return "logbook";
  if (pathname.startsWith("/os/cognitive")) return "cognitive";
  if (pathname.startsWith("/os/robots")) return "robots";
  if (pathname.startsWith("/os/council")) return "council";
  if (pathname.startsWith("/os/terminal")) return "terminal";
  if (pathname.startsWith("/os/settings")) return "settings";
  if (pathname.startsWith("/os/planet")) return "planet";
  return "home";
}

function moduleLabel(pathname: string) {
  if (pathname.startsWith("/os/missions")) return "Mission Engine";
  if (pathname.startsWith("/os/timeline")) return "Timeline Control";
  if (pathname.startsWith("/os/focus")) return "Focus Loop";
  if (pathname.startsWith("/os/logbook")) return "Logbook Archive";
  if (pathname.startsWith("/os/cognitive")) return "Cognitive Core";
  if (pathname.startsWith("/os/robots")) return "Robot Hangar";
  if (pathname.startsWith("/os/council")) return "Council Chamber";
  return "Orbital Nexus";
}

export default function OSChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/os";
  const zone = useMemo(() => detectZone(pathname), [pathname]);
  const label = useMemo(() => moduleLabel(pathname), [pathname]);

  return (
    <>
      <OSBootOverlay zone={zone} />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1700px] gap-6 px-4 pb-24 pt-6 sm:px-6 xl:px-8">
        <OSSideNav />

        <div className="min-w-0 flex-1">
          <div className="mb-6 rounded-[28px] border border-emerald-300/15 bg-black/25 px-5 py-4 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
                  Shynvo Operating System
                </div>
                <div className="mt-1 text-2xl font-semibold text-white">
                  {label}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-4 py-2 text-emerald-100/85">
                  system online
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70">
                  modules connected
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-emerald-300/12 bg-white/[0.03] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] sm:p-6">
            {children}
          </div>
        </div>
      </div>

      <OSBottomDock />
    </>
  );
}
