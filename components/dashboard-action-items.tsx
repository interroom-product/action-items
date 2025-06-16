"use client"
import { Clock, Plus, ChevronRight, MessageCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/hooks/use-notifications"
import Link from "next/link"

export function DashboardActionItems() {
  const { actionItems, updateActionItem } = useNotifications()

  // Group items by status for kanban-style layout
  const columns = {
    "To Do": actionItems.filter((item) => item.status === "Not Started"),
    "In Progress": actionItems.filter((item) => item.status === "In Progress"),
    Waiting: actionItems.filter((item) => item.status === "Pending"),
  }

  // Sort items by priority within each column
  Object.keys(columns).forEach((key) => {
    columns[key as keyof typeof columns].sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 }
      return (
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
      )
    })
  })

  const totalPending = actionItems.filter((item) => item.status !== "Completed").length

  const handleComplete = (id: string) => {
    updateActionItem(id, { status: "Completed" })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-[#F0ECE8]"
      case "Low":
        return "bg-[#C8B3FF]"
      default:
        return "bg-[#A8A29E]"
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays === -1) return "Yesterday"
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`
    return `${diffDays} days`
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#E5DDFF]">
      {/* Header with Reach Out Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#44403C]">Action Items</h2>
          <p className="text-[#A8A29E] text-sm mt-1">{totalPending} tasks need your attention</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Prominent Reach Out Button */}
          <Button
            size="sm"
            className="bg-gradient-to-r from-[#9458FA] to-[#AD88FD] hover:from-[#AD88FD] hover:to-[#C8B3FF] text-white border-none shadow-md transition-all duration-200 transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            <Zap className="h-3 w-3 mr-1" />
            Reach Out
          </Button>
          <Link href="/action-items">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#A8A29E] hover:text-[#44403C] hover:bg-[#F6F3FF] border border-[#E5DDFF]"
            >
              View all
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
          <Button size="sm" className="bg-[#C8B3FF] hover:bg-[#AD88FD] text-[#44403C] border-none">
            <Plus className="h-4 w-4 mr-2" />
            Add task
          </Button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, items]) => (
          <div key={status} className="space-y-3">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-[#A8A29E] uppercase tracking-wide">{status}</h3>
              <span className="text-xs text-[#A8A29E] bg-[#F6F3FF] px-2 py-1 rounded-full border border-[#E5DDFF]">
                {items.length}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-3 min-h-[200px]">
              {items.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group border border-[#F6F3FF] hover:border-[#E5DDFF]"
                >
                  {/* Priority indicator */}
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} />
                    <button
                      onClick={() => handleComplete(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#A8A29E] hover:text-[#9458FA]"
                    >
                      Mark done
                    </button>
                  </div>

                  {/* Task content */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-[#44403C] leading-tight">{item.task}</h4>

                    {item.relatedApplication && <div className="text-xs text-[#A8A29E]">{item.relatedApplication}</div>}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-[#A8A29E]">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className={isOverdue(item.dueDate) ? "text-red-600 font-medium" : ""}>
                          {formatDate(item.dueDate)}
                        </span>
                      </div>
                      {isOverdue(item.dueDate) && <div className="w-2 h-2 bg-red-500 rounded-full" />}
                    </div>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="border-2 border-dashed border-[#E5DDFF] rounded-lg p-6 text-center">
                  <p className="text-[#A8A29E] text-sm">No tasks</p>
                </div>
              )}

              {items.length > 3 && (
                <div className="text-center">
                  <Link href="/action-items">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#A8A29E] hover:text-[#44403C] hover:bg-[#F6F3FF] w-full"
                    >
                      +{items.length - 3} more
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
