import { Users, Wifis } from "@prisma/client";
import * as wifisRepository from "../../repositories/wifisRepository";
import { Wifi } from "../../repositories/wifisRepository";
import * as authRepository from "../../repositories/authRepository";
import * as authValidation from "../authService/authValidation";
import * as wifisValidation from "./wifisValidation";
import * as cryptographyUtils from "../../utils/cryptographyUtils";

export async function registerWifi(wifi: Wifi) {
  const { ownerId }: { ownerId: number } = wifi;
  const owner: Users | null = await authRepository.findUserById(ownerId);

  authValidation.ensureUserExists(owner);

  const encryptedPassword: string = cryptographyUtils.encryptString(
    wifi.password
  );

  await wifisRepository.registerWifi({
    ...wifi,
    password: encryptedPassword,
  });
}

export async function getUserWifis(ownerId: number): Promise<Wifis[]> {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const wifis: Wifis[] = await wifisRepository.findUserWifis(ownerId);
  const decryptedWifis = cryptographyUtils.decryptObjectArray(wifis, [
    "password",
  ]);
  return decryptedWifis;
}

export async function getWifiById(
  ownerId: number,
  wifiId: number
): Promise<Wifis> {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const wifi: Wifis | null = await wifisRepository.findWifiById(wifiId);

  wifisValidation.ensureWifiExists(wifi);
  wifisValidation.isOwner(wifi!, owner!);

  wifi!.password = cryptographyUtils.decryptString(wifi!.password);
  return wifi!;
}

export async function deleteWifiById(ownerId: number, wifiId: number) {
  const owner: Users | null = await authRepository.findUserById(ownerId);
  authValidation.ensureUserExists(owner);

  const wifi: Wifis | null = await wifisRepository.findWifiById(wifiId);

  wifisValidation.ensureWifiExists(wifi);
  wifisValidation.isOwner(wifi!, owner!);

  await wifisRepository.deleteWifiById(wifiId);
}
