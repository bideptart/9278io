"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  height?: number
  priority?: boolean
}

export function Logo({ className, height = 40, priority = false }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Before mount (SSR), default to white logo (dark theme default)
  const src = mounted && resolvedTheme === "light" ? "/logo-black.png" : "/logo-white.png"

  // Aspect ratio of the logo PNG (500 x 333 ≈ 1.5)
  const width = Math.round(height * 1.5)

  return (
    <span
      role="img"
      aria-label="9278.io"
      className={cn("inline-flex items-center", className)}
      style={{ height }}
    >
      <Image
        src={src}
        alt="9278.io"
        width={width}
        height={height}
        priority={priority}
        draggable={false}
        className="select-none"
        style={{ height: "100%", width: "auto" }}
      />
    </span>
  )
}
