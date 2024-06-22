import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";
import { SafeUserDto, SafeUserSelectArgs } from "./dto/safe-user.dto";

@Injectable()
export class UsersService {
	public constructor(private prismaOrmService: PrismaOrmService) {}

	public async create(
		createUserDto: Prisma.UserCreateInput,
	): Promise<SafeUserDto> {
		const createdUser = await this.prismaOrmService.user.create({
			data: createUserDto,
			select: SafeUserSelectArgs,
		});

		return createdUser;
	}

	public async findAll(): Promise<SafeUserDto[]> {
		const users = await this.prismaOrmService.user.findMany({
			select: SafeUserSelectArgs,
		});

		return users;
	}

	public async findOne(id: User["id"]): Promise<SafeUserDto> {
		return await this.prismaOrmService.user.findUnique({
			where: { id },
			select: SafeUserSelectArgs,
		});
	}

	public async update(
		id: number,
		updateUserDto: Prisma.UserUpdateInput,
	): Promise<SafeUserDto> {
		const updatedUser = await this.prismaOrmService.user.update({
			where: { id },
			data: updateUserDto,
			select: SafeUserSelectArgs,
		});

		return updatedUser;
	}

	public async remove(id: number): Promise<SafeUserDto> {
		const deletedUser = await this.prismaOrmService.user.delete({
			where: { id },
			select: SafeUserSelectArgs,
		});
		return deletedUser;
	}
}
