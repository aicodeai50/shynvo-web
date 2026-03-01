"use client";

import Link from "next/link";
import { ReactNode } from "react";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function PortalCard({
  title,
  desc,
  href,
  tag,
  icon,
  disabled,
}: {
  title: string;
  desc: string;
  href?: string;
  tag?: string;
  icon?: ReactNode;
  disabled?: boolean;
}) {
  const body = (
    <div
      className={cx(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl",
        !disabled && "hover:border-white/20"
      )}
    >
      {/* glow */}
      <div
        className={cx(
          "pointer-events-none absolute -inset-24 opacity-0 transition-opacity",
          !disabled && "group-hover:opacity-100"
        )}
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.22), transparent 45%), radial-gradient(circle at 70% 60%, rgba(34,211,238,0.16), transparent 45%)",
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
              {icon ?? <span className="text-sm">◻︎</span>}
            </div>
            <div className="min-w-0">
              <div className="text-base font-semibold text-white/90">{title}</div>
              <div className="mt-1 text-sm text-white/60">{desc}</div>
            </div>
          </div>

          {tag ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wider text-white/70">
              {tag}
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-white/45">
            {disabled ? "Locked" : href ? "Open" : "—"}
          </div>
          <div className="text-xs text-white/60">
            {disabled ? "—" : "→"}
          </div>
        </div>
      </div>
    </div>
  );

  if (disabled || !href) return body;

  return (
    <Link href={href} className="block">
      {body}
    </Link>
  );
}