import Image from "next/image"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  height?: number
  priority?: boolean
}

export function Logo({ className, height = 40, priority = false }: LogoProps) {
  const width = Math.round(height * 1.5)

  return (
    <span
      role="img"
      aria-label="9278.io"
      className={cn("inline-flex items-center", className)}
      style={{ height }}
    >
      <Image
        src="/logo-black.png"
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
