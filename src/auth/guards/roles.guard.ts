import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
	private logger: Logger = new Logger(RolesGuard.name);
	public constructor(private readonly reflector: Reflector) {}

	public canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		this.logger.log(`${"Role guarding..."}`);
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
			ROLES_KEY,
			[context.getClass(), context.getHandler()],
		);

		if (!requiredRoles) {
			return false; // If the guard is provided but nothe the "Roles" decorator, an access denied
		}

		const { user } = context.switchToHttp().getRequest();
		this.logger.log(`Inspecting ${user.role}...`);
		return requiredRoles.some((requiredRole) =>
			user?.role?.includes(requiredRole),
		);
	}
}
