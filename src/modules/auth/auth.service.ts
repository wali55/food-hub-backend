import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { UserRole } from "../../generated/prisma/enums";

export type RegisterProps = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    address: string;
}

export type LoginProps = {
    email: string;
    password: string;
}

const register = async (user: RegisterProps) => {
    const { name, email, password, phone, role, address } = user;
    const hashed = await bcrypt.hash(password as string, 10);

    const result = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword: hashed,
            role,
            phone,
            address
        }
    })

    //@ts-ignore
    delete result.hashedPassword;

    return result;
};

const login = async (user: LoginProps) => {
    const { email, password } = user;
    const result = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!result) {
        throw new Error("User not found!")
    }

    const match = await bcrypt.compare(password, result.hashedPassword);

    if (!match) {
        throw new Error("Invalid credentials!");
    }

    //@ts-ignore
    delete result.hashedPassword;

    const token = jwt.sign(
        { id: result.id, name: result.name, email: result.email, role: result.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
    
    return { result, token };
};

const getCurrentUser = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            provider: true
        }
    })

    //@ts-ignore
    delete result.hashedPassword;
    
    return result;
}

export const authService = {
    register,
    login,
    getCurrentUser
}