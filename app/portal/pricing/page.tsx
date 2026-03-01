"use client";

import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";

export default function PricingPage() {
  return (
    <PortalShell
      title="Pricing"
      subtitle="Stub pricing layout. Later: real plans + Stripe."
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
          <div className="text-xs uppercase tracking-widest text-white/50">Free</div>
          <div className="mt-2 text-2xl font-semibold text-white/90">$0</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>• OS demo modules</li>
            <li>• Local persistence</li>
            <li>• Proxy AI (rate limited later)</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-white/50">Pro</div>
          <div className="mt-2 text-2xl font-semibold text-white/90">$—</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>• Account + cloud sync</li>
            <li>• Missions + timeline storage</li>
            <li>• Higher AI limits</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-white/50">Team</div>
          <div className="mt-2 text-2xl font-semibold text-white/90">$—</div>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>• Multi-user workspaces</li>
            <li>• Council + review loops</li>
            <li>• Admin + roles</li>
          </ul>
        </div>
      </div>
    </PortalShell>
  );
}