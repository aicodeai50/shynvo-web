import OSBotRoom from "@/components/os/OSBotRoom";

const STARTERS = [
  "Explain this topic in a simple way.",
  "Help me create a study plan for this subject.",
  "Quiz me on this concept step by step.",
  "Break this lesson into something easier to understand.",
];

const CAPABILITIES = [
  "Explaining difficult concepts in simpler language",
  "Helping students plan study sessions and revision flow",
  "Supporting active recall, review, and practice",
  "Turning confusion into structured understanding",
  "Helping learners move with clarity and confidence",
];

const SYSTEM_PROMPT = `
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
`.trim();

export default function Page() {
  return (
    <OSBotRoom
      name="StudyBot"
      badge="AI learning mode"
      description="Your academic execution robot for explanations, study planning, concept breakdowns, and learning support."
      placeholder="Ask StudyBot to explain or help you study..."
      systemPrompt={SYSTEM_PROMPT}
      starters={STARTERS}
      capabilities={CAPABILITIES}
      accentClassName="text-amber-100 border-amber-300/20 bg-amber-400/10"
    />
  );
}
