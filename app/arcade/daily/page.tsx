"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const XP_STORAGE_KEY = "shynvo_arcade_xp";
const STREAK_STORAGE_KEY = "shynvo_arcade_streak";
const NAME_STORAGE_KEY = "shynvo_arcade_player_name";
const DAILY_COMPLETED_KEY = "shynvo_arcade_daily_completed";

const dailyTasksSeed = [
  {
    id: "logic-3",
    title: "Complete 3 logic drills",
    rewardLabel: "+60 XP",
    xpReward: 60,
  },
  {
    id: "interview-1",
    title: "Finish 1 interview quest",
    rewardLabel: "+40 XP",
    xpReward: 40,
  },
  {
    id: "streak",
    title: "Maintain today streak",
    rewardLabel: "+1 streak",
    xpReward: 0,
  },
  {
    id: "score-80",
    title: "Reach 80% score or higher",
    rewardLabel: "+20 bonus XP",
    xpReward: 20,
  },
];

export default function DailyChallengePage() {
  const [playerName, setPlayerName] = useState("Shynvo Player");
  const [xp, setXp] = useState(840);
  const [streak, setStreak] = useState(12);
  const [claimedPack, setClaimedPack] = useState(false);

  const [tasks, setTasks] = useState(
    dailyTasksSeed.map((task, index) => ({
      ...task,
      completed: index === 0,
    }))
  );

  useEffect(() => {
    try {
      const savedXp = localStorage.getItem(XP_STORAGE_KEY);
      const savedStreak = localStorage.getItem(STREAK_STORAGE_KEY);
      const savedName = localStorage.getItem(NAME_STORAGE_KEY);
      const savedCompleted = localStorage.getItem(DAILY_COMPLETED_KEY);

      if (savedXp && !Number.isNaN(Number(savedXp))) {
        setXp(Number(savedXp));
      }

      if (savedStreak && !Number.isNaN(Number(savedStreak))) {
        setStreak(Number(savedStreak));
      }

      if (savedName?.trim()) {
        setPlayerName(savedName);
      }

      if (savedCompleted) {
        const parsed = JSON.parse(savedCompleted) as {
          tasks?: { id: string; completed: boolean }[];
          claimedPack?: boolean;
        };

        if (parsed.tasks?.length) {
          setTasks((prev) =>
            prev.map((task) => {
              const found = parsed.tasks?.find((item) => item.id === task.id);
              return found ? { ...task, completed: found.completed } : task;
            })
          );
        }

        if (parsed.claimedPack) {
          setClaimedPack(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const completedCount = tasks.filter((task) => task.completed).length;
  const allCompleted = completedCount === tasks.length;

  const earnedToday = useMemo(() => {
    return tasks.reduce((sum, task) => {
      if (!task.completed) return sum;
      return sum + task.xpReward;
    }, 0);
  }, [tasks]);

  function persistDaily(nextTasks: typeof tasks, nextClaimedPack: boolean) {
    try {
      localStorage.setItem(
        DAILY_COMPLETED_KEY,
        JSON.stringify({
          tasks: nextTasks.map((task) => ({
            id: task.id,
            completed: task.completed,
          })),
          claimedPack: nextClaimedPack,
        })
      );
    } catch {
      // ignore
    }
  }

  function toggleTask(id: string) {
    if (claimedPack) return;

    const nextTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(nextTasks);
    persistDaily(nextTasks, claimedPack);
  }

  function claimRewardPack() {
    if (!allCompleted || claimedPack) return;

    const nextXp = xp + 150;
    const nextStreak = streak + 1;

    setXp(nextXp);
    setStreak(nextStreak);
    setClaimedPack(true);

    try {
      localStorage.setItem(XP_STORAGE_KEY, String(nextXp));
      localStorage.setItem(STREAK_STORAGE_KEY, String(nextStreak));
    } catch {
      // ignore
    }

    persistDaily(tasks, true);
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
            Daily Challenge
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Return every day for bonus XP, streak growth, and rotating challenge rewards.
            Mark progress, complete the pack, and keep your momentum alive.
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
          Player: {playerName}
        </div>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">Today reward pack</div>
              <div className="mt-2 text-white/70">
                Complete all tasks to unlock +150 XP and a Daily Winner badge.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                Progress
              </div>
              <div className="mt-1 text-2xl font-semibold text-white">
                {completedCount}/{tasks.length}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tasks.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => toggleTask(task.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  task.completed
                    ? "border-pink-300/30 bg-pink-400/10"
                    : "border-white/10 bg-black/20 hover:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-white">{task.title}</div>
                    <div className="mt-2 text-sm text-pink-200">{task.rewardLabel}</div>
                  </div>

                  <div
                    className={`mt-1 h-5 w-5 rounded-full border ${
                      task.completed
                        ? "border-pink-300/40 bg-pink-400/80"
                        : "border-white/20 bg-transparent"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">Pack completion</div>
                <div className="mt-1 text-sm text-white/60">
                  Finish every task to claim the daily bundle.
                </div>
              </div>
              <div className="text-sm text-white/70">{Math.round((completedCount / tasks.length) * 100)}%</div>
            </div>

            <div className="mt-4 h-4 rounded-full bg-white/10">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-400 transition-all duration-500"
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Daily Status
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Reward flow
          </h2>

          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">XP earned from checked tasks</div>
              <div className="mt-2 text-2xl font-semibold text-white">+{earnedToday} XP</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current streak</div>
              <div className="mt-2 text-2xl font-semibold text-white">{streak}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Current total XP</div>
              <div className="mt-2 text-2xl font-semibold text-white">{xp}</div>
            </div>

            <div className="rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4">
              <div className="text-sm font-semibold text-pink-100">Daily result</div>
              <div className="mt-2 text-sm leading-6 text-pink-50/90">
                {!allCompleted
                  ? "Complete all tasks to unlock the full +150 XP pack and extend your daily momentum."
                  : claimedPack
                  ? "Daily reward pack already claimed. Your XP and streak have been updated."
                  : "All tasks completed. Claim the reward pack now."}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={claimRewardPack}
              disabled={!allCompleted || claimedPack}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                !allCompleted || claimedPack
                  ? "cursor-not-allowed border border-white/10 bg-white/5 text-white/40"
                  : "bg-white text-[#0B0F14] hover:bg-white/90"
              }`}
            >
              {claimedPack ? "Reward claimed" : "Claim +150 XP"}
            </button>

            <Link
              href="/arcade/drill"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Open Drill Arena
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}