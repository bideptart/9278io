import Link from "next/link"
import { ArrowRight } from "lucide-react"

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
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 id="related-heading" className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
      </div>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-primary bg-primary p-5 transition-all duration-300 hover:border-border hover:bg-white hover:shadow-md"
            >
              <div>
                <p className="text-base font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-foreground">
                  {l.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-muted-foreground">
                  {l.description}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs text-white transition-colors duration-300 group-hover:text-primary">
                Read more
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
