"use client";

import { useEffect } from "react";
import {
  formatBytes,
  useFileUpload,
  type FileWithPreview,
} from "@/hooks/use-file-upload";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TriangleAlert, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarUploadProps {
  maxSize?: number;
  className?: string;
  onFileChange?: (file: File | null) => void;
  defaultAvatar?: string;
}

export default function AvatarUpload({
  maxSize = 2 * 1024 * 1024, // 2MB
  className,
  onFileChange,
  defaultAvatar,
}: AvatarUploadProps) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxFiles: 1,
    maxSize,
    multiple: false,
  });

  const currentFile = files[0];
  const previewUrl = currentFile?.preview || defaultAvatar || null;

  useEffect(() => {
    if (currentFile && currentFile.file instanceof File) {
      onFileChange?.(currentFile.file);
    } else {
      onFileChange?.(null);
    }
  }, [currentFile, onFileChange]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Upload Area */}
      <div className="relative">
        <div
          className={cn(
            "relative flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors",
            isDragging && "bg-accent/50",
            previewUrl && "border-none"
          )}
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={-1}
        >
          <input {...getInputProps()} className="sr-only" />

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Avatar preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <User className="size-6 text-muted-foreground" />
          )}
        </div>

        {/* Remove Button */}
        {currentFile && (
          <button
            type="button"
            aria-label="Remove avatar"
            onClick={() => removeFile(currentFile.id)}
            className="absolute right-1 top-1 z-10 flex size-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Helper Text */}
      <p className="text-center text-xs text-muted-foreground">
        PNG, JPG up to {formatBytes(maxSize)}
      </p>

      {/* Errors */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Upload error</AlertTitle>
            <AlertDescription>{errors[0]}</AlertDescription>
          </AlertContent>
        </Alert>
      )}
    </div>
  );
}
