import type { ReactNode } from "react";

export default function AcademyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#16091a]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_20%,rgba(217,70,239,0.14),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_80%_28%,rgba(244,114,182,0.12),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(850px_500px_at_50%_70%,rgba(255,255,255,0.05),transparent_34%)]" />
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>
        <div className="absolute inset-0 bg-[#16091a]/78" />
      </div>

      {children}
    </div>
  );
}
