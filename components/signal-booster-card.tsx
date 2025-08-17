"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

// Mock data for the last 30 days
const chartData = [
  { date: "Dec 1", applications: 8, reachouts: 1 },
  { date: "Dec 2", applications: 6, reachouts: 0 },
  { date: "Dec 3", applications: 12, reachouts: 2 },
  { date: "Dec 4", applications: 4, reachouts: 0 },
  { date: "Dec 5", applications: 9, reachouts: 1 },
  { date: "Dec 6", applications: 15, reachouts: 1 },
  { date: "Dec 7", applications: 7, reachouts: 0 },
  { date: "Dec 8", applications: 11, reachouts: 1 },
  { date: "Dec 9", applications: 5, reachouts: 0 },
  { date: "Dec 10", applications: 13, reachouts: 1 },
  { date: "Dec 11", applications: 8, reachouts: 0 },
  { date: "Dec 12", applications: 10, reachouts: 0 },
  { date: "Dec 13", applications: 6, reachouts: 0 },
  { date: "Dec 14", applications: 14, reachouts: 0 },
  { date: "Dec 15", applications: 9, reachouts: 0 },
]

export function SignalBoosterCard() {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          The Signal Booster
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
        {/* Key Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Applications</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">152</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Reachouts</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">7</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Reachout Rate</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">4.6%</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-gray-600 dark:text-gray-400" />
              <YAxis tick={{ fontSize: 12 }} className="text-gray-600 dark:text-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Legend />
              <Bar dataKey="applications" fill="#3b82f6" name="Applications Sent" radius={[2, 2, 0, 0]} />
              <Line
                type="monotone"
                dataKey="reachouts"
                stroke="#10b981"
                strokeWidth={3}
                name="Reachouts Received"
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Insights */}
        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Daily applications trending upward</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded"></div>
            <span>Reachout opportunities identified</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
