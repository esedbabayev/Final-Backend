import express from "express";

// Controller
import { searchProducts } from "../../controllers/user/search.controller.js";

const router = express.Router();

router.get("/:keyword", searchProducts);

export default router;
