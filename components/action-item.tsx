"use client"

import type React from "react"

import { useState } from "react"
import { Trash2, Clock, Briefcase, Check, GripVertical } from "lucide-react"
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
  const [isHovered, setIsHovered] = useState(false)

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

  const isOverdue = new Date(dueDate) < new Date() && status !== "Completed"

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const isHighlighted = status === "Pending"

  return (
    <div
      className={`bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group min-h-[120px] flex flex-col justify-between ${
        status === "Completed" ? "opacity-75" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(id)}
    >
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-40 transition-opacity">
        <GripVertical className="h-4 w-4 text-gray-400" />
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
            {description && (
              <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed hidden group-hover:block">
                {description
                  .replace(/\*\*(.*?)\*\*/g, "$1")
                  .replace(/\*(.*?)\*/g, "$1")
                  .replace(/^[•\d+.]\s/gm, "")
                  .substring(0, 100)}
                {description.length > 100 && "..."}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100 gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getPriorityBadge(priority)}
            {relatedApplication && (
              <div className="flex items-center text-gray-600 min-w-0 bg-gray-50 rounded px-2 py-1">
                <Briefcase className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate max-w-[80px] text-xs">{relatedApplication}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div
              className={`flex items-center ${isOverdue && status !== "Completed" ? "text-red-600" : "text-gray-500"}`}
            >
              <Clock className="h-3 w-3 mr-1" />
              <span className="whitespace-nowrap text-xs">
                {isOverdue && status !== "Completed" ? "Overdue " : ""}
                {formatDate(dueDate)}
              </span>
            </div>

            <div className={`flex items-center gap-1 transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}>
              {status !== "Completed" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-green-50 hover:text-green-600"
                  onClick={handleMarkComplete}
                >
                  <Check className="h-3 w-3" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-red-50 hover:text-red-600"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
