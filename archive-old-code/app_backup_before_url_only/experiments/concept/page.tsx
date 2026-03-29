"use client";

import { useMemo, useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

type ConceptResult = {
  conceptBrief: string;
  coreConcept: string;
  targetUserProblem: string;
  valueProposition: string;
  conceptRisks: string;
  nextBuildStep: string;
};

const STARTERS = [
  "I want to build an AI app that helps students stay focused and complete their goals.",
  "I want to create a platform that helps small businesses organize operations.",
  "I want to build a product that helps people recover from burnout and regain structure.",
  "I want to launch a digital education tool for practical learning.",
];

function cleanOutput(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\r/g, "")
    .replace(/^#+\s*/gm, "")
    .replace(/\*\*/g, "")
    .trim();
}

function extractSection(text: string, label: string): string {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `${escaped}\\s*:\\s*([\\s\\S]*?)(?=\\n(?:Concept Brief|Core Concept|Target User + Problem|Value Proposition|Concept Risks|Next Build Step)\\s*:|$)`,
    "i"
  );
  const match = text.match(regex);
  return match?.[1]?.trim() || "";
}

function buildDynamicFallbacks(prompt: string): Omit<ConceptResult, "conceptBrief"> {
  const text = prompt.trim();

  return {
    coreConcept:
      `The central concept behind "${text}" appears to be turning a rough intention into a more defined product direction. The idea needs a clearer promise, a clearer user, and a clearer reason this should exist now.`,
    targetUserProblem:
      `The main job here is to identify exactly who struggles with the problem inside "${text}", what frustration they currently face, and why existing options do not solve it well enough.`,
    valueProposition:
      `A stronger value proposition would explain what this idea helps users do better, faster, or more confidently, and why they would choose it over doing nothing or using an alternative.`,
    conceptRisks:
      `The biggest risks are being too broad, trying to serve too many users at once, describing a feature instead of a true product outcome, and not validating whether people actually care enough about the problem.`,
    nextBuildStep:
      `The best next step is to narrow "${text}" into one specific user, one painful problem, one promised outcome, and one small first version you can test quickly.`,
  };
}

function parseConceptOutput(text: string, prompt: string): ConceptResult {
  const clean = cleanOutput(text);

  const conceptBrief = extractSection(clean, "Concept Brief");
  const coreConcept = extractSection(clean, "Core Concept");
  const targetUserProblem = extractSection(clean, "Target User + Problem");
  const valueProposition = extractSection(clean, "Value Proposition");
  const conceptRisks = extractSection(clean, "Concept Risks");
  const nextBuildStep = extractSection(clean, "Next Build Step");

  const dynamic = buildDynamicFallbacks(prompt);

  if (
    conceptBrief ||
    coreConcept ||
    targetUserProblem ||
    valueProposition ||
    conceptRisks ||
    nextBuildStep
  ) {
    return {
      conceptBrief:
        conceptBrief ||
        `This concept session is built around: ${prompt}`,
      coreConcept: coreConcept || dynamic.coreConcept,
      targetUserProblem: targetUserProblem || dynamic.targetUserProblem,
      valueProposition: valueProposition || dynamic.valueProposition,
      conceptRisks: conceptRisks || dynamic.conceptRisks,
      nextBuildStep: nextBuildStep || dynamic.nextBuildStep,
    };
  }

  return {
    conceptBrief: `This concept session is built around: ${prompt}`,
    coreConcept: clean || dynamic.coreConcept,
    targetUserProblem: dynamic.targetUserProblem,
    valueProposition: dynamic.valueProposition,
    conceptRisks: dynamic.conceptRisks,
    nextBuildStep: dynamic.nextBuildStep,
  };
}

async function fetchConceptReply(input: string): Promise<string> {
  const systemPrompt = `
You are Shynvo Concept Forge inside the Experiments environment.

Identity:
- You are a professional concept development system.
- You help users turn vague ideas into stronger product concepts.
- You are not a generic chatbot.

Your job:
- Read the user's exact idea carefully.
- Make the concept clearer, stronger, and more realistic.
- Help the user move from vague ambition to a more structured concept.
- Tailor every section to the exact prompt.

Required output structure:
Concept Brief:
<2-4 sentences explaining what this concept is really trying to become>

Core Concept:
<a rich explanation of the actual concept, what it is, what it does, and what it should become>

Target User + Problem:
<who this is really for and what exact pain/problem it solves>

Value Proposition:
<why it matters, what value it gives, and why someone would care>

Concept Risks:
<main weaknesses, blind spots, or risks inside the idea>

Next Build Step:
<the most practical next step to sharpen or validate the concept>

Important:
- Every section must adapt to the user's exact prompt.
- Do not use repetitive generic filler.
- Make the answer feel real, strategic, and product-minded.
- The Core Concept section should be the richest section.

Rules:
- Do not mention backend systems, APIs, models, or infrastructure.
- Do not return JSON.
- Do not use markdown code fences.
- Keep the language professional and clear.
`.trim();

  const payload = {
    message: input,
    systemPrompt,
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
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

  if (!res.ok) {
    throw new Error(raw || "Concept Forge could not respond right now.");
  }

  try {
    const data = JSON.parse(raw) as {
      answer?: string;
      reply?: string;
      message?: string;
      error?: string;
    };

    if (data.error) {
      throw new Error(data.error);
    }

    return cleanOutput(data.answer || data.reply || data.message || raw);
  } catch {
    return cleanOutput(raw);
  }
}

function OutputCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 whitespace-pre-wrap text-sm leading-7 text-white/75">
        {body}
      </div>
    </div>
  );
}

export default function ConceptPage() {
  const [input, setInput] = useState("");
  const [conceptBrief, setConceptBrief] = useState("");
  const [coreConcept, setCoreConcept] = useState("");
  const [targetUserProblem, setTargetUserProblem] = useState("");
  const [valueProposition, setValueProposition] = useState("");
  const [conceptRisks, setConceptRisks] = useState("");
  const [nextBuildStep, setNextBuildStep] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const starterItems = useMemo(() => STARTERS, []);

  async function forgeConcept(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    if (customText) {
      setInput(customText);
    }

    setHasRun(true);
    setLoading(true);

    setConceptBrief("Reading your idea...");
    setCoreConcept("Forging the core concept...");
    setTargetUserProblem("Identifying user and problem...");
    setValueProposition("Clarifying value...");
    setConceptRisks("Reviewing concept risks...");
    setNextBuildStep("Preparing next build step...");

    try {
      const answer = await fetchConceptReply(text);
      const parsed = parseConceptOutput(answer, text);

      setConceptBrief(parsed.conceptBrief);
      setCoreConcept(parsed.coreConcept);
      setTargetUserProblem(parsed.targetUserProblem);
      setValueProposition(parsed.valueProposition);
      setConceptRisks(parsed.conceptRisks);
      setNextBuildStep(parsed.nextBuildStep);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Concept Forge could not respond right now.";

      const dynamic = buildDynamicFallbacks(text);

      setConceptBrief(`This concept session is built around: ${text}`);
      setCoreConcept(message || dynamic.coreConcept);
      setTargetUserProblem(dynamic.targetUserProblem);
      setValueProposition(dynamic.valueProposition);
      setConceptRisks(dynamic.conceptRisks);
      setNextBuildStep(dynamic.nextBuildStep);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <ExperimentsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-cyan-100/70">
        Experiments
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        Concept Forge
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Concept Forge is where rough thoughts become structured ideas. Users can turn vague concepts
        into clearer direction, value, audience, and next steps.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {starterItems.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => forgeConcept(item)}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Raw Idea Input</div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe the idea you want to turn into a clearer concept..."
          className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => forgeConcept()}
            disabled={loading || !input.trim()}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Forging..." : "Forge Concept"}
          </button>
        </div>
      </div>

      {!hasRun ? (
        <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Concept Output</div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
            Start a concept session and Concept Forge will generate a richer, idea-specific concept breakdown.
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-5">
            <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Concept Brief</div>
              <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
                {conceptBrief}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Core Concept</div>
              <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
                {coreConcept}
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-6 self-start">
            <OutputCard title="Target User + Problem" body={targetUserProblem} />
            <OutputCard title="Value Proposition" body={valueProposition} />
            <OutputCard title="Concept Risks" body={conceptRisks} />
            <OutputCard title="Next Build Step" body={nextBuildStep} />
          </div>
        </div>
      )}
    </section>
  );
}
