import { readFile } from "fs/promises";
import { join } from "path";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class TemplateService implements OnModuleInit {
    private emailVerified = "";

    async onModuleInit() {
        this.emailVerified = await readFile(
            join(process.cwd(), "src/template/templates/email-verified.html"),
            "utf8",
        );
    }

    renderEmailVerified(webUrl: string) {
        return this.emailVerified.replace("{{WEB_URL}}", webUrl);
    }
}
