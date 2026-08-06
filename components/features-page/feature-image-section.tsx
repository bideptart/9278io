"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

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

type Slide = { quote: string; name: string; role: string; image?: string }

type FeatureImageSectionProps = {
  testimonial?: 0 | 1 | 2 | 3
  quote?: string
  name?: string
  role?: string
  /** Pass 2+ slides to auto-cycle the quote instead of showing a single fixed one. */
  slides?: Slide[]
  /**
   * "testimonial" (default) shows a customer quote with quotation marks.
   * "feature" shows a plain capability callout instead — `role` as a small
   * eyebrow label, `name` as a bold title, `quote` as the description —
   * no quotation marks, no customer attribution.
   */
  mode?: "testimonial" | "feature"
}

const CYCLE_MS = 3500

// Shared "trusted by real businesses" slot sitting between the capabilities
// breakdown and the closing PricingCta on every /features/* inner page.
// Pass `slides` for a page-specific rotating set of quotes about 9278.io, or
// `quote`/`name`/`role` for a single fixed override, or `testimonial` (0-3)
// to fall back to the shared pool. The fanned card pattern never shows a photo.
export function FeatureImageSection({ testimonial = 0, quote, name, role, slides, mode = "testimonial" }: FeatureImageSectionProps) {
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

  const total = items.length
  const current = items[active % total]
  const prevItem = items[(active - 1 + total) % total]
  const nextItem = items[(active + 1) % total]

  return (
    <section className="w-full bg-background px-6 py-14 md:px-8 md:py-20">
      <div
        className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:gap-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left — fanned 3-card stack pattern. Cards show the real per-slide
            image when provided, falling back to the plain gradient tile
            otherwise. All three share the same top edge (no vertical
            stagger) — only horizontal offset + scale distinguish the sides. */}
        <div className="relative mx-auto h-[230px] w-[295px] max-w-full shrink-0 sm:h-[300px] sm:w-[385px] md:h-[340px] md:w-[436px]">
          <motion.div
            aria-hidden
            key={`prev-${active}`}
            className="absolute left-0 top-0 size-[230px] overflow-hidden rounded-[20px] sm:size-[300px] md:size-[340px]"
            style={{
              zIndex: 2,
              transform: "translateX(0%) scale(0.85)",
              background: "#F8FBFF",
              boxShadow: "0 20px 40px -18px rgba(11,18,32,0.3)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.35, 1] }}
          >
            {prevItem.image && (
              <img src={prevItem.image} alt="" className="size-full object-contain" style={{ filter: "blur(3px)" }} />
            )}
          </motion.div>
          <motion.div
            className="absolute left-0 top-0 size-[230px] overflow-hidden rounded-[20px] sm:size-[300px] md:size-[340px]"
            style={{
              zIndex: 3,
              background: "#FFFFFF",
              borderWidth: 1.5,
              borderStyle: "solid",
            }}
            animate={{
              x: "14%",
              scale: 1,
              borderColor: ["#E4ECFF", "#2563EB55", "#E4ECFF"],
              boxShadow: [
                "0 20px 40px -18px rgba(11,18,32,0.3), 0 0 0 0 rgba(37,99,235,0.35)",
                "0 20px 40px -18px rgba(11,18,32,0.3), 0 0 26px 6px rgba(37,99,235,0.28)",
                "0 20px 40px -18px rgba(11,18,32,0.3), 0 0 0 0 rgba(37,99,235,0.35)",
              ],
            }}
            transition={{
              x: { duration: 0.2 },
              scale: { duration: 0.2 },
              boxShadow: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
              borderColor: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <AnimatePresence mode="wait">
              {current.image && (
                <motion.img
                  key={active}
                  src={current.image}
                  alt={current.name}
                  className="size-full object-contain"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div
            aria-hidden
            key={`next-${active}`}
            className="absolute left-0 top-0 size-[230px] overflow-hidden rounded-[20px] sm:size-[300px] md:size-[340px]"
            style={{
              zIndex: 2,
              transform: "translateX(28%) scale(0.85)",
              background: "#F8FBFF",
              boxShadow: "0 20px 40px -18px rgba(11,18,32,0.3)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.35, 1] }}
          >
            {nextItem.image && (
              <img src={nextItem.image} alt="" className="size-full object-contain" style={{ filter: "blur(3px)" }} />
            )}
          </motion.div>
        </div>

        {/* Right — content, cycling when multiple slides are given */}
        <div className="min-w-0 flex-1 text-center md:text-left">
          {mode === "testimonial" && <Quote className="mx-auto size-8 text-primary/25 md:mx-0" aria-hidden />}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {mode === "feature" ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{current.role}</p>
                  <p className="mt-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">{current.name}</p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{current.quote}</p>
                </>
              ) : (
                <>
                  <p className="mt-4 text-lg leading-relaxed text-foreground md:text-xl">"{current.quote}"</p>
                  <p className="mt-4 text-sm font-semibold text-foreground">{current.name}</p>
                  <p className="text-sm text-muted-foreground">{current.role}</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => setActive((a) => (a - 1 + total) % total)}
                className="grid size-7 shrink-0 place-items-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <div className="flex gap-1.5">
                {items.map((s, i) => (
                  <button
                    key={s.name + i}
                    type="button"
                    aria-label={`Show ${s.name}`}
                    onClick={() => setActive(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{ width: i === active ? 18 : 6, backgroundColor: i === active ? "var(--primary)" : "#E4ECFF" }}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next"
                onClick={() => setActive((a) => (a + 1) % total)}
                className="grid size-7 shrink-0 place-items-center rounded-full border border-border bg-white text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
