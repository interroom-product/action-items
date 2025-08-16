import Link from "next/link"
import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PremiumServicesCard() {
  return (
    <Card className="border border-gray-200 shadow-sm bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 text-center">
        {/* Enhanced visual element with subtle animation */}
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
          <Crown className="h-6 w-6 text-purple-600" />
        </div>

        {/* Title with better contrast */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upgrade Account</h3>

        {/* Enhanced description with better line height */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          Boost your job search with premium tools and expert support.
        </p>

        {/* Enhanced CTA Button */}
        <Link href="/premium-services" className="w-full">
          <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 text-sm py-2 transition-all duration-200">
            Upgrade Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
