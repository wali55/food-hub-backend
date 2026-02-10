import { prisma } from "../../lib/prisma"

const createCategory = async (category: { title: string }) => {
    const result = await prisma.category.create({
        data: category
    })
    return result;
}

const getAllCategories = async () => {
    const result = await prisma.category.findMany();
    return result;
}

const getCategoryById = async (id: string) => {
    const result = await prisma.category.findUnique({
        where: {
            id
        }
    });
    return result;
}

const updateCategory = async (category: { title: string }, id: string) => {
    const result = await prisma.category.update({
        where: {
            id
        },
        data: category
    })
    return result;
}

const deleteCategory = async (id: string) => {
    const result = await prisma.category.delete({
        where: {
            id
        }
    })
    return result;
}

export const categoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}