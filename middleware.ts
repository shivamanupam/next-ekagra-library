import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;

  // If no token → block
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next(); // allow request
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/admin/:path*", "/admin/:path*"],
};
