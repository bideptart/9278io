import { promises as fs } from "fs"
import path from "path"

export type BlogPostSummary = {
  slug: string
  title: string
  description: string
  category: string
  publishedAt: string
  readTime: string
}

export type BlogPost = BlogPostSummary & {
  lead: string
  heroHtml: string
  articleHtml: string
}

const BLOG_DIR = path.join(process.cwd(), "public", "blog-content")

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

async function readHtmlFile(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.html`)
  return fs.readFile(filePath, "utf8")
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
  const articleHtml = extractFirst(html, /<article>([\s\S]*?)<\/article>/i).trim()

  return {
    slug,
    title: title || slug,
    description: description || lead || "",
    category,
    publishedAt: publishedAt || "",
    readTime: readTime || "",
    lead,
    heroHtml,
    articleHtml,
  }
}

export async function getAllBlogSlugs() {
  const files = await fs.readdir(BLOG_DIR)
  return files
    .filter((f) => f.toLowerCase().endsWith(".html"))
    .map((f) => f.replace(/\.html$/i, ""))
    .sort((a, b) => a.localeCompare(b))
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
        readTime: normalizeWhitespace(parsed.readTime),
      }
    }),
  )

  return posts.sort((a, b) => b.slug.localeCompare(a.slug))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const html = await readHtmlFile(slug)
    return parseBlogHtml(slug, html)
  } catch {
    return null
  }
}
