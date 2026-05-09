import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";

import { DocumentEntity, DocumentStatus } from "@app/shared";

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentEntity)
        private readonly documentRepository: Repository<DocumentEntity>,

        @InjectQueue("document-processing")
        private readonly documentQueue: Queue,
    ) {}

    async findAll() {
        return this.documentRepository.find({
            order: {
                createdAt: "DESC",
            },
        });
    }

    async create(file: Express.Multer.File) {
        const document = this.documentRepository.create({
            originalName: file.originalname,
            mimeType: file.mimetype,
            storagePath: file.path,
            status: DocumentStatus.UPLOADED,
        });

        const savedDocument = await this.documentRepository.save(document);

        await this.documentQueue.add("process-document", {
            documentId: savedDocument.id,
        });

        return savedDocument;
    }
}
