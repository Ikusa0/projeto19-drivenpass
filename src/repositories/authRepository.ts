import { Users } from "@prisma/client";
import db from "../databases/prisma";

export async function registerUser(user: { email: string; password: string }) {
  await db.users.create({ data: user });
}

export async function findUserByEmail(email: string): Promise<Users | null> {
  return db.users.findUnique({ where: { email } });
}
