import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Refund & Cancellation Policy — 9278.io",
  description: "9278.io billing, cancellation, and refund terms under India's Consumer Protection law.",
  path: "/refund-policy",
})

const BODY = "This policy is part of the Terms of Service and explains billing, cancellation, and refunds, consistent with the Consumer Protection Act, 2019 and the Consumer Protection (E-Commerce) Rules, 2020.\n\n1. PLANS, WALLET AND GST\nPlans are billed as wallet credit in Indian Rupees (₹) with per-second usage. We issue a GST tax invoice for every purchase. Included minutes, overage rates, and Indian number rental are as stated on the pricing page. Minutes and wallet credit are valid for 60 days from the date of top-up.\n\n2. CANCELLATION\nYou may cancel at any time from your dashboard or by emailing support@9278.io — no contracts and no cancellation fee. Cancellation stops future recurring charges; the Services continue until the end of the period you have paid for. Provisioned Indian numbers are released on cancellation per telecom rules.\n\n3. REFUNDS\nUnused wallet credit may be refunded on request within 14 days of top-up, less any minutes already consumed and any applicable charges/taxes; used minutes and number-rental fees are non-refundable. Where a charge is made in error or the Service materially failed due to our fault, we will refund the affected amount. Approved refunds are processed to the original payment method within 7–14 business days.\n\n4. SERVICE FAILURES\nWhere the Service was materially unavailable due to our fault (beyond the SLA), you may be entitled to a service credit or pro-rated refund as set out in the SLA. Contact support@9278.io with your account details and the dates affected.\n\n5. DISPUTED CHARGES AND GRIEVANCES\nContact support@9278.io before raising a dispute with your bank or payment provider; most issues are resolved quickly. Unresolved complaints can be escalated under our Grievance Redressal Policy, and consumers may approach the National Consumer Helpline or the relevant consumer forum.\n\nCONTACT\nSupport: support@9278.io · Grievance Officer: grievance@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"Refund & Cancellation Policy"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/refund-policy"}
      body={BODY}
    />
  )
}
