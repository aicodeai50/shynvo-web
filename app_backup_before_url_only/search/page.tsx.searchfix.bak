"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type SearchResponse = {
  answer?: string;
  reply?: string;
  message?: string;
  error?: string;
  details?: string;
};

export default function SearchPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setResult(t("search.prompt"));
    }
  }, [t, loading]);

  async function runSearch() {
    const text = query.trim();
    if (!text || loading) return;

    setLoading(true);
    setResult(t("search.searching"));

    try {
      const supabase = getSupabaseClient();
      const session = supabase ? await supabase.auth.getSession() : { data: { session: null } };
      const token = session.data.session?.access_token || "";

      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          message: text,
          query: text,
        }),
      });

      const raw = await res.text();

      let data: SearchResponse | null = null;
      try {
        data = JSON.parse(raw);
      } catch {
        data = null;
      }

      if (!res.ok) {
        setResult(data?.error || data?.details || raw || t("search.failed"));
        return;
      }

      setResult(data?.answer || data?.reply || data?.message || raw || t("search.noResult"));
    } catch (error) {
      setResult(error instanceof Error ? error.message : t("search.failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_10%,rgba(59,130,246,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_560px_at_82%_18%,rgba(16,185,129,0.08),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          {t("search.label")}
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          {t("search.title")}
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
          {t("search.prompt")}
        </p>

        <div className="mt-8 flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
            placeholder={t("search.placeholder")}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none placeholder:text-white/45"
          />
          <button
            type="button"
            onClick={runSearch}
            disabled={loading || !query.trim()}
            className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-[#0B0F14] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t("common.loading") : t("search.button")}
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-7 text-white/85">
          {result}
        </div>
      </div>
    </section>
  );
}
