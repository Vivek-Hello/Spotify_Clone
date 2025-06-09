import express from "express";
import { authCallback } from "../controllers/Auth.controller.js";
import { validateToken } from "../middlerware/Auth.middleware.js";

const AuthRoute = express.Router();

AuthRoute.post("/callback",validateToken,authCallback);

export default AuthRoute;