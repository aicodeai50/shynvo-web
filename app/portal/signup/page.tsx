"use client";

import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";

export default function SignupPage() {
  return (
    <PortalShell
      title="Create Account"
      subtitle="Stub page. Auth will be added after the frontend sprint."
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
        <div className="text-xs uppercase tracking-widest text-white/50">Auth</div>
        <div className="mt-2 text-sm text-white/70">
          This route exists so Portal cards never 404. Later: email/password, OAuth, magic link.
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="text-xs text-white/60">Planned</div>
            <div className="mt-1 text-sm text-white/80">Email signup + profile</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="text-xs text-white/60">Planned</div>
            <div className="mt-1 text-sm text-white/80">Workspace + multi-user</div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}