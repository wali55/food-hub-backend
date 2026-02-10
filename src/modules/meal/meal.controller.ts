import { Request, Response } from "express";
import { mealService } from "./meal.service";

const createMeal = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User not found!"
            })
        }
        console.log("***ProviderId***", user.id);
        const result = await mealService.createMeal(req.body, user.id);
        return res.status(201).json({
            success: true,
            message: "Meal created successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not create meal!"
        })
    }
}

export const mealController = {
    createMeal
}