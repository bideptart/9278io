import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeIndianRupee,
  CheckCircle2,
  FileText,
  Landmark,
  Sparkles,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

const HERO_STATS = [
  { icon: BadgeIndianRupee, iconBg: "bg-blue-100 text-blue-600", value: "< 3 Seconds", label: "First-touch response" },
  { icon: CheckCircle2, iconBg: "bg-emerald-100 text-emerald-600", value: "Up to 40", label: "Concurrent calls" },
  { icon: Wallet, iconBg: "bg-sky-100 text-sky-600", value: "From ₹10", label: "Per-minute rate" },
  { icon: FileText, iconBg: "bg-blue-100 text-blue-600", value: "DPDP", label: "Data handling ready" },
]

export function FinanceHero({ pitch }: { pitch: string }) {
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
              AI Voice Agents for Finance Teams
            </span>

            <h1 className="mt-6 text-balance font-serif text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-900 sm:text-[2.75rem] md:text-[3.4rem]">
              <span className="block font-black">AI voice agents</span>
              <span className="mt-1 block bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 bg-clip-text font-black text-transparent">
                for finance.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-pretty text-[15px] leading-[1.65] text-slate-600 md:text-base">
              {pitch}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2 text-[13px] font-semibold text-blue-700 shadow-sm">
                <Landmark className="size-4 text-blue-600" aria-hidden />
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
                <Link href="/get-started?industry=finance">
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
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-25px_rgba(37,99,235,0.55)]">
                <Image
                  src="/images/finance-hero.png"
                  alt="AI voice agent for finance — bank, secure payments, and analytics"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Floating accent cards — sit outside the image bounds */}
              <div className="absolute -left-4 -top-4 z-20 hero-float-up">
                <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(37,99,235,0.45)] backdrop-blur-md ring-1 ring-blue-100/60">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/20 text-emerald-600">
                      <CheckCircle2 className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[12.5px] font-bold leading-tight text-slate-800">Invoice Approved</p>
                      <p className="text-[11px] font-medium text-slate-500">Sent</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 z-20">
                <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(37,99,235,0.45)] backdrop-blur-md ring-1 ring-blue-100/60">
                  <p className="text-[13px] font-bold leading-tight text-blue-700">AI Voice Agent</p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <p className="text-[10.5px] font-medium text-slate-500">Listening…</p>
                    <div className="flex h-3 items-end gap-[1.5px]" aria-hidden>
                      {[7, 11, 6, 13, 9, 14].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                          className="ind-eq w-[2.5px] rounded-full bg-gradient-to-t from-sky-500 to-blue-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-6 top-[48%] z-20 hero-float-down">
                <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(37,99,235,0.45)] backdrop-blur-md ring-1 ring-blue-100/60">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-500/10 text-blue-600">
                      <FileText className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[12.5px] font-bold leading-tight text-slate-800">Expense Report</p>
                      <p className="text-[11px] font-medium text-slate-500">Ready</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-10 z-20 hero-float-up">
                <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(37,99,235,0.45)] backdrop-blur-md ring-1 ring-blue-100/60">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/20 text-emerald-600">
                      <BadgeIndianRupee className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[12.5px] font-bold leading-tight text-slate-800">Payment</p>
                      <p className="text-[11px] font-medium text-slate-500">Confirmed</p>
                    </div>
                    <span className="ml-1 flex gap-1" aria-hidden>
                      <span className="size-1.5 rounded-full bg-slate-300" />
                      <span className="size-1.5 rounded-full bg-slate-300" />
                      <span className="size-1.5 rounded-full bg-blue-500" />
                    </span>
                  </div>
                </div>
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
