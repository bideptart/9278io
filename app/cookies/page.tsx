import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Cookie Policy — 9278.io",
  description: "How 9278.io uses cookies and similar technologies on its website and dashboard.",
  path: "/cookies",
})

const BODY = "This Cookie Policy explains how 9278.io uses cookies and similar technologies on its website and dashboard. It supports our Privacy Policy and is provided in line with the DPDPA, 2023 and the IT Act.\n\n1. WHAT THESE TECHNOLOGIES ARE\nCookies are small files a website stores in your browser; localStorage/sessionStorage hold small pieces of data. They can be first-party or third-party, and session or persistent.\n\n2. HOW WE USE COOKIES\nWe use these technologies for a few clear purposes. Essential cookies keep the website and customer dashboard working and secure — for example, keeping you signed in and protecting against abuse. Preference cookies remember choices such as your consent selection and language. Analytics cookies help us understand how visitors use the site so we can improve it. Non-essential cookies are set only with your consent, and you can withdraw that consent at any time.\n\n3. MANAGING COOKIES\nWhere non-essential cookies are used, you can accept or refuse them via our consent banner and change your choice anytime. You can also delete or block cookies in your browser settings. Where cookies collect personal data, we process it under the DPDPA on a lawful basis (typically consent).\n\nCONTACT\nPrivacy: privacy@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"Cookie Policy"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/cookies"}
      body={BODY}
    />
  )
}
