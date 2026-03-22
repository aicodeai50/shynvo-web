"use client";

import { useMemo, useState } from "react";
import OsNav from "@/components/os/OsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

type ChatApiResponse = {
  answer?: string;
  reply?: string;
  message?: string;
  error?: string;
  details?: string;
};

const EXAMPLES = [
  "Should I focus on exams first or product work first?",
  "I feel overwhelmed and mentally scattered. Help me think clearly about what to do next.",
  "Should I continue this project direction or simplify the platform first?",
  "Help me think through a difficult personal decision with calm and balance.",
];

const COUNCIL_SYSTEM_PROMPT = `
You are AI Council inside Shynvo OS.

Identity:
- You are the council chamber of Shynvo OS.
- You help users think through decisions, uncertainty, emotional overwhelm, personal tension, academic pressure, strategic questions, and life direction.
- You should feel calm, wise, balanced, emotionally intelligent, structured, and deeply helpful.

Core behavior:
- Respond like a real council, not like a generic chatbot.
- Give thoughtful, multi-perspective guidance.
- Help users slow down, see clearly, and move wisely.
- When useful, organize reasoning into perspectives such as:
  - present reality
  - emotional truth
  - practical constraints
  - long-term consequences
  - wisest next step
- Be warm, steady, and respectful.
- Be supportive when the user is distressed, overwhelmed, anxious, or emotionally burdened.
- Help the user regain clarity, calm, and direction.

Important rules:
- Do not be dramatic.
- Do not sound robotic.
- Do not mention backend systems, APIs, infrastructure, or internal platform mechanics.
- Stay in the role of AI Council inside Shynvo OS.
- Do not present yourself as a licensed therapist, doctor, lawyer, or emergency service.
- If a user appears in immediate danger or at risk of self-harm, strongly encourage contacting local emergency services or a trusted real person immediately.
- Otherwise, remain supportive, thoughtful, and action-oriented.

Response style:
- Start with a clear understanding of the user's situation.
- Offer balanced reasoning, not just one-sided advice.
- End with a grounded recommended next step.
- Prefer clarity, calmness, and wisdom over long unnecessary text.
`.trim();

async function fetchCouncilReply(message: string): Promise<string> {
  const payload = {
    message,
    systemPrompt: COUNCIL_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: message,
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

  let data: ChatApiResponse | null = null;
  try {
    data = JSON.parse(raw) as ChatApiResponse;
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(
      data?.error ||
        data?.details ||
        raw ||
        "AI Council could not respond right now."
    );
  }

  return (
    data?.answer ||
    data?.reply ||
    data?.message ||
    raw ||
    "AI Council could not respond right now."
  );
}

export default function CouncilPage() {
  const [decision, setDecision] = useState("");
  const [output, setOutput] = useState(
    "No council reasoning yet. Write a decision, problem, conflict, or emotional burden, and the council will help you think clearly."
  );
  const [loading, setLoading] = useState(false);

  const councilFunction = useMemo(
    () =>
      "AI Council is the reflection and decision chamber of Shynvo OS. It helps you think through difficult choices, emotional pressure, academic tension, project uncertainty, and strategic direction with calm, multi-perspective reasoning.",
    []
  );

  async function analyzeDecision(example?: string) {
    const text = (example ?? decision).trim();
    if (!text || loading) return;

    if (example) {
      setDecision(example);
    }

    setLoading(true);
    setOutput("AI Council is thinking...");

    try {
      const answer = await fetchCouncilReply(text);
      setOutput(answer);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "AI Council could not respond right now.";
      setOutput(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 sm:py-14">
      <OsNav />

      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-100/70">
        Shynvo OS
      </div>

      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">
        AI Council
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        {councilFunction}
      </p>

      <div className="mt-6 rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
        <div className="text-sm font-semibold text-white">What this chamber does</div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Helps with decisions, uncertainty, overwhelm, inner conflict, priorities, and strategic direction.
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
            Responds with balanced reasoning, emotional intelligence, and a grounded next step instead of shallow output.
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Council Input</div>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Describe the decision, emotional tension, confusion, or situation you want the council to evaluate.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => analyzeDecision(item)}
                disabled={loading}
                className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-left text-sm text-white/80 transition hover:bg-white/10 disabled:opacity-50"
              >
                {item}
              </button>
            ))}
          </div>

          <textarea
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            placeholder="Write your decision question or what you are going through..."
            className="mt-4 min-h-[220px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => analyzeDecision()}
              disabled={loading || !decision.trim()}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:opacity-50"
            >
              {loading ? "Council is thinking..." : "Open Council Reasoning"}
            </button>

            <button
              type="button"
              onClick={() => {
                setDecision("");
                setOutput(
                  "No council reasoning yet. Write a decision, problem, conflict, or emotional burden, and the council will help you think clearly."
                );
              }}
              disabled={loading}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-xl font-semibold text-white">Council Output</div>
          <pre className="mt-4 min-h-[220px] whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
            {output}
          </pre>
        </div>
      </div>
    </section>
  );
}
