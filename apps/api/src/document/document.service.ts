import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { DocumentEntity, DocumentStatus } from "@app/shared";
import { s3 } from "../storage/s3";

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
        const objectKey = `${Date.now()}-${file.originalname}`;
        await s3.send(
            new PutObjectCommand({
                Bucket: "documents",
                Key: objectKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            }),
        );

        const document = this.documentRepository.create({
            originalName: file.originalname,
            mimeType: file.mimetype,
            storagePath: objectKey,
            status: DocumentStatus.UPLOADED,
        });

        const savedDocument = await this.documentRepository.save(document);

        await this.documentQueue.add("process-document", {
            documentId: savedDocument.id,
        });

        return savedDocument;
    }
}
