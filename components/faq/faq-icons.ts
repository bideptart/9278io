import { Bot, CreditCard, Languages, LifeBuoy, Phone, ShieldCheck, type LucideIcon } from "lucide-react"

export const FAQ_GROUP_ICONS: Record<string, LucideIcon> = {
  billing: CreditCard,
  "phone-numbers": Phone,
  languages: Languages,
  agents: Bot,
  compliance: ShieldCheck,
  account: LifeBuoy,
}
