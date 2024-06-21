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
	): Promise<{
		data: { id: number; username: string; displayName: string };
		token: string;
	}> {
		console.log("login", loginDto);
		return await this.authService.login(loginDto);
	}

	@Get("status")
	@UseGuards(JwtAuthGuard)
	public async status(): Promise<string> {
		return "Ok";
	}
}

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post()
//   create(@Body() createAuthDto: CreateAuthDto) {
//     return this.authService.create(createAuthDto);
//   }

//   @Get()
//   findAll() {
//     return this.authService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.authService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
// }
