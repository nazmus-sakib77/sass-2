import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isPortalRoute = nextUrl.pathname.startsWith("/portal");

  if (!isAdminRoute && !isPortalRoute) return;

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);
    return Response.redirect(loginUrl);
  }

  // Admin area is ADMIN-only; clients get bounced to their portal.
  if (isAdminRoute && role !== "ADMIN") {
    return Response.redirect(new URL("/portal", nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*"],
};
