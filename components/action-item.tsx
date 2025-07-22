"use client"

import type React from "react"

import { useState } from "react"
import { Trash2, Clock, Calendar, Briefcase, AlertTriangle, Check } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface ActionItemProps {
  id: string
  task: string
  description?: string // Add this line
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
  description, // Add this parameter
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
        return <Badge className="bg-red-100 text-red-700 border-red-200 font-medium">High</Badge>
      case "Medium":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 font-medium">Medium</Badge>
      case "Low":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-medium">Low</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200 font-medium">Unknown</Badge>
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

  // For the "Waiting" column, we can highlight the card with a purple background
  const isHighlighted = status === "Pending"

  return (
    <div
      className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group mb-4 border ${
        isHighlighted
          ? "bg-gradient-to-br from-purple-25 to-purple-50/30 border-purple-100 hover:border-purple-200"
          : status === "Completed"
            ? "bg-gradient-to-br from-slate-25 to-slate-50/30 border-slate-100 hover:border-slate-200"
            : "bg-white/80 border-slate-100 hover:border-slate-200 hover:bg-white"
      } hover:scale-[1.01] hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(id)}
    >
      {/* Task content */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4
              className={`text-sm font-medium leading-tight ${status === "Completed" ? "text-slate-500" : "text-slate-900"}`}
            >
              {task}
            </h4>
            {/* Description preview */}
            {description && (
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {description
                  .replace(/\*\*(.*?)\*\*/g, "$1")
                  .replace(/\*(.*?)\*/g, "$1")
                  .replace(/^[•\d+.]\s/gm, "")
                  .substring(0, 100)}
                {description.length > 100 && "..."}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 transition-opacity">
            {status !== "Completed" && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleMarkComplete}>
                <Check className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <button onClick={handleDelete} className="text-xs text-slate-500 hover:text-red-600 transition-colors">
                <Trash2 className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Priority badge */}
        <div className="flex items-center justify-between mt-1">
          {getPriorityBadge(priority)}
          {isOverdue && (
            <div className="flex items-center text-red-600 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Overdue
            </div>
          )}
        </div>

        {/* Company name if available */}
        {relatedApplication && (
          <div className="flex items-center text-xs text-slate-600">
            <Briefcase className="h-3 w-3 mr-1" />
            <span className="truncate">{relatedApplication}</span>
          </div>
        )}

        {/* Dates section */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-50">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Due: {formatDate(dueDate)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Created: {formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
