"use client"

import Script from "next/script"

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  PLACEHOLDER — CALL-TRACKING INTEGRATION
 * ───────────────────────────────────────────────────────────────────────────
 *  Drop your call-tracking provider's script here (e.g. CallRail, Invoca,
 *  DialogTech, WhatConverts) to enable dynamic number insertion (DNI) and
 *  attribute inbound phone calls to Google Ads campaigns.
 *
 *  TO ACTIVATE:
 *   1. Create the tracking script/number pool in your provider.
 *   2. Set NEXT_PUBLIC_CALL_TRACKING_SRC to the provider's swap.js URL.
 *      (Or replace the <Script src> below with the provider's snippet.)
 *   3. For Google Ads "calls from ads / website" conversions, also import a
 *      Call conversion the same way as a purchase — see lib/analytics/gtag.ts
 *      (trackAdsConversion) and add a NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL.
 *
 *  Until NEXT_PUBLIC_CALL_TRACKING_SRC is set, this renders nothing (no-op).
 * ───────────────────────────────────────────────────────────────────────────
 */
export function CallTracking() {
  const src = process.env.NEXT_PUBLIC_CALL_TRACKING_SRC?.trim()
  if (!src) return null

  return <Script id="call-tracking" src={src} strategy="afterInteractive" />
}
