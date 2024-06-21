import { User } from "@prisma/client";
import { IsString } from "class-validator";

export class AuthPayloadDto implements Partial<User> {
	@IsString()
	public username: string;

	@IsString()
	public password: string;
}
