"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";

function readHashParams() {
  if (typeof window === "undefined") return new URLSearchParams();
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  return new URLSearchParams(hash);
}

export default function AuthCallbackClient() {
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

      const next = searchParams.get("next") || "/account";
      const code = searchParams.get("code") || "";
      const tokenHash = searchParams.get("token_hash") || "";
      const type = searchParams.get("type") || "";

      const hashParams = readHashParams();
      const accessToken = hashParams.get("access_token") || "";
      const refreshToken = hashParams.get("refresh_token") || "";
      const hashType = hashParams.get("type") || "";

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          if (active) setMessage(error.message);
          return;
        }

        router.replace(next);
        return;
      }

      if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type as
            | "signup"
            | "invite"
            | "magiclink"
            | "recovery"
            | "email_change"
            | "email",
        });

        if (error) {
          if (active) setMessage(error.message);
          return;
        }

        router.replace(next);
        return;
      }

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          if (active) setMessage(error.message);
          return;
        }

        if (typeof window !== "undefined" && window.location.hash) {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname + window.location.search
          );
        }

        router.replace(next);
        return;
      }

      if (active) {
        setMessage(
          hashType === "signup"
            ? "Could not complete email verification. Please open the newest confirmation email again."
            : "Verification link is invalid or incomplete. Please request a new confirmation email."
        );
      }
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
