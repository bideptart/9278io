import type { Metadata } from "next"
import { Cpu } from "lucide-react"
import { IndustryComingSoon } from "@/components/industries/industry-coming-soon"
import { pageSeo } from "@/lib/seo"

export const metadata: Metadata = pageSeo({
  title: "AI voice agents for SaaS & tech",
  description: "AI voice agents for SaaS & tech teams — playbook coming soon.",
  path: "/industries/saas-tech",
})

export default function SaasTechPage() {
  return (
    <IndustryComingSoon
      name="SaaS & tech"
      Icon={Cpu}
      description="We're building a dedicated playbook for SaaS and tech teams. Check back soon, or get started with a Starter agent today."
    />
  )
}
