"use client";

import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";

export default function DocsPage() {
  return (
    <PortalShell
      title="Documentation"
      subtitle="Stub docs hub. Later: real docs pages."
      rightSlot={
        <Link
          href="/portal"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
        >
          Back
        </Link>
      }
    >
      <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
        <div className="text-xs uppercase tracking-widest text-white/50">Key concepts</div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="text-sm text-white/85">Proxy AI architecture</div>
            <div className="mt-2 text-sm text-white/65">
              Browser calls <span className="font-mono text-[12px]">/api/public/chat</span>. Vercel injects secrets and proxies to backend.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="text-sm text-white/85">OS vs Portal</div>
            <div className="mt-2 text-sm text-white/65">
              OS = internal control deck. Portal = public onboarding/auth/pricing surface.
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}