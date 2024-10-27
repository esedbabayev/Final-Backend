import express from "express";

// Controllers
import { signUp } from "../../controllers/auth/auth.controller";

const router = express.Router();

router.post("/sign-up", signUp);

export default AuthRouter;
