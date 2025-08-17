"use client"

import { Clock, Plus, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Task {
  id: string
  title: string
  company?: string
  dueDate: string
  priority: "high" | "medium" | "low"
  status: "todo" | "in-progress" | "waiting"
}

interface DashboardActionItemsProps {
  tasks: Task[]
  totalTasks: number
}

export function DashboardActionItems({ tasks, totalTasks }: DashboardActionItemsProps) {
  // Group tasks by status
  const columns = {
    "To Do": tasks.filter((task) => task.status === "todo"),
    "In Progress": tasks.filter((task) => task.status === "in-progress"),
    Waiting: tasks.filter((task) => task.status === "waiting"),
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDueDate = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 0) return "Overdue"
    if (diffDays <= 7) return `In ${diffDays} days`
    return due.toLocaleDateString()
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-purple-600 dark:text-purple-400">Action Items</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{totalTasks} tasks remaining</p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          {Object.entries(columns).map(([status, columnTasks]) => (
            <div key={status} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {status}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>

              <div className="space-y-2 min-h-[200px]">
                {columnTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white leading-tight">{task.title}</h4>

                      {task.company && <div className="text-xs text-gray-600 dark:text-gray-400">{task.company}</div>}

                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className={isOverdue(task.dueDate) ? "text-red-600 font-medium" : ""}>
                          {formatDueDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg p-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
