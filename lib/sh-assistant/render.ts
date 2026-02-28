function escapeHtml(str: string) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeLang(lang: string) {
  const l = (lang || "").toLowerCase().trim();
  if (!l) return "plaintext";
  if (l === "js") return "javascript";
  if (l === "ts") return "typescript";
  if (l === "html") return "markup";
  if (l === "sh" || l === "shell") return "bash";
  return l;
}

/**
 * Converts assistant text into HTML with:
 * - fenced code blocks ```lang ...```
 * - inline `code`
 * - line breaks
 */
export function renderAssistantHtml(text: string) {
  const raw = String(text || "");
  const parts = raw.split(/```/);
  let html = "";

  for (let i = 0; i < parts.length; i++) {
    const chunk = parts[i];

    if (i % 2 === 0) {
      let safe = escapeHtml(chunk);
      safe = safe.replace(/`([^`]+)`/g, "<code>$1</code>");
      safe = safe.replace(/\n/g, "<br>");
      html += safe;
    } else {
      const firstNewline = chunk.indexOf("\n");
      let lang = "";
      let code = chunk;

      if (firstNewline !== -1) {
        lang = chunk.slice(0, firstNewline).trim();
        code = chunk.slice(firstNewline + 1);
      }

      const prismLang = normalizeLang(lang);
      const label = prismLang === "plaintext" ? "code" : prismLang;

      html += `
        <div class="sh-codewrap" data-lang="${escapeHtml(label)}">
          <div class="sh-codebar">
            <div class="sh-lang">${escapeHtml(label)}</div>
            <button class="sh-copy" type="button">Copy</button>
          </div>
          <pre class="sh-pre"><code>${escapeHtml(code)}</code></pre>
        </div>
      `;
    }
  }

  return html.trim();
}