//exports the useUploadThing hook and UploadButton components
//pre-configured with our file router type for full TypeScript support
import { generateUploadButton, generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
//pre-typed upload button component
export const UploadButton = generateUploadButton<OurFileRouter>();

//pre-typed hooks - useUploadThing gives us startUpload with correct types
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
