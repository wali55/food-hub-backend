import { prisma } from "../../lib/prisma"

const getAllUsers = async (userId: string) => {
    const result = await prisma.user.findMany({
        where: {
            NOT: {
                id: userId
            }
        }
    });
    result.forEach((user) => {
        //@ts-ignore
        delete user.hashedPassword;
    })
    return result;
}

const updateUserStatus = async (user: { isActive: boolean }, id: string) => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: user
    })
    //@ts-ignore
    delete result.hashedPassword;

    return result;
}

const getAdminStats = async (userId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const [totalUsers, totalOrders, totalMeals, totalCategories] =
      await Promise.all([
        await tx.user.count({
            where: {
            NOT: {
                id: userId
            }
        }
        }),
        await tx.order.count(),
        await tx.meal.count(),
        await tx.category.count(),
      ]);
    return {
      totalUsers,
      totalOrders,
      totalMeals,
      totalCategories,
    };
  });
  return result;
};

const getAllOrders = async () => {
    const result = await prisma.order.findMany();
    return result;
}

export const adminService = {
    getAllUsers,
    updateUserStatus,
    getAdminStats,
    getAllOrders
}