import "dotenv/config";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import db from "../db.js";

const PgSessionStore = connectPgSimple(session);

const configuredSession = session({
  store: new PgSessionStore({
    pool: db,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 5,
  },
});

export default configuredSession;
