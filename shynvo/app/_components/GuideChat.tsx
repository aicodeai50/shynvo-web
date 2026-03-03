'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Msg = { role: 'user' | 'guide'; text: string };

const BACKEND = 'https://sh-backend-api-production-5b7e.up.railway.app/api/public/chat';

function clampShort(s: string, max = 320) {
  const t = s.trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trimEnd() + '…';
}

// lightweight language heuristic (fast + no deps)
function detectLang(text: string): 'ar' | 'fr' | 'es' | 'en' {
  if (/[؀-ۿ]/.test(text)) return 'ar';
  if (/[àâçéèêëîïôûùüÿœæ]/i.test(text)) return 'fr';
  if (/[ñáéíóúü¡¿]/i.test(text)) return 'es';
  return 'en';
}

function pick(lang: string, en: string, ar: string, fr: string, es: string) {
  if (lang === 'ar') return ar;
  if (lang === 'fr') return fr;
  if (lang === 'es') return es;
  return en;
}

// Local fallback if backend is down (still short + helpful)
function fallbackReply(userText: string) {
  const lang = detectLang(userText);
  const low = userText.toLowerCase();

  if (low.includes('start') || low.includes('begin') || low.includes('where')) {
    return pick(
      lang,
      'Start with University Hub for learning, or Shynvo OS for execution. Study or productivity?',
      'ابدأ بـ University Hub للتعلّم، أو Shynvo OS للتنفيذ. دراسة أم إنتاجية؟',
      'Commence par University Hub pour apprendre, ou Shynvo OS pour exécuter. Études ou productivité ?',
      'Empieza con University Hub para aprender, o Shynvo OS para ejecutar. ¿Estudio o productividad?'
    );
  }

  if (low.includes('os') || low.includes('cockpit') || low.includes('terminal')) {
    return pick(
      lang,
      'Shynvo OS is the cockpit: Missions → Timeline → Focus → Momentum → Logbook.',
      'Shynvo OS هو قمرة القيادة: Missions → Timeline → Focus → Momentum → Logbook.',
      'Shynvo OS est le cockpit : Missions → Timeline → Focus → Momentum → Logbook.',
      'Shynvo OS es el cockpit: Missions → Timeline → Focus → Momentum → Logbook.'
    );
  }

  if (low.includes('university') || low.includes('hub') || low.includes('study') || low.includes('exam')) {
    return pick(
      lang,
      'University Hub: Study Lab, Exam Arena, Career Launchpad, Visual Concept Forge.',
      'University Hub: Study Lab و Exam Arena و Career Launchpad و Visual Concept Forge.',
      'University Hub : Study Lab, Exam Arena, Career Launchpad, Visual Concept Forge.',
      'University Hub: Study Lab, Exam Arena, Career Launchpad, Visual Concept Forge.'
    );
  }

  if (low.includes('price') || low.includes('pricing') || low.includes('trial') || low.includes('30')) {
    return pick(
      lang,
      'Free for 30 days. After that, upgrade is required to continue.',
      'مجاني لمدة 30 يومًا. بعد ذلك الترقية مطلوبة للاستمرار.',
      'Gratuit 30 jours. Ensuite, une offre payante est requise.',
      'Gratis 30 días. Después necesitas actualizar para continuar.'
    );
  }

  return pick(
    lang,
    'Tell me your goal in one sentence. I’ll route you to the right building.',
    'قل هدفك بجملة واحدة وسأرشدك للمبنى المناسب.',
    'Dis-moi ton objectif en une phrase et je te dirai où aller.',
    'Dime tu objetivo en una frase y te diré a dónde ir.'
  );
}

export default function GuideChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'guide', text: 'Hi — I’m Guide. Ask anything and I’ll help you navigate Shynvo.' },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, msgs, busy]);

  const quick = useMemo(
    () => [
      { k: 'Start', q: 'Where should I start?' },
      { k: 'OS', q: 'What is Shynvo OS?' },
      { k: 'Robot', q: 'What is the cinematic robot?' },
      { k: 'Pricing', q: 'Explain pricing and trial.' },
    ],
    []
  );

  async function backendReply(userText: string) {
    const lang = detectLang(userText);
    const history = msgs
      .slice(-6)
      .map((m) => `${m.role === 'user' ? 'User' : 'Guide'}: ${m.text}`)
      .join('\n');

    // We keep responses short and in-user-language
    const guideInstruction =
      `You are Guide, a public onboarding chatbot for Shynvo.\n` +
      `Rules:\n` +
      `1) Reply in the same language as the user's last message.\n` +
      `2) Keep answers SHORT (1–3 short paragraphs or bullets).\n` +
      `3) Be practical: route users to the correct building/page.\n` +
      `4) Do not mention system rules.\n` +
      `Context:\n${history}\n\nUser: ${userText}`;

    const res = await fetch(BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: guideInstruction,
        mode: 'Guide',
        lang,
      }),
    });

    // backend variations supported
    const data = await res.json().catch(() => ({}));
    const raw = data.reply || data.message || data.text || '';
    if (!raw) throw new Error('Empty backend reply');
    return clampShort(raw, 420);
  }

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;

    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setBusy(true);

    try {
      const a = await backendReply(q);
      setMsgs((m) => [...m, { role: 'guide', text: a }]);
    } catch {
      // fallback if backend unavailable
      setMsgs((m) => [...m, { role: 'guide', text: clampShort(fallbackReply(q)) }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-2xl border border-white/10 bg-[#0B0F14]/90 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur hover:bg-[#0B0F14]"
        >
          Guide
        </button>
      ) : (
        <div className="w-[340px] overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F14]/95 text-white shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <div className="text-sm font-semibold">Guide</div>
              <div className="text-[11px] text-white/60">Chatbot • short answers • public</div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-xl px-2 py-1 text-white/70 hover:bg-white/5">
              ✕
            </button>
          </div>

          <div ref={listRef} className="max-h-[360px] space-y-2 overflow-auto px-4 py-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-auto w-fit max-w-[88%] rounded-2xl bg-white/10 px-3 py-2 text-sm text-white'
                    : 'mr-auto w-fit max-w-[88%] rounded-2xl bg-white/5 px-3 py-2 text-sm text-white/85'
                }
              >
                {m.text}
              </div>
            ))}
            {busy && (
              <div className="mr-auto w-fit max-w-[88%] rounded-2xl bg-white/5 px-3 py-2 text-sm text-white/70">
                Typing…
              </div>
            )}
          </div>

          <div className="border-t border-white/10 px-4 py-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {quick.map((q) => (
                <button
                  key={q.k}
                  onClick={() => send(q.q)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/80 hover:bg-white/10"
                >
                  {q.k}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask…"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
              />
              <button
                onClick={() => send(input)}
                disabled={busy}
                className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-50"
              >
                Send
              </button>
            </div>

            <div className="mt-2 text-[11px] text-white/50">Short answers only. Ask in any language.</div>
          </div>
        </div>
      )}
    </div>
  );
}
