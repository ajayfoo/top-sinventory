import createError from "http-errors";
import express from "express";
import { join } from "path";
import logger from "morgan";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "dotenv/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import instrumentRouter from "./routes/instrument.js";
import categoryRouter from "./routes/category.js";
import loginRouter from "./routes/login.js";

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  dbName: "sinventory",
});

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: "sinventory",
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 100,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use("/login", loginRouter);

//validate user session ID
app.use((req, res, next) => {
  req.sessionStore.get(req.session.id, (err, session) => {
    if (err) throw err;
    if (session) {
      next();
      return;
    }
    res.redirect("/login");
  });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/instrument", instrumentRouter);
app.use("/category", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
