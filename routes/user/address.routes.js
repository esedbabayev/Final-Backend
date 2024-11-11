import express from "express";

// Controllers
import {
  addAddress,
  getAllAddresses,
  editAddress,
  deleteAddress,
} from "../../controllers/user/address.controller.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", getAllAddresses);
router.patch("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

export default router;
