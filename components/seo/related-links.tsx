import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { MouseGlowCard } from "@/components/animation/mouse-glow-card"
import { StaggerGroup, StaggerItem } from "@/components/animation/stagger"

export type RelatedLink = {
  href: string
  title: string
  description: string
}

/**
 * Site-wide internal-linking module. Each landing page renders one of these
 * to push link equity to siblings (industries → pricing → FAQ → get-started).
 *
 * Cards stagger in on scroll, then track the cursor with a 3D tilt + soft
 * spotlight (MouseGlowCard, reused as-is from the pricing/features cards).
 */
export function RelatedLinks({
  heading = "Keep exploring 9278.io",
  description = "Related guides, pricing, and use cases curated for the calls you take.",
  links,
}: {
  heading?: string
  description?: string
  links: RelatedLink[]
}) {
  return (
    <section aria-labelledby="related-heading" className="w-full px-6 pb-24 md:px-8">
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-border/60 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Up next</span>
          <h2 id="related-heading" className="mt-2 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
      </div>

      <StaggerGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.1} role="list">
        {links.map((l, i) => (
          <StaggerItem key={l.href} role="listitem">
            <Link href={l.href} className="block h-full">
              <MouseGlowCard className="h-full rounded-2xl bg-card p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-300 group-hover:shadow-[0_24px_48px_-20px_oklch(0.546_0.215_262.88/0.35)]">
                {/* animated conic-gradient border ring, only visible on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    padding: 1,
                    background:
                      "conic-gradient(from var(--angle, 0deg), transparent 0%, oklch(0.546 0.215 262.88 / 0.6) 15%, transparent 30%)",
                    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "spin-border 3s linear infinite",
                  }}
                />

                {/* diagonal sheen sweep on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                >
                  <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:translate-x-[420%] group-hover:opacity-100" />
                </div>

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tracking-wide text-muted-foreground/60 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground ring-1 ring-inset ring-border transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                      <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:rotate-45" aria-hidden />
                    </span>
                  </div>

                  <p className="mt-5 text-base font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                    {l.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.description}</p>

                  <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-foreground">
                    Read more
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </MouseGlowCard>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
