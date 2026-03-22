"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      setOk(false);
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setOk(false);
      setMessage("Passwords do not match.");
      return;
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      setOk(false);
      setMessage("Authentication is not available right now.");
      return;
    }

    setLoading(true);
    setMessage("");
    setOk(false);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setOk(false);
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setOk(true);
    setMessage("Password updated successfully. You can now sign in.");
    setPassword("");
    setConfirm("");
    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-xl py-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Account recovery
        </div>
        <h1 className="mt-2 text-3xl font-semibold text-white">Create new password</h1>
        <p className="mt-3 text-sm leading-6 text-white/70">
          Open this page from your email reset link and choose a new password.
        </p>

        {!ready ? (
          <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-100">
            Open this page from the password reset link sent to your email.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-white">New password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white">Confirm password</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
                placeholder="Repeat password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90 disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        )}

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
          <Link href="/sign-in" className="font-semibold text-white hover:text-white/80">
            Back to sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
