"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type RelatedLink = {
  href: string
  title: string
  description: string
}

const cardVariants = {
  rest: { rotateX: 0 },
  flipped: { rotateX: 180 },
}

const contentVariants = {
  rest: { rotateX: 0 },
  flipped: { rotateX: -180 },
}

const flipTransition = { duration: 0.45, type: "spring" as const, bounce: 0 }
// Slightly longer than the flip's own duration so navigation kicks in right
// as the animation visually settles, not mid-motion.
const TOUCH_NAV_DELAY = 480

/**
 * Site-wide internal-linking module. Each landing page renders one of these
 * to push link equity to siblings (industries → pricing → FAQ → get-started).
 *
 * Cards flip (rotateX, same technique as the FlipButton primitive) on hover
 * rather than click. The rotation is driven by motion; the primary → white
 * background/text swap is a fast CSS group-hover transition so the card is
 * already white by the time the flip is visible, instead of a slow crossfade
 * lagging behind the rotation.
 *
 * On touch devices there's no hover to hold, and a tap normally navigates
 * away before the flip has a chance to render at all. So on devices with no
 * real hover (`(hover: none)` — checked once via matchMedia, not inferred
 * per-tap from pointerType, which some mobile browsers/frameworks fire
 * inconsistently for anchors) a tap is intercepted: it plays the flip via
 * explicit state, then navigates itself once the animation settles, instead
 * of letting the browser's default navigation cut it off instantly.
 */
export function RelatedLinks({
  heading = "Keep exploring 9278.io",
  description = "Related guides, pricing, and use cases curated for the calls you take.",
  links,
}: {
  heading?: string
  description?: string
  links: RelatedLink[]
}) {
  const router = useRouter()
  const [flippedHref, setFlippedHref] = useState<string | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)")
    setIsTouch(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  function handleClick(e: React.MouseEvent, href: string) {
    if (!isTouch) return
    e.preventDefault()
    setFlippedHref(href)
    setTimeout(() => router.push(href), TOUCH_NAV_DELAY)
  }

  return (
    <section aria-labelledby="related-heading" className="w-full px-6 pb-24 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <h2 id="related-heading" className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
      </div>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {links.map((l) => {
          const isFlipped = flippedHref === l.href
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group block h-full"
                onClick={(e) => handleClick(e, l.href)}
              >
                <motion.div
                  className={cn(
                    "flex h-full flex-col justify-between gap-4 rounded-xl border border-primary bg-primary p-5",
                    "transition-colors duration-150 group-hover:border-border group-hover:bg-white group-hover:shadow-md",
                    isFlipped && "border-border bg-white shadow-md",
                  )}
                  initial="rest"
                  animate={isFlipped ? "flipped" : "rest"}
                  whileHover={isTouch ? undefined : "flipped"}
                  variants={cardVariants}
                  transition={flipTransition}
                >
                  <motion.div variants={contentVariants} transition={flipTransition}>
                    <p
                      className={cn(
                        "text-base font-medium tracking-tight text-white transition-colors duration-150 group-hover:text-foreground",
                        isFlipped && "text-foreground",
                      )}
                    >
                      {l.title}
                    </p>
                    <p
                      className={cn(
                        "mt-2 text-sm leading-relaxed text-white/70 transition-colors duration-150 group-hover:text-muted-foreground",
                        isFlipped && "text-muted-foreground",
                      )}
                    >
                      {l.description}
                    </p>
                    <span
                      className={cn(
                        "mt-4 inline-flex items-center gap-1 text-xs text-white transition-colors duration-150 group-hover:text-primary",
                        isFlipped && "text-primary",
                      )}
                    >
                      Read more
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </motion.div>
                </motion.div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
