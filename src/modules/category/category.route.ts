import express from "express";
import auth from "../../middlewares/auth";
import { categoryController } from "./category.controller";
import { UserRole } from "../../generated/prisma/enums";

const router = express.Router();

router.post("/", auth(UserRole.ADMIN), categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:categoryId", categoryController.getCategoryById);
router.patch("/:categoryId", auth(UserRole.ADMIN), categoryController.updateCategory);
router.delete("/:categoryId", auth(UserRole.ADMIN), categoryController.deleteCategory);

export default router;