"use client"

import { useLayoutEffect, useRef } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { INDUSTRIES } from "@/lib/industries"

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
      // Pin-and-stack effect only makes sense with a full viewport of scroll
      // room per card — on mobile it just leaves blank gaps, so it's desktop-only.
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", () => {
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
      })

      // Mobile gets the same pin-and-swap effect, just with a shorter
      // per-card scroll distance so it doesn't leave big blank gaps.
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".industry-stack-card")
        const face = gsap.utils.toArray<HTMLElement>(".industry-stack-face")

        cards.forEach((card, i) => {
          const isLast = i === cards.length - 1
          if (isLast) return // last card just scrolls in normally, ending the stack

          ScrollTrigger.create({
            trigger: card,
            start: `top top+=${60 + i * 8}`,
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
              end: `top top+=${60 + (i + 1) * 8}`,
              scrub: true,
            },
          })
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
        const firstCap = ind.caps[0]

        return (
          <div
            key={ind.slug}
            className="industry-stack-card flex min-h-[58vh] items-start justify-center px-6 md:min-h-screen md:px-0 lg:pt-8"
          >
            <Link
              href={`/industries/${ind.slug}`}
              className="industry-stack-face group relative mx-auto flex min-h-[280px] w-full max-w-lg origin-top flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-900/10 transition-shadow duration-300 hover:shadow-primary/20 sm:p-8"
            >
              <div className="relative flex items-start justify-between">
                <span className={`text-xs font-bold uppercase tracking-[0.2em] ${accent}`}>
                  Stack &middot; {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl border shadow-sm ${tile} ${accent}`}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
              </div>

              <h3 className="relative mt-5 font-serif text-2xl font-semibold tracking-tight text-foreground">
                {ind.name}
              </h3>
              <p className="relative mt-3 text-pretty leading-relaxed text-muted-foreground">{ind.short}</p>

              {firstCap && (
                <>
                  <span aria-hidden className="relative mt-6 block h-px w-full bg-slate-100" />
                  <span className={`relative mt-5 inline-flex w-fit items-center gap-2 text-sm font-medium ${accent}`}>
                    <Check className="size-4 shrink-0 rounded-full border border-current p-0.5" aria-hidden />
                    {firstCap}
                  </span>
                </>
              )}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
