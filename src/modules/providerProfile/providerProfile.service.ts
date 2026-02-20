import { prisma } from "../../lib/prisma";

type CreateProviderProfileProps = {
  restaurantName: string;
  address: string;
};

const createProviderProfile = async (
  providerProfile: CreateProviderProfileProps,
  userId: string,
) => {
  const result = await prisma.providerProfile.upsert({
    where: {
      userId,
    },
    update: {},
    create: {
      restaurantName: providerProfile.restaurantName,
      address: providerProfile.address,
      userId,
    },
  });
  return result;
};

const getAllProviderProfiles = async () => {
  const result = await prisma.providerProfile.findMany();
  return result;
};

const getProviderProfileById = async (id: string) => {
  const result = await prisma.providerProfile.findUnique({
    where: {
      id,
    },
    include: {
      meals: {
        select: {
          id: true,
          title: true,
          description: true,
          dietaryPref: true,
          price: true,
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
      },
    },
  });
  return result;
};

const getProviderStats = async (userId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const provider = await tx.providerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!provider)
      return {
        totalMeals: 0,
        totalOrders: 0,
        placedOrders: 0,
        deliveredOrders: 0,
      };

    const providerId = provider.id;

    const [totalMeals, totalOrders, placedOrders, deliveredOrders] =
      await Promise.all([
        await tx.meal.count({
          where: { providerId },
        }),
        await tx.order.count({
          where: {
            meals: {
              some: {
                meal: {
                  providerId,
                },
              },
            },
          },
        }),
        await tx.order.count({
          where: {
            status: "PLACED",
            meals: {
              some: {
                meal: {
                  providerId,
                },
              },
            },
          },
        }),
        await tx.order.count({
          where: {
            status: "DELIVERED",
            meals: {
              some: {
                meal: {
                  providerId,
                },
              },
            },
          },
        }),
      ]);
    return {
      totalMeals,
      totalOrders,
      placedOrders,
      deliveredOrders,
    };
  });
  return result;
};

export const providerProfileService = {
  createProviderProfile,
  getAllProviderProfiles,
  getProviderProfileById,
  getProviderStats,
};
