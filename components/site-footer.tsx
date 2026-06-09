import Link from "next/link"
import { Logo } from "@/components/logo"
import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react"

const nav = {
  Platform: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "API Docs", href: "https://voice.9278.io/signin" },
    { label: "Dashboard", href: "https://voice.9278.io/signin" },
  ],
  "Use Cases": [
    { label: "Inbound Calls", href: "/use-cases/inbound-calls" },
    { label: "Outbound Calls", href: "/use-cases/outbound-calls" },
    { label: "Lead Qualification", href: "/use-cases/lead-qualification" },
    { label: "Appointment Booking", href: "/use-cases/appointment-booking" },
    { label: "Customer Support", href: "/use-cases/customer-support" },
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
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
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
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-16">
        {/* Top row */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-3">
            <Link href="/" aria-label="9278.io home">
              <Logo height={38} />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
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
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white/[0.03] text-muted-foreground transition-colors hover:border-primary/25 hover:bg-primary/[0.08] hover:text-primary"
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
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">{section}</h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        <div className="mt-14 flex flex-col items-start gap-3 border-t border-border pt-8 md:flex-row md:items-center md:justify-between md:gap-5">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} 9278.io · All rights reserved.
          </p>

          <a
            href="https://voice.9278.io/signin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary underline-offset-4 hover:underline"
          >
            Customer dashboard →
          </a>
        </div>
      </div>
    </footer>
  )
}
