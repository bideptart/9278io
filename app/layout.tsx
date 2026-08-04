import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { SITE } from "@/lib/seo"
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/jsonld"
import { PageviewTracker } from "@/components/analytics/pageview-tracker"
import { GoogleTags } from "@/components/analytics/google-tags"
import { CallTracking } from "@/components/analytics/call-tracking"
// Lazy-loaded inside a thin client wrapper — the chat widget pulls in
// motion + lucide and doesn't need to ship on first paint of every page.
import { ChatWidgetLazy } from "@/components/chat/chat-widget-lazy"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — AI Voice Agents for India`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    // Focus keyword first
    "AI receptionist India",
    // Supporting keywords
    "AI voice agent India",
    "AI receptionist",
    "AI voice agent",
    "AI phone answering service",
    "AI call automation",
    "voice AI platform",
    "multilingual AI receptionist",
    "TRAI compliant AI calling",
    "Indian AI voice agent",
    "AI virtual receptionist",
    "conversational AI",
    "AI call center software",
    "9278.io",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: `${SITE.name} — AI Voice Agents for India`,
    description: SITE.description,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — AI Voice Agents for India`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  // Search-engine site verification via the HTML meta-tag method. Paste the
  // token from Google Search Console / Bing Webmaster Tools into the env var
  // (no code change needed). Renders nothing until set.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background font-sans antialiased" suppressHydrationWarning>
        {/* GA4 + Google Ads global site tag (next/script, afterInteractive) */}
        <GoogleTags />
        {/* Placeholder for a call-tracking provider (no-op until configured) */}
        <CallTracking />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <Suspense fallback={null}>
          <PageviewTracker />
        </Suspense>
        {children}
        <ChatWidgetLazy />
      </body>
    </html>
  )
}
