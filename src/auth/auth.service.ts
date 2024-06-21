import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";
import { AuthPayloadDto } from "./dto/auth-payload.dto";
import { SignPayloadDto } from "./dto/sign-payload.dto";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
// import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
	public constructor(
		private readonly prismaOrmService: PrismaOrmService,
		private jwtService: JwtService,
		private readonly usersService: UsersService,
	) {}

	public async login(loginDto: AuthPayloadDto): Promise<{
		data: { id: number; username: string; displayName: string };
		token: string;
	}> {
		console.log("auth service login", loginDto);
		const { username, password } = loginDto;

		const { password: _, ...validationResult } = await this.validateUser({
			username,
			password,
		});

		_ && null; // just because

		const payload: SignPayloadDto = { username };

		return {
			data: validationResult,
			token: this.jwtService.sign(payload),
		};
	}

	public async register(
		createDto: Prisma.UserCreateInput,
	): Promise<{ token: string }> {
		console.log("auth service register", createDto);

		createDto.password = await bcrypt.hash(createDto.password, 10);
		const creationResult = await this.usersService.create(createDto);

		const payload: SignPayloadDto = {
			id: creationResult.id,
			username: creationResult.username,
			displayName: creationResult.displayName,
		};

		return {
			token: this.jwtService.sign(payload, { algorithm: "HS256" }),
		};
	}

	public async validateUser({ username, password }: AuthPayloadDto): Promise<{
		id: number;
		username: string;
		password: string;
		displayName: string;
	}> {
		const user = await this.prismaOrmService.user.findUnique({
			where: { username },
		});

		if (!user) {
			throw new NotFoundException("user not found");
		}

		const validatePassword = await bcrypt.compare(password, user.password);

		if (!validatePassword) {
			throw new NotFoundException("Invalid password");
		}

		return user;
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
