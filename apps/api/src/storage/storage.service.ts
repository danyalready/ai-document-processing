import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class StorageService {
    private readonly client: S3Client;

    constructor(private readonly config: ConfigService) {
        this.client = new S3Client({
            region: "us-east-1",
            endpoint: this.config.getOrThrow("MINIO_ENDPOINT"),
            forcePathStyle: true,
            credentials: {
                accessKeyId: this.config.getOrThrow("MINIO_ROOT_USER"),
                secretAccessKey: this.config.getOrThrow("MINIO_ROOT_PASSWORD"),
            },
        });
    }

    async upload(key: string, body: Buffer, contentType: string) {
        return this.client.send(
            new PutObjectCommand({
                Bucket: "documents",
                Key: key,
                Body: body,
                ContentType: contentType,
            }),
        );
    }
}
