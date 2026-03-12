"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { LanguageCode } from "@/lib/i18n/translations";

export default function LanguageSelector() {
  const { language, setLanguage, languages, t } = useLanguage();

  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
      <span className="text-white/60">{t("lang.label")}</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="bg-transparent text-white outline-none"
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code} className="bg-[#0B0F14] text-white">
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
