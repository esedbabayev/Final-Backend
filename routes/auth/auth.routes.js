import express, { response } from "express";

// Controllers
import {
  signUp,
  login,
  logout,
} from "../../controllers/auth/auth.controller.js";

// Middleware
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", login);
router.post("/logout", logout);
router.get("/check-auth", authMiddleware, (request, response) => {
  const user = request.user;
  response.status(200).json({
    success: true,
    message: "Authentication granted",
    user,
  });
});

export default router;
