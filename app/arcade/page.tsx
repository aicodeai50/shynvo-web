"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const quickStats = [
  { label: "Level", value: "7" },
  { label: "XP", value: "840 / 1000" },
  { label: "Rank", value: "Silver Engineer" },
  { label: "Streak", value: "12 rounds" },
];

const zones = [
  {
    href: "/arcade/drill",
    title: "Drill Arena",
    desc: "Fast challenge rounds for focus, reflex, logic, and performance training.",
    tags: ["Drills", "Speed", "Practice"],
  },
  {
    href: "/arcade/interview",
    title: "Interview Quest",
    desc: "Gamified interview and oral-response practice with progress-style challenge flow.",
    tags: ["Interview", "Questions", "Progress"],
  },
  {
    href: "/arcade/score",
    title: "Score Chamber",
    desc: "Track performance, streaks, levels, challenge scores, and XP flow.",
    tags: ["Scores", "Levels", "Ranking"],
  },
  {
    href: "/arcade/achievements",
    title: "Achievements Hall",
    desc: "Unlock badges, milestones, trophies, and visible player progress.",
    tags: ["Badges", "Milestones", "XP"],
  },
  {
    href: "/arcade/ranks",
    title: "Rank Ladder",
    desc: "See your current rank, climb the ladder, and compare challenge progress.",
    tags: ["Bronze", "Silver", "Gold"],
  },
  {
    href: "/arcade/daily",
    title: "Daily Challenge",
    desc: "Complete rotating daily quests for bonus XP, streak growth, and reward boosts.",
    tags: ["Daily", "Bonus", "Rewards"],
  },
];

const badges = ["Logic Rookie", "Speed Thinker", "Quest Starter", "Daily Streak"];

const STORAGE_KEY = "shynvo_arcade_player_name";

export default function ArcadeSimPage() {
  const [playerName, setPlayerName] = useState("Shynvo Player");
  const [draftName, setDraftName] = useState("Shynvo Player");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved?.trim()) {
        setPlayerName(saved);
        setDraftName(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  function saveName() {
    const next = draftName.trim() || "Shynvo Player";
    setPlayerName(next);
    setDraftName(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_15%_10%,rgba(244,114,182,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_85%_14%,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_540px_at_50%_100%,rgba(59,130,246,0.08),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          ← Back
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
        >
          Home
        </Link>
        <span className="inline-flex items-center rounded-xl border border-pink-400/20 bg-pink-400/10 px-3 py-2 text-sm text-pink-100">
          Arcade Sim
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {[
          { href: "/arcade/drill", label: "Drills" },
          { href: "/arcade/interview", label: "Interviews" },
          { href: "/arcade/score", label: "Scores" },
          { href: "/arcade/achievements", label: "Achievements" },
          { href: "/arcade/ranks", label: "Ranks" },
          { href: "/arcade/daily", label: "Daily" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-200/70">
            Competitive Skill Arena
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Arcade Sim
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Arcade Sim turns practice into challenge mode. Users train skills through drills,
            interview quests, score systems, ranks, achievements, and daily reward loops.
          </p>
        </div>

        <div className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-100">
          Game Layer: Active
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-300/20 bg-pink-400/10 text-xl font-semibold text-pink-100">
              {playerName.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                Player Profile
              </div>
              <div className="mt-1 text-2xl font-semibold text-white">{playerName}</div>
              <div className="mt-1 text-sm text-white/65">Silver Engineer • Level 7</div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="Type player name"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="button"
              onClick={saveName}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Save name
            </button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm text-white/70">
              <span>XP Progress</span>
              <span>840 / 1000</span>
            </div>
            <div className="h-3 rounded-full bg-white/10">
              <div className="h-3 w-[84%] rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {quickStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm text-white/60">{item.label}</div>
                <div className="mt-2 text-xl font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Active Badges
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Recent unlocked identity
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {badges.map((badge) => (
              <div key={badge} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <div className="text-sm font-semibold text-white">{badge}</div>
                <div className="mt-1 text-xs text-white/55">Achievement active</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4">
            <div className="text-sm font-semibold text-pink-100">Next unlock</div>
            <div className="mt-2 text-sm leading-6 text-pink-50/90">
              Reach 1000 XP to unlock the next player level and move closer to Gold Strategist.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {zones.map((zone) => (
          <Link
            key={zone.href}
            href={zone.href}
            className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <div className="text-xl font-semibold text-white">{zone.title}</div>
            <p className="mt-3 text-sm leading-6 text-white/70">{zone.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {zone.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-white/90 group-hover:text-white">
              Enter →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
