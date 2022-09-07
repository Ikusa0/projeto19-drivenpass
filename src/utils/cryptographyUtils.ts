import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Cryptr from "cryptr";

dotenv.config();
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

export function hashString(text: string): string {
  const hashedString: string = bcrypt.hashSync(text, 10);
  return hashedString;
}

export function compareHashedString(hashed: string, plain: string): boolean {
  const match: boolean = bcrypt.compareSync(plain, hashed);
  return match;
}

export function encryptString(text: string): string {
  const encryptedString = cryptr.encrypt(text);
  return encryptedString;
}

export function decryptString(encrypted: string): string {
  const decryptedString = cryptr.decrypt(encrypted);
  return decryptedString;
}

export function decryptObjectArray(arr: any[], keys: string[]): any[] {
  const decryptedArray: any[] = [...arr].map((obj: any) => {
    const newObj = { ...obj };

    keys.forEach((key: string) => {
      newObj[key] = decryptString(obj[key]);
    });

    return newObj;
  });

  return decryptedArray;
}
