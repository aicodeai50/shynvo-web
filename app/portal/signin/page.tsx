"use client";

import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";

export default function SigninPage() {
  return (
    <PortalShell
      title="Sign In"
      subtitle="Stub page. This is where sign-in UI will land."
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
          Later: sign-in connects to user profile, saved missions, timeline events, terminal history per user.
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/os"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
          >
            Enter OS (demo)
          </Link>
          <Link
            href="/assistant"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
          >
            Open Assistant
          </Link>
        </div>
      </div>
    </PortalShell>
  );
}