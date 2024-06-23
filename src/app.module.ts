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

@Module({
	imports: [
		UsersModule,
		AuthModule,
		ThrottlerModule.forRoot([
			{
				name: "short",
				ttl: 1000,
				limit: 3,
			},
			{
				name: "medium",
				ttl: 10000,
				limit: 20,
			},
			{
				name: "long",
				ttl: 60000,
				limit: 100,
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
	public constructor() {
		console.log(process.env);
	}
	public configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LogMiddleware).forRoutes("*");
	}
}
