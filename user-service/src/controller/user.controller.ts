// src/controllers/UserController.ts

import { NextFunction, Request, Response } from "express";
import passport from "passport";
import User from "../model/users.model";
import { generateToken, verifyToken } from "../utils/token";
import { JwtPayload } from "jsonwebtoken";

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
    res.cookie("jwt", generateToken("id", user.id), {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.status(200).json({
      message: "Logged in successfully",
      token: generateToken("id", user.id),
    });
  })(req, res);
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = await User.create({ email, password, firstName, lastName });

    const token = generateToken("id", newUser.id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

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
    const decodedUser = verifyToken(jwt);
    const user = await User.findOne(decodedUser.id);
    if (!user) {
      return res.status(401);
    }
    return res.status(200).send({ userId: user.id });
  } catch (err) {
    return res.status(401);
  }
};
