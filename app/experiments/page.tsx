"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const LABS = [
  {
    key: "debate",
    title: "Debate Lab",
    subtitle:
      "Challenge decisions and ideas from multiple perspectives before committing.",
    href: "/experiments/debate",
    tags: ["Arguments", "Reasoning", "Counterpoints"],
    useCases: [
      "Should I choose one path over another?",
      "What is the strongest argument against my decision?",
      "Am I thinking clearly or emotionally?",
    ],
  },
  {
    key: "simulation",
    title: "Simulation Lab",
    subtitle:
      "Explore likely futures, risks, and trade-offs before acting.",
    href: "/experiments/simulation",
    tags: ["Scenarios", "Risk", "Forecast"],
    useCases: [
      "What happens if I go all in now?",
      "What happens if I delay this decision?",
      "What risks am I not seeing yet?",
    ],
  },
  {
    key: "concept",
    title: "Concept Forge",
    subtitle:
      "Turn vague ideas into clearer product, business, or platform concepts.",
    href: "/experiments/concept",
    tags: ["Ideas", "Strategy", "Innovation"],
    useCases: [
      "I have an idea but it feels too vague.",
      "Who is this really for?",
      "What should this become in practical terms?",
    ],
  },
  {
    key: "practice",
    title: "Practice Arena",
    subtitle:
      "Rehearse interviews, oral exams, presentations, and difficult conversations.",
    href: "/experiments/practice",
    tags: ["Interviews", "Speaking", "Preparation"],
    useCases: [
      "Help me prepare for an interview.",
      "Help me practice an oral exam.",
      "Help me rehearse a difficult conversation.",
    ],
  },
  {
    key: "rooms",
    title: "Experiment Rooms",
    subtitle:
      "Run collaborative sessions with friends, classmates, or teammates.",
    href: "/experiments/rooms",
    tags: ["Rooms", "Collaboration", "AI Moderation"],
    useCases: [
      "Create a shared experiment session.",
      "Run a group debate or practice room.",
      "Join a guided collaborative room.",
    ],
  },
];

function chooseSuggestedLab(prompt: string) {
  const text = prompt.toLowerCase();

  if (
    text.includes("interview") ||
    text.includes("oral exam") ||
    text.includes("presentation") ||
    text.includes("conversation") ||
    text.includes("rehearse") ||
    text.includes("practice")
  ) {
    return LABS.find((lab) => lab.key === "practice")!;
  }

  if (
    text.includes("idea") ||
    text.includes("product") ||
    text.includes("startup") ||
    text.includes("business") ||
    text.includes("concept") ||
    text.includes("platform") ||
    text.includes("build")
  ) {
    return LABS.find((lab) => lab.key === "concept")!;
  }

  if (
    text.includes("what if") ||
    text.includes("risk") ||
    text.includes("future") ||
    text.includes("outcome") ||
    text.includes("scenario") ||
    text.includes("simulate")
  ) {
    return LABS.find((lab) => lab.key === "simulation")!;
  }

  if (
    text.includes("team") ||
    text.includes("friends") ||
    text.includes("classmates") ||
    text.includes("room") ||
    text.includes("group") ||
    text.includes("together")
  ) {
    return LABS.find((lab) => lab.key === "rooms")!;
  }

  return LABS.find((lab) => lab.key === "debate")!;
}

export default function ExperimentsPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedKey, setSelectedKey] = useState<string>("debate");
  const [recent, setRecent] = useState<string[]>([
    "Debate session: exam focus vs startup focus",
    "Simulation session: launch now vs delay 3 months",
    "Concept session: AI focus app for students",
  ]);

  const selectedLab =
    LABS.find((lab) => lab.key === selectedKey) ?? LABS[0];

  const suggestedLab = useMemo(() => {
    if (!prompt.trim()) return selectedLab;
    return chooseSuggestedLab(prompt);
  }, [prompt, selectedLab]);

  function useSuggestion() {
    setSelectedKey(suggestedLab.key);
    if (prompt.trim()) {
      setRecent((prev) => [
        `${suggestedLab.title}: ${prompt.trim()}`,
        ...prev.slice(0, 4),
      ]);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <ExperimentsNav />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
            Experiments
          </div>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
            Experiments Command Center
          </h1>

          <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
            Experiments is the Shynvo environment for testing ideas before commitment.
            It helps users debate decisions, simulate outcomes, shape concepts, rehearse
            real situations, and run collaborative sessions with more clarity.
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/5 px-4 py-3 text-sm font-semibold text-cyan-100/85">
          Experiment Layer: Online
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
            Experiment Command
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            What do you want to test?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
            Describe what you want to think through, rehearse, simulate, challenge,
            or develop. Shynvo will guide you toward the right lab.
          </p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: I want to decide whether to focus on exams first or continue building my app."
            className="mt-5 min-h-[170px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {LABS.map((lab) => {
              const active = selectedKey === lab.key;

              return (
                <button
                  key={lab.key}
                  type="button"
                  onClick={() => setSelectedKey(lab.key)}
                  className={cx(
                    "rounded-2xl border p-4 text-left transition",
                    active
                      ? "border-white bg-white text-[#0B0F14]"
                      : "border-white/10 bg-black/20 text-white/85 hover:bg-white/10"
                  )}
                >
                  <div className="text-lg font-semibold">{lab.title}</div>
                  <div className="mt-1 text-sm opacity-80">{lab.subtitle}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold text-white">Suggested Lab</div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-white">
                  {suggestedLab.title}
                </div>
                <div className="mt-1 text-sm text-white/70">
                  {suggestedLab.subtitle}
                </div>
              </div>

              <button
                type="button"
                onClick={useSuggestion}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Use Suggested Lab
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Active Lab
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-lg font-semibold text-white">
                {selectedLab.title}
              </div>
              <div className="mt-2 text-sm leading-6 text-white/70">
                {selectedLab.subtitle}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedLab.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={
                  prompt.trim()
                    ? `${selectedLab.href}?prompt=${encodeURIComponent(prompt.trim())}`
                    : selectedLab.href
                }
                className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Enter Lab
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Recent Activity
            </div>

            <div className="mt-4 space-y-3">
              {recent.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
          Lab Guidance
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          What each lab is best for
        </h2>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {LABS.map((lab) => (
            <div
              key={lab.key}
              className="rounded-3xl border border-white/10 bg-black/20 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-white">{lab.title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/70">
                    {lab.subtitle}
                  </div>
                </div>

                <Link
                  href={lab.href}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/80 hover:bg-white/10"
                >
                  Open
                </Link>
              </div>

              <div className="mt-4 space-y-2">
                {lab.useCases.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
          Exploration Labs
        </div>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Choose an environment
        </h2>

        <p className="mt-2 max-w-4xl text-sm leading-6 text-white/70">
          Each lab supports a different kind of thinking. This keeps Experiments
          clear, useful, and professional instead of crowded.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {LABS.map((lab) => (
          <Link
            key={lab.key}
            href={lab.href}
            className={cx(
              "group relative overflow-hidden rounded-3xl border p-5 transition",
              "border-cyan-300/15 bg-white/5 hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-white">{lab.title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">
                  {lab.subtitle}
                </div>
              </div>

              <span className="rounded-full border border-cyan-300/20 bg-cyan-400/5 px-3 py-1 text-[11px] font-semibold text-cyan-100/85">
                Active
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {lab.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-white/90 group-hover:text-white">
                Enter Lab
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M10 7 15 12 10 17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
