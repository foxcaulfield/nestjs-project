import { Injectable, Scope } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable({ scope: Scope.REQUEST })
export class RequestSessionService {
	private userId: User["id"];

	public setUserId(userId: User["id"]): void {
		this.userId = userId;
	}

	public getUserId(): User["id"] {
		return this.userId;
	}
}
