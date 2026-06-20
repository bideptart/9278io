import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Telecom & Regulatory Compliance Statement — 9278.io",
  description: "How 9278.io operates within India's telecom and TRAI/DoT regulatory framework.",
  path: "/telecom-compliance",
})

const BODY = "This Statement summarises how 9278.io operates within India’s telecom and communications regulatory framework. It supports the Terms and AUP. It is informational and not a substitute for the obligations placed on customers.\n\n1. LICENSED TELECOM CONNECTIVITY\n9278.io provides Indian phone numbers (DIDs) and voice connectivity through licensed Telecom Service Providers (TSPs) and SIP-trunk partners (including Jio, Airtel, BSNL, and Vi). We do not bypass licensed telecom networks. Numbering follows the National Numbering Plan administered by the Department of Telecommunications (DoT).\n\n2. TRAI TCCCPR / DLT / DND\nFor commercial communications, the platform supports DLT-based registration of headers and content templates, NCPR/DND scrubbing, and calling-time-window controls, consistent with TRAI’s Telecom Commercial Communications Customer Preference Regulations, 2018. Customers are responsible for their own DLT registration, consent capture, and lawful campaign content (see AUP).\n\n3. TELECOMMUNICATIONS ACT, 2023\nWe operate consistent with the Telecommunications Act, 2023, including provisions on prior consent for commercial communications, user protection against spam, and message/communication traceability. We cooperate with authorised lawful-interception and information requests as the Act requires.\n\n4. LAWFUL INTERCEPTION AND ASSISTANCE\nWhere required by a competent authority under the Telecommunications Act, 2023, the IT Act, 2000 (s.69), or other law, we provide lawful assistance, interception, or information. We maintain the records and security required by law and disclose data only under valid legal process.\n\n5. KYC AND CUSTOMER VERIFICATION\nWe collect the customer verification information required to provision numbers and services in line with telecom KYC norms. Customers must provide accurate information and keep it current.\n\n6. DATA LOCALISATION\nPersonal data and call data are stored on infrastructure located in India (see Privacy Policy and Sub-Processor List).\n\n7. GRIEVANCES AND REGULATORS\nTelecom/UCC grievances may be raised with us at grievance@9278.io and escalated to your TSP/TRAI; data-protection grievances may be escalated to the Data Protection Board of India after our grievance process.\n\nCONTACT\nLegal: legal@9278.io · Grievance Officer: grievance@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"Telecom & Regulatory Compliance Statement"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/telecom-compliance"}
      body={BODY}
    />
  )
}
