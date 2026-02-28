import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_BACKEND =
  "https://sh-backend-api-production-5b7e.up.railway.app/api/public/chat";

export function GET() {
  return NextResponse.json({ ok: true, route: "/api/public/chat", method: "GET" });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const backendUrl = (process.env.BACKEND_URL || DEFAULT_BACKEND).trim();
  const SH_API_KEY = (process.env.SH_API_KEY || "").trim();
  const hasKey = Boolean(SH_API_KEY);

  if (!hasKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "SH_API_KEY missing on Vercel",
        backendUrl,
        receivedBody: body,
      },
      { status: 500 }
    );
  }

  const upstream = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-sh-api-key": SH_API_KEY,
    },
    body: JSON.stringify(body),
  });

  const text = await upstream.text();

  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "application/json",
      "Cache-Control": "no-store",
    },
  });
}
