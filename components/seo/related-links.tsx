import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { StaggerGroup, StaggerItem } from "@/components/animation/stagger"

export type RelatedLink = {
  href: string
  title: string
  description: string
}

/**
 * Site-wide internal-linking module. Each landing page renders one of these
 * to push link equity to siblings (industries → pricing → FAQ → get-started).
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
        {links.map((l) => (
          <StaggerItem key={l.href} role="listitem">
            <Link
              href={l.href}
              className="group relative block h-full overflow-hidden rounded-xl border border-l-4 border-slate-200 border-l-primary bg-gradient-to-br from-slate-50/60 to-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* corner ribbon */}
              <span
                aria-hidden
                className="absolute right-0 top-0 h-10 w-10 bg-primary [clip-path:polygon(100%_0,0_0,100%_100%)]"
              />

              {/* dotted decoration */}
              <div aria-hidden className="absolute right-4 top-10 grid grid-cols-4 gap-1 opacity-60">
                {Array.from({ length: 16 }).map((_, d) => (
                  <span key={d} className="size-1 rounded-full bg-slate-300" />
                ))}
              </div>

              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="size-4.5" aria-hidden />
              </span>

              <p className="mt-3 text-balance font-sans text-[15px] font-bold leading-snug tracking-tight text-foreground">
                {l.title}
              </p>
              <span aria-hidden className="mt-2 block h-1 w-7 rounded-full bg-primary" />
              <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-muted-foreground">{l.description}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[12.5px] font-semibold text-primary">Read more</span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="size-3" aria-hidden />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
