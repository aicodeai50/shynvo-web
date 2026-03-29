import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const base = process.env.SH_BACKEND_URL;
    const key = process.env.SH_API_KEY;

    if (!base) {
      return NextResponse.json(
        { ok: false, error: "Missing SH_BACKEND_URL" },
        { status: 500 }
      );
    }

    const res = await fetch(`${base.replace(/\/$/, "")}/health`, {
      method: "GET",
      headers: key ? { "x-sh-key": key } : {},
      cache: "no-store",
    });

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        "content-type": res.headers.get("content-type") || "text/plain",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || "Ping proxy failed" },
      { status: 500 }
    );
  }
}
