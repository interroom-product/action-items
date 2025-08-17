"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, Send, Phone, Percent } from "lucide-react"
import { Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from "recharts"

const jobSearchData = [
  { date: "Aug 1", applications: 12, reachouts: 1 },
  { date: "Aug 2", applications: 8, reachouts: 0 },
  { date: "Aug 3", applications: 0, reachouts: 0 },
  { date: "Aug 4", applications: 1, reachouts: 0 },
  { date: "Aug 5", applications: 14, reachouts: 1 },
  { date: "Aug 6", applications: 9, reachouts: 0 },
  { date: "Aug 7", applications: 11, reachouts: 1 },
  { date: "Aug 8", applications: 7, reachouts: 0 },
  { date: "Aug 9", applications: 13, reachouts: 0 },
  { date: "Aug 10", applications: 2, reachouts: 0 },
  { date: "Aug 11", applications: 0, reachouts: 0 },
  { date: "Aug 12", applications: 15, reachouts: 1 },
  { date: "Aug 13", applications: 6, reachouts: 0 },
  { date: "Aug 14", applications: 10, reachouts: 0 },
  { date: "Aug 15", applications: 8, reachouts: 1 },
  { date: "Aug 16", applications: 12, reachouts: 0 },
  { date: "Aug 17", applications: 1, reachouts: 0 },
  { date: "Aug 18", applications: 0, reachouts: 0 },
  { date: "Aug 19", applications: 9, reachouts: 0 },
  { date: "Aug 20", applications: 14, reachouts: 1 },
  { date: "Aug 21", applications: 7, reachouts: 0 },
  { date: "Aug 22", applications: 11, reachouts: 0 },
  { date: "Aug 23", applications: 5, reachouts: 1 },
  { date: "Aug 24", applications: 2, reachouts: 0 },
  { date: "Aug 25", applications: 0, reachouts: 0 },
  { date: "Aug 26", applications: 13, reachouts: 0 },
  { date: "Aug 27", applications: 8, reachouts: 0 },
  { date: "Aug 28", applications: 10, reachouts: 1 },
  { date: "Aug 29", applications: 6, reachouts: 0 },
  { date: "Aug 30", applications: 9, reachouts: 0 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 dark:bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="font-medium">{label}</p>
        <p className="text-blue-400">Applications: {payload[0]?.value || 0}</p>
        <p className="text-purple-400">Reachouts: {payload[1]?.value || 0}</p>
      </div>
    )
  }
  return null
}

export function SignalBoosterCard() {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">The Signal Booster</h3>
          <Button variant="outline" size="sm" className="text-sm bg-transparent">
            Last 30 Days
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* KPI Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">194</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Applications</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">7</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Reachouts</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Percent className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3.6%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reachout Rate</p>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={jobSearchData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="opacity-30" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                className="text-sm text-gray-600 dark:text-gray-400"
              />
              <YAxis axisLine={false} tickLine={false} className="text-sm text-gray-600 dark:text-gray-400" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="applications" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Applications Sent" />
              <Line
                type="monotone"
                dataKey="reachouts"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                name="Reachouts Received"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
