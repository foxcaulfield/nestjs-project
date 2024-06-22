import { MiddlewareConsumer, Module, NestModule, Scope } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { PrismaOrmService } from "./system/prisma-orm.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LogMiddleware } from "./middlewares/log.middleware";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { InteractionInterceptor } from "./interceptors/interaction.interceptor";
import { SystemModule } from "./system/system.module";

@Module({
	imports: [UsersModule, AuthModule],
	controllers: [AppController],
	providers: [
		SystemModule,
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: InteractionInterceptor,
			scope: Scope.REQUEST,
		},
	],
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LogMiddleware).forRoutes("*");
	}
}
