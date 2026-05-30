import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";

import { DocumentEntity, DocumentStatus, UserEntity } from "@app/shared";
import { AiService } from "../ai/ai.service";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(DocumentEntity)
        private readonly documentRepository: Repository<DocumentEntity>,

        @InjectQueue("document-processing")
        private readonly documentQueue: Queue,

        private readonly storageService: StorageService,

        private readonly aiService: AiService,
    ) {}

    async findAll(userId: string) {
        return this.documentRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: "DESC" },
        });
    }

    async create(file: Express.Multer.File, userId: string) {
        const user = await this.userRepository.findOneBy({ id: userId });

        const objectKey = `${Date.now()}-${file.originalname}`;
        await this.storageService.upload(objectKey, file.buffer, file.mimetype);

        const document = this.documentRepository.create({
            originalName: file.originalname,
            mimeType: file.mimetype,
            storagePath: objectKey,
            status: DocumentStatus.UPLOADED,
            user,
        });

        const savedDocument = await this.documentRepository.save(document);

        await this.documentQueue.add("process-document", {
            documentId: savedDocument.id,
        });

        return savedDocument;
    }

    async chat(documentId: string, question: string, userId: string) {
        const document = await this.documentRepository.findOne({
            where: {
                id: documentId,
                user: { id: userId },
            },
            relations: { user: true },
        });

        if (!document) {
            throw new NotFoundException("Document not found");
        }

        if (!document.extractedText) {
            throw new BadRequestException("Document not processed yet");
        }

        const answer = await this.aiService.askDocument(
            document.extractedText,
            question,
        );

        return { answer };
    }
}
