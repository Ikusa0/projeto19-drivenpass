import { Users } from "@prisma/client";
import db from "../databases/prisma";

export interface NewUser {
  email: string;
  password: string;
}

export async function registerUser(user: NewUser) {
  await db.users.create({ data: user });
}

export async function findUserByEmail(email: string): Promise<Users | null> {
  return db.users.findUnique({ where: { email } });
}
