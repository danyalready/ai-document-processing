import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-github2";

interface GithubEmail {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: "private" | null;
}

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
    constructor(readonly configService: ConfigService) {
        super({
            clientID: configService.get("GITHUB_CLIENT_ID"),
            clientSecret: configService.get("GITHUB_CLIENT_SECRET"),
            callbackURL: configService.get("GITHUB_CALLBACK_URL"),
            scope: ["user:email"],
        });
    }

    async validate(
        accessToken: string,
        _refreshToken: string,
        profile: Profile,
    ) {
        const email = await this.getProfileEmail(accessToken);

        if (!email) {
            throw new UnauthorizedException(
                "Your GitHub account does not have a verified email address.",
            );
        }

        return {
            accessToken,
            githubId: profile.id,
            fullName: profile.displayName,
            email,
        };
    }

    async getProfileEmail(accessToken: string): Promise<string | null> {
        const response = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch GitHub emails: ${response.status} ${response.statusText}`,
            );
        }

        const { user: emails } = (await response.json()) as {
            user: GithubEmail[];
        };

        const primary = emails.find((email) => email.primary && email.verified);

        if (primary) {
            return primary.email;
        }

        const verified = emails.find((email) => email.verified);

        return verified?.email ?? null;
    }
}
