"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const XP_STORAGE_KEY = "shynvo_arcade_xp";
const STREAK_STORAGE_KEY = "shynvo_arcade_streak";
const NAME_STORAGE_KEY = "shynvo_arcade_player_name";

type BadgeState = "Unlocked" | "In progress" | "Locked";

type BadgeItem = {
  title: string;
  desc: string;
  state: BadgeState;
  progress?: number;
};

function getLevelFromXp(xp: number) {
  return Math.max(1, Math.floor(xp / 150) + 1);
}

export default function AchievementsHallPage() {
  const [xp, setXp] = useState(840);
  const [streak, setStreak] = useState(12);
  const [playerName, setPlayerName] = useState("Shynvo Player");

  useEffect(() => {
    try {
      const savedXp = localStorage.getItem(XP_STORAGE_KEY);
      const savedStreak = localStorage.getItem(STREAK_STORAGE_KEY);
      const savedName = localStorage.getItem(NAME_STORAGE_KEY);

      if (savedXp && !Number.isNaN(Number(savedXp))) {
        setXp(Number(savedXp));
      }

      if (savedStreak && !Number.isNaN(Number(savedStreak))) {
        setStreak(Number(savedStreak));
      }

      if (savedName?.trim()) {
        setPlayerName(savedName);
      }
    } catch {
      // ignore
    }
  }, []);

  const level = getLevelFromXp(xp);

  const badges = useMemo<BadgeItem[]>(() => {
    return [
      {
        title: "Logic Rookie",
        desc: "Complete 10 drill rounds.",
        state: xp >= 300 ? "Unlocked" : "In progress",
        progress: Math.min(100, Math.round((xp / 300) * 100)),
      },
      {
        title: "Speed Thinker",
        desc: "Finish a speed drill in under pressure with strong score flow.",
        state: xp >= 500 ? "Unlocked" : "In progress",
        progress: Math.min(100, Math.round((xp / 500) * 100)),
      },
      {
        title: "Interview Hero",
        desc: "Complete 20 interview quest rounds.",
        state: xp >= 900 ? "Unlocked" : "In progress",
        progress: Math.min(100, Math.round((xp / 900) * 100)),
      },
      {
        title: "Arcade Veteran",
        desc: "Reach Level 15 in Arcade Sim.",
        state: level >= 15 ? "Unlocked" : level >= 8 ? "In progress" : "Locked",
        progress: Math.min(100, Math.round((level / 15) * 100)),
      },
      {
        title: "Streak Builder",
        desc: "Maintain a 7-day challenge streak.",
        state: streak >= 7 ? "Unlocked" : streak >= 3 ? "In progress" : "Locked",
        progress: Math.min(100, Math.round((streak / 7) * 100)),
      },
      {
        title: "Diamond Path",
        desc: "Climb to Diamond rank.",
        state: xp >= 6000 ? "Unlocked" : xp >= 2000 ? "In progress" : "Locked",
        progress: Math.min(100, Math.round((xp / 6000) * 100)),
      },
    ];
  }, [xp, streak, level]);

  const unlockedCount = badges.filter((badge) => badge.state === "Unlocked").length;
  const inProgressCount = badges.filter((badge) => badge.state === "In progress").length;
  const lockedCount = badges.filter((badge) => badge.state === "Locked").length;

  function stateClasses(state: BadgeState) {
    if (state === "Unlocked") {
      return {
        wrapper: "border-emerald-400/20 bg-emerald-400/10",
        pill: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
      };
    }

    if (state === "In progress") {
      return {
        wrapper: "border-pink-300/20 bg-pink-400/10",
        pill: "border-pink-300/20 bg-pink-400/10 text-pink-100",
      };
    }

    return {
      wrapper: "border-white/10 bg-white/5",
      pill: "border-white/10 bg-white/5 text-white/70",
    };
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_15%_10%,rgba(244,114,182,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_85%_18%,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_540px_at_50%_100%,rgba(59,130,246,0.08),transparent_55%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/arcade"
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

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-200/70">
            Arcade Sim
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Achievements Hall
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Unlock badges, milestones, and visible proof of your growth across drills,
            interviews, streaks, XP, and rank progression.
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
          Player: {playerName}
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Achievement Summary
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Hall overview
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Unlocked</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {unlockedCount}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">In progress</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {inProgressCount}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Locked</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {lockedCount}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current XP</div>
              <div className="mt-2 text-2xl font-semibold text-white">{xp}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current level</div>
              <div className="mt-2 text-2xl font-semibold text-white">{level}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current streak</div>
              <div className="mt-2 text-2xl font-semibold text-white">{streak}</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Hall Guidance
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Best next unlock
          </h2>

          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4">
              <div className="text-sm font-semibold text-pink-100">
                Recommended path
              </div>
              <div className="mt-2 text-sm leading-6 text-pink-50/90">
                The fastest way to unlock more visible badges now is to keep running
                drills, complete one interview round, and maintain your streak.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Why this matters</div>
              <div className="mt-2 text-base font-semibold text-white">
                Achievements turn progression into visible identity. They make Arcade Sim
                feel like a real growth system, not just a page.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Momentum advice</div>
              <div className="mt-2 text-base font-semibold text-white">
                Keep your streak alive and grow total XP. Those two signals unlock the
                most progress across the hall.
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/arcade/drill"
              className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Open Drill Arena
            </Link>
            <Link
              href="/arcade/interview"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Open Interview Quest
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {badges.map((badge) => {
          const styles = stateClasses(badge.state);

          return (
            <div
              key={badge.title}
              className={`rounded-3xl border p-5 backdrop-blur-sm ${styles.wrapper}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-white">{badge.title}</div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs ${styles.pill}`}
                >
                  {badge.state}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-white/70">{badge.desc}</p>

              {typeof badge.progress === "number" && (
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs text-white/55">
                    <span>Progress</span>
                    <span>{badge.progress}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 transition-all duration-500"
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}