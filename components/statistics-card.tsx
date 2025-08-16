import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeeklyData {
  week: string
  applications: number
  reachOuts: number
}

interface StatisticsCardProps {
  weeklyData: WeeklyData[]
}

export function StatisticsCard({ weeklyData }: StatisticsCardProps) {
  const maxValue = Math.max(...weeklyData.flatMap((data) => [data.applications, data.reachOuts]), 1)
  const totalApplications = weeklyData.reduce((sum, data) => sum + data.applications, 0)
  const totalReachOuts = weeklyData.reduce((sum, data) => sum + data.reachOuts, 0)

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-purple-600">Job Search Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-end h-[200px] mb-6">
          {weeklyData.map((data, index) => (
            <div key={index} className="flex flex-col items-center group px-4">
              <div className="flex space-x-2">
                <div className="relative">
                  <div
                    className="w-6 bg-blue-500 rounded-sm absolute bottom-0"
                    style={{
                      height: `${Math.max((data.applications / maxValue) * 150, 4)}px`,
                    }}
                  />
                </div>
                <div className="relative">
                  <div
                    className="w-6 bg-purple-400 rounded-sm absolute bottom-0"
                    style={{
                      height: `${Math.max((data.reachOuts / maxValue) * 150, 4)}px`,
                    }}
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-4 font-medium">{data.week}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
            <span className="text-sm text-gray-700 font-medium">Applications ({totalApplications} total)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-2" />
            <span className="text-sm text-gray-700 font-medium">Reach Outs ({totalReachOuts} total)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
