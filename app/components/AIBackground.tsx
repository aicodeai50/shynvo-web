"use client";

export default function AIBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      
      {/* Base dark */}
      <div className="absolute inset-0 bg-[#070B11]" />

      {/* AI glow layers */}
      <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_10%_20%,rgba(34,211,238,0.15),transparent_60%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_80%_30%,rgba(132,204,22,0.12),transparent_60%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(500px_300px_at_50%_80%,rgba(59,130,246,0.10),transparent_60%)] animate-pulse" />

      {/* Moving scan light */}
      <div className="absolute inset-y-0 left-[-30%] w-[30%] bg-white/5 blur-2xl animate-[scan_12s_linear_infinite]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute h-1 w-1 bg-lime-400 rounded-full top-[20%] left-[30%] animate-ping" />
        <div className="absolute h-1 w-1 bg-cyan-400 rounded-full top-[60%] left-[70%] animate-ping" />
        <div className="absolute h-1 w-1 bg-blue-400 rounded-full top-[40%] left-[50%] animate-ping" />
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(0); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
