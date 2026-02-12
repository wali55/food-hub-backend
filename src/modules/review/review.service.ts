import { prisma } from "../../lib/prisma"

const createReview = async (review: {content: string}, userId: string) => {
    const result = await prisma.review.create({
        data: {
            content: review.content,
            userId
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    })
    return result;
}

const getAllReviews = async () => {
    const result = await prisma.review.findMany({
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }
    });
    return result;
}

export const reviewService = {
    createReview,
    getAllReviews
}