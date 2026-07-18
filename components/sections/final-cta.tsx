import Link from "next/link"
import { PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

export function FinalCta() {
  return (
    <section className="w-full px-6 py-16 text-center md:px-8 md:py-20">
      <ScrollReveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
          Get Started
        </span>
        <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Ready to put this to work?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
          Build your first agent free, or hear it answer a real call right now.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full font-semibold">
            <Link href="/get-started">Build your first agent</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full font-semibold">
            <a href="#demo-audio">
              <PhoneCall className="mr-2 h-4 w-4" />
              Try live demo
            </a>
          </Button>
        </div>
      </ScrollReveal>
    </section>
  )
}
