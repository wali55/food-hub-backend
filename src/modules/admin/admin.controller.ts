import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await adminService.getAllUsers();
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

export const adminCotroller = {
    getAllUsers,
    updateUserStatus
}