import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/legal-page"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "AI Voice Disclosure & Responsible-AI Policy — 9278.io",
  description: "9278.io's rules on disclosing automated calls, no deepfakes/impersonation, and human escalation.",
  path: "/ai-disclosure",
})

const BODY = "This Policy supplements the Terms, AUP, and Privacy Policy and applies to every AI voice agent built on 9278.io. It reflects emerging Indian expectations on AI transparency (including MeitY advisories on AI-generated content and synthetically generated information) and consumer-protection law.\n\n1. DISCLOSURE THAT THE CALLER IS SPEAKING TO AN AI\nEvery AI agent must clearly and promptly tell the caller, at the start of the interaction, that they are speaking with an automated/AI voice assistant and not a human, and identify the business on whose behalf it is calling. The platform provides a configurable opening disclosure; you must keep it enabled and accurate.\n\n2. NO IMPERSONATION OR DECEPTIVE / DEEPFAKE AUDIO\nYou must not configure an AI agent to impersonate a specific, identifiable real person, to clone a real individual’s voice without their explicit consent, or to deceive callers about the nature of the call. Synthetic/AI-generated audio must not be used to mislead, defraud, or spread false information.\n\n3. HUMAN ESCALATION\nWhere a caller asks to speak to a human, or the matter is sensitive (e.g. complaints, financial or medical decisions, vulnerable callers), the agent should offer escalation or call-back to a human (call forwarding to your team).\n\n4. ACCURACY, GROUNDING AND LIMITS\nAI responses (including RAG over your documents) can be inaccurate. You are responsible for the prompts, knowledge sources, and scripts you deploy, and must not rely on the AI as the sole basis for decisions that significantly affect a caller. Do not use the AI for regulated advice (legal, medical, financial) beyond information you are authorised to give.\n\n5. CONSENT, RECORDING AND DATA\nCalls handled by your AI agent involve collecting personal data and (where enabled) recording. You must obtain the consents and give the notices required by the DPDPA and the Call Recording & Consent Notice, and configure retention appropriately. 9278.io does not use your call content to train generative models without your documented consent.\n\n6. LANGUAGES AND FAIRNESS\nThe platform supports multiple Indian languages; you should ensure your agent’s scripts are appropriate and non-discriminatory across the languages and communities you serve.\n\n7. ENFORCEMENT\nMisuse of AI voice features (impersonation, deepfakes, undisclosed automation, deception) is a serious breach and may lead to immediate suspension and reporting to authorities.\n\nCONTACT\nLegal: legal@9278.io · Grievance Officer: grievance@9278.io · Support: support@9278.io\nSwadesh Mobile Private Limited (9278.io), 1108, Sureshwari Techno IT Park Premises CHS, Link Road, Borivali West, Mumbai, Maharashtra 400092, India."

export default function Page() {
  return (
    <LegalPage
      title={"AI Voice Disclosure & Responsible-AI Policy"}
      lastUpdated="20 June 2026"
      operator="Operated by Swadesh Mobile Private Limited · India"
      path={"/ai-disclosure"}
      body={BODY}
    />
  )
}
