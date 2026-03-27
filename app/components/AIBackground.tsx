"use client";

export default function AIBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#05070b]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_380px_at_12%_18%,rgba(34,211,238,0.22),transparent_60%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(760px_420px_at_82%_22%,rgba(132,204,22,0.18),transparent_62%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(620px_360px_at_55%_78%,rgba(59,130,246,0.14),transparent_60%)] animate-pulse" />
      <div className="absolute inset-y-0 left-[-25%] w-[25%] bg-white/10 blur-3xl animate-[ai_scan_14s_linear_infinite]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="absolute top-[18%] left-[24%] h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.95)] animate-ping" />
      <div className="absolute top-[58%] left-[72%] h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_18px_rgba(132,204,22,0.95)] animate-ping" />
      <div className="absolute top-[42%] left-[52%] h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.95)] animate-ping" />

      <style jsx>{`
        @keyframes ai_scan {
          0% { transform: translateX(0); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </div>
  );
}
