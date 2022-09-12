import joi from "joi";

export const credentialsSchema = joi.object({
  // eslint-disable-next-line newline-per-chained-call
  url: joi.string().uri().trim().label("URL").required(),
  username: joi.string().label("Username").required(),
  password: joi.string().label("Password").required(),
  // eslint-disable-next-line newline-per-chained-call
  title: joi.string().trim().alphanum().max(50).label("Title").required(),
});
