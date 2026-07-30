import { Check, Landmark, MessageSquareQuote, Volume2 } from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"
import type { Industry } from "@/lib/industries"

export function BfsiDetails({ industry }: { industry: Industry }) {
  return (
    <section className="w-full px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
        <ScrollReveal className="relative overflow-visible rounded-[2rem] border border-slate-200/70 bg-gradient-to-b from-blue-50/40 to-white p-6 shadow-sm md:p-8">
          <span className="absolute -top-5 right-6 z-10 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/25">
            <Landmark className="size-6" aria-hidden />
          </span>

          <h2 className="text-balance font-serif text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            What the agent does
            <br />
            on day one
          </h2>
          <ul className="mt-8 space-y-3">
            {industry.jobs.map((job) => (
              <li
                key={job}
                className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 shadow-sm"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <span className="text-pretty leading-relaxed text-slate-700">{job}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="relative overflow-visible rounded-[2rem] border border-slate-200/70 bg-gradient-to-b from-blue-50/40 to-white p-6 shadow-sm md:p-8"
        >
          <span className="absolute -top-5 right-6 z-10 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/25">
            <Volume2 className="size-6" aria-hidden />
          </span>

          <h2 className="text-balance font-serif text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            How the agent
            <br />
            actually sounds
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-slate-600">
            Real lines our voice agents have used in {industry.name.toLowerCase()} deployments. Every word is
            generated in real time with sub-second latency, real interruptions, and natural emotion.
          </p>

          {/* Live multilingual conversation preview */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
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
            <div className="space-y-3 p-5">
              {industry.conversation.map((line, i) => (
                <div key={i} className={`flex text-sm ${line.speaker === "Agent" ? "justify-start" : "justify-end"}`}>
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
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            {industry.sampleLines.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 shadow-sm"
              >
                <MessageSquareQuote className="mt-0.5 size-5 shrink-0 text-blue-600" aria-hidden />
                <p className="text-pretty leading-relaxed text-slate-700">{line}</p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  )
}
