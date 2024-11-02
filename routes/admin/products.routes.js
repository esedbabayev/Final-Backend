import express from "express";

// Controllers
import { uploadImageHandler } from "../../controllers/admin/products.controller.js";

// Helpers
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), uploadImageHandler);
