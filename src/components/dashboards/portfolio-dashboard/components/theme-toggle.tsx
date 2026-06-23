"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export function ThemeToggle() { const { resolvedTheme, setTheme } = useTheme(); const dark = resolvedTheme === "dark"; return <Button variant="ghost" className="h-10 w-full justify-start gap-3 px-2 text-muted-foreground" onClick={() => setTheme(dark ? "light" : "dark")}><span className="relative size-5"><Sun className={`absolute size-5 transition-[opacity,filter,scale] duration-300 ${dark ? "scale-25 opacity-0 blur-sm" : "scale-100 opacity-100"}`} /><Moon className={`absolute size-5 transition-[opacity,filter,scale] duration-300 ${dark ? "scale-100 opacity-100" : "scale-25 opacity-0 blur-sm"}`} /></span>Dark Mode</Button>; }
