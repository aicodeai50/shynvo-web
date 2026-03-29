export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body?.message ?? "").trim();

    if (!message) {
      return Response.json({ reply: "Please enter a message." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { reply: "Missing OPENAI_API_KEY. Add it in Vercel → Project → Settings → Environment Variables." },
        { status: 200 }
      );
    }

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are Shynvo Search. Be helpful, accurate, and concise." },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    if (!r.ok) {
      const err = await r.text();
      return Response.json({ reply: `OpenAI error: ${r.status}\n${err}` }, { status: 200 });
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content ?? "No reply.";

    return Response.json({ reply });
  } catch (e: any) {
    return Response.json({ reply: `Server error: ${e?.message ?? "unknown"}` }, { status: 200 });
  }
}