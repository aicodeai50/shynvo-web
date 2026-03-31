"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "shynvo_arcade_player_name";
const MODE_STORAGE_KEY = "shynvo_arcade_mode";
const XP_STORAGE_KEY = "shynvo_arcade_xp";
const STREAK_STORAGE_KEY = "shynvo_arcade_streak";

const quickStatsBase = [
  { label: "Rank", value: "Silver Engineer" },
  { label: "Season", value: "Arcade S1" },
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

const modes = [
  {
    id: "reflex",
    title: "Reflex Mode",
    desc: "Fast decision rounds with time pressure and combo streaks.",
    accent: "from-pink-400 via-fuchsia-400 to-violet-400",
    targetTime: 18,
    rewardXp: 70,
  },
  {
    id: "memory",
    title: "Memory Mode",
    desc: "Pattern retention, repetition, and recall challenge flow.",
    accent: "from-cyan-400 via-sky-400 to-blue-500",
    targetTime: 30,
    rewardXp: 55,
  },
  {
    id: "interview",
    title: "Interview Mode",
    desc: "Think, structure, and respond under a clear timed prompt.",
    accent: "from-emerald-400 via-teal-400 to-cyan-400",
    targetTime: 45,
    rewardXp: 85,
  },
];

const challengePrompts = [
  "You have 30 seconds: name 3 ways to improve focus before an interview.",
  "Explain one technical concept simply, as if teaching a beginner.",
  "Choose the best next step: speed, accuracy, or review — and say why.",
  "Give a fast answer: what makes a system feel reliable to a user?",
  "State one goal, one obstacle, and one next action in one sentence.",
];

function getLevelFromXp(xp: number) {
  return Math.max(1, Math.floor(xp / 150) + 1);
}

function getXpProgress(xp: number) {
  return xp % 150;
}

function formatSeconds(value: number) {
  return value.toString().padStart(2, "0");
}

export default function ArcadeSimPage() {
  const [playerName, setPlayerName] = useState("Shynvo Player");
  const [draftName, setDraftName] = useState("Shynvo Player");

  const [xp, setXp] = useState(840);
  const [streak, setStreak] = useState(12);

  const [selectedModeId, setSelectedModeId] = useState("reflex");
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(18);
  const [isRunning, setIsRunning] = useState(false);
  const [roundFinished, setRoundFinished] = useState(false);
  const [roundScore, setRoundScore] = useState<number | null>(null);

  const selectedMode =
    modes.find((mode) => mode.id === selectedModeId) ?? modes[0];

  const level = getLevelFromXp(xp);
  const xpProgress = getXpProgress(xp);
  const xpGoal = 150;
  const xpPercent = Math.min(100, (xpProgress / xpGoal) * 100);

  useEffect(() => {
    try {
      const savedName = localStorage.getItem(STORAGE_KEY);
      const savedMode = localStorage.getItem(MODE_STORAGE_KEY);
      const savedXp = localStorage.getItem(XP_STORAGE_KEY);
      const savedStreak = localStorage.getItem(STREAK_STORAGE_KEY);

      if (savedName?.trim()) {
        setPlayerName(savedName);
        setDraftName(savedName);
      }

      if (savedMode && modes.some((mode) => mode.id === savedMode)) {
        setSelectedModeId(savedMode);
      }

      if (savedXp && !Number.isNaN(Number(savedXp))) {
        setXp(Number(savedXp));
      }

      if (savedStreak && !Number.isNaN(Number(savedStreak))) {
        setStreak(Number(savedStreak));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setTimeLeft(selectedMode.targetTime);
    setRoundFinished(false);
    setRoundScore(null);
    setIsRunning(false);

    try {
      localStorage.setItem(MODE_STORAGE_KEY, selectedModeId);
    } catch {
      // ignore
    }
  }, [selectedModeId, selectedMode.targetTime]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setIsRunning(false);
          setRoundFinished(true);
          setRoundScore(68);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning]);

  const quickStats = useMemo(
    () => [
      { label: "Level", value: String(level) },
      { label: "XP", value: `${xpProgress} / ${xpGoal}` },
      ...quickStatsBase,
      { label: "Streak", value: `${streak} rounds` },
    ],
    [level, xpProgress, streak]
  );

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

  function startRound() {
    setTimeLeft(selectedMode.targetTime);
    setRoundFinished(false);
    setRoundScore(null);
    setIsRunning(true);
  }

  function pauseRound() {
    setIsRunning(false);
  }

  function resetRound() {
    setIsRunning(false);
    setRoundFinished(false);
    setRoundScore(null);
    setTimeLeft(selectedMode.targetTime);
  }

  function nextPrompt() {
    setActivePromptIndex((prev) => (prev + 1) % challengePrompts.length);
    setRoundFinished(false);
    setRoundScore(null);
    setTimeLeft(selectedMode.targetTime);
    setIsRunning(false);
  }

  function claimReward() {
    const nextXp = xp + selectedMode.rewardXp;
    const nextStreak = streak + 1;

    setXp(nextXp);
    setStreak(nextStreak);
    setRoundFinished(false);
    setRoundScore(null);
    setTimeLeft(selectedMode.targetTime);

    try {
      localStorage.setItem(XP_STORAGE_KEY, String(nextXp));
      localStorage.setItem(STREAK_STORAGE_KEY, String(nextStreak));
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
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
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
            Arcade Sim turns practice into challenge mode. Train through timed drills,
            interview quests, XP loops, score systems, rank ladders, and daily reward flow.
          </p>
        </div>

        <div className="rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm text-pink-100">
          Game Layer: Active
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
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
              <div className="mt-1 text-sm text-white/65">
                Silver Engineer • Level {level}
              </div>
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
              <span>
                {xpProgress} / {xpGoal}
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/10">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="text-sm text-white/60">{item.label}</div>
                <div className="mt-2 text-xl font-semibold text-white">
                  {item.value}
                </div>
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
              <div
                key={badge}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
              >
                <div className="text-sm font-semibold text-white">{badge}</div>
                <div className="mt-1 text-xs text-white/55">Achievement active</div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4">
            <div className="text-sm font-semibold text-pink-100">Next unlock</div>
            <div className="mt-2 text-sm leading-6 text-pink-50/90">
              Reach the next XP threshold to unlock a new player level and move closer
              to Gold Strategist.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Live Mode Selector
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Choose the challenge style
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
              Pick a mode, launch a timed round, score XP, and rotate through prompts.
              This makes Arcade Sim feel like a real arena, not just a route page.
            </p>
          </div>

          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
            Active Mode: {selectedMode.title}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {modes.map((mode) => {
            const active = selectedModeId === mode.id;

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedModeId(mode.id)}
                className={`rounded-3xl border p-5 text-left transition ${
                  active
                    ? "border-white/20 bg-white/[0.11]"
                    : "border-white/10 bg-black/20 hover:bg-white/[0.06]"
                }`}
              >
                <div
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold text-white bg-gradient-to-r ${mode.accent}`}
                >
                  {mode.title}
                </div>
                <p className="mt-4 text-sm leading-6 text-white/72">{mode.desc}</p>
                <div className="mt-4 text-xs text-white/50">
                  Target time: {mode.targetTime}s · Reward: +{mode.rewardXp} XP
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Live Challenge
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                {selectedMode.title}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                Timer
              </div>
              <div className="mt-1 text-2xl font-semibold text-white">
                00:{formatSeconds(timeLeft)}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Prompt
            </div>
            <p className="mt-3 text-base leading-7 text-white/85">
              {challengePrompts[activePromptIndex]}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <button
              type="button"
              onClick={startRound}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Start
            </button>
            <button
              type="button"
              onClick={pauseRound}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Pause
            </button>
            <button
              type="button"
              onClick={resetRound}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={nextPrompt}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Next prompt
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4">
            {!roundFinished ? (
              <div className="text-sm leading-6 text-pink-50/90">
                {isRunning
                  ? "Round active. Focus, answer fast, and beat the timer."
                  : "Press start when you are ready. Touch the prompt flow, then claim reward after finishing."}
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-pink-100">
                    Round finished
                  </div>
                  <div className="mt-1 text-sm text-pink-50/90">
                    Score: {roundScore ?? 68} · Claim +{selectedMode.rewardXp} XP and grow your streak.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={claimReward}
                  className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
                >
                  Claim reward
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Progress Dashboard
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Your arena state
          </h2>

          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current mode reward</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                +{selectedMode.rewardXp} XP
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Suggested next action</div>
              <div className="mt-2 text-base font-semibold text-white">
                Finish one {selectedMode.title.toLowerCase()} round, then open Score Chamber.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Today’s objective</div>
              <div className="mt-2 text-base font-semibold text-white">
                Complete 3 challenge rounds to extend your streak.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current prompt position</div>
              <div className="mt-2 text-base font-semibold text-white">
                Prompt {activePromptIndex + 1} of {challengePrompts.length}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/arcade/score"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Open Score Chamber
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

      <div className="mt-8 rounded-3xl border border-pink-400/20 bg-pink-400/10 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-pink-100">Start here</div>
            <div className="mt-2 max-w-2xl text-sm leading-6 text-pink-50/90">
              New to Arcade Sim? Start with Drill Arena, move into Interview Quest,
              and use Score Chamber to track your growth.
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/arcade/drill"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Start Drill Arena
            </Link>
            <Link
              href="/arcade/daily"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Open Daily Challenge
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {zones.map((zone) => (
          <Link
            key={zone.href}
            href={zone.href}
            className="group rounded-3xl border border-white/10 bg-white/[0.07] p-5 transition hover:bg-white/[0.11]"
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
