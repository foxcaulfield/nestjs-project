import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
	public constructor(private readonly usersService: UsersService) {}

	@Post()
	@UsePipes(ValidationPipe)
	public create(
		@Body() createUserDto: CreateUserDto,
	): Promise<{ id: number; username: string; displayName: string }> {
		return this.usersService.create(createUserDto);
	}

	@Get()
	public findAll(): Promise<
		{ id: number; username: string; displayName: string }[]
	> {
		return this.usersService.findAll();
	}

	@Get(":id")
	public async findOne(
		@Param("id", ParseIntPipe) id: number,
	): Promise<{ id: number; username: string; displayName: string }> {
		const user = await this.usersService.findOne(id);

		if (!user) {
			throw new NotFoundException("No such user");
		}

		return user;
	}

	/* */
	@Patch(":id")
	public update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<{ id: number; username: string; displayName: string }> {
		return this.usersService.update(+id, updateUserDto);
	}

	@Delete(":id")
	public remove(@Param("id") id: string): Promise<string> {
		return this.usersService.remove(+id);
	}
	/* */

	// @Get()
	// public async findAll(): Promise<Users[]> {
	// 	return await this.usersService.findAll();
	// }
}
// @Post()
// create(@Body() createUserDto: CreateUserDto) {
//   return this.usersService.create(createUserDto);
// }

// @Get(':id')
// findOne(@Param('id') id: string) {
//   return this.usersService.findOne(+id);
// }

// @Patch(':id')
// update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//   return this.usersService.update(+id, updateUserDto);
// }

// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.usersService.remove(+id);
// }
