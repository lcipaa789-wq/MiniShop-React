//image upload component for the admin product form
//uses Uploadthing useUploadThing hook to handle file upload
//after upload , calls onUploadComplete with the image URL - parent from saves it
"use client";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
//types
interface ImageUploadProps {
  value: string; //current image URL from the form
  onChange: (url: string) => void; //called when upload is complete
}
//component
export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  //useUploadThing hook - connects to the imageUploader route
  const { startUpload } = useUploadThing("imageUploader");
  //handle file selection - starts upload immediately on file pick
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      //upload the file - return array of of uploaded files with URLs
      const uploader = await startUpload([file]);
      if (uploader?.[0].url) {
        //pass the URl back to the parent form field
        onChange(uploader[0].url);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  }
  return (
    <div className="flex flex-col gap-3">
      {/* Preview — shows uploaded image or upload button */}
      {value ? (
        <div
          className="relative w-full h-48 rounded-xl overflow-hidden
                        border border-slate-200 bg-slate-50"
        >
          {/* Uploaded image preview */}
          <Image
            src={value}
            alt="Product image"
            fill
            sizes="100%"
            className="object-cover"
          />

          {/* Remove button — clears the image URL */}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500
                       text-white flex items-center justify-center
                       hover:bg-red-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        // Upload area — click to pick a file
        <label
          className="flex flex-col items-center justify-center w-full h-48
                          border-2 border-dashed border-slate-200 rounded-xl
                          bg-slate-50 hover:bg-blue-50 hover:border-blue-300
                          transition-colors cursor-pointer"
        >
          {isUploading ? (
            // Loading state while uploading
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={24} className="text-blue-500 animate-spin" />
              <p className="text-[13px] text-slate-500">Uploading...</p>
            </div>
          ) : (
            // Default state — click to upload
            <div className="flex flex-col items-center gap-2">
              <Upload size={24} className="text-slate-400" />
              <p className="text-[13px] text-slate-500">
                Click to upload image
              </p>
              <p className="text-[11px] text-slate-400">PNG, JPG up to 4MB</p>
            </div>
          )}

          {/* Hidden file input — triggered by clicking the label */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
