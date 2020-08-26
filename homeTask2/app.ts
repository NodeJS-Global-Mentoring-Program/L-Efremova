import express from "express";
import { ExpressJoiError } from "express-joi-validation";

import { PORT } from "./constants";
import { usersRouter } from "./routes/users";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", usersRouter);
app.use(
  (
    err: any | ExpressJoiError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err && err.error && err.error.isJoi) {
      const e: ExpressJoiError = err;
      const message = e?.error?.details.map((d) => d.message).join("\n");
      console.error(e?.error);
      // e.g "you submitted a bad query paramater"
      res.status(400).end(`You submitted an invalid data:\n` + message);
    } else {
      res.status(500).end("internal server error");
    }
  }
);

app.listen(PORT, () => {
  console.log("May the 4th be with you on the port " + PORT);
});

export default app;
