import { Module } from "@nestjs/common";

import { MailService } from "./mail.service";
import { TemplateModule } from "../template/template.module";

@Module({
    imports: [TemplateModule],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
