import { Layout } from "@/components/layout"
import { PremiumServicesPricing } from "@/components/premium-services-pricing"

export default function PremiumServicesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <PremiumServicesPricing />
      </div>
    </Layout>
  )
}
