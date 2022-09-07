import * as authRepository from "../repositories/authRepository";
import { NewUser } from "../repositories/authRepository";
import * as authValidation from "./authService/authValidation";
import * as cryptographyUtils from "../utils/cryptographyUtils";

export async function registerUser(user: NewUser) {
  const { email, password }: NewUser = user;
  await authValidation.ensureUserDoesNotExist(user);

  const hashedPassword = cryptographyUtils.hashString(password);
  await authRepository.registerUser({ email, password: hashedPassword });
}
