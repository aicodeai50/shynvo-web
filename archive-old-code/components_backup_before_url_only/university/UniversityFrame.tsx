import type { ReactNode } from "react";

export default function UniversityFrame({
  title,
  subtitle,
  accent,
  background,
  children,
}: {
  title: string;
  subtitle: string;
  accent: string;
  background: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen text-white bg-black">
      {/* Universe background */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background,
            filter: "saturate(1.2) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
        <div className="rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
          <div className="text-xs tracking-widest text-white/70">UNIVERSITY HUB</div>
          <div className="mt-2 text-3xl font-bold">{title}</div>
          <div className="mt-2 text-white/70">{subtitle}</div>

          <div className="mt-4 h-[1px] w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}80, transparent)`,
            }}
          />
        </div>

        <div className="mt-6">{children}</div>

        <div className="mt-10 text-center text-xs text-white/45">
          Shynvo University • themed universes • AI-powered arenas
        </div>
      </div>
    </div>
  );
}
