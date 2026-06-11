"use client"

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
            Greet callers, qualify requests, route to the right team, and book appointments — in 10+ Indian languages.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
