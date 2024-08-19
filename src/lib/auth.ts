import NextAuth, { NextAuthConfig, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { authFormSchema } from "./validation";
import { ZodError } from "zod";

const credentials = Credentials({
    authorize: async (credentials) => {
        try {
            // runs on login
            const { email, password } = await authFormSchema.parseAsync(credentials);
            const user = await prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                return null;
            }
            const isPasswordMatched = await bcrypt.compare(password, user.hashedPassword);
            if (!isPasswordMatched) {
                return null;
            }
            return user;
        } catch (error) {
            if (error instanceof ZodError) {
                return null;
            }
        }
        return null;
    },
});

const config: NextAuthConfig = {
    adapter: undefined,
    basePath: undefined,
    pages: {
        signIn: "/login",
    },

    session: {
        maxAge: 30 * 24 * 3600,
        strategy: "jwt",
    },

    providers: [credentials],
    callbacks: {
        authorized: async ({ auth, request }) => {
            const { nextUrl } = request;
            const isPrivateUrl = nextUrl.pathname.includes("/app");
            const isLoggedIn = Boolean(auth?.user);

            if (!isPrivateUrl && !isLoggedIn) {
                return true;
            }
            if (isPrivateUrl && !isLoggedIn) {
                return Response.redirect(new URL("/login", nextUrl));
            }

            if (!isPrivateUrl && isLoggedIn) {
                const targetUrl = new URL("/app/dashboard", nextUrl);
                return Response.redirect(targetUrl);
            }

            if (isPrivateUrl && isLoggedIn) {
                return true;
            }

            return false;
        },

        signIn: async ({ user, account, profile, email, credentials }) => {
            if (user) {
                return true;
            }
            return false;
        },

        redirect: async ({ url, baseUrl }) => {
            if (url) {
                return url;
            }
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
        jwt: ({ token, user }) => {
            if (user) {
                token.userId = user.id;
                token.userName = user.name;
            }
            return token;
        },

        session: ({ session, token, trigger }) => {
            if (session.user) {
                session.user.id = token.userId as string;
            }

            return session;
        },
    },
};

export const { auth, signIn, signOut } = NextAuth(config);
