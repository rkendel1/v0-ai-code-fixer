import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // For now, allow all requests - authentication will be handled by NextAuth.js
  // In production, you can add additional middleware logic here
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/apps/:path*",
    "/submit-bug/:path*",
    "/bugs/:path*",
    "/usage/:path*",
    "/admin/:path*",
    "/developer/:path*",
  ],
}
