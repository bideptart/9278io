import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { pageSeo } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/jsonld"

export const metadata: Metadata = pageSeo({
  title: "Blog — 9278.io",
  description: "Insights on AI voice agents, Indian languages, TRAI compliance, and automating phone calls.",
  path: "/blog",
})

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: "Article", path: `/blog/${params.slug}` },
        ]}
      />

      <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-24">
        <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            Back to blog
          </Link>
        </Button>

        <div className="rounded-2xl border border-border bg-card/50 p-8 text-center md:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Coming soon</p>
          <h1 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            This article is being published soon.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            We&apos;re working on in-depth guides about AI voice agents, Indian language support, TRAI compliance, and
            automation case studies for Indian businesses.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/blog">Browse all posts</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/get-started">Try 9278.io free</Link>
            </Button>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
