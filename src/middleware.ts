import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  const authHeader = req.headers.get("Authorization");
  const path = req.nextUrl.pathname;
  if (path.includes("/api")) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { success: false, message: "authentication failed" },
        { status: 401 },
      );
    }
  }
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
