import OpenAI from "openai"
import { CHATBOT_KNOWLEDGE } from "@/lib/chatbot/knowledge"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

type ChatRequestBody = {
  messages?: ChatMessage[]
}

const MAX_MESSAGES = 24
const MAX_USER_CHARS = 2000

// Default to Llama 3.1 8B — ~5-10x faster than the 70B variant, plenty
// strong for retrieval-style Q&A against a curated knowledge base.
// Override per-environment with NVIDIA_CHAT_MODEL if you want quality
// over speed (e.g. `meta/llama-3.3-70b-instruct`).
const DEFAULT_MODEL = "meta/llama-3.1-8b-instruct"
const NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1"

function isValidMessage(m: unknown): m is ChatMessage {
  if (!m || typeof m !== "object") return false
  const obj = m as Record<string, unknown>
  return (
    (obj.role === "user" || obj.role === "assistant") &&
    typeof obj.content === "string" &&
    obj.content.length > 0
  )
}

export async function POST(req: Request) {
  const apiKey = process.env.NVIDIA_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "Chat is not configured. Set NVIDIA_API_KEY in .env.local and restart the dev server.",
      }),
      { status: 503, headers: { "content-type": "application/json" } },
    )
  }

  let body: ChatRequestBody
  try {
    body = (await req.json()) as ChatRequestBody
  } catch {
    return new Response(JSON.stringify({ error: "bad_json" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const incoming = Array.isArray(body.messages) ? body.messages : []
  const messages = incoming
    .filter(isValidMessage)
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content:
        m.role === "user" ? m.content.slice(0, MAX_USER_CHARS) : m.content,
    }))

  if (
    messages.length === 0 ||
    messages[messages.length - 1].role !== "user"
  ) {
    return new Response(JSON.stringify({ error: "missing_user_message" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const client = new OpenAI({
    apiKey,
    baseURL: NVIDIA_BASE_URL,
  })

  const model = process.env.NVIDIA_CHAT_MODEL ?? DEFAULT_MODEL

  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const completion = await client.chat.completions.create({
          model,
          stream: true,
          // Lower temperature → more deterministic, less wandering.
          temperature: 0.3,
          top_p: 0.9,
          // Most useful answers are 100-300 tokens. Capping here bounds
          // worst-case latency without hurting normal-length replies.
          max_tokens: 512,
          messages: [
            { role: "system", content: CHATBOT_KNOWLEDGE },
            ...messages,
          ],
        })

        for await (const chunk of completion) {
          const delta = chunk.choices?.[0]?.delta?.content
          if (delta) controller.enqueue(encoder.encode(delta))
        }
        controller.close()
      } catch (err) {
        const status =
          err instanceof OpenAI.APIError ? err.status : undefined
        const detail =
          err instanceof Error ? err.message : "Unknown error"
        const message = status
          ? `NVIDIA API error (${status}): ${detail}`
          : detail
        controller.enqueue(encoder.encode(`\n\n[Error] ${message}`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-accel-buffering": "no",
    },
  })
}
