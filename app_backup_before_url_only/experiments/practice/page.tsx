"use client";

import { useMemo, useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

type PracticeType =
  | "Interview"
  | "Oral Exam"
  | "Presentation"
  | "Difficult Conversation";

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
    `${escaped}\\s*:\\s*([\\s\\S]*?)(?=\\n(?:Session Brief|First Challenge|Evaluator Focus|Strong Response Pattern|Common Mistakes|Next Drill)\\s*:|$)`,
    "i"
  );
  const match = text.match(regex);
  return match?.[1]?.trim() || "";
}

function buildDynamicFallbacks(prompt: string, selected: PracticeType) {
  const text = prompt.trim();

  if (selected === "Interview") {
    return {
      evaluatorFocus:
        `The interviewer will likely judge how clearly and directly you answer "${text}", whether you sound credible, and whether you connect your answer to real work examples.`,
      strongPattern:
        `Open with a direct answer to "${text}", explain your reasoning in a structured way, add one concrete example from study, work, or projects, then close with a confident final line.`,
      mistakes:
        `Avoid sounding vague, repeating your CV without answering the question, speaking too generally, or giving long answers that do not clearly connect back to "${text}".`,
      nextDrill:
        `Answer the same interview prompt again in 60-90 seconds, but make the response sharper, more confident, and more specific to the role.`,
    };
  }

  if (selected === "Oral Exam") {
    return {
      evaluatorFocus:
        `The examiner is likely judging whether you actually understand the topic behind "${text}", whether your explanation is logically structured, and whether you can speak with clarity under pressure.`,
      strongPattern:
        `Start by defining the topic clearly, explain the main idea in order, support it with one relevant example or concept, and end with a short conclusion that shows understanding.`,
      mistakes:
        `Do not memorize without understanding, jump between points without structure, use unclear definitions, or give a long answer that never directly explains the core academic point in "${text}".`,
      nextDrill:
        `Repeat the same oral response again, but this time make the explanation more structured and reduce unnecessary wording.`,
    };
  }

  if (selected === "Presentation") {
    return {
      evaluatorFocus:
        `The audience will likely judge whether your message around "${text}" is clear, well-organized, easy to follow, and delivered with confidence.`,
      strongPattern:
        `Begin with the key message, explain the structure of your talk, develop 2-3 strong points with examples, and end with a memorable closing statement.`,
      mistakes:
        `Avoid overloading the audience with too many ideas, speaking without a clear flow, sounding uncertain, or presenting "${text}" without a strong takeaway.`,
      nextDrill:
        `Deliver the same presentation again in a shorter version and focus on clarity, pacing, and one stronger final takeaway.`,
    };
  }

  return {
    evaluatorFocus:
      `The other person will likely judge whether you communicate "${text}" calmly, respectfully, clearly, and in a way that matches the emotional reality of the situation.`,
    strongPattern:
      `Start with the core issue, explain how it affects you, stay calm and specific, avoid blame-heavy language, and end with the outcome or boundary you want.`,
    mistakes:
      `Avoid sounding accusatory, becoming too indirect, hiding the real issue, over-explaining emotionally, or leaving "${text}" without a clear request or direction.`,
    nextDrill:
      `Rehearse the same conversation again using calmer wording, shorter sentences, and a clearer final request or boundary.`,
  };
}

function parsePracticeOutput(text: string, prompt: string, selected: PracticeType) {
  const clean = cleanOutput(text);

  const sessionBrief = extractSection(clean, "Session Brief");
  const firstChallenge = extractSection(clean, "First Challenge");
  const evaluatorFocus = extractSection(clean, "Evaluator Focus");
  const strongPattern = extractSection(clean, "Strong Response Pattern");
  const mistakes = extractSection(clean, "Common Mistakes");
  const nextDrill = extractSection(clean, "Next Drill");

  const dynamic = buildDynamicFallbacks(prompt, selected);

  if (
    sessionBrief ||
    firstChallenge ||
    evaluatorFocus ||
    strongPattern ||
    mistakes ||
    nextDrill
  ) {
    return {
      sessionBrief: sessionBrief || `This practice session is built around: ${prompt}`,
      firstChallenge: firstChallenge || clean,
      evaluatorFocus: evaluatorFocus || dynamic.evaluatorFocus,
      strongPattern: strongPattern || dynamic.strongPattern,
      mistakes: mistakes || dynamic.mistakes,
      nextDrill: nextDrill || dynamic.nextDrill,
    };
  }

  return {
    sessionBrief: `This practice session is built around: ${prompt}`,
    firstChallenge: clean || "No answer returned.",
    evaluatorFocus: dynamic.evaluatorFocus,
    strongPattern: dynamic.strongPattern,
    mistakes: dynamic.mistakes,
    nextDrill: dynamic.nextDrill,
  };
}

async function fetchPracticeReply(input: string, selected: PracticeType): Promise<string> {
  const systemPrompt = `
You are Shynvo Practice Arena inside the Experiments environment.

Identity:
- You are a professional rehearsal and performance training system.
- You help users prepare for real situations with clarity, confidence, realism, and structured practice.
- You are not a generic chatbot.

Current mode:
- ${selected}

Your job:
- Read the user's exact scenario carefully.
- Give a realistic and professional practice response.
- Make the response feel specific to the user's prompt.
- Be supportive, intelligent, and useful.
- Give strong explanation, not shallow repetition.

Required output structure:
Session Brief:
<2-4 sentences explaining what this practice session is really about>

First Challenge:
<a rich, detailed, realistic main response tailored to the user's exact prompt. This should be the biggest and most useful section.>

Evaluator Focus:
<what the other side is likely judging in this exact situation>

Strong Response Pattern:
<how the user should structure their answer or delivery for this exact situation>

Common Mistakes:
<the biggest mistakes likely in this specific situation>

Next Drill:
<the next practice step the user should do after this>

Important:
- Every section must adapt to the user's exact prompt.
- Do not reuse generic wording.
- Do not make Evaluator Focus, Strong Response Pattern, Common Mistakes, or Next Drill sound identical across unrelated questions.
- The side-panel sections must be prompt-specific.

Rules:
- Do not mention backend systems, APIs, models, or infrastructure.
- Do not return JSON.
- Do not use markdown code fences.
- Make the answer feel human, clear, and professional.
- The "First Challenge" section must be rich, practical, and adapted to the exact user request.
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

    setSessionBrief("Preparing your session...");
    setFirstChallenge("Generating a detailed practice response...");
    setEvaluatorFocus("Reading evaluator expectations...");
    setStrongPattern("Building a strong response pattern...");
    setMistakes("Identifying common mistakes...");
    setNextDrill("Preparing the next drill...");

    try {
      const answer = await fetchPracticeReply(text, selected);
      const parsed = parsePracticeOutput(answer, text, selected);

      setSessionBrief(parsed.sessionBrief);
      setFirstChallenge(parsed.firstChallenge);
      setEvaluatorFocus(parsed.evaluatorFocus);
      setStrongPattern(parsed.strongPattern);
      setMistakes(parsed.mistakes);
      setNextDrill(parsed.nextDrill);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Practice Arena could not respond right now.";

      const dynamic = buildDynamicFallbacks(text, selected);

      setSessionBrief(`This practice session is built around: ${text}`);
      setFirstChallenge(message);
      setEvaluatorFocus(dynamic.evaluatorFocus);
      setStrongPattern(dynamic.strongPattern);
      setMistakes(dynamic.mistakes);
      setNextDrill(dynamic.nextDrill);
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
        Practice Arena helps users rehearse real situations with AI feedback. It can be used for
        interviews, oral exams, presentations, pitches, and difficult conversations.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {(
          ["Interview", "Oral Exam", "Presentation", "Difficult Conversation"] as PracticeType[]
        ).map((item) => (
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
              {item === "Difficult Conversation" &&
                "Rehearse important personal or team discussions"}
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
          <div className="text-sm font-semibold text-white">Practice Output</div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
            Start a session and Practice Arena will generate a richer, scenario-specific rehearsal
            response.
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-5">
            <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Session Brief</div>
              <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
                {sessionBrief}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">First Challenge</div>
              <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
                {firstChallenge}
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-6 self-start">
            <OutputCard title="Evaluator Focus" body={evaluatorFocus} />
            <OutputCard title="Strong Response Pattern" body={strongPattern} />
            <OutputCard title="Common Mistakes" body={mistakes} />
            <OutputCard title="Next Drill" body={nextDrill} />
          </div>
        </div>
      )}
    </section>
  );
}
