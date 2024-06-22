import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaOrmService } from "./prisma-orm/prisma-orm.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LogMiddleware } from "./middlewares/log.middleware";

@Module({
	imports: [UsersModule, AuthModule],
	controllers: [AppController],
	providers: [AppService, PrismaOrmService],
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LogMiddleware).forRoutes("*");
	}
}
