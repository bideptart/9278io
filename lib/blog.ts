import { promises as fs } from "fs"
import path from "path"

export type BlogPostSummary = {
  slug: string
  title: string
  description: string
  category: string
  publishedAt: string
  /** Raw ISO timestamp behind `publishedAt`, kept for chronological sorting. */
  publishedIso: string
  readTime: string
  /** Inner HTML of the post's hero figure (an <img> or inline <svg>). */
  heroHtml: string
}

export type BlogFaqItem = {
  q: string
  a: string
}

export type BlogPost = BlogPostSummary & {
  lead: string
  articleHtml: string
  faqItems: BlogFaqItem[]
}

const BLOG_PUBLIC_ROUTE_PREFIX = "/blog-content"
const BLOG_DIR_CANDIDATES = [
  path.join(process.cwd(), "public", "blog-content"),
  path.join(process.cwd(), "..", "public", "blog-content"),
  path.join(process.cwd(), "..", "..", "public", "blog-content"),
] as const

let cachedBlogDir: string | null | undefined

async function resolveBlogDir() {
  if (cachedBlogDir !== undefined) return cachedBlogDir

  for (const dir of BLOG_DIR_CANDIDATES) {
    try {
      await fs.access(dir)
      cachedBlogDir = dir
      return dir
    } catch {
    }
  }

  cachedBlogDir = null
  return null
}

const FALLBACK_SLUGS = [
  "24-7-ai-receptionist-guide",
  "ai-answering-service",
  "ai-appointment-booking-setup",
  "ai-calling-agent-cost-india",
  "ai-calling-software",
  "ai-customer-support",
  "ai-ivr-explained",
  "ai-phone-answering-service",
  "ai-powered-chatbot",
  "ai-receptionist",
  "ai-receptionist-gyms-guide",
  "ai-receptionist-hospitals-clinics",
  "ai-receptionist-hotels-guide",
  "ai-receptionist-india",
  "ai-receptionist-real-estate",
  "ai-receptionist-restaurants-qsr",
  "ai-receptionist-software-guide",
  "ai-receptionist-vs-digital-receptionist",
  "ai-virtual-assistant",
  "ai-voice-agent-bfsi",
  "ai-voice-agent-real-estate",
  "ai-voice-agent-vs-human",
  "ai-voice-agent-vs-voice-bot",
  "ai-voice-receptionist-guide",
  "best-ai-voice-agents-india",
  "business-call-automation-setup",
  "business-phone-answering-service",
  "conversational-ai-platform",
  "customer-service-automation",
  "hindi-ai-voice-agent",
  "how-to-build-an-ai-voice-agent",
  "multilingual-ai-receptionist-guide",
  "smart-chatbot",
  "speech-to-text",
  "text-to-speech",
  "trai-compliant-ai-cold-calling",
  "trai-rules-business-calls",
  "virtual-receptionist",
  "voice-ai-business-guide",
  "what-is-an-ai-voice-agent",
] as const

function decodeHtmlEntities(input: string) {
  return input.replace(/&(#(\d+)|#x([\da-fA-F]+)|[a-zA-Z]+);/g, (m, token, dec, hex) => {
    if (dec) return String.fromCodePoint(Number.parseInt(dec, 10))
    if (hex) return String.fromCodePoint(Number.parseInt(hex, 16))
    const named: Record<string, string> = {
      amp: "&",
      lt: "<",
      gt: ">",
      quot: "\"",
      apos: "'",
      nbsp: " ",
    }
    return named[token] ?? m
  })
}

function extractFirst(text: string, pattern: RegExp) {
  const match = pattern.exec(text)
  return match?.[1] ?? ""
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function formatPublishedDate(iso: string) {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

function resolveSiteBaseUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  if (fromEnv) return fromEnv
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`
  const port = process.env.PORT?.trim()
  if (port) return `http://127.0.0.1:${port}`
  return "http://127.0.0.1:3000"
}

async function readHtmlFile(slug: string) {
  try {
    const blogDir = await resolveBlogDir()
    if (!blogDir) throw new Error("Missing blog-content directory")
    const filePath = path.join(blogDir, `${slug}.html`)
    return await fs.readFile(filePath, "utf8")
  } catch {
    const baseUrl = resolveSiteBaseUrl()
    const url = `${baseUrl}${BLOG_PUBLIC_ROUTE_PREFIX}/${slug}.html`
    const res = await fetch(url, { cache: "force-cache" })
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`)
    return res.text()
  }
}

function stripTags(value: string) {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, "")).trim()
}

/** Pulls {q, a} pairs out of the article's `<section class="faq">` block (each
 * a `<details><summary>Q</summary><p>A</p></details>` row) and strips that
 * section out of the returned HTML, so the caller can render the same
 * questions through the real FaqAccordion component instead of the static
 * markup — matching the accordion used on the homepage and /faq page. */
function extractFaq(html: string) {
  const faqSectionMatch = /<section\s+class="faq">([\s\S]*?)<\/section>/i.exec(html)
  if (!faqSectionMatch) return { faqItems: [] as BlogFaqItem[], html }

  const faqSection = faqSectionMatch[0]
  const rowPattern = /<details>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi
  const faqItems: BlogFaqItem[] = []
  let rowMatch: RegExpExecArray | null
  while ((rowMatch = rowPattern.exec(faqSection))) {
    const q = stripTags(rowMatch[1])
    const a = stripTags(rowMatch[2])
    if (q && a) faqItems.push({ q, a })
  }

  return { faqItems, html: html.replace(faqSectionMatch[0], "") }
}

function parseBlogHtml(slug: string, html: string): BlogPost {
  const title = decodeHtmlEntities(extractFirst(html, /<title>([\s\S]*?)<\/title>/i)).trim()
  const description = decodeHtmlEntities(extractFirst(html, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i)).trim()
  const publishedIso = extractFirst(html, /<meta\s+property="article:published_time"\s+content="([^"]+)"\s*\/?>/i).trim()
  const publishedAt = publishedIso ? formatPublishedDate(publishedIso) : ""

  const categoryRaw = decodeHtmlEntities(extractFirst(html, /<span\s+class="tag">([\s\S]*?)<\/span>/i)).trim()
  const category = categoryRaw || "Blog"

  const metaLine = decodeHtmlEntities(extractFirst(html, /<div\s+class="meta">([\s\S]*?)<\/div>/i)).trim()
  const readTime = extractFirst(metaLine, /(\d+\s*min read)/i) || ""

  const lead = decodeHtmlEntities(extractFirst(html, /<p\s+class="lead">([\s\S]*?)<\/p>/i)).trim()
  const heroHtml = extractFirst(html, /<figure\s+class="post-hero">([\s\S]*?)<\/figure>/i).trim()
  const rawArticleHtml = extractFirst(html, /<article>([\s\S]*?)<\/article>/i).trim()
  const { faqItems, html: articleHtml } = extractFaq(rawArticleHtml)

  return {
    slug,
    title: title || slug,
    description: description || lead || "",
    category,
    publishedAt: publishedAt || "",
    publishedIso: publishedIso || "",
    readTime: readTime || "",
    lead,
    heroHtml,
    articleHtml,
    faqItems,
  }
}

export async function getAllBlogSlugs() {
  try {
    const blogDir = await resolveBlogDir()
    if (!blogDir) throw new Error("Missing blog-content directory")
    const files = await fs.readdir(blogDir)
    const slugs = files
      .filter((f) => f.toLowerCase().endsWith(".html"))
      .map((f) => f.replace(/\.html$/i, ""))
      .sort((a, b) => a.localeCompare(b))
    return slugs.length ? slugs : [...FALLBACK_SLUGS]
  } catch {
    return [...FALLBACK_SLUGS]
  }
}

export async function getAllBlogPostSummaries(): Promise<BlogPostSummary[]> {
  const slugs = await getAllBlogSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const html = await readHtmlFile(slug)
      const parsed = parseBlogHtml(slug, html)
      return {
        slug: parsed.slug,
        title: normalizeWhitespace(parsed.title),
        description: normalizeWhitespace(parsed.description),
        category: normalizeWhitespace(parsed.category),
        publishedAt: normalizeWhitespace(parsed.publishedAt),
        publishedIso: parsed.publishedIso,
        readTime: normalizeWhitespace(parsed.readTime),
        heroHtml: parsed.heroHtml,
      }
    }),
  )

  // Newest first by actual publish date — not by slug, which sorted
  // alphabetically and had nothing to do with recency (it was picking an
  // arbitrary post as "Featured" and showing a stale "Last updated" date
  // on /blog). Posts without a parseable date fall back to the end via
  // Number.NEGATIVE_INFINITY rather than breaking the sort.
  return posts.sort((a, b) => {
    const aTime = a.publishedIso ? Date.parse(a.publishedIso) : Number.NEGATIVE_INFINITY
    const bTime = b.publishedIso ? Date.parse(b.publishedIso) : Number.NEGATIVE_INFINITY
    return bTime - aTime
  })
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const html = await readHtmlFile(slug)
    return parseBlogHtml(slug, html)
  } catch {
    return null
  }
}
