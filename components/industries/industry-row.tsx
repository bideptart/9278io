"use client"

import Link from "next/link"
import { Check, Quote } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"
import { getIndustry, CAP_COLORS } from "@/lib/industries"

export function IndustryRow({ slug, reverse }: { slug: string; reverse?: boolean }) {
  const industry = getIndustry(slug)
  if (!industry) return null
  const Icon = industry.icon
  return (
    <section
      id={industry.slug}
      className="scroll-mt-24 border-b border-border/50 py-20 md:py-28"
    >
      <div className={cn("grid items-start gap-12 md:grid-cols-2 md:gap-16", reverse && "md:[&>*:first-child]:order-2")}>
        <ScrollReveal>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg border border-border/60 bg-white text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">{industry.name}</p>
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            <Link
              href={`/industries/${industry.slug}`}
              className="transition-colors hover:text-primary"
            >
              {industry.short}
            </Link>
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{industry.pitch}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {industry.caps.map((cap) => (
              <span
                key={cap}
                className={cn("rounded-full border px-2.5 py-0.5 text-[11px] font-medium", CAP_COLORS[cap])}
              >
                {cap}
              </span>
            ))}
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            What the agent does on day one
          </p>
          <StaggerGroup className="mt-3 space-y-3">
            {industry.jobs.map((job) => (
              <StaggerItem key={job}>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 flex-none text-primary" aria-hidden />
                  <span className="text-sm leading-relaxed text-foreground/90">{job}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/get-started?industry=${industry.slug}`}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Launch a {industry.name.toLowerCase()} agent
            </Link>
            <Link
              href={`/industries/${industry.slug}`}
              className="inline-flex items-center gap-2 rounded-md border border-border/60 px-4 py-2 text-sm text-foreground/90 transition-colors hover:border-primary/40 hover:text-foreground"
            >
              Read the full {industry.name.toLowerCase()} playbook
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="rounded-2xl border border-border/60 bg-white p-6 md:p-8"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Quote className="size-3.5 text-primary" aria-hidden />
              How it sounds on the call
            </div>

            {/* Live multilingual conversation preview */}
            <div className="mt-5 space-y-2 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                Live agent preview
              </p>
              {industry.conversation.map((line, i) => (
                <div
                  key={i}
                  className={cn("flex text-xs", line.speaker === "Agent" ? "justify-start" : "justify-end")}
                >
                  {line.speaker === "Agent" ? (
                    <span className="max-w-[85%] rounded-2xl rounded-bl-sm bg-primary/15 px-3 py-1.5 text-primary ring-1 ring-primary/20">
                      <span className="mr-1 text-[9px] font-bold opacity-60">Agent</span>
                      {line.text}
                    </span>
                  ) : (
                    <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-white px-3 py-1.5 text-slate-700 shadow-sm ring-1 ring-slate-200">
                      <span className="mr-1 text-[9px] font-bold opacity-40">Caller</span>
                      {line.text}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <ul className="mt-5 space-y-5">
              {industry.sampleLines.map((line, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: reverse ? 12 : -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-4"
                >
                  <span className="absolute left-0 top-0 h-full w-px bg-primary/40" aria-hidden />
                  <p className="text-pretty text-sm leading-relaxed text-foreground/90">&ldquo;{line}&rdquo;</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
