"use client"

import { useEffect, useState } from "react" // Import useEffect
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNotifications } from "@/hooks/use-notifications"

interface AddActionItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultRelatedApplication?: string
  defaultTask?: string // New prop for pre-filling task
}

export function AddActionItemDialog({
  open,
  onOpenChange,
  defaultRelatedApplication,
  defaultTask,
}: AddActionItemDialogProps) {
  const { addActionItem } = useNotifications()
  const [newItem, setNewItem] = useState({
    task: defaultTask || "", // Use defaultTask if provided
    dueDate: new Date().toISOString().split("T")[0],
    priority: "Medium",
    status: "Not Started",
    relatedApplication: defaultRelatedApplication || "",
  })

  // Reset form when dialog opens or defaultTask changes
  useEffect(() => {
    if (open) {
      setNewItem({
        task: defaultTask || "",
        dueDate: new Date().toISOString().split("T")[0],
        priority: "Medium",
        status: "Not Started",
        relatedApplication: defaultRelatedApplication || "",
      })
    }
  }, [open, defaultTask, defaultRelatedApplication])

  const handleSubmit = () => {
    if (!newItem.task) return

    addActionItem({
      task: newItem.task,
      dueDate: newItem.dueDate,
      priority: newItem.priority as "Low" | "Medium" | "High",
      status: newItem.status as "Not Started" | "In Progress" | "Completed" | "Pending",
      relatedApplication: newItem.relatedApplication,
    })

    // Reset form after submission
    setNewItem({
      task: "",
      dueDate: new Date().toISOString().split("T")[0],
      priority: "Medium",
      status: "Not Started",
      relatedApplication: defaultRelatedApplication || "",
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">Add New Action Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="task" className="text-gray-700">
              Task
            </Label>
            <Textarea
              id="task"
              placeholder="What needs to be done?"
              value={newItem.task}
              onChange={(e) => setNewItem({ ...newItem, task: e.target.value })}
              className="resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-gray-700">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={newItem.dueDate}
              onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-gray-700">
                Priority
              </Label>
              <Select value={newItem.priority} onValueChange={(value) => setNewItem({ ...newItem, priority: value })}>
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
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-700">
                Status
              </Label>
              <Select value={newItem.status} onValueChange={(value) => setNewItem({ ...newItem, status: value })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {!defaultRelatedApplication && (
            <div className="space-y-2">
              <Label htmlFor="relatedApplication" className="text-gray-700">
                Related Application (Optional)
              </Label>
              <Input
                id="relatedApplication"
                placeholder="e.g. Google, Amazon"
                value={newItem.relatedApplication}
                onChange={(e) => setNewItem({ ...newItem, relatedApplication: e.target.value })}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          >
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
