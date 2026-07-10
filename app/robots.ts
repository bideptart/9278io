import type { MetadataRoute } from "next"
import { SITE } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/auth/", "/get-started/thanks"],
      },
    ],
    // `sitemap` and `host` MUST always match the canonical www host. Both are
    // derived from SITE.url (lib/seo.ts) — the single source of truth shared
    // with metadataBase and the sitemap — so they stay in lockstep with every
    // canonical/og:url. In production SITE.url can never be apex or localhost:
    // resolveSiteUrl() throws at build if NEXT_PUBLIC_SITE_URL is missing or
    // localhost, so this always emits https://www.9278.io.
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
