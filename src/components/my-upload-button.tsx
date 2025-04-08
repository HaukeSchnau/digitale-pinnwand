"use client";

import { UploadButton } from "@/utils/uploadthing";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const MyUploadButton = (props: ComponentProps<typeof Button>) => {
  return (
    <UploadButton
      content={{
        allowedContent: <></>,
        clearBtn: <></>,
        button: ({ ready, isUploading, uploadProgress, files }) => (
          <Button
            {...props}
            className={cn("bg-rose-600 hover:bg-rose-700", props.className)}
            disabled={!ready || isUploading || props.disabled}
          >
            {isUploading ? (
              <span>
                {files.length}{" "}
                {files.length === 1 ? "Datei wird" : "Dateien werden"}
                hochgeladen ({uploadProgress}%)
              </span>
            ) : (
              props.children
            )}
          </Button>
        ),
      }}
      endpoint="imageUploader"
    />
  );
};
