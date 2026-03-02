"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Suggestion = {
  title: string;
  desc: string;
  href: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getDefaultSuggestion(path: string): Suggestion {
  // “Best direction” logic (simple now; later we can make it smarter)
  if (path.startsWith("/os/missions")) {
    return { title: "Next: Timeline", desc: "Review progress and milestones.", href: "/os/timeline" };
  }
  if (path.startsWith("/os/timeline")) {
    return { title: "Next: Focus", desc: "Start an execution loop.", href: "/os/focus" };
  }
  if (path.startsWith("/os/focus")) {
    return { title: "Next: Momentum", desc: "Turn today into consistency.", href: "/os/momentum" };
  }
  if (path.startsWith("/os/cognitive")) {
    return { title: "Next: Focus", desc: "Convert energy into action.", href: "/os/focus" };
  }
  return { title: "Best next: Missions", desc: "Set a goal and generate a plan.", href: "/os/missions" };
}

export default function RobotGuide({
  enabledByDefault = true,
}: {
  enabledByDefault?: boolean;
}) {
  const router = useRouter();
  const path = usePathname();

  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return enabledByDefault;
    const stored = window.localStorage.getItem("shynvo_robot_enabled");
    return stored ? stored === "1" : enabledByDefault;
  });

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const suggestion = useMemo(() => getDefaultSuggestion(path || "/os"), [path]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      // Keep robot near bottom-right, with a “follow cursor” vibe but restrained
      const x = clamp(e.clientX + 40, 0, window.innerWidth - 260);
      const y = clamp(e.clientY + 40, 0, window.innerHeight - 260);
      setPos({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("shynvo_robot_enabled", enabled ? "1" : "0");
  }, [enabled]);

  if (!enabled) {
    return (
      <button
        type="button"
        onClick={() => setEnabled(true)}
        className="fixed bottom-5 right-5 z-[60] rounded-2xl border border-white/15 bg-black/50 px-4 py-2 text-xs text-white/80 backdrop-blur-xl hover:bg-white/10"
      >
        Enable Guide Robot →
      </button>
    );
  }

  return (
    <div
      className="fixed z-[60]"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: "transform 120ms ease-out",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Robot “human-like” silhouette (SVG) */}
      <div className="relative">
        {/* Glow aura */}
        <div
          className="pointer-events-none absolute -inset-6 rounded-full opacity-70 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.35), transparent 60%), radial-gradient(circle at 70% 40%, rgba(180,140,255,0.28), transparent 60%), radial-gradient(circle at 50% 80%, rgba(163,230,53,0.18), transparent 60%)",
          }}
        />

        <div className="relative flex items-end gap-3">
          {/* Head+torso */}
          <div className="relative">
            <div className="h-[112px] w-[78px] rounded-[42px] border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl">
              <div className="mx-auto mt-3 h-8 w-8 rounded-full border border-white/15 bg-black/40" />
              <div className="mx-auto mt-3 h-2 w-12 rounded-full bg-white/10" />
              <div className="mx-auto mt-2 h-2 w-10 rounded-full bg-white/10" />
              {/* “visor” */}
              <div
                className="mx-auto mt-3 h-3 w-14 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(34,211,238,0.55), rgba(180,140,255,0.50))",
                  boxShadow: "0 0 18px rgba(34,211,238,0.28)",
                }}
              />
            </div>

            {/* Arm pointing */}
            <div
              className="absolute -right-10 bottom-10 h-2 w-16 rounded-full border border-white/15 bg-white/10"
              style={{ transform: "rotate(-18deg)" }}
            />
            <div
              className="absolute -right-[88px] bottom-[52px] h-3 w-10 rounded-full border border-white/15 bg-white/10"
              style={{ transform: "rotate(8deg)" }}
            />
            <div
              className="absolute -right-[104px] bottom-[58px] h-4 w-4 rounded-full"
              style={{
                background: "rgba(255,255,255,0.18)",
                boxShadow: "0 0 14px rgba(180,140,255,0.35)",
              }}
            />
          </div>

          {/* Speech/suggestion bubble */}
          <div className="w-[260px] rounded-3xl border border-white/15 bg-black/55 p-4 text-xs text-white/80 backdrop-blur-xl shadow-2xl">
            <div className="flex items-start justify-between gap-2">
              <div className="font-semibold text-white">SH Guide</div>
              <button
                type="button"
                onClick={() => setEnabled(false)}
                className="text-white/60 hover:text-white"
                aria-label="Disable robot"
                title="Disable"
              >
                ✕
              </button>
            </div>

            <div className="mt-2 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="text-[11px] tracking-widest text-white/60">BEST DIRECTION</div>
              <div className="mt-1 text-sm font-semibold text-white">{suggestion.title}</div>
              <div className="mt-1 text-xs text-white/70">{suggestion.desc}</div>
              <button
                type="button"
                onClick={() => router.push(suggestion.href)}
                className="mt-3 w-full rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/85 hover:bg-white/15"
              >
                Go →
              </button>
            </div>

            <div className="mt-2 text-[11px] text-white/55">
              {hover ? "Tip: Use Terminal for routes + AI." : "Hover me for tips."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
