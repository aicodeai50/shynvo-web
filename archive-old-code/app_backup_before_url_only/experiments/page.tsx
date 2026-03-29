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
      "Challenge decisions, assumptions, and arguments from multiple perspectives.",
    href: "/experiments/debate",
    tags: ["Arguments", "Reasoning", "Counterpoints"],
    signal: "Decision intelligence",
    prompts: [
      "Should I choose one path over another?",
      "What is the strongest case against my decision?",
      "Am I thinking clearly or emotionally?",
    ],
  },
  {
    key: "simulation",
    title: "Simulation Lab",
    subtitle:
      "Explore likely futures, trade-offs, and outcomes before acting.",
    href: "/experiments/simulation",
    tags: ["Scenarios", "Risk", "Forecast"],
    signal: "Scenario modeling",
    prompts: [
      "What happens if I go all in now?",
      "What happens if I delay this move?",
      "What risks am I still not seeing?",
    ],
  },
  {
    key: "concept",
    title: "Concept Forge",
    subtitle:
      "Turn vague ideas into clearer concepts, value, and next steps.",
    href: "/experiments/concept",
    tags: ["Ideas", "Strategy", "Innovation"],
    signal: "Concept development",
    prompts: [
      "I have an idea but it feels too vague.",
      "Who is this really for?",
      "What should this become in practical terms?",
    ],
  },
  {
    key: "practice",
    title: "Practice Arena",
    subtitle:
      "Rehearse interviews, presentations, oral exams, and difficult conversations.",
    href: "/experiments/practice",
    tags: ["Interviews", "Speaking", "Preparation"],
    signal: "Performance rehearsal",
    prompts: [
      "Help me prepare for an interview.",
      "Help me practice an oral exam.",
      "Help me rehearse a difficult conversation.",
    ],
  },
  {
    key: "rooms",
    title: "Experiment Rooms",
    subtitle:
      "Create collaborative rooms for group testing, debate, and guided sessions.",
    href: "/experiments/rooms",
    tags: ["Rooms", "Collaboration", "AI Moderation"],
    signal: "Collaborative sessions",
    prompts: [
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
  const [recent] = useState<string[]>([
    "Debate session • exam focus vs startup focus",
    "Simulation run • launch now vs delay 3 months",
    "Concept session • AI focus app for students",
  ]);

  const selectedLab =
    LABS.find((lab) => lab.key === selectedKey) ?? LABS[0];

  const suggestedLab = useMemo(() => {
    if (!prompt.trim()) return selectedLab;
    return chooseSuggestedLab(prompt);
  }, [prompt, selectedLab]);

  return (
    <section className="py-10 sm:py-14">
      <ExperimentsNav />

      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-white/5 p-6 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_15%_18%,rgba(34,211,238,0.10),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(760px_360px_at_88%_20%,rgba(59,130,246,0.10),transparent_48%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent)]" />
        </div>

        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Experiments
            </div>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              AI Experiment Command Center
            </h1>

            <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
              This is the Shynvo environment for testing ideas before commitment.
              Users can challenge decisions, simulate outcomes, shape concepts,
              rehearse real situations, and open collaborative experiment rooms with
              clearer AI guidance.
            </p>
          </div>

          <div className="grid gap-3 sm:min-w-[260px]">
            <div className="rounded-2xl border border-cyan-300/15 bg-black/20 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/60">
                Experiment Layer
              </div>
              <div className="mt-1 text-sm font-semibold text-cyan-50">
                Online
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-300/15 bg-black/20 px-4 py-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100/60">
                Active Lab
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                {selectedLab.title}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Experiment Command
            </div>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              What do you want to test?
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
              Describe what you want to debate, simulate, rehearse, develop, or
              test. The system will suggest the most relevant lab.
            </p>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: I want to decide whether to focus on exams first or continue building my app."
              className="mt-5 min-h-[170px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
                    <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                      {lab.signal}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Suggested Routing
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-lg font-semibold text-white">
                  {suggestedLab.title}
                </div>
                <div className="mt-2 text-sm leading-6 text-white/70">
                  {suggestedLab.subtitle}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestedLab.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={
                  prompt.trim()
                    ? `${suggestedLab.href}?prompt=${encodeURIComponent(prompt.trim())}`
                    : suggestedLab.href
                }
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90"
              >
                Enter Suggested Lab
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Experiment Labs
            </div>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              Available AI workspaces
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {LABS.map((lab) => (
                <Link
                  key={lab.key}
                  href={lab.href}
                  className={cx(
                    "group relative overflow-hidden rounded-3xl border p-5 transition",
                    "border-cyan-300/15 bg-black/20 hover:bg-white/[0.08] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold text-white">
                        {lab.title}
                      </div>
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
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              Live Context
            </div>

            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Selected Lab</div>
                <div className="mt-1 text-sm text-white/65">{selectedLab.title}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Signal Type</div>
                <div className="mt-1 text-sm text-white/65">{selectedLab.signal}</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Best Used For</div>
                <div className="mt-2 space-y-2 text-sm text-white/70">
                  {selectedLab.prompts.map((item) => (
                    <div key={item}>• {item}</div>
                  ))}
                </div>
              </div>
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

          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              System View
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Reasoning Layer</div>
                <div className="mt-1 text-sm text-white/65">Ready</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Scenario Layer</div>
                <div className="mt-1 text-sm text-white/65">Ready</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Practice Layer</div>
                <div className="mt-1 text-sm text-white/65">Ready</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">Collaboration Layer</div>
                <div className="mt-1 text-sm text-white/65">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
