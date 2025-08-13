import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { RouteList } from "./Constant";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("sahajanand-admin-token");
  const pathname = request.nextUrl.pathname;

  const publicRoutes = [
    RouteList.Auth.Login,
    RouteList.Auth.ForgetPassword,
  ];

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL(RouteList.Auth.Login, request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL(RouteList.Default, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|api).*)"],
};
