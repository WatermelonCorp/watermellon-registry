import { useEffect, useState, type ReactNode } from "react"

import { TooltipProvider } from "@/components/ui/tooltip"

import { AppSidebar } from "./app-sidebar"
import { TopNavbar } from "./top-navbar"

export function DashboardShell({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() =>
    typeof document === "undefined"
      ? false
      : document.documentElement.classList.contains("dark")
  )

  useEffect(() => {
    const root = document.documentElement
    const syncTheme = () => setIsDark(root.classList.contains("dark"))
    const observer = new MutationObserver(syncTheme)

    syncTheme()
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  function handleThemeChange(dark: boolean) {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
    setIsDark(dark)
  }

  return (
    <TooltipProvider>
      <div
        className="relative h-svh min-h-0 overflow-hidden transition-colors"
      >
        <AppSidebar />
        <TopNavbar
          isDark={isDark}
          onThemeChange={handleThemeChange}
        />

        <main
          aria-label="Page content"
          className="h-full overflow-y-auto pt-18 md:pl-17"
        >
          {children}
        </main>
      </div>
    </TooltipProvider>
  )
}
