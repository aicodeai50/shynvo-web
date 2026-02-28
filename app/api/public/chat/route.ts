import { NextResponse } from "next/server";

const DEFAULT_BACKEND =
  "https://sh-backend-api-production-5b7e.up.railway.app/api/public/chat";

export async function POST(req: Request) {
  try {
    const BACKEND_URL = (process.env.BACKEND_URL || DEFAULT_BACKEND).trim();
    const SH_API_KEY = (process.env.SH_API_KEY || "").trim();

    if (!SH_API_KEY) {
      return NextResponse.json(
        { error: "SH_API_KEY missing on Vercel (server env)" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const upstream = await fetch(BACKEND_URL, {
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
        "Content-Type":
          upstream.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Proxy error", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}