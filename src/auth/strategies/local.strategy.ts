import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignPayloadDto } from "../dto/sign-payload.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	public constructor(private authService: AuthService) {
		super();
	}

	public async validate(
		username: string,
		password: string,
	): Promise<boolean> {
		const user: SignPayloadDto = await this.authService.validateUser({
			username,
			password,
		});
		console.log("user", user);
		if (!user) throw new UnauthorizedException();
		return true;
	}
}
