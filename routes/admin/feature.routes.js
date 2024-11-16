import express from "express";

// Controllers
import {
  addFeatureImage,
  getFeatureImages,
} from "../../controllers/admin/feature.controller.js";

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

export default router;
