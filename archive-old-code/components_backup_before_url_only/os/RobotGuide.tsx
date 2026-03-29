"use client";

export default function RobotGuide({
  hint,
}: {
  hint?: string;
}) {
  return (
    <div className="pointer-events-none fixed right-6 bottom-6 z-[60] hidden md:block">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <div className="text-xs text-white/60">SH Assistant</div>
        <div className="mt-1 text-sm font-semibold text-white/85">Navigator</div>
        <div className="mt-2 text-xs text-white/60 max-w-[220px]">
          {hint ?? "Open Terminal → type routes → open a deck."}
        </div>
      </div>
    </div>
  );
}
