import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";

import { DocumentEntity, UserEntity } from "@app/shared";

import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { DocumentGateway } from "./document.gateway";
import { DocumentEventsService } from "./document-events.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentEntity, UserEntity]),
        BullModule.registerQueue({ name: "document-processing" }),
    ],
    controllers: [DocumentController],
    providers: [DocumentService, DocumentGateway, DocumentEventsService],
})
export class DocumentModule {}
