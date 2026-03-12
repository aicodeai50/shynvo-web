import { Suspense } from "react";
import AuthCallbackClient from "./AuthCallbackClient";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <section className="relative py-10 sm:py-14">
          <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur-sm">
            <div className="text-sm text-white/85">Completing account verification...</div>
          </div>
        </section>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  );
}
