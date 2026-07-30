import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export function getUploadthingKey(url?: string) {
  if (!url) return null;
  try {
    const parts = new URL(url).pathname.split("/");
    return parts[parts.length - 1] || null;
  } catch {
    return null;
  }
}
