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

const getAllMeals = async (req: Request, res: Response) => {
    try {
        const result = await mealService.getAllMeals();
        return res.status(200).json({
            success: true,
            message: "Meals fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch meals!"
        })
    }
}

const getMealById = async (req: Request, res: Response) => {
    try {
        const {mealId} = req.params;
        const result = await mealService.getMealById(mealId as string);
        return res.status(200).json({
            success: true,
            message: "Meal fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch meal!"
        })
    }
}

export const mealController = {
    createMeal,
    getAllMeals,
    getMealById
}