import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { DocumentEntity } from "./entities/document.entity";
import { DocumentStatus } from "./document-status.enum";

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentEntity)
        private readonly documentRepository: Repository<DocumentEntity>,
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

        return this.documentRepository.save(document);
    }
}
