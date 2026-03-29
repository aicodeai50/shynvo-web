"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/os", label: "OS Home", hint: "main deck" },
  { href: "/os/missions", label: "Missions", hint: "goal to execution" },
  { href: "/os/timeline", label: "Timeline", hint: "today + week" },
  { href: "/os/focus", label: "Focus", hint: "deep work room" },
  { href: "/os/logbook", label: "Logbook", hint: "operational memory" },
  { href: "/os/cognitive", label: "Cognitive", hint: "state reading" },
  { href: "/os/robots", label: "Robots", hint: "specialized AI agents" },
  { href: "/os/council", label: "AI Council", hint: "multi-perspective reasoning" },
];

function isActive(pathname: string, href: string) {
  if (href === "/os") return pathname === "/os";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function OSSideNav() {
  const pathname = usePathname() || "/";

  return (
    <aside className="hidden xl:block xl:w-[280px] shrink-0">
      <div className="sticky top-6 rounded-[28px] border border-emerald-300/15 bg-black/25 p-4 backdrop-blur-sm">
        <div className="border-b border-white/10 pb-4">
          <div className="text-xs uppercase tracking-[0.18em] text-emerald-100/70">
            Shynvo OS
          </div>
          <div className="mt-2 text-2xl font-semibold text-white">
            System Map
          </div>
          <div className="mt-2 text-sm leading-6 text-white/62">
            Navigate the execution system through its major modules and AI layers.
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {ITEMS.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-2xl border px-4 py-3 transition",
                  active
                    ? "border-emerald-300/25 bg-emerald-400/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-white">{item.label}</span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">
                    {item.hint}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-white/50">
            Core Loop
          </div>
          <div className="mt-2 text-sm leading-6 text-white/72">
            Mission → Timeline → Focus → Logbook → Cognitive → repeat
          </div>
        </div>
      </div>
    </aside>
  );
}
