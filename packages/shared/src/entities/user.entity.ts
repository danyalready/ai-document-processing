import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    fullName!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "boolean", default: false })
    isEmailVerified!: boolean;

    @Column({ type: "varchar", nullable: true })
    emailVerificationToken?: string | null;

    @Column({ type: "timestamp", nullable: true })
    emailVerificationTokenExpiresAt?: Date | null;

    @Column({ type: "varchar", nullable: true, unique: true })
    googleId?: string;

    @Column({ type: "varchar", nullable: true })
    passwordHash!: string;

    @CreateDateColumn()
    createdAt!: Date;
}
