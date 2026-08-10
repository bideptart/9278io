"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { IndustryImage } from "@/components/industries/industry-image"
import { INDUSTRIES } from "@/lib/industries"

/**
 * Sticky-scroll reveal: text details scroll on the left, the visual panel
 * stays pinned on the right. Whichever block crosses the viewport's
 * vertical center becomes "active" and animates the sticky panel to match
 * (IntersectionObserver-driven — no scroll-position math).
 */
export function IndustryStickyScroll() {
  const [active, setActive] = useState(0)
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index)
            setActive(idx)
          }
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )
    blockRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const ind = INDUSTRIES[active]

  return (
    <>
      {/* ── Mobile: horizontal snap-scroll cards, each with its own image ── */}
      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
        {INDUSTRIES.map((i, n) => {
          const ItemIcon = i.icon
          return (
            <div
              key={i.slug}
              className="flex w-[78%] shrink-0 snap-center flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <ItemIcon className="size-4 text-muted-foreground" aria-hidden />
              </div>
              <div className="relative mt-2.5 h-36 shrink-0 overflow-hidden rounded-2xl bg-slate-50">
                <IndustryImage slug={i.slug} name={i.name} />
              </div>
              <h3 className="mt-3 text-balance font-serif text-base font-semibold tracking-tight text-foreground">
                AI voice agents for {i.name.toLowerCase()}
              </h3>
              <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{i.short}</p>
              <Link
                href={`/industries/${i.slug}`}
                className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-primary hover:underline"
              >
                See full playbook <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          )
        })}
      </div>

      {/* ── Desktop: sticky-scroll panel ── */}
      <div className="mx-auto hidden max-w-4xl gap-5 md:grid md:grid-cols-2 md:gap-6">
      {/* ── Left: the scrollable list that drives the panel ── */}
      <div className="space-y-4 md:order-1">
        {INDUSTRIES.map((i, n) => {
          const ItemIcon = i.icon
          const isActive = n === active
          return (
            <div
              key={i.slug}
              ref={(el) => {
                blockRefs.current[n] = el
              }}
              data-index={n}
              className={`rounded-2xl border p-5 transition-all duration-300 ${
                isActive
                  ? "border-primary/30 bg-primary/[0.03] shadow-md shadow-primary/5"
                  : "border-slate-200 bg-white opacity-60"
              }`}
            >
              <span
                className={`grid size-8 place-items-center rounded-xl transition-colors duration-300 ${
                  isActive ? "bg-primary text-white" : "bg-primary/10 text-primary"
                }`}
              >
                <ItemIcon className="size-4" aria-hidden />
              </span>

              <h3 className="mt-3 text-balance font-serif text-lg font-semibold tracking-tight text-foreground">
                AI voice agents for {i.name.toLowerCase()}
              </h3>
              <span aria-hidden className="mt-2 block h-0.5 w-8 rounded-full bg-primary" />

              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                What the agent does
              </p>

              <ol className="mt-2.5 space-y-2.5">
                {i.jobs.slice(0, 3).map((job, j) => (
                  <li key={job} className="flex items-start gap-2.5 border-b border-slate-100 pb-2.5 last:border-0">
                    <span className="grid size-5 shrink-0 place-items-center rounded-md bg-primary text-[10px] font-bold text-white">
                      {j + 1}
                    </span>
                    <p className="flex-1 text-pretty text-xs leading-relaxed text-foreground/90">{job}</p>
                  </li>
                ))}
              </ol>

              <Link
                href={`/industries/${i.slug}`}
                className="mt-3 inline-flex w-fit items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                See full playbook <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          )
        })}
      </div>

      {/* ── Right: sticky visual panel, animates in as the active block changes ── */}
      <div className="md:sticky md:top-28 md:h-fit md:order-2">
        <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-50 shadow-xl shadow-slate-900/25 md:min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={ind.slug}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <IndustryImage slug={ind.slug} name={ind.name} objectFit="contain" scale={1.06} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </>
  )
}
