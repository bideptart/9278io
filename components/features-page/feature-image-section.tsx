"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Quote } from "lucide-react"

const TESTIMONIALS = [
  {
    image: "/avatars/amit.jpg",
    name: "Amit Shah",
    role: "Founder, Shah Real Estate",
    quote: "Our agent picks up every enquiry now, even after the office shuts. Site visits book themselves.",
  },
  {
    image: "/avatars/priya.jpg",
    name: "Priya Nair",
    role: "Ops Lead, Priya Dental Care",
    quote: "Setup took an afternoon, not a sprint. Patients get the same warm greeting on every single call.",
  },
  {
    image: "/avatars/rahul.jpg",
    name: "Rahul Mehta",
    role: "CX Manager, Aarav Motors",
    quote: "Call volume doubled during the festive sale and nobody noticed — every caller still got through instantly.",
  },
  {
    image: "/avatars/sneha.avif",
    name: "Sneha Iyer",
    role: "Founder, Sneha Wellness Studio",
    quote: "No more missed class bookings. The agent handles renewals and no-shows while we focus on members.",
  },
]

const CYCLE_MS = 3400

// Shared "trusted by real businesses" slot sitting between the capabilities
// breakdown and the closing PricingCta on every /features/* inner page —
// a fanned photo stack (prev/current/next) paired with a synced quote.
export function FeatureImageSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused])

  const total = TESTIMONIALS.length
  const prevItem = TESTIMONIALS[(active - 1 + total) % total]
  const current = TESTIMONIALS[active]
  const nextItem = TESTIMONIALS[(active + 1) % total]

  return (
    <section className="w-full bg-background px-6 py-14 md:px-8 md:py-20">
      <div
        className="mx-auto flex max-w-5xl flex-col items-center gap-10 rounded-3xl border border-border/50 bg-white p-8 md:flex-row md:gap-14 md:p-12"
        style={{ boxShadow: "0 30px 80px rgba(15,23,42,0.08)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left — fanned 3-image stack, center = active */}
        <div className="relative mx-auto h-[280px] w-[280px] shrink-0">
          <img
            src={prevItem.image}
            alt={prevItem.name}
            className="absolute left-0 top-0 h-[280px] w-[280px] rounded-[20px] object-cover"
            style={{
              zIndex: 2,
              transform: "translateX(-30px) translateY(-24px) scale(0.85)",
              boxShadow: "0 20px 40px -18px rgba(11,18,32,0.3)",
            }}
          />
          <img
            src={current.image}
            alt={current.name}
            className="absolute left-0 top-0 h-[280px] w-[280px] rounded-[20px] object-cover"
            style={{
              zIndex: 3,
              transform: "translateX(0) translateY(0) scale(1)",
              boxShadow: "0 20px 40px -18px rgba(11,18,32,0.3)",
            }}
          />
          <img
            src={nextItem.image}
            alt={nextItem.name}
            className="absolute left-0 top-0 h-[280px] w-[280px] rounded-[20px] object-cover"
            style={{
              zIndex: 2,
              transform: "translateX(30px) translateY(-24px) scale(0.85)",
              boxShadow: "0 20px 40px -18px rgba(11,18,32,0.3)",
            }}
          />
        </div>

        {/* Right — synced quote */}
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

          <div className="mt-6 flex justify-center gap-1.5 md:justify-start">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Show ${t.name}'s testimonial`}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === active ? 18 : 6, backgroundColor: i === active ? "var(--primary)" : "#E4ECFF" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
