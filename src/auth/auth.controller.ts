import {
	Controller,
	Get,
	Post,
	Body,
	UseGuards,
	ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { Prisma } from "@prisma/client";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { AuthPayloadDto } from "./dto/auth-payload.dto";

@Controller("auth")
export class AuthController {
	public constructor(private authService: AuthService) {}

	@Post("register")
	public async register(
		@Body(
			new ValidationPipe({
				whitelist: true, // Automatically strip non-whitelisted properties
				forbidNonWhitelisted: true,
				transform: true,
			}),
		)
		registerDto: Prisma.UserCreateInput,
	): Promise<{ token: string }> {
		console.log("register", registerDto);
		return await this.authService.register(registerDto);
	}

	@Post("login")
	@UseGuards(LocalGuard)
	public async login(
		@Body(
			new ValidationPipe({
				whitelist: true, // Automatically strip non-whitelisted properties
				forbidNonWhitelisted: true,
				transform: true,
			}),
		)
		loginDto: AuthPayloadDto,
	): Promise<{ token: string }> {
		console.log("login", loginDto);
		return await this.authService.login(loginDto);
	}

	@Get("status")
	@UseGuards(JwtAuthGuard)
	public async status(): Promise<string> {
		return "Ok";
	}
}
