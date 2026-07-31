"use client"

import { useState } from "react"
import { BarChart3, Users, MessageCircle, TrendingUp, Puzzle, Settings } from "lucide-react"

const NAV_ITEMS = [
  { label: "Overview", Icon: BarChart3 },
  { label: "Leads", Icon: Users },
  { label: "Conversations", Icon: MessageCircle },
  { label: "Analytics", Icon: TrendingUp },
  { label: "Integrations", Icon: Puzzle },
  { label: "Settings", Icon: Settings },
] as const

export function SaasDashboardSidebar() {
  const [active, setActive] = useState(0)

  return (
    <div className="absolute left-4 top-4 flex w-16 flex-col items-center gap-3 rounded-2xl bg-blue-600 py-4 text-white shadow-xl">
      {NAV_ITEMS.map((item, i) => (
        <div key={item.label} className="group relative">
          <button
            type="button"
            aria-label={item.label}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            className={`grid size-8 cursor-pointer place-items-center rounded-lg border-2 border-blue-200 bg-white text-slate-900 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md active:translate-y-0 ${
              active === i ? "border-white ring-2 ring-white" : ""
            }`}
          >
            <item.Icon className="size-4" aria-hidden />
          </button>

          {/* Tooltip */}
          <span
            role="tooltip"
            className="pointer-events-none absolute left-full top-1/2 z-30 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
