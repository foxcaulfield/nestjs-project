import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { AuthPayloadDto } from "./dto/auth-payload.dto";
import { SignPayloadDto } from "./dto/sign-payload.dto";
import { PrismaOrmService } from "src/system/prisma-orm.service";

@Injectable()
export class AuthService {
	public constructor(
		private readonly prismaOrmService: PrismaOrmService,
		private jwtService: JwtService,
		private readonly usersService: UsersService,
	) {}

	public async login(loginDto: AuthPayloadDto): Promise<{ token: string }> {
		const { id, username, role } = await this.validateUser({
			username: loginDto.username,
			password: loginDto.password,
		});

		const payload: SignPayloadDto = { id, username, role };

		return {
			token: this.jwtService.sign(payload),
		};
	}

	public async register(
		createDto: Prisma.UserCreateInput,
	): Promise<{ token: string }> {
		createDto.password = await bcrypt.hash(createDto.password, 10);

		const { id, username, role } =
			await this.usersService.create(createDto);

		const payload: SignPayloadDto = { id, username, role };

		return {
			token: this.jwtService.sign(payload, { algorithm: "HS256" }),
		};
	}

	public async validateUser({
		username: usernameParam,
		password: passwordParam,
	}: AuthPayloadDto): Promise<SignPayloadDto> {
		const user = await this.prismaOrmService.user.findUnique({
			where: { username: usernameParam },
		});

		if (!user) {
			throw new NotFoundException("Invalid credentials");
		}

		const validatePassword = await bcrypt.compare(
			passwordParam,
			user.password,
		);

		if (!validatePassword) {
			throw new NotFoundException("Invalid credentials");
		}

		const { id, username, role } = user;

		return { id, username, role };
	}
}

// import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

// @Injectable()
// export class AuthService {
//   create(createAuthDto: CreateAuthDto) {
//     return 'This action adds a new auth';
//   }

//   findAll() {
//     return `This action returns all auth`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} auth`;
//   }

//   update(id: number, updateAuthDto: UpdateAuthDto) {
//     return `This action updates a #${id} auth`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} auth`;
//   }
// }
