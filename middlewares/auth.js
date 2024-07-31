import passport from "passport";
import { Strategy } from "passport-local";
import db from "../db.js";
import bcrypt from "bcrypt";

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE username=$1", [
        username,
      ]);
      const invalidCredentialMsg = "Invalid username or password";
      if (rows.length === 0) {
        done(null, null, { message: invalidCredentialMsg });
        return;
      }
      const isMatch = await bcrypt.compare(password, rows[0].password);
      if (!isMatch) {
        done(null, null, { message: invalidCredentialMsg });
      } else {
        const { id, username } = rows[0];
        done(null, { id, username });
      }
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query(
      "SELECT (id,username) FROM users WHERE id=$1",
      [id]
    );
    if (rows.length === 0) {
      done(null, null);
      return;
    }
    done(null, rows[0]);
  } catch (error) {
    done(error);
  }
});

export default passport;
