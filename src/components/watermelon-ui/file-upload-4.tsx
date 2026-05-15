import { useEffect, useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaFileAlt,
  FaFileImage,
  FaFileWord,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type UploadStatus = "uploading" | "completed" | "error";
type UploadTone = "default" | "danger" | "muted";

interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: string;
  extension: string;
  progress: number;
  status: UploadStatus;
}

export interface DocumentUploaderProps {
  title?: string;
  acceptedFormats?: string[];
  maxFileSizeMb?: number;
  minFileSizeMb?: number;
  onClose?: () => void;
  onUploadComplete?: (files: File[]) => void;
}

const defaultAcceptedFormats = ["jpg", "pdf", "svg", "png", "docx"];

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} gb`;
  }

  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} mb`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} kb`;
}

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function getFileTone(file: UploadFile): UploadTone {
  if (file.status === "error") return "danger";
  if (file.status === "completed") return "muted";
  return "default";
}

function getFileIcon(extension: string) {
  if (["jpg", "jpeg", "png", "svg", "webp", "gif"].includes(extension)) {
    return <FaFileImage className="text-muted-foreground h-7 w-7" />;
  }

  if (["doc", "docx"].includes(extension)) {
    return <FaFileWord className="text-muted-foreground h-7 w-7" />;
  }

  return <FaFileAlt className="text-muted-foreground h-7 w-7" />;
}

export default function DocumentUploader({
  title = "Upload Files",
  acceptedFormats = defaultAcceptedFormats,
  maxFileSizeMb = 24_576,
  minFileSizeMb = 20,
  onUploadComplete,
}: DocumentUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const accept = acceptedFormats.map((format) => `.${format}`).join(",");
  const hasUploadingFiles = files.some((file) => file.status === "uploading");

  useEffect(() => {
    if (!hasUploadingFiles) return;

    const interval = window.setInterval(() => {
      setFiles((currentFiles) =>
        currentFiles.map((file) => {
          if (file.status !== "uploading") return file;

          const nextProgress = Math.min(
            file.progress + 8 + Math.random() * 12,
            100,
          );

          return {
            ...file,
            progress: nextProgress,
            status: nextProgress >= 100 ? "completed" : "uploading",
          };
        }),
      );
    }, 450);

    return () => window.clearInterval(interval);
  }, [hasUploadingFiles]);

  useEffect(() => {
    const completedFiles = files
      .filter((file) => file.status === "completed")
      .map((file) => file.file);

    if (completedFiles.length && completedFiles.length === files.length) {
      onUploadComplete?.(completedFiles);
    }
  }, [files, onUploadComplete]);

  const addFiles = (selectedFiles: FileList | File[]) => {
    const maxBytes = maxFileSizeMb * 1024 * 1024;
    const acceptedSet = new Set(
      acceptedFormats.map((format) => format.toLowerCase()),
    );

    setFiles((currentFiles) => [
      ...currentFiles,
      ...Array.from(selectedFiles).map((file) => {
        const extension = getExtension(file.name);
        const isAccepted = !acceptedSet.size || acceptedSet.has(extension);
        const isTooLarge = file.size > maxBytes;
        const status: UploadStatus =
          isAccepted && !isTooLarge ? "uploading" : "error";

        return {
          id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
          file,
          name: file.name,
          size: formatFileSize(file.size),
          extension,
          progress: status === "uploading" ? 6 : 100,
          status,
        };
      }),
    ]);
  };

  const removeFile = (id: string) => {
    setFiles((currentFiles) => currentFiles.filter((file) => file.id !== id));
  };

  return (
    <Card className="bg-card text-card-foreground mx-auto mt-40 w-full max-w-3xl rounded shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-normal tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6 sm:grid-cols-[1.08fr_1fr]">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              addFiles(event.dataTransfer.files);
            }}
            className={`border-border bg-muted/30 flex aspect-[1.12] w-full flex-col items-center justify-center border border-dashed text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/10"
                : "hover:border-primary/60"
            }`}
          >
            <FaCloudUploadAlt className="text-muted-foreground/25 mb-4 h-14 w-14" />
            <span className="text-foreground text-lg font-normal">
              Drag files to upload
            </span>
            <span className="text-muted-foreground before:bg-border after:bg-border my-4 flex items-center gap-3 text-xs italic before:h-px before:w-10 after:h-px after:w-10">
              or select a file
            </span>
            <Button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                inputRef.current?.click();
              }}
              className="rounded-none px-7"
            >
              Choose File
            </Button>
          </button>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept={accept}
            className="sr-only"
            onChange={(event) => {
              if (event.target.files) addFiles(event.target.files);
              event.target.value = "";
            }}
          />

          <div className="text-muted-foreground text-[10px] leading-tight font-medium">
            <p>Acceptable formats: {acceptedFormats.join(", ")}</p>
            <p>
              Max file size is {maxFileSizeMb / 1024}GB and minimum size{" "}
              {minFileSizeMb}MB
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <div className="text-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
            {hasUploadingFiles ? (
              <FaSpinner className="text-muted-foreground h-3.5 w-3.5 animate-spin" />
            ) : null}
            <span>{hasUploadingFiles ? "Uploading..." : "Files"}</span>
          </div>

          <div className="space-y-3">
            {files.length ? (
              files.map((file) => {
                const tone = getFileTone(file);

                return (
                  <div
                    key={file.id}
                    className="grid grid-cols-[auto_1fr_auto] gap-2"
                  >
                    <div className="pt-1">{getFileIcon(file.extension)}</div>
                    <div className="min-w-0">
                      <div
                        className={`flex items-baseline gap-3 text-sm ${
                          tone === "muted"
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        <span className="truncate">{file.name}</span>
                        <span className="text-muted-foreground shrink-0 text-[10px]">
                          {file.size}
                        </span>
                      </div>
                      <Progress
                        value={file.progress}
                        className={`mt-2 h-1 ${
                          tone === "danger"
                            ? "[&_[data-slot=progress-indicator]]:bg-destructive"
                            : tone === "muted"
                              ? "[&_[data-slot=progress-indicator]]:bg-primary"
                              : "[&_[data-slot=progress-indicator]]:bg-chart-1"
                        }`}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => removeFile(file.id)}
                      aria-label={`Remove ${file.name}`}
                      className="text-muted-foreground hover:text-foreground hover:bg-transparent"
                    >
                      <FaTimes className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className="border-border bg-muted/20 flex h-48 flex-col items-center justify-center border border-dashed text-center">
                <p className="text-foreground text-sm font-medium">
                  No files selected
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Uploaded files will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
