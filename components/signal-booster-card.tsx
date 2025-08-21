"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity } from "lucide-react"
import { useState } from "react"

// Generate activity data for the last 12 weeks (84 days)
const generateActivityData = () => {
  const data = []
  const today = new Date()

  for (let i = 83; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Create realistic patterns: higher activity on weekdays, batch application days
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const isBatchDay = dayOfWeek === 2 || dayOfWeek === 4 // Tuesday/Thursday batch days

    let applications = 0
    let reachouts = 0

    if (!isWeekend) {
      if (isBatchDay) {
        applications = Math.floor(Math.random() * 8) + 5 // 5-12 applications on batch days
        reachouts = Math.floor(Math.random() * 3) + 1 // 1-3 reachouts
      } else {
        applications = Math.floor(Math.random() * 4) + 1 // 1-4 applications on regular days
        reachouts = Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0 // Occasional reachouts
      }
    } else {
      // Weekend activity is minimal
      applications = Math.random() > 0.8 ? 1 : 0
      reachouts = 0
    }

    const totalActivity = applications + reachouts
    let level = 0
    if (totalActivity === 0) level = 0
    else if (totalActivity <= 2) level = 1
    else if (totalActivity <= 5) level = 2
    else if (totalActivity <= 8) level = 3
    else level = 4

    data.push({
      date: date.toISOString().split("T")[0],
      applications,
      reachouts,
      level,
      dayOfWeek,
      month: date.getMonth(),
      day: date.getDate(),
    })
  }

  return data
}

const activityData = generateActivityData()

export function SignalBoosterCard() {
  const [hoveredDay, setHoveredDay] = useState<any>(null)

  const getActivityColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-100 dark:bg-gray-800"
      case 1:
        return "bg-green-200 dark:bg-green-900"
      case 2:
        return "bg-green-300 dark:bg-green-700"
      case 3:
        return "bg-green-500 dark:bg-green-600"
      case 4:
        return "bg-green-700 dark:bg-green-500"
      default:
        return "bg-gray-100 dark:bg-gray-800"
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Group data by weeks for display
  const weeks = []
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7))
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Growth Grid
        </CardTitle>
        <Select defaultValue="30days">
          <SelectTrigger className="w-[140px] h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Heatmap</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-12 gap-1 text-xs">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="space-y-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm cursor-pointer transition-all hover:ring-2 hover:ring-blue-400 ${getActivityColor(day.level)}`}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Hover tooltip */}
            {hoveredDay && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg shadow-lg whitespace-nowrap z-10">
                {formatDate(hoveredDay.date)}: {hoveredDay.applications} applications, {hoveredDay.reachouts} reachouts
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Showing activity for the last 12 weeks • Dark squares indicate high application days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
