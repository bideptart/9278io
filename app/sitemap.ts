import type { MetadataRoute } from "next"
import { INDUSTRIES } from "@/lib/industries"
import { SITE } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/industries", priority: 0.9, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/get-started", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    { path: "/legal", priority: 0.4, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/acceptable-use", priority: 0.3, changeFrequency: "yearly" },
    { path: "/ai-disclosure", priority: 0.3, changeFrequency: "yearly" },
    { path: "/call-recording", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
    { path: "/grievance-redressal", priority: 0.3, changeFrequency: "yearly" },
    { path: "/data-processing-addendum", priority: 0.3, changeFrequency: "yearly" },
    { path: "/refund-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/telecom-compliance", priority: 0.3, changeFrequency: "yearly" },
    { path: "/sub-processors", priority: 0.3, changeFrequency: "yearly" },
    { path: "/sla", priority: 0.3, changeFrequency: "yearly" },
  ]

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...INDUSTRIES.map((i) => ({
      url: `${SITE.url}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
