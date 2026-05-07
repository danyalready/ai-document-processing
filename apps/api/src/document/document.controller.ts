import { Controller, Get } from "@nestjs/common";

import { DocumentService } from "./document.service";

@Controller("documents")
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @Get()
    findAll() {
        return this.documentService.findAll();
    }
}
