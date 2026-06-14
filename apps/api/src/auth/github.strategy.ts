import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
    constructor(readonly configService: ConfigService) {
        super({
            clientID: configService.get("GITHUB_CLIENT_ID"),
            clientSecret: configService.get("GITHUB_CLIENT_SECRET"),
            callbackURL: configService.get("GITHUB_CALLBACK_URL"),
            scope: ["email", "profile"],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        const { id, emails, username } = profile;

        done(null, {
            githubId: id,
            fullName: username,
            email: emails?.[0]?.value,
        });
    }
}
