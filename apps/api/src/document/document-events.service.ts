import { Injectable, OnModuleInit } from "@nestjs/common";

import { DocumentGateway } from "./document.gateway";
import { RedisService } from "../redis/redis.service";

@Injectable()
export class DocumentEventsService implements OnModuleInit {
    constructor(
        private readonly gateway: DocumentGateway,
        private readonly redisService: RedisService,
    ) {}

    async onModuleInit() {
        await this.redisService.client.subscribe("document-events");

        this.redisService.client.on("message", (_, message) => {
            const data = JSON.parse(message);

            this.gateway.emitDocumentUpdated(data);
        });
    }
}
