"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"

export type ScrollCardItem = {
  id: number
  title: string
  description: string
  href: string
  icon: LucideIcon
}

const CARD_W = 300
const CARD_GAP = 20

export function IndustriesScrollCards({
  eyebrow,
  heading,
  description,
  exploreHref,
  items,
}: {
  eyebrow: string
  heading: string
  description: string
  exploreHref: string
  items: ScrollCardItem[]
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  const mobileTrackRef = useRef<HTMLDivElement>(null)
  const [mobileIndex, setMobileIndex] = useState(0)

  function handleMobileScroll() {
    const el = mobileTrackRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const ratio = maxScroll > 0 ? el.scrollLeft / maxScroll : 0
    setMobileIndex(Math.round(ratio * (items.length - 1)))
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const maxShift = (CARD_W + CARD_GAP) * Math.max(0, items.length - 2)
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxShift])

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(items.length - 1, Math.floor(v * items.length))
    setIndex(Math.max(0, i))
  })

  const count = String(items.length).padStart(2, "0")
  const current = String(index + 1).padStart(2, "0")

  return (
    <>
      {/* ── Mobile: static text + horizontal snap-scroll cards, no scroll-jack ── */}
      <div className="pt-10 text-center lg:hidden">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
          {eyebrow}
        </span>
        <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight">{heading}</h2>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">{description}</p>
        <Link
          href={exploreHref}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Explore industries
          <ArrowRight className="size-4" aria-hidden />
        </Link>

        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="-mx-6 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className="flex w-[70%] shrink-0 snap-center flex-col rounded-3xl border border-border bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <div className="mt-2.5 flex h-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50">
                  <Icon className="size-6 text-primary" aria-hidden />
                </div>
                <h3 className="mt-2.5 text-sm font-bold tracking-tight">{item.title}</h3>
                <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold text-foreground hover:text-primary"
                >
                  Learn more
                  <ArrowRight className="size-3" aria-hidden />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="mb-8 mt-4 flex items-center justify-center gap-1.5">
          {items.map((item, i) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === mobileIndex ? "w-5 bg-primary" : "w-1.5 bg-border"
              }`}
              aria-hidden
            />
          ))}
        </div>
      </div>

      {/* ── Desktop: pinned scroll-driven card track ── */}
      <div ref={sectionRef} className="relative hidden lg:block" style={{ height: `${Math.max(180, items.length * 42)}vh` }}>
        <div className="sticky top-20 flex min-h-[72vh] items-center overflow-hidden py-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2">
            {/* Left — text */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden />
                {eyebrow}
              </span>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">{heading}</h2>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">{description}</p>

              <div className="mt-8 flex items-center gap-3">
                <div className="h-1 w-40 overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    animate={{ width: `${((index + 1) / items.length) * 100}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {current} / {count}
                </span>
              </div>

              <Link
                href={exploreHref}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Explore industries
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            {/* Right — sliding card track */}
            <div className="overflow-hidden">
              <motion.div className="flex" style={{ x, gap: CARD_GAP }}>
                {items.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.id}
                      className="flex shrink-0 flex-col rounded-3xl border border-border bg-white p-6 shadow-sm"
                      style={{ width: CARD_W }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Icon className="size-4 text-muted-foreground" aria-hidden />
                      </div>
                      <div className="mt-4 flex h-28 shrink-0 items-center justify-center rounded-2xl bg-slate-50">
                        <Icon className="size-9 text-primary" aria-hidden />
                      </div>
                      <h3 className="mt-4 text-lg font-bold tracking-tight">{item.title}</h3>
                      <p className="mt-1.5 line-clamp-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                      <Link
                        href={item.href}
                        className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-foreground hover:text-primary"
                      >
                        Learn more
                        <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    </div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
