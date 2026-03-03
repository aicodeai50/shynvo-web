'use client'

import { useEffect, useState } from 'react'

const BACKEND = "https://sh-backend-api-production-5b7e.up.railway.app/api/public/chat"

type Mode = 'Tutor' | 'Interviewer' | 'Analyst' | 'Builder' | 'Support'

export default function RobotPage() {
  const [booting, setBooting] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mode, setMode] = useState<Mode>('Tutor')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += 20
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setTimeout(() => setBooting(false), 500)
      }
    }, 400)
    return () => clearInterval(interval)
  }, [])

  async function send() {
    if (!message.trim()) return
    setLoading(true)
    setResponse('')

    const lang = navigator.language || 'en'

    const res = await fetch(BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        mode,
        lang
      })
    })

    const data = await res.json()
    setResponse(data.reply || data.message || 'No response.')
    setLoading(false)
  }

  if (booting) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-white/10 p-6 bg-white/5">
          <div className="flex justify-between text-sm text-white/60">
            <span>SHYNVO // ROBOT</span>
            <span>BOOT v1.0</span>
          </div>

          <h1 className="text-2xl font-semibold mt-4">
            Initializing cinematic assistant...
          </h1>

          <ul className="mt-6 space-y-2 text-white/70 text-sm">
            {progress >= 20 && <li>✔ Power core: online</li>}
            {progress >= 40 && <li>✔ Optics: calibrated</li>}
            {progress >= 60 && <li>✔ Motion rig: stabilized</li>}
            {progress >= 80 && <li>✔ Ambient sensors: active</li>}
          </ul>

          <div className="mt-6 h-2 bg-white/10 rounded-full">
            <div
              className="h-2 bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 text-sm text-white/50">
            Press nothing. Just vibe.
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-3xl font-semibold">Sci-Fi Cinematic Robot</h1>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <img
            src="/robot.png"
            alt="Shynvo Robot"
            className="mx-auto w-64"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          {(['Tutor','Interviewer','Analyst','Builder','Support'] as Mode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-xl border ${
                mode === m ? 'bg-white text-black' : 'border-white/20'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Ask anything..."
            className="w-full bg-transparent outline-none text-white"
          />
          <button
            onClick={send}
            className="mt-3 px-4 py-2 bg-white text-black rounded-xl"
          >
            Send
          </button>
        </div>

        {loading && <div className="text-white/60">Processing...</div>}

        {response && (
          <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
            {response}
          </div>
        )}
      </div>
    </main>
  )
}
