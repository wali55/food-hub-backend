import { prisma } from "../../lib/prisma";

type CreateProviderProfileProps = {
    restaurantName: string;
    address: string;
}

const createProviderProfile = async (providerProfile: CreateProviderProfileProps, userId: string) => {
    const result = await prisma.providerProfile.upsert({
        where: {
            userId
        },
        update: {},
        create: {
            restaurantName: providerProfile.restaurantName,
            address: providerProfile.address,
            userId
        }
    })
    return result;
}

const getAllProviderProfiles = async () => {
    const result = await prisma.providerProfile.findMany();
    return result;
}

const getProviderProfileById = async (id: string) => {
    const result = await prisma.providerProfile.findUnique({
        where: {
            id
        },
        include: {
            meals: true
        }
    });
    return result;
}

export const providerProfileService = {
    createProviderProfile,
    getAllProviderProfiles,
    getProviderProfileById
}