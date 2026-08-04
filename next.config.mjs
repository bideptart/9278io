// ── Content-Security-Policy ──────────────────────────────────────────────
// Allowlist reflects the third parties actually loaded in the browser:
//   • Google gtag.js  — GA4 + Google Ads  (components/analytics/google-tags)
//   • Razorpay Checkout — checkout.js + payment iframe (get-started/SignupWidget)
//   • Stripe.js       — allowlisted for the Stripe checkout path
//   • Vercel Analytics — va.vercel-scripts.com / vitals.vercel-insights.com
//   • Client fetches  — voice.9278.io (signup order/verify) and Supabase
// Fonts are self-hosted by next/font, so no external font origin is needed.
//
// 'unsafe-inline' is required for script-src/style-src: Next.js injects inline
// bootstrap/streaming scripts and the gtag init snippet, and Radix/Tailwind
// emit inline styles. A nonce-based policy would need per-request middleware,
// which is incompatible with this app's static/standalone output.
const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://checkout.razorpay.com https://api.razorpay.com",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://checkout.razorpay.com https://js.stripe.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://googleads.g.doubleclick.net https://*.razorpay.com https://api.stripe.com https://voice.9278.io https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-src 'self' https://checkout.razorpay.com https://api.razorpay.com https://*.razorpay.com https://js.stripe.com https://hooks.stripe.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
]

// Report-Only by default so violations are surfaced (browser console) without
// breaking anything. Once the reports are clean, set CSP_ENFORCE=true to switch
// the header to the enforcing `Content-Security-Policy` — no code change needed.
const cspEnforced = process.env.CSP_ENFORCE === "true"
const cspHeaderName = cspEnforced ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only"

// 'upgrade-insecure-requests' only has an effect on an enforcing policy —
// browsers ignore it (with a console warning) when sent as Report-Only, so
// it's added just for the enforcing header to avoid that noise.
const cspDirectivesFinal = (cspEnforced ? [...cspDirectives, "upgrade-insecure-requests"] : cspDirectives).join("; ")

const securityHeaders = [
  // Force HTTPS for two years incl. subdomains; eligible for the preload list.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(self "https://checkout.razorpay.com" "https://js.stripe.com")',
  },
  { key: cspHeaderName, value: cspDirectivesFinal },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  // `standalone` outputs a self-contained `.next/standalone` folder that ships
  // its own `node_modules`. Drop it on any Node 18+ host (Hostinger, VPS,
  // Docker, etc.) and run `node server.js` — no Vercel runtime required.
  output: "standalone",
  allowedDevOrigins: ["192.168.2.84", "192.168.2.18"],
  // Keep nodemailer out of the bundle so the contact-form server action
  // runs it as a normal Node require in the serverless/standalone function.
  serverExternalPackages: ["nodemailer"],
  images: {
    // Sharp is installed (devDependency); standalone output ships it.
    // Enable Next/Image optimization so logos/screenshots are served as
    // resized AVIF/WebP instead of full-resolution PNG/JPEG.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Ship lighter client bundles by inlining Lucide / Radix icon imports.
  // Without this, importing one icon pulls in the whole barrel file.
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "date-fns",
      "@radix-ui/react-icons",
    ],
  },
  // Permanent redirect from the non-www apex to the canonical www host, so
  // every URL resolves to https://www.9278.io. `permanent: true` emits a 308
  // (the permanent redirect that preserves method; search engines treat it the
  // same as a 301 for canonicalisation). The host value matches the apex
  // exactly, so www.9278.io is never redirected onto itself.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "9278.io" }],
        destination: "https://www.9278.io/:path*",
        permanent: true,
      },
    ]
  },
  // Security headers on every route. CSP ships as Report-Only first (see
  // `cspHeaderName` above) so the GTM / Stripe.js / Vercel Analytics / Razorpay
  // allowlist can be validated from violation reports before enforcing.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
