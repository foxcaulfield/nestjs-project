import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaOrmService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	public async onModuleInit(): Promise<void> {
		try {
			return await this.$connect();
		} catch (error) {
			console.log("Error occured during connection to DB", error);
		}
	}

	public async onModuleDestroy(): Promise<void> {
		return await this.$disconnect();
	}
}

//   async enableShutdownHooks(app: INestApplication) {
//     this.$on<INestApplication>('beforExit', async () => {
//       await app.close();
//     });
//   }
