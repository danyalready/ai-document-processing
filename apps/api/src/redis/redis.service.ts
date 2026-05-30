import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import IORedis from "ioredis";

@Injectable()
export class RedisService {
    readonly client: IORedis;

    constructor(private readonly config: ConfigService) {
        this.client = new IORedis({
            host: this.config.getOrThrow("REDIS_HOST"),
            port: this.config.getOrThrow<number>("REDIS_PORT"),
        });
    }
}
