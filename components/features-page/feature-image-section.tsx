"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    image: "/avatars/amit.jpg",
    name: "Amit Shah",
    role: "Founder, Shah Real Estate",
    quote: "A buyer enquired at 11 PM on a Sunday and still got a site visit booked before we opened Monday morning.",
  },
  {
    image: "/avatars/priya.jpg",
    name: "Priya Nair",
    role: "Founder, on 9278.io since day one",
    quote: "We went live on 9278.io the same afternoon we signed up. Every caller hears the same warm greeting, every single time.",
  },
  {
    image: "/avatars/rahul.jpg",
    name: "Rahul Mehta",
    role: "CX Manager, running agents on 9278.io",
    quote: "Call volume doubled during our festive sale and 9278.io didn't blink — every line picked up on the first ring.",
  },
  {
    image: "/avatars/sneha.avif",
    name: "Sneha Iyer",
    role: "Founder, built her setup on 9278.io",
    quote: "9278.io handles renewals and no-show follow-ups that used to eat our mornings. We're back on the floor with members instead.",
  },
]

type Slide = { quote: string; name: string; role: string }

type FeatureImageSectionProps = {
  testimonial?: 0 | 1 | 2 | 3
  quote?: string
  name?: string
  role?: string
  /** Pass 2+ slides to auto-cycle the quote instead of showing a single fixed one. */
  slides?: Slide[]
}

const CYCLE_MS = 4200

// Shared "trusted by real businesses" slot sitting between the capabilities
// breakdown and the closing PricingCta on every /features/* inner page.
// Pass `slides` for a page-specific rotating set of quotes about 9278.io, or
// `quote`/`name`/`role` for a single fixed override, or `testimonial` (0-3)
// to fall back to the shared pool. The fanned card pattern never shows a photo.
export function FeatureImageSection({ testimonial = 0, quote, name, role, slides }: FeatureImageSectionProps) {
  const fallback = TESTIMONIALS[testimonial]
  const items: Slide[] =
    slides && slides.length > 0
      ? slides
      : [
          {
            quote: quote ?? fallback.quote,
            name: name ?? fallback.name,
            role: role ?? fallback.role,
          },
        ]

  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || items.length < 2) return
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused, items.length])

  const current = items[active % items.length]

  return (
    <section className="w-full bg-background px-6 py-14 md:px-8 md:py-20">
      <div
        className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left — fanned 3-card stack pattern, no photo content. All three
            share the same top edge (no vertical stagger) so the canvas stays
            evenly balanced — only horizontal offset + scale distinguish the sides. */}
        <div className="relative mx-auto h-[340px] w-[436px] shrink-0">
          <div
            aria-hidden
            className="absolute left-0 top-0 h-[340px] w-[340px] rounded-[20px]"
            style={{
              zIndex: 2,
              transform: "translateX(0) scale(0.85)",
              background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
              boxShadow: "0 20px 40px -18px rgba(11,18,32,0.3)",
            }}
          />
          <div
            aria-hidden
            className="absolute left-0 top-0 h-[340px] w-[340px] rounded-[20px]"
            style={{
              zIndex: 3,
              transform: "translateX(48px) scale(1)",
              background: "linear-gradient(135deg, #2563EB0F, #10B9810F)",
              border: "1px solid #E4ECFF",
              boxShadow: "0 20px 40px -18px rgba(11,18,32,0.3)",
            }}
          />
          <div
            aria-hidden
            className="absolute left-0 top-0 h-[340px] w-[340px] rounded-[20px]"
            style={{
              zIndex: 2,
              transform: "translateX(96px) scale(0.85)",
              background: "linear-gradient(135deg, #F1F5F9, #E2E8F0)",
              boxShadow: "0 20px 40px -18px rgba(11,18,32,0.3)",
            }}
          />
        </div>

        {/* Right — quote, cycling when multiple slides are given */}
        <div className="min-w-0 flex-1 text-center md:text-left">
          <Quote className="mx-auto size-8 text-primary/25 md:mx-0" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">"{current.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-foreground">{current.name}</p>
              <p className="text-sm text-muted-foreground">{current.role}</p>
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="mt-6 flex justify-center gap-1.5 md:justify-start">
              {items.map((s, i) => (
                <button
                  key={s.name + i}
                  type="button"
                  aria-label={`Show ${s.name}'s quote`}
                  onClick={() => setActive(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === active ? 18 : 6, backgroundColor: i === active ? "var(--primary)" : "#E4ECFF" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
