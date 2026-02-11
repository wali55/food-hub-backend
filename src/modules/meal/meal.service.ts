import { DietaryPref } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type MealProps = {
    title: string;
    description: string;
    price: number;
    dietaryPref: DietaryPref;
    categoryId: string;
}

const createMeal = async (meal: MealProps, userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            provider: true
        }
    })

    if (!user) {
        throw new Error("Could not found the provider and it's profile. Cannot create meal");
    }

    const result = await prisma.meal.create({
        data: {
            title: meal.title,
            description: meal.description,
            price: meal.price,
            dietaryPref: meal.dietaryPref,
            categoryId: meal.categoryId,
            providerId: user?.provider?.id!
        }
    })
    return result;
}

export const mealService = {
    createMeal
}