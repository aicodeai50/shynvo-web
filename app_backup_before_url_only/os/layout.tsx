import type { ReactNode } from "react";
import OSChrome from "@/components/os/OSChrome";

export default function OsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#07110d]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_18%_18%,rgba(16,185,129,0.12),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_82%_26%,rgba(52,211,153,0.10),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(850px_480px_at_50%_72%,rgba(255,255,255,0.05),transparent_34%)]" />
        <div className="absolute inset-0 opacity-25">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>
        <div className="absolute inset-0 bg-[#07110d]/80" />
      </div>

      <OSChrome>{children}</OSChrome>
    </div>
  );
}
