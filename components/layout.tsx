import { Home, Briefcase, Settings, LogOut, CheckSquare } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type React from "react"
import { PremiumSidebarLinks } from "@/components/premium-sidebar-links"
import { Separator } from "@/components/ui/separator"
import { PremiumServicesCard } from "@/components/premium-services-card"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const isPremium = true // Mock flag for premium users
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <nav className="p-6 space-y-2 h-full flex flex-col">
          <div className="mb-8 flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">IR</span>
            </div>
            <span className="text-xl font-bold text-gray-900">InterRoom</span>
          </div>

          {/* Main Navigation Links */}
          <div className="space-y-1">
            {[
              { href: "/dashboard", icon: Home, label: "Dashboard" },
              { href: "/job-tracker", icon: Briefcase, label: "Job Tracker" },
              { href: "/action-items", icon: CheckSquare, label: "Action Items" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors",
                  "group relative",
                  item.href === "/dashboard" && "bg-gray-100 text-gray-900",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Enhanced Visual Separation */}
          <div className="py-6">
            <Separator className="mb-6 bg-gray-200" />
            <PremiumServicesCard />
          </div>

          {isPremium && (
            <>
              <div className="pt-4">
                <Separator className="mb-4 bg-gray-200" />
                <div className="space-y-2">
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Premium</h3>
                  </div>
                  <PremiumSidebarLinks />
                </div>
              </div>
            </>
          )}

          <div className="mt-auto space-y-2 pt-4">
            <Separator className="mb-4 bg-gray-200" />
            <Link
              href="/logout"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-purple-600">Job Search Platform</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">AN</span>
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
