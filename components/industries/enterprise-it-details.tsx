import {
  AlertTriangle,
  Check,
  Headset,
  KeyRound,
  MessageSquareQuote,
  Server,
  ShieldCheck,
  Ticket,
  Volume2,
} from "lucide-react"
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/animation/scroll-reveal"

type ConversationLine = { speaker: "Agent" | "Caller"; text: string }

// Topic icons mapped by position — matches the fixed content order on the
// enterprise IT page (password reset, ticketing, access, outage, escalation).
const JOB_ICONS = [KeyRound, Ticket, ShieldCheck, AlertTriangle, Headset]
const SAMPLE_ICONS = [KeyRound, Ticket, AlertTriangle]

export function EnterpriseItDetails({
  jobs,
  sampleLines,
  conversation,
}: {
  jobs: string[]
  sampleLines: string[]
  conversation: ConversationLine[]
}) {
  return (
    <section className="w-full px-6 pt-16 pb-8 md:px-8 md:pt-20 md:pb-10">
      <div className="relative mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        <ScrollReveal className="relative h-full overflow-visible">
          <span className="absolute -top-4 right-5 z-20 hero-float-up grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/25 md:-top-5 md:right-6 md:size-14">
            <Server className="size-5 md:size-6" aria-hidden />
          </span>

          <div className="relative h-full overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-b from-blue-50/40 to-white p-4 shadow-sm md:p-8">
            <Server
              aria-hidden
              className="ind-spin-slow pointer-events-none absolute -bottom-10 -right-10 size-48 text-blue-600/[0.06]"
            />

            <h2 className="relative text-balance font-serif text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              What the agent does
              <br />
              on day one
            </h2>
            <StaggerGroup stagger={0.1} once={false} className="relative mt-6 space-y-2.5 md:mt-8 md:space-y-3">
              {jobs.map((job, i) => {
                const Icon = JOB_ICONS[i] ?? Check
                return (
                  <StaggerItem key={job}>
                    <div className="group flex min-h-[64px] items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/10 active:-translate-y-1 active:border-blue-300 active:shadow-lg active:shadow-blue-600/10 md:min-h-[76px] md:px-5 md:py-4">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-active:rotate-12 group-active:scale-110">
                        <Icon className="size-4.5" aria-hidden />
                      </span>
                      <span className="text-pretty leading-relaxed text-slate-700">{job}</span>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        </ScrollReveal>

        <ScrollReveal className="absolute inset-x-0 top-0 z-10 overflow-visible [animation-delay:1s] md:static md:inset-auto md:z-auto md:h-full md:[animation-delay:0.1s]">
          <span className="absolute -top-4 right-5 z-20 hero-float-down grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/25 md:-top-5 md:right-6 md:size-14">
            <Volume2 className="size-5 md:size-6" aria-hidden />
          </span>

          <div className="relative h-full overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-4 shadow-sm md:bg-gradient-to-b md:from-blue-50/40 md:to-white md:p-8">
            <Volume2
              aria-hidden
              className="ind-spin-slow pointer-events-none absolute -bottom-10 -right-10 size-48 text-blue-600/[0.06]"
            />

            <h2 className="relative text-balance font-serif text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              How the agent
              <br />
              actually sounds
            </h2>
            <p className="relative mt-3 text-pretty leading-relaxed text-slate-600 md:mt-4">
              Real lines our voice agents have used in enterprise IT deployments. Every word is generated in real
              time with sub-second latency, real interruptions, and natural emotion.
            </p>

            {/* Live multilingual conversation preview */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg md:mt-8">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 md:px-5 md:py-3">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <span className="size-1.5 rounded-full bg-emerald-500 motion-safe:animate-pulse" aria-hidden />
                  Live agent preview
                </p>
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
              <StaggerGroup className="space-y-2.5 p-4 md:space-y-3 md:p-5" stagger={0.18} once={false}>
                {conversation.map((line, i) => (
                  <StaggerItem
                    key={i}
                    className={`flex text-sm ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}
                  >
                    {line.speaker === "Agent" ? (
                      <span className="max-w-[85%] rounded-2xl rounded-bl-sm bg-blue-50 px-4 py-2.5 text-slate-700 ring-1 ring-blue-100">
                        <span className="mr-1.5 text-[10px] font-bold uppercase tracking-wide text-blue-600/70">
                          Agent
                        </span>
                        {line.text}
                      </span>
                    ) : (
                      <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-50 px-4 py-2.5 text-slate-700 ring-1 ring-slate-200">
                        <span className="mr-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          Caller
                        </span>
                        {line.text}
                      </span>
                    )}
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            <StaggerGroup stagger={0.1} once={false} className="relative mt-5 space-y-2.5 md:mt-6 md:space-y-3">
              {sampleLines.map((line, i) => {
                const Icon = SAMPLE_ICONS[i] ?? MessageSquareQuote
                return (
                  <StaggerItem key={i}>
                    <div className="group flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/10 active:-translate-y-1 active:border-blue-300 active:shadow-lg active:shadow-blue-600/10 md:px-5 md:py-4">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-active:rotate-12 group-active:scale-110">
                        <Icon className="size-4.5" aria-hidden />
                      </span>
                      <p className="text-pretty leading-relaxed text-slate-700">{line}</p>
                    </div>
                  </StaggerItem>
                )
              })}
            </StaggerGroup>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
