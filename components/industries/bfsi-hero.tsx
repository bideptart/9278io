import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeIndianRupee,
  Bell,
  Landmark,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { PulseIcon } from "@/components/animation/pulse-icon"
import { Marquee } from "@/components/ui/marquee"
import OrbitCarousel from "@/components/ui/orbiting-carousel-with-animated-icons"
import type { Industry } from "@/lib/industries"

const HERO_STATS = [
  { icon: Zap, iconBg: "bg-blue-100 text-blue-600", value: "< 3 Seconds", label: "First-touch response" },
  { icon: Bell, iconBg: "bg-emerald-100 text-emerald-600", value: "Up to 40", label: "Concurrent calls" },
  { icon: BadgeIndianRupee, iconBg: "bg-sky-100 text-sky-600", value: "From ₹10", label: "Per-minute rate" },
  { icon: ShieldCheck, iconBg: "bg-blue-100 text-blue-600", value: "100%", label: "TRAI compliant" },
]

export function BfsiHero({ industry }: { industry: Industry }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-sky-50/30 to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(37,99,235,0.22),rgba(14,165,233,0.08)_55%,transparent_75%)]"
      />
      {/* Ambient blobs drift on offset cycles so the backdrop never sits
          perfectly still, but slowly enough to stay out of the way. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-6 -z-10 size-80 rounded-full bg-blue-400/18 blur-3xl motion-safe:animate-[breathe_9s_ease-in-out_infinite]"
      />
      <div
        aria-hidden
        style={{ animationDelay: "1.5s" }}
        className="pointer-events-none absolute -right-20 top-36 -z-10 size-96 rounded-full bg-sky-400/18 blur-3xl motion-safe:animate-[breathe_12s_ease-in-out_infinite]"
      />

      <div className="w-full px-6 pb-4 pt-3 md:px-8 md:pb-8 md:pt-4">
        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Each block enters on its own short delay so the column builds up
              top-to-bottom instead of arriving as one slab. */}
          <div className="relative">
            {/* Large faint watermark, slowly rotating behind the copy — a
                clearly-visible ambient motion that doesn't compete with text. */}
            <Landmark
              aria-hidden
              className="ind-spin-slow pointer-events-none absolute -left-6 -top-10 -z-10 size-56 text-blue-600/[0.07] sm:size-64"
            />

            {/* Badge has its own life: a light sweep travels across the pill,
                the status icon pulses, and the whole pill gently bobs. */}
            <span
              style={{ animationDelay: "0.05s" }}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-blue-200/70 bg-white/90 py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-blue-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent bg-[length:200%_auto] motion-safe:animate-[ind-shimmer_3.4s_linear_infinite]"
              />
              <span className="relative grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
                <Sparkles className="size-3.5 motion-safe:animate-pulse" aria-hidden />
              </span>
              <span className="relative">AI Voice Agents for Lending &amp; Insurance</span>
            </span>

            <h1 className="mt-6 text-balance font-sans text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-900 sm:text-[2.75rem] md:text-[3.4rem]">
              <span className="block font-black">AI Voice Agents</span>
              <span className="mt-1 block">
                <span
                  className="inline bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text font-black text-transparent"
                  style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}
                >
                  For BFSI &amp; Fintech.
                </span>
              </span>
            </h1>

            <p
              style={{ animationDelay: "0.35s" }}
              className="motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both] mt-5 max-w-lg text-pretty text-[15px] leading-[1.65] text-slate-600 md:text-base"
            >
              {industry.pitch}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { Icon: Landmark, label: "Lead Qualify", cls: "border-slate-200/80 bg-white/95 text-blue-700", icon: "text-blue-600" },
                { Icon: Bell, label: "EMI Reminder", cls: "border-emerald-200/70 bg-emerald-50/90 text-emerald-700", icon: "text-emerald-600" },
                { Icon: ShieldCheck, label: "DPDP Ready", cls: "border-slate-200/80 bg-white/95 text-blue-700", icon: "text-blue-600" },
              ].map((pill, i) => (
                <span
                  key={pill.label}
                  style={{ animationDelay: `${0.45 + i * 0.08}s` }}
                  className={`motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both] group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${pill.cls}`}
                >
                  <pill.Icon
                    className={`size-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 ${pill.icon}`}
                    aria-hidden
                  />
                  {pill.label}
                </span>
              ))}
            </div>

            <div style={{ animationDelay: "0.72s" }} className="motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both] mt-7 flex flex-wrap items-center gap-3.5">
              <Button
                asChild
                className="group h-auto rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-6 py-3 text-[14px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(37,99,235,0.75)]"
              >
                <Link href={`/get-started?industry=${industry.slug}`}>
                  Get Started
                  <span className="ml-2 inline-flex size-6 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="group h-auto rounded-full border-slate-200 bg-white/95 px-5 py-3 text-[14px] font-bold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700"
              >
                <Link href="/pricing">
                  View Pricing
                  <ArrowUpRight
                    className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </Link>
              </Button>
            </div>
          </div>

          <ScrollReveal delay={0.14} className="self-start -mt-14 sm:-mt-12">
            <OrbitCarousel />
          </ScrollReveal>
        </div>
      </div>

      <div className="w-full overflow-hidden px-6 pb-2 md:px-8 md:pb-3">
        <Marquee pauseOnHover className="mx-auto max-w-6xl [--duration:24s] [--gap:0px]">
          {HERO_STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-4 px-8">
              <PulseIcon className={`grid size-11 shrink-0 place-items-center rounded-2xl ${s.iconBg}`}>
                <s.icon className="size-6" aria-hidden />
              </PulseIcon>
              <div className="whitespace-nowrap">
                <p className="font-serif text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[12.5px] font-medium text-slate-500">{s.label}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
