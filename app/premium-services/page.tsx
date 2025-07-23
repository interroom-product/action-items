import { Layout } from "@/components/layout"
import { PremiumServicesQuestionnaire } from "@/components/premium-services-questionnaire"

export default function PremiumServicesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <PremiumServicesQuestionnaire />
      </div>
    </Layout>
  )
}
