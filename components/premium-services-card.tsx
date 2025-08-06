import Link from "next/link"
import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PremiumServicesCard() {
  return (
    <Card className="border border-[#E5DDFF] shadow-md bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-purple-200">
      <CardContent className="p-4 text-center">
        {/* Enhanced visual element with subtle animation */}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm border border-purple-100">
          <Crown className="h-6 w-6 text-purple-600" />
        </div>

        {/* Title with better contrast */}
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Upgrade Account</h3>

        {/* Enhanced description with better line height */}
        <p className="text-slate-600 mb-4 text-sm leading-relaxed">
          Boost your job search with premium tools and expert support.
        </p>

        {/* Enhanced CTA Button */}
        <Link href="/premium-services" className="w-full">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 text-sm py-2 shadow-sm hover:shadow-md transition-all duration-200">
            Upgrade Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
