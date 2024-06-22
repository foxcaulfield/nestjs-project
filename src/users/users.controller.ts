import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	// Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
// import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SafeUserDto } from "./dto/safe-user.dto";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
	public constructor(private readonly usersService: UsersService) {}

	@Get()
	public findAll(): Promise<SafeUserDto[]> {
		return this.usersService.findAll();
	}

	@Get(":id")
	public async findOne(
		@Param("id", ParseIntPipe) id: number,
	): Promise<SafeUserDto> {
		const user = await this.usersService.findOne(id);

		if (!user) {
			throw new NotFoundException("No such user");
		}

		return user;
	}

	@Patch(":id")
	@UsePipes(ValidationPipe)
	public update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<SafeUserDto> {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(":id")
	public remove(@Param("id", ParseIntPipe) id: number): Promise<SafeUserDto> {
		return this.usersService.remove(id);
	}

	/* */
	// @Post()
	// @UsePipes(ValidationPipe)
	// public create(
	// 	@Body() createUserDto: CreateUserDto,
	// ): Promise<{ id: number; username: string; displayName: string }> {
	// 	return this.usersService.create(createUserDto);
	// }
}
