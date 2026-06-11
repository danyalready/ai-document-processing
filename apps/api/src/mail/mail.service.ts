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
            html: this.renderVerificationEmail(fullName, verificationUrl),
            text: `Hello ${fullName}

            Verify your email address:

            ${verificationUrl}

            If you did not create an account with AIDoc, you can ignore this email.`,
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
        <div>
            <h3>Subject: AIDoc Test</h3>

            <p>
                Hello,

                This is a test message from AIDoc.

                Website:
                https://aidoc.it.com

                Regards,
                AIDoc Team
            </p>
        </div>
        `;

        return `
            <div style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5;padding:32px 0;">
                    <tr>
                    <td align="center">
                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
                        
                        <tr>
                            <td style="padding:32px 40px 16px 40px;">
                            <h1 style="margin:0;color:#111827;font-size:24px;">
                                AIDoc
                            </h1>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:0 40px 24px 40px;color:#374151;font-size:16px;line-height:1.6;">
                            <p>Hello ${safeName},</p>

                            <p>
                                Thank you for creating an account with <strong>AIDoc</strong>.
                            </p>

                            <p>
                                This verification link may expire after a period of time for security reasons.
                            </p>

                            <p>
                                Copy and paste the following link into your browser:
                            </p>

                            <p style="word-break:break-all;">
                                <a href="${safeUrl}" style="color:#2563eb;">
                                ${safeUrl}
                                </a>
                            </p>

                            <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />

                            <p>
                                <strong>Why did you receive this email?</strong>
                            </p>

                            <p>
                                Someone recently created an AIDoc account using this email address.
                                If that was you, please complete the verification process.
                            </p>

                            <p>
                                If you did not create an account, you can safely ignore this message.
                                No further action is required.
                            </p>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:24px 40px;background:#f9fafb;color:#6b7280;font-size:13px;line-height:1.5;">
                            <p style="margin:0 0 8px 0;">
                                Need help? Contact us at
                                <a href="mailto:support@aidoc.it.com">support@aidoc.it.com</a>
                            </p>

                            <p style="margin:0 0 8px 0;">
                                Website:
                                <a href="https://aidoc.it.com">https://aidoc.it.com</a>
                            </p>

                            <p style="margin:0;">
                                © 2026 AIDoc. All rights reserved.
                            </p>
                            </td>
                        </tr>

                        </table>
                    </td>
                    </tr>
                </table>
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
