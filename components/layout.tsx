import { Home, Briefcase, Settings, LogOut, CheckSquare } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type React from "react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 shadow-lg">
        <nav className="p-6 space-y-2 h-full flex flex-col">
          <div className="mb-8 flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#7C3AED] rounded flex items-center justify-center">
              <span className="text-white font-bold">ir</span>
            </div>
            <span className="text-2xl font-bold text-[#7C3AED]">interRoom</span>
          </div>

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
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors",
                  "group relative",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-2">
            <Link
              href="/logout"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Job Search Platform
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-purple-700">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <span className="text-sm font-medium text-purple-700">JD</span>
            </div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
