"use client";

import type { ReactNode } from "react";

type ExperimentFrameProps = {
  children: ReactNode;
  wallpaper: string;
};

export default function ExperimentFrame({
  children,
  wallpaper,
}: ExperimentFrameProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Fullscreen wallpaper */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm" />

      {/* Frame */}
      <div className="relative mx-auto min-h-screen max-w-[1400px] px-4 py-6">
        <div className="relative min-h-[calc(100vh-3rem)] rounded-[36px] border border-white/15 bg-black/40 backdrop-blur-xl shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}