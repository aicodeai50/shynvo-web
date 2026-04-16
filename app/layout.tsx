import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Space_Mono, Syne } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ShynvoGuideChat from "@/components/ShynvoGuideChat";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import AIBackground from "./components/AIBackground";
import PathTracker from "./components/PathTracker";
import UltraPremiumEffects from "./components/UltraPremiumEffects";
import CapacitorKeyboardFix from "@/components/CapacitorKeyboardFix";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020508",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shynvo.app"),
  title: {
    default: "Shynvo — Structured AI Platform",
    template: "%s | Shynvo",
  },
  description: "One platform for learning, building, and AI-guided work. Clear environments. Guided AI. Structured progress.",
  applicationName: "Shynvo",
  keywords: ["AI platform", "learning", "structured AI", "University Hub", "Frontier Lab", "AI guide", "education platform"],
  authors: [{ name: "Shynvo" }],
  creator: "Shynvo",
  publisher: "Shynvo",
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icons/icon-192.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shynvo.app",
    siteName: "Shynvo",
    title: "Shynvo — Structured AI Platform",
    description: "One platform for learning, building, and AI-guided work. Clear environments. Guided AI. Structured progress.",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "Shynvo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Shynvo — Structured AI Platform",
    description: "One platform for learning, building, and AI-guided work.",
    images: ["/icons/icon-512.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Shynvo",
    startupImage: "/icons/icon-512.png",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="shortcut icon" href="/icons/icon-192.png" />
        <meta name="msapplication-TileImage" content="/icons/icon-512.png" />
        <meta name="msapplication-TileColor" content="#020508" />
      </head>
      <body className="relative min-h-[100dvh] overflow-x-hidden bg-[#020508] text-white">
        <LanguageProvider>
          <CapacitorKeyboardFix />
          <PathTracker />
          <UltraPremiumEffects />
          <div className="relative z-10 flex min-h-[100dvh] flex-col">
            <SiteNav />
            <main className="relative z-10 flex-1">
              <AIBackground />
              {children}
            </main>
            <div className="relative z-20">
              <SiteFooter />
            </div>
            <ShynvoGuideChat />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
