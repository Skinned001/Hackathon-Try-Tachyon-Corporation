import express from "express";
import { AuthRouter } from "./auth.routes.js";

export const Router = express.Router();

Router.use(AuthRouter);
