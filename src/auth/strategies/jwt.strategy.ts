import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { SignPayloadDto } from "../dto/sign-payload.dto";
import { User } from "@prisma/client";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	public constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	public async validate(userDto: SignPayloadDto): Promise<{
		username: User["username"];
		id: User["id"];
		role: User["role"];
	}> {
		return {
			username: userDto.username,
			id: userDto.id,
			role: userDto.role,
		};
	}
}
