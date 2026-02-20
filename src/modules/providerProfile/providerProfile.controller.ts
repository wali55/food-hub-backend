import { Request, Response } from "express";
import { providerProfileService } from "./providerProfile.service";
import { UserRole } from "../../generated/prisma/enums";

const createProviderProfile = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found. Could not create provider profile!"
            })
        }

        if (user.role !== UserRole.PROVIDER) {
            return res.status(400).json({
                success: false,
                message: "User must be a provider. Could not create provider profile!"
            })
        }

        const result = await providerProfileService.createProviderProfile(req.body, user.id);
        return res.status(201).json({
            success: true,
            message: "Provider profile created successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not create provider profile!"
        })
    }
}

const getAllProviderProfiles = async (req: Request, res: Response) => {
    try {
        const result = await providerProfileService.getAllProviderProfiles();
        return res.status(200).json({
            success: true,
            message: "Provider profiles fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch provider profiles!"
        })
    }
}

const getProviderProfileById = async (req: Request, res: Response) => {
    try {
        const {providerId} = req.params;
        const result = await providerProfileService.getProviderProfileById(providerId as string);
        return res.status(200).json({
            success: true,
            message: "Provider profile fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch provider profile!"
        })
    }
}

const getProviderStats = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found. Could not fetch provider stats!"
            })
        }

        if (user.role !== UserRole.PROVIDER) {
            return res.status(400).json({
                success: false,
                message: "User must be a provider. Could not fetch provider stats!"
            })
        }

        const result = await providerProfileService.getProviderStats(user.id);
        return res.status(200).json({
            success: true,
            message: "Provider stats fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch provider stats!"
        })
    }
}

export const providerProfileController = {
    createProviderProfile,
    getAllProviderProfiles,
    getProviderProfileById,
    getProviderStats
}