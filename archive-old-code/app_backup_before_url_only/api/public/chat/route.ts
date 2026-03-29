import { NextRequest, NextResponse } from "next/server";
import { checkAiAccess, recordAiUsage } from "@/api/_utils/aiAccess";

const DEFAULT_PATHS = [
  "/api/public/chat",
  "/public/chat",
  "/api/chat",
  "/chat",
];

export async function POST(req: NextRequest) {
  try {
    const access = await checkAiAccess(req);

    if (!access.ok) {
      return NextResponse.json(
        { error: access.message },
        { status: access.status }
      );
    }

    const body = await req.json();

    const baseUrl =
      process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.RAILWAY_API_BASE_URL ||
      "";

    if (!baseUrl) {
      return NextResponse.json(
        { error: "Missing backend URL." },
        { status: 500 }
      );
    }

    const cleanBase = baseUrl.replace(/\/+$/, "");
    const apiKey =
      process.env.SH_API_KEY ||
      process.env.NEXT_PUBLIC_SH_API_KEY ||
      "";
    const customPath = process.env.BACKEND_CHAT_PATH || "";
    const candidatePaths = customPath
      ? [customPath.startsWith("/") ? customPath : `/${customPath}`, ...DEFAULT_PATHS]
      : DEFAULT_PATHS;

    let lastStatus = 500;
    let lastText = "Endpoint not found";

    for (const path of candidatePaths) {
      try {
        const res = await fetch(`${cleanBase}${path}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            ...(apiKey ? { "x-sh-api-key": apiKey } : {}),
          },
          body: JSON.stringify(body),
          cache: "no-store",
        });

        const text = await res.text();
        lastStatus = res.status;
        lastText = text;

        if (res.ok) {
          await recordAiUsage(access);

          return new NextResponse(text, {
            status: res.status,
            headers: {
              "content-type": res.headers.get("content-type") || "application/json",
            },
          });
        }
      } catch (err) {
        lastStatus = 500;
        lastText = err instanceof Error ? err.message : "Backend request failed";
      }
    }

    return NextResponse.json(
      {
        error: "Backend chat endpoint not found or failed.",
        details: lastText,
      },
      { status: lastStatus || 500 }
    );
  } catch (error) {
    console.error("Proxy /api/public/chat error:", error);
    return NextResponse.json(
      { error: "Failed to reach backend chat service." },
      { status: 500 }
    );
  }
}
