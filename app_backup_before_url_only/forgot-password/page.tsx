"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseClient();

    if (!supabase) {
      setOk(false);
      setMessage("Authentication is not available right now.");
      return;
    }

    setLoading(true);
    setMessage("");
    setOk(false);

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
    });

    if (error) {
      setOk(false);
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setOk(true);
    setMessage("Password reset link sent. Check your email.");
    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-xl py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Account recovery
        </div>
        <h1 className="mt-2 text-3xl font-semibold text-white">Forgot password</h1>
        <p className="mt-3 text-sm leading-6 text-white/70">
          Enter your email and we will send you a secure password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-white">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {message ? (
          <div
            className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
              ok
                ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                : "border-red-400/20 bg-red-400/10 text-red-100"
            }`}
          >
            {message}
          </div>
        ) : null}

        <div className="mt-5 text-sm text-white/65">
          Remembered it?{" "}
          <Link href="/sign-in" className="font-semibold text-white hover:text-white/80">
            Back to sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
