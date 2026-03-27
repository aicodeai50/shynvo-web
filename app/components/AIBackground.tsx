"use client";

export default function AIBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#03060b]" />

      {/* brighter floating fields */}
      <div className="absolute -left-24 top-8 h-[520px] w-[520px] rounded-full bg-cyan-400/24 blur-3xl animate-[floatA_18s_ease-in-out_infinite]" />
      <div className="absolute right-[-120px] top-20 h-[560px] w-[560px] rounded-full bg-lime-400/22 blur-3xl animate-[floatB_22s_ease-in-out_infinite]" />
      <div className="absolute left-[22%] bottom-[-150px] h-[520px] w-[520px] rounded-full bg-blue-500/22 blur-3xl animate-[floatC_20s_ease-in-out_infinite]" />

      {/* stronger AI haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(34,211,238,0.20),transparent_24%),radial-gradient(circle_at_84%_24%,rgba(132,204,22,0.18),transparent_26%),radial-gradient(circle_at_50%_78%,rgba(59,130,246,0.18),transparent_25%)]" />

      {/* moving sweep */}
      <div className="absolute inset-y-0 left-[-18%] w-[18%] bg-white/10 blur-2xl animate-[sweep_16s_linear_infinite]" />

      {/* tech grid */}
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:34px_34px]" />

      {/* floating nodes */}
      <div className="absolute left-[18%] top-[20%] h-3 w-3 rounded-full bg-cyan-300/95 shadow-[0_0_26px_rgba(34,211,238,0.98)] animate-pulse" />
      <div className="absolute left-[72%] top-[56%] h-3 w-3 rounded-full bg-lime-300/95 shadow-[0_0_26px_rgba(132,204,22,0.98)] animate-pulse" />
      <div className="absolute left-[48%] top-[40%] h-3 w-3 rounded-full bg-blue-300/95 shadow-[0_0_26px_rgba(59,130,246,0.98)] animate-pulse" />

      {/* lighter readability veil so wallpaper shows more */}
      <div className="absolute inset-0 bg-black/10" />

      <style jsx>{`
        @keyframes floatA {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(110px, 46px, 0) scale(1.1); }
        }
        @keyframes floatB {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-130px, 60px, 0) scale(1.12); }
        }
        @keyframes floatC {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(90px, -70px, 0) scale(1.08); }
        }
        @keyframes sweep {
          0% { transform: translateX(0); }
          100% { transform: translateX(720%); }
        }
      `}</style>
    </div>
  );
}
