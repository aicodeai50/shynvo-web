"use client";

import { useOSLocale, type Locale } from "@/components/os/OSSub";

const OPTIONS: Array<{ code: Locale; label: string }> = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "pt", label: "PT" },
  { code: "de", label: "DE" },
  { code: "it", label: "IT" },
  { code: "nl", label: "NL" },
  { code: "tr", label: "TR" },
  { code: "ar", label: "AR" },
  { code: "hi", label: "HI" },
  { code: "zh", label: "ZH" },
  { code: "ja", label: "JA" },
  { code: "ko", label: "KO" },
];

export default function OSLocaleControl() {
  const { locale, setLocale } = useOSLocale();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline text-xs text-white/50">subtitles</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 outline-none"
      >
        {OPTIONS.map((o) => (
          <option key={o.code} value={o.code}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
