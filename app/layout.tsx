import "./globals.css";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ShynvoGuideChat from "@/components/ShynvoGuideChat";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import AIBackground from "./components/AIBackground";

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
      <body>
        <LanguageProvider>
          <SiteNav />
          <main className="relative z-10"><AIBackground />
{children}</main>
          <SiteFooter />
          <ShynvoGuideChat />
        </LanguageProvider>
      </body>
    </html>
  );
}
