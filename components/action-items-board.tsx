"use client"

import { useState } from "react"
import { DragDropContext, type DropResult, Draggable, Droppable } from "react-beautiful-dnd"
import { Plus, Search, Filter } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ActionItem } from "@/components/action-item"
import { TaskDetailsModal } from "@/components/task-details-modal"
import { CreateTaskModal } from "@/components/create-task-modal"
import { useNotifications } from "@/hooks/use-notifications"

export function ActionItemsBoard() {
  const { actionItems, updateActionItem, removeActionItem } = useNotifications()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [createModalType, setCreateModalType] = useState<"task" | "followup" | null>(null)

  // Filter items based on search
  const filteredItems = actionItems.filter(
    (item) =>
      item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.relatedApplication && item.relatedApplication.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Group items by status with renamed columns and new order
  const columns = {
    "Waiting on Feedback": filteredItems.filter((item) => item.status === "Pending"),
    "To Do": filteredItems.filter((item) => item.status === "Not Started"),
    "In Progress": filteredItems.filter((item) => item.status === "In Progress"),
    Completed: filteredItems.filter((item) => item.status === "Completed"),
  }

  // Sort items by priority within each column
  Object.keys(columns).forEach((key) => {
    columns[key as keyof typeof columns].sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 }
      const priorityDiff =
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]

      if (priorityDiff !== 0) return priorityDiff
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })
  })

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    // Map the column names back to status values
    const statusMap: Record<string, "Not Started" | "In Progress" | "Completed" | "Pending"> = {
      "To Do": "Not Started",
      "In Progress": "In Progress",
      "Waiting on Feedback": "Pending",
      Completed: "Completed",
    }

    const newStatus = statusMap[destination.droppableId]
    updateActionItem(draggableId, { status: newStatus })
  }

  const handleDeleteItem = (id: string) => {
    removeActionItem(id)
  }

  const handleTaskClick = (id: string) => {
    setSelectedTaskId(id)
    setIsTaskDetailsOpen(true)
  }

  const handleCreateTask = () => {
    setCreateModalType("task")
    setIsCreateModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Action Items</h1>
          <p className="text-slate-500 mt-1">Manage and organize your job search tasks</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Enhanced Create Button with Animation */}
          <Button
            onClick={handleCreateTask}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 min-w-[160px] group"
          >
            <Plus className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:rotate-90" />
            Create Task
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search tasks..."
            className="pl-10 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200">
          <Filter className="h-4 w-4 mr-2" />
          All filters
        </Button>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(columns).map(([columnId, items]) => (
            <div key={columnId} className="space-y-4">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      columnId === "Waiting on Feedback"
                        ? "bg-purple-500"
                        : columnId === "To Do"
                          ? "bg-blue-500"
                          : columnId === "In Progress"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                    }`}
                  />
                  <h3 className="text-sm font-semibold text-slate-700">{columnId}</h3>
                </div>
                <Badge
                  className={`${
                    columnId === "Waiting on Feedback"
                      ? "bg-purple-100 text-purple-700 border-purple-200"
                      : columnId === "To Do"
                        ? "bg-blue-100 text-blue-700 border-blue-200"
                        : columnId === "In Progress"
                          ? "bg-amber-100 text-amber-700 border-amber-200"
                          : "bg-emerald-100 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {items.length}
                </Badge>
              </div>

              {/* Column Content */}
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`min-h-[400px] rounded-xl p-4 transition-all duration-200 ${
                      snapshot.isDraggingOver
                        ? columnId === "Waiting on Feedback"
                          ? "bg-purple-50/80"
                          : columnId === "To Do"
                            ? "bg-blue-50/80"
                            : columnId === "In Progress"
                              ? "bg-amber-50/80"
                              : "bg-emerald-50/80"
                        : columnId === "Waiting on Feedback"
                          ? "bg-purple-50/30"
                          : columnId === "To Do"
                            ? "bg-blue-50/30"
                            : columnId === "In Progress"
                              ? "bg-amber-50/30"
                              : "bg-emerald-50/30"
                    } border border-slate-100`}
                  >
                    <div className="space-y-3">
                      {items.length === 0 ? (
                        <div
                          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                            columnId === "Waiting on Feedback"
                              ? "border-purple-200 bg-purple-50/20"
                              : columnId === "To Do"
                                ? "border-blue-200 bg-blue-50/20"
                                : columnId === "In Progress"
                                  ? "border-amber-200 bg-amber-50/20"
                                  : "border-emerald-200 bg-emerald-50/20"
                          }`}
                        >
                          <p className="text-slate-400 text-sm">No tasks</p>
                        </div>
                      ) : (
                        items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${snapshot.isDragging ? "opacity-70 rotate-2" : ""}`}
                              >
                                <ActionItem
                                  id={item.id}
                                  task={item.task}
                                  description={item.description}
                                  status={item.status}
                                  dueDate={item.dueDate}
                                  priority={item.priority}
                                  relatedApplication={item.relatedApplication}
                                  createdAt={item.createdAt}
                                  onDelete={handleDeleteItem}
                                  onClick={handleTaskClick}
                                  compact={true}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Task Details Modal */}
      <TaskDetailsModal taskId={selectedTaskId} open={isTaskDetailsOpen} onOpenChange={setIsTaskDetailsOpen} />

      {/* Create Task Modal */}
      <CreateTaskModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} type={createModalType} />
    </div>
  )
}
