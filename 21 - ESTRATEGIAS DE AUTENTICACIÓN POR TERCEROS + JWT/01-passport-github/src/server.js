import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from "./utils.js";
import usersRouter from "./routes/users.router.js";
import { initMongoDB } from "./db/connection.js";
import MongoStore from 'connect-mongo';
import { errorHandler } from "./middlewares/errorHandler.js";
import passport from 'passport';
import './passport/local-strategy.js';
import './passport/github-strategy.js';
import 'dotenv/config' 

const app = express();

const storeConfig = {
  store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      crypto: { secret: process.env.SECRET_KEY },
      ttl: 180,
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(storeConfig));

/* ------------------------------------ - ----------------------------------- */
//! ANTES DE LAS RUTAS
app.use(passport.initialize());
app.use(passport.session());
/* ------------------------------------ - ----------------------------------- */

app.use("/users", usersRouter);

app.use(errorHandler);

initMongoDB();

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
