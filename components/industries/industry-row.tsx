import { existsSync } from "node:fs"
import path from "node:path"
import Link from "next/link"
import { Check, Quote, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { getIndustry, CAP_COLORS } from "@/lib/industries"

/**
 * Returns the public URL of an industry's image if a file exists at
 * public/industries/<slug>.<ext>, otherwise null. Drop a file named after
 * an industry's slug to make ONLY that row show an image.
 */
function industryImageSrc(slug: string): string | null {
  for (const ext of ["png", "jpg", "jpeg", "webp"]) {
    const rel = `industries/${slug}.${ext}`
    if (existsSync(path.join(process.cwd(), "public", rel))) return `/${rel}`
  }
  return null
}

export function IndustryRow({ slug, reverse }: { slug: string; reverse?: boolean }) {
  const industry = getIndustry(slug)
  if (!industry) return null
  const Icon = industry.icon
  const imageSrc = industryImageSrc(slug)
  return (
    <ScrollReveal>
      <div
        id={industry.slug}
        className="group relative scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-9"
      >
        {/* ── Part 1: Header ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="md:max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/25">
                <Icon className="size-6" aria-hidden />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{industry.name}</p>
            </div>
            <h2 className="mt-5 text-balance font-serif text-2xl font-semibold tracking-tight md:text-[1.75rem] md:leading-snug">
              <Link href={`/industries/${industry.slug}`} className="transition-colors hover:text-primary">
                {industry.short}
              </Link>
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              {industry.pitch}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {industry.caps.map((cap) => (
                <span
                  key={cap}
                  className={cn("rounded-full border px-2.5 py-0.5 text-[11px] font-medium", CAP_COLORS[cap])}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Image (only industries that have one) + CTAs */}
          <div className="w-full shrink-0 space-y-3 md:w-60">
            {imageSrc && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/[0.03]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={`${industry.name} — how the AI voice agent works`}
                  className="h-full w-full bg-white object-contain"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex gap-2">
              <Link
                href={`/get-started?industry=${industry.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40"
              >
                Launch agent
              </Link>
              <Link
                href={`/industries/${industry.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border/70 px-4 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                Full playbook
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* ── Parts 2 & 3: two side-by-side panels (order flips per row) ── */}
        <div
          className={cn(
            "grid gap-5 md:grid-cols-2 md:gap-6",
            reverse && "md:[&>*:first-child]:order-2",
          )}
        >
          {/* Part 2: Day-one jobs */}
          <section className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-5 md:p-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span aria-hidden className="h-3.5 w-1 rounded-full bg-primary" />
              What the agent does on day one
            </p>
            <ul className="mt-4 space-y-2.5">
              {industry.jobs.map((job) => (
                <li key={job} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-4 flex-none place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/90">{job}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Part 3: Live conversation */}
          <section className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm md:p-6">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Quote className="size-3.5 text-primary" aria-hidden />
              How it sounds on the call
            </p>
            <div className="mt-4 space-y-2">
              {industry.conversation.map((line, i) => (
                <div
                  key={i}
                  className={cn("flex text-xs", line.speaker === "Agent" ? "justify-start" : "justify-end")}
                >
                  {line.speaker === "Agent" ? (
                    <span className="max-w-[88%] rounded-2xl rounded-bl-sm bg-primary/15 px-3.5 py-2 leading-relaxed text-primary ring-1 ring-primary/20">
                      <span className="mr-1 text-[9px] font-bold opacity-60">Agent</span>
                      {line.text}
                    </span>
                  ) : (
                    <span className="max-w-[88%] rounded-2xl rounded-br-sm bg-slate-50 px-3.5 py-2 leading-relaxed text-slate-700 ring-1 ring-slate-200">
                      <span className="mr-1 text-[9px] font-bold opacity-40">Caller</span>
                      {line.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Part 4: Real phrases it handles ── */}
        <section className="mt-5 rounded-2xl border border-primary/15 bg-primary/[0.03] p-5 md:mt-6 md:p-6">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span aria-hidden className="h-3.5 w-1 rounded-full bg-primary" />
            Real phrases it handles
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {industry.sampleLines.map((line, i) => (
              <li
                key={i}
                className="relative rounded-xl border border-slate-200/70 bg-white p-3.5 text-[13px] leading-relaxed text-foreground/80 shadow-sm"
              >
                <Quote className="mb-1.5 size-3.5 text-primary/50" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ScrollReveal>
  )
}
