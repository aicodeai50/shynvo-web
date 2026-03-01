"use client";

import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";

export default function GetStartedPage() {
  return (
    <PortalShell
      title="Get Started"
      subtitle="3 steps to begin. This is the public layer — OS comes after onboarding."
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
        <div className="rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-white/50">Step 1</div>
          <div className="mt-2 text-lg font-semibold text-white/90">Choose a goal</div>
          <div className="mt-2 text-sm text-white/65">
            Pick a single outcome you want this week (ship a feature, learn a skill, finish a sprint).
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-white/50">Step 2</div>
          <div className="mt-2 text-lg font-semibold text-white/90">Create missions</div>
          <div className="mt-2 text-sm text-white/65">
            Break the outcome into 3–7 missions. Keep each mission small enough to finish.
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-widest text-white/50">Step 3</div>
          <div className="mt-2 text-lg font-semibold text-white/90">Enter the OS</div>
          <div className="mt-2 text-sm text-white/65">
            The OS is the control deck. Use Timeline, Terminal, and Council to drive execution.
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/assistant"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
        >
          Open Assistant
        </Link>
        <Link
          href="/os"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
        >
          Enter OS
        </Link>
        <Link
          href="/portal/signup"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 hover:bg-white/10"
        >
          Create Account (stub)
        </Link>
      </div>
    </PortalShell>
  );
}