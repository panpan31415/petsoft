import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function checkSession() {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }
    return session;
}
