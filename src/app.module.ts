import { MiddlewareConsumer, Module, NestModule, Scope } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { PrismaOrmService } from "./system/prisma-orm.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { LogMiddleware } from "./middlewares/log.middleware";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { InteractionInterceptor } from "./interceptors/interaction.interceptor";
import { SystemModule } from "./system/system.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		UsersModule,
		AuthModule,
		ConfigModule.forRoot(),
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 3,
			},
		]),
	],
	controllers: [AppController],
	providers: [
		SystemModule,
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: InteractionInterceptor,
			scope: Scope.REQUEST,
		},
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule implements NestModule {
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LogMiddleware).forRoutes("*");
	}
}
