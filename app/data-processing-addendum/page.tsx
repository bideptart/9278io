import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "Data Processing Addendum (DPDPA 2023) — 9278.io",
  description: "The DPA governing 9278.io's processing of your callers' personal data as your Data Processor.",
  path: "/data-processing-addendum",
})

const BODY = "This Data Processing Addendum (“DPA”) forms part of the Terms of Service between Swadesh Mobile Private Limited operating 9278.io (“Data Processor”, “we”) and the business customer (“Data Fiduciary”, “Customer”). It applies where 9278.io processes personal data on the Customer’s behalf — in practice, the personal data of the Customer’s callers/contacts handled by the AI agent. For 9278.io’s own processing as Data Fiduciary, see the Privacy Policy.\n\n1. ROLES (DPDPA)\nThe Customer is the Data Fiduciary and determines the purpose and means of processing its callers’ personal data; 9278.io is the Data Processor and processes such data only under the Customer’s instructions and this DPA, as permitted by DPDPA s.8(2).\n\n2. DETAILS OF PROCESSING\n• Subject-matter: provision of the AI voice-agent Services (answering, recording, transcribing, routing, analytics).\n• Personal data: caller/called numbers, call detail records, recordings, transcripts, conversation metadata, and contact data the Customer provides.\n• Data Principals: the Customer’s callers, contacts, and customers.\n• Duration: the term of the Terms. Retention: per Customer configuration and applicable law.\n\n3. PROCESSOR OBLIGATIONS\n• process personal data only on the Customer’s documented instructions and for the agreed purposes;\n• implement reasonable security safeguards (DPDPA s.8(5); IT Act/SPDI), including encryption, access control, and monitoring;\n• ensure personnel are bound by confidentiality;\n• assist the Customer with Data Principal requests (access, correction, erasure, grievance) and with its breach-notification duties;\n• notify the Customer without undue delay (and in any event within 24 hours of becoming aware) of any personal data breach affecting the Customer’s data, so the Customer can notify the Data Protection Board and affected Data Principals (DPDPA s.8(6));\n• on termination, erase or return the personal data and confirm erasure, except where retention is required by law (DPDPA s.8(7)).\n\n4. CUSTOMER OBLIGATIONS\nThe Customer must have a valid notice/consent or lawful basis for the data it processes through the Services (including for recording and any outbound/commercial communication under TRAI/DLT), must publish its own privacy notice and Grievance Officer, and must not instruct processing that breaches the DPDPA.\n\n5. SUB-PROCESSORS\nThe Customer authorises 9278.io to engage the sub-processors in the Sub-Processor List (hosting, AI/ASR/TTS, payments, communications). 9278.io imposes equivalent obligations on them, remains responsible for them, and will give reasonable notice of changes with a right to object.\n\n6. DATA LOCALISATION AND TRANSFERS\n9278.io stores and processes the Customer’s personal data on infrastructure located in India. Any processing outside India occurs only as permitted by the DPDPA (subject to Central Government restrictions on notified countries) and with appropriate safeguards. The Sub-Processor List identifies any offshore processing.\n\n7. GOVERNING LAW\nThis DPA is governed by the laws of India and prevails over the Terms on matters relating to the processing of personal data. Customers needing a signed DPA may contact legal@9278.io.\n\nCONTACT\nPrivacy: privacy@9278.io · Grievance Officer: grievance@9278.io · Legal: legal@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"Data Processing Addendum (DPDPA 2023)"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/data-processing-addendum"}
      body={BODY}
    />
  )
}
