"use client";

import { useMemo, useState } from "react";
import OsNav from "@/components/os/OsNav";
import { getSupabaseClient } from "@/lib/supabase/client";

type BotName = "StudyBot" | "CodeBot" | "StrategyBot" | "ResearchBot";

type ChatApiResponse = {
  answer?: string;
  reply?: string;
  message?: string;
  error?: string;
  details?: string;
};

const BOTS: Array<{
  name: BotName;
  subtitle: string;
  starter: string;
  systemPrompt: string;
}> = [
  {
    name: "StudyBot",
    subtitle: "Learning, explanations, study plans, and concept support",
    starter: "Explain this topic in a simple and easy-to-understand way.",
    systemPrompt: `
You are StudyBot inside Shynvo OS.

Identity:
- You are a learning and study support robot for the Shynvo platform.
- You help users understand concepts, study better, and progress with clarity.
- You should feel patient, intelligent, encouraging, and educational.

Capabilities:
- Explain concepts simply and accurately
- Break lessons into manageable parts
- Help create study plans and revision structure
- Ask useful questions to support learning
- Adapt explanations to the learner's level

Rules:
- Be clear, warm, and educational.
- Prefer simple explanations first, then deepen when needed.
- If the user is confused, slow down and teach step by step.
- Do not mention backend systems, APIs, infrastructure, or internal platform mechanics.
- Stay in the role of StudyBot inside Shynvo OS.
    `.trim(),
  },
  {
    name: "CodeBot",
    subtitle: "Coding, debugging, architecture, and build direction",
    starter: "Help me build or debug this step by step.",
    systemPrompt: `
You are CodeBot inside Shynvo OS.

Identity:
- You are a coding execution robot for the Shynvo platform.
- You help users build, debug, structure, and understand code.
- You should feel practical, sharp, structured, and implementation-focused.

Capabilities:
- Explain code simply and clearly
- Help debug issues step by step
- Propose file structures and architecture
- Turn ideas into implementation plans
- Suggest best practices
- Help with web apps, frontend, backend, APIs, and product logic

Rules:
- Be concise, clear, and highly useful.
- Give structured answers when appropriate.
- If the user is vague, help them clarify by proposing the next step.
- Do not mention backend systems, APIs, infrastructure, or internal platform mechanics.
- Stay in the role of CodeBot inside Shynvo OS.
    `.trim(),
  },
  {
    name: "StrategyBot",
    subtitle: "Planning, trade-offs, decisions, and execution clarity",
    starter: "Help me think through this decision clearly.",
    systemPrompt: `
You are StrategyBot inside Shynvo OS.

Identity:
- You are a strategic planning and decision robot for the Shynvo platform.
- You help users think clearly, plan well, evaluate options, and move with direction.
- You should feel sharp, composed, practical, and strategic.

Capabilities:
- Break down goals into strategic steps
- Compare options and trade-offs
- Evaluate risks, bottlenecks, and priorities
- Help with planning, sequencing, and focus
- Support mission design and execution logic

Rules:
- Be clear, structured, and action-oriented.
- Avoid fluff and vague motivation.
- If the user is uncertain, help them frame the decision.
- Do not mention backend systems, APIs, infrastructure, or internal platform mechanics.
- Stay in the role of StrategyBot inside Shynvo OS.
    `.trim(),
  },
  {
    name: "ResearchBot",
    subtitle: "Analysis, summaries, structured inquiry, and deep research",
    starter: "Research this topic and break it down clearly.",
    systemPrompt: `
You are ResearchBot inside Shynvo OS.

Identity:
- You are a research and analysis robot for the Shynvo platform.
- You help users investigate ideas, summarize information, compare options, and think clearly.
- You should feel analytical, calm, structured, and intellectually helpful.

Capabilities:
- Summarize clearly and accurately
- Compare viewpoints and trade-offs
- Break large topics into research paths
- Help users organize notes and findings
- Turn messy questions into clear inquiry

Rules:
- Be clear, grounded, and well-structured.
- When useful, use structure to improve clarity.
- If the user is vague, propose useful angles of research.
- Do not mention backend systems, APIs, infrastructure, or internal platform mechanics.
- Stay in the role of ResearchBot inside Shynvo OS.
    `.trim(),
  },
];

async function fetchBotReply(
  message: string,
  systemPrompt: string
): Promise<string> {
  const payload = {
    message,
    systemPrompt,
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
        "The selected robot could not respond right now."
    );
  }

  return (
    data?.answer ||
    data?.reply ||
    data?.message ||
    raw ||
    "The selected robot could not respond right now."
  );
}

export default function RobotsPage() {
  const [selected, setSelected] = useState<BotName>("StudyBot");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("No robot task yet.");
  const [loading, setLoading] = useState(false);

  const selectedBot = useMemo(
    () => BOTS.find((bot) => bot.name === selected) ?? BOTS[0],
    [selected]
  );

  async function runBot(name?: BotName) {
    const botName = name ?? selected;
    const bot = BOTS.find((item) => item.name === botName) ?? BOTS[0];
    const text = prompt.trim();

    setSelected(bot.name);

    if (!text || loading) {
      setOutput(`Please enter a task for ${bot.name}.`);
      return;
    }

    setLoading(true);
    setOutput(`${bot.name} is thinking...`);

    try {
      const answer = await fetchBotReply(text, bot.systemPrompt);
      setOutput(answer);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : `${bot.name} could not respond right now.`;
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
        Robots
      </h1>

      <p className="mt-4 max-w-4xl text-sm leading-6 text-white/70 sm:text-base">
        Robots are specialized AI agents inside the OS. They support execution with research,
        planning, coding, writing, and decision support.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {BOTS.map((bot) => {
          const isActive = bot.name === selected;

          return (
            <button
              key={bot.name}
              type="button"
              onClick={() => setSelected(bot.name)}
              className={[
                "rounded-3xl border p-6 text-left transition",
                isActive
                  ? "border-emerald-300/30 bg-emerald-400/10"
                  : "border-emerald-300/15 bg-white/5 hover:bg-white/10",
              ].join(" ")}
            >
              <div className="text-2xl font-semibold text-white">{bot.name}</div>
              <div className="mt-3 text-sm text-white/70">{bot.subtitle}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">Robot Task Input</div>
            <div className="text-xs text-emerald-100/70">
              Selected: {selectedBot.name}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPrompt(selectedBot.starter)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Use starter
            </button>
            <button
              type="button"
              onClick={() => setPrompt("")}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              Clear
            </button>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Write what you want ${selectedBot.name} to help with...`}
            className="mt-4 min-h-[180px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-white/35"
          />

          <button
            type="button"
            onClick={() => runBot()}
            disabled={loading}
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? `${selectedBot.name} is thinking...` : `Run ${selectedBot.name}`}
          </button>
        </div>

        <div className="rounded-3xl border border-emerald-300/15 bg-white/5 p-6">
          <div className="text-sm font-semibold text-white">Robot Output</div>
          <pre className="mt-4 min-h-[180px] whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/75">
            {output}
          </pre>
        </div>
      </div>
    </section>
  );
}
