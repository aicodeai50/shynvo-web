"use client";

import UniverseCard from "@/components/universe/UniverseCard";
import { UNIVERSES } from "@/components/universe/universe.theme";

export default function UniverseGrid() {
  return (
    <div>
      <div
        className="mb-4 rounded-3xl border border-white/15 p-5 backdrop-blur-xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.35)), radial-gradient(800px circle at 20% 50%, rgba(56,189,248,0.18), transparent 60%)",
          boxShadow: "0 0 80px rgba(167,139,250,0.08)",
        }}
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-white/60">Portal selection</div>
            <div className="mt-1 text-lg font-semibold text-white/90">Pick a universe</div>
            <div className="mt-1 text-sm text-white/65">
              Each card has its own gradient + neon accent (so it’s impossible to feel repetitive).
            </div>
          </div>

          <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
            portals: {UNIVERSES.length}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {UNIVERSES.map((u) => (
          <UniverseCard key={u.slug} u={u} />
        ))}
      </div>
    </div>
  );
}