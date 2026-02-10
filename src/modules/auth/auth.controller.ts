import { Request, Response } from "express";
import { authService } from "./auth.service";

const register = async (req: Request, res: Response) => {
    try {
        const result = await authService.register(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not register!"
        })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.login(req.body);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not login!"
        })
    }
}

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        console.log("controller***:", req.user);
        if (!req.user) {
            return res.status(400).json({
            success: false,
            message: "User not found!"
        })
        }

        const result = await authService.getCurrentUser(req.user.id);
        return res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "User not found!"
        })
    }
}

export const authController = {
    register,
    login,
    getCurrentUser
}