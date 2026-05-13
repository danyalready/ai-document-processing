import {
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

import { DocumentService } from "./document.service";

@Controller("documents")
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Get()
    findAll() {
        return this.documentService.findAll();
    }

    @Post("upload")
    @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.documentService.create(file);
    }
}
