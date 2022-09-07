import bcrypt from "bcrypt";

export function hashString(text: string): string {
  const hashedString: string = bcrypt.hashSync(text, 10);
  return hashedString;
}

export function compareHashedString(hashed: string, plain: string) {
  const match: boolean = bcrypt.compareSync(plain, hashed);
  return match;
}
