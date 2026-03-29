"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FrontierOutputPanel from "../_components/FrontierOutputPanel";
import { runFrontierLiveEngine } from "../_lib/frontierLiveEngine";

type BotMode = "assistant" | "builder" | "teacher" | "analyst";
type ToneMode = "concise" | "structured" | "teaching" | "strategic";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const TONES: Record<ToneMode, { title: string; desc: string }> = {
  concise: { title: "Concise", desc: "Short and efficient." },
  structured: { title: "Structured", desc: "Organized and explicit." },
  teaching: { title: "Teaching", desc: "Explains and guides more." },
  strategic: { title: "Strategic", desc: "Higher-level and decision-oriented." },
};

const MODES: Record<
  BotMode,
  {
    title: string;
    desc: string;
    tone: string;
    tags: string[];
    starter: string;
  }
> = {
  assistant: {
    title: "AI Assistant",
    desc: "General support, planning help, quick answers, and structured next steps.",
    tone: "Supportive and direct",
    tags: ["Support", "Planning", "Guidance"],
    starter: "Help me design an AI assistant for students learning coding.",
  },
  builder: {
    title: "AI Builder",
    desc: "Turns product ideas into features, workflows, and build direction.",
    tone: "Constructive and implementation-focused",
    tags: ["Product", "Workflow", "Build"],
    starter: "Help me turn an internal knowledge tool idea into a usable product plan.",
  },
  teacher: {
    title: "AI Teacher",
    desc: "Explains ideas step by step for beginners and growing learners.",
    tone: "Clear and educational",
    tags: ["Learning", "Explanation", "Clarity"],
    starter: "Explain APIs to a beginner who has never built a web app before.",
  },
  analyst: {
    title: "AI Analyst",
    desc: "Compares options, trade-offs, risks, and strong recommendations.",
    tone: "Structured and evaluative",
    tags: ["Decision", "Trade-offs", "Strategy"],
    starter: "Compare whether a startup should build mobile first or web first.",
  },
};

type OutputShape = {
  title: string;
  summary: string;
  meaning?: string;
  nextAction: string;
  why: string[];
  deliverables: string[];
  risk: string;
  encouragement?: string;
};

const EMPTY_OUTPUT: OutputShape = {
  title: "Response Guidance",
  summary: "Choose a mode, choose a tone, write a prompt, then generate a live Frontier response.",
  meaning: "This panel becomes live AI output once you generate it.",
  nextAction: "Select the behavior and define the prompt clearly.",
  why: ["Frontier needs mode, tone, and prompt to shape the response."],
  deliverables: ["A live AI-generated behavior interpretation."],
  risk: "Vague prompts produce weaker output.",
  encouragement: "Use the same prompt across multiple modes to compare AI behavior properly.",
};

export default function FrontierAIBotsPage() {
  const [mode, setMode] = useState<BotMode>("assistant");
  const [tone, setTone] = useState<ToneMode>("structured");
  const [prompt, setPrompt] = useState(MODES.assistant.starter);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<OutputShape>(EMPTY_OUTPUT);

  const active = useMemo(() => MODES[mode], [mode]);

  async function handleGenerate() {
    setLoading(true);
    try {
      const ai = await runFrontierLiveEngine({
        workspace: "ai-bots",
        title: active.title,
        mode: active.title,
        tone: TONES[tone].title,
        focus: active.tags,
        userInput: prompt || active.starter,
      });

      setOutput({
        title: "Response Guidance",
        summary: ai.summary || EMPTY_OUTPUT.summary,
        meaning: ai.meaning || EMPTY_OUTPUT.meaning,
        nextAction: ai.nextAction || EMPTY_OUTPUT.nextAction,
        why: Array.isArray(ai.why) ? ai.why : EMPTY_OUTPUT.why,
        deliverables: Array.isArray(ai.deliverables)
          ? ai.deliverables
          : EMPTY_OUTPUT.deliverables,
        risk: ai.risk || EMPTY_OUTPUT.risk,
        encouragement: ai.encouragement || EMPTY_OUTPUT.encouragement,
      });
    } catch (error) {
      setOutput({
        title: "Response Guidance",
        summary: "Frontier AI could not generate a live response right now.",
        meaning: "The workspace is still connected, but the live engine request did not complete successfully.",
        nextAction: "Try again with a shorter prompt or verify the public chat route.",
        why: ["The live AI route may be unavailable or returning an unexpected response."],
        deliverables: ["A safe fallback response instead of a broken page."],
        risk: error instanceof Error ? error.message : "Unknown Frontier AI error.",
        encouragement: "The page is safe. Only the live AI request needs adjustment.",
      });
    } finally {
      setLoading(false);
    }
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
        <Link href="/frontier" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          ← Back
        </Link>
        <Link href="/" className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white">
          Home
        </Link>
        <Link href="/frontier" className="inline-flex items-center rounded-xl border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-sm text-lime-100 hover:bg-lime-400/15">
          Frontier Lab
        </Link>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200/70">
          Frontier Lab
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          AI Bot Lab
        </h1>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-white/70 sm:text-base">
          Experiment with AI behaviour models. Choose a mode, choose a tone, type a prompt, and
          compare how the response changes by purpose and operating style.
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">Choose bot behaviour</div>
            <div className="rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1 text-[11px] text-lime-100">
              Live AI Simulation
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {(Object.keys(MODES) as BotMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMode(item);
                  setPrompt(MODES[item].starter);
                }}
                className={cx(
                  "rounded-2xl border p-4 text-left transition",
                  mode === item
                    ? "border-lime-300/30 bg-lime-400/10 text-white"
                    : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                )}
              >
                <div className="text-base font-semibold">{MODES[item].title}</div>
                <div className="mt-2 text-sm leading-6 text-white/70">{MODES[item].desc}</div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-sm font-semibold text-white">Tone layer</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(Object.keys(TONES) as ToneMode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTone(item)}
                  className={cx(
                    "rounded-2xl border p-4 text-left transition",
                    tone === item
                      ? "border-lime-300/30 bg-lime-400/10 text-white"
                      : "border-white/10 bg-black/20 text-white/80 hover:bg-white/7"
                  )}
                >
                  <div className="text-sm font-semibold">{TONES[item].title}</div>
                  <div className="mt-1 text-sm text-white/70">{TONES[item].desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold text-white">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              placeholder="Type a prompt to test how the mode behaves..."
              className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90 disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate live AI response"}
            </button>
            <button
              type="button"
              onClick={() => setPrompt(active.starter)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              Reset prompt
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="text-sm font-semibold text-white">Mode profile</div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-2xl font-semibold text-white">{active.title}</div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                  {TONES[tone].title}
                </div>
              </div>
              <div className="mt-2 text-sm leading-6 text-white/70">{active.desc}</div>

              <div className="mt-4 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <FrontierOutputPanel
            title={output.title}
            summary={output.summary}
            meaning={output.meaning}
            nextAction={output.nextAction}
            why={output.why}
            deliverables={output.deliverables}
            risk={output.risk}
            encouragement={output.encouragement}
          />
        </div>
      </div>
    </section>
  );
}
