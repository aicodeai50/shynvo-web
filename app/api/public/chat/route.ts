import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const base = process.env.RAILWAY_API_BASE_URL?.replace(/\/$/, "");
  const key = process.env.SH_API_KEY; // must exist in Vercel env

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

      // ✅ send key to Railway (choose 1 your backend expects)
      "x-sh-api-key": key,

      // Optional compatibility (won’t hurt)
      "x-api-key": key,
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await upstream.text();

  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "application/json" },
  });
}