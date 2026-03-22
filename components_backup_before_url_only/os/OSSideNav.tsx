import Link from "next/link";

const ITEMS = [
  { href: "/os", label: "OS Home", hint: "main deck" },
  { href: "/os/planet", label: "Orbital Nexus", hint: "planet control" },

  { href: "/os/missions", label: "Missions", hint: "quest board" },
  { href: "/os/timeline", label: "Timeline", hint: "chronochart" },
  { href: "/os/logbook", label: "Logbook", hint: "event memory" },

  { href: "/os/cognitive", label: "Cognitive", hint: "energy + friction" },
  { href: "/os/focus", label: "Focus", hint: "execution loops" },
  { href: "/os/momentum", label: "Momentum", hint: "drills + reflection" },
  { href: "/os/trajectory", label: "Trajectory", hint: "90-day missions" },

  { href: "/os/robots", label: "Robots", hint: "hangar" },
  { href: "/os/council", label: "AI Council", hint: "multi-agent UI" },

  { href: "/os/settings", label: "Settings", hint: "profile + theme" },
  { href: "/os/terminal", label: "Terminal", hint: "diagnostics" },
];

export default function OSSideNav() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="text-xs uppercase tracking-widest text-white/60">
        Sector Map
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {ITEMS.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            <div className="flex items-center justify-between gap-2">
              <span>{it.label}</span>
              <span className="text-xs text-white/45">{it.hint}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}