import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LogMiddleware implements NestMiddleware {
	private logger: Logger = new Logger("HTTP");
	public use(req: Request, res: Response, next: NextFunction): void {
		const { ip, method, originalUrl: url } = req;
		this.logger.log(`In: ${method} ${url} ${ip}`);

		res.on("close", () => {
			const { statusCode } = res;

			this.logger.log(`Out: ${method} ${url} ${statusCode} - ${ip}`);
		});
		next();
	}
}
