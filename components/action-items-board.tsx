"use client"

import { useState } from "react"
import { DragDropContext, type DropResult, Draggable, Droppable } from "react-beautiful-dnd"
import { Plus, Search } from "lucide-react"

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

  const columns = {
    Blocked: filteredItems.filter((item) => item.status === "Pending"),
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

    const statusMap: Record<string, "Not Started" | "In Progress" | "Completed" | "Pending"> = {
      "To Do": "Not Started",
      "In Progress": "In Progress",
      Blocked: "Pending",
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Action Items</h1>
          <p className="text-gray-600 mt-1">Manage and organize your job search tasks</p>
        </div>
        <Button
          onClick={handleCreateTask}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            className="pl-10 bg-white border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(columns).map(([columnId, items]) => (
            <div key={columnId} className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    columnId === "Blocked"
                      ? "bg-purple-500"
                      : columnId === "To Do"
                        ? "bg-blue-500"
                        : columnId === "In Progress"
                          ? "bg-orange-500"
                          : "bg-green-500"
                  }`}
                />
                <h3 className="text-sm font-medium text-gray-700">{columnId}</h3>
                <Badge
                  variant="secondary"
                  className={`text-xs px-2 py-1 rounded-full ${
                    columnId === "Blocked"
                      ? "bg-purple-100 text-purple-700"
                      : columnId === "To Do"
                        ? "bg-blue-100 text-blue-700"
                        : columnId === "In Progress"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
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
                    className={`min-h-[400px] rounded-lg p-4 transition-colors ${
                      snapshot.isDraggingOver ? "bg-gray-100" : "bg-transparent"
                    }`}
                  >
                    <div className="space-y-3">
                      {items.length === 0 ? (
                        <div
                          className={`border-2 border-dashed rounded-lg p-8 text-center ${
                            columnId === "Blocked"
                              ? "border-purple-200"
                              : columnId === "To Do"
                                ? "border-blue-200"
                                : columnId === "In Progress"
                                  ? "border-orange-200"
                                  : "border-green-200"
                          }`}
                        >
                          <p className="text-gray-500 text-sm">No tasks</p>
                        </div>
                      ) : (
                        items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${snapshot.isDragging ? "opacity-80" : ""}`}
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
