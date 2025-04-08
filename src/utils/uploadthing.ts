import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers, generateUploadButton } from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
