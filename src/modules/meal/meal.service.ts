import { DietaryPref } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type MealProps = {
  title: string;
  description: string;
  price: number;
  dietaryPref: DietaryPref;
  categoryId: string;
};

type UpdateMealProps = {
  title?: string;
  description?: string;
  price?: number;
  dietaryPref?: DietaryPref;
  categoryId?: string;
};

const createMeal = async (meal: MealProps, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      provider: true,
    },
  });

  if (!user) {
    throw new Error(
      "Could not found the provider and it's profile. Cannot create meal",
    );
  }

  const result = await prisma.meal.create({
    data: {
      title: meal.title,
      description: meal.description,
      price: meal.price,
      dietaryPref: meal.dietaryPref,
      categoryId: meal.categoryId,
      providerId: user?.provider?.id!,
    },
  });
  return result;
};

const getAllMeals = async () => {
  const result = await prisma.meal.findMany({
    include: {
      category: {
        select: {
          title: true,
        },
      },
      provider: {
        select: {
          restaurantName: true,
        },
      },
    },
  });
  return result;
};

const getMealById = async (id: string) => {
  const result = await prisma.meal.findUnique({
    where: {
      id,
    },
    include: {
      category: {
        select: {
          title: true,
        },
      },
      provider: {
        select: {
          restaurantName: true,
        },
      },
    },
  });
  return result;
};

const updateMeal = async (meal: UpdateMealProps, id: string) => {
  const result = await prisma.meal.update({
    where: {
      id,
    },
    data: meal,
  });
  return result;
};

const deleteMeal = async (id: string) => {
  const result = await prisma.meal.delete({
    where: {
      id,
    },
  });
  return result;
};

const getProviderMeals = async (userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: {
      userId
    }
  })

  if (!provider) {
    throw new Error("Provider profile not found!")
  }

  const providerId = provider.id;

  const result = await prisma.meal.findMany({
    where: {
      providerId
    },
    include: {
      category: {
        select: {
          title: true,
        },
      }
    },
  });
  return result;
};

export const mealService = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getProviderMeals
};
