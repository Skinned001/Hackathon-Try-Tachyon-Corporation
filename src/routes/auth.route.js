import { login, register } from "../controllers/auth.controller.js";
import express from "express";

export const AuthRouter = express.Router();

AuthRouter.post("/login", login);

AuthRouter.post("/auth/register", register);
