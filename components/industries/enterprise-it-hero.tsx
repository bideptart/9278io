import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Server,
  ShieldCheck,
  Sparkles,
  Ticket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import PhoneMockupBasic from "@/components/ui/phone-mockups-1"

const HERO_STATS = [
  { icon: Sparkles, iconBg: "bg-blue-100 text-blue-600", value: "< 3 Seconds", label: "First-touch response" },
  { icon: CheckCircle2, iconBg: "bg-emerald-100 text-emerald-600", value: "Up to 40", label: "Concurrent calls" },
  { icon: Ticket, iconBg: "bg-sky-100 text-sky-600", value: "From ₹10", label: "Per-minute rate" },
  { icon: ShieldCheck, iconBg: "bg-blue-100 text-blue-600", value: "Secure", label: "By default" },
]

export function EnterpriseItHero({ pitch }: { pitch: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-sky-50/30 to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(37,99,235,0.22),rgba(14,165,233,0.08)_55%,transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-6 -z-10 size-80 rounded-full bg-blue-400/18 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 top-36 -z-10 size-96 rounded-full bg-sky-400/18 blur-3xl" />

      <div className="w-full px-6 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/90 py-1.5 pl-1.5 pr-5 text-[14px] font-medium text-blue-700 shadow-sm backdrop-blur">
              <span className="grid size-6 place-items-center rounded-full bg-blue-100 text-blue-600">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
              AI Voice Agents for IT Teams
            </span>

            <h1 className="mt-6 text-balance font-serif text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-900 sm:text-[2.75rem] md:text-[3.4rem]">
              <span className="block font-black">AI voice agents</span>
              <span className="mt-1 block bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 bg-clip-text font-black text-transparent">
                for enterprise IT.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-pretty text-[15px] leading-[1.65] text-slate-600 md:text-base">
              {pitch}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2 text-[13px] font-semibold text-blue-700 shadow-sm">
                <Server className="size-4 text-blue-600" aria-hidden />
                Inbound
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/90 px-4 py-2 text-[13px] font-semibold text-emerald-700 shadow-sm">
                <CheckCircle2 className="size-4 text-emerald-600" aria-hidden />
                24/7 Calling
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2 text-[13px] font-semibold text-blue-700 shadow-sm">
                <Sparkles className="size-4 text-blue-600" aria-hidden />
                Multilingual
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Button
                asChild
                className="group h-auto rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-6 py-3 text-[14px] font-bold text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(37,99,235,0.75)]"
              >
                <Link href="/get-started?industry=enterprise-it">
                  Get Started
                  <span className="ml-2 inline-flex size-6 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto rounded-full border-slate-200 bg-white/95 px-5 py-3 text-[14px] font-bold text-slate-800 shadow-sm hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-700"
              >
                <Link href="/pricing">
                  View Pricing
                  <ArrowUpRight className="ml-2 size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <div className="relative mx-auto w-full max-w-[720px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 top-6 -z-10 h-[85%] rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_20%,rgba(37,99,235,0.16),transparent_70%)]"
              />
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-b from-blue-50/70 via-white to-white shadow-[0_30px_70px_-25px_rgba(37,99,235,0.35)]">
                <PhoneMockupBasic />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="w-full px-6 pb-10 md:px-8 md:pb-14">
        <ScrollReveal delay={0.1} className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/95 px-3 py-3 shadow-[0_20px_50px_-25px_rgba(37,99,235,0.35)] backdrop-blur">
            <div className="grid grid-cols-1 divide-y divide-slate-200/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${s.iconBg}`}>
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
