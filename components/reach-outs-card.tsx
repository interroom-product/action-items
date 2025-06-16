"use client"

import { Plus, Mail, Linkedin, CheckCircle, Clock, MessageCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ReachOut {
  id: string
  name: string
  position: string
  company: string
  avatar?: string
  platform: "linkedin" | "email"
  status: "pending" | "sent" | "responded"
  date: string
  notes?: string
}

interface ReachOutsCardProps {
  reachOuts?: ReachOut[]
}

export function ReachOutsCard({ reachOuts: initialReachOuts = [] }: ReachOutsCardProps) {
  const [reachOuts, setReachOuts] = useState(initialReachOuts)

  const updateReachOut = (id: string, updates: Partial<ReachOut>) => {
    setReachOuts((prevReachOuts) =>
      prevReachOuts.map((reachOut) => (reachOut.id === id ? { ...reachOut, ...updates } : reachOut)),
    )
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Reach Outs
        </CardTitle>
        <Button size="sm" variant="secondary" className="bg-white shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          New Reach Out
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reachOuts.map((reachOut) => (
            <div key={reachOut.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  {reachOut.avatar ? (
                    <AvatarImage src={reachOut.avatar} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100">
                      {reachOut.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h4 className="font-medium text-sm">{reachOut.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {reachOut.position} at {reachOut.company}
                  </p>
                  <p className="text-xs text-muted-foreground">Contacted on: {reachOut.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {reachOut.platform === "linkedin" ? (
                  <Linkedin className="h-4 w-4 text-blue-600" />
                ) : (
                  <Mail className="h-4 w-4 text-purple-600" />
                )}
                <Badge
                  variant="secondary"
                  className={`
                    ${reachOut.status === "responded" ? "bg-green-100 text-green-700" : ""}
                    ${reachOut.status === "sent" ? "bg-blue-100 text-blue-700" : ""}
                    ${reachOut.status === "pending" ? "bg-gray-100 text-gray-700" : ""}
                  `}
                >
                  {reachOut.status === "responded" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {reachOut.status === "sent" && <Clock className="h-3 w-3 mr-1" />}
                  {reachOut.status.charAt(0).toUpperCase() + reachOut.status.slice(1)}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Notes for {reachOut.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          value={reachOut.notes || ""}
                          onChange={(e) => updateReachOut(reachOut.id, { notes: e.target.value })}
                          placeholder="Add notes about your interaction..."
                        />
                      </div>
                      <Button onClick={() => updateReachOut(reachOut.id, { status: "responded" })}>
                        Mark as Responded
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
