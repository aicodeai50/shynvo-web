"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type ContinueItem = {
  href: string;
  title: string;
  desc: string;
};

const PATH_MAP: Record<string, ContinueItem> = {
  "/robot": {
    href: "/robot",
    title: "Continue with Shynvo Robot",
    desc: "Pick up your AI-guided platform journey where you left off.",
  },
  "/university": {
    href: "/university",
    title: "Continue in University Hub",
    desc: "Return to structured learning and guided academic paths.",
  },
  "/frontier": {
    href: "/frontier",
    title: "Continue in Frontier Lab",
    desc: "Go back to coding, systems, and engineering workflows.",
  },
  "/academy": {
    href: "/academy",
    title: "Continue in Shynvo Academy",
    desc: "Resume school-focused learning and subject-based progress.",
  },
  "/enterprise": {
    href: "/enterprise",
    title: "Continue in Shynvo Enterprise",
    desc: "Return to missions, teams, analytics, and structured work.",
  },
  "/experiments": {
    href: "/experiments",
    title: "Continue in Experiments",
    desc: "Go back to simulation, debate, and AI exploration spaces.",
  },
  "/arcade": {
    href: "/arcade",
    title: "Continue in Arcade Sim",
    desc: "Jump back into skill drills, challenge loops, and practice.",
  },
};

export default function ContinueSection() {
  const [savedPath, setSavedPath] = useState<string>("");

  useEffect(() => {
    try {
      const value = localStorage.getItem("shynvo_last_path") || "";
      setSavedPath(value);
    } catch {
      setSavedPath("");
    }
  }, []);

  const item = useMemo(() => {
    if (!savedPath) return null;
    return PATH_MAP[savedPath] || null;
  }, [savedPath]);

  if (!item) return null;

  return (
    <section className="mt-6 sm:mt-8">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-[2px]">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          Continue
        </div>

        <h2 className="mt-3 text-2xl font-semibold text-white">
          {item.title}
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
          {item.desc}
        </p>

        <div className="mt-5">
          <Link
            href={item.href}
            className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/88 transition hover:bg-white/10 hover:text-white"
          >
            Resume path →
          </Link>
        </div>
      </div>
    </section>
  );
}
