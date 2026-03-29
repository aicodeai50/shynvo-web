export const STORAGE_KEY = "shynvo_sh_assistant_chat_v1";
export const THEME_KEY = "shynvo_sh_assistant_theme_v1";

export type ThemeMode = "dark" | "light";

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  ts: number;
}

export function loadTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  const t = (localStorage.getItem(THEME_KEY) || "dark") as ThemeMode;
  return t === "light" ? "light" : "dark";
}

export function saveTheme(theme: ThemeMode) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, theme);
}

export function loadChat(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as ChatMessage[];
  } catch {
    return [];
  }
}

export function saveChat(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}