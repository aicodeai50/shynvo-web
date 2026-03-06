import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const input = String(text || "").trim();
    if (!input) return new Response("Missing text", { status: 400 });

    // OpenAI TTS
    const audio = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "verse",
      input,
      format: "mp3",
    });

    const buf = Buffer.from(await audio.arrayBuffer());
    return new Response(buf, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("TTS error", { status: 500 });
  }
}
