import { Injectable, OnModuleInit } from "@nestjs/common";
import IORedis from "ioredis";

import { DocumentGateway } from "./document.gateway";

@Injectable()
export class DocumentEventsService implements OnModuleInit {
    constructor(private readonly gateway: DocumentGateway) {}

    async onModuleInit() {
        const subscriber = new IORedis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
        });

        await subscriber.subscribe("document-events");

        subscriber.on("message", (_, message) => {
            const data = JSON.parse(message);

            this.gateway.emitDocumentUpdated(data);
        });
    }
}
