import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaOrmService } from "src/prisma-orm/prisma-orm.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService, PrismaOrmService],
})
export class UsersModule {}
