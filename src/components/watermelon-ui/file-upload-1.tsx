"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FaFilePdf,
  FaFileImage,
  FaFileVideo,
  FaFileAlt,
  FaFileCode,
  FaCloudUploadAlt,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

export type FileStatus = "queued" | "uploading" | "done" | "error";

export interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: FileStatus;
}

export interface FileUploaderProps {
  /** Card heading */
  title?: string;
  /** Card sub-heading */
  description?: string;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Maximum individual file size in MB */
  maxSizeMB?: number;
  /** Human-readable label for accepted formats */
  acceptedLabel?: string;
  /** Submit button label */
  submitLabel?: string;
  /** Cancel / discard button label */
  cancelLabel?: string;
  /** Fired when the user clicks submit (receives only "done" files) */
  onSubmit?: (files: File[]) => void;
  /** Fired when the user clicks cancel */
  onCancel?: () => void;
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"] as const;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function FileIcon({ file }: { file: File }): React.ReactElement {
  const type = file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (type.startsWith("image/")) return <FaFileImage className="size-4" />;
  if (type.startsWith("video/")) return <FaFileVideo className="size-4" />;
  if (type === "application/pdf" || ext === "pdf")
    return <FaFilePdf className="size-4" />;
  if (
    ["js", "ts", "tsx", "jsx", "py", "go", "json", "yaml", "yml"].includes(ext)
  )
    return <FaFileCode className="size-4" />;
  return <FaFileAlt className="size-4" />;
}

export function FileUploader({
  title = "Submit Your Report",
  description = "Attach supporting documents to complete your submission.",
  maxFiles = 6,
  maxSizeMB = 25,
  acceptedLabel = "PDF, DOCX, XLSX, CSV · up to 25 MB each",
  submitLabel = "Submit Report",
  cancelLabel = "Discard",
  onSubmit,
  onCancel,
}: FileUploaderProps) {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dragCounter = React.useRef(0);

  const totalSize = files.reduce((acc, f) => acc + f.file.size, 0);
  const allDone = files.length > 0 && files.every((f) => f.status === "done");
  const hasUploading = files.some(
    (f) => f.status === "uploading" || f.status === "queued",
  );
  const isAtLimit = files.length >= maxFiles;

  function simulateUpload(id: string): void {
    let progress = 0;

    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "uploading" } : f)),
    );

    const interval = setInterval(() => {
      progress += Math.random() * 18 + 4;

      if (progress >= 100) {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: 100, status: "done" } : f,
          ),
        );
      } else {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: Math.min(progress, 99) } : f,
          ),
        );
      }
    }, 180);
  }

  function addFiles(incoming: FileList | File[]): void {
    const fileArray = Array.from(incoming);
    const remaining = maxFiles - files.length;

    const toAdd: UploadedFile[] = fileArray
      .filter((f) => f.size <= maxSizeMB * 1024 * 1024)
      .slice(0, remaining)
      .map((file) => ({
        id: generateId(),
        file,
        progress: 0,
        status: "queued",
      }));

    setFiles((prev) => [...prev, ...toAdd]);
    toAdd.forEach((f) => {
      setTimeout(() => simulateUpload(f.id), 80);
    });
  }

  function removeFile(id: string): void {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function clearAll(): void {
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleDragEnter(e: React.DragEvent): void {
    e.preventDefault();
    dragCounter.current += 1;
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent): void {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  }

  function handleDragOver(e: React.DragEvent): void {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent): void {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files?.length) addFiles(e.target.files);
  }

  function handleSubmit(): void {
    onSubmit?.(files.filter((f) => f.status === "done").map((f) => f.file));
  }

  return (
    <Card className="mx-auto mt-40 w-full max-w-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] ring-0">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-foreground text-base leading-snug font-semibold tracking-tight">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {files.length > 0 && (
            <Badge variant="secondary" className="shrink-0 tabular-nums">
              {files.length}&nbsp;/&nbsp;{maxFiles}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {!isAtLimit && (
          <button
            type="button"
            id="file-upload-drop-zone"
            aria-label="Drag and drop files or click to browse"
            className={[
              "focus-visible:ring-ring relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-8 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/40 hover:border-primary/50 hover:bg-muted/60",
            ].join(" ")}
            onClick={() => inputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div
              className={[
                "flex size-11 items-center justify-center rounded-xl border transition-colors duration-200",
                isDragging
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground",
              ].join(" ")}
            >
              <FaCloudUploadAlt className="size-5" />
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-foreground text-sm font-medium">
                {isDragging
                  ? "Release to add files"
                  : "Drag & drop or click to browse"}
              </p>
              <p className="text-muted-foreground text-xs">{acceptedLabel}</p>
            </div>
          </button>
        )}

        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((uf) => (
              <div
                key={uf.id}
                className="bg-muted/40 border-border flex flex-col gap-2 rounded-lg border px-3 py-2.5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={[
                      "shrink-0",
                      uf.status === "error"
                        ? "text-destructive"
                        : uf.status === "done"
                          ? "text-primary"
                          : "text-muted-foreground",
                    ].join(" ")}
                  >
                    <FileIcon file={uf.file} />
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="text-foreground truncate text-sm leading-none font-medium">
                      {uf.file.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatBytes(uf.file.size)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {uf.status === "done" && (
                      <FaCheckCircle className="text-primary size-3.5" />
                    )}
                    {uf.status === "error" && (
                      <FaExclamationCircle className="text-destructive size-3.5" />
                    )}
                    {(uf.status === "uploading" || uf.status === "queued") && (
                      <span className="text-muted-foreground text-xs tabular-nums">
                        {Math.round(uf.progress)}%
                      </span>
                    )}

                    <button
                      type="button"
                      id={`remove-file-${uf.id}`}
                      aria-label={`Remove ${uf.file.name}`}
                      onClick={() => removeFile(uf.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors duration-150"
                    >
                      <FaTimes className="size-3.5" />
                    </button>
                  </div>
                </div>

                {(uf.status === "uploading" || uf.status === "queued") && (
                  <Progress value={uf.progress} className="h-1" />
                )}
              </div>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              {files.length} file{files.length !== 1 ? "s" : ""}&nbsp;·&nbsp;
              {formatBytes(totalSize)} total
            </span>
            {!hasUploading && (
              <button
                type="button"
                id="file-upload-clear-all"
                onClick={clearAll}
                className="text-muted-foreground hover:text-foreground text-xs transition-colors duration-150"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3">
        <div className="text-muted-foreground flex items-center gap-1.5">
          <FaShieldAlt className="size-3" />
          <span className="text-xs">256-bit encrypted</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            id="file-upload-cancel"
            variant="outline"
            size="sm"
            onClick={onCancel ?? clearAll}
          >
            {cancelLabel}
          </Button>

          <Button
            id="file-upload-submit"
            variant="default"
            size="sm"
            disabled={!allDone}
            onClick={handleSubmit}
            className="gap-1.5"
          >
            {submitLabel}
            <FaArrowRight className="size-3" />
          </Button>
        </div>
      </CardFooter>

      <input
        ref={inputRef}
        id="file-upload-input"
        type="file"
        multiple
        className="sr-only"
        onChange={handleInputChange}
        aria-hidden="true"
      />
    </Card>
  );
}

export default FileUploader;
