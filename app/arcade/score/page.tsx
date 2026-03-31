"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const XP_STORAGE_KEY = "shynvo_arcade_xp";
const STREAK_STORAGE_KEY = "shynvo_arcade_streak";
const MODE_STORAGE_KEY = "shynvo_arcade_mode";
const NAME_STORAGE_KEY = "shynvo_arcade_player_name";

const recentRoundsSeed = [
  {
    mode: "Reflex Mode",
    score: 84,
    result: "Win",
    xp: 70,
    time: "18s",
  },
  {
    mode: "Memory Mode",
    score: 76,
    result: "Clear",
    xp: 55,
    time: "30s",
  },
  {
    mode: "Interview Mode",
    score: 91,
    result: "Strong",
    xp: 85,
    time: "45s",
  },
  {
    mode: "Reflex Mode",
    score: 72,
    result: "Pass",
    xp: 70,
    time: "18s",
  },
];

function getLevelFromXp(xp: number) {
  return Math.max(1, Math.floor(xp / 150) + 1);
}

function getXpProgress(xp: number) {
  return xp % 150;
}

function getRankFromLevel(level: number) {
  if (level >= 12) return "Gold Strategist";
  if (level >= 8) return "Silver Engineer";
  if (level >= 4) return "Bronze Builder";
  return "Rookie Challenger";
}

function averageScore(rounds: { score: number }[]) {
  if (!rounds.length) return 0;
  return Math.round(rounds.reduce((sum, round) => sum + round.score, 0) / rounds.length);
}

export default function ScoreChamberPage() {
  const [playerName, setPlayerName] = useState("Shynvo Player");
  const [xp, setXp] = useState(840);
  const [streak, setStreak] = useState(12);
  const [lastMode, setLastMode] = useState("Reflex Mode");

  useEffect(() => {
    try {
      const savedXp = localStorage.getItem(XP_STORAGE_KEY);
      const savedStreak = localStorage.getItem(STREAK_STORAGE_KEY);
      const savedMode = localStorage.getItem(MODE_STORAGE_KEY);
      const savedName = localStorage.getItem(NAME_STORAGE_KEY);

      if (savedXp && !Number.isNaN(Number(savedXp))) {
        setXp(Number(savedXp));
      }

      if (savedStreak && !Number.isNaN(Number(savedStreak))) {
        setStreak(Number(savedStreak));
      }

      if (savedMode?.trim()) {
        if (savedMode === "reflex") setLastMode("Reflex Mode");
        if (savedMode === "memory") setLastMode("Memory Mode");
        if (savedMode === "interview") setLastMode("Interview Mode");
      }

      if (savedName?.trim()) {
        setPlayerName(savedName);
      }
    } catch {
      // ignore
    }
  }, []);

  const level = getLevelFromXp(xp);
  const xpGoal = 150;
  const xpProgress = getXpProgress(xp);
  const xpPercent = Math.min(100, (xpProgress / xpGoal) * 100);
  const rank = getRankFromLevel(level);

  const recentRounds = useMemo(() => {
    return recentRoundsSeed.map((round, index) =>
      index === 0 ? { ...round, mode: lastMode } : round
    );
  }, [lastMode]);

  const avgScore = averageScore(recentRounds);
  const logicScore = Math.min(100, avgScore + 4);
  const interviewLevel = Math.max(1, level);
  const challengeRank = rank;

  const stats = [
    { label: "Logic Score", value: `${logicScore}/100` },
    { label: "Focus Streak", value: `${streak} rounds` },
    { label: "Interview Level", value: String(interviewLevel) },
    { label: "Challenge Rank", value: challengeRank },
  ];

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
            Score Chamber
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Track levels, challenge performance, streaks, XP growth, and progress
            across Arcade Sim in one chamber.
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
          Player: {playerName}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <div className="text-sm text-white/60">{item.label}</div>
            <div className="mt-3 text-3xl font-semibold text-white">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">XP Progress</div>
              <div className="mt-1 text-sm text-white/60">
                Level {level} progress toward Level {level + 1}
              </div>
            </div>
            <div className="text-sm text-white/70">
              {xpProgress} / {xpGoal} XP
            </div>
          </div>

          <div className="mt-4 h-4 rounded-full bg-white/10">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Total XP</div>
              <div className="mt-2 text-2xl font-semibold text-white">{xp}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current Level</div>
              <div className="mt-2 text-2xl font-semibold text-white">{level}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current Rank</div>
              <div className="mt-2 text-2xl font-semibold text-white">{rank}</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Performance Summary
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Chamber snapshot
          </h2>

          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Average score</div>
              <div className="mt-2 text-2xl font-semibold text-white">{avgScore}/100</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Last active mode</div>
              <div className="mt-2 text-2xl font-semibold text-white">{lastMode}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Streak pressure</div>
              <div className="mt-2 text-base font-semibold text-white">
                Keep your streak alive by clearing one more challenge today.
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

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Recent Rounds
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Latest challenge history
            </h2>
          </div>

          <div className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-100">
            Live performance feed
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <div className="grid grid-cols-[1.25fr_0.7fr_0.7fr_0.6fr_0.5fr] bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
            <div>Mode</div>
            <div>Score</div>
            <div>Result</div>
            <div>XP</div>
            <div>Time</div>
          </div>

          {recentRounds.map((round, index) => (
            <div
              key={`${round.mode}-${index}`}
              className="grid grid-cols-[1.25fr_0.7fr_0.7fr_0.6fr_0.5fr] border-t border-white/10 bg-black/20 px-4 py-4 text-sm text-white/80"
            >
              <div className="font-semibold text-white">{round.mode}</div>
              <div>{round.score}/100</div>
              <div>{round.result}</div>
              <div>+{round.xp}</div>
              <div>{round.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}