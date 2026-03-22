"use client";

import React from "react";
import Link from "next/link";

export default function PortalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold">{title}</div>
          <div className="text-xs text-white/60">Shynvo Portal</div>
        </div>
        <Link href="/" className="text-sm text-white/70 hover:text-white">
          Home
        </Link>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">{children}</div>
    </div>
  );
}
