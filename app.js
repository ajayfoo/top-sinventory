import createError from "http-errors";
import express from "express";
import { join } from "path";
import logger from "morgan";
import "dotenv/config";
import auth from "./middlewares/auth.js";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import instrumentRouter from "./routes/instrument.js";
import categoryRouter from "./routes/category.js";
import loginRouter from "./routes/login.js";
import configuredSession from "./middlewares/session.js";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(express.json());

app.use(configuredSession);
app.use(auth.session());

app.use("/login", loginRouter);

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
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
