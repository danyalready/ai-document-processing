import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";

import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { DocumentEntity } from "./entities/document.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([DocumentEntity]),
        BullModule.registerQueue({ name: "document-processing" }),
    ],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentModule {}
