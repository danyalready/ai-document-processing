import {
    Controller,
    Get,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { join } from "path";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

import { DocumentService } from "./document.service";

@Controller("documents")
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Get()
    findAll() {
        return this.documentService.findAll();
    }

    @Post("upload")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: join(__dirname, "..", "..", "..", "..", "uploads"),

                filename: (_, file, callback) => {
                    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

                    callback(
                        null,
                        `${uniqueName}${extname(file.originalname)}`,
                    );
                },
            }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.documentService.create(file);
    }
}
