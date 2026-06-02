import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { createHash, randomBytes } from "crypto";

import { UserEntity } from "@app/shared";

import { MailService } from "../mail/mail.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ResendVerificationDto } from "./dto/resend-verification.dto";

const EMAIL_VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,

        private readonly jwtService: JwtService,

        private readonly mailService: MailService,
    ) {}

    async register(dto: RegisterDto) {
        const existingUser = await this.usersRepo.findOneBy({
            email: dto.email,
        });

        if (existingUser) {
            throw new ConflictException("Email is already registered");
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);
        const verificationToken = this.createEmailVerificationToken();

        const user = this.usersRepo.create({
            fullName: dto.fullName,
            email: dto.email,
            passwordHash,
            isEmailVerified: false,
            emailVerificationToken: verificationToken.hash,
            emailVerificationTokenExpiresAt: verificationToken.expiresAt,
        });

        const savedUser = await this.usersRepo.save(user);

        await this.mailService.sendVerificationEmail({
            to: savedUser.email,
            fullName: savedUser.fullName,
            token: verificationToken.token,
        });

        return { message: "Verification email sent" };
    }

    async login(dto: LoginDto) {
        const user = await this.usersRepo.findOneBy({
            email: dto.email,
        });

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const matches = await bcrypt.compare(dto.password, user.passwordHash);

        if (!matches) {
            throw new UnauthorizedException("Invalid credentials");
        }

        if (!user.isEmailVerified) {
            throw new ForbiddenException("Please verify your email first");
        }

        const token = await this.jwtService.signAsync({
            sub: user.id,
        });

        return { token };
    }

    async verifyEmail(token: string) {
        if (!token) {
            throw new BadRequestException("Verification token is required");
        }

        const user = await this.usersRepo.findOneBy({
            emailVerificationToken: this.hashEmailVerificationToken(token),
        });

        if (!user || !user.emailVerificationTokenExpiresAt) {
            throw new BadRequestException("Invalid verification token");
        }

        if (user.emailVerificationTokenExpiresAt.getTime() < Date.now()) {
            throw new BadRequestException("Verification token has expired");
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationTokenExpiresAt = null;

        await this.usersRepo.save(user);

        const authToken = await this.jwtService.signAsync({
            sub: user.id,
        });

        return { token: authToken };
    }

    async resendVerification(dto: ResendVerificationDto) {
        const user = await this.usersRepo.findOneBy({
            email: dto.email,
        });

        if (!user || user.isEmailVerified) {
            return { message: "If verification is needed, an email was sent" };
        }

        const verificationToken = this.createEmailVerificationToken();

        user.emailVerificationToken = verificationToken.hash;
        user.emailVerificationTokenExpiresAt = verificationToken.expiresAt;

        await this.usersRepo.save(user);

        await this.mailService.sendVerificationEmail({
            to: user.email,
            fullName: user.fullName,
            token: verificationToken.token,
        });

        return { message: "If verification is needed, an email was sent" };
    }

    private createEmailVerificationToken() {
        const token = randomBytes(32).toString("hex");

        return {
            token,
            hash: this.hashEmailVerificationToken(token),
            expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_TTL_MS),
        };
    }

    private hashEmailVerificationToken(token: string) {
        return createHash("sha256").update(token).digest("hex");
    }
}
