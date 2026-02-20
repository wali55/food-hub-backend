import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../../generated/prisma/enums";
import { providerProfileController } from "./providerProfile.controller";

const router = express.Router();

router.get("/", providerProfileController.getAllProviderProfiles);
router.get("/stats", auth(UserRole.PROVIDER), providerProfileController.getProviderStats);
router.get("/:providerId", providerProfileController.getProviderProfileById);
router.post("/", auth(UserRole.PROVIDER), providerProfileController.createProviderProfile);

export default router;