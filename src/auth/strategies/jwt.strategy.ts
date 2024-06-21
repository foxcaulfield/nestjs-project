import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { SignPayloadDto } from "../dto/sign-payload.dto";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	public constructor(
		private readonly prismaOrmService: PrismaOrmService,
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	public async validate(
		userDto: SignPayloadDto,
	): Promise<{ username: string }> {
		return { username: userDto.username };
	}
}
