import type { Metadata } from "next"

export const SITE = {
  name: "9278.io",
  domain: "9278.io",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://9278.io",
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
      title,
      description: desc,
      images: [og],
    },
  }
}
