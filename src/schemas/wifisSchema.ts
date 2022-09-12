/* eslint-disable newline-per-chained-call */
import joiBase from "joi";
import joiDate from "@joi/date";

const joi = joiBase.extend(joiDate);

export const wifisSchema = joi.object({
  title: joi.string().trim().alphanum().max(50).label("Title").required(),
  name: joi.string().trim().label("Name").required(),
  password: joi.string().label("Password").required(),
});
