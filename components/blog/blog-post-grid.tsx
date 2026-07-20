"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { sanitizeHtml } from "@/lib/sanitize"
import { useBlogSearch } from "./blog-search-context"
import type { BlogPostSummary } from "@/lib/blog"

const categoryColors: Record<string, string> = {
  "Use Cases": "border-primary/20 bg-primary/[0.08] text-primary",
  Guides: "border-primary/20 bg-primary/[0.08] text-primary",
  Compliance: "border-amber-500/25 bg-amber-500/10 text-amber-600",
  Pricing: "border-amber-500/25 bg-amber-500/10 text-amber-600",
  Industry: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600",
}

function catClass(category: string) {
  return categoryColors[category] ?? "border-border bg-slate-50 text-muted-foreground"
}

export function BlogPostGrid({ posts }: { posts: BlogPostSummary[] }) {
  const { query } = useBlogSearch()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q),
    )
  }, [query, posts])

  return (
    <div id="articles" className="scroll-mt-24">
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No articles match &quot;{query}&quot;.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.04} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                <div
                  className="overflow-hidden border-b border-border bg-gradient-to-br from-slate-50 to-white [&_img]:!block [&_img]:aspect-[16/9] [&_img]:!w-full [&_img]:object-cover [&_img]:!rounded-none [&_svg]:block [&_svg]:aspect-[16/9] [&_svg]:w-full"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(post.heroHtml.replace(/<img /g, '<img loading="lazy" decoding="async" ')),
                  }}
                />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${catClass(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.publishedAt}</span>
                  </div>

                  <div className="mt-4 flex-1">
                    <h2 className="text-base font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <span>{post.readTime}</span>
                    <ArrowRight className="size-3.5 text-primary transition-transform group-hover:translate-x-1" aria-hidden />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
