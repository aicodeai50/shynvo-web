"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import {
  LANGUAGES,
  LanguageCode,
  defaultLanguage,
  t as translate,
} from "@/lib/i18n/translations";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  t: (key: string) => string;
  languages: typeof LANGUAGES;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(defaultLanguage);

  useEffect(() => {
    let mounted = true;

    async function loadLanguage() {
      const local = (localStorage.getItem("shynvo_language") || "").trim() as LanguageCode;
      if (local && mounted) {
        setLanguageState(local);
      }

      const supabase = getSupabaseClient();
      if (!supabase) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data } = await supabase
        .from("profiles")
        .select("language")
        .eq("id", session.user.id)
        .single();

      const dbLang = (data?.language || "").trim() as LanguageCode;
      if (dbLang && mounted) {
        setLanguageState(dbLang);
        localStorage.setItem("shynvo_language", dbLang);
      }
    }

    loadLanguage();
    return () => {
      mounted = false;
    };
  }, []);

  const setLanguage = useCallback(async (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("shynvo_language", lang);

    try {
      const supabase = getSupabaseClient();
      const session = supabase ? await supabase.auth.getSession() : { data: { session: null } };
      const token = session.data.session?.access_token || "";

      await fetch("/api/language", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ language: lang }),
      });
    } catch {}
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: string) => translate(language, key),
      languages: LANGUAGES,
    }),
    [language, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
