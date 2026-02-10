import bcrypt from "bcryptjs";
import { UserRole } from "../../generated/prisma/enums"
import { prisma } from "../lib/prisma"

async function seedAdmin() {
    try {
        const adminData = {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            role: UserRole.ADMIN,
            password: process.env.ADMIN_PASSWORD,
            phone: process.env.ADMIN_PHONE,
            address: process.env.ADMIN_ADDRESS,
        }

        const hashed = await bcrypt.hash(adminData.password as string, 10);

        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email!
            }
        })

        if (existingUser) {
            throw new Error("This email already exists!")
        }

        await prisma.user.upsert({
            where: {
                email: adminData.email!
            },
            update: {},
            create: {
                name: adminData.name!,
                email: adminData.email!,
                hashedPassword: hashed!,
                role: adminData.role,
                phone: adminData.phone!,
                address: adminData.address!
            }
        })


        console.log("Admin created!")
    } catch (error) {
        console.log(error);
    }
}

seedAdmin();