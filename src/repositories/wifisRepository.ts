import { Wifis } from "@prisma/client";
import db from "../databases/prisma";

export type Wifi = Omit<Wifis, "id">;

export async function registerWifi(wifi: Wifi) {
  await db.wifis.create({ data: wifi });
}

export function findUserWifis(userId: number): Promise<Wifis[]> {
  return db.wifis.findMany({ where: { ownerId: userId } });
}

export function findWifiById(id: number): Promise<Wifis | null> {
  return db.wifis.findUnique({ where: { id } });
}
export async function deleteWifiById(id: number) {
  await db.wifis.delete({ where: { id } });
}
