const API = process.env.NEXT_PUBLIC_API_URL || "";
const KEY = process.env.NEXT_PUBLIC_SH_API_KEY || "";

export async function api(path: string, options: RequestInit = {}) {
  if (!API) throw new Error("NEXT_PUBLIC_API_URL missing");
  if (!KEY) throw new Error("NEXT_PUBLIC_SH_API_KEY missing");

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-sh-api-key": KEY,
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, ...data };
}
