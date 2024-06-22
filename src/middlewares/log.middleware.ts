import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response, response } from "express";

@Injectable()
export class LogMiddleware implements NestMiddleware {
	private logger: Logger = new Logger("HTTP");
	public use(req: Request, res: Response, next: NextFunction): void {
		const { ip, method, originalUrl: url } = req;

		res.on("close", () => {
			const { statusCode } = response;

			this.logger.log(`${method} ${url} ${statusCode} - ${ip}`);
		});
		next();
	}
}
