"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/os", label: "Home", icon: "OS" },
  { href: "/os/missions", label: "Missions", icon: "MSN" },
  { href: "/os/timeline", label: "Timeline", icon: "TIM" },
  { href: "/os/focus", label: "Focus", icon: "FOC" },
  { href: "/os/cognitive", label: "Mind", icon: "COG" },
  { href: "/os/council", label: "Council", icon: "AIC" },
];

function isActive(pathname: string, href: string) {
  if (href === "/os") return pathname === "/os";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function OSBottomDock() {
  const pathname = usePathname() || "/";

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-6xl px-3 py-2">
        <div className="grid grid-cols-6 gap-2">
          {ITEMS.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "relative rounded-2xl border px-2 py-2 text-center transition active:scale-[0.99]",
                  active
                    ? "border-emerald-300/25 bg-emerald-400/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10",
                ].join(" ")}
              >
                <div className="text-[11px] font-semibold tracking-widest text-white/85">
                  {item.icon}
                </div>
                <div className="mt-0.5 text-[10px] text-white/60">{item.label}</div>
                <div className="mt-2 flex justify-center">
                  <span
                    className={[
                      "h-[2px] w-10 rounded-full transition",
                      active ? "bg-emerald-200/80" : "bg-white/0",
                    ].join(" ")}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
