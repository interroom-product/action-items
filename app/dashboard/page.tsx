import { Layout } from "@/components/layout"
import { ProfileCard } from "@/components/profile-card"
import { StatisticsCard } from "@/components/statistics-card"
import { InterviewPipeline } from "@/components/interview-pipeline"
import { PremiumServicesCard } from "@/components/premium-services-card"

const weeklyData = [
  { week: "Week 1", applications: 5, reachOuts: 10 },
  { week: "Week 2", applications: 8, reachOuts: 16 },
  { week: "Week 3", applications: 6, reachOuts: 12 },
  { week: "Week 4", applications: 10, reachOuts: 20 },
]

const interviews = [
  {
    id: "1",
    company: "Tech Co",
    position: "Software Engineer",
    stage: "Panel Interview",
    progress: 75,
    date: "2024-02-15",
    time: "14:00",
  },
  {
    id: "2",
    company: "Startup Inc",
    position: "Full Stack Developer",
    stage: "Phone Screen",
    progress: 25,
    date: "2024-02-18",
    time: "10:30",
  },
  {
    id: "3",
    company: "Big Corp",
    position: "Frontend Engineer",
    stage: "Final Stages",
    progress: 90,
    date: "2024-02-20",
    time: "11:00",
  },
]

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-8 bg-gradient-to-br from-[#FCFBF7] to-[#F6F3FF] min-h-screen -m-8 p-8">
        <div>
          <h2 className="text-2xl font-bold text-[#44403C]">Welcome back, John! 👋</h2>
          <p className="text-[#A8A29E] mt-1">Here's an overview of your job search progress</p>
        </div>

        {/* Top row with 3 cards in a grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <ProfileCard
              name="John Doe"
              title="Software Engineer"
              targetSalary={120000}
              experience={5}
              location="San Francisco, CA"
              targetRole="Senior Product Manager"
              companiesInProgress={["Walmart", "Facebook", "Instacart"]}
            />
          </div>

          <div>
            <StatisticsCard weeklyData={weeklyData} />
          </div>

          <div>
            <InterviewPipeline interviews={interviews} />
          </div>
        </div>

        {/* Second row with Premium Services Card */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <PremiumServicesCard />
          </div>
        </div>
      </div>
    </Layout>
  )
}
