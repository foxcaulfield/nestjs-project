import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
// import { DatabaseService } from "src/database/database.service";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";

@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		PrismaOrmService,
		UsersService,
		LocalStrategy,
		JwtStrategy,
	],
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: process.env.JWT_EXPIRES_IN,
			},
		}),
	],
})
export class AuthModule {}
