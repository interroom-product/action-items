"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Removed Tabs, TabsContent, TabsList, TabsTrigger
import { useNotifications } from "@/hooks/use-notifications"
import { RichTextEditor } from "@/components/rich-text-editor"

interface CreateTaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  // Removed 'type' prop as it's now always 'task'
}

export function CreateTaskModal({ open, onOpenChange }: CreateTaskModalProps) {
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

  // Reset form when modal opens
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
        </DialogHeader>

        {/* General Task Creation Form (simplified, no more conditional rendering) */}
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

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateTask}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
