import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { DocumentStatus } from "./document-status.enum";

@Entity("documents")
export class DocumentEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    originalName!: string;

    @Column({ type: "varchar" })
    mimeType!: string;

    @Column({ type: "varchar" })
    storagePath!: string;

    @Column({
        type: "enum",
        enum: DocumentStatus,
        default: DocumentStatus.UPLOADED,
    })
    status!: DocumentStatus;

    @Column({
        type: "text",
        nullable: true,
    })
    extractedText?: string;

    @Column({
        type: "text",
        nullable: true,
    })
    aiSummary?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
