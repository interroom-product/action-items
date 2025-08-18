"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Building2 } from "lucide-react"

interface InterviewStage {
  id: string
  company: string
  position: string
  stage: "Phone Screen" | "Hiring Manager" | "Panel Interview" | "Final Stages" | "Offer Negotiation"
  progress: number
  date: string
  time: string
  status: "upcoming" | "past"
  applicationId: string
}

interface InterviewPipelineProps {
  interviews?: InterviewStage[]
}

export function InterviewPipeline({ interviews = [] }: InterviewPipelineProps) {
  const router = useRouter()
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all")

  const filteredInterviews = interviews.filter((interview) => {
    if (filter === "all") return true
    return interview.status === filter
  })

  const handleInterviewClick = (applicationId: string) => {
    router.push(`/job-tracker?tab=submitted&highlight=${applicationId}`)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Phone Screen":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Hiring Manager":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Panel Interview":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Final Stages":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Offer Negotiation":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Interview Pipeline
          </CardTitle>
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All ({interviews.length})
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("upcoming")}
            >
              Upcoming ({interviews.filter((i) => i.status === "upcoming").length})
            </Button>
            <Button variant={filter === "past" ? "default" : "outline"} size="sm" onClick={() => setFilter("past")}>
              Past ({interviews.filter((i) => i.status === "past").length})
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredInterviews.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {filter === "upcoming"
                ? "No upcoming interviews scheduled."
                : filter === "past"
                  ? "No past interviews recorded."
                  : "No interviews in your pipeline. Your next interview will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredInterviews.map((interview) => (
              <div
                key={interview.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-purple-300 dark:hover:border-purple-600"
                onClick={() => handleInterviewClick(interview.applicationId)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">{interview.company}</h4>
                      {interview.status === "past" && (
                        <Badge variant="secondary" className="text-xs">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{interview.position}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(interview.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{interview.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStageColor(interview.stage)}>{interview.stage}</Badge>
                    <div className="mt-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-600 dark:bg-purple-400 h-2 rounded-full transition-all"
                        style={{ width: `${interview.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{interview.progress}% complete</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
