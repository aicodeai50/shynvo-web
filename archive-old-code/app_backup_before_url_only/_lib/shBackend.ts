export const SH_BACKEND_URL =
  process.env.NEXT_PUBLIC_SH_BACKEND_URL || "http://localhost:8080";

type ChatPayload = {
  message: string;
  mode?: "advisor" | "tutor" | "teacher";
  facultySlug?: string;
  program?: string;
  language?: string;
};

export async function shChat(payload: ChatPayload) {
  const res = await fetch(`${SH_BACKEND_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // IMPORTANT: do not send your SH key from frontend
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Backend error ${res.status}: ${txt || res.statusText}`);
  }

  return res.json();
}
