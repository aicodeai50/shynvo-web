export type FrontierEngineRequest = {
  workspace: "coding" | "algorithms" | "ai-bots" | "puzzles";
  title: string;
  mode?: string;
  tone?: string;
  focus?: string[];
  userInput: string;
};

type FrontierStructuredOutput = {
  summary: string;
  meaning: string;
  nextAction: string;
  why: string[];
  deliverables: string[];
  risk: string;
  encouragement: string;
};

function clean(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function finalFallback(reason: string): FrontierStructuredOutput {
  return {
    summary: "Frontier generated a response, but it was not returned in the structured format this workspace expects.",
    meaning: "The AI connection is active, but the output needs formatting alignment before it can fully drive every panel section.",
    nextAction: "Try again with a shorter and more specific request.",
    why: [
      "The workspace stayed stable.",
      "The live AI route responded.",
      "Only the response structure needs refinement.",
    ],
    deliverables: [
      "A stable workspace state",
      "A safe fallback response",
      "A recoverable live AI path",
    ],
    risk: reason,
    encouragement:
      "The live engine is connected. The remaining work is improving structure, not rebuilding Frontier.",
  };
}

function buildSystemPrompt(req: FrontierEngineRequest) {
  const workspaceInstruction =
    req.workspace === "coding"
      ? "You are Shynvo Frontier AI inside Coding Arena. Focus on implementation, scope, stack, milestones, and execution clarity."
      : req.workspace === "algorithms"
      ? "You are Shynvo Frontier AI inside Algorithm Challenges. Focus on reasoning structure, constraints, problem framing, and solving logic."
      : req.workspace === "ai-bots"
      ? "You are Shynvo Frontier AI inside AI Bot Lab. Focus on AI behavior design, prompt quality, mode differences, tone effects, and response strategy."
      : "You are Shynvo Frontier AI inside Logic Puzzles. Focus on reasoning training, constraint awareness, and solving discipline.";

  return `
${workspaceInstruction}

You are not ChatGPT and you are not a generic assistant.
You are the Frontier intelligence layer inside Shynvo.

Respond as VALID JSON ONLY.
Do not include markdown.
Do not include code fences.
Do not include any text before or after the JSON.

Return exactly this shape:
{
  "summary": "2 to 3 professional sentences, specific to the user's selected workspace, mode, tone, and request",
  "meaning": "Explain what the current selection means in this workspace and why it changes the AI behavior",
  "nextAction": "One concrete next step the user should take now",
  "why": [
    "Reason 1",
    "Reason 2",
    "Reason 3"
  ],
  "deliverables": [
    "Expected result 1",
    "Expected result 2",
    "Expected result 3"
  ],
  "risk": "One realistic caution",
  "encouragement": "One concise, confident encouragement"
}

Rules:
- be professional, sharp, and product-grade
- do not sound repetitive
- avoid filler
- tailor every field to the exact selected title, mode, tone, focus, and user input
- make the output feel like a real Shynvo AI workspace
`;
}

function buildUserPrompt(req: FrontierEngineRequest) {
  return JSON.stringify(
    {
      workspace: req.workspace,
      selectedTitle: req.title,
      selectedMode: req.mode || "",
      selectedTone: req.tone || "",
      selectedFocus: req.focus || [],
      userInput: req.userInput,
    },
    null,
    2
  );
}

function tryParseStructured(raw: string): FrontierStructuredOutput | null {
  const text = raw.trim();

  const candidates = [text];

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    candidates.push(text.slice(firstBrace, lastBrace + 1));
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);

      if (
        typeof parsed?.summary === "string" &&
        typeof parsed?.meaning === "string" &&
        typeof parsed?.nextAction === "string" &&
        Array.isArray(parsed?.why) &&
        Array.isArray(parsed?.deliverables) &&
        typeof parsed?.risk === "string" &&
        typeof parsed?.encouragement === "string"
      ) {
        return {
          summary: clean(parsed.summary),
          meaning: clean(parsed.meaning),
          nextAction: clean(parsed.nextAction),
          why: parsed.why.map((x: string) => clean(String(x))).slice(0, 3),
          deliverables: parsed.deliverables
            .map((x: string) => clean(String(x)))
            .slice(0, 3),
          risk: clean(parsed.risk),
          encouragement: clean(parsed.encouragement),
        };
      }
    } catch {
      // keep trying
    }
  }

  return null;
}

export async function runFrontierLiveEngine(
  req: FrontierEngineRequest
): Promise<FrontierStructuredOutput> {
  try {
    const message = `${buildSystemPrompt(req)}\n\nUser context:\n${buildUserPrompt(req)}`;

    const res = await fetch("/api/test-ai", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
      body: JSON.stringify({
        message,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      return finalFallback(`/api/test-ai -> ${res.status}: ${text || "request failed"}`);
    }

    let data: any = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { reply: text };
    }

    const raw =
      data?.reply ||
      data?.text ||
      data?.message ||
      data?.output ||
      data?.content ||
      text ||
      "";

    if (!String(raw).trim()) {
      return finalFallback("The connected AI route returned empty content.");
    }

    const structured = tryParseStructured(String(raw));
    if (structured) return structured;

    return finalFallback(`Unstructured AI output: ${String(raw).slice(0, 220)}`);
  } catch (error) {
    return finalFallback(
      error instanceof Error ? error.message : "Unknown Frontier live AI error."
    );
  }
}
