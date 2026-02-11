import { DietaryPref } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type MealProps = {
    title: string;
    description: string;
    price: number;
    dietaryPref: DietaryPref;
    categoryId: string;
}

const createMeal = async (meal: MealProps, providerId: string) => {
    console.log("***ProviderId***", providerId);
    const result = await prisma.meal.create({
        data: {
            title: meal.title,
            description: meal.description,
            price: meal.price,
            dietaryPref: meal.dietaryPref,
            categoryId: meal.categoryId,
            providerId
        }
    })
    return result;
}

export const mealService = {
    createMeal
}