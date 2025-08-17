"use client"

import { useState, useMemo } from "react"
import { Layout } from "@/components/layout"
import { Plus, ExternalLink, Search, Filter, Eye, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ApplicationDetailsModal } from "@/components/application-details-modal"
import type { Application, PendingApplication, InterviewStage } from "./types"
import { OutreachTips } from "@/components/outreach-tips"

const initialInterviewPipeline: InterviewStage[] = [{ type: "phone_screen", completed: false }]

// Update the initialApplications to include the new fields
const initialApplications: Application[] = [
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
    interviewPipeline: [...initialInterviewPipeline],
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
]

const initialPendingApplications: PendingApplication[] = [
  {
    id: "p1",
    company: "Innovation Labs",
    position: "Senior Frontend Developer",
    location: "New York, NY",
    deadline: "2024-01-05",
    applicationUrl: "https://example.com/apply",
  },
  {
    id: "p2",
    company: "Future Tech",
    position: "React Developer",
    location: "Austin, TX",
    deadline: "2024-01-07",
    applicationUrl: "https://example.com/apply",
  },
]

export default function JobTrackerPage() {
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [pendingApplications, setPendingApplications] = useState<PendingApplication[]>(initialPendingApplications)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newApplication, setNewApplication] = useState<Partial<Application & PendingApplication>>({
    company: "",
    position: "",
    location: "",
    status: "Applied",
    appliedDate: new Date().toISOString().split("T")[0],
    nextStep: "",
    applicationUrl: "",
    deadline: "",
    interviewStage: "",
    hasReferral: false,
    interviewPipeline: [...initialInterviewPipeline],
  })
  const [activeTab, setActiveTab] = useState("submitted")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    status: "",
    company: "",
    position: "",
    dateFrom: "",
    dateTo: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingData, setEditingData] = useState<Partial<Application>>({})
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handlePendingEdit = (id: string, field: keyof PendingApplication, value: string) => {
    setPendingApplications((apps) => apps.map((app) => (app.id === id ? { ...app, [field]: value } : app)))
  }

  const handleApply = (pendingApp: PendingApplication) => {
    const newApplication: Application = {
      id: pendingApp.id,
      company: pendingApp.company,
      position: pendingApp.position,
      location: pendingApp.location,
      status: "Applied",
      appliedDate: new Date().toISOString().split("T")[0],
      nextStep: "Waiting for response",
      coachFeedback: "",
      reachOuts: [],
      hasReferral: false,
      interviewPipeline: [...initialInterviewPipeline],
    }
    setApplications((apps) => [...apps, newApplication])
    setPendingApplications((apps) => apps.filter((app) => app.id !== pendingApp.id))
  }

  const handleAddApplication = () => {
    if (activeTab === "submitted") {
      const newApp: Application = {
        id: Date.now().toString(),
        company: newApplication.company || "",
        position: newApplication.position || "",
        location: newApplication.location || "",
        status: (newApplication.status as string) || "Applied",
        appliedDate: newApplication.appliedDate || new Date().toISOString().split("T")[0],
        nextStep: newApplication.nextStep || "",
        coachFeedback: "",
        reachOuts: [],
        interviewStage: newApplication.interviewStage,
        hasReferral: newApplication.hasReferral || false,
        interviewPipeline: [...initialInterviewPipeline],
      }
      setApplications([...applications, newApp])
    } else {
      const newPendingApp: PendingApplication = {
        id: Date.now().toString(),
        company: newApplication.company || "",
        position: newApplication.position || "",
        location: newApplication.location || "",
        deadline: newApplication.deadline || "",
        applicationUrl: newApplication.applicationUrl || "",
      }
      setPendingApplications([...pendingApplications, newPendingApp])
    }
    setIsDialogOpen(false)
    setNewApplication({})
  }

  const resetFilters = () => {
    setFilters({
      status: "",
      company: "",
      position: "",
      dateFrom: "",
      dateTo: "",
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

  const openApplicationDetails = (application: Application) => {
    setSelectedApplication(application)
    setIsDetailsOpen(true)
  }

  const handleSaveApplicationDetails = (updatedApplication: Application) => {
    setApplications((apps) => apps.map((app) => (app.id === updatedApplication.id ? updatedApplication : app)))
    setIsDetailsOpen(false)
  }

  const openJobLink = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank")
    }
  }

  const filteredApplications = useMemo(() => {
    let filtered = applications

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.company.toLowerCase().includes(query) ||
          app.position.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query),
      )
    }

    // Apply filters
    if (filters.status) {
      filtered = filtered.filter((app) => app.status === filters.status)
    }

    if (filters.company) {
      filtered = filtered.filter((app) => app.company.toLowerCase().includes(filters.company.toLowerCase()))
    }

    if (filters.position) {
      filtered = filtered.filter((app) => app.position.toLowerCase().includes(filters.position.toLowerCase()))
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom)
      filtered = filtered.filter((app) => {
        const appDate = new Date(app.appliedDate)
        return appDate >= fromDate
      })
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      toDate.setHours(23, 59, 59, 999) // End of the day
      filtered = filtered.filter((app) => {
        const appDate = new Date(app.appliedDate)
        return appDate <= toDate
      })
    }

    return filtered
  }, [applications, searchQuery, filters])

  const filteredPendingApplications = useMemo(() => {
    let filtered = pendingApplications

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.company.toLowerCase().includes(query) ||
          app.position.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query),
      )
    }

    // Apply company filter
    if (filters.company) {
      filtered = filtered.filter((app) => app.company.toLowerCase().includes(filters.company.toLowerCase()))
    }

    // Apply position filter
    if (filters.position) {
      filtered = filtered.filter((app) => app.position.toLowerCase().includes(filters.position.toLowerCase()))
    }

    return filtered
  }, [pendingApplications, searchQuery, filters])

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Job Tracker</h2>
            <p className="text-slate-600 mt-1">Track and manage your job applications</p>
          </div>
          <div className="space-x-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Application
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Application</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={newApplication.company || ""}
                      onChange={(e) => setNewApplication({ ...newApplication, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={newApplication.position || ""}
                      onChange={(e) => setNewApplication({ ...newApplication, position: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newApplication.location || ""}
                      onChange={(e) => setNewApplication({ ...newApplication, location: e.target.value })}
                    />
                  </div>
                  {activeTab === "submitted" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newApplication.status || "Applied"}
                          onValueChange={(value) => setNewApplication({ ...newApplication, status: value })}
                        >
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
                      {newApplication.status === "Interview" && (
                        <div className="space-y-2">
                          <Label htmlFor="interviewStage">Interview Stage</Label>
                          <Input
                            id="interviewStage"
                            value={newApplication.interviewStage || ""}
                            onChange={(e) => setNewApplication({ ...newApplication, interviewStage: e.target.value })}
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="appliedDate">Applied Date</Label>
                        <Input
                          id="appliedDate"
                          type="date"
                          value={newApplication.appliedDate || ""}
                          onChange={(e) => setNewApplication({ ...newApplication, appliedDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nextStep">Next Step</Label>
                        <Input
                          id="nextStep"
                          value={newApplication.nextStep || ""}
                          onChange={(e) => setNewApplication({ ...newApplication, nextStep: e.target.value })}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasReferral"
                          checked={newApplication.hasReferral || false}
                          onCheckedChange={(checked) =>
                            setNewApplication({ ...newApplication, hasReferral: checked as boolean })
                          }
                        />
                        <Label htmlFor="hasReferral">Has Referral</Label>
                      </div>
                    </>
                  )}
                  {activeTab === "pending" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="deadline">Application Deadline</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={newApplication.deadline || ""}
                          onChange={(e) => setNewApplication({ ...newApplication, deadline: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="applicationUrl">Application URL</Label>
                        <Input
                          id="applicationUrl"
                          value={newApplication.applicationUrl || ""}
                          onChange={(e) => setNewApplication({ ...newApplication, applicationUrl: e.target.value })}
                        />
                      </div>
                    </>
                  )}
                  <Button onClick={handleAddApplication} className="w-full">
                    Add Application
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Upload Google Sheet
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by company, position, or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {(filters.status || filters.company || filters.position || filters.dateFrom || filters.dateTo) && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-1 py-0">
                    {Object.values(filters).filter(Boolean).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Applications</h4>

                <div className="space-y-2">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                    <SelectTrigger id="status-filter">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-filter">Company</Label>
                  <Input
                    id="company-filter"
                    placeholder="Filter by company"
                    value={filters.company}
                    onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position-filter">Position</Label>
                  <Input
                    id="position-filter"
                    placeholder="Filter by position"
                    value={filters.position}
                    onChange={(e) => setFilters({ ...filters, position: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Applied Date Range</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="date-from" className="text-xs">
                        From
                      </Label>
                      <Input
                        id="date-from"
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="date-to" className="text-xs">
                        To
                      </Label>
                      <Input
                        id="date-to"
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Tabs defaultValue="submitted" className="space-y-4" onValueChange={(value) => setActiveTab(value)}>
          <TabsList>
            <TabsTrigger value="submitted">
              My Submitted Applications
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                {filteredApplications.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Jobs to Review
              <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-600">
                {filteredPendingApplications.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submitted">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  <div className="flex justify-between items-center">
                    <div> </div>
                    <div> </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.length > 0 ? (
                        filteredApplications.map((app) => (
                          <TableRow key={app.id} className="hover:bg-slate-50">
                            <TableCell className="font-medium">{app.company}</TableCell>
                            <TableCell>{app.position}</TableCell>
                            <TableCell>{app.location}</TableCell>
                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                            <TableCell>{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openApplicationDetails(app)}
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {app.jobLink && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => openJobLink(app.jobLink)}
                                    title="Open Job URL"
                                  >
                                    <Link2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No applications found. Try adjusting your search or filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outreach Tips Card */}
          {activeTab === "submitted" && (
            <div className="mt-6">
              <OutreachTips />
            </div>
          )}

          <TabsContent value="pending">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Jobs Matched to Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Application Deadline</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPendingApplications.length > 0 ? (
                        filteredPendingApplications.map((app) => (
                          <TableRow key={app.id} className="hover:bg-slate-50">
                            <TableCell className="font-medium">{app.company}</TableCell>
                            <TableCell>{app.position}</TableCell>
                            <TableCell>{app.location}</TableCell>
                            <TableCell>{new Date(app.deadline).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(app.applicationUrl, "_blank")}
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Apply
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="secondary" size="sm">
                                      Mark as Applied
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Mark as Applied</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="flex items-start space-x-2">
                                        <Checkbox id="confirm" />
                                        <Label htmlFor="confirm">
                                          I confirm that I have submitted my application for this position
                                        </Label>
                                      </div>
                                      <Button className="w-full" onClick={() => handleApply(app)}>
                                        Move to My Submitted Applications
                                      </Button>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No jobs to review found. Try adjusting your search or filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Details Modal */}
      <ApplicationDetailsModal
        application={selectedApplication}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onSave={handleSaveApplicationDetails}
      />
    </Layout>
  )
}
