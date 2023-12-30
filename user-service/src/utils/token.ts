import jwt from "jsonwebtoken";
const secret = process.env.SECRET || "this is a secret key";
export const generateToken = (key: string, value: string): string => {
  return jwt.sign({ [key]: value }, secret, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
