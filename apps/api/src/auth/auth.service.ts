import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { UserEntity } from "@app/shared";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepo: Repository<UserEntity>,

        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const passwordHash = await bcrypt.hash(dto.password, 10);

        const user = this.usersRepo.create({
            email: dto.email,
            passwordHash,
        });

        const savedUser = await this.usersRepo.save(user);

        const token = await this.jwtService.signAsync({ sub: savedUser.id });

        return { token };
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

        const token = await this.jwtService.signAsync({
            sub: user.id,
        });

        return { token };
    }
}
