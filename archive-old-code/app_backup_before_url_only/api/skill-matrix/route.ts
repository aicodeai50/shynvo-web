import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getBaseUrl() {
  const base =
    process.env.RAILWAY_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.BACKEND_URL;

  if (!base) {
    throw new Error(
      "Missing backend base URL. Set RAILWAY_API_BASE_URL (recommended) or NEXT_PUBLIC_BACKEND_URL."
    );
  }

  return base.replace(/\/+$/, "");
}

function getKey() {
  return (
    process.env.SH_API_KEY ||
    process.env.BACKEND_API_KEY ||
    process.env.X_API_KEY ||
    ""
  );
}

function authHeaders() {
  const key = getKey();
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (key) {
    headers["x-sh-api-key"] = key;
    headers["x-api-key"] = key;
    headers["Authorization"] = `Bearer ${key}`;
  }

  return headers;
}

export async function GET() {
  try {
    const base = getBaseUrl();

    const upstream = await fetch(`${base}/api/skill-matrix`, {
      method: "GET",
      headers: authHeaders(),
      cache: "no-store",
    });

    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Skill-matrix proxy failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const base = getBaseUrl();
    const body = await req.json().catch(() => ({}));

    const upstream = await fetch(`${base}/api/skill-matrix`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Skill-matrix proxy failed" },
      { status: 500 }
    );
  }
}
