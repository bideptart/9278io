"use client"

import { motion } from "motion/react"
import { CheckCircle2, Clock, PhoneCall } from "lucide-react"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

export function Platform() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">AI Receptionist</p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Answer every call like your best front desk.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Greet callers, qualify requests, route to the right team, and book appointments — in 15+ Indian languages.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            <ReceptionistCard
              icon={PhoneCall}
              title="Never miss an inbound call"
              description="Always-on answering, consistent greetings, and instant handoff when a human is needed."
              points={["24/7 coverage", "Warm transfer", "Call recording + transcripts"]}
            />
            <ReceptionistCard
              icon={CheckCircle2}
              title="Qualify and capture details"
              description="Ask the right questions, confirm intent, and collect structured info before routing."
              points={["Name + reason for call", "Budget / location / urgency", "Consent + compliance"]}
            />
            <ReceptionistCard
              icon={Clock}
              title="Book and reschedule"
              description="Confirm availability, propose slots, and handle follow-ups without putting callers on hold."
              points={["Appointments", "Reminders", "No-show recovery"]}
            />
            <ReceptionistCard
              icon={PhoneCall}
              title="Works in 15+ Indian languages"
              description="Handle callers in the language they speak and keep the conversation natural."
              points={["Hindi + regional", "Natural turn-taking", "Per-second billing"]}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-border bg-card/50 p-7"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Example call</p>
            <div className="mt-5 space-y-2 rounded-xl border border-border bg-muted/40 p-4 dark:bg-black/20">
              <div className="flex justify-start text-xs">
                <span className="max-w-[90%] rounded-lg bg-primary/20 px-3 py-2 text-primary ring-1 ring-primary/25 dark:bg-primary/15">
                  <span className="mr-1.5 text-[10px] font-bold opacity-60">Agent</span>
                  नमस्ते! 9278 रिसेप्शन से बात कर रहे हैं — मैं आपकी कैसे मदद कर सकता हूँ?
                </span>
              </div>
              <div className="flex justify-end text-xs">
                <span className="max-w-[90%] rounded-lg bg-foreground/[0.09] px-3 py-2 text-foreground ring-1 ring-foreground/[0.08] dark:bg-white/[0.10] dark:text-muted-foreground dark:ring-white/[0.07]">
                  <span className="mr-1.5 text-[10px] font-bold opacity-40">Caller</span>
                  मुझे अपॉइंटमेंट बुक करना है।
                </span>
              </div>
              <div className="flex justify-start text-xs">
                <span className="max-w-[90%] rounded-lg bg-primary/20 px-3 py-2 text-primary ring-1 ring-primary/25 dark:bg-primary/15">
                  <span className="mr-1.5 text-[10px] font-bold opacity-60">Agent</span>
                  बिल्कुल — आपका नाम क्या है और किस दिन/समय का स्लॉट चाहिए?
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Your receptionist stays consistent, captures details, and routes the call to the right person.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ReceptionistCard({
  icon: Icon,
  title,
  description,
  points,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  points: string[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-border bg-card/50 p-7 transition-colors hover:border-primary/25 hover:bg-white/[0.04]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07] text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-4 text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-5 space-y-2">
        {points.map((p) => (
          <div key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" aria-hidden />
            <span>{p}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
