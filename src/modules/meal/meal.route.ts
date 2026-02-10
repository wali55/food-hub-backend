import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { mealController } from "./meal.controller";

const router = express.Router();

router.post("/", auth(UserRole.PROVIDER), mealController.createMeal);

export default router;