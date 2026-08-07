"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Phone, Play, Pause, ChevronDown, Check, Mic, VolumeX, LayoutDashboard, BarChart3, Settings, Languages, Zap, Bell } from "lucide-react"

// A "live call" panel mockup instead of a hub illustration or a fanned card
// stack — shows the agent's voice as a waveform message with a voice-switch
// row beneath it. Tapping a language plays that voice's welcome greeting.
const bars = [0.4, 0.75, 1, 0.5, 0.65, 0.9, 0.45, 0.7, 0.55]

// `recording` points at a real recorded voice clip in /public — when set,
// that clip is played directly instead of any synthesized speech, so these
// languages always sound like an actual human voice, not a TTS engine.
const voices = [
  { lang: "Hindi", code: "hi-IN", greeting: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?", recording: null },
  { lang: "English", code: "en-IN", greeting: "Hello there! How can I help you today?", recording: null },
  { lang: "Tamil", code: "ta-IN", greeting: "வணக்கம்! நான் உங்களுக்கு எப்படி உதவலாம்?", recording: "/audio/voice-selection/tamil.mp3" },
  { lang: "Bengali", code: "bn-IN", greeting: "নমস্কার! আমি কীভাবে সাহায্য করতে পারি?", recording: "/audio/voice-selection/bengali.mp3" },
  { lang: "Telugu", code: "te-IN", greeting: "నమస్కారం! నేను మీకు ఎలా సహాయపడగలను?", recording: "/audio/voice-selection/telugu.mp3" },
  { lang: "Marathi", code: "mr-IN", greeting: "नमस्कार! मी तुम्हाला कशी मदत करू शकतो?", recording: null },
  { lang: "Gujarati", code: "gu-IN", greeting: "નમસ્તે! હું તમને કેવી રીતે મદદ કરી શકું?", recording: "/audio/voice-selection/gujarati.mp3" },
  { lang: "Kannada", code: "kn-IN", greeting: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?", recording: "/audio/voice-selection/kannada.mp3" },
  { lang: "Malayalam", code: "ml-IN", greeting: "നമസ്കാരം! ഞാൻ എങ്ങനെ സഹായിക്കാം?", recording: "/audio/voice-selection/malayalam.mp3" },
  { lang: "Punjabi", code: "pa-IN", greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?", recording: "/audio/voice-selection/punjabi.mp3" },
]

// The browser's voice list loads asynchronously — on first page load,
// getVoices() often returns an empty array until the `voiceschanged` event
// fires. Calling speak() before that resolves is why only whichever
// language happened to already have a cached voice (commonly English, and
// Hindi on many Windows/Chrome installs) seemed to "work" while the rest
// spoke silently. This waits for the real list before picking a voice.
function getVoicesReady(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices()
    if (existing.length > 0) return resolve(existing)
    const onChange = () => {
      const list = window.speechSynthesis.getVoices()
      if (list.length > 0) {
        window.speechSynthesis.removeEventListener("voiceschanged", onChange)
        resolve(list)
      }
    }
    window.speechSynthesis.addEventListener("voiceschanged", onChange)
    // Some browsers never fire voiceschanged (or fire it late) — fall back
    // to whatever is available after a short wait instead of hanging.
    setTimeout(() => {
      window.speechSynthesis.removeEventListener("voiceschanged", onChange)
      resolve(window.speechSynthesis.getVoices())
    }, 500)
  })
}

function findVoiceFor(availableVoices: SpeechSynthesisVoice[], langCode: string) {
  const base = langCode.split("-")[0].toLowerCase()
  const exact = availableVoices.find((v) => v.lang === langCode)
  const sameLanguage = availableVoices.find((v) => v.lang.toLowerCase().startsWith(base))
  return exact ?? sameLanguage ?? null
}

// Tracks the one audio element currently playing so a new tap can stop it,
// same role `speechSynthesis.cancel()` plays for the browser-voice path.
let currentCloudAudio: HTMLAudioElement | null = null

// Plays a real recorded voice clip — always a genuine human voice, no
// synthesis involved. This wins over cloud/browser TTS whenever a language
// has one, since it's the actual product voice, not an approximation.
async function speakViaRecording(src: string, onStart: () => void, onEnd: () => void): Promise<boolean> {
  currentCloudAudio?.pause()

  const audio = new Audio(src)
  currentCloudAudio = audio
  audio.onplay = onStart
  audio.onended = onEnd
  audio.onerror = onEnd
  try {
    await audio.play()
  } catch {
    return false
  }
  return true
}

// Plug-and-play cloud TTS: real audio for every language, guaranteed,
// once the backend has GOOGLE_TTS_API_KEY set — no other code changes
// needed. Returns false (rather than throwing) whenever the backend isn't
// configured yet or the request fails, so the caller can fall back to the
// browser's built-in voices.
async function speakViaCloud(text: string, langCode: string, onStart: () => void, onEnd: () => void): Promise<boolean> {
  currentCloudAudio?.pause()

  let res: Response
  try {
    res = await fetch("/api/tts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text, languageCode: langCode }),
    })
  } catch {
    return false
  }
  if (!res.ok) return false

  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  currentCloudAudio = audio
  audio.onplay = onStart
  audio.onended = () => {
    onEnd()
    URL.revokeObjectURL(url)
  }
  audio.onerror = () => {
    onEnd()
    URL.revokeObjectURL(url)
  }
  try {
    await audio.play()
  } catch {
    URL.revokeObjectURL(url)
    return false
  }
  return true
}

// Speaks a greeting aloud using the browser's built-in speech synthesis —
// real audio, not a mocked/fake sound. Reports whether a real voice was
// found for that language, and calls back when speaking actually starts
// and ends so the UI can animate in sync with real audio, not a guess.
async function speakViaBrowser(
  text: string,
  langCode: string,
  onStart: () => void,
  onEnd: () => void,
): Promise<boolean> {
  if (typeof window === "undefined" || !window.speechSynthesis) return false
  window.speechSynthesis.cancel()

  const availableVoices = await getVoicesReady()
  const matched = findVoiceFor(availableVoices, langCode)

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = langCode
  utterance.voice = matched ?? availableVoices.find((v) => v.default) ?? availableVoices[0] ?? null
  utterance.onstart = onStart
  utterance.onend = onEnd
  utterance.onerror = onEnd
  window.speechSynthesis.speak(utterance)

  return matched !== null
}

// Priority order: (1) a real recorded clip for that language, if we have
// one — the actual product voice; (2) cloud TTS, once the backend key is
// set; (3) the browser's own voices as a last resort.
async function speak(
  text: string,
  langCode: string,
  recording: string | null,
  onStart: () => void,
  onEnd: () => void,
): Promise<{ spoke: boolean; source: "recording" | "cloud" | "browser" }> {
  if (recording) {
    const recordingOk = await speakViaRecording(recording, onStart, onEnd)
    if (recordingOk) return { spoke: true, source: "recording" }
  }

  const cloudOk = await speakViaCloud(text, langCode, onStart, onEnd)
  if (cloudOk) return { spoke: true, source: "cloud" }

  const localMatch = await speakViaBrowser(text, langCode, onStart, onEnd)
  return { spoke: localMatch, source: "browser" }
}

// Stops whichever path is currently speaking — a recorded/cloud clip or the
// browser's own voice — so the play button can act as a real toggle instead
// of only ever restarting playback from the top.
function stopSpeaking() {
  currentCloudAudio?.pause()
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

export function VoiceSelectionHub() {
  const [active, setActive] = useState("English")
  const [supportedCodes, setSupportedCodes] = useState<Set<string> | null>(null)
  const [hasRealVoice, setHasRealVoice] = useState(true)
  const [usedCloud, setUsedCloud] = useState(false)
  // Once we've confirmed the cloud route is configured, it stays true for
  // the rest of the session — the backend key isn't going anywhere mid-visit.
  const [cloudAvailable, setCloudAvailable] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const current = voices.find((v) => v.lang === active) ?? voices[1]

  // A real ticking "call duration" clock, not a static string — starts at
  // 0:00 and counts up for as long as the card is on screen.
  const [callSeconds, setCallSeconds] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCallSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const callDuration = `${Math.floor(callSeconds / 60)}:${String(callSeconds % 60).padStart(2, "0")}`

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return
    let cancelled = false
    getVoicesReady().then((available) => {
      if (cancelled) return
      const codes = new Set(voices.filter((v) => findVoiceFor(available, v.code) !== null).map((v) => v.code))
      setSupportedCodes(codes)
    })
    return () => {
      cancelled = true
    }
  }, [])

  async function playGreeting(v: (typeof voices)[number]) {
    const result = await speak(
      v.greeting,
      v.code,
      v.recording,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
    )
    setHasRealVoice(result.spoke)
    setUsedCloud(result.source === "cloud")
    if (result.source === "cloud") setCloudAvailable(true)
  }

  // The play button now genuinely toggles: tapping it mid-playback stops the
  // greeting instead of restarting it. Manual stop() calls (pause/cancel)
  // don't fire the audio/synthesis "ended" event, so isSpeaking is reset
  // here directly rather than waiting on that callback.
  function toggleGreeting(v: (typeof voices)[number]) {
    if (isSpeaking) {
      stopSpeaking()
      setIsSpeaking(false)
      return
    }
    playGreeting(v)
  }

  function handleSelect(v: (typeof voices)[number]) {
    setActive(v.lang)
    playGreeting(v)
  }

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[600px]"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, #2563EB, transparent 70%)" }}
        animate={{ opacity: [0.1, 0.22, 0.1], scale: [1, 1.15, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -left-8 size-44 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, #8FB4FF, transparent 70%)" }}
        animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.2, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
      />

      {/* floating capability badge — sits below the dashboard card so it
          never intrudes on the text column beside it at any breakpoint */}
      <motion.div
        className="absolute -bottom-14 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white pl-2 pr-4 py-2 md:flex"
        style={{ border: "1px solid #E9E4FF", boxShadow: "0 12px 28px -12px rgba(124,58,237,0.3)" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
      >
        <span className="flex size-7 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, #A78BFA, #7C3AED)" }}>
          <Languages className="size-3.5 text-white" aria-hidden />
        </span>
        <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "#7C3AED" }}>10+ Languages</span>
      </motion.div>

      <div>
        <motion.div
          className="relative overflow-hidden rounded-[28px] bg-white"
          style={{ border: "1px solid #E4ECFF", boxShadow: "0 30px 60px -24px rgba(37,99,235,0.3)" }}
          animate={isSpeaking ? { boxShadow: "0 30px 60px -18px rgba(37,99,235,0.5)" } : { boxShadow: "0 30px 60px -24px rgba(37,99,235,0.3)" }}
          transition={{ duration: 0.4 }}
        >
          {/* pulsing light that travels around the dashboard's border — speeds up
              and brightens live whenever the agent is actually speaking */}
          <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden>
            <defs>
              <filter id="voice-dash-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={3} />
              </filter>
            </defs>
            <motion.rect
              x="0.5%"
              y="0.5%"
              width="99%"
              height="99%"
              rx="27"
              fill="none"
              stroke="#2563EB"
              strokeWidth={3}
              strokeOpacity={0.5}
              strokeLinecap="round"
              filter="url(#voice-dash-glow)"
              animate={{ strokeDashoffset: [0, -1000] }}
              transition={{ strokeDashoffset: { duration: isSpeaking ? 2 : 6, repeat: Infinity, ease: "linear" } }}
              strokeDasharray="360 640"
            />
            <motion.rect
              x="0.5%"
              y="0.5%"
              width="99%"
              height="99%"
              rx="27"
              fill="none"
              stroke="#60A5FA"
              strokeWidth={1.5}
              strokeLinecap="round"
              animate={{ strokeDashoffset: [0, -1000] }}
              transition={{ strokeDashoffset: { duration: isSpeaking ? 2 : 6, repeat: Infinity, ease: "linear" } }}
              strokeDasharray="360 640"
            />
          </svg>

          {/* window chrome bar — glass tint */}
          <div
            className="flex items-center gap-2 border-b px-4 py-2.5 backdrop-blur-sm"
            style={{ borderColor: "#94A3B8", backgroundColor: "rgba(247,249,252,0.7)" }}
          >
            <span className="size-2 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
            <span className="size-2 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
            <span className="size-2 rounded-full" style={{ backgroundColor: "#28C840" }} />
            <p className="ml-2 text-[11px] font-semibold" style={{ color: "#94A3B8" }}>9278.io — Voice Studio</p>
            <div className="ml-auto flex items-center gap-2.5">
              <span className="relative flex size-6 items-center justify-center rounded-full transition-colors hover:bg-black/5">
                <Bell className="size-3.5" style={{ color: "#94A3B8" }} aria-hidden />
                <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full" style={{ backgroundColor: "#2563EB" }} />
              </span>
              <span
                className="flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: "linear-gradient(135deg, #4F8DFF, #2563EB)" }}
              >
                N
              </span>
            </div>
          </div>
          <div className="flex">
            {/* sidebar */}
            <div className="hidden w-12 shrink-0 flex-col items-center gap-3 border-r py-4 sm:flex" style={{ borderColor: "#94A3B8" }}>
              <span className="flex size-8 items-center justify-center rounded-xl transition-colors hover:bg-black/5" style={{ color: "#94A3B8" }}>
                <LayoutDashboard className="size-4" aria-hidden />
              </span>
              <span
                className="relative flex size-8 items-center justify-center rounded-xl text-white"
                style={{ background: "linear-gradient(135deg, #4F8DFF, #2563EB)", boxShadow: "0 6px 14px -4px rgba(37,99,235,0.6)" }}
              >
                <Mic className="size-4" aria-hidden />
              </span>
              <span className="flex size-8 items-center justify-center rounded-xl transition-colors hover:bg-black/5" style={{ color: "#94A3B8" }}>
                <BarChart3 className="size-4" aria-hidden />
              </span>
              <span className="flex size-8 items-center justify-center rounded-xl transition-colors hover:bg-black/5" style={{ color: "#94A3B8" }}>
                <Settings className="size-4" aria-hidden />
              </span>
            </div>

            {/* main panel */}
            <div className="flex-1 p-4">
              {/* stats strip */}
              <div className="mb-4 grid grid-cols-3 gap-1.5">
                {[
                  { icon: Mic, label: "10", caption: "Voices", tint: "#2563EB" },
                  { icon: Languages, label: "10+", caption: "Languages", tint: "#8B5CF6" },
                  { icon: Zap, label: "<1s", caption: "Latency", tint: "#F59E0B" },
                ].map((s) => (
                  <div key={s.caption} className="rounded-lg px-2 py-1.5" style={{ backgroundColor: "#F7F9FC" }}>
                    <div className="flex items-center gap-1">
                      <s.icon className="size-3" style={{ color: s.tint }} aria-hidden />
                      <p className="text-xs font-bold" style={{ color: "#0F172A" }}>{s.label}</p>
                    </div>
                    <p className="mt-0.5 text-[10px]" style={{ color: "#94A3B8" }}>{s.caption}</p>
                  </div>
                ))}
              </div>

              {/* status row */}
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: "#22C55E" }} />
                  <span className="relative inline-flex size-2 rounded-full" style={{ backgroundColor: "#22C55E" }} />
                </span>
                <p className="text-xs font-semibold" style={{ color: "#0F172A" }}>Live call · {callDuration}</p>
                {/* always rendered (opacity-toggled, not mounted/unmounted) so
                    this pill's width never appears or disappears from the row
                    — the Phone icon to its right stays put instead of jumping
                    left/right every time playback starts or stops. */}
                <span
                  aria-hidden={!isSpeaking}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-opacity duration-200 ${isSpeaking ? "opacity-100" : "pointer-events-none opacity-0"}`}
                  style={{ backgroundColor: "#EEF4FF", color: "#2563EB" }}
                >
                  Speaking…
                </span>
                <Phone className="ml-auto size-4" style={{ color: "#94A3B8" }} aria-hidden />
              </div>

              {/* caller bubble */}
              <div className="mt-3 flex justify-start">
                <div className="flex max-w-[70%] items-center gap-2 rounded-2xl rounded-bl-sm px-3 py-2" style={{ backgroundColor: "#F1F5F9" }}>
                  <Mic className="size-3.5" style={{ color: "#94A3B8" }} aria-hidden />
                  <p className="text-sm" style={{ color: "#475569" }}>Caller</p>
                </div>
              </div>

              {/* agent voice bubble — plays the selected voice's welcome greeting */}
              <div className="mt-2.5 flex flex-col items-end">
                <p className="mb-1 pr-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>AI Agent</p>
                <motion.button
                  type="button"
                  onClick={() => toggleGreeting(current)}
                  aria-label={isSpeaking ? "Stop greeting" : "Play greeting"}
                  whileTap={{ scale: 0.97 }}
                  className="flex max-w-[85%] items-center gap-3 rounded-2xl rounded-br-sm px-3.5 py-2.5 text-white"
                  style={{ background: "linear-gradient(135deg, #4F8DFF, #2563EB)", boxShadow: "0 12px 26px -10px rgba(37,99,235,0.5)" }}
                >
                  <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                    {isSpeaking && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-white/40"
                        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    {isSpeaking ? <Pause className="relative size-3 fill-current" aria-hidden /> : <Play className="relative size-3 fill-current" aria-hidden />}
                  </span>
                  <div className="flex h-5 shrink-0 items-end gap-[3px]">
                    {bars.map((h, i) => (
                      <span
                        key={i}
                        className={isSpeaking ? "ind-eq w-1 rounded-full bg-white" : "w-1 rounded-full bg-white transition-all duration-300"}
                        style={{ height: isSpeaking ? `${h * 20}px` : "4px", opacity: isSpeaking ? 1 : 0.6, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </motion.button>
                <div className="mt-1.5 flex h-10 max-w-[85%] items-start justify-end overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={current.lang}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.3 }}
                      className="line-clamp-2 text-right text-[13px]"
                      style={{ color: "#2563EB" }}
                    >
                      {current.greeting}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* voice switcher row */}
              <div className="mt-4 border-t pt-4" style={{ borderColor: "#94A3B8" }}>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#94A3B8" }}>Voice · 10 available</p>
                  <ChevronDown className="size-3.5" style={{ color: "#94A3B8" }} aria-hidden />
                </div>
                <div className="mt-2.5 flex min-h-[70px] flex-wrap content-start gap-1.5">
                  {voices.map((v) => {
                    const isActive = v.lang === active
                    const noRealVoice = !v.recording && !cloudAvailable && supportedCodes !== null && !supportedCodes.has(v.code)
                    return (
                      <motion.button
                        key={v.lang}
                        type="button"
                        onClick={() => handleSelect(v)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.94 }}
                        animate={isActive ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={
                          isActive
                            ? { backgroundColor: "#2563EB", color: "#FFFFFF", boxShadow: "0 8px 18px -6px rgba(37,99,235,0.6)" }
                            : { backgroundColor: "#F1F5F9", color: "#475569" }
                        }
                      >
                        <Check className={`size-3 shrink-0 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} aria-hidden />
                        {v.lang}
                        {noRealVoice && <VolumeX className="size-3 opacity-60" aria-hidden />}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
