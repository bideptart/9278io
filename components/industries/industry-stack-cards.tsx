"use client"

import { useLayoutEffect, useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CAP_COLORS, INDUSTRIES } from "@/lib/industries"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/* Per-industry accent palette. Literal classes so Tailwind's scanner keeps them. */
const ACCENTS = [
  "text-blue-600", "text-violet-600", "text-cyan-600", "text-orange-600", "text-emerald-600",
  "text-purple-600", "text-pink-600", "text-indigo-600", "text-teal-600", "text-rose-600", "text-amber-600",
]
const ACCENT_TILES = [
  "bg-blue-50/80 border-blue-200/70", "bg-violet-50/80 border-violet-200/70", "bg-cyan-50/80 border-cyan-200/70",
  "bg-orange-50/80 border-orange-200/70", "bg-emerald-50/80 border-emerald-200/70", "bg-purple-50/80 border-purple-200/70",
  "bg-pink-50/80 border-pink-200/70", "bg-indigo-50/80 border-indigo-200/70", "bg-teal-50/80 border-teal-200/70",
  "bg-rose-50/80 border-rose-200/70", "bg-amber-50/80 border-amber-200/70",
]

/**
 * Scroll-driven stack of industry cards. Each card pins in place as the
 * next one scrolls up over it (GSAP ScrollTrigger, pinSpacing off) while it
 * scales down and dims slightly — the classic "stacking cards" effect.
 */
export function IndustryStackCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".industry-stack-card")
      const face = gsap.utils.toArray<HTMLElement>(".industry-stack-face")

      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1
        if (isLast) return // last card just scrolls in normally, ending the stack

        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${80 + i * 12}`,
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        })

        // scale down + dim the card as the next one arrives on top of it
        gsap.to(face[i], {
          scale: 0.94,
          opacity: 0.5,
          filter: "blur(1.5px)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: `top top+=${80 + (i + 1) * 12}`,
            scrub: true,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {INDUSTRIES.map((ind, i) => {
        const Icon = ind.icon
        const accent = ACCENTS[i % ACCENTS.length]
        const tile = ACCENT_TILES[i % ACCENT_TILES.length]

        return (
          <div
            key={ind.slug}
            className="industry-stack-card flex min-h-screen items-center justify-center px-6 py-10 md:px-8"
          >
            <Link
              href={`/industries/${ind.slug}`}
              className="industry-stack-face group relative mx-auto flex min-h-[380px] w-full max-w-4xl origin-top flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-900/10 transition-shadow duration-300 hover:shadow-primary/20 sm:p-10 md:min-h-[420px]"
            >
              {/* oversized watermark icon */}
              <Icon
                aria-hidden
                className={`pointer-events-none absolute -bottom-8 -right-6 size-40 opacity-[0.07] transition-transform duration-500 group-hover:scale-110 ${accent}`}
              />

              <div className="relative flex items-start justify-between">
                <span
                  className={`grid size-14 shrink-0 place-items-center rounded-2xl border shadow-sm ${tile} ${accent}`}
                >
                  <Icon className="size-7" aria-hidden />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                  {String(i + 1).padStart(2, "0")} / {String(INDUSTRIES.length).padStart(2, "0")}
                </span>
              </div>

              <div className="relative mt-6">
                <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {ind.name}
                </h3>
                <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">{ind.short}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {ind.caps.map((cap) => (
                    <span
                      key={cap}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${CAP_COLORS[cap]}`}
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <span
                className={`relative mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1 ${accent}`}
              >
                View playbook <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
