import jwt from "jsonwebtoken";

class Token {
  secret = process.env.SECRET || "this is a secret key";
  generateToken = (key: string, value: string): string => {
    return jwt.sign({ [key]: value }, this.secret, {
      expiresIn: "1h",
    });
  };
  verifyToken = (token: string): any => {
    return jwt.verify(token, this.secret);
  };
  changeSecret = () => {
    this.secret = (Math.random() * 1e32).toString(36);
  };
}

export default new Token();
