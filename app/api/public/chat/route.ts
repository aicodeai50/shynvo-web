import { NextResponse } from "next/server";

export const runtime = "nodejs"; // needed for env + fetch in most deployments
export const dynamic = "force-dynamic"; // avoid caching

function jsonError(message: string, status = 500, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export async function POST(req: Request) {
  const BACKEND_URL = (
    process.env.BACKEND_URL ||
    "https://sh-backend-api-production-5b7e.up.railway.app/api/public/chat"
  ).trim();

  const SH_API_KEY = (process.env.SH_API_KEY || "").trim();

  if (!SH_API_KEY) {
    return jsonError("SH_API_KEY missing in environment variables", 500);
  }

  let body: unknown = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  try {
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
        "Content-Type": upstream.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    return jsonError("Proxy error", 500, { details: err?.message || String(err) });
  }
}