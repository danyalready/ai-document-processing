import * as path from "path";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BullModule } from "@nestjs/bullmq";

import { AppController } from "./app.controller";
import { DocumentModule } from "./document/document.module";
import { AuthModule } from "./auth/auth.module";
import { HealthController } from "./health.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: path.resolve(
                process.cwd(),
                process.env.NODE_ENV === "production"
                    ? ".env.production.local"
                    : ".env.development.local",
            ),
        }),

        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: () => ({
                type: "postgres",
                url: process.env.DATABASE_URL,
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),

        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: () => ({
                connection: {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                },
            }),
        }),

        AuthModule,

        DocumentModule,
    ],
    controllers: [AppController, HealthController],
})
export class AppModule {}
