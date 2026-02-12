import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../generated/prisma/enums";
import { reviewController } from "./review.controller";

const router = express.Router();

router.get("/", reviewController.getAllReviews);
router.post("/", auth(UserRole.CUSTOMER), reviewController.createReview);

export default router;