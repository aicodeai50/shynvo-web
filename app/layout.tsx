import "./globals.css";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ShynvoGuideChat from "@/components/ShynvoGuideChat";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import AIBackground from "./components/AIBackground";
import PathTracker from "./components/PathTracker";

export const metadata: Metadata = {
  title: "Shynvo",
  description: "Structured intelligence platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden bg-[#04070d] text-white">
        <LanguageProvider>
          <PathTracker />
          <div className="relative z-10">
          <SiteNav />
          <main className="relative z-10"><AIBackground />
{children}</main>
          <SiteFooter />
          <ShynvoGuideChat />
                  </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
