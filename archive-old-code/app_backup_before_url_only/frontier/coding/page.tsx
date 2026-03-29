"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FrontierOutputPanel from "../_components/FrontierOutputPanel";
import { buildCodingOutput } from "../_lib/frontierProfessionalCopy";

type BuildType =
  | "website"
  | "chatbot"
  | "business"
  | "automation"
  | "game"
  | "python";

type GuideMode = "Mentor" | "Builder" | "Reviewer" | "Project Coach";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const BUILD_OPTIONS: Record<
  BuildType,
  {
    title: string;
    desc: string;
    stack: string[];
    steps: string[];
    starterPrompt: string;
  }
> = {
  website: {
    title: "Build a Website",
    desc: "Create pages, sections, layouts, and interaction using core web technologies.",
    stack: ["HTML", "CSS", "JavaScript"],
    steps: [
      "Plan pages and structure",
      "Build layout with HTML",
      "Style with CSS",
      "Add interaction",
      "Test and deploy",
    ],
    starterPrompt:
      "I want to build a personal portfolio website with a projects section and contact form.",
  },
  chatbot: {
    title: "Build a Chatbot",
    desc: "Learn chatbot flow, prompts, APIs, Python basics, and assistant behaviour.",
    stack: ["Python", "Prompts", "APIs"],
    steps: [
      "Define chatbot purpose",
      "Design prompt flow",
      "Connect an API or model",
      "Handle user messages",
      "Improve responses",
    ],
    starterPrompt:
      "I want to build a chatbot that helps students revise for science exams.",
  },
  business: {
    title: "Build a Business Tool",
    desc: "Design dashboards, admin panels, and internal tools for real company workflows.",
    stack: ["React", "Database", "Auth"],
    steps: [
      "Define business workflow",
      "Choose data model",
      "Build dashboard UI",
      "Add actions and permissions",
      "Test company usage",
    ],
    starterPrompt:
      "I want to build an internal dashboard for tracking missions and team progress.",
  },
  automation: {
    title: "Build an Automation Tool",
    desc: "Create helper scripts, task flows, and repeatable automation systems.",
    stack: ["Python", "Scripts", "Workflow"],
    steps: [
      "Identify repeat task",
      "Define input and output",
      "Write automation script",
      "Add error handling",
      "Schedule or trigger it",
    ],
    starterPrompt:
      "I want to automate renaming files and sorting them into folders.",
  },
  game: {
    title: "Build a Game",
    desc: "Learn game loops, interaction, state, scoring, and player logic.",
    stack: ["JavaScript", "Canvas", "Game Logic"],
    steps: [
      "Define the game idea",
      "Build player controls",
      "Add game state and scoring",
      "Add enemies or obstacles",
      "Polish and test gameplay",
    ],
    starterPrompt:
      "I want to build a simple browser game where the player avoids obstacles and scores points.",
  },
  python: {
    title: "Learn Python by Building",
    desc: "Use Python to build scripts, tools, bots, and smart beginner-friendly projects.",
    stack: ["Python", "Functions", "Projects"],
    steps: [
      "Learn variables and input",
      "Use conditions and loops",
      "Write functions",
      "Build a small project",
      "Improve and refactor",
    ],
    starterPrompt:
      "I want to learn Python by building a simple expense tracker.",
  },
};

const GUIDE_MODE_HELP: Record<GuideMode, string> = {
  Mentor: "Step-by-step teaching guidance.",
  Builder: "Implementation-focused direction.",
  Reviewer: "Check structure, clarity, and gaps.",
  "Project Coach": "Scope, milestones, and momentum.",
};

export default function FrontierCodingPage() {
  const [buildType, setBuildType] = useState<BuildType>("website");
  const [idea, setIdea] = useState(BUILD_OPTIONS.website.starterPrompt);
  const [generated, setGenerated] = useState(false);
  const [guideMode, setGuideMode] = useState<GuideMode>("Builder");

  const active = useMemo(() => BUILD_OPTIONS[buildType], [buildType]);

  const output = useMemo(
    () =>
      buildCodingOutput({
        buildTitle: active.title,
        guideMode,
        idea: idea || active.starterPrompt,
        stack: active.stack,
        firstStep: active.steps[0] || "Define the first step",
      }),
    [active, guideMode, idea]
  );

  function handleSelect(type: BuildType) {
    setBuildType(type);
    setIdea(BUILD_OPTIONS[type].starterPrompt);
    setGenerated(false);
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_18%_10%,rgba(132,204,22,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_16%,rgba(34,197,94,0.12),transparent_58%)]" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/frontier"
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
        <Link
          href="/frontier"
          className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100 hover:bg-lime-400/15"
        >
          Frontier Lab
        </Link>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200/70">
          Frontier Lab
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Coding Arena
        </h1>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
          This is an AI-assisted build workspace. Choose what you want to create,
          describe the goal, and let Frontier shape the next technical path without
          changing the environment around you.
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">
              What do you want to build?
            </div>
            <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-[11px] text-lime-100">
              AI Build Routing
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {(Object.keys(BUILD_OPTIONS) as BuildType[]).map((type) => {
              const item = BUILD_OPTIONS[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSelect(type)}
                  className={cx(
                    "rounded-2xl border p-4 text-left transition",
                    buildType === type
                      ? "border-lime-300/30 bg-lime-400/10 text-white"
                      : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                  )}
                >
                  <div className="text-base font-semibold">{item.title}</div>
                  <div className="mt-2 text-sm leading-6 text-white/70">
                    {item.desc}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold text-white">AI guide mode</div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {(
                ["Mentor", "Builder", "Reviewer", "Project Coach"] as GuideMode[]
              ).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setGuideMode(mode);
                    setGenerated(false);
                  }}
                  className={cx(
                    "rounded-2xl border p-4 text-left transition",
                    guideMode === mode
                      ? "border-lime-300/30 bg-lime-400/10 text-white"
                      : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                  )}
                >
                  <div className="text-base font-semibold">{mode}</div>
                  <div className="mt-1 text-sm leading-6 text-white/70">
                    {GUIDE_MODE_HELP[mode]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold text-white">
              Project idea
            </label>
            <textarea
              value={idea}
              onChange={(e) => {
                setIdea(e.target.value);
                setGenerated(false);
              }}
              placeholder="Describe what you want to build..."
              rows={6}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
            >
              Generate AI build plan
            </button>
            <button
              type="button"
              onClick={() => {
                setIdea(active.starterPrompt);
                setGenerated(false);
              }}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Reset example
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-lg font-semibold text-white">{active.title}</div>
            <div className="mt-2 text-sm leading-6 text-white/70">
              {active.desc}
            </div>

            <div className="mt-5 text-sm font-semibold text-white">Main stack</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/75"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-white">
              AI build sequence
            </div>
            <div className="mt-3 space-y-3">
              {active.steps.map((step) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {generated ? (
            <FrontierOutputPanel
              title={output.title}
              summary={output.summary}
              nextAction={output.nextAction}
              why={output.why}
              deliverables={output.deliverables}
              risk={output.risk}
            />
          ) : (
            <div className="rounded-3xl border border-lime-400/20 bg-lime-400/10 p-5 text-sm text-lime-100">
              Choose a build type, choose an AI guide mode, write your idea, then
              click Generate AI build plan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
