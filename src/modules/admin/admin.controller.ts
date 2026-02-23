import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
            success: false,
            message: "Could not user!"
        })
        }
        const result = await adminService.getAllUsers(user.id);
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch users!"
        })
    }
}

const getAdminStats = async (req: Request, res: Response) => {
    try {
        const result = await adminService.getAdminStats();
        return res.status(200).json({
            success: true,
            message: "Stats fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch stats!"
        })
    }
}

const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const result = await adminService.updateUserStatus(req.body, userId as string);
        return res.status(200).json({
            success: true,
            message: "User status updated successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not update user status!"
        })
    }
}

export const adminController = {
    getAllUsers,
    updateUserStatus,
    getAdminStats
}