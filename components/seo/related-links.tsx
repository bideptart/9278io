"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, Building2, HelpCircle, Rocket, Tag, BookOpen, Info, Mail, Sparkles, Link as LinkIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { StaggerGroup, StaggerItem } from "@/components/animation/stagger"

export type RelatedLink = {
  href: string
  title: string
  description: string
}

// Icon is derived from the href's leading path segment rather than threaded
// through every page's links array — keeps all 7+ call sites untouched while
// still giving each card a distinguishing icon.
function iconForHref(href: string) {
  if (href.startsWith("/industries")) return Building2
  if (href.startsWith("/faq")) return HelpCircle
  if (href.startsWith("/get-started")) return Rocket
  if (href.startsWith("/pricing")) return Tag
  if (href.startsWith("/blog")) return BookOpen
  if (href.startsWith("/about")) return Info
  if (href.startsWith("/contact")) return Mail
  if (href.startsWith("/features")) return Sparkles
  return LinkIcon
}

const cardVariants = {
  rest: { rotateX: 0, y: 0 },
  flipped: { rotateX: 180, y: -4 },
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

      <StaggerGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {links.map((l) => {
          const isFlipped = flippedHref === l.href
          const Icon = iconForHref(l.href)
          return (
            <StaggerItem key={l.href}>
              <Link
                href={l.href}
                className="group block h-full"
                onClick={(e) => handleClick(e, l.href)}
              >
                <motion.div
                  className={cn(
                    "relative flex h-full min-h-[126.75px] flex-col justify-between gap-2 overflow-hidden rounded-xl border border-primary bg-primary p-4 sm:gap-4 sm:p-5",
                    "transition-colors duration-150 group-hover:border-border group-hover:bg-white group-hover:shadow-md",
                    isFlipped && "border-border bg-white shadow-md",
                  )}
                  initial="rest"
                  animate={isFlipped ? "flipped" : "rest"}
                  whileHover={isTouch ? undefined : "flipped"}
                  variants={cardVariants}
                  transition={flipTransition}
                >
                  {/* Faint diagonal-line texture — rest state only, so the
                      card reads as textured rather than a flat solid block.
                      Fades out on hover/flip since it'd sit upside-down
                      against the flipped content otherwise. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-150 group-hover:opacity-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 13px)",
                    }}
                  />
                  <motion.div variants={contentVariants} transition={flipTransition}>
                    <span
                      className={cn(
                        "mb-2 inline-flex size-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-150 group-hover:bg-primary/10 group-hover:text-primary sm:mb-3",
                        isFlipped && "bg-primary/10 text-primary",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="flex items-start justify-between gap-3">
                      <p
                        className={cn(
                          "text-base font-medium tracking-tight text-white transition-colors duration-150 group-hover:text-foreground",
                          isFlipped && "text-foreground",
                        )}
                      >
                        {l.title}
                      </p>
                      <span
                        className={cn(
                          "mt-0.5 inline-flex shrink-0 items-center gap-1 text-xs text-white transition-colors duration-150 group-hover:text-primary",
                          isFlipped && "text-primary",
                        )}
                      >
                        Read more
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-1.5 min-h-[2.75rem] text-sm leading-relaxed text-white/70 transition-colors duration-150 group-hover:text-muted-foreground sm:mt-2",
                        isFlipped && "text-muted-foreground",
                      )}
                    >
                      {l.description}
                    </p>
                  </motion.div>
                </motion.div>
              </Link>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </section>
  )
}
