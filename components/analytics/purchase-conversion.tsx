"use client"

import { useEffect } from "react"
import { trackGetStartedComplete, trackPurchase } from "@/lib/analytics/gtag"

/**
 * Fires the get-started completion + purchase conversions once on mount.
 * Used on the Stripe confirmation page (/get-started/thanks) when a payment
 * is confirmed. Runs only in the browser after the tags have loaded.
 */
export function PurchaseConversion({
  value,
  currency = "INR",
  transactionId,
  plan,
}: {
  value?: number
  currency?: string
  transactionId?: string
  plan?: string
}) {
  useEffect(() => {
    trackGetStartedComplete({ plan })
    trackPurchase({ value, currency, transactionId, plan })
    // Fire exactly once for this confirmed order.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
