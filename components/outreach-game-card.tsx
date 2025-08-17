"use client"

import { MessageCircle, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ApplicationNeedingOutreach {
  id: string
  company: string
  position: string
  companyInitials: string
}

interface OutreachGameCardProps {
  applicationsWithOutreach: number
  currentStreak: number
  totalConnections: number
  applicationsNeedingOutreach: ApplicationNeedingOutreach[]
}

export function OutreachGameCard({
  applicationsWithOutreach,
  currentStreak,
  totalConnections,
  applicationsNeedingOutreach,
}: OutreachGameCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400 flex items-center">
          <MessageCircle className="h-5 w-5 mr-2" />
          Connection Tracker
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
            <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">{applicationsWithOutreach}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Applications with Outreach</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
            <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">{currentStreak} days</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Current Streak</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{totalConnections}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Connections</div>
          </div>
        </div>

        {/* Action Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold flex items-center text-gray-900 dark:text-white">
            <Zap className="h-4 w-4 mr-1 text-orange-500" />
            Applications Needing Outreach
          </h3>

          {applicationsNeedingOutreach.length > 0 ? (
            <div className="space-y-3">
              {applicationsNeedingOutreach.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 bg-purple-100 dark:bg-purple-900">
                      <AvatarFallback className="text-purple-600 dark:text-purple-400 text-xs font-semibold">
                        {app.companyInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">{app.company}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{app.position}</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                    Start Outreach
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
              <p className="text-green-800 dark:text-green-200 text-sm">
                You've initiated outreach for all your applications!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
