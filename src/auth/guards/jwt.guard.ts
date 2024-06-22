import { ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { RequestSessionService } from "../../system/request-session.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	private readonly logger: Logger = new Logger(JwtAuthGuard.name);
	@Inject(RequestSessionService)
	private requestSessionService: RequestSessionService;

	public constructor() {
		super();
	}
	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		this.logger.log("Guard");

		const result = super.canActivate(context);

		if (result instanceof Promise) {
			return result.then((res) => {
				this.setUserId(context);
				return res;
			});
		} else if (result instanceof Observable) {
			return new Observable<boolean>((observer) => {
				result.subscribe({
					next: (res) => {
						this.setUserId(context);
						observer.next(res);
						observer.complete();
					},
					error: (err) => {
						observer.error(err);
					},
				});
			});
		} else {
			this.setUserId(context);
			return result;
		}
	}

	private setUserId(context: ExecutionContext): void {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		console.log("user", user);
		if (user && user.id) {
			this.requestSessionService.setUserId(user.id);
			console.log("User id: ", user.id);
		}
	}
}
