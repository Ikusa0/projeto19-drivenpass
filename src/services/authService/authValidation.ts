import { Users } from "@prisma/client";
import { CustomError } from "../../entities/customError";
import { NewUser } from "../../repositories/authRepository";
import * as authRepository from "../../repositories/authRepository";

export function ensureUserExists(user: Users) {
  if (!user) {
    throw new CustomError({
      type: "error_not_found",
      message: "User does not exist",
    });
  }
}

export async function ensureUserDoesNotExist(newUser: NewUser) {
  const user: Users | null = await authRepository.findUserByEmail(
    newUser.email
  );
  if (user) {
    throw new CustomError({
      type: "error_conflict",
      message: "User already exists",
    });
  }
}
