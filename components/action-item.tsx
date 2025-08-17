"use client"

import type React from "react"
import { Briefcase, Check, Edit, Trash2 } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface ActionItemProps {
  id: string
  task: string
  description?: string
  status: "Not Started" | "In Progress" | "Completed" | "Pending"
  dueDate: string
  priority: "Low" | "Medium" | "High"
  relatedApplication?: string
  createdAt: string
  compact?: boolean
  onDelete?: (id: string) => void
  onClick?: (id: string) => void
}

export function ActionItem({
  id,
  task,
  description,
  status,
  dueDate,
  priority,
  relatedApplication,
  createdAt,
  compact = false,
  onDelete,
  onClick,
}: ActionItemProps) {
  const { updateActionItem } = useNotifications()

  const handleMarkComplete = (e: React.MouseEvent) => {
    e.stopPropagation()
    updateActionItem(id, { status: "Completed" })
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDelete) {
      onDelete(id)
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) {
      onClick(id)
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-700 border-red-200 font-medium px-2 py-1 text-xs">High</Badge>
      case "Medium":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 font-medium px-2 py-1 text-xs">Medium</Badge>
        )
      case "Low":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-medium px-2 py-1 text-xs">Low</Badge>
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-200 font-medium px-2 py-1 text-xs">Unknown</Badge>
        )
    }
  }

  const isHighlighted = status === "Pending"
  const isDueToday = new Date(dueDate).toDateString() === new Date().toDateString()
  const isOverdue = new Date(dueDate) < new Date() && !isDueToday

  return (
    <div
      className={`bg-white rounded-lg p-4 border border-gray-200 transition-all duration-200 cursor-pointer min-h-[120px] flex flex-col justify-between relative group ${
        status === "Completed" ? "opacity-75" : ""
      }`}
      onClick={() => onClick && onClick(id)}
    >
      <div className="absolute inset-0 bg-black/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={handleEdit}>
          <Edit className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          onClick={handleMarkComplete}
          className="bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-200 px-4 py-2 rounded-lg font-medium"
          disabled={status === "Completed"}
        >
          <Check className="h-4 w-4 mr-2" />
          Mark done
        </Button>
      </div>

      <div className="space-y-3 flex-1">
        <div className="flex justify-between items-start pr-6">
          <div className="flex-1">
            <h4
              className={`text-sm font-semibold leading-tight ${
                status === "Completed" ? "text-gray-500 line-through" : "text-gray-900"
              }`}
            >
              {task}
            </h4>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getPriorityBadge(priority)}
            {isOverdue && (
              <div className="flex items-center text-red-600 text-xs font-medium">
                <span>Overdue</span>
              </div>
            )}
            {relatedApplication && (
              <div className="flex items-center text-gray-600 min-w-0 bg-gray-50 rounded px-2 py-1">
                <Briefcase className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate max-w-[80px] text-xs">{relatedApplication}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-xs text-gray-500">
        <div className="flex items-center">
          <span>Due: {new Date(dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
        <div className="flex items-center">
          <span>Created: {new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
      </div>
    </div>
  )
}
