import "dotenv/config";
import "reflect-metadata";

import { Worker } from "bullmq";
import IORedis from "ioredis";

import { DocumentEntity, DocumentStatus } from "@app/shared";

import { AppDataSource } from "./data-source";
import { extractTextFromPdf } from "./extract-text";
import { summarizeText } from "./summarize";

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

            try {
                if (!document) {
                    throw new Error("Document not found");
                }

                document.status = DocumentStatus.PROCESSING;

                await repository.save(document);

                const extractedText = await extractTextFromPdf(
                    document.storagePath,
                );

                document.extractedText = extractedText;

                const summary = await summarizeText(extractedText);

                if (summary) document.aiSummary = summary;

                document.status = DocumentStatus.COMPLETED;

                await repository.save(document);

                console.log("Document processed");
            } catch (error) {
                console.error(error);

                if (document) {
                    document.status = DocumentStatus.FAILED;

                    await AppDataSource.getRepository(DocumentEntity).save(
                        document,
                    );
                }

                throw error;
            }
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
