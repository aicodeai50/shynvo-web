import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const base = process.env.RAILWAY_API_BASE_URL;
  const key = process.env.SH_API_KEY;

  if (!base) {
    return NextResponse.json({ error: "Missing RAILWAY_API_BASE_URL" }, { status: 500 });
  }
  if (!key) {
    return NextResponse.json({ error: "Missing SH_API_KEY" }, { status: 500 });
  }

  const body = await req.json();

  const upstream = await fetch(`${base}/api/public/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Try common key headers (backend can accept any of these)
      "x-sh-api-key": key,
      "x-api-key": key,
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  // Always return JSON to the browser
  const text = await upstream.text();
  const contentType = upstream.headers.get("Content-Type") ?? "application/json";

  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": contentType },
  });
}
