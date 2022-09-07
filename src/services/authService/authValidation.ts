import { Users } from "@prisma/client";
import { CustomError } from "../../entities/customError";
import { User } from "../../repositories/authRepository";
import * as authRepository from "../../repositories/authRepository";

export function ensureUserExists(user: Users) {
  if (!user) {
    throw new CustomError({
      type: "error_not_found",
      message: "User does not exist",
    });
  }
}

export async function ensureUserDoesNotExist(user: User) {
  const userInDb: Users | null = await authRepository.findUserByEmail(
    user.email
  );
  if (userInDb) {
    throw new CustomError({
      type: "error_conflict",
      message: "User already exists",
    });
  }
}
