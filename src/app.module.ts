import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaOrmService } from "./prisma-orm/prisma-orm.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LogMiddleware } from "./middlewares/log.middleware";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { InteractionInterceptor } from "./interceptors/interaction.interceptor";

@Module({
	imports: [UsersModule, AuthModule],
	controllers: [AppController],
	providers: [
		AppService,
		PrismaOrmService,
		{
			provide: APP_INTERCEPTOR,
			useClass: InteractionInterceptor,
		},
	],
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LogMiddleware).forRoutes("*");
	}
}
