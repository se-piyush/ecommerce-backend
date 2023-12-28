// src/passportConfig.ts

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../model/users.model";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      user.comparePassword(password).then((isMatch) => {
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: "Incorrect password" });
      });
    }
  )
);
