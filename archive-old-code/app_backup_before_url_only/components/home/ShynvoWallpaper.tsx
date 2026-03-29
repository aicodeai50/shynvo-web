"use client";

import { useState } from "react";

export default function ShynvoWallpaper() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#070B11]"
    >
      {!videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          onError={() => setVideoError(true)}
        >
          <source src="/shynvo-wallpaper.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_50%,rgba(56,189,248,0.12),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_540px_at_50%_50%,rgba(167,139,250,0.10),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_50%_50%,rgba(255,255,255,0.05),transparent_38%)]" />

      <div className="portal-ring portal-ring-1 absolute left-1/2 top-1/2 h-[72vw] w-[72vw] max-h-[920px] max-w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
      <div className="portal-ring portal-ring-2 absolute left-1/2 top-1/2 h-[52vw] w-[52vw] max-h-[680px] max-w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/10" />
      <div className="portal-ring portal-ring-3 absolute left-1/2 top-1/2 h-[34vw] w-[34vw] max-h-[420px] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-2xl" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/15 blur-xl" />

      <div className="absolute inset-0 opacity-50">
        <div className="grid-overlay h-full w-full" />
      </div>

      <div className="absolute inset-0">
        <span className="particle particle-1" />
        <span className="particle particle-2" />
        <span className="particle particle-3" />
        <span className="particle particle-4" />
        <span className="particle particle-5" />
        <span className="particle particle-6" />
        <span className="particle particle-7" />
        <span className="particle particle-8" />
      </div>

      <div className="absolute inset-0 bg-[#0B0F14]/72" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.06),transparent_60%)]" />

      <style jsx>{`
        .grid-overlay {
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(circle at center, rgba(0,0,0,0.9), transparent 75%);
          -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,0.9), transparent 75%);
        }

        .portal-ring {
          box-shadow:
            0 0 80px rgba(56, 189, 248, 0.06),
            inset 0 0 40px rgba(255,255,255,0.03);
        }

        .portal-ring-1 {
          animation: slowSpin 24s linear infinite;
        }

        .portal-ring-2 {
          animation: slowSpinReverse 30s linear infinite;
        }

        .portal-ring-3 {
          animation: pulseRing 6s ease-in-out infinite;
        }

        @keyframes slowSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes slowSpinReverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }

        @keyframes pulseRing {
          0%, 100% { opacity: 0.35; transform: translate(-50%, -50%) scale(0.98); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.03); }
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.45);
          box-shadow: 0 0 18px rgba(56,189,248,0.35);
          animation: floaty 10s ease-in-out infinite;
        }

        .particle-1 { left: 18%; top: 24%; animation-delay: 0s; }
        .particle-2 { left: 76%; top: 22%; animation-delay: 1s; }
        .particle-3 { left: 28%; top: 72%; animation-delay: 2s; }
        .particle-4 { left: 82%; top: 66%; animation-delay: 3s; }
        .particle-5 { left: 42%; top: 18%; animation-delay: 4s; }
        .particle-6 { left: 62%; top: 80%; animation-delay: 5s; }
        .particle-7 { left: 12%; top: 56%; animation-delay: 6s; }
        .particle-8 { left: 90%; top: 48%; animation-delay: 7s; }

        @keyframes floaty {
          0%, 100% { transform: translate3d(0,0,0) scale(1); opacity: 0.22; }
          50% { transform: translate3d(0,-18px,0) scale(1.2); opacity: 0.65; }
        }
      `}</style>
    </div>
  );
}
