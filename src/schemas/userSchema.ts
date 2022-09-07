import joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const joiPassword = joi.extend(joiPasswordExtendCore);

export const newUserSchema = joi.object({
  // eslint-disable-next-line newline-per-chained-call
  email: joi.string().trim().email().label("Email").required(),
  password: joiPassword
    .string()
    .min(10)
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .label("Password")
    .required()
    .messages({
      "password.min": "{#label} should contain at least {#min} characters",
      "password.minOfUppercase":
        "{#label} should contain at least {#min} uppercase characters",
      "password.minOfSpecialCharacters":
        "{#label} should contain at least {#min} special characters",
      "password.minOfLowercase":
        "{#label} should contain at least {#min} lowercase characters",
      "password.minOfNumeric":
        "{#label} should contain at least {#min} numeric characters",
    }),
});

export const userSchema = joi.object({
  // eslint-disable-next-line newline-per-chained-call
  email: joi.string().email().trim().label("Email").required(),
  password: joi.string().label("Password").required(),
});
