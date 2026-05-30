import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "@app/shared";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: "7d" },
            }),
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
