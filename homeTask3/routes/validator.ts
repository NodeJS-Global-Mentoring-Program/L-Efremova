import * as Joi from "@hapi/joi";
import {
  createValidator,
  ContainerTypes,
  ValidatedRequestSchema,
} from "express-joi-validation";

import { loginPattern, passwordPattern } from "../utils/constants";

export interface IUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
  };
}

export const queryUserSchema = Joi.object({
  id: Joi.string(),
  login: Joi.string().regex(loginPattern).required(),
  password: Joi.string().regex(passwordPattern).required(),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean(),
});

const validator = createValidator({ passError: true });
validator.body(queryUserSchema);

export default validator.body(queryUserSchema);
