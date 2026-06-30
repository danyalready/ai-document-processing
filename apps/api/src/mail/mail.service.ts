import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";

import { TemplateService } from "../template/template.service";

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

    constructor(
        private readonly configService: ConfigService,
        private readonly templateService: TemplateService,
    ) {
        const apiKey = this.configService.get<string>("RESEND_API_KEY");

        this.fromEmail = this.configService.get<string>("EMAIL_FROM");
        this.apiPublicUrl = this.configService.get<string>("API_PUBLIC_URL");

        if (apiKey) this.resend = new Resend(apiKey);
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
            subject: "Verify your email address for AIDoc",
            html: this.templateService.renderVerificationEmail(
                fullName,
                verificationUrl,
            ),
            text: `Hello ${fullName}

            Verify your email address:

            ${verificationUrl}

            If you did not create an account with AIDoc, you can ignore this email.`,
        });
    }

    private buildVerificationUrl(token: string) {
        const url = new URL("/api/auth/verify-email", this.apiPublicUrl);
        url.searchParams.set("token", token);

        return url.toString();
    }
}
