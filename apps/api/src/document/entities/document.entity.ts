import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { DocumentStatus } from "../document-status.enum";

@Entity("documents")
export class DocumentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    originalName: string;

    @Column()
    mimeType: string;

    @Column()
    storagePath: string;

    @Column({
        type: "enum",
        enum: DocumentStatus,
        default: DocumentStatus.UPLOADED,
    })
    status: DocumentStatus;

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
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
