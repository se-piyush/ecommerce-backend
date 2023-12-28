import jwt from "jsonwebtoken";
const SECRET = "this is a secret key";
export const generateToken = (key: string, value: string): string => {
  return jwt.sign({ [key]: value }, SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET);
};
