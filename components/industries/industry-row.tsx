"use client"

import Link from "next/link"
import { Check, Quote, ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { getIndustry, CAP_COLORS } from "@/lib/industries"

export function IndustryRow({ slug, reverse }: { slug: string; reverse?: boolean }) {
  const industry = getIndustry(slug)
  if (!industry) return null
  const Icon = industry.icon
  return (
    <ScrollReveal>
      <motion.div
        id={industry.slug}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="group relative scroll-mt-24 overflow-hidden rounded-3xl border-2 border-border/70 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-primary/30 md:p-8"
      >
        {/* Top shine on hover */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* ── Header ── */}
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="md:flex-1">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl border border-primary/15 bg-primary/[0.07] text-primary">
                <Icon className="size-5" aria-hidden />
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">{industry.name}</p>
            </div>
            <h2 className="mt-4 text-balance text-2xl font-bold tracking-tight md:text-3xl">
              <Link href={`/industries/${industry.slug}`} className="transition-colors hover:text-primary">
                {industry.short}
              </Link>
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
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

          {/* CTAs — stacked on desktop so the header right isn't empty */}
          <div className="flex shrink-0 flex-wrap gap-2 md:w-48 md:flex-col">
            <Link
              href={`/get-started?industry=${industry.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Launch agent
            </Link>
            <Link
              href={`/industries/${industry.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border/70 px-4 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:border-primary/40 hover:text-foreground"
            >
              Full playbook
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-border/60" />

        {/* ── Body: jobs | conversation (order flips per row) ── */}
        <div
          className={cn(
            "grid gap-6 md:grid-cols-2 md:gap-8",
            reverse && "md:[&>*:first-child]:order-2",
          )}
        >
          {/* Day-one jobs */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              What the agent does on day one
            </p>
            <ul className="mt-3.5 space-y-2.5">
              {industry.jobs.map((job) => (
                <li key={job} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid size-4 flex-none place-items-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground/90">{job}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live conversation + sample lines */}
          <div className="rounded-2xl border border-border/60 bg-slate-50/70 p-4 md:p-5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Quote className="size-3.5 text-primary" aria-hidden />
              How it sounds on the call
            </p>

            <div className="mt-3.5 space-y-2">
              {industry.conversation.map((line, i) => (
                <div
                  key={i}
                  className={cn("flex text-xs", line.speaker === "Agent" ? "justify-start" : "justify-end")}
                >
                  {line.speaker === "Agent" ? (
                    <span className="max-w-[88%] rounded-2xl rounded-bl-sm bg-primary/15 px-3 py-1.5 text-primary ring-1 ring-primary/20">
                      <span className="mr-1 text-[9px] font-bold opacity-60">Agent</span>
                      {line.text}
                    </span>
                  ) : (
                    <span className="max-w-[88%] rounded-2xl rounded-br-sm bg-white px-3 py-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200">
                      <span className="mr-1 text-[9px] font-bold opacity-40">Caller</span>
                      {line.text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <ul className="mt-4 space-y-2.5 border-t border-border/50 pt-4">
              {industry.sampleLines.map((line, i) => (
                <li key={i} className="relative pl-3.5 text-[13px] leading-relaxed text-foreground/80">
                  <span className="absolute left-0 top-0.5 h-[calc(100%-0.25rem)] w-px bg-primary/40" aria-hidden />
                  &ldquo;{line}&rdquo;
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}
