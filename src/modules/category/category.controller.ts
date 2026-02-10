import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.createCategory(req.body);
        return res.status(201).json({
            success: true,
            message: "Category created successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not create category!"
        })
    }
}

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.getAllCategories();
        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch categories!"
        })
    }
}

const getCategoryById = async (req: Request, res: Response) => {
    try {
        const {categoryId} = req.params;
        const result = await categoryService.getCategoryById(categoryId as string);
        return res.status(200).json({
            success: true,
            message: "Category fetched successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not fetch category!"
        })
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try {
        const {categoryId} = req.params;
        const result = await categoryService.updateCategory(req.body, categoryId as string);
        return res.status(200).json({
            success: true,
            message: "Category updated successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not update category!"
        })
    }
}

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const {categoryId} = req.params;
        const result = await categoryService.deleteCategory(categoryId as string);
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Could not delete category!"
        })
    }
}

export const categoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}