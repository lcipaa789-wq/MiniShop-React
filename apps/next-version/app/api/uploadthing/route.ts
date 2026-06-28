//registers the Uploadthing file router as Next.js API route handler
//GET abd POST are required by Uploadthing internal protocol
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
