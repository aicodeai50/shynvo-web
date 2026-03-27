"use client";

export default function AIBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#04070d]" />

      {/* stronger floating color fields */}
      <div className="absolute -left-24 top-10 h-[460px] w-[460px] rounded-full bg-cyan-400/18 blur-3xl animate-[floatA_18s_ease-in-out_infinite]" />
      <div className="absolute right-[-100px] top-24 h-[520px] w-[520px] rounded-full bg-lime-400/16 blur-3xl animate-[floatB_22s_ease-in-out_infinite]" />
      <div className="absolute left-[24%] bottom-[-140px] h-[460px] w-[460px] rounded-full bg-blue-500/16 blur-3xl animate-[floatC_20s_ease-in-out_infinite]" />

      {/* visible AI haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_84%_24%,rgba(132,204,22,0.14),transparent_26%),radial-gradient(circle_at_50%_78%,rgba(59,130,246,0.14),transparent_25%)]" />

      {/* moving sweep */}
      <div className="absolute inset-y-0 left-[-18%] w-[18%] bg-white/8 blur-2xl animate-[sweep_16s_linear_infinite]" />

      {/* tech grid */}
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:34px_34px]" />

      {/* floating nodes */}
      <div className="absolute left-[18%] top-[20%] h-2.5 w-2.5 rounded-full bg-cyan-300/90 shadow-[0_0_22px_rgba(34,211,238,0.95)] animate-pulse" />
      <div className="absolute left-[72%] top-[56%] h-2.5 w-2.5 rounded-full bg-lime-300/90 shadow-[0_0_22px_rgba(132,204,22,0.95)] animate-pulse" />
      <div className="absolute left-[48%] top-[40%] h-2.5 w-2.5 rounded-full bg-blue-300/90 shadow-[0_0_22px_rgba(59,130,246,0.95)] animate-pulse" />

      {/* readability veil */}
      <div className="absolute inset-0 bg-black/18" />

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
