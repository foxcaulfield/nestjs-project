import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto implements Prisma.UserCreateInput {
	@IsString()
	@IsNotEmpty()
	public username: string;

	@IsString()
	@IsOptional()
	public displayName?: string;
}
