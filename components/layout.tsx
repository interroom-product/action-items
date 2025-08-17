import { Home, Briefcase, Settings, LogOut, CheckSquare } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type React from "react"
import { PremiumSidebarLinks } from "@/components/premium-sidebar-links"
import { Separator } from "@/components/ui/separator"
import { PremiumServicesCard } from "@/components/premium-services-card"
import { ThemeToggle } from "@/components/theme-toggle"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const isPremium = true // Mock flag for premium users
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
        <nav className="p-6 space-y-2 h-full flex flex-col">
          <div className="mb-8 flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 dark:bg-purple-500 rounded flex items-center justify-center transition-colors">
              <span className="text-white font-bold text-sm">IR</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">InterRoom</span>
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
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors",
                  "group relative",
                  item.href === "/dashboard" && "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Enhanced Visual Separation */}
          <div className="py-6">
            <Separator className="mb-6 bg-gray-200 dark:bg-gray-600" />
            <PremiumServicesCard />
          </div>

          {isPremium && (
            <>
              <div className="pt-4">
                <Separator className="mb-4 bg-gray-200 dark:bg-gray-600" />
                <div className="space-y-2">
                  <div className="px-3 py-2">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider transition-colors">
                      Premium
                    </h3>
                  </div>
                  <PremiumSidebarLinks />
                </div>
              </div>
            </>
          )}

          <div className="mt-auto space-y-2 pt-4">
            <Separator className="mb-4 bg-gray-200 dark:bg-gray-600" />
            <Link
              href="/logout"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-8 py-4 flex justify-between items-center sticky top-0 z-10 transition-colors">
          <h1 className="text-xl font-semibold text-purple-600 dark:text-purple-400 transition-colors">
            Job Search Platform
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center transition-colors">
              <span className="text-sm font-medium text-white">AN</span>
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
