import { Layout } from "@/components/layout"
import { ProfileCard } from "@/components/profile-card"
import { StatisticsCard } from "@/components/statistics-card"
import { InterviewPipeline } from "@/components/interview-pipeline"
import { OutreachGameCard } from "@/components/outreach-game-card"
import { DashboardActionItems } from "@/components/dashboard-action-items"

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

// Sample applications data
const applications = [
  {
    id: "1",
    company: "Tech Co",
    position: "Software Engineer",
    location: "San Francisco, CA",
    status: "Interview",
    appliedDate: "2023-12-15",
    nextStep: "Technical Interview on 2024-01-10",
    coachFeedback: "Great progress! Focus on system design questions for the upcoming interview.",
    reachOuts: [
      {
        id: "r1",
        name: "John Doe",
        position: "Engineering Manager",
        date: "2023-12-20",
        type: "hiring_manager",
        week: 1,
        platform: "linkedin",
        status: "responded",
      },
      {
        id: "r2",
        name: "Jane Smith",
        position: "Senior Developer",
        date: "2023-12-22",
        type: "team_member",
        week: 1,
        platform: "linkedin",
        status: "sent",
      },
    ],
    interviewStage: "Technical Interview",
    hasReferral: true,
    generalNotes: "This is a great opportunity with a growing team.",
    postSource: "InterRoom",
    jobLink: "https://example.com/job/123",
    compensation: "$120,000 - $150,000",
    interviewPipeline: [
      { type: "phone_screen", date: "2023-12-20", completed: true, notes: "Went well, discussed background" },
      { type: "hiring_manager", date: "2024-01-05", completed: false },
    ],
    dueDate: "2024-01-15",
    offerStatus: "pending",
  },
  {
    id: "2",
    company: "Startup Inc",
    position: "Full Stack Developer",
    location: "Remote",
    status: "Applied",
    appliedDate: "2023-12-20",
    nextStep: "Waiting for response",
    coachFeedback: "Consider following up if you don't hear back within a week.",
    reachOuts: [],
    hasReferral: false,
    postSource: "Self Sourced",
    jobLink: "https://example.com/job/456",
    interviewPipeline: [{ type: "phone_screen", completed: false }],
  },
  {
    id: "3",
    company: "Big Tech",
    position: "Product Manager",
    location: "New York, NY",
    status: "Interview",
    appliedDate: "2023-12-10",
    nextStep: "Final Interview on 2024-01-05",
    coachFeedback: "Prepare case studies and practice behavioral questions.",
    reachOuts: [],
    interviewStage: "Final Round",
    hasReferral: true,
    generalNotes: "Need to prepare for case studies and behavioral questions.",
    postSource: "InterRoom",
    jobLink: "https://example.com/job/789",
    compensation: "$140,000 - $180,000",
    interviewPipeline: [
      { type: "phone_screen", date: "2023-12-15", completed: true },
      { type: "hiring_manager", date: "2023-12-22", completed: true },
    ],
    dueDate: "2024-01-10",
  },
  {
    id: "4",
    company: "Tech Innovators",
    position: "Frontend Developer",
    location: "Austin, TX",
    status: "Applied",
    appliedDate: "2023-12-18",
    nextStep: "Waiting for response",
    coachFeedback: "",
    reachOuts: [
      {
        id: "r3",
        name: "Mike Johnson",
        position: "Recruiter",
        date: "2023-12-21",
        type: "recruiter",
        week: 1,
        platform: "email",
        status: "sent",
      },
    ],
    hasReferral: false,
    postSource: "InterRoom",
    jobLink: "https://example.com/job/567",
    interviewPipeline: [{ type: "phone_screen", completed: false }],
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

        {/* Action Items Section */}
        <div className="w-full">
          <DashboardActionItems />
        </div>

        {/* Professional Outreach section */}
        <div className="w-full">
          <OutreachGameCard applications={applications} />
        </div>
      </div>
    </Layout>
  )
}
