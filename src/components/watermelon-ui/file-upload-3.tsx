"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaFileImage,
  FaFilePdf,
  FaFileVideo,
  FaFileArchive,
  FaTrashAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaFileCode,
} from "react-icons/fa";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FileState = "queued" | "uploading" | "completed" | "failed";

export interface FileEntry {
  id: string;
  file: File;
  progress: number;
  state: FileState;
  error?: string;
}

export interface FileUploadAreaProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onDrop"
> {
  title?: string;
  description?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  files: FileEntry[];
  onFilesSelect: (files: File[]) => void;
  onFileRemove: (id: string) => void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function FileIcon({ type, name }: { type: string; name: string }) {
  const ext = name.split(".").pop()?.toLowerCase() || "";

  if (type.startsWith("image/")) return <FaFileImage className="h-5 w-5" />;
  if (type.startsWith("video/")) return <FaFileVideo className="h-5 w-5" />;
  if (type === "application/pdf" || ext === "pdf")
    return <FaFilePdf className="h-5 w-5" />;
  if (["zip", "rar", "tar", "gz", "7z"].includes(ext))
    return <FaFileArchive className="h-5 w-5" />;
  if (["js", "ts", "jsx", "tsx", "py", "json", "html", "css"].includes(ext))
    return <FaFileCode className="h-5 w-5" />;
  return <FaFileAlt className="h-5 w-5" />;
}

function CircularProgress({ progress }: { progress: number }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="h-8 w-8 -rotate-90 transform">
        <circle
          className="text-muted"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="16"
          cy="16"
        />
        <circle
          className="text-primary transition-all duration-300 ease-in-out"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="16"
          cy="16"
        />
      </svg>
      <div className="text-muted-foreground absolute flex items-center justify-center text-[8px] font-bold tabular-nums">
        {Math.round(progress)}
      </div>
    </div>
  );
}

export function FileUploadArea({
  title = "Media Library",
  description = "Upload and manage your project files.",
  maxFiles = 5,
  maxSizeMB = 10,
  accept,
  files,
  onFilesSelect,
  onFileRemove,
  className,
  ...props
}: FileUploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFilesSelect(Array.from(e.dataTransfer.files));
      }
    },
    [onFilesSelect],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFilesSelect(Array.from(e.target.files));
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onFilesSelect],
  );

  return (
    <Card
      className={cn(
        "mx-auto mt-40 w-full max-w-lg rounded-none pt-0",
        className,
      )}
      {...props}
    >
      <CardHeader className="border-border bg-muted rounded-none border-b pt-2">
        <CardTitle className="text-md text-foreground font-medium tracking-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div
          className={cn(
            "focus-visible:ring-ring relative flex cursor-pointer flex-col items-center justify-between gap-4 rounded-none border-2 border-dashed p-6 transition-all duration-300 outline-none focus-visible:ring-2 sm:flex-row",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/40 bg-muted/10 hover:bg-muted/30",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              fileInputRef.current?.click();
            }
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple={maxFiles > 1}
            accept={accept}
            onChange={handleFileSelect}
            aria-hidden="true"
          />
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div
              className={cn(
                "rounded p-4 transition-colors duration-300",
                isDragging
                  ? "bg-primary/20 text-primary"
                  : "bg-background text-muted-foreground group-hover:text-primary border shadow-xs",
              )}
            >
              <FaCloudUploadAlt className="h-6 w-6" />
            </div>
            <div>
              <p className="text-foreground text-base font-medium">
                Drop files here or click to browse
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                Up to {maxFiles} files, {maxSizeMB}MB each
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="default"
            className="pointer-events-none shrink-0 shadow-[0px_0px_4px_1px_rgba(0,0,0,0.05),inset_0_0px_4px_1px_rgba(255,255,255,0.45),inset_0_1px_0px_0px_rgba(255,255,255,0.35)]"
          >
            Select Files
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((f) => (
              <div
                key={f.id}
                className="text-card-foreground flex items-center gap-4 p-2 transition-all"
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-none",
                    f.state === "failed"
                      ? "bg-destructive/10 text-destructive"
                      : f.state === "completed"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  <FileIcon type={f.file.type} name={f.file.name} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-sm font-semibold">
                    {f.file.name}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground font-medium">
                      {formatBytes(f.file.size)}
                    </span>
                    {f.error && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-destructive truncate font-medium">
                          {f.error}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {f.state === "uploading" && (
                    <CircularProgress progress={f.progress} />
                  )}
                  {f.state === "completed" && (
                    <FaCheckCircle className="text-primary size-6" />
                  )}
                  {f.state === "failed" && (
                    <FaExclamationCircle className="text-destructive h-6 w-6" />
                  )}

                  <div className="bg-border ml-2 h-6 w-px" />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFileRemove(f.id);
                    }}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    aria-label={`Remove ${f.file.name}`}
                  >
                    <FaTrashAlt className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
