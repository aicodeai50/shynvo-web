"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!email.trim()) return setErr("Email is required");
    if (password.length < 8) return setErr("Password must be at least 8 characters");

    setLoading(true);
    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name: name || undefined }),
      });
      router.push("/dashboard");
    } catch (e: any) {
      setErr(e?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/30 p-6 md:p-8">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-white/70 mt-1">
          Use your email and choose any password (min 8 chars).
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-white/70">Name (optional)</label>
            <input
              className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sandra"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Email</label>
            <input
              className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hi@shynvo.app"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="text-sm text-white/70">Password</label>
            <input
              className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>

          {err && (
            <div className="text-sm text-red-400 border border-red-500/30 bg-red-500/10 rounded-xl p-3">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white text-black font-semibold py-2.5 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-white/70 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="underline text-white">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}