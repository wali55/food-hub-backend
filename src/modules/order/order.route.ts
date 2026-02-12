import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../generated/prisma/enums";
import { orderController } from "./order.controller";

const router = express.Router();

router.get("/customer", auth(UserRole.CUSTOMER), orderController.getCustomerOrders);
router.get("/provider", auth(UserRole.PROVIDER), orderController.getProviderOrders);
router.get("/:orderId", auth(UserRole.CUSTOMER, UserRole.PROVIDER), orderController.getOrderById);
router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder);
router.patch("/:orderId", auth(UserRole.PROVIDER), orderController.updateOrderStatus);

export default router;