import "reflect-metadata";

import { DataSource } from "typeorm";

import { DocumentEntity } from "@app/shared";

export const AppDataSource = new DataSource({
    type: "postgres",

    host: "localhost",
    port: 5432,

    username: "postgres",
    password: "postgres",
    database: "ai_docs",

    synchronize: false,

    entities: [DocumentEntity],
});
