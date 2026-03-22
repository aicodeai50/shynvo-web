"use client";

import Link from "next/link";
import { ROBOTS } from "@/components/robots/robots.data";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function statusBadge(status: "online" | "standby" | "offline") {
  if (status === "online") return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
  if (status === "standby") return "border-yellow-400/30 bg-yellow-500/10 text-yellow-200";
  return "border-white/15 bg-white/5 text-white/70";
}

export default function RobotsHangar() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-white/60">Robots</div>
          <div className="mt-1 text-sm text-white/70">
            Hangar view (frontend-only). Later: connect cinematic robot + mode sync.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/os"
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
          >
            OS
          </Link>
          <Link
            href="/assistant"
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-extrabold hover:bg-white/5"
          >
            SH Assistant
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ROBOTS.map((r) => (
          <Link
            key={r.id}
            href={`/robots/${r.id}`}
            className="rounded-2xl border border-white/10 bg-black/30 p-4 hover:bg-white/5 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-lg font-extrabold text-white/90">{r.name}</div>
                <div className="mt-1 text-sm text-white/65">{r.tagline}</div>
              </div>

              <div
                className={cx(
                  "rounded-full border px-2 py-0.5 text-[10px] font-extrabold",
                  statusBadge(r.status)
                )}
              >
                {r.status.toUpperCase()}
              </div>
            </div>

            <div className="mt-3 text-sm text-white/75 line-clamp-3">{r.description}</div>

            <div className="mt-4 flex flex-wrap gap-2">
              {r.modes.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
                >
                  {m.name}
                </div>
              ))}
              {r.modes.length > 3 ? (
                <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/50">
                  +{r.modes.length - 3} more
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}