"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Download,
  LoaderCircle,
  Mail,
  Scan,
  Sparkles,
  Star,
  ThumbsUp,
  Trash,
  X,
} from "lucide-react";

export default function ButtonDemo() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reset after 1 second
  };
  return (
    <div className="flex max-w-lg flex-wrap gap-3">
      <Button>
        <Archive className="opacity-60" size={16} aria-hidden="true" />
        Archive
      </Button>
      <Button variant="destructive">
        <Trash className="opacity-60" size={16} aria-hidden="true" />
        Trash
      </Button>
      <Button variant="secondary">
        <X className="opacity-60" size={16} aria-hidden="true" />
        Close
      </Button>
      <Button variant="outline">
        Magic
        <Sparkles className="opacity-60" size={16} aria-hidden="true" />
      </Button>
      <Button className="group" variant="ghost">
        <ArrowLeft
          className="opacity-60 transition-transform group-hover:-translate-x-0.5"
          size={16}
          aria-hidden="true"
        />
        Back
      </Button>
      <Button className="group">
        Next
        <ArrowRight
          className="opacity-60 transition-transform group-hover:translate-x-0.5"
          size={16}
          aria-hidden="true"
        />
      </Button>
      <Button className="group" variant="secondary">
        <Mail className="opacity-60" size={16} aria-hidden="true" />
        Send
        <ArrowRight
          className="opacity-60 transition-transform group-hover:translate-x-0.5"
          size={16}
          aria-hidden="true"
        />
      </Button>
      <Button>
        Download
        <Download className="opacity-60" size={16} aria-hidden="true" />
      </Button>
      <Button disabled>
        <LoaderCircle className="animate-spin" size={16} aria-hidden="true" />
        Loading...
      </Button>
      <Button
        onClick={handleClick}
        disabled={isLoading}
        data-loading={isLoading || undefined}
        className="group relative disabled:opacity-100"
      >
        <span className="group-data-loading:text-transparent">
          Click to load
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
      <Button variant="outline">
        Inbox
        <span className="text-muted-foreground inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          22
        </span>
      </Button>
      <Button variant="outline">
        <Scan className="opacity-60" size={16} aria-hidden="true" />
        Scan
        <kbd className="bg-background text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
          ⌘S
        </kbd>
      </Button>
      <Button className="rounded-md py-0 ps-0">
        <div className="flex aspect-square h-full">
          <img
            className="h-auto border border-primary w-full object-cover rounded-md"
            src="/ai.jpg"
            alt="Profile image"
            width={24}
            height={24}
            aria-hidden="true"
          />
        </div>
        @aliimam
      </Button>
      <Button className="py-0 pe-0" variant="outline">
        <ThumbsUp className="opacity-60" size={16} aria-hidden="true" />
        Like
        <span className="text-muted-foreground before:bg-input relative  inline-flex h-full items-center justify-center rounded-full px-3 text-xs font-medium before:absolute before:inset-0 before:left-0 before:w-px">
          96
        </span>
      </Button>
      <Button>
        <Star className=" opacity-60" size={16} aria-hidden="true" />
        <span className="flex items-baseline gap-2">
          Review
          <span className="text-primary-foreground/60 text-xs">786</span>
        </span>
      </Button>
    </div>
  );
}
