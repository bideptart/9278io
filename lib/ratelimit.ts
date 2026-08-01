import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

/**
 * Per-IP rate limiting backed by Upstash Redis (sliding window).
 *
 * Configured entirely from env — set both to enable:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * When either is missing (e.g. local dev with no Upstash project), the limiters
 * are `null` and every call is allowed, so nothing breaks. Enable it in
 * production by setting the two vars.
 */
const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

export const isRateLimitEnabled = Boolean(url && token)

// One shared Redis REST client across all limiters.
const redis = isRateLimitEnabled ? new Redis({ url: url as string, token: token as string }) : null

function makeLimiter(requests: number, window: Parameters<typeof Ratelimit.slidingWindow>[1], prefix: string) {
  if (!redis) return null
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    prefix,
    analytics: false,
    // Dedupe bursts within a single serverless instance before hitting Redis.
    ephemeralCache: new Map(),
  })
}

/** Chat completions — the priority endpoint: 10 requests / minute / IP. */
export const chatLimiter = makeLimiter(10, "1 m", "rl:chat")
/** Pageview beacons fire on every navigation, so allow a higher ceiling. */
export const pageviewLimiter = makeLimiter(60, "1 m", "rl:pageview")
/** Contact form — spam guard: 5 submissions / 10 minutes / IP. */
export const contactLimiter = makeLimiter(5, "10 m", "rl:contact")
/** Text-to-speech previews — each call costs against the TTS provider's quota. */
export const ttsLimiter = makeLimiter(20, "1 m", "rl:tts")

/**
 * Extract the client IP, preferring the left-most x-forwarded-for entry.
 * Accepts a `Request.headers` (Headers) or a `next/headers` ReadonlyHeaders —
 * anything with a `.get()`.
 */
export function getClientIp(headers: { get(name: string): string | null }): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "0.0.0.0"
  )
}

/**
 * For API routes: returns a ready-to-send 429 `Response` when the IP is over
 * the limit, or `null` when the request may proceed (also `null` when rate
 * limiting is disabled). Includes Retry-After and standard X-RateLimit-* headers.
 */
export async function enforceRateLimit(
  limiter: Ratelimit | null,
  ip: string,
): Promise<Response | null> {
  if (!limiter) return null
  const { success, limit, remaining, reset } = await limiter.limit(ip)
  if (success) return null

  const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000))
  return new Response(
    JSON.stringify({ error: "rate_limited", message: "Too many requests. Please slow down and try again shortly." }),
    {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": String(retryAfter),
        "x-ratelimit-limit": String(limit),
        "x-ratelimit-remaining": String(remaining),
        "x-ratelimit-reset": String(reset),
      },
    },
  )
}
