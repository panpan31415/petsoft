import NextAuth, { NextAuthConfig, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

const credentials = Credentials({
    authorize: async (credentials) => {
        // runs on login
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            console.log("no user found");
            return null;
        }
        const isPasswordMatched = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordMatched) {
            console.log("invalid credentials");
            return null;
        }
        return user;
    },
});

const config: NextAuthConfig = {
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
            // runs on every request with middleware
            const isPrivateUrl = request.nextUrl.pathname.includes("/app");
            const isLoggedIn = Boolean(auth?.user);

            if (!isPrivateUrl && !isLoggedIn) {
                return true;
            }

            if (isPrivateUrl && !isLoggedIn) {
                Response.redirect(new URL("/login", request.url));
            }

            if (!isPrivateUrl && isLoggedIn) {
                const targetUrl = new URL("/app/dashboard", request.url);
                return Response.redirect(targetUrl);
            }

            if (isPrivateUrl && isLoggedIn) {
                return true;
            }
        },
    },
};

export const { auth, signIn, signOut } = NextAuth(config);
