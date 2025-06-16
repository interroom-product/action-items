"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronRight, Plus, Calendar, MessageCircle, Briefcase, Trash2, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import type { Application, ReachOut, InterviewStage } from "@/app/job-tracker/types"

interface ApplicationDetailsDrawerProps {
  application: Application | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (application: Application) => void
}

export function ApplicationDetailsDrawer({ application, open, onOpenChange, onSave }: ApplicationDetailsDrawerProps) {
  const [editedApplication, setEditedApplication] = useState<Application | null>(application)
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    pipeline: false,
    outreach: false,
  })
  const [newStageDialogOpen, setNewStageDialogOpen] = useState(false)
  const [newStage, setNewStage] = useState<Partial<InterviewStage>>({
    type: "hiring_manager",
    completed: false,
  })
  const [newReachOutDialogOpen, setNewReachOutDialogOpen] = useState(false)
  const [newReachOut, setNewReachOut] = useState<Partial<ReachOut>>({
    name: "",
    position: "",
    date: new Date().toISOString().split("T")[0],
    type: "recruiter",
    week: 1,
    platform: "linkedin",
    status: "pending",
  })

  // Update local state when the application prop changes
  if (application && (!editedApplication || editedApplication.id !== application.id)) {
    // Initialize with just the phone screen stage set to pending and no date
    const initialPipeline = [{ type: "phone_screen", completed: false }]

    setEditedApplication({
      ...application,
      interviewPipeline:
        application.interviewPipeline && application.interviewPipeline.length > 0
          ? application.interviewPipeline
          : initialPipeline,
    })
  }

  if (!editedApplication) return null

  const handleSave = () => {
    if (editedApplication) {
      onSave(editedApplication)
    }
  }

  const updateField = (field: keyof Application, value: any) => {
    setEditedApplication((prev) => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
  }

  const updateInterviewStage = (index: number, field: keyof InterviewStage, value: any) => {
    setEditedApplication((prev) => {
      if (!prev) return prev
      const updatedPipeline = [...prev.interviewPipeline]
      updatedPipeline[index] = { ...updatedPipeline[index], [field]: value }
      return { ...prev, interviewPipeline: updatedPipeline }
    })
  }

  const removeInterviewStage = (index: number) => {
    // Don't allow removing the first stage (Phone Screen)
    if (index === 0) return

    setEditedApplication((prev) => {
      if (!prev) return prev
      const updatedPipeline = [...prev.interviewPipeline]
      updatedPipeline.splice(index, 1)
      return { ...prev, interviewPipeline: updatedPipeline }
    })
  }

  const updateReachOut = (index: number, field: keyof ReachOut, value: any) => {
    setEditedApplication((prev) => {
      if (!prev) return prev
      const updatedReachOuts = [...prev.reachOuts]
      updatedReachOuts[index] = { ...updatedReachOuts[index], [field]: value }
      return { ...prev, reachOuts: updatedReachOuts }
    })
  }

  const removeReachOut = (index: number) => {
    setEditedApplication((prev) => {
      if (!prev) return prev
      const updatedReachOuts = [...prev.reachOuts]
      updatedReachOuts.splice(index, 1)
      return { ...prev, reachOuts: updatedReachOuts }
    })
  }

  const handleAddReachOut = () => {
    setNewReachOutDialogOpen(true)
  }

  const confirmAddReachOut = () => {
    if (!newReachOut.name) return

    setEditedApplication((prev) => {
      if (!prev) return prev

      const reachOutToAdd: ReachOut = {
        id: Date.now().toString(),
        name: newReachOut.name || "",
        position: newReachOut.position || "",
        date: newReachOut.date || new Date().toISOString().split("T")[0],
        type: newReachOut.type as "recruiter" | "hiring_manager" | "team_member",
        week: newReachOut.week || 1,
        platform: newReachOut.platform as "linkedin" | "email" | "other",
        status: newReachOut.status as "pending" | "sent" | "responded",
        notes: newReachOut.notes,
      }

      return { ...prev, reachOuts: [...prev.reachOuts, reachOutToAdd] }
    })

    // Reset the new reach out form
    setNewReachOut({
      name: "",
      position: "",
      date: new Date().toISOString().split("T")[0],
      type: "recruiter",
      week: 1,
      platform: "linkedin",
      status: "pending",
    })

    setNewReachOutDialogOpen(false)
    setExpandedSections({ ...expandedSections, outreach: true })
  }

  const handleAddInterviewStage = () => {
    setNewStageDialogOpen(true)
  }

  const confirmAddStage = () => {
    if (!newStage.type) return

    setEditedApplication((prev) => {
      if (!prev) return prev

      const newInterviewStage: InterviewStage = {
        type: newStage.type as InterviewStage["type"],
        completed: newStage.completed || false,
        date: newStage.date,
      }

      return { ...prev, interviewPipeline: [...prev.interviewPipeline, newInterviewStage] }
    })

    // Reset the new stage form
    setNewStage({
      type: "hiring_manager",
      completed: false,
    })

    setNewStageDialogOpen(false)
    setExpandedSections({ ...expandedSections, pipeline: true })
  }

  const toggleSection = (section: "details" | "pipeline" | "outreach") => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Applied":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Applied</Badge>
      case "Interview":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Interview</Badge>
      case "Offer":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Offer</Badge>
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>
    }
  }

  const getStageLabel = (type: InterviewStage["type"]) => {
    switch (type) {
      case "phone_screen":
        return "Phone Screen"
      case "hiring_manager":
        return "Hiring Manager"
      case "second_round":
        return "2nd Round"
      case "third_round":
        return "3rd Round"
      case "fourth_round":
        return "4th Round"
      default:
        return "Interview Stage"
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto p-0">
        <SheetHeader className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-bold">{editedApplication.company}</SheetTitle>
            <div className="flex items-center gap-2">
              {getStatusBadge(editedApplication.status)}
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground">{editedApplication.position}</p>
            {editedApplication.jobLink && (
              <div className="flex items-center text-sm text-blue-600">
                <Link className="h-3 w-3 mr-1" />
                <a
                  href={editedApplication.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate"
                >
                  {editedApplication.jobLink}
                </a>
              </div>
            )}
          </div>
        </SheetHeader>

        <div className="px-6 py-4 space-y-6">
          {/* Job Details Section */}
          <Collapsible open={expandedSections.details} onOpenChange={() => toggleSection("details")}>
            <CollapsibleTrigger className="flex items-center w-full justify-between py-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Job Details</h3>
              </div>
              {expandedSections.details ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={editedApplication.status} onValueChange={(value) => updateField("status", value)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appliedDate">Applied Date</Label>
                  <Input
                    id="appliedDate"
                    type="date"
                    value={editedApplication.appliedDate}
                    onChange={(e) => updateField("appliedDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editedApplication.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobLink">Job URL</Label>
                <Input
                  id="jobLink"
                  value={editedApplication.jobLink || ""}
                  onChange={(e) => updateField("jobLink", e.target.value)}
                  placeholder="https://example.com/job"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postSource">Source</Label>
                <Select
                  value={editedApplication.postSource || ""}
                  onValueChange={(value) => updateField("postSource", value)}
                >
                  <SelectTrigger id="postSource">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="InterRoom">InterRoom</SelectItem>
                    <SelectItem value="Self Sourced">Self Sourced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="hasReferral">Referral</Label>
                <Switch
                  id="hasReferral"
                  checked={editedApplication.hasReferral}
                  onCheckedChange={(checked) => updateField("hasReferral", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="generalNotes">Notes</Label>
                <Textarea
                  id="generalNotes"
                  value={editedApplication.generalNotes || ""}
                  onChange={(e) => updateField("generalNotes", e.target.value)}
                  rows={3}
                  placeholder="Add notes about this application, including next steps..."
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Interview Pipeline Section */}
          <Collapsible open={expandedSections.pipeline} onOpenChange={() => toggleSection("pipeline")}>
            <CollapsibleTrigger className="flex items-center w-full justify-between py-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Interview Pipeline</h3>
              </div>
              {expandedSections.pipeline ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              {editedApplication.interviewPipeline.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">No interview stages added yet.</div>
              ) : (
                <div className="space-y-4">
                  {editedApplication.interviewPipeline.map((stage, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{getStageLabel(stage.type)}</h4>
                        <div className="flex items-center space-x-2">
                          {index > 0 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeInterviewStage(index)}
                              className="h-8 w-8 text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`completed-${index}`}
                              checked={stage.completed}
                              onCheckedChange={(checked) => updateInterviewStage(index, "completed", checked)}
                            />
                            <Label htmlFor={`completed-${index}`} className="text-sm whitespace-nowrap">
                              {stage.completed ? "Completed" : "Pending"}
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`date-${index}`}>Date</Label>
                        <Input
                          id={`date-${index}`}
                          type="date"
                          value={stage.date || ""}
                          onChange={(e) => updateInterviewStage(index, "date", e.target.value)}
                        />
                      </div>
                      {stage.notes && (
                        <div className="space-y-2">
                          <Label htmlFor={`notes-${index}`}>Notes</Label>
                          <Textarea
                            id={`notes-${index}`}
                            value={stage.notes}
                            onChange={(e) => updateInterviewStage(index, "notes", e.target.value)}
                            rows={2}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <Dialog open={newStageDialogOpen} onOpenChange={setNewStageDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={handleAddInterviewStage} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Interview Stage
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Interview Stage</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="stage-type">Stage Type</Label>
                      <Select
                        value={newStage.type as string}
                        onValueChange={(value) => setNewStage({ ...newStage, type: value as InterviewStage["type"] })}
                      >
                        <SelectTrigger id="stage-type">
                          <SelectValue placeholder="Select stage type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                          <SelectItem value="second_round">2nd Round</SelectItem>
                          <SelectItem value="third_round">3rd Round</SelectItem>
                          <SelectItem value="fourth_round">4th Round</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stage-date">Date (Optional)</Label>
                      <Input
                        id="stage-date"
                        type="date"
                        value={newStage.date || ""}
                        onChange={(e) => setNewStage({ ...newStage, date: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="stage-completed"
                        checked={newStage.completed || false}
                        onCheckedChange={(checked) => setNewStage({ ...newStage, completed: checked })}
                      />
                      <Label htmlFor="stage-completed">Mark as completed</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={confirmAddStage}>Add Stage</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CollapsibleContent>
          </Collapsible>

          {/* Outreach Section */}
          <Collapsible open={expandedSections.outreach} onOpenChange={() => toggleSection("outreach")}>
            <CollapsibleTrigger className="flex items-center w-full justify-between py-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Reach Outs</h3>
              </div>
              {expandedSections.outreach ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4 space-y-4">
              <Dialog open={newReachOutDialogOpen} onOpenChange={setNewReachOutDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" onClick={handleAddReachOut} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reach Out
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Reach Out</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Contact Name</Label>
                      <Input
                        id="contact-name"
                        value={newReachOut.name || ""}
                        onChange={(e) => setNewReachOut({ ...newReachOut, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-position">Position</Label>
                      <Input
                        id="contact-position"
                        value={newReachOut.position || ""}
                        onChange={(e) => setNewReachOut({ ...newReachOut, position: e.target.value })}
                        placeholder="Engineering Manager"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-type">Contact Type</Label>
                      <Select
                        value={newReachOut.type as string}
                        onValueChange={(value) =>
                          setNewReachOut({
                            ...newReachOut,
                            type: value as "recruiter" | "hiring_manager" | "team_member",
                          })
                        }
                      >
                        <SelectTrigger id="contact-type">
                          <SelectValue placeholder="Select contact type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                          <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                          <SelectItem value="team_member">Team Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-platform">Platform</Label>
                      <Select
                        value={newReachOut.platform as string}
                        onValueChange={(value) =>
                          setNewReachOut({ ...newReachOut, platform: value as "linkedin" | "email" | "other" })
                        }
                      >
                        <SelectTrigger id="contact-platform">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-date">Date</Label>
                      <Input
                        id="contact-date"
                        type="date"
                        value={newReachOut.date || ""}
                        onChange={(e) => setNewReachOut({ ...newReachOut, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-status">Status</Label>
                      <Select
                        value={newReachOut.status as string}
                        onValueChange={(value) =>
                          setNewReachOut({ ...newReachOut, status: value as "pending" | "sent" | "responded" })
                        }
                      >
                        <SelectTrigger id="contact-status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="sent">Sent</SelectItem>
                          <SelectItem value="responded">Responded</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-notes">Notes (Optional)</Label>
                      <Textarea
                        id="contact-notes"
                        value={newReachOut.notes || ""}
                        onChange={(e) => setNewReachOut({ ...newReachOut, notes: e.target.value })}
                        placeholder="Add notes about this contact..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={confirmAddReachOut}>Add Contact</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {editedApplication.reachOuts.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">No reach outs recorded yet.</div>
              ) : (
                <div className="space-y-4">
                  {editedApplication.reachOuts.map((reachOut, index) => (
                    <div key={reachOut.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{reachOut.name || "New Contact"}</h4>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeReachOut(index)}
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Badge
                            className={`
                            ${reachOut.status === "responded" ? "bg-green-100 text-green-800" : ""}
                            ${reachOut.status === "sent" ? "bg-blue-100 text-blue-800" : ""}
                            ${reachOut.status === "pending" ? "bg-gray-100 text-gray-800" : ""}
                          `}
                          >
                            {reachOut.status.charAt(0).toUpperCase() + reachOut.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`name-${index}`}>Name</Label>
                          <Input
                            id={`name-${index}`}
                            value={reachOut.name}
                            onChange={(e) => updateReachOut(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`position-${index}`}>Position</Label>
                          <Input
                            id={`position-${index}`}
                            value={reachOut.position}
                            onChange={(e) => updateReachOut(index, "position", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`platform-${index}`}>Platform</Label>
                          <Select
                            value={reachOut.platform}
                            onValueChange={(value) => updateReachOut(index, "platform", value)}
                          >
                            <SelectTrigger id={`platform-${index}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="linkedin">LinkedIn</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`status-${index}`}>Status</Label>
                          <Select
                            value={reachOut.status}
                            onValueChange={(value) => updateReachOut(index, "status", value)}
                          >
                            <SelectTrigger id={`status-${index}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="sent">Sent</SelectItem>
                              <SelectItem value="responded">Responded</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`date-${index}`}>Date</Label>
                        <Input
                          id={`date-${index}`}
                          type="date"
                          value={reachOut.date}
                          onChange={(e) => updateReachOut(index, "date", e.target.value)}
                        />
                      </div>

                      {reachOut.notes && (
                        <div className="space-y-2">
                          <Label htmlFor={`notes-${index}`}>Notes</Label>
                          <Textarea
                            id={`notes-${index}`}
                            value={reachOut.notes}
                            onChange={(e) => updateReachOut(index, "notes", e.target.value)}
                            rows={2}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="p-6 border-t sticky bottom-0 bg-white mt-4">
          <div className="flex justify-end space-x-2">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
