"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MessageCircle, Zap, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useNotifications } from "@/hooks/use-notifications"
import type { Application } from "@/app/job-tracker/types"

interface OutreachGameCardProps {
  applications: Application[]
}

export function OutreachGameCard({ applications }: OutreachGameCardProps) {
  const router = useRouter()
  const [outreachDialogOpen, setOutreachDialogOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const { addActionItem } = useNotifications()

  // Find applications that need outreach (have no or few reach outs)
  const applicationsNeedingOutreach = applications
    .filter((app) => app.status !== "Rejected" && app.reachOuts.length < 2)
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 3)

  // Calculate outreach stats for gamification
  const totalApplications = applications.length
  const applicationsWithOutreach = applications.filter((app) => app.reachOuts.length > 0).length

  // Streak calculation - assume one day of active outreach = one streak day
  // This would normally be calculated based on user activity timestamps
  const currentStreak = 3 // Placeholder

  // Total outreaches
  const totalOutreaches = applications.reduce((sum, app) => sum + app.reachOuts.length, 0)

  const initiateOutreach = (application: Application) => {
    setSelectedApplication(application)
    setOutreachDialogOpen(true)
  }

  const createOutreachTask = () => {
    if (!selectedApplication) return

    // Create action item for outreach
    addActionItem({
      task: `Reach out to a contact at ${selectedApplication.company} regarding your ${selectedApplication.position} application`,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // Due in 2 days
      priority: "High",
      status: "Not Started",
      relatedApplication: selectedApplication.company,
    })

    // Close dialog
    setOutreachDialogOpen(false)

    // Navigate to job tracker page
    router.push(`/job-tracker`)
  }

  return (
    <Card className="border border-[#E5DDFF] shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-[#F6F3FF] to-[#E5DDFF] border-b border-[#E5DDFF]">
        <CardTitle className="text-xl font-semibold text-[#44403C] flex items-center">
          <MessageCircle className="h-5 w-5 mr-2 text-[#9458FA]" />
          Connection Tracker
        </CardTitle>
        <p className="text-sm text-[#A8A29E] mt-1">Build your professional network to enhance your job search</p>
      </CardHeader>

      <CardContent className="p-5">
        {/* Outreach Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 mt-2">
          <div className="bg-gradient-to-br from-white to-[#F6F3FF] rounded-lg p-3 border border-[#E5DDFF] shadow-sm text-center">
            <div className="text-lg font-semibold text-[#9458FA]">{applicationsWithOutreach}</div>
            <div className="text-xs text-[#A8A29E]">Applications with Outreach</div>
          </div>
          <div className="bg-gradient-to-br from-white to-[#E5DDFF] rounded-lg p-3 border border-[#C8B3FF] shadow-sm text-center">
            <div className="text-lg font-semibold text-[#AD88FD]">{currentStreak} days</div>
            <div className="text-xs text-[#A8A29E]">Current Streak</div>
          </div>
          <div className="bg-gradient-to-br from-white to-[#F0ECE8] rounded-lg p-3 border border-[#E5DDFF] shadow-sm text-center">
            <div className="text-lg font-semibold text-[#44403C]">{totalOutreaches}</div>
            <div className="text-xs text-[#A8A29E]">Total Connections</div>
          </div>
        </div>

        {/* Outreach Cards */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center mb-3 text-[#44403C]">
            <Zap className="h-4 w-4 mr-1 text-[#F0ECE8]" />
            Ready for your next outreach? Start here:
          </h3>

          {applicationsNeedingOutreach.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {applicationsNeedingOutreach.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-lg p-3 border border-[#E5DDFF] shadow-sm hover:shadow-md transition-all relative overflow-hidden hover:border-[#C8B3FF]"
                >
                  {app.reachOuts.length === 0 && (
                    <div className="absolute top-0 right-0 bg-[#9458FA] text-white text-xs px-2 py-0.5 rounded-bl-md">
                      New
                    </div>
                  )}
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-8 w-8 bg-gradient-to-br from-[#E5DDFF] to-[#C8B3FF] border border-[#C8B3FF]">
                      <AvatarFallback className="text-[#9458FA] text-xs font-semibold">
                        {app.company.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="truncate">
                      <h4 className="font-medium text-sm text-[#44403C] truncate">{app.company}</h4>
                      <p className="text-xs text-[#A8A29E] truncate">{app.position}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <Badge
                      className={
                        app.reachOuts.length === 0
                          ? "bg-[#F0ECE8] text-[#44403C] text-xs border-[#A8A29E] hover:bg-[#F0ECE8]"
                          : "bg-[#E5DDFF] text-[#9458FA] text-xs border-[#C8B3FF] hover:bg-[#E5DDFF]"
                      }
                    >
                      {app.reachOuts.length === 0 ? "No outreach" : "Need more"}
                    </Badge>
                    <span className="text-xs text-[#A8A29E]">{new Date(app.appliedDate).toLocaleDateString()}</span>
                  </div>

                  <Button
                    className="w-full mt-1 bg-gradient-to-r from-[#9458FA] to-[#AD88FD] text-white hover:from-[#AD88FD] hover:to-[#C8B3FF] h-8 text-xs shadow-sm transition-all duration-200"
                    onClick={() => initiateOutreach(app)}
                  >
                    Start Outreach
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#F6F3FF] to-[#E5DDFF] rounded-lg p-6 text-center border border-[#E5DDFF] shadow-sm">
              <MessageCircle className="h-10 w-10 mx-auto mb-3 text-[#C8B3FF]" />
              <p className="text-[#44403C] mb-4">You've initiated outreach for all your applications.</p>
              <Button
                variant="outline"
                className="border-[#C8B3FF] text-[#9458FA] hover:bg-[#F6F3FF]"
                onClick={() => router.push("/job-tracker")}
              >
                View All Applications
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      {/* Outreach Dialog */}
      <Dialog open={outreachDialogOpen} onOpenChange={setOutreachDialogOpen}>
        <DialogContent className="border-[#E5DDFF] shadow-lg">
          <DialogHeader className="bg-gradient-to-r from-[#F6F3FF] to-[#E5DDFF] -mx-6 -mt-6 px-6 py-4 border-b border-[#E5DDFF]">
            <DialogTitle className="text-[#44403C]">Start Outreach - {selectedApplication?.company}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-gradient-to-br from-white to-[#F6F3FF] rounded-lg mb-4 border border-[#E5DDFF] shadow-sm">
              <h3 className="font-medium text-[#44403C] mb-2">Outreach Recommendations:</h3>
              <ul className="space-y-2 text-sm text-[#44403C]">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#9458FA]" />
                  Find the hiring manager on LinkedIn
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#9458FA]" />
                  Send a personalized connection request
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-[#9458FA]" />
                  Research common connections at the company
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-[#A8A29E]">
                Creating an outreach task will add a high-priority item to your action items.
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setOutreachDialogOpen(false)}
              className="border-[#E5DDFF] text-[#A8A29E] hover:bg-[#F6F3FF]"
            >
              Cancel
            </Button>
            <Button
              className="bg-gradient-to-r from-[#9458FA] to-[#AD88FD] hover:from-[#AD88FD] hover:to-[#C8B3FF]"
              onClick={createOutreachTask}
            >
              Create Outreach Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
