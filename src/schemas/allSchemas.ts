import { userSchema, newUserSchema } from "./userSchema";
import { credentialsSchema } from "./credentialsSchema";

export default {
  signup: newUserSchema,
  signin: userSchema,
  registerCredential: credentialsSchema,
};
