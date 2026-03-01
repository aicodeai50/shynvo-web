"use client";

import { useMemo } from "react";
import OSShell from "@/components/os/OSShell";
import OSSub from "@/components/os/OSSub";
import { useOSState } from "@/components/os/useOSState";
import type { OSTheme } from "@/components/os/OSThemeSync";

const DEFAULT_HANDLE = "Cadet";
const DEFAULT_THEME: OSTheme = "nebula";

// If OSTheme evolves later, this keeps Settings from breaking.
// It also ensures buttons always render in a stable order.
const THEME_CHOICES: OSTheme[] = ["nebula", "tokyo", "onyx"] as OSTheme[];

function safeTheme(t: unknown): OSTheme {
  return (THEME_CHOICES.includes(t as OSTheme) ? (t as OSTheme) : DEFAULT_THEME);
}

export default function SettingsPage() {
  const [handle, setHandle] = useOSState<string>("os.profile.handle", DEFAULT_HANDLE);
  const [themeRaw, setTheme] = useOSState<OSTheme>("os.theme", DEFAULT_THEME);

  const theme = useMemo(() => safeTheme(themeRaw), [themeRaw]);
  const operatorChip = useMemo(
    () => `operator: ${String(handle || DEFAULT_HANDLE).trim() || DEFAULT_HANDLE}`,
    [handle]
  );

  function resetDefaults() {
    setHandle(DEFAULT_HANDLE);
    setTheme(DEFAULT_THEME);
  }

  return (
    <OSShell
      title="Settings"
      subtitle={
        <OSSub
          en="Profile and theme (CSS-only). Saved locally."
          i18n={{
            es: "Perfil y tema (solo CSS). Guardado localmente.",
            fr: "Profil et theme (CSS uniquement). Sauvegarde locale.",
            pt: "Perfil e tema (somente CSS). Salvo localmente.",
            de: "Profil und Theme (nur CSS). Lokal gespeichert.",
            it: "Profilo e tema (solo CSS). Salvato localmente.",
            nl: "Profiel en thema (alleen CSS). Lokaal opgeslagen.",
            tr: "Profil ve tema (yalnizca CSS). Yerelde kayitli.",
            ar: "Malaf shakhsiy wa thema (CSS faqat). mahfuz mahalliyan.",
            hi: "Profile aur theme (CSS-only). Local save.",
            zh: "Ge ren + zhu ti (jin CSS). Ben di bao cun.",
            ja: "Profile + theme (CSS-only). rokaru hozon.",
            ko: "Profile + theme (CSS-only). Local save.",
          }}
        />
      }
      chips={["online", "module: settings", operatorChip, `theme: ${theme}`, "sync: local"]}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Profile */}
        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-white/60">Profile</div>

            <button
              onClick={resetDefaults}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75 hover:bg-white/10"
              title="Reset handle and theme to defaults"
            >
              Reset defaults
            </button>
          </div>

          <div className="mt-3">
            <div className="text-xs text-white/60">Operator handle</div>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/85 outline-none"
              placeholder={DEFAULT_HANDLE}
            />
            <div className="mt-2 text-xs text-white/55">
              Stored in localStorage. Later: connect to account profile.
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
            Active operator:{" "}
            <span className="font-mono text-[11px] text-white/70">
              {(String(handle || DEFAULT_HANDLE).trim() || DEFAULT_HANDLE)}
            </span>
          </div>
        </div>

        {/* Theme */}
        <div className="rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-xs uppercase tracking-widest text-white/60">Theme</div>

          <div className="mt-3 grid grid-cols-1 gap-2">
            {THEME_CHOICES.map((t) => {
              const on = theme === t;
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={[
                    "rounded-xl border p-4 text-left transition",
                    on
                      ? "border-white/25 bg-white/10 os-accent-border"
                      : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="text-sm text-white/90">{t.toUpperCase()}</div>
                  <div className="mt-1 text-xs text-white/60">
                    {t === "nebula"
                      ? "Deep blue + violet glow."
                      : t === "tokyo"
                      ? "Cyan neon + soft purple."
                      : "Minimal mono control deck."}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 rounded-lg border border-white/10 bg-black/40 p-3 text-xs text-white/60">
            Theme is CSS-only and applied globally. Later: user profile settings API.
          </div>

          {/* Diagnostics (helpful during sprint) */}
          <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/60">Diagnostics</div>
            <div className="mt-2 text-xs text-white/65">
              <div>
                theme key: <span className="font-mono text-[11px] text-white/70">os.theme</span>
              </div>
              <div className="mt-1">
                active theme: <span className="font-mono text-[11px] text-white/70">{theme}</span>
              </div>
              <div className="mt-1">
                handle key: <span className="font-mono text-[11px] text-white/70">os.profile.handle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OSShell>
  );
}