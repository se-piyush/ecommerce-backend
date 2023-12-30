// src/controllers/UserController.ts

import { Request, Response } from "express";
import passport from "passport";
import User from "../model/users.model";
import token from "../utils/token";

export const login = (req: Request, res: Response) => {
  passport.authenticate("local", (err: Error, user: User) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // req.login(user, { session: false }, (loginErr) => {
    //     if (loginErr) {
    //       return res.status(500).json({ message: loginErr.message });
    //     }

    //   });
    res.cookie("jwt", token.generateToken("id", user.id), {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.status(200).json({
      message: "Logged in successfully",
      token: token.generateToken("id", user.id),
    });
  })(req, res);
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt");
  token.changeSecret();
  res.status(200).json({ message: "Logged out successfully" });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = await User.create({ email, password, firstName, lastName });

    const jwtToken = token.generateToken("id", newUser.id);

    res.cookie("jwt", jwtToken, { httpOnly: true, maxAge: 3600000 });

    // Return success response
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const verify = async (req: Request, res: Response) => {
  const jwt = <string>req.query.userJwtToken || "";
  try {
    const decodedUser = token.verifyToken(jwt);
    const user = await User.findByPk(decodedUser.id);
    if (!user) {
      return res.status(401).send();
    }
    return res.status(200).send({ userId: user.id });
  } catch (err) {
    return res.status(401).send();
  }
};

export const health = (req: Request, res: Response) => res.status(200).send();

export const ready = (req: Request, res: Response) => {
  // LATER
  // check the db connection
  return res.status(200).send();
};
