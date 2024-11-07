import express from "express";

// Controllers
import { getFilteredProducts } from "../../controllers/user/products.controller.js";

const router = express.Router();

router.get("/get", getFilteredProducts);

export default router;
