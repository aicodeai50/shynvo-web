"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError(res.error || "Signup failed");
        return;
      }

      router.push("/dashboard");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#05070A] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-xs tracking-[0.22em] text-white/50">SHYNVO</div>
        <h1 className="mt-2 text-2xl font-semibold">Start your 7-day trial</h1>
        <p className="mt-1 text-sm text-white/60">
          Create an account. Upgrade after trial ends to keep using Shynvo.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-white/20"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-white/20"
            placeholder="Password (min 8 chars)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          {error ? <div className="text-sm text-red-400">{error}</div> : null}

          <button
            disabled={busy}
            className="w-full rounded-xl bg-white text-black py-3 font-medium hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-5 text-sm text-white/60">
          Already have an account?{" "}
          <Link className="text-white underline underline-offset-4" href="/login">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
