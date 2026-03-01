"use client";

import { ReactNode } from "react";
import Link from "next/link";

export default function PortalShell({
  title,
  subtitle,
  rightSlot,
  children,
}: {
  title: string;
  subtitle?: ReactNode;
  rightSlot?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* subtle cinematic wash (NOT OS, different feel) */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.22),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.16),transparent_45%),radial-gradient(circle_at_30%_85%,rgba(244,63,94,0.10),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_30%,rgba(255,255,255,0.02))]" />
        <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px] opacity-10" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
        {/* Top bar (NOT OS header) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs tracking-widest text-white/70">
              SHYNVO
            </div>
            <div className="text-xs text-white/50">User Portal</div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/os"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
              title="Enter OS"
            >
              Enter OS
            </Link>
            <Link
              href="/assistant"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/75 hover:bg-white/10"
              title="Open Assistant"
            >
              Assistant
            </Link>
            {rightSlot ?? null}
          </div>
        </div>

        {/* Hero */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div className="text-2xl font-semibold text-white/95">{title}</div>
          {subtitle ? <div className="mt-2 text-sm text-white/65">{subtitle}</div> : null}
        </div>

        {/* Content */}
        <div className="mt-6">{children}</div>

        <div className="mt-10 text-center text-xs text-white/40">
          Shynvo Portal — public layer (frontend-only for now)
        </div>
      </div>
    </div>
  );
}