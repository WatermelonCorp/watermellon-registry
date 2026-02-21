"use client"

import { cn } from "@/lib/utils"

export function WorkspaceLayout({
  list,
  content,
  isMailDetail = false,
}: {
  list: React.ReactNode
  content: React.ReactNode
  isMailDetail?: boolean
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* SECOND PANEL (LIST) */}
      <div className={cn(
        "w-full md:w-[350px] border-r bg-[#121212]",
        isMailDetail ? "hidden md:block" : "block"
      )}>
        {list}
      </div>

      {/* THIRD PANEL (CONTENT) */}
      <div className={cn(
        "flex-1 overflow-y-auto",
        isMailDetail ? "block" : "hidden md:block"
      )}>
        {content}
      </div>
    </div>
  )
}
