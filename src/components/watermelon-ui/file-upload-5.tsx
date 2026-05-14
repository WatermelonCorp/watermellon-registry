"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaFileAlt,
  FaFileArchive,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaTimes,
} from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type UploadItemKind = "image" | "pdf" | "word" | "archive" | "file";

export interface UploadGalleryItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  kind: UploadItemKind;
}

export interface DocumentUploaderProps {
  title?: string;
  uploadLabel?: string;
  description?: string;
  acceptedFormats?: string[];
  maxFileSizeMb?: number;
  onFilesChange?: (files: File[]) => void;
}

const defaultAcceptedFormats = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "pdf",
  "doc",
  "docx",
  "zip",
];

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function getFileKind(file: File): UploadItemKind {
  const extension = getExtension(file.name);

  if (file.type.startsWith("image/")) return "image";
  if (extension === "pdf") return "pdf";
  if (["doc", "docx"].includes(extension)) return "word";
  if (["zip", "rar", "7z"].includes(extension)) return "archive";

  return "file";
}

function formatAcceptedFormats(formats: string[]) {
  return formats.map((format) => format.toUpperCase()).join(", ");
}

function getKindIcon(kind: UploadItemKind) {
  const className = "h-8 w-8 text-muted-foreground";

  switch (kind) {
    case "image":
      return <FaFileImage className={className} />;
    case "pdf":
      return <FaFilePdf className={className} />;
    case "word":
      return <FaFileWord className={className} />;
    case "archive":
      return <FaFileArchive className={className} />;
    default:
      return <FaFileAlt className={className} />;
  }
}

function createUploadItem(file: File): UploadGalleryItem {
  const kind = getFileKind(file);

  return {
    id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    kind,
    previewUrl: kind === "image" ? URL.createObjectURL(file) : undefined,
  };
}

export default function DocumentUploader({
  title = "Upload Files",
  uploadLabel = "Upload",
  description,
  acceptedFormats = defaultAcceptedFormats,
  maxFileSizeMb = 20,
  onFilesChange,
}: DocumentUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<UploadGalleryItem[]>([]);
  const [items, setItems] = useState<UploadGalleryItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const accept = useMemo(
    () => acceptedFormats.map((format) => `.${format}`).join(","),
    [acceptedFormats],
  );
  const helperText =
    description ??
    `${formatAcceptedFormats(acceptedFormats)}. Max ${maxFileSizeMb} MB.`;

  useEffect(() => {
    itemsRef.current = items;
    onFilesChange?.(items.map((item) => item.file));
  }, [items, onFilesChange]);

  useEffect(() => {
    return () => {
      itemsRef.current.forEach((item) => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      });
    };
  }, []);

  const addFiles = (selectedFiles: FileList | File[]) => {
    const acceptedSet = new Set(
      acceptedFormats.map((format) => format.toLowerCase()),
    );
    const maxBytes = maxFileSizeMb * 1024 * 1024;

    const nextItems = Array.from(selectedFiles)
      .filter((file) => {
        const extension = getExtension(file.name);
        const isAccepted = !acceptedSet.size || acceptedSet.has(extension);

        return isAccepted && file.size <= maxBytes;
      })
      .map(createUploadItem);

    if (!nextItems.length) return;

    setItems((currentItems) => [...currentItems, ...nextItems]);
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => {
      const removedItem = currentItems.find((item) => item.id === id);

      if (removedItem?.previewUrl) {
        URL.revokeObjectURL(removedItem.previewUrl);
      }

      return currentItems.filter((item) => item.id !== id);
    });
  };

  return (
    <Card className="bg-card h-auto w-full max-w-xl rounded-xl py-0 pt-0 pb-0 shadow-xs transition-all duration-300 ease-out">
      <CardHeader className="bg-muted border-b pt-2">
        <CardTitle className="p-0 text-lg font-semibold tracking-tight">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 px-2 py-0">
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
          className={`border-border bg-muted flex min-h-40 w-full flex-col items-center justify-center rounded-lg border border-dashed text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/10"
              : "hover:border-primary/60"
          }`}
        >
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={(event) => {
              event.stopPropagation();
              inputRef.current?.click();
            }}
            className="mb-4 gap-2"
          >
            <LuUpload className="h-4 w-4" />
            {uploadLabel}
          </Button>
          <p className="text-foreground text-sm">
            Choose files or drag & drop it here.
          </p>
          <p className="text-muted-foreground mt-1 text-sm">{helperText}</p>
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

        {items.length ? (
          <div className="mb-2 grid grid-cols-4 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group bg-muted relative aspect-square overflow-hidden rounded-lg border border-black/5 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_2px_-1px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] dark:border-white/5"
              >
                {item.previewUrl ? (
                  <img
                    src={item.previewUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 p-2 text-center">
                    {getKindIcon(item.kind)}
                    <span className="text-muted-foreground line-clamp-2 max-w-full text-xs font-medium">
                      {item.name}
                    </span>
                  </div>
                )}

                <Button
                  type="button"
                  variant="destructive"
                  size="icon-xs"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="text-muted-foreground absolute top-0 right-0 border-0 bg-transparent"
                >
                  <FaTimes className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
