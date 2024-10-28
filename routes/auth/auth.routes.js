import express from "express";

// Controllers
import { signUp, login } from "../../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", login);

export default router;
