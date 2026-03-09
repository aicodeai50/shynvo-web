"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Account created. Check your email if confirmation is enabled.");
    setLoading(false);
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_82%_18%,rgba(59,130,246,0.08),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-xl">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/70">
          Account
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Create account
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
          Start your Shynvo account and continue into the platform.
        </p>

        <form
          onSubmit={handleSignUp}
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-white">Full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0B0F14] hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          {message ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85">
              {message}
            </div>
          ) : null}

          <div className="mt-5 text-sm text-white/65">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-white underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
