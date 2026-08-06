import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import { BpoWallboard } from "@/components/industries/bpo-wallboard"
import type { Industry } from "@/lib/industries"

const HERO_STATS = [
  { icon: Headphones, iconBg: "bg-blue-100 text-blue-600", value: "40+", label: "Concurrent calls per number" },
  { icon: Star, iconBg: "bg-emerald-100 text-emerald-600", value: "10+", label: "Indian languages supported" },
  { icon: ArrowUpRight, iconBg: "bg-sky-100 text-sky-600", value: "< 3 Seconds", label: "First-touch response" },
  { icon: ShieldCheck, iconBg: "bg-blue-100 text-blue-600", value: "100%", label: "TRAI compliant" },
]

export function BpoHero({ industry }: { industry: Industry }) {
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

      <div className="w-full px-6 pt-6 pb-12 md:px-8 md:pt-8 md:pb-16">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Each block enters on its own short delay so the column builds up
              top-to-bottom instead of arriving as one slab. */}
          <div className="relative">
            {/* Large faint watermark, slowly rotating behind the copy — a
                clearly-visible ambient motion that doesn't compete with text. */}
            <Headphones
              aria-hidden
              className="ind-spin-slow pointer-events-none absolute -left-6 -top-10 -z-10 size-56 text-blue-600/[0.07] sm:size-64"
            />

            <span
              style={{ animationDelay: "0.05s" }}
              className="motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both] inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/90 py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-blue-700 shadow-sm backdrop-blur transition-shadow duration-300 hover:shadow-md"
            >
              <span className="grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
                <Sparkles className="size-3.5 motion-safe:animate-pulse" aria-hidden />
              </span>
              AI Voice Agents for Call Centres
            </span>

            <h1 className="mt-6 text-balance font-sans text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-900 sm:text-[2.75rem] md:text-[3.4rem]">
              <span className="block font-black">AI Voice Agents</span>
              <span className="mt-1 block">
                <span
                  className="inline bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text font-black text-transparent"
                  style={{ WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }}
                >
                  For BPO &amp; Call Centres.
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
                { Icon: Headphones, label: "Inbound", cls: "border-slate-200/80 bg-white/95 text-blue-700", icon: "text-blue-600" },
                { Icon: CheckCircle2, label: "24/7 Calling", cls: "border-emerald-200/70 bg-emerald-50/90 text-emerald-700", icon: "text-emerald-600" },
                { Icon: ShieldCheck, label: "TRAI Compliant", cls: "border-slate-200/80 bg-white/95 text-blue-700", icon: "text-blue-600" },
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

            <div
              style={{ animationDelay: "0.72s" }}
              className="motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both] mt-7 flex flex-wrap items-center gap-3.5"
            >
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

          <ScrollReveal delay={0.14}>
            <div className="group relative mx-auto w-full max-w-[560px]">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(37,99,235,0.2),transparent_70%)] motion-safe:animate-[breathe_8s_ease-in-out_infinite]"
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-25px_rgba(37,99,235,0.55)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_40px_90px_-25px_rgba(37,99,235,0.65)]">
                <BpoWallboard />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="w-full px-6 pb-2 md:px-8 md:pb-3">
        <ScrollReveal delay={0.1} className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/95 px-3 py-3 shadow-[0_20px_50px_-25px_rgba(37,99,235,0.35)] backdrop-blur">
            <div className="grid grid-cols-1 divide-y divide-slate-200/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  style={{ animationDelay: `${0.85 + i * 0.1}s` }}
                  className="group flex items-center gap-4 px-5 py-4 transition-transform duration-300 hover:-translate-y-0.5 motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both] sm:px-6 sm:py-5"
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${s.iconBg}`}
                  >
                    <s.icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <p className="font-serif text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{s.value}</p>
                    <p className="mt-0.5 text-[12.5px] font-medium text-slate-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
