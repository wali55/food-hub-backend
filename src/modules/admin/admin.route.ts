import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../generated/prisma/enums";
import { adminCotroller } from "./admin.controller";

const router = express.Router();

router.get("/users", auth(UserRole.ADMIN), adminCotroller.getAllUsers);
router.patch("/users/:userId", auth(UserRole.ADMIN), adminCotroller.updateUserStatus);

export default router;