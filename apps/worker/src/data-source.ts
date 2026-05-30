import "reflect-metadata";

import { DataSource } from "typeorm";

import { DocumentEntity, UserEntity } from "@app/shared";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    entities: [DocumentEntity, UserEntity],
});
