import { NextResponse } from "next/server"
import { createHash } from "node:crypto"
import { headers } from "next/headers"
import { createAdminClient } from "@/lib/supabase/admin"
import { browserOf, classify, deviceOf, isBotUA, osOf } from "@/lib/analytics/parse"
import { enforceRateLimit, getClientIp, pageviewLimiter } from "@/lib/ratelimit"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Body = {
  path: string
  referrer?: string | null
  utm?: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
  }
  session_id?: string | null
}

const SKIP_PREFIXES = ["/admin", "/api", "/auth", "/_next"]

// Emit the missing-salt warning only once per server instance, not per request.
let warnedMissingSalt = false

export async function POST(req: Request) {
  // Per-IP rate limit (60 req/min) before parsing or touching the database.
  const limited = await enforceRateLimit(pageviewLimiter, getClientIp(req.headers))
  if (limited) return limited

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 })
  }

  if (!body.path || typeof body.path !== "string") {
    return NextResponse.json({ ok: false, error: "bad_path" }, { status: 400 })
  }
  // Drop admin/api/auth — they should never count toward marketing analytics.
  if (SKIP_PREFIXES.some((p) => body.path.startsWith(p))) {
    return NextResponse.json({ ok: true, skipped: "internal" })
  }

  const h = await headers()

  // The visitor id is a daily-rotating hash of IP+UA keyed by a SECRET salt.
  // Without a strong, non-public ANALYTICS_SALT that hash would be trivially
  // reversible, so we skip hashing and the insert entirely rather than fall
  // back to a public default salt. Warn once so the misconfig is visible.
  const salt = process.env.ANALYTICS_SALT?.trim()
  if (!salt) {
    if (!warnedMissingSalt) {
      warnedMissingSalt = true
      console.warn(
        "[pageview] ANALYTICS_SALT is not set — skipping visitor hashing and pageview inserts. " +
          "Set a strong random ANALYTICS_SALT in the deployment env to enable analytics.",
      )
    }
    return new NextResponse(null, { status: 204 })
  }

  const ua = h.get("user-agent")
  const isBot = isBotUA(ua)

  // Privacy-preserving visitor id: daily-rotating hash of IP+UA.
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    h.get("cf-connecting-ip") ||
    "0.0.0.0"
  const day = new Date().toISOString().slice(0, 10)
  const visitor_id = createHash("sha256").update(`${ip}|${ua ?? ""}|${day}|${salt}`).digest("hex").slice(0, 32)

  // Country: Vercel injects x-vercel-ip-country, Cloudflare injects cf-ipcountry.
  const country =
    h.get("x-vercel-ip-country") || h.get("cf-ipcountry") || h.get("x-country") || null

  const utm = body.utm ?? {}
  const { source, refHost } = classify(body.referrer ?? null, {
    medium: utm.medium,
    source: utm.source,
  })

  // Best-effort insert. If Supabase env isn't configured (local dev without
  // the integration) we still return 204 so the tracker doesn't keep retrying.
  try {
    const supabase = createAdminClient()
    await supabase.from("pageviews").insert({
      visitor_id,
      session_id: body.session_id ?? null,
      path: body.path.slice(0, 512),
      referrer: body.referrer ?? null,
      ref_host: refHost,
      source,
      utm_source: utm.source ?? null,
      utm_medium: utm.medium ?? null,
      utm_campaign: utm.campaign ?? null,
      utm_term: utm.term ?? null,
      utm_content: utm.content ?? null,
      country,
      device: deviceOf(ua),
      browser: browserOf(ua),
      os: osOf(ua),
      is_bot: isBot,
    })
  } catch {
    // swallow — tracking must never break the page
  }

  return new NextResponse(null, { status: 204 })
}
