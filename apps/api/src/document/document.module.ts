import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";

import { DocumentEntity } from "@app/shared";

import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentEntity]),
        BullModule.registerQueue({ name: "document-processing" }),
    ],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentModule {}
