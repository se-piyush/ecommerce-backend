import { NextFunction, Request, Response } from "express";
import axios from "axios";
const userServiceUrl = process.env.USER_SERVICE || "http://localhost:3000";
export const authenticateUserMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const userJwtToken = req.cookies.userAuthToken;
  try {
    const resp = await axios.get(`${userServiceUrl}/users/verify`, {
      params: { userJwtToken },
    });
    req.userId = resp.data.userId;
    next();
  } catch (err) {
    return resp.status(401).send("UnAuthenticated");
  }
};
