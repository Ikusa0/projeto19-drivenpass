import { Users, Credentials } from "@prisma/client";
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

export async function getUserCredentials(
  ownerId: number
): Promise<Credentials[]> {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const credentials: Credentials[] =
    await credentialsRepository.findUserCredentials(ownerId);
  const decryptedCredentials = cryptographyUtils.decryptObjectArray(
    credentials,
    ["password"]
  );
  return decryptedCredentials;
}

export async function getCredentialById(
  ownerId: number,
  credentialId: number
): Promise<Credentials> {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const credential: Credentials | null =
    await credentialsRepository.findCredentialById(credentialId);

  credentialsValidation.ensureCredentialExists(credential);
  credentialsValidation.isOwner(credential!, owner!);

  credential!.password = cryptographyUtils.decryptString(credential!.password);
  return credential!;
}

export async function deleteCredentialById(
  ownerId: number,
  credentialId: number
) {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const credential: Credentials | null =
    await credentialsRepository.findCredentialById(credentialId);

  credentialsValidation.ensureCredentialExists(credential);
  credentialsValidation.isOwner(credential!, owner!);

  await credentialsRepository.deleteCredentialById(credentialId);
}
