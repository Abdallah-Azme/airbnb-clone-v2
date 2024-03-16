import client from "@/libs/prismadb";
import GitHub from "@auth/core/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(client),
  providers: [
    GitHub,
    google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await client.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }
        const isCorrectPassword = await compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (isCorrectPassword) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },

  session: { strategy: "jwt" },
});
