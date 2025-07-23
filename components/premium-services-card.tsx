import Link from "next/link"
import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PremiumServicesCard() {
  return (
    <Card className="border border-[#E5DDFF] shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden h-full flex flex-col justify-center">
      <CardContent className="p-6 text-center flex flex-col items-center justify-center">
        {/* Visual Element */}
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
          <Crown className="h-10 w-10 text-purple-600" />
        </div>

        {/* Title - Regular font weight */}
        <h3 className="text-2xl font-normal text-slate-800 mb-2">Upgrade account!</h3>

        {/* Updated catchier description */}
        <p className="text-slate-500 mb-8 max-w-xs">
          Boost your chances of getting an offer with a premium set of tools.
        </p>

        {/* CTA Button */}
        <Link href="/premium-services" className="w-full max-w-xs">
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 text-base py-3">
            Upgrade
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
