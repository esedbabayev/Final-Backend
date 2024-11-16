import express from "express";

// Controllers
import {
  addReview,
  getReviews,
} from "../../controllers/user/review.controller.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/:productId", getReviews);

export default router;
