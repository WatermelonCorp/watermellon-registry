"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Plus } from "@aliimam/icons";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  GitBranch,
  LoaderCircle,
  RotateCcw,
  Send,
  Sparkles,
  Trash,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ButtonDemo() {
  const [open, setOpen] = useState<boolean>(false);
  const [count, setCount] = useState(3);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      // await navigator.clipboard.writeText("string to copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleLoadClick = () => {
    setIsLoading(true);
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reset after 1 second
  };

  const handleClick = () => {
    setCount(0);
  };
  return (
    <div className="flex max-w-lg gap-y-6 flex-wrap gap-3">
      <Button size={"icon"}>
        <Archive />
      </Button>
      <Button size={"icon"} variant="destructive">
        <Trash />
      </Button>
      <Button size={"icon"} variant="secondary">
        <X />
      </Button>
      <Button size={"icon"} variant="ghost">
        <Sparkles />
      </Button>
      <Button size={"icon"} variant="outline">
        <ArrowLeft />
      </Button>
      <Button className="rounded-full" variant="outline" size="icon">
        <Plus />
      </Button>
      <Button size={"icon"}>
        <ArrowRight />
      </Button>
      <Button size={"icon"} variant="secondary">
        <Send />
      </Button>
      <Button size={"icon"}>
        <Download />
      </Button>
      <Button size={"icon"} variant="outline">
        <GitBranch />
      </Button>
      <Button
        className="group rounded-full"
        variant="outline"
        size="icon"
        onClick={() => setOpen((prevState) => !prevState)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <Plus
          className="transition-transform duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]"
          size={16}
          aria-hidden="true"
        />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="relative"
        onClick={handleClick}
        aria-label="Notifications"
      >
        <Bell />
        {count > 0 && (
          <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </Button>
      <Button
        className="group"
        variant="ghost"
        size="icon"
        onClick={() => setOpen((prevState) => !prevState)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <svg
          className="pointer-events-none"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
          />
          <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
          />
          <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
          />
        </svg>
      </Button>
      <Button size={"icon"} disabled>
        <LoaderCircle className="animate-spin" />
      </Button>
      <Button
        size={"icon"}
        onClick={handleLoadClick}
        disabled={isLoading}
        data-loading={isLoading || undefined}
        className="group relative disabled:opacity-100"
      >
        <span className="group-data-loading:text-transparent">
          <Send />
        </span>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderCircle
              className="animate-spin"
              size={16}
              aria-hidden="true"
            />
          </div>
        )}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="disabled:opacity-100"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        disabled={copied}
      >
        <div
          className={cn(
            "transition-all",
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        >
          <Check className="stroke-emerald-500" size={16} aria-hidden="true" />
        </div>
        <div
          className={cn(
            "absolute transition-all",
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        >
          <Copy />
        </div>
      </Button>
      <Button
        className="hover:[&>svg]:rotate-45 transition-transform duration-300"
        variant="outline"
        size="icon"
      >
        <RotateCcw className="transition-transform duration-300" />
      </Button>
    </div>
  );
}
