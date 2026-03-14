"use client";

import { useMemo, useState } from "react";
import ExperimentsNav from "@/components/experiments/ExperimentsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

type Scenario = "Academic" | "Career" | "Product" | "Life";

type SimulationResult = {
  pathA: string;
  pathB: string;
  risk: string;
  move: string;
  summary: string;
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

function parseSimulationAnswer(text: string): SimulationResult {
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

  const pathA = findSection("Likely Path A");
  const pathB = findSection("Likely Path B");
  const risk = findSection("Risk Level");
  const move = findSection("Best Next Move");
  const summary = findSection("Scenario Summary");

  if (pathA || pathB || risk || move || summary) {
    return {
      pathA: pathA || "No Path A returned.",
      pathB: pathB || "No Path B returned.",
      risk: risk || "No risk summary returned.",
      move: move || "No next move returned.",
      summary: summary || "No scenario summary returned.",
    };
  }

  return {
    pathA: "AI response received, but it was not structured as expected.",
    pathB: clean,
    risk: "Please try again with a more specific scenario.",
    move: "Refine the input and rerun the simulation.",
    summary: "Raw AI response was not in the expected structured format.",
  };
}

async function fetchSimulationReply(input: string, scenario: Scenario): Promise<string> {
  const systemPrompt = `
You are Shynvo Simulation Lab inside the Experiments environment.

Your role:
- You help users simulate likely outcomes before they act.
- You explore possible consequences, trade-offs, risks, and safer next moves.
- You should think like a strategic scenario simulator, not like a generic chatbot.

Behavior:
- Be realistic, structured, clear, and highly useful.
- Do not be dramatic or vague.
- Do not mention backend systems, APIs, models, or infrastructure.
- Stay fully inside the role of Simulation Lab.

Context:
- Current scenario type: ${scenario}

Output format:
Scenario Summary:
<2-4 sentences summarizing the situation and the core tension>

Likely Path A:
<describe one realistic path if the user proceeds more directly>

Likely Path B:
<describe one realistic alternative path with a different level of intensity, scope, or timing>

Risk Level:
<Low / Moderate / High and explain why clearly>

Best Next Move:
<give the most grounded practical next action, not a motivational slogan>

Rules:
- Tailor the answer directly to the user's exact scenario.
- Avoid generic placeholders.
- Make the answer feel like a real simulation.
- Keep each section concise but meaningful.
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

    return (
      data.answer ||
      data.reply ||
      data.message ||
      raw ||
      "Simulation Lab could not respond right now."
    );
  } catch {
    return raw || "Simulation Lab could not respond right now.";
  }
}

export default function SimulationPage() {
  const [scenario, setScenario] = useState<Scenario>("Academic");
  const [input, setInput] = useState("");
  const [pathA, setPathA] = useState("Waiting for simulation...");
  const [pathB, setPathB] = useState("Waiting for simulation...");
  const [risk, setRisk] = useState("Waiting for simulation...");
  const [move, setMove] = useState("Waiting for simulation...");
  const [summary, setSummary] = useState("Describe a scenario and run the lab.");
  const [loading, setLoading] = useState(false);

  const starterItems = useMemo(() => STARTERS[scenario], [scenario]);

  async function runSimulation(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    if (customText) {
      setInput(customText);
    }

    setLoading(true);
    setSummary("Running simulation...");
    setPathA("Analyzing possible Path A...");
    setPathB("Analyzing possible Path B...");
    setRisk("Analyzing likely risk...");
    setMove("Determining best next move...");

    try {
      const answer = await fetchSimulationReply(text, scenario);
      const parsed = parseSimulationAnswer(answer);

      setSummary(parsed.summary);
      setPathA(parsed.pathA);
      setPathB(parsed.pathB);
      setRisk(parsed.risk);
      setMove(parsed.move);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Simulation Lab could not respond right now.";

      setSummary("Simulation failed.");
      setPathA(message);
      setPathB("Please try again.");
      setRisk("No risk reading returned.");
      setMove("Retry with a clearer scenario.");
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

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
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

        <div className="rounded-3xl border border-cyan-300/15 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white">Simulation Output</div>

          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Scenario Summary</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{summary}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Likely Path A</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{pathA}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Likely Path B</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{pathB}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Risk Level</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{risk}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm font-semibold text-white">Best Next Move</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{move}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
