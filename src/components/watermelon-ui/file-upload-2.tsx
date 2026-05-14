import React, { useRef, useState, useCallback } from "react";
import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaFileImage,
  FaFilePdf,
  FaTrashAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaFileVideo,
  FaFileArchive,
} from "react-icons/fa";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type FileStatus = "idle" | "uploading" | "success" | "error";

export interface FileItem {
  id: string;
  file: File;
  progress: number;
  status: FileStatus;
  errorMessage?: string;
}

export interface FileUploadProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onDrop"
> {
  onFilesAdded?: (files: File[]) => void;
  onFileRemove?: (id: string) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  files?: FileItem[];
}

export function FileUpload({
  onFilesAdded,
  onFileRemove,
  maxFiles = 5,
  maxSizeMB = 10,
  accept,
  files = [],
  className,
  ...props
}: FileUploadProps) {
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
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (onFilesAdded) {
          onFilesAdded(droppedFiles);
        }
      }
    },
    [onFilesAdded],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files);
        if (onFilesAdded) {
          onFilesAdded(selectedFiles);
        }
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onFilesAdded],
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image/"))
      return <FaFileImage className="text-primary h-5 w-5" />;
    if (fileType.includes("pdf"))
      return <FaFilePdf className="text-destructive h-5 w-5" />;
    if (fileType.includes("video/"))
      return <FaFileVideo className="text-secondary-foreground h-5 w-5" />;
    if (fileType.includes("zip") || fileType.includes("archive"))
      return <FaFileArchive className="text-muted-foreground h-5 w-5" />;
    return <FaFileAlt className="text-foreground h-5 w-5" />;
  };

  return (
    <div
      className={cn("mx-auto mt-40 w-full max-w-sm space-y-6", className)}
      {...props}
    >
      <Card
        className={cn(
          "group bg-background border-muted/40 relative h-auto w-full max-w-sm cursor-pointer overflow-hidden rounded-[36px] px-2 py-2 transition-all duration-200 ease-in-out",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardHeader className="relative z-10">
          <div className="space-y-2 text-center">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              Upload Documents
            </h2>
            <p className="text-muted-foreground text-sm">
              Securely upload your files, assets and documentation.
            </p>
          </div>
        </CardHeader>
        <CardContent
          className={cn(
            "bg-muted/60 relative z-10 flex min-h-[300px] flex-col items-center justify-center rounded-4xl border-2 border-dashed text-center backdrop-blur-[2px] transition-colors duration-200",
            isDragging
              ? "scale-[1.01]"
              : "border-muted-foreground/20 hover:bg-muted/80",
          )}
        >
          <div className="bg-[repeating-linear-gradient(-45deg,theme(colors.muted.foreground/0.05)_0px,theme(colors.muted.foreground/0.05)_1px,transparent_1px,transparent_10px)] pointer-events-none absolute inset-0" />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple={maxFiles > 1}
            accept={accept}
            onChange={handleFileSelect}
          />
          <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mt-6 mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
            <FaCloudUploadAlt className="h-8 w-8" />
          </div>
          <h3 className="text-foreground mb-2 text-xl font-semibold">
            Click to upload{" "}
            <span className="text-muted-foreground font-normal">
              or drag and drop
            </span>
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            SVG, PNG, JPG, GIF or PDF (max. {maxSizeMB}MB)
          </p>
          <Button
            type="button"
            variant="secondary"
            className="pointer-events-none mb-6"
          >
            Browse Files
          </Button>
        </CardContent>

        {files.length > 0 && (
          <div className="px-2">
            <div className="flex items-center justify-between">
              <h4 className="text-foreground text-sm font-medium">
                Uploaded Files
              </h4>
              <span className="text-muted-foreground text-xs font-medium">
                {files.length} / {maxFiles}
              </span>
            </div>
            <div className="grid gap-3">
              {files.map((fileItem) => (
                <div
                  key={fileItem.id}
                  className="group text-card-foreground relative flex items-center gap-4 overflow-hidden rounded-none py-2"
                >
                  {fileItem.status === "uploading" && (
                    <div className="bg-muted absolute bottom-0 left-0 h-1 w-full">
                      <div
                        className="bg-primary h-full transition-all duration-300 ease-in-out"
                        style={{ width: `${fileItem.progress}%` }}
                      />
                    </div>
                  )}

                  <div className="bg-muted flex-shrink-0 rounded-lg p-3">
                    {getFileIcon(fileItem.file.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="text-foreground truncate pr-4 text-sm font-medium">
                        {fileItem.file.name}
                      </p>
                      <div className="flex flex-shrink-0 items-center gap-2">
                        {fileItem.status === "success" && (
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary hover:bg-primary/20 gap-1 border-transparent"
                          >
                            <FaCheckCircle className="h-3 w-3" /> Done
                          </Badge>
                        )}
                        {fileItem.status === "error" && (
                          <Badge variant="destructive" className="gap-1">
                            <FaExclamationCircle className="h-3 w-3" /> Failed
                          </Badge>
                        )}
                        {fileItem.status === "uploading" && (
                          <span className="text-muted-foreground text-xs font-medium">
                            {Math.round(fileItem.progress)}%
                          </span>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onFileRemove) onFileRemove(fileItem.id);
                          }}
                          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                        >
                          <FaTrashAlt className="h-3.5 w-3.5" />
                          <span className="sr-only">Remove file</span>
                        </Button>
                      </div>
                    </div>

                    <div className="text-muted-foreground flex items-center gap-2 text-xs">
                      <span>{formatFileSize(fileItem.file.size)}</span>
                      {fileItem.errorMessage && (
                        <>
                          <span>•</span>
                          <span className="text-destructive truncate">
                            {fileItem.errorMessage}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
