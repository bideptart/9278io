import type { Metadata } from "next"

/** Canonical production origin — the single source of truth for the site. */
const CANONICAL_URL = "https://www.9278.io"

/**
 * Canonical site origin used for metadata (canonical URLs, Open Graph,
 * metadataBase, robots, JSON-LD). A localhost/preview value must never leak
 * into these.
 *
 * - Any valid, non-localhost value passes through unchanged.
 * - A missing or localhost/127.0.0.1 origin falls back to the canonical host,
 *   so a localhost canonical/og:url can never ship. In a production build this
 *   also logs a loud warning so a misconfigured NEXT_PUBLIC_SITE_URL is visible
 *   in the build logs — WITHOUT failing the deploy. (An earlier version threw
 *   here, which took production down whenever the Vercel env was missing or
 *   pointed at localhost; the www fallback already prevents a bad canonical, so
 *   warning is the safer behaviour.)
 */
function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  const isLocalhost = raw ? /^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/i.test(raw) : false

  // A valid, non-localhost origin is always trusted.
  if (raw && !isLocalhost) return raw

  if (process.env.NODE_ENV === "production") {
    console.warn(
      `[seo] NEXT_PUBLIC_SITE_URL is ${raw ? `set to localhost ("${raw}")` : "missing"} in a production build; ` +
        `falling back to ${CANONICAL_URL}. Set it to the public origin to silence this warning.`,
    )
  }

  return CANONICAL_URL
}

export const SITE = {
  name: "9278.io",
  domain: "9278.io",
  url: resolveSiteUrl(),
  // Optional real, staffed phone line shown in the homepage hero demo panel.
  // Sourced from a single env value; when unset (no staffed line) the hero
  // omits the number entirely rather than showing a placeholder.
  heroPhone: process.env.NEXT_PUBLIC_HERO_PHONE?.trim() || "",
  description:
    "Native-audio voice agents for Indian businesses. Sub-second latency on Jio/Airtel/BSNL/Vi, RAG over your docs, and a self-hosted control panel — without the enterprise vendor markup.",
  locale: "en_IN",
} as const

export const SITE_URL = SITE.url

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`
}

type PageSeoInput = {
  title: string
  description?: string
  path: string
  image?: string
  noindex?: boolean
}

export function pageSeo({ title, description, path, image, noindex }: PageSeoInput): Metadata {
  const desc = description ?? SITE.description
  const og = image ?? "/opengraph-image"

  // Canonical and OG URLs are RELATIVE — Next resolves them against
  // metadataBase (https://www.9278.io), so there is no hardcoded origin here.
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE.name,
      title,
      description: desc,
      locale: SITE.locale,
      images: [{ url: og, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [og],
    },
  }
}
