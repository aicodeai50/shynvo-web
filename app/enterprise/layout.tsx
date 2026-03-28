"use client";

import type { ReactNode } from "react";

export default function EnterpriseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#06090B]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1200px_760px_at_12%_14%,rgba(16,185,129,0.08),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(980px_620px_at_86%_18%,rgba(148,163,184,0.07),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(920px_560px_at_52%_84%,rgba(255,255,255,0.04),transparent_34%)]" />
        <div className="absolute inset-0 opacity-[0.14]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_24%,transparent_78%,rgba(255,255,255,0.02))]" />
        <div className="absolute inset-0 bg-[#06090B]/84" />
      </div>

      {children}
    </div>
  );
}
