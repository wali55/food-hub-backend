import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { AuthUser, UserRole } from "../../generated/prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  baseURL: process.env.BETTER_AUTH_URL,

  events: {
    async onUserCreated({ user }: {user: AuthUser}) {
      //@ts-ignore
      const meta = user.metadata as {
      phone?: string;
      address?: string;
      role?: UserRole;
    } | undefined;
      // 👇 this runs automatically after signup
      await prisma.appUser.upsert({
			  where: { id: user.id },
			  update: {},
			  create: {
			    id: user.id, // same id 
			    email: user.email!,
			    name: user.name!,
			    phone: meta?.phone ?? "",
			    address: meta?.address ?? "",
			    role: meta?.role ?? UserRole.CUSTOMER,
			  },
			});
    }
  }
});