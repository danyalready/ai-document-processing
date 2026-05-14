import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { UserEntity } from "@app/shared";

import { RegisterDto } from "./dto/register.dto";

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
}
