//npm init -y
//tsc --init

import express, { Request, Response } from "express";
import { initMongoDB } from "./config/db.connection";
import { errorHandler } from "./middlewares/error.handler";
import apiRouter from "./routes/index";
import config from "./config/config";
import { logger } from "./logs/logger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("server ok");
});

app.use("/api", apiRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("db conectada"))
  .catch((error) => console.log(error));

const PORT = config.PORT;

app.listen(PORT, () => logger.info(`Server ok en puerto ${PORT}`));
