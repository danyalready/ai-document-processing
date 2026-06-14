import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { Response } from "express";

import { AUTH_COOKIE_NAME } from "@app/shared";

import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ResendVerificationDto } from "./dto/resend-verification.dto";
import { GoogleAuthGuard } from "./google-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

const AUTH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get("me")
    @UseGuards(JwtAuthGuard)
    me(@Req() req: any) {
        return { userId: req.user.userId };
    }

    @Post("register")
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post("login")
    async login(
        @Body() dto: LoginDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.authService.login(dto);

        this.setAuthCookie(res, result.token);

        return { message: "Logged in" };
    }

    @Get("verify-email")
    async verifyEmail(
        @Query("token") token: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.authService.verifyEmail(token);

        this.setAuthCookie(res, result.token);

        return { message: "Email verified" };
    }

    @Post("resend-verification")
    resendVerification(@Body() dto: ResendVerificationDto) {
        return this.authService.resendVerification(dto);
    }

    @Post("logout")
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie(AUTH_COOKIE_NAME, {
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return { message: "Logged out" };
    }

    @Get("google")
    @UseGuards(GoogleAuthGuard)
    googleAuth() {}

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    async googleCallback(
        @Req() req: any,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { token } = await this.authService.loginWithGoogle(
            req.user.googleId,
            req.user.email,
        );

        this.setAuthCookie(res, token);

        res.redirect(process.env.WEB_URL!);
    }

    @Get("github")
    @UseGuards(GoogleAuthGuard)
    githubAuth() {}

    @Get("github/callback")
    @UseGuards(GoogleAuthGuard)
    async githubCallback(
        @Req() req: any,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { token } = await this.authService.loginWithGithub(
            req.user.githubId,
            req.user.email,
        );

        this.setAuthCookie(res, token);

        res.redirect(process.env.WEB_URL!);
    }

    private setAuthCookie(res: Response, token: string) {
        res.cookie(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            maxAge: AUTH_COOKIE_MAX_AGE_MS,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });
    }
}
