import { Role, User } from "@prisma/client";

export class SignPayloadDto implements Partial<User> {
	public id: number;
	public username: string;
	public role: Role;
}
