import express from "express";

// Controllers
import {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
} from "../../controllers/user/cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCartItems);
router.patch("/update", updateCartItemQuantity);
router.delete("/:userId/:productId", removeFromCart);

export default router;
