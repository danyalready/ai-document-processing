import "reflect-metadata";

import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
});

const worker = new Worker(
    "document-processing",

    async (job) => {
        console.log("Processing job:", job.id);
        console.log(job.data);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        console.log("Job completed");
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
