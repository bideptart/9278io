import Link from "next/link"
import Image from "next/image"
import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react"

const nav = {
  Platform: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "API Docs", href: "https://voice.9278.io/signin" },
    { label: "Dashboard", href: "https://voice.9278.io/signin" },
  ],
  Industries: [
    { label: "Real Estate", href: "/industries/real-estate" },
    { label: "Legal Services", href: "/industries/legal" },
    { label: "E-Commerce", href: "/industries/ecommerce" },
    { label: "Restaurants", href: "/industries/restaurants" },
    { label: "Automotive", href: "/industries/automotive" },
    { label: "Home Services", href: "/industries/home-services" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund & Cancellation", href: "/refund-policy" },
    { label: "Grievance Redressal", href: "/grievance-redressal" },
    { label: "All policies →", href: "/legal" },
  ],
}

const socials = [
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "X / Twitter", icon: Twitter, href: "https://x.com" },
  { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
]

export function SiteFooter() {
  return (
    <footer className="bg-slate-900">
      <div className="w-full px-6 py-14 md:px-8 md:py-16">
        {/* Top row */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-3">
            <Link href="/" aria-label="9278.io home">
              <Image src="/whitetheme.png" alt="9278.io" width={35} height={30} style={{ height: 30, width: "auto" }} />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Native-audio voice agents for Indian businesses. Sub-second latency, self-hosted dashboard,
              Indian carrier connectivity — without the enterprise vendor markup.
            </p>
            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white/40 transition-colors hover:border-primary/40 hover:bg-primary/[0.12] hover:text-primary"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-9 md:grid-cols-4">
            {Object.entries(nav).map(([section, links]) => (
              <div key={section}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">{section}</h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/40 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start gap-3 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between md:gap-5">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} 9278.io · All rights reserved.
          </p>
          <a
            href="https://voice.9278.io/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary/70 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Customer dashboard →
          </a>
        </div>
      </div>
    </footer>
  )
}
