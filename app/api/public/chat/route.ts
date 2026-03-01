import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const base = process.env.RAILWAY_API_BASE_URL;

    if (!base) {
      return NextResponse.json(
        { error: "Missing RAILWAY_API_BASE_URL on server (Vercel env var)" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const url = `${base.replace(/\/$/, "")}/api/public/chat`;

    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Optional: forward auth if you ever add it later
        ...(req.headers.get("authorization")
          ? { Authorization: req.headers.get("authorization") as string }
          : {}),
      },
      body: JSON.stringify(body),
      // Avoid caching issues
      cache: "no-store",
    });

    const contentType =
      upstream.headers.get("Content-Type") ?? "application/json";
    const text = await upstream.text();

    // If Railway errors, return its message + status to browser
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": contentType },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Proxy crashed in Vercel route",
        message: String(err?.message ?? err),
      },
      { status: 500 }
    );
  }
}