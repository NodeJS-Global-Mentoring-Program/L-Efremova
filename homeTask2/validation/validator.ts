import { createValidator } from "express-joi-validation";

import { queryUserSchema } from "./schema";

const validator = createValidator({ passError: true });
validator.body(queryUserSchema);

export default validator.body(queryUserSchema);
