// src/app.ts

import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import userRoutes from "./route/users.route";
import "./config/passport.config";
import { health, ready } from "./controller/user.controller";

const app = express();
const PORT = parseInt(process.env.PORT || "3000");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use("/users", userRoutes);
app.get("/health", health);
app.get("/ready", ready);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
