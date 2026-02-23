import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../generated/prisma/enums";
import { adminController } from "./admin.controller";

const router = express.Router();

router.get("/stats", auth(UserRole.ADMIN), adminController.getAdminStats);
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);
router.get("/orders", auth(UserRole.ADMIN), adminController.getAllOrders);
router.patch("/users/:userId", auth(UserRole.ADMIN), adminController.updateUserStatus);

export default router;