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

export const providerProfileService = {
    createProviderProfile
}