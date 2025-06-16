"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Link, Building, FileText, User, Phone, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotifications } from "@/hooks/use-notifications"
import { RichTextEditor } from "@/components/rich-text-editor"

interface CreateTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: "task" | "followup" | null
}

export function CreateTaskModal({ open, onOpenChange, type }: CreateTaskModalProps) {
  const { addActionItem } = useNotifications()

  // General task form state
  const [taskForm, setTaskForm] = useState({
    task: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "Medium",
    status: "Not Started",
    relatedApplication: "",
  })

  // Follow-up form state
  const [followUpForm, setFollowUpForm] = useState({
    companyName: "",
    position: "",
    jobLink: "",
    contactName: "",
    contactRole: "",
    contactEmail: "",
    contactPhone: "",
    followUpDate: new Date().toISOString().split("T")[0],
    followUpTime: "09:00",
    followUpMethod: "email",
    priority: "Medium",
    notes: "",
    applicationDate: "",
    lastContactDate: "",
  })

  // Reset forms when modal opens
  useEffect(() => {
    if (open) {
      setTaskForm({
        task: "",
        description: "",
        dueDate: new Date().toISOString().split("T")[0],
        priority: "Medium",
        status: "Not Started",
        relatedApplication: "",
      })
      setFollowUpForm({
        companyName: "",
        position: "",
        jobLink: "",
        contactName: "",
        contactRole: "",
        contactEmail: "",
        contactPhone: "",
        followUpDate: new Date().toISOString().split("T")[0],
        followUpTime: "09:00",
        followUpMethod: "email",
        priority: "Medium",
        notes: "",
        applicationDate: "",
        lastContactDate: "",
      })
    }
  }, [open])

  const handleCreateTask = () => {
    if (!taskForm.task) return

    addActionItem({
      task: taskForm.task,
      description: taskForm.description,
      dueDate: taskForm.dueDate,
      priority: taskForm.priority as "Low" | "Medium" | "High",
      status: taskForm.status as "Not Started" | "In Progress" | "Completed" | "Pending",
      relatedApplication: taskForm.relatedApplication,
    })

    onOpenChange(false)
  }

  const handleCreateFollowUp = () => {
    if (!followUpForm.companyName) return

    // Create a comprehensive task description for follow-up
    const taskDescription = `Follow up with ${followUpForm.companyName}${
      followUpForm.position ? ` for ${followUpForm.position} position` : ""
    }${followUpForm.contactName ? ` (Contact: ${followUpForm.contactName})` : ""}`

    addActionItem({
      task: taskDescription,
      dueDate: followUpForm.followUpDate,
      priority: followUpForm.priority as "Low" | "Medium" | "High",
      status: "Not Started",
      relatedApplication: followUpForm.companyName,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {type === "task" ? "Create New Task" : "Schedule Application Follow Up"}
          </DialogTitle>
        </DialogHeader>

        {type === "task" ? (
          // General Task Creation Form
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="task" className="text-gray-700 font-medium">
                Task Title
              </Label>
              <Input
                id="task"
                placeholder="Brief task title for the board"
                value={taskForm.task}
                onChange={(e) => setTaskForm({ ...taskForm, task: e.target.value })}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 font-medium">
                Description / Notes
              </Label>
              <RichTextEditor
                value={taskForm.description}
                onChange={(description) => setTaskForm({ ...taskForm, description })}
                placeholder="Add detailed context, coach instructions, or client questions..."
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-gray-700 font-medium">
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-gray-700 font-medium">
                  Priority
                </Label>
                <Select
                  value={taskForm.priority}
                  onValueChange={(value) => setTaskForm({ ...taskForm, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relatedApplication" className="text-gray-700 font-medium">
                Related Company (Optional)
              </Label>
              <Input
                id="relatedApplication"
                placeholder="e.g. Google, Amazon"
                value={taskForm.relatedApplication}
                onChange={(e) => setTaskForm({ ...taskForm, relatedApplication: e.target.value })}
              />
            </div>
          </div>
        ) : (
          // Application Follow-Up Form
          <div className="space-y-6 py-4">
            <Tabs defaultValue="application" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="application">Application</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="application" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-gray-700 font-medium flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="e.g. Google"
                      value={followUpForm.companyName}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, companyName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-gray-700 font-medium">
                      Position
                    </Label>
                    <Input
                      id="position"
                      placeholder="e.g. Software Engineer"
                      value={followUpForm.position}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, position: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobLink" className="text-gray-700 font-medium flex items-center">
                    <Link className="h-4 w-4 mr-2" />
                    Job Link
                  </Label>
                  <Input
                    id="jobLink"
                    placeholder="https://company.com/careers/job-id"
                    value={followUpForm.jobLink}
                    onChange={(e) => setFollowUpForm({ ...followUpForm, jobLink: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicationDate" className="text-gray-700 font-medium">
                      Application Date
                    </Label>
                    <Input
                      id="applicationDate"
                      type="date"
                      value={followUpForm.applicationDate}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, applicationDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastContactDate" className="text-gray-700 font-medium">
                      Last Contact Date
                    </Label>
                    <Input
                      id="lastContactDate"
                      type="date"
                      value={followUpForm.lastContactDate}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, lastContactDate: e.target.value })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-gray-700 font-medium flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Contact Name
                    </Label>
                    <Input
                      id="contactName"
                      placeholder="e.g. John Smith"
                      value={followUpForm.contactName}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, contactName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactRole" className="text-gray-700 font-medium">
                      Contact Role
                    </Label>
                    <Input
                      id="contactRole"
                      placeholder="e.g. Hiring Manager"
                      value={followUpForm.contactRole}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, contactRole: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail" className="text-gray-700 font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@company.com"
                      value={followUpForm.contactEmail}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="text-gray-700 font-medium flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </Label>
                    <Input
                      id="contactPhone"
                      placeholder="+1 (555) 123-4567"
                      value={followUpForm.contactPhone}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="followUpDate" className="text-gray-700 font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Follow-up Date
                    </Label>
                    <Input
                      id="followUpDate"
                      type="date"
                      value={followUpForm.followUpDate}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, followUpDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="followUpTime" className="text-gray-700 font-medium flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Time
                    </Label>
                    <Input
                      id="followUpTime"
                      type="time"
                      value={followUpForm.followUpTime}
                      onChange={(e) => setFollowUpForm({ ...followUpForm, followUpTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-gray-700 font-medium">
                      Priority
                    </Label>
                    <Select
                      value={followUpForm.priority}
                      onValueChange={(value) => setFollowUpForm({ ...followUpForm, priority: value })}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="followUpMethod" className="text-gray-700 font-medium">
                    Follow-up Method
                  </Label>
                  <Select
                    value={followUpForm.followUpMethod}
                    onValueChange={(value) => setFollowUpForm({ ...followUpForm, followUpMethod: value })}
                  >
                    <SelectTrigger id="followUpMethod">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="linkedin">LinkedIn Message</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-gray-700 font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any relevant notes about this follow-up..."
                    value={followUpForm.notes}
                    onChange={(e) => setFollowUpForm({ ...followUpForm, notes: e.target.value })}
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={type === "task" ? handleCreateTask : handleCreateFollowUp}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          >
            {type === "task" ? "Create Task" : "Schedule Follow Up"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
