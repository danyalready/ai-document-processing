import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-github2";

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
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
    ) {
        console.log(profile);
        return {
            githubId: profile.id,
            fullName: profile.displayName,
            email: profile.emails?.[0]?.value,
        };
    }
}
