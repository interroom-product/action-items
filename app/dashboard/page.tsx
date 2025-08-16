import { Layout } from "@/components/layout"
import { ProfileCard } from "@/components/profile-card"
import { StatisticsCard } from "@/components/statistics-card"
import { InterviewPipeline } from "@/components/interview-pipeline"

const weeklyData = [
  { week: "Week 1", applications: 0, reachOuts: 0 },
  { week: "Week 2", applications: 0, reachOuts: 0 },
  { week: "Week 3", applications: 0, reachOuts: 0 },
  { week: "Week 4", applications: 0, reachOuts: 0 },
]

const interviews = []

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-8 bg-gray-50 min-h-screen -m-8 p-8">
        <div>
          <h2 className="text-3xl font-bold text-purple-600 mb-2">Welcome back, Ajay!</h2>
          <p className="text-gray-600">Here's an overview of your job search progress</p>
        </div>

        {/* Top row with Profile and Job Search Progress */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <ProfileCard
              name="Ajay Nichani"
              title="Senior Product Manager"
              targetSalary={180000}
              experience={8}
              location="San Francisco, CA"
              targetRole="Senior Product Manager"
              companiesInProgress={[]}
            />
          </div>

          <div>
            <StatisticsCard weeklyData={weeklyData} />
          </div>
        </div>

        {/* Interview Pipeline Section */}
        <div>
          <InterviewPipeline interviews={interviews} />
        </div>
      </div>
    </Layout>
  )
}
