
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type QuestMode = "frontend" | "backend" | "product" | "general";

type QuestionItem = {
  question: string;
  focus: string;
};

type QuestModeData = {
  title: string;
  level: string;
  reward: number;
  placeholder: string;
  intro: string;
  questions: QuestionItem[];
};

const XP_STORAGE_KEY = "shynvo_arcade_xp";
const STREAK_STORAGE_KEY = "shynvo_arcade_streak";
const NAME_STORAGE_KEY = "shynvo_arcade_player_name";

const questData: Record<QuestMode, QuestModeData> = {
  frontend: {
    title: "Frontend Quest",
    level: "Level 1",
    reward: 60,
    placeholder: "Example: I want to practice frontend interviews focused on React, UI architecture, and performance.",
    intro:
      "Frontend Quest measures clarity, UI reasoning, implementation detail, accessibility, and performance thinking.",
    questions: [
      {
        question:
          "How would you structure a complex React page so it stays maintainable as the product grows?",
        focus: "Architecture",
      },
      {
        question:
          "How would you improve rendering performance on a data-heavy dashboard with multiple charts and filters?",
        focus: "Performance",
      },
      {
        question:
          "How do you approach accessibility when building interactive UI components like modals and dropdowns?",
        focus: "Accessibility",
      },
      {
        question:
          "What is your process for designing reusable components without overengineering them?",
        focus: "Component design",
      },
    ],
  },
  backend: {
    title: "Backend Quest",
    level: "Level 2",
    reward: 70,
    placeholder: "Example: Ask me backend questions about APIs, databases, reliability, and scale.",
    intro:
      "Backend Quest measures systems thinking, API design, reliability, scale, data flow, and trade-offs.",
    questions: [
      {
        question:
          "How would you design an API that handles a high number of concurrent requests reliably?",
        focus: "API design",
      },
      {
        question:
          "What trade-offs do you consider when choosing between SQL and NoSQL for a new system?",
        focus: "Data architecture",
      },
      {
        question:
          "How would you debug a production issue where latency suddenly increased for one service?",
        focus: "Debugging",
      },
      {
        question:
          "How do you design a background job system that is resilient to failures and retries safely?",
        focus: "Reliability",
      },
    ],
  },
  product: {
    title: "Product Quest",
    level: "Level 1",
    reward: 58,
    placeholder: "Example: Interview me for prioritization, roadmap thinking, execution, and user judgment.",
    intro:
      "Product Quest measures prioritization, user understanding, decision quality, clarity, and roadmap judgment.",
    questions: [
      {
        question:
          "How would you decide what feature to ship first when engineering capacity is limited?",
        focus: "Prioritization",
      },
      {
        question:
          "How do you evaluate whether a new feature actually improved the user experience?",
        focus: "Measurement",
      },
      {
        question:
          "A stakeholder wants a flashy feature, but user data suggests another need is more urgent. What do you do?",
        focus: "Decision quality",
      },
      {
        question:
          "How would you explain a product roadmap trade-off to both executives and engineers?",
        focus: "Communication",
      },
    ],
  },
  general: {
    title: "General Quest",
    level: "Level 1",
    reward: 50,
    placeholder: "Example: Give me mixed interview questions and score my clarity, structure, and confidence.",
    intro:
      "General Quest measures communication, confidence, structure, clarity, and response quality.",
    questions: [
      {
        question:
          "Tell me about a difficult problem you solved and how you approached it.",
        focus: "Problem solving",
      },
      {
        question:
          "How do you prepare for a role when you do not yet feel fully confident in every requirement?",
        focus: "Self-management",
      },
      {
        question:
          "Describe a time when you received critical feedback and what you did with it.",
        focus: "Growth mindset",
      },
      {
        question:
          "What makes an answer feel strong and convincing in an interview?",
        focus: "Communication",
      },
    ],
  },
};

function scoreAnswer(answer: string) {
  const trimmed = answer.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).filter((x) => x.trim().length > 0).length
    : 0;

  let clarity = 0;
  let structure = 0;
  let confidence = 0;
  let depth = 0;

  if (words >= 20) clarity += 20;
  else if (words >= 10) clarity += 14;
  else if (words > 0) clarity += 8;

  if (sentences >= 3) structure += 25;
  else if (sentences >= 2) structure += 18;
  else if (sentences >= 1) structure += 10;

  const strongWords = [
    "because",
    "therefore",
    "first",
    "second",
    "trade-off",
    "user",
    "system",
    "impact",
    "result",
    "improve",
    "measure",
    "design",
    "approach",
  ];

  const lower = trimmed.toLowerCase();
  const strongMatches = strongWords.filter((word) => lower.includes(word)).length;
  confidence += Math.min(20, strongMatches * 4);

  if (words >= 80) depth += 30;
  else if (words >= 50) depth += 22;
  else if (words >= 30) depth += 14;
  else if (words > 0) depth += 8;

  const total = Math.min(100, clarity + structure + confidence + depth);

  return {
    total,
    clarity: Math.min(25, clarity),
    structure: Math.min(25, structure),
    confidence: Math.min(20, confidence),
    depth: Math.min(30, depth),
  };
}

function feedbackFromScore(score: number) {
  if (score >= 85) {
    return "Strong answer. Clear structure, solid reasoning, and good depth.";
  }
  if (score >= 70) {
    return "Good answer. Strong foundation, but it can be sharper and more structured.";
  }
  if (score >= 55) {
    return "Decent answer. Add clearer structure, examples, and stronger reasoning.";
  }
  return "Early-stage answer. Expand your reasoning, add structure, and explain your choices more clearly.";
}

export default function InterviewQuestPage() {
  const [mode, setMode] = useState<QuestMode>("frontend");
  const [customPrompt, setCustomPrompt] = useState("");
  const [playerName, setPlayerName] = useState("Shynvo Player");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [started, setStarted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(90);
  const [isRunning, setIsRunning] = useState(false);

  const [submittedScores, setSubmittedScores] = useState<number[]>([]);
  const [lastSubmittedAt, setLastSubmittedAt] = useState<number | null>(null);

  const active = useMemo(() => questData[mode], [mode]);
  const activeQuestion = active.questions[questionIndex];

  const currentScore = useMemo(() => scoreAnswer(answer), [answer]);
  const averageScore = submittedScores.length
    ? Math.round(
        submittedScores.reduce((sum, value) => sum + value, 0) / submittedScores.length
      )
    : 0;

  const confidenceMeter = `${Math.min(100, Math.max(40, averageScore || currentScore.total))}%`;
  const streakValue = `${submittedScores.length} answer${submittedScores.length === 1 ? "" : "s"}`;
  const earnedXp =
    submittedScores.length > 0
      ? active.reward + Math.max(0, Math.round((averageScore - 60) / 4))
      : active.reward;

  useEffect(() => {
    try {
      const savedName = localStorage.getItem(NAME_STORAGE_KEY);
      if (savedName?.trim()) {
        setPlayerName(savedName);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setStarted(false);
    setIsRunning(false);
    setTimeLeft(90);
    setQuestionIndex(0);
    setAnswer("");
    setSubmittedScores([]);
    setLastSubmittedAt(null);
  }, [mode]);

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

  function startQuest() {
    setStarted(true);
    setIsRunning(true);
    setTimeLeft(90);
    setAnswer("");
    setQuestionIndex(0);
    setSubmittedScores([]);
    setLastSubmittedAt(null);
  }

  function resetQuest() {
    setCustomPrompt("");
    setAnswer("");
    setStarted(false);
    setIsRunning(false);
    setTimeLeft(90);
    setQuestionIndex(0);
    setSubmittedScores([]);
    setLastSubmittedAt(null);
  }

  function pauseQuest() {
    setIsRunning(false);
  }

  function resumeQuest() {
    if (started && timeLeft > 0) {
      setIsRunning(true);
    }
  }

  function submitAnswer() {
    if (!answer.trim()) return;

    const score = currentScore.total;
    setSubmittedScores((prev) => [...prev, score]);
    setLastSubmittedAt(Date.now());
    setIsRunning(false);

    try {
      const prevXp = Number(localStorage.getItem(XP_STORAGE_KEY) || "840");
      const prevStreak = Number(localStorage.getItem(STREAK_STORAGE_KEY) || "12");

      localStorage.setItem(XP_STORAGE_KEY, String(prevXp + Math.max(20, Math.round(score / 2))));
      localStorage.setItem(STREAK_STORAGE_KEY, String(prevStreak + 1));
    } catch {
      // ignore
    }
  }

  function nextQuestion() {
    setQuestionIndex((prev) => (prev + 1) % active.questions.length);
    setAnswer("");
    setTimeLeft(90);
    setIsRunning(started);
    setLastSubmittedAt(null);
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
          Interview Quest
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
          Turn interview practice into a real quest with mode selection, timed answers,
          score feedback, and progression logic.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["frontend", "Frontend Quest"],
                ["backend", "Backend Quest"],
                ["product", "Product Quest"],
                ["general", "General Quest"],
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

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Quest Introduction
            </div>
            <div className="mt-3 text-sm leading-6 text-white/78">{active.intro}</div>
          </div>

          <div className="mt-5">
            <label className="text-sm font-semibold text-white">Custom quest focus</label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={active.placeholder}
              rows={4}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                  Active Question
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
                  00:{timeLeft.toString().padStart(2, "0")}
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
                placeholder="Write your answer here. Structure it clearly, explain your reasoning, and give examples where useful."
                rows={8}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startQuest}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
              >
                Start quest
              </button>
              <button
                type="button"
                onClick={pauseQuest}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Pause
              </button>
              <button
                type="button"
                onClick={resumeQuest}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Resume
              </button>
              <button
                type="button"
                onClick={submitAnswer}
                className="rounded-2xl border border-pink-300/20 bg-pink-400/10 px-5 py-3 text-sm font-semibold text-pink-100 hover:bg-pink-400/15"
              >
                Submit answer
              </button>
              <button
                type="button"
                onClick={nextQuestion}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Next question
              </button>
              <button
                type="button"
                onClick={resetQuest}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
            Quest Status
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Player</div>
              <div className="mt-2 text-xl font-semibold text-white">{playerName}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Quest tier</div>
              <div className="mt-2 text-xl font-semibold text-white">{active.level}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Confidence meter</div>
              <div className="mt-2 text-white">{confidenceMeter}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Response streak</div>
              <div className="mt-2 text-white">{streakValue}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Live score</div>
              <div className="mt-2 text-2xl font-semibold text-white">
                {currentScore.total}/100
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-white/60">
                <div>Clarity: {currentScore.clarity}</div>
                <div>Structure: {currentScore.structure}</div>
                <div>Confidence: {currentScore.confidence}</div>
                <div>Depth: {currentScore.depth}</div>
              </div>
            </div>

            <div className="rounded-2xl border border-pink-400/20 bg-pink-400/10 p-4">
              <div className="text-sm font-semibold text-pink-100">Quest result</div>
              <div className="mt-2 text-sm leading-6 text-pink-50/90">
                {!started
                  ? "Press Start quest to begin the timer and activate the interview round."
                  : lastSubmittedAt
                  ? feedbackFromScore(currentScore.total)
                  : "Write your answer, structure your reasoning clearly, then submit to score the round."}
              </div>
              <div className="mt-3 inline-flex rounded-full border border-pink-300/20 bg-black/20 px-3 py-1 text-xs text-pink-100">
                Reward: +{earnedXp} XP
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/60">Prompt guidance</div>
              <div className="mt-2 text-sm leading-6 text-white/75">
                {customPrompt.trim()
                  ? `Custom focus active: ${customPrompt}`
                  : "No custom focus yet. Use the custom quest field if you want to bias the interview style."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}