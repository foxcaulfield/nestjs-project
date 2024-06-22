// src/users/dto/safe-user.dto.ts

import { User } from "@prisma/client";

type ValidateKeys<
	K,
	T extends [keyof T] extends [K]
		? [K] extends [keyof T]
			? unknown
			: never
		: never,
> = T;

type SafeType<T, SafeKeys extends keyof T> = ValidateKeys<
	SafeKeys,
	Pick<T, SafeKeys>
>;

export type SafeUserDto = SafeType<User, "id" | "username" | "displayName">;

type SafeUserKeys = {
	[K in keyof SafeUserDto]: true;
};

export const SafeUserSelectArgs: SafeUserKeys = {
	id: true,
	username: true,
	displayName: true,
};

export const toSafeUser = (user: User): SafeUserDto => {
	return {
		id: user.id,
		username: user.username,
		displayName: user.displayName,
	};
};
