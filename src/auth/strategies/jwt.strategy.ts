import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { SignPayloadDto } from "../dto/sign-payload.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	public constructor() {
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
