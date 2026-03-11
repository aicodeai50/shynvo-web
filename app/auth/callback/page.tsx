"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Completing account verification...");

  useEffect(() => {
    let active = true;

    async function completeAuth() {
      const supabase = getSupabaseClient();

      if (!supabase) {
        if (active) setMessage("Supabase is not configured.");
        return;
      }

      const code = searchParams.get("code");
      const next = searchParams.get("next") || "/account";

      if (!code) {
        if (active) setMessage("Missing verification code.");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        if (active) setMessage(error.message);
        return;
      }

      router.replace(next);
    }

    completeAuth();

    return () => {
      active = false;
    };
  }, [router, searchParams]);

  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm">
        <div className="text-sm text-white/85">{message}</div>
      </div>
    </section>
  );
}
