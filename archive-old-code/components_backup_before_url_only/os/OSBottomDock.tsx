"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type DockItem = {
  href: string;
  label: string;
  icon: string;
};

const ITEMS: DockItem[] = [
  { href: "/os", label: "Home", icon: "OS" },
  { href: "/os/planet", label: "Planet", icon: "PL" },
  { href: "/os/missions", label: "Missions", icon: "MSN" },
  { href: "/os/council", label: "Council", icon: "AIC" },
  { href: "/os/cognitive", label: "Mind", icon: "COG" },
  { href: "/os/trajectory", label: "Path", icon: "TRJ" },
];

function isActive(pathname: string, href: string) {
  if (href === "/os") return pathname === "/os";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function OSBottomDock() {
  const pathname = usePathname() || "/";

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-3 py-2">
        <div className="grid grid-cols-6 gap-2">
          {ITEMS.map((it) => {
            const active = isActive(pathname, it.href);

            return (
              <Link
                key={it.href}
                href={it.href}
                className={[
                  "relative rounded-2xl border px-2 py-2 text-center transition",
                  "active:scale-[0.99]",
                  active
                    ? "border-white/25 bg-white/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
                ].join(" ")}
              >
                {active ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.08), 0 0 18px rgba(255,255,255,0.10)",
                    }}
                  />
                ) : null}

                {active ? (
                  <span className="pointer-events-none absolute right-2 top-2 inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white/80" />
                  </span>
                ) : null}

                <div className="text-[11px] font-semibold tracking-widest text-white/85">
                  {it.icon}
                </div>
                <div className="mt-0.5 text-[10px] text-white/60">
                  {it.label}
                </div>

                <div className="mt-2 flex justify-center">
                  <span
                    className={[
                      "h-[2px] w-10 rounded-full transition",
                      active ? "bg-white/70" : "bg-white/0",
                    ].join(" ")}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between text-[10px] text-white/45">
          <span>system: stable</span>
          <span>dock: active</span>
        </div>
      </div>
    </div>
  );
}
