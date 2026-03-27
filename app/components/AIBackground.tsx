"use client";

export default function AIBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#04050a]" />

      {/* dark floating light fields */}
      <div className="absolute -left-24 top-10 h-[560px] w-[560px] rounded-full bg-violet-400/16 blur-3xl animate-[floatA_18s_ease-in-out_infinite]" />
      <div className="absolute right-[-120px] top-24 h-[620px] w-[620px] rounded-full bg-blue-400/14 blur-3xl animate-[floatB_22s_ease-in-out_infinite]" />
      <div className="absolute left-[26%] bottom-[-160px] h-[540px] w-[540px] rounded-full bg-fuchsia-400/10 blur-3xl animate-[floatC_20s_ease-in-out_infinite]" />

      {/* soft center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(167,139,250,0.14),transparent_24%),radial-gradient(circle_at_82%_22%,rgba(96,165,250,0.12),transparent_26%),radial-gradient(circle_at_50%_78%,rgba(217,70,239,0.10),transparent_25%)]" />

      {/* floating light sweep */}
      <div className="absolute inset-y-0 left-[-18%] w-[18%] bg-white/8 blur-2xl animate-[sweep_18s_linear_infinite]" />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:38px_38px]" />

      {/* light nodes */}
      <div className="absolute left-[16%] top-[18%] h-3 w-3 rounded-full bg-violet-300/90 shadow-[0_0_24px_rgba(196,181,253,0.95)] animate-pulse" />
      <div className="absolute left-[74%] top-[54%] h-3 w-3 rounded-full bg-blue-300/90 shadow-[0_0_24px_rgba(147,197,253,0.95)] animate-pulse" />
      <div className="absolute left-[48%] top-[42%] h-2.5 w-2.5 rounded-full bg-fuchsia-300/85 shadow-[0_0_20px_rgba(240,171,252,0.9)] animate-pulse" />

      {/* readability layer */}
      <div className="absolute inset-0 bg-black/12" />

      <style jsx>{`
        @keyframes floatA {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(95px, 40px, 0) scale(1.08); }
        }

        @keyframes floatB {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-120px, 52px, 0) scale(1.1); }
        }

        @keyframes floatC {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(78px, -58px, 0) scale(1.06); }
        }

        @keyframes sweep {
          0% { transform: translateX(0); }
          100% { transform: translateX(720%); }
        }
      `}</style>
    </div>
  );
}
