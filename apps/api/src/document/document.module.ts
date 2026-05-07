import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { DocumentEntity } from "./entities/document.entity";

@Module({
    imports: [TypeOrmModule.forFeature([DocumentEntity])],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentModule {}
