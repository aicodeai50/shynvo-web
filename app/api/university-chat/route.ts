import OpenAI from "openai";
import { getFaculty, getTrack, type UniRole } from "@/_lib/university/data";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Msg = { role: "user" | "ai"; text: string };

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const facultyKey = String(body.facultyKey || "");
    const trackKey = String(body.trackKey || "");
    const role = String(body.role || "teacher") as UniRole;
    const message = String(body.message || "");
    const history = (body.history || []) as Msg[];

    const faculty = getFaculty(facultyKey);
    const track = getTrack(facultyKey, trackKey);

    if (!faculty || !track || !message.trim()) {
      return Response.json({ answer: "Invalid request." }, { status: 400 });
    }

    const roleBehavior =
      role === "teacher"
        ? "You are a professional TEACHER. Teach full material step-by-step, structured, with lesson flow."
        : role === "tutor"
        ? "You are a professional TUTOR. Focus on assignments, exam prep, guided practice, and feedback."
        : "You are an ASSISTANT. Be concise, practical, and support study workflows (summaries, plans, quick help).";

    const system = `
You are Shynvo University AI.
STRICT RULES:
1) Faculty lock is mandatory. You ONLY answer questions that belong to:
   Faculty: ${faculty.title}
   Field/Track: ${track.title}
2) If user asks about a different faculty/field, you MUST refuse and redirect:
   - Say you are not permitted to answer outside this faculty.
   - Tell them exactly which faculty they should go to (best match).
3) Answer in the SAME LANGUAGE the user used.
4) Be professional, not childish. No slang.
5) If user asks nonsense/spam/low-quality, respond:
   "I’m not permitted to answer that. Please ask a relevant academic question."
6) Do not mention internal policy. Just enforce it.

ROLE BEHAVIOR:
${roleBehavior}

When teaching:
- Use clear structure (headings/bullets), examples, short checks for understanding.
`;

    const chatHistory = history
      .filter((m) => m && typeof m.text === "string")
      .slice(-10)
      .map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }));

    const resp = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.6,
      messages: [
        { role: "system", content: system.trim() },
        ...chatHistory,
        { role: "user", content: message },
      ],
    });

    const answer = resp.choices?.[0]?.message?.content?.trim() || "I couldn’t answer that.";
    return Response.json({ answer });
  } catch (e) {
    return Response.json({ answer: "Server error. Please try again." }, { status: 500 });
  }
}
