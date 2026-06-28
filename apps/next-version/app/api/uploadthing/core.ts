//Uploadthing file router - defines what files are allowed to be uploaded
//imageUploader is used in the admin panel to upload product images
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { isAdmin } from "@/lib/admin";

const f = createUploadthing();

//file router
export const ourFileRouter = {
  //imageUploader - only admins can upload product image
  imageUploader: f({
    image: {
      maxFileSize: "4MB", //per image
      maxFileCount: 1, //one image at the time
    },
  })
    //middleware runs before upload - checks if user is admin
    .middleware(async () => {
      const admin = isAdmin();
      if (!admin) throw Error("Unauthorized");
      return {}; //return metadata passed to onUploadComplete
    })
    .onUploadComplete(async ({ file }) => {
      //called after successful upload - file.url is the public URL
      console.log("Upload complete:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
