import { NextRequest, NextResponse } from "next/server";
import { recordAiUsage } from "@/api/_utils/aiAccess";

export const runtime = "nodejs";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name}`);
  return v;
}

export async function POST(req: NextRequest) {
  try {
    const base = mustEnv("NEXT_PUBLIC_API_URL");
    const key = mustEnv("SH_API_KEY");
    const body = await req.json();

    const res = await fetch(`${base.replace(/\/$/, "")}/api/robot-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sh-key": key,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      try {
        await recordAiUsage({
          ok: true,
          userId: "frontier-public",
          plan: "frontier",
          remaining: null,
        } as any);
      } catch {
        // ignore usage-recording issues so Frontier never breaks
      }
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "robot-chat proxy failed" },
      { status: 500 }
    );
  }
}
