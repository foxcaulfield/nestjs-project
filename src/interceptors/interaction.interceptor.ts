import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, catchError, map, throwError } from "rxjs";

@Injectable()
export class InteractionInterceptor implements NestInterceptor {
	private readonly logger: Logger = new Logger(InteractionInterceptor.name);

	public intercept(
		context: ExecutionContext,
		next: CallHandler<Response>,
	): Observable<Response> | Promise<Observable<Response>> {
		const request = context.switchToHttp().getRequest<Request>();
		const userAgent = request.get("user-agent") || "";
		const { ip, method, originalUrl } = request;

		const controllerName = context.getClass().name;
		const methodName = context.getHandler().name;

		this.logger.log(`${ip}: ${method} ${originalUrl} ${userAgent}`);
		// this.logger.log(`${controllerName} ${methodName} ${ip}:`);

		const now = Date.now();
		return next.handle().pipe(
			map((r) => {
				const response = context.switchToHttp().getResponse<Response>();
				const duration = Date.now() - now;

				this.logger.log(`${ip}: ${controllerName} ${methodName}`);
				this.logger.log(`${ip}: ${response.statusCode} ${duration}s`);

				return r;
			}),
			catchError((err) => {
				this.logger.error(err);
				return throwError(() => err);
			}),
		);

		// console.log("THE RESULT", result);
		// return result;
	}
}
