"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Notification {
  id: string
  message: string
  type: "info" | "warning" | "error"
  relatedActionItemId?: string
}

// Update the ActionItem interface to include createdAt
interface ActionItem {
  id: string
  task: string
  description?: string // Add description field
  status: "Not Started" | "In Progress" | "Completed" | "Pending"
  dueDate: string
  priority: "Low" | "Medium" | "High"
  relatedApplication?: string
  createdAt: string
}

interface NotificationContextType {
  notifications: Notification[]
  actionItems: ActionItem[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
  addActionItem: (actionItem: Omit<ActionItem, "id" | "createdAt">) => void
  updateActionItem: (id: string, updates: Partial<ActionItem>) => void
  removeActionItem: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Get today's date and format it as YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0]

  // Create dates for tomorrow and yesterday
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().split("T")[0]

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split("T")[0]

  // Add some initial action items to the state with varying priorities and due dates
  const [actionItems, setActionItems] = useState<ActionItem[]>([
    {
      id: "1",
      task: "Update resume with latest experience",
      description:
        "Add the recent internship experience at TechCorp, including specific technologies used (React, Node.js, PostgreSQL) and quantifiable achievements. Focus on the microservices architecture project that improved system performance by 40%.",
      status: "In Progress",
      dueDate: tomorrowStr,
      priority: "High",
      createdAt: yesterdayStr,
    },
    {
      id: "2",
      task: "Prepare for Tech Co technical interview",
      description:
        "**Coach Instructions:** Focus on system design questions, particularly distributed systems and scalability. Review:\n• Database sharding strategies\n• Load balancing techniques\n• Caching mechanisms (Redis, Memcached)\n• Microservices vs monolithic architecture\n\n*Practice whiteboarding and explaining your thought process clearly.*",
      status: "Not Started",
      dueDate: today,
      priority: "High",
      relatedApplication: "Tech Co",
      createdAt: yesterdayStr,
    },
    {
      id: "3",
      task: "Follow up with recruiter from Startup Inc",
      description:
        "Send a polite follow-up email to Sarah Johnson (sarah.j@startupinc.com) regarding the Senior Developer position. Mention your continued interest and ask about next steps in the process. Reference the conversation about their new AI initiative.",
      status: "Pending",
      dueDate: yesterdayStr,
      priority: "Medium",
      relatedApplication: "Startup Inc",
      createdAt: (() => {
        const twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
        return twoDaysAgo.toISOString().split("T")[0]
      })(),
    },
    {
      id: "4",
      task: "Research Big Tech company culture",
      description:
        "**Research Areas:**\n• Company values and mission alignment\n• Recent news and product launches\n• Engineering blog posts and technical challenges\n• Employee reviews on Glassdoor\n• Leadership team backgrounds\n\n*Prepare 2-3 thoughtful questions about their engineering practices.*",
      status: "Not Started",
      dueDate: tomorrowStr,
      priority: "Low",
      relatedApplication: "Big Tech",
      createdAt: (() => {
        const threeDaysAgo = new Date()
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
        return threeDaysAgo.toISOString().split("T")[0]
      })(),
    },
    {
      id: "5",
      task: "Complete LinkedIn profile update",
      description:
        "Update LinkedIn profile with:\n• New headline emphasizing full-stack expertise\n• Skills section with React, TypeScript, AWS\n• Summary highlighting recent projects\n• Professional headshot\n\n**Goal:** Increase profile visibility to recruiters by 50%.",
      status: "Not Started",
      dueDate: tomorrowStr,
      priority: "Medium",
      createdAt: (() => {
        const oneDayAgo = new Date()
        oneDayAgo.setDate(oneDayAgo.getDate() - 1)
        return oneDayAgo.toISOString().split("T")[0]
      })(),
    },
  ])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const newNotification = { ...notification, id: Date.now().toString() }
    setNotifications((prev) => [...prev, newNotification])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const addActionItem = (actionItem: Omit<ActionItem, "id" | "createdAt">) => {
    const newActionItem = {
      ...actionItem,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setActionItems((prev) => [...prev, newActionItem])
    addNotification({
      message: `New action item added: ${actionItem.task}`,
      type: "info",
      relatedActionItemId: newActionItem.id,
    })
  }

  const updateActionItem = (id: string, updates: Partial<ActionItem>) => {
    setActionItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
    if (updates.status === "Completed") {
      addNotification({
        message: `Action item completed: ${updates.task || "Task"}`,
        type: "info",
        relatedActionItemId: id,
      })
    }
  }

  const removeActionItem = (id: string) => {
    setActionItems((prev) => prev.filter((item) => item.id !== id))
  }

  useEffect(() => {
    // Check for upcoming due dates and create notifications
    const checkDueDates = () => {
      const today = new Date()
      actionItems.forEach((item) => {
        const dueDate = new Date(item.dueDate)
        const timeDiff = dueDate.getTime() - today.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))

        if (daysDiff === 1 && item.status !== "Completed") {
          addNotification({
            message: `Action item "${item.task}" is due tomorrow!`,
            type: "warning",
            relatedActionItemId: item.id,
          })
        }
      })
    }

    checkDueDates()
    const interval = setInterval(checkDueDates, 1000 * 60 * 60) // Check every hour

    return () => clearInterval(interval)
  }, [actionItems])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        actionItems,
        addNotification,
        removeNotification,
        addActionItem,
        updateActionItem,
        removeActionItem,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
