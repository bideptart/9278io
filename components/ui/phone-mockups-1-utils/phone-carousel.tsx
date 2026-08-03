"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export type ImageItem = {
  src?: string
  alt: string
  content?: React.ReactNode
}

// The fan-out geometry (slot position/rotation/scale relative to `active`)
// is fixed — only which phone sits in which slot advances on a timer, so the
// structure always looks the same, just with a different phone up front.
export function PhoneCarousel({
  images,
  interval = 2000,
  className,
}: {
  images: ImageItem[]
  interval?: number
  className?: string
}) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  return (
    // The fan-out positions below are fixed pixel offsets (translateX steps,
    // phone widths), so on narrow viewports the side phones would spill past
    // the screen edge and get clipped. Scaling the whole group down at small
    // breakpoints shrinks everything proportionally instead of cropping it.
    <div
      className={cn(
        "relative flex h-[210px] origin-center scale-[0.5] items-center justify-center sm:h-[400px] sm:scale-100",
        className,
      )}
    >
      {images.map((item, i) => {
        const raw = i - active
        const half = images.length / 2
        const wrapped = raw > half ? raw - images.length : raw < -half ? raw + images.length : raw
        const abs = Math.abs(wrapped)
        if (abs > 2) return null

        return (
          <motion.div
            key={item.alt + i}
            className="absolute"
            style={{ zIndex: 10 - abs }}
            initial={false}
            animate={{
              x: wrapped * 114,
              scale: wrapped === 0 ? 1 : 0.8 - (abs - 1) * 0.1,
              rotate: wrapped * 9,
              opacity: 1 - abs * 0.32,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <PhoneFrame active={wrapped === 0}>
              {item.content ??
                (item.src ? (
                  <Image src={item.src} alt={item.alt} fill sizes="192px" className="object-cover" />
                ) : null)}
            </PhoneFrame>
          </motion.div>
        )
      })}
    </div>
  )
}

function PhoneFrame({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <div
      className={cn(
        "relative h-[330px] w-[168px] overflow-hidden rounded-[2rem] border-[6px] border-slate-900 bg-slate-950 shadow-[0_25px_50px_-20px_rgba(15,23,42,0.5)] ring-1 ring-black/10 transition-shadow duration-300 sm:h-[378px] sm:w-[192px]",
        active && "shadow-[0_35px_70px_-18px_rgba(37,99,235,0.5)]",
      )}
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-1.5 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-900"
      />
      <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-white">{children}</div>
    </div>
  )
}
