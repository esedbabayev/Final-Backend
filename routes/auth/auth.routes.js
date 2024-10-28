import express from "express";

// Controllers
import { signUp } from "../../controllers/auth/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);

export default router;
