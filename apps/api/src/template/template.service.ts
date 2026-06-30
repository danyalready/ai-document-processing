import { readFile } from "fs/promises";
import { join } from "path";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class TemplateService implements OnModuleInit {
    private emailVerification = "";
    private emailVerified = "";

    async onModuleInit() {
        this.emailVerification = await readFile(
            join(
                process.cwd(),
                "src/template/templates/email-verification.html",
            ),
            "utf8",
        );

        this.emailVerified = await readFile(
            join(process.cwd(), "src/template/templates/email-verified.html"),
            "utf8",
        );
    }

    renderVerificationEmail(fullName: string, verificationUrl: string) {
        return this.emailVerification
            .replaceAll("{{FULL_NAME}}", this.escapeHtml(fullName))
            .replaceAll(
                "{{VERIFICATION_URL}}",
                this.escapeHtml(verificationUrl),
            );
    }

    renderEmailVerified(webUrl: string) {
        return this.emailVerified.replaceAll(
            "{{WEB_URL}}",
            this.escapeHtml(webUrl),
        );
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
