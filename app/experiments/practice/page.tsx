"use client";

import { useMemo, useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

type PracticeType =
  | "Interview"
  | "Oral Exam"
  | "Presentation"
  | "Difficult Conversation";

type PracticeResult = {
  sessionBrief: string;
  firstChallenge: string;
  evaluatorFocus: string;
  strongPattern: string;
  mistakes: string;
  nextDrill: string;
};

const STARTERS: Record<PracticeType, string[]> = {
  Interview: [
    "Prepare me for a junior IT support interview.",
    "Help me practice for a frontend developer interview.",
  ],
  "Oral Exam": [
    "Test me orally on biology revision for high school.",
    "Help me rehearse oral answers for a machine learning exam.",
  ],
  Presentation: [
    "Help me prepare for a 5-minute startup pitch presentation.",
    "Let me rehearse a class presentation on climate change.",
  ],
  "Difficult Conversation": [
    "Help me prepare for a hard conversation with my teammate.",
    "Help me rehearse a calm conversation about disappointment and boundaries.",
  ],
};

function parsePracticeAnswer(text: string): PracticeResult {
  const clean = text.trim();

  const findSection = (label: string): string => {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
      `${escaped}\\s*:?\\s*([\\s\\S]*?)(?=\\n[A-Z][A-Za-z ]+\\s*:|$)`,
      "i"
    );
    const match = clean.match(regex);
    return match?.[1]?.trim() || "";
  };

  const sessionBrief = findSection("Session Brief");
  const firstChallenge = findSection("First Challenge");
  const evaluatorFocus = findSection("Evaluator Focus");
  const strongPattern = findSection("Strong Response Pattern");
  const mistakes = findSection("Common Mistakes");
  const nextDrill = findSection("Next Drill");

  if (
    sessionBrief ||
    firstChallenge ||
    evaluatorFocus ||
    strongPattern ||
    mistakes ||
    nextDrill
  ) {
    return {
      sessionBrief:
        sessionBrief ||
        "This session will help you rehearse the scenario in a clearer, more structured way.",
      firstChallenge:
        firstChallenge ||
        "Start by giving your strongest opening response to the scenario.",
      evaluatorFocus:
        evaluatorFocus ||
        "The other side is likely judging clarity, confidence, structure, and relevance.",
      strongPattern:
        strongPattern ||
        "Give a direct answer first, support it with one clear example, and close with confidence.",
      mistakes:
        mistakes ||
        "Avoid rambling, vague language, low confidence, and missing the core question.",
      nextDrill:
        nextDrill ||
        "Repeat the same scenario once more, but tighten the answer and improve clarity.",
    };
  }

  return {
    sessionBrief:
      "Your practice session is ready. Use the guidance below to rehearse the scenario step by step.",
    firstChallenge: clean,
    evaluatorFocus:
      "Focus on clarity, relevance, calm delivery, and whether your answer matches the situation.",
    strongPattern:
      "Start directly, stay structured, support your answer with one strong example, and close clearly.",
    mistakes:
      "Do not over-explain, go off-topic, sound uncertain, or leave your answer without a conclusion.",
    nextDrill:
      "Rerun the scenario and give a shorter, sharper second version of your answer.",
  };
}

async function fetchPracticeReply(input: string, selected: PracticeType): Promise<string> {
  const systemPrompt = `
You are Shynvo Practice Arena inside the Experiments environment.

Your role:
- You help users rehearse real situations professionally.
- You prepare them for performance, pressure, clarity, and confident delivery.
- You are a structured practice trainer, not a generic chatbot.

Current practice mode:
- ${selected}

Behavior:
- Be practical, direct, realistic, and structured.
- Do not be vague.
- Do not mention backend systems, models, APIs, or infrastructure.
- Stay fully in the role of Practice Arena.

Output format:
Session Brief:
<2-4 sentences explaining what this practice session is preparing the user for>

First Challenge:
<give the first question, task, speaking challenge, or opening situation>

Evaluator Focus:
<explain what the interviewer, examiner, audience, or other person is likely evaluating>

Strong Response Pattern:
<show the best structure or pattern the user should follow in their answer>

Common Mistakes:
<list the most likely mistakes to avoid in this exact scenario>

Next Drill:
<give the next practical drill the user should do after the first challenge>

Rules:
- Tailor the response directly to the user's exact prompt.
- Make the output feel like a real training session.
- Be structured and useful.
- Do not output placeholders.
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
    throw new Error(raw || "Practice Arena could not respond right now.");
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

    return (
      data.answer ||
      data.reply ||
      data.message ||
      raw ||
      "Practice Arena could not respond right now."
    );
  } catch {
    return raw || "Practice Arena could not respond right now.";
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
      <div className="mt-2 text-sm leading-6 text-white/75">{body}</div>
    </div>
  );
}

export default function PracticePage() {
  const [selected, setSelected] = useState<PracticeType>("Interview");
  const [prompt, setPrompt] = useState("");
  const [sessionBrief, setSessionBrief] = useState("");
  const [firstChallenge, setFirstChallenge] = useState("");
  const [evaluatorFocus, setEvaluatorFocus] = useState("");
  const [strongPattern, setStrongPattern] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [nextDrill, setNextDrill] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const starterItems = useMemo(() => STARTERS[selected], [selected]);

  async function startPractice(customText?: string) {
    const text = (customText ?? prompt).trim();
    if (!text || loading) return;

    if (customText) {
      setPrompt(customText);
    }

    setHasRun(true);
    setLoading(true);

    setSessionBrief("Preparing your practice session...");
    setFirstChallenge("Generating the first challenge...");
    setEvaluatorFocus("Analyzing what the other side is likely judging...");
    setStrongPattern("Preparing your strongest response structure...");
    setMistakes("Listing mistakes to avoid...");
    setNextDrill("Preparing the next drill...");

    try {
      const answer = await fetchPracticeReply(text, selected);
      const parsed = parsePracticeAnswer(answer);

      setSessionBrief(parsed.sessionBrief);
      setFirstChallenge(parsed.firstChallenge);
      setEvaluatorFocus(parsed.evaluatorFocus);
      setStrongPattern(parsed.strongPattern);
      setMistakes(parsed.mistakes);
      setNextDrill(parsed.nextDrill);
    } catch {
      setSessionBrief(
        "Your practice session could not be prepared right now, but you can retry with a clearer prompt."
      );
      setFirstChallenge(
        "Restate the scenario more specifically so the trainer can prepare a sharper rehearsal."
      );
      setEvaluatorFocus(
        "The evaluator focus could not be generated for this run."
      );
      setStrongPattern(
        "Start directly, stay structured, support your point with one example, and close clearly."
      );
      setMistakes(
        "Avoid vague wording, weak openings, overlong answers, and low-confidence delivery."
      );
      setNextDrill(
        "Retry the session with a clearer exact role, topic, or speaking situation."
      );
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
        Practice Arena
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Practice Arena helps users rehearse real situations with structured AI guidance. It is built
        for interviews, oral exams, presentations, pitches, and difficult conversations.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["Interview", "Oral Exam", "Presentation", "Difficult Conversation"] as PracticeType[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSelected(item)}
            className={`rounded-3xl border px-5 py-5 text-left transition ${
              selected === item
                ? "border-white bg-white text-[#0B0F14]"
                : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
            }`}
          >
            <div className="text-lg font-semibold">{item}</div>
            <div className="mt-1 text-sm opacity-80">
              {item === "Interview" && "Practice job and internship interviews"}
              {item === "Oral Exam" && "Rehearse academic response under pressure"}
              {item === "Presentation" && "Practice clear speaking and delivery"}
              {item === "Difficult Conversation" && "Rehearse important personal or team discussions"}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {starterItems.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => startPractice(item)}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Practice Prompt</div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the exact practice situation you want to rehearse..."
          className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => startPractice()}
            disabled={loading || !prompt.trim()}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Preparing..." : "Start Practice"}
          </button>
        </div>
      </div>

      {!hasRun ? (
        <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Training Structure</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <OutputCard
              title="What happens here"
              body="Once you start, Practice Arena prepares a structured rehearsal session instead of returning a random paragraph."
            />
            <OutputCard
              title="What you will receive"
              body="You will get a session brief, a first challenge, evaluator focus, a strong response pattern, mistakes to avoid, and a next drill."
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-sm font-semibold text-white">Session Flow</div>

            <div className="mt-4 space-y-4">
              <OutputCard title="Session Brief" body={sessionBrief} />
              <OutputCard title="First Challenge" body={firstChallenge} />
              <OutputCard title="Evaluator Focus" body={evaluatorFocus} />
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-sm font-semibold text-white">Performance Guidance</div>

            <div className="mt-4 space-y-4">
              <OutputCard title="Strong Response Pattern" body={strongPattern} />
              <OutputCard title="Common Mistakes" body={mistakes} />
              <OutputCard title="Next Drill" body={nextDrill} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
