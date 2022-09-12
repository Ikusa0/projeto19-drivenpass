import { Users, Wifis } from "@prisma/client";
import { Wifi } from "../../repositories/wifisRepository";
import { CustomError } from "../../entities/customError";

export function ensureWifiExists(wifi: Wifi | null) {
  if (!wifi) {
    throw new CustomError({
      type: "error_not_found",
      message: "There is no wifi with such ID",
    });
  }
}

export function isOwner(wifi: Wifis, owner: Users) {
  if (wifi.ownerId !== owner.id) {
    throw new CustomError({
      type: "error_unauthorized",
      message: "You're not allowed to access this wifi",
    });
  }
}
