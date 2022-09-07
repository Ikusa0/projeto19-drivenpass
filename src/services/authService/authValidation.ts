import { Users } from "@prisma/client";
import { CustomError } from "../../entities/customError";
import { User } from "../../repositories/authRepository";
import * as authRepository from "../../repositories/authRepository";
import * as cryptographyUtils from "../../utils/cryptographyUtils";

export function ensureUserExists(user: Users | null) {
  if (!user) {
    throw new CustomError({
      type: "error_unauthorized",
      message: "Invalid user",
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

export function validatePassword(password: string, user: Users) {
  if (!cryptographyUtils.compareHashedString(user.password, password)) {
    throw new CustomError({
      type: "error_unauthorized",
      message: "Invalid user",
    });
  }
}
