import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const language = String(body?.language || "").trim();

    if (!language) {
      return NextResponse.json({ ok: false, error: "Missing language" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({ ok: true, saved: false });
    }

    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return NextResponse.json({ ok: true, saved: false });
    }

    const {
      data: { user },
    } = await admin.auth.getUser(token);

    if (!user) {
      return NextResponse.json({ ok: true, saved: false });
    }

    await admin
      .from("profiles")
      .update({
        language,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    return NextResponse.json({ ok: true, saved: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not save language" }, { status: 500 });
  }
}
