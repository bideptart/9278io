import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

type GradientCtaProps = {
  heading: string
  description: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
  id?: string
}

export function GradientCta({
  heading,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  id,
}: GradientCtaProps) {
  return (
    <section id={id} className="w-full scroll-mt-24 px-6 py-14 md:px-8 md:py-16">
      <ScrollReveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-500 to-blue-600 px-6 py-12 shadow-2xl shadow-blue-500/30 ring-1 ring-white/10 md:px-14 md:py-14">
        {/* soft radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(255,255,255,0.18),transparent_60%)]"
        />
        {/* fine grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:44px_44px]"
        />

        <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h3 className="text-balance font-serif text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {heading}
            </h3>
            {/* classical accent rule */}
            <div className="mt-5 h-px w-16 bg-white/40" aria-hidden />
            <p className="mt-5 text-pretty leading-relaxed text-white/75 md:text-lg">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-white font-semibold text-blue-600 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-white/90"
            >
              <Link href={primaryHref}>
                {primaryLabel} <ArrowRight className="ml-1 size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/5 text-white backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/15 hover:text-white"
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
