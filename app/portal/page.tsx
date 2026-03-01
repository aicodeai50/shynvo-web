"use client";

import PortalShell from "@/components/portal/PortalShell";
import UniverseGrid from "@/components/universe/UniverseGrid";

export default function PortalHomePage() {
  return (
    <PortalShell
      title="Shynvo Company Portal"
      subtitle="Choose a portal. Each click drops you into a different universe."
      theme="aurora"
      rightSlot={
        <span className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80">
          universe hub: live
        </span>
      }
    >
      {/* Big neon banner (VERY visible color) */}
      <div
        className="rounded-3xl border border-white/15 p-5 backdrop-blur-xl"
        style={{
          background:
            "radial-gradient(900px circle at 15% 30%, rgba(34,211,238,0.24), transparent 55%), radial-gradient(900px circle at 85% 25%, rgba(167,139,250,0.20), transparent 60%), rgba(0,0,0,0.35)",
          boxShadow: "0 0 120px rgba(34,211,238,0.10)",
        }}
      >
        <div className="text-xs uppercase tracking-widest text-white/60">Shynvo universes</div>
        <div className="mt-1 text-lg font-semibold text-white/90">
          Each box is a portal — different color, different world, different purpose.
        </div>
        <div className="mt-2 text-sm text-white/65">
          Demo • Pricing • Robot • OS (2050) • Academy • Arena • Lab
        </div>
        <div className="mt-4 h-[1px] w-full bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.40),rgba(167,139,250,0.35),transparent)]" />
      </div>

      <div className="mt-5">
        <UniverseGrid />
      </div>
    </PortalShell>
  );
}