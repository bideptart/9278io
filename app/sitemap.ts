import type { MetadataRoute } from "next"
import { INDUSTRIES } from "@/lib/industries"
import { SITE } from "@/lib/seo"
import { getAllBlogSlugs } from "@/lib/blog"

/** Sitemaps must list canonical production URLs — never localhost/preview. */
const BASE = /localhost|127\.0\.0\.1/.test(SITE.url) ? "https://9278.io" : SITE.url

type Route = {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: Route[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/industries", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/get-started", priority: 0.8, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/call-recording", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/legal", priority: 0.4, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/acceptable-use", priority: 0.3, changeFrequency: "yearly" },
    { path: "/ai-disclosure", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
    { path: "/grievance-redressal", priority: 0.3, changeFrequency: "yearly" },
    { path: "/data-processing-addendum", priority: 0.3, changeFrequency: "yearly" },
    { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/telecom-compliance", priority: 0.3, changeFrequency: "yearly" },
    { path: "/sub-processors", priority: 0.3, changeFrequency: "yearly" },
    { path: "/sla", priority: 0.3, changeFrequency: "yearly" },
  ]

  const blogSlugs = await getAllBlogSlugs()

  return [
    ...staticRoutes.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...INDUSTRIES.map((i) => ({
      url: `${BASE}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
