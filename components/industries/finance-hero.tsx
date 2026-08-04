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

      {/* A handful of finance-themed icons drift across the backdrop at low
          opacity — each on its own float rhythm and delay so they never
          move in sync, giving the section ambient life beyond the two blobs. */}
      {[
        { Icon: BadgeIndianRupee, pos: "left-[6%] top-[12%]", size: "size-7", dur: "5.5s", delay: "0s" },
        { Icon: Sparkles, pos: "left-[38%] top-[4%]", size: "size-5", dur: "4.8s", delay: "0.8s" },
        { Icon: CheckCircle2, pos: "right-[8%] top-[20%]", size: "size-6", dur: "6.2s", delay: "1.6s" },
        { Icon: FileText, pos: "left-[16%] bottom-[10%]", size: "size-6", dur: "5.2s", delay: "0.4s" },
        { Icon: BadgeIndianRupee, pos: "right-[22%] bottom-[6%]", size: "size-5", dur: "6.8s", delay: "2.2s" },
      ].map(({ Icon, pos, size, dur, delay }, i) => (
        <Icon
          key={i}
          aria-hidden
          style={{ animationDuration: dur, animationDelay: delay }}
          className={`pointer-events-none absolute -z-10 ${pos} ${size} text-blue-500/[0.14] motion-safe:animate-[ind-float_5s_ease-in-out_infinite]`}
        />
      ))}

      <div className="w-full px-6 pb-12 pt-6 md:px-8 md:pb-16 md:pt-8">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-10">
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
              className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-blue-200/70 bg-white/90 py-2.5 pl-2.5 pr-7 text-base font-medium text-blue-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md motion-safe:[animation:reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both,ind-float_4.4s_ease-in-out_infinite_0.6s]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent bg-[length:200%_auto] motion-safe:animate-[ind-shimmer_3.4s_linear_infinite]"
              />
              <span className="relative grid size-9 place-items-center rounded-full bg-blue-100 text-blue-600">
                <Sparkles className="size-5 motion-safe:animate-pulse" aria-hidden />
              </span>
              <span className="relative">AI Voice Agents for Finance Teams</span>
            </span>

            <h1 className="mt-6 text-balance font-serif text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-900 sm:text-[2.75rem] md:text-[3.4rem]">
              <span style={{ animationDelay: "0.15s" }} className="motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both] block font-black">
                AI voice agents
              </span>
              {/* Two animations, two elements — the wrapper does the entrance
                  fade, the inner span runs the looping gradient sweep. */}
              <span
                style={{ animationDelay: "0.25s" }}
                className="motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both] mt-1 block"
              >
                <span className="block bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 bg-[length:200%_auto] bg-clip-text font-black text-transparent motion-safe:animate-[ind-shimmer_6s_linear_infinite]">
                  for finance.
                </span>
              </span>
            </h1>

            <p
              style={{ animationDelay: "0.35s" }}
              className="motion-safe:animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_both] mt-5 max-w-lg text-pretty text-[15px] leading-[1.65] text-slate-600 md:text-base"
            >
              {pitch}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { Icon: Landmark, label: "Inbound", cls: "border-slate-200/80 bg-white/95 text-blue-700", icon: "text-blue-600" },
                { Icon: CheckCircle2, label: "24/7 Calling", cls: "border-emerald-200/70 bg-emerald-50/90 text-emerald-700", icon: "text-emerald-600" },
                { Icon: Sparkles, label: "Multilingual", cls: "border-slate-200/80 bg-white/95 text-blue-700", icon: "text-blue-600" },
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
                <Image
                  src="/images/finance-hero.png"
                  alt="AI voice agent for finance — bank, secure payments, and analytics"
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>

              {/* Floating accent cards — sit outside the image bounds, each
                  with its own float rhythm plus a hover lift of its own. */}
              <div className="absolute -left-4 -top-4 z-20 hero-float-up transition-transform duration-300 hover:-translate-y-1">
                <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(37,99,235,0.45)] backdrop-blur-md ring-1 ring-blue-100/60">
                  <div className="flex items-center gap-3">
                    <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/20 text-emerald-600">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-xl bg-emerald-500/25 motion-safe:animate-[ind-ping_2.6s_ease-out_infinite]"
                      />
                      <CheckCircle2 className="relative size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[12.5px] font-bold leading-tight text-slate-800">Invoice Approved</p>
                      <p className="text-[11px] font-medium text-slate-500">Sent</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 -top-4 z-20 transition-transform duration-300 hover:-translate-y-1">
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

              <div className="absolute -left-6 top-[48%] z-20 hero-float-down transition-transform duration-300 hover:-translate-y-1">
                <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(37,99,235,0.45)] backdrop-blur-md ring-1 ring-blue-100/60">
                  <div className="flex items-center gap-3">
                    <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-500/10 to-sky-500/10 text-blue-600">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-xl bg-blue-500/15 motion-safe:animate-[ind-ping_3.2s_ease-out_infinite]"
                      />
                      <FileText className="relative size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[12.5px] font-bold leading-tight text-slate-800">Expense Report</p>
                      <p className="text-[11px] font-medium text-slate-500">Ready</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-10 z-20 hero-float-up transition-transform duration-300 hover:-translate-y-1">
                <div className="rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_14px_40px_-14px_rgba(37,99,235,0.45)] backdrop-blur-md ring-1 ring-blue-100/60">
                  <div className="flex items-center gap-3">
                    <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/20 text-emerald-600">
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-xl bg-emerald-500/20 motion-safe:animate-[ind-ping_3.6s_ease-out_infinite]"
                      />
                      <BadgeIndianRupee className="relative size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-[12.5px] font-bold leading-tight text-slate-800">Payment</p>
                      <p className="text-[11px] font-medium text-slate-500">Confirmed</p>
                    </div>
                    <span className="ml-1 flex gap-1" aria-hidden>
                      <span className="size-1.5 rounded-full bg-slate-300" />
                      <span className="size-1.5 rounded-full bg-slate-300" />
                      <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="w-full px-6 pb-2 pt-8 md:px-8 md:pb-3 md:pt-10">
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
