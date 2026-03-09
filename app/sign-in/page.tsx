"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Signed in successfully.");
    setLoading(false);
    router.push("/");
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(56,189,248,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_82%_18%,rgba(16,185,129,0.08),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-xl">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
          Account
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Sign in
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
          Enter your account and continue into Shynvo.
        </p>

        <form
          onSubmit={handleSignIn}
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <div className="space-y-4">
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
                placeholder="Your password"
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
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {message ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85">
              {message}
            </div>
          ) : null}

          <div className="mt-5 text-sm text-white/65">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-white underline underline-offset-4">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
