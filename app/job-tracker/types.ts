export interface ReachOut {
  id: string
  name: string
  position: string
  date: string
  type: "recruiter" | "hiring_manager" | "team_member"
  week: number
  platform: "linkedin" | "email" | "other"
  notes?: string
  status: "pending" | "sent" | "responded"
}

export interface InterviewStage {
  type: "phone_screen" | "hiring_manager" | "second_round" | "third_round" | "fourth_round"
  date?: string
  completed: boolean
  notes?: string
}

export interface Application {
  id: string
  company: string
  position: string
  location: string
  status: string
  appliedDate: string
  nextStep: string
  coachFeedback: string
  reachOuts: ReachOut[]
  interviewStage?: string

  // New fields
  hasReferral: boolean
  generalNotes?: string
  postSource?: string
  jobLink?: string
  compensation?: string
  interviewPipeline: InterviewStage[]
  dueDate?: string
  offerStatus?: "pending" | "received" | "accepted" | "rejected" | "negotiating"
}

export interface PendingApplication {
  id: string
  company: string
  position: string
  location: string
  deadline: string
  applicationUrl: string
}
