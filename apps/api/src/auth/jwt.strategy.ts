import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

import { AUTH_COOKIE_NAME } from "@app/shared";

function extractJwtFromCookie(request: Request) {
    const cookieHeader = request.headers.cookie;

    if (!cookieHeader) {
        return null;
    }

    const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
    const authCookie = cookies.find((cookie) =>
        cookie.startsWith(`${AUTH_COOKIE_NAME}=`),
    );

    if (!authCookie) {
        return null;
    }

    return decodeURIComponent(authCookie.slice(AUTH_COOKIE_NAME.length + 1));
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookie]),

            ignoreExpiration: false,

            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: { sub: string }) {
        return { userId: payload.sub };
    }
}
