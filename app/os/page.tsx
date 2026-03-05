"use client";

import OSShell from "@/components/os/OSShell";
import OSHUD from "@/components/os/OSHUD";
import OSLogbook from "@/components/os/OSLogbook";
import TerminalOverlay from "@/components/os/TerminalOverlay";
import SHAssistantPanel from "@/components/os/SHAssistantPanel";

export default function OSHomePage() {
  return (
    <OSShell title="Shynvo OS">
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-5">
          <OSHUD />
          <OSLogbook />
        </div>
        <div className="grid gap-5">
          <SHAssistantPanel />
        </div>
      </div>

      <TerminalOverlay />
    </OSShell>
  );
}
