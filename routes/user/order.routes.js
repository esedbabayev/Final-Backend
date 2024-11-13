import express from "express";

import {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} from "../../controllers/user/order.controller";

const router = express.Router();

router.post("/create", createOrder);

export default router;
