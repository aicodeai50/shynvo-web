"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

type Profile = {
  email?: string;
  full_name?: string;
  language?: string;
  plan?: string;
  trial_started_at?: string;
  trial_ends_at?: string;
};

type Usage = {
  usage_count?: number;
};

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const supabase = getSupabaseClient();

      if (!supabase) {
        if (mounted) {
          setMessage("Supabase is not configured.");
          setLoading(false);
        }
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        if (mounted) {
          setMessage("You are not signed in.");
          setLoading(false);
        }
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("email, full_name, language, plan, trial_started_at, trial_ends_at")
        .eq("id", user.id)
        .single();

      const today = new Date().toISOString().slice(0, 10);
      const { data: usageData } = await supabase
        .from("daily_ai_usage")
        .select("usage_count")
        .eq("user_id", user.id)
        .eq("usage_date", today)
        .single();

      if (mounted) {
        if (profileError) {
          setMessage(profileError.message);
        } else {
          setProfile(profileData);
          setUsage(usageData || { usage_count: 0 });
        }
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const trialActive =
    profile?.trial_ends_at ? new Date(profile.trial_ends_at).getTime() > Date.now() : false;

  const remaining = Math.max(0, 5 - Number(usage?.usage_count || 0));

  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Account
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Your account
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
          Trial, plan, and AI access details for your Shynvo account.
        </p>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {loading ? (
            <div className="text-white/75">Loading account...</div>
          ) : message ? (
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {message}
            </div>
          ) : profile ? (
            <div className="space-y-4 text-sm text-white/85">
              <div><span className="font-semibold text-white">Email:</span> {profile.email || "-"}</div>
              <div><span className="font-semibold text-white">Name:</span> {profile.full_name || "-"}</div>
              <div><span className="font-semibold text-white">Language:</span> {profile.language || "en"}</div>
              <div><span className="font-semibold text-white">Plan:</span> {trialActive ? "trial" : (profile.plan || "free")}</div>
              <div><span className="font-semibold text-white">Trial ends:</span> {profile.trial_ends_at || "-"}</div>
              <div><span className="font-semibold text-white">AI used today:</span> {trialActive ? "Unlimited during trial" : (usage?.usage_count || 0)}</div>
              <div><span className="font-semibold text-white">AI remaining today:</span> {trialActive ? "Unlimited during trial" : remaining}</div>
            </div>
          ) : (
            <div className="text-white/75">No profile found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
