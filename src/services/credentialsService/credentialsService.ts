import { Users } from "@prisma/client";
import * as credentialsRepository from "../../repositories/credentialsRepository";
import { Credential } from "../../repositories/credentialsRepository";
import * as authRepository from "../../repositories/authRepository";
import * as authValidation from "../authService/authValidation";
import * as credentialsValidation from "./credentialsValidation";
import * as cryptographyUtils from "../../utils/cryptographyUtils";

export async function registerCredential(credential: Credential) {
  const { ownerId }: { ownerId: number } = credential;
  const owner: Users | null = await authRepository.findUserById(ownerId);

  authValidation.ensureUserExists(owner);
  await credentialsValidation.ensureUniqueTitle(credential);

  const encryptedPassword: string = cryptographyUtils.encryptString(
    credential.password
  );

  await credentialsRepository.registerCredential({
    ...credential,
    password: encryptedPassword,
  });
}
