"use client";

import Link from "next/link";
import type { UniverseDef } from "@/components/universe/universe.theme";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function UniverseCard({ u }: { u: UniverseDef }) {
  return (
    <Link href={u.href} className="group block">
      <div
        className={cx(
          "relative overflow-hidden rounded-3xl border backdrop-blur-xl",
          "transition duration-300 hover:-translate-y-1"
        )}
        style={{
          borderColor: `${u.accent}88`,
          background: u.bg,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 70px ${u.accent}22`,
        }}
      >
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-[6px] opacity-95"
          style={{
            background: `linear-gradient(180deg, transparent, ${u.accent}, transparent)`,
            filter: "blur(0.2px)",
          }}
        />

        <div
          className="pointer-events-none absolute -inset-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(700px circle at 30% 30%, ${u.accent}35, transparent 60%)`,
          }}
        />

        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="relative p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-black/35 text-lg"
                style={{
                  borderColor: `${u.accent}AA`,
                  boxShadow: `0 0 40px ${u.accent}55`,
                }}
              >
                {u.icon}
              </div>

              <div className="min-w-0">
                <div className="text-base font-semibold text-white/95">{u.title}</div>
                <div className="mt-1 text-sm text-white/75">{u.desc}</div>
              </div>
            </div>

            <span
              className="shrink-0 rounded-full border bg-black/35 px-3 py-1 text-[11px] tracking-wider text-white/90"
              style={{ borderColor: `${u.accent}AA` }}
            >
              universe
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-white/60">Portal</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white/95">{u.cta}</span>
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border bg-black/35 text-white/95 transition group-hover:translate-x-[2px]"
                style={{ borderColor: `${u.accent}AA` }}
              >
                →
              </span>
            </div>
          </div>

          <div
            className="mt-4 h-[1px] w-full opacity-95"
            style={{ background: `linear-gradient(90deg, transparent, ${u.accent}, transparent)` }}
          />
        </div>
      </div>
    </Link>
  );
}