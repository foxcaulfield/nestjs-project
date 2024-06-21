import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";

@Injectable()
export class UsersService {
	public constructor(private prismaOrmService: PrismaOrmService) {}

	// public async create(
	// 	createUserDto: Prisma.UsersCreateInput,
	// ): Promise<Users> {
	// 	return this.prismaOrmService.users.create({
	// 		data: createUserDto,
	// 	});
	// }

	// public async findAll(): Promise<Users[]> {
	// 	return this.prismaOrmService.users.findMany();
	// }

	public async create(
		createUserDto: Prisma.UserCreateInput,
	): Promise<{ id: number; username: string; displayName: string }> {
		return this.prismaOrmService.user.create({
			data: createUserDto,
		});
	}

	public async findAll(): Promise<
		{ id: number; username: string; displayName: string }[]
	> {
		return this.prismaOrmService.user.findMany();
	}

	public async findOne(
		id: User["id"],
	): Promise<{ id: number; username: string; displayName: string }> {
		return this.prismaOrmService.user.findUnique({
			where: { id },
		});
	}

	public async update(
		id: number,
		updateUserDto: Prisma.UserUpdateInput,
	): Promise<{ id: number; username: string; displayName: string }> {
		return this.prismaOrmService.user.update({
			where: { id },
			data: updateUserDto,
		});
	}

	public async remove(id: number): Promise<string> {
		return `This action removes a #${id} user`;
	}
}

// findOne(id: number) {
//   return `This action returns a #${id} user`;
// }

// update(id: number, updateUserDto: UpdateUserDto) {
//   return `This action updates a #${id} user`;
// }

// remove(id: number) {
//   return `This action removes a #${id} user`;
// }
