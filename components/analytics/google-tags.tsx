"use client"

import Script from "next/script"
import { GA4_ID, GOOGLE_ADS_ID, isGoogleTagsEnabled } from "@/lib/analytics/gtag"

/**
 * Loads Google's global site tag (gtag.js) once and configures both GA4 and
 * Google Ads from it. Both scripts use next/script strategy="afterInteractive"
 * so they load after the page is interactive and never block first paint.
 *
 * Renders nothing until at least one ID is set via env
 * (NEXT_PUBLIC_GA4_MEASUREMENT_ID / NEXT_PUBLIC_GOOGLE_ADS_ID).
 */
export function GoogleTags() {
  if (!isGoogleTagsEnabled) return null

  // gtag.js only needs to be requested once; use whichever ID is present.
  const loaderId = GA4_ID || GOOGLE_ADS_ID

  return (
    <>
      <Script
        id="gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
          ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
        `}
      </Script>
    </>
  )
}
