import { INDUSTRIES } from "@/lib/industries"
import { SITE } from "@/lib/seo"
import { getAllBlogSlugs } from "@/lib/blog"

// Every <loc> is prefixed with BASE, which MUST always match the canonical www
// host — the same SITE.url (lib/seo.ts) used by robots.ts, metadataBase, and
// every canonical/og:url. Sitemaps must list absolute canonical URLs, never an
// apex or localhost/preview host. In a production build SITE.url is guaranteed
// non-localhost (resolveSiteUrl() throws otherwise); the localhost guard below
// is a dev/test-only safety net so a local build still emits www URLs.
const BASE = /localhost|127\.0\.0\.1/.test(SITE.url) ? "https://www.9278.io" : SITE.url

export const dynamic = "force-static"

type Entry = { loc: string; priority: number; changefreq: string }

const staticRoutes: Entry[] = [
  { loc: "/", priority: 1.0, changefreq: "weekly" },
  { loc: "/pricing", priority: 0.9, changefreq: "weekly" },
  { loc: "/industries", priority: 0.9, changefreq: "monthly" },
  { loc: "/features", priority: 0.8, changefreq: "monthly" },
  { loc: "/blog", priority: 0.8, changefreq: "weekly" },
  { loc: "/get-started", priority: 0.8, changefreq: "monthly" },
  { loc: "/faq", priority: 0.7, changefreq: "monthly" },
  { loc: "/call-recording", priority: 0.6, changefreq: "monthly" },
  { loc: "/about", priority: 0.5, changefreq: "monthly" },
  { loc: "/contact", priority: 0.5, changefreq: "monthly" },
  { loc: "/legal", priority: 0.4, changefreq: "monthly" },
  { loc: "/terms", priority: 0.3, changefreq: "yearly" },
  { loc: "/privacy-policy", priority: 0.3, changefreq: "yearly" },
  { loc: "/acceptable-use", priority: 0.3, changefreq: "yearly" },
  { loc: "/ai-disclosure", priority: 0.3, changefreq: "yearly" },
  { loc: "/cookies", priority: 0.3, changefreq: "yearly" },
  { loc: "/grievance-redressal", priority: 0.3, changefreq: "yearly" },
  { loc: "/data-processing-addendum", priority: 0.3, changefreq: "yearly" },
  { loc: "/refund-policy", priority: 0.3, changefreq: "yearly" },
  { loc: "/telecom-compliance", priority: 0.3, changefreq: "yearly" },
  { loc: "/sub-processors", priority: 0.3, changefreq: "yearly" },
  { loc: "/sla", priority: 0.3, changefreq: "yearly" },
]

export async function GET() {
  const lastmod = new Date().toISOString()
  const blogSlugs = await getAllBlogSlugs()

  const entries: Entry[] = [
    ...staticRoutes,
    ...INDUSTRIES.map((i) => ({ loc: `/industries/${i.slug}`, priority: 0.7, changefreq: "monthly" })),
    ...blogSlugs.map((slug) => ({ loc: `/blog/${slug}`, priority: 0.6, changefreq: "monthly" })),
  ]

  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${BASE}${e.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}
