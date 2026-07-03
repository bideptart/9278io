import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { SITE } from "@/lib/seo"
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/jsonld"
import { PageviewTracker } from "@/components/analytics/pageview-tracker"
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
    "AI voice agent",
    "AI phone agent",
    "voice AI",
    "real-time voice AI",
    "AI receptionist",
    "AI cold caller",
    "AI sales agent",
    "voice bot",
    "SIP voice AI",
    "AI call center",
    "9278.io",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  generator: "v0.app",
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
      <body className="bg-background font-sans antialiased">
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
