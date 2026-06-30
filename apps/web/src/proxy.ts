import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(req: NextRequest) {
    const response = handleI18nRouting(req);

    const token = req.cookies.get("access_token");

    const { pathname } = req.nextUrl;

    const pathnameWithoutLocale = pathname.replace(/^\/(en|ru)(?=\/|$)/, "");

    const isAuthPage = pathnameWithoutLocale === "/auth";

    const locale =
        pathname.match(/^\/(en|ru)(?=\/|$)/)?.[1] ?? routing.defaultLocale;

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL(`/${locale}/auth`, req.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }

    return response;
}

export const config = {
    matcher: ["/", "/(en|ru)/:path*", "/((?!api|_next|.*\\..*).*)"],
};
