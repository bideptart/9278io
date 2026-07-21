import Link from "next/link"
import { LayoutGrid, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

export function FinalCta() {
  return (
    <section className="w-full px-6 pb-16 pt-4 md:px-8 md:pb-20 md:pt-6">
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[oklch(0.64_0.19_245)] via-primary to-[oklch(0.45_0.19_264)] px-8 py-12 shadow-[0_40px_100px_-40px_oklch(0.52_0.22_265/0.6)] md:px-14 md:py-14">
          {/* faint grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse at center, black 55%, transparent 100%)",
            }}
          />
          {/* soft glows */}
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-white/15 blur-[90px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-16 size-80 rounded-full bg-[oklch(0.7_0.15_210/0.35)] blur-[100px]" />
          {/* decorative sparkle */}
          <Sparkles aria-hidden className="pointer-events-none absolute -right-6 bottom-2 size-48 text-white/[0.06]" strokeWidth={1} />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
            {/* Left: copy */}
            <div className="max-w-xl">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to put this to work?
              </h2>
              <div className="mt-4 h-px w-12 bg-white/40" aria-hidden />
              <p className="mt-4 text-pretty text-base leading-relaxed text-white/85">
                Build your first agent free, or hear it answer a real call right now — in 10+ Indian languages,
                around the clock.
              </p>
            </div>

            {/* Right: actions */}
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-white px-8 text-base font-semibold text-primary shadow-[0_10px_30px_oklch(0.2_0.1_262/0.35)] transition-all hover:bg-white/90"
              >
                <Link href="/get-started">
                  Build your first agent
                  <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/40 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur hover:border-white/60 hover:bg-white/20 hover:text-white"
              >
                <Link href="/features">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Features
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
