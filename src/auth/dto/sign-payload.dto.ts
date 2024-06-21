import { User } from "@prisma/client";

export class SignPayloadDto implements Partial<User> {
	public id: number;
	public username: string;
}
