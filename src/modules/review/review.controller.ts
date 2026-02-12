import { Request, Response } from "express";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found. Could not create review!"
            })
        }
        const result = await reviewService.createReview(req.body, user.id);
        return res.status(201).json({
            success: true,
            message: "Review created successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not create review!"
        })
    }
}

const getAllReviews = async (req: Request, res: Response) => {
    try {
        const result = await reviewService.getAllReviews();
        return res.status(200).json({
            success: true,
            message: "Reviews fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch reviews!"
        })
    }
}

export const reviewController = {
    createReview,
    getAllReviews
}