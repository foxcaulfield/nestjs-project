import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaOrmService } from "./prisma-orm/prisma-orm.service";

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService, PrismaOrmService],
})
export class AppModule {}
