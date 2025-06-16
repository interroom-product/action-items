import { Card, CardContent } from "@/components/ui/card"

interface WeeklyData {
  week: string
  applications: number
  reachOuts: number
}

interface StatisticsCardProps {
  weeklyData: WeeklyData[]
}

export function StatisticsCard({ weeklyData }: StatisticsCardProps) {
  const maxValue = Math.max(...weeklyData.flatMap((data) => [data.applications, data.reachOuts]))
  const totalApplications = weeklyData.reduce((sum, data) => sum + data.applications, 0)
  const totalReachOuts = weeklyData.reduce((sum, data) => sum + data.reachOuts, 0)

  return (
    <Card className="overflow-hidden border border-[#E5DDFF] shadow-lg bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-[#9458FA] mb-8">Job Search Progress</h2>
        <div className="flex justify-between items-end h-[300px] mb-8">
          {weeklyData.map((data, index) => (
            <div key={index} className="flex flex-col items-center group px-4">
              <div className="flex space-x-2">
                <div className="relative">
                  <div
                    className="w-4 bg-gradient-to-t from-[#9458FA] to-[#AD88FD] rounded-sm absolute bottom-0 shadow-sm"
                    style={{
                      height: `${(data.applications / maxValue) * 200}px`,
                    }}
                  />
                </div>
                <div className="relative">
                  <div
                    className="w-4 bg-gradient-to-t from-[#C8B3FF] to-[#E5DDFF] rounded-sm absolute bottom-0 shadow-sm"
                    style={{
                      height: `${(data.reachOuts / maxValue) * 200}px`,
                    }}
                  />
                </div>
              </div>
              <div className="text-sm text-[#A8A29E] mt-4 font-medium">{data.week}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-[#9458FA] to-[#AD88FD] rounded-full mr-2 shadow-sm" />
            <span className="text-sm text-[#44403C] font-medium">Applications ({totalApplications} total)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gradient-to-r from-[#C8B3FF] to-[#E5DDFF] rounded-full mr-2 shadow-sm" />
            <span className="text-sm text-[#44403C] font-medium">Reach Outs ({totalReachOuts} total)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
