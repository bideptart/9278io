'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('overflow-hidden rounded-xl border border-border bg-white', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  /** Overrides the default triangle indicator, e.g. a Lucide icon. */
  icon?: React.ReactNode
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center gap-3 px-6 pt-5 pb-5 data-[state=open]:pb-0 text-left text-base font-semibold transition-all outline-none hover:text-primary focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg]:origin-center [&>svg]:transition-transform [&>svg]:duration-200 [&[data-state=open]>svg]:rotate-90',
          className,
        )}
        {...props}
      >
        {icon ?? <ChevronRight className="pointer-events-none size-4 shrink-0" aria-hidden="true" />}
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('px-6 pt-1 pb-5', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
