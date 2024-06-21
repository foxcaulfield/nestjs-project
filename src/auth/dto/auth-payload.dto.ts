// export class AuthPayloadDto {
//   username: string;
//   password: string;
// }
import { IsString } from "class-validator";

export class AuthPayloadDto {
	@IsString()
	public username: string;

	@IsString()
	public password: string;
}
