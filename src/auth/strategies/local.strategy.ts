import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	public constructor(private authService: AuthService) {
		super();
	}

	public async validate(username: string, password: string): Promise<any> {
		console.log("Inside LocalStrategy validate", username, password);
		const user = await this.authService.validateUser({
			username,
			password,
		});
		console.log("user", user);
		if (!user) throw new UnauthorizedException();
		return user;
	}
}
