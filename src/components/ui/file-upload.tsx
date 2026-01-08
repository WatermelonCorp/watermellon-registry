"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  DocumentUpload,
  CloseCircle,
  DocumentText,
  Image as ImageIcon,
} from "iconsax-react";
import { toast } from "sonner";

// ============================================================================
// Core Types
// ============================================================================

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  uploadResult?: Record<string, unknown>; // Provider-specific upload result
  preview?: string;
}

export interface UploadResponse {
  success: boolean;
  data?: Record<string, unknown>; // Provider-specific data (URL, key, public_id, etc.)
  error?: string;
}

export interface UploadProvider {
  name: string;
  uploadFile: (
    file: File,
    options?: Record<string, unknown>
  ) => Promise<UploadResponse>;
  uploadFiles?: (
    files: File[],
    options?: Record<string, unknown>
  ) => Promise<UploadResponse[]>;
}

export interface FileUploadProps {
  onFilesChange?: (files: UploadedFile[]) => void;
  provider?: UploadProvider | null; // null = local only
  uploadOptions?: Record<string, string>; // Provider-specific options
  acceptedTypes?: string[];
  maxFileSize?: number; // in MB
  maxFiles?: number;
  required?: boolean;
  title?: string;
  description?: string;
  className?: string;
  multiple?: boolean;
  showPreviews?: boolean;
  localMode?: boolean; // Force local-only mode (no upload)
  onUploadStart?: (file: File) => void;
  onUploadSuccess?: (file: File, result?: Record<string, unknown>) => void;
  onUploadError?: (file: File, error: string) => void;
}

// ============================================================================
// Built-in Upload Providers
// ============================================================================

export class S3Provider implements UploadProvider {
  name = "s3";
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async uploadFile(
    file: File,
    options: { folder?: string } = {}
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", options.folder || "uploads");

      const response = await fetch(`${this.baseUrl}/api/s3/upload`, {
        method: "POST",
        headers: {
          "x-api-key": this.apiKey,
        },
        body: formData,
      });

      const result = await response.json();
      return {
        success: result.success,
        data: result.file,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  async uploadFiles(
    files: File[],
    options: { folder?: string } = {}
  ): Promise<UploadResponse[]> {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("folder", options.folder || "uploads");

      const response = await fetch(`${this.baseUrl}/api/s3/upload-multiple`, {
        method: "POST",
        headers: {
          "x-api-key": this.apiKey,
        },
        body: formData,
      });

      const result = await response.json();
      return result.files || [];
    } catch (error) {
      return files.map(() => ({
        success: false,
        error: (error as Error).message,
      }));
    }
  }
}

export class CloudinaryProvider implements UploadProvider {
  name = "cloudinary";
  private cloudName: string;
  private apiKey: string;

  constructor(cloudName: string, apiKey: string) {
    this.cloudName = cloudName;
    this.apiKey = apiKey;
  }

  async uploadFile(
    file: File,
    options: { preset?: string; resourceType?: string } = {}
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", options.preset || "default");
      formData.append("api_key", this.apiKey);

      const resourceType =
        options.resourceType ||
        (file.type.startsWith("image/") ? "image" : "raw");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.error) {
        return {
          success: false,
          error: data.error.message,
        };
      }

      return {
        success: true,
        data: {
          url: data.secure_url,
          publicId: data.public_id,
          resourceType: data.resource_type,
          format: data.format,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }
}

export class CustomAPIProvider implements UploadProvider {
  name = "custom";
  private endpoint: string;
  private headers: Record<string, string>;

  constructor(endpoint: string, headers: Record<string, string> = {}) {
    this.endpoint = endpoint;
    this.headers = headers;
  }

  async uploadFile(
    file: File,
    options: Record<string, unknown> = {}
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Add any additional options to form data
      Object.entries(options).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: this.headers,
        body: formData,
      });

      const data = await response.json();

      return {
        success: response.ok,
        data,
        error: response.ok ? undefined : data.message || "Upload failed",
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) {
    return (
      <ImageIcon
        className="h-6 w-6 text-blue-500"
        variant="Bulk"
        color="currentColor"
      />
    );
  }
  return (
    <DocumentText
      className="h-6 w-6 text-blue-500"
      variant="Bulk"
      color="currentColor"
    />
  );
};

const createFilePreview = (file: File): Promise<string | undefined> => {
  return new Promise((resolve) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => resolve(undefined);
      reader.readAsDataURL(file);
    } else {
      resolve(undefined);
    }
  });
};

// ============================================================================
// Main Component
// ============================================================================

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  provider = null,
  uploadOptions = {},
  acceptedTypes = [
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".jpg",
    ".jpeg",
    ".png",
  ],
  maxFileSize = 10, // 10MB default
  maxFiles = 5,
  required = false,
  title = "Upload Files",
  description = "Drag and drop files here or click to browse",
  className = "",
  multiple = true,
  showPreviews = true,
  localMode = false,
  onUploadStart,
  onUploadSuccess,
  onUploadError,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`;
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedTypes.some((type) => type.toLowerCase() === fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(
        ", "
      )}`;
    }

    return null;
  };

  const processFiles = async (files: FileList | File[]) => {
    setIsUploading(true);
    const fileArray = Array.from(files);
    const newFiles: UploadedFile[] = [];

    for (const file of fileArray) {
      // Validate file
      const error = validateFile(file);
      if (error) {
        toast.error(`${file.name}: ${error}`);
        continue;
      }

      // Check if we've reached max files
      if (uploadedFiles.length + newFiles.length >= maxFiles) {
        toast.warning(`Maximum ${maxFiles} files allowed`);
        break;
      }

      try {
        onUploadStart?.(file);

        // Create preview
        const preview = await createFilePreview(file);

        // Create base file object
        const uploadedFile: UploadedFile = {
          id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          preview,
        };

        // Upload if provider is available and not in local mode
        if (provider && !localMode) {
          const uploadResult = await provider.uploadFile(file, uploadOptions);

          if (uploadResult.success) {
            uploadedFile.uploadResult = uploadResult.data;
            toast.success(`${file.name} uploaded successfully`);
            onUploadSuccess?.(file, uploadResult.data);
          } else {
            toast.error(`Upload failed: ${uploadResult.error}`);
            onUploadError?.(file, uploadResult.error || "Upload failed");
            continue;
          }
        } else {
          // Local mode or no provider
          toast.success(`${file.name} added successfully`);
        }

        newFiles.push(uploadedFile);
      } catch (error) {
        console.error("Failed to process file", { file, error });
        toast.error(`Failed to process ${file.name}`);
        onUploadError?.(file, (error as Error).message);
      }
    }

    const updatedFiles = multiple ? [...uploadedFiles, ...newFiles] : newFiles;
    setUploadedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
    setIsUploading(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFiles(files);
      }
    },
    [uploadedFiles, maxFiles, multiple]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow re-uploading the same file
    e.target.value = "";
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const clearAllFiles = () => {
    setUploadedFiles([]);
    onFilesChange?.([]);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleFileSelect}
        className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragOver
          ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/20"
          : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-600 dark:hover:border-zinc-500"
          } ${uploadedFiles.length > 0
            ? "bg-zinc-50 dark:bg-zinc-800/50"
            : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          } `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.join(",")}
          multiple={multiple}
          onChange={handleFileInputChange}
        />

        <div className="flex flex-col items-center">
          <DocumentUpload
            className={`mx-auto h-12 w-12 ${isDragOver ? "text-blue-500" : "text-zinc-400"
              }`}
            variant="Bulk"
            color="currentColor"
          />

          <div className="mt-4">
            <p
              className={`text-sm font-medium ${isDragOver
                ? "text-blue-600"
                : "text-zinc-700 dark:text-zinc-300"
                }`}
            >
              {title}
              {required && <span className="ml-1 text-red-500">*</span>}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
            <p className="mt-2 text-xs text-zinc-400">
              Max {maxFiles} files, {maxFileSize}MB each
            </p>
            <p className="text-xs text-zinc-400">
              Supported: {acceptedTypes.join(", ")}
            </p>
            {(localMode || !provider) && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                Local mode - files won&apos;t be uploaded
              </p>
            )}
          </div>
        </div>

        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 dark:bg-zinc-800/80">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              <span className="text-sm text-zinc-600">Processing files...</span>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Uploaded Files ({uploadedFiles.length}/{maxFiles})
            </h4>
            {uploadedFiles.length > 1 && (
              <button
                type="button"
                onClick={clearAllFiles}
                className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid gap-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-600 dark:bg-zinc-800"
              >
                <div className="flex items-center gap-3">
                  {showPreviews && file.preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    getFileIcon(file.type)
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {file.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {formatFileSize(file.size)}
                      {file.uploadResult && (
                        <span className="ml-2 text-green-600">• Uploaded</span>
                      )}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-700"
                  title="Remove file"
                >
                  <CloseCircle
                    className="h-4 w-4"
                    variant="Bulk"
                    color="currentColor"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

// ============================================================================
// Usage Examples
// ============================================================================

/*
// S3 Upload
const s3Provider = new S3Provider(
  process.env.NEXT_PUBLIC_MAIL_NOTIFIER_URL!,
  process.env.NEXT_PUBLIC_MAIL_NOTIFIER_KEY!
);

<FileUpload
  onFilesChange={(files) => console.log(files)}
  provider={s3Provider}
  uploadOptions={{ folder: "documents" }}
/>

// Cloudinary Upload
const cloudinaryProvider = new CloudinaryProvider(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!
);

<FileUpload
  onFilesChange={(files) => console.log(files)}
  provider={cloudinaryProvider}
  uploadOptions={{ preset: "my_preset" }}
/>

// Custom API Upload
const customProvider = new CustomAPIProvider(
  "https://my-api.com/upload",
  { "Authorization": "Bearer token" }
);

<FileUpload
  onFilesChange={(files) => console.log(files)}
  provider={customProvider}
  uploadOptions={{ category: "documents" }}
/>

// Local Only (no upload)
<FileUpload
  onFilesChange={(files) => console.log(files)}
  localMode={true}
/>

// Custom Provider
const myCustomProvider: UploadProvider = {
  name: "my-service",
  async uploadFile(file: File, options?: any) {
    // Your custom upload logic here
    return {
      success: true,
      data: { url: "https://example.com/file.pdf" }
    };
  }
};

<FileUpload
  onFilesChange={(files) => console.log(files)}
  provider={myCustomProvider}
  onUploadSuccess={(file, result) => console.log("Uploaded:", file.name, result)}
  onUploadError={(file, error) => console.error("Failed:", file.name, error)}
/>
*/
