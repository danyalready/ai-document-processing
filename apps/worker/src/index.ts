import "reflect-metadata";

import { Worker } from "bullmq";
import IORedis from "ioredis";

import { AppDataSource } from "./data-source";
import { DocumentEntity } from "./document.entity";
import { DocumentStatus } from "./document-status.enum";

async function bootstrap() {
    await AppDataSource.initialize();

    console.log("Worker database connected");

    const connection = new IORedis({
        host: "localhost",
        port: 6379,
        maxRetriesPerRequest: null,
    });

    const worker = new Worker(
        "document-processing",

        async (job) => {
            console.log("Processing job:", job.id);

            const repository = AppDataSource.getRepository(DocumentEntity);

            const document = await repository.findOneBy({
                id: job.data.documentId,
            });

            if (!document) {
                throw new Error("Document not found");
            }

            document.status = DocumentStatus.PROCESSING;

            await repository.save(document);

            await new Promise((resolve) => setTimeout(resolve, 5000));

            document.status = DocumentStatus.COMPLETED;

            document.extractedText = "Fake extracted PDF text";

            document.aiSummary = "Fake AI summary";

            await repository.save(document);

            console.log("Document processed");
        },

        {
            connection,
        },
    );

    worker.on("completed", (job) => {
        console.log(`Job ${job.id} completed`);
    });

    worker.on("failed", (job, error) => {
        console.error(`Job ${job?.id} failed`);
        console.error(error);
    });
}

bootstrap();
