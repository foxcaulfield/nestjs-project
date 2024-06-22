import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
// import { PrismaOrmService } from "src/system/prisma-orm.service";
import { SystemModule } from "src/system/system.module";
// import { RequestSessionService } from "src/request-session/;

@Module({
	imports: [SystemModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
