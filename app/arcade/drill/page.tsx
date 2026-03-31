"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DrillMode = "logic" | "speed" | "focus" | "memory";

type DrillQuestion = {
  question: string;
  focus: string;
};

type DrillModeData = {
  title: string;
  timerSeconds: number;
  multiplier: number;
  bonus: string;
  placeholder: string;
  response: string;
  rewardXp: number;
  questions: DrillQuestion[];
};

const XP_STORAGE_KEY = "shynvo_arcade_xp";
const STREAK_STORAGE_KEY = "shynvo_arcade_streak";

const modeData: Record<DrillMode, DrillModeData> = {
  logic: {
    title: "Logic Drill",
    timerSeconds: 45,
    multiplier: 1.8,
    bonus: "Reasoning bonus",
    placeholder:
      "Example: Give me a fast logic challenge about priorities, sequence, or hidden assumptions.",
    response:
      "Logic mode rewards structured thinking, sequence detection, and clean reasoning.",
    rewardXp: 40,
    questions: [
      {
        question:
          "You have 3 tasks, 2 deadlines, and only one uninterrupted hour. What is your decision process?",
        focus: "Prioritization",
      },
      {
        question:
          "A team wants speed, quality, and low cost at the same time. What trade-off do you explain first?",
        focus: "Trade-offs",
      },
      {
        question:
          "If a result looks impressive but the assumptions are weak, how do you challenge it?",
        focus: "Reasoning",
      },
      {
        question:
          "How do you decide what to do first when two important tasks depend on each other?",
        focus: "Sequence thinking",
      },
    ],
  },
  speed: {
    title: "Speed Drill",
    timerSeconds: 20,
    multiplier: 2.4,
    bonus: "Reaction bonus",
    placeholder:
      "Example: Give me a rapid pattern or short-answer challenge to solve under pressure.",
    response:
      "Speed mode rewards quick recognition, fast reaction, and short high-pressure decisions.",
    rewardXp: 55,
    questions: [
      {
        question:
          "You have 20 seconds: name the first 3 actions you take when a page suddenly breaks in production.",
        focus: "Fast response",
      },
      {
        question:
          "A user reports a bug, a manager asks for an update, and support wants guidance. Who do you address first and why?",
        focus: "Pressure handling",
      },
      {
        question:
          "Quick choice: optimize rendering, fix navigation, or improve copy. What do you pick first for user impact?",
        focus: "Decision speed",
      },
      {
        question:
          "In one sentence, explain what makes an interface feel reliable.",
        focus: "Compressed clarity",
      },
    ],
  },
  focus: {
    title: "Focus Drill",
    timerSeconds: 60,
    multiplier: 1.5,
    bonus: "Consistency bonus",
    placeholder:
      "Example: Give me a task that requires attention, filtering, and careful response.",
    response:
      "Focus mode rewards concentration, reduced distraction, and stable performance.",
    rewardXp: 35,
    questions: [
      {
        question:
          "Read the situation carefully: a project is delayed, but the main risk is still unclear. How do you isolate the true blocker?",
        focus: "Attention control",
      },
      {
        question:
          "What steps would you take to review a complex task without skipping important details?",
        focus: "Careful process",
      },
      {
        question:
          "How do you stay accurate when multiple small issues appear at once?",
        focus: "Stability",
      },
      {
        question:
          "Describe how you keep focus when a task is long, repetitive, and easy to rush.",
        focus: "Concentration",
      },
    ],
  },
  memory: {
    title: "Memory Drill",
    timerSeconds: 30,
    multiplier: 1.7,
    bonus: "Recall bonus",
    placeholder:
      "Example: Give me a challenge that tests working memory and sequence retention.",
    response:
      "Memory mode rewards retention, ordered recall, and pattern memory under time pressure.",
    rewardXp: 42,
    questions: [
      {
        question:
          "Remember these steps: observe, compare, prioritize, respond. Now explain how you would use them in order.",
        focus: "Ordered recall",
      },
      {
        question:
          "You are given 4 signals: latency, errors, drop-off, complaints. Which sequence would you check and why?",
        focus: "Working memory",
      },
      {
        question:
          "How do you retain key details from a fast meeting when nothing is written down yet?",
        focus: "Retention strategy",
      },
      {
        question:
          "What system do you use to remember multiple constraints while answering under pressure?",
        focus: "Memory control",
      },
    ],
  },
};

function scoreAnswer(answer: string, mode: DrillMode) {
  const trimmed = answer.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).filter((x) => x.trim().length > 0).length
    : 0;

  let structure = 0;
  let clarity = 0;
  let speedStyle = 0;
  let depth = 0;

  if (sentences >= 3) structure += 25;
  else if (sentences >= 2) structure += 18;
  else if (sentences >= 1) structure += 10;

  if (words >= 35) clarity += 25;
  else if (words >= 20) clarity += 18;
  else if (words > 0) clarity += 10;

  const keywords = [
    "because",
    "first",
    "then",
    "impact",
    "risk",
    "user",
    "priority",
    "reason",
    "trade-off",
    "focus",
    "sequence",
    "system",
  ];

  const lower = trimmed.toLowerCase();
  const matches = keywords.filter((word) => lower.includes(word)).length;
  speedStyle += Math.min(20, matches * 4);

  if (mode === "speed") {
    if (words >= 8 && words <= 35) depth += 30;
    else if (words > 35 && words <= 60) depth += 20;
    else if (words > 0) depth += 12;
  } else {
    if (words >= 70) depth += 30;
    else if (words >= 45) depth += 22;
    else if (words >= 25) depth += 14;
    else if (words > 0) depth += 8;
  }

  const total = Math.min(100, structure + clarity + speedStyle + depth);

  return {
    total,
    structure: Math.min(25, structure),
    clarity: Math.min(25, clarity),
    speedStyle: Math.min(20, speedStyle),
    depth: Math.min(30, depth),
  };
}

function getFeedback(score: number, modeTitle: string) {
  if (score >= 85) {
    return `${modeTitle} result: strong performance. Clear structure, good control, and confident reasoning.`;
  }
  if (score >= 70) {
    return `${modeTitle} result: good performance. Strong base, but the answer can still be sharper and more direct.`;
  }
  if (score >= 55) {
    return `${modeTitle} result: decent performance. Add more structure, stronger examples, and a clearer final choice.`;
  }
  return `${modeTitle} result: early-stage response. Slow down, organize the answer, and explain the logic behind each step.`;
}

function formatSeconds(value: number) {
  return value.toString().padStart(2, "0");
}

export default function DrillArenaPage() {
  const [mode, setMode] = useState<DrillMode>("logic");
  const [answer, setAnswer] = useState("");
  const [prompt, setPrompt] = useState(
    "Give me a short logic challenge about prioritizing tasks with limited time."
  );
  const [started, setStarted] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(modeData.logic.timerSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);

  const active = useMemo(() => modeData[mode], [mode]);
  const activeQuestion = active.questions[questionIndex];
  const liveScore = useMemo(() => scoreAnswer(answer, mode), [answer, mode]);

  useEffect(() => {
    setStarted(false);
    setAnswer("");
    setSubmittedScore(null);
    setQuestionIndex(0);
    setTimeLeft(active.timerSeconds);
    setIsRunning(false);
  }, [mode, active.timerSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [isRunning]);

  function startDrill() {
    setStarted(true);
    setSubmittedScore(null);
    setTimeLeft(active.timerSeconds);
    setIsRunning(true);
  }

  function pauseDrill() {
    setIsRunning(false);
  }

  function resumeDrill() {
    if (started && timeLeft > 0) {
      setIsRunning(true);
    }
  }

  function resetDrill() {
    setPrompt(
      "Give me a short logic challenge about prioritizing tasks with limited time."
    );
    setAnswer("");
    setStarted(false);
    setSubmittedScore(null);
    setQuestionIndex(0);
    setTimeLeft(active.timerSeconds);
    setIsRunning(false);
  }

  function nextChallenge() {
    setQuestionIndex((prev) => (prev + 1) % active.questions.length);
    setAnswer("");
    setSubmittedScore(null);
    setTimeLeft(active.timerSeconds);
    setIsRunning(started);
  }

  function submitDrill() {
    if (!answer.trim()) return;

    const total = liveScore.total;
    setSubmittedScore(total);
    setIsRunning(false);

    try {
      const prevXp = Number(localStorage.getItem(XP_STORAGE_KEY) || "840");
      const prevStreak = Number(localStorage.getItem(STREAK_STORAGE_KEY) || "12");

      const earnedXp = Math.max(18, Math.round(active.rewardXp + (total - 60) / 3));

      localStorage.setItem(XP_STORAGE_KEY, String(prevXp + earnedXp));
      localStorage.setItem(STREAK_STORAGE_KEY, String(prevStreak + 1));
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

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-pink-200/70">
          Arcade Sim
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Drill Arena
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Practice through short challenge loops. Choose a mode, launch a timed round,
          answer fast, and score progress inside the arena.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["logic", "Logic Drill"],
                ["speed", "Speed Drill"],
                ["focus", "Focus Drill"],
                ["memory", "Memory Drill"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMode(value)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  mode === value
                    ? "border-pink-300/30 bg-pink-400/15 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/10"
                }`}
              >
                <div className="text-sm font-semibold">{label}</div>
              </button>
            ))}
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-white">Challenge prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={active.placeholder}
              rows={4}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Live Challenge
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  {activeQuestion.question}
                </div>
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

            <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              Focus: {activeQuestion.focus}
            </div>

            <div className="mt-5">
              <label className="text-sm font-semibold text-white">Your answer</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write a fast, structured answer. Explain your logic clearly."
                rows={7}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startDrill}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
              >
                Start drill
              </button>
              <button
                type="button"
                onClick={pauseDrill}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Pause
              </button>
              <button
                type="button"
                onClick={resumeDrill}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={submitDrill}
                className="rounded-2xl border border-pink-300/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-100 hover:bg-pink-400/15"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={nextChallenge}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Next challenge
              </button>
              <button
                type="button"
                onClick={resetDrill}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Current mode
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">{active.title}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Round timer</div>
              <div className="mt-1 text-white">{active.timerSeconds} sec</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Score multiplier</div>
              <div className="mt-1 text-white">x{active.multiplier}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Accuracy bonus</div>
              <div className="mt-1 text-white">{active.bonus}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Live score</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {liveScore.total}/100
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-white/60">
                <div>Structure: {liveScore.structure}</div>
                <div>Clarity: {liveScore.clarity}</div>
                <div>Decision style: {liveScore.speedStyle}</div>
                <div>Depth: {liveScore.depth}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4">
              <div className="text-sm font-semibold text-pink-100">Live result</div>
              <div className="mt-2 text-sm leading-6 text-pink-50/90">
                {!started
                  ? "Press Start drill to begin the round and activate the timer."
                  : submittedScore !== null
                  ? `${getFeedback(submittedScore, active.title)} Prompt used: ${
                      prompt || "Default challenge flow."
                    }`
                  : `${active.response} Your answer is being evaluated live as you write.`}
              </div>
              <div className="mt-3 inline-flex rounded-full border border-pink-300/20 bg-black/20 px-3 py-1 text-xs text-pink-100">
                Reward: +{Math.max(18, Math.round(active.rewardXp + ((submittedScore ?? liveScore.total) - 60) / 3))} XP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
