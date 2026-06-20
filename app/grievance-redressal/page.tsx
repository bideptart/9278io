import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Grievance Redressal Policy — 9278.io",
  description: "How to raise a grievance with 9278.io and how we handle it, including our Grievance Officer.",
  path: "/grievance-redressal",
})

const BODY = "This Policy explains how to raise a grievance and how we handle it, in line with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the Consumer Protection (E-Commerce) Rules, 2020, and the Digital Personal Data Protection Act, 2023.\n\n1. GRIEVANCE OFFICER\nIn compliance with the above laws, the contact details of our Grievance Officer are:\n• Designation: Grievance Officer\n• Email: grievance@9278.io\n• Address: Swadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India.\n\n2. WHAT YOU CAN RAISE\nComplaints about the Services, billing, content, misuse, data-protection/privacy (Data Principal grievances under the DPDPA), unwanted/commercial communications (TRAI), or any violation of our policies.\n\n3. HOW TO RAISE A GRIEVANCE\nEmail grievance@9278.io with your name, contact details, account/number (if any), a description of the issue, and any supporting information. For data-protection matters, mark the subject “DPDPA Grievance”.\n\n4. TIMELINES\n• We acknowledge every grievance within 24 hours of receipt.\n• We aim to resolve grievances within 15 days (IT Rules, 2021), and data-protection grievances within the period prescribed under the DPDPA and rules.\n• Requests to remove certain unlawful content (where applicable) are actioned within the timelines the law requires.\n\n5. ESCALATION\nIf you are not satisfied with the resolution:\n• Data-protection matters — you may approach the Data Protection Board of India after exhausting our grievance mechanism.\n• Telecom/UCC matters — you may complain to your telecom service provider / TRAI.\n• Consumer matters — you may approach the National Consumer Helpline / relevant consumer forum or the National Consumer Disputes Redressal Commission.\n\nCONTACT\nGrievance Officer: grievance@9278.io · Legal: legal@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"Grievance Redressal Policy"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/grievance-redressal"}
      body={BODY}
    />
  )
}
