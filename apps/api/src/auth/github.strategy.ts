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
        });
    }

    async validate(
        accessToken: string,
        _refreshToken: string,
        profile: Profile,
    ) {
        const user = await this.getGithubUser(accessToken);

        return {
            accessToken,
            githubId: profile.id,
            fullName: profile.displayName,
            email: user.email,
        };
    }

    async getGithubUser(accessToken: string): Promise<any | null> {
        const response = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        });

        console.log({ response });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch GitHub emails: ${response.status} ${response.statusText}`,
            );
        }

        const user = await response.json();

        return user ?? null;
    }
}
