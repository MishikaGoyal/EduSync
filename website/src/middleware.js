import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    const { role } = payload;
    const url = req.nextUrl;

    // Role-based access control
    if (url.pathname.startsWith("/admin") && role !== "Admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (url.pathname.startsWith("/principal") && role !== "Principal") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/api/:path((?!login$).*)",
    "/protected:path*",
    "/principal:path*",
    "/admin:path*",
  ],
};
