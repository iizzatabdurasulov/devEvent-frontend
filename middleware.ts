import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/createEvents");
  const isLoginPage = req.nextUrl.pathname === "/login";

  if (isProtectedRoute && !token) {
    // createEvents ga o'tmoqchi bo'lsa login ga yo'naltir
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && token) {
    // allaqachon login qilgan bo'lsa createEvents ga yo'naltir
    return NextResponse.redirect(new URL("/createEvents", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/createEvents/:path*", "/login"],
};