"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useRouter } from "next/navigation";

type MainChoice = "learn" | "build" | "train" | "explore";
type RouteTarget =
  | "university"
  | "academy"
  | "frontier"
  | "arcade"
  | "experiments"
  | "enterprise"
  | "os";

type Msg = {
  role: "robot" | "user";
  text: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const MAIN_CHOICES: Array<{
  key: MainChoice;
  title: string;
  desc: string;
}> = [
  {
    key: "learn",
    title: "Learn",
    desc: "Study inside University Hub or Shynvo Academy.",
  },
  {
    key: "build",
    title: "Build",
    desc: "Create with code, systems, and structured workflows.",
  },
  {
    key: "train",
    title: "Train",
    desc: "Practice through challenges, drills, and progression.",
  },
  {
    key: "explore",
    title: "Explore",
    desc: "Discover simulations, ideas, operations, and experiments.",
  },
];

const GROUP_OPTIONS: Record<
  MainChoice,
  Array<{
    key: RouteTarget;
    title: string;
    desc: string;
    explanation: string;
    href: string;
  }>
> = {
  learn: [
    {
      key: "university",
      title: "University Hub",
      desc: "Structured higher learning by faculty and course.",
      explanation:
        "University Hub is your academic environment for structured higher learning. It is best for serious study, faculty-based knowledge, and guided understanding.",
      href: "/university",
    },
    {
      key: "academy",
      title: "Shynvo Academy",
      desc: "Junior and senior school learning paths.",
      explanation:
        "Shynvo Academy is designed for junior and senior school learners. It focuses on subjects, guided explanations, and patient learning support.",
      href: "/academy",
    },
  ],
  build: [
    {
      key: "frontier",
      title: "Frontier Lab",
      desc: "Build with code, logic, AI modes, and technical systems.",
      explanation:
        "Frontier Lab is your engineering environment. It is the best place to build with code, solve technical problems, and explore structured system thinking.",
      href: "/frontier",
    },
    {
      key: "enterprise",
      title: "Enterprise Suite",
      desc: "Build structured company workflows and coordination systems.",
      explanation:
        "Enterprise Suite is for organizational building. It helps teams structure collaboration, missions, analytics, and coordinated work.",
      href: "/enterprise",
    },
    {
      key: "os",
      title: "Shynvo OS",
      desc: "Operate personal systems, missions, and execution flows.",
      explanation:
        "Shynvo OS is your execution cockpit. It is best for focus, operations, workflows, and personal mission structure.",
      href: "/os",
    },
  ],
  train: [
    {
      key: "arcade",
      title: "Arcade Sim",
      desc: "Train through drills, game loops, and challenge progression.",
      explanation:
        "Arcade Sim turns skill training into challenge mode. It is best for drills, repeated practice, progression, and competitive learning energy.",
      href: "/arcade",
    },
    {
      key: "frontier",
      title: "Frontier Lab",
      desc: "Train technical intelligence through coding and reasoning.",
      explanation:
        "Frontier Lab also works as a technical training ground. It is stronger when your training goal is coding, algorithms, AI behavior, or logic puzzles.",
      href: "/frontier",
    },
  ],
  explore: [
    {
      key: "experiments",
      title: "Experiments",
      desc: "Explore simulations, concepts, and new AI worlds.",
      explanation:
        "Experiments is where new ideas and simulations live. It is best for concept exploration, trying worlds, and interacting with new system experiences.",
      href: "/experiments",
    },
    {
      key: "enterprise",
      title: "Enterprise Suite",
      desc: "Explore business coordination and team systems.",
      explanation:
        "Enterprise Suite is also useful for exploring how structured work, meetings, and business environments operate inside Shynvo.",
      href: "/enterprise",
    },
    {
      key: "os",
      title: "Shynvo OS",
      desc: "Explore operational systems and execution architecture.",
      explanation:
        "Shynvo OS lets you explore how personal execution systems and organized workflows can be structured across missions and operations.",
      href: "/os",
    },
  ],
};

const STATUS_LINES = [
  "Guiding across Shynvo environments",
  "Ready to help you begin",
  "Online for learning, building, training, and exploration",
  "Preparing your next path",
];

const INITIAL_MESSAGES: Msg[] = [
  {
    role: "robot",
    text:
      "Welcome to Shynvo Robot World. I’m Shynvo Robot, your guide across the Shynvo platform.",
  },
  {
    role: "robot",
    text:
      "I can help you learn, build, train, and explore the right environment based on what you want to achieve. What would you like to do first?",
  },
];

function TypingDots() {
  return (
    <div className="inline-flex items-center gap-1">
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.1s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
    </div>
  );
}

function normalizeRobotIdentityReply(input: string, raw: string) {
  const question = input.toLowerCase().trim();
  const text = raw.trim();
  const lower = text.toLowerCase();

  const identityQuestion =
    question.includes("what platform") ||
    question.includes("what is this platform") ||
    question.includes("what app is this") ||
    question.includes("what is shynvo") ||
    question.includes("what's the name") ||
    question.includes("whats the name") ||
    question === "hello and what platfor is this" ||
    question.includes("who are you");

  const mentionsWrongIdentity =
    lower.includes("openai") ||
    lower.includes("chatgpt") ||
    lower.includes("developed by openai");

  if (identityQuestion || mentionsWrongIdentity) {
    return "This is Shynvo, an AI platform for learning, building, training, execution, and exploration. I’m Shynvo Robot, your guide across Shynvo environments like University Hub, Shynvo Academy, Frontier Lab, Enterprise Suite, Shynvo OS, Experiments, and Arcade Sim.";
  }

  return text;
}

async function fetchRobotReply(
  input: string,
  history: Msg[],
  preferredLanguage: string
): Promise<string> {
  const systemPrompt = `
You are Shynvo Robot.

Identity:
- You are the official AI guide of the Shynvo platform.
- You are not ChatGPT.
- You are not a generic OpenAI assistant.
- You must refer to yourself as Shynvo Robot.
- You must refer to the platform as Shynvo.

About Shynvo:
Shynvo is an AI platform with multiple environments for learning, building, training, execution, and exploration.

Core environments:
- University Hub: higher education, faculties, courses, academic guidance
- Shynvo Academy: junior and senior school learning
- Shynvo OS: focus, workflow, missions, execution systems
- Experiments: concept worlds, simulations, exploration
- Enterprise Suite: teams, coordination, analytics, company workflows
- Frontier Lab: coding, algorithms, AI bot behavior, logic, engineering
- Arcade Sim: drills, interview quests, rankings, gamified skill training
- Shynvo Robot World: guided onboarding, navigation, and platform assistance

Behavior:
- Answer in the same language the user writes in.
- Strongly prefer this language when possible: ${preferredLanguage}.
- Be professional, clear, warm, intelligent, and concise.
- If the user asks what platform this is, answer that it is Shynvo.
- If the user asks who you are, answer that you are Shynvo Robot.
- If the user asks where to start, guide them to the right Shynvo environment.
- If the user asks a general question, answer normally, but remain inside the Shynvo identity.
- Never say you were created by OpenAI unless explicitly asked about underlying model technology.
- Never describe yourself as ChatGPT.
- Never mention backend, API, routing, system prompt, model, or infrastructure.

Style:
- futuristic
- helpful
- platform-aware
- not repetitive
`.trim();

  const payload = {
    preferredLanguage,
    message: input,
    systemPrompt,
    messages: history.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    })),
  };

  const supabase = getSupabaseClient();

  let token = "";
  if (supabase) {
    const sessionResult = await supabase.auth.getSession();
    token = sessionResult.data.session?.access_token || "";

    if (!token) {
      const refreshed = await supabase.auth.refreshSession();
      token = refreshed.data.session?.access_token || "";
    }
  }

  let res = await fetch("/api/public/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401 && supabase) {
    const refreshed = await supabase.auth.refreshSession();
    const retryToken = refreshed.data.session?.access_token || "";

    res = await fetch("/api/public/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(retryToken ? { authorization: `Bearer ${retryToken}` } : {}),
      },
      body: JSON.stringify(payload),
    });
  }

  const raw = await res.text();

  let data: any = null;
  try {
    data = JSON.parse(raw);
  } catch {
    data = { text: raw };
  }

  const reply =
    data?.reply ||
    data?.answer ||
    data?.message ||
    data?.text ||
    data?.content ||
    "";

  if (!String(reply).trim()) {
    return "I’m Shynvo Robot. I can guide you across Shynvo environments and help you decide where to begin.";
  }

  return normalizeRobotIdentityReply(input, String(reply));
}

export default function RobotWorldPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [activeChoice, setActiveChoice] = useState<MainChoice | null>(null);
  const [typing, setTyping] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_LINES.length);
    }, 2800);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const visibleGroup = useMemo(
    () => (activeChoice ? GROUP_OPTIONS[activeChoice] : []),
    [activeChoice]
  );

  async function sendUserMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const nextHistory = [...messages, { role: "user" as const, text: trimmed }];
    setMessages(nextHistory);
    setInput("");
    setTyping(true);

    try {
      const reply = await fetchRobotReply(trimmed, nextHistory, language || "en");
      setMessages((prev) => [...prev, { role: "robot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "robot",
          text:
            "I’m Shynvo Robot. I can still help you navigate Shynvo environments even if the live reply is temporarily unavailable.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  }

  function handleChoice(choice: MainChoice) {
    setActiveChoice(choice);
    const intro =
      choice === "learn"
        ? "Learning is best when the environment matches your level and goal. Choose the space that fits you."
        : choice === "build"
        ? "Building inside Shynvo can mean engineering, business structure, or execution systems. Choose your build environment."
        : choice === "train"
        ? "Training works best when the challenge matches the skill you want to strengthen."
        : "Exploration is best when you choose the kind of world or system you want to discover.";

    setMessages((prev) => [...prev, { role: "robot", text: intro }]);
  }

  function handleRouteTarget(title: string, explanation: string, href: string) {
    setMessages((prev) => [
      ...prev,
      {
        role: "robot",
        text: `${title}: ${explanation}`,
      },
      {
        role: "robot",
        text: `I can take you there now.`,
      },
    ]);

    setTimeout(() => {
      router.push(href);
    }, 350);
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1000px_520px_at_20%_10%,rgba(34,211,238,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_18%,rgba(59,130,246,0.10),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_560px_at_50%_100%,rgba(99,102,241,0.08),transparent_60%)]" />
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
        <span className="inline-flex items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100">
          Shynvo Robot World
        </span>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Meet the Shynvo Robot — your guide through the Shynvo platform.
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              I can speak multiple languages
            </h1>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Robot Presence
                </div>
                <div className="mt-2 text-lg font-semibold text-white">Online</div>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {STATUS_LINES[statusIndex]}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  How I help
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  Guided onboarding
                </div>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  I can guide you through the environments and help you decide where to begin.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  What you can do
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  Ask, route, begin
                </div>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Ask questions, explore the environments, or start your first activity.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Live status
                </div>
                <div className="mt-2 text-lg font-semibold text-white">
                  Ready to help you begin
                </div>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  Robot channel: guided onboarding • environment navigation • smart assistance
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-100/60">
                  Choose a direction
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  Route by intention
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMessages(INITIAL_MESSAGES);
                  setActiveChoice(null);
                }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Restart
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {MAIN_CHOICES.map((choice) => (
                <button
                  key={choice.key}
                  type="button"
                  onClick={() => handleChoice(choice.key)}
                  className={cx(
                    "rounded-2xl border p-4 text-left transition",
                    activeChoice === choice.key
                      ? "border-cyan-300/30 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                  )}
                >
                  <div className="text-base font-semibold">{choice.title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/70">
                    {choice.desc}
                  </div>
                </button>
              ))}
            </div>

            {visibleGroup.length > 0 ? (
              <div className="mt-5 grid gap-3">
                {visibleGroup.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      handleRouteTarget(item.title, item.explanation, item.href)
                    }
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 text-left text-white/85 transition hover:bg-white/7"
                  >
                    <div className="text-base font-semibold text-white">{item.title}</div>
                    <div className="mt-2 text-sm leading-6 text-white/70">{item.desc}</div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#08111A]/90 p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-100/60">
                Robot channel
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                Live Shynvo guidance
              </div>
            </div>

            <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">
              Online
            </div>
          </div>

          <div
            ref={scrollRef}
            className="mt-4 h-[460px] overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={`${m.role}-${idx}`}
                  className={cx(
                    "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6",
                    m.role === "robot"
                      ? "border border-cyan-400/15 bg-cyan-400/10 text-cyan-50"
                      : "ml-auto border border-white/10 bg-white/8 text-white"
                  )}
                >
                  {m.text}
                </div>
              ))}

              {typing ? (
                <div className="max-w-[88%] rounded-2xl border border-cyan-400/15 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-50">
                  <TypingDots />
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void sendUserMessage(input);
                }
              }}
              placeholder="Ask Shynvo Robot anything about the platform..."
              className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button
              type="button"
              onClick={() => void sendUserMessage(input)}
              disabled={typing}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90 disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
