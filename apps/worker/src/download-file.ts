import { GetObjectCommand } from "@aws-sdk/client-s3";

import { s3 } from "./s3";

export async function downloadFile(key: string) {
    const response = await s3.send(
        new GetObjectCommand({
            Bucket: "documents",
            Key: key,
        }),
    );

    const chunks: Buffer[] = [];

    for await (const chunk of response.Body as AsyncIterable<Buffer>) {
        chunks.push(chunk);
    }

    return Buffer.concat(chunks);
}
