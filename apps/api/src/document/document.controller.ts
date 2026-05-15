import {
    Controller,
    Get,
    Post,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { Request } from "express";

import { DocumentService } from "./document.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("documents")
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Get()
    findAll(@Req() request: Request & { user: { userId: string } }) {
        return this.documentService.findAll(request.user.userId);
    }

    @Post("upload")
    @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Req()
        request: Request & { user: { userId: string } },
    ) {
        return this.documentService.create(file, request.user.userId);
    }
}
