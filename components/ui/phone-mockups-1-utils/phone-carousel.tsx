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

export function PhoneCarousel({
  images,
  interval = 3200,
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
    <div className={cn("relative flex h-[320px] items-center justify-center sm:h-[360px]", className)}>
      {images.map((item, i) => {
        const raw = i - active
        const half = images.length / 2
        const wrapped = raw > half ? raw - images.length : raw < -half ? raw + images.length : raw
        const abs = Math.abs(wrapped)
        if (abs > 2) return null

        return (
          <motion.button
            key={item.alt + i}
            type="button"
            aria-label={item.alt}
            onClick={() => setActive(i)}
            className="absolute cursor-pointer"
            style={{ zIndex: 10 - abs }}
            animate={{
              x: wrapped * 104,
              scale: wrapped === 0 ? 1 : 0.8 - (abs - 1) * 0.1,
              rotate: wrapped * 9,
              opacity: 1 - abs * 0.32,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <PhoneFrame active={wrapped === 0}>
              {item.content ??
                (item.src ? (
                  <Image src={item.src} alt={item.alt} fill sizes="172px" className="object-cover" />
                ) : null)}
            </PhoneFrame>
          </motion.button>
        )
      })}
    </div>
  )
}

function PhoneFrame({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <div
      className={cn(
        "relative h-[300px] w-[152px] overflow-hidden rounded-[2rem] border-[6px] border-slate-900 bg-slate-950 shadow-[0_25px_50px_-20px_rgba(15,23,42,0.5)] ring-1 ring-black/10 transition-shadow duration-300 sm:h-[340px] sm:w-[172px]",
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
