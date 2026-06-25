import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("access_token");
    const pathname = req.nextUrl.pathname;

    const isAuthPage = pathname === "/auth";

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/document/:path*", "/settings", "/auth"],
};
