"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"
import { CountUp } from "@/components/ui/count-up"

const LINE_PATH =
  "M0,90 C40,85 60,70 90,68 C120,66 140,82 170,70 C200,58 220,45 250,42 C280,39 300,55 330,40 C360,25 380,20 400,15"
const AREA_PATH = `${LINE_PATH} L400,120 L0,120 Z`

const STATS = [
  { label: "Conversations", value: 12450, decimals: 0, prefix: "", suffix: "" },
  { label: "Customer Satisfaction", value: 98.2, decimals: 1, prefix: "", suffix: "%" },
  { label: "Revenue Impact", value: 4.2, decimals: 1, prefix: "₹", suffix: "L" },
]

export function EcommercePerformanceChart() {
  const chartRef = useRef<SVGSVGElement>(null)
  const inView = useInView(chartRef, { once: true, margin: "-10% 0px" })

  return (
    <>
      <div className="mt-6 grid grid-cols-3 gap-5">
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="font-sans text-xl font-bold tracking-tight text-blue-700 sm:text-2xl">
              <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-[11px] font-medium leading-snug text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Animated area chart */}
      <div className="mt-7 h-32 w-full">
        <svg ref={chartRef} viewBox="0 0 400 120" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="ecomArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(139,92,246)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(99,102,241)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ecomLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgb(139,92,246)" />
              <stop offset="100%" stopColor="rgb(99,102,241)" />
            </linearGradient>
          </defs>
          <motion.path
            d={AREA_PATH}
            fill="url(#ecomArea)"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.path
            d={LINE_PATH}
            fill="none"
            stroke="url(#ecomLine)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </>
  )
}
