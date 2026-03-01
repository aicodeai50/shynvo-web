"use client";

import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";

export default function StatusPage() {
  return (
    <PortalShell
      title="System Status"
      subtitle="Frontend-only stub. Later: real telemetry + health checks."
      rightSlot={
        <Link
          href="/portal"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
        >
          Back
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-white/50">Frontend</div>
          <div className="mt-2 text-sm text-white/80">online</div>
          <div className="mt-2 text-xs text-white/55">Vercel deployment is serving pages.</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-white/50">Proxy API</div>
          <div className="mt-2 text-sm text-white/80">/api/public/chat</div>
          <div className="mt-2 text-xs text-white/55">Use Assistant / Robot / Terminal “ai” to confirm.</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-white/50">Backend</div>
          <div className="mt-2 text-sm text-white/80">depends</div>
          <div className="mt-2 text-xs text-white/55">Railway health can be surfaced later.</div>
        </div>
      </div>
    </PortalShell>
  );
}