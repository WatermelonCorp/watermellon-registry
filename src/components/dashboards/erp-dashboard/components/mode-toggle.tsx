"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            className="h-9 w-9 rounded-md bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-700/80 transition-colors duration-300 group cursor-pointer"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <Sun className="h-[1.1rem] w-[1.1rem] transition-colors duration-300 dark:hidden" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] transition-colors duration-300 hidden dark:block" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
