import express from "express";

import { PORT } from "./constants";
import { usersRouter } from "./routes/users";
import { errorHandler } from "./utils/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("May the 4th be with you on the port " + PORT);
});

export default app;
