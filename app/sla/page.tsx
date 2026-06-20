import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Service Level Agreement (SLA) — 9278.io",
  description: "9278.io's availability commitment, support targets, and service credits.",
  path: "/sla",
})

const BODY = "This SLA forms part of the Terms of Service and applies to paid plans in good standing.\n\n1. AVAILABILITY COMMITMENT\nWe will use commercially reasonable efforts to make the core platform available at least 99.9% of the time each calendar month (“Monthly Uptime”), measured as (total minutes − Downtime minutes) ÷ total minutes. “Downtime” means sustained unavailability of core call-handling confirmed by our monitoring, excluding Section 3 items.\n\n2. SUPPORT TARGETS\n• P1 — Critical (platform down / agents not answering): target first response 1 hour.\n• P2 — Major: 4 business hours.\n• P3 — Minor / question: 1 business day.\nSupport channels and hours (IST): email and chat, Monday–Saturday, 9 AM – 7 PM, with 24/7 cover for critical (P1) issues. Higher tiers may include priority support / a success manager as per plan.\n\n3. EXCLUSIONS\nDowntime excludes: scheduled or emergency maintenance (notified where practicable); issues caused by upstream telecom carriers/SIP partners, the internet, power outages, the Customer’s configuration, prompts, or integrations; force majeure; suspension for breach or non-payment; and beta features.\n\n4. SERVICE CREDITS\n• Below target but ≥ 99.0% → 10% of that month’s fee as wallet credit.\n• Below 99.0% but ≥ 95.0% → 25%.\n• Below 95.0% → 50%.\nService credits are issued as wallet credit and are your sole and exclusive remedy for availability shortfalls. To claim, email support@9278.io within 30 days of the affected month.\n\nCONTACT\nSupport: support@9278.io · Legal: legal@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"Service Level Agreement (SLA)"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/sla"}
      body={BODY}
    />
  )
}
