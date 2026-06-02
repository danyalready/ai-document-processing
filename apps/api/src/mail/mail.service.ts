import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

type VerificationEmailParams = {
    to: string;
    fullName: string;
    token: string;
};

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private readonly resend?: Resend;
    private readonly fromEmail: string;
    private readonly apiPublicUrl: string;

    constructor(private readonly configService: ConfigService) {
        const apiKey = this.configService.get<string>("RESEND_API_KEY");

        this.fromEmail =
            this.configService.get<string>("EMAIL_FROM") ??
            "AIDoc <onboarding@resend.dev>";
        this.apiPublicUrl =
            this.configService.get<string>("API_PUBLIC_URL") ??
            "http://localhost:3001";

        if (apiKey) {
            this.resend = new Resend(apiKey);
        }
    }

    async sendVerificationEmail({
        to,
        fullName,
        token,
    }: VerificationEmailParams) {
        const verificationUrl = this.buildVerificationUrl(token);

        if (!this.resend) {
            this.logger.warn(
                `RESEND_API_KEY is not set. Email verification link for ${to}: ${verificationUrl}`,
            );
            return;
        }

        await this.resend.emails.send({
            from: this.fromEmail,
            to,
            subject: "AIDoc: Verify your email",
            html: this.renderVerificationEmail(fullName, verificationUrl),
        });
    }

    private buildVerificationUrl(token: string) {
        const url = new URL("/auth/verify-email", this.apiPublicUrl);
        url.searchParams.set("token", token);

        return url.toString();
    }

    private renderVerificationEmail(fullName: string, verificationUrl: string) {
        const safeName = this.escapeHtml(fullName);
        const safeUrl = this.escapeHtml(verificationUrl);

        return `
            <div style="font-family: Arial, sans-serif; line-height: 1.5;">
                <p>Hi ${safeName},</p>
                <p>Please verify your email address to finish creating your account.</p>
                <p>
                    <a href="${safeUrl}" style="display: inline-block; padding: 10px 14px; background: #111827; color: #ffffff; text-decoration: none; border-radius: 6px;">
                        Verify email
                    </a>
                </p>
                <p>If the button does not work, paste this link into your browser:</p>
                <p><a href="${safeUrl}">${safeUrl}</a></p>
            </div>
        `;
    }

    private escapeHtml(value: string) {
        return value.replace(/[&<>"']/g, (character) => {
            const entities: Record<string, string> = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            };

            return entities[character];
        });
    }
}
