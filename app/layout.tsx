import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { SITE } from "@/lib/seo"
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/jsonld"
import { PageviewTracker } from "@/components/analytics/pageview-tracker"
import { ThemeProvider } from "@/components/theme-provider"
// Lazy-loaded inside a thin client wrapper — the chat widget pulls in
// motion + lucide and doesn't need to ship on first paint of every page.
import { ChatWidgetLazy } from "@/components/chat/chat-widget-lazy"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — AI voice agents that actually sound human`,
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
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — AI voice agents that actually sound human`,
    description: SITE.description,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: `${SITE.name} — AI voice agents that actually sound human`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logo-black.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo-white.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/logo-black.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c18" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <OrganizationJsonLd />
          <WebsiteJsonLd />
          <Suspense fallback={null}>
            <PageviewTracker />
          </Suspense>
          {children}
          <ChatWidgetLazy />
        </ThemeProvider>
      </body>
    </html>
  )
}
