"use server";

import { getUploadthingKey } from "@/utils/uploadthing";
import { UTApi } from "uploadthing/server";


const utapi = new UTApi();

export async function deleteUploadthingFile(fileUrl?: string) {
  const key = getUploadthingKey(fileUrl);
  if (!key) return;

  try {
    await utapi.deleteFiles(key);
  } catch (error) {
    // không throw để tránh chặn flow update, chỉ log lại
    console.error("Failed to delete file from UploadThing:", error);
  }
}