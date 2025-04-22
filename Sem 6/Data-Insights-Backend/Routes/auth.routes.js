import express from "express";
import { signup, login, signout } from "../Controllers/auth.controller.js";
const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/signout", signout);

// router.post("/verify-email", verifyEmail);

export default router;
