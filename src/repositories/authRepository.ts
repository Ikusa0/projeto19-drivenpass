import { Users } from "@prisma/client";
import db from "../databases/prisma";

export type User = Omit<Users, "id">;

export async function registerUser(user: User) {
  await db.users.create({ data: user });
}

export async function findUserByEmail(email: string): Promise<Users | null> {
  return db.users.findUnique({ where: { email } });
}
