"use client"

import { useRef } from "react"
import { HelpCircle } from "lucide-react"
import type { FaqItem } from "@/lib/faq"
import { Marquee } from "@/components/ui/marquee"

/**
 * "Related questions" as an auto-scrolling marquee of cards — every
 * question and its full answer sit on their own card, drifting past
 * continuously and pausing on hover (or touch, on mobile) so it can be
 * read, instead of collapsing behind a click or waiting on manual arrow
 * taps. Uses the site's existing Marquee ticker primitive, edge-faded
 * with a mask so cards drift in and out rather than cutting off hard.
 */
export function FaqCardCarousel({ items }: { items: FaqItem[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  function setPaused(paused: boolean) {
    const tracks = wrapperRef.current?.querySelectorAll<HTMLElement>(".animate-marquee")
    tracks?.forEach((el) => {
      el.style.animationPlayState = paused ? "paused" : "running"
    })
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onTouchCancel={() => setPaused(false)}
    >
      <Marquee pauseOnHover repeat={2} className="[--duration:14s] [--gap:1rem]">
        {items.map((item) => (
          <div
            key={item.q}
            className="w-[280px] shrink-0 rounded-2xl border border-border/60 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <HelpCircle className="size-4" aria-hidden />
            </span>
            <p className="mt-3 text-sm font-semibold tracking-tight text-foreground">{item.q}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
