"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function CheckoutPlanPage() {
  const params = useParams<{ plan: string }>();
  const router = useRouter();
  const plan = String(params?.plan || "").toLowerCase();

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const checkoutUrl =
        plan === "pro"
          ? process.env.NEXT_PUBLIC_LEMON_PRO_URL
          : plan === "team"
          ? process.env.NEXT_PUBLIC_LEMON_TEAM_URL
          : "";

      if (!checkoutUrl) {
        router.replace("/pricing");
        return;
      }

      const supabase = getSupabaseClient();

      if (!supabase) {
        router.replace(`/sign-in?next=${encodeURIComponent(`/checkout/${plan}`)}`);
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (cancelled) return;

      if (!data.session) {
        router.replace(`/sign-in?next=${encodeURIComponent(`/checkout/${plan}`)}`);
        return;
      }

      window.location.href = checkoutUrl;
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [plan, router]);

  return (
    <section className="mx-auto max-w-xl px-4 py-16 text-white">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Checkout
        </div>
        <h1 className="mt-2 text-3xl font-semibold text-white">Preparing secure checkout</h1>
        <p className="mt-3 text-sm leading-6 text-white/70">
          We are checking your account and sending you to payment.
        </p>
      </div>
    </section>
  );
}
