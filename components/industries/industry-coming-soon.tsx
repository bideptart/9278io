import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

/** Minimal placeholder page for an industry vertical that doesn't have a full playbook yet. */
export function IndustryComingSoon({
  name,
  Icon,
  description,
}: {
  name: string
  Icon: LucideIcon
  description: string
}) {
  return (
    <main className="min-h-dvh bg-white text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-primary/[0.06] via-sky-50/40 to-transparent">
        <div className="w-full px-6 py-24 md:px-8 md:py-32">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="size-3.5" aria-hidden />
              Coming soon
            </span>

            <span className="mx-auto mt-6 grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="size-7" aria-hidden />
            </span>

            <h1 className="mt-6 text-balance font-serif text-4xl font-semibold tracking-tight md:text-5xl">
              AI voice agents for <span className="text-primary">{name}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">{description}</p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/get-started">
                  Get started <ArrowRight className="ml-1 size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/industries">Browse all industries</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
