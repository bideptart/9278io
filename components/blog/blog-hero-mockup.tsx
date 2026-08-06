"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { sanitizeHtml } from "@/lib/sanitize"
import type { BlogPostSummary } from "@/lib/blog"

const categoryColors: Record<string, string> = {
  "Use Cases": "border-primary/20 bg-primary/[0.08] text-primary",
  Guides: "border-primary/20 bg-primary/[0.08] text-primary",
  "Voice AI": "border-primary/20 bg-primary/[0.08] text-primary",
  Compliance: "border-amber-500/25 bg-amber-500/10 text-amber-600",
  Pricing: "border-amber-500/25 bg-amber-500/10 text-amber-600",
  Industry: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600",
}

function catClass(category: string) {
  return categoryColors[category] ?? "border-border bg-slate-50 text-muted-foreground"
}

const AUTO_CYCLE_MS = 3500

/**
 * Blog-hero illustration — cycles through up to 3 posts one at a time,
 * each rendered as a real card (image, category, title, read time) rather
 * than a decorative placeholder, so the hero previews actual content.
 */
export function BlogHeroMockup({ posts, className }: { posts: BlogPostSummary[]; className?: string }) {
  const slides = posts.slice(0, 3)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTO_CYCLE_MS)
    return () => clearInterval(id)
  }, [slides.length, index])

  if (slides.length === 0) return null
  const post = slides[index]

  return (
    <div className={cn("mx-auto w-full max-w-sm", className)}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
        <Flame className="size-3.5" aria-hidden />
        Popular reads
      </span>

      <div className="relative mt-4 min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-2xl border-2 border-border bg-white shadow-[0_20px_60px_-15px_oklch(0.4_0.2_262/0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
            >
              <div
                className="overflow-hidden border-b border-border bg-gradient-to-br from-slate-50 to-white [&_img]:!block [&_img]:aspect-[16/9] [&_img]:!w-full [&_img]:object-cover [&_img]:!rounded-none [&_svg]:block [&_svg]:aspect-[16/9] [&_svg]:w-full"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(post.heroHtml.replace(/<img /g, '<img loading="lazy" decoding="async" ')),
                }}
              />

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${catClass(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>

                <h2 className="mt-3 line-clamp-2 text-base font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
                  {post.title}
                </h2>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs font-semibold text-primary">
                  Read article
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
