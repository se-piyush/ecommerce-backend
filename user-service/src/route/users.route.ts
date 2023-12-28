import express from "express";
import { login, logout, register, verify } from "../controller/user.controller";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/verify", verify);

export default router;
