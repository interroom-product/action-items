"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ComposedChart, Bar, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Rocket } from "lucide-react"

const launchData = [
  { date: "Nov 4", applications: 75, reachouts: 0, isLaunchDay: true },
  { date: "Nov 5", applications: 0, reachouts: 1 },
  { date: "Nov 6", applications: 0, reachouts: 0 },
  { date: "Nov 7", applications: 0, reachouts: 2 },
  { date: "Nov 8", applications: 0, reachouts: 0 },
  { date: "Nov 9", applications: 0, reachouts: 0 },
  { date: "Nov 10", applications: 0, reachouts: 1 },
  { date: "Nov 11", applications: 75, reachouts: 0, isLaunchDay: true },
  { date: "Nov 12", applications: 0, reachouts: 0 },
  { date: "Nov 13", applications: 0, reachouts: 1 },
  { date: "Nov 14", applications: 0, reachouts: 0 },
  { date: "Nov 15", applications: 0, reachouts: 2 },
  { date: "Nov 16", applications: 0, reachouts: 0 },
  { date: "Nov 17", applications: 0, reachouts: 0 },
  { date: "Nov 18", applications: 75, reachouts: 1, isLaunchDay: true },
  { date: "Nov 19", applications: 0, reachouts: 0 },
  { date: "Nov 20", applications: 0, reachouts: 1 },
  { date: "Nov 21", applications: 0, reachouts: 0 },
  { date: "Nov 22", applications: 0, reachouts: 0 },
  { date: "Nov 23", applications: 0, reachouts: 2 },
  { date: "Nov 24", applications: 0, reachouts: 0 },
  { date: "Nov 25", applications: 75, reachouts: 0, isLaunchDay: true },
  { date: "Nov 26", applications: 0, reachouts: 1 },
  { date: "Nov 27", applications: 0, reachouts: 0 },
  { date: "Nov 28", applications: 0, reachouts: 0 },
  { date: "Nov 29", applications: 0, reachouts: 1 },
  { date: "Nov 30", applications: 0, reachouts: 0 },
  { date: "Dec 1", applications: 0, reachouts: 0 },
  { date: "Dec 2", applications: 75, reachouts: 0, isLaunchDay: true },
  { date: "Dec 3", applications: 0, reachouts: 2 },
]

const CustomBar = (props: any) => {
  const { payload, x, y, width, height } = props

  if (payload.isLaunchDay) {
    return (
      <g>
        {/* Background column for launch day */}
        <rect
          x={x}
          y={0}
          width={width}
          height={300}
          fill="#dbeafe"
          fillOpacity={0.3}
          stroke="#3b82f6"
          strokeWidth={1}
          strokeOpacity={0.2}
        />
        {/* Applications text */}
        <text
          x={x + width / 2}
          y={150}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fontWeight="bold"
          fill="#1d4ed8"
        >
          {payload.applications} Apps
        </text>
      </g>
    )
  }

  return null
}

export function SignalBoosterCard() {
  const totalApplications = launchData.reduce((sum, day) => sum + day.applications, 0)
  const totalReachouts = launchData.reduce((sum, day) => sum + day.reachouts, 0)
  const reachoutRate = totalApplications > 0 ? ((totalReachouts / totalApplications) * 100).toFixed(1) : "0.0"

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Rocket className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          The Launch Pad
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Applications</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalApplications}</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Total Reachouts</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalReachouts}</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Reachout Rate</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{reachoutRate}%</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={launchData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                className="text-gray-600 dark:text-gray-400"
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} className="text-gray-600 dark:text-gray-400" domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--foreground)" }}
                formatter={(value, name) => {
                  if (name === "applications") return [value, "Applications Sent"]
                  if (name === "reachouts") return [value, "Reachouts Received"]
                  return [value, name]
                }}
              />

              {/* Custom bars for launch days */}
              <Bar dataKey="applications" fill="transparent" shape={<CustomBar />} />

              {/* Star markers for reachouts */}
              <Scatter dataKey="reachouts" fill="#facc15" shape="star" size={100} name="Reachouts" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span>Weekly batch application strategy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>⭐ Reachout opportunities captured</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
