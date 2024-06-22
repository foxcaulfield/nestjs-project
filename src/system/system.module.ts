import { Module } from "@nestjs/common";
import { PrismaOrmService } from "./prisma-orm.service";
import { RequestSessionService } from "./request-session.service";

@Module({
	providers: [PrismaOrmService, RequestSessionService],
	exports: [PrismaOrmService, RequestSessionService],
})
export class SystemModule {}
