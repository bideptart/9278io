// Google Analytics 4 + Google Ads conversion helpers.
//
// IDs come from environment variables (all NEXT_PUBLIC_* so they can run in the
// browser). When they are unset the helpers are safe no-ops, so nothing loads
// or fires until the values are configured.
//
//   NEXT_PUBLIC_GA4_MEASUREMENT_ID          e.g. "G-XXXXXXXXXX"
//   NEXT_PUBLIC_GOOGLE_ADS_ID               e.g. "AW-XXXXXXXXXX"
//   NEXT_PUBLIC_GOOGLE_ADS_SIGNUP_LABEL     conversion label for get-started completion
//   NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL   conversion label for purchase

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || ""
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || ""
export const ADS_SIGNUP_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_SIGNUP_LABEL?.trim() || ""
export const ADS_PURCHASE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL?.trim() || ""

export const isGoogleTagsEnabled = Boolean(GA4_ID || GOOGLE_ADS_ID)

type GtagParams = Record<string, unknown>

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void
    dataLayer?: unknown[]
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  // eslint-disable-next-line prefer-spread
  window.gtag(...args)
}

/** Fire a GA4 event. */
export function trackEvent(name: string, params: GtagParams = {}) {
  gtag("event", name, params)
}

/** Fire a Google Ads conversion for the given conversion label (AW-XXX/LABEL). */
export function trackAdsConversion(label: string, params: GtagParams = {}) {
  if (!GOOGLE_ADS_ID || !label) return
  gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${label}`, ...params })
}

/**
 * Get-started completion (account created / signup finished).
 * Sends a GA4 `sign_up` event and the Google Ads signup conversion.
 */
export function trackGetStartedComplete(params: GtagParams = {}) {
  trackEvent("sign_up", { method: "get_started", ...params })
  trackAdsConversion(ADS_SIGNUP_LABEL, params)
}

type PurchaseInput = {
  value?: number
  currency?: string
  transactionId?: string
  plan?: string
}

/** Purchase completed. Sends a GA4 `purchase` event and the Ads purchase conversion. */
export function trackPurchase({ value, currency = "INR", transactionId, plan }: PurchaseInput) {
  trackEvent("purchase", {
    value,
    currency,
    transaction_id: transactionId,
    items: plan ? [{ item_name: plan }] : undefined,
  })
  trackAdsConversion(ADS_PURCHASE_LABEL, { value, currency, transaction_id: transactionId })
}

/**
 * Purchase that is immediately followed by a navigation (e.g. the Razorpay
 * success handler redirects to the portal). Uses the Ads conversion
 * `event_callback` so the hit is sent before we leave the page, with a short
 * timeout fallback so the user is never blocked if the tag isn't configured.
 */
export function trackPurchaseThenRedirect(input: PurchaseInput & { redirectUrl: string }) {
  const { redirectUrl, value, currency = "INR", transactionId, plan } = input

  // GA4 purchase (fire-and-forget; GA4 uses sendBeacon and survives unload).
  trackEvent("purchase", {
    value,
    currency,
    transaction_id: transactionId,
    items: plan ? [{ item_name: plan }] : undefined,
  })

  let navigated = false
  const go = () => {
    if (navigated) return
    navigated = true
    window.location.href = redirectUrl
  }

  if (GOOGLE_ADS_ID && ADS_PURCHASE_LABEL && typeof window !== "undefined" && typeof window.gtag === "function") {
    gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${ADS_PURCHASE_LABEL}`,
      value,
      currency,
      transaction_id: transactionId,
      event_callback: go,
    })
    // Fallback: never let a missing/blocked tag strand the user.
    setTimeout(go, 1200)
  } else {
    go()
  }
}
