import express from "express";

// Controllers
import {
  uploadImageHandler,
  addProduct,
  getAllProducts,
  editProduct,
  deleteProduct,
} from "../../controllers/admin/products.controller.js";

// Helpers
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), uploadImageHandler);
router.post("/add", addProduct);
router.get("/get", getAllProducts);
router.patch("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
