"use client"

import { useState } from "react"
import { CalendarDays, AlertTriangle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useNotifications } from "@/hooks/use-notifications"
import { RichTextEditor } from "@/components/rich-text-editor"

interface TaskDetailsModalProps {
  taskId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskDetailsModal({ taskId, open, onOpenChange }: TaskDetailsModalProps) {
  const { actionItems, updateActionItem, removeActionItem } = useNotifications()

  const task = actionItems.find((item) => item.id === taskId)
  const [editedTask, setEditedTask] = useState(task)

  if (!task) return null

  const handleSave = () => {
    if (editedTask) {
      updateActionItem(task.id, editedTask)
    }
    onOpenChange(false)
  }

  const handleDelete = () => {
    removeActionItem(task.id)
    onOpenChange(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "Completed"

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Pending": // Corresponds to "Waiting on Feedback"
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Task Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Task title */}
          <div className="space-y-2">
            <Label htmlFor="task">Task Title</Label>
            <Input
              id="task"
              value={editedTask?.task || task.task}
              onChange={(e) => setEditedTask({ ...editedTask!, task: e.target.value })}
              className="text-base"
            />
          </div>

          {/* Task description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description / Notes</Label>
            <RichTextEditor
              value={editedTask?.description || task.description || ""}
              onChange={(description) => setEditedTask({ ...editedTask!, description })}
              placeholder="Add detailed context, coach instructions, or client questions..."
              className="w-full"
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={editedTask?.status || task.status}
                onValueChange={(value) => setEditedTask({ ...editedTask!, status: value as any })}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Waiting on Feedback</SelectItem> {/* Updated name */}
                  <SelectItem value="Not Started">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={editedTask?.priority || task.priority}
                onValueChange={(value) => setEditedTask({ ...editedTask!, priority: value as any })}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="dueDate"
                type="date"
                value={editedTask?.dueDate || task.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask!, dueDate: e.target.value })}
              />
              {isOverdue && (
                <div className="flex items-center text-red-600">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  <span className="text-xs">Overdue</span>
                </div>
              )}
            </div>
          </div>

          {/* Related Application */}
          <div className="space-y-2">
            <Label htmlFor="relatedApplication">Related Company</Label>
            <Input
              id="relatedApplication"
              value={editedTask?.relatedApplication || task.relatedApplication || ""}
              onChange={(e) => setEditedTask({ ...editedTask!, relatedApplication: e.target.value })}
              placeholder="e.g. Google, Amazon"
            />
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 p-3 rounded-md space-y-2 border border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>Created on {formatDate(task.createdAt)}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(task.status)}>
                {task.status === "Not Started"
                  ? "To Do"
                  : task.status === "Pending"
                    ? "Waiting on Feedback" // Updated name
                    : task.status}
              </Badge>
              <Badge className={getPriorityColor(task.priority)}>{task.priority} Priority</Badge>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleDelete}>
            Delete Task
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
