import Link from "next/link"
import { CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

export function PremiumSidebarLinks() {
  return (
    <div className="space-y-1">
      <Link
        href="/billing"
        className={cn(
          "flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors",
          "group relative",
        )}
      >
        <CreditCard className="h-5 w-5" />
        <span className="font-medium">Billing</span>
      </Link>
    </div>
  )
}
