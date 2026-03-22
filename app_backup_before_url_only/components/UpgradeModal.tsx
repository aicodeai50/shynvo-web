"use client";

import Link from "next/link";

export default function UpgradeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0B0F14] p-6 text-white">
        <h2 className="text-2xl font-semibold">
          AI limit reached
        </h2>

        <p className="mt-3 text-sm text-white/70">
          You have reached your free AI limit. Upgrade your plan to continue
          using AI across Shynvo environments.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/pricing"
            className="flex-1 rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-[#0B0F14] hover:bg-white/90"
          >
            Upgrade
          </Link>

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
