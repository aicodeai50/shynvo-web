"use client";

import { useMemo, useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

type Scenario = "Academic" | "Career" | "Product" | "Life";

type SimulationResult = {
  summary: string;
  pathA: string;
  pathB: string;
  risk: string;
  move: string;
  fullResponse: string;
};

const STARTERS: Record<Scenario, string[]> = {
  Academic: [
    "If I study 2 hours daily for 6 weeks, can I pass my exams and still keep building my app?",
    "What happens if I focus on revision first and pause everything else for one month?",
  ],
  Career: [
    "Should I take a stable job first or keep pushing my startup full-time?",
    "What happens if I switch careers while still studying?",
  ],
  Product: [
    "If I launch a smaller version first, what are the likely outcomes?",
    "Should I build fast and test early, or wait until the product is more polished?",
  ],
  Life: [
    "What happens if I reduce pressure this month and focus on recovery first?",
    "If I commit to one major life change now, what risks should I expect?",
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
    `${escaped}\\s*:?\\s*([\\s\\S]*?)(?=\\n(?:Scenario Summary|Likely Path A|Likely Path B|Risk Level|Best Next Move)\\s*:|$)`,
    "i"
  );
  const match = text.match(regex);
  return match?.[1]?.trim() || "";
}

function buildDynamicFallbacks(prompt: string, scenario: Scenario) {
  const text = prompt.trim();

  const summary =
    scenario === "Academic"
      ? `This scenario is mainly about balancing learning pressure, time allocation, and realistic academic performance around "${text}".`
      : scenario === "Career"
      ? `This scenario is mainly about professional direction, trade-offs, and long-term positioning around "${text}".`
      : scenario === "Product"
      ? `This scenario is mainly about product timing, execution risk, and testing strategy around "${text}".`
      : `This scenario is mainly about life direction, personal stability, and the consequences of committing to "${text}".`;

  return {
    summary,
    pathA: `One realistic path is to move forward with "${text}" in a more direct way, but with clear checkpoints so the user can see early whether the decision is actually working.`,
    pathB: `A second realistic path is to reduce intensity, narrow scope, or test a smaller version first before making a full commitment around "${text}".`,
    risk: `The main risk is not only whether "${text}" succeeds, but whether the user is underestimating the emotional, time, or stability cost of the decision.`,
    move: `The best next move is to define one smaller test related to "${text}" before turning it into a full commitment.`,
  };
}

function parseSimulationOutput(text: string, prompt: string, scenario: Scenario): SimulationResult {
  const clean = cleanOutput(text);

  const summary = extractSection(clean, "Scenario Summary");
  const pathA = extractSection(clean, "Likely Path A");
  const pathB = extractSection(clean, "Likely Path B");
  const risk = extractSection(clean, "Risk Level");
  const move = extractSection(clean, "Best Next Move");

  const dynamic = buildDynamicFallbacks(prompt, scenario);

  return {
    summary: summary || dynamic.summary,
    pathA: pathA || dynamic.pathA,
    pathB: pathB || clean || dynamic.pathB,
    risk: risk || dynamic.risk,
    move: move || dynamic.move,
    fullResponse: clean,
  };
}

async function fetchSimulationReply(input: string, scenario: Scenario): Promise<string> {
  const systemPrompt = `
You are Shynvo Simulation Lab inside the Experiments environment.

Your role:
- You help users simulate likely outcomes before they act.
- You explore consequences, trade-offs, risks, and safer next moves.
- You think like a strategic scenario simulator, not like a generic chatbot.

Current scenario type:
- ${scenario}

Behavior:
- Be realistic, structured, clear, and highly useful.
- Do not be dramatic or vague.
- Tailor the answer directly to the user's exact scenario.
- Do not mention backend systems, APIs, models, or infrastructure.

Preferred output structure:
Scenario Summary:
<2-4 sentences summarizing the situation and tension>

Likely Path A:
<one realistic direct path>

Likely Path B:
<one realistic alternative path>

Risk Level:
<clear risk explanation>

Best Next Move:
<grounded practical next step>

Important:
- If you choose not to follow the exact headings, still give a rich and specific simulation answer.
- The answer must be clearly adapted to the user's exact scenario.
`.trim();

  const payload = {
    message: input,
    systemPrompt,
    messages: [{ role: "user", content: input }],
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
    throw new Error(raw || "Simulation Lab could not respond right now.");
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

function OutputCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 whitespace-pre-wrap text-sm leading-7 text-white/75">
        {body}
      </div>
    </div>
  );
}

export default function SimulationPage() {
  const [scenario, setScenario] = useState<Scenario>("Academic");
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [pathA, setPathA] = useState("");
  const [pathB, setPathB] = useState("");
  const [risk, setRisk] = useState("");
  const [move, setMove] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const starterItems = useMemo(() => STARTERS[scenario], [scenario]);

  async function runSimulation(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    if (customText) {
      setInput(customText);
    }

    setHasRun(true);
    setLoading(true);

    setSummary("Running simulation...");
    setPathA("Analyzing path A...");
    setPathB("Analyzing path B...");
    setRisk("Analyzing risk...");
    setMove("Preparing next move...");
    setFullResponse("Generating full simulation response...");

    try {
      const answer = await fetchSimulationReply(text, scenario);
      const parsed = parseSimulationOutput(answer, text, scenario);

      setSummary(parsed.summary);
      setPathA(parsed.pathA);
      setPathB(parsed.pathB);
      setRisk(parsed.risk);
      setMove(parsed.move);
      setFullResponse(parsed.fullResponse);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Simulation Lab could not respond right now.";

      const fallback = buildDynamicFallbacks(text, scenario);

      setSummary(fallback.summary);
      setPathA(fallback.pathA);
      setPathB(message || fallback.pathB);
      setRisk(fallback.risk);
      setMove(fallback.move);
      setFullResponse(message || fallback.pathB);
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
        Simulation Lab
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Run what-if scenarios before taking action. This lab helps users explore possible outcomes,
        risks, trade-offs, and better next moves with real AI reasoning.
      </p>

      <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">What this lab does</div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Simulates likely directions before you commit to a decision.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Shows alternative paths, risk levels, and practical trade-offs.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Helps users think more clearly under uncertainty.
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
            <div className="text-lg font-semibold text-white">Scenario Input</div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(["Academic", "Career", "Product", "Life"] as Scenario[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setScenario(item)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    scenario === item
                      ? "border-white bg-white text-[#0B0F14]"
                      : "border-white/10 bg-black/20 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {starterItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => runSimulation(item)}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
                >
                  {item}
                </button>
              ))}
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the real scenario you want to simulate..."
              className="mt-5 min-h-[220px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
            />

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => runSimulation()}
                disabled={loading || !input.trim()}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:opacity-50"
              >
                {loading ? "Running..." : "Run Simulation"}
              </button>
            </div>
          </div>

          {!hasRun ? (
            <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Simulation Output</div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
                Start a simulation and the lab will generate a richer scenario response with clearer trade-offs.
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Full Simulation Response</div>
              <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
                {fullResponse}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5 lg:sticky lg:top-6 self-start">
          <OutputCard title="Scenario Summary" body={summary} />
          <OutputCard title="Likely Path A" body={pathA} />
          <OutputCard title="Likely Path B" body={pathB} />
          <OutputCard title="Risk Level" body={risk} />
          <OutputCard title="Best Next Move" body={move} />
        </div>
      </div>
    </section>
  );
}
