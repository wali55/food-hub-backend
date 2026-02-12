import { OrderStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type CreateOrderProps = {
  mealItems: {
    mealId: string;
    quantity: number;
  }[],
  deliveryAddress: string;
}

const createOrder = async (order: CreateOrderProps, userId: string) => {
  const { mealItems, deliveryAddress } = order;
  return await prisma.$transaction(async (tx) => {

    const mealDetails = await tx.meal.findMany({
      where: { id: { in: mealItems.map(item => item.mealId) } }
    });

    const totalPrice = mealItems.reduce((sum, item) => {
      const meal = mealDetails.find(m => m.id === item.mealId);
      if (!meal) throw new Error(`Meal ${item.mealId} not found`);
      return sum + (Number(meal.price) * item.quantity);
    }, 0);

    return await tx.order.create({
      data: {
        userId,
        totalPrice,
        deliveryAddress,
        meals: {
          create: mealItems.map(item => ({
            mealId: item.mealId,
            quantity: item.quantity,
          }))
        }
      },
      include: { meals: true }
    });
  });
};

const getProviderOrders = async (userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: {
      userId
    }
  })

  if (!provider) {
    throw new Error("User not found!");
  }

  const result = await prisma.order.findMany({
    where: {
      meals: {
        some: {
          meal: {
            providerId: provider.id
          }
        }
      }
    },
    include: {
      user: true,
      meals: {
        include: {
          meal: true,
        },
      },
    },
  });
  return result;
};

const updateOrderStatus = async (order: {status: OrderStatus},id: string) => {
  const result = await prisma.order.update({
    where: {
      id
    },
    data: order
  })
  return result;
}

const getCustomerOrders = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: {
      userId
    }
  })
  return result;
}

const getOrderById = async (id: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id
    }
  })
  return result;
}

export const orderService = {
  createOrder,
  getProviderOrders,
  updateOrderStatus,
  getCustomerOrders,
  getOrderById
}