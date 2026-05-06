import type { Metadata } from "next"

export const SITE = {
  name: "9278.io",
  domain: "9278.io",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://9278.io",
  description:
    "India's leading AI voice agent platform. Handle calls in Hindi, Tamil, Telugu, Marathi, Bengali and 15+ Indian languages. TRAI compliant, sub-second latency, Indian phone numbers.",
  twitter: "@9278io",
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
  const url = absoluteUrl(path)
  const desc = description ?? SITE.description
  const og = image ?? "/opengraph-image"

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title,
      description: desc,
      locale: SITE.locale,
      images: [{ url: og, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title,
      description: desc,
      images: [og],
    },
  }
}
