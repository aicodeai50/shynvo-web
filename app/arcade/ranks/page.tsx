"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const XP_STORAGE_KEY = "shynvo_arcade_xp";
const STREAK_STORAGE_KEY = "shynvo_arcade_streak";
const NAME_STORAGE_KEY = "shynvo_arcade_player_name";

const ranks = [
  { name: "Bronze Learner", minXp: 0, maxXp: 499 },
  { name: "Silver Engineer", minXp: 500, maxXp: 1499 },
  { name: "Gold Strategist", minXp: 1500, maxXp: 2999 },
  { name: "Platinum Architect", minXp: 3000, maxXp: 5999 },
  { name: "Diamond Master", minXp: 6000, maxXp: Infinity },
];

function formatRankRange(minXp: number, maxXp: number) {
  if (maxXp === Infinity) return `${minXp}+ XP`;
  return `${minXp} - ${maxXp} XP`;
}

function getCurrentRankIndex(xp: number) {
  return ranks.findIndex((rank) => xp >= rank.minXp && xp <= rank.maxXp);
}

function getProgressToNextRank(xp: number, index: number) {
  if (index < 0 || index >= ranks.length - 1) return 100;

  const current = ranks[index];
  const span = current.maxXp - current.minXp + 1;
  const progress = ((xp - current.minXp) / span) * 100;

  return Math.max(0, Math.min(100, progress));
}

export default function RankLadderPage() {
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

  const currentRankIndex = useMemo(() => getCurrentRankIndex(xp), [xp]);
  const currentRank = currentRankIndex >= 0 ? ranks[currentRankIndex] : ranks[0];
  const nextRank =
    currentRankIndex >= 0 && currentRankIndex < ranks.length - 1
      ? ranks[currentRankIndex + 1]
      : null;

  const progressPercent = getProgressToNextRank(xp, currentRankIndex);
  const xpToNextRank =
    nextRank && xp < nextRank.minXp ? nextRank.minXp - xp : 0;

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
            Rank Ladder
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Climb visible ranks through XP, consistency, challenge performance, and
            daily arena progress.
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
          Player: {playerName}
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Current Position
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            {currentRank.name}
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current XP</div>
              <div className="mt-2 text-2xl font-semibold text-white">{xp}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Round streak</div>
              <div className="mt-2 text-2xl font-semibold text-white">{streak}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Next rank in</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {nextRank ? `${xpToNextRank} XP` : "Maxed"}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">Rank progress</div>
                <div className="mt-1 text-sm text-white/60">
                  {nextRank
                    ? `Progressing from ${currentRank.name} to ${nextRank.name}`
                    : "You are already at the highest visible rank"}
                </div>
              </div>
              <div className="text-sm text-white/70">
                {Math.round(progressPercent)}%
              </div>
            </div>

            <div className="mt-4 h-4 rounded-full bg-white/10">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Ladder Guidance
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            How to climb faster
          </h2>

          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Best action now</div>
              <div className="mt-2 text-base font-semibold text-white">
                Complete one more challenge round and one daily objective to shorten the
                path to the next rank.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Streak pressure</div>
              <div className="mt-2 text-base font-semibold text-white">
                Your streak is {streak}. Keeping it alive improves momentum and makes the
                rank ladder feel active.
              </div>
            </div>

            <div className="rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4">
              <div className="text-sm font-semibold text-pink-100">Next milestone</div>
              <div className="mt-2 text-sm leading-6 text-pink-50/90">
                {nextRank
                  ? `Gain ${xpToNextRank} more XP to unlock ${nextRank.name}.`
                  : "You have reached the top visible rank in the current ladder."}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/arcade"
              className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Back to Arcade
            </Link>
            <Link
              href="/arcade/daily"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Open Daily Challenge
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {ranks.map((rank, index) => {
          const active = index === currentRankIndex;
          const completed = xp > rank.maxXp;
          const upcoming = xp < rank.minXp;

          return (
            <div
              key={rank.name}
              className={`rounded-3xl border p-5 transition ${
                active
                  ? "border-pink-300/30 bg-pink-400/10"
                  : completed
                  ? "border-emerald-400/20 bg-emerald-400/10"
                  : upcoming
                  ? "border-white/10 bg-white/5"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold text-white">{rank.name}</div>
                  <div className="mt-2 text-sm text-white/60">
                    {completed
                      ? "Completed rank"
                      : active
                      ? "Current active rank"
                      : upcoming
                      ? "Upcoming rank"
                      : "Rank state"}
                  </div>
                </div>

                <div className="text-sm text-white/70">
                  {formatRankRange(rank.minXp, rank.maxXp)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}