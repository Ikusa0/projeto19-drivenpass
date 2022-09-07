import * as authRepository from "../../repositories/authRepository";
import { User } from "../../repositories/authRepository";
import * as authValidation from "./authValidation";
import * as cryptographyUtils from "../../utils/cryptographyUtils";

export async function registerUser(user: User) {
  const { email, password }: User = user;
  await authValidation.ensureUserDoesNotExist(user);

  const hashedPassword = cryptographyUtils.hashString(password);
  await authRepository.registerUser({ email, password: hashedPassword });
}

export async function logInUser(user: User) {
  const { email, password }: User = user;
  const userInDb = await authRepository.findUserByEmail(email);

  authValidation.ensureUserExists(userInDb);
  authValidation.validatePassword(password, userInDb!);
}
