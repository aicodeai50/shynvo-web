"use client";

import { useMemo, useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

type Mode = "Balanced" | "Critical" | "Aggressive";

type DebateResult = {
  sessionBrief: string;
  strongestPro: string;
  strongestCon: string;
  blindSpots: string;
  recommendation: string;
  decisionPressure: string;
};

const STARTERS: Record<Mode, string[]> = {
  Balanced: [
    "Should I focus on exam preparation first or on building my startup project?",
    "Should I take a stable job first or continue pushing my product full-time?",
  ],
  Critical: [
    "Is launching too early going to damage my product credibility?",
    "Should I stop trying to do everything at once and narrow my priorities?",
  ],
  Aggressive: [
    "Should I go all in on my idea now before the opportunity disappears?",
    "Is it smarter to take a big risk now instead of waiting another year?",
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
    `${escaped}\\s*:\\s*([\\s\\S]*?)(?=\\n(?:Session Brief|Strongest Pro Side|Strongest Con Side|Blind Spots|Recommendation|Decision Pressure)\\s*:|$)`,
    "i"
  );
  const match = text.match(regex);
  return match?.[1]?.trim() || "";
}

function buildDynamicFallbacks(prompt: string, mode: Mode): Omit<DebateResult, "sessionBrief"> {
  const text = prompt.trim();

  if (mode === "Balanced") {
    return {
      strongestPro:
        `The strongest case in favor of "${text}" is that it may create meaningful upside if approached with clear structure, realistic constraints, and disciplined follow-through.`,
      strongestCon:
        `The strongest case against "${text}" is that it may introduce overload, trade-off blindness, or hidden opportunity cost if the user commits without enough clarity.`,
      blindSpots:
        `The likely blind spots inside "${text}" are emotional bias, weak assumptions about time and capacity, and underestimating what must be sacrificed to make the choice work.`,
      recommendation:
        `The most grounded recommendation is to avoid making this an all-or-nothing decision. Test the stronger option in a limited, controlled way before fully committing.`,
      decisionPressure:
        `This decision appears to carry moderate pressure because the user likely wants forward movement but also risks making the wrong commitment too early.`,
    };
  }

  if (mode === "Critical") {
    return {
      strongestPro:
        `Even under critical review, "${text}" may still have strategic value if it improves long-term positioning, solves a real problem, or prevents wasted time later.`,
      strongestCon:
        `The hardest argument against "${text}" is that it may be driven by weak assumptions, poor timing, or false urgency rather than actual strategic strength.`,
      blindSpots:
        `The biggest blind spots here are optimism without evidence, ignoring second-order consequences, and failing to ask what would make this decision actively harmful.`,
      recommendation:
        `The best recommendation is to stress-test the logic behind "${text}" harder before moving forward. A decision that survives criticism is much stronger than one protected by enthusiasm.`,
      decisionPressure:
        `This decision carries higher pressure because a flawed judgment here could produce avoidable cost in time, energy, credibility, or momentum.`,
    };
  }

  return {
    strongestPro:
      `The strongest aggressive case for "${text}" is that decisive action now could create speed, advantage, and momentum that slower decision-making may lose.`,
    strongestCon:
      `The strongest aggressive case against "${text}" is that if this move fails, the downside may be heavy in energy, stability, money, or reputation.`,
    blindSpots:
      `The main blind spots here are overconfidence, acting under speed pressure, and assuming recovery will be easy if the move goes badly.`,
    recommendation:
      `The best recommendation is to move only if the upside is genuinely worth the downside and you have a believable recovery path if the decision fails.`,
    decisionPressure:
      `This decision carries strong pressure because the cost of hesitation feels high, but the cost of reckless commitment may also be severe.`,
  };
}

function parseDebateOutput(text: string, prompt: string, mode: Mode): DebateResult {
  const clean = cleanOutput(text);

  const sessionBrief = extractSection(clean, "Session Brief");
  const strongestPro = extractSection(clean, "Strongest Pro Side");
  const strongestCon = extractSection(clean, "Strongest Con Side");
  const blindSpots = extractSection(clean, "Blind Spots");
  const recommendation = extractSection(clean, "Recommendation");
  const decisionPressure = extractSection(clean, "Decision Pressure");

  const dynamic = buildDynamicFallbacks(prompt, mode);

  if (
    sessionBrief ||
    strongestPro ||
    strongestCon ||
    blindSpots ||
    recommendation ||
    decisionPressure
  ) {
    return {
      sessionBrief:
        sessionBrief ||
        `This debate session is evaluating: ${prompt}`,
      strongestPro: strongestPro || dynamic.strongestPro,
      strongestCon: strongestCon || dynamic.strongestCon,
      blindSpots: blindSpots || dynamic.blindSpots,
      recommendation: recommendation || dynamic.recommendation,
      decisionPressure: decisionPressure || dynamic.decisionPressure,
    };
  }

  return {
    sessionBrief: `This debate session is evaluating: ${prompt}`,
    strongestPro: clean || dynamic.strongestPro,
    strongestCon: dynamic.strongestCon,
    blindSpots: dynamic.blindSpots,
    recommendation: dynamic.recommendation,
    decisionPressure: dynamic.decisionPressure,
  };
}

async function fetchDebateReply(input: string, mode: Mode): Promise<string> {
  const systemPrompt = `
You are Shynvo Debate Lab inside the Experiments environment.

Identity:
- You are a professional reasoning and counterargument system.
- You help users test important choices, beliefs, and strategic decisions.
- You are not a generic chatbot.

Current debate mode:
- ${mode}

Your job:
- Read the user's exact decision or issue carefully.
- Present a serious multi-angle reasoning response.
- Make the response feel specific to the user's exact prompt.
- Avoid shallow or repetitive logic.

Required output structure:
Session Brief:
<2-4 sentences explaining what this debate is really testing>

Strongest Pro Side:
<the strongest serious case in favor>

Strongest Con Side:
<the strongest serious case against>

Blind Spots:
<hidden assumptions, emotional distortions, missed trade-offs, or weak logic>

Recommendation:
<the best current recommendation after comparing both sides>

Decision Pressure:
<explain the pressure level, stakes, or strategic weight of this decision>

Important:
- Every section must adapt to the exact user prompt.
- Do not reuse generic fixed wording for unrelated prompts.
- The pro and con sections must feel genuinely argued, not decorative.
- The recommendation should sound like real reasoning, not motivational filler.

Rules:
- Do not mention backend systems, APIs, models, or infrastructure.
- Do not return JSON.
- Do not use markdown code fences.
- Keep the tone sharp, professional, and useful.
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
    throw new Error(raw || "Debate Lab could not respond right now.");
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

export default function DebatePage() {
  const [mode, setMode] = useState<Mode>("Balanced");
  const [input, setInput] = useState("");
  const [sessionBrief, setSessionBrief] = useState("");
  const [strongestPro, setStrongestPro] = useState("");
  const [strongestCon, setStrongestCon] = useState("");
  const [blindSpots, setBlindSpots] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [decisionPressure, setDecisionPressure] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const starterItems = useMemo(() => STARTERS[mode], [mode]);

  async function generateDebate(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    if (customText) {
      setInput(customText);
    }

    setHasRun(true);
    setLoading(true);

    setSessionBrief("Preparing debate session...");
    setStrongestPro("Building strongest pro case...");
    setStrongestCon("Building strongest con case...");
    setBlindSpots("Scanning for blind spots...");
    setRecommendation("Forming recommendation...");
    setDecisionPressure("Assessing decision pressure...");

    try {
      const answer = await fetchDebateReply(text, mode);
      const parsed = parseDebateOutput(answer, text, mode);

      setSessionBrief(parsed.sessionBrief);
      setStrongestPro(parsed.strongestPro);
      setStrongestCon(parsed.strongestCon);
      setBlindSpots(parsed.blindSpots);
      setRecommendation(parsed.recommendation);
      setDecisionPressure(parsed.decisionPressure);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Debate Lab could not respond right now.";

      const dynamic = buildDynamicFallbacks(text, mode);

      setSessionBrief(`This debate session is evaluating: ${text}`);
      setStrongestPro(message || dynamic.strongestPro);
      setStrongestCon(dynamic.strongestCon);
      setBlindSpots(dynamic.blindSpots);
      setRecommendation(dynamic.recommendation);
      setDecisionPressure(dynamic.decisionPressure);
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
        Debate Lab
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Test both sides of a decision, argument, or belief. This lab helps users see stronger
        counterpoints, hidden assumptions, and a clearer conclusion.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {(["Balanced", "Critical", "Aggressive"] as Mode[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={`rounded-3xl border px-5 py-4 text-left transition ${
              mode === item
                ? "border-white bg-white text-[#0B0F14]"
                : "border-white/10 bg-white/5 text-white/85 hover:bg-white/10"
            }`}
          >
            <div className="text-lg font-semibold">{item}</div>
            <div className="mt-1 text-sm opacity-80">
              {item === "Balanced" && "Compare both sides with steady reasoning"}
              {item === "Critical" && "Pressure-test assumptions and weak logic"}
              {item === "Aggressive" && "Evaluate high-upside, high-risk decisions"}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {starterItems.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => generateDebate(item)}
            className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">Debate Input</div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write the decision, argument, or issue you want Debate Lab to test..."
          className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => generateDebate()}
            disabled={loading || !input.trim()}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Debate"}
          </button>
        </div>
      </div>

      {!hasRun ? (
        <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Debate Output</div>
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
            Start a debate session and Debate Lab will generate a richer, scenario-specific reasoning breakdown.
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
              <div className="text-sm font-semibold text-white">Strongest Pro Side</div>
              <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
                {strongestPro}
              </div>
            </div>

            <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Strongest Con Side</div>
              <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
                {strongestCon}
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:sticky lg:top-6 self-start">
            <OutputCard title="Blind Spots" body={blindSpots} />
            <OutputCard title="Recommendation" body={recommendation} />
            <OutputCard title="Decision Pressure" body={decisionPressure} />
          </div>
        </div>
      )}
    </section>
  );
}
