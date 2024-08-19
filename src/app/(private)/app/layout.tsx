import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { ReactNode } from "react";
import PetContextProvider from "@/contexts/pet-context-provider";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type LayoutProps = {
    children: ReactNode;
};
export default async function Layout({ children }: LayoutProps) {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/login");
    }
    const pets = await prisma.pet.findMany({
        where: { userId: session.user.id },
    });

    return (
        <>
            <BackgroundPattern />
            <div className='flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen'>
                <AppHeader />
                <PetContextProvider pets={pets}>{children}</PetContextProvider>
                <AppFooter />
            </div>
        </>
    );
}
