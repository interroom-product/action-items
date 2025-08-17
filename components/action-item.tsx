"use client"

import type React from "react"
import { Briefcase, Check, Edit, Trash2, AlertTriangle } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { Badge } from "@/components/ui/badge"

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
        return (
          <Badge className="bg-red-50 text-red-700 border border-red-200 font-medium px-2 py-0.5 text-[10px] rounded-sm">
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200 font-medium px-2 py-0.5 text-[10px] rounded-sm">
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge className="bg-slate-50 text-slate-600 border border-slate-200 font-medium px-2 py-0.5 text-[10px] rounded-sm">
            Low
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-50 text-gray-600 border border-gray-200 font-medium px-2 py-0.5 text-[10px] rounded-sm">
            Unknown
          </Badge>
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
      {/* Vertical icon stack - top right */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2">
        <div
          className="h-6 w-6 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer shadow-sm"
          onClick={handleEdit}
        >
          <Edit className="h-3 w-3 text-gray-600" />
        </div>

        <div
          className="h-6 w-6 rounded-full bg-purple-100/90 backdrop-blur-sm border border-purple-200 flex items-center justify-center hover:bg-purple-200 cursor-pointer shadow-sm"
          onClick={handleMarkComplete}
        >
          <Check className="h-3 w-3 text-purple-700" />
        </div>

        <div
          className="h-6 w-6 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-red-50 cursor-pointer shadow-sm"
          onClick={handleDelete}
        >
          <Trash2 className="h-3 w-3 text-gray-600 hover:text-red-600" />
        </div>
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

        {relatedApplication && (
          <div className="flex items-center mt-3">
            <Briefcase className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-900">{relatedApplication}</span>
          </div>
        )}

        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            <span>Due: {new Date(dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
          </div>

          <div className="flex items-center gap-2">
            {getPriorityBadge(priority)}
            {isOverdue && (
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
