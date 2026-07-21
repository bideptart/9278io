"use client"

import { useEffect, useState } from "react"

const OPEN_HOUR = 9
const CLOSE_HOUR = 19

function getIstParts() {
  const now = new Date()
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now)

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon"
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0")
  return { weekday, hour }
}

function getStatus() {
  const { weekday, hour } = getIstParts()
  const isSunday = weekday === "Sun"
  const isOpen = !isSunday && hour >= OPEN_HOUR && hour < CLOSE_HOUR

  if (isOpen) return { isOpen: true, label: "We're online now" }
  if (isSunday) return { isOpen: false, label: "Back Monday, 9 AM IST" }
  if (hour < OPEN_HOUR) return { isOpen: false, label: "Opens today at 9 AM IST" }
  return { isOpen: false, label: weekday === "Sat" ? "Back Monday, 9 AM IST" : "Back tomorrow, 9 AM IST" }
}

export function LiveStatus() {
  const [status, setStatus] = useState<{ isOpen: boolean; label: string } | null>(null)

  useEffect(() => {
    setStatus(getStatus())
    const id = setInterval(() => setStatus(getStatus()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (!status) return null

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white px-3 py-1 text-xs font-semibold">
      <span className="relative flex size-2">
        {status.isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className={`relative inline-flex size-2 rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
      </span>
      <span className={status.isOpen ? "text-emerald-700" : "text-muted-foreground"}>{status.label}</span>
    </span>
  )
}
