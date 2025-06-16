"use client"

import { useState, useRef } from "react"
import { Bold, Italic, List, ListOrdered } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const formatBold = () => insertText("**", "**")
  const formatItalic = () => insertText("*", "*")
  const formatBulletList = () => {
    const lines = value.split("\n")
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    // Find which lines are selected
    let currentPos = 0
    let startLine = 0
    let endLine = 0

    for (let i = 0; i < lines.length; i++) {
      if (currentPos <= start && start <= currentPos + lines[i].length) {
        startLine = i
      }
      if (currentPos <= end && end <= currentPos + lines[i].length) {
        endLine = i
        break
      }
      currentPos += lines[i].length + 1 // +1 for newline
    }

    // Add bullet points to selected lines
    for (let i = startLine; i <= endLine; i++) {
      if (!lines[i].startsWith("• ")) {
        lines[i] = "• " + lines[i]
      }
    }

    onChange(lines.join("\n"))
  }

  const formatNumberedList = () => {
    const lines = value.split("\n")
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    // Find which lines are selected
    let currentPos = 0
    let startLine = 0
    let endLine = 0

    for (let i = 0; i < lines.length; i++) {
      if (currentPos <= start && start <= currentPos + lines[i].length) {
        startLine = i
      }
      if (currentPos <= end && end <= currentPos + lines[i].length) {
        endLine = i
        break
      }
      currentPos += lines[i].length + 1
    }

    // Add numbered list to selected lines
    let counter = 1
    for (let i = startLine; i <= endLine; i++) {
      if (!/^\d+\.\s/.test(lines[i])) {
        lines[i] = `${counter}. ${lines[i]}`
        counter++
      }
    }

    onChange(lines.join("\n"))
  }

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/^• (.+)$/gm, "<li>$1</li>")
      .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")
      .replace(/\n/g, "<br>")
      .replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>")
      .replace(/<\/ul><br><ul>/g, "")
  }

  return (
    <div className={`border rounded-md ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        <Button type="button" variant="ghost" size="sm" onClick={formatBold} className="h-8 w-8 p-0" title="Bold">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={formatItalic} className="h-8 w-8 p-0" title="Italic">
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatBulletList}
          className="h-8 w-8 p-0"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatNumberedList}
          className="h-8 w-8 p-0"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="ml-auto">
          <Button type="button" variant="ghost" size="sm" onClick={() => setIsPreview(!isPreview)} className="text-xs">
            {isPreview ? "Edit" : "Preview"}
          </Button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="p-3">
        {isPreview ? (
          <div
            className="min-h-[120px] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[120px] border-0 p-0 resize-none focus-visible:ring-0"
          />
        )}
      </div>

      {/* Help Text */}
      <div className="px-3 pb-2 text-xs text-gray-500">Use **bold**, *italic*, • bullets, or 1. numbered lists</div>
    </div>
  )
}
