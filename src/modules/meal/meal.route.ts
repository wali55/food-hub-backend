import express from "express";
import auth from "../../middlewares/auth";
import { mealController } from "./meal.controller";
import { UserRole } from "../../generated/prisma/enums";

const router = express.Router();

router.get("/", mealController.getAllMeals);
router.get("/:mealId", mealController.getMealById);
router.post("/", auth(UserRole.PROVIDER), mealController.createMeal);
router.patch("/:mealId", auth(UserRole.PROVIDER), mealController.updateMeal);
router.delete("/:mealId", auth(UserRole.PROVIDER), mealController.deleteMeal);

export default router;