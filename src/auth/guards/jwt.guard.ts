import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	private readonly logger: Logger = new Logger(JwtAuthGuard.name);

	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		// const logMessage = `${context.getClass().name} ${context.getHandler().name}`;
		const logMessage = "Guard";
		this.logger.log(logMessage);
		return super.canActivate(context);
	}
}
