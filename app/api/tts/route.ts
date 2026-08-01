import { enforceRateLimit, getClientIp, ttsLimiter } from "@/lib/ratelimit"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MAX_TEXT_CHARS = 500

type TtsRequestBody = {
  text?: string
  languageCode?: string
}

/**
 * Text-to-speech proxy for the Voice Selection demo. Plug-and-play: set
 * GOOGLE_TTS_API_KEY in the environment and this route starts returning
 * real audio for every supported language automatically — no other code
 * changes needed. Until that key exists, it returns 503 and the caller
 * (components/features-page/voice-selection-hub.tsx) falls back to the
 * browser's built-in speech synthesis.
 */
export async function POST(req: Request) {
  const limited = await enforceRateLimit(ttsLimiter, getClientIp(req.headers))
  if (limited) return limited

  const apiKey = process.env.GOOGLE_TTS_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "not_configured",
        message: "Text-to-speech is not configured. Set GOOGLE_TTS_API_KEY in the environment and restart the server.",
      }),
      { status: 503, headers: { "content-type": "application/json" } },
    )
  }

  let body: TtsRequestBody
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: "invalid_body" }), { status: 400, headers: { "content-type": "application/json" } })
  }

  const { text, languageCode } = body
  if (typeof text !== "string" || !text.trim() || typeof languageCode !== "string" || !languageCode.trim()) {
    return new Response(
      JSON.stringify({ error: "invalid_request", message: "Both text and languageCode are required." }),
      { status: 400, headers: { "content-type": "application/json" } },
    )
  }
  if (text.length > MAX_TEXT_CHARS) {
    return new Response(JSON.stringify({ error: "text_too_long" }), { status: 400, headers: { "content-type": "application/json" } })
  }

  let googleRes: Response
  try {
    googleRes = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        input: { text },
        // No explicit voice name — Google picks its default voice for the
        // language code, so this keeps working as new voices ship without
        // needing a hardcoded voice-name list here.
        voice: { languageCode },
        audioConfig: { audioEncoding: "MP3" },
      }),
    })
  } catch {
    return new Response(JSON.stringify({ error: "upstream_unreachable" }), { status: 502, headers: { "content-type": "application/json" } })
  }

  if (!googleRes.ok) {
    const detail = await googleRes.text().catch(() => "")
    return new Response(
      JSON.stringify({ error: "tts_request_failed", status: googleRes.status, detail }),
      { status: 502, headers: { "content-type": "application/json" } },
    )
  }

  const data = (await googleRes.json()) as { audioContent?: string }
  if (!data.audioContent) {
    return new Response(JSON.stringify({ error: "no_audio_returned" }), { status: 502, headers: { "content-type": "application/json" } })
  }

  const audioBuffer = Buffer.from(data.audioContent, "base64")
  return new Response(audioBuffer, {
    headers: { "content-type": "audio/mpeg", "cache-control": "no-store" },
  })
}
