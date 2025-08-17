import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { InterviewPipeline } from "@/components/interview-pipeline"
import { SignalBoosterCard } from "@/components/signal-booster-card"
import { Eye, Briefcase, CheckSquare, Zap } from "lucide-react"

const mockApplicationsNeedingOutreach = [
  { id: "1", company: "Google", position: "Senior Product Manager", companyInitials: "GO" },
  { id: "2", company: "Meta", position: "Product Manager", companyInitials: "ME" },
  { id: "3", company: "Apple", position: "Senior PM", companyInitials: "AP" },
]

const mockInterviews = [
  {
    company: "Meta",
    position: "Product Manager",
    stage: "Panel Interview" as const,
    progress: 75,
    date: "Dec 18",
    time: "2:00 PM",
  },
  {
    company: "Google",
    position: "Senior Product Manager",
    stage: "Phone Screen" as const,
    progress: 25,
    date: "Dec 20",
    time: "10:00 AM",
  },
]

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen -m-8 p-8 transition-colors">
        <div>
          <h2 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 transition-colors">
            Welcome back, Ajay!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 transition-colors">
            Here's your job search overview for the week.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Jobs to Review</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">5</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Apps This Week</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tasks Completed</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">7</p>
                </div>
                <CheckSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Networking Streak</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">3 days</p>
                </div>
                <Zap className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <SignalBoosterCard />

        <div className="max-w-4xl">
          <InterviewPipeline interviews={mockInterviews} />
        </div>
      </div>
    </Layout>
  )
}
