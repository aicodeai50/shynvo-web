import type { ReactNode } from "react";

export default function ExperimentsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#071018]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_18%_18%,rgba(34,211,238,0.12),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_82%_26%,rgba(59,130,246,0.10),transparent_36%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(850px_480px_at_50%_72%,rgba(255,255,255,0.05),transparent_32%)]" />
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:54px_54px]" />
        </div>
        <div className="absolute inset-0 bg-[#071018]/80" />
      </div>

      {children}
    </div>
  );
}
