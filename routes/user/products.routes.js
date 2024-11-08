import express from "express";

// Controllers
import {
  getFilteredProducts,
  getProductById,
} from "../../controllers/user/products.controller.js";

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductById);

export default router;
