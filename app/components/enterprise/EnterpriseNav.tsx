"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const PRIMARY_LINKS = [
  { href: "/enterprise", label: "Overview" },
  { href: "/enterprise/dashboard", label: "Command Center" },
  { href: "/enterprise/missions", label: "Missions" },
  { href: "/enterprise/teams", label: "Teams" },
  { href: "/enterprise/rooms", label: "Rooms" },
  { href: "/enterprise/skills", label: "Skills" },
  { href: "/enterprise/analytics", label: "Analytics" },
  { href: "/enterprise/directory", label: "Directory" },
  { href: "/enterprise/schedule", label: "Schedule" },
  { href: "/enterprise/strategy", label: "Strategy" },
  { href: "/enterprise/os", label: "OS Core" },
];

const OS_BRIDGE_LINKS = [
  { href: "/os", label: "OS Legacy" },
  { href: "/os/focus", label: "Focus" },
  { href: "/os/missions", label: "OS Missions" },
  { href: "/os/robots", label: "Robots" },
  { href: "/os/timeline", label: "Timeline" },
  { href: "/os/logbook", label: "Logbook" },
  { href: "/os/cognitive", label: "Cognitive" },
  { href: "/os/council", label: "Council" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function EnterpriseNav({
  label = "Enterprise Layer",
  hubHref = "/enterprise",
  hubTitle = "Shynvo Enterprise",
}: {
  label?: string;
  hubHref?: string;
  hubTitle?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-emerald-300/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            ← Back
          </button>

          <Link
            href="/"
            className="rounded-xl border border-emerald-300/15 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>

          <Link
            href={hubHref}
            className="rounded-xl border border-emerald-300/15 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-50 transition hover:bg-emerald-400/15"
          >
            {hubTitle}
          </Link>
        </div>

        <div className="rounded-xl border border-emerald-300/15 bg-emerald-400/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/80">
          {label}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Enterprise Navigation
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {PRIMARY_LINKS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-sm transition",
                  active
                    ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-50"
                    : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          OS Bridge
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {OS_BRIDGE_LINKS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "rounded-full border px-3 py-1.5 text-sm transition",
                  active
                    ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-50"
                    : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
